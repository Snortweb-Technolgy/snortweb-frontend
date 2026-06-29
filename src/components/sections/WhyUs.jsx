import React from "react";
import { motion } from "framer-motion";

export default function WhyUs() {
  const blocks = [
    {
      number: "01",
      title: "Threat-First Thinking",
      desc: "We audit before we build. Security posture is designed into your architecture — never patched on later.",
      gridSpan: "md:col-span-2"
    },
    {
      number: "02",
      title: "Full-Stack Ownership",
      desc: "From pixel to server, we own the entire stack. No handoffs. No gaps. No finger-pointing.",
      gridSpan: "md:col-span-1"
    },
    {
      number: "03",
      title: "Always-On Intelligence",
      desc: "24/7 monitoring and rapid incident response long after your product launches. We don't disappear.",
      gridSpan: "md:col-span-3"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const blockVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-[100px] md:py-[140px] bg-bg-primary border-b border-border-main z-10 select-none">
      {/* Texture pattern overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20 max-w-[600px]">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.3em] text-text-primary uppercase mb-4">
            WHY SNORTWEB
          </span>

          <h2 className="font-sans-heading text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-none uppercase">
            Security isn't a feature. <br />
            It's the <span className="font-normal italic">foundation.</span>
          </h2>
        </div>

        {/* Bento grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blocks.map((block, i) => {
            const isWide = block.gridSpan === "md:col-span-3";
            return (
              <motion.div
                key={i}
                variants={blockVariants}
                whileHover={{ y: -4 }}
                transition={{ y: { duration: 0.15, ease: "easeOut" } }}
                className={`${block.gridSpan} bg-bg-card dark:bg-bg-primary border border-border-main p-10 flex flex-col justify-between group hover:bg-[#24211C] hover:text-[#F7F3EB] dark:hover:bg-bg-elevated dark:hover:text-text-primary transition-all duration-300 rounded-[24px] dark:rounded-md cursor-pointer will-change-transform shadow-card dark:shadow-none`}
              >
                {isWide ? (
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
                    <div className="flex items-center gap-6">
                      <div className="font-sans-heading text-6xl font-black text-text-primary/10 leading-none group-hover:text-white/10 dark:group-hover:text-brand-indigo/20 transition-colors duration-100">
                        {block.number}
                      </div>
                      <h3 className="font-sans-heading text-lg font-black text-text-primary group-hover:text-white dark:group-hover:text-text-primary transition-colors duration-100 uppercase">
                        {block.title}
                      </h3>
                    </div>
                    <p className="text-[0.95rem] text-text-secondary leading-[1.75] font-sans-body max-w-[500px] group-hover:text-white/80 dark:group-hover:text-text-secondary transition-colors duration-100">
                      {block.desc}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div className="font-sans-heading text-6xl font-black text-text-primary/10 leading-none group-hover:text-white/10 dark:group-hover:text-brand-indigo/20 transition-colors duration-100">
                        {block.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-sans-heading text-base font-black text-text-primary mb-3 tracking-tight group-hover:text-white dark:group-hover:text-text-primary transition-colors duration-100 uppercase">
                        {block.title}
                      </h3>
                      <p className="text-[0.95rem] text-text-secondary leading-[1.7] font-sans-body group-hover:text-white/80 dark:group-hover:text-text-secondary transition-colors duration-100">
                        {block.desc}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export { WhyUs };

