import { useStationStore } from '../../store/useStationStore';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Zap, Thermometer, User, Layers } from 'lucide-react';

export function SystemsStatus() {
    const metrics = useStationStore(state => state.metrics);

    const stats = [
        {
            label: 'Power (Continuous)',
            value: metrics.totalPowerCont,
            max: metrics.powerGeneration,
            icon: Zap,
            color: 'bg-yellow-500',
            unit: 'kW',
            warning: metrics.totalPowerCont > metrics.powerGeneration * 0.9
        },
        {
            label: 'Power (Peak)',
            value: metrics.totalPowerPeak,
            max: metrics.powerGeneration * 1.2, // Battery buffer?
            icon: Zap,
            color: 'bg-orange-500',
            unit: 'kW',
            warning: metrics.totalPowerPeak > metrics.powerGeneration
        },
        {
            label: 'Thermal Rejection',
            value: metrics.totalThermal,
            max: metrics.thermalCapacity,
            icon: Thermometer,
            color: 'bg-red-500',
            unit: 'kW',
            warning: metrics.totalThermal > metrics.thermalCapacity * 0.8
        },
        {
            label: 'Crew Capacity',
            value: metrics.totalCrew,
            max: metrics.crewCapacity,
            icon: User,
            color: 'bg-cyan-500',
            unit: 'Ppl',
            warning: metrics.totalCrew > metrics.crewCapacity
        }
    ];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-6 text-primary flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Systems Status
            </h2>

            <div className="space-y-6">
                {stats.map((stat) => {
                    const percentage = Math.min((stat.value / stat.max) * 100, 100);

                    return (
                        <div key={stat.label}>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-gray-400 flex items-center">
                                    <stat.icon className="w-3 h-3 mr-2" />
                                    {stat.label}
                                </span>
                                <span className={cn(
                                    "font-mono text-sm",
                                    stat.warning ? "text-status-critical animate-pulse" : "text-gray-200"
                                )}>
                                    {stat.max === 0 ? '--' : stat.value.toFixed(1)} <span className="text-gray-500">/ {stat.max === 0 ? '--' : stat.max.toFixed(1)} {stat.unit}</span>
                                </span>
                            </div>

                            <div className="h-2 bg-background-surface rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={cn("h-full rounded-full", stat.color, stat.warning && "bg-status-critical")}
                                />
                            </div>
                        </div>
                    );
                })}

                <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background-surface p-3 rounded border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Total Mass</div>
                        <div className="font-mono text-lg text-white">{(metrics.totalMass / 1000).toFixed(1)} <span className="text-xs text-gray-500">tons</span></div>
                    </div>
                    <div className="bg-background-surface p-3 rounded border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Volume</div>
                        <div className="font-mono text-lg text-white">{metrics.totalVolume} <span className="text-xs text-gray-500">m³</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
