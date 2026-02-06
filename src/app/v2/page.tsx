'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar, FileCheck, MapPin, Users, Flag, MapPinned, Gift
} from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.', accent: '#0941B3' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions.', accent: '#BD2E00' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure.', accent: '#A28300' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start.', accent: '#2E5090' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries.', accent: '#BD2E00' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.', accent: '#0941B3' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure!', accent: '#A28300' },
]

function StepPanel({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1])
  const numberX = useTransform(scrollYProgress, [0, 0.6], [index % 2 === 0 ? -200 : 200, 0])

  return (
    <div ref={ref} className="min-h-[80vh] flex items-center justify-center relative px-6">
      <motion.div
        className="max-w-4xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center"
        style={{ opacity, y, scale }}
      >
        {/* Number side */}
        <motion.div
          className={`relative ${index % 2 !== 0 ? 'md:order-2' : ''}`}
          style={{ x: numberX }}
        >
          <span
            className="text-[12rem] sm:text-[16rem] font-bold leading-none select-none block"
            style={{ color: `${step.accent}10`, WebkitTextStroke: `2px ${step.accent}25` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: step.accent, boxShadow: `0 20px 60px ${step.accent}40` }}
          >
            <step.icon className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Content side */}
        <div className={index % 2 !== 0 ? 'md:order-1 md:text-right' : ''}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className="text-xs uppercase tracking-[0.25em] font-medium"
              style={{ color: step.accent }}
            >
              Step {index + 1} of 7
            </span>
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {step.title}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed max-w-md" style={{ color: 'var(--text-body)' }}>
              {step.description}
            </p>
            <div className="mt-6 h-1 w-16 rounded-full" style={{ background: step.accent, opacity: 0.4 }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ background: 'var(--soft-gray-200)' }}>
      <motion.div className="h-full rounded-r-full" style={{ width, background: 'var(--primary-blue)' }} />
    </div>
  )
}

export default function V2() {
  return (
    <main className="min-h-screen blog-page" style={{ background: 'var(--pure-white)' }}>
      <ProgressBar />

      {/* Hero header */}
      <div className="min-h-[60vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary-blue) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 font-medium"
            style={{ background: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}
          >
            Your Journey
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]" style={{ color: 'var(--text-primary)' }}>
            From Booking
            <br />
            to <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
          </h2>
          <p className="mt-8 text-lg max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-body)' }}>
            Seven steps to an unforgettable adventure across Toronto.
          </p>
          <motion.div
            className="mt-12"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="w-6 h-10 rounded-full border-2 mx-auto flex justify-center pt-2" style={{ borderColor: 'var(--soft-gray)' }}>
              <div className="w-1.5 h-3 rounded-full" style={{ background: 'var(--primary-blue)' }} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Step panels */}
      {steps.map((step, i) => (
        <StepPanel key={i} step={step} index={i} />
      ))}

      {/* Final CTA */}
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to Begin?
          </h3>
          <p className="text-lg mb-8" style={{ color: 'var(--text-body)' }}>Your Toronto adventure awaits.</p>
        </motion.div>
      </div>
    </main>
  )
}
