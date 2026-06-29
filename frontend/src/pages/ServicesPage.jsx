import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { ServiceCard } from "../components/sections/Services";
import Button from "../components/ui/Button";

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen bg-bg-primary select-none font-sans-body w-full overflow-hidden text-text-primary"
    >
      {/* Background decorations */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      {/* Hero Area */}
      <div className="relative pt-[160px] pb-[80px] px-6 md:px-12 max-w-[1200px] mx-auto z-10 text-left flex flex-col">
        <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-text-primary uppercase mb-4">
          ALL SERVICES
        </span>
        <h1 className="font-sans-heading text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-tight uppercase mb-6" style={{ fontSize: "var(--text-display)" }}>
          What We Build & Secure.
        </h1>
        <p className="max-w-[600px] text-[1rem] text-text-secondary leading-relaxed font-sans-body">
          Every service we offer starts with a security audit. Because a beautiful website that leaks data is just an expensive liability.
        </p>
      </div>

      {/* Services Grid (3 -> 2 -> 1 columns) */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pb-24 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pb-[120px] z-10">
        <div className="p-8 md:p-12 bg-bg-primary dark:bg-bg-secondary border border-border-main rounded-none dark:rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-none text-left">
          <div className="max-w-xl text-left">
            <h3 className="font-sans-heading font-black text-[1.2rem] text-text-primary uppercase tracking-tight mb-2">
              Need a custom solution?
            </h3>
            <p className="font-sans-body font-normal text-[0.85rem] text-text-secondary leading-relaxed">
              We engineer bespoke applications, tailored security architectures, and customized penetration audits for special enterprise workloads.
            </p>
          </div>
          <Button
            magnetic={true}
            onClick={() => navigate("/contact")}
            className="px-10 py-4 border border-[#24211C] dark:border-brand-indigo bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-none dark:rounded-md flex-shrink-0 cursor-pointer"
          >
            Talk to Us
          </Button>
        </div>
      </div>

    </motion.div>
  );
}

export { ServicesPage };
