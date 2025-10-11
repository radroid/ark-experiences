'use client'

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button-2'
import { MapPin, Users, Clock } from 'lucide-react'
import { Typewriter } from '@/components/ui/typewriter'
import { GridPattern } from '@/components/ui/grid-pattern'

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
    { icon: Users, label: '2-3 Players', description: 'Per team' },
    { icon: Clock, label: '2 Hours', description: 'Duration' },
  ]

  const openEmailPopover = () => {
    // Dispatch custom event to open the email popover
    window.dispatchEvent(new CustomEvent('openEmailPopover'));
  }


  return (
    <section id="hero-section" className="relative min-h-screen max-w-screen flex items-center justify-center overflow-hidden p-10">
      {/* Modern Grid Pattern Background */}
      <GridPattern
        width={100}
        height={95}
        x={-1}
        y={-1}
        strokeDasharray="0"
        className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
      />
      
      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.5}} />

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
            <span>Experience Toronto&apos;s </span>
            <br />
            <span style={{color: 'var(--primary-blue)'}}>
              <Typewriter 
                text={['Downtown', 'Simple Race', 'Mystery Hunt', 'Outdoor Adventure']}
                speed={100}
                deleteSpeed={50}
                waitTime={2000}
                loop={true}
                cursorChar="|"
                cursorClassName="ml-0"
              />
            </span>
          </motion.h1>

          <motion.p 
            className="text-md md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{color: 'var(--text-body)'}}
            variants={itemVariants}
          >
            A race through Toronto&apos;s downtown where teams compete to complete challenges and unlock clues across 5 secret locations
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="cta-button px-8 py-4 text-lg font-semibold cursor-pointer"
              onClick={openEmailPopover}
            >
              Book the Adventure
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
          className="mt-10 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl w-40 h-40 flex flex-col items-center justify-center p-4 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="mb-3">
                <stat.icon className="h-8 w-8" style={{color: 'var(--primary-blue)'}} />
              </div>
              <h3 className="text-sm font-bold mb-1" style={{color: 'var(--text-primary)'}}>{stat.label}</h3>
              <p className="text-xs" style={{color: 'var(--text-muted)'}}>{stat.description}</p>
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
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{borderColor: 'var(--eerie-black-500)'}}>
            <div className="w-1 h-3 rounded-full mt-2" style={{backgroundColor: 'var(--eerie-black-700)'}} />
          </div>
        </motion.div>
    </section>
  )
} 