import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Section, SectionHeader } from "./Section";
import { SERVICES } from "../data/siteData";

export default function Services() {
  const navigate = useNavigate();

  return (
    <Section id="services" data-testid="services-section" className="bg-[#FAFAFA]">
      <SectionHeader
        overline="What we do"
        title="Real projects — dive into any service to see our completed work."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#EAEAEA] border border-[#EAEAEA]">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.id}
              data-testid={`service-card-${s.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/services/${s.id}`)}
              className="group relative text-left bg-white p-10 lg:p-12 hover:bg-[#0A0A0A] transition-colors duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-16">
                <div className="w-14 h-14 flex items-center justify-center border border-[#EAEAEA] group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Icon className="w-6 h-6 text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors duration-500" />
                </div>
                <span className="text-xs tracking-[0.25em] text-[#B8902B] group-hover:text-[#D4AF37]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-serif text-2xl lg:text-3xl font-light text-[#0A0A0A] group-hover:text-white mb-4 transition-colors duration-500">
                {s.title}
              </h3>
              <p className="text-sm lg:text-base text-[#666] group-hover:text-white/70 font-light leading-relaxed mb-10 transition-colors duration-500">
                {s.description}
              </p>

              <div className="flex items-center gap-2 text-xs tracking-[0.22em] uppercase font-medium text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors duration-500">
                View our work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
