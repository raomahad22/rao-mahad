import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectsAdmin from './ProjectsAdmin';
import ServicesAdmin from './ServicesAdmin';
import ContactsAdmin from './ContactsAdmin';
import TestimonialsAdmin from './TestimonialsAdmin';
import HeroAdmin from './HeroAdmin';
import AboutAdmin from './AboutAdmin';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [seeding, setSeeding] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleSeedData = async () => {
    if (!window.confirm('This will load default data into your database. Only do this if your database is empty. Continue?')) return;
    setSeeding(true);
    try {
      // 1. Seed Hero Content
      const heroContent = {
        title: "SEO Expert\nBased in Worldwide.",
        subtitle: "I'm an experienced SEO Specialist with 5+ years in the field, collaborating with various companies and startups to drive organic growth.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      };
      
      const { data: existingHero } = await supabase.from('site_content').select('id').eq('section', 'hero').maybeSingle();
      if (!existingHero) {
        await supabase.from('site_content').insert([{ section: 'hero', content: heroContent }]);
      }

      // 2. Seed About Content
      const aboutContent = {
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
      
      const { data: existingAbout } = await supabase.from('site_content').select('id').eq('section', 'about').maybeSingle();
      if (!existingAbout) {
        await supabase.from('site_content').insert([{ section: 'about', content: aboutContent }]);
      }

      // 2. Seed Services
      const services = [
        { title: 'Guest Posting', description: 'High-quality contextual backlinks from authoritative websites to boost your domain authority.', icon: 'FileText' },
        { title: 'Local SEO', description: 'Optimize your Google Business Profile and local citations to dominate local search results.', icon: 'MapPin' },
        { title: 'Content Writing', description: 'SEO-optimized, engaging content that ranks well and converts visitors into customers.', icon: 'PenTool' },
        { title: 'Link Building', description: 'Strategic link building campaigns to improve your websites backlink profile and trust flow.', icon: 'Link' },
        { title: 'Technical SEO', description: 'Comprehensive technical audits and fixes to ensure your website is perfectly optimized for search engines.', icon: 'Smartphone' },
        { title: 'E-commerce SEO', description: 'Specialized optimization for online stores to increase product visibility and sales.', icon: 'Store' }
      ];
      for (const service of services) {
        const { data } = await supabase.from('services').select('id').eq('title', service.title).maybeSingle();
        if (!data) await supabase.from('services').insert([service]);
      }

      // 3. Seed Projects
      const projects = [
        { title: 'Scaling Organic Acquisition for FinTech SaaS', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tags: ['Guest Posting', 'Content Strategy'] },
        { title: 'Dominating SERPs for Luxury Retailer', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tags: ['Link Building', 'E-commerce'] },
        { title: 'Unlocking Local Dominance for Law Firm', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tags: ['Local SEO', 'GBP Optimization'] },
        { title: 'Site Speed & Core Web Vitals Optimization', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tags: ['Technical SEO', 'Audits'] }
      ];
      for (const project of projects) {
        const { data } = await supabase.from('projects').select('id').eq('title', project.title).maybeSingle();
        if (!data) await supabase.from('projects').insert([project]);
      }

      // 4. Seed Testimonials
      const testimonials = [
        { text: "Mahad completely transformed our organic presence. Within 6 months, our non-branded traffic tripled, and we secured top rankings. Highly recommend his services.", name: "Sarah Jenkins", role: "CMO at TechFlow", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
        { text: "The technical SEO audit was incredibly thorough. He found issues we had no idea existed. Fixing them led to an immediate 40% bump in search visibility.", name: "David Chen", role: "Founder, GrowthWorks", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" },
        { text: "Our sales from organic search doubled after Mahad revamped our product page SEO and implemented a targeted link-building strategy.", name: "Elena Rodriguez", role: "E-commerce Director", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
      ];
      for (const testimonial of testimonials) {
        const { data } = await supabase.from('testimonials').select('id').eq('name', testimonial.name).maybeSingle();
        if (!data) await supabase.from('testimonials').insert([testimonial]);
      }

      alert('Database seeded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to seed database.');
    }
    setSeeding(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <Link to="/admin" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Dashboard Overview</Link>
          <Link to="/admin/hero" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Hero Section</Link>
          <Link to="/admin/about" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage About Section</Link>
          <Link to="/admin/projects" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Projects</Link>
          <Link to="/admin/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Services</Link>
          <Link to="/admin/testimonials" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Reviews</Link>
          <Link to="/admin/contacts" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Contacts</Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 font-medium mt-auto"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome to your admin panel. Select an option from the sidebar to manage your content.</p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-primary">Quick Actions</h3>
                  <p className="text-sm text-gray-500 mb-4">If your database is empty, click below to load the default website data.</p>
                  <button 
                    onClick={handleSeedData} 
                    disabled={seeding}
                    className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50"
                  >
                    {seeding ? 'Loading Data...' : 'Load Default Website Data'}
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-blue-800">System Status</h3>
                  <p className="text-sm text-blue-700">Database Connection: <strong>Active</strong></p>
                  <p className="text-sm text-blue-700 mt-2">You can manage all sections of your website from the sidebar.</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/hero" element={<HeroAdmin />} />
          <Route path="/about" element={<AboutAdmin />} />
          <Route path="/projects" element={<ProjectsAdmin />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/testimonials" element={<TestimonialsAdmin />} />
          <Route path="/contacts" element={<ContactsAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

