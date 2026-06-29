import React from "react";
import { motion } from "framer-motion";
import { stats } from "../../data/stats";
import { useCounter } from "../../hooks/useCounter";

// Stat Item Component with Glass Card hover and Count Animation
function StatCard({ item, index }) {
  const { ref, count } = useCounter(item.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="border border-white/20 p-8 rounded-none flex flex-col justify-center items-start hover:border-white transition-colors duration-100 bg-transparent select-none"
    >
      <div className="flex items-baseline">
        <span className="font-sans-heading font-black text-4xl sm:text-5xl lg:text-[4rem] leading-none text-white">
          {count}
        </span>
        <span className="font-sans-heading font-black text-3xl sm:text-4xl lg:text-[3rem] leading-none ml-0.5 text-white">
          {item.suffix}
        </span>
      </div>
      <span className="font-mono-code font-bold text-[0.8rem] uppercase text-white/50 mt-3 tracking-wider">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats-section"
      className="relative w-full bg-black py-[140px] z-10 overflow-hidden text-white"
    >
      {/* Pattern Overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-vertical-lines-light absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column (50%): 2x2 Grid of Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {stats.map((item, idx) => (
            <StatCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Right Column (50%): Quote and description */}
        <div className="flex flex-col items-start text-left justify-center lg:pl-8">
          <h2 className="font-sans-heading font-black text-3xl sm:text-4xl lg:text-[3rem] leading-[1.1] text-white uppercase">
            Numbers don't lie.
          </h2>
          <p className="font-sans-heading font-normal italic text-xl sm:text-2xl lg:text-[1.8rem] text-white/50 mt-2">
            Our work does the talking.
          </p>
          
          {/* horizontal black/white divider rule */}
          <div className="w-[60px] h-[2px] bg-white my-6" />
          
          <p className="font-sans-body font-normal text-[0.95rem] text-white/70 leading-[1.8] max-w-[340px]">
            Every project is secured, tested, and delivered with enterprise standards regardless of size.
          </p>
        </div>

      </div>

      {/* Watermark numbers in background */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0"
        style={{ height: "20vw", lineHeight: "1" }}
      >
        <span 
          className="font-sans-heading font-black text-white text-[20vw] opacity-[0.03] tracking-[-0.02em] whitespace-nowrap block"
          style={{ transform: "translateY(22%)" }}
        >
          5  99.9  5  24
        </span>
      </div>
    </section>
  );
}

// PART 2: Testimonials, WhyUs Bento, Process, 
// CTA, Footer, Pages, Performance

export { Stats };
