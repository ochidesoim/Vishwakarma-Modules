/**
 * Warning System
 * 
 * Centralized warnings for economics, safety, and system issues.
 * Alerts users to critical problems with their station design.
 */

import type { InstalledModule, StationMetrics } from '../types/station';
import { MODULE_SPECS } from '../data/modules';
import type { OPEXBreakdown } from './opex';

export type WarningSeverity = 'critical' | 'warning' | 'info';
export type WarningCategory = 'economics' | 'power' | 'safety' | 'systems';

export interface SystemWarning {
    id: string;
    severity: WarningSeverity;
    category: WarningCategory;
    title: string;
    message: string;
    value?: string;         // Current problematic value
    suggestion?: string;    // How to fix
}

/**
 * Analyze station for all warnings
 */
export function analyzeWarnings(
    modules: InstalledModule[],
    metrics: StationMetrics,
    opex: OPEXBreakdown | null,
    annualRevenue: number
): SystemWarning[] {
    const warnings: SystemWarning[] = [];

    // --- ECONOMIC WARNINGS ---

    if (opex) {
        const annualCashFlow = annualRevenue - opex.annualTotal;

        if (annualCashFlow < 0) {
            const loss = Math.abs(annualCashFlow);
            warnings.push({
                id: 'opex-exceeds-revenue',
                severity: 'critical',
                category: 'economics',
                title: 'Operating at a Loss',
                message: `Station loses money every year. OPEX exceeds revenue.`,
                value: `-$${formatMoney(loss)}/year`,
                suggestion: 'Add revenue-generating modules or reduce crew operations',
            });
        }

        if (annualRevenue > 0 && annualRevenue < opex.annualTotal * 0.5) {
            warnings.push({
                id: 'revenue-critically-low',
                severity: 'critical',
                category: 'economics',
                title: 'Revenue Critically Low',
                message: `Revenue covers less than 50% of operating costs.`,
                value: `${Math.round((annualRevenue / opex.annualTotal) * 100)}% coverage`,
                suggestion: 'Add Manufacturing Lab or Service Station for higher revenue',
            });
        }
    }

    // --- POWER WARNINGS ---

    const powerMargin = metrics.powerGeneration - metrics.totalPowerCont;
    const powerMarginPercent = metrics.powerGeneration > 0
        ? (powerMargin / metrics.powerGeneration) * 100
        : 0;

    if (powerMargin < 0) {
        warnings.push({
            id: 'power-deficit',
            severity: 'critical',
            category: 'power',
            title: 'Power Deficit',
            message: `Station consumes more power than it generates.`,
            value: `${powerMargin.toFixed(1)} kW`,
            suggestion: 'Add Power Station (+40 kW generation)',
        });
    } else if (powerMarginPercent < 20) {
        warnings.push({
            id: 'power-margin-low',
            severity: 'warning',
            category: 'power',
            title: 'Low Power Margin',
            message: `Less than 20% power headroom for expansion or emergencies.`,
            value: `${powerMarginPercent.toFixed(0)}% margin`,
            suggestion: 'Add Power Station for expansion capacity',
        });
    }

    // --- SAFETY WARNINGS ---

    const moduleTypes = modules.map(m => m.type);
    const crewModules = modules.filter(m => MODULE_SPECS[m.type].crew > 0);
    const totalCrew = crewModules.reduce((sum, m) => sum + MODULE_SPECS[m.type].crew, 0);

    // Single airlock with crew
    const airlockCount = moduleTypes.filter(t => t === 'airlock').length;
    if (airlockCount === 1 && totalCrew > 0) {
        warnings.push({
            id: 'single-airlock',
            severity: 'critical',
            category: 'safety',
            title: 'Single Emergency Egress',
            message: `Only one airlock for ${totalCrew} crew. No redundancy for EVA.`,
            value: '1 airlock',
            suggestion: 'Add second Crew Airlock for crew safety',
        });
    }

    // No airlock with crew modules
    if (airlockCount === 0 && crewModules.length > 0) {
        warnings.push({
            id: 'no-airlock',
            severity: 'critical',
            category: 'safety',
            title: 'No Crew Access',
            message: `Crew modules installed but no airlock for crew transfer.`,
            suggestion: 'Add Crew Airlock before operating crew modules',
        });
    }

    // No crew quarters with crew modules
    const quartersCount = moduleTypes.filter(t => t === 'quarters').length;
    if (quartersCount === 0 && totalCrew > 0) {
        warnings.push({
            id: 'no-quarters',
            severity: 'warning',
            category: 'safety',
            title: 'No Crew Quarters',
            message: `${totalCrew} crew required but no living quarters.`,
            suggestion: 'Add Crew Quarters for crew accommodations',
        });
    }

    // --- SYSTEM WARNINGS ---

    // Thermal margin
    const thermalMargin = metrics.thermalCapacity - metrics.totalThermal;
    const thermalMarginPercent = metrics.thermalCapacity > 0
        ? (thermalMargin / metrics.thermalCapacity) * 100
        : 0;

    if (thermalMargin < 0) {
        warnings.push({
            id: 'thermal-overload',
            severity: 'critical',
            category: 'systems',
            title: 'Thermal Overload',
            message: `Heat generation exceeds cooling capacity.`,
            value: `${thermalMargin.toFixed(1)} kW deficit`,
            suggestion: 'Add Power Station (+20 kW cooling) or remove high-heat modules',
        });
    } else if (thermalMarginPercent < 10) {
        warnings.push({
            id: 'thermal-margin-low',
            severity: 'warning',
            category: 'systems',
            title: 'Thermal Margin Critical',
            message: `Less than 10% cooling headroom.`,
            value: `${thermalMarginPercent.toFixed(0)}% margin`,
            suggestion: 'Add Power Station for additional cooling',
        });
    }

    // Single power source
    const powerCount = moduleTypes.filter(t => t === 'power').length;
    if (powerCount === 1 && modules.length > 3) {
        warnings.push({
            id: 'single-power',
            severity: 'warning',
            category: 'systems',
            title: 'Single Power Source',
            message: `Station relies on single power station. No redundancy.`,
            suggestion: 'Add second Power Station for redundancy',
        });
    }

    // Sort by severity
    const severityOrder: Record<WarningSeverity, number> = {
        critical: 0,
        warning: 1,
        info: 2,
    };

    return warnings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/**
 * Get warning counts by severity
 */
export function getWarningCounts(warnings: SystemWarning[]): {
    critical: number;
    warning: number;
    info: number;
    total: number;
} {
    return {
        critical: warnings.filter(w => w.severity === 'critical').length,
        warning: warnings.filter(w => w.severity === 'warning').length,
        info: warnings.filter(w => w.severity === 'info').length,
        total: warnings.length,
    };
}

export function formatMoney(value: number): string {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toString();
}
