import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Github, Mail, Instagram, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [settings, setSettings] = useState({
    email: 'hello@mahadseo.com',
    linkedin: '#',
    twitter: '#',
    github: '',
    instagram: '',
    facebook: ''
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_content').select('*').eq('section', 'settings').maybeSingle();
      if (data && data.content) {
        setSettings({
          ...settings,
          ...data.content
        });
      }
    }
    fetchSettings();
  }, []);

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#home" className="text-2xl font-bold tracking-tight mb-6 inline-block">
              Mahad <span className="text-primary">SEO</span>
            </a>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Data-driven organic growth strategies for ambitious brands. Specializing in technical SEO, content strategy, and high-authority link building.
            </p>
            <div className="flex gap-4 flex-wrap">
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Linkedin size={18} />
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Twitter size={18} />
                </a>
              )}
              {settings.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Github size={18} />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Instagram size={18} />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Facebook size={18} />
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors text-sm">About Me</a></li>
              <li><a href="#process" className="text-white/80 hover:text-white transition-colors text-sm">SEO Process</a></li>
              <li><a href="#portfolio" className="text-white/80 hover:text-white transition-colors text-sm">Case Studies</a></li>
              <li><a href="#testimonials" className="text-white/80 hover:text-white transition-colors text-sm">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Core Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">Guest Posting & Outreach</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">Technical SEO</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">Local SEO & GBP</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">Content Strategy</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">E-commerce SEO</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-white/80 text-sm mb-4">
              Get weekly actionable SEO insights and algorithm updates delivered to your inbox.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-primary-dark border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white placeholder-white/50"
              />
              <button 
                type="submit" 
                className="bg-accent text-white hover:bg-accent-dark transition-colors px-4 py-2 rounded-r-lg text-sm font-bold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Mahad SEO. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a 
              href="/admin" 
              onClick={(e) => {
                localStorage.setItem('admin_email', 'raomahad22@gmail.com');
              }}
              className="hover:text-white transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
