'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { 
  Drawer, 
  DrawerTitle, 
  DrawerContent, 
  DrawerHeader, 
  DrawerDescription,
  DrawerFooter 
} from '@/components/ui/drawer'
import { Button } from './ui/button-2'
import { Input } from './ui/input'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import Image from 'next/image'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailDrawerProps {
  isOpen: boolean
  onClose: () => void
  theme?: 'light' | 'dark'
}

export default function EmailDrawer({ isOpen, onClose, theme = 'light' }: EmailDrawerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with actual API call to save email
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        // Auto-close after success
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        throw new Error('Failed to save email')
      }
    } catch (error) {
      console.error('Error saving email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset()
      setSubmitStatus('idle')
      onClose()
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleClose} theme={theme}>
      <DrawerContent className="max-w-xl mx-auto">
        <DrawerHeader className="text-center pt-5">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full" 
               style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'var(--primary-blue-100)' }}>
            <Image
              src="/mail-icon.png"
              alt="Mail"
              width={96}
              height={96}
              className="h-24 w-24"
              priority={false}
            />
          </div>
          <DrawerTitle className="text-xl font-bold" style={{ color: theme === 'dark' ? 'var(--pure-white)' : 'var(--text-primary)' }}>
            Stay Updated
          </DrawerTitle>
          <DrawerDescription className="text-base" style={{ color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-body)' }}>
            Don't worry, only important emails!
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-24 py-8">
          {submitStatus === 'success' ? (
            <motion.div
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--forest-green)' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? 'var(--pure-white)' : 'var(--text-primary)' }}>
                You're all set!
              </h3>
              <p className="text-sm" style={{ color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-body)' }}>
                We'll send you updates about upcoming events.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium pb-2 pl-1" style={{ color: theme === 'dark' ? 'var(--pure-white)' : 'var(--text-secondary)' }}>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="transition-colors py-7"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'var(--pure-white)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'var(--soft-gray-700)',
                            color: theme === 'dark' ? 'var(--pure-white)' : 'var(--safe-black)'
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
                    className="flex items-center gap-2 p-3 rounded-lg border"
                    style={{
                      color: 'var(--accent-orange)',
                      backgroundColor: 'var(--accent-orange-50)',
                      borderColor: 'var(--accent-orange-200)'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-medium">Failed to save email. Please try again.</p>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 cta-button py-7"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>

        <DrawerFooter className="pt-0">
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}