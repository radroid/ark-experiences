'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button-2'
import { MapPin, Users, Puzzle } from 'lucide-react'
import EmailDrawer from '@/components/email-drawer'
import { useState } from 'react'

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
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      
      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.05}} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{color: 'var(--text-primary)'}}
            variants={itemVariants}
          >
            Coming{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Soon
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: 'var(--text-body)'}}
            variants={itemVariants}
          >
            Get ready for our next thrilling adventure experience!
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 max-w-4xl mx-auto" style={{backgroundColor: 'var(--primary-blue-50)'}}>
            <CardContent className="p-8 lg:p-12">

              {/* Main Content */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
                  Clue-Themed{' '}
                  <span style={{color: 'var(--accent-orange)'}}>
                    Scavenger Hunt
                  </span>
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed mb-6" style={{color: 'var(--text-body)'}}>
                  Step into a world of mystery and intrigue! Our upcoming clue-themed scavenger hunt will challenge your detective skills as you solve puzzles and uncover secrets throughout Toronto.
                </p>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: 'var(--primary-blue-100)', color: 'var(--primary-blue)'}}>
                    <MapPin className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Mystery Locations</h4>
                  <p className="text-sm" style={{color: 'var(--text-body)'}}>Hidden spots across Toronto waiting to be discovered</p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: 'var(--accent-orange-100)', color: 'var(--accent-orange)'}}>
                    <Puzzle className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Detective Puzzles</h4>
                  <p className="text-sm" style={{color: 'var(--text-body)'}}>Challenge your problem-solving and deduction skills</p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: 'var(--soft-green-100)', color: 'var(--soft-green)'}}>
                    <Users className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Team Mystery</h4>
                  <p className="text-sm" style={{color: 'var(--text-body)'}}>Collaborate to piece together the ultimate mystery</p>
                </motion.div>
              </motion.div>

              {/* Call to Action */}
              <motion.div className="text-center" variants={itemVariants}>
                <p className="text-lg mb-6" style={{color: 'var(--text-body)'}}>
                  Want to be the first to know when this experience launches?
                </p>
                <Button 
                  size="lg" 
                  className="cta-button px-8 py-4 text-lg font-semibold cursor-pointer"
                  onClick={openDrawer}
                >
                  Get Notified
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <EmailDrawer isOpen={isOpenEmailDrawer} onClose={closeDrawer} />
    </section>
  )
}
