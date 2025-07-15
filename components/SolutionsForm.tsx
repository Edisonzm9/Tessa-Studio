import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FORM_OPTIONS } from '../constants';
import type { FormData } from '../types';
import { ArrowLeft } from './icons/ArrowLeft';
import { ArrowRight } from './icons/ArrowRight';

interface SolutionsFormProps {
  onSubmit: (data: FormData) => void;
}

export const SolutionsForm: React.FC<SolutionsFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: FORM_OPTIONS.industry[0],
    employees: FORM_OPTIONS.employees[0],
    budget: FORM_OPTIONS.budget[0],
    techMaturity: FORM_OPTIONS.techMaturity[0],
    challenges: '',
    features: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFeatureChange = (feature: string) => {
    const newFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features: newFeatures });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 2));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      onSubmit(formData);
    }
  };
  
  const commonInputClass = "w-full bg-gray-900/50 dark:bg-gray-50/50 border border-border-secondary rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/70 focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all duration-300";

  const steps = [
    // Step 1: Contact Info
    <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Información de Contacto</h3>
      <div className="space-y-4">
        <input type="text" name="companyName" placeholder="Nombre de la Empresa" value={formData.companyName} onChange={handleChange} className={commonInputClass} required />
        <input type="text" name="contactName" placeholder="Nombre y Apellido del Contacto" value={formData.contactName} onChange={handleChange} className={commonInputClass} required />
        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} className={commonInputClass} required />
        <input type="tel" name="phone" placeholder="Número de Teléfono" value={formData.phone} onChange={handleChange} className={commonInputClass} />
      </div>
    </motion.div>,
    // Step 2: Company Profile
    <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Perfil de la Empresa</h3>
      <div className="space-y-4">
        <select name="industry" value={formData.industry} onChange={handleChange} className={commonInputClass}>
          {FORM_OPTIONS.industry.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select name="employees" value={formData.employees} onChange={handleChange} className={commonInputClass}>
            {FORM_OPTIONS.employees.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select name="budget" value={formData.budget} onChange={handleChange} className={commonInputClass}>
            {FORM_OPTIONS.budget.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select name="techMaturity" value={formData.techMaturity} onChange={handleChange} className={commonInputClass}>
            {FORM_OPTIONS.techMaturity.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      </div>
    </motion.div>,
    // Step 3: Needs
    <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Necesidades y Desafíos</h3>
      <div className="space-y-6">
        <textarea name="challenges" placeholder="Describe tus principales desafíos o necesidades actuales..." value={formData.challenges} onChange={handleChange} className={`${commonInputClass} h-28`} required></textarea>
        <div>
          <label className="block text-text-secondary mb-3">Funcionalidades Específicas Requeridas:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FORM_OPTIONS.features.map(feature => (
              <label key={feature} className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200 cursor-pointer ${formData.features.includes(feature) ? 'bg-accent-primary/20 border-accent-primary' : 'bg-background-primary border-border-secondary'}`}>
                <input type="checkbox" checked={formData.features.includes(feature)} onChange={() => handleFeatureChange(feature)} className="hidden" />
                <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${formData.features.includes(feature) ? 'bg-accent-primary border-accent-primary' : 'border-border-secondary'}`}>
                   {formData.features.includes(feature) && <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                </div>
                <span className="text-sm text-text-primary">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ];

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden relative">
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-border-primary flex justify-between items-center">
        <button type="button" onClick={prevStep} disabled={step === 0} className="flex items-center gap-2 px-4 py-2 rounded-full text-text-primary hover:bg-background-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Anterior
        </button>
        <div className="flex items-center space-x-2">
            {[0, 1, 2].map(i => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= i ? 'bg-accent-primary' : 'bg-border-secondary'}`}></div>
            ))}
        </div>
        {step < 2 && (
          <button type="button" onClick={nextStep} className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-primary-text font-semibold hover:bg-accent-secondary transition-colors">
            Siguiente
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
        {step === 2 && (
          <button type="submit" className="px-6 py-3 rounded-full bg-accent-primary text-primary-text font-semibold hover:bg-accent-secondary transition-colors">
            Generar Informe
          </button>
        )}
      </div>
    </form>
  );
};