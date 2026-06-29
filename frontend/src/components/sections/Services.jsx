import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "../../data/services";
import { Globe, Layers, ShieldAlert, Scan, Bug, TrendingUp } from "lucide-react";

// Helper to map icon names to Lucide icons
export function ServiceIcon({ name, className, size = 22 }) {
  switch (name.toLowerCase()) {
    case "globe":
      return <Globe className={className} size={size} />;
    case "layers":
      return <Layers className={className} size={size} />;
    case "shieldalert":
    case "shield":
      return <ShieldAlert className={className} size={size} />;
    case "scan":
      return <Scan className={className} size={size} />;
    case "bug":
      return <Bug className={className} size={size} />;
    case "trendingup":
    case "trending":
      return <TrendingUp className={className} size={size} />;
    default:
      return <Globe className={className} size={size} />;
  }
}

// Service Card component with premium design and animations
export function ServiceCard({ service, index }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      transition={{ 
        y: { duration: 0.15, ease: "easeOut" },
        opacity: { duration: 0.4, delay: index * 0.04, ease: "easeOut" }
      }}
      className="group relative w-full h-full min-h-[480px] bg-bg-card dark:bg-bg-primary border border-border-main p-8 cursor-pointer select-none overflow-hidden flex flex-col justify-between transition-all duration-300 rounded-[24px] dark:rounded-md hover:bg-bg-secondary dark:hover:bg-bg-elevated hover:border-brand-indigo dark:hover:border-brand-indigo will-change-transform shadow-card dark:shadow-none"
    >
      {/* Grid Pattern overlay on hover */}
      <div 
        className="pattern-grid absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-100 pointer-events-none" 
      />

      {/* Number watermark badge in top right */}
      <div className="absolute top-4 right-6 font-mono-code font-black text-6xl md:text-7xl text-text-primary/[0.04] group-hover:text-brand-indigo/[0.08] select-none pointer-events-none transition-colors duration-100">
        {service.number}
      </div>

      <div className="relative z-10">
        {/* Icon Container */}
        <div className="w-[48px] h-[48px] flex items-center justify-center bg-bg-elevated border border-border-subtle rounded-[12px] dark:rounded-md mb-6 group-hover:bg-brand-indigo/10 group-hover:border-brand-indigo/35 transition-colors duration-300">
          <ServiceIcon name={service.icon} className="text-text-primary group-hover:text-brand-indigo transition-colors duration-100" size={20} />
        </div>

        {/* Service Title */}
        <h3 className="font-sans-heading text-xl font-black text-text-primary group-hover:text-brand-indigo mb-2.5 transition-colors duration-100">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-sans-body transition-colors duration-100">
          {service.shortDesc}
        </p>

        {/* Checklist */}
        <div className="space-y-2.5 mb-6">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-text-primary group-hover:bg-brand-indigo rounded-none dark:rounded-full transition-all duration-100 flex-shrink-0" />
              <span className="text-[0.875rem] text-text-secondary font-sans-body group-hover:text-text-primary transition-colors duration-100">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sleek Action Link */}
      <div className="flex items-center gap-2 font-mono-code text-[0.7rem] font-bold tracking-[0.2em] uppercase text-text-secondary group-hover:text-brand-indigo transition-colors duration-100 relative z-10">
        <span>VIEW SERVICE</span>
        <span className="text-xs transform group-hover:translate-x-1 transition-transform duration-105">&rarr;</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section 
      id="services-section" 
      className="relative py-[100px] md:py-[140px] bg-bg-primary z-10 px-6 md:px-12 select-none border-b border-border-main"
    >
      {/* Pattern overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20 max-w-[800px]">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.3em] text-text-primary uppercase mb-4">
            WHAT WE DELIVER
          </span>
          <h2 className="font-sans-heading text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight uppercase">
            Services Built for the <span className="italic font-normal">Precise Professional.</span>
          </h2>
          <p className="mt-6 text-sm text-text-secondary leading-relaxed font-sans-body max-w-[620px]">
            Every service we offer starts with a security audit. Because a beautiful website that leaks data is just an expensive liability.
          </p>
        </div>

        {/* Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export { Services };
