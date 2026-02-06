'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, FileCheck, MapPin, Users, Flag, MapPinned, Gift, ChevronDown
} from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date. Choose from various dates and group sizes to find the perfect fit for your team.', color: '#0941B3' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions. Everything you need to know before the big day will be sent to your email.', color: '#BD2E00' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure. Our meeting point is centrally located and easily accessible by TTC.', color: '#A28300' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start. Our game masters will explain the rules, hand out materials, and answer any last questions.', color: '#2E5090' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries. Use your wits, teamwork, and speed to stay ahead of the competition.', color: '#BD2E00' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way. Each challenge tests different skills from problem-solving to physical dexterity.', color: '#0941B3' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure! Top teams also win exclusive prizes and bragging rights.', color: '#A28300' },
]

function AccordionItem({ step, index, isOpen, onToggle }: {
  step: typeof steps[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      className="border-b transition-colors"
      style={{ borderColor: isOpen ? step.color : 'var(--soft-gray-200)' }}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 px-2 text-left group cursor-pointer"
      >
        {/* Step number */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? step.color : 'transparent',
            color: isOpen ? '#fff' : step.color,
            border: `2px solid ${step.color}`,
            boxShadow: isOpen ? `0 4px 16px ${step.color}30` : 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title + icon */}
        <div className="flex-1 flex items-center gap-3">
          <step.icon
            className="w-5 h-5 flex-shrink-0 transition-colors duration-300"
            style={{ color: isOpen ? step.color : 'var(--soft-gray)' }}
          />
          <h3
            className="text-base sm:text-lg font-bold transition-colors duration-300"
            style={{ color: isOpen ? step.color : 'var(--text-primary)' }}
          >
            {step.title}
          </h3>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: isOpen ? step.color : 'var(--soft-gray)' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-16 sm:pl-[4.5rem] pr-4">
              <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: 'var(--text-body)' }}>
                {step.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-0.5 w-8 rounded-full" style={{ background: step.color, opacity: 0.3 }} />
                <span className="text-xs uppercase tracking-widest font-medium" style={{ color: step.color, opacity: 0.6 }}>
                  {index < 4 ? 'Preparation' : index < 6 ? 'The Race' : 'Celebration'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function V4() {
  const [openIndex, setOpenIndex] = useState(0)

  const progress = ((openIndex + 1) / steps.length) * 100

  return (
    <main className="min-h-screen blog-page" style={{ background: 'var(--pure-white)' }}>
      <section className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}>
            Your Journey
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            From Booking to <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-body)' }}>
            Seven simple steps from signing up to crossing the finish line.
          </p>

          {/* Progress bar */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--soft-gray-200)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--primary-blue)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--primary-blue)' }}>
              {openIndex + 1} / {steps.length}
            </span>
          </div>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="border-t"
          style={{ borderColor: 'var(--soft-gray-200)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {steps.map((step, i) => (
            <AccordionItem
              key={i}
              step={step}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>

        {/* Phase legend */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center">
          {[
            { label: 'Preparation', range: 'Steps 1–4', color: '#0941B3' },
            { label: 'The Race', range: 'Steps 5–6', color: '#BD2E00' },
            { label: 'Celebration', range: 'Step 7', color: '#A28300' },
          ].map((phase) => (
            <div key={phase.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: phase.color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>
                {phase.label} <span style={{ color: 'var(--soft-gray)' }}>({phase.range})</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
