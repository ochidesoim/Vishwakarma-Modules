import { useEffect, useCallback } from 'react';
import { exportPDF, exportJSON } from '../lib/export';
import { useStationStore } from '../store/useStationStore';

interface KeyboardShortcutOptions {
    onSelectBay?: (bayId: number) => void;
    onClearSelection?: () => void;
}

/**
 * Hook for keyboard shortcuts (U-10C)
 * 
 * Shortcuts:
 * - 1-9: Select bay 1-9
 * - Escape: Clear selection
 * - Ctrl/Cmd + E: Export PDF
 * - Ctrl/Cmd + Shift + E: Export JSON
 * - Ctrl/Cmd + S: Save configuration
 * - Ctrl/Cmd + R: Reset station (with confirmation)
 */
export function useKeyboardShortcuts({ onSelectBay, onClearSelection }: KeyboardShortcutOptions = {}) {
    const { modules, metrics, financialParameters, resetStation, saveConfiguration } = useStationStore();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Don't trigger if user is typing in an input
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifierKey = isMac ? e.metaKey : e.ctrlKey;

        // Bay selection: 1-9
        if (!modifierKey && !e.shiftKey && !e.altKey) {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9 && onSelectBay) {
                e.preventDefault();
                onSelectBay(num);
            }
        }

        // Escape: Clear selection
        if (e.key === 'Escape' && onClearSelection) {
            e.preventDefault();
            onClearSelection();
        }

        // Ctrl/Cmd + E: Export PDF
        if (modifierKey && e.key.toLowerCase() === 'e' && !e.shiftKey) {
            e.preventDefault();
            exportPDF(modules, metrics, financialParameters.discountRate);
        }

        // Ctrl/Cmd + Shift + E: Export JSON
        if (modifierKey && e.key.toLowerCase() === 'e' && e.shiftKey) {
            e.preventDefault();
            exportJSON({ modules, metrics, financialParameters });
        }

        // Ctrl/Cmd + Shift + S: Save configuration
        if (modifierKey && e.key.toLowerCase() === 's' && e.shiftKey) {
            e.preventDefault();
            const name = `Snapshot ${new Date().toLocaleTimeString()}`;
            saveConfiguration(name);
        }

        // Ctrl/Cmd + Shift + R: Reset station
        if (modifierKey && e.key.toLowerCase() === 'r' && e.shiftKey) {
            e.preventDefault();
            if (window.confirm('Reset entire station configuration?')) {
                resetStation();
            }
        }
    }, [modules, metrics, financialParameters, onSelectBay, onClearSelection, resetStation, saveConfiguration]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

/**
 * Component to display keyboard shortcuts help
 */
export function KeyboardShortcutsHelp() {
    const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const mod = isMac ? '⌘' : 'Ctrl';

    const shortcuts = [
        { keys: '1-9', action: 'Select bay' },
        { keys: 'Esc', action: 'Clear selection' },
        { keys: `${mod}+E`, action: 'Export PDF' },
        { keys: `${mod}+⇧+E`, action: 'Export JSON' },
        { keys: `${mod}+⇧+S`, action: 'Save snapshot' },
        { keys: `${mod}+⇧+R`, action: 'Reset station' },
    ];

    return (
        <div className="text-xs text-gray-500 space-y-1">
            {shortcuts.map((s, i) => (
                <div key={i} className="flex justify-between">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px] font-mono">{s.keys}</kbd>
                    <span>{s.action}</span>
                </div>
            ))}
        </div>
    );
}

