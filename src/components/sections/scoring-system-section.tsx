'use client'

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Trophy,
  Mail,
  Eye,
  Lock
} from 'lucide-react'

export default function ScoringSystemSection() {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="mystery-cta" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20" style={{backgroundColor: 'var(--safe-black)'}}>
      {/* Dark Lava Lamp Background */}
      <div className="absolute inset-0 dark-lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="dark-floating-circle"></div>
        <div className="dark-floating-circle"></div>
        <div className="dark-floating-circle"></div>
        <div className="dark-floating-circle-small"></div>
        <div className="dark-floating-circle-small"></div>
        <div className="dark-floating-circle-small"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{color: 'var(--text-on-dark)'}}
            variants={itemVariants}
          >
            Scoring System
          </motion.h1>

          {/* Main Headline */}
          <motion.h2 
            className="text-md md:text-lg mb-6 leading-tight"
            style={{color: 'var(--pure-white)', opacity: 0.85}}
            variants={itemVariants}
          >
            So you want to know{' '}
            <span style={{color: 'var(--highlight-gold)'}}>
              everything
            </span>{' '}
            now?
          </motion.h2>

          {/* Mystery Lock Icon */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full  shadow-2xl">
              <Lock className="h-12 w-12" style={{color: 'var(--text-on-dark)'}} />
            </div>
          </motion.div>

          

          {/* Subheadline */}
          <motion.p 
            className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto leading-relaxed"
            style={{color: 'var(--text-on-dark)'}}
            variants={itemVariants}
          >
            Where&apos;s the{' '}
            <span style={{color: 'var(--highlight-gold)', fontWeight: 'bold'}}>
              mystery
            </span>{' '}
            in that?
          </motion.p>

          {/* CTA Description */}
          <motion.p 
            className="text-lg mb-12 max-w-2xl mx-auto"
            style={{color: 'var(--pure-white)', opacity: 0.9}}
            variants={itemVariants}
          >
            Contact us and we can discuss everything from{' '}
            <span className="font-semibold" style={{color: 'var(--highlight-gold)'}}>prizes</span>,{' '}
            <span className="font-semibold" style={{color: 'var(--accent-orange)'}}>prices</span>, and{' '}
            <span className="font-semibold" style={{color: 'var(--primary-blue)'}}>points</span>.
          </motion.p>

          {/* Main Contact Form CTA */}
          <motion.div
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="cta-button font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform transition-all duration-150 cursor-pointer"
              >
                <Mail className="h-6 w-6 mr-3" />
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom Teaser */}
          <motion.div 
            className="mt-16 inline-flex items-center gap-3 backdrop-blur-sm border px-6 py-3 rounded-full"
            style={{
              backgroundColor: 'var(--pure-white-200)',
              borderColor: 'var(--pure-white-400)',
              color: 'var(--safe-black)'
            }}
            variants={itemVariants}
          >
            <Eye className="h-5 w-5" />
            <span className="text-sm">The real mystery begins when you contact us...</span>
            <Trophy className="h-5 w-5" style={{color: 'var(--highlight-gold)'}} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 