import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene3D } from './Scene3D';
import { ArrowRight } from './icons/ArrowRight';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background-primary">
         <Suspense fallback={<div className="w-full h-full bg-background-primary" />}>
            <Canvas>
                <Scene3D />
            </Canvas>
         </Suspense>
      </div>
      <div className="relative z-10 p-4 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary tracking-tighter leading-tight">
          Tessa Studio
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-text-secondary">
          Centro de Innovación Tecnológica
        </p>
        <a 
            href="#assistant"
            className="mt-8 inline-flex items-center gap-2 bg-accent-primary text-primary-text px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-secondary transition-transform duration-300 transform hover:scale-105 shadow-2xl shadow-accent-primary/40"
        >
          Descubre tu Solución
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};