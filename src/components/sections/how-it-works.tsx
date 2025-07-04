'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MapPin, 
  Search, 
  Puzzle, 
  Trophy, 
  Timer,
  CheckCircle,
  Target
} from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: 'Form Your Team',
      description: 'Split into 3 teams of 3-17 players each. Every team gets a unique starting location.',
      details: ['3 teams compete', 'Equal team sizes', 'Unique starting points'],
      color: 'from-blue-600 to-orange-400'
    },
    {
      icon: MapPin,
      title: 'Navigate Toronto',
      description: 'Visit 9 iconic Toronto locations, each holding clues to the next destination.',
      details: ['9 unique locations', 'Toronto landmarks', 'GPS coordinates provided'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Search,
      title: 'Solve Clues',
      description: 'Find hidden clues at each location. Some lead to the next spot, others reveal murder details.',
      details: ['Location clues', 'Murder mystery clues', 'Photo evidence required'],
      color: 'from-orange-400 to-yellow-400'
    },
    {
      icon: Puzzle,
      title: 'Piece Together',
      description: 'Collect evidence to determine the weapon, person, and motive behind the murder.',
      details: ['Weapon identification', 'Suspect analysis', 'Motive discovery'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Trophy,
      title: 'Win the Game',
      description: 'First team to solve the murder correctly wins the grand prize!',
      details: ['Speed matters', 'Accuracy counts', 'Team collaboration wins'],
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  const scoringFactors = [
    {
      icon: Timer,
      title: 'Speed',
      description: 'How quickly you solve each location clue',
      points: 'Up to 100 pts'
    },
    {
      icon: CheckCircle,
      title: 'Accuracy',
      description: 'Correctness of your murder solution',
      points: 'Up to 500 pts'
    },
    {
      icon: Target,
      title: 'Completion',
      description: 'Visiting all 9 locations successfully',
      points: 'Up to 200 pts'
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
    <section id="how-it-works" className="pt-40 py-24 handdrawn-section-bg relative overflow-hidden">
      {/* Hand-drawn Top Divider */}
      <svg className="absolute top-0 left-0 w-full h-16 z-0" viewBox="0 0 1600 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 32 Q400 0 800 32 Q1200 64 1600 32" stroke="#b6a77a" stroke-width="6" fill="none"/>
      </svg>
      {/* Hand-drawn Route Map */}
      <svg className="absolute left-1/2 top-40 -translate-x-1/2 z-0 hidden lg:block" width="900" height="600" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Route Path */}
        <path d="M60 80 Q180 120 200 220 Q220 320 350 300 Q480 280 500 400 Q520 520 700 500 Q820 480 840 560" stroke="#b6a77a" stroke-width="8" stroke-dasharray="18 18" fill="none"/>
        {/* Footprints */}
        <ellipse cx="120" cy="110" rx="10" ry="5" fill="#b6a77a" opacity="0.18"/>
        <ellipse cx="130" cy="120" rx="5" ry="2.5" fill="#b6a77a" opacity="0.18"/>
        <ellipse cx="210" cy="200" rx="8" ry="4" fill="#b6a77a" opacity="0.18"/>
        <ellipse cx="360" cy="320" rx="7" ry="3" fill="#b6a77a" opacity="0.18"/>
        <ellipse cx="520" cy="420" rx="10" ry="5" fill="#b6a77a" opacity="0.18"/>
        {/* Arrow to gold pot */}
        <path d="M820 480 Q830 520 840 560" stroke="#b6a77a" stroke-width="6" marker-end="url(#arrowhead)" fill="none"/>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#b6a77a" />
          </marker>
        </defs>
        {/* Gold Pot at the End */}
        <g transform="translate(820,540)">
          <ellipse cx="20" cy="30" rx="20" ry="12" fill="#e2c275" stroke="#b6a77a" stroke-width="3"/>
          <rect x="5" y="10" width="30" height="20" rx="10" fill="#ffd700" stroke="#b6a77a" stroke-width="3"/>
          <ellipse cx="20" cy="10" rx="15" ry="8" fill="#ffe066" stroke="#b6a77a" stroke-width="2"/>
          <ellipse cx="20" cy="10" rx="10" ry="4" fill="#fffbe6" opacity="0.7"/>
          <circle cx="12" cy="18" r="3" fill="#ffe066"/>
          <circle cx="28" cy="18" r="3" fill="#ffe066"/>
        </g>
      </svg>
      {/* Map-like accents: dotted path and footprints */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.10">
          <path d="M200 100 Q400 200 800 100 Q1200 0 1400 200" stroke="#b6a77a" stroke-width="3" stroke-dasharray="12 12" fill="none"/>
          <ellipse cx="250" cy="120" rx="10" ry="5" fill="#b6a77a"/>
          <ellipse cx="270" cy="140" rx="5" ry="2.5" fill="#b6a77a"/>
          <ellipse cx="290" cy="160" rx="8" ry="4" fill="#b6a77a"/>
        </g>
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 handdrawn-heading"
            variants={itemVariants}
          >
            How the Mystery{' '}
            <span className="handdrawn-underline text-pink-700">
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto handdrawn-paragraph"
            variants={itemVariants}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
        </motion.div>
        {/* Timeline Steps */}
        <motion.div 
          className="relative mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Remove techy timeline line */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-12`}
                variants={itemVariants}
              >
                <div className="flex-1 lg:text-right lg:pr-8 mb-8 lg:mb-0">
                  <div className="handdrawn-card p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full handdrawn-card-accent">
                        <step.icon className="h-8 w-8 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 handdrawn-card-title">{step.title}</h3>
                        <span className="handdrawn-badge mt-1">Step {index + 1}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed handdrawn-paragraph">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="handdrawn-check mr-1">✔</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Timeline Node - replaced with hand-drawn accent */}
                <motion.div 
                  className="relative z-10 hidden lg:block"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-16 h-16 rounded-full handdrawn-card-accent flex items-center justify-center shadow-lg">
                    <step.icon className="h-8 w-8 text-gray-800" />
                  </div>
                </motion.div>
                <div className="flex-1 lg:pl-8 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Scoring System */}
        <motion.div
          className="handdrawn-card rounded-3xl p-8 border-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 handdrawn-card-title">
              Scoring System
            </h3>
            <p className="text-lg text-gray-600">
              Points are awarded based on speed, accuracy, and completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scoringFactors.map((factor, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
                  <factor.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{factor.title}</h4>
                <p className="text-gray-600 mb-3">{factor.description}</p>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  {factor.points}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold">
              <Trophy className="h-5 w-5" />
              Maximum Score: 800 Points
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Hand-drawn Bottom Divider */}
      <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1600 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 32 Q400 64 800 32 Q1200 0 1600 32" stroke="#b6a77a" stroke-width="6" fill="none"/>
      </svg>
    </section>
  )
} 