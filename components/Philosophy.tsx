import React from 'react';

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-32 bg-[--background-secondary] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#cb997e]/10 rounded-full filter blur-3xl opacity-40"></div>
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#a5a58d]/10 rounded-full filter blur-3xl opacity-40"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-[--text-primary] mb-6">Nuestra Filosofía</h2>
              <div className="w-24 h-1 bg-[--accent-primary] rounded mb-8"></div>
              <p className="text-lg text-[--text-primary] mb-4 leading-relaxed">
                En Tessa Studio, creemos en la tecnología como un arte. Nuestra misión es fusionar la innovación con un diseño excepcional para crear soluciones que no solo funcionen a la perfección, sino que también inspiren.
              </p>
              <p className="text-lg text-[--text-secondary] leading-relaxed">
                Nos dedicamos a la excelencia, la personalización y la construcción de relaciones a largo plazo. Cada proyecto es una colaboración, un viaje para transformar ideas audaces en realidades digitales impactantes.
              </p>
            </div>
          </div>
          <div className="relative h-64 lg:h-96 flex items-center justify-center">
             <div className="w-full h-full border-2 border-dashed border-[--border-secondary] rounded-3xl flex items-center justify-center">
                <p className="text-[--text-secondary]/50">Elegancia Funcional</p>
             </div>
             <div className="absolute w-full h-full border-2 border-dashed border-[--border-primary] rounded-3xl transform rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};