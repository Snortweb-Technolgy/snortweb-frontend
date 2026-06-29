import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/services";

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.4-1.2-3.2 3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.5-3.8.1-.3.7-1.8-.1-3.8-1.1 0-2.8 1.1-3.8 1.8-1-.3-2-.4-3-.4s-2 .1-3 .4c-1-.7-2.7-1.8-3.8-1.8-.8 2-.2 3.5-.1 3.8-1 1-1.5 2.3-1.5 3.8 0 5.3 3 6.5 6 6.8-.8.8-1.2 2-1.2 3.2V23"></path>
  </svg>
);

export default function Footer() {
  const handleLinkClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const socialLinks = [
    { icon: <LinkedinIcon size={16} />, url: "https://linkedin.com", aria: "LinkedIn" },
    { icon: <TwitterIcon size={16} />, url: "https://twitter.com", aria: "Twitter" },
    { icon: <GithubIcon size={16} />, url: "https://github.com", aria: "GitHub" }
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
                className="w-[32px] h-[32px] border border-border-subtle flex items-center justify-center text-text-secondary hover:border-border-main hover:text-[#F7F3EB] dark:hover:text-text-primary hover:bg-[#24211C] dark:hover:bg-bg-elevated rounded-[8px] dark:rounded-md transition-all duration-300"
                aria-label={social.aria}
              >
                {social.icon}
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
