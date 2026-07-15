import React, { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo/SEO";
import Hero from "../components/sections/Hero";

// Lazy load below-the-fold components
const Marquee = lazy(() => import("../components/sections/Marquee"));
const Manifesto = lazy(() => import("../components/sections/Manifesto"));
const Services = lazy(() => import("../components/sections/Services"));
const Stats = lazy(() => import("../components/sections/Stats"));
const Testimonials = lazy(() => import("../components/sections/Testimonials"));
const Portfolio = lazy(() => import("../components/sections/Portfolio"));
const WhyUs = lazy(() => import("../components/sections/WhyUs"));
const Process = lazy(() => import("../components/sections/Process"));
const CTABanner = lazy(() => import("../components/sections/CTABanner"));

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
      
      {/* Below the fold - Lazy Loaded */}
      <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
        <Marquee />
        <Manifesto />
        <Services />
        <Stats />
        <Portfolio />
        <Testimonials />
        <WhyUs />
        <Process />
        <CTABanner />
      </Suspense>
    </motion.div>
  );
}

export { Home };
