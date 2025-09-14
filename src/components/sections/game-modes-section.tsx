'use client'

import { motion, easeOut } from 'framer-motion'
import { Users2, UserCheck } from 'lucide-react'

export default function GameModesSection() {
  const gameModes = [
    {
      mode: 'Collaborative Mode',
      icon: Users2,
      iconColor: 'var(--highlight-gold)',
      bgColor: 'var(--highlight-gold-100)',
      details: [
        { label: 'Objective', value: 'Work together to solve the mystery' },
        { label: 'Teams', value: '1 active team playing' },
        { label: 'Players', value: '2-5 players' }
      ]
    },
    {
      mode: 'Competitive Mode',
      icon: UserCheck,
      iconColor: 'var(--accent-orange)',
      bgColor: 'var(--accent-orange-100)',
      details: [
        { label: 'Objective', value: 'Race against other teams to solve first' },
        { label: 'Teams', value: 'Up to 3 active teams playing' },
        { label: 'Players', value: '6-15 players (2-5 in a team)' }
      ]
    }
  ]

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

  return (
    <section id="game-modes" className="min-h-screen flex items-center justify-center py-15" style={{backgroundColor: 'var(--ghost-white)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{color: 'var(--text-primary)'}}
              variants={itemVariants}
            >
              Choose Your{' '}
              <span style={{color: 'var(--accent-orange)'}}>
                Game Mode
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              style={{color: 'var(--text-body)'}}
              variants={itemVariants}
            >
              It is fun both ways!
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {gameModes.map((mode, index) => (
              <motion.div
                key={index}
                className="rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{backgroundColor: 'var(--ghost-white)', border: '1px solid var(--caf-noir-200)'}}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{backgroundColor: mode.bgColor}}>
                    <mode.icon className="h-10 w-10" style={{color: mode.iconColor}} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>{mode.mode}</h3>
                </div>
                
                <ul className="space-y-4">
                  {mode.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-4" style={{color: 'var(--text-body)'}}>
                      <div className="flex flex-col">
                        <span className="font-semibold" style={{color: 'var(--text-secondary)'}}>{detail.label}:</span>
                        <span className="ml-2 text-lg">{detail.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 