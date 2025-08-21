// Shared TypeScript types
// Re-export all types from the main types file
export interface HuntLocation {
  id: number
  name: string
  description: string
  clue: string
  correctAnswer: string
  isUnlocked: boolean
  isCompleted: boolean
  userAnswer?: HuntAnswer
}

export interface HuntAnswer {
  type: 'text' | 'audio' | 'image' | 'video'
  content: string | File
  timestamp: Date
}

export interface HuntProgress {
  userId: string
  locationId: number
  isCompleted: boolean
  userAnswer?: HuntAnswer
  completedAt?: Date
}

export interface HuntUser {
  id: string
  email: string
  isApproved: boolean
  hasSignedWaiver: boolean
  createdAt: Date
}