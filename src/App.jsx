import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import Loader from "./components/ui/Loader";
import Noise from "./components/ui/Noise";
import { useLenis } from "./hooks/useLenis";

// Page lazy loading for splitting bundle sizes
const Home = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Viewport restoration utility on path redirects
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between overflow-x-hidden">
      {/* Scroll manager */}
      <ScrollToTop />

      {/* Cinematic Film grain filter */}
      <Noise />

      {/* Lag ring mouse pointer feedback */}
      <Cursor />

      {/* Corporate Stagger reveal entry overlay */}
      <Loader />

      {/* Fixed top header */}
      <Navbar />

      {/* Main page segments */}
      <main className="flex-grow z-10">
        <Suspense fallback={<div className="h-screen w-full bg-bg-primary flex items-center justify-center text-text-secondary" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Bottom info grid links */}
      <Footer />
    </div>
  );
}

// PROMPT 3: Process + CTA + Footer + Pages
