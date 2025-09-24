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
    { icon: MapPin, label: '5 Secret Locations', description: 'Across Downtown Toronto' },
    { icon: Users, label: '2-4 Players', description: 'Per team' },
    { icon: Clock, label: '2 Hours', description: 'Duration' },
    // { icon: DollarSign, label: '$30 CAD', description: 'Cost per person' }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden p-10">
      {/* Subtle floating elements for visual interest */}
      <div className="absolute inset-0 lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
      </div>
      
      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.05}} />

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
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
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
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="cta-button px-8 py-4 text-lg font-semibold cursor-pointer"
              onClick={scrollToContact}
            >
              Join the Race
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="secondary-button px-8 py-4 text-lg cursor-help"
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
                <div className="p-3 rounded-full" style={{backgroundColor: 'var(--safe-black-100)'}}>
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" style={{color: 'var(--safe-black)'}} />
                </div>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1" style={{color: 'var(--text-primary)'}}>{stat.label}</h3>
              <p className="text-sm md:text-base lg:text-lg" style={{color: 'var(--text-muted)'}}>{stat.description}</p>
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