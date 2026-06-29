import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Testimonials() {
  const staticFallbackReviews = [
    {
      quote: "Snortweb rebuilt our banking dashboard from scratch. In our subsequent external audit, they found zero high-severity vulnerabilities. Absolutely flawless execution.",
      author: "Marcus Vance",
      role: "Chief Security Officer, Apex FinTech",
      avatarText: "MV"
    },
    {
      quote: "Their threat-first approach completely changed how we build digital products. Our platform is blazing fast, and we finally have absolute peace of mind.",
      author: "Sarah Jenkins",
      role: "Founder, Velo Health",
      avatarText: "SJ"
    },
    {
      quote: "Vastly exceeded expectations. They are not just world-class developers; they are security researchers who understand modern premium web design.",
      author: "David Chen",
      role: "VP of Engineering, CloudCore",
      avatarText: "DC"
    }
  ];

  const [reviews, setReviews] = useState(staticFallbackReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/reviews");
        // Only show approved reviews
        const approved = data.filter((r) => r.approved);
        if (approved.length > 0) {
          const mappedReviews = approved.map((r) => {
            const initials = r.clientName
              ? r.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "C";
            return {
              quote: r.comment,
              author: r.clientName,
              role: r.clientDesignation
                ? `${r.clientDesignation} at ${r.clientCompany || "Freelance"}`
                : r.clientCompany || "Client",
              avatarText: initials,
            };
          });
          setReviews(mappedReviews);
        }
      } catch (error) {
        console.warn("Could not fetch live reviews, using static fallback reviews:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="reviews-section" className="relative py-[100px] md:py-[140px] bg-bg-primary border-b border-border-main z-10 select-none overflow-hidden">
      {/* Texture pattern overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 max-w-[600px] mx-auto">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.3em] text-text-primary uppercase mb-4">
            CLIENT AUDITS & REVIEWS
          </span>
          <h2 className="font-sans-heading text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight uppercase">
            TRUSTED BY THE <br />
            <span className="font-normal italic">PRECISE LEADER.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ y: { duration: 0.15, ease: "easeOut" } }}
              className="group relative bg-bg-card dark:bg-bg-primary border border-border-main p-8 flex flex-col justify-between hover:bg-[#24211C] hover:text-[#F7F3EB] dark:hover:bg-bg-elevated dark:hover:text-text-primary transition-all duration-300 rounded-[24px] dark:rounded-md cursor-pointer will-change-transform shadow-card dark:shadow-none"
            >
              {/* Quote icon watermark */}
              <div className="absolute -top-4 -left-2 font-sans-heading font-black text-8xl text-text-primary/[0.04] group-hover:text-white/[0.06] dark:group-hover:text-brand-indigo/10 pointer-events-none select-none transition-colors duration-100">
                “
              </div>

              {/* Quote Text */}
              <p className="font-sans-body text-text-secondary text-[0.95rem] leading-[1.8] mb-8 relative z-10 italic group-hover:text-white/90 dark:group-hover:text-text-primary transition-colors duration-100">
                "{item.quote}"
              </p>

              {/* User info */}
              <div className="flex items-center gap-4 border-t border-border-subtle group-hover:border-white/10 pt-5 transition-colors duration-100">
                <div className="w-10 h-10 rounded-[12px] dark:rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center font-mono-code font-bold text-xs text-text-primary group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white dark:group-hover:text-brand-indigo transition-colors duration-300">
                  {item.avatarText}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans-heading font-black text-[0.9rem] text-text-primary group-hover:text-white dark:group-hover:text-text-primary transition-colors duration-100">
                    {item.author}
                  </span>
                  <span className="font-sans-body font-normal text-[0.72rem] text-text-tertiary group-hover:text-white/60 dark:group-hover:text-text-secondary mt-0.5 transition-colors duration-100">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

