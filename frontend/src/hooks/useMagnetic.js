import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const onMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find target center point
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Vector distance offset multiplied by strength factor
    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;
    
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };
  
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return {
    ref,
    style: { x: springX, y: springY },
    handlers: {
      onMouseMove,
      onMouseLeave
    }
  };
};

export default useMagnetic;
