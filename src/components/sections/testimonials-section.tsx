'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Quote, Building2, Users, MapPin } from 'lucide-react'

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
      text: 'The perfect blend of challenge and fun! We solved the murder mystery just in time and the competitive element really brought out everyone\'s best. Highly recommend for any team looking to bond while exploring Toronto.',
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
    { value: '500+', label: 'Teams Served', icon: Users },
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: '50+', label: 'Company Partners', icon: Building2 }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
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
    <section id="testimonials" className="section-padding bg-gradient-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            What Teams Are{' '}
            <span className="text-gradient">
              Saying
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Don't just take our word for it - hear from teams who've experienced the thrill of solving mysteries together
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white p-8 rounded-2xl shadow-soft hover-lift"
              variants={itemVariants}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-secondary mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-soft hover-lift relative"
            >
              {/* Quote mark accent */}
              <div className="absolute top-6 right-6 text-4xl text-primary/20 font-serif">"</div>
              <div className="absolute bottom-6 left-6 text-4xl text-primary/20 font-serif">"</div>
              
              <div className="relative z-10">
                {/* Quote Icon and Stars */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-6 w-6 text-primary/60" />
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-900 text-lg">{testimonial.name}</span>
                  <span className="text-gray-600">{testimonial.role} @ {testimonial.company}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Users className="h-4 w-4" />
                    <span>{testimonial.teamSize}</span>
                    <span>•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
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
          <div className="bg-gradient-primary rounded-3xl p-12 text-gray-900 shadow-large">
            <motion.div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Own Success Story?
              </h3>
              <p className="text-xl mb-8 text-gray-700">
                Join hundreds of teams who've already discovered the power of mystery-solving team building
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-medium hover-lift"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Your Adventure
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-medium hover-lift"
                >
                  View More Reviews
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 