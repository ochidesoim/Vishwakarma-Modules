import type { InstalledModule, StationMetrics, ModuleType } from '../types/station';
import { MODULE_SPECS } from '../data/modules';

export interface Recommendation {
    id: string;
    type: 'critical' | 'warning' | 'efficiency';
    title: string;
    message: string;
    action: string; // e.g. "Add Solar Array"
    impact: string; // e.g. "+50kW Power"
    suggestedModule?: ModuleType; // For quick-action button
}

export function analyzeStation(
    modules: InstalledModule[],
    metrics: StationMetrics,
    financials: { netPresentValue: number, breakEvenMonths: number }
): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // 1. Critical Power Check
    // totalPowerCont is usually Net Power? 
    // Let's check StationMetrics definition logic. 
    // If calculateMetrics sets totalPowerCont as (Generation - Consumption), then < 0 is deficit.
    // Assuming yes.
    if (metrics.totalPowerCont < 0) {
        const deficit = Math.abs(metrics.totalPowerCont);
        const solarOutput = MODULE_SPECS['power'].provides?.power || 0; // 'power' = Solar Array
        const needed = solarOutput > 0 ? Math.ceil(deficit / solarOutput) : 1;

        recommendations.push({
            id: 'power-deficit',
            type: 'critical',
            title: 'Power Deficit Detected',
            message: `Station is consuming ${deficit.toFixed(1)}kW more than it generates. Systems may fail.`,
            action: `Install ${needed}x Solar Arrays`,
            impact: `+${(needed * solarOutput).toFixed(0)}kW Power`,
            suggestedModule: 'power'
        });
    }

    // 2. Financial Viability (NPV)
    if (financials.netPresentValue < 0) {
        recommendations.push({
            id: 'negative-npv',
            type: 'warning',
            title: 'Unprofitable Configuration',
            message: 'Projected 10-year NPV is negative. Increase revenue to cover CAPEX.',
            action: 'Add Manufacturing Lab',
            impact: '+$0.5M/mo Revenue',
            suggestedModule: 'fab'
        });
    }

    // 3. Crew Safety
    // metrics.totalCrew = Required Crew
    // metrics.crewCapacity = Available Beds
    if (metrics.crewCapacity < metrics.totalCrew) {
        const requiredCrew = metrics.totalCrew;
        const capacity = metrics.crewCapacity;

        recommendations.push({
            id: 'crew-shortage',
            type: 'critical',
            title: 'Insufficient Crew Quarters',
            message: `Modules require ${requiredCrew} crew, but capacity is only ${capacity}.`,
            action: 'Add Crew Quarters',
            impact: '+4 Crew Capacity',
            suggestedModule: 'quarters'
        });
    }

    // 4. Efficiency (Empty Bays)
    const emptyBays = 8 - modules.length;
    if (emptyBays > 4 && financials.breakEvenMonths < 0) {
        recommendations.push({
            id: 'utilization-low',
            type: 'efficiency',
            title: 'Low Utilization',
            message: 'Station has significant empty space. Expand operations to maximize ROI.',
            action: 'Add Lab Module',
            impact: '+$0.5M/mo Revenue',
            suggestedModule: 'lab'
        });
    }

    return recommendations;
}
