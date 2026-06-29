import React, { useMemo } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/services";
import Button from "../components/ui/Button";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = useMemo(() => {
    return services.find((s) => s.slug === slug);
  }, [slug]);

  // Get other services (called unconditionally to satisfy hook rules)
  const otherServices = useMemo(() => {
    return services.filter((s) => s.slug !== slug);
  }, [slug]);

  // 404 fallback: if slug not found -> redirect to /services
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen bg-bg-primary select-none font-sans-body w-full overflow-hidden text-text-primary"
    >
      {/* Background visual indicators */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      {/* Main Page Content */}
      <div className="relative pt-[160px] pb-[120px] px-6 md:px-12 max-w-[1200px] mx-auto z-10">
        
        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          
          {/* Left Column (60%): Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left relative">
            
            {/* Breadcrumb */}
            <nav className="font-mono-code text-[0.8rem] text-text-tertiary mb-8 flex items-center gap-2 uppercase">
              <Link to="/" className="text-text-primary hover:text-text-secondary transition-colors">Home</Link>
              <span>&gt;</span>
              <Link to="/services" className="text-text-primary hover:text-text-secondary transition-colors">Services</Link>
              <span>&gt;</span>
              <span className="text-text-tertiary">{service.title}</span>
            </nav>

            {/* Number watermark behind title */}
            <div
              className="absolute -top-[10px] -left-[20px] font-sans-heading font-black text-[15rem] text-black/[0.04] dark:text-white/[0.02] leading-none select-none pointer-events-none z-0"
            >
              {service.number}
            </div>

            {/* Title */}
            <h1
              className="relative font-sans-heading font-black text-text-primary leading-tight uppercase mb-6 z-10"
              style={{ fontSize: "var(--text-display)" }}
            >
              {service.title}
            </h1>

            {/* Full description with Custom Drop Cap */}
            <p className="drop-cap font-sans-body font-normal text-[1rem] text-text-primary leading-[1.8] mt-6 z-10 max-w-[620px]">
              {service.fullDesc || `${service.shortDesc} We implement this capability following strict cybersecurity models, ensuring your application architecture remains impenetrable while performing at maximum capacity. From blueprint strategy to automated testing, we cover the full deployment lifecycle.`}
            </p>

            {/* Features heading */}
            <h2 className="font-sans-heading font-black text-[1.1rem] text-text-primary mt-[48px] mb-[24px] uppercase tracking-wide">
              What's Included
            </h2>

            {/* Features grid (2 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-bg-primary dark:bg-bg-secondary border border-border-main flex items-start gap-3 p-[16px] px-[20px] rounded-none dark:rounded-md"
                >
                  <span className="font-sans-body font-bold text-text-primary text-[1.1rem] leading-none select-none">
                    ✓
                  </span>
                  <span className="font-sans-body font-normal text-[0.9rem] text-text-primary">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (40%): Sticky sidebar */}
          <div className="lg:col-span-4 w-full lg:sticky lg:top-[120px] flex flex-col gap-10">
            
            {/* CTA card */}
            <div
              className="p-8 bg-bg-primary dark:bg-bg-secondary rounded-none dark:rounded-md text-left border border-border-main shadow-none flex flex-col"
            >
              <h3 className="font-sans-heading font-black text-[1.2rem] text-text-primary uppercase tracking-tight mb-3">
                Ready to get started?
              </h3>
              
              <p className="font-sans-body font-normal text-[0.9rem] text-text-secondary leading-relaxed mb-6">
                Free consultation. We'll assess your needs and propose the best approach.
              </p>

              <Button
                magnetic={true}
                onClick={() => navigate("/contact", { state: { selectedService: service.title } })}
                className="w-full bg-[#24211C] dark:bg-brand-indigo hover:bg-[#C8A15A] dark:hover:bg-brand-indigo/90 text-[#F8F5F0] dark:text-[#161616] hover:text-[#24211C] font-sans-heading font-black text-[0.9rem] tracking-[0.18em] uppercase py-4 rounded-none dark:rounded-md transition-all duration-300 cursor-pointer border border-[#24211C] dark:border-brand-indigo"
              >
                Start Project
              </Button>

              <span className="block text-center mt-4 font-sans-body font-normal text-[0.8rem] text-text-secondary">
                or email{" "}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=snortwebtechnology@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-text-secondary font-bold transition-colors"
                >
                  snortwebtechnology@gmail.com
                </a>
              </span>
            </div>

            {/* Other Services */}
            <div className="flex flex-col items-start text-left">
              <span className="font-mono-code font-bold text-[0.7rem] tracking-[0.2em] text-text-primary uppercase mb-4">
                Other Services
              </span>

              <div className="flex flex-col gap-3.5 w-full">
                {otherServices.map((item) => (
                  <Link
                    key={item.id}
                    to={`/services/${item.slug}`}
                    className="font-sans-body font-normal text-[0.95rem] text-text-secondary hover:text-text-primary hover:pl-2 transition-all duration-100 ease-out text-left"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export { ServiceDetail };
