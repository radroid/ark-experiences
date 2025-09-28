'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface IntersectionObserverOptimizerProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export default function IntersectionObserverOptimizer({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = false
}: IntersectionObserverOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          if (!hasBeenVisible) {
            setHasBeenVisible(true);
          }
          
          // If freezeOnceVisible is true, stop observing once visible
          if (freezeOnceVisible && !hasBeenVisible) {
            observer.unobserve(entry.target);
          }
        } else {
          // Only set to false if we're not freezing once visible
          if (!freezeOnceVisible) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, freezeOnceVisible, hasBeenVisible]);

  return (
    <div 
      ref={ref}
      className={`intersection-optimized ${isVisible ? 'animation-active' : ''}`}
      data-visible={isVisible}
      data-has-been-visible={hasBeenVisible}
    >
      {children}
    </div>
  );
}
