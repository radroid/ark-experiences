'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
}

/**
 * LazySection component that only renders children when they're about to enter the viewport
 * This significantly improves initial page load by deferring off-screen content
 */
export default function LazySection({
  children,
  threshold = 0.01,
  rootMargin = '200px',
  fallback = null,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    // Create an Intersection Observer to detect when section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin, // Load content slightly before it enters viewport
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return (
    <div ref={sectionRef} style={{ minHeight: isVisible ? undefined : '100vh' }}>
      {isVisible ? children : fallback}
    </div>
  )
}

