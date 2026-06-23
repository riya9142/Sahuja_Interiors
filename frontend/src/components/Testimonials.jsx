import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Section, SectionHeader } from "./Section";
import { TESTIMONIALS } from "../data/siteData";

export default function Testimonials() {
  return (
    <Section id="testimonials" data-testid="testimonials-section" className="bg-[#FAFAFA]">
      <SectionHeader overline="Kind words" title="Trusted by homeowners and founders alike." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.id}
            data-testid={`testimonial-${t.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border border-[#EAEAEA] p-8 lg:p-12 hover:border-[#D4AF37] transition-colors duration-500"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F2E8D5]" strokeWidth={1} />

            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            <p className="font-serif text-xl lg:text-2xl font-light text-[#0A0A0A] leading-snug mb-8">
              "{t.quote}"
            </p>

            <footer className="flex items-center justify-between border-t border-[#EAEAEA] pt-6">
              <div>
                <div className="font-medium text-[#0A0A0A] text-sm">{t.name}</div>
                <div className="text-xs tracking-[0.2em] uppercase text-[#8E8E8E] mt-1">
                  {t.role}
                </div>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}
