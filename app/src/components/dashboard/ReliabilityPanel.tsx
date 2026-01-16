import { useMemo } from 'react';
import { Shield, AlertTriangle, Zap, TrendingDown } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import {
    calculateMTBFData,
    calculateStationReliability,
    calculateSolarDegradation,
    analyzeRedundancy,
    type MTBFData,
    type RedundancyIssue,
} from '../../lib/reliability';

export function ReliabilityPanel() {
    const { modules, metrics } = useStationStore();

    // Calculate reliability data
    const mtbfData = useMemo(() => calculateMTBFData(modules), [modules]);
    const stationReliability = useMemo(() => calculateStationReliability(modules), [modules]);
    const redundancyIssues = useMemo(() => analyzeRedundancy(modules), [modules]);
    const solarDegradation = useMemo(
        () => calculateSolarDegradation(metrics.powerGeneration),
        [metrics.powerGeneration]
    );

    const reliabilityPercent = Math.round(stationReliability * 100);
    const criticalIssues = redundancyIssues.filter(i => i.severity === 'critical').length;
    const warningIssues = redundancyIssues.filter(i => i.severity === 'warning').length;

    // Year 10 power estimate
    const year10Power = solarDegradation[10]?.powerCapacity || 0;
    const powerLoss = metrics.powerGeneration - year10Power;

    if (modules.length === 0) {
        return (
            <div className="bg-background-panel border border-border rounded-lg p-4">
                <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-3 uppercase tracking-wider">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    Reliability Analysis
                </h3>
                <div className="text-xs text-gray-500 text-center py-4">
                    Add modules to see reliability data
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <Shield className="w-4 h-4 mr-2 text-blue-500" />
                Reliability Analysis
            </h3>

            {/* Overall Reliability Score */}
            <div className="mb-4 p-3 bg-background-surface rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">10-Year Survival Probability</span>
                    <span className={`text-sm font-mono font-bold ${reliabilityPercent >= 70 ? 'text-green-400' :
                            reliabilityPercent >= 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                        {reliabilityPercent}%
                    </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${reliabilityPercent >= 70 ? 'bg-green-500' :
                                reliabilityPercent >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                        style={{ width: `${reliabilityPercent}%` }}
                    />
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-background-surface p-2 rounded border border-white/5 text-center">
                    <div className="text-[10px] text-gray-500">Modules</div>
                    <div className="font-mono text-sm text-gray-300">{modules.length}</div>
                </div>
                <div className="bg-background-surface p-2 rounded border border-white/5 text-center">
                    <div className="text-[10px] text-gray-500">Issues</div>
                    <div className={`font-mono text-sm ${criticalIssues > 0 ? 'text-red-400' :
                            warningIssues > 0 ? 'text-orange-400' : 'text-green-400'
                        }`}>
                        {criticalIssues + warningIssues}
                    </div>
                </div>
                <div className="bg-background-surface p-2 rounded border border-white/5 text-center">
                    <div className="text-[10px] text-gray-500">Y10 Power</div>
                    <div className="font-mono text-sm text-orange-400">-{powerLoss.toFixed(0)}kW</div>
                </div>
            </div>

            {/* Redundancy Issues */}
            {redundancyIssues.length > 0 && (
                <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Redundancy Issues
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {redundancyIssues.slice(0, 3).map((issue, i) => (
                            <RedundancyIssueCard key={i} issue={issue} />
                        ))}
                        {redundancyIssues.length > 3 && (
                            <div className="text-[10px] text-gray-500 text-center">
                                +{redundancyIssues.length - 3} more issues
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MTBF Table (top 3 least reliable) */}
            <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    Lowest MTBF (Most Likely to Fail)
                </div>
                <div className="space-y-1">
                    {mtbfData.slice(0, 3).map((data, i) => (
                        <MTBFRow key={i} data={data} />
                    ))}
                </div>
            </div>

            {/* Solar Degradation */}
            <div>
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Solar Degradation (2.5%/yr)
                </div>
                <div className="flex items-center gap-1">
                    {[0, 2, 4, 6, 8, 10].map(year => {
                        const data = solarDegradation[year];
                        const opacity = 1 - (data?.degradationPercent || 0) / 30;
                        return (
                            <div
                                key={year}
                                className="flex-1 text-center"
                            >
                                <div
                                    className="h-6 rounded mb-1"
                                    style={{
                                        backgroundColor: `rgba(250, 204, 21, ${Math.max(0.2, opacity)})`,
                                    }}
                                />
                                <div className="text-[8px] text-gray-500">Y{year}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-[10px] text-gray-500 text-center mt-1">
                    Year 10: {year10Power.toFixed(0)}kW ({solarDegradation[10]?.degradationPercent}% loss)
                </div>
            </div>
        </div>
    );
}

function RedundancyIssueCard({ issue }: { issue: RedundancyIssue }) {
    return (
        <div className={`p-2 rounded border text-xs ${issue.severity === 'critical'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-orange-500/10 border-orange-500/30'
            }`}>
            <div className={`font-medium mb-0.5 ${issue.severity === 'critical' ? 'text-red-400' : 'text-orange-400'
                }`}>
                {issue.module}
            </div>
            <div className="text-gray-400 text-[10px]">{issue.message}</div>
        </div>
    );
}

function MTBFRow({ data }: { data: MTBFData }) {
    return (
        <div className="flex items-center justify-between text-xs p-1.5 bg-background-surface rounded">
            <span className="text-gray-400 truncate flex-1">{data.moduleName}</span>
            <span className={`font-mono ml-2 ${data.criticality === 'critical' ? 'text-red-400' :
                    data.criticality === 'high' ? 'text-orange-400' :
                        data.criticality === 'medium' ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                {data.mtbfYears}yr
            </span>
            <span className="text-gray-500 ml-2 text-[10px]">
                {(data.failureProbability10Yr * 100).toFixed(0)}% fail
            </span>
        </div>
    );
}
