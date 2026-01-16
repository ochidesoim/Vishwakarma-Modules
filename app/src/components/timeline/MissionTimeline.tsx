import { Calendar, CheckCircle2, Circle, Rocket, Fuel, Timer } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { calculateBreakEven } from '../../lib/financials';
import { calculateStationKeeping, getLaunchWindows } from '../../lib/physics';

export function MissionTimeline() {
    const { metrics } = useStationStore();
    const modulesCount = useStationStore.getState().modules.length;

    // Station Keeping Data
    const stationKeeping = calculateStationKeeping(metrics.totalMass);
    const launchWindows = getLaunchWindows();

    // Phase Logic
    const phases = [
        {
            year: 'Y1-3',
            title: 'Design & Development',
            desc: 'Core hub engineering, regulatory approvals ($500M)',
            status: modulesCount === 0 ? 'current' : 'completed'
        },
        {
            year: 'Y4',
            title: 'Launch Core Hub',
            desc: 'Falcon Heavy launch (~$150M)',
            status: modulesCount === 0 ? 'upcoming' : modulesCount < 2 ? 'current' : 'completed'
        },
        {
            year: 'Y5-7',
            title: 'Module Deployment',
            desc: 'Launch priority modules, first customers',
            status: modulesCount < 2 ? 'upcoming' : modulesCount < 6 ? 'current' : 'completed'
        },
        {
            year: 'Y8+',
            title: 'Full Operations',
            desc: 'Profitable operations, expansion',
            status: modulesCount < 6 ? 'upcoming' : 'current'
        }
    ];

    const breakEven = calculateBreakEven(metrics.totalCapex, metrics.monthlyRevenue, metrics.monthlyOpex);
    const breakEvenDisplay = breakEven > 0
        ? `Year ${2024 + Math.ceil(breakEven / 12)}`
        : 'N/A';

    const formatCurrency = (val: number) => {
        if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
        if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
        return `$${val}`;
    };

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-6 text-primary flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Mission Timeline
            </h2>

            <div className="relative border-l border-white/10 ml-3 space-y-6 pb-4">
                {phases.map((phase, idx) => (
                    <div key={idx} className="relative pl-6">
                        <div className={`absolute -left-[5px] top-1 bg-background-panel ${phase.status === 'completed' ? 'text-status-success' :
                            phase.status === 'current' ? 'text-primary' : 'text-gray-600'
                            }`}>
                            {phase.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3 fill-current" />}
                        </div>

                        <div className="flex flex-col">
                            <span className={`text-xs font-mono mb-1 ${phase.status === 'current' ? 'text-primary' : 'text-gray-500'
                                }`}>
                                {phase.year}
                            </span>
                            <span className={`font-medium ${phase.status === 'completed' ? 'text-gray-400' :
                                phase.status === 'current' ? 'text-white' : 'text-gray-600'
                                }`}>
                                {phase.title}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                                {phase.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Launch Windows (U-02B) */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Rocket className="w-3 h-3" />
                    <span className="uppercase tracking-wider">Launch Windows</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">Next Window</div>
                        <div className="font-mono text-sm text-primary">{launchWindows.nextWindow}</div>
                    </div>
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">Per Quarter</div>
                        <div className="font-mono text-sm text-gray-300">{launchWindows.windowsPerQuarter} windows</div>
                    </div>
                </div>
            </div>

            {/* Station Keeping (U-02D) */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Fuel className="w-3 h-3" />
                    <span className="uppercase tracking-wider">Station Keeping</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">Propellant/Month</div>
                        <div className="font-mono text-sm text-orange-400">{stationKeeping.propellantPerMonth} kg</div>
                    </div>
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">Reboost Frequency</div>
                        <div className="font-mono text-sm text-gray-300">{stationKeeping.reboostFrequency} days</div>
                    </div>
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">10-Year Fuel Mass</div>
                        <div className="font-mono text-sm text-gray-300">{(stationKeeping.tenYearFuelMass / 1000).toFixed(1)}t</div>
                    </div>
                    <div className="bg-background-surface p-2 rounded border border-white/5">
                        <div className="text-[10px] text-gray-500">10-Year Fuel Cost</div>
                        <div className="font-mono text-sm text-yellow-400">{formatCurrency(stationKeeping.tenYearFuelCost)}</div>
                    </div>
                </div>
            </div>

            {/* Dynamic Forecast */}
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        Proj. Break-Even
                    </div>
                    <div className={`text-sm font-mono ${breakEven > 0 ? 'text-status-success' : 'text-status-critical'}`}>
                        {breakEvenDisplay}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">Exit Strategy</div>
                    <div className="text-sm font-mono text-gray-400">IPO Year 12</div>
                </div>
            </div>
        </div>
    );
}

