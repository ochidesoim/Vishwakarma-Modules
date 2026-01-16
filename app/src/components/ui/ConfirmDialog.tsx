import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    // Cascading warning (U-03B)
    cascadingWarning?: {
        hasDependents: boolean;
        message: string;
        dependents: string[];
    };
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, cascadingWarning }: ConfirmDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-background-panel border border-border rounded-xl p-6 max-w-md mx-4 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-display text-lg text-white mb-2">{title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{message}</p>

                        {/* Cascading Dependencies Warning (U-03B) */}
                        {cascadingWarning?.hasDependents && (
                            <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm text-orange-400 font-medium mb-1">
                                            Cascading Effect
                                        </div>
                                        <div className="text-xs text-gray-400 mb-2">
                                            {cascadingWarning.message}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {cascadingWarning.dependents.map((dep, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-[10px] rounded"
                                                >
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${cascadingWarning?.hasDependents
                                        ? 'bg-orange-600 hover:bg-orange-500'
                                        : 'bg-red-600 hover:bg-red-500'
                                    } text-white`}
                            >
                                {cascadingWarning?.hasDependents ? 'Remove Anyway' : 'Remove'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook for easier usage
export function useConfirmDialog() {
    const [dialogState, setDialogState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });

    const showConfirm = (title: string, message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                title,
                message,
                onConfirm: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
            });
        });
    };

    const handleCancel = () => {
        setDialogState(prev => ({ ...prev, isOpen: false }));
    };

    return {
        dialogState,
        showConfirm,
        handleCancel,
        ConfirmDialogComponent: () => (
            <ConfirmDialog
                isOpen={dialogState.isOpen}
                title={dialogState.title}
                message={dialogState.message}
                onConfirm={dialogState.onConfirm}
                onCancel={handleCancel}
            />
        ),
    };
}
