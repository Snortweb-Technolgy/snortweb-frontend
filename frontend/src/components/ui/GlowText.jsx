import React from "react";

export default function GlowText({ children, className = "", color = "violet", ...props }) {
  // We can customize the glow classes defined in our globals.css
  const glowClass = color === "violet" ? "text-glow-violet text-primary-bright" : "text-glow-gold text-gold-bright";
  
  return (
    <span className={`${glowClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
export { GlowText };
