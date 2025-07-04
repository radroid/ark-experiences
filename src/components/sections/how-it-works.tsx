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
import { useEffect, useState } from 'react'

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: Users,
      title: 'Form Your Team',
      description: 'Split into 3 teams of 3-17 players each. Every team gets a unique starting location.',
      details: ['3 teams compete', 'Equal team sizes', 'Unique starting points'],
      position: { x: 100, y: 100 }
    },
    {
      icon: MapPin,
      title: 'Navigate Toronto',
      description: 'Visit 9 iconic Toronto locations, each holding clues to the next destination.',
      details: ['9 unique locations', 'Toronto landmarks', 'GPS coordinates provided'],
      position: { x: 300, y: 200 }
    },
    {
      icon: Search,
      title: 'Solve Clues',
      description: 'Find hidden clues at each location. Some lead to the next spot, others reveal murder details.',
      details: ['Location clues', 'Murder mystery clues', 'Photo evidence required'],
      position: { x: 500, y: 150 }
    },
    {
      icon: Puzzle,
      title: 'Piece Together',
      description: 'Collect evidence to determine the weapon, person, and motive behind the murder.',
      details: ['Weapon identification', 'Suspect analysis', 'Motive discovery'],
      position: { x: 700, y: 250 }
    },
    {
      icon: Trophy,
      title: 'Win the Game',
      description: 'First team to solve the murder correctly wins the grand prize!',
      details: ['Speed matters', 'Accuracy counts', 'Team collaboration wins'],
      position: { x: 900, y: 200 }
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

  // Map route path coordinates
  const routePath = "M100 100 Q200 150 300 200 Q400 175 500 150 Q600 125 700 250 Q800 200 900 200"

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('how-it-works')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate which step should be active based on scroll position
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / sectionHeight))
      const stepIndex = Math.floor(scrollProgress * steps.length)
      setActiveStep(Math.min(stepIndex, steps.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="how-it-works" className="section-padding bg-gradient-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            How the Mystery{' '}
            <span className="text-gradient">
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
        </motion.div>

        {/* Interactive Map Route */}
        <motion.div 
          className="relative mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative h-[600px] max-w-6xl mx-auto">
            {/* SVG Map Route */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1000 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e3f2fd" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Route Path */}
              <motion.path
                d={routePath}
                stroke="#3b82f6"
                strokeWidth="4"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                initial={{ strokeDashoffset: 1000 }}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="animate-draw-path"
              />
              
              {/* Route Path Shadow */}
              <path
                d={routePath}
                stroke="#1e40af"
                strokeWidth="6"
                fill="none"
                opacity="0.3"
                filter="blur(4px)"
              />

              {/* Step Pins */}
              {steps.map((step, index) => (
                <g key={index}>
                  {/* Pin Shadow */}
                  <circle
                    cx={step.position.x}
                    cy={step.position.y}
                    r="20"
                    fill="#1e40af"
                    opacity="0.3"
                    filter="blur(4px)"
                  />
                  
                  {/* Pin */}
                  <motion.circle
                    cx={step.position.x}
                    cy={step.position.y}
                    r="16"
                    fill={activeStep >= index ? "#ffd700" : "#e5e7eb"}
                    stroke={activeStep >= index ? "#f59e0b" : "#d1d5db"}
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={activeStep >= index ? "animate-pin-bounce" : ""}
                  />
                  
                  {/* Step Number */}
                  <text
                    x={step.position.x}
                    y={step.position.y + 4}
                    textAnchor="middle"
                    fill={activeStep >= index ? "#1f2937" : "#6b7280"}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {index + 1}
                  </text>
                  
                  {/* Step Icon */}
                  <foreignObject
                    x={step.position.x - 12}
                    y={step.position.y - 12}
                    width="24"
                    height="24"
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <step.icon 
                        size={16} 
                        className={activeStep >= index ? "text-gray-900" : "text-gray-500"} 
                      />
                    </div>
                  </foreignObject>
                </g>
              ))}

              {/* Trophy at the end */}
              <motion.g
                transform="translate(920, 180)"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Trophy size={40} className="text-yellow-500 drop-shadow-lg" />
              </motion.g>
            </svg>

            {/* Step Cards */}
            <div className="absolute inset-0 pointer-events-none">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto ${
                    index % 2 === 0 ? 'text-left' : 'text-right'
                  }`}
                  style={{
                    left: `${(step.position.x / 1000) * 100}%`,
                    top: `${(step.position.y / 400) * 100}%`,
                    marginTop: '-20px'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <div className={`bg-white p-6 rounded-2xl shadow-medium max-w-xs ${
                    activeStep >= index ? 'ring-2 ring-primary ring-opacity-50' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        activeStep >= index ? 'bg-gradient-primary' : 'bg-gray-100'
                      }`}>
                        <step.icon className={`h-5 w-5 ${
                          activeStep >= index ? 'text-gray-900' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${
                          activeStep >= index ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {step.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          Step {index + 1}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {step.description}
                    </p>
                    <ul className="space-y-1">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scoring System */}
        <motion.div
          className="bg-white rounded-3xl p-12 shadow-medium"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
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
                className="text-center hover-lift"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-secondary mb-4">
                  <factor.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{factor.title}</h4>
                <p className="text-gray-600 mb-3">{factor.description}</p>
                <Badge variant="outline" className="text-primary border-primary">
                  {factor.points}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-gray-900 px-6 py-3 rounded-full font-semibold shadow-medium">
              <Trophy className="h-5 w-5" />
              Maximum Score: 800 Points
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 