import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { ModuleType, InstalledModule } from '../../types/station';
import type { ModuleSpec } from '../../types/station';

interface DroppableBayProps {
    bayId: number;
    installed: InstalledModule | undefined;
    spec: ModuleSpec | null;
    selectedModule: ModuleType | null;
    onClick: () => void;
}

export function DroppableBay({ bayId, installed, spec, selectedModule, onClick }: DroppableBayProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: bayId.toString(),
    });

    return (
        <button
            ref={setNodeRef}
            onClick={onClick}
            className={cn(
                "relative group flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-200",
                "h-24 sm:h-32",
                installed
                    ? "bg-background-surface border-primary/50 hover:border-primary hover:shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                    : "bg-background/50 border-dashed border-white/10 hover:border-white/30 hover:bg-white/5",
                selectedModule && !installed && "ring-2 ring-primary/30 animate-pulse bg-primary/5",
                isOver && !installed && "ring-2 ring-green-400/50 bg-green-400/10 border-green-400/50"
            )}
        >
            <AnimatePresence mode="wait">
                {installed && spec ? (
                    <motion.div
                        key={installed.id}
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-center"
                    >
                        <motion.div
                            className="text-3xl mb-2"
                            whileHover={{ scale: 1.1 }}
                        >
                            {spec.icon}
                        </motion.div>
                        <div className="font-mono text-[10px] uppercase text-gray-400 truncate max-w-[80px]">{spec.title}</div>
                        {installed.status === 'inactive' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg"
                            >
                                <span className="text-red-500 font-bold text-xs uppercase border border-red-500 px-1">Offline</span>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                            "font-mono text-2xl transition-colors",
                            isOver ? "text-green-400/50" : "text-white/10 group-hover:text-white/30"
                        )}
                    >
                        {isOver ? "+" : bayId}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Bay Number Label (Corner) */}
            <div className="absolute top-1 left-2 font-mono text-[10px] text-white/20">{bayId}</div>

            {/* Drop indicator */}
            {isOver && !installed && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 border-2 border-dashed border-green-400 rounded-lg pointer-events-none"
                />
            )}
        </button>
    );
}
