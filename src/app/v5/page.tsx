'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar, FileCheck, MapPin, Users, Flag, MapPinned, Gift, ArrowRight
} from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.', color: '#0941B3', phase: 'prep' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions.', color: '#BD2E00', phase: 'prep' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure.', color: '#A28300', phase: 'prep' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start.', color: '#2E5090', phase: 'prep' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries.', color: '#BD2E00', phase: 'race' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.', color: '#0941B3', phase: 'race' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure!', color: '#A28300', phase: 'win' },
]

function BentoCard({ step, index, className, featured = false }: {
  step: typeof steps[0]
  index: number
  className?: string
  featured?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 })

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden cursor-default group ${className}`}
      style={{
        background: `${step.color}08`,
        border: `1px solid ${step.color}15`,
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: `0 20px 40px ${step.color}12` }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${step.color}05, ${step.color}10)` }}
      />

      <div className={`relative z-10 ${featured ? 'p-8 sm:p-10' : 'p-6 sm:p-7'}`}>
        {/* Top row: number + icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`${featured ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
            style={{ background: `${step.color}12`, color: step.color }}
          >
            <step.icon className={featured ? 'w-7 h-7' : 'w-5 h-5'} />
          </div>
          <span
            className={`${featured ? 'text-5xl' : 'text-3xl'} font-bold leading-none`}
            style={{ color: `${step.color}18` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <h3
          className={`${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-bold mb-2 tracking-tight`}
          style={{ color: 'var(--text-primary)' }}
        >
          {step.title}
        </h3>
        <p
          className={`${featured ? 'text-base' : 'text-sm'} leading-relaxed`}
          style={{ color: 'var(--text-body)' }}
        >
          {step.description}
        </p>

        {/* Phase tag */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: step.color }} />
          <span className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: step.color }}>
            {step.phase === 'prep' ? 'Preparation' : step.phase === 'race' ? 'The Race' : 'Victory'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function V5() {
  return (
    <main className="min-h-screen blog-page" style={{ background: 'var(--pure-white)' }}>
      <section className="container mx-auto px-6 pt-32 pb-24 max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}>
              Your Journey
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              From Booking to <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg leading-relaxed max-w-md lg:text-right" style={{ color: 'var(--text-body)' }}>
            Seven steps from sign-up to celebration across Toronto.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Row 1: steps 1, 2, 3 */}
          <BentoCard step={steps[0]} index={0} />
          <BentoCard step={steps[1]} index={1} />
          <BentoCard step={steps[2]} index={2} />

          {/* Row 2: step 4 (normal), step 5 RACE STARTS (featured, spans 2 cols) */}
          <BentoCard step={steps[3]} index={3} />
          <BentoCard step={steps[4]} index={4} featured className="sm:col-span-1 lg:col-span-2" />

          {/* Row 3: step 6 (spans 2 cols), step 7 */}
          <BentoCard step={steps[5]} index={5} className="sm:col-span-1 lg:col-span-2" />
          <BentoCard step={steps[6]} index={6} />
        </div>

        {/* Bottom connector */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: `${step.color}12`, color: step.color }}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-3 h-3" style={{ color: 'var(--soft-gray)' }} />
              )}
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
