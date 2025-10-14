'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Play, 
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'
import Image from 'next/image'
import { track } from '@vercel/analytics/react'

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

interface MobileGalleryModalProps {
  items: GalleryItem[]
  selectedItem: GalleryItem | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  isMobile?: boolean
}

export default function MobileGalleryModal({
  items,
  selectedItem,
  onClose,
  onNext,
  onPrev,
  isMobile = false // eslint-disable-line @typescript-eslint/no-unused-vars
}: MobileGalleryModalProps) {
  const [showControls, setShowControls] = useState(false)
  const [showCaption, setShowCaption] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showLikeAnimation, setShowLikeAnimation] = useState(false)
  const [showFastForward, setShowFastForward] = useState(false)
  const [showToast, setShowToast] = useState('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastTapRef = useRef<number>(0)
  const longPressTimerRef = useRef<NodeJS.Timeout>(null)

  // Performance optimization: preload adjacent items
  const currentIndex = items.findIndex(item => item.id === selectedItem?.id)
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null

  // Auto-hide controls after 4 seconds of inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
      setShowCaption(false)
    }, 4000)
  }, [])

  // Show controls and reset timeout
  const showControlsWithTimeout = useCallback(() => {
    setShowControls(true)
    setShowCaption(true)
    resetControlsTimeout()
  }, [resetControlsTimeout])

  // Toggle mute/unmute for videos
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    showControlsWithTimeout()
  }, [isMuted, showControlsWithTimeout])


  // Handle video play/pause
  const toggleVideoPlayback = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Handle like functionality with Vercel Analytics
  const handleLike = useCallback(() => {
    if (!selectedItem) return
    
    setIsLiked(!isLiked)
    setShowLikeAnimation(true)
    
    // Track like event with Vercel Analytics
        track('gallery_item_liked', {
          item_id: selectedItem.id.toString(),
          item_type: selectedItem.type,
          item_title: selectedItem.title,
          liked: (!isLiked).toString()
        })

    // Hide animation after 1 second
    setTimeout(() => setShowLikeAnimation(false), 1000)
  }, [selectedItem, isLiked])

  // Handle share functionality
  const handleShare = useCallback(async () => {
    if (!selectedItem) return

    const shareData = {
      title: selectedItem.title,
      text: selectedItem.description,
      url: window.location.href
    }

    // Try native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        track('gallery_item_shared', {
          item_id: selectedItem.id.toString(),
          method: 'native'
        })
        return
      } catch {
        console.log('Native share failed, falling back to clipboard')
      }
    }

    // Fallback to copying link
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowToast('Link copied to clipboard!')
      track('gallery_item_shared', {
        item_id: selectedItem.id.toString(),
        method: 'clipboard'
      })
      setTimeout(() => setShowToast(''), 2000)
    } catch {
      setShowToast('Failed to share')
      setTimeout(() => setShowToast(''), 2000)
    }
  }, [selectedItem])

  // Handle image copy to clipboard
  const copyImageToClipboard = useCallback(async () => {
    if (!selectedItem || selectedItem.type !== 'image') return

    try {
      const response = await fetch(selectedItem.src)
      const blob = await response.blob()
      
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({ [blob.type]: blob })
        await navigator.clipboard.write([item])
        setShowToast('Image copied to clipboard!')
        track('gallery_image_copied', {
          item_id: selectedItem.id.toString()
        })
      } else {
        // Fallback: copy image URL
        await navigator.clipboard.writeText(selectedItem.src)
        setShowToast('Image URL copied to clipboard!')
      }
      
      setTimeout(() => setShowToast(''), 2000)
    } catch {
      setShowToast('Failed to copy image')
      setTimeout(() => setShowToast(''), 2000)
    }
  }, [selectedItem])

  // Handle touch events manually for better control
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const now = Date.now()
    const timeDiff = now - lastTapRef.current
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const isRightSide = x > rect.width * 0.7
    
    // For videos, check if user is pressing on the right side (fast-forward area)
    const isVideoFastForwardArea = selectedItem?.type === 'video' && isRightSide
    
    if (timeDiff < 300 && timeDiff > 0) {
      // Double tap detected
      if (selectedItem?.type === 'image') {
        handleLike()
      }
      // No double-tap action for videos
    } else {
      // Single tap or start of potential long press
      if (!isVideoFastForwardArea) {
        // Only trigger play/pause if NOT in the fast-forward area
        if (selectedItem?.type === 'video') {
          toggleVideoPlayback()
        }
        showControlsWithTimeout()
      } else {
        // In fast-forward area, just show controls without play/pause
        showControlsWithTimeout()
      }
    }
    
    lastTapRef.current = now

    // Long press detection
    longPressTimerRef.current = setTimeout(() => {
      if (selectedItem?.type === 'image') {
        // Long press on images copies to clipboard
        copyImageToClipboard()
      } else if (selectedItem?.type === 'video' && isRightSide) {
        // Long press on right side of videos triggers fast-forward
        setShowFastForward(true)
        if (videoRef.current) {
          videoRef.current.playbackRate = 2
        }
      }
      // No long press action for videos on left/center side
    }, selectedItem?.type === 'video' && isRightSide ? 300 : 600)
  }, [selectedItem, handleLike, toggleVideoPlayback, showControlsWithTimeout, copyImageToClipboard])

  const handleTouchEnd = useCallback(() => {
    // Clear any pending long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
    
    // Reset fast forward if it was active
    if (showFastForward) {
      setShowFastForward(false)
      if (videoRef.current) {
        videoRef.current.playbackRate = 1
      }
    }
  }, [showFastForward])

  // Swipe gesture handling
  const bind = useDrag(
    ({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
      // Only handle horizontal swipes with sufficient movement and velocity
      if (Math.abs(mx) > 50 && Math.abs(vx) > 0.5) {
        if (dx > 0) {
          onPrev()
        } else {
          onNext()
        }
        cancel()
      }
    },
    {
      axis: 'x',
      threshold: 15,
      preventDefaultAxis: 'y'
    }
  )

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
        case ' ':
        case 'Enter':
          if (selectedItem?.type === 'video') {
            e.preventDefault()
            toggleVideoPlayback()
          }
          break
        case 'l':
        case 'L':
          if (selectedItem?.type === 'image') {
            handleLike()
          }
          break
      }
    }

    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItem, onClose, onPrev, onNext, toggleVideoPlayback, handleLike])

  // Reset states when item changes
  useEffect(() => {
    if (selectedItem) {
      setIsPlaying(false)
      setShowFastForward(false)
      setShowControls(false)
      setShowCaption(false)
      showControlsWithTimeout()
    }
  }, [selectedItem, showControlsWithTimeout])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  if (!selectedItem) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 touch-none"
        style={{
          backgroundColor: 'var(--safe-black)',
          height: '100vh', 
          width: '100vw'
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing ${selectedItem.type}: ${selectedItem.title}`}
      >
        {/* Close button - always visible */}
        <button
          className="absolute top-4 right-4 z-50 p-3 rounded-full backdrop-blur-sm"
          style={{backgroundColor: 'var(--safe-black-500)', color: 'var(--pure-white)'}}
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Hidden preload elements for performance */}
        <div className="sr-only">
          {prevItem && prevItem.type === 'image' && (
            <Image
              src={prevItem.src}
              alt=""
              width={100}
              height={100}
              priority={false}
              loading="eager"
            />
          )}
          {nextItem && nextItem.type === 'image' && (
            <Image
              src={nextItem.src}
              alt=""
              width={100}
              height={100}
              priority={false}
              loading="eager"
            />
          )}
          {prevItem && prevItem.type === 'video' && (
            <video
              src={prevItem.src}
              preload="none"
              style={{ display: 'none' }}
            />
          )}
          {nextItem && nextItem.type === 'video' && (
            <video
              src={nextItem.src}
              preload="none"
              style={{ display: 'none' }}
            />
          )}
        </div>

        {/* Main content area */}
        <div
          ref={containerRef}
          className="relative h-full w-full flex items-center justify-center"
          {...bind()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {selectedItem.type === 'image' ? (
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>
          ) : (
            <div className="relative h-full w-full flex items-center justify-center" style={{backgroundColor: 'var(--safe-black)'}}>
              <video
                ref={videoRef}
                src={selectedItem.src}
                className="max-h-full max-w-full object-contain"
                poster={selectedItem.thumbnail}
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Center play/pause button */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={toggleVideoPlayback}
                  >
                    <div className="rounded-full p-4" style={{backgroundColor: 'var(--pure-white-900)'}}>
                      <Play className="h-8 w-8 ml-1" style={{color: 'var(--safe-black)'}} />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Fast forward area indicator (subtle) */}
              <div className="absolute top-0 right-0 w-[30%] h-full pointer-events-none">
                <div className="w-full h-full bg-gradient-to-l from-white/5 to-transparent opacity-20" />
              </div>

              {/* Fast forward indicator */}
              <AnimatePresence>
                {showFastForward && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-4 right-16 px-3 py-1 rounded-full text-sm font-medium"
                    style={{backgroundColor: 'var(--safe-black-700)', color: 'var(--pure-white)'}}
                  >
                    2x
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Like animation overlay */}
          <AnimatePresence>
            {showLikeAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.2, 1.5],
                  rotate: [0, 10, -10, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-6xl">
                  {isLiked ? '❤️' : '🔥'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom control tray */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
            >
              <div className="flex items-center justify-between">
                {/* Left arrow */}
                <button
                  onClick={onPrev}
                  className="p-3 rounded-full backdrop-blur-sm transition-colors"
                  style={{backgroundColor: 'var(--pure-white-200)', color: 'var(--pure-white)'}}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Center controls */}
                <div className="flex items-center gap-4">
                  {/* Like button */}
                  <button
                    onClick={handleLike}
                    className="p-3 rounded-full backdrop-blur-sm transition-colors"
                    style={{
                      backgroundColor: isLiked ? 'var(--cocoa-brown-500)' : 'var(--ghost-white-200)',
                      color: 'var(--ghost-white)'
                    }}
                    aria-label={isLiked ? 'Unlike this item' : 'Like this item'}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full backdrop-blur-sm transition-colors"
                  style={{backgroundColor: 'var(--pure-white-200)', color: 'var(--pure-white)'}}
                    aria-label="Share this item"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>

                  {/* Video controls (only for videos) */}
                  {selectedItem.type === 'video' && (
                    <>
                      <button
                        onClick={toggleVideoPlayback}
                        className="p-3 rounded-full backdrop-blur-sm transition-colors"
                  style={{backgroundColor: 'var(--pure-white-200)', color: 'var(--pure-white)'}}
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </button>
                      
                      {/* Mute/unmute button */}
                      <button
                        onClick={toggleMute}
                        className="p-3 rounded-full backdrop-blur-sm transition-colors"
                  style={{backgroundColor: 'var(--pure-white-200)', color: 'var(--pure-white)'}}
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? (
                          <VolumeX className="h-6 w-6" />
                        ) : (
                          <Volume2 className="h-6 w-6" />
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Right arrow */}
                <button
                  onClick={onNext}
                  className="p-3 rounded-full backdrop-blur-sm transition-colors"
                  style={{backgroundColor: 'var(--pure-white-200)', color: 'var(--pure-white)'}}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption Overlay */}
        <AnimatePresence>
          {showCaption && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute top-4 left-4 right-4 z-40"
            >
              <div className="backdrop-blur-sm rounded-lg p-4" style={{backgroundColor: 'var(--safe-black-600)', color: 'var(--pure-white)'}}>
                <h3 className="text-lg font-semibold mb-1">{selectedItem.title}</h3>
                <p className="text-sm leading-relaxed" style={{color: 'var(--pure-white)', opacity: 0.9}}>{selectedItem.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast notifications */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm backdrop-blur-sm z-50"
              style={{backgroundColor: 'var(--safe-black-800)', color: 'var(--pure-white)'}}
            >
              {showToast}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}