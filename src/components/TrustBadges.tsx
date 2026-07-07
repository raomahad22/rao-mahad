import React from 'react';
import { motion } from 'motion/react';
import { Award, PenTool, MapPin, Share2, Search, Link as LinkIcon } from 'lucide-react';

const BADGES = [
  { label: 'SEO Specialist', icon: Search },
  { label: 'Guest Posting', icon: PenTool },
  { label: 'GBP Expert', icon: MapPin },
  { label: 'Content Strategy', icon: Award },
  { label: 'Outreach Expert', icon: Share2 },
];

export default function TrustBadges() {
  return (
    <section className="py-10 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-secondary mb-6 uppercase tracking-wider">Trusted Expertise In</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {BADGES.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 text-accent/80 hover:text-primary transition-colors"
            >
              <badge.icon className="h-5 w-5" />
              <span className="font-medium whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
