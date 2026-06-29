import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { process as processSteps } from "../../data/process";

const stepChecklists = [
  [
    "Comprehensive Threat Modeling",
    "Technology Stack Dependency Audit",
    "Attack Surface Penetration Mapping"
  ],
  [
    "Security-first System Architecture",
    "High Scalability & Performance Blueprint",
    "Automated Load-Balancing Configurations"
  ],
  [
    "Continuous DevSecOps Security Testing",
    "Static Application Security Testing (SAST)",
    "Hardened Server & API Configurations"
  ],
  [
    "Zero-Downtime CI/CD Blue/Green Launch",
    "24/7 Real-Time Vulnerability Scanning",
    "Automated Incident Response Protocols"
  ]
];

const stepPhases = [
  "PHASE_01 // SECURE_AUDIT",
  "PHASE_02 // SYSTEM_ARCH",
  "PHASE_03 // SECURE_BUILD",
  "PHASE_04 // LIVE_MONITOR"
];

// Inline dynamic simulation panel component
function ProcessVisual({ activeStep }) {
  switch (activeStep) {
    case 0: // Discovery & Audit
      return (
        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-[#1E1C18] dark:bg-bg-secondary/40 rounded-[16px] dark:rounded border border-[#2A2722] dark:border-border-light p-4 min-h-[180px]">
          {/* Radar scan animation */}
          <div className="absolute w-24 h-24 rounded-full border border-[#C8A15A]/40 flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full border border-[#C8A15A]/50 flex items-center justify-center" />
            <div className="absolute w-10 h-10 rounded-full border border-[#C8A15A]/60" />
            {/* Spinning line */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute w-[2px] h-[48px] bg-gradient-to-t from-[#C8A15A] to-transparent origin-bottom -translate-y-[24px]"
            />
          </div>
          {/* Mock scanned items */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#C8A15A] font-bold">SCANNING ACTIVE...</div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-emerald-400 font-bold">THREATS: 0</div>
          <div className="flex flex-col gap-1.5 w-full font-mono text-[9.5px] text-[#E8E2D6] dark:text-text-primary/80 items-start justify-end h-full z-10 pl-2 select-none">
            <div>[audit] scanning config/db... <span className="text-emerald-400">OK</span></div>
            <div>[audit] analyzing modules... <span className="text-emerald-400">OK</span></div>
            <div>[audit] threat mapping... <span className="text-emerald-400">OK</span></div>
          </div>
        </div>
      );
    case 1: // Strategy & Architecture
      return (
        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-[#1E1C18] dark:bg-bg-secondary/40 rounded-[16px] dark:rounded border border-[#2A2722] dark:border-border-light p-4 min-h-[180px]">
          {/* Node graph visual */}
          <svg className="w-full h-full min-h-[130px] max-h-[150px]" viewBox="0 0 200 100">
            {/* Node paths */}
            <path d="M 30,50 L 100,20 M 30,50 L 100,80 M 100,20 L 170,50 M 100,80 L 170,50" stroke="#C8A15A" strokeOpacity={0.3} strokeWidth="1" />
            {/* Active signal pulses */}
            <motion.circle 
              r="2.5" 
              fill="#C8A15A"
              animate={{
                cx: [30, 100, 170],
                cy: [50, 20, 50]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.circle 
              r="2.5" 
              fill="#8B857B"
              animate={{
                cx: [30, 100, 170],
                cy: [50, 80, 50]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            />
            {/* Nodes */}
            <circle cx="30" cy="50" r="6" fill="#1E1C18" stroke="#C8A15A" strokeWidth="1.5" />
            <circle cx="100" cy="20" r="6" fill="#1E1C18" stroke="#C8A15A" strokeWidth="1.5" />
            <circle cx="100" cy="80" r="6" fill="#1E1C18" stroke="#C8A15A" strokeWidth="1.5" />
            <circle cx="170" cy="50" r="6" fill="#1E1C18" stroke="#8B857B" strokeWidth="1.5" />
            
            {/* Node text labels */}
            <text x="22" y="38" fill="#E8E2D6" fontSize="7" fontFamily="monospace" opacity={0.7}>Client</text>
            <text x="88" y="10" fill="#E8E2D6" fontSize="7" fontFamily="monospace" opacity={0.7}>Server</text>
            <text x="94" y="94" fill="#E8E2D6" fontSize="7" fontFamily="monospace" opacity={0.7}>DB</text>
            <text x="160" y="38" fill="#E8E2D6" fontSize="7" fontFamily="monospace" opacity={0.7}>Cloud</text>
          </svg>
        </div>
      );
    case 2: // Build & Harden
      return (
        <div className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-[#1E1C18] dark:bg-bg-secondary/40 rounded-[16px] dark:rounded border border-[#2A2722] dark:border-border-light p-4 min-h-[180px] font-mono text-[9px] text-[#8B857B] dark:text-text-secondary/60 text-left">
          <div className="flex justify-between border-b border-[#2A2722] dark:border-border-light pb-1 mb-1 text-[#C8A15A]">
            <span>TERMINAL // BUILD_LOG</span>
            <span className="animate-pulse">● LIVE</span>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-1 select-none">
            <div className="text-[#E8E2D6] dark:text-text-secondary/60">$ npm run build:secure</div>
            <div className="text-[#B5AFA5] dark:text-text-primary/80">&gt; compiling source code...</div>
            <div className="text-emerald-400">&gt; ✓ static analysis complete (0 errors)</div>
            <div className="text-[#B5AFA5] dark:text-text-primary/80">&gt; hardening configurations...</div>
            <div className="text-[#C8A15A]">&gt; ✓ dependency audit complete</div>
            <div className="text-emerald-400">&gt; build compiled successfully!</div>
          </div>
        </div>
      );
    case 3: // Launch & Monitor
      return (
        <div className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-[#1E1C18] dark:bg-bg-secondary/40 rounded-[16px] dark:rounded border border-[#2A2722] dark:border-border-light p-4 min-h-[180px] text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[9px] text-[#C8A15A]">MONITOR // STATUS_OK</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          </div>
          {/* Uptime columns */}
          <div className="w-full h-16 flex items-end justify-between gap-[2px] relative z-10 pb-1">
            {[30, 45, 38, 55, 60, 48, 58, 65, 75, 68, 72, 85, 90, 82, 88, 92, 99, 95].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 0.5, delay: idx * 0.02 }}
                className="flex-1 bg-gradient-to-t from-[#C8A15A]/50 to-[#C8A15A] rounded-t-[1px]"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5 border-t border-[#2A2722] dark:border-border-light pt-2 font-mono text-[8px] text-[#8B857B] dark:text-text-secondary/50">
            <div>UPTIME: <span className="text-emerald-400 font-bold">99.99%</span></div>
            <div>LATENCY: <span className="text-[#E8E2D6] dark:text-text-primary/80">14ms</span></div>
            <div>LOAD: <span className="text-[#E8E2D6] dark:text-text-primary/80">0.08 / 1.0</span></div>
            <div>STATUS: <span className="text-emerald-400">HEALTHY</span></div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function Process() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Increment progress continuously on an interval
  useEffect(() => {
    const interval = 60; // ms per tick
    const totalDuration = 4000; // 4 seconds
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => prev + increment);
    }, interval);

    return () => clearInterval(timer);
  }, [activeStep]);

  // Handle active step transition when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setActiveStep((current) => (current + 1) % processSteps.length);
    }
  }, [progress]);

  if (isMobile) {
    return (
      <section id="process-section" className="relative py-[80px] bg-bg-primary z-10 px-6 border-b border-border-main select-none">
        {/* Visual background decoration */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[480px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-sans-heading font-semibold text-[0.68rem] tracking-[0.3em] text-accent uppercase mb-4">
              HOW WE WORK
            </span>
            <h2 className="font-sans-heading text-3xl font-black text-text-primary leading-tight uppercase">
              The Snortweb Method.
            </h2>
          </div>

          {/* Accordion container */}
          <div className="flex flex-col gap-4">
            {processSteps.map((step, idx) => {
              const isOpen = idx === activeStep;
              return (
                <div 
                  key={step.id} 
                  className={`rounded-[8px] border overflow-hidden transition-colors duration-300 ${
                    isOpen ? "bg-accent/8 border-accent/40" : "bg-bg-secondary border-border-subtle"
                  }`}
                >
                  {/* Header bar */}
                  <div 
                    onClick={() => {
                      setActiveStep(idx);
                      setProgress(0);
                    }}
                    className="p-5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className={`font-sans-heading font-black text-lg ${isOpen ? "text-accent" : "text-text-primary/20"}`}>
                        {step.number}
                      </span>
                      <span className={`font-sans-heading font-bold text-sm tracking-wide uppercase ${isOpen ? "text-text-primary" : "text-text-secondary"}`}>
                        {step.title}
                      </span>
                    </div>
                    {/* Expand indicator icon */}
                    <span className="text-text-tertiary text-xs transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      ▼
                    </span>
                  </div>

                  {/* Accordion details expanded */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-border-subtle text-left flex flex-col gap-5">
                          <p className="font-sans-body text-xs text-text-secondary leading-relaxed">
                            {step.desc}
                          </p>

                          {/* Mobile Checklist */}
                          <div className="space-y-2.5">
                            {stepChecklists[idx].map((item, key) => (
                              <div key={key} className="flex items-center gap-2.5 text-xs text-text-primary font-sans-body">
                                <svg className="text-accent flex-shrink-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* Visual element on mobile */}
                          <div className="w-full mt-2">
                            <ProcessVisual activeStep={idx} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      id="process-section"
      className="relative py-[140px] bg-bg-primary border-b border-border-main z-10 select-none overflow-hidden"
    >
      {/* Pattern Overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-diagonal absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-12 relative z-10">
        
        {/* Header centered */}
        <div className="flex flex-col items-start text-left mb-20">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.3em] text-text-primary uppercase mb-4">
            HOW WE WORK
          </span>
          <h2 className="font-sans-heading text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight uppercase">
            The Snortweb Method.
          </h2>
        </div>

        {/* Dashboard 2-Column Stepper Console */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
          
          {/* Left Column (60%): Visual Console Screen */}
          <div className="w-full lg:w-[60%] border border-border-main overflow-hidden flex flex-col justify-between select-none relative bg-bg-card dark:bg-bg-secondary min-h-[440px] rounded-[24px] dark:rounded-md shadow-card dark:shadow-none">
            
            {/* macOS Style Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-[#24211C] dark:bg-bg-elevated relative z-20 rounded-t-[24px] dark:rounded-t-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="font-mono-code text-[9px] tracking-wider text-[#8B857B] dark:text-text-quaternary select-none">
                snortweb_process_v1.0.sh
              </span>
              <div className="w-10" />
            </div>

            {/* Console Content Panel */}
            <div className="p-8 flex-1 flex flex-col md:flex-row gap-8 items-stretch justify-between relative overflow-hidden min-h-[350px]">
              
              {/* Number Watermark */}
              <div className="absolute -bottom-6 right-2 font-mono-code font-black text-[12rem] text-text-primary/[0.06] dark:text-brand-indigo/[0.04] leading-none pointer-events-none select-none z-0">
                {processSteps[activeStep].number}
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col justify-between text-left relative z-10">
                <div>
                  {/* Phase Info */}
                  <span className="font-mono-code text-[0.62rem] tracking-[0.25em] text-text-tertiary block mb-3">
                    {stepPhases[activeStep]}
                  </span>
                  {/* Title */}
                  <h3 className="font-sans-heading font-black text-xl sm:text-2xl text-text-primary">
                    {processSteps[activeStep].title}
                  </h3>
                  {/* Desc */}
                  <p className="font-sans-body text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 mt-4">
                    {processSteps[activeStep].desc}
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-3 border-t border-border-subtle pt-4 mt-auto">
                  <span className="font-mono-code text-[9px] tracking-wider text-text-quaternary uppercase block mb-1">
                    EXECUTION_CHECKLIST
                  </span>
                  {stepChecklists[activeStep].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-text-primary font-sans-body">
                      <svg className="text-text-primary flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Simulation Column */}
              <div className="w-full md:w-[220px] flex items-center justify-center relative z-10 min-h-[180px]">
                <ProcessVisual activeStep={activeStep} />
              </div>

            </div>

          </div>

          {/* Right Column (40%): Step Controls */}
          <div className="w-full lg:w-[40%] flex flex-col justify-between gap-4">
            {processSteps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <motion.div
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setProgress(0);
                  }}
                  whileHover={{ x: 4 }}
                  className={`relative p-5 rounded-[16px] dark:rounded-none border cursor-pointer select-none overflow-hidden flex-1 flex flex-col justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#24211C] dark:bg-accent border-[#24211C] dark:border-accent text-bg-base"
                      : "bg-bg-card dark:bg-bg-primary border-border-subtle text-text-secondary hover:border-border-main hover:bg-bg-secondary dark:hover:bg-bg-elevated shadow-card dark:shadow-none"
                  }`}
                >
                  {/* Content row */}
                  <div className="flex items-center gap-5 text-left relative z-10">
                    {/* Step index */}
                    <div 
                      className={`font-sans-heading font-black text-xl leading-none transition-colors duration-300 ${
                        isActive ? "text-bg-base" : "text-text-primary/20"
                      }`}
                    >
                      {step.number}
                    </div>
                    {/* Title */}
                    <div 
                      className={`font-sans-heading font-bold text-sm tracking-wide uppercase transition-colors duration-300 ${
                        isActive ? "text-bg-base" : "text-text-secondary"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>

                  {/* Progress Line Loader at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border-subtle">
                    {isActive && (
                      <motion.div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-current"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
export { Process };
