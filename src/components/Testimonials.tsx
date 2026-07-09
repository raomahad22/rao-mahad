import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DEFAULT_TESTIMONIALS = [
  {
    text: "Mahad completely transformed our organic presence. Within 6 months, our non-branded traffic tripled, and we secured top rankings. Highly recommend his services.",
    name: "Sarah Jenkins",
    role: "CMO, TechGrowth Solutions",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=2A4B37&color=fff"
  },
  {
    text: "The quality of backlinks Mahad secures is unparalleled. We were struggling to build authority in a crowded niche, and his manual outreach strategy delivered amazing results.",
    name: "David Chen",
    role: "Founder, E-Commerce Direct",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=David+Chen&background=F4A222&color=fff"
  },
  {
    text: "Working with Mahad was the best marketing decision we made this year. He doesn't focus on vanity metrics; he focuses on traffic that actually converts.",
    name: "Michael Ross",
    role: "Director of Marketing, LegalPro",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Michael+Ross&background=1E3728&color=fff"
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials", err);
      }
    }
    
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchTestimonials();
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, testimonials.length - 3) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  // Get active 3 testimonials to display
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // If there are less than 3 testimonials overall, fallback to index slice safety
  const displayList = visibleTestimonials.length < 3 && testimonials.length >= 3
    ? testimonials.slice(testimonials.length - 3)
    : visibleTestimonials;

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-accent"></span>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">Client Testimonials</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-text-main">
              The Impact of My Work: <span className="text-accent italic font-medium">Client Reviews</span>
            </h2>
          </div>

          {/* Slider Controls */}
          {testimonials.length > 3 && (
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-primary text-white hover:bg-primary-dark flex items-center justify-center transition-all shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 transition-all duration-300">
            {displayList.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                    <span className="ml-2 font-bold text-text-main">{testimonial.rating}.0</span>
                  </div>
                  
                  <p className="text-text-muted leading-relaxed mb-6 text-sm italic">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t pt-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-bold text-text-main text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
