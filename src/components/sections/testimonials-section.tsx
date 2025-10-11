'use client'

import { motion, easeOut } from 'framer-motion'
import { Star, Calendar } from 'lucide-react'
import { TestimonialsColumn, TestimonialItem } from '@/components/blocks/testimonials-columns-1'


export default function TestimonialsSection() {
  const testimonials: TestimonialItem[] = [
    {
      text: 'Our team had an absolutely incredible time! The Cluedo theme was brilliantly executed, and watching our usually quiet developers become master detectives was amazing. This brought our team closer together than any office party ever could.',
      name: 'Sarah Chen',
      role: 'HR Director, TechFlow Solutions'
    },
    {
      text: 'The perfect blend of challenge and fun! We solved the murder mystery just in time and the competitive element really brought out everyone\'s best. Highly recommend for any team looking to bond while exploring Toronto.',
      name: 'Marcus Rodriguez',
      role: 'Team Lead, Creative Marketing Inc'
    },
    {
      text: 'I was skeptical about team building activities, but this was different. The murder mystery had us all engaged from start to finish. Great mix of problem-solving, teamwork, and exploring the city. Our team is still talking about it!',
      name: 'Jennifer Walsh',
      role: 'Operations Manager, FinanceFirst Group'
    },
    {
      text: 'As a startup, team cohesion is crucial. This scavenger hunt delivered beyond expectations. The combination of mystery-solving and city exploration created natural collaboration opportunities. Worth every penny!',
      name: 'David Kim',
      role: 'CEO, StartupHub'
    },
    {
      text: 'Engaging and well-organized experience. The clues were cleverly designed and the Toronto locations were perfectly chosen. Only minor suggestion would be more time at each location, but overall fantastic!',
      name: 'Lisa Thompson',
      role: 'Project Manager, Healthcare Innovation'
    },
    {
      text: 'The attention to detail in the mystery storyline was impressive. Our creative team loved the visual clues and the way everything tied together. Perfect for teams who appreciate good storytelling and design.',
      name: 'Ahmed Hassan',
      role: 'Creative Director, Design Studio Pro'
    }
  ]

  const stats = [
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: 'Since 2024', label: 'Established', icon: Calendar }
  ]


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  }

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" style={{backgroundColor: 'var(--safe-black)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{color: 'var(--text-on-dark)'}}
            variants={itemVariants}
          >
            What Teams Are{' '}
            <span style={{color: 'var(--highlight-gold)'}}>
              Saying
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{color: 'var(--pure-white)', opacity: 0.9}}
            variants={itemVariants}
          >
            Don&apos;t just take our word for it - hear from teams who&apos;ve experienced the thrill of solving mysteries together
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-2/3 mx-auto justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{backgroundColor: 'var(--primary-blue-100)'}}>
                <stat.icon className="h-12 w-12" style={{color: 'var(--primary-blue)'}} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{color: 'var(--pure-white)'}}>{stat.value}</div>
              <div style={{color: 'var(--pure-white)', opacity: 0.8}}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Columns */}
        <motion.div 
          className="relative h-96 overflow-hidden mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex gap-6">
            <TestimonialsColumn
              className="flex-1"
              testimonials={testimonials}
              duration={15}
            />
            <TestimonialsColumn
              className="flex-1"
              testimonials={testimonials}
              duration={20}
            />
            <TestimonialsColumn
              className="flex-1"
              testimonials={testimonials}
              duration={25}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 