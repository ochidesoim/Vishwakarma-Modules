import { useState } from 'react';
import { useStationStore } from '../../store/useStationStore';
import { Trash2, Save, Upload, BookOpen, ChevronRight } from 'lucide-react';
import { STATION_PRESETS } from '../../data/presets';
import type { ModuleType } from '../../types/station';

interface ConfigurationManagerProps {
    onLoad: () => void;
}

export function ConfigurationManager({ onLoad }: ConfigurationManagerProps) {
    const { savedConfigs, saveConfiguration, deleteConfiguration, loadConfiguration, installModule, resetStation } = useStationStore();
    const [newConfigName, setNewConfigName] = useState('');
    const [activeTab, setActiveTab] = useState<'saved' | 'presets'>('saved');

    const handleSave = () => {
        if (!newConfigName.trim()) return;
        saveConfiguration(newConfigName);
        setNewConfigName('');
    };

    const handleLoadSnapshot = (id: string) => {
        if (confirm('Load this configuration? Current unsaved changes will be lost.')) {
            loadConfiguration(id);
            onLoad();
        }
    };

    const handleLoadPreset = (preset: typeof STATION_PRESETS[0]) => {
        if (confirm(`Load preset "${preset.name}"? This will clear your current station.`)) {
            resetStation();
            // Install preset modules
            // We need to bypass validation? No, validation is good.
            // But 'installModule' is bay-by-bay.
            // We can just set the store modules directly if we exposed a valid action, 
            // but 'installModule' is exposed.
            // Note: Preset has bayIds.

            // Loop and install.
            // Timeout to allow state updates? No, calling multiple actions in sync might be tricky with Zustand if they depend on 'get()'.
            // Actually 'installModule' calls 'get()'.
            // So sequential calls work.

            preset.modules.forEach(m => {
                if (m.type !== 'hub') { // Hub is core
                    installModule(m.bayId, m.type as ModuleType);
                }
            });

            onLoad();
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            notation: 'compact',
        }).format(val);
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-gray-100 flex items-center gap-2">
                    <Save className="w-5 h-5 text-blue-400" />
                    Snapshot Manager
                </h3>
                <div className="flex bg-gray-800 rounded p-1">
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${activeTab === 'saved' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        My Saves
                    </button>
                    <button
                        onClick={() => setActiveTab('presets')}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${activeTab === 'presets' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        Presets
                    </button>
                </div>
            </div>

            {activeTab === 'saved' ? (
                <>
                    {/* Save New */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newConfigName}
                            onChange={(e) => setNewConfigName(e.target.value)}
                            placeholder="Name current build..."
                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleSave}
                            disabled={!newConfigName.trim()}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                            Save
                        </button>
                    </div>

                    {/* List */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {savedConfigs.length === 0 && (
                            <div className="text-center text-gray-500 text-sm py-4 italic">
                                No saved snapshots yet.
                            </div>
                        )}

                        {savedConfigs.map((config) => (
                            <div key={config.id} className="bg-gray-800/50 border border-gray-700/50 rounded p-3 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-200 truncate">{config.name}</div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(config.date).toLocaleDateString()} • {config.modules.length} Modules
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 font-mono">
                                        NPV: <span className={config.metrics.netPresentValue > 0 ? "text-green-400" : "text-red-400"}>
                                            {formatCurrency(config.metrics.netPresentValue)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleLoadSnapshot(config.id)}
                                        className="p-1.5 text-blue-400 hover:bg-blue-900/50 rounded"
                                        title="Load Snapshot"
                                    >
                                        <Upload className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteConfiguration(config.id)}
                                        className="p-1.5 text-red-400 hover:bg-red-900/50 rounded"
                                        title="Delete Snapshot"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // Presets Tab
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {STATION_PRESETS.map((preset) => (
                        <div key={preset.id} className="bg-gray-800/50 border border-gray-700/50 rounded p-3 group hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => handleLoadPreset(preset)}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium text-purple-200 flex items-center gap-2">
                                        <BookOpen className="w-3 h-3" />
                                        {preset.name}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">{preset.description}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400" />
                            </div>

                            <div className="flex gap-4 mt-2 pt-2 border-t border-gray-700/50">
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase">Focus</div>
                                    <div className="text-xs text-gray-300">{preset.focus}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase">Revenue</div>
                                    <div className="text-xs text-green-400">{preset.revenue}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase">Crew</div>
                                    <div className="text-xs text-blue-400">{preset.crew}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
