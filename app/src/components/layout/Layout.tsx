import type { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    onOpenMethodology: () => void;
}

export function Layout({ children, leftPanel, rightPanel, onOpenMethodology }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background text-gray-200 flex flex-col font-body">
            <Header onOpenMethodology={onOpenMethodology} />

            <main className="flex-1 p-6 grid grid-cols-12 gap-6 h-[calc(100vh-64px)] overflow-hidden">
                {/* Left: Station View (Grid + 3D) */}
                <section className="col-span-12 xl:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2">
                    {leftPanel}
                </section>

                {/* Center: Systems Dashboard */}
                <section className="col-span-12 xl:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2">
                    {children}
                </section>

                {/* Right: Module Palette */}
                <section className="col-span-12 xl:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
                    {rightPanel}
                </section>
            </main>

            {/* Watermark */}
            <img
                src={`${import.meta.env.BASE_URL}gurutva_logo.jpg`}
                alt="GURUTVA"
                className="fixed bottom-4 right-4 h-12 opacity-80 pointer-events-none z-50"
            />
        </div>
    );
}
