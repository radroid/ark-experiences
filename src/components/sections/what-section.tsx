'use client'

import { motion, easeOut } from 'framer-motion'
import BentoItem from '@/components/ui/bento-item'
import { GridPattern } from '@/components/ui/grid-pattern'
import { Lightbulb, MapPinned, Footprints, Sun, Heart, Brain, Route } from 'lucide-react'

export default function WhatSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut }
    }
  }

  const promises = [
    {
      icon: Lightbulb,
      title: "Creative & Unique Clues",
      description: "Solve puzzles that challenge your mind with our hand-crafted mysteries and riddles",
      color: "var(--accent-orange)",
      gradient: "from-orange-500/10 to-orange-600/5",
      className: "col-span-2 row-span-2"
    },
    {
      icon: MapPinned,
      title: "Popular Locations",
      description: "Discover Toronto's iconic spots and hidden gems",
      color: "var(--primary-blue)",
      gradient: "from-blue-500/10 to-blue-600/5",
      className: "col-span-1 row-span-1"
    },
    {
      icon: Footprints,
      title: "Walkable Experience",
      description: "Enjoy a comfortable 2-hour walking adventure through downtown",
      color: "var(--highlight-gold)",
      gradient: "from-yellow-500/10 to-yellow-600/5",
      className: "col-span-1 row-span-2"
    },
    {
      icon: Sun,
      title: "Fun Outdoor Activity",
      description: "Perfect summer adventure combining exploration and entertainment",
      color: "var(--accent-orange)",
      gradient: "from-orange-500/10 to-red-500/5",
      className: "col-span-1 row-span-1"
    },
    {
      icon: Heart,
      title: "Family & Pocket Friendly",
      description: "Affordable fun for families, friends, and team building",
      color: "var(--primary-blue)",
      gradient: "from-blue-500/10 to-indigo-500/5",
      className: "col-span-2 row-span-1"
    },
    {
      icon: Brain,
      title: "Mentally & Physically Challenging",
      description: "Exercise both your mind and body in this engaging race",
      color: "var(--highlight-gold)",
      gradient: "from-purple-500/10 to-purple-600/5",
      className: "col-span-1 row-span-1"
    },
    {
      icon: Route,
      title: "DETOURs & ROADBLOCKs",
      description: "Navigate strategic challenges inspired by The Amazing Race",
      color: "var(--accent-orange)",
      gradient: "from-red-500/10 to-orange-500/5",
      className: "col-span-1 row-span-1"
    }
  ]

  return (
    <section id="what-section" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Grid Pattern Background - Same as Hero */}
      <GridPattern
        width={100}
        height={95}
        x={-1}
        y={-1}
        strokeDasharray="0"
        className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
      />
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.5}} />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16 pt-15" variants={itemVariants}>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{color: 'var(--text-primary)'}}
          >
            What Makes Us <span style={{color: 'var(--primary-blue)'}}>Special</span>
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{color: 'var(--text-body)'}}
          >
            Experience the perfect blend of adventure, challenge, and fun
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
        >
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={promise.className}
            >
              <BentoItem className="h-full">
                <div className={`h-full flex flex-col justify-between p-6 rounded-xl bg-gradient-to-br ${promise.gradient} backdrop-blur-sm border border-white/20`}>
                  <div>
                    <div 
                      className="inline-flex p-3 rounded-lg mb-4"
                      style={{backgroundColor: `${promise.color}15`}}
                    >
                      <promise.icon 
                        className="h-8 w-8" 
                        style={{color: promise.color, strokeWidth: 2.5}} 
                      />
                    </div>
                    <h3 
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{color: 'var(--text-primary)'}}
                    >
                      {promise.title}
                    </h3>
                    <p 
                      className="text-sm md:text-base leading-relaxed"
                      style={{color: 'var(--text-body)'}}
                    >
                      {promise.description}
                    </p>
                  </div>
                  
                  {/* Decorative element for larger cards */}
                  {promise.className.includes('col-span-2') && (
                    <div className="mt-4 h-2 w-20 rounded-full" style={{backgroundColor: promise.color, opacity: 0.3}} />
                  )}
                </div>
              </BentoItem>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

