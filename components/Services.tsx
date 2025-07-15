import React, { Suspense } from 'react';
import { ServiceScene } from './ServiceScene';

export const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center"><p className="text-white">Cargando Escena 3D...</p></div>}>
            <ServiceScene />
          </Suspense>
      </div>
    </section>
  );
};