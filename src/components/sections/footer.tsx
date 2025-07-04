'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button-2'

export default function Footer() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'team@funwithark.ca',
      description: 'Get in touch for questions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (647) 839-8849',
      description: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Toronto Area',
      details: 'GTA & Surrounding Areas',
      description: 'We serve the Greater Toronto Area'
    }
  ]

  const quickLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Teams Served' },
    { icon: Calendar, value: '98%', label: 'Satisfaction Rate' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/ark-logo.png" alt="ARK Scavenger Hunt" className="h-12 w-auto mr-3" />
              <h3 className="text-2xl font-bold">ARK Scavenger Hunt</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience Toronto like never before with our immersive Cluedo-themed scavenger hunt. 
              Navigate iconic locations, solve intricate puzzles, and create unforgettable memories with your team.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Plan Your Adventure
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-600/20">
                    <info.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{info.title}</p>
                    <p className="text-sm text-blue-400">{info.details}</p>
                    <p className="text-xs text-gray-400">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-full bg-blue-600/20">
                    <stat.icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ARK Scavenger Hunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 