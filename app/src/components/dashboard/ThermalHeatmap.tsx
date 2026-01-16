import { useMemo } from 'react';
import { Thermometer } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { MODULE_SPECS } from '../../data/modules';

interface ThermalData {
    name: string;
    thermal: number;
    percent: number;
}

export function ThermalHeatmap() {
    const { modules, metrics } = useStationStore();

    const thermalData = useMemo<ThermalData[]>(() => {
        return modules
            .filter(m => m.status === 'active')
            .map(m => {
                const spec = MODULE_SPECS[m.type];
                return {
                    name: spec.title,
                    thermal: spec.thermal,
                    percent: metrics.thermalCapacity > 0
                        ? (spec.thermal / metrics.thermalCapacity) * 100
                        : 0,
                };
            })
            .sort((a, b) => b.thermal - a.thermal);
    }, [modules, metrics.thermalCapacity]);

    const totalThermal = metrics.totalThermal;
    const thermalCapacity = metrics.thermalCapacity;
    const utilization = thermalCapacity > 0 ? (totalThermal / thermalCapacity) * 100 : 0;

    if (modules.length === 0) {
        return (
            <div className="bg-background-panel border border-border rounded-lg p-4">
                <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-3 uppercase tracking-wider">
                    <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
                    Thermal Heatmap
                </h3>
                <div className="text-xs text-gray-500 text-center py-4">
                    Add modules to see thermal distribution
                </div>
            </div>
        );
    }

    // Get color based on heat intensity
    const getHeatColor = (percent: number): string => {
        if (percent > 25) return 'bg-red-500';
        if (percent > 15) return 'bg-orange-500';
        if (percent > 5) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
                Thermal Heatmap
            </h3>

            {/* Heatmap List - Optimized for clarity */}
            <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {thermalData.map((data, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between group"
                    >
                        <div className="text-xs text-gray-400 w-1/3 truncate" title={data.name}>{data.name}</div>
                        <div className="flex-1 mx-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${getHeatColor(data.percent)}`}
                                style={{ width: `${Math.min(100, data.percent)}%` }}
                            />
                        </div>
                        <div className="text-xs font-mono font-bold text-gray-300 w-12 text-right">
                            {data.thermal}k
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[10px] mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span className="text-gray-500">Cool</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded" />
                    <span className="text-gray-500">Warm</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded" />
                    <span className="text-gray-500">Hot</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    <span className="text-gray-500">Critical</span>
                </div>
            </div>

            {/* Utilization Bar */}
            <div className="pt-3 border-t border-white/5">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Cooling Utilization</span>
                    <span className={`font-mono text-xs ${utilization > 90 ? 'text-red-400' :
                        utilization > 70 ? 'text-orange-400' :
                            utilization > 50 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                        {utilization.toFixed(0)}%
                    </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${utilization > 90 ? 'bg-red-500' :
                            utilization > 70 ? 'bg-orange-500' :
                                utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(100, utilization)}%` }}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>{totalThermal}kW load</span>
                    <span>{thermalCapacity}kW capacity</span>
                </div>
            </div>
        </div>
    );
}
