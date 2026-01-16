import { Rocket, FileText, Share2, FileSpreadsheet, BookOpen, Scale } from 'lucide-react';
import { useStationStore } from '../../store/useStationStore';
import { exportJSON, exportPDF, exportCSV } from '../../lib/export';

interface HeaderProps {
    onOpenMethodology: () => void;
    onToggleComparison: () => void;
    isComparisonOpen: boolean;
}

export function Header({ onOpenMethodology, onToggleComparison, isComparisonOpen }: HeaderProps) {
    const { modules, metrics, financialParameters } = useStationStore();

    const handleExportPDF = () => {
        exportPDF(modules, metrics, financialParameters.discountRate);
    };

    const handleExportJSON = () => {
        exportJSON({ modules, metrics, financialParameters });
    };

    const handleExportCSV = () => {
        exportCSV({ modules, metrics, financialParameters });
    };

    return (
        <header className="h-16 border-b border-border bg-background-panel flex items-center justify-between px-8">
            <div className="flex items-center space-x-3">
                <Rocket className="w-6 h-6 text-primary" />
                <h1 className="font-display text-2xl tracking-wider text-primary">VISHWAKARMA <span className="text-gray-500 text-sm font-mono ml-2">v2.0</span></h1>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={onToggleComparison}
                    className={`flex items-center px-3 py-2 text-sm font-mono rounded transition-colors border ${isComparisonOpen ? 'bg-purple-600 border-purple-500 text-white' : 'text-purple-400 border-purple-500/30 hover:bg-purple-900/20'}`}
                    title="Compare Snapshots"
                >
                    <Scale className="w-4 h-4 mr-2" />
                    COMPARE
                </button>
                <div className="h-4 w-px bg-white/10 mx-2" />

                <button
                    onClick={onOpenMethodology}
                    className="flex items-center px-3 py-2 text-sm font-mono text-primary/80 hover:text-primary hover:bg-primary/10 rounded transition-colors border border-transparent"
                    title="Methodology & Assumptions"
                >
                    <BookOpen className="w-4 h-4 mr-2" />
                    METHODOLOGY
                </button>
                <div className="h-4 w-px bg-white/10 mx-2" />

                <button onClick={handleExportPDF} className="flex items-center px-3 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors border border-transparent hover:border-border">
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                </button>
                <button onClick={handleExportCSV} className="flex items-center px-3 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors border border-transparent hover:border-border">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    CSV
                </button>
                <button onClick={handleExportJSON} className="flex items-center px-3 py-2 text-sm font-mono text-primary border border-primary/30 hover:bg-primary/10 rounded transition-colors">
                    <Share2 className="w-4 h-4 mr-2" />
                    JSON
                </button>
            </div>
        </header>
    );
}

