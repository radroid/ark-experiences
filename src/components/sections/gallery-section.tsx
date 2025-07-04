'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button-2'
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Camera, Video, Users, MapPin } from 'lucide-react'

interface GalleryItem {
  id: number
  type: 'image' | 'video'
  src: string
  alt: string
  title: string
  description: string
  category: 'event' | 'clue' | 'celebration' | 'location'
  thumbnail?: string
}

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'event' | 'clue' | 'celebration'>('all')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample gallery items - in production these would come from Supabase
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'video',
      src: '/gallery/players-celebration.mp4',
      alt: 'Players celebrating after amazing experience',
      title: 'Victory Celebration',
      description: 'Watch the moment when all players erupt in applause after completing the epic scavenger hunt experience',
      category: 'celebration'
    },
    {
      id: 2,
      type: 'video',
      src: '/gallery/clue-hiding.mp4',
      alt: 'Clue being hidden at CN Tower',
      title: 'Behind the Scenes: Clue Placement',
      description: 'See how we carefully place clues at Toronto\'s iconic CN Tower location',
      category: 'clue'
    },
    {
      id: 3,
      type: 'image',
      src: '/gallery/team-celebration.jpg',
      alt: 'Team celebrating victory',
      title: 'Team Phoenix Victory',
      description: 'Team Phoenix celebrates solving the mystery at Casa Loma with pure joy',
      category: 'event'
    },
    {
      id: 4,
      type: 'video',
      src: '/gallery/royal-ontario-clue.mp4',
      alt: 'Clue discovery at Royal Ontario Museum',
      title: 'Museum Mystery Solved',
      description: 'Teams discovering and solving ancient riddles at the Royal Ontario Museum',
      category: 'clue'
    },
    {
      id: 5,
      type: 'image',
      src: '/gallery/team-strategy.jpg',
      alt: 'Team planning strategy',
      title: 'Strategic Planning',
      description: 'Teams collaborating to piece together the murder mystery',
      category: 'event'
    },
    {
      id: 6,
      type: 'image',
      src: '/gallery/corporate-event.jpg',
      alt: 'Corporate team building event',
      title: 'Corporate Team Building',
      description: 'Tech company teams working together to solve the case',
      category: 'event'
    },
    {
      id: 7,
      type: 'video',
      src: '/gallery/team-collaboration.mp4',
      alt: 'Teams working together',
      title: 'Collaboration in Action',
      description: 'Watch teams work together to solve complex puzzles and riddles',
      category: 'event'
    },
    {
      id: 8,
      type: 'image',
      src: '/gallery/final-reveal.jpg',
      alt: 'Final mystery reveal',
      title: 'The Big Reveal',
      description: 'The moment of truth when the mystery is finally solved',
      category: 'celebration'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Media', icon: Camera },
    { id: 'event', label: 'Events', icon: Users },
    { id: 'clue', label: 'Behind Scenes', icon: Video },
    { id: 'celebration', label: 'Celebrations', icon: Users }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

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

  useEffect(() => {
    if (selectedItem?.type === 'video' && videoRef.current) {
      videoRef.current.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        videoRef.current?.removeEventListener('ended', () => setIsPlaying(false))
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
    <section id="gallery" className="pt-40 py-24 bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Experience{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
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

        {/* Massive Gallery Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <div 
                        className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        {item.type === 'video' ? (
                          <Video className="h-8 w-8 text-purple-400" />
                        ) : (
                          <Camera className="h-8 w-8 text-purple-400" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Play button overlay for videos */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 rounded-full p-3">
                            <Play className="h-6 w-6 text-purple-600 ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Locations Discovery CTA */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover the Locations</h3>
            <p className="text-gray-600 mb-6">
              Want to see the amazing locations we use in our hunts? Sign up and play to uncover the mystery of Toronto&apos;s most iconic landmarks!
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Plan Your Hunt
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Massive Lightbox Modal */}
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
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={selectedItem.src}
                      className="w-full h-full object-cover"
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
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Camera className="h-20 w-20 text-purple-400" />
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