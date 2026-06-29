import { useState, useEffect, useRef, useCallback } from "react";

export const useCounter = (target, duration = 2000) => {
  const hasDecimal = target % 1 !== 0;
  const [count, setCount] = useState(hasDecimal ? (0).toFixed(1) : 0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animateCounter = useCallback(() => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Ease out timing function (easeOutQuad)
      const easedProgress = percentage * (2 - percentage);
      const currentVal = hasDecimal
        ? (easedProgress * target).toFixed(1)
        : Math.floor(easedProgress * target);

      setCount(currentVal);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(hasDecimal ? target.toFixed(1) : target);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        animateCounter();
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      }
    }, { threshold: 0.1 });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [animateCounter]);

  return { ref, count };
};

export default useCounter;
