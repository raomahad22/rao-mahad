import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 bg-accent rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mahad SEO" 
                className="absolute inset-0 w-full h-full object-cover rounded-full transform -translate-y-4 translate-x-4 border-8 border-primary"
              />
              
              {/* Badges */}
              <div className="absolute top-10 -left-6 bg-accent text-white text-xs font-bold px-4 py-2 rounded-full border-2 border-primary">
                Guest Posting
              </div>
              <div className="absolute bottom-20 -right-6 bg-white text-primary text-xs font-bold px-4 py-2 rounded-full border-2 border-primary">
                Technical SEO
              </div>
              <div className="absolute -bottom-4 left-10 bg-[#1E3728] text-accent text-xs font-bold px-4 py-2 rounded-full border-2 border-primary">
                Local SEO
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">About Me</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who is <span className="text-accent">Mahad SEO?</span>
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              I am a results-driven SEO specialist dedicated to helping businesses scale organically. With a deep understanding of search algorithms and a strict adherence to white-hat techniques, I build strategies that deliver sustainable, long-term traffic and revenue growth.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">100+</h4>
                <p className="text-sm text-white/60">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">50+</h4>
                <p className="text-sm text-white/60">Industry Covered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">5+</h4>
                <p className="text-sm text-white/60">Years of Experience</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#contact" className="inline-flex items-center bg-transparent border border-white text-white pl-6 pr-2 py-2 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors group">
                Download CV
                <div className="w-8 h-8 ml-3 bg-accent rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <ArrowRight size={16} />
                </div>
              </a>
              <span className="text-accent font-serif italic text-2xl">Mahad</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
