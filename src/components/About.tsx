import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DEFAULT_ABOUT = {
  title: "Who is Mahad SEO?",
  description: "I am a results-driven SEO specialist dedicated to helping businesses scale organically. With a deep understanding of search algorithms and a strict adherence to white-hat techniques, I build strategies that deliver sustainable, long-term traffic and revenue growth.",
  image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  stat1_value: "100+",
  stat1_label: "Projects Completed",
  stat2_value: "50M+",
  stat2_label: "Organic Traffic Generated",
  stat3_value: "5+",
  stat3_label: "Years Experience"
};

export default function About() {
  const [content, setContent] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        const { data, error } = await supabase.from('site_content').select('content').eq('section', 'about').single();
        if (!error && data?.content) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Error fetching about content", err);
      }
    }
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchAboutContent();
    }
  }, []);

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
                src={content.image} 
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
              {content.title}
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              {content.description}
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">{content.stat1_value}</h4>
                <p className="text-sm text-white/60">{content.stat1_label}</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">{content.stat2_value}</h4>
                <p className="text-sm text-white/60">{content.stat2_label}</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">{content.stat3_value}</h4>
                <p className="text-sm text-white/60">{content.stat3_label}</p>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors">
              Get in Touch <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
