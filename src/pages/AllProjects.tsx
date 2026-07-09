import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AllProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-accent/20 selection:text-primary overflow-x-hidden">
      <Navbar />
      
      <main className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors mb-6">
              <ArrowLeft size={20} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">All Projects</h1>
            <p className="text-lg text-text-muted max-w-2xl">
              Explore my complete portfolio of successful SEO campaigns and digital marketing projects.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <ExternalLink className="text-primary w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).map((tag: string, i: number) => (
                      <span key={i} className="text-xs font-bold px-3 py-1 bg-[#F8F9FA] text-text-main rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <a href="#contact" className="inline-flex items-center gap-2 font-bold text-primary group-hover:text-accent transition-colors">
                    View Case Study <ArrowRight size={16} />
                  </a>
                </motion.div>
              ))}

              {projects.length === 0 && (
                <div className="col-span-full py-12 text-center text-text-muted">
                  No projects found.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
