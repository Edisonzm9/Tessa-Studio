import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Philosophy } from './components/Philosophy';
import { Testimonials } from './components/Testimonials';
import { SolutionsAssistant } from './components/SolutionsAssistant';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minimumTime = new Promise(resolve => setTimeout(resolve, 2500));
    const pageLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve(true);
        } else {
            window.addEventListener('load', () => resolve(true));
        }
    });

    Promise.all([minimumTime, pageLoaded]).then(() => {
        setIsLoading(false);
    });
  }, []);

  return (
    <div className="dark bg-background-primary min-h-screen text-text-primary antialiased">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            <Header />
            <main>
              <Hero />
              <Services />
              <Philosophy />
              <SolutionsAssistant />
              <Testimonials />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;