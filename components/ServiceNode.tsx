
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ServiceNode = ({ position, service, onSelect, isSelected, icon: Icon }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Bobbing animation
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
      
      // Rotation
      if (isHovered && !isSelected) {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.5;
      } else {
        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.1;
      }
    }
  });

  const handlePointerOver = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  }

  const scale = isSelected ? 1.5 : isHovered ? 1.2 : 1;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={scale}
      >
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color={isHovered || isSelected ? '#A2BFDE' : '#89A8CB'}
          emissive={isHovered || isSelected ? '#A2BFDE' : '#89A8CB'}
          emissiveIntensity={isHovered || isSelected ? 0.4 : 0.15}
          metalness={0.8}
          roughness={0.2}
          wireframe={!isSelected}
        />
      </mesh>
      <Billboard>
        <Text
          position={[0, -1.1, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineColor="black"
          outlineWidth={0.01}
        >
          {service.title}
        </Text>
      </Billboard>
    </group>
  );
}; 