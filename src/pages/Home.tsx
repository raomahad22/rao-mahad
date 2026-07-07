import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Tools from '../components/Tools';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQs from '../components/FAQs';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent/20 selection:text-primary overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Tools />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <FAQs />
        <Contact />
      </main>
    </div>
  );
}
