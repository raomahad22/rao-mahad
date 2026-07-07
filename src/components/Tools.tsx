import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Search, Activity, Globe, MapPin, Target } from 'lucide-react';

const TOOLS = [
  { name: 'Ahrefs', percent: '98%', icon: Globe, color: 'text-orange-500' },
  { name: 'Semrush', percent: '92%', icon: Target, color: 'text-orange-400' },
  { name: 'Screaming Frog', percent: '90%', icon: Search, color: 'text-emerald-500' },
  { name: 'Google Analytics', percent: '95%', icon: LineChart, color: 'text-amber-500' },
  { name: 'Search Console', percent: '90%', icon: Activity, color: 'text-blue-500' },
  { name: 'Local SEO Tools', percent: '85%', icon: MapPin, color: 'text-red-500' },
];

export default function Tools() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-accent"></span>
          <p className="text-accent font-semibold text-sm uppercase tracking-wider">My Favorite Tools</p>
          <span className="w-4 h-0.5 bg-accent"></span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-16">
          Exploring the Tools<br />
          <span className="text-accent">Behind My Success</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full shadow-lg shadow-gray-200/50 flex flex-col items-center justify-center mb-4 group hover:-translate-y-2 transition-transform duration-300">
                <tool.icon className={`h-8 w-8 mb-2 ${tool.color} group-hover:scale-110 transition-transform`} />
                <span className="font-bold text-text-main text-lg">{tool.percent}</span>
              </div>
              <p className="text-text-muted font-medium text-sm">{tool.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
