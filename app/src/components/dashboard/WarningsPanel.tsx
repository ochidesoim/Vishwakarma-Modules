import React, { useMemo } from 'react';
import { useStationStore } from '../../store/useStationStore';
import { analyzeWarnings, getWarningCounts, type SystemWarning } from '../../lib/warnings';
import { calculateAnnualOPEX } from '../../lib/opex';
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const WarningsPanel: React.FC = () => {
    const { modules, metrics, financialParameters } = useStationStore();
    const [expanded, setExpanded] = React.useState(true);

    const warnings = useMemo(() => {
        const annualRevenue = metrics.monthlyRevenue * 12 * financialParameters.revenueMultiplier;
        const opex = calculateAnnualOPEX(
            metrics.totalInvestment,
            metrics.crewCapacity > 0,
            metrics.crewCapacity
        );

        return analyzeWarnings(modules, metrics, opex, annualRevenue);
    }, [modules, metrics, financialParameters]);

    const counts = getWarningCounts(warnings);

    if (warnings.length === 0) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center space-x-3">
                    <div className="flex -space-x-1">
                        {counts.critical > 0 && <AlertCircle className="w-5 h-5 text-red-500" />}
                        {counts.warning > 0 && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                        {counts.info > 0 && <Info className="w-5 h-5 text-blue-400" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">
                        System Warnings
                    </h3>
                    <span className="text-sm text-gray-400">
                        {warnings.length} issues found
                    </span>
                </div>
                {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>

            {expanded && (
                <div className="mt-4 space-y-3">
                    {warnings.map((warning, idx) => (
                        <WarningItem key={warning.id + idx} warning={warning} />
                    ))}
                </div>
            )}
        </div>
    );
};

const WarningItem: React.FC<{ warning: SystemWarning }> = ({ warning }) => {
    const colors = {
        critical: 'border-red-500/50 bg-red-900/10 text-red-100',
        warning: 'border-yellow-500/50 bg-yellow-900/10 text-yellow-100',
        info: 'border-blue-500/50 bg-blue-900/10 text-blue-100',
    };

    const icons = {
        critical: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />,
        info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    };

    return (
        <div className={`flex items-start space-x-3 p-3 rounded border ${colors[warning.severity]}`}>
            {icons[warning.severity]}
            <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="font-semibold text-sm">{warning.title}</h4>
                    {warning.value && (
                        <span className="text-xs font-mono bg-black/20 px-2 py-0.5 rounded">
                            {warning.value}
                        </span>
                    )}
                </div>
                <p className="text-sm opacity-90 mt-1">{warning.message}</p>
                {warning.suggestion && (
                    <div className="text-xs mt-2 flex items-center space-x-1 opacity-80">
                        <span>💡 {warning.suggestion}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
