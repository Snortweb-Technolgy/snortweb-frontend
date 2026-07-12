import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo/SEO";
import Hero from "../components/sections/Hero";

import Marquee from "../components/sections/Marquee";
import Manifesto from "../components/sections/Manifesto";
import Services from "../components/sections/Services";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import Portfolio from "../components/sections/Portfolio";
import WhyUs from "../components/sections/WhyUs";
import Process from "../components/sections/Process";
import CTABanner from "../components/sections/CTABanner";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView();
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <SEO 
        title="Snortweb Technology | Website Development & Cyber Security" 
        description="Modern websites with security and performance built-in. Web development and cybersecurity solutions for growing businesses."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Snortweb Technology",
          "url": "https://snortwebtechnology.com"
        }}
      />
      
      {/* Eagerly loaded LCP Critical Path */}
      <Hero />
      
        <Marquee />
        <Manifesto />
        <Services />
        <Stats />
        <Portfolio />
        <Testimonials />
        <WhyUs />
        <Process />
        <CTABanner />
    </motion.div>
  );
}

export { Home };
