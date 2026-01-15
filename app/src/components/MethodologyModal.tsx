import { useState } from 'react';
import { Info, X, BookOpen, AlertTriangle, Database, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MethodologyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-background-panel border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-background-panel border-b border-border p-4 flex items-center justify-between">
                            <h2 className="font-display text-xl text-primary flex items-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Methodology & Assumptions
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Disclaimer */}
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-display text-amber-400 mb-2">DISCLAIMER</h3>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            This tool is a <strong>CAPABILITY DEMONSTRATION</strong>, not a production
                                            planning system. Specifications are based on publicly available data,
                                            engineering estimates, and conceptual design assumptions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Module Specifications */}
                            <section>
                                <h3 className="font-display text-lg text-white mb-3 flex items-center">
                                    <Database className="w-4 h-4 mr-2 text-primary" />
                                    Module Specifications
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Masses:</strong> Scaled from ISS module data (±20% accuracy)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Power:</strong> Based on comparable terrestrial systems</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Costs:</strong> Extrapolated from SpaceX/NASA pricing models</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Revenue:</strong> Market estimates (high uncertainty, ±50%)</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Sources & References */}
                            <section>
                                <h3 className="font-display text-lg text-white mb-3 flex items-center">
                                    <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                                    Sources & References
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">ISS specs:</strong> NASA Technical Reports Server (NTRS)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Launch costs:</strong> SpaceX Falcon 9 User Guide Rev 2.0</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Orbital mechanics:</strong> Curtis "Orbital Mechanics for Engineering Students"</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span><strong className="text-gray-300">Thermal/power:</strong> SMAD (Space Mission Analysis & Design)</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Known Limitations */}
                            <section>
                                <h3 className="font-display text-lg text-white mb-3 flex items-center">
                                    <Info className="w-4 h-4 mr-2 text-primary" />
                                    Known Limitations
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-status-critical mr-2">•</span>
                                        <span>Does not model component failures or redundancy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-status-critical mr-2">•</span>
                                        <span>Simplified thermal analysis (no transient effects)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-status-critical mr-2">•</span>
                                        <span>Revenue estimates have ±50% uncertainty</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-status-critical mr-2">•</span>
                                        <span>Does not account for regulatory/insurance costs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-status-critical mr-2">•</span>
                                        <span>No orbital debris modeling or collision risk</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Purpose */}
                            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                                <h3 className="font-display text-primary mb-2">Purpose</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    This tool demonstrates <strong>systems engineering methodology</strong> and
                                    <strong> technical competency</strong>. It showcases the ability to build
                                    production-grade configuration tools with real-time constraint validation,
                                    financial modeling, and export capabilities.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-background-panel border-t border-border p-4">
                            <button
                                onClick={onClose}
                                className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary font-mono rounded-lg transition-colors"
                            >
                                I UNDERSTAND
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook for using the modal
export function useMethodologyModal() {
    const [isOpen, setIsOpen] = useState(false);
    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };
}
