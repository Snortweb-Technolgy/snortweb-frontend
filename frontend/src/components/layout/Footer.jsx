import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import { useApp } from "../../context/AppContext";
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

const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  const { t, settings } = useApp();

  const handleLinkClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const socialLinks = [
    { icon: <LinkedinIcon size={16} />, url: "https://www.linkedin.com/company/snortweb-technology/", aria: "LinkedIn", platform: "linkedin" },
    { icon: <InstagramIcon size={16} />, url: "https://www.instagram.com/snortweb.technology?igsh=bHBicG5jMHA1d28w", aria: "Instagram", platform: "instagram" }
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
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
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
            {t("footer_brand_desc")}
          </p>
        </div>

        {/* Col 2 (30%): Services */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <span className="font-mono-code font-bold text-[0.65rem] tracking-[0.2em] text-text-primary uppercase mb-6">
            {t("services")}
          </span>
          <div className="flex flex-col gap-[12px] w-full">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                onClick={handleLinkClick}
                className="font-sans-body font-normal text-[0.875rem] text-text-secondary hover:text-text-primary hover:pl-1.5 transition-all duration-100 ease-out nav-link-no-underline w-fit"
              >
                {t(`service_${service.slug.replace(/-/g, "_")}_title`) || service.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 (30%): Connect */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <span className="font-mono-code font-bold text-[0.65rem] tracking-[0.2em] text-text-primary uppercase mb-6">
            {t("footer_connect")}
          </span>
          
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=snortwebtechnology@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-body font-medium text-[0.875rem] text-text-primary hover:text-text-secondary transition-colors duration-100 hover:underline decoration-1 decoration-text-primary underline-offset-4"
          >
            snortwebtechnology@gmail.com
          </a>

          <a
            href="tel:+919860596829"
            className="mt-2 font-sans-body font-medium text-[0.875rem] text-text-primary hover:text-text-secondary transition-colors duration-100 hover:underline decoration-1 decoration-text-primary underline-offset-4"
          >
            +91 9860596829
          </a>
          
          <span className="mt-3 font-sans-body font-normal text-[0.8rem] text-text-tertiary">
            {t("footer_emergency")}
          </span>

          {/* Social Row */}
          <div className="flex flex-wrap gap-[10px] mt-6">
            {(settings?.socialLinks?.length > 0 ? settings.socialLinks : socialLinks).map((social, i) => {
              let IconComponent = LinkedinIcon;
              const iconString = typeof social.icon === 'string' ? social.icon : (social.platform || "");
              const iconName = iconString.toLowerCase();
              if (iconName === "twitter") IconComponent = TwitterIcon;
              else if (iconName === "github") IconComponent = GithubIcon;
              else if (iconName === "instagram") IconComponent = InstagramIcon;
              else if (iconName === "facebook") IconComponent = FacebookIcon;
              else if (iconName === "youtube") IconComponent = YoutubeIcon;
              // default to Linkedin if not found or if platform has no specific icon

              return (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  transition={{ duration: 0.1 }}
                  className="w-[32px] h-[32px] border border-border-subtle flex items-center justify-center text-text-secondary hover:border-border-main hover:text-[#F7F3EB] dark:hover:text-text-primary hover:bg-[#24211C] dark:hover:bg-bg-elevated rounded-[8px] dark:rounded-md transition-all duration-300"
                  aria-label={social.platform || social.aria}
                >
                  {social.icon && typeof social.icon !== 'string' ? social.icon : <IconComponent size={16} strokeWidth={1.5} />}
                </motion.a>
              )
            })}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto mt-[60px] pt-[24px] border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-sans-body font-normal text-[0.8rem] text-text-tertiary">
          &copy; {new Date().getFullYear()} Snortweb Technology. {t("footer_rights")}
        </span>

        <span className="font-mono-code font-bold text-[0.8rem] text-text-primary tracking-[0.05em] uppercase">
          {t("footer_tagline")}
        </span>
      </div>

    </footer>
  );
}
export { Footer };
