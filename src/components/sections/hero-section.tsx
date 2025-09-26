'use client'

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button-2'
import { MapPin } from 'lucide-react'
// Pin image will be referenced directly in the component
import { SplashCursor } from "@/components/ui/splash-cursor"
import { RetroGrid } from "@/components/ui/retro-grid"
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  }

  const PinIcon = () => (
    <img 
      src="/pin.gif" 
      alt="Location pin" 
      className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" 
    />
  )

  const CooperationIcon = () => (
    <img 
      src="/cooperation.gif" 
      alt="Team cooperation" 
      className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" 
    />
  )

  const HourglassIcon = () => (
    <img 
      src="/hourglass.gif" 
      alt="Time duration" 
      className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" 
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
    <section ref={heroRef} id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden p-10">
      {/* Retro Grid Background */}
      <RetroGrid className="absolute inset-0" />
      <SplashCursor containerRef={heroRef} />
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-6"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{color: 'var(--text-primary)'}}
            variants={itemVariants}
          >
            Race Through{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Downtown
            </span>
            <br />
            Toronto's{' '}
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
            className="flex flex-col pt-7 sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="cta-button px-37 py-7 text-lg font-semibold cursor-pointer"   
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
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl p-4 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="flex justify-center mb-3">
                <stat.icon />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-1" style={{color: 'var(--text-primary)'}}>{stat.label}</h3>
              <p className="text-xs md:text-sm lg:text-base" style={{color: 'var(--text-muted)'}}>{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
          className="absolute bottom-8 left-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{borderColor: 'var(--safe-black-500)'}}>
            <div className="w-1 h-3 rounded-full mt-2" style={{backgroundColor: 'var(--safe-black-700)'}} />
          </div>
        </motion.div>
    </section>
  )
} 