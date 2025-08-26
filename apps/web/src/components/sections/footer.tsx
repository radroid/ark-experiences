'use client'

import { useState, useRef } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight
} from 'lucide-react'
import { Button2 as Button } from '@ark/ui'
import Image from 'next/image'

export default function Footer() {
  const [isFlashlightOn, setIsFlashlightOn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleClick = () => {
    if (isHovering) {
      setIsFlashlightOn(!isFlashlightOn)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsFlashlightOn(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'team@funwithark.ca',
      description: 'Get in touch for questions',
      href: 'mailto:team@funwithark.ca'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (647) 839-8849',
      description: 'Mon-Fri, 9AM-6PM EST',
      href: 'tel:+16478398849'
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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Image src="/ark-logo.png" alt="ARK Scavenger Hunt" width={96} height={96} className="h-24 w-auto mr-3" />
            </div>
            <p className="text-gray-300 mb-6">
              Experience Toronto with our immersive Cluedo-themed scavenger hunt.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Contact Us
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
                     {info.href ? (
                       <a
                         href={info.href}
                         className="text-sm text-blue-400 hover:text-blue-300 hover:underline underline-offset-2 break-all"
                       >
                         {info.details}
                       </a>
                     ) : (
                       <p className="text-sm text-blue-400">{info.details}</p>
                     )}
                    <p className="text-xs text-gray-400">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Title Section - Full Width with UV Effect */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <div 
              ref={titleRef}
              className={`relative inline-block ${isHovering ? (isFlashlightOn ? 'cursor-none' : 'cursor-pointer') : 'cursor-pointer'}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              style={{
                cursor: isHovering && !isFlashlightOn ? `url("data:image/svg+xml,${encodeURIComponent(`
                  <svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='12' y='4' width='8' height='12' fill='%23666' rx='2'/>
                    <rect x='10' y='16' width='12' height='12' fill='%23444' rx='2'/>
                    <circle cx='16' cy='22' r='3' fill='%23FFD700'/>
                    <circle cx='16' cy='22' r='1.5' fill='%23FFF'/>
                  </svg>
                `)}) 16 16, pointer` : undefined
              }}
            >
                             {/* Main Title */}
               <h3 
                 className="text-[8vw] font-bold mb-4 select-none transition-opacity duration-300"
                 style={{ opacity: isFlashlightOn ? 0 : 1 }}
               >
                 ARK Scavenger Hunt
               </h3>
              
              {/* Hidden Message - Only visible through UV light */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-[4vw] font-bold"
                style={{
                  color: '#8B5CF6',
                  textShadow: '0 0 10px #A855F7',
                  opacity: isFlashlightOn ? 1 : 0,
                  maskImage: isFlashlightOn ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 70%)` : 'radial-gradient(circle 0px at 50% 50%, transparent 100%, transparent 100%)',
                  WebkitMaskImage: isFlashlightOn ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 70%)` : 'radial-gradient(circle 0px at 50% 50%, transparent 100%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              >
                🔍 SECRET CODE: ARK25OFF 🔍
              </div>

              {/* UV Light Effect */}
              {isFlashlightOn && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: mousePosition.x - 80,
                    top: mousePosition.y - 80,
                    width: 160,
                    height: 160,
                    background: `radial-gradient(circle, 
                      rgba(139, 92, 246, 0.3) 0%, 
                      rgba(168, 85, 247, 0.2) 30%, 
                      rgba(192, 132, 252, 0.1) 50%, 
                      transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                    animation: 'pulse 2s infinite'
                  }}
                />
              )}

              {/* Flashlight beam effect */}
              {isFlashlightOn && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: mousePosition.x - 40,
                    top: mousePosition.y - 40,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, 
                      rgba(139, 92, 246, 0.6) 0%, 
                      rgba(168, 85, 247, 0.4) 40%, 
                      transparent 70%)`,
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                  }}
                />
              )}
            </div>
            
            <p className="text-gray-400 text-sm mt-6">
              © 2024 ARK Scavenger Hunt. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </footer>
  )
} 