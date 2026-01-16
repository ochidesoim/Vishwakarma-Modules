import type { InstalledModule, StationMetrics, ModuleType } from '../types/station';
import { MODULE_SPECS } from '../data/modules';

export const INITIAL_METRICS: StationMetrics = {
    totalMass: 25000, // Hub
    totalPowerCont: 2,
    totalPowerPeak: 5,
    totalThermal: 5,
    totalCrew: 0,
    totalVolume: 100, // Hub volume
    powerGeneration: 60,
    thermalCapacity: 80,
    crewCapacity: 0,
    totalCapex: 500_000_000,
    monthlyRevenue: 0,
    monthlyOpex: 1_000_000,
    netPresentValue: 0,
    internalRateReturn: 0,
    breakEvenMonths: 0,
    totalLaunchCost: 0,
    totalInvestment: 500_000_000,
};

export function calculateMetrics(modules: InstalledModule[]): StationMetrics {
    let mass = MODULE_SPECS.hub.mass;
    let powerCont = MODULE_SPECS.hub.power_cont;
    let powerPeak = MODULE_SPECS.hub.power_peak;
    let thermal = MODULE_SPECS.hub.thermal;
    let crew = MODULE_SPECS.hub.crew;
    let volume = MODULE_SPECS.hub.volume;

    let powerGen = MODULE_SPECS.hub.provides?.power || 0;
    let thermalCap = MODULE_SPECS.hub.provides?.thermal || 0;
    let crewCap = MODULE_SPECS.hub.provides?.crew || 0;

    let capex = MODULE_SPECS.hub.capex;
    let revenue = MODULE_SPECS.hub.revenue;
    let opex = MODULE_SPECS.hub.opex;

    modules.forEach(m => {
        const spec = MODULE_SPECS[m.type];
        if (m.status === 'active') {
            mass += spec.mass;
            powerCont += spec.power_cont;
            powerPeak += spec.power_peak;
            thermal += spec.thermal;
            crew += spec.crew;
            volume += spec.volume;

            powerGen += spec.provides?.power || 0;
            thermalCap += spec.provides?.thermal || 0;
            crewCap += spec.provides?.crew || 0;

            capex += spec.capex;
            if (m.status === 'active') {
                revenue += spec.revenue;
                opex += spec.opex;
            } else {
                opex += spec.opex * 0.5;
            }
        } else {
            mass += spec.mass;
            capex += spec.capex;
            volume += spec.volume;
            powerCont += spec.power_cont;
            powerPeak += spec.power_peak;
            thermal += spec.thermal;
            revenue += 0;
            opex += spec.opex;
        }
    });

    return {
        totalMass: mass,
        totalPowerCont: powerCont,
        totalPowerPeak: powerPeak,
        totalThermal: thermal,
        totalCrew: crew,
        totalVolume: volume,
        powerGeneration: powerGen,
        thermalCapacity: thermalCap,
        crewCapacity: crew,
        totalCapex: capex,
        monthlyRevenue: revenue,
        monthlyOpex: opex,
        netPresentValue: 0,
        internalRateReturn: 0,
        breakEvenMonths: 0,
        totalLaunchCost: 0,
        totalInvestment: capex, // Launch cost added in store
    };
}

// ==================== ENHANCED VALIDATION (U-03C) ====================

export interface ValidationResult {
    valid: boolean;
    reason?: string;
    details?: {
        constraint: 'power' | 'thermal' | 'dependency' | 'crew';
        current: number;
        required: number;
        available: number;
        suggestions: string[];
    };
}

