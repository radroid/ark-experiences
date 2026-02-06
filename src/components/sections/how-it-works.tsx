'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
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

type Step = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}

const steps: Step[] = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.', color: 'var(--primary-blue)' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions.', color: 'var(--accent-orange)' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure.', color: 'var(--highlight-gold)' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start.', color: 'var(--primary-blue)' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries.', color: 'var(--accent-orange)' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.', color: 'var(--primary-blue)' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure!', color: 'var(--highlight-gold)' },
]

function TrailPath() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-32 hidden md:block">
      <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none" fill="none" style={{ height: '100%' }}>
        <path
          d="M60 0 C60 50, 20 80, 20 140 S100 200, 100 260 S20 340, 20 400 S100 460, 100 520 S20 600, 20 660 S100 720, 100 780 S60 860, 60 1000"
          stroke="var(--soft-gray-300)" strokeWidth="2" strokeDasharray="8 6"
        />
        <motion.path
          d="M60 0 C60 50, 20 80, 20 140 S100 200, 100 260 S20 340, 20 400 S100 460, 100 520 S20 600, 20 660 S100 720, 100 780 S60 860, 60 1000"
          stroke="var(--primary-blue)" strokeWidth="3" style={{ pathLength }}
        />
      </svg>
    </div>
  )
}

function TiltCard({ step, index, isLeft }: { step: Step; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 })

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`p-6 sm:p-8 rounded-2xl border cursor-default group ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}
      style={{
        maxWidth: 420,
        background: 'var(--pure-white)',
        borderColor: 'var(--soft-gray-200)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25 }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${step.color} 3%, transparent), color-mix(in srgb, ${step.color} 8%, transparent))` }}
      />

      <div className="relative z-10">
        <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
            style={{ background: `color-mix(in srgb, ${step.color} 10%, transparent)`, color: step.color }}
          >
            <step.icon className="w-6 h-6" />
          </div>
          <span className="text-3xl font-bold" style={{ color: step.color, opacity: 0.25 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-6 xl:px-12 pt-25 pb-24 max-w-5xl"
      style={{ backgroundColor: 'var(--pure-white)' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Badge
          className="mb-4 text-xs uppercase tracking-wide px-3 py-1"
          style={{ backgroundColor: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}
        >
          Your Journey
        </Badge>
        <h2
          className="mb-6 mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          From Booking to{' '}
          <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
        </h2>
        <p
          className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--text-body)' }}
        >
          Your adventure begins the moment you book and continues through an exhilarating race across Toronto. Follow these steps to experience the ultimate Cluedo-style scavenger hunt that will test your teamwork, problem-solving skills, and speed.
        </p>
      </motion.div>

      {/* Zigzag trail with tilt cards */}
      <div className="relative">
        <TrailPath />
        <div className="space-y-12 md:space-y-20">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-16`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                  <TiltCard step={step} index={i} isLeft={isLeft} />
                </div>

                {/* Center numbered dot */}
                <div className="relative z-10 flex-shrink-0 hidden md:block">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      background: step.color,
                      color: 'var(--pure-white)',
                      boxShadow: `0 0 0 4px var(--pure-white), 0 0 0 6px color-mix(in srgb, ${step.color} 30%, transparent)`,
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {i + 1}
                  </motion.div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
