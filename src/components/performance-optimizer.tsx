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
    
    return {
      connectionSpeed,
      devicePerformance,
      deviceMemory,
      hardwareConcurrency,
      saveData: connection?.saveData || false
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
    
    // Set CSS custom properties for responsive optimizations
    root.style.setProperty('--device-performance', capabilities.devicePerformance);
    root.style.setProperty('--connection-speed', capabilities.connectionSpeed);
    root.style.setProperty('--device-memory', capabilities.deviceMemory.toString());
    root.style.setProperty('--hardware-concurrency', capabilities.hardwareConcurrency.toString());
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
