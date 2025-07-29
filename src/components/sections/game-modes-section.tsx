'use client'

import { motion, easeOut } from 'framer-motion'
import { Users2, UserCheck } from 'lucide-react'

export default function GameModesSection() {
  const gameModes = [
    {
      mode: 'Collaborative Mode',
      icon: Users2,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      details: [
        { label: 'Teams', value: '1 active team playing' },
        { label: 'Players', value: '2-5 players' },
        { label: 'Objective', value: 'Work together to solve the mystery' },
        { label: 'Starting Points', value: 'Single starting location' }
      ]
    },
    {
      mode: 'Competitive Mode',
      icon: UserCheck,
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
      details: [
        { label: 'Teams', value: 'Up to 3 active teams playing' },
        { label: 'Players', value: '2-5 players in a team' },
        { label: 'Objective', value: 'Race against other teams to solve first' },
        { label: 'Starting Points', value: 'Unique starting locations for each team' }
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
    <section id="game-modes" className="min-h-screen flex items-center justify-center bg-gray-50">
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
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Game Mode
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${mode.bgColor} mb-6`}>
                    <mode.icon className={`h-10 w-10 ${mode.color.split(' ')[1]}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{mode.mode}</h3>
                </div>
                
                <ul className="space-y-4">
                  {mode.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-700">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{detail.label}:</span>
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