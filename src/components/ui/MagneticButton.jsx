import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";

export default function MagneticButton({ children, className = "", onClick, ...props }) {
  const { ref, style, handlers } = useMagnetic(0.35);
  
  // Custom click micro-interaction spring (refined for monochrome snap)
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 600, damping: 20 });

  const handleMouseDown = () => {
    scale.set(0.98);
  };

  const handleMouseUp = () => {
    scale.set(1.02);
    setTimeout(() => {
      scale.set(1);
    }, 60);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={() => {
        handlers.onMouseLeave();
        scale.set(1);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        ...style,
        scale: springScale
      }}
      className={`magnetic relative overflow-hidden select-none outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-black dark:focus-visible:outline-brand-indigo focus-visible:outline-offset-3 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { MagneticButton };
