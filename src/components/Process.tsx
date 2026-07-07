import React from 'react';
import { motion } from 'motion/react';
import { Search, Activity, Lightbulb, Rocket, Zap, BarChart } from 'lucide-react';

const STEPS = [
  { title: 'Research', icon: Search, desc: 'In-depth market and competitor analysis.' },
  { title: 'SEO Audit', icon: Activity, desc: 'Comprehensive technical and content review.' },
  { title: 'Strategy', icon: Lightbulb, desc: 'Custom roadmap tailored to your goals.' },
  { title: 'Implementation', icon: Rocket, desc: 'Executing on-page and technical fixes.' },
  { title: 'Optimization', icon: Zap, desc: 'Continuous link building and content creation.' },
  { title: 'Reporting', icon: BarChart, desc: 'Monthly performance and ROI tracking.' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">A Proven SEO Process</h2>
          <p className="text-lg text-secondary">
            Methodical execution from initial discovery to continuous scaling.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl border-2 border-gray-100 shadow-sm flex items-center justify-center text-secondary group-hover:border-primary group-hover:text-primary transition-all duration-300 mb-6 relative">
                  <step.icon className="h-7 w-7" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-100 rounded-full text-xs font-bold flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-accent mb-2">{step.title}</h3>
                <p className="text-sm text-secondary px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
