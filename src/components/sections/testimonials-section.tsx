'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

import { Button } from '@/components/ui/button-2'
import { Star, Quote, Building2, Users, MapPin, Calendar } from 'lucide-react'

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
          color: i < rating ? 'var(--cocoa-brown-400)' : 'var(--caf-noir-300)',
          fill: i < rating ? 'var(--cocoa-brown-400)' : 'var(--caf-noir-300)'
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

  return (
    <section id="testimonials" className="pt-40 py-24" style={{backgroundColor: 'var(--ghost-white)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            style={{color: 'var(--text-primary)'}}
            variants={itemVariants}
          >
            What Teams Are{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Saying
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{color: 'var(--text-body)'}}
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
              <div className="text-3xl font-bold mb-1" style={{color: 'var(--text-primary)'}}>{stat.value}</div>
              <div style={{color: 'var(--text-muted)'}}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="h-8 w-8 opacity-60" style={{color: 'var(--yinmn-blue)'}} />
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="leading-relaxed mb-6 italic" style={{color: 'var(--text-body)'}}>
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold" style={{backgroundColor: 'var(--primary-blue)', color: 'var(--pure-white)'}}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold" style={{color: 'var(--text-primary)'}}>{testimonial.name}</div>
                        <div className="text-sm" style={{color: 'var(--text-muted)'}}>{testimonial.role}</div>
                      </div>
                    </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm" style={{color: 'var(--text-muted)'}}>
                          <Building2 className="h-4 w-4" />
                          {testimonial.company}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1" style={{color: 'var(--text-muted)'}}>
                            <Users className="h-4 w-4" />
                            {testimonial.teamSize}
                          </div>
                          <div className="flex items-center gap-1" style={{color: 'var(--text-muted)'}}>
                            <MapPin className="h-4 w-4" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                Join hundreds of teams who&apos;ve already discovered the power of mystery-solving team building
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