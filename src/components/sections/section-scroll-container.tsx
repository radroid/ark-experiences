'use client'

import { useEffect, useRef, useCallback } from 'react'

interface SectionScrollContainerProps {
  children: React.ReactNode[]
}

export default function SectionScrollContainer({ children }: SectionScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef<boolean>(false)
  const sectionsRef = useRef<NodeListOf<Element> | null>(null)

  // Memoize mobile detection to avoid repeated calculations
  const isMobile = useCallback(() => {
    return window.innerWidth <= 1023
  }, [])

  // Memoize current section detection
  const getCurrentSection = useCallback(() => {
    const container = containerRef.current
    if (!container || !sectionsRef.current) return null

    const containerRect = container.getBoundingClientRect()
    
    for (const section of sectionsRef.current) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= containerRect.height / 2 && rect.bottom >= containerRect.height / 2) {
        return section as HTMLElement
      }
    }
    return null
  }, [])

  // Optimized keyboard navigation with debouncing
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip keyboard navigation on mobile devices
    if (isMobileRef.current) return

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault()
      const currentSection = getCurrentSection()
      if (currentSection && currentSection.nextElementSibling) {
        currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      const currentSection = getCurrentSection()
      if (currentSection && currentSection.previousElementSibling) {
        currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [getCurrentSection])

  // Optimized resize handler with throttling
  const handleResize = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const mobile = isMobile()
    isMobileRef.current = mobile

    if (mobile) {
      container.style.scrollBehavior = 'auto'
    } else {
      container.style.scrollBehavior = 'smooth'
    }
  }, [isMobile])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Cache sections reference for better performance
    sectionsRef.current = container.querySelectorAll('.fullscreen-section')

    // Initial setup
    handleResize()

    // Throttled resize handler
    let resizeTicking = false
    const throttledResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          handleResize()
          resizeTicking = false
        })
        resizeTicking = true
      }
    }

    document.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('resize', throttledResize, { passive: true })
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', throttledResize)
    }
  }, [handleKeyDown, handleResize])

  return (
    <div 
      ref={containerRef}
      className="fullscreen-scroll-container"
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="fullscreen-section"
        >
          {child}
        </div>
      ))}
    </div>
  )
} 