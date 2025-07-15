import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particleCount = 5000;

// Función para crear textura circular (mover arriba para evitar error)
const createCircularTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

interface Scene3DProps {
    theme: 'light' | 'dark';
}

export const Scene3D: React.FC = () => {
  const points = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        p[i3] = (Math.random() - 0.5) * 10;
        p[i3 + 1] = (Math.random() - 0.5) * 10;
        p[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();
    
    // Paleta de colores base más amplia
    const colorPalette = [
      '#D6E3F8',
      '#BCD7EF',
      '#A2BFDE',
      '#89A8CB',
      '#708BA3',
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      color.set(randomColor);
      color.toArray(colors, i * 3);
    }
    return colors;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
        points.current.rotation.y += delta * 0.03;

        const positions = points.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.getElapsedTime() * 0.5;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const y = positions[i3 + 1];
            
            positions[i3+1] += Math.sin(time + x) * 0.002;
            positions[i3+2] += Math.cos(time + y) * 0.002;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const pointMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        map: createCircularTexture()
    });
  }, []);

  return (
    <points ref={points} material={pointMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleColors, 3]}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};