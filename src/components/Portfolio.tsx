import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DEFAULT_PORTFOLIO = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Guest Posting', 'Content Strategy'],
    title: 'Scaling Organic Acquisition for FinTech SaaS',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Link Building', 'E-commerce'],
    title: 'Dominating SERPs for Luxury Retailer',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Local SEO', 'GBP Optimization'],
    title: 'Unlocking Local Dominance for Law Firm',
  },
  {
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Technical SEO', 'Audits'],
    title: 'Site Speed & Core Web Vitals Optimization',
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState(DEFAULT_PORTFOLIO);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    }
    
    // Only fetch if env variables are defined
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchProjects();
    }
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">My Portfolio</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main">
              My Latest <span className="text-accent">Projects</span>
            </h2>
          </div>
          
          <a href="#contact" className="inline-flex items-center bg-primary text-white pl-6 pr-2 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors group">
            View All Projects
            <div className="w-8 h-8 ml-3 bg-accent rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="rounded-2xl overflow-hidden mb-6 h-64">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-text-main leading-tight max-w-[80%]">{item.title}</h3>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 cursor-pointer hover:bg-primary-dark transition-colors">
                  <ArrowRight size={18} className="transform -rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
