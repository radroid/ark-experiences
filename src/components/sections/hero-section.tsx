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

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center bg-white pt-16">
      {/* Playful accent illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Map pin accent */}
        <motion.div
          className="absolute top-20 right-20 text-primary/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MapPin size={60} />
        </motion.div>
        
        {/* Magnifying glass accent */}
        <motion.div
          className="absolute bottom-40 left-20 text-secondary/20"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </motion.div>
        
        {/* Footprint accent */}
        <motion.div
          className="absolute top-1/2 right-1/4 text-primary/15"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z"/>
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Solve the{' '}
            <span className="text-gradient">
              Mystery
            </span>
            <br />
            Build Your{' '}
            <span className="text-primary">
              Team
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Ready for an epic adventure? Experience Toronto like never before with our immersive Cluedo-themed scavenger hunt. Navigate 9 iconic locations, solve intricate puzzles, and create unforgettable memories with your team!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary text-gray-900 px-8 py-4 text-lg font-semibold shadow-medium hover-lift"
              onClick={scrollToContact}
            >
              Plan Your Adventure
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg font-medium hover:bg-gray-50 hover-lift"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-soft hover-lift text-center"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-secondary">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
} 