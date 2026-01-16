/**
 * Viability Analysis Logic
 * 
 * Determines if a station design is economically viable based on
 * CAPEX, launch costs, revenue, and OPEX.
 */

// import { formatMoney } from './warnings'; // Removed to avoid circular dependency

function formatMoney(value: number): string {
    if (value === undefined || value === null || isNaN(value)) return '0';
    if (Math.abs(value) >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toString();
}

export type ViabilityVerdict = 'viable' | 'marginal' | 'not_viable';

export interface ViabilityResult {
    verdict: ViabilityVerdict;
    annualProfitLoss: number;
    paybackYears: number | 'never';
    roi: number; // Return on Investment %
    reasons: string[];
    suggestions: string[];
}

/**
 * Analyze station viability
 */
export function analyzeViability(
    capex: number,
    launchCost: number,
    annualRevenue: number,
    annualOpex: number
): ViabilityResult {
    const totalInvestment = capex + launchCost;
    const annualCashFlow = annualRevenue - annualOpex;
    const roi = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;

    let verdict: ViabilityVerdict;
    const reasons: string[] = [];
    const suggestions: string[] = [];

    // Calculate payback period
    let paybackYears: number | 'never' = 'never';
    if (annualCashFlow > 0) {
        paybackYears = totalInvestment / annualCashFlow;
    }

    // Determine verdict
    if (annualCashFlow < 0) {
        verdict = 'not_viable';
        reasons.push('Negative cash flow (losing money annually)');
        reasons.push(`OPEX ($${formatMoney(annualOpex)}) exceeds Revenue ($${formatMoney(annualRevenue)})`);

        suggestions.push('Add high-revenue modules (Manufacturing, Service Station)');
        suggestions.push('Reduce crew size (major OPEX driver)');
        suggestions.push('Check launch costs contribution to total investment');
    } else if (paybackYears === 'never' || paybackYears > 15) {
        verdict = 'marginal';
        reasons.push(`Long payback period (${typeof paybackYears === 'number' ? paybackYears.toFixed(1) : 'Infinite'} years)`);
        reasons.push('ROI is below market standards for space infrastructure');

        suggestions.push('Optimize module mix for better revenue/mass ratio');
        suggestions.push('Consider staged deployment to reduce initial CAPEX');
    } else {
        verdict = 'viable';
        reasons.push(`Healthy payback period (${paybackYears.toFixed(1)} years)`);
        reasons.push('Positive cash flow with sustainable margins');
    }

    // Additional granular reasons
    if (launchCost > capex * 0.4) {
        reasons.push('Launch costs are very high (>40% of investment)');
        suggestions.push('Use more mass-efficient modules or cheaper launch provider');
    }

    return {
        verdict,
        annualProfitLoss: annualCashFlow,
        paybackYears,
        roi,
        reasons,
        suggestions
    };
}
