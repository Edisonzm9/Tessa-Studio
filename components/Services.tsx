import React from 'react';
import { SERVICES_DATA } from '../constants';
import { CodeIcon } from './icons/CodeIcon';
import { AiIcon } from './icons/AiIcon';
import { AutomationIcon } from './icons/AutomationIcon';
import { MobileIcon } from './icons/MobileIcon';
import { DataIcon } from './icons/DataIcon';

const ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  code: CodeIcon,
  ai: AiIcon,
  automation: AutomationIcon,
  mobile: MobileIcon,
  data: DataIcon,
};

export const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[--text-primary]">Nuestros Servicios</h2>
          <div className="mt-4 w-24 h-1 bg-[--accent-primary] mx-auto rounded"></div>
          <p className="mt-6 text-lg text-[--text-secondary] max-w-2xl mx-auto">
            Impulsamos la innovación a través de soluciones tecnológicas de vanguardia, diseñadas para transformar tu negocio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <div
                key={index}
                className="bg-[--background-secondary] border border-[--border-primary] rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:border-[--accent-primary]/50 hover:shadow-2xl hover:shadow-[#cb997e]/20"
              >
                <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-[--background-primary] border border-[--border-primary]">
                  <Icon className="w-8 h-8 text-[--accent-primary]" />
                </div>
                <h3 className="text-2xl font-bold text-[--text-primary] mb-3">{service.title}</h3>
                <p className="text-[--text-secondary] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};