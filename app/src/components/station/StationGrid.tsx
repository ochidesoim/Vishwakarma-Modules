import { useStationStore } from '../../store/useStationStore';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import { DroppableBay } from '../dnd/DroppableBay';

interface StationGridProps {
    selectedModule: ModuleType | null;
    onSelectBay: (bayId: number) => void;
}

export function StationGrid({ selectedModule, onSelectBay }: StationGridProps) {
    const modules = useStationStore(state => state.modules);

    // 3x3 Grid (9 bays)
    const bays = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-4 text-primary">Station Configuration</h2>

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
        </div>
    );
}
