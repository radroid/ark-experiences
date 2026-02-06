'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, easeOut } from 'framer-motion'
import { Play } from 'lucide-react'
import MobileGalleryModal from '@/components/mobile-gallery-modal'
import Image from 'next/image'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const galleryItems: GalleryItem[] = useMemo(() => [
    {
      id: 2,
      type: 'video',
      src: '/gallery-optimized/ar-clue-example.mp4',
      alt: 'AR clue example in action',
      title: 'AR Clue Discovery',
      description: 'Experience the future of scavenger hunting with our cutting-edge AR technology revealing hidden clues in real-world locations!',
      category: 'clue',
      thumbnail: '/gallery-optimized/ar-clue-example-thumb.webp',
      width: 886,
      height: 1920,
      aspectRatio: 'portrait'
    },
    {
      id: 3,
      type: 'video',
      src: '/gallery-optimized/team1-solving-timelapse.mp4',
      alt: 'Team 1 solving puzzles in timelapse',
      title: 'Team 1: Solving in Action',
      description: 'Watch Team 1 piece together the clues in this thrilling timelapse - minds working at lightning speed!',
      category: 'event',
      thumbnail: '/gallery-optimized/team1-solving-timelapse-thumb.webp',
      width: 720,
      height: 1280,
      aspectRatio: 'portrait'
    },
    {
      id: 4,
      type: 'image',
      src: '/gallery-optimized/billiards-clue-example.webp',
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
      src: '/gallery-optimized/murder-victim.webp',
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
      src: '/gallery-optimized/team2-location8.mp4',
      alt: 'Team 2 exploring location 8',
      title: 'Team 2 at Location #8',
      description: 'Team 2 discovers hidden clues at one of Toronto\'s iconic mystery locations - what will they find?',
      category: 'event',
      thumbnail: '/gallery-optimized/team2-location8-thumb.webp',
      width: 720,
      height: 1280,
      aspectRatio: 'portrait'
    },
    {
      id: 7,
      type: 'image',
      src: '/gallery-optimized/team1-location2.webp',
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
      src: '/gallery-optimized/team2-location3.webp',
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
      src: '/gallery-optimized/team3-location7.webp',
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
      src: '/gallery-optimized/team2-location6.webp',
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
      src: '/gallery-optimized/team3-location6.webp',
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
      src: '/gallery-optimized/team3-location3.webp',
      alt: 'Team 3 at location 3',
      title: 'Team 3: Early Breakthrough',
      description: 'Team 3 makes an early breakthrough at location 3 - could this be the key to solving the entire mystery?',
      category: 'event',
      width: 1024,
      height: 768,
      aspectRatio: 'landscape'
    }
  ], [])

  // Height-aware 3-column distribution for masonry layout
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = [[], [], []]
    const heights = [0, 0, 0]
    galleryItems.forEach(item => {
      const shortest = heights.indexOf(Math.min(...heights))
      cols[shortest].push(item)
      heights[shortest] += item.aspectRatio === 'portrait' ? 1.6 : item.aspectRatio === 'square' ? 1 : 0.75
    })
    return cols
  }, [galleryItems])

  const nextItem = () => {
    if (!selectedItem) return
    const idx = galleryItems.findIndex(item => item.id === selectedItem.id)
    setSelectedItem(galleryItems[(idx + 1) % galleryItems.length])
  }

  const prevItem = () => {
    if (!selectedItem) return
    const idx = galleryItems.findIndex(item => item.id === selectedItem.id)
    setSelectedItem(galleryItems[(idx - 1 + galleryItems.length) % galleryItems.length])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.1 }
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
    <section id="gallery" className="relative py-32 overflow-hidden" style={{ backgroundColor: 'var(--safe-black)' }}>
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-on-dark)' }}
            variants={itemVariants}
          >
            Experience{' '}
            <span style={{ color: 'var(--highlight-gold)' }}>Gallery</span>
          </motion.h2>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--pure-white)', opacity: 0.9 }}
            variants={itemVariants}
          >
            Immerse yourself in the excitement, mystery, and pure joy of our scavenger hunts through photos and videos
          </motion.p>
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: item.aspectRatio === 'portrait' ? '9/16' : item.aspectRatio === 'square' ? '1/1' : '4/3' }}
                  onClick={() => setSelectedItem(item)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.type === 'video' ? (
                    <video src={item.src} poster={item.thumbnail} className="w-full h-full object-cover" preload="none" muted playsInline />
                  ) : (
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <p className="text-white font-bold text-base mb-1">{item.title}</p>
                    <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <MobileGalleryModal
        items={galleryItems}
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        onNext={nextItem}
        onPrev={prevItem}
        isMobile={isMobile}
      />
    </section>
  )
}
