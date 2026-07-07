import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DEFAULT_HERO = {
  title: "Scale Your Business With Proven SEO Strategies",
  subtitle: "I help businesses increase their organic traffic, rank higher on Google, and generate more revenue through data-driven SEO.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
};

export default function Hero() {
  const [content, setContent] = useState(DEFAULT_HERO);

  useEffect(() => {
    async function fetchHeroContent() {
      try {
        const { data, error } = await supabase.from('site_content').select('content').eq('section', 'hero').single();
        if (!error && data?.content) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Error fetching hero content", err);
      }
    }
    
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchHeroContent();
    }
  }, []);

  return (
    <section id="home" className="pt-36 lg:pt-48 pb-0 overflow-hidden bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-block border-2 border-dashed border-gray-300 px-4 py-2 mb-6 rounded-lg relative">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-accent border-2 border-white rounded-sm"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-accent border-2 border-white rounded-sm"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-accent border-2 border-white rounded-sm"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-accent border-2 border-white rounded-sm"></div>
              <span className="font-semibold text-text-muted">Hello There!</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-main leading-[1.1] mb-6">
              I'm <span className="text-accent underline decoration-4 underline-offset-8">Mahad SEO,</span><br />
              {content.title}
            </h1>
            <p className="text-lg text-text-muted mb-10 leading-relaxed max-w-lg">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-primary text-white rounded-full p-1 pr-6 hover:bg-primary-dark transition-colors cursor-pointer group">
                <a href="#portfolio" className="font-semibold text-sm pl-5 pr-4 py-3">View My Portfolio</a>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Play size={18} fill="currentColor" />
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-8 py-3.5 bg-white text-primary border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-white transition-colors"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-10 flex justify-center"
          >
            {/* Image & Yellow Circle */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-4 bg-accent rounded-full transform -translate-x-4 translate-y-4"></div>
              <img 
                src={content.image} 
                alt="Mahad" 
                className="absolute inset-0 w-full h-full object-cover rounded-full z-10 border-8 border-white"
              />
              
              {/* Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -right-4 z-20 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full border-2 border-white shadow-lg flex items-center gap-1"
              >
                <Star size={12} className="text-accent" fill="currentColor" /> SEO Specialist
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-8 z-20 bg-accent text-white text-sm font-bold px-5 py-2.5 rounded-full border-4 border-white shadow-lg"
              >
                Organic Growth
              </motion.div>
              
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 bg-primary text-white text-sm font-bold px-6 py-2 rounded-full">
                SEO Expert
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-accent w-full py-4 overflow-hidden flex whitespace-nowrap border-y-4 border-white shadow-xl relative z-20 mt-10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center text-primary font-bold text-xl uppercase tracking-wider"
        >
          {Array(8).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-6">Guest Posting</span>
              <Star size={20} className="text-white" fill="currentColor" />
              <span className="mx-6">Local SEO</span>
              <Star size={20} className="text-white" fill="currentColor" />
              <span className="mx-6">Content Strategy</span>
              <Star size={20} className="text-white" fill="currentColor" />
              <span className="mx-6">Link Building</span>
              <Star size={20} className="text-white" fill="currentColor" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
