import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { PROCESS_STEPS } from "../data/siteData";

export default function Process() {
  return (
    <Section id="process" data-testid="process-section" className="bg-white">
      <SectionHeader overline="How we work" title="A considered process — from consultation to delivery." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
        {PROCESS_STEPS.map((s, i) => (
          <motion.div
            key={s.number}
            data-testid={`process-step-${s.number}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="font-serif text-7xl lg:text-8xl font-light text-[#F2E8D5] leading-none mb-4 select-none">
              {s.number}
            </div>
            <div className="h-px w-10 bg-[#D4AF37] mb-6" />
            <h3 className="font-serif text-xl lg:text-2xl font-light text-[#0A0A0A] mb-3">
              {s.title}
            </h3>
            <p className="text-sm text-[#666] font-light leading-relaxed max-w-xs">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
