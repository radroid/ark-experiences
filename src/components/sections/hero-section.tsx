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
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero animated-gradient opacity-90" />
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-white/10 rounded-full"
            style={{
              left: element.left,
              top: element.top,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: easeInOut,
            }}
          />
        ))}
      </div>

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
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            Solve the{' '}
            <span className="bg-gradient-to-r via-yellow-200 from-orange-400  bg-clip-text text-transparent">
              Mystery
            </span>
            <br />
            Build Your{' '}
            <span className="bg-blue-200 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience Toronto like never before with our immersive Cluedo-themed scavenger hunt. Navigate 9 iconic locations, solve intricate puzzles, and uncover the mystery while building unbreakable team bonds.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="glass text-white hover:bg-white/20 border-white/30 px-8 py-4 text-lg font-semibold"
              onClick={scrollToContact}
            >
              Plan Your Adventure
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-dark text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg"
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
              className="glass-card rounded-xl p-6 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-white/10">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.label}</h3>
              <p className="text-white/70">{stat.description}</p>
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
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </motion.div>
    </section>
  )
} 