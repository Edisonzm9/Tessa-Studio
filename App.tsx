import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Philosophy } from './components/Philosophy';
import { Testimonials } from './components/Testimonials';
import { SolutionsAssistant } from './components/SolutionsAssistant';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="dark bg-background-primary min-h-screen text-text-primary antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <SolutionsAssistant />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;