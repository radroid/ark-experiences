"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button-2'
import { Menu, Home, Info, Image as ImageIcon, MessageCircle, Mail, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [activeTab, setActiveTab] = useState('')
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const navItems = [
    { href: '#how-it-works', label: 'How It Works', icon: 'Info' },
    { href: '#gallery', label: 'Gallery', icon: 'ImageIcon' },
    { href: '#testimonials', label: 'Testimonials', icon: 'MessageCircle' },
    { href: '#coming-soon', label: 'Coming Soon', icon: 'BookOpen' },
    { href: '#contact', label: 'Contact', icon: 'Mail' }
  ]

  // Icon mapping function to avoid passing components as props
  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'Info': Info,
      'ImageIcon': ImageIcon,
      'MessageCircle': MessageCircle,
      'Mail': Mail,
      'Home': Home,
      'BookOpen': BookOpen
    }
    return iconMap[iconName as keyof typeof iconMap] || Info
  }


  // Enhanced responsive logic with scroll detection and section tracking
  useEffect(() => {
    const checkNavLayout = () => {
      const viewportWidth = window.innerWidth
      const shouldUseMobileLayout = viewportWidth < 768
      setIsMobileLayout(shouldUseMobileLayout)
    }

    // Scroll detection removed (unused state)

    // Section detection using Intersection Observer for better performance
    const setupSectionObserver = () => {
      const sections = document.querySelectorAll('.fullscreen-section')
      if (sections.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target as HTMLElement
              // Look for section ID in the container itself or nested sections
              let sectionId = section.id
              if (!sectionId) {
                const nestedSection = section.querySelector('section[id]') as HTMLElement
                sectionId = nestedSection?.id
              }
              if (sectionId) {
                setActiveTab(`#${sectionId}`)
              }
            }
          })
        },
        {
          root: null,
          rootMargin: '-20% 0px -20% 0px', // Trigger when section is 20% visible
          threshold: 0.1
        }
      )

      sections.forEach((section) => {
        observer.observe(section)
      })

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section)
        })
      }
    }

    // Check on mount
    checkNavLayout()
    // initial scroll check removed
    
    // Setup section observer with a small delay to ensure DOM is ready
    const observerCleanup = setTimeout(() => {
      setupSectionObserver()
    }, 100)
    
    // Throttled handlers for better performance
    let resizeTicking = false
    
    const throttledResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          checkNavLayout()
          resizeTicking = false
        })
        resizeTicking = true
      }
    }
    
    // Scroll listener removed (no dependent state)
    
    window.addEventListener('resize', throttledResize, { passive: true })
    // window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      clearTimeout(observerCleanup)
      window.removeEventListener('resize', throttledResize)
      // window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  // Hide navbar on blog pages (after all hooks)
  if (pathname?.startsWith('/blog')) {
    return null
  }

  return (
    <>
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
      
      {/* Desktop Navigation - Tubelight styling */}
      <div 
        ref={navRef}
        className={`navbar-desktop ${isMobileLayout ? 'navbar-hidden' : 'navbar-visible'} absolute left-1/2 transform -translate-x-1/2`}
        style={{ pointerEvents: isMobileLayout ? 'none' : 'auto' }}
      >
        <div className="relative flex items-center gap-1 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg safari-backdrop-fix">
          {/* Tubelight glow effect */}
          <div className="absolute inset-0 rounded-full" style={{ 
            background: 'linear-gradient(180deg, var(--pure-white) 0%, transparent 100%)',
            opacity: 0.3,
            filter: 'blur(16px)',
            zIndex: -1
          }} />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full" style={{ 
            background: 'radial-gradient(circle at center, var(--pure-white) 0%, transparent 70%)',
            opacity: 0.2,
            filter: 'blur(4px)',
            zIndex: -1
          }} />
          
          {navItems.map((item) => {
            const isActive = activeTab === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveTab(item.href)}
                className={cn(
                  "relative cursor-pointer text-lg font-semibold lg:px-6 lg:py-3 md:px-4 md:py-2 px-2 py-1 rounded-full transition-colors whitespace-nowrap",
                  "text-foreground/80",
                  "hover:text-[var(--primary-blue)]",
                  "dark-bg:text-[var(--soft-gray)] dark-bg:hover:text-[var(--primary-blue)]",
                  isActive && "bg-muted text-[var(--primary-blue)]"
                )}
              >
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">
                  {(() => {
                    const IconComponent = getIconComponent(item.icon)
                    return <IconComponent size={18} strokeWidth={2.5} />
                  })()}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tubelight-lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-t-full" style={{ backgroundColor: 'var(--highlight-gold)' }}>
                      <div className="absolute w-24 h-6 rounded-full blur-md -top-2 -left-2" style={{ backgroundColor: 'var(--highlight-gold)', opacity: 0.2 }} />
                      <div className="absolute w-10 h-6 rounded-full blur-md -top-1" style={{ backgroundColor: 'var(--highlight-gold)', opacity: 0.2 }} />
                      <div className="absolute w-6 h-4 rounded-full blur-sm top-0 left-2" style={{ backgroundColor: 'var(--highlight-gold)', opacity: 0.2 }} />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Mobile Navigation - shown when desktop nav is hidden */}
      <div className={isMobileLayout ? 'block' : 'hidden'}>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-14 w-14 liquid-glass-mobile-trigger"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] sm:w-[320px] liquid-glass-mobile-menu p-0"
          >
            <div className="flex flex-col h-full">
              {/* Header with SheetTitle for accessibility */}
              <SheetHeader className="flex items-center justify-between p-6" style={{borderBottom: '1px solid var(--soft-gray-200)'}}>
                <SheetTitle asChild>
                  <Link href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3">
                    <Image 
                      src="/ark-logo.png" 
                      alt="ARK Experience Logo" 
                      width={50} 
                      height={50} 
                      className="drop-shadow-lg hover:scale-105 transition-transform duration-200" 
                    />
                    <span className="text-lg font-semibold" style={{color: 'var(--safe-black)'}}>ARK Experience</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col p-4 space-y-2">
                {/* Home link */}
                <Link
                  href="#hero-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="liquid-glass-mobile-link flex items-center space-x-4 px-4 py-4 text-lg font-semibold group"
                >
                  <Home className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Home</span>
                </Link>
                
                {/* Navigation items */}
                {navItems.map((item) => {
                  const IconComponent = getIconComponent(item.icon)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="liquid-glass-mobile-link flex items-center space-x-4 px-4 py-4 text-lg font-semibold group"
                    >
                      <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                
                {/* Blog Link for Mobile - Liquid Glass version */}
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="liquid-glass-blog-button flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-bold group"
                >
                  <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>📝 Blog</span>
                </Link>
              </div>
              
              {/* Footer */}
              <div className="p-6" style={{borderTop: '1px solid var(--soft-gray-200)'}}>
                <div className="text-center text-sm" style={{color: 'var(--text-muted)'}}>
                  <p className="font-medium">Adventure Awaits</p>
                  <p className="text-xs mt-1">Explore • Discover • Experience</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Invisible spacer to maintain layout balance on desktop */}
      <div className={`${isMobileLayout ? 'hidden' : 'block'} w-[90px] h-[90px] flex-shrink-0`}>      </div>
      </nav>
    </>
  )
} 