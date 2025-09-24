'use client'

import { useEffect, useRef } from 'react'

interface SectionScrollContainerProps {
  children: React.ReactNode[]
}

export default function SectionScrollContainer({ children }: SectionScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 1023

    // Set appropriate scroll behavior based on device
    if (isMobile()) {
      // Mobile: Natural scrolling without forced smooth behavior
      container.style.scrollBehavior = 'auto'
    } else {
      // Desktop: Smooth scrolling behavior
      container.style.scrollBehavior = 'smooth'
    }

    // Keyboard navigation only for desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip keyboard navigation on mobile devices
      if (isMobile()) return

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
    }

    const getCurrentSection = () => {
      const sections = container.querySelectorAll('.fullscreen-section')
      const containerRect = container.getBoundingClientRect()
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= containerRect.height / 2 && rect.bottom >= containerRect.height / 2) {
          return section as HTMLElement
        }
      }
      return null
    }

    // Handle resize to update scroll behavior
    const handleResize = () => {
      if (isMobile()) {
        container.style.scrollBehavior = 'auto'
      } else {
        container.style.scrollBehavior = 'smooth'
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fullscreen-scroll-container"
    >
              {/* Light Lava Lamp Background */}
              <div className="absolute inset-0 lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay for better text readability - No stacking context */}
        <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.05}} />
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