import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Search, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([formData]);
      if (error) throw error;
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', interest: '', budget: '', country: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#e5e7eb]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">Contact Us</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
              Let's Talk for <span className="text-accent">Your Next Projects</span>
            </h2>
            <p className="text-text-muted mb-12 max-w-md text-sm leading-relaxed">
              Ready to scale your organic traffic? Reach out to discuss how my SEO strategies can help your business grow.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={18} />
                </div>
                <a href="tel:+14065550120" className="text-text-main font-medium hover:text-accent transition-colors">+1 (406) 555-0120</a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Mail size={18} />
                </div>
                <a href="mailto:hello@mahadseo.com" className="text-text-main font-medium hover:text-accent transition-colors">hello@mahadseo.com</a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Search size={18} />
                </div>
                <p className="text-text-main font-medium">@mahadseo</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-text-main font-medium max-w-[200px]">2464 Royal Ln. Mesa, New Jersey 45463</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {success ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center justify-center text-center h-full">
                <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold text-text-main mb-2">Message Sent!</h3>
                <p className="text-text-muted">Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm"
                    placeholder="Ex. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">Email *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">Phone *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">I'm Interested in *</label>
                  <select 
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm text-text-muted">
                    <option value="">Select</option>
                    <option value="SEO Audit">SEO Audit</option>
                    <option value="Link Building">Link Building</option>
                    <option value="Local SEO">Local SEO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">Budget Range (USD) *</label>
                  <select 
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm text-text-muted">
                    <option value="">Select Range</option>
                    <option value="$1k - $3k">$1k - $3k</option>
                    <option value="$3k - $5k">$3k - $5k</option>
                    <option value="$5k+">$5k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-main">Country *</label>
                  <select 
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm text-text-muted">
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-main">Your Message *</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none transition-all text-sm shadow-sm resize-none"
                  placeholder="Enter your message..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-70">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
