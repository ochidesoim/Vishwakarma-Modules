import { MODULE_SPECS } from '../../data/modules';
import type { ModuleType } from '../../types/station';
import { DraggableModule } from '../dnd/DraggableModule';

interface ModulePaletteProps {
    selectedModule: ModuleType | null;
    onSelectModule: (type: ModuleType | null) => void;
}

export function ModulePalette({ selectedModule, onSelectModule }: ModulePaletteProps) {
    // Exclude 'hub' from palette - it's the base station
    const modules = Object.values(MODULE_SPECS).filter(m => m.type !== 'hub');

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6 h-full flex flex-col">
            <h2 className="font-display text-xl mb-2 text-primary">Module Palette</h2>
            <p className="text-xs text-gray-500 mb-4">Drag modules to the grid or click to select</p>
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {modules.map((module) => (
                    <DraggableModule
                        key={module.type}
                        module={module}
                        isSelected={selectedModule === module.type}
                        onSelect={onSelectModule}
                    />
                ))}
            </div>
        </div>
    );
}
