import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function CTABanner() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="cta-section"
      className="relative w-full bg-[#12141C] overflow-hidden select-none z-10 border-t border-[#12141C]"
    >
      {/* 1. Radial gradient center */}
      <div className="pattern-radial-light absolute inset-0 pointer-events-none z-0 opacity-40" />

      {/* 2. Noise overlay */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-[100px] md:py-[120px] flex flex-col items-center text-center z-10">
        
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3 }}
          className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-[#ECE9E2]/70 uppercase mb-5"
        >
          READY TO BUILD?
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="font-sans-heading text-[#ECE9E2] font-black leading-[1.05] tracking-tight uppercase mb-8"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Your website. <br />
          <span className="font-normal italic">Secured.</span>
        </motion.h2>

        {/* Body Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-sans-body font-normal text-[1.05rem] text-[#ECE9E2] max-w-[480px] leading-[1.6] mb-12"
        >
          Enterprise-grade web development and cybersecurity for businesses that cannot afford to be compromised.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-6"
        >
          <Button
            magnetic={true}
            onClick={() => navigate("/contact")}
            className="px-14 py-4.5 bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] font-sans-heading font-extrabold text-[0.9rem] tracking-[0.18em] uppercase rounded-none border border-[#24211C] dark:border-brand-indigo hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo transition-all duration-300 cursor-pointer"
          >
            START YOUR PROJECT
          </Button>
        </motion.div>

        {/* Trust indicator text */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono-code font-normal text-[0.7rem] text-[#ECE9E2] tracking-[0.05em] uppercase"
        >
          No commitment required &middot; Free consultation &middot; Response within 24 hours
        </motion.span>

      </div>
    </section>
  );
}

export { CTABanner };

