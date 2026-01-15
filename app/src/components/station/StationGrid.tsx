import { useStationStore } from '../../store/useStationStore';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import { DroppableBay } from '../dnd/DroppableBay';
import { StationView3D } from '../3d/StationView3D';

interface StationGridProps {
    selectedModule: ModuleType | null;
    onSelectBay: (bayId: number) => void;
}

export function StationGrid({ selectedModule, onSelectBay }: StationGridProps) {
    const modules = useStationStore(state => state.modules);

    // 3x3 Grid
    const bays = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-primary">Station Configuration</h2>
                <div className="text-sm text-gray-500">Dual View Mode</div>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                {/* 2D Grid - Top (Centered) */}
                <div className="flex-shrink-0 flex items-center justify-center p-4 bg-background-surface/50 rounded-xl border border-white/5">
                    <div className="aspect-square w-full max-w-md grid grid-cols-3 gap-3 relative">
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
                </div>

                {/* 3D Visualization - Bottom (Wide Horizontal Strip) */}
                <div className="w-full h-64 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <StationView3D />

                    {/* 3D Mode Label */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded border border-white/5 text-[10px] text-gray-400 pointer-events-none">
                        Orbit View (Wide)
                    </div>
                </div>
            </div>
        </div>
    );
}
