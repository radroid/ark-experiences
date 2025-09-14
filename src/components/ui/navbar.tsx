"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button-2'
import { Menu, Home, Info, Image as ImageIcon, MessageCircle, Mail, BookOpen } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const navItems = [
    { href: '#how-it-works', label: 'How It Works', icon: Info },
    { href: '#gallery', label: 'Gallery', icon: ImageIcon },
    { href: '#testimonials', label: 'Testimonials', icon: MessageCircle },
    { href: '#contact', label: 'Contact', icon: Mail }
  ]


  // Simplified responsive logic using viewport width breakpoints
  useEffect(() => {
    const checkNavLayout = () => {
      // Simple breakpoint-based logic - much more performant
      const viewportWidth = window.innerWidth
      
      // Use hamburger menu below 768px or if viewport is very narrow
      const shouldUseMobileLayout = viewportWidth < 768
      
      setIsMobileLayout(shouldUseMobileLayout)
    }

    // Check on mount
    checkNavLayout()
    
    // Throttled resize handler for better performance
    let ticking = false
    const handleResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkNavLayout()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Hide navbar on blog pages (after all hooks)
  if (pathname?.startsWith('/blog')) {
    return null
  }

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8">
      {/* Logo - responsive sizing */}
      <Link href="#hero-section" className="flex-shrink-0">
        <Image 
          src="/ark-logo.png" 
          alt="ARK Experience Logo" 
          width={90} 
          height={90} 
          className="w-16 h-16 md:w-[90px] md:h-[90px] drop-shadow-xl hover:scale-105 transition-transform duration-200" 
        />
      </Link>
      
      {/* Desktop Navigation - hardware accelerated transitions */}
      <div 
        ref={navRef}
        className={`navbar-desktop ${isMobileLayout ? 'navbar-hidden' : 'navbar-visible'} absolute left-1/2 transform -translate-x-1/2`}
        style={{ pointerEvents: isMobileLayout ? 'none' : 'auto' }}
      >
        <div className="w-auto min-w-[350px] max-w-[65vw] h-20 flex items-center justify-center rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 px-4" style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)'}}>
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex items-center justify-center w-full gap-6 md:gap-8 lg:gap-12">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link 
                    href={item.href} 
                    data-nav-item
                    className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg whitespace-nowrap flex-shrink-0"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Mobile Navigation - shown when desktop nav is hidden */}
      <div className={isMobileLayout ? 'block' : 'hidden'}>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-14 w-14 rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 hover:bg-white/60 transition-colors duration-200"
              aria-label="Open navigation menu"
            >
              <Menu className="h-7 w-7 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-xl border-r border-white/30 p-0"
          >
            <div className="flex flex-col h-full">
              {/* Header with SheetTitle for accessibility */}
              <SheetHeader className="flex items-center justify-between p-6 border-b border-white/20">
                <SheetTitle asChild>
                  <Link href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3">
                    <Image 
                      src="/ark-logo.png" 
                      alt="ARK Experience Logo" 
                      width={50} 
                      height={50} 
                      className="drop-shadow-lg hover:scale-105 transition-transform duration-200" 
                    />
                    <span className="text-lg font-semibold text-black">ARK Experience</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col p-4 space-y-2">
                {/* Home link */}
                <Link
                  href="#hero-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-semibold text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 group"
                >
                  <Home className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Home</span>
                </Link>
                
                {/* Navigation items */}
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-semibold text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 group"
                    >
                      <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                
                {/* Blog Link for Mobile - Simple version */}
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group shadow-lg"
                >
                  <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>📝 Blog</span>
                </Link>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/20">
                <div className="text-center text-sm text-gray-600">
                  <p className="font-medium">Adventure Awaits</p>
                  <p className="text-xs mt-1">Explore • Discover • Experience</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Invisible spacer to maintain layout balance on desktop */}
      <div className={`${isMobileLayout ? 'hidden' : 'block'} w-[90px] h-[90px] flex-shrink-0`}></div>
    </nav>
  )
} 