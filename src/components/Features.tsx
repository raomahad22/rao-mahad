import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, BarChart4, Handshake, FileText, Link2, Settings, X, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  { 
    title: 'White Hat SEO', 
    icon: ShieldCheck, 
    desc: 'Strict adherence to Google guidelines for sustainable, penalty-free growth.',
    details: 'I strictly follow search engine guidelines to ensure your website is safe from penalties and algorithms updates. This long-term approach guarantees your rankings will remain stable and continue to grow over time without risking manual actions.'
  },
  { 
    title: 'Transparent Reporting', 
    icon: BarChart4, 
    desc: 'Clear, jargon-free monthly reports detailing progress and ROI.',
    details: 'You will receive detailed, easy-to-understand reports every month showing exactly what work was done, how your rankings have improved, and the direct return on investment. No hiding behind technical jargon.'
  },
  { 
    title: 'Manual Outreach', 
    icon: Handshake, 
    desc: 'Personalized link building, no automated spam or PBNs.',
    details: 'Every backlink is secured through genuine relationship building and manual outreach to real website owners. I never use automated tools, spam networks, or Private Blog Networks (PBNs) that could harm your site.'
  },
  { 
    title: 'Quality Content', 
    icon: FileText, 
    desc: 'Expertly written content that satisfies search intent and drives conversions.',
    details: 'Content is king. I produce comprehensive, highly-researched content tailored to your audience. This not only ranks well on Google but actually engages your visitors and turns them into paying customers.'
  },
  { 
    title: 'Real Authority Backlinks', 
    icon: Link2, 
    desc: 'Placements on genuine websites with real traffic, not link farms.',
    details: 'Links are only placed on relevant, high-authority domains that have actual human traffic. This sends the strongest possible trust signals to Google, rapidly boosting your own domain authority.'
  },
  { 
    title: 'Custom Strategies', 
    icon: Settings, 
    desc: 'Tailored campaigns based on your specific industry and competitors.',
    details: 'There is no one-size-fits-all in SEO. I analyze your unique market, reverse-engineer your top competitors, and build a customized roadmap specifically designed to dominate your niche.'
  },
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);

  return (
    <>
      <section className="py-24 bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Me?</h2>
            <p className="text-slate-400 text-lg">
              I prioritize quality, transparency, and sustainable results over quick fixes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
                onClick={() => setSelectedFeature(feature)}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl cursor-pointer relative group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative text-left"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-800 text-white hover:bg-red-500/20 hover:text-red-400 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                <selectedFeature.icon className="h-8 w-8" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{selectedFeature.title}</h3>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mb-6">
                <div className="flex gap-3">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-base font-medium">
                    {selectedFeature.desc}
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                {selectedFeature.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
