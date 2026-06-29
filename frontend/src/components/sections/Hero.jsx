import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import HeroScene from "../three/HeroScene";
import { stats } from "../../data/stats";
import { Shield, Lock, Users, Headphones } from "lucide-react";

// Helper component for counting animations in Hero Counter Bar
function HeroCounterItem({ target, suffix, label, delay, icon: Icon }) {
  const hasDecimal = target % 1 !== 0;
  const [count, setCount] = useState(hasDecimal ? (0).toFixed(1) : 0);

  useEffect(() => {
    let start = null;
    let timer = setTimeout(() => {
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / 2000, 1);
        // easeOutQuad
        const easedProgress = percentage * (2 - percentage);
        const currentVal = hasDecimal
          ? (easedProgress * target).toFixed(1)
          : Math.floor(easedProgress * target);
        setCount(currentVal);

        if (progress < 2000) {
          requestAnimationFrame(step);
        } else {
          setCount(hasDecimal ? target.toFixed(1) : target);
        }
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay, hasDecimal]);

  return (
    <div className="flex items-center gap-4">
      {/* Icon Circle wrapper with theme compatibility */}
      <div className="w-10 h-10 rounded-full bg-[#FAF6EE] dark:bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#E9DFCB] dark:border-[#3D3528]">
        <Icon className="w-4 h-4 text-accent" strokeWidth={1.8} />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans-heading font-black text-lg sm:text-xl text-text-primary leading-tight">
          {count}{suffix}
        </span>
        <span className="text-[0.62rem] sm:text-[0.68rem] text-text-secondary font-sans-body uppercase tracking-[0.1em] font-semibold mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

// Real-time security feed animation widget
function SecurityFeed() {
  const [logs, setLogs] = useState([
    { id: 1, text: "INITIALIZING SHIELD MODULES...", type: "info" },
    { id: 2, text: "MONITORING ACTIVE TRAFFIC...", type: "ok" },
    { id: 3, text: "THREAT LEVEL: NEUTRAL", type: "success" }
  ]);

  useEffect(() => {
    const logTemplates = [
      { text: "SECURE SOCKET LAYER V1.3 LOADED", type: "info" },
      { text: "AES-256 ENCRYPTION KEY VALIDATED", type: "ok" },
      { text: "INTEGRITY CHECK: 100% OK", type: "success" },
      { text: "ZERO-TRUST PERIMETER STABLE", type: "success" },
      { text: "SCANNING OUTGOING RESPONSES...", type: "info" },
      { text: "DDOS PROTECTION: WATCHING", type: "ok" },
      { text: "SQL INJECTION FILTER ACTIVE", type: "success" },
      { text: "FIREWALL RULES SYNCHRONIZED", type: "ok" },
      { text: "MFA HANDSHAKE COMPLETED", type: "success" }
    ];

    const interval = setInterval(() => {
      const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs((prevLogs) => {
        const updated = [...prevLogs.slice(1), { id: Date.now(), ...randomTemplate }];
        return updated;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[440px] bg-[#1E1E1E]/40 backdrop-blur-md border border-border-light rounded-none dark:rounded-md p-4 mt-5 font-mono-code text-[11px] select-none text-left shadow-inset-overlay">
      <div className="flex items-center justify-between border-b border-border-light/40 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
          </span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Live Security Feed</span>
        </div>
        <span className="text-[8px] text-[#C8A15A] uppercase tracking-wider font-semibold animate-pulse">Scanning...</span>
      </div>
      <div className="space-y-2 h-[68px] overflow-hidden flex flex-col justify-end">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 font-mono-code text-text-secondary tracking-wide animate-fade-in"
            >
              <span className={
                log.type === "success" ? "text-emerald-500 font-bold" :
                log.type === "ok" ? "text-[#C8A15A] font-bold" : "text-sky-400 font-bold"
              }>
                {log.type === "success" ? "✓" : log.type === "ok" ? "⚡" : "ℹ"}
              </span>
              <span className="truncate text-text-secondary font-medium">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Hero() {
  const { isLoaded, theme } = useApp();
  const navigate = useNavigate();

  // Typewriter states
  const subtextText = "Cybersecurity-first web development for businesses that cannot afford to be compromised.";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    
    let timerId = null;
    let index = 0;
    
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      
      const tick = () => {
        setTypedText(subtextText.substring(0, index + 1));
        index++;
        if (index < subtextText.length) {
          timerId = setTimeout(tick, 28);
        } else {
          setIsTyping(false);
        }
      };
      
      tick();
    }, 1200);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isLoaded]);

  const handleExplore = () => {
    const el = document.getElementById("services-section");
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -40 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/services");
    }
  };

  // Stagger parameters for words
  const line1 = "We Build.";
  const line2 = "We Secure.";
  const line3 = "They Can't Break It.";

  const wordsLine1 = line1.split(" ");
  const wordsLine2 = line2.split(" ");
  const wordsLine3 = line3.split(" ");

  const getGlobalIndex = (lineNum, localIdx) => {
    if (lineNum === 1) return localIdx;
    if (lineNum === 2) return wordsLine1.length + localIdx;
    return wordsLine1.length + wordsLine2.length + localIdx;
  };

  const wordVariants = (globalIdx) => ({
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: globalIdx * 0.06
      }
    }
  });

  return (
    <section id="hero" className="relative h-auto lg:min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes wheelScroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 12px); opacity: 0; }
        }
      `}} />

      {/* Layer 1: Premium Luxury Textures & Vignette */}
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          background: theme === "dark"
            ? "radial-gradient(circle at center, transparent 35%, rgba(22, 22, 22, 0.9) 100%)"
            : "radial-gradient(circle at center, #FCFAF7 0%, #F7F3EB 100%)"
        }}
      />

      {/* Hero Content container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-between z-10 pt-40 pb-16 lg:pt-44 lg:pb-8 min-h-[600px] lg:min-h-[650px]">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            <AnimatePresence>
              {isLoaded && (
                <>
                  {/* Staggered Word Headlines */}
                  <div className="space-y-1 sm:space-y-2">
                    {/* Line 1: We Build */}
                    <div className="overflow-hidden flex flex-wrap gap-x-3">
                      {wordsLine1.map((word, i) => {
                        const idx = getGlobalIndex(1, i);
                        return (
                          <div key={idx} className="overflow-hidden">
                            <motion.h1
                              variants={wordVariants(idx)}
                              initial="hidden"
                              animate="visible"
                              className="font-sans-heading text-hero font-black text-text-primary leading-[0.95] tracking-tight uppercase"
                            >
                              {word}
                            </motion.h1>
                          </div>
                        );
                      })}
                    </div>

                    {/* Line 2: We Secure */}
                    <div className="overflow-hidden flex flex-wrap gap-x-3">
                      {wordsLine2.map((word, i) => {
                        const idx = getGlobalIndex(2, i);
                        return (
                          <div key={idx} className="overflow-hidden">
                            <motion.h1
                              variants={wordVariants(idx)}
                              initial="hidden"
                              animate="visible"
                              className="font-sans-heading text-hero font-black leading-[0.95] tracking-tight text-text-primary pb-1 uppercase"
                            >
                              {word}
                            </motion.h1>
                          </div>
                        );
                      })}
                    </div>

                    {/* Line 3: They Can't Break It */}
                    <div className="overflow-hidden flex flex-wrap gap-x-2">
                      {wordsLine3.map((word, i) => {
                        const idx = getGlobalIndex(3, i);
                        return (
                          <div key={idx} className="overflow-hidden">
                            <motion.p
                              variants={wordVariants(idx)}
                              initial="hidden"
                              animate="visible"
                              className="font-sans-heading font-normal italic pt-1.5 text-accent dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-brand-indigo dark:to-[#F5F3EF]"
                              style={{
                                fontSize: "clamp(1.4rem, 2.2vw, 2rem)"
                              }}
                            >
                              {word}
                            </motion.p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Decorative Line Punctuation */}
                  <div className="flex items-center gap-3 my-3 w-full max-w-[280px]">
                    <div className="h-[1px] bg-border-main dark:bg-gradient-to-r dark:from-brand-indigo/50 dark:to-transparent flex-grow" />
                    <div className="w-[6px] h-[6px] border border-border-main dark:border-brand-indigo/80 bg-bg-primary dark:bg-brand-indigo/20 dark:shadow-[0_0_8px_rgba(94,106,210,0.6)]" />
                  </div>

                  {/* Subtext with Typewriter Effect */}
                  <div className="h-[72px] sm:h-auto overflow-hidden">
                    <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-[480px] leading-relaxed font-sans-body min-h-[3em]">
                      {typedText}
                      {isTyping && (
                        <span className="inline-block w-[2px] h-[1em] bg-text-primary dark:bg-brand-indigo dark:shadow-[0_0_8px_#5e6ad2] ml-1 animate-[blink_0.8s_step-end_infinite]" />
                      )}
                    </p>
                  </div>

                  {/* Real-time Security Log Monitor */}
                  <SecurityFeed />

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                    className="mt-4 flex flex-row gap-4 w-full sm:w-auto"
                  >
                    {/* Button 1: Start a Project */}
                    <Button
                      magnetic={true}
                      onClick={() => navigate("/contact")}
                      className="relative overflow-hidden border-2 border-[#24211C] dark:border-brand-indigo px-8 py-4 rounded-none dark:rounded-md bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] font-mono-code text-xs font-bold tracking-[0.12em] transition-colors duration-300 hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo"
                    >
                      <span className="flex items-center gap-2">
                        START A PROJECT <span className="text-sm">→</span>
                      </span>
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Three.js Canvas Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0 z-10">
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="w-full h-[360px] lg:h-[550px] relative flex items-center justify-center select-none"
                >
                  <HeroScene />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Counter bar (Fills full width below the grid columns) */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.25 }}
              className="mt-12 w-full bg-[#FBF8F2] dark:bg-[#1E1E1E] border border-border-light rounded-[24px] py-5 px-8 z-20 shadow-card dark:shadow-none"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 lg:divide-x divide-border-light">
                {stats.map((item, idx) => {
                  const icons = [Shield, Lock, Users, Headphones];
                  const Icon = icons[idx] || Shield;
                  return (
                    <div key={item.id} className={`${idx > 0 ? "lg:pl-6" : ""}`}>
                      <HeroCounterItem
                        target={item.value}
                        suffix={item.suffix}
                        label={item.label.split(" ")[0]}
                        delay={1500}
                        icon={Icon}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.4 }}
            onClick={handleExplore}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:flex flex-col items-center gap-2 z-10"
          >
            <div className="relative w-6 h-9 border-[1.5px] border-border-main rounded-none">
              <div 
                className="absolute top-1.5 left-1/2 w-[3px] h-1.5 bg-text-secondary"
                style={{
                  transform: "translateX(-50%)",
                  animation: "wheelScroll 1.5s ease-out infinite"
                }}
              />
            </div>
            <span className="font-mono-code font-light text-[0.6rem] tracking-[0.2em] text-text-tertiary uppercase mt-1">
              scroll to explore
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { Hero };
