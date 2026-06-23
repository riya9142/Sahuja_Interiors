import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_LINKS } from "../data/siteData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-[#EAEAEA]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 lg:h-28 flex items-center justify-between">
        <button
          data-testid="navbar-logo"
          onClick={() => go("#home")}
          className="flex items-center gap-3"
          aria-label="Sahuja Interiors"
        >
          <img
            src={BRAND.logo}
            alt="Sahuja Interiors"
            className="h-20 lg:h-24 w-auto object-contain"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`navbar-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className={`text-xs tracking-[0.22em] uppercase font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-[#0A0A0A] hover:text-[#B8902B]"
                  : "text-white/90 hover:text-[#D4AF37]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("#contact")}
          data-testid="navbar-cta-button"
          className={`hidden lg:inline-flex items-center text-xs tracking-[0.22em] uppercase font-semibold border px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
              : "border-white text-white hover:bg-white hover:text-[#0A0A0A]"
          }`}
        >
          Book a Consult
        </button>

        <button
          data-testid="navbar-mobile-toggle"
          className={`lg:hidden p-2 -mr-2 ${
            scrolled ? "text-[#0A0A0A]" : "text-white"
          }`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden overflow-y-auto"
            style={{ backgroundColor: "#ffffff" }}
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-[#EAEAEA]">
              <img
                src={BRAND.logo}
                alt="Sahuja Interiors"
                className="h-14 w-auto object-contain"
              />
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-[#0A0A0A]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-10 gap-6">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  data-testid={`mobile-link-${l.label.toLowerCase()}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => go(l.href)}
                  className="text-left font-serif text-3xl font-light text-[#0A0A0A] hover:text-[#B8902B] transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                data-testid="mobile-cta-button"
                onClick={() => go("#contact")}
                className="mt-6 text-xs tracking-[0.22em] uppercase font-semibold border border-[#0A0A0A] px-6 py-4 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all"
              >
                Book a Consult
              </button>
              <div className="mt-8 text-xs tracking-[0.22em] uppercase text-[#8E8E8E]">
                {BRAND.email}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
