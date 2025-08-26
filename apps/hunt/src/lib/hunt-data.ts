import { HuntLocation, HuntAnswer } from '@ark/types'
import { supabase, isSupabaseConfigured } from '@ark/lib'
import { DevHuntManager } from './hunt-data-dev'

// Supabase-specific progress type
interface SupabaseHuntProgress {
  id: string
  userId: string
  currentLocationId: number
  completedLocations: number[]
  answers: Record<number, HuntAnswer>
  startedAt: string
  completedAt?: string
}

// Sample hunt locations - replace with your actual data
export const HUNT_LOCATIONS: HuntLocation[] = [
  {
    id: 1,
    name: "Study Room",
    description: "Lorem Ipsum some description that can go here. It can then continue and possibly summarize what this location has?",
    clue: "Look for the place where knowledge is consumed with caffeine",
    isUnlocked: true,
    isCompleted: false,
    correctAnswer: "Re-Reading Cafe" // This would be stored securely server-side
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

// Smart Hunt Manager that falls back to dev mode when Supabase is unavailable
export class HuntManager {
  private userId: string
  private locations: HuntLocation[]
  private progress: SupabaseHuntProgress | null = null
  private devManager: DevHuntManager | null = null
  private isDevMode: boolean = false

  constructor(userId: string) {
    this.userId = userId
    this.locations = [...HUNT_LOCATIONS]
  }

  // Check if we should use dev mode (no Supabase env vars or connection issues)
  private shouldUseDevMode(): boolean {
    return !isSupabaseConfigured() || process.env.NODE_ENV === 'development'
  }

  async loadProgress(): Promise<HuntLocation[]> {
    // Try Supabase first, fall back to dev mode if it fails
    if (this.shouldUseDevMode()) {
      console.log('🧪 Using DevHuntManager (Supabase not configured)')
      this.isDevMode = true
      this.devManager = new DevHuntManager(this.userId)
      return await this.devManager.loadProgress()
    }

    try {
      const { data, error } = await supabase
        .from('hunt_progress')
        .select('*')
        .eq('user_id', this.userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        this.progress = {
          id: data.id,
          userId: data.user_id,
          currentLocationId: data.current_location_id,
          completedLocations: data.completed_locations || [],
          answers: data.answers || {},
          startedAt: data.started_at,
          completedAt: data.completed_at,
        }

        // Update locations based on progress
        this.updateLocationsFromProgress()
      } else {
        // Create new progress
        await this.initializeProgress()
      }

      return this.locations
    } catch (error) {
      console.error('🚨 Supabase error, falling back to dev mode:', error)
      // Fall back to dev mode if Supabase fails
      this.isDevMode = true
      this.devManager = new DevHuntManager(this.userId)
      return await this.devManager.loadProgress()
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
  }

  private async initializeProgress() {
    const newProgress: Omit<SupabaseHuntProgress, 'id'> = {
      userId: this.userId,
      currentLocationId: 1,
      completedLocations: [],
      answers: {},
      startedAt: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('hunt_progress')
      .insert({
        user_id: newProgress.userId,
        current_location_id: newProgress.currentLocationId,
        completed_locations: newProgress.completedLocations,
        answers: newProgress.answers,
        started_at: newProgress.startedAt,
      })
      .select()
      .single()

    if (error) throw error

    this.progress = {
      id: data.id,
      userId: data.user_id,
      currentLocationId: data.current_location_id,
      completedLocations: data.completed_locations || [],
      answers: data.answers || {},
      startedAt: data.started_at,
      completedAt: data.completed_at,
    }
  }

  async submitAnswer(locationId: number, answer: HuntAnswer): Promise<{ success: boolean; message: string }> {
    // Use dev manager if in dev mode
    if (this.isDevMode && this.devManager) {
      return await this.devManager.submitAnswer(locationId, answer)
    }

    if (!this.progress) {
      throw new Error('Hunt progress not initialized')
    }

    try {
      // Here you would integrate with your LLM for answer validation
      // For now, we'll use a simple check
      const location = this.locations.find(l => l.id === locationId)
      if (!location) {
        return { success: false, message: 'Location not found' }
      }

      // Simulate LLM validation - replace with actual LLM integration
      const isCorrect = await this.validateAnswer(location, answer)

      if (isCorrect) {
        // Update progress
        const updatedAnswers = { ...this.progress.answers, [locationId]: answer }
        const updatedCompletedLocations = [...this.progress.completedLocations, locationId]
        const nextLocationId = locationId + 1

        const { error } = await supabase
          .from('hunt_progress')
          .update({
            current_location_id: nextLocationId <= 7 ? nextLocationId : locationId,
            completed_locations: updatedCompletedLocations,
            answers: updatedAnswers,
            completed_at: nextLocationId > 7 ? new Date().toISOString() : null,
          })
          .eq('id', this.progress.id)

        if (error) throw error

        // Update local state
        this.progress.currentLocationId = nextLocationId <= 7 ? nextLocationId : locationId
        this.progress.completedLocations = updatedCompletedLocations
        this.progress.answers = updatedAnswers
        if (nextLocationId > 7) {
          this.progress.completedAt = new Date().toISOString()
        }

        this.updateLocationsFromProgress()

        return { 
          success: true, 
          message: nextLocationId > 7 ? 'Congratulations! You completed the hunt!' : 'Correct! Next location unlocked!' 
        }
      } else {
        return { success: false, message: 'Not quite right. Try again!' }
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      return { success: false, message: 'Error submitting answer. Please try again.' }
    }
  }

  private async validateAnswer(location: HuntLocation, answer: HuntAnswer): Promise<boolean> {
    // TODO: Integrate with LLM for intelligent answer validation
    // For now, simple text comparison for text answers
    if (answer.type === 'text' && location.correctAnswer) {
      const userAnswer = (answer.content as string).toLowerCase().trim()
      const correctAnswer = location.correctAnswer.toLowerCase().trim()
      return userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)
    }

    // For media answers, you'd send to LLM for analysis
    // This is a placeholder that accepts all media answers
    if (answer.type !== 'text') {
      return true // Temporary - replace with actual LLM validation
    }

    return false
  }

  getLocations(): HuntLocation[] {
    if (this.isDevMode && this.devManager) {
      return this.devManager.getLocations()
    }
    return this.locations
  }

  isHuntCompleted(): boolean {
    if (this.isDevMode && this.devManager) {
      return this.devManager.isHuntCompleted()
    }
    return this.progress?.completedAt != null
  }

  getCompletionPercentage(): number {
    if (this.isDevMode && this.devManager) {
      return this.devManager.getCompletionPercentage()
    }
    if (!this.progress) return 0
    return Math.round((this.progress.completedLocations.length / 7) * 100)
  }
}
