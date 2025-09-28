'use client'
/* eslint-disable @next/next/no-img-element */

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button-2'
// Pin image will be referenced directly in the component
import { SplashCursor } from "@/components/ui/splash-cursor"
import { RetroGrid } from "@/components/ui/retro-grid"
import IntersectionObserverOptimizer from "@/components/intersection-observer-optimizer"
import { useRef, useMemo } from 'react'
 

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Detect Safari for optimized animations
  const isSafari = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
           /Apple/.test(navigator.vendor);
  }, []);
  
  // Safari-optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isSafari ? 1.5 : 0.8, // Slower for Safari
        staggerChildren: isSafari ? 0.4 : 0.2 // More stagger for Safari
      }
    }
  }), [isSafari]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: isSafari ? 15 : 30 }, // Less movement for Safari
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isSafari ? 1.0 : 0, // Slower for Safari
        ease: isSafari ? "easeInOut" : easeOut // Gentler easing for Safari
      }
    }
  }), [isSafari]);

  const PinIcon = () => (
    <img 
      src="/pin.gif" 
      alt="Location pin" 
      className="h-20 w-20" 
    />
  )

  const CooperationIcon = () => (
    <img 
      src="/cooperation.gif" 
      alt="Team cooperation" 
      className="h-20 w-20" 
    />
  )

  const HourglassIcon = () => (
    <img 
      src="/hourglass.gif" 
      alt="Time duration" 
      className="h-20 w-20" 
    />
  )

  const stats = [
    { icon: PinIcon, label: '5 Secret Locations', description: 'Across Downtown Toronto' },
    { icon: CooperationIcon, label: '2-4 Players', description: 'Per team' },
    { icon: HourglassIcon, label: '2 Hours', description: 'Duration' },
    // { icon: DollarSign, label: '$30 CAD', description: 'Cost per person' }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <IntersectionObserverOptimizer>
      <section ref={heroRef} id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-10 sm:px-6 md:px-10">
        {/* Retro Grid Background */}
        <RetroGrid className="absolute inset-0" />
        <SplashCursor containerRef={heroRef} />
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 text-center pt-16 sm:pt-18 md:pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-6"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{color: 'var(--text-primary)'}}
            variants={itemVariants}
          >
            Race Through{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Downtown
            </span>
            <br />
            Toronto&#39;s{' '}
            <span style={{color: 'var(--accent-orange)'}}>
              Amazing Race
            </span>
          </motion.h1>
{/* 
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{color: 'var(--text-body)'}}
            variants={itemVariants}
          >
            Ready for the ultimate adventure?
            <br />
            <br />
            Gather your team of 2-4 players and compete in our thrilling <u>Amazing Race-inspired scavenger hunt</u> through downtown Toronto. Complete tasks at 5 secret locations to unlock clues and race to victory!
            <br />
          </motion.p> */}

          <motion.div
            className="flex flex-col pt-6 sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="cta-button px-37 py-7 sm:px-8 sm:py-5 sm:text-lg font-semibold cursor-pointer"   
              onClick={scrollToContact}
            >
              Join the Race
            </Button>
{/*             
            <Button 
              variant="outline" 
              size="lg" 
              className="secondary-button px-37 py-7 text-lg cursor-help"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button> */}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-2"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl p-3 sm:p-4 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: isSafari ? 1.02 : 1.05, // Less scale for Safari
                transition: { duration: isSafari ? 0.4 : 0.2 } // Slower hover for Safari
              }}
            >
              <div className="flex justify-center mb-3">
                <stat.icon />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1" style={{color: 'var(--text-primary)'}}>{stat.label}</h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base" style={{color: 'var(--text-muted)'}}>{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
          className="absolute bottom-8 left-8"
          animate={{ y: [0, isSafari ? 5 : 10, 0] }} // Less movement for Safari
          transition={{ 
            duration: isSafari ? 3 : 2, // Slower for Safari
            repeat: Infinity,
            ease: isSafari ? "easeInOut" : "linear" // Gentler easing for Safari
          }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{borderColor: 'var(--safe-black-500)'}}>
            <div className="w-1 h-3 rounded-full mt-2" style={{backgroundColor: 'var(--safe-black-700)'}} />
          </div>
        </motion.div>
      </section>
    </IntersectionObserverOptimizer>
  )
} 