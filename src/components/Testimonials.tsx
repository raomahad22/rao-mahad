import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
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
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-4 h-0.5 bg-accent"></span>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider">Client Testimonials</p>
            <span className="w-4 h-0.5 bg-accent"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4">
            The Impact of My Work:
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-accent italic">
            Client Testimonials
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
                <span className="ml-2 font-bold text-text-main">{testimonial.rating}.0</span>
              </div>
              
              <p className="text-text-muted leading-relaxed mb-8 text-sm">
                {testimonial.text}
              </p>
              
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-text-main text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
