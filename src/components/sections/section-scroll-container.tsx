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

    // Enable smooth scrolling behavior
    container.style.scrollBehavior = 'smooth'

    // Optional: Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
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

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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