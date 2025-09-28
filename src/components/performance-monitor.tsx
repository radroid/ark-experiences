'use client';

import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  const logPerformanceMetric = useCallback((metric: { name: string; value: number }) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metric - ${metric.name}:`, metric.value);
    }
    
    // In production, you could send to analytics service
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Example: Send to analytics
      // analytics.track('performance_metric', {
      //   metric: metric.name,
      //   value: metric.value,
      //   url: window.location.href,
      //   userAgent: navigator.userAgent
      // });
    }
  }, []);

  const observePerformance = useCallback(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Observe Web Vitals metrics
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                logPerformanceMetric({ name: 'FCP', value: entry.startTime });
              }
              break;
            case 'largest-contentful-paint':
              logPerformanceMetric({ name: 'LCP', value: entry.startTime });
              break;
            case 'first-input':
              logPerformanceMetric({ name: 'FID', value: (entry as any).processingStart - entry.startTime });
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                logPerformanceMetric({ name: 'CLS', value: (entry as any).value });
              }
              break;
            case 'navigation':
              const navEntry = entry as PerformanceNavigationTiming;
              logPerformanceMetric({ name: 'TTFB', value: navEntry.responseStart - navEntry.requestStart });
              break;
          }
        });
      });

      // Observe different types of performance entries
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Paint timing not supported
      }

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }

      try {
        observer.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // Navigation timing not supported
      }

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }, [logPerformanceMetric]);

  const monitorResourceLoading = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Monitor resource loading times
    const checkResources = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      resources.forEach((resource) => {
        const loadTime = resource.responseEnd - resource.startTime;
        
        // Log slow resources (> 1000ms)
        if (loadTime > 1000) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Slow resource detected: ${resource.name} - ${loadTime.toFixed(2)}ms`);
          }
        }
      });
    };

    // Check resources after page load
    if (document.readyState === 'complete') {
      setTimeout(checkResources, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(checkResources, 1000);
      });
    }
  }, []);

  const monitorMemoryUsage = useCallback(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      
      if (memory) {
        const usedMemory = memory.usedJSHeapSize / 1048576; // Convert to MB
        const totalMemory = memory.totalJSHeapSize / 1048576;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Memory usage: ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB`);
        }
        
        // Warn if memory usage is high (> 100MB)
        if (usedMemory > 100) {
          console.warn(`High memory usage detected: ${usedMemory.toFixed(2)}MB`);
        }
      }
    };

    // Check memory every 30 seconds
    const memoryInterval = setInterval(checkMemory, 30000);
    
    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  useEffect(() => {
    // Set up performance monitoring
    const cleanupObserver = observePerformance();
    const cleanupMemory = monitorMemoryUsage();
    
    // Monitor resources
    monitorResourceLoading();
    
    // Basic performance timing
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const pageLoad = navigation.loadEventEnd - navigation.loadEventStart;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance timing:', {
            'DOM Content Loaded': `${domContentLoaded.toFixed(2)}ms`,
            'Page Load': `${pageLoad.toFixed(2)}ms`,
            'DNS Lookup': `${navigation.domainLookupEnd - navigation.domainLookupStart}ms`,
            'TCP Connection': `${navigation.connectEnd - navigation.connectStart}ms`,
            'Request to Response': `${navigation.responseEnd - navigation.requestStart}ms`,
          });
        }
      }
    }

    // Cleanup function
    return () => {
      if (cleanupObserver) cleanupObserver();
      if (cleanupMemory) cleanupMemory();
    };
  }, [observePerformance, monitorResourceLoading, monitorMemoryUsage]);

  return null; // This component doesn't render anything
}
