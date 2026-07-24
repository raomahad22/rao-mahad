import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DEFAULT_PORTFOLIO = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Guest Posting', 'Content Strategy'],
    title: 'Scaling Organic Acquisition for FinTech SaaS',
    description: 'We developed a comprehensive content and backlink strategy that grew organic traffic by 150% in 6 months.'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Link Building', 'E-commerce'],
    title: 'Dominating SERPs for Luxury Retailer',
    description: 'Secured high-authority placements that improved core product rankings to the top 3 spots on Google.'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Local SEO', 'GBP Optimization'],
    title: 'Unlocking Local Dominance for Law Firm',
    description: 'Optimized their Google Business Profile and local citations to increase local search leads by 300%.'
  },
  {
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Technical SEO', 'Audits'],
    title: 'Site Speed & Core Web Vitals Optimization',
    description: 'Resolved technical bottlenecks, improving page speed scores to 90+ and reducing bounce rates.'
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState(DEFAULT_PORTFOLIO);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (!error && data) {
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
    <>
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
            
            <Link to="/projects" className="inline-flex items-center bg-primary text-white pl-6 pr-2 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors group">
              View All Projects
              <div className="w-8 h-8 ml-3 bg-accent rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.15, y: -10, zIndex: 50 }}
                onClick={() => setSelectedProject(item)}
                className="bg-white rounded-[32px] overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 group relative cursor-pointer"
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

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative text-left overflow-y-auto max-h-[90vh]"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={18} />
              </button>

              <div className="rounded-2xl overflow-hidden mb-6 h-64 sm:h-80 w-full relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {selectedProject.tags.map((tag: string) => (
                  <span key={tag} className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-text-main mb-4">{selectedProject.title}</h3>

              <p className="text-text-muted leading-relaxed mb-8 text-base">
                {selectedProject.description || 'This project showcases our comprehensive approach to scaling organic growth and achieving sustainable, high-quality results. We implemented industry-leading strategies to overcome technical and content challenges.'}
              </p>

              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors group"
              >
                Start a Similar Project
                <ExternalLink size={18} className="ml-2 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
