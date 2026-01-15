import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ModulePalette } from './components/station/ModulePalette';
import { StationGrid } from './components/station/StationGrid';
import { SystemsStatus } from './components/dashboard/SystemsStatus';
import { FinancialPanel } from './components/dashboard/FinancialPanel';
import { MissionTimeline } from './components/timeline/MissionTimeline';
import { DndProvider } from './components/dnd/DndProvider';
import { ToastProvider, useToast } from './components/ui/Toast';
import { ConfirmDialog } from './components/ui/ConfirmDialog';

import type { ModuleType } from './types/station';
import { useStationStore } from './store/useStationStore';
import { MODULE_SPECS } from './data/modules';

import { MethodologyModal, useMethodologyModal } from './components/MethodologyModal';



function AppContent() {
  const [selectedModuleType, setSelectedModuleType] = useState<ModuleType | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    bayId: number;
    moduleName: string;
  }>({ isOpen: false, bayId: 0, moduleName: '' });

  const methodology = useMethodologyModal();
  const { installModule, removeModule } = useStationStore();
  const { showToast } = useToast();

  const handleSelectBay = (bayId: number) => {
    if (selectedModuleType) {
      const result = installModule(bayId, selectedModuleType);
      if (result.success) {
        const spec = MODULE_SPECS[selectedModuleType];
        showToast(`${spec.title} installed in Bay ${bayId}`, 'success');
        setSelectedModuleType(null);
      } else {
        showToast(result.reason || 'Installation failed', 'error');
      }
    } else {
      // Click on occupied bay = show removal confirmation dialog
      const modules = useStationStore.getState().modules;
      const installed = modules.find(m => m.bayId === bayId);
      if (installed) {
        const spec = MODULE_SPECS[installed.type];
        setConfirmDialog({
          isOpen: true,
          bayId,
          moduleName: spec.title,
        });
      }
    }
  };

  const handleConfirmRemove = () => {
    removeModule(confirmDialog.bayId);
    showToast(`${confirmDialog.moduleName} removed from Bay ${confirmDialog.bayId}`, 'warning');
    setConfirmDialog({ isOpen: false, bayId: 0, moduleName: '' });
  };

  const handleCancelRemove = () => {
    setConfirmDialog({ isOpen: false, bayId: 0, moduleName: '' });
  };

  const handleDrop = (moduleType: ModuleType, bayId: number) => {
    const result = installModule(bayId, moduleType);
    const spec = MODULE_SPECS[moduleType];
    if (result.success) {
      showToast(`${spec.title} installed in Bay ${bayId}`, 'success');
    } else {
      showToast(result.reason || 'Installation failed', 'error');
    }
    setSelectedModuleType(null);
  };

  return (
    <DndProvider onDrop={handleDrop}>
      <Layout
        onOpenMethodology={methodology.open}
        leftPanel={
          <div className="space-y-6">
            <StationGrid
              selectedModule={selectedModuleType}
              onSelectBay={handleSelectBay}
            />
            {/* 3D Visualization Placeholder */}
            <div className="h-64 bg-black/20 rounded-lg border border-white/5 flex items-center justify-center">
              <span className="text-gray-500 font-mono text-sm">3D Visualization (Tier 2)</span>
            </div>
          </div>
        }
        rightPanel={
          <ModulePalette
            selectedModule={selectedModuleType}
            onSelectModule={setSelectedModuleType}
          />
        }
      >
        <SystemsStatus />
        <FinancialPanel />
        <MissionTimeline />
      </Layout>

      {/* Module Removal Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Module?"
        message={`Are you sure you want to remove ${confirmDialog.moduleName} from Bay ${confirmDialog.bayId}?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />

      {/* Methodology Modal */}
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
