import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart4, Handshake, FileText, Link2, Settings, DollarSign } from 'lucide-react';

const FEATURES = [
  { title: 'White Hat SEO', icon: ShieldCheck, desc: 'Strict adherence to Google guidelines for sustainable, penalty-free growth.' },
  { title: 'Transparent Reporting', icon: BarChart4, desc: 'Clear, jargon-free monthly reports detailing progress and ROI.' },
  { title: 'Manual Outreach', icon: Handshake, desc: 'Personalized link building, no automated spam or PBNs.' },
  { title: 'Quality Content', icon: FileText, desc: 'Expertly written content that satisfies search intent and drives conversions.' },
  { title: 'Real Authority Backlinks', icon: Link2, desc: 'Placements on genuine websites with real traffic, not link farms.' },
  { title: 'Custom Strategies', icon: Settings, desc: 'Tailored campaigns based on your specific industry and competitors.' },
];

export default function Features() {
  return (
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
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6">
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
  );
}
