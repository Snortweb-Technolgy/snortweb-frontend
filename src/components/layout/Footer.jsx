import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/services";

export default function Footer() {
  const handleLinkClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const socialLinks = [
    { label: "in", url: "https://linkedin.com", aria: "LinkedIn" },
    { label: "tw", url: "https://twitter.com", aria: "Twitter" },
    { label: "gh", url: "https://github.com", aria: "GitHub" }
  ];

  return (
    <footer className="relative bg-bg-primary border-t-4 border-border-main px-12 py-[80px] pb-[40px] z-10 select-none">
      
      {/* Top Section */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-10 gap-12 md:gap-8 items-start">
        
        {/* Col 1 (40%): Brand */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3.5 group nav-link-no-underline">
            <img
              src="/logo-icon.png"
              alt="Snortweb Logo Icon"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-[1.05]"
            />
            <div className="flex flex-col text-left">
              <span className="font-sans-heading font-black text-[1.4rem] tracking-[0.2em] text-[#F5F3EF] uppercase leading-none">
                SNORTWEB
              </span>
              <span className="font-sans-body font-light text-[0.65rem] tracking-[0.4em] text-text-tertiary leading-none uppercase mt-1.5">
                TECHNOLOGY
              </span>
            </div>
          </Link>

          <p className="mt-5 font-sans-body font-normal text-[0.875rem] text-text-secondary leading-[1.7] max-w-[260px]">
            Building secure digital futures for growing businesses worldwide with enterprise standards.
          </p>
        </div>

        {/* Col 2 (30%): Services */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <span className="font-mono-code font-bold text-[0.65rem] tracking-[0.2em] text-text-primary uppercase mb-6">
            SERVICES
          </span>
          <div className="flex flex-col gap-[12px] w-full">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                onClick={handleLinkClick}
                className="font-sans-body font-normal text-[0.875rem] text-text-secondary hover:text-text-primary hover:pl-1.5 transition-all duration-100 ease-out nav-link-no-underline w-fit"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 (30%): Connect */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <span className="font-mono-code font-bold text-[0.65rem] tracking-[0.2em] text-text-primary uppercase mb-6">
            CONNECT
          </span>
          
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=snortwebtechnology@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-body font-medium text-[0.875rem] text-text-primary hover:text-text-secondary transition-colors duration-100 hover:underline decoration-1 decoration-text-primary underline-offset-4"
          >
            snortwebtechnology@gmail.com
          </a>
          
          <span className="mt-3 font-sans-body font-normal text-[0.8rem] text-text-tertiary">
            Available 24/7 for security emergencies
          </span>

          {/* Social Row */}
          <div className="flex gap-[10px] mt-6">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ duration: 0.1 }}
                className="w-[32px] h-[32px] border border-border-subtle flex items-center justify-center font-mono-code font-bold text-[0.72rem] text-text-secondary hover:border-border-main hover:text-[#F7F3EB] dark:hover:text-text-primary hover:bg-[#24211C] dark:hover:bg-bg-elevated rounded-[8px] dark:rounded-md transition-all duration-300"
                aria-label={social.aria}
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto mt-[60px] pt-[24px] border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-sans-body font-normal text-[0.8rem] text-text-tertiary">
          &copy; {new Date().getFullYear()} Snortweb Technology. All rights reserved.
        </span>

        <span className="font-mono-code font-bold text-[0.8rem] text-text-primary tracking-[0.05em] uppercase">
          Build. Secure. Grow.
        </span>
      </div>

    </footer>
  );
}
export { Footer };
