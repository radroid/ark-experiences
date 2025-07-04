"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, Info, Image as ImageIcon, MessageCircle, Mail } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { href: '#how-it-works', label: 'How It Works', icon: Info },
    { href: '#gallery', label: 'Gallery', icon: ImageIcon },
    { href: '#testimonials', label: 'Testimonials', icon: MessageCircle },
    { href: '#contact', label: 'Contact', icon: Mail }
  ]

  // Custom hook to detect when navigation text wraps
  useEffect(() => {
    const checkNavLayout = () => {
      if (navRef.current) {
        const navElement = navRef.current
        const navItems = navElement.querySelectorAll('[data-nav-item]')
        let shouldUseMobileLayout = false

        // Check if the capsule is too narrow first
        if (navElement.offsetWidth < 600) {
          shouldUseMobileLayout = true
        } else {
          // Only check for text wrapping if the capsule is wide enough
          navItems.forEach((item) => {
            const rect = item.getBoundingClientRect()
            const parentRect = navElement.getBoundingClientRect()
            
            // Check if any nav item is wrapping or overflowing
            if (rect.height > 60 || rect.bottom > parentRect.bottom - 10) {
              shouldUseMobileLayout = true
            }
          })
        }

        setIsMobileLayout(shouldUseMobileLayout)
      }
    }

    // Check on mount and resize
    checkNavLayout()
    
    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkNavLayout, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Check after a short delay to ensure fonts are loaded
    const timer = setTimeout(checkNavLayout, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
      clearTimeout(resizeTimer)
    }
  }, [])

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
      
      {/* Desktop Navigation - always rendered but conditionally visible */}
      <div 
        ref={navRef}
        className={`${isMobileLayout ? 'invisible' : 'visible'} absolute left-1/2 transform -translate-x-1/2`}
        style={{ pointerEvents: isMobileLayout ? 'none' : 'auto' }}
      >
        <div className="w-[60vw] h-20 flex items-center justify-center rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 px-8" style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)'}}>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-12">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link 
                    href={item.href} 
                    data-nav-item
                    className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Mobile Navigation - shown when desktop nav wraps or is too narrow */}
      <div className={isMobileLayout ? 'block' : 'hidden'}>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-14 w-14 rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 hover:bg-white/60 transition-all duration-200"
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