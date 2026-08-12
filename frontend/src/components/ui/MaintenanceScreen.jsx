import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Mail, Phone, Cpu, Server } from "lucide-react";

export default function MaintenanceScreen({ settings }) {
  const companyName = settings?.websiteName || "SNORTWEB TECHNOLOGY";
  const contactEmail = settings?.contact?.email || "snortwebtechnology@gmail.com";
  const contactPhone = settings?.contact?.phone || "9860596829";

  const [isRefreshing, setIsRefreshing] = useState(false);



  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-[#050608] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans select-none overflow-y-auto min-h-screen">
      
      {/* Luxury Ambient Glow Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A15A]/15 rounded-full blur-[160px] pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(#C8A15A_0.6px,transparent_0.6px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Top Header: Snortweb Brand Badge */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex justify-between items-center border-b border-[#C8A15A]/30 pb-4">
        <div className="flex items-center">
          <img
            src="/logo.webp"
            alt={companyName}
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(200,161,90,0.5)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/logo-icon.webp";
            }}
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#C8A15A]/10 border border-[#C8A15A]/30 rounded-full text-[9px] font-mono text-[#C8A15A] uppercase tracking-wider font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A15A] animate-pulse" />
          <span>SCHEDULED UPGRADE</span>
        </div>
      </div>

      {/* Center Hero: Minimal Luxury Content */}
      <div className="relative z-10 max-w-xl w-full mx-auto text-center space-y-4 my-auto py-4">
        
        {/* Main Title & Subtitle */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#C8A15A] uppercase">
            CRAFTING DIGITAL EXCELLENCE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight uppercase leading-tight font-sans">
            SOMETHING EXTRAORDINARY <br />
            <span className="text-[#C8A15A] italic font-normal">IS IN THE WORKS.</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-sans">
            Our platform is undergoing scheduled enhancements to deliver unmatched speed, security, and aesthetics.
          </p>
        </div>

        {/* High-Tech Futuristic Cyber Server Rack Engine Animation */}
        <div className="bg-[#0B0D12] border border-[#C8A15A]/30 rounded-2xl p-4 shadow-[0_0_35px_rgba(200,161,90,0.2)] flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
          
          {/* Cyber Hardware Server Chassis Module */}
          <div className="w-full max-w-xs sm:max-w-sm bg-[#06070A] border border-slate-800 rounded-xl p-3 space-y-2 relative">
            
            {/* Top Server Blade Slot */}
            <div className="flex items-center justify-between bg-[#0E1017] border border-[#C8A15A]/40 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#C8A15A] animate-pulse" />
                <span className="font-mono text-[9px] font-bold text-slate-200 uppercase tracking-wider">CORE HARDWARE RACK 01</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[8px] text-emerald-400 font-bold">ONLINE</span>
              </div>
            </div>

            {/* Middle Laser Data Stream Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#C8A15A] to-transparent shadow-[0_0_10px_#C8A15A]"
              />
            </div>

            {/* Bottom Server Blade Slot */}
            <div className="flex items-center justify-between bg-[#0E1017] border border-slate-800 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-[#FFD98A]" />
                <span className="font-mono text-[9px] font-bold text-slate-300 uppercase tracking-wider">SECURITY ENCRYPTION NODE</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[8px] text-[#C8A15A] font-bold">OPTIMIZING 98%</span>
              </div>
            </div>

          </div>

          <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#C8A15A] uppercase">
            SYSTEM UNDER MAINTENANCE
          </span>
        </div>

        {/* Action Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-6 py-3 bg-gradient-to-r from-[#C8A15A] via-[#FFD98A] to-[#C8A15A] hover:from-[#FFD98A] hover:to-[#C8A15A] text-slate-950 font-mono font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(200,161,90,0.3)] inline-flex items-center gap-2 cursor-pointer border border-[#FFD98A]/50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "CHECKING SYSTEM ACCESSIBILITY..." : "RE-CHECK SYSTEM ACCESS"}</span>
          </motion.button>
        </div>

      </div>

      {/* Bottom Footer: Direct Contact Row */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#C8A15A]/20 pt-3 text-[11px] font-mono">
        <span className="text-slate-500">
          &copy; {new Date().getFullYear()} {companyName}. ALL RIGHTS RESERVED.
        </span>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent("Inquiry regarding Snortweb Technology Maintenance")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#C8A15A]" />
            <span>{contactEmail}</span>
          </a>
          <a href={`tel:${contactPhone}`} className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C8A15A]" />
            <span>+91 {contactPhone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
