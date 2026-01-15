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
        if (m.status === 'active') { // Only active modules consume/produce? Or all installed ones?
            // Assuming installed modules consume resources regardless, but maybe revenue depends on status.
            // PRD Flow 6.4: "Mark dependents as non-operational ... Recalculate metrics (exclude inactive revenue)"
            // So Mass/Power/Thermal is static (installed), Revenue/Opex might be dynamic.
            // For simplicity, let's assume installed = consumes power/mass. Active = generates revenue.

            mass += spec.mass;
            powerCont += spec.power_cont;
            powerPeak += spec.power_peak;
            thermal += spec.thermal;
            crew += spec.crew;
            volume += spec.volume;

            powerGen += spec.provides?.power || 0;
            thermalCap += spec.provides?.thermal || 0; // "cooling capacity"
            crewCap += spec.provides?.crew || 0;

            capex += spec.capex;
            if (m.status === 'active') {
                revenue += spec.revenue;
                opex += spec.opex;
            } else {
                // Inactive modules might still cost OPEX (maintenance)? Let's say yes.
                opex += spec.opex * 0.5; // Reduced opex?
            }
        } else {
            // If inactive, maybe just mass and capex?
            mass += spec.mass;
            capex += spec.capex;
            volume += spec.volume;
            powerCont += spec.power_cont;
            powerPeak += spec.power_peak;
            thermal += spec.thermal;
            revenue += 0;
            opex += spec.opex; // Still need maintenance
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
        crewCapacity: crewCap,
        totalCapex: capex,
        monthlyRevenue: revenue,
        monthlyOpex: opex,
        netPresentValue: 0, // Calculated separately
        internalRateReturn: 0,
        breakEvenMonths: 0,
    };
}

export function validateInstall(
    moduleType: ModuleType,
    currentMetrics: StationMetrics,
    existingModules: InstalledModule[]
): { valid: boolean; reason?: string } {
    const spec = MODULE_SPECS[moduleType];

    // Power Check
    if (currentMetrics.totalPowerCont + spec.power_cont > currentMetrics.powerGeneration) {
        return { valid: false, reason: `Insufficient Power: Need ${spec.power_cont}kW, Have ${currentMetrics.powerGeneration - currentMetrics.totalPowerCont}kW` };
    }

    // Thermal Check
    if (currentMetrics.totalThermal + spec.thermal > currentMetrics.thermalCapacity) {
        return { valid: false, reason: `Thermal Limit Exceeded: Need ${spec.thermal}kW cooling.` };
    }

    // Dependency Check (Airlock)
    if (spec.requires && spec.requires.length > 0) {
        for (const req of spec.requires) {
            const hasReq = existingModules.some(m => m.type === req && m.status === 'active');
            if (!hasReq) {
                return { valid: false, reason: `Requires active ${MODULE_SPECS[req].title}` };
            }
        }
    }

    return { valid: true };
}
