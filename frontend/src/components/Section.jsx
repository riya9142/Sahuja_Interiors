import React from "react";
import { motion } from "framer-motion";

export const Section = ({ id, className = "", children, ...rest }) => (
  <section
    id={id}
    className={`relative py-24 lg:py-32 ${className}`}
    {...rest}
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
  </section>
);

export const SectionHeader = ({ overline, title, align = "left", className = "" }) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-14 lg:mb-20 ${alignClass} ${className}`}
    >
      {overline && (
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8902B] mb-5">
          {overline}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
        {title}
      </h2>
    </motion.div>
  );
};

export default Section;
