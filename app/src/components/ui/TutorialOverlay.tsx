import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Rocket, Grid, Zap, DollarSign, Shield, TrendingUp } from 'lucide-react';

interface TutorialStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    highlight?: string; // CSS selector to highlight (future)
}

const TUTORIAL_STEPS: TutorialStep[] = [
    {
        title: 'Welcome to Vishwakarma',
        description: 'Design your own commercial space station! Drag and drop modules to create a profitable orbital platform.',
        icon: <Rocket className="w-8 h-8" />,
    },
    {
        title: 'Station Grid',
        description: 'The 3×3 grid represents your station\'s bay slots. Click a module from the palette, then click a bay to install it.',
        icon: <Grid className="w-8 h-8" />,
    },
    {
        title: 'Power & Thermal',
        description: 'Each module consumes power and generates heat. Add Power Stations to increase capacity. Watch the Systems Status panel!',
        icon: <Zap className="w-8 h-8" />,
    },
    {
        title: 'Launch Economics',
        description: 'Getting to orbit is expensive! Launch costs often exceed 30% of your total budget. Choose your launch vehicle wisely (Falcon 9 vs Starship).',
        icon: <Rocket className="w-8 h-8" />,
    },
    {
        title: 'Operating Costs (OPEX)',
        description: 'Space stations burn cash. Crew rotation, resupply, and ground control cost millions annually. Ensure your revenue modules can cover these expenses!',
        icon: <DollarSign className="w-8 h-8" />,
    },
    {
        title: 'Viability Check',
        description: 'The ultimate test. Your station must be profitable and pay back its investment (~15 years). Watch out for the "Not Viable" warning!',
        icon: <TrendingUp className="w-8 h-8" />,
    },
    {
        title: 'Risk & Reliability',
        description: 'Simulate meteor showers and solar flares. Check MTBF data and redundancy warnings to build a resilient station.',
        icon: <Shield className="w-8 h-8" />,
    },
];

const TUTORIAL_STORAGE_KEY = 'vishwakarma-tutorial-completed';

interface TutorialOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TutorialOverlay({ isOpen, onClose }: TutorialOverlayProps) {
    const [currentStep, setCurrentStep] = useState(0);

    // Reset step when opened
    useEffect(() => {
        if (isOpen) setCurrentStep(0);
    }, [isOpen]);

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
        onClose();
    };

    const handleSkip = () => {
        localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
        onClose();
    };

    const step = TUTORIAL_STEPS[currentStep];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-primary/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl relative"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleSkip}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Step indicator */}
                        <div className="flex justify-center gap-1 mb-6">
                            {TUTORIAL_STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-primary' :
                                        i < currentStep ? 'bg-primary/50' : 'bg-gray-700'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="text-center">
                            <div className="mb-4 text-primary">
                                {step.icon}
                            </div>
                            <h2 className="font-display text-2xl text-white mb-3">
                                {step.title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {step.description}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-colors ${currentStep === 0
                                    ? 'text-gray-600 cursor-not-allowed'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>

                            <button
                                onClick={handleSkip}
                                className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                            >
                                Skip tutorial
                            </button>

                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                            >
                                {currentStep === TUTORIAL_STEPS.length - 1 ? 'Get Started' : 'Next'}
                                {currentStep < TUTORIAL_STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Hook to manually trigger tutorial
 */
export function useTutorial() {
    const resetTutorial = () => {
        localStorage.removeItem(TUTORIAL_STORAGE_KEY);
        window.location.reload();
    };

    return { resetTutorial };
}
