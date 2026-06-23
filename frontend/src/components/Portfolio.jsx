import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { CATEGORIES } from "../data/siteData";

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <Section id="portfolio" data-testid="portfolio-section" className="bg-white">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-20 gap-6">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#B8902B] font-semibold mb-5">
            Selected work
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.05] text-[#0A0A0A] max-w-2xl">
            Transforming spaces into timeless designs across India.
          </h2>
        </div>
        <p className="text-sm text-[#666] max-w-sm font-light leading-relaxed">
         Step into a world of design — choose a category to explore curated interiors and creative inspirations.
        </p>
      </div>

      <div
        className="flex flex-wrap gap-x-6 gap-y-3 mb-14 border-b border-[#EAEAEA] pb-6"
        data-testid="portfolio-filters"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            data-testid={`portfolio-filter-${c.slug}`}
            onClick={() => navigate(`/portfolio/${c.slug}`)}
            className="text-xs tracking-[0.25em] uppercase font-medium pb-2 text-[#8E8E8E] hover:text-[#0A0A0A] transition-colors"
          >
            {c.name}
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        data-testid="portfolio-grid"
      >
        {CATEGORIES.map((cat, i) => (
          <motion.article
            key={cat.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(`/portfolio/${cat.slug}`)}
            className="group relative overflow-hidden cursor-pointer aspect-[4/5] bg-[#0A0A0A]"
            data-testid={`portfolio-card-${cat.slug}`}
          >
            <img
              src={cat.cover}
              alt={cat.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl font-light leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm font-light mt-2 max-w-[90%] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {cat.tagline}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full border border-white/40 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-500 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-white/80">
              {cat.gallery.length} photos
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
