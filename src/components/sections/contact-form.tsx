'use client'

import { useState } from 'react'
import { motion, easeOut } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle,
  Users,
  Calendar
} from 'lucide-react'

const contactFormSchema = z.object({
  company_name: z.string().min(2, 'Company name must be at least 2 characters'),
  contact_person: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  team_size: z.string().optional(),
  preferred_date: z.string().optional(),
  special_requirements: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      company_name: '',
      contact_person: '',
      email: '',
      phone: '',
      team_size: '',
      preferred_date: '',
      special_requirements: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@arkscavengerhunt.com',
      description: 'Get in touch for questions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (416) 555-0123',
      description: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Toronto Area',
      details: 'GTA & Surrounding Areas',
      description: 'We serve the Greater Toronto Area'
    }
  ]

  return (
    <section id="contact" className="pt-40 py-24 handdrawn-section-bg handdrawn-newspaper-bg relative overflow-hidden">
      {/* Hand-drawn detective/map accents */}
      <svg className="absolute left-0 top-0 w-40 h-40 z-0" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="40" rx="18" ry="8" fill="#b6a77a" opacity="0.13"/>
        <ellipse cx="60" cy="60" rx="8" ry="4" fill="#b6a77a" opacity="0.13"/>
        <ellipse cx="80" cy="80" rx="12" ry="6" fill="#b6a77a" opacity="0.13"/>
        <ellipse cx="100" cy="100" rx="7" ry="3" fill="#b6a77a" opacity="0.13"/>
        <circle cx="120" cy="120" r="12" fill="#ffe066" stroke="#b6a77a" stroke-width="2"/>
        <rect x="110" y="110" width="20" height="8" rx="4" fill="#fffbe6" stroke="#b6a77a" stroke-width="1.5"/>
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 handdrawn-heading"
            variants={itemVariants}
          >
            Ready to Solve the{' '}
            <span className="handdrawn-underline text-yellow-700">
              Mystery?
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto handdrawn-paragraph"
            variants={itemVariants}
          >
            Book your team-building adventure today and experience the thrill of solving Toronto's greatest mystery
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <p className="text-gray-700 text-lg mb-8">
                Ready to challenge your team? Contact us to plan your perfect mystery adventure. 
                We'll customize the experience to your group size and preferences.
              </p>
            </motion.div>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="handdrawn-card rounded-xl p-6"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full handdrawn-card-accent">
                      <info.icon className="h-6 w-6 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 handdrawn-card-title">{info.title}</h4>
                      <p className="text-yellow-700 font-medium mb-1">{info.details}</p>
                      <p className="text-gray-600 text-sm handdrawn-card-desc">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            className="handdrawn-card p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="Your company or group name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="you@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="(optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Size</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="e.g. 12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferred_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <Input className="handdrawn-input" placeholder="e.g. 2024-07-15" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="special_requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requirements</FormLabel>
                      <FormControl>
                        <Textarea className="handdrawn-input" placeholder="Let us know if you have any special requests or requirements" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="handdrawn-btn w-full text-lg font-bold flex items-center justify-center" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-700 mt-2">
                    <CheckCircle className="h-5 w-5" />
                    Message sent! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-700 mt-2">
                    <AlertCircle className="h-5 w-5" />
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 