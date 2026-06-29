import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function Loader() {
  const { isLoaded, setIsLoaded } = useApp();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("ESTABLISHING SECURE PROTOCOLS...");

  useEffect(() => {
    let start = null;
    const duration = 2800; // time to reach 100%
    let animationFrame;

    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(elapsed / duration, 1);
      const currentProgress = Math.floor(pct * 100);
      
      setProgress(currentProgress);

      // Change status text based on progress percentage
      if (currentProgress < 25) {
        setStatus("ESTABLISHING SECURE PROTOCOLS...");
      } else if (currentProgress < 60) {
        setStatus("INITIALIZING VULNERABILITY SHIELDS...");
      } else if (currentProgress < 85) {
        setStatus("OPTIMIZING SYSTEMS ARCHITECTURE...");
      } else {
        setStatus("WELCOME TO SNORTWEB TECHNOLOGY");
      }

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setStatus("WELCOME TO SNORTWEB TECHNOLOGY");
        
        // Wait a brief moment at 100% before dismissing loader
        const dismissTimer = setTimeout(() => {
          setIsLoaded(true);
        }, 600);
        return () => clearTimeout(dismissTimer);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070708] select-none pointer-events-none"
        >
          {/* Futuristic background patterns */}
          <div className="absolute inset-0 pattern-noise pointer-events-none opacity-[0.22] z-0" />
          
          {/* Glowing central backdrops */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C8A15A]/[0.025] blur-[150px] pointer-events-none select-none z-0" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.01] blur-[100px] pointer-events-none select-none z-0" />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* SVG Circular Loader wrapping the Logo */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              
              {/* Outer Slow Rotating Dashed Ring */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="rgba(200, 161, 90, 0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  fill="transparent"
                />
              </motion.svg>

              {/* Inner Glowing Active Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="#C8A15A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray="276.4" // 2 * Math.PI * 44
                  animate={{ strokeDashoffset: 276.4 - (276.4 * progress) / 100 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  style={{
                    filter: "drop-shadow(0px 0px 6px rgba(200, 161, 90, 0.4))"
                  }}
                />
              </svg>

              {/* Inner Pulsing Logo */}
              <motion.img
                src="/logo-icon.png"
                alt="Snortweb Logo Icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.7, 1, 0.7], 
                  scale: [0.96, 1.02, 0.96] 
                }}
                transition={{ 
                  opacity: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                }}
                className="h-16 w-16 object-contain z-10"
              />
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center mb-8"
            >
              <h1 className="font-sans-heading font-black text-white text-[1.4rem] tracking-[0.25em] uppercase leading-none">
                SNORTWEB
              </h1>
              <span className="font-sans-body uppercase font-light tracking-[0.55em] text-[#C8A15A] text-[0.58rem] mt-2.5">
                TECHNOLOGY
              </span>
            </motion.div>

            {/* Clean minimalist percentage and status */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center mt-4 text-center"
            >
              {/* Elegant percentage */}
              <span className="font-mono-code font-bold text-3xl tracking-widest text-[#C8A15A] select-none mb-3">
                {progress}%
              </span>
              
              {/* Muted sliding status label */}
              <div className="h-4 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="font-mono-code text-[0.58rem] tracking-[0.35em] text-[#8B857B] uppercase select-none"
                  >
                    {status}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
