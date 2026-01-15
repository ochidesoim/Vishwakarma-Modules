import { useRef, useState, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Dodecahedron, Text } from '@react-three/drei';
import type { ModuleType } from '../../types/station';
import { MODULE_SPECS } from '../../data/modules';
import type { Mesh } from 'three';

interface Module3DProps {
    type: ModuleType;
    position: [number, number, number];
    isSelected?: boolean;
    onClick?: () => void;
}

export function Module3D({ type, position, isSelected: _isSelected, onClick }: Module3DProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Scaling effect on hover
    useFrame((_, _delta) => {
        if (meshRef.current) {
            if (hovered) {
                meshRef.current.scale.lerp({ x: 1.1, y: 1.1, z: 1.1 }, 0.1);
            } else {
                meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
            }
        }
    });

    useLayoutEffect(() => {
        if (meshRef.current) {
            // Face the center (0,0,0) unless we ARE the center
            if (position[0] !== 0 || position[2] !== 0) {
                meshRef.current.lookAt(0, 0, 0);
            }
        }
    }, [position]);

    const spec = MODULE_SPECS[type];

    // Geometry Switcher
    const renderGeometry = () => {
        // Rotation to align "Height" (Y) along Radial Axis (Z)
        // Since lookAt(0,0,0) makes -Z point to target? Or +Z? 
        // Threejs lookAt: +Z axis points to target.
        // So we want geometry's "Long" axis to be Z.
        // Cylinder default is Y. Rotate X 90 -> Z.
        const alignZ: [number, number, number] = [Math.PI / 2, 0, 0];
        // Box default X=width, Y=height, Z=depth.
        // Fab Box [1.8, 1.2, 1.2]. 1.8 is X. Rotate Y 90 -> 1.8 is Z.
        const alignBoxZ: [number, number, number] = [0, Math.PI / 2, 0];

        switch (type) {
            case 'hub':
                return <Dodecahedron args={[1.2, 0]}> <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} /> </Dodecahedron>;
            case 'lab':
            case 'health':
                return <Cylinder args={[0.8, 0.8, 2, 16]} rotation={alignZ}> <meshStandardMaterial color={type === 'health' ? '#ef4444' : '#3b82f6'} metalness={0.5} roughness={0.5} /> </Cylinder>;
            case 'fab':
                return <Box args={[1.8, 1.2, 1.2]} rotation={alignBoxZ}> <meshStandardMaterial color="#22c55e" metalness={0.6} roughness={0.4} /> </Box>;
            case 'power':
                return (
                    // Rotate entire group to align Z
                    <group rotation={alignZ}>
                        {/* Central Hub (lying on Z now) */}
                        <Box args={[0.5, 2, 0.5]} position={[0, 0, 0]}> <meshStandardMaterial color="#eab308" /> </Box>
                        {/* Panels (Wings sticking out X) */}
                        <Box args={[3, 0.1, 1]} position={[0, 0.8, 0]}> <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} /> </Box>
                        <Box args={[3, 0.1, 1]} position={[0, -0.8, 0]}> <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} /> </Box>
                    </group>
                );
            case 'hydro':
                return <Sphere args={[1, 16, 16]}> <meshStandardMaterial color="#10b981" transparent opacity={0.8} /> </Sphere>;
            case 'airlock':
                return <Sphere args={[0.8, 16, 16]}> <meshStandardMaterial color="#06b6d4" metalness={0.7} roughness={0.2} /> </Sphere>;
            case 'cargo':
                return <Box args={[1.5, 1.5, 1.5]}> <meshStandardMaterial color="#f97316" roughness={0.8} /> </Box>;
            case 'quarters':
                return <Cylinder args={[1, 1, 2.2, 8]} rotation={alignZ}> <meshStandardMaterial color="#6366f1" /> </Cylinder>;
            case 'repair':
                return <Box args={[1.5, 0.5, 1.5]} rotation={alignBoxZ}> <meshStandardMaterial color="#6b7280" wireframe /> </Box>;
            default:
                return <Box args={[1, 1, 1]}> <meshStandardMaterial color="#9ca3af" /> </Box>;
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

            {/* Label on hover */}
            {hovered && (
                <Text
                    position={[0, 1.5, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="black"
                >
                    {spec.title}
                </Text>
            )}

            {/* Connection struts (visual only) */}
            {type !== 'hub' && (
                // Strut pointing to center (Z axis local)
                // Length 1.5 (half spacing).
                // Position 1.5 Z? No, local Z points to center.
                <Cylinder args={[0.1, 0.1, 3]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.5]}>
                    <meshStandardMaterial color="#374151" />
                </Cylinder>
            )}
        </group>
    );
}
