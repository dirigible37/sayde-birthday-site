import { useEffect, useState, type RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = (
  ref: RefObject<Element | null>,
  options: UseScrollAnimationOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Mobile-optimized thresholds
    const isMobile = window.innerWidth < 768;
    const mobileThreshold = isMobile ? 0.2 : 0.1;
    const mobileRootMargin = isMobile ? '-5% 0px -5% 0px' : '0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      },
      {
        threshold: options.threshold ?? mobileThreshold,
        rootMargin: options.rootMargin ?? mobileRootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, hasTriggered, options.threshold, options.rootMargin]);

  return { isVisible, hasTriggered };
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    // Use passive listeners for better mobile performance
    const options = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, options);
    window.addEventListener('touchmove', handleScroll, options);
    handleScroll(); // Calculate initial progress

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return scrollProgress;
};