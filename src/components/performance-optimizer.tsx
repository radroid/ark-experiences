'use client';

import { useEffect, useCallback, useRef } from 'react';

interface NavigatorConnection extends EventTarget {
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
  deviceMemory?: number;
}

interface DeviceCapabilities {
  connectionSpeed: 'slow' | 'medium' | 'fast';
  devicePerformance: 'low' | 'medium' | 'high';
  deviceMemory: number;
  hardwareConcurrency: number;
  saveData: boolean;
  webglSupport: boolean;
  backdropFilterSupport: boolean;
  cssCustomPropertiesSupport: boolean;
  intersectionObserverSupport: boolean;
}

export default function PerformanceOptimizer() {
  const capabilitiesRef = useRef<DeviceCapabilities | null>(null);

  // Memoized device capability detection
  const detectDeviceCapabilities = useCallback((): DeviceCapabilities => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    // Get device performance hints with better defaults
    const deviceMemory = nav.deviceMemory || 4; // Default to 4GB
    const hardwareConcurrency = nav.hardwareConcurrency || 4; // Default to 4 cores
    
    // Enhanced connection speed detection
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast';
    if (connection) {
      const effectiveType = connection.effectiveType;
      const saveData = connection.saveData;
      const downlink = connection.downlink || 10; // Default to 10 Mbps
      
      if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
        connectionSpeed = 'slow';
      } else if (effectiveType === '3g' || downlink < 5) {
        connectionSpeed = 'medium';
      }
    }
    
    // Enhanced device performance classification
    let devicePerformance: 'low' | 'medium' | 'high' = 'high';
    if (deviceMemory < 4 || hardwareConcurrency < 4) {
      devicePerformance = 'low';
    } else if (deviceMemory < 8 || hardwareConcurrency < 8) {
      devicePerformance = 'medium';
    }
    
    // Feature detection
    const webglSupport = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    })();

    const backdropFilterSupport = CSS.supports('backdrop-filter', 'blur(10px)') || 
                                 CSS.supports('-webkit-backdrop-filter', 'blur(10px)');

    const cssCustomPropertiesSupport = CSS.supports('color', 'var(--test)');

    const intersectionObserverSupport = 'IntersectionObserver' in window;

    return {
      connectionSpeed,
      devicePerformance,
      deviceMemory,
      hardwareConcurrency,
      saveData: connection?.saveData || false,
      webglSupport,
      backdropFilterSupport,
      cssCustomPropertiesSupport,
      intersectionObserverSupport
    };
  }, []);

  // Memoized optimization application
  const applyOptimizations = useCallback((capabilities: DeviceCapabilities) => {
    const root = document.documentElement;
    
    // Enhanced animation optimization based on device capabilities
    if (capabilities.devicePerformance === 'low' || capabilities.connectionSpeed === 'slow') {
      root.style.setProperty('--animation-duration', '0ms');
      root.style.setProperty('--transition-duration', '0ms');
      root.classList.add('reduce-motion');
    } else if (capabilities.devicePerformance === 'medium' || capabilities.connectionSpeed === 'medium') {
      root.style.setProperty('--animation-duration', '150ms');
      root.style.setProperty('--transition-duration', '150ms');
      root.classList.add('reduce-motion-partial');
    } else {
      root.style.setProperty('--animation-duration', '300ms');
      root.style.setProperty('--transition-duration', '300ms');
    }
    
    // Enhanced blur and effect optimization
    if (capabilities.devicePerformance === 'low') {
      root.classList.add('reduce-blur', 'reduce-shadows', 'reduce-gradients');
    } else if (capabilities.devicePerformance === 'medium') {
      root.classList.add('reduce-blur-partial');
    }
    
    // Data saving optimizations
    if (capabilities.saveData) {
      root.classList.add('save-data');
    }
    
    // WebGL support optimizations
    if (!capabilities.webglSupport) {
      root.classList.add('no-webgl');
    }
    
    // Enhanced Safari detection and comprehensive fixes
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                     /Apple/.test(navigator.vendor) ||
                     CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Backdrop filter support with enhanced fallbacks
    if (!capabilities.backdropFilterSupport || isSafari || isIOS) {
      root.classList.add('no-backdrop-filter');
      root.classList.add('use-solid-backgrounds');
    }
    
    if (isSafari || isIOS) {
      root.classList.add('safari-no-backdrop-filter');
      root.classList.add('safari-no-custom-cursors');
      root.classList.add('safari-simplified-mode');
      root.classList.add('browser-safari');
      
      // Force disable all problematic effects
      document.body.style.setProperty('--safari-mode', '1');
      document.body.style.setProperty('--browser-safari', '1');
      
      // Enhanced overlay element cleanup
      const overlays = document.querySelectorAll('[class*="overlay"], [class*="blur"], [class*="glass"], [class*="backdrop"]');
      overlays.forEach(el => {
        const element = el as HTMLElement;
        element.style.setProperty('backdrop-filter', 'none', 'important');
        element.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        element.style.setProperty('filter', 'none', 'important');
        element.style.setProperty('background', 'rgba(255, 255, 255, 0.9)', 'important');
      });
      
      // Fix specific navbar issues
      const navbarElements = document.querySelectorAll('.safari-backdrop-fix');
      navbarElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.setProperty('backdrop-filter', 'none', 'important');
        element.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        element.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
        element.style.setProperty('border', '1px solid rgba(0, 0, 0, 0.1)', 'important');
      });
    }
    
    // Performance-based animation complexity
    if (capabilities.devicePerformance === 'low' || capabilities.connectionSpeed === 'slow') {
      root.classList.add('simplified-animations', 'performance-mode-low');
    } else if (capabilities.devicePerformance === 'medium' || capabilities.connectionSpeed === 'medium') {
      root.classList.add('performance-mode-medium');
    }
    
    // Set CSS custom properties for responsive optimizations
    root.style.setProperty('--device-performance', capabilities.devicePerformance);
    root.style.setProperty('--connection-speed', capabilities.connectionSpeed);
    root.style.setProperty('--device-memory', capabilities.deviceMemory.toString());
    root.style.setProperty('--hardware-concurrency', capabilities.hardwareConcurrency.toString());
    root.style.setProperty('--webgl-support', capabilities.webglSupport ? '1' : '0');
    root.style.setProperty('--backdrop-filter-support', capabilities.backdropFilterSupport ? '1' : '0');
  }, []);

  useEffect(() => {
    // Initial capability detection and optimization
    const capabilities = detectDeviceCapabilities();
    capabilitiesRef.current = capabilities;
    applyOptimizations(capabilities);
    
    // Performance monitoring
    if ('performance' in window && 'measure' in performance) {
      performance.mark('performance-optimizer-start');
    }
    
    // Listen for connection changes with throttling
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (connection) {
      let changeTicking = false;
      
      const handleConnectionChange = () => {
        if (!changeTicking) {
          requestAnimationFrame(() => {
            const newCapabilities = detectDeviceCapabilities();
            if (capabilitiesRef.current && 
                (newCapabilities.connectionSpeed !== capabilitiesRef.current.connectionSpeed ||
                 newCapabilities.saveData !== capabilitiesRef.current.saveData)) {
              capabilitiesRef.current = newCapabilities;
              applyOptimizations(newCapabilities);
            }
            changeTicking = false;
          });
          changeTicking = true;
        }
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
        if ('performance' in window && 'measure' in performance) {
          performance.mark('performance-optimizer-end');
          performance.measure('performance-optimizer', 'performance-optimizer-start', 'performance-optimizer-end');
        }
      };
    }
  }, [detectDeviceCapabilities, applyOptimizations]);

  return null; // This component doesn't render anything
}
