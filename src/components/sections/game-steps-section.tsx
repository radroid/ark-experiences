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
      iconColor: 'var(--primary-blue)',
      bgColor: 'var(--primary-blue-20)',
      cardBgColor: 'var(--primary-blue-50)'
    },
    {
      icon: Search,
      title: 'Solve Clues',
      description: 'Find hidden clues at each location. Some lead to the next spot, others reveal murder details.',
      details: ['Location clues', 'Murder mystery clues', 'Photo evidence required'],
      iconColor: 'var(--accent-orange)',
      bgColor: 'var(--accent-orange-100)',
      cardBgColor: 'var(--accent-orange-50)'
    },
    {
      icon: MapPin,
      title: 'Navigate Toronto',
      description: 'Visit 9 iconic Toronto locations, each holding clues to the next destination.',
      details: ['9 unique locations', 'Toronto landmarks', 'GPS coordinates provided'],
      iconColor: 'var(--highlight-gold)',
      bgColor: 'var(--highlight-gold-100)',
      cardBgColor: 'var(--highlight-gold-50)'
    },
    {
      icon: Puzzle,
      title: 'Piece Together',
      description: 'Collect evidence to determine the weapon, person, and motive behind the murder.',
      details: ['Weapon identification', 'Suspect analysis', 'Motive discovery'],
      iconColor: 'var(--soft-green)',
      bgColor: 'var(--soft-green-300)',
      cardBgColor: 'var(--soft-green-100)'
    },
    {
      icon: Trophy,
      title: 'Win the Game',
      description: 'First team to solve the murder correctly wins the grand prize!',
      details: ['Speed matters', 'Accuracy counts', 'Team collaboration wins'],
      iconColor: 'var(--accent-orange)',
      bgColor: 'var(--accent-orange-200)',
      cardBgColor: 'var(--accent-orange-100)'
    }
  ]

  // Mobile-first rendering strategy
  if (isMobile) {
    return <MobileGameStepsSection steps={steps} />
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Continuous Timeline - Spans entire section height, above backgrounds but below content */}
      <div 
        className="hidden lg:block absolute w-1 z-0"
        style={{ 
          background: 'var(--primary-blue)',
          top: '60vh', // Start from title area
          height: 'calc(100% - 60vh)', // Extend to bottom with some padding
          left: 'calc(50% - 0.125rem)' // Center without transform
        }}
      />

      {/* Title Section */}
      <section id="how-it-works" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden" style={{backgroundColor: 'var(--ghost-white)'}}>
        {/* Light Lava Lamp Background */}
        <div className="absolute inset-0 lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay for better text readability */}
        <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.15}} />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8"
            style={{color: 'var(--text-primary)'}}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How the Mystery{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl max-w-3xl mx-auto pb-12 lg:pb-20 px-4"
            style={{color: 'var(--text-body)'}}
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
        <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center pl-4 lg:pl-10 pr-8 lg:pr-12 overflow-hidden self-start z-20" style={{backgroundColor: 'var(--ghost-white)'}}>
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
                  <div className="flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 max-w-full" style={{
                    backgroundColor: isActive ? 'var(--ghost-white-950)' : 'var(--ghost-white-800)',
                    border: isActive ? '2px solid var(--caf-noir-200)' : '1px solid transparent'
                  }}>
                    <motion.div 
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300"
                      style={{backgroundColor: step.bgColor, color: step.iconColor}}
                      animate={{
                        scale: isActive ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    </motion.div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="text-xs lg:text-sm font-bold px-2 lg:px-3 py-1" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
                          Step {index + 1}
                        </Badge>
                      </div>
                      <motion.h3 
                        className="text-lg lg:text-2xl font-bold transition-colors duration-300"
                        animate={{
                          color: isActive ? 'var(--yinmn-blue)' : 'var(--text-secondary)'
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
          <div
            key={`node-${index}`}
            className="hidden lg:block absolute w-6 h-6 rounded-full border-1 shadow-lg z-20"
            style={{ 
              backgroundColor: 'var(--pure-white)', 
              borderColor: 'var(--soft-gray-300)',
              top: `${18 + (index * 99)}vh`, // Distribute nodes along the timeline
              left: 'calc(50% - 0.75rem)' // Center without transform
            }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center opacity-90" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
              <step.icon className="h-3 w-3" />
            </div>
          </div>
        ))}

        {/* Scrollable Right Side - Step Details */}
        <div className="w-1/2 ml-auto overflow-x-hidden z-20">
          {steps.map((step, index) => (
            <section 
              key={index}
              className="min-h-screen flex items-center justify-center pl-8 lg:pl-12 pr-4 lg:pr-16 relative"
              style={{backgroundColor: 'var(--ghost-white)'}}
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
                <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 max-w-full" style={{backgroundColor: step.cardBgColor}}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="text-center mb-6 lg:mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full mb-4 lg:mb-6" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
                        <step.icon className="h-8 w-8 lg:h-10 lg:w-10" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4" style={{color: 'var(--text-primary)'}}>{step.title}</h3>
                      <p className="text-base lg:text-lg leading-relaxed" style={{color: 'var(--text-body)'}}>
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 lg:space-y-4">
                      <h4 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{color: 'var(--text-primary)'}}>Key Points:</h4>
                      {step.details.map((detail: string, i: number) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl shadow-sm"
                          style={{backgroundColor: 'var(--ghost-white)'}}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 mt-0.5 flex-shrink-0" style={{color: 'var(--forest-green)'}} />
                          <p className="text-sm lg:text-base leading-relaxed" style={{color: 'var(--text-body)'}}>{detail}</p>
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
  iconColor: string;
  bgColor: string;
  cardBgColor: string;
}

// Mobile-optimized component
function MobileGameStepsSection({ steps }: { steps: Step[] }) {
  return (
    <div className="relative overflow-hidden w-full" style={{backgroundColor: 'var(--ghost-white)'}}>
      {/* Mobile Continuous Timeline - Behind content */}
      {/* <div 
        className="absolute w-1 z-0"
        style={{
          background: 'var(--primary-blue)',
          top: '60vh', // Start after title section
          height: 'calc(100% - 60vh)', // Extend to bottom
          left: 'calc(50% - 0.125rem)' // Center without transform
        }}
      /> */}

      {/* Mobile Title Section */}
      <section id="how-it-works" className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden z-20">
        {/* Light Lava Lamp Background */}
        <div className="absolute inset-0 lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay for better text readability - No stacking context */}
        <div className="absolute inset-0 opacity-15" style={{backgroundColor: 'var(--pure-white)'}} />

        <div className="text-center max-w-2xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            style={{color: 'var(--text-primary)'}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How the Mystery{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg leading-relaxed mb-8"
            style={{color: 'var(--text-body)'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
          
          {/* Mobile-friendly scroll indicator */}
          <motion.div
            className="w-16 h-8 mx-auto border-2 rounded-full flex items-center justify-center"
            style={{borderColor: 'var(--primary-blue-200)'}}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{backgroundColor: 'var(--primary-blue)'}}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Steps - Single Column Layout */}
      <div className="px-4 pb-12 relative w-full z-20 overflow-x-hidden">
        <div className="max-w-lg mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Timeline Node for each step */}
              <div
                className="absolute w-6 h-6 rounded-full border-1 shadow-lg z-20 -top-4"
                style={{
                  backgroundColor: 'var(--pure-white)', 
                  borderColor: 'var(--soft-gray-300)',
                  left: 'calc(50% - 0.75rem)' // Center without transform
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center opacity-90" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
                  <step.icon className="h-3 w-3" />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="border-0 space-y-3 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative z-30 max-w-full" style={{backgroundColor: step.cardBgColor}}>
                  <CardContent className="p-6">
                    {/* Step header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <Badge className="text-sm font-bold px-3 py-1 mb-2" style={{backgroundColor: step.bgColor, color: step.iconColor}}>
                          Step {index + 1}
                        </Badge>
                        <h3 className="text-xl font-bold" style={{color: 'var(--text-primary)'}}>{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Step description */}
                    <p className="leading-relaxed mb-6 text-base" style={{color: 'var(--caf-noir-600)'}}>
                      {step.description}
                    </p>
                    
                    {/* Key points */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Key Points:</h4>
                      {step.details.map((detail: string, i: number) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg shadow-sm"
                          style={{backgroundColor: 'var(--ghost-white)'}}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: 'var(--forest-green)'}} />
                          <p className="text-sm leading-relaxed" style={{color: 'var(--text-body)'}}>{detail}</p>
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