'use client'

import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // Check for mobile user agent
      const userAgent = navigator.userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      
      // Also check screen width
      const screenWidth = window.innerWidth
      const isMobileScreen = screenWidth <= 768
      
      // Check for touch capability
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      const isMobileDevice = mobileRegex.test(userAgent) || (isMobileScreen && hasTouchScreen)
      
      setIsMobile(isMobileDevice)
      setIsLoaded(true)
    }

    checkIsMobile()
    
    // Listen for window resize to handle orientation changes
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return { isMobile, isLoaded }
}

export function getMobileDetection(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return mobileRegex.test(userAgent)
}