export function validateInstall(
    moduleType: ModuleType,
    currentMetrics: StationMetrics,
    existingModules: InstalledModule[]
): ValidationResult {
    const spec = MODULE_SPECS[moduleType];

    // Power Check
    const availablePower = currentMetrics.powerGeneration - currentMetrics.totalPowerCont;
    if (spec.power_cont > availablePower) {
        return {
            valid: false,
            reason: `Insufficient Power: Need ${spec.power_cont}kW, Have ${availablePower.toFixed(1)}kW`,
            details: {
                constraint: 'power',
                current: currentMetrics.totalPowerCont,
                required: spec.power_cont,
                available: availablePower,
                suggestions: [
                    'Add Power Station (+40kW generation)',
                    'Remove high-power modules (Data Center, Manufacturing)'
                ]
            }
        };
    }

    // Thermal Check
    const availableThermal = currentMetrics.thermalCapacity - currentMetrics.totalThermal;
    if (spec.thermal > availableThermal) {
        return {
            valid: false,
            reason: `Thermal Limit: Need ${spec.thermal}kW cooling, Have ${availableThermal.toFixed(1)}kW`,
            details: {
                constraint: 'thermal',
                current: currentMetrics.totalThermal,
                required: spec.thermal,
                available: availableThermal,
                suggestions: [
                    'Add Power Station (+40kW cooling)',
                    'Remove high-heat modules (Data Center, Manufacturing)'
                ]
            }
        };
    }

    // Dependency Check
    if (spec.requires && spec.requires.length > 0) {
        for (const req of spec.requires) {
            const hasReq = existingModules.some(m => m.type === req && m.status === 'active');
            if (!hasReq) {
                return {
                    valid: false,
                    reason: `Requires active ${MODULE_SPECS[req].title}`,
                    details: {
                        constraint: 'dependency',
                        current: 0,
                        required: 1,
                        available: 0,
                        suggestions: [
                            `Install ${MODULE_SPECS[req].title} first`,
                            `${spec.title} needs ${MODULE_SPECS[req].title} for crew access`
                        ]
                    }
                };
            }
        }
    }

    return { valid: true };
}

// ==================== CASCADING DEPENDENCIES (U-03B) ====================

/**
 * Get modules that depend on the given module type
 */
export function getDependentModules(
    moduleType: ModuleType,
    existingModules: InstalledModule[]
): InstalledModule[] {
    return existingModules.filter(m => {
        const spec = MODULE_SPECS[m.type];
        return spec.requires?.includes(moduleType);
    });
}

/**
 * Get warning message for cascading removal
 */
export function getCascadingWarning(
    moduleType: ModuleType,
    existingModules: InstalledModule[]
): { hasDependents: boolean; message: string; dependents: string[] } {
    const dependents = getDependentModules(moduleType, existingModules);

    if (dependents.length === 0) {
        return { hasDependents: false, message: '', dependents: [] };
    }

    const dependentNames = dependents.map(m => MODULE_SPECS[m.type].title);
    return {
        hasDependents: true,
        message: `Removing this will disable ${dependents.length} dependent module(s): ${dependentNames.join(', ')}`,
        dependents: dependentNames
    };
}

// ==================== STATION KEEPING (U-02D) ====================

export interface StationKeepingData {
    propellantPerMonth: number; // kg
    reboostFrequency: string; // days
    tenYearFuelMass: number; // kg
    tenYearFuelCost: number; // $
    orbitalAltitude: number; // km
    inclination: number; // degrees
}

/**
 * Calculate station-keeping requirements based on total mass
 */
export function calculateStationKeeping(totalMass: number): StationKeepingData {
    // ISS reference: ~400km altitude, ~200kg/month propellant for ~420,000kg station
    // Scale proportionally to mass
    const issReferenceMass = 420000; // kg
    const issMonthlyPropellant = 200; // kg

    const scaleFactor = totalMass / issReferenceMass;
    const propellantPerMonth = Math.round(issMonthlyPropellant * scaleFactor);

    // Reboost every 30-45 days depending on solar activity
    const reboostDays = totalMass > 100000 ? '30-45' : '45-60';

    const tenYearFuelMass = propellantPerMonth * 120; // 10 years
    const fuelCostPerKg = 5000; // $ per kg to orbit
    const tenYearFuelCost = tenYearFuelMass * fuelCostPerKg;

    return {
        propellantPerMonth,
        reboostFrequency: reboostDays,
        tenYearFuelMass,
        tenYearFuelCost,
        orbitalAltitude: 400,
        inclination: 51.6
    };
}

// ==================== LAUNCH WINDOWS (U-02B) ====================

export interface LaunchWindowData {
    nextWindow: string; // "14 days"
    windowsPerQuarter: number;
    optimalMonths: string[];
}

/**
 * Get launch window information
 */
export function getLaunchWindows(): LaunchWindowData {
    // Simulate next launch window based on current date
    const now = new Date();
    const dayOfMonth = now.getDate();

    // Launch windows roughly every 2 weeks for ISS-compatible orbit
    const daysUntilNext = 14 - (dayOfMonth % 14);

    return {
        nextWindow: `${daysUntilNext} days`,
        windowsPerQuarter: 6,
        optimalMonths: ['March', 'June', 'September', 'December']
    };
}

