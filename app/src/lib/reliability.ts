import type { InstalledModule, ModuleType } from '../types/station';
import { MODULE_SPECS } from '../data/modules';

// ==================== MTBF RELIABILITY DATA (U-08C) ====================

// Mean Time Between Failures in months (based on space heritage data)
export const MODULE_MTBF: Record<ModuleType, number> = {
    hub: 180,      // 15 years - proven design
    lab: 120,      // 10 years - complex equipment
    fab: 96,       // 8 years - high-stress manufacturing
    data: 72,      // 6 years - electronics intensive
    hydro: 84,     // 7 years - biological systems
    repair: 108,   // 9 years - robust robotics
    power: 144,    // 12 years - simple solar arrays
    health: 96,    // 8 years - medical equipment
    airlock: 156,  // 13 years - mechanical simplicity
    cargo: 168,    // 14 years - passive structure
    quarters: 132, // 11 years - life support systems
};

export interface MTBFData {
    moduleType: ModuleType;
    moduleName: string;
    mtbfMonths: number;
    mtbfYears: number;
    failureProbability10Yr: number; // Probability of failure in 10 years
    criticality: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Calculate MTBF reliability data for installed modules
 */
export function calculateMTBFData(modules: InstalledModule[]): MTBFData[] {
    return modules.map(m => {
        const mtbf = MODULE_MTBF[m.type] || 120;
        const spec = MODULE_SPECS[m.type];

        // Exponential distribution: P(failure in t months) = 1 - e^(-t/MTBF)
        const failureProbability10Yr = 1 - Math.exp(-120 / mtbf);

        // Criticality based on dependencies and revenue
        let criticality: 'low' | 'medium' | 'high' | 'critical' = 'low';
        if (spec.revenue > 200000 || m.type === 'power') criticality = 'high';
        else if (spec.revenue > 50000) criticality = 'medium';
        if (m.type === 'hub' || m.type === 'airlock') criticality = 'critical';

        return {
            moduleType: m.type,
            moduleName: spec.title,
            mtbfMonths: mtbf,
            mtbfYears: Math.round(mtbf / 12),
            failureProbability10Yr,
            criticality,
        };
    }).sort((a, b) => a.mtbfMonths - b.mtbfMonths); // Sort by reliability (worst first)
}

/**
 * Calculate overall station reliability (probability of no failures in 10 years)
 */
export function calculateStationReliability(modules: InstalledModule[]): number {
    if (modules.length === 0) return 1;

    // Station reliability = product of individual module reliabilities
    let reliability = 1;
    modules.forEach(m => {
        const mtbf = MODULE_MTBF[m.type] || 120;
        const moduleReliability = Math.exp(-120 / mtbf);
        reliability *= moduleReliability;
    });

    return reliability;
}

// ==================== SOLAR DEGRADATION (U-08A) ====================

export interface SolarDegradationData {
    year: number;
    powerCapacity: number;
    degradationPercent: number;
    costImpact: number; // Additional OPEX due to reduced efficiency
}

/**
 * Calculate solar panel degradation over 10 years
 * Based on: ~2.5% degradation per year for typical solar arrays in LEO
 */
export function calculateSolarDegradation(
    initialPower: number,
    annualDegradation: number = 0.025
): SolarDegradationData[] {
    const data: SolarDegradationData[] = [];

    for (let year = 0; year <= 10; year++) {
        const degradationFactor = Math.pow(1 - annualDegradation, year);
        const powerCapacity = Math.round(initialPower * degradationFactor * 10) / 10;
        const degradationPercent = Math.round((1 - degradationFactor) * 100 * 10) / 10;

        // Cost impact: Need to compensate for reduced power
        // Estimate $10K/month per kW shortfall
        const powerShortfall = initialPower - powerCapacity;
        const costImpact = Math.round(powerShortfall * 10000);

        data.push({
            year,
            powerCapacity,
            degradationPercent,
            costImpact,
        });
    }

    return data;
}

// ==================== REDUNDANCY ANALYSIS (U-08D) ====================

export interface RedundancyIssue {
    type: 'single_point_failure' | 'no_backup' | 'critical_dependency';
    severity: 'warning' | 'critical';
    module: string;
    message: string;
    suggestion: string;
}

/**
 * Analyze station configuration for redundancy issues and single points of failure
 */
export function analyzeRedundancy(modules: InstalledModule[]): RedundancyIssue[] {
    const issues: RedundancyIssue[] = [];
    const moduleTypes = modules.map(m => m.type);

    // Check for single Power Station
    const powerCount = moduleTypes.filter(t => t === 'power').length;
    if (powerCount === 1) {
        issues.push({
            type: 'single_point_failure',
            severity: 'critical',
            module: 'Power Station',
            message: 'Single power source - station-wide blackout risk',
            suggestion: 'Add second Power Station for redundancy',
        });
    } else if (powerCount === 0 && modules.length > 0) {
        issues.push({
            type: 'no_backup',
            severity: 'warning',
            module: 'Power',
            message: 'Relying only on Hub power generation',
            suggestion: 'Consider adding Power Station for expansion',
        });
    }

    // Check for single Airlock with crew modules
    const airlockCount = moduleTypes.filter(t => t === 'airlock').length;
    const crewModules = modules.filter(m => MODULE_SPECS[m.type].crew > 0);
    if (airlockCount === 1 && crewModules.length > 0) {
        issues.push({
            type: 'single_point_failure',
            severity: 'warning',
            module: 'Crew Airlock',
            message: 'Single EVA access point - emergency egress limited',
            suggestion: 'Consider adding backup Airlock for crew safety',
        });
    }

    // Check for critical dependencies
    const modulesThatRequireAirlock = modules.filter(m =>
        MODULE_SPECS[m.type].requires?.includes('airlock')
    );
    if (airlockCount === 1 && modulesThatRequireAirlock.length >= 3) {
        issues.push({
            type: 'critical_dependency',
            severity: 'warning',
            module: 'Crew Airlock',
            message: `${modulesThatRequireAirlock.length} modules depend on single Airlock`,
            suggestion: 'Airlock failure would disable multiple revenue sources',
        });
    }

    // Check for no Crew Quarters with crew-required modules
    const quartersCount = moduleTypes.filter(t => t === 'quarters').length;
    if (quartersCount === 0 && crewModules.length > 0) {
        issues.push({
            type: 'no_backup',
            severity: 'warning',
            module: 'Crew Quarters',
            message: 'Crew modules installed without crew quarters',
            suggestion: 'Add Crew Quarters to house station personnel',
        });
    }

    // Check for high data consumption without redundancy
    const dataModules = modules.filter(m => m.type === 'data');
    if (dataModules.length === 1 && moduleTypes.includes('lab')) {
        issues.push({
            type: 'single_point_failure',
            severity: 'warning',
            module: 'Data Center',
            message: 'Single data center serving research operations',
            suggestion: 'Consider backup data storage capacity',
        });
    }

    return issues.sort((a, b) =>
        a.severity === 'critical' ? -1 : b.severity === 'critical' ? 1 : 0
    );
}

// ==================== TRADE-OFF ANALYSIS (U-06C) ====================

export interface TradeOffInsight {
    category: 'efficiency' | 'risk' | 'revenue' | 'capacity';
    icon: string;
    title: string;
    comparison: string;
    recommendation?: string;
}

/**
 * Generate trade-off insights comparing two configurations
 */
export function generateTradeOffInsights(
    configA: { modules: InstalledModule[]; capex: number; npv: number; monthlyRevenue: number; powerUsage: number; powerGen: number },
    configB: { modules: InstalledModule[]; capex: number; npv: number; monthlyRevenue: number; powerUsage: number; powerGen: number }
): TradeOffInsight[] {
    const insights: TradeOffInsight[] = [];

    // ROI comparison
    const roiA = configA.npv / configA.capex;
    const roiB = configB.npv / configB.capex;
    if (Math.abs(roiA - roiB) > 0.1) {
        const better = roiA > roiB ? 'Config A' : 'Config B';
        insights.push({
            category: 'efficiency',
            icon: '📈',
            title: 'Return on Investment',
            comparison: `${better} has ${Math.abs((roiA - roiB) * 100).toFixed(0)}% better ROI`,
            recommendation: roiA > roiB
                ? 'Current config is more capital efficient'
                : 'Saved config has better capital efficiency',
        });
    }

    // Revenue density (revenue per module)
    const revenuePerModuleA = configA.monthlyRevenue / Math.max(configA.modules.length, 1);
    const revenuePerModuleB = configB.monthlyRevenue / Math.max(configB.modules.length, 1);
    if (Math.abs(revenuePerModuleA - revenuePerModuleB) > 10000) {
        const better = revenuePerModuleA > revenuePerModuleB ? 'Config A' : 'Config B';
        insights.push({
            category: 'revenue',
            icon: '💰',
            title: 'Revenue Density',
            comparison: `${better} generates more revenue per module`,
        });
    }

    // Power efficiency
    const powerMarginA = (configA.powerGen - configA.powerUsage) / configA.powerGen;
    const powerMarginB = (configB.powerGen - configB.powerUsage) / configB.powerGen;
    if (powerMarginA < 0.2 || powerMarginB < 0.2) {
        const tight = powerMarginA < powerMarginB ? 'Config A' : 'Config B';
        insights.push({
            category: 'capacity',
            icon: '⚡',
            title: 'Power Headroom',
            comparison: `${tight} has tighter power margins`,
            recommendation: 'Consider adding Power Station before expansion',
        });
    }

    // Risk comparison (based on module count and diversity)
    const reliabilityA = calculateStationReliability(configA.modules);
    const reliabilityB = calculateStationReliability(configB.modules);
    if (Math.abs(reliabilityA - reliabilityB) > 0.05) {
        const safer = reliabilityA > reliabilityB ? 'Config A' : 'Config B';
        insights.push({
            category: 'risk',
            icon: '🛡️',
            title: '10-Year Reliability',
            comparison: `${safer} has ${Math.abs((reliabilityA - reliabilityB) * 100).toFixed(0)}% higher survival probability`,
        });
    }

    return insights;
}
