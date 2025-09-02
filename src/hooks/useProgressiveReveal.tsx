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
      const progress = (scrollTop / docHeight) * 100;
      setRoadProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return roadProgress;
};