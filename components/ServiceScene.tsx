
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import { ServiceNode } from './ServiceNode';
import { SERVICES_DATA } from '../constants';
import { ServiceDetail } from './ServiceDetail';

import { CodeIcon } from './icons/CodeIcon';
import { AiIcon } from './icons/AiIcon';
import { AutomationIcon } from './icons/AutomationIcon';
import { MobileIcon } from './icons/MobileIcon';
import { DataIcon } from './icons/DataIcon';
import { UsersIcon } from './icons/UsersIcon';

const ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  consulting: UsersIcon,
  code: CodeIcon,
  ai: AiIcon,
  automation: AutomationIcon,
  mobile: MobileIcon,
  data: DataIcon,
};

// Este nuevo componente contendrá la escena 3D y los hooks de R3F.
const SceneContent = ({
  groupRef,
  serviceNodes,
  selected,
  handleNodeSelect,
}: {
  groupRef: React.RefObject<THREE.Group>;
  serviceNodes: {
    position: [number, number, number];
    title: string;
    description: string;
    iconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  selected: number | null;
  handleNodeSelect: (index: number) => void;
}) => {
  // El hook useFrame ahora está dentro de un componente que se renderizará en el Canvas.
  useFrame((state, delta) => {
    if (groupRef.current && selected === null) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#89A8CB" />

      <group ref={groupRef}>
        {serviceNodes.map((service, i) => (
          <ServiceNode
            key={i}
            position={service.position}
            service={service}
            icon={service.iconComponent}
            isSelected={selected === i}
            onSelect={() => handleNodeSelect(i)}
          />
        ))}
      </group>
    </>
  );
};


export const ServiceScene = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const controlsRef = useRef<CameraControls>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    const serviceNodes = useMemo(() => {
        const numServices = SERVICES_DATA.length;
        const radius = 3.5;
        return SERVICES_DATA.map((service, i) => {
            const angle = (i / numServices) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return {
                ...service,
                position: [x, 0, z] as [number, number, number],
                iconComponent: ICONS[service.icon],
            };
        });
    }, []);

    // El hook useFrame se ha movido al componente SceneContent.

    const handleNodeSelect = (index: number) => {
        if (selected === index) {
            setSelected(null);
            controlsRef.current?.fitToBox(new THREE.Box3(new THREE.Vector3(-5, -2, -5), new THREE.Vector3(5, 2, 5)), true);
        } else {
            setSelected(index);
            const pos = serviceNodes[index].position;
            controlsRef.current?.setLookAt(pos[0] + 3, pos[1] + 1, pos[2] + 3, pos[0], pos[1], pos[2], true);
        }
    };

    const closeDetail = () => {
        setSelected(null);
        controlsRef.current?.fitToBox(new THREE.Box3(new THREE.Vector3(-5, -2, -5), new THREE.Vector3(5, 2, 5)), true);
    };
    
    const selectedService = selected !== null ? serviceNodes[selected] : null;

    return (
        <div className="relative h-[600px] w-full">
             <Canvas
                onClick={(e) => {
                    // Previene la deselección si el clic no es directamente en el canvas
                    if (e.target === e.currentTarget) {
                        closeDetail();
                    }
                }}
             >
                <CameraControls ref={controlsRef} minDistance={3} maxDistance={10} />
                <PerspectiveCamera makeDefault position={[0, 1.5, 8]} fov={60} />
                
                <SceneContent 
                  groupRef={groupRef}
                  serviceNodes={serviceNodes}
                  selected={selected}
                  handleNodeSelect={handleNodeSelect}
                />
            </Canvas>

            <AnimatePresence>
                {selected === null && (
                    <motion.div
                        className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    >
                        <h2 className="text-4xl font-bold text-text-primary">Nuestros Servicios</h2>
                        <div className="mt-4 w-24 h-1 bg-accent-primary mx-auto rounded"></div>
                        <p className="mt-4 text-lg text-text-secondary">
                            Haz clic en un nodo para explorar nuestras áreas de especialización.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {selectedService && <ServiceDetail service={selectedService} onClose={closeDetail} />}
            </AnimatePresence>
        </div>
    )
} 