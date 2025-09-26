'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button-2'
import Image from 'next/image'
import EmailDrawer from '@/components/email-drawer'
import { useState } from 'react'
import { LiquidGlass } from '@/components/ui/liquid-glass'

export default function ComingSoonSection() {
  const [isOpenEmailDrawer, setIsOpenEmailDrawer] = useState(false)

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

  const openDrawer = () => {
    setIsOpenEmailDrawer(true)
  }

  const closeDrawer = () => {
    setIsOpenEmailDrawer(false)
  }

  return (
    <section id="coming-soon" className="relative min-h-screen flex items-center justify-center py-10 overflow-hidden px-4 sm:px-6" style={{backgroundColor: 'var(--eerie-black)', cursor: 'none'}}>
      
      {/* Dark Lava Lamp Background */}
      <div className="absolute inset-0 dark-lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
      </div>
      
      {/* Local liquid-glass cursor */}
      <LiquidGlass width={80} height={80} borderRadius={18} tintOpacity={0.12} blur={3} isCircle />

      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--eerie-black)', opacity: 0.1}} />

      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 pt-16 sm:pt-20 w-full">


        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="border transition-all duration-300 max-w-4xl mx-auto" style={{backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
            <CardContent className="p-4 sm:p-5 lg:p-6">

              {/* Main Content */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{color: 'var(--pure-white)'}}>
                  Clue{' '}
                  <span style={{color: 'var(--highlight-gold)'}}>
                    Hunt
                  </span>
                </h3>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10" style={{color: 'var(--text-muted)'}}>
                  Our upcoming hunt will challenge your detective skills as you solve a murder mystery throughout Toronto. Coming soon.
                </p>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8" variants={containerVariants}>
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mb-4" style={{backgroundColor: 'rgba(255,255,255,0.06)'}}>
                    <Image 
                      src="/clue-mystery-icon.png" 
                      alt="Mystery Locations" 
                      width={128} 
                      height={128} 
                      className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2" style={{color: 'var(--pure-white)'}}>Mystery Locations</h4>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>Hidden spots across Toronto waiting to be discovered</p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mb-4" style={{backgroundColor: 'rgba(255,255,255,0.06)'}}>
                    <Image 
                      src="/clue-puzzle-icon.png" 
                      alt="Detective Puzzles" 
                      width={128} 
                      height={128} 
                      className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2" style={{color: 'var(--pure-white)'}}>Detective Puzzles</h4>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>Challenge your problem-solving and deduction skills</p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mb-4" style={{backgroundColor: 'rgba(255,255,255,0.06)'}}>
                    <Image 
                      src="/clue-team-puzzle-icon.png" 
                      alt="Team Mystery" 
                      width={128} 
                      height={128} 
                      className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2" style={{color: 'var(--pure-white)'}}>Team Mystery</h4>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>Collaborate to piece together the ultimate mystery</p>
                </motion.div>
              </motion.div>

              {/* Call to Action */}
              <motion.div className="text-center" variants={itemVariants}>
                <p className="text-base sm:text-lg mb-6" style={{color: 'var(--pure-white)'}}>
                  Want to be the first to know when this experience launches?
                </p>
                <Button 
                  size="lg" 
                  className="cta-button cta-button--gold px-6 py-4 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold cursor-pointer"
                  onClick={openDrawer}
                >
                  Get Notified
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <EmailDrawer isOpen={isOpenEmailDrawer} onClose={closeDrawer} theme="dark" />
    </section>
  )
}
