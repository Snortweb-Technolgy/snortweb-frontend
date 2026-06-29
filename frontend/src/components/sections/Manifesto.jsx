import React from "react";
import { motion } from "framer-motion";
import { pillars } from "../../data/pillars";

export default function Manifesto() {
  const quoteLines = [
    { text: "Most agencies", type: "bold", gradient: false, dim: false },
    { text: "build websites.", type: "bold", gradient: false, dim: false },
    { text: "We build and", type: "regular", gradient: false, dim: true },
    { text: "secure them.", type: "bold", gradient: true, dim: false }
  ];

  const leftContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const wordVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] }
    }
  };

  const rightContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const pillarItem = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about-section" className="relative py-[140px] bg-bg-primary border-b border-border-main z-10 font-sans-body">
      
      {/* Pattern overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-10 gap-[80px] items-start relative z-10">
        
        {/* Left Column: Big Quote */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-text-primary uppercase mb-6">
            OUR PHILOSOPHY
          </span>

          <motion.div
            variants={leftContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col space-y-1"
          >
            {quoteLines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap gap-x-3 overflow-hidden py-0.5">
                {line.text.split(" ").map((word, wordIdx) => (
                  <div key={wordIdx} className="overflow-hidden">
                    <motion.span
                      variants={wordVariants}
                      className={
                        line.gradient 
                          ? "font-sans-heading font-black italic text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] tracking-tight text-text-primary pb-1 inline-block uppercase"
                          : `font-sans-heading text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] tracking-tight leading-none inline-block ${
                              line.type === "bold" ? "font-black uppercase" : "font-normal"
                            } ${line.dim ? "text-text-quaternary" : "text-text-primary"}`
                      }
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Decorative Bracket element */}
          <svg width="100" height="30" viewBox="0 0 100 30" fill="none" className="my-8">
            <motion.path
              d="M 0 5 H 80 V 25"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>

          {/* Quote Subtext */}
          <p className="text-sm sm:text-base text-text-secondary leading-[1.8] max-w-[420px]">
            Snortweb Technology fuses cutting-edge development with enterprise cybersecurity — so your digital presence is fast, beautiful, and impossible to compromise.
          </p>
        </div>

        {/* Right Column: Pillars */}
        <div className="lg:col-span-4 flex flex-col items-start w-full">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-text-primary uppercase mb-8">
            OUR PROMISE
          </span>

          <motion.div
            variants={rightContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col w-full space-y-6"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={pillarItem}
                className="group relative pb-5 border-b border-border-subtle last:border-b-0 transition-colors duration-100"
              >
                <div className="flex items-center gap-4">
                  {/* Square Outline Checkmark */}
                  <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center border border-border-main rounded-none bg-transparent hover:bg-bg-elevated transition-all duration-100">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <motion.path
                        d="M1.5 5L4.5 8L10.5 1.5"
                        stroke="var(--text-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                      />
                    </svg>
                  </div>

                  {/* Pillar Label */}
                  <span className="font-sans-heading font-black text-sm md:text-base text-text-primary group-hover:text-text-secondary transition-colors duration-100">
                    {pillar}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export { Manifesto };
