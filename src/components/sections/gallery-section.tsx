'use client'

import { useState, useEffect } from 'react'
import { motion, easeOut } from 'framer-motion'
import { Component as CircularGallery } from '@/components/ui/circular-gallery'
import MobileGalleryModal from '@/components/mobile-gallery-modal'

interface GalleryItem {
  id: number
  type: 'image' | 'video'
  src: string
  alt: string
  title: string
  description: string
  category: 'event' | 'clue' | 'celebration' | 'location'
  thumbnail?: string
  width?: number
  height?: number
  aspectRatio: 'landscape' | 'portrait' | 'square'
}

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [carouselItemClicked, setCarouselItemClicked] = useState<string | null>(null)

  // Updated gallery items with real media files and proper aspect ratios
  const galleryItems: GalleryItem[] = [
    // {
    //   id: 1,
    //   type: 'video',
    //   src: '/gallery/all-teams-celebration.mp4',
    //   alt: 'All teams celebrating together after completing the hunt',
    //   title: 'Ultimate Victory Celebration',
    //   description: 'The epic moment when all teams come together to celebrate after solving the murder mystery - pure joy and triumph!',
    //   category: 'celebration',
    //   thumbnail: '/gallery/all-teams-celebration-thumb.jpg',
    //   width: 1920,
    //   height: 2160,
    //   aspectRatio: 'landscape'
    // },
    {
      id: 2,
      type: 'video',
      src: '/gallery/ar-clue-example.mp4',
      alt: 'AR clue example in action',
      title: 'AR Clue Discovery',
      description: 'Experience the future of scavenger hunting with our cutting-edge AR technology revealing hidden clues in real-world locations!',
      category: 'clue',
      thumbnail: '/gallery/ar-clue-example-thumb.jpg',
      width: 886,
      height: 1920,
      aspectRatio: 'portrait'
    },
    {
      id: 3,
      type: 'video',
      src: '/gallery/team1-solving-timelapse.mp4',
      alt: 'Team 1 solving puzzles in timelapse',
      title: 'Team 1: Solving in Action',
      description: 'Watch Team 1 piece together the clues in this thrilling timelapse - minds working at lightning speed!',
      category: 'event',
      thumbnail: '/gallery/team1-solving-timelapse-thumb.jpg',
      width: 720,
      height: 1280,
      aspectRatio: 'portrait'
    },
    {
      id: 4,
      type: 'image',
      src: '/gallery/billiards-clue-example.jpg',
      alt: 'Billiards table clue discovery',
      title: 'Billiards Mystery Clue',
      description: 'A crucial clue hidden in plain sight at the billiards table - can you spot what the teams discovered here?',
      category: 'clue',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 5,
      type: 'image',
      src: '/gallery/murder-victim.jpg',
      alt: 'The murder victim scene - crucial evidence',
      title: 'The Murder Victim',
      description: 'A crucial piece of evidence in the mystery - who is this victim and what secrets do they hold?',
      category: 'clue',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 6,
      type: 'video',
      src: '/gallery/team2-location8.mp4',
      alt: 'Team 2 exploring location 8',
      title: 'Team 2 at Location #8',
      description: 'Team 2 discovers hidden clues at one of Toronto\'s iconic mystery locations - what will they find?',
      category: 'event',
      thumbnail: '/gallery/team2-location8-thumb.jpg',
      width: 720,
      height: 1280,
      aspectRatio: 'portrait'
    },
    {
      id: 7,
      type: 'image',
      src: '/gallery/team1-location2.jpg',
      alt: 'Team 1 investigating at location 2',
      title: 'Team 1: Location Investigation',
      description: 'Team 1 carefully examines clues at their second location - every detail matters in solving the case!',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 8,
      type: 'image',
      src: '/gallery/team2-location3.jpg',
      alt: 'Team 2 at location 3',
      title: 'Team 2: Hunt in Progress',
      description: 'Team 2 strategizes and searches for vital clues - teamwork makes the dream work!',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 9,
      type: 'image',
      src: '/gallery/team3-location7.jpg',
      alt: 'Team 3 at location 7',
      title: 'Team 3: Final Stretch',
      description: 'Team 3 reaches one of the later locations in their quest - the mystery is almost solved!',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 10,
      type: 'image',
      src: '/gallery/team2-location6.jpg',
      alt: 'Team 2 collaborating at location 6',
      title: 'Team 2: Collaboration Zone',
      description: 'Intense collaboration as Team 2 pieces together multiple clues - the excitement is palpable!',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 11,
      type: 'image',
      src: '/gallery/team3-location6.jpg',
      alt: 'Team 3 investigating at location 6',
      title: 'Team 3: Detective Mode',
      description: 'Team 3 channels their inner detectives, carefully analyzing every clue at this crucial location!',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    },
    {
      id: 12,
      type: 'image',
      src: '/gallery/team3-location3.jpg',
      alt: 'Team 3 at location 3',
      title: 'Team 3: Early Breakthrough',
      description: 'Team 3 makes an early breakthrough at location 3 - could this be the key to solving the entire mystery?',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    }
  ]

  // Convert gallery items to carousel format
  const carouselItems = galleryItems.map(item => ({
    image: item.src, // Use video src for videos, image src for images
    text: item.title,
    isVideo: item.type === 'video'
  }))

  const nextItem = () => {
    if (!selectedItem) return
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem.id)
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setSelectedItem(galleryItems[nextIndex])
  }

  const prevItem = () => {
    if (!selectedItem) return
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem.id)
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setSelectedItem(galleryItems[prevIndex])
  }

  // Handle carousel item click - find the corresponding gallery item
  useEffect(() => {
    if (carouselItemClicked) {
      const item = galleryItems.find(g => g.title === carouselItemClicked)
      if (item) {
        setSelectedItem(item)
      }
      setCarouselItemClicked(null)
    }
  }, [carouselItemClicked, galleryItems])


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
    <section id="gallery" className="relative py-32 overflow-hidden" style={{backgroundColor: 'var(--safe-black)'}}>
      {/* Heading Section - Centered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{color: 'var(--text-on-dark)'}}
            variants={itemVariants}
          >
            Experience{' '}
            <span style={{color: 'var(--highlight-gold)'}}>
              Gallery
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{color: 'var(--pure-white)', opacity: 0.9}}
            variants={itemVariants}
          >
            Immerse yourself in the excitement, mystery, and pure joy of our scavenger hunts through photos and videos
          </motion.p>
        </motion.div>
      </div>

      {/* Circular Gallery Carousel - Full Width */}
      <div className="w-full h-[70vh] overflow-hidden relative">
        <CircularGallery 
          items={carouselItems} 
          bend={3} 
          textColor="#ffffff" 
          borderRadius={0.05}
          onItemClick={(text) => setCarouselItemClicked(text)}
        />
      </div>

      {/* Full-Screen Gallery Modal - All Devices */}
      <MobileGalleryModal
        items={galleryItems}
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        onNext={nextItem}
        onPrev={prevItem}
      />

    </section>
  )
} 