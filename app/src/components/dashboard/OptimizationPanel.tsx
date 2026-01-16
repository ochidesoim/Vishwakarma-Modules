import { useMemo } from 'react';
import { useStationStore } from '../../store/useStationStore';
import { analyzeStation } from '../../lib/optimization';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import type { ModuleType } from '../../types/station';

interface OptimizationPanelProps {
    onApply?: (module: ModuleType) => void;
}

export function OptimizationPanel({ onApply }: OptimizationPanelProps) {
    const { modules, metrics } = useStationStore();

    // Recalculate basic financials for the analyzer
    // (Store includes calculated metrics)
    const financials = {
        netPresentValue: metrics.netPresentValue,
        breakEvenMonths: metrics.breakEvenMonths
    };

    const recommendations = useMemo(() =>
        analyzeStation(modules, metrics, financials),
        [modules, metrics]
    );

    if (recommendations.length === 0) {
        return (
            <div className="bg-background-panel border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="bg-green-500/10 p-3 rounded-full mb-3">
                    <Lightbulb className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-gray-200 font-medium">System Optimized</h3>
                <p className="text-sm text-gray-500 mt-1">No critical issues or obvious improvements detected.</p>
            </div>
        );
    }

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4 h-full flex flex-col">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                AI Advisor
            </h3>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {recommendations.map((rec) => (
                    <div
                        key={rec.id}
                        className={`p-3 rounded border text-left transition-all hover:translate-x-1 ${rec.type === 'critical' ? 'bg-red-500/10 border-red-500/50 hover:bg-red-500/20' :
                                rec.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20' :
                                    'bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-1">
                            <span className={`text-xs font-bold uppercase ${rec.type === 'critical' ? 'text-red-400' :
                                    rec.type === 'warning' ? 'text-yellow-400' :
                                        'text-blue-400'
                                }`}>
                                {rec.type}
                            </span>
                            {rec.type === 'critical' && <AlertTriangle className="w-3 h-3 text-red-500" />}
                        </div>

                        <div className="text-sm font-medium text-gray-200 mb-1">{rec.title}</div>
                        <div className="text-xs text-gray-400 mb-2 leading-relaxed">
                            {rec.message}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                            <div className="text-xs font-mono text-gray-300">
                                Impact: <span className="text-white">{rec.impact}</span>
                            </div>
                            {rec.suggestedModule && onApply && (
                                <button
                                    onClick={() => onApply(rec.suggestedModule!)}
                                    className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors"
                                >
                                    Select Module
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
