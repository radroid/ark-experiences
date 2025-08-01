'use client'

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button-2'
import { MapPin, Users, Clock } from 'lucide-react'

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
    { icon: Users, label: '2-5 Players', description: 'Team size' },
    { icon: Clock, label: '4 Hours', description: 'Duration' },
    // { icon: DollarSign, label: 'Approx. $70 CAD', description: 'Cost per person' }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden p-10">
      {/* Lava Lamp Background */}
      <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
      </div>
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
            variants={itemVariants}
          >
            Solve the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
              Mystery
            </span>
            <br />
            Around the{' '}
            <span className="bg-gradient-to-r from-orange-400 via-orange-700 to-orange-900 bg-clip-text text-transparent">
              City
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Are you ready for an epic adventure?
            <br />
            <br />
            Experience Toronto with our immersive <u>Cluedo-themed Scavenger Hunt</u>.
            <br />
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="glass-button px-8 py-4 text-lg font-semibold cursor-pointer"
              onClick={scrollToContact}
            >
              Plan Your Adventure
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-dark text-gray-800 border-gray-300/30 hover:bg-white/10 px-8 py-4 text-lg cursor-help"
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
                <div className="p-3 rounded-full bg-gray-800/10">
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-gray-800" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1">{stat.label}</h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">{stat.description}</p>
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