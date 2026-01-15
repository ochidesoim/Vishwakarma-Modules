import { useStationStore } from '../../store/useStationStore';
import { Calendar, Rocket, Weight, DollarSign } from 'lucide-react';
import { MODULE_SPECS } from '../../data/modules';

export function MissionTimeline() {
    const modules = useStationStore(state => state.modules);

    // Sort by Bay ID as proxy for install order
    const sortedModules = [...modules].sort((a, b) => a.bayId - b.bayId);

    // Generate Events with Cumulative Data
    let cumulativeMass = 25000; // Hub
    let cumulativeCost = 500_000_000; // Hub

    const events = [
        {
            month: 0,
            title: 'Core Hub Launch',
            mass: 25000,
            cost: 500_000_000,
            cumMass: 25000,
            cumCost: 500_000_000,
            type: 'hub',
            revenue: 0
        },
        ...sortedModules.map((m, i) => {
            const spec = MODULE_SPECS[m.type];
            cumulativeMass += spec.mass;
            cumulativeCost += spec.capex;

            return {
                month: (i + 1) * 3, // Launch every 3 months
                title: `${spec.title} Launch`,
                mass: spec.mass,
                cost: spec.capex,
                cumMass: cumulativeMass,
                cumCost: cumulativeCost,
                type: m.type,
                revenue: spec.revenue
            };
        })
    ];

    const formatCurrency = (val: number) => {
        if (Math.abs(val) >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(1)}B`;
        return `$${(val / 1_000_000).toFixed(0)}M`;
    };

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-6 text-primary flex items-center justify-between">
                <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Mission Timeline
                </div>
                <span className="text-xs font-mono text-gray-500">T+ 10 Years</span>
            </h2>

            <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-2">
                {events.map((event, i) => (
                    <div key={i} className="pl-6 relative group">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-colors ${event.type === 'hub' ? 'bg-primary border-primary' : 'bg-background-surface border-gray-600 group-hover:border-primary'}`} />

                        <div className="flex flex-col space-y-2">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-mono text-xs text-primary mb-1 block">Month {event.month}</span>
                                    <span className="font-display text-base text-white">{event.title}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500">Cumulative Cost</div>
                                    <div className="font-mono text-sm text-white">{formatCurrency(event.cumCost)}</div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white/5 rounded p-2 border border-white/5">
                                <div className="flex items-center text-gray-400">
                                    <Rocket className="w-3 h-3 mr-2" />
                                    Launch Mass: {(event.mass / 1000).toFixed(1)}t
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Weight className="w-3 h-3 mr-2" />
                                    Total Mass: {(event.cumMass / 1000).toFixed(1)}t
                                </div>
                                {event.revenue > 0 && (
                                    <div className="col-span-2 flex items-center text-status-success mt-1 pt-1 border-t border-white/5">
                                        <DollarSign className="w-3 h-3 mr-2" />
                                        Revenue Stream Active: +{formatCurrency(event.revenue)}/mo
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {events.length === 1 && (
                    <div className="pl-6 pt-4 text-sm text-gray-600 italic border-t border-dashed border-white/10">
                        Pending module manifest... Install modules to generate launch schedule.
                    </div>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-500 font-mono text-center">
                Total Deployment Time: {events.length > 1 ? events[events.length - 1].month : 0} Months
            </div>
        </div>
    );
}
