'use client';

import { useEffect } from 'react';

interface BrowserCapabilities {
  isSafari: boolean;
  isIOS: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  supportsBackdropFilter: boolean;
  supportsWebGL: boolean;
  supportsCSSGrid: boolean;
  supportsIntersectionObserver: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
}

export default function BrowserCompatibility() {
  useEffect(() => {
    const detectBrowserCapabilities = (): BrowserCapabilities => {
      const userAgent = navigator.userAgent.toLowerCase();
      const vendor = navigator.vendor?.toLowerCase() || '';
      
      // Enhanced browser detection
      const isSafari = /safari/.test(userAgent) && 
                      !/chrome/.test(userAgent) && 
                      !/android/.test(userAgent) ||
                      /apple/.test(vendor);
      
      const isIOS = /ipad|iphone|ipod/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);
      const isFirefox = /firefox/.test(userAgent);
      const isEdge = /edge/.test(userAgent);
      
      // Feature detection
      const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') ||
                                    CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
      
      const supportsWebGL = (() => {
        try {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          return !!context;
        } catch {
          return false;
        }
      })();
      
      const supportsCSSGrid = CSS.supports('display', 'grid');
      const supportsIntersectionObserver = 'IntersectionObserver' in window;
      
      // Device capabilities
      const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
      const deviceMemory = nav.deviceMemory || 4;
      const hardwareConcurrency = nav.hardwareConcurrency || 4;
      
      return {
        isSafari,
        isIOS,
        isChrome,
        isFirefox,
        isEdge,
        supportsBackdropFilter,
        supportsWebGL,
        supportsCSSGrid,
        supportsIntersectionObserver,
        deviceMemory,
        hardwareConcurrency,
      };
    };

    const applyBrowserSpecificFixes = (capabilities: BrowserCapabilities) => {
      const root = document.documentElement;
      const body = document.body;
      
      // Reset previous browser classes
      root.classList.remove(
        'browser-safari', 'browser-ios', 'browser-chrome', 
        'browser-firefox', 'browser-edge', 'no-backdrop-filter',
        'use-solid-backgrounds', 'safari-simplified-mode'
      );
      
      // Apply browser-specific classes
      if (capabilities.isSafari) {
        root.classList.add('browser-safari', 'safari-simplified-mode');
        body.style.setProperty('--browser-safari', '1');
      }
      
      if (capabilities.isIOS) {
        root.classList.add('browser-ios');
        body.style.setProperty('--browser-ios', '1');
      }
      
      if (capabilities.isChrome) {
        root.classList.add('browser-chrome');
        body.style.setProperty('--browser-chrome', '1');
      }
      
      if (capabilities.isFirefox) {
        root.classList.add('browser-firefox');
        body.style.setProperty('--browser-firefox', '1');
      }
      
      if (capabilities.isEdge) {
        root.classList.add('browser-edge');
        body.style.setProperty('--browser-edge', '1');
      }
      
      // Feature-based fixes
      if (!capabilities.supportsBackdropFilter || capabilities.isSafari || capabilities.isIOS) {
        root.classList.add('no-backdrop-filter', 'use-solid-backgrounds');
        body.style.setProperty('--supports-backdrop-filter', '0');
        
        // Enhanced Safari fixes - force disable problematic effects immediately
        if (capabilities.isSafari || capabilities.isIOS) {
          // Add meta tag to prevent viewport issues on iOS
          const existingViewportMeta = document.querySelector('meta[name="viewport"]');
          if (!existingViewportMeta) {
            const viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(viewportMeta);
          }
          
          // Apply immediate backdrop-filter disable
          const style = document.createElement('style');
          style.textContent = `
            *, *::before, *::after {
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
            }
            .safari-backdrop-fix {
              background-color: rgba(255, 255, 255, 0.95) !important;
              border: 1px solid rgba(0, 0, 0, 0.1) !important;
            }
          `;
          document.head.appendChild(style);
          
          // Remove any existing problematic elements and add Safari-friendly background
          setTimeout(() => {
            const problematicElements = document.querySelectorAll(
              '[class*="blur"], [class*="glass"], [class*="backdrop"], .lava-lamp-bg, .floating-circle'
            );
            problematicElements.forEach(el => {
              const element = el as HTMLElement;
              element.style.setProperty('backdrop-filter', 'none', 'important');
              element.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
              element.style.setProperty('filter', 'none', 'important');
              
              if (element.classList.contains('lava-lamp-bg') || 
                  element.classList.contains('floating-circle')) {
                element.style.display = 'none';
              }
            });
            
            // Add Safari-friendly background animations to hero section
            const heroSection = document.getElementById('hero-section');
            if (heroSection && !heroSection.querySelector('.safari-gentle-bg')) {
              // Add gentle gradient background
              const gentleBg = document.createElement('div');
              gentleBg.className = 'safari-gentle-bg';
              heroSection.appendChild(gentleBg);
              
              // Add gentle floating elements
              for (let i = 1; i <= 3; i++) {
                const floatElement = document.createElement('div');
                floatElement.className = 'safari-gentle-float';
                heroSection.appendChild(floatElement);
              }
            }
          }, 100);
        }
      } else {
        body.style.setProperty('--supports-backdrop-filter', '1');
      }
      
      if (!capabilities.supportsWebGL) {
        root.classList.add('no-webgl');
        body.style.setProperty('--supports-webgl', '0');
      } else {
        body.style.setProperty('--supports-webgl', '1');
      }
      
      if (!capabilities.supportsCSSGrid) {
        root.classList.add('no-css-grid');
        body.style.setProperty('--supports-css-grid', '0');
      } else {
        body.style.setProperty('--supports-css-grid', '1');
      }
      
      if (!capabilities.supportsIntersectionObserver) {
        root.classList.add('no-intersection-observer');
        body.style.setProperty('--supports-intersection-observer', '0');
      } else {
        body.style.setProperty('--supports-intersection-observer', '1');
      }
      
      // Set device capability variables
      body.style.setProperty('--device-memory', capabilities.deviceMemory.toString());
      body.style.setProperty('--hardware-concurrency', capabilities.hardwareConcurrency.toString());
      
      // Console log for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('Browser capabilities detected:', capabilities);
      }
    };

    // Apply fixes immediately
    const capabilities = detectBrowserCapabilities();
    applyBrowserSpecificFixes(capabilities);
    
    // Apply fixes again after a short delay to catch dynamically loaded content
    setTimeout(() => {
      applyBrowserSpecificFixes(capabilities);
    }, 500);
    
  }, []);

  return null; // This component doesn't render anything
}
