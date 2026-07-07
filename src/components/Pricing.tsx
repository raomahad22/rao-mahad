import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PRICING = [
  {
    title: 'Hourly',
    price: '$80',
    period: '/ Hour',
    highlighted: false,
    features: [
      'Technical SEO Audit',
      'Keyword Research',
      'On-Page Optimization',
      'Strategy Consultation',
      'Quick Fixes',
      'Reporting'
    ]
  },
  {
    title: 'Monthly',
    price: '$1200',
    period: '/ Month',
    highlighted: true,
    features: [
      'Comprehensive SEO Strategy',
      '4 Guest Posts / Month',
      'Content Optimization',
      'Local SEO Management',
      'Technical Monitoring',
      'Detailed Monthly Reports'
    ]
  },
  {
    title: 'Quarterly',
    price: '$3200',
    period: '/ Quarter',
    highlighted: false,
    features: [
      'Advanced SEO Strategy',
      '15 Guest Posts / Quarter',
      'Full Content Overhaul',
      'Competitor Analysis',
      'Conversion Rate Optimization',
      'Bi-Weekly Strategy Calls'
    ]
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">Pricing Table</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-accent">Pricing Model</span>
            </h2>
          </div>
          
          <div className="inline-flex items-center bg-transparent border border-white/20 pl-6 pr-2 py-2 rounded-full font-semibold">
            Get Started
            <div className="w-8 h-8 ml-3 bg-accent rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {PRICING.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 ${
                plan.highlighted 
                  ? 'bg-accent text-text-main shadow-2xl scale-105 z-10' 
                  : 'bg-[#1E3728] border border-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${plan.highlighted ? 'text-text-main' : 'text-white'}`}>{plan.title}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${plan.highlighted ? 'border-2 border-text-main text-text-main' : 'border-2 border-accent text-accent'}`}>
                  <ArrowRight size={14} className="transform -rotate-45" />
                </div>
              </div>
              
              <div className="mb-8">
                <span className={`text-4xl md:text-5xl font-bold ${plan.highlighted ? 'text-text-main' : 'text-accent'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? 'text-text-main/80' : 'text-white/60'}`}>{plan.period}</span>
              </div>
              
              <ul className="space-y-4">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className={plan.highlighted ? 'text-text-main' : 'text-accent'} />
                    <span className={`text-sm ${plan.highlighted ? 'text-text-main/90' : 'text-white/80'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
