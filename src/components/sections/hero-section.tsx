'use client'

import { motion, easeInOut, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Users, Clock } from 'lucide-react'

export default function HeroSection() {
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

  const stats = [
    { icon: MapPin, label: '9 Locations', description: 'Across Toronto' },
    { icon: Users, label: '3-50 Players', description: 'Team sizes' },
    { icon: Clock, label: '2-4 Hours', description: 'Duration' }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Fixed positions for floating elements to avoid hydration mismatch
  const floatingElements = [
    { left: '15%', top: '20%', duration: 8 },
    { left: '85%', top: '30%', duration: 10 },
    { left: '25%', top: '70%', duration: 9 },
    { left: '75%', top: '60%', duration: 11 },
    { left: '45%', top: '15%', duration: 9.5 },
    { left: '65%', top: '80%', duration: 8.5 },
  ]

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden handdrawn-hero-bg">
      {/* Hand-drawn Frame Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 60 Q800 0 1570 60 Q1600 450 1570 840 Q800 900 30 840 Q0 450 30 60 Z" stroke="#b6a77a" stroke-width="8" fill="none"/>
        <path d="M60 100 Q800 40 1540 100 Q1570 450 1540 800 Q800 860 60 800 Q30 450 60 100 Z" stroke="#e2dbc7" stroke-width="4" fill="none"/>
      </svg>
      {/* Map-like accents: faint grid and footprints */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.08">
          <path d="M0 100 H1600" stroke="#b6a77a" stroke-width="2"/>
          <path d="M0 300 H1600" stroke="#b6a77a" stroke-width="2"/>
          <path d="M0 500 H1600" stroke="#b6a77a" stroke-width="2"/>
          <path d="M0 700 H1600" stroke="#b6a77a" stroke-width="2"/>
          <path d="M200 0 V900" stroke="#b6a77a" stroke-width="2"/>
          <path d="M800 0 V900" stroke="#b6a77a" stroke-width="2"/>
          <path d="M1400 0 V900" stroke="#b6a77a" stroke-width="2"/>
        </g>
        <g opacity="0.12">
          <ellipse cx="300" cy="200" rx="18" ry="8" fill="#b6a77a"/>
          <ellipse cx="320" cy="220" rx="8" ry="4" fill="#b6a77a"/>
          <ellipse cx="340" cy="240" rx="12" ry="6" fill="#b6a77a"/>
          <ellipse cx="360" cy="260" rx="7" ry="3" fill="#b6a77a"/>
        </g>
      </svg>
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-800 leading-tight handdrawn-heading"
            variants={itemVariants}
          >
            Solve the{' '}
            <span className="handdrawn-underline text-blue-900">
              Mystery
            </span>
            <br />
            Build Your{' '}
            <span className="handdrawn-underline text-slate-900">
              Team
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed handdrawn-paragraph"
            variants={itemVariants}
          >
            Ready for an epic adventure? Experience Toronto like never before with our immersive Cluedo-themed scavenger hunt. Navigate 9 iconic locations, solve intricate puzzles, and create unforgettable memories with your team!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="handdrawn-btn text-gray-800 px-8 py-4 text-lg font-semibold"
              onClick={scrollToContact}
            >
              Plan Your Adventure
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="handdrawn-btn-outline text-gray-800 px-8 py-4 text-lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button>
          </motion.div>
        </motion.div>
        {/* Stats Section */}
        <motion.div 
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="handdrawn-card p-6 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full handdrawn-card-accent">
                  <stat.icon className="h-8 w-8 text-gray-800" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1 handdrawn-card-title">{stat.label}</h3>
              <p className="text-gray-600 handdrawn-card-desc">{stat.description}</p>
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
          <div className="w-6 h-10 border-2 border-gray-800/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-800/70 rounded-full mt-2" />
          </div>
        </motion.div>
    </section>
  )
} 