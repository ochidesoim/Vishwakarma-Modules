import { useState } from 'react';
import { useStationStore } from '../../store/useStationStore';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import { DroppableBay } from '../dnd/DroppableBay';
import { StationView3D } from '../3d/StationView3D';
import { Box, Grid } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StationGridProps {
    selectedModule: ModuleType | null;
    onSelectBay: (bayId: number) => void;
}

export function StationGrid({ selectedModule, onSelectBay }: StationGridProps) {
    const modules = useStationStore(state => state.modules);
    const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

    // 3x3 Grid (9 bays)
    const bays = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-primary">Station Configuration</h2>

                {/* View Toggle */}
                <div className="flex bg-background-surface rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setViewMode('2d')}
                        className={cn(
                            "p-1.5 rounded transition-colors",
                            viewMode === '2d' ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                        )}
                        title="2D Grid View"
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('3d')}
                        className={cn(
                            "p-1.5 rounded transition-colors",
                            viewMode === '3d' ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                        )}
                        title="3D Visualization"
                    >
                        <Box size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
                {viewMode === '2d' ? (
                    <div className="aspect-square w-full max-w-md mx-auto grid grid-cols-3 gap-3 p-4 bg-background-surface/50 rounded-xl relative">
                        {/* Background Grid Lines (Decoration) */}
                        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl" />

                        {bays.map(bayId => {
                            const installed = modules.find(m => m.bayId === bayId);
                            const spec = installed ? MODULE_SPECS[installed.type] : null;

                            return (
                                <DroppableBay
                                    key={bayId}
                                    bayId={bayId}
                                    installed={installed}
                                    spec={spec}
                                    selectedModule={selectedModule}
                                    onClick={() => onSelectBay(bayId)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
                        <StationView3D />

                        {/* 3D Mode Legend/Hint */}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded border border-white/5 text-[10px] text-gray-400 pointer-events-none">
                            Orbit View
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
