import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import Loader from "./components/ui/Loader";
import Noise from "./components/ui/Noise";
import { useLenis } from "./hooks/useLenis";
import Chatbot from "./components/ui/Chatbot";
import GlobalErrorBoundary from "./components/ui/GlobalErrorBoundary";

import Home from "./pages/Home";

// Page lazy loading for splitting bundle sizes
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Viewport restoration utility on path redirects
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there is no hash
    // (Hashes are handled individually by their respective components like Home.jsx)
    if (!hash) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();

  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <HelmetProvider>
      <Helmet defaultTitle="Snortweb Technology | Build. Secure. Grow." titleTemplate="%s | Snortweb Technology">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Snortweb Technology | Build. Secure. Grow.</title>
        
        {/* Core Meta Tags */}
        <meta name="description" content="Premium Website Development, Cybersecurity Assessments, Web Applications, Cloud Solutions and Performance Optimization." />
        <meta name="keywords" content="Website Development, Cybersecurity, Web Applications, Cloud Solutions, Performance Optimization, Snortweb Technology" />
        <meta name="author" content="Snortweb Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://snortwebtechnology.com" />

        {/* Open Graph Tags */}
        <meta property="og:site_name" content="Snortweb Technology" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Snortweb Technology | Build. Secure. Grow." />
        <meta property="og:description" content="Premium Website Development, Cybersecurity Assessments, Web Applications, Cloud Solutions and Performance Optimization." />
        <meta property="og:url" content="https://snortwebtechnology.com" />
        <meta property="og:image" content="https://snortwebtechnology.com/logo.png" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Snortweb Technology | Build. Secure. Grow." />
        <meta name="twitter:description" content="Premium Website Development, Cybersecurity Assessments, Web Applications, Cloud Solutions and Performance Optimization." />
        <meta name="twitter:image" content="https://snortwebtechnology.com/logo.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://snortwebtechnology.com/#organization",
                  "name": "Snortweb Technology",
                  "url": "https://snortwebtechnology.com",
                  "logo": "https://snortwebtechnology.com/logo.png",
                  "email": "snortwebtechnology@gmail.com",
                  "telephone": "+91 9860596829",
                  "areaServed": "Worldwide",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "India"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://snortwebtechnology.com/#service",
                  "name": "Snortweb Technology",
                  "url": "https://snortwebtechnology.com",
                  "logo": "https://snortwebtechnology.com/logo.png",
                  "email": "snortwebtechnology@gmail.com",
                  "telephone": "+91 9860596829",
                  "areaServed": "Worldwide",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "India"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://snortwebtechnology.com/#website",
                  "url": "https://snortwebtechnology.com",
                  "name": "Snortweb Technology",
                  "publisher": {
                    "@id": "https://snortwebtechnology.com/#organization"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between overflow-x-hidden">
      {/* Scroll manager */}
      <ScrollToTop />

      {/* Cinematic Film grain filter */}
      <Noise />

      {/* Lag ring mouse pointer feedback */}
      <Cursor />

      {/* Corporate Stagger reveal entry overlay */}
      <Loader />

      {/* Global Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#151619',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
          },
          success: {
            iconTheme: { primary: '#C8A15A', secondary: '#151619' },
          },
        }}
      />

      {/* Fixed top header */}
      <Navbar />

      {/* Main page segments */}
      <main className="flex-grow">
        <GlobalErrorBoundary>
          <Suspense fallback={<div className="h-screen w-full bg-bg-primary flex items-center justify-center text-text-secondary" />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Redirects for non-existent root-level pages to homepage sections */}
                <Route path="/about" element={<Navigate to="/#about" replace />} />
                <Route path="/projects" element={<Navigate to="/#projects" replace />} />
                <Route path="/portfolio" element={<Navigate to="/#projects" replace />} />
                <Route path="/review" element={<Navigate to="/#review" replace />} />
                <Route path="/process" element={<Navigate to="/#process" replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </GlobalErrorBoundary>
      </main>

      {/* Bottom info grid links */}
      <Footer />

      {/* Floating AI chatbot assistant */}
      <Chatbot />
    </div>
    </HelmetProvider>
  );
}

// PROMPT 3: Process + CTA + Footer + Pages
