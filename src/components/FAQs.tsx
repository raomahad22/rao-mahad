import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "What industries have you worked in as an SEO expert?",
    answer: "I work with a variety of industries, focusing primarily on B2B SaaS, E-commerce, Professional Services (Legal, Financial), and Local Businesses."
  },
  {
    question: "Can I download your resume/CV for information?",
    answer: "Certainly! You can download my resume/CV directly from the About Me section. It provides a comprehensive overview of my education, work experience, and SEO achievements."
  },
  {
    question: "Are you available for freelance SEO work?",
    answer: "Yes, I am currently taking on select freelance projects. Please reach out via the contact form to discuss your specific needs."
  },
  {
    question: "What tools do you use for SEO campaigns?",
    answer: "I utilize industry-leading tools including Ahrefs, Semrush, Google Search Console, Google Analytics 4, and Screaming Frog for technical audits."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section id="faqs" className="py-24 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-4 h-0.5 bg-accent"></span>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider">FAQs</p>
            <span className="w-4 h-0.5 bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Questions? <span className="text-accent italic">Look here.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-accent text-text-main' : 'bg-[#1E3728] border border-white/10'
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold ${isOpen ? 'text-text-main' : 'text-white/90'}`}>{faq.question}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-text-main flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-text-main/80 leading-relaxed text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
