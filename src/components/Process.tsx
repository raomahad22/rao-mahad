import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Activity, Lightbulb, Rocket, Zap, BarChart, X, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { 
    title: 'Research', 
    icon: Search, 
    desc: 'In-depth market and competitor analysis.',
    details: 'We start by deeply understanding your industry landscape. This involves identifying your top competitors, analyzing their backlink profiles, discovering high-value keywords they are ranking for, and finding the gaps we can exploit to outrank them.'
  },
  { 
    title: 'SEO Audit', 
    icon: Activity, 
    desc: 'Comprehensive technical and content review.',
    details: 'A complete diagnostic of your website. We look for technical issues like crawl errors, slow page speeds, broken links, and poor mobile usability. We also evaluate your existing content structure to ensure search engines can easily understand and index your site.'
  },
  { 
    title: 'Strategy', 
    icon: Lightbulb, 
    desc: 'Custom roadmap tailored to your goals.',
    details: 'Based on our research and audit, we develop a step-by-step action plan. This roadmap outlines exactly what content needs to be created, what technical fixes to apply first, and the specific link-building campaigns required to hit your traffic goals.'
  },
  { 
    title: 'Implementation', 
    icon: Rocket, 
    desc: 'Executing on-page and technical fixes.',
    details: 'We roll up our sleeves and fix the issues. This means optimizing meta tags, restructuring URLs, improving internal linking, speeding up your site, and updating existing content to align perfectly with search intent and target keywords.'
  },
  { 
    title: 'Optimization', 
    icon: Zap, 
    desc: 'Continuous link building and content creation.',
    details: 'SEO is an ongoing process. We continuously publish high-quality, targeted content and run manual outreach campaigns to secure powerful backlinks from authoritative sites, steadily increasing your domain authority and organic footprint.'
  },
  { 
    title: 'Reporting', 
    icon: BarChart, 
    desc: 'Monthly performance and ROI tracking.',
    details: 'Total transparency. At the end of every month, you receive a comprehensive report detailing the work completed, changes in keyword rankings, growth in organic traffic, and the concrete business leads generated from our efforts.'
  },
];

export default function Process() {
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  return (
    <>
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
                  whileHover={{ scale: 1.1, y: -8 }}
                  onClick={() => setSelectedStep({ ...step, stepNumber: index + 1 })}
                  className="flex flex-col items-center text-center group transition-all duration-300 cursor-pointer"
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

      {/* Process Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative text-left"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary relative">
                  <selectedStep.icon className="h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full text-xs font-bold flex items-center justify-center text-white">
                    {selectedStep.stepNumber}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-main">{selectedStep.title}</h3>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 mb-6">
                <div className="flex gap-3">
                  <CheckCircle2 size={24} className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-text-main text-base font-medium">
                    {selectedStep.desc}
                  </p>
                </div>
              </div>

              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                {selectedStep.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
