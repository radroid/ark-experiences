'use client'

import { motion, useScroll } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRef, useState, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)
  
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const steps = [
    {
      icon: Users,
      title: 'Form Your Team',
      description: 'Form teams of 2-5 players each. Every team gets a unique starting location.',
      details: ['Equal team sizes', 'Unique starting points'],
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

  // Mobile-first rendering strategy
  if (isMobile) {
    return <MobileGameStepsSection steps={steps} />
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Continuous Timeline - Spans entire section height, above backgrounds but below content */}
      <motion.div 
        className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-blue-900 to-black z-30"
        style={{ 
          top: '60vh', // Start from title area
          height: 'calc(100% - 60vh)' // Extend to bottom with some padding
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
      />

      {/* Title Section */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50 px-4 relative">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8"
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
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto pb-12 lg:pb-20 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
        </div>
      </section>

      {/* Desktop/Tablet Layout */}
      <div className="relative flex min-h-screen">
        {/* Sticky Left Side - Stacking Steps */}
        <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center pl-4 lg:pl-10 pr-8 lg:pr-12 bg-blue-50 overflow-hidden self-start z-20">
          <div className="space-y-2 lg:space-y-3 w-full p-2">
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
                  <div className={`flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 max-w-full ${
                  isActive ? 'bg-white/95 border-2 border-gray-200' : 'bg-white/80'
                  }`}>
                    <motion.div 
                      className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300`}
                      animate={{
                        scale: isActive ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    </motion.div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${step.color} text-xs lg:text-sm font-bold px-2 lg:px-3 py-1`}>
                          Step {index + 1}
                        </Badge>
                      </div>
                      <motion.h3 
                        className="text-lg lg:text-2xl font-bold transition-colors duration-300"
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

        {/* Timeline Nodes - positioned over the background timeline */}
        {steps.map((step, index) => (
          <motion.div
            key={`node-${index}`}
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-1 border-gray-300 shadow-lg z-40"
            style={{ 
              top: `${18 + (index * 99)}vh` // Distribute nodes along the timeline
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
            viewport={{ once: true }}
          >
            <div className={`w-full h-full rounded-full ${step.color} flex items-center justify-center opacity-90`}>
              <step.icon className="h-3 w-3" />
            </div>
          </motion.div>
        ))}

        {/* Scrollable Right Side - Step Details */}
        <div className="w-1/2 ml-auto overflow-x-hidden z-20">
          {steps.map((step, index) => (
            <section 
              key={index}
              className="min-h-screen bg-blue-50 flex items-center justify-center pl-8 lg:pl-12 pr-4 lg:pr-16 relative"
              data-step-section={index}
            >
              {/* Active step tracker */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                onViewportEnter={() => setActiveStep(index)}
                viewport={{ margin: "-40%" }}
              />
              <motion.div
                className="w-full max-w-xl lg:max-w-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 1.5,
                    delay: 0.6,
                  }
                }}
                onViewportEnter={() => {
                  setRevealedSteps(prev => {
                    const newRevealed = []
                    for (let i = 0; i <= index; i++) {
                      if (!prev.includes(i)) {
                        newRevealed.push(i)
                      }
                    }
                    return [...prev, ...newRevealed]
                  })
                  setTimeout(() => {
                    setActiveStep(index)
                  }, 300)
                }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className={`border-0 shadow-2xl ${step.bgColor} hover:shadow-3xl transition-all duration-300 max-w-full`}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="text-center mb-6 lg:mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full ${step.color} mb-4 lg:mb-6`}>
                        <step.icon className="h-8 w-8 lg:h-10 lg:w-10" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">{step.title}</h3>
                      <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 lg:space-y-4">
                      <h4 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Key Points:</h4>
                      {step.details.map((detail: string, i: number) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 bg-white rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step type definition
type Step = {
  icon: React.ComponentType<{ className?: string; }>;
  title: string;
  description: string;
  details: string[];
  color: string;
  bgColor: string;
}

// Mobile-optimized component
function MobileGameStepsSection({ steps }: { steps: Step[] }) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden w-full">
      {/* Mobile Continuous Timeline - Behind content */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-blue-900 to-black z-0 "
        style={{ 
          top: '60vh', // Start after title section
          height: 'calc(100% - 60vh)' // Extend to bottom
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
      />

      {/* Mobile Title Section */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How the Mystery{' '}
            <span className="bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
          
          {/* Mobile-friendly scroll indicator */}
          <motion.div
            className="w-16 h-8 mx-auto border-2 border-blue-100 rounded-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Steps - Single Column Layout */}
      <div className="px-4 pb-12 relative z-20 w-full overflow-x-hidden">
        <div className="max-w-lg mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Timeline Node for each step */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-1 border-gray-300 shadow-lg z-30 -top-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={`w-full h-full rounded-full ${step.color} flex items-center justify-center opacity-90`}>
                  <step.icon className="h-3 w-3" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className={`border-0 shadow-xl ${step.bgColor} hover:shadow-2xl transition-all duration-300 overflow-hidden relative z-10 max-w-full`}>
                  <CardContent className="p-6">
                    {/* Step header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <Badge className={`${step.color} text-sm font-bold px-3 py-1 mb-2`}>
                          Step {index + 1}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Step description */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-base">
                      {step.description}
                    </p>
                    
                    {/* Key points */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Points:</h4>
                      {step.details.map((detail: string, i: number) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 text-sm leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 