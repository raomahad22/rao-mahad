import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  FileText, 
  MapPin, 
  ArrowRight,
  PenTool,
  Share2,
  Smartphone,
  Globe,
  TrendingUp,
  Users,
  Store,
  Link,
  Star,
  X
} from 'lucide-react';

const iconMap: Record<string, any> = {
  FileText, MapPin, PenTool, Share2, Smartphone, Globe, TrendingUp, Users, Store, Link, Star
};

const DEFAULT_SERVICES = [
  {
    title: 'Guest Posting',
    description: 'High-quality contextual backlinks from authoritative websites to boost your domain authority.',
    icon: FileText,
  },
  {
    title: 'Content Writing',
    description: 'SEO-optimized, engaging content that ranks well and converts visitors into loyal customers.',
    icon: PenTool,
  },
  {
    title: 'Local SEO',
    description: 'Dominate your local market with optimized local search strategies and citations.',
    icon: MapPin,
  },
  {
    title: 'Social Media Management',
    description: 'Strategic social presence to build brand awareness and drive engaged traffic.',
    icon: Share2,
  },
  {
    title: 'Social Media Handling',
    description: 'Daily management and community engagement to grow your audience across platforms.',
    icon: Smartphone,
  },
  {
    title: 'HARO Link Building',
    description: 'Premium backlinks from top-tier publications and industry leaders via HARO.',
    icon: Globe,
  },
  {
    title: 'Off Page SEO',
    description: 'Comprehensive off-page strategies to improve your site\'s authority and trust signals.',
    icon: TrendingUp,
  },
  {
    title: 'Outreach Specialist',
    description: 'Personalized manual outreach campaigns to secure high-quality, relevant placements.',
    icon: Users,
  },
  {
    title: 'Google Business Profile',
    description: 'Complete optimization of your GBP to increase local visibility and drive leads.',
    icon: Store,
  },
  {
    title: 'Link Building',
    description: 'White-hat, sustainable link building campaigns tailored to your specific industry.',
    icon: Link,
  }
];

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          // Map string icons back to lucide components
          const mappedData = data.map(s => ({
            title: s.title,
            description: s.description,
            icon: iconMap[s.icon] || Star
          }));
          setServices(mappedData);
        }
      } catch (err) {
        console.error("Error fetching services", err);
      }
    }
    
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchServices();
    }
  }, []);

  return (
    <>
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-0.5 bg-accent"></span>
                <p className="text-accent font-semibold text-sm uppercase tracking-wider">Services</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-main">
                <span className="text-accent">Services</span> I Provide
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.15, y: -10, zIndex: 50 }}
                onClick={() => setSelectedService(service)}
                className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:bg-primary hover:text-white relative"
              >
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-main mb-2 group-hover:text-white leading-tight">{service.title}</h3>
                <button className="inline-flex items-center text-xs font-semibold text-accent group-hover:text-accent transition-colors mt-1">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <selectedService.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main mb-4">{selectedService.title}</h3>

              {/* Description */}
              <p className="text-text-muted leading-relaxed mb-8 text-base">
                {selectedService.description}
              </p>

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors group"
              >
                Get Started
                <div className="w-7 h-7 ml-3 bg-accent rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
