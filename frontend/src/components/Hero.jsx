import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { HERO_IMAGE, BRAND } from "../data/siteData";

export default function Hero() {
  const go = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      <motion.img
        src={HERO_IMAGE}
        alt="Luxury interior living room"
        loading="eager"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-20 lg:pb-28">
      

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-white text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight max-w-5xl"
        >
          Transforming spaces
          <br />
          into <em className="italic text-[#E8C876]">experiences.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-white/80 max-w-xl text-base lg:text-lg font-light leading-relaxed"
        >
          A design studio crafting considered residential, commercial and
          hospitality interiors — where material, light and proportion meet the
          way you live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            data-testid="hero-portfolio-button"
            onClick={() => go("#portfolio")}
            className="group inline-flex items-center justify-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-contact-button"
            onClick={() => go("#contact")}
            className="group inline-flex items-center justify-center gap-3 border border-white text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => go("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-6 lg:right-12 z-10 hidden md:flex items-center gap-3 text-white/80 hover:text-white text-xs tracking-[0.25em] uppercase"
        data-testid="hero-scroll-indicator"
      >
        Scroll
        <span className="w-10 h-px bg-white/60" />
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
