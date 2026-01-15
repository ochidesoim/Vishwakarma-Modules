import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { useStationStore } from '../../store/useStationStore';
import { Module3D } from './Module3D';
import { Suspense } from 'react';

export function StationView3D() {
    const { modules } = useStationStore();

    // Map Bay ID (1-9) to 3D Coordinates
    // Grid Layout:
    // 1 2 3  ->  (-3, -3) (0, -3) (3, -3)  [Z-UP? No Y-UP usually in Threejs]
    // 4 5 6  ->  (-3, 0)  (0, 0)  (3, 0)   [X, Z plane]
    // 7 8 9  ->  (-3, 3)  (0, 3)  (3, 3)
    const getPosition = (bayId: number): [number, number, number] => {
        const spacing = 3;
        const row = Math.ceil(bayId / 3) - 2; // -1, 0, 1
        const col = ((bayId - 1) % 3) - 2 + 1; // -1, 0, 1 -> Wait.
        // bayId 1: row -1. col 0? No.
        // bayId 1: (1-1)%3 = 0. 0 - 1 = -1. Correct.

        // Map to x, z (y is up)
        return [col * spacing, 0, row * spacing];
    };

    return (
        <div className="w-full h-full min-h-[400px] bg-black rounded-lg overflow-hidden relative">
            <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <directionalLight position={[-5, 5, -5]} intensity={0.5} />

                    {/* Environment */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />

                    {/* Modules */}
                    {modules.map((module) => (
                        <Module3D
                            key={module.id}
                            type={module.type}
                            position={getPosition(module.bayId)}
                            isSelected={false} // Todo: connect selection state
                            onClick={() => console.log('Clicked', module.type)}
                        />
                    ))}

                    {/* Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        minDistance={5}
                        maxDistance={50}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                    />

                    {/* Grid Reference */}
                    <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, -2, 0]} />
                </Suspense>
            </Canvas>

            {/* Overlay UI */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 pointer-events-none">
                <p>Left Click: Rotate • Right Click: Pan • Scroll: Zoom</p>
            </div>
        </div>
    );
}
