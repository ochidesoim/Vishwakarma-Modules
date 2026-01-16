import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Transform } from '@dnd-kit/utilities';
import type { ModuleType } from '../../types/station';
import type { ModuleSpec } from '../../types/station';
import { cn } from '../../lib/utils';


interface DraggableModuleProps {
    module: ModuleSpec;
    isSelected: boolean;
    onSelect: (type: ModuleType | null) => void;
}

export function DraggableModule({ module, isSelected, onSelect }: DraggableModuleProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: module.type,
    });

    const transformString = (transform: Transform | null) => {
        if (!transform) return undefined;
        // Safety check for dnd-kit utilities in production
        if (CSS && CSS.Translate && typeof CSS.Translate.toString === 'function') {
            return CSS.Translate.toString(transform);
        }
        // Fallback for when CSS.Translate is missing
        return `translate3d(${transform.x}px, ${transform.y}px, 0)`;
    };

    const style = transform ? {
        transform: transformString(transform),
    } : undefined;

    return (
        <button
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => onSelect(isSelected ? null : module.type)}
            className={cn(
                "w-full text-left p-3 rounded-lg border transition-all duration-200 group relative touch-none",
                isDragging && "opacity-50 z-50",
                isSelected
                    ? "bg-primary/10 border-primary shadow-[0_0_10px_rgba(0,217,255,0.2)]"
                    : "bg-background-surface border-white/5 hover:border-white/20 hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-lg"
            )}
        >
            <div className="flex items-start space-x-3">
                <div className="text-2xl mt-1 transition-transform group-hover:scale-110">{module.icon}</div>
                <div className="flex-1 min-w-0">
                    <div className={cn(
                        "font-display text-sm truncate",
                        isSelected ? "text-primary" : "text-gray-200"
                    )}>
                        {module.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 leading-snug">{module.description}</div>

                    {/* Specs Micro-Badge */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-1 rounded">
                            {module.power_cont}kW
                        </span>
                        <span className="text-[10px] font-mono text-green-400 bg-green-400/10 px-1 rounded">
                            ${(module.capex / 1_000_000).toFixed(0)}M
                        </span>
                    </div>
                </div>

                {/* Drag Handle Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                    </svg>
                </div>
            </div>
        </button>
    );
}
