import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES } from "../data/siteData";
import { api } from "../lib/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);
  const [adminRefs, setAdminRefs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const category = useMemo(() => CATEGORIES.find((c) => c.slug === slug), [slug]);

  // Build gallery: admin uploads if any, else fallback to stock
  const gallery = useMemo(() => {
    if (adminRefs.length > 0) {
      return adminRefs.map((r) => ({ src: r.image_base64, caption: r.caption }));
    }
    return (category?.gallery || []).map((src) => ({ src, caption: null }));
  }, [adminRefs, category]);

  const source = adminRefs.length > 0 ? "studio" : "reference";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) return;
    setLoaded(false);
    api
      .get(`/references/by-category/${slug}`)
      .then(({ data }) => setAdminRefs(data || []))
      .catch(() => setAdminRefs([]))
      .finally(() => setLoaded(true));
  }, [slug, category]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, gallery]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-light mb-4">Category not found</h1>
            <Link to="/" className="text-sm tracking-[0.25em] uppercase text-[#B8902B] border-b border-[#B8902B] pb-1">
              Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const prev = CATEGORIES[(CATEGORIES.findIndex((c) => c.slug === slug) - 1 + CATEGORIES.length) % CATEGORIES.length];
  const next = CATEGORIES[(CATEGORIES.findIndex((c) => c.slug === slug) + 1) % CATEGORIES.length];
  const coverSrc = adminRefs[0]?.image_base64 || category.cover;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans">
      <Navbar />

      <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden" data-testid="category-hero">
        <motion.img
          key={category.slug + source}
          src={coverSrc}
          alt={category.name}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16 lg:pb-24">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate("/")}
            data-testid="category-back-button"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium mb-8 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </motion.button>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-4"
          >
            Selected Work / {category.name}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-white/80 text-base lg:text-lg font-light max-w-xl"
          >
            {category.tagline}
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28" data-testid="category-gallery">
        <div className="flex items-center justify-between mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8E8E8E]">
            {!loaded ? "Loading…" : `${gallery.length} ${source === "studio" ? "studio" : "reference"} project${gallery.length === 1 ? "" : "s"}`}
          </p>
          <p className="text-xs tracking-[0.25em] uppercase text-[#8E8E8E] hidden sm:block">
            Click any image to enlarge
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6">
          {gallery.map((item, i) => (
            <motion.button
              key={`${item.src}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(i)}
              data-testid={`gallery-image-${i}`}
              className="group relative block w-full break-inside-avoid overflow-hidden bg-[#F4F4F4]"
            >
              <img
                src={item.src}
                alt={item.caption || `${category.name} ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="border-t border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 gap-8">
          <button onClick={() => navigate(`/portfolio/${prev.slug}`)} data-testid="category-prev" className="group text-left">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E] mb-2">← Previous</p>
            <h4 className="font-serif text-2xl lg:text-3xl font-light group-hover:text-[#B8902B] transition-colors">{prev.name}</h4>
          </button>
          <button onClick={() => navigate(`/portfolio/${next.slug}`)} data-testid="category-next" className="group text-right">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E] mb-2">Next →</p>
            <h4 className="font-serif text-2xl lg:text-3xl font-light group-hover:text-[#B8902B] transition-colors">{next.name}</h4>
          </button>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
            data-testid="lightbox"
          >
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-6 right-6 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><X className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + gallery.length) % gallery.length); }} className="absolute left-4 sm:left-8 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % gallery.length); }} className="absolute right-4 sm:right-8 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5" /></button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={gallery[lightbox].src}
              alt={gallery[lightbox].caption || `${category.name} ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[85vh] object-contain"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-white/60">
              {lightbox + 1} / {gallery.length}
              {gallery[lightbox].caption ? ` · ${gallery[lightbox].caption}` : ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
