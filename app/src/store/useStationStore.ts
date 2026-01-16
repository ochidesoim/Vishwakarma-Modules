import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InstalledModule, ModuleType, StationMetrics } from '../types/station';
import { calculateMetrics, INITIAL_METRICS, validateInstall, type ValidationResult } from '../lib/physics';
import { calculateNPV, calculateIRR, calculateBreakEven } from '../lib/financials';
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
    setFinancialParameter: (key: string, value: number) => void;
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

            savedConfigs: [],

            saveConfiguration: (name) => {
                const { modules, metrics, financialParameters, savedConfigs } = get();
                const newConfig: SavedConfiguration = {
                    id: crypto.randomUUID(),
                    name,
                    date: new Date().toISOString(),
                    modules: [...modules],
                    financialParameters: { ...financialParameters },
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
                // using base metrics + sensitivity
                const financials = recalculateFinancials(newMetrics, get().financialParameters);

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

                const remaining = modules.filter(m => m.bayId !== bayId);

                // Cascading Logic: Check if any remaining module requires the removed one
                // E.g. Removing Airlock
                // If we remove X, find modules that require X.type
                // If found, mark them inactive

                const type = moduleToRemove.type;

                const updatedModules = remaining.map(m => {
                    const spec = MODULE_SPECS[m.type];
                    if (spec.requires?.includes(type)) {
                        return { ...m, status: 'inactive' as const };
                    }
                    return m;
                });

                const newMetrics = calculateMetrics(updatedModules);
                const financials = recalculateFinancials(newMetrics, get().financialParameters);

                set({ modules: updatedModules, metrics: { ...newMetrics, ...financials } });
            },

            resetStation: () => {
                set({ modules: [], metrics: INITIAL_METRICS });
            },

            setFinancialParameter: (key: string, value: number) => {
                const params = { ...get().financialParameters, [key]: value };
                const metrics = get().metrics; // Base metrics need recalculation? 
                // Actually metrics.totalCapex etc derive from modules.
                // Just need to re-run financial formulas.
                const financials = recalculateFinancials(metrics, params);
                set({ financialParameters: params, metrics: { ...metrics, ...financials } });
            }
        }),
        {
            name: 'vishwakarma-storage',
            onRehydrateStorage: () => (state) => {
                // Recalculate metrics with current logic when loading from localStorage
                if (state && state.modules.length > 0) {
                    const newMetrics = calculateMetrics(state.modules);
                    const financials = recalculateFinancials(newMetrics, state.financialParameters);
                    // Update the state with recalculated values
                    useStationStore.setState({
                        metrics: { ...newMetrics, ...financials }
                    });
                }
            }
        }
    )
);

function recalculateFinancials(metrics: StationMetrics, params: { discountRate: number, revenueMultiplier: number }) {
    const rev = metrics.monthlyRevenue * params.revenueMultiplier;
    const npv = calculateNPV(metrics.totalCapex, rev, metrics.monthlyOpex, 120, params.discountRate);
    const irr = calculateIRR(metrics.totalCapex, rev, metrics.monthlyOpex, 120);
    const be = calculateBreakEven(metrics.totalCapex, rev, metrics.monthlyOpex);

    return {
        netPresentValue: npv,
        internalRateReturn: irr,
        breakEvenMonths: be,
        monthlyRevenue: rev // Update metric to reflect sensitivity? Or keep base? 
        // Better to keep base and having 'projectedRevenue' but for UI simplicity we might overwrite or add new field.
        // Let's overwrite for now or UI handles display.
        // To be safe, store calculates the FINAL metrics for display.
    };
}
