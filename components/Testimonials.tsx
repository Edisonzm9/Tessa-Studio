import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[--text-primary]">Lo Que Dicen Nuestros Clientes</h2>
          <div className="mt-4 w-24 h-1 bg-[--accent-primary] mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial, index) => (
                <div key={index} className="bg-[--background-secondary] border border-[--border-primary] rounded-xl p-8 flex flex-col">
                    <p className="text-[--text-primary] italic flex-grow">"{testimonial.quote}"</p>
                    <div className="mt-6 pt-6 border-t border-[--border-primary]">
                        <p className="font-bold text-[--text-primary]">{testimonial.name}</p>
                        <p className="text-sm text-[--text-secondary]">{testimonial.company}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};