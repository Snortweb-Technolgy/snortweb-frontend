import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 font-sans-body select-none overflow-hidden bg-bg-primary text-text-primary"
    >
      {/* Background visual elements */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      {/* Massive ghost number */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-sans-heading font-black text-[15rem] sm:text-[20rem] text-black/[0.04] dark:text-white/[0.02] leading-none select-none pointer-events-none z-0"
      >
        404
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-sans-heading font-black text-[1.5rem] sm:text-[2rem] text-text-primary uppercase tracking-tight mb-6">
          Page not found.
        </h1>
        
        <p className="font-sans-body text-[0.875rem] text-text-secondary max-w-[320px] mb-8 leading-relaxed text-center">
          The resources you are attempting to trace do not exist on our servers.
        </p>

        <Button
          magnetic={true}
          onClick={() => navigate("/")}
          className="px-8 py-3.5 bg-[#24211C] dark:bg-brand-indigo hover:bg-[#C8A15A] dark:hover:bg-brand-indigo/90 text-[#F8F5F0] dark:text-[#161616] hover:text-[#24211C] font-sans-heading font-black text-xs tracking-[0.18em] uppercase rounded-none dark:rounded-md border border-[#24211C] dark:border-brand-indigo transition-all duration-300 cursor-pointer"
        >
          Go Home
        </Button>
      </div>

    </motion.div>
  );
}

export { NotFound };
