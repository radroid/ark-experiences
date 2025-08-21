'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CircularProgressProps {
  percentage: number
  currentLocation: number
  totalLocations: number
  onNavigate?: (direction: 'prev' | 'next' | 'current') => void
  canGoPrev?: boolean
  canGoNext?: boolean
  isOnCurrent?: boolean
}

export function CircularProgress({
  percentage,
  currentLocation,
  totalLocations,
  onNavigate,
  canGoPrev = false,
  canGoNext = false,
  isOnCurrent = true
}: CircularProgressProps) {
  const radius = 45
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-full shadow-2xl p-4 border-4 border-blue-50"
      >
        <div className="relative">
          {/* Background Circle */}
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            
            {/* Progress Circle */}
            <motion.circle
              stroke="url(#progressGradient)"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
                <stop offset="50%" style={{ stopColor: "#8b5cf6" }} />
                <stop offset="100%" style={{ stopColor: "#06b6d4" }} />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={percentage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(percentage)}%
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {currentLocation}/{totalLocations}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-3 space-x-4">
          {/* Previous Button */}
          <motion.button
            onClick={() => onNavigate?.('prev')}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition-all duration-200 ${
              canGoPrev
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canGoPrev ? { scale: 1.1 } : {}}
            whileTap={canGoPrev ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Current Location Button */}
          {!isOnCurrent && (
            <motion.button
              onClick={() => onNavigate?.('current')}
              className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Current
            </motion.button>
          )}

          {/* Next Button */}
          <motion.button
            onClick={() => onNavigate?.('next')}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition-all duration-200 ${
              canGoNext
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canGoNext ? { scale: 1.1 } : {}}
            whileTap={canGoNext ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Location indicator dots */}
        <div className="flex items-center justify-center mt-2 space-x-1">
          {Array.from({ length: totalLocations }, (_, i) => {
            const locationNum = i + 1
            const isCompleted = (percentage / 100) * totalLocations >= locationNum
            const isCurrent = currentLocation === locationNum
            
            return (
              <motion.div
                key={locationNum}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                    : isCurrent
                    ? 'bg-blue-300 scale-125'
                    : 'bg-gray-200'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: isCompleted || isCurrent ? 1.2 : 1 }}
                transition={{ delay: i * 0.1 }}
              />
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
