import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ModulePalette } from './components/station/ModulePalette';
import { StationGrid } from './components/station/StationGrid';
import { SystemsStatus } from './components/dashboard/SystemsStatus';
import { FinancialPanel } from './components/dashboard/FinancialPanel';
import { MissionTimeline } from './components/timeline/MissionTimeline';
import { OptimizationPanel } from './components/dashboard/OptimizationPanel';
import { RiskPanel } from './components/dashboard/RiskPanel';
import { ReliabilityPanel } from './components/dashboard/ReliabilityPanel';
import { PowerFlowPanel } from './components/dashboard/PowerFlowPanel';
import { ThermalHeatmap } from './components/dashboard/ThermalHeatmap';
import { CrewTimePanel } from './components/dashboard/CrewTimePanel';
import { DndProvider } from './components/dnd/DndProvider';
import { ToastProvider, useToast } from './components/ui/Toast';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { TutorialOverlay } from './components/ui/TutorialOverlay';

import type { ModuleType } from './types/station';
import { useStationStore } from './store/useStationStore';
import { MODULE_SPECS } from './data/modules';
import { getCascadingWarning } from './lib/physics';

import { MethodologyModal, useMethodologyModal } from './components/MethodologyModal';

import { ConfigurationManager } from './components/dashboard/ConfigurationManager';
import { ComparisonView } from './components/analytics/ComparisonView';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function AppContent() {
  const [selectedModuleType, setSelectedModuleType] = useState<ModuleType | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    bayId: number;
    moduleName: string;
    moduleType: ModuleType | null;
    cascadingWarning: { hasDependents: boolean; message: string; dependents: string[] };
  }>({
    isOpen: false,
    bayId: 0,
    moduleName: '',
    moduleType: null,
    cascadingWarning: { hasDependents: false, message: '', dependents: [] }
  });

  const methodology = useMethodologyModal();
  const { installModule, removeModule } = useStationStore();
  const { showToast } = useToast();



  const handleSelectBay = (bayId: number) => {
    if (selectedModuleType) {
      const result = installModule(bayId, selectedModuleType);
      if (result.valid) {
        const spec = MODULE_SPECS[selectedModuleType];
        showToast(`${spec.title} installed in Bay ${bayId}`, 'success');
        setSelectedModuleType(null);
      } else {
        // Show detailed reason with suggestions if available
        const errorMsg = result.reason || 'Installation failed';
        showToast(errorMsg, 'error');

        // Show suggestions as info toast if available
        if (result.details?.suggestions) {
          setTimeout(() => {
            showToast(`💡 ${result.details!.suggestions[0]}`, 'info');
          }, 500);
        }
      }
    } else {
      // Click on occupied bay = show removal confirmation dialog
      const storeModules = useStationStore.getState().modules;
      const installed = storeModules.find(m => m.bayId === bayId);
      if (installed) {
        const spec = MODULE_SPECS[installed.type];
        // Get cascading warning (U-03B)
        const warning = getCascadingWarning(installed.type, storeModules);

        setConfirmDialog({
          isOpen: true,
          bayId,
          moduleName: spec.title,
          moduleType: installed.type,
          cascadingWarning: warning,
        });
      }
    }
  };

  // Keyboard shortcuts (U-10C) - after handleSelectBay is defined
  useKeyboardShortcuts({
    onSelectBay: handleSelectBay,
    onClearSelection: () => setSelectedModuleType(null),
  });

  const handleConfirmRemove = () => {
    removeModule(confirmDialog.bayId);
    if (confirmDialog.cascadingWarning.hasDependents) {
      showToast(`${confirmDialog.moduleName} removed. ${confirmDialog.cascadingWarning.dependents.length} dependent module(s) disabled.`, 'warning');
    } else {
      showToast(`${confirmDialog.moduleName} removed from Bay ${confirmDialog.bayId}`, 'warning');
    }
    setConfirmDialog({ isOpen: false, bayId: 0, moduleName: '', moduleType: null, cascadingWarning: { hasDependents: false, message: '', dependents: [] } });
  };

  const handleCancelRemove = () => {
    setConfirmDialog({ isOpen: false, bayId: 0, moduleName: '', moduleType: null, cascadingWarning: { hasDependents: false, message: '', dependents: [] } });
  };

  const handleDrop = (moduleType: ModuleType, bayId: number) => {
    const result = installModule(bayId, moduleType);
    const spec = MODULE_SPECS[moduleType];
    if (result.valid) {
      showToast(`${spec.title} installed in Bay ${bayId}`, 'success');
    } else {
      showToast(result.reason || 'Installation failed', 'error');
    }
    setSelectedModuleType(null);
  };

  const handleSnapshotLoad = () => {
    showToast('Configuration loaded successfully', 'success');
  };

  // When AI Advisor suggests a module, select it in the palette to guide the user
  const handleOptimizationApply = (moduleType: ModuleType) => {
    setSelectedModuleType(moduleType);
    showToast(`Selected ${MODULE_SPECS[moduleType].title}. Click a Bay to install.`, 'info');
  };

  return (
    <DndProvider onDrop={handleDrop}>
      <Layout
        onOpenMethodology={methodology.open}
        onToggleComparison={() => setIsComparisonOpen(!isComparisonOpen)}
        isComparisonOpen={isComparisonOpen}
        leftPanel={
          <div className="space-y-6">
            {/* Stable Layout to prevent 3D View Unmount */}
            {isComparisonOpen && <ConfigurationManager onLoad={handleSnapshotLoad} />}
            <StationGrid
              selectedModule={selectedModuleType}
              onSelectBay={handleSelectBay}
            />
          </div>
        }
        rightPanel={
          <ModulePalette
            selectedModule={selectedModuleType}
            onSelectModule={setSelectedModuleType}
          />
        }
      >
        {isComparisonOpen ? (
          <ComparisonView />
        ) : (
          <>
            <OptimizationPanel onApply={handleOptimizationApply} />
            <RiskPanel />
            <ReliabilityPanel />
            {/* Tier 3: Visualization Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <PowerFlowPanel />
              <ThermalHeatmap />
              <CrewTimePanel />
            </div>
            <SystemsStatus />
            <FinancialPanel />
            <MissionTimeline />
          </>
        )}
      </Layout>

      {/* Tutorial Overlay for first-time users */}
      <TutorialOverlay />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Module?"
        message={`Are you sure you want to remove ${confirmDialog.moduleName} from Bay ${confirmDialog.bayId}?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        cascadingWarning={confirmDialog.cascadingWarning}
      />

      <MethodologyModal
        isOpen={methodology.isOpen}
        onClose={methodology.close}
      />
    </DndProvider>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
