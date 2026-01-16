import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InstalledModule, ModuleType, StationMetrics } from '../types/station';
import { calculateMetrics, INITIAL_METRICS, validateInstall, type ValidationResult } from '../lib/physics';
import { calculateNPV, calculateIRR, calculateBreakEven } from '../lib/financials';
import { calculateLaunchCosts, type LaunchVehicleType } from '../lib/launch';
import { calculateAnnualOPEX } from '../lib/opex';
import { MODULE_SPECS } from '../data/modules';

interface StationState {
    modules: InstalledModule[];
    metrics: StationMetrics;

    // Actions
    installModule: (bayId: number, type: ModuleType) => ValidationResult;
    removeModule: (bayId: number) => void;
    resetStation: () => void;

    // Settings
    financialParameters: {
        discountRate: number;
        revenueMultiplier: number; // Sensitivity
    };
    launchVehicle: LaunchVehicleType;
    setFinancialParameter: (key: string, value: number) => void;
    setLaunchVehicle: (vehicle: LaunchVehicleType) => void;
    // Comparison Mode
    savedConfigs: SavedConfiguration[];
    saveConfiguration: (name: string) => void;
    deleteConfiguration: (id: string) => void;
    loadConfiguration: (id: string) => void;
}

export interface SavedConfiguration {
    id: string;
    name: string;
    date: string;
    modules: InstalledModule[];
    financialParameters: {
        discountRate: number;
        revenueMultiplier: number;
    };
    launchVehicle: LaunchVehicleType;
    // Store snapshot of metrics too for quick compare without recalc
    metrics: StationMetrics;
}

export const useStationStore = create<StationState>()(
    persist(
        (set, get) => ({
            modules: [],
            metrics: INITIAL_METRICS,
            financialParameters: {
                discountRate: 0.10,
                revenueMultiplier: 1.0,
            },
            launchVehicle: 'falcon9',

            savedConfigs: [],

            saveConfiguration: (name) => {
                const { modules, metrics, financialParameters, savedConfigs } = get();
                const newConfig: SavedConfiguration = {
                    id: crypto.randomUUID(),
                    name,
                    date: new Date().toISOString(),
                    modules: [...modules],
                    financialParameters: { ...financialParameters },
                    launchVehicle: get().launchVehicle,
                    metrics: { ...metrics }
                };
                set({ savedConfigs: [newConfig, ...savedConfigs] });
            },

            deleteConfiguration: (id) => {
                const { savedConfigs } = get();
                set({ savedConfigs: savedConfigs.filter(c => c.id !== id) });
            },

            loadConfiguration: (id) => {
                const { savedConfigs } = get();
                const config = savedConfigs.find(c => c.id === id);
                if (config) {
                    set({
                        modules: [...config.modules],
                        financialParameters: { ...config.financialParameters },
                        launchVehicle: config.launchVehicle || 'falcon9',
                        metrics: { ...config.metrics } // Assuming metrics are valid
                    });
                    // Recalculate just in case store logic changed? 
                    // Physics usually deterministic.
                }
            },

            installModule: (bayId, type) => {
                const { modules, metrics } = get();

                // 1. Check if bay is occupied
                if (modules.find(m => m.bayId === bayId)) {
                    return { valid: false, reason: 'Bay Occupied' };
                }

                // 2. Validate Constraints
                const valid = validateInstall(type, metrics, modules);
                if (!valid.valid) return valid;

                // 3. Install
                const newModule: InstalledModule = {
                    id: `bay-${bayId}`,
                    bayId,
                    type,
                    status: 'active'
                };

                const newModules = [...modules, newModule];
                const newMetrics = calculateMetrics(newModules);

                // Recalculate Financials
                const financials = recalculateFinancials(
                    newMetrics,
                    get().financialParameters,
                    newModules,
                    get().launchVehicle
                );

                set({
                    modules: newModules,
                    metrics: { ...newMetrics, ...financials }
                });

                return { valid: true };
            },

            removeModule: (bayId) => {
                const { modules } = get();
                const moduleToRemove = modules.find(m => m.bayId === bayId);
                if (!moduleToRemove) return;

                const type = moduleToRemove.type;
                const remaining = modules.filter(m => m.bayId !== bayId);

                // Cascading Logic: Check if any remaining module requires the removed one
                // E.g. Removing Airlock
                // If we remove X, find modules that require X.type
                // If found, mark them inactive

                const updatedModules = remaining.map(m => {
                    const spec = MODULE_SPECS[m.type];
                    if (spec.requires?.includes(type)) {
                        return { ...m, status: 'inactive' as const };
                    }
                    return m;
                });

                const newMetrics = calculateMetrics(updatedModules);
                const financials = recalculateFinancials(
                    newMetrics,
                    get().financialParameters,
                    updatedModules,
                    get().launchVehicle
                );

                set({ modules: updatedModules, metrics: { ...newMetrics, ...financials } });
            },

            resetStation: () => {
                const { launchVehicle } = get();
                // Need to recalculate initial metrics with launch costs
                const financials = recalculateFinancials(INITIAL_METRICS, get().financialParameters, [], launchVehicle);
                set({ modules: [], metrics: { ...INITIAL_METRICS, ...financials } });
            },

            setFinancialParameter: (key: string, value: number) => {
                const params = { ...get().financialParameters, [key]: value };
                const metrics = get().metrics;
                const modules = get().modules;
                const launchVehicle = get().launchVehicle;

                const financials = recalculateFinancials(metrics, params, modules, launchVehicle);
                set({ financialParameters: params, metrics: { ...metrics, ...financials } });
            },

            setLaunchVehicle: (vehicle: LaunchVehicleType) => {
                set({ launchVehicle: vehicle });
                const { metrics, financialParameters, modules } = get();
                const financials = recalculateFinancials(metrics, financialParameters, modules, vehicle);
                set({ metrics: { ...metrics, ...financials } });
            },
        }),
        {
            name: 'vishwakarma-storage',
            onRehydrateStorage: () => (state) => {
                // Recalculate metrics with current logic when loading from localStorage
                if (state && state.modules.length > 0) {
                    const newMetrics = calculateMetrics(state.modules);
                    const financials = recalculateFinancials(newMetrics, state.financialParameters, state.modules, state.launchVehicle || 'falcon9');
                    // Update the state with recalculated values
                    useStationStore.setState({
                        metrics: { ...newMetrics, ...financials }
                    });
                }
            }
        }
    )
);

