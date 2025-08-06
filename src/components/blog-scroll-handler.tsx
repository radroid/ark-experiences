"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function BlogScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Handle scroll behavior based on current route
    if (pathname?.startsWith('/blog')) {
      // Blog pages: Apply blog-specific classes and reset scroll behavior
      document.documentElement.classList.add('blog-page')
      document.documentElement.classList.remove('scroll-smooth')
      document.body.classList.add('blog-layout')
      
      // Reset any conflicting styles
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
      
      // Apply blog-page class to main elements
      const mainElements = document.querySelectorAll('main')
      mainElements.forEach(main => {
        if (main instanceof HTMLElement) {
          main.classList.add('blog-page')
          main.style.height = 'auto'
          main.style.overflow = 'visible'
        }
      })

      // Ensure scroll restoration works properly
      if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
      
      // Force scroll to top on new blog page visits (not browser back/forward)
      const isBackForward = (window.performance?.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'back_forward'
      if (!isBackForward) {
        setTimeout(() => window.scrollTo(0, 0), 0)
      }
      
    } else {
      // Main site: Remove blog classes and restore fullscreen scroll behavior
      document.documentElement.classList.remove('blog-page')
      document.documentElement.classList.add('scroll-smooth')
      document.body.classList.remove('blog-layout')
      
      // Restore main site scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth'
      
      // Remove blog-page class from main elements
      const mainElements = document.querySelectorAll('main')
      mainElements.forEach(main => {
        if (main instanceof HTMLElement) {
          main.classList.remove('blog-page')
        }
      })
    }

    // Cleanup on unmount
    return () => {
      // Reset on unmount if needed
    }
  }, [pathname])

  // Handle browser navigation events and scroll restoration
  useEffect(() => {
    const handlePopState = () => {
      // Allow natural scroll restoration on browser back/forward
      if (pathname?.startsWith('/blog')) {
        // Small delay to let the route change complete
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'auto'
          document.documentElement.classList.add('blog-page')
        }, 50)
      }
    }

    // Handle route changes that don't trigger popstate (Link navigation)
    const handleRouteChange = () => {
      if (pathname?.startsWith('/blog')) {
        // Prevent Next.js default scroll behavior on route changes
        const hash = window.location.hash
        if (hash.length > 0) {
          // If there's a hash, scroll to that element
          setTimeout(() => {
            const element = document.querySelector(hash)
            if (element) {
              element.scrollIntoView({ behavior: 'auto' })
            }
          }, 100)
        } else {
          // Regular page navigation - scroll to top unless coming from browser navigation
          const navigation = window.performance?.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          if (navigation?.type !== 'back_forward') {
            setTimeout(() => window.scrollTo(0, 0), 0)
          }
        }
      }
    }

    // Set up manual scroll restoration for blog pages
    if (typeof window !== 'undefined' && pathname?.startsWith('/blog')) {
      if ('scrollRestoration' in history) {
        const hash = window.location.hash
        if (hash.length > 0) {
          history.scrollRestoration = 'manual'
        } else {
          history.scrollRestoration = 'auto'
        }
      }
    }

    handleRouteChange()
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname])

  return null
}