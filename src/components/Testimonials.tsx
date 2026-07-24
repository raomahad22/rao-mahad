import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);

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
    <>
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
                  whileHover={{ scale: 1.15, y: -10, zIndex: 50 }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[280px] cursor-pointer relative"
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

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative text-left"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex gap-1 mb-6">
                {[...Array(selectedTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-accent text-accent" />
                ))}
              </div>

              {/* Full Text */}
              <p className="text-text-main text-xl leading-relaxed mb-8 italic font-medium">
                "{selectedTestimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                <img src={selectedTestimonial.avatar} alt={selectedTestimonial.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-text-main text-lg">{selectedTestimonial.name}</h4>
                  <p className="text-sm text-text-muted">{selectedTestimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
