import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import { motion } from 'framer-motion';

interface DndProviderProps {
    children: ReactNode;
    onDrop: (moduleType: ModuleType, bayId: number) => void;
}

export function DndProvider({ children, onDrop }: DndProviderProps) {
    const [activeId, setActiveId] = useState<ModuleType | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px movement before drag starts
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const moduleType = event.active.id as ModuleType;
        setActiveId(moduleType);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id) {
            const moduleType = active.id as ModuleType;
            const bayId = parseInt(over.id as string, 10);

            if (!isNaN(bayId)) {
                onDrop(moduleType, bayId);
            }
        }

        setActiveId(null);
    };

    const activeSpec = activeId ? MODULE_SPECS[activeId] : null;

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {children}

            <DragOverlay dropAnimation={null}>
                {activeSpec && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.9 }}
                        className="bg-background-panel border-2 border-primary rounded-lg p-4 shadow-2xl shadow-primary/20 pointer-events-none"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl">{activeSpec.icon}</span>
                            <div>
                                <div className="font-display text-sm text-primary">{activeSpec.title}</div>
                                <div className="text-xs text-gray-400">{activeSpec.power_cont}kW • ${(activeSpec.capex / 1_000_000).toFixed(0)}M</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </DragOverlay>
        </DndContext>
    );
}
