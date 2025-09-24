'use client'

import { useState } from 'react'
import { motion, easeOut } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button-2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  Send, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  team_size: z.string().min(1, 'Please select team size').optional(),
  preferred_date: z.date().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      team_size: '',
      preferred_date: undefined,
      message: '',
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
        body: JSON.stringify({
          ...data,
          preferred_date: data.preferred_date ? data.preferred_date.toISOString().split('T')[0] : undefined,
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        // Scroll to success message
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        console.error('Server error:', responseData.error)
        throw new Error(responseData.error || 'Failed to submit form')
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

  return (
    <section id="contact" className="relative py-30 overflow-hidden" style={{backgroundColor: 'var(--ghost-white)'}}>
      {/* Subtle floating elements for visual interest */}
      <div className="absolute inset-0 lava-lamp-bg" />
      
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
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.15}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
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
            Ready to Start Your{' '}
            <span style={{color: 'var(--primary-blue)'}}>
              Adventure?
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="glass-card border-0 shadow-2xl max-w-3xl mx-auto overflow-hidden">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold" style={{color: 'var(--text-primary)'}}>
                Contact Us
              </CardTitle>
              <p className="mt-2" style={{color: 'var(--text-body)'}}>Let&apos;s plan your adventure together!</p>
            </CardHeader>
            <CardContent>
              {submitStatus === 'success' ? (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{color: 'var(--highlight-gold)'}} />
                  <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Message Sent!</h3>
                  <p className="mb-6" style={{color: 'var(--text-body)'}}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours to plan your adventure.
                  </p>
                  <Button
                    onClick={() => setSubmitStatus('idle')}
                    className="secondary-button"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="transition-colors"
                                style={{
                                  backgroundColor: 'var(--pure-white)',
                                  borderColor: 'var(--soft-gray-300)',
                                  color: 'var(--safe-black)'
                                }}
                                {...field}
                              />
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
                            <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="transition-colors"
                                style={{
                                  backgroundColor: 'var(--pure-white)',
                                  borderColor: 'var(--soft-gray-300)',
                                  color: 'var(--safe-black)'
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (416) 555-0123"
                                className="transition-colors"
                                style={{
                                  backgroundColor: 'var(--pure-white)',
                                  borderColor: 'var(--soft-gray-300)',
                                  color: 'var(--safe-black)'
                                }}
                                {...field}
                              />
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
                            <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Total Number of People</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger 
                                  className="transition-colors"
                                  style={{
                                    backgroundColor: 'var(--ghost-white-800)',
                                    borderColor: 'var(--caf-noir-300)',
                                    color: 'var(--eerie-black)'
                                  }}
                                >
                                  <SelectValue placeholder="Select Number of People" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-60 overflow-y-auto">
                                <SelectItem value="2">2 people</SelectItem>
                                <SelectItem value="3">3 people</SelectItem>
                                <SelectItem value="4">4 people</SelectItem>
                                <SelectItem value="5">5 people</SelectItem>
                                <SelectItem value="6">6 people</SelectItem>
                                <SelectItem value="7">7 people</SelectItem>
                                <SelectItem value="8">8 people</SelectItem>
                                <SelectItem value="9">9 people</SelectItem>
                                <SelectItem value="10">10 people</SelectItem>
                                <SelectItem value="15">15 people</SelectItem>
                                <SelectItem value="20">20 people</SelectItem>
                                <SelectItem value="25">25 people</SelectItem>
                                <SelectItem value="30">30+ people</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="preferred_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Preferred Date</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select a date (minimum 2 weeks in advance)"
                              className="date-picker-button"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium" style={{color: 'var(--text-secondary)'}}>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your team and any special requirements..."
                              className="transition-colors min-h-[120px] resize-none"
                              style={{
                                backgroundColor: 'var(--ghost-white-800)',
                                borderColor: 'var(--caf-noir-300)',
                                color: 'var(--eerie-black)'
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitStatus === 'error' && (
                      <motion.div
                        className="flex items-center gap-2 p-4 rounded-lg border"
                        style={{
                          color: 'var(--cocoa-brown)',
                          backgroundColor: 'var(--cocoa-brown-50)',
                          borderColor: 'var(--cocoa-brown-200)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Failed to send message</p>
                          <p className="text-sm" style={{color: 'var(--cocoa-brown-600)'}}>Please check your connection and try again, or contact us directly.</p>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      className="w-full cta-button font-semibold py-3 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-center" style={{color: 'var(--text-muted)'}}>
                      We&apos;ll respond within 24 hours during business days
                    </p>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 