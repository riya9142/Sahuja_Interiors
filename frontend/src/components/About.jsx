import React from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { ABOUT } from "../data/siteData";

export default function About() {
  return (
    <Section id="about" data-testid="about-section" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative overflow-hidden">
            <img
              src={ABOUT.image}
              alt="Sahuja Interiors studio"
              loading="lazy"
              className="w-full h-[520px] lg:h-[640px] object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-4">
              <p className="font-serif text-2xl text-[#0A0A0A] italic font-light">
                "Design is the quiet craft <br />
                of living well."
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 lg:pl-8"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#B8902B] font-semibold mb-5">
            {ABOUT.overline}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#0A0A0A] mb-8">
            {ABOUT.heading}
          </h2>
          <p className="text-[#555] text-base lg:text-lg font-light leading-relaxed mb-10 max-w-xl">
            {ABOUT.body}
          </p>

          <div className="grid grid-cols-2 gap-y-10 gap-x-8 border-t border-[#EAEAEA] pt-10">
            {ABOUT.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                data-testid={`about-stat-${i}`}
              >
                <div className="font-serif text-4xl lg:text-5xl font-light text-[#0A0A0A] mb-2">
                  {s.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-[#8E8E8E]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
