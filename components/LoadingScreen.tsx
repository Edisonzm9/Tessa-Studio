import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      key="loader"
    >
      <motion.h1
        className="text-4xl font-bold text-text-primary tracking-wider"
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1.02, 0.98],
          transition: {
            duration: 2.0,
            ease: 'easeInOut',
            repeat: Infinity,
          },
        }}
      >
        Tessa Studio
      </motion.h1>
    </motion.div>
  );
}; 