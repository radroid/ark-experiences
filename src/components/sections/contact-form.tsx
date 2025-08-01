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
  team_size: z.string().optional(),
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

  return (
    <section id="contact" className="relative py-30 overflow-hidden">
      {/* Background - Same as hero section */}
      <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
      </div>
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Ready to Start Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
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
          <Card className="glass-card border-0 shadow-2xl max-w-3xl mx-auto">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === 'success' ? (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours to plan your adventure.
                  </p>
                  <Button
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
                            <FormLabel className="text-gray-700 font-medium">Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500"
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
                            <FormLabel className="text-gray-700 font-medium">Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500"
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
                            <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (416) 555-0123"
                                className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500"
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
                            <FormLabel className="text-gray-700 font-medium">Total Number of People</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500">
                                  <SelectValue placeholder="Select Number of People" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-5">1-5 people</SelectItem>
                                <SelectItem value="6-10">6-10 people</SelectItem>
                                <SelectItem value="11-15">11-15 people</SelectItem>
                                <SelectItem value="16-20">16-20 people</SelectItem>
                                <SelectItem value="21-25">21-25 people</SelectItem>
                                <SelectItem value="26-30">26-30 people</SelectItem>
                                <SelectItem value="31-35">31-35 people</SelectItem>
                                <SelectItem value="36-40">36-40 people</SelectItem>
                                <SelectItem value="41-45">41-45 people</SelectItem>
                                <SelectItem value="46-50">46-50 people</SelectItem>
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
                          <FormLabel className="text-gray-700 font-medium">Preferred Date</FormLabel>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select a date (minimum 2 weeks in advance)"
                            label=""
                            className="bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your team and any special requirements..."
                              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitStatus === 'error' && (
                      <motion.div
                        className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="h-5 w-5" />
                        <span>Failed to send message. Please try again.</span>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
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

                    <p className="text-sm text-gray-500 text-center">
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