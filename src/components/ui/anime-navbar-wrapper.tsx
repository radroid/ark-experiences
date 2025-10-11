"use client"

import { AnimeNavBar } from './anime-navbar'
import { Home, Info, Star, Image as ImageIcon, MessageCircle, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function AnimeNavBarWrapper() {
  const fullNavItems = [
    { name: 'Home', url: '#hero-section', icon: Home },
    { name: 'What', url: '#what-section', icon: Star },
    { name: 'How It Works', url: '#how-it-works', icon: Info },
    { name: 'Gallery', url: '#gallery', icon: ImageIcon },
    { name: 'Testimonials', url: '#testimonials', icon: MessageCircle },
    { name: 'Contact', url: '#footer', icon: Mail }
  ]

  // Mobile-optimized navigation with fewer items
  const mobileNavItems = [
    { name: 'Home', url: '#hero-section', icon: Home },
    { name: 'What', url: '#what-section', icon: Star },
    { name: 'Gallery', url: '#gallery', icon: ImageIcon },
    { name: 'Contact', url: '#footer', icon: Mail }
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navItems = isMobile ? mobileNavItems : fullNavItems

  return (
    <div className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8">
      {/* ARK Logo - Left Corner */}
      <Link href="#hero-section" className="absolute left-4 md:left-8 top-0 flex-shrink-0">
        <Image 
          src="/ark-logo.png" 
          alt="ARK Experience Logo" 
          width={90} 
          height={90} 
          className="w-16 h-16 md:w-[90px] md:h-[90px] drop-shadow-xl hover:scale-105 transition-transform duration-200" 
        />
      </Link>
      
      {/* Centered Animated Navbar */}
      <AnimeNavBar items={navItems} defaultActive="Home" />
    </div>
  )
}

