'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar, FileCheck, MapPin, Users, Flag, MapPinned, Gift
} from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Book Your Experience', description: 'Reserve your spot through Eventbrite or Luma and secure your adventure date.', color: '#0941B3' },
  { icon: FileCheck, title: 'Sign Waiver & Get Instructions', description: 'Complete your activity waiver and read through the initial game instructions.', color: '#BD2E00' },
  { icon: MapPin, title: 'Arrive at Meeting Location', description: 'Meet at the designated starting point on the day of your adventure.', color: '#A28300' },
  { icon: Users, title: 'Get Debriefed', description: 'Receive your final briefing, meet other teams, and get ready to start.', color: '#0941B3' },
  { icon: Flag, title: 'RACE STARTS!', description: 'The clock begins! Navigate through Toronto solving clues and mysteries.', color: '#BD2E00' },
  { icon: MapPinned, title: 'Complete Challenges', description: 'Navigate to the final location, completing a DETOUR and a ROADBLOCK along the way.', color: '#0941B3' },
  { icon: Gift, title: 'Share Feedback & Win', description: 'Share your experience feedback and receive a discount code for your next adventure!', color: '#A28300' },
]

function TrailPath() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-32 hidden md:block">
    <svg
      className="w-full h-full"
      viewBox="0 0 120 1000"
      preserveAspectRatio="none"
      fill="none"
      style={{ height: '100%' }}
    >
      <path
        d="M60 0 C60 50, 20 80, 20 140 S100 200, 100 260 S20 340, 20 400 S100 460, 100 520 S20 600, 20 660 S100 720, 100 780 S60 860, 60 1000"
        stroke="var(--soft-gray-300)"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <motion.path
        d="M60 0 C60 50, 20 80, 20 140 S100 200, 100 260 S20 340, 20 400 S100 460, 100 520 S20 600, 20 660 S100 720, 100 780 S60 860, 60 1000"
        stroke="var(--primary-blue)"
        strokeWidth="3"
        style={{ pathLength }}
      />
    </svg>
    </div>
  )
}

export default function V1() {
  return (
    <main className="min-h-screen overflow-x-hidden blog-page" style={{ background: 'var(--pure-white)' }}>
      <section className="container mx-auto px-6 pt-32 pb-24 max-w-5xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'var(--primary-blue-100)', color: 'var(--primary-blue)' }}
          >
            Your Journey
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            From Booking to <span style={{ color: 'var(--primary-blue)' }}>Victory</span>
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-body)' }}>
            Your adventure begins the moment you book and continues through an exhilarating race across Toronto.
          </p>
        </motion.div>

        {/* Zigzag trail */}
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
                    <div className={`p-6 sm:p-8 rounded-2xl border transition-shadow hover:shadow-xl ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}
                      style={{
                        maxWidth: 420,
                        background: 'var(--pure-white)',
                        borderColor: 'var(--soft-gray-200)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.color}15`, color: step.color }}
                        >
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold" style={{ color: step.color, opacity: 0.3 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: step.color, color: 'var(--pure-white)', boxShadow: `0 0 0 4px var(--pure-white), 0 0 0 6px ${step.color}30` }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
