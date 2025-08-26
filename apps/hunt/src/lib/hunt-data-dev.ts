import { HuntLocation, HuntAnswer } from '@ark/types'

// Dev-specific progress type
interface DevHuntProgress {
  id: string
  userId: string
  currentLocationId: number
  completedLocations: number[]
  answers: Record<number, HuntAnswer>
  startedAt: string
  completedAt?: string
}

// Mock hunt data for development - works without Supabase
export const DEV_HUNT_LOCATIONS: HuntLocation[] = [
  {
    id: 1,
    name: "Study Room",
    description: "Lorem Ipsum some description that can go here. It can then continue and possibly summarize what this location has?",
    clue: "Look for the place where knowledge is consumed with caffeine",
    isUnlocked: true,
    isCompleted: false,
    correctAnswer: "Re-Reading Cafe"
  },
  {
    id: 2,
    name: "The Mystery Begins",
    description: "Follow the clues to uncover the first piece of the puzzle. Look carefully at your surroundings.",
    clue: "Where books sleep in organized rows",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "library"
  },
  {
    id: 3,
    name: "Hidden Chamber",
    description: "The ancient secrets lie within these walls. Can you decode the message?",
    clue: "Where old documents rest in eternal slumber",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "archives"
  },
  {
    id: 4,
    name: "The Final Clue",
    description: "All paths lead here. Use everything you've learned to solve the ultimate puzzle.",
    clue: "X marks the spot where pirates hide their gold",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "treasure"
  },
  {
    id: 5,
    name: "Treasure Room",
    description: "Congratulations! You've found the treasure. But can you unlock it?",
    clue: "The sweet taste of accomplishment",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "victory"
  },
  {
    id: 6,
    name: "Secret Passage",
    description: "Not all is as it seems. Sometimes you must look beyond the obvious.",
    clue: "A hidden way through the walls",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "passage"
  },
  {
    id: 7,
    name: "Victory",
    description: "You've completed the ultimate challenge. Well done, adventurer!",
    clue: "The end of all journeys",
    isUnlocked: false,
    isCompleted: false,
    correctAnswer: "completed"
  },
]

// Local storage key for dev progress
const DEV_PROGRESS_KEY = 'ark-hunt-dev-progress'

export class DevHuntManager {
  private userId: string
  private locations: HuntLocation[]
  private progress: DevHuntProgress | null = null

  constructor(userId: string) {
    this.userId = userId
    this.locations = [...DEV_HUNT_LOCATIONS]
    console.log('🧪 DevHuntManager initialized for user:', userId)
  }

  async loadProgress(): Promise<HuntLocation[]> {
    try {
      // Load from localStorage for development
      const savedProgress = localStorage.getItem(`${DEV_PROGRESS_KEY}-${this.userId}`)
      
      if (savedProgress) {
        this.progress = JSON.parse(savedProgress)
        console.log('📝 Loaded dev progress from localStorage:', this.progress)
      } else {
        // Initialize new progress
        this.progress = {
          id: `dev-progress-${this.userId}`,
          userId: this.userId,
          currentLocationId: 1,
          completedLocations: [],
          answers: {},
          startedAt: new Date().toISOString(),
        }
        this.saveProgress()
        console.log('🆕 Created new dev progress:', this.progress)
      }

      this.updateLocationsFromProgress()
      return this.locations
    } catch (error) {
      console.error('❌ Error loading dev hunt progress:', error)
      throw error
    }
  }

  private updateLocationsFromProgress() {
    if (!this.progress) return

    this.locations = this.locations.map(location => {
      const isCompleted = this.progress!.completedLocations.includes(location.id)
      const isUnlocked = location.id === 1 || this.progress!.completedLocations.includes(location.id - 1)
      const userAnswer = this.progress!.answers[location.id]

      return {
        ...location,
        isUnlocked,
        isCompleted,
        userAnswer,
      }
    })

    console.log('🔄 Updated locations from progress:', {
      completed: this.progress.completedLocations,
      current: this.progress.currentLocationId
    })
  }

  private saveProgress() {
    if (this.progress) {
      localStorage.setItem(`${DEV_PROGRESS_KEY}-${this.userId}`, JSON.stringify(this.progress))
      console.log('💾 Saved dev progress to localStorage')
    }
  }

  async submitAnswer(locationId: number, answer: HuntAnswer): Promise<{ success: boolean; message: string }> {
    if (!this.progress) {
      throw new Error('Hunt progress not initialized')
    }

    try {
      const location = this.locations.find(l => l.id === locationId)
      if (!location) {
        return { success: false, message: 'Location not found' }
      }

      console.log('🎯 Validating answer for location', locationId, ':', answer)

      // Simple validation for development
      const isCorrect = this.validateAnswer(location, answer)

      if (isCorrect) {
        // Update progress
        const updatedAnswers = { ...this.progress.answers, [locationId]: answer }
        const updatedCompletedLocations = [...this.progress.completedLocations, locationId]
        const nextLocationId = locationId + 1

        this.progress = {
          ...this.progress,
          currentLocationId: nextLocationId <= 7 ? nextLocationId : locationId,
          completedLocations: updatedCompletedLocations,
          answers: updatedAnswers,
          completedAt: nextLocationId > 7 ? new Date().toISOString() : undefined,
        }

        this.saveProgress()
        this.updateLocationsFromProgress()

        const message = nextLocationId > 7 
          ? 'Congratulations! You completed the hunt!' 
          : 'Correct! Next location unlocked!'

        console.log('✅ Answer accepted:', message)
        return { success: true, message }
      } else {
        console.log('❌ Answer rejected')
        return { success: false, message: 'Not quite right. Try again!' }
      }
    } catch (error) {
      console.error('💥 Error submitting answer:', error)
      return { success: false, message: 'Error submitting answer. Please try again.' }
    }
  }

  private validateAnswer(location: HuntLocation, answer: HuntAnswer): boolean {
    // Simple validation for development
    if (answer.type === 'text' && location.correctAnswer) {
      const userAnswer = (answer.content as string).toLowerCase().trim()
      const correctAnswer = location.correctAnswer.toLowerCase().trim()
      
      const isMatch = userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)
      console.log('📝 Text validation:', { userAnswer, correctAnswer, isMatch })
      return isMatch
    }

    // Accept all media answers in dev mode
    if (answer.type !== 'text') {
      console.log('📸 Media answer accepted in dev mode:', answer.type)
      return true
    }

    return false
  }

  getLocations(): HuntLocation[] {
    return this.locations
  }

  isHuntCompleted(): boolean {
    return this.progress?.completedAt != null
  }

  getCompletionPercentage(): number {
    if (!this.progress) return 0
    return Math.round((this.progress.completedLocations.length / 7) * 100)
  }

  // Dev utility methods
  resetProgress() {
    localStorage.removeItem(`${DEV_PROGRESS_KEY}-${this.userId}`)
    console.log('🔄 Reset dev progress for user:', this.userId)
  }

  skipToLocation(locationId: number) {
    if (!this.progress) return

    const completedLocations = []
    for (let i = 1; i < locationId; i++) {
      completedLocations.push(i)
    }

    this.progress = {
      ...this.progress,
      currentLocationId: locationId,
      completedLocations,
    }

    this.saveProgress()
    this.updateLocationsFromProgress()
    console.log('⏭️ Skipped to location:', locationId)
  }
}
