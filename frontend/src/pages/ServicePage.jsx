import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SERVICES } from "../data/siteData";
import { api } from "../lib/api";

export default function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  const service = useMemo(() => SERVICES.find((s) => s.id === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) return;
    setLoading(true);
    api
      .get(`/works/by-service/${slug}`)
      .then(({ data }) => setWorks(data || []))
      .catch(() => setWorks([]))
      .finally(() => setLoading(false));
  }, [slug, service]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % works.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + works.length) % works.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, works]);

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-light mb-4">Service not found</h1>
            <Link to="/" className="text-sm tracking-[0.25em] uppercase text-[#B8902B] border-b border-[#B8902B] pb-1">
              Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const idx = SERVICES.findIndex((s) => s.id === slug);
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-[#0A0A0A] text-white overflow-hidden" data-testid="service-hero">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,#D4AF37_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <button
            onClick={() => navigate("/")}
            data-testid="service-back-button"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-5">
            What We Do / {service.title}
          </p>
          <div className="flex items-start gap-6 lg:gap-10">
            <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 border border-[#D4AF37]/50 items-center justify-center shrink-0 mt-2">
              <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#D4AF37]" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight"
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-white/70 text-base lg:text-lg font-light max-w-2xl"
              >
                {service.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28" data-testid="service-gallery">
        <div className="flex items-center justify-between mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8E8E8E]">
            {loading ? "Loading…" : `${works.length} completed project${works.length === 1 ? "" : "s"}`}
          </p>
          {works.length > 0 && (
            <p className="text-xs tracking-[0.25em] uppercase text-[#8E8E8E] hidden sm:block">
              Click any image to enlarge
            </p>
          )}
        </div>

        {!loading && works.length === 0 && (
          <div className="border border-dashed border-[#EAEAEA] py-24 flex flex-col items-center justify-center text-center px-6" data-testid="empty-state">
            <div className="w-14 h-14 border border-[#EAEAEA] flex items-center justify-center mb-6">
              <ImageOff className="w-6 h-6 text-[#8E8E8E]" />
            </div>
            <h3 className="font-serif text-2xl font-light mb-3">Portfolio coming soon</h3>
            <p className="text-sm text-[#666] max-w-md leading-relaxed">
              We're curating our latest {service.title.toLowerCase()} projects. In the meantime,
              explore our reference work or get in touch to discuss your space.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => navigate("/")}
                className="text-xs tracking-[0.25em] uppercase font-semibold border border-[#0A0A0A] text-[#0A0A0A] px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-all"
              >
                View Reference Work
              </button>
              <button
                onClick={() => navigate("/#contact")}
                className="text-xs tracking-[0.25em] uppercase font-semibold bg-[#D4AF37] text-[#0A0A0A] px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}

        {works.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6">
            {works.map((w, i) => (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(i)}
                data-testid={`work-${i}`}
                className="group relative block w-full break-inside-avoid overflow-hidden bg-[#F4F4F4]"
              >
                <img
                  src={w.image_base64}
                  alt={w.caption || `${service.title} work ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {w.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity">
                    {w.caption}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Prev / Next */}
      <section className="border-t border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 gap-8">
          <button
            onClick={() => navigate(`/services/${prev.id}`)}
            data-testid="service-prev"
            className="group text-left"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E] mb-2">← Previous</p>
            <h4 className="font-serif text-2xl lg:text-3xl font-light group-hover:text-[#B8902B] transition-colors">
              {prev.title}
            </h4>
          </button>
          <button
            onClick={() => navigate(`/services/${next.id}`)}
            data-testid="service-next"
            className="group text-right"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E] mb-2">Next →</p>
            <h4 className="font-serif text-2xl lg:text-3xl font-light group-hover:text-[#B8902B] transition-colors">
              {next.title}
            </h4>
          </button>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && works[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
            data-testid="lightbox"
          >
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-6 right-6 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><X className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + works.length) % works.length); }} className="absolute left-4 sm:left-8 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % works.length); }} className="absolute right-4 sm:right-8 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5" /></button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={works[lightbox].image_base64}
              alt={works[lightbox].caption || ""}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[85vh] object-contain"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-white/60">
              {lightbox + 1} / {works.length}
              {works[lightbox].caption ? ` · ${works[lightbox].caption}` : ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
