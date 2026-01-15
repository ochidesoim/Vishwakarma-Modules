import { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Capsule, Text, useGLTF, Center } from '@react-three/drei';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import type { Mesh } from 'three';
import * as THREE from 'three';

interface Module3DProps {
    type: ModuleType;
    position: [number, number, number];
    isSelected?: boolean;
    onClick?: () => void;
}

// Reusable Truss Segment
function Truss({ length }: { length: number }) {
    return (
        <group>
            {/* Main Beams */}
            <Box args={[0.2, 0.2, length]} position={[0.3, 0.3, 0]}> <meshStandardMaterial color="#4b5563" /> </Box>
            <Box args={[0.2, 0.2, length]} position={[-0.3, 0.3, 0]}> <meshStandardMaterial color="#4b5563" /> </Box>
            <Box args={[0.2, 0.2, length]} position={[0.3, -0.3, 0]}> <meshStandardMaterial color="#4b5563" /> </Box>
            <Box args={[0.2, 0.2, length]} position={[-0.3, -0.3, 0]}> <meshStandardMaterial color="#4b5563" /> </Box>
            <Box args={[0.5, 0.5, length]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1f2937" wireframe opacity={0.3} transparent />
            </Box>
        </group>
    );
}

export function Module3D({ type, position, isSelected: _isSelected, onClick }: Module3DProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Hover Animation
    useFrame((_, _delta) => {
        if (meshRef.current) {
            const targetScale = hovered ? 1.05 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    useLayoutEffect(() => {
        if (meshRef.current) {
            if (position[0] !== 0 || position[2] !== 0) {
                meshRef.current.lookAt(0, 0, 0);
            }
        }
    }, [position]);

    const spec = MODULE_SPECS[type];

    // --- IMPORTED MODEL ---
    const ImportedModel = ({ scale = 2.5, rotation = [0, 0, 0] }: { scale?: number, rotation?: [number, number, number] }) => {
        // Load the user's GLB using dynamic BASE_URL for GitHub Pages compatibility
        const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/Meshy_AI__Vishwakarma_Modular_0115130558_texture.glb`);
        const clone = useMemo(() => scene.clone(), [scene]);

        // Center the model to fix offset issues and scale it up
        return (
            <Center top>
                <primitive object={clone} scale={scale} rotation={rotation} />
            </Center>
        );
    };

    // --- PROCEDURAL GEOMETRIES ---

    const InflatableHab = ({ color = "#f8fafc" }) => (
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Capsule args={[0.9, 2.5, 4, 16]}> <meshStandardMaterial color={color} roughness={0.9} /> </Capsule>
            <group position={[0, 0.5, 0.85]}> <Cylinder args={[0.2, 0.2, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}> <meshStandardMaterial color="#1e293b" /> </Cylinder> </group>
            <group position={[0, -0.5, 0.85]}> <Cylinder args={[0.2, 0.2, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}> <meshStandardMaterial color="#1e293b" /> </Cylinder> </group>
            <Cylinder args={[0.92, 0.92, 0.2, 32]} position={[0, 1.2, 0]}> <meshStandardMaterial color="#475569" metalness={0.8} /> </Cylinder>
            <Cylinder args={[0.92, 0.92, 0.2, 32]} position={[0, -1.2, 0]}> <meshStandardMaterial color="#475569" metalness={0.8} /> </Cylinder>
        </group>
    );

    const PowerTruss = () => (
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Truss length={2.5} />
            <Cylinder args={[0.6, 0.6, 0.4]} rotation={[0, 0, Math.PI / 2]}> <meshStandardMaterial color="#cbd5e1" metalness={0.8} /> </Cylinder>
            <group position={[2, 0, 0]}>
                <Box args={[3.5, 0.05, 1.2]}> <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} /> </Box>
                <Box args={[3.6, 0.1, 0.1]} position={[0, 0, 0]}> <meshStandardMaterial color="#fbbf24" /> </Box>
            </group>
            <group position={[-2, 0, 0]}>
                <Box args={[3.5, 0.05, 1.2]}> <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} /> </Box>
                <Box args={[3.6, 0.1, 0.1]} position={[0, 0, 0]}> <meshStandardMaterial color="#fbbf24" /> </Box>
            </group>
        </group>
    );

    // --- RENDER SELECTION ---

    const renderGeometry = () => {
        // Use Imported Model for Hub and Industrial Modules (to showcase it)
        switch (type) {
            case 'hub': return <ImportedModel scale={3} />; // Make Hub Huge
            case 'fab': return <ImportedModel scale={2.5} rotation={[0, Math.PI / 2, 0]} />;
            case 'cargo': return <ImportedModel scale={2.5} rotation={[0, Math.PI / 2, 0]} />; // Use import for cargo too

            case 'lab': return <InflatableHab color="#f1f5f9" />;
            case 'quarters': return <InflatableHab color="#e0e7ff" />;
            case 'hydro':
                return (
                    <group>
                        <Sphere args={[1.3, 32, 32]}> <meshStandardMaterial color="#10b981" transparent opacity={0.3} roughness={0} metalness={0.9} /> </Sphere>
                        <Box args={[0.8, 0.8, 0.8]}> <meshStandardMaterial color="#22c55e" wireframe /> </Box>
                    </group>
                );
            case 'power': return <PowerTruss />;
            case 'airlock':
                return (
                    <group>
                        <Sphere args={[1, 32, 32]}> <meshStandardMaterial color="#cbd5e1" metalness={0.8} /> </Sphere>
                        <Cylinder args={[0.4, 0.4, 0.2]} position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}> <meshStandardMaterial color="#333" /> </Cylinder>
                        <Box args={[0.1, 0.1, 0.05]} position={[0.3, 0.3, 0.9]}> <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} /> </Box>
                    </group>
                );
            case 'repair': return <ImportedModel scale={2} />;
            default: return <Box args={[1, 1, 1]}> <meshStandardMaterial color="#9ca3af" /> </Box>;
        }
    };

    return (
        <group
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <mesh ref={meshRef}>
                {renderGeometry()}
            </mesh>

            {hovered && (
                <Text
                    position={[0, 2, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="black"
                >
                    {spec.title}
                </Text>
            )}

            {type !== 'hub' && (
                <group ref={(node) => node?.lookAt(0, 0, 0)}>
                    <Truss length={3} />
                </group>
            )}
        </group>
    );
}

// Preload the model to avoid pop-in
useGLTF.preload(`${import.meta.env.BASE_URL}models/Meshy_AI__Vishwakarma_Modular_0115130558_texture.glb`);
