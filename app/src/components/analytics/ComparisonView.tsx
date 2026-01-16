import { useState, useMemo } from 'react';
import { useStationStore } from '../../store/useStationStore';
import { TrendingUp, TrendingDown, Minus, Scale, Lightbulb } from 'lucide-react';
import { generateTradeOffInsights } from '../../lib/reliability';

export function ComparisonView() {
    const { modules: currentModules, metrics: currentMetrics, savedConfigs } = useStationStore();
    const [selectedConfigId, setSelectedConfigId] = useState<string>('');

    const selectedConfig = useMemo(() =>
        savedConfigs.find(c => c.id === selectedConfigId),
        [selectedConfigId, savedConfigs]
    );

    const compareMetrics = selectedConfig ? selectedConfig.metrics : null;

    // Generate trade-off insights when a config is selected
    const tradeOffInsights = useMemo(() => {
        if (!selectedConfig) return [];

        return generateTradeOffInsights(
            {
                modules: currentModules,
                capex: currentMetrics.totalCapex,
                npv: currentMetrics.netPresentValue,
                monthlyRevenue: currentMetrics.monthlyRevenue,
                powerUsage: currentMetrics.totalPowerCont,
                powerGen: currentMetrics.powerGeneration,
            },
            {
                modules: selectedConfig.modules,
                capex: selectedConfig.metrics.totalCapex,
                npv: selectedConfig.metrics.netPresentValue,
                monthlyRevenue: selectedConfig.metrics.monthlyRevenue,
                powerUsage: selectedConfig.metrics.totalPowerCont,
                powerGen: selectedConfig.metrics.powerGeneration,
            }
        );
    }, [currentModules, currentMetrics, selectedConfig]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }).format(val);

    const formatNumber = (val: number, unit: string) =>
        `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(val)}${unit}`;

    // Helper to render a comparison row
    const ComparisonRow = ({ label, current, compare, unit, inverse = false, isCurrency = false }: {
        label: string,
        current: number,
        compare?: number,
        unit: string,
        inverse?: boolean, // True if Lower is Better (e.g. Cost)
        isCurrency?: boolean
    }) => {
        if (compare === undefined || compare === null) return (
            <tr className="border-b border-gray-800 last:border-0 hover:bg-gray-800/20">
                <td className="py-3 text-gray-400">{label}</td>
                <td className="py-3 text-right font-mono text-gray-200">
                    {isCurrency ? formatCurrency(current) : formatNumber(current, unit)}
                </td>
                <td className="py-3 text-center text-gray-600">-</td>
                <td className="py-3 text-right text-gray-600">-</td>
            </tr>
        );

        const delta = current - compare;
        const percent = compare !== 0 ? (delta / Math.abs(compare)) * 100 : 0;

        let color = 'text-gray-400';
        let Icon = Minus;

        if (delta > 0) {
            color = inverse ? 'text-red-400' : 'text-green-400';
            Icon = TrendingUp;
        } else if (delta < 0) {
            color = inverse ? 'text-green-400' : 'text-red-400';
            Icon = TrendingDown;
        }

        return (
            <tr className="border-b border-gray-800 last:border-0 hover:bg-gray-800/20 transition-colors">
                <td className="py-3 text-gray-300">{label}</td>

                {/* Current */}
                <td className="py-3 text-right font-mono font-medium text-white bg-blue-900/10">
                    {isCurrency ? formatCurrency(current) : formatNumber(current, unit)}
                </td>

                {/* Compare Target */}
                <td className="py-3 text-right font-mono text-gray-400">
                    {isCurrency ? formatCurrency(compare) : formatNumber(compare, unit)}
                </td>

                {/* Delta */}
                <td className={`py-3 text-right font-mono flex items-center justify-end gap-1 ${color}`}>
                    {delta !== 0 && <Icon className="w-3 h-3" />}
                    {Math.abs(percent).toFixed(1)}%
                </td>
            </tr>
        );
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <Scale className="w-6 h-6 text-purple-400" />
                    Comparison Analysis
                </h2>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Compare Current vs.</span>
                    <select
                        value={selectedConfigId}
                        onChange={(e) => setSelectedConfigId(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded px-3 py-1.5 focus:outline-none focus:border-purple-500"
                    >
                        <option value="">-- Select Snapshot --</option>
                        {savedConfigs.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({new Date(c.date).toLocaleDateString()})</option>
                        ))}
                    </select>
                </div>
            </div>

            {!selectedConfig ? (
                <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-lg">
                    <Scale className="w-12 h-12 mb-3 opacity-20" />
                    <p>Select a saved snapshot to compare against the current live station.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Trade-Off Insights (U-06C) */}
                    {tradeOffInsights.length > 0 && (
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-purple-400 mb-3">
                                <Lightbulb className="w-4 h-4" />
                                <span className="text-sm font-medium uppercase tracking-wider">Trade-Off Insights</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tradeOffInsights.map((insight, i) => (
                                    <div key={i} className="bg-gray-900/50 rounded p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{insight.icon}</span>
                                            <span className="text-sm font-medium text-gray-200">{insight.title}</span>
                                        </div>
                                        <div className="text-xs text-gray-400">{insight.comparison}</div>
                                        {insight.recommendation && (
                                            <div className="text-[10px] text-purple-400 mt-1 italic">
                                                💡 {insight.recommendation}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-700">
                                    <th className="text-left py-3 font-medium">Metric</th>
                                    <th className="text-right py-3 font-medium text-blue-400">Current Build</th>
                                    <th className="text-right py-3 font-medium text-purple-400">{selectedConfig.name}</th>
                                    <th className="text-right py-3 font-medium">Delta</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {/* Financials */}
                                <ComparisonRow label="Total CAPEX" current={currentMetrics.totalCapex} compare={compareMetrics?.totalCapex} unit="" isCurrency inverse />
                                <ComparisonRow label="Monthly Revenue" current={currentMetrics.monthlyRevenue} compare={compareMetrics?.monthlyRevenue} unit="" isCurrency />
                                <ComparisonRow label="10-Year NPV" current={currentMetrics.netPresentValue} compare={compareMetrics?.netPresentValue} unit="" isCurrency />
                                <ComparisonRow label="Monthly Ops Cost" current={currentMetrics.monthlyOpex} compare={compareMetrics?.monthlyOpex} unit="" isCurrency inverse />

                                {/* Technical */}
                                <tr className="bg-gray-800/30"><td colSpan={4} className="py-2 text-xs font-bold text-gray-500 uppercase pl-2">Technical</td></tr>

                                <ComparisonRow label="Mass" current={currentMetrics.totalMass} compare={compareMetrics?.totalMass} unit="t" inverse />
                                <ComparisonRow label="Power (Cont)" current={currentMetrics.totalPowerCont} compare={compareMetrics?.totalPowerCont} unit=" kW" inverse />
                                <ComparisonRow label="Crew Capacity" current={currentMetrics.crewCapacity} compare={compareMetrics?.crewCapacity} unit=" pax" />
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

