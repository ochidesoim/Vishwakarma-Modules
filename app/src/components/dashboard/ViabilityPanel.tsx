import React, { useMemo } from 'react';
import { useStationStore } from '../../store/useStationStore';
import { analyzeViability } from '../../lib/viability';
import { calculateAnnualOPEX } from '../../lib/opex';
import { CheckCircle, AlertTriangle, XCircle, DollarSign, Clock, TrendingUp } from 'lucide-react';

export const ViabilityPanel: React.FC = () => {
    const { metrics, financialParameters, modules } = useStationStore();

    const viability = useMemo(() => {
        try {
            const annualRevenue = metrics.monthlyRevenue * 12 * financialParameters.revenueMultiplier;
            const opex = calculateAnnualOPEX(
                metrics.totalInvestment || 0, // Fallback
                metrics.crewCapacity > 0,
                metrics.crewCapacity || 0
            );

            return analyzeViability(
                metrics.totalCapex || 0,
                metrics.totalLaunchCost || 0,
                annualRevenue || 0,
                opex.annualTotal || 0
            );
        } catch (e) {
            console.error("Viability Analysis Failed:", e);
            return null;
        }
    }, [metrics, financialParameters, modules]);

    if (!viability) return null;

    const verdictConfig = {
        viable: {
            title: 'VIABLE',
            color: 'text-green-400',
            bg: 'bg-green-900/20',
            border: 'border-green-500/30',
            icon: CheckCircle
        },
        marginal: {
            title: 'MARGINAL',
            color: 'text-yellow-400',
            bg: 'bg-yellow-900/20',
            border: 'border-yellow-500/30',
            icon: AlertTriangle
        },
        not_viable: {
            title: 'NOT VIABLE',
            color: 'text-red-400',
            bg: 'bg-red-900/20',
            border: 'border-red-500/30',
            icon: XCircle
        }
    };

    const config = verdictConfig[viability.verdict];
    if (!config) {
        console.error("Invalid verdict:", viability.verdict);
        return null; // Safety fallback
    }
    const Icon = config.icon;

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>💡 Viability Check</span>
            </h2>

            {/* Verdict Banner */}
            <div className={`flex items-center justify-between p-4 rounded-lg border mb-6 ${config.bg} ${config.border}`}>
                <div className="flex items-center space-x-4">
                    <Icon className={`w-8 h-8 ${config.color}`} />
                    <div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide font-semibold">Investment Verdict</div>
                        <div className={`text-2xl font-bold ${config.color}`}>{config.title}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-400">Annual P&L</div>
                    <div className={`text-xl font-mono ${viability.annualProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {viability.annualProfitLoss >= 0 ? '+' : ''}
                        ${formatMoney(viability.annualProfitLoss)}
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 p-3 rounded">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Payback Period</span>
                    </div>
                    <div className="text-lg font-semibold">
                        {typeof viability.paybackYears === 'number'
                            ? `${viability.paybackYears.toFixed(1)} yrs`
                            : 'Never'}
                    </div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Runway/ROI</span>
                    </div>
                    <div className="text-lg font-semibold">
                        {viability.roi.toFixed(1)}%
                    </div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs">Investment</span>
                    </div>
                    <div className="text-lg font-semibold">
                        ${formatMoney(useStationStore.getState().metrics.totalInvestment)}
                    </div>
                </div>
            </div>

            {/* Analysis & Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Analysis</h3>
                    <ul className="space-y-1">
                        {viability.reasons.map((reason, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start space-x-2">
                                <span className="text-gray-600 mt-1">•</span>
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-2">Suggestions</h3>
                    <ul className="space-y-1">
                        {viability.suggestions.map((suggestion, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">→</span>
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

function formatMoney(value: number): string {
    if (Math.abs(value) >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toString();
}
