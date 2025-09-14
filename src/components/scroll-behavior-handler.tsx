'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollBehaviorHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle scroll restoration and behavior based on route
    if (pathname.startsWith('/blog')) {
      // Enable natural scrolling for blog pages
      if (typeof window !== 'undefined' && history.scrollRestoration) {
        history.scrollRestoration = 'auto';
      }
      // Remove any scroll-smooth behavior from blog pages
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      // Enable smooth scrolling for main site
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
