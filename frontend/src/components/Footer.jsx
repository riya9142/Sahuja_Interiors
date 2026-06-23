import React from "react";
import { BRAND, NAV_LINKS, SERVICES } from "../data/siteData";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/5" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img
              src={BRAND.logo}
              alt="Sahuja Interiors"
              className="h-28 w-auto object-contain"
            />
            <p className="mt-6 text-white/60 text-sm font-light leading-relaxed max-w-sm">
              A design studio crafting residential, commercial and hospitality interiors
              with a quiet obsession for material, proportion and light.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6">Explore</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                    className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.id} className="text-sm text-white/70">{s.title}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6">Studio</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-[#D4AF37]">{BRAND.email}</a></li>
              <li><a href={`tel:${BRAND.phone}`} className="hover:text-[#D4AF37]">{BRAND.phone}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs tracking-[0.2em] uppercase text-white/40">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-white/40">
            Crafted with intention in India
          </p>
        </div>
      </div>
    </footer>
  );
}
