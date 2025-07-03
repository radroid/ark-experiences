'use client'

import { useState } from 'react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, Camera, Users, MapPin } from 'lucide-react'

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  description: string
  category: 'event' | 'team' | 'location'
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'event' | 'team' | 'location'>('all')

  // Sample gallery images - in production these would come from Supabase
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/gallery/team-celebration.jpg',
      alt: 'Team celebrating victory',
      title: 'Victory Celebration',
      description: 'Team Phoenix celebrates solving the mystery at Casa Loma',
      category: 'team'
    },
    {
      id: 2,
      src: '/gallery/cn-tower-clue.jpg',
      alt: 'Clue hunting at CN Tower',
      title: 'CN Tower Challenge',
      description: 'Teams searching for clues at Toronto\'s iconic landmark',
      category: 'location'
    },
    {
      id: 3,
      src: '/gallery/royal-ontario-museum.jpg',
      alt: 'Royal Ontario Museum',
      title: 'Museum Mystery',
      description: 'Solving ancient riddles at the Royal Ontario Museum',
      category: 'location'
    },
    {
      id: 4,
      src: '/gallery/team-strategy.jpg',
      alt: 'Team planning strategy',
      title: 'Strategic Planning',
      description: 'Teams collaborating to piece together the murder mystery',
      category: 'team'
    },
    {
      id: 5,
      src: '/gallery/distillery-district.jpg',
      alt: 'Distillery District location',
      title: 'Historic Distillery',
      description: 'Uncovering secrets in Toronto\'s historic Distillery District',
      category: 'location'
    },
    {
      id: 6,
      src: '/gallery/corporate-event.jpg',
      alt: 'Corporate team building event',
      title: 'Corporate Team Building',
      description: 'Tech company teams working together to solve the case',
      category: 'event'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Photos', icon: Camera },
    { id: 'event', label: 'Events', icon: Users },
    { id: 'team', label: 'Teams', icon: Users },
    { id: 'location', label: 'Locations', icon: MapPin }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const nextImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
  }

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
            Adventure{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            See teams in action as they explore Toronto, solve mysteries, and create unforgettable memories
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
              onClick={() => setSelectedCategory(category.id as any)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div 
                        className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        <Camera className="h-12 w-12 text-purple-400" />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-600">{image.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Upload CTA */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <Camera className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Adventure</h3>
            <p className="text-gray-600 mb-6">
              Did you participate in one of our scavenger hunts? We'd love to see your photos!
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Upload Photos
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Camera className="h-20 w-20 text-purple-400" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 