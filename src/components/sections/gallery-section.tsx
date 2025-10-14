'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, easeOut } from 'framer-motion'
import { Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import MobileGalleryModal from '@/components/mobile-gallery-modal'
import Image from 'next/image'

// Lazy load CircularGallery - saves 650KB on initial page load!
const CircularGallery = dynamic(
  () => import('@/components/ui/circular-gallery').then(mod => ({ default: mod.Component })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <div className="text-white text-lg animate-pulse">Loading gallery...</div>
      </div>
    )
  }
)

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
  const [isMobile, setIsMobile] = useState(false)
  const [showAllItems, setShowAllItems] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Updated gallery items with real media files and proper aspect ratios
  const galleryItems: GalleryItem[] = useMemo(() => [
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
      thumbnail: '/gallery-optimized/ar-clue-example-thumb.webp',
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
      src: '/gallery/team2-location8.mp4',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

      {/* Gallery Content - Responsive */}
      <div className="w-full overflow-hidden relative">
        {/* Desktop: Circular Gallery */}
        <div className="hidden md:block h-[70vh]">
          <CircularGallery 
            items={carouselItems} 
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05}
            onItemClick={(text) => setCarouselItemClicked(text)}
          />
        </div>
        
        {/* Mobile: Grid Gallery */}
        <div className="md:hidden px-4 py-8">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {galleryItems.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      className="w-full h-full object-cover"
                      preload="none"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Play button for videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-black ml-1" />
                      </div>
                    </div>
                  )}
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Show More Button - Only show if not all items are displayed */}
            {galleryItems.length > 6 && !showAllItems && (
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-gray-800/50 border-2 border-dashed border-gray-600 flex items-center justify-center"
                onClick={() => setShowAllItems(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 6 * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg font-bold">+</span>
                  </div>
                  <p className="text-gray-400 text-xs">View All</p>
                  <p className="text-gray-500 text-xs">{galleryItems.length - 6} more</p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Additional items for mobile - shown only when "View All" is clicked */}
          {showAllItems && (
            <div className="gallery-more-items grid grid-cols-2 gap-4 max-w-md mx-auto mt-4">
              {galleryItems.slice(6).map((item, index) => (
              <motion.div
                key={item.id}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      className="w-full h-full object-cover"
                      preload="none"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-black ml-0.5" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-medium line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Gallery Modal - All Devices */}
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