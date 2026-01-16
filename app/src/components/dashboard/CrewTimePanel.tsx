import { useMemo } from 'react';
import { Users, Clock } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { MODULE_SPECS } from '../../data/modules';

interface CrewAllocation {
    module: string;
    crew: number;
    percentage: number;
    activities: string[];
    color: string;
}

// Crew activities by module type
const MODULE_ACTIVITIES: Record<string, string[]> = {
    lab: ['Research', 'Experiments', 'Data Analysis'],
    fab: ['Monitoring', 'Quality Control', 'Maintenance'],
    hydro: ['Plant Care', 'Harvesting', 'System Checks'],
    health: ['Patient Care', 'Research', 'Equipment Maint.'],
    quarters: ['Rest', 'Exercise', 'Personal Time'],
    hub: ['Command', 'Communications', 'System Ops'],
    repair: ['EVA Prep', 'Robotic Ops', 'Logistics'],
    airlock: ['EVA Support', 'Suit Checks'],
    cargo: ['Inventory', 'Loading/Unloading'],
    data: ['Monitoring', 'Troubleshooting'],
    power: ['Inspections', 'Maintenance'],
};

export function CrewTimePanel() {
    const { modules, metrics } = useStationStore();

    const crewAllocations = useMemo<CrewAllocation[]>(() => {
        const crewModules = modules
            .filter(m => m.status === 'active' && MODULE_SPECS[m.type].crew > 0);

        const totalCrew = crewModules.reduce((sum, m) => sum + MODULE_SPECS[m.type].crew, 0);

        return crewModules.map(m => {
            const spec = MODULE_SPECS[m.type];
            return {
                module: spec.title,
                crew: spec.crew,
                percentage: totalCrew > 0 ? (spec.crew / totalCrew) * 100 : 0,
                activities: MODULE_ACTIVITIES[m.type] || ['Operations'],
                color: getModuleColor(m.type),
            };
        }).sort((a, b) => b.crew - a.crew);
    }, [modules]);

    const totalCrewRequired = crewAllocations.reduce((sum, a) => sum + a.crew, 0);
    const crewCapacity = metrics.crewCapacity;
    const crewUtilization = crewCapacity > 0 ? (totalCrewRequired / crewCapacity) * 100 : 0;

    if (modules.length === 0 || crewAllocations.length === 0) {
        return (
            <div className="bg-background-panel border border-border rounded-lg p-4">
                <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-3 uppercase tracking-wider">
                    <Users className="w-4 h-4 mr-2 text-indigo-500" />
                    Crew Time Allocation
                </h3>
                <div className="text-xs text-gray-500 text-center py-4">
                    Add crew-operated modules to see allocation
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <Users className="w-4 h-4 mr-2 text-indigo-500" />
                Crew Time Allocation
            </h3>

            {/* Pie Chart (simplified as stacked bar) */}
            <div className="mb-4">
                <div className="h-6 flex rounded-lg overflow-hidden">
                    {crewAllocations.map((alloc, i) => (
                        <div
                            key={i}
                            className="h-full flex items-center justify-center transition-all hover:brightness-110"
                            style={{
                                width: `${alloc.percentage}%`,
                                backgroundColor: alloc.color,
                                minWidth: alloc.percentage > 5 ? 'auto' : '8px',
                            }}
                            title={`${alloc.module}: ${alloc.crew} crew (${alloc.percentage.toFixed(0)}%)`}
                        >
                            {alloc.percentage > 15 && (
                                <span className="text-[9px] text-white font-bold">{alloc.percentage.toFixed(0)}%</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend & Activities */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
                {crewAllocations.map((alloc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                        <div
                            className="w-3 h-3 rounded flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: alloc.color }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 truncate">{alloc.module}</span>
                                <span className="font-mono text-gray-400">{alloc.crew} crew</span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Clock className="w-2 h-2 text-gray-600" />
                                <span className="text-[10px] text-gray-500 truncate">
                                    {alloc.activities.slice(0, 2).join(', ')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Crew Status */}
            <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Crew Staffing</span>
                    <span className={`font-mono text-xs ${crewUtilization > 100 ? 'text-red-400' :
                            crewUtilization > 80 ? 'text-orange-400' :
                                crewUtilization > 50 ? 'text-green-400' : 'text-blue-400'
                        }`}>
                        {totalCrewRequired}/{crewCapacity} positions
                    </span>
                </div>
                {crewCapacity === 0 && totalCrewRequired > 0 && (
                    <div className="text-[10px] text-red-400 mt-1">
                        ⚠️ Add Crew Quarters to house personnel
                    </div>
                )}
            </div>
        </div>
    );
}

function getModuleColor(type: string): string {
    const colorMap: Record<string, string> = {
        lab: '#3b82f6',
        fab: '#22c55e',
        data: '#a855f7',
        hydro: '#10b981',
        repair: '#6b7280',
        health: '#ef4444',
        quarters: '#6366f1',
        hub: '#6b7280',
        airlock: '#06b6d4',
        cargo: '#f97316',
        power: '#facc15',
    };
    return colorMap[type] || '#6b7280';
}
