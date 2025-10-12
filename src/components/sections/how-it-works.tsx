'use client'

import { motion } from 'framer-motion'
import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContainerScroll, CardSticky } from '@/components/blocks/cards-stack'
import { useRef } from 'react'
import { 
  Calendar,
  FileCheck,
  MapPin, 
  Users, 
  Flag,
  MapPinned,
  Gift
} from 'lucide-react'

// Step type definition
type Step = {
  icon: React.ComponentType<{ className?: string; }>;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
  cardBgColor: string;
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const steps: Step[] = [
    {
      icon: Calendar,
      title: 'Book Your Experience',
      description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.',
      iconColor: 'var(--primary-blue)',
      bgColor: 'var(--primary-blue-100)',
      cardBgColor: 'var(--primary-blue-50)'
    },
    {
      icon: FileCheck,
      title: 'Sign Waiver & Get Instructions',
      description: 'Complete your activity waiver and read through the initial game instructions.',
      iconColor: 'var(--accent-orange)',
      bgColor: 'var(--accent-orange-100)',
      cardBgColor: 'var(--accent-orange-50)'
    },
    {
      icon: MapPin,
      title: 'Arrive at Meeting Location',
      description: 'Meet at the designated starting point on the day of your adventure.',
      iconColor: 'var(--highlight-gold)',
      bgColor: 'var(--highlight-gold-100)',
      cardBgColor: 'var(--highlight-gold-50)'
    },
    {
      icon: Users,
      title: 'Get Debriefed',
      description: 'Receive your final briefing, meet other teams, and get ready to start.',
      iconColor: 'var(--primary-blue)',
      bgColor: 'var(--primary-blue-100)',
      cardBgColor: 'var(--primary-blue-50)'
    },
    {
      icon: Flag,
      title: 'RACE STARTS!',
      description: 'The clock begins! Navigate through Toronto solving clues and mysteries.',
      iconColor: 'var(--accent-orange)',
      bgColor: 'var(--accent-orange-200)',
      cardBgColor: 'var(--accent-orange-100)'
    },
    {
      icon: MapPinned,
      title: 'Complete Challenges',
      description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.',
      iconColor: 'var(--primary-blue)',
      bgColor: 'var(--primary-blue-200)',
      cardBgColor: 'var(--primary-blue-100)'
    },
    {
      icon: Gift,
      title: 'Share Feedback & Win',
      description: 'Share your experience feedback and receive a discount code for your next adventure!',
      iconColor: 'var(--highlight-gold)',
      bgColor: 'var(--highlight-gold-200)',
      cardBgColor: 'var(--highlight-gold-100)'
    }
  ]

  return (
    <section 
      id="how-it-works" 
      ref={containerRef} 
      className="container min-h-svh place-content-center pt-25 px-6 xl:px-12"
      style={{backgroundColor: 'var(--pure-white)'}}
    >
      <div className="grid gap-8 md:grid-cols-2 xl:gap-12">
        {/* Sticky Left Side - Title & Description */}
        <div className="left-0 top-0 md:sticky md:h-svh md:py-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge 
              className="mb-4 text-xs uppercase tracking-wide px-3 py-1"
              style={{
                backgroundColor: 'var(--primary-blue-100)',
                color: 'var(--primary-blue)'
              }}
            >
              Your Journey
            </Badge>
            <h2 
              className="mb-6 mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{color: 'var(--text-primary)'}}
            >
              From Booking to{' '}
              <span style={{color: 'var(--primary-blue)'}}>
                Victory
              </span>
            </h2>
            <p 
              className="max-w-prose text-base sm:text-lg leading-relaxed"
              style={{color: 'var(--text-body)'}}
            >
              Your adventure begins the moment you book and continues through an exhilarating race across Toronto. Follow these steps to experience the ultimate Cluedo-style scavenger hunt that will test your teamwork, problem-solving skills, and speed.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Right Side - Stacking Cards */}
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {steps.map((step, index) => (
            <CardSticky 
              key={index} 
              index={index + 2}
              incrementY={30}
              incrementZ={10}
              className="rounded-2xl shadow-2xl backdrop-blur-3xl"
              style={{
                backgroundColor: step.cardBgColor
              }}
            >
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{backgroundColor: step.bgColor, color: step.iconColor}}
                    >
                      <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                  <h3 
                    className="text-2xl sm:text-3xl font-bold"
                    style={{color: step.iconColor}}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </h3>
                </div>

                <div className="space-y-4">
                  <h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
                    style={{color: 'var(--text-primary)'}}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base lg:text-lg leading-relaxed"
                    style={{color: 'var(--text-body)'}}
                  >
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  )
}

