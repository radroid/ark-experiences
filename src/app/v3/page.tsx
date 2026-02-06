'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar, FileCheck, MapPin, Users, Flag, MapPinned, Gift
} from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.', color: '#0941B3', bg: 'rgba(9,65,179,0.06)' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions.', color: '#BD2E00', bg: 'rgba(189,46,0,0.06)' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure.', color: '#A28300', bg: 'rgba(162,131,0,0.06)' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start.', color: '#2E5090', bg: 'rgba(46,80,144,0.06)' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries.', color: '#BD2E00', bg: 'rgba(189,46,0,0.06)' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.', color: '#0941B3', bg: 'rgba(9,65,179,0.06)' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure!', color: '#A28300', bg: 'rgba(162,131,0,0.06)' },
]

function TimelineCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 items-center">
      {/* Left content */}
      <motion.div
        className={`${isLeft ? 'block' : 'hidden md:block'}`}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {isLeft ? (
          <div
            className="p-6 rounded-2xl md:ml-auto md:max-w-sm border transition-all hover:shadow-lg group"
            style={{ background: step.bg, borderColor: `${step.color}15` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${step.color}15`, color: step.color }}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: step.color }}>Step {index + 1}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{step.description}</p>
          </div>
        ) : <div />}
      </motion.div>

      {/* Center line node */}
      <div className="hidden md:flex justify-center relative">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 relative"
          style={{ background: step.color, color: '#fff', boxShadow: `0 4px 20px ${step.color}35` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Right content */}
      <motion.div
        className={`${!isLeft ? 'block' : 'hidden md:block'}`}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {!isLeft ? (
          <div
            className="p-6 rounded-2xl md:max-w-sm border transition-all hover:shadow-lg group"
            style={{ background: step.bg, borderColor: `${step.color}15` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${step.color}15`, color: step.color }}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: step.color }}>Step {index + 1}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{step.description}</p>
          </div>
        ) : <div />}
      </motion.div>

      {/* Mobile-only card (shown below the timeline node) */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: step.color, color: '#fff' }}>
            {index + 1}
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${step.color}15`, color: step.color }}>
            <step.icon className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{step.description}</p>
      </motion.div>
    </div>
  )
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block">
      <div className="absolute inset-0" style={{ background: 'var(--soft-gray-200)' }} />
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ scaleY, background: 'var(--primary-blue)' , height: '100%' }}
      />
    </div>
  )
}

export default function V3() {
  return (
    <main className="min-h-screen blog-page" style={{ background: 'var(--pure-white)' }}>
      <section className="container mx-auto px-6 pt-32 pb-24 max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}>
            Your Journey
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            From Booking to <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
          </h2>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-body)' }}>
            Follow the path from your first click to the finish line.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <AnimatedLine />
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <TimelineCard key={i} step={step} index={i} />
            ))}
          </div>

          {/* Terminal dot */}
          <motion.div
            className="hidden md:flex justify-center mt-12"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <div className="w-6 h-6 rounded-full" style={{ background: 'var(--highlight-gold)', boxShadow: '0 0 0 4px var(--pure-white), 0 0 0 6px var(--highlight-gold)' }} />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
