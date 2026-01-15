import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
}

export function Tooltip({ children, content, side = 'left' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const updateCoords = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height
            });
        }
    };

    const handleMouseEnter = () => {
        updateCoords();
        setIsVisible(true);
    };

    // Update coords on scroll or resize if visible?
    useEffect(() => {
        if (isVisible) {
            window.addEventListener('scroll', updateCoords, true);
            window.addEventListener('resize', updateCoords);
            return () => {
                window.removeEventListener('scroll', updateCoords, true);
                window.removeEventListener('resize', updateCoords);
            };
        }
    }, [isVisible]);

    return (
        <div
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVisible(false)}
            className="w-full relative"
        >
            {children}
            {coords && createPortal(
                <AnimatePresence>
                    {isVisible && (
                        <TooltipContent coords={coords} side={side}>
                            {content}
                        </TooltipContent>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}

function TooltipContent({ coords, side, children }: { coords: { x: number, y: number, width: number, height: number }, side: string, children: ReactNode }) {
    // Calculate positioning styles based on side
    let positionStyles: any = { position: 'fixed', zIndex: 9999 };
    let initial: any = { opacity: 0, scale: 0.95 };
    let animate: any = { opacity: 1, scale: 1 };

    // Gap from trigger
    const gap = 8;

    if (side === 'left') {
        positionStyles.top = coords.y + coords.height / 2;
        positionStyles.left = coords.x - gap;
        positionStyles.transform = 'translate(-100%, -50%)'; // Baseline transform
    } else if (side === 'right') {
        positionStyles.top = coords.y + coords.height / 2;
        positionStyles.left = coords.x + coords.width + gap;
        positionStyles.transform = 'translate(0, -50%)';
    } else if (side === 'top') {
        positionStyles.top = coords.y - gap;
        positionStyles.left = coords.x + coords.width / 2;
        positionStyles.transform = 'translate(-50%, -100%)';
    } else if (side === 'bottom') {
        positionStyles.top = coords.y + coords.height + gap;
        positionStyles.left = coords.x + coords.width / 2;
        positionStyles.transform = 'translate(-50%, 0)';
    }

    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
                ...positionStyles,
                pointerEvents: 'none' // Pass through mouse events
            }}
            className="max-w-[280px] bg-gray-900/90 backdrop-blur-md border border-white/10 text-sm text-gray-200 p-3 rounded-lg shadow-xl"
        >
            {children}
        </motion.div>
    );
}
