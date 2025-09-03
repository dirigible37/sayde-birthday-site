import { useState, useEffect, type RefObject } from 'react';

interface ProgressiveRevealItem {
  id: string;
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
  threshold?: number;
}

export const useProgressiveReveal = (items: ProgressiveRevealItem[]) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observers = items.map((item, index) => {
      if (!item.ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, item.id]));
            setCurrentIndex(index);
          }
        },
        {
          threshold: item.threshold ?? 0.3,
          rootMargin: '0px 0px -20% 0px',
        }
      );

      observer.observe(item.ref.current);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [items]);

  const getRoadProgress = () => {
    const totalItems = items.length;
    const visibleCount = visibleItems.size;
    return Math.min((visibleCount / totalItems) * 100, 100);
  };

  const isItemVisible = (id: string) => visibleItems.has(id);

  return {
    visibleItems,
    currentIndex,
    roadProgress: getRoadProgress(),
    isItemVisible,
  };
};

export const useRoadAnimation = () => {
  const [roadProgress, setRoadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Adjust to complete road at ~90% of total scroll (before final section)
      const adjustedProgress = (scrollTop / (docHeight * 0.9)) * 100;
      setRoadProgress(Math.min(Math.max(adjustedProgress, 0), 100));
    };

    // Use passive listeners for better mobile performance
    const options = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, options);
    window.addEventListener('touchmove', handleScroll, options);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return roadProgress;
};