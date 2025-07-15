import React from 'react';
import { motion } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';

interface Service {
    title: string;
    description: string;
    image: string;
}

interface ServiceDetailProps {
    service: Service;
    onClose: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-background-primary/50 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="w-full max-w-5xl h-full max-h-[85vh] bg-background-secondary rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
            >
                <div className="w-full md:w-1/2 h-64 md:h-full flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex flex-col overflow-y-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-accent-primary mb-4">{service.title}</h2>
                    <p className="text-lg text-text-secondary leading-relaxed">{service.description}</p>
                    <div className="mt-auto pt-8">
                       <button 
                         onClick={onClose} 
                         className="bg-accent-primary text-primary-text px-6 py-3 rounded-full font-semibold hover:bg-accent-secondary transition-colors"
                       >
                           Volver a Servicios
                       </button>
                    </div>
                </div>
            </motion.div>
             <button 
                onClick={onClose} 
                className="absolute top-6 right-6 text-text-primary hover:text-white"
                aria-label="Cerrar"
             >
                <CloseIcon className="w-8 h-8" />
            </button>
        </motion.div>
    );
}; 