'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Camera, Video, Users, MapPin } from 'lucide-react'
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'event' | 'clue' | 'celebration'>('all')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hoverVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  // Updated gallery items with real media files and proper aspect ratios
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'video',
      src: '/gallery/all-teams-celebration.mp4',
      alt: 'All teams celebrating together after completing the hunt',
      title: 'Ultimate Victory Celebration',
      description: 'The epic moment when all teams come together to celebrate after solving the murder mystery - pure joy and triumph!',
      category: 'celebration',
      thumbnail: '/gallery/all-teams-celebration-thumb.jpg',
      width: 3840,
      height: 2160,
      aspectRatio: 'landscape'
    },
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

  const categories = [
    { id: 'all', label: 'All Media', icon: Camera },
    { id: 'event', label: 'Events', icon: Users },
    { id: 'clue', label: 'Clues', icon: MapPin },
    { id: 'celebration', label: 'Celebrations', icon: Users }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  // Cleanup hover videos when category changes
  useEffect(() => {
    setHoveredVideoId(null)
    Object.values(hoverVideoRefs.current).forEach(video => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [selectedCategory])

  // Cleanup hover videos on unmount
  useEffect(() => {
    return () => {
      Object.values(hoverVideoRefs.current).forEach(video => {
        if (video) {
          video.pause()
        }
      })
    }
  }, [])

  const nextItem = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedItem(filteredItems[nextIndex])
    setIsPlaying(false)
  }

  const prevItem = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id)
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedItem(filteredItems[prevIndex])
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (selectedItem?.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoHover = (itemId: number) => {
    setHoveredVideoId(itemId)
    const video = hoverVideoRefs.current[itemId]
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {
        // Ignore autoplay failures
      })
    }
  }

  const handleVideoHoverEnd = (itemId: number) => {
    setHoveredVideoId(null)
    const video = hoverVideoRefs.current[itemId]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  useEffect(() => {
    if (selectedItem?.type === 'video' && videoRef.current) {
      const video = videoRef.current
      video.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        video.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [selectedItem])

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
    <section id="gallery" className="pt-40 py-24 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-200 mb-6"
            variants={itemVariants}
          >
            Experience{' '}
            <span className="bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Immerse yourself in the excitement, mystery, and pure joy of our scavenger hunts through photos and videos
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'glass-button text-white shadow-lg'
                  : 'glass text-gray-700 hover:bg-white/50 border border-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id as 'all' | 'event' | 'clue' | 'celebration')}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Responsive Masonry Gallery Grid */}
        <motion.div 
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer break-inside-avoid mb-4"
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => item.type === 'video' && handleVideoHover(item.id)}
                onMouseLeave={() => item.type === 'video' && handleVideoHoverEnd(item.id)}
              >
                <div className="overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    {item.type === 'video' && item.thumbnail ? (
                      <div className="relative">
                        {/* Thumbnail Image */}
                        <Image
                          src={item.thumbnail}
                          alt={item.alt}
                          width={item.width || 800}
                          height={item.height || 600}
                          className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-110 ${
                            hoveredVideoId === item.id ? 'opacity-0' : 'opacity-100'
                          }`}
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={index < 4}
                        />
                        
                        {/* Hover Video */}
                        <video
                          ref={(el) => {
                            if (el) hoverVideoRefs.current[item.id] = el
                          }}
                          src={item.src}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                            hoveredVideoId === item.id ? 'opacity-100' : 'opacity-0'
                          }`}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                        
                        {/* Video Play Overlay - only show when not hovering */}
                        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 ${
                          hoveredVideoId === item.id ? 'opacity-0' : 'opacity-100'
                        }`} />
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          hoveredVideoId === item.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="bg-white/90 rounded-full p-3">
                            <Play className="h-6 w-6 text-blue-600 ml-1" />
                          </div>
                        </div>
                        
                        {/* Video Icon Badge */}
                        <div className="absolute top-2 right-2 bg-black/70 rounded-full p-2 z-10">
                          <Video className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width || 800}
                          height={item.height || 600}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={index < 4}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        {/* Image Icon Badge */}
                        <div className="absolute top-2 right-2 bg-black/70 rounded-full p-2">
                          <Camera className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-6 w-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={prevItem}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={nextItem}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Media Display */}
              <div className="relative">
                {selectedItem.type === 'video' ? (
                  <div className="relative bg-black">
                    <video
                      ref={videoRef}
                      src={selectedItem.src}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      poster={selectedItem.thumbnail}
                      onClick={togglePlay}
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      width={selectedItem.width || 800}
                      height={selectedItem.height || 600}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      priority
                    />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 