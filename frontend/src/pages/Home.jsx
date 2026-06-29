import React from "react";
import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
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
