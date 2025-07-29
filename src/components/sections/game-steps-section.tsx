'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRef, useState } from 'react'
import { 
  Users, 
  MapPin, 
  Search, 
  Puzzle, 
  Trophy, 
  CheckCircle
} from 'lucide-react'

export default function GameStepsSection() {
  const containerRef = useRef(null)
  const [revealedSteps, setRevealedSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState<number>(-1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const steps = [
    {
      icon: Users,
      title: 'Form Your Team',
      description: 'Split into 3 teams of 2-5 players each. Every team gets a unique starting location.',
      details: ['3 teams compete', 'Equal team sizes', 'Unique starting points'],
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Search,
      title: 'Solve Clues',
      description: 'Find hidden clues at each location. Some lead to the next spot, others reveal murder details.',
      details: ['Location clues', 'Murder mystery clues', 'Photo evidence required'],
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50'
    },
    {
      icon: MapPin,
      title: 'Navigate Toronto',
      description: 'Visit 9 iconic Toronto locations, each holding clues to the next destination.',
      details: ['9 unique locations', 'Toronto landmarks', 'GPS coordinates provided'],
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Puzzle,
      title: 'Piece Together',
      description: 'Collect evidence to determine the weapon, person, and motive behind the murder.',
      details: ['Weapon identification', 'Suspect analysis', 'Motive discovery'],
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50'
    },
    {
      icon: Trophy,
      title: 'Win the Game',
      description: 'First team to solve the murder correctly wins the grand prize!',
      details: ['Speed matters', 'Accuracy counts', 'Team collaboration wins'],
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-50'
    }
  ]

  return (
    <div ref={containerRef} className="relative">
      {/* Title Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How the Mystery{' '}
            <span className="bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto pb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 h-3/4 to-blue-900 z-10" />
        </div>

        {/* Timeline line starts here */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-transparent to-purple-500"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </section>

      {/* Main Steps Container */}
      <div className="relative flex min-h-screen">
        {/* Sticky Left Side - Stacking Steps */}
        <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-start pt-20 px-6 lg:px-10 bg-blue-50 overflow-auto self-start">
                     <div className="space-y-4 max-h-screen overflow-hidden scrollbar-hide p-2">
            {steps.map((step, index) => {
              const isRevealed = revealedSteps.includes(index)
              const isActive = activeStep === index
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{
                    opacity: isRevealed ? (isActive ? 1 : 0.7) : 0.2,
                    x: isRevealed ? 0 : -50,
                    scale: isRevealed ? (isActive ? 1.02 : 1) : 0.9
                  }}
                  transition={{ 
                    duration: 0.2, 
                    ease: "easeOut"
                  }}
                >
                  <div className={`flex items-center gap-6 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isActive ? 'bg-white/95 border-2 border-purple-200' : 'bg-white/80'
                  }`}>
                    <motion.div 
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300`}
                      animate={{
                        scale: isActive ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${step.color} text-sm font-bold px-3 py-1`}>
                          Step {index + 1}
                        </Badge>
                      </div>
                      <motion.h3 
                        className="text-2xl font-bold transition-colors duration-300"
                        animate={{
                          color: isActive ? '#7c3aed' : '#374151' // purple-600 : gray-700
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.title}
                      </motion.h3>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Sticky Center Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-blue-900 to-black h-full z-10" />

        {/* Scrollable Right Side - Step Details */}
        <div className="w-1/2 ml-auto overflow-hidden">
          {steps.map((step, index) => (
                          <section 
                key={index}
                className="min-h-screen bg-blue-50 flex items-center justify-center px-8 lg:px-16 relative"
                data-step-section={index}
              >
                {/* Active step tracker */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{ margin: "-40%" }}
                />
              <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, x: 50 }}
                                 whileInView={{ 
                   opacity: 1, 
                   x: 0,
                   transition: {
                     duration: 1.5,
                     delay: 0.6, // Delay right side to animate after left side
                   }
                 }}
                 onViewportEnter={() => {
                   // First reveal the left side step immediately
                   setRevealedSteps(prev => {
                     const newRevealed = []
                     for (let i = 0; i <= index; i++) {
                       if (!prev.includes(i)) {
                         newRevealed.push(i)
                       }
                     }
                     return [...prev, ...newRevealed]
                   })
                   // Set current step as active with a small delay for left side to animate first
                   setTimeout(() => {
                     setActiveStep(index)
                   }, 300)
                 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 viewport={{ once: true, margin: "-100px" }}
              >
                <Card className={`border-0 shadow-2xl ${step.bgColor} hover:shadow-3xl transition-all duration-300`}>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${step.color} mb-6`}>
                        <step.icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Points:</h4>
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

                             {/* Timeline node for current step */}
               <motion.div
                 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-purple-500 shadow-lg z-20"
                 style={{ top: '50vh' }}
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 viewport={{ once: true }}
               >
                 <div className={`w-full h-full rounded-full ${step.color} flex items-center justify-center`}>
                   <step.icon className="h-4 w-4" />
                 </div>
               </motion.div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
} 