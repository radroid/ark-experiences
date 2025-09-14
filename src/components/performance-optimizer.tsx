'use client';

import { useEffect } from 'react';

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
}

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Device capability detection
    const detectDeviceCapabilities = () => {
      const nav = navigator as NavigatorWithConnection;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
      
      // Get device performance hints
      const deviceMemory = (nav as any).deviceMemory || 4; // Default to 4GB
      const hardwareConcurrency = nav.hardwareConcurrency || 4; // Default to 4 cores
      
      // Connection speed detection
      let connectionSpeed = 'fast';
      if (connection) {
        const effectiveType = connection.effectiveType;
        const saveData = connection.saveData;
        
        if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
          connectionSpeed = 'slow';
        } else if (effectiveType === '3g') {
          connectionSpeed = 'medium';
        }
      }
      
      // Device performance classification
      let devicePerformance = 'high';
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
    };

    const capabilities = detectDeviceCapabilities();
    
    // Apply performance optimizations based on device capabilities
    const applyOptimizations = () => {
      const root = document.documentElement;
      
      // Disable animations for low-performance devices or slow connections
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
      
      // Reduce blur effects for low-performance devices
      if (capabilities.devicePerformance === 'low') {
        root.classList.add('reduce-blur');
      }
      
      // Optimize for data saving mode
      if (capabilities.saveData) {
        root.classList.add('save-data');
      }
      
      // Set CSS custom properties for responsive optimizations
      root.style.setProperty('--device-performance', capabilities.devicePerformance);
      root.style.setProperty('--connection-speed', capabilities.connectionSpeed);
    };

    // Apply optimizations
    applyOptimizations();
    
    // Listen for connection changes
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (connection) {
      const handleConnectionChange = () => {
        const newCapabilities = detectDeviceCapabilities();
        if (newCapabilities.connectionSpeed !== capabilities.connectionSpeed) {
          applyOptimizations();
        }
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
