import { useMemo } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { MODULE_SPECS } from '../../data/modules';

interface PowerFlow {
    source: string;
    power: number;
    color: string;
}

interface ConsumptionFlow {
    module: string;
    power: number;
    color: string;
}

export function PowerFlowPanel() {
    const { modules, metrics } = useStationStore();

    // Calculate power sources
    const powerSources = useMemo<PowerFlow[]>(() => {
        const sources: PowerFlow[] = [];

        // Hub always provides base power
        sources.push({
            source: 'Hub Solar',
            power: 60, // Base hub power
            color: '#facc15', // yellow
        });

        // Additional power stations
        const powerModules = modules.filter(m => m.type === 'power' && m.status === 'active');
        powerModules.forEach((m, i) => {
            const provides = MODULE_SPECS[m.type].provides?.power || 0;
            sources.push({
                source: `Power Station ${i + 1}`,
                power: provides,
                color: '#22c55e', // green
            });
        });

        return sources;
    }, [modules]);

    // Calculate power consumers
    const powerConsumers = useMemo<ConsumptionFlow[]>(() => {
        return modules
            .filter(m => m.status === 'active' && MODULE_SPECS[m.type].power_cont > 0)
            .map(m => ({
                module: MODULE_SPECS[m.type].title,
                power: MODULE_SPECS[m.type].power_cont,
                color: MODULE_SPECS[m.type].color.replace('/50', '').replace('bg-', '#').replace('-500', ''),
            }))
            .sort((a, b) => b.power - a.power);
    }, [modules]);

    const totalGeneration = metrics.powerGeneration;
    const totalConsumption = metrics.totalPowerCont;
    const surplus = totalGeneration - totalConsumption;

    if (modules.length === 0) {
        return (
            <div className="bg-background-panel border border-border rounded-lg p-4">
                <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-3 uppercase tracking-wider">
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    Power Flow
                </h3>
                <div className="text-xs text-gray-500 text-center py-4">
                    Add modules to see power distribution
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Power Flow (Sankey)
            </h3>

            {/* Power Flow Visualization */}
            <div className="flex items-center gap-4">
                {/* Sources */}
                <div className="flex-1 space-y-1">
                    <div className="text-[10px] text-gray-500 uppercase mb-2">Generation</div>
                    {powerSources.map((source, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="h-4 rounded-sm flex items-center justify-end px-1"
                                style={{
                                    width: `${Math.max(20, (source.power / totalGeneration) * 100)}%`,
                                    backgroundColor: source.color,
                                }}
                            >
                                <span className="text-[9px] text-black font-mono font-bold">
                                    {source.power}kW
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-400 truncate">{source.source}</span>
                        </div>
                    ))}
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center px-2">
                    <ArrowRight className="w-6 h-6 text-yellow-500" />
                    <div className="text-[10px] text-yellow-400 font-mono">{totalGeneration}kW</div>
                </div>

                {/* Consumers */}
                <div className="flex-1 space-y-1">
                    <div className="text-[10px] text-gray-500 uppercase mb-2">Consumption</div>
                    {powerConsumers.slice(0, 5).map((consumer, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="h-4 rounded-sm flex items-center px-1"
                                style={{
                                    width: `${Math.max(20, (consumer.power / totalGeneration) * 100)}%`,
                                    backgroundColor: getModuleColor(consumer.module),
                                }}
                            >
                                <span className="text-[9px] text-white font-mono font-bold">
                                    {consumer.power}kW
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-400 truncate">{consumer.module}</span>
                        </div>
                    ))}
                    {powerConsumers.length > 5 && (
                        <div className="text-[10px] text-gray-500">+{powerConsumers.length - 5} more</div>
                    )}
                </div>
            </div>

            {/* Surplus/Deficit Indicator */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-400">Power Balance</span>
                <span className={`font-mono text-sm font-bold ${surplus > 20 ? 'text-green-400' :
                        surplus > 0 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                    {surplus > 0 ? '+' : ''}{surplus}kW
                    <span className="text-[10px] text-gray-500 ml-1">
                        {surplus > 20 ? 'surplus' : surplus > 0 ? 'tight' : 'DEFICIT'}
                    </span>
                </span>
            </div>
        </div>
    );
}

function getModuleColor(moduleName: string): string {
    const colorMap: Record<string, string> = {
        'Orbital Data Center': '#a855f7',
        'Manufacturing Lab': '#22c55e',
        'Zero-G Laboratory': '#3b82f6',
        'Crew Quarters': '#6366f1',
        'Health Care': '#ef4444',
        'Hydroponics Bay': '#10b981',
        'Service Station': '#6b7280',
        'Crew Airlock': '#06b6d4',
        'Cargo Bay': '#f97316',
        'Power Station': '#facc15',
    };
    return colorMap[moduleName] || '#6b7280';
}
