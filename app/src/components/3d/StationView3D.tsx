import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Line, Html } from '@react-three/drei';
import { useStationStore } from '../../store/useStationStore';
import { Module3D } from './Module3D';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Earth Component
function Earth() {
    const earthRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.02; // Slow Earth rotation
        }
    });

    return (
        <group position={[0, -80, 0]}>
            {/* Earth sphere */}
            <Sphere ref={earthRef} args={[60, 64, 64]}>
                <meshStandardMaterial
                    color="#1a4a7a"
                    emissive="#0a2a4a"
                    emissiveIntensity={0.1}
                    roughness={0.8}
                />
            </Sphere>
            {/* Atmosphere glow */}
            <Sphere args={[62, 32, 32]}>
                <meshBasicMaterial
                    color="#4a9eff"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </Sphere>
            {/* Clouds layer */}
            <Sphere args={[60.5, 32, 32]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    roughness={1}
                />
            </Sphere>
        </group>
    );
}

// Sun Light with Lens Flare effect
function SunLight() {
    return (
        <group>
            {/* Main sun directional light */}
            <directionalLight
                position={[50, 30, 50]}
                intensity={2}
                color="#fff5e0"
                castShadow
            />
            {/* Sun glow point */}
            <mesh position={[50, 30, 50]}>
                <sphereGeometry args={[2, 16, 16]} />
                <meshBasicMaterial color="#ffffd0" />
            </mesh>
            {/* Rim light from opposite side (bounce) */}
            <directionalLight
                position={[-30, -10, -30]}
                intensity={0.3}
                color="#4a6a8a"
            />
        </group>
    );
}

// Orbital Path Ring
function OrbitalPath() {
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const radius = 85;
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                -80, // Same Y as Earth center
                Math.sin(angle) * radius
            ));
        }
        return pts;
    }, []);

    return (
        <Line
            points={points}
            color="#00d9ff"
            lineWidth={1}
            opacity={0.3}
            transparent
        />
    );
}

// Center of Mass Indicator
function CenterOfMass({ modules }: { modules: { bayId: number }[] }) {
    const comRef = useRef<THREE.Mesh>(null);

    // Calculate center of mass based on module positions
    const com = useMemo(() => {
        if (modules.length === 0) return new THREE.Vector3(0, 0, 0);

        let totalX = 0, totalZ = 0;
        modules.forEach(m => {
            const spacing = 3;
            const row = Math.ceil(m.bayId / 3) - 2;
            const col = ((m.bayId - 1) % 3) - 1;
            totalX += col * spacing;
            totalZ += row * spacing;
        });

        return new THREE.Vector3(
            totalX / modules.length,
            0.5,
            totalZ / modules.length
        );
    }, [modules]);

    const offset = Math.sqrt(com.x * com.x + com.z * com.z);
    const isBalanced = offset < 1.5;

    useFrame((state) => {
        if (comRef.current) {
            comRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
        }
    });

    if (modules.length < 2) return null;

    return (
        <group position={[com.x, com.y, com.z]}>
            {/* CoM sphere */}
            <mesh ref={comRef}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                    color={isBalanced ? "#22c55e" : "#f59e0b"}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Line to center */}
            <Line
                points={[[0, 0, 0], [-com.x, 0, -com.z]]}
                color={isBalanced ? "#22c55e" : "#f59e0b"}
                lineWidth={2}
                dashed
                dashSize={0.3}
                gapSize={0.2}
            />
            {/* Label */}
            <Html position={[0, 1, 0]} center distanceFactor={10}>
                <div className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap backdrop-blur-sm ${isBalanced ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                    CoM: {offset.toFixed(1)}m {isBalanced ? '✓' : '⚠'}
                </div>
            </Html>
        </group>
    );
}

// Station Hub (center reference)
function StationHub() {
    return (
        <group position={[0, 0, 0]}>
            {/* Central hub sphere */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#cbd5e1"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            {/* Docking ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.1, 16, 32]} />
                <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
        </group>
    );
}

export function StationView3D() {
    const { modules } = useStationStore();

    // Map Bay ID (1-9) to 3D Coordinates
    const getPosition = (bayId: number): [number, number, number] => {
        const spacing = 3;
        const row = Math.ceil(bayId / 3) - 2;
        const col = ((bayId - 1) % 3) - 1;
        return [col * spacing, 0, row * spacing];
    };

    return (
        <div className="w-full h-full min-h-[400px] bg-black rounded-lg overflow-hidden relative">
            <Canvas
                camera={{ position: [12, 10, 12], fov: 45 }}
                shadows
            >
                <Suspense fallback={null}>
                    {/* Space Background */}
                    <color attach="background" args={['#050510']} />
                    <fog attach="fog" args={['#050510', 80, 200]} />
                    <Stars radius={200} depth={100} count={8000} factor={4} saturation={0} fade speed={0.5} />

                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <SunLight />

                    {/* Earth & Orbital Path */}
                    <Earth />
                    <OrbitalPath />

                    {/* Station Hub */}
                    <StationHub />

                    {/* Center of Mass Indicator */}
                    <CenterOfMass modules={modules} />

                    {/* Modules */}
                    {modules.map((module) => (
                        <Module3D
                            key={module.id}
                            type={module.type}
                            position={getPosition(module.bayId)}
                            isSelected={false}
                            onClick={() => console.log('Clicked', module.type)}
                        />
                    ))}

                    {/* Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        minDistance={8}
                        maxDistance={80}
                        autoRotate={true}
                        autoRotateSpeed={0.3}
                        maxPolarAngle={Math.PI * 0.85}
                        minPolarAngle={Math.PI * 0.15}
                    />
                </Suspense>
            </Canvas>

            {/* Overlay UI */}
            <div className="absolute top-4 right-4 text-xs text-gray-400 bg-black/50 backdrop-blur px-3 py-2 rounded border border-white/10">
                <div className="font-mono text-primary mb-1">LEO • 400km</div>
                <div className="text-[10px] text-gray-500">51.6° Inclination</div>
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 pointer-events-none">
                Drag: Rotate • Scroll: Zoom • Right-click: Pan
            </div>
        </div>
    );
}

