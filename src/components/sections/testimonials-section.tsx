'use client'

import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button-2'
import { Star, Calendar } from 'lucide-react'
import { TestimonialsColumn } from '@/components/blocks/testimonials-columns-1'

interface Testimonial {
  id: number
  name: string
  company: string
  role: string
  rating: number
  text: string
  teamSize: string
  location: string
  avatar?: string
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      company: 'TechFlow Solutions',
      role: 'HR Director',
      rating: 5,
      text: 'Our team had an absolutely incredible time! The Cluedo theme was brilliantly executed, and watching our usually quiet developers become master detectives was amazing. This brought our team closer together than any office party ever could.',
      teamSize: '24 people',
      location: 'Downtown Toronto'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      company: 'Creative Marketing Inc',
      role: 'Team Lead',
      rating: 5,
      text: 'The perfect blend of challenge and fun! We solved the murder mystery just in time and the competitive element really brought out everyone&apos;s best. Highly recommend for any team looking to bond while exploring Toronto.',
      teamSize: '18 people',
      location: 'Liberty Village'
    },
    {
      id: 3,
      name: 'Jennifer Walsh',
      company: 'FinanceFirst Group',
      role: 'Operations Manager',
      rating: 5,
      text: 'I was skeptical about team building activities, but this was different. The murder mystery had us all engaged from start to finish. Great mix of problem-solving, teamwork, and exploring the city. Our team is still talking about it!',
      teamSize: '31 people',
      location: 'Financial District'
    },
    {
      id: 4,
      name: 'David Kim',
      company: 'StartupHub',
      role: 'CEO',
      rating: 5,
      text: 'As a startup, team cohesion is crucial. This scavenger hunt delivered beyond expectations. The combination of mystery-solving and city exploration created natural collaboration opportunities. Worth every penny!',
      teamSize: '12 people',
      location: 'King West'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      company: 'Healthcare Innovation',
      role: 'Project Manager',
      rating: 4,
      text: 'Engaging and well-organized experience. The clues were cleverly designed and the Toronto locations were perfectly chosen. Only minor suggestion would be more time at each location, but overall fantastic!',
      teamSize: '27 people',
      location: 'Harbourfront'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      company: 'Design Studio Pro',
      role: 'Creative Director',
      rating: 5,
      text: 'The attention to detail in the mystery storyline was impressive. Our creative team loved the visual clues and the way everything tied together. Perfect for teams who appreciate good storytelling and design.',
      teamSize: '15 people',
      location: 'Queen Street West'
    }
  ]

  const stats = [
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: 'Since 2024', label: 'Established', icon: Calendar }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="h-4 w-4"
        style={{
          color: i < rating ? 'var(--yinmn-blue)' : 'var(--text-muted)',
          fill: i < rating ? 'var(--yinmn-blue)' : 'transparent'
        }}
      />
    ))
  }

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

  // Simplified testimonials for the columns layout
  const testimonialsSimple = testimonials.map(t => ({
    text: t.text,
    image: '/ark-logo.png',
    name: t.name,
    role: t.role
  }))

  return (
    <section id="testimonials" className="relative pt-40 py-24 overflow-hidden" style={{backgroundColor: 'var(--eerie-black)'}}>
      {/* Dark Lava Lamp Background */}
      <div className="absolute inset-0 dark-lava-lamp-bg" />
      
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
      <div className="absolute inset-0" style={{backgroundColor: 'var(--eerie-black)', opacity: 0.1}} />

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
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
            style={{color: 'var(--pure-white)'}}
            variants={itemVariants}
          >
            What Teams Are{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Saying
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{color: 'var(--text-muted)'}}
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
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{backgroundColor: 'rgba(255,255,255,0.06)'}}>
                <stat.icon className="h-12 w-12" style={{color: 'var(--primary-blue)'}} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{color: 'var(--pure-white)'}}>{stat.value}</div>
              <div style={{color: 'var(--text-muted)'}}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Columns Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <TestimonialsColumn testimonials={testimonialsSimple} duration={18} />
          </motion.div>
          <motion.div className="hidden md:block" variants={itemVariants}>
            <TestimonialsColumn testimonials={testimonialsSimple} duration={20} />
          </motion.div>
          <motion.div className="hidden lg:block" variants={itemVariants}>
            <TestimonialsColumn testimonials={testimonialsSimple} duration={22} />
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="rounded-3xl p-8 md:p-12" style={{backgroundColor: 'var(--primary-blue)', color: 'var(--pure-white)'}}>
            <motion.div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Own Success Story?
              </h3>
              <p className="text-xl mb-8" style={{color: 'var(--pure-white)', opacity: 0.9}}>
                Join the teams who&apos;ve already discovered the power of mystery-solving team building
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="cta-button px-8 py-4 text-lg font-semibold"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Your Adventure
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 