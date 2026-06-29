import { useState, useEffect } from "react";

export const useMouseParallax = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Normalize cursor coordinate position (-1 to 1)
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updatePosition = () => {
      // Apply linear interpolation (lerp) factor 0.05
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return position;
};
