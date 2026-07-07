import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Star // Default icon
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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">Services</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main">
              <span className="text-accent">Services</span> I Provide
            </h2>
          </div>
          
          <a href="#services" className="inline-flex items-center bg-primary text-white pl-6 pr-2 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors group">
            View All Services
            <div className="w-8 h-8 ml-3 bg-white rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8F9FA] rounded-[32px] p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-4">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-bold text-text-main hover:text-primary transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4 text-accent" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
