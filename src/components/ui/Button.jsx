import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";

export default function Button({ 
  children, 
  className = "", 
  onClick, 
  magnetic = false, 
  strength = 0.35, 
  ...props 
}) {
  const magneticHook = useMagnetic(magnetic ? strength : 0);
  
  // Custom press micro-interaction spring (lowered damping for quick monochrome snap)
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

  const style = magnetic 
    ? { ...magneticHook.style, scale: springScale } 
    : { scale: springScale };

  return (
    <motion.button
      ref={magnetic ? magneticHook.ref : null}
      onClick={onClick}
      onMouseMove={magnetic ? magneticHook.handlers.onMouseMove : null}
      onMouseLeave={(e) => {
        if (magnetic) magneticHook.handlers.onMouseLeave(e);
        scale.set(1);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={style}
      className={`magnetic relative overflow-hidden select-none outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-black dark:focus-visible:outline-brand-indigo focus-visible:outline-offset-3 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { Button };
