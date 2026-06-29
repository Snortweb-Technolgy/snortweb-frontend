import { useState, useEffect, useRef } from "react";

export const useScrollReveal = (options = { threshold: 0.12 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  const threshold = options.threshold;

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once visible, disable trigger observation to maintain reveal state
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      }
    }, { threshold });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

export default useScrollReveal;
