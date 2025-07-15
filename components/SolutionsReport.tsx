import React from 'react';
import { motion } from 'framer-motion';
import type { SolutionsReportData } from '../types';

interface SolutionsReportProps {
  report: SolutionsReportData;
  onReset: () => void;
}

export const SolutionsReport: React.FC<SolutionsReportProps> = ({ report, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-3xl font-bold text-text-primary mb-2">Tu Informe de Soluciones</h3>
        <p className="text-text-secondary">Basado en tu perfil, hemos generado las siguientes recomendaciones.</p>
      </div>

      <div className="p-6 bg-background-primary border border-border-primary rounded-xl">
        <h4 className="font-semibold text-lg text-accent-primary mb-2">Resumen del Análisis</h4>
        <p className="text-text-secondary">{report.analysis_summary}</p>
      </div>
      
      {report.recommendation_type === 'EXISTING_SOFTWARE' && (
        <div>
          <h4 className="font-semibold text-xl text-text-primary mb-4">Software Recomendado</h4>
          <div className="space-y-4">
            {report.recommendations.map((rec, index) => (
              <div key={index} className="bg-background-primary border border-border-primary rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <h5 className="font-bold text-lg text-text-primary">{rec.name}</h5>
                  <span className="text-sm bg-accent-primary/20 text-text-primary font-medium px-3 py-1 rounded-full">{rec.estimated_cost}</span>
                </div>
                <p className="mt-2 text-text-secondary">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {report.recommendation_type === 'CUSTOM_SOLUTION' && (
         <div>
            <h4 className="font-semibold text-xl text-text-primary mb-4">Recomendación: Solución a Medida</h4>
            <div className="bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/50 rounded-xl p-6 shadow-lg">
                <h5 className="font-bold text-lg text-accent-primary mb-2">¿Por qué una solución a medida?</h5>
                <p className="text-text-secondary">{report.custom_solution_rationale}</p>
                <p className="mt-4 text-text-primary">
                  Una solución personalizada de <span className="font-bold">Tessa Studio</span> te brindará la flexibilidad y el poder que necesitas para superar tus desafíos únicos y escalar sin límites.
                </p>
            </div>
        </div>
      )}
      
      <div className="text-center pt-6 border-t border-border-primary">
        <button
          onClick={onReset}
          className="bg-accent-primary text-black px-8 py-3 rounded-full font-semibold hover:bg-accent-secondary transition-colors"
        >
          Generar un Nuevo Informe
        </button>
      </div>
    </motion.div>
  );
};