function recalculateFinancials(
    metrics: StationMetrics,
    params: { discountRate: number, revenueMultiplier: number },
    _modules: InstalledModule[], // modules param kept for signature but marked unused
    launchVehicleId: LaunchVehicleType
) {
    // 1. Calculate Launch Costs
    // Ensure launchVehicleId is valid, fallback to falcon9
    const vehicleId = launchVehicleId || 'falcon9';
    const launchData = calculateLaunchCosts(metrics.totalMass, vehicleId);
    const totalInvestment = metrics.totalCapex + launchData.totalLaunchCost;

    // 2. Calculate Real OPEX
    // Determine if crewed (assume crewed if any crew capacity > 0 OR explicit crew modules)
    // Actually strictly check if any module *provides* crew slots
    const hasCrewCapacity = metrics.crewCapacity > 0;
    const isCrewed = hasCrewCapacity;

    // Calculate crew size for variable costs (if crewed, assume full capacity usage)
    const crewSize = isCrewed ? metrics.crewCapacity : 0;

    // Note: Use totalInvestment as asset value for insurance/maintenance calculations?
    // Usually purely CAPEX is insured, but launch cost is part of the "replacement cost"
    // Let's use totalInvestment for broader coverage simulation
    const opexData = calculateAnnualOPEX(totalInvestment, isCrewed, crewSize);

    // 3. Revenue
    const rev = metrics.monthlyRevenue * params.revenueMultiplier;

    // 4. Financial Models
    const npv = calculateNPV(totalInvestment, rev, opexData.monthlyTotal, 120, params.discountRate);
    const irr = calculateIRR(totalInvestment, rev, opexData.monthlyTotal, 120);
    const be = calculateBreakEven(totalInvestment, rev, opexData.monthlyTotal);

    return {
        netPresentValue: npv,
        internalRateReturn: irr,
        breakEvenMonths: be,
        monthlyRevenue: rev,
        monthlyOpex: opexData.monthlyTotal,
        totalLaunchCost: launchData.totalLaunchCost,
        totalInvestment: totalInvestment
    };
}
