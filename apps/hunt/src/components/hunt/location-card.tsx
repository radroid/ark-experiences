'use client'

import { useState, useEffect, useRef } from 'react'

import { Button } from '@ark/ui'
import { Input } from '@ark/ui'
import { HuntLocation, HuntAnswer } from '@ark/types'
import { 
  Camera, 
  Mic, 
  Upload, 
  FileText, 
  MapPin, 
  Lock,
  CheckCircle2,
  Loader2
} from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

interface LocationCardProps {
  location: HuntLocation
  onSubmitAnswer: (locationId: number, answer: HuntAnswer) => void
  isSubmitting?: boolean
  isActive?: boolean
  animationDelay?: number
}

export function LocationCard({ 
  location, 
  onSubmitAnswer, 
  isSubmitting = false,
  isActive = true,
  animationDelay = 0
}: LocationCardProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'audio' | 'video'>('text')
  const [textAnswer, setTextAnswer] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Refs for accessibility
  const textInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = () => {
    if (activeTab === 'text' && textAnswer.trim()) {
      onSubmitAnswer(location.id, {
        type: 'text',
        content: textAnswer.trim(),
        timestamp: new Date()
      })
    } else if (selectedFile) {
      onSubmitAnswer(location.id, {
        type: activeTab,
        content: selectedFile,
        timestamp: new Date()
      })
    }
  }

  // Success animation effect
  useEffect(() => {
    if (location.isCompleted && !showSuccess) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }, [location.isCompleted, showSuccess])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const isSubmitDisabled = () => {
    if (activeTab === 'text') {
      return !textAnswer.trim() || isSubmitting
    }
    return !selectedFile || isSubmitting
  }

  // Animation variants for different states
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: -100, 
      scale: 0.8,
      rotateX: -15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: animationDelay,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      } 
    },
    completed: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 }
    }
  }

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 500, 
        damping: 15 
      }
    }
  }

  if (!location.isUnlocked) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="px-6 mb-6"
      >
        <div 
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center"
          role="article"
          aria-labelledby={`location-${location.id}-title`}
          aria-describedby={`location-${location.id}-status`}
        >
          <div 
            className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
          <h3 
            id={`location-${location.id}-title`}
            className="text-xl font-medium text-slate-700 mb-3"
          >
            Challenge {location.id}
          </h3>
          <p 
            id={`location-${location.id}-status`}
            className="text-slate-500 leading-relaxed"
          >
            Complete the previous challenge to unlock
          </p>
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate={location.isCompleted ? "completed" : "visible"}
      variants={cardVariants}
      className="px-4 mb-6 relative"
    >
      {/* Success celebration overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={successVariants}
            className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center z-10 shadow-xl"
            role="alert"
            aria-live="assertive"
          >
            <div className="text-center text-white px-6">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 2 }}
                aria-hidden="true"
              >
                <CheckCircle2 className="w-16 h-16 mx-auto mb-3" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">Excellent!</h2>
              <p className="text-emerald-100 text-base">Challenge completed!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`rounded-3xl transition-all duration-300 overflow-hidden shadow-xl ${
          location.isCompleted 
            ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' 
            : 'bg-white'
        } ${isActive ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}`}
        role="article"
        aria-labelledby={`location-${location.id}-title`}
        aria-describedby={`location-${location.id}-description`}
      >
        <div className="p-8 pb-6">
          {/* Location badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                  location.isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}
                aria-hidden="true"
              >
                {location.isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <MapPin className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-slate-500">
                  Challenge {location.id}
                </span>
                {location.isCompleted && (
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    ✓ Completed
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 
            id={`location-${location.id}-title`}
            className="text-2xl font-bold text-slate-900 leading-tight mb-4"
          >
            {location.name}
          </h2>
        </div>

        <div className="px-8 pb-8 space-y-6">
          {/* Location Description */}
          <div>
            <p 
              id={`location-${location.id}-description`}
              className="text-slate-700 leading-relaxed text-lg"
            >
              {location.description}
            </p>
          </div>

          {/* Clue Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">Your Clue</h3>
            <p className="text-emerald-700 leading-relaxed">{location.clue}</p>
          </div>

          {/* Answer Input Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {location.isCompleted ? "Your Answer" : "Submit Your Answer"}
              </h3>
                
                {/* Input Type Selector */}
                <div 
                  className="bg-slate-50 rounded-3xl p-2 grid grid-cols-4 gap-2"
                  role="tablist"
                  aria-label="Answer input options"
                >
                  <button
                    role="tab"
                    aria-selected={activeTab === 'text'}
                    aria-controls={`text-panel-${location.id}`}
                    id={`text-tab-${location.id}`}
                    onClick={() => setActiveTab('text')}
                    className={`min-h-[52px] flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-2xl text-xs font-medium transition-all touch-manipulation ${
                      activeTab === 'text' 
                        ? 'bg-white text-slate-900 shadow-lg scale-105' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <FileText className="w-5 h-5" aria-hidden="true" />
                    <span>Text</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'image'}
                    aria-controls={`image-panel-${location.id}`}
                    id={`image-tab-${location.id}`}
                    onClick={() => setActiveTab('image')}
                    className={`min-h-[52px] flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-2xl text-xs font-medium transition-all touch-manipulation ${
                      activeTab === 'image' 
                        ? 'bg-white text-slate-900 shadow-lg scale-105' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Camera className="w-5 h-5" aria-hidden="true" />
                    <span>Photo</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'audio'}
                    aria-controls={`audio-panel-${location.id}`}
                    id={`audio-tab-${location.id}`}
                    onClick={() => setActiveTab('audio')}
                    className={`min-h-[52px] flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-2xl text-xs font-medium transition-all touch-manipulation ${
                      activeTab === 'audio' 
                        ? 'bg-white text-slate-900 shadow-lg scale-105' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Mic className="w-5 h-5" aria-hidden="true" />
                    <span>Audio</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'video'}
                    aria-controls={`video-panel-${location.id}`}
                    id={`video-tab-${location.id}`}
                    onClick={() => setActiveTab('video')}
                    className={`min-h-[52px] flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-2xl text-xs font-medium transition-all touch-manipulation ${
                      activeTab === 'video' 
                        ? 'bg-white text-slate-900 shadow-lg scale-105' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Upload className="w-5 h-5" aria-hidden="true" />
                    <span>Video</span>
                  </button>
                </div>
              </div>

              {/* Input Panels */}
              <div className="space-y-4">
                {activeTab === 'text' ? (
                  <div
                    role="tabpanel"
                    id={`text-panel-${location.id}`}
                    aria-labelledby={`text-tab-${location.id}`}
                  >
                    <Input
                      ref={textInputRef}
                      type="text"
                      placeholder="Type your answer here..."
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      className="min-h-[56px] text-lg rounded-2xl border-slate-200 bg-white/50 focus:bg-white focus:border-emerald-400 focus:ring-emerald-400"
                      disabled={location.isCompleted}
                      aria-label="Text answer input"
                    />
                  </div>
                ) : (
                  <div
                    role="tabpanel"
                    id={`${activeTab}-panel-${location.id}`}
                    aria-labelledby={`${activeTab}-tab-${location.id}`}
                    className="space-y-3"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={
                        activeTab === 'image' ? 'image/*' :
                        activeTab === 'audio' ? 'audio/*' :
                        'video/*'
                      }
                      onChange={handleFileSelect}
                      className="hidden"
                      id={`file-${location.id}-${activeTab}`}
                      disabled={location.isCompleted}
                      aria-label={`${activeTab} file input`}
                    />
                    <label
                      htmlFor={`file-${location.id}-${activeTab}`}
                      className="min-h-[96px] flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all touch-manipulation"
                    >
                      <Upload className="w-10 h-10 text-slate-400" />
                      <div className="text-center">
                        <p className="text-base font-medium text-slate-600">
                          {selectedFile ? selectedFile.name : `Upload ${activeTab}`}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          Tap to select your {activeTab}
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                {!location.isCompleted && (
                  <Button
                    ref={submitButtonRef}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled()}
                    className="w-full min-h-[56px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-3xl shadow-lg active:scale-95 transition-all touch-manipulation"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Answer'
                    )}
                  </Button>
                )}

                {/* Completion Status */}
                {location.isCompleted && (
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl">
                    <div className="flex items-center justify-center space-x-3 text-emerald-700">
                      <CheckCircle2 className="w-6 h-6" />
                      <p className="font-semibold text-lg">Challenge Completed!</p>
                    </div>
                    {location.userAnswer && (
                      <p className="text-emerald-600 text-center mt-3 text-base">
                        Your answer: {
                          location.userAnswer.type === 'text' 
                            ? String(location.userAnswer.content)
                            : `${location.userAnswer.type} file submitted`
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </motion.div>
  )
}
