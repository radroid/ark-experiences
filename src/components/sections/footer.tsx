'use client'

import { useState, useRef } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const [isFlashlightOn, setIsFlashlightOn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

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
    { name: 'Testimonials', href: '#testimonials' }
  ]

  const bookingLinks = [
    {
      name: 'Book on Eventbrite',
      href: 'https://www.eventbrite.com',
      icon: Calendar
    },
    {
      name: 'Book on Luma',
      href: 'https://lu.ma',
      icon: Calendar
    }
  ]

  return (
    <footer id="footer" style={{backgroundColor: 'var(--yinmn-blue)', color: 'var(--text-on-dark)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Image src="/ark-logo.png" alt="ARK Scavenger Hunt" width={96} height={96} className="h-24 w-auto mr-3" />
            </div>
            <p className="mb-6" style={{color: 'var(--pure-white)', opacity: 0.9}}>
              Experience Toronto with our immersive Cluedo-themed scavenger hunt.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: 'var(--text-on-dark)'}}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="transition-colors hover:opacity-100"
                    style={{color: 'var(--pure-white)', opacity: 0.85}}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Experience */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: 'var(--text-on-dark)'}}>Book Your Adventure</h4>
            <div className="space-y-3">
              {bookingLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:opacity-100 group"
                  style={{color: 'var(--pure-white)', opacity: 0.85}}
                >
                  <div className="p-2 rounded-full" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                    <link.icon className="h-4 w-4" style={{color: 'var(--pure-white)'}} />
                  </div>
                  <span className="group-hover:underline underline-offset-2">{link.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: 'var(--text-on-dark)'}}>Contact Info</h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-full" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                    <info.icon className="h-4 w-4" style={{color: 'var(--pure-white)'}} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{color: 'var(--pure-white)'}}>{info.title}</p>
                     {info.href ? (
                       <a
                         href={info.href}
                         className="text-sm hover:underline underline-offset-2 break-all"
                         style={{color: 'var(--soft-gray)'}}
                       >
                         {info.details}
                       </a>
                     ) : (
                       <p className="text-sm" style={{color: 'var(--soft-gray)'}}>{info.details}</p>
                     )}
                    <p className="text-xs" style={{color: 'var(--pure-white)', opacity: 0.8}}>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Title Section - Full Width with UV Effect */}
        <div className="mt-12 pt-8 border-t" style={{borderColor: 'var(--safe-black-800)'}}>
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
                 style={{ 
                   color: 'var(--pure-white)',
                   opacity: isFlashlightOn ? 0 : 1 
                 }}
               >
                 ARK Scavenger Hunt
               </h3>
              
              {/* Hidden Message - Only visible through UV light */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-[4vw] font-bold"
                style={{
                  color: 'var(--soft-gray)',
                  textShadow: '0 0 10px var(--soft-gray)',
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
                      var(--highlight-gold-300) 0%, 
                      var(--highlight-gold-200) 30%, 
                      var(--highlight-gold-100) 50%, 
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
                      var(--soft-gray-600) 0%, 
                      var(--soft-gray-400) 40%, 
                      transparent 70%)`,
                    borderRadius: '50%',
                    boxShadow: '0 0 20px var(--soft-gray-500)'
                  }}
                />
              )}
            </div>
            
            <p className="text-sm mt-6" style={{color: 'var(--pure-white)', opacity: 0.8}}>
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