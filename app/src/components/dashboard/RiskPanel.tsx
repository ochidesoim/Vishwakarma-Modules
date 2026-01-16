import { useState } from 'react';
import { Shield, Zap, Wrench, AlertTriangle, Play } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { useToast } from '../ui/Toast';
import {
    calculateRiskProfile,
    simulateEvent,
    getRiskLevel,
    RISK_EVENTS,
    type EventType,
    type EventResult
} from '../../lib/risk';
import { motion, AnimatePresence } from 'framer-motion';

export function RiskPanel() {
    const { modules } = useStationStore();
    const { showToast } = useToast();
    const [lastResult, setLastResult] = useState<EventResult | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    const profile = calculateRiskProfile(modules);
    const riskLevel = getRiskLevel(profile.overallDefense);

    const handleSimulate = async (eventType: EventType) => {
        setIsSimulating(true);
        setLastResult(null);

        // Brief delay for dramatic effect
        await new Promise(r => setTimeout(r, 800));

        const result = simulateEvent(eventType, profile);
        setLastResult(result);
        setIsSimulating(false);

        // Show toast notification
        showToast(result.message, result.severity === 'success' ? 'success' :
            result.severity === 'warning' ? 'warning' : 'error');
    };

    const defenseStats = [
        { label: 'Shielding', value: profile.shieldingLevel, icon: Shield, color: 'bg-blue-500' },
        { label: 'Radiation Resist', value: profile.radiationResist, icon: Zap, color: 'bg-yellow-500' },
        { label: 'Repair Capacity', value: profile.repairCapacity, icon: Wrench, color: 'bg-green-500' },
    ];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-bold text-gray-400 flex items-center mb-4 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                Risk Assessment
            </h3>

            {/* Overall Defense Score */}
            <div className="mb-4 p-3 bg-background-surface rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Overall Defense</span>
                    <span className={`text-sm font-mono font-bold ${riskLevel.color}`}>
                        {riskLevel.label}
                    </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.overallDefense}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${profile.overallDefense >= 70 ? 'bg-green-500' :
                                profile.overallDefense >= 40 ? 'bg-yellow-500' :
                                    profile.overallDefense >= 20 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                    />
                </div>
                <div className="text-right text-xs font-mono text-gray-500 mt-1">
                    {profile.overallDefense}%
                </div>
            </div>

            {/* Defense Stats Breakdown */}
            <div className="space-y-2 mb-4">
                {defenseStats.map(stat => (
                    <div key={stat.label} className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 flex items-center">
                            <stat.icon className="w-3 h-3 mr-2" />
                            {stat.label}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${stat.color} rounded-full transition-all`}
                                    style={{ width: `${stat.value}%` }}
                                />
                            </div>
                            <span className="font-mono text-gray-300 w-8 text-right">{stat.value}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Event Simulation Buttons */}
            <div className="border-t border-white/5 pt-4">
                <div className="text-xs text-gray-500 mb-2">Simulate Event</div>
                <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(RISK_EVENTS) as EventType[]).map(eventType => {
                        const event = RISK_EVENTS[eventType];
                        return (
                            <button
                                key={eventType}
                                onClick={() => handleSimulate(eventType)}
                                disabled={isSimulating}
                                className={`
                                    p-2 rounded border text-center transition-all
                                    ${isSimulating
                                        ? 'opacity-50 cursor-not-allowed bg-gray-800 border-gray-700'
                                        : 'bg-background-surface border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10'
                                    }
                                `}
                            >
                                <div className="text-lg mb-1">{event.icon}</div>
                                <div className="text-[10px] text-gray-400 leading-tight">{event.name}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Simulation Result */}
            <AnimatePresence>
                {isSimulating && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center"
                    >
                        <div className="flex items-center justify-center gap-2 text-orange-400">
                            <Play className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-mono">Simulating Event...</span>
                        </div>
                    </motion.div>
                )}

                {lastResult && !isSimulating && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-4 p-3 rounded-lg border ${lastResult.severity === 'success'
                                ? 'bg-green-500/10 border-green-500/30'
                                : lastResult.severity === 'warning'
                                    ? 'bg-yellow-500/10 border-yellow-500/30'
                                    : 'bg-red-500/10 border-red-500/30'
                            }`}
                    >
                        <div className={`text-sm font-bold mb-1 ${lastResult.severity === 'success' ? 'text-green-400' :
                                lastResult.severity === 'warning' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {lastResult.title}
                        </div>
                        <div className="text-xs text-gray-400">
                            {lastResult.message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tip */}
            {modules.length > 0 && profile.overallDefense < 40 && (
                <div className="mt-3 text-[10px] text-gray-500 italic">
                    💡 Tip: Add Repair or Cargo modules to improve defense rating.
                </div>
            )}
        </div>
    );
}
