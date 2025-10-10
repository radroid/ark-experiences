"use client"

import { AnimeNavBar } from './anime-navbar'
import { Home, Info, Image as ImageIcon, MessageCircle, Mail } from 'lucide-react'

export function AnimeNavBarWrapper() {
  const navItems = [
    { name: 'Home', url: '#hero-section', icon: Home },
    { name: 'How It Works', url: '#how-it-works', icon: Info },
    { name: 'Gallery', url: '#gallery', icon: ImageIcon },
    { name: 'Testimonials', url: '#testimonials', icon: MessageCircle },
    { name: 'Contact', url: '#contact', icon: Mail }
  ]

  return <AnimeNavBar items={navItems} />
}

