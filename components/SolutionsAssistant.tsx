import React, { useState } from 'react';
import { SolutionsForm } from './SolutionsForm';
import { SolutionsReport } from './SolutionsReport';
import { getAutonomousReport } from '../services/recommendationService';
import type { FormData, SolutionsReportData } from '../types';

export const SolutionsAssistant = () => {
  const [report, setReport] = useState<SolutionsReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      // Simulate a longer delay for a better UX, as the autonomous report is very fast
      await new Promise(res => setTimeout(res, 1500));
      const result = await getAutonomousReport(data);
      setReport(result);
    } catch (e: any) {
      setError(e.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <section id="assistant" className="py-20 sm:py-32 bg-background-primary border-y border-border-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary">Asistente de Soluciones</h2>
          <div className="mt-4 w-24 h-1 bg-accent-primary mx-auto rounded"></div>
          <p className="mt-6 text-lg text-text-secondary max-w-3xl mx-auto">
            Completa nuestro diagnóstico empresarial interactivo y deja que nuestro sistema genere un informe de soluciones tecnológicas a tu medida.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-background-secondary border border-border-primary rounded-2xl p-6 sm:p-10 shadow-2xl shadow-accent-primary/10">
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-primary"></div>
              <p className="mt-6 text-xl text-text-primary">Analizando tus necesidades...</p>
              <p className="text-text-secondary">Nuestro sistema está generando tu informe personalizado.</p>
            </div>
          )}

          {error && !isLoading && (
             <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="text-xl text-red-400">Error al generar el informe</p>
                <p className="mt-2 text-text-secondary">{error}</p>
                <button
                    onClick={handleReset}
                    className="mt-6 bg-accent-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-accent-secondary transition-colors"
                >
                    Intentar de Nuevo
                </button>
            </div>
          )}

          {!isLoading && !report && !error && (
            <SolutionsForm onSubmit={handleFormSubmit} />
          )}

          {report && !isLoading && (
            <SolutionsReport report={report} onReset={handleReset} />
          )}
        </div>
      </div>
    </section>
  );
};