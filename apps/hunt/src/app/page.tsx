'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/lib/auth'
import { HuntManager } from '@/lib/hunt-data'
import { HuntLocation, HuntAnswer } from '@ark/types'
import { LocationCard } from '@/components/hunt/location-card'
import { DevLogin } from '@/components/hunt/dev-login'

import { Button } from '@ark/ui'
import { Input } from '@ark/ui'
import { Card, CardContent } from '@ark/ui'
import { Mail, Loader2, Trophy, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { DEV_MODE, MOCK_HUNT_USERS, MockUser } from '@/lib/dev-auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function HuntingPage() {
  const { user, huntUser, loading, isApprovedUser, signInWithEmail, signOut } = useAuth()
  const [huntManager, setHuntManager] = useState<HuntManager | null>(null)
  const [locations, setLocations] = useState<HuntLocation[]>([])
  const [huntLoading, setHuntLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Sign in form state
  const [email, setEmail] = useState('')
  const [signInLoading, setSignInLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  // Dev mode state
  const [devUser, setDevUser] = useState<MockUser | null>(null)
  const [devHuntUser, setDevHuntUser] = useState<typeof MOCK_HUNT_USERS[keyof typeof MOCK_HUNT_USERS] | null>(null)
  
  // Simple navigation state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const initializeHunt = useCallback(async () => {
    const currentUser = user || devUser
    if (!currentUser) return

    setHuntLoading(true)
    try {
      const manager = new HuntManager(currentUser.id)
      const loadedLocations = await manager.loadProgress()
      setHuntManager(manager)
      setLocations(loadedLocations)
    } catch (err) {
      console.error('Error initializing hunt:', err)
      setMessage({ type: 'error', text: 'Failed to load hunt data' })
    } finally {
      setHuntLoading(false)
    }
  }, [user, devUser])

  useEffect(() => {
    const currentUser = user || devUser
    const currentIsApproved = isApprovedUser || (devUser && devHuntUser?.isApproved)
    
    if (currentUser && currentIsApproved) {
      initializeHunt()
    }
  }, [user, devUser, isApprovedUser, devHuntUser, initializeHunt])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignInLoading(true)
    
    const result = await signInWithEmail(email)
    
    if (result.success) {
      setEmailSent(true)
      setMessage({ type: 'success', text: 'Check your email for the magic link!' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to send magic link' })
    }
    
    setSignInLoading(false)
  }

  const handleDevLogin = (selectedUser: MockUser) => {
    setDevUser(selectedUser)
    const huntUserData = MOCK_HUNT_USERS[selectedUser.email as keyof typeof MOCK_HUNT_USERS]
    setDevHuntUser(huntUserData)
    setMessage({ type: 'success', text: `Signed in as ${selectedUser.name} (Dev Mode)` })
  }

  const handleDevSignOut = () => {
    setDevUser(null)
    setDevHuntUser(null)
    setHuntManager(null)
    setLocations([])
    setMessage(null)
    setCurrentCardIndex(0)
  }

  // Simple navigation handlers
  const handleNavigate = (direction: 'prev' | 'next' | 'current') => {
    const accessibleLocations = locations.filter(l => l.isUnlocked || l.isCompleted)
    const currentActiveLocation = locations.findIndex(l => l.isUnlocked && !l.isCompleted)
    
    switch (direction) {
      case 'prev':
        if (currentCardIndex > 0) {
          setCurrentCardIndex(currentCardIndex - 1)
        }
        break
      case 'next':
        if (currentCardIndex < accessibleLocations.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1)
        }
        break
      case 'current':
        if (currentActiveLocation !== -1) {
          const activeLocationInAccessible = accessibleLocations.findIndex(l => l.id === locations[currentActiveLocation].id)
          if (activeLocationInAccessible !== -1) {
            setCurrentCardIndex(activeLocationInAccessible)
          }
        }
        break
    }
  }

  // Update card index when hunt progresses
  useEffect(() => {
    const accessibleLocations = locations.filter(l => l.isUnlocked || l.isCompleted)
    const currentActiveLocation = locations.findIndex(l => l.isUnlocked && !l.isCompleted)
    
    if (currentActiveLocation !== -1) {
      const activeLocationInAccessible = accessibleLocations.findIndex(l => l.id === locations[currentActiveLocation].id)
      if (activeLocationInAccessible !== -1) {
        setCurrentCardIndex(activeLocationInAccessible)
      }
    }
  }, [locations])

  const handleSubmitAnswer = async (locationId: number, answer: HuntAnswer) => {
    if (!huntManager) return

    setSubmitLoading(locationId)
    setMessage(null)

    try {
      const result = await huntManager.submitAnswer(locationId, answer)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setLocations(huntManager.getLocations())
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (err) {
      console.error('Error submitting answer:', err)
      setMessage({ type: 'error', text: 'Error submitting answer. Please try again.' })
    } finally {
      setSubmitLoading(null)
    }
  }

  // Loading state
  if (loading || huntLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-600">Loading hunt...</p>
        </div>
      </div>
    )
  }

  // Not signed in (and not in dev mode with dev user)
  if (!user && !devUser) {
    return (
      <div className="h-screen relative overflow-hidden flex flex-col">
        {/* Lava Lamp Background */}
        <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay for readability */}
        <div className="absolute inset-0 bg-slate-900/80" />

        {/* Dev Login Component */}
        {DEV_MODE && (
          <div className="relative z-40 p-4 border-b border-slate-700">
            <DevLogin onDevLogin={handleDevLogin} />
          </div>
        )}

        <div className="relative z-30 flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center px-6 py-12">
            <div className="max-w-sm mx-auto w-full space-y-8">
            {/* Logo and Welcome */}
            <div className="text-center space-y-4">
              <Image
                src="/ark-logo.png"
                alt="ARK Experience"
                width={80}
                height={80}
                className="mx-auto opacity-90"
                priority
              />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white leading-tight">
                  Welcome, Hunter
                </h1>
                <p className="text-slate-400 text-base">
                  Sign in with your approved email to begin the adventure
                </p>
              </div>
            </div>

            {/* Sign In Card */}
            <Card className="bg-slate-800 border-slate-700 shadow-xl">
              <CardContent className="p-6">
                {!emailSent ? (
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div className="space-y-2">
                      <label 
                        htmlFor="email" 
                        className="text-sm font-medium text-slate-300"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="min-h-[48px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                      disabled={signInLoading}
                    >
                      {signInLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending magic link...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Send Magic Link
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-5">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Mail className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        Check your email
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        We sent a magic link to <strong className="text-white">{email}</strong>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEmailSent(false)
                        setEmail('')
                      }}
                      className="w-full min-h-[48px] border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Try different email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          </div>
          
          {message && (
            <div className={`max-w-md mx-auto p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    )
  }

  // User not approved (check both real user and dev user)
  const currentUser = user || devUser
  const currentHuntUser = huntUser || devHuntUser
  const currentIsApproved = isApprovedUser || (devUser && devHuntUser?.isApproved)
  
  if (currentUser && !currentIsApproved) {
    return (
      <div className="h-screen relative overflow-hidden flex flex-col">
        {/* Lava Lamp Background */}
        <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-white/20" />

        <div className="relative z-30 flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Access Restricted</h1>
            <div className="space-y-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              {!currentHuntUser?.isApproved && (
                <p className="text-gray-700">
                  Your email is not on the approved participants list.
                </p>
              )}
              {currentHuntUser?.isApproved && !currentHuntUser?.hasSignedWaiver && (
                <p className="text-gray-700">
                  Please complete and sign the waiver form before participating.
                </p>
              )}
              <p className="text-sm text-gray-600">
                Contact the organizers if you believe this is an error.
              </p>
            </div>
            <Button 
              onClick={devUser ? handleDevSignOut : signOut} 
              className="bg-white/80 hover:bg-white text-gray-800 font-semibold px-8 py-3 rounded-2xl shadow-lg"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Hunt completed
  if (huntManager?.isHuntCompleted()) {
    return (
      <div className="h-screen relative overflow-hidden flex flex-col">
        {/* Lava Lamp Background */}
        <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
        
        {/* Additional Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
          <div className="floating-circle-small"></div>
        </div>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-white/20" />

        <div className="relative z-30 flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Congratulations!</h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              You&apos;ve successfully completed the ARK Scavenger Hunt! Well done, adventurer.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <p className="text-sm text-gray-600 mb-3">Your Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-full"></div>
              </div>
              <p className="text-lg font-bold text-gray-800">7/7 Locations Completed</p>
            </div>
            <Button 
              onClick={devUser ? handleDevSignOut : signOut} 
              className="bg-white/80 hover:bg-white text-gray-800 font-semibold px-8 py-3 rounded-2xl shadow-lg"
            >
              Return to Main Site
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Simple carousel logic
  const accessibleLocations = locations.filter(l => l.isUnlocked || l.isCompleted)
  const currentLocation = accessibleLocations[currentCardIndex]
  const currentActiveLocationIndex = locations.findIndex(l => l.isUnlocked && !l.isCompleted)
  const canGoPrev = currentCardIndex > 0
  const canGoNext = currentCardIndex < accessibleLocations.length - 1
  const isOnCurrent = currentActiveLocationIndex !== -1 && 
    accessibleLocations[currentCardIndex]?.id === locations[currentActiveLocationIndex]?.id

  // Main hunt interface
  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      {/* Lava Lamp Background */}
      <div className="absolute inset-0 gradient-hero lava-lamp-bg" />
      
      {/* Additional Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
        <div className="floating-circle-small"></div>
      </div>
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Consolidated Header with Progress and Navigation */}
      <div className="z-50 bg-white/40 backdrop-blur-md sticky top-0 shadow-sm">
        <div className="px-6 py-4">
          {/* Top Row: Challenge Name and ARK Logo with Exit */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <div 
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  aria-hidden="true"
                />
                <h1 className="text-lg font-semibold text-slate-900">
                  Challenge {currentCardIndex + 1}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Image
                src="/ark-logo.png"
                alt="ARK Experience"
                width={32}
                height={32}
                className="flex-shrink-0"
                priority
              />
              <Button 
                onClick={devUser ? handleDevSignOut : signOut} 
                variant="ghost" 
                size="sm"
                className="text-slate-500 hover:text-slate-700 font-medium"
              >
                Exit
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(huntManager?.getCompletionPercentage() || 0)}% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${huntManager?.getCompletionPercentage() || 0}%` }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigate('prev')}
              disabled={!canGoPrev}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all touch-manipulation ${
                canGoPrev
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
              aria-label="Go to previous challenge"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <div className="text-center">
              <p className="text-sm font-medium text-slate-900">
                {currentCardIndex + 1} of {accessibleLocations.length}
              </p>
              {!isOnCurrent && (
                <button
                  onClick={() => handleNavigate('current')}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-1"
                >
                  Go to Current
                </button>
              )}
            </div>

            <button
              onClick={() => handleNavigate('next')}
              disabled={!canGoNext}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all touch-manipulation ${
                canGoNext
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
              aria-label="Go to next challenge"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative z-40 mx-6 mt-4 p-4 rounded-xl shadow-lg ${
              message.type === 'success' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            role="alert"
            aria-live="polite"
          >
            <p className="font-medium text-center">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Card Display - Carousel Style */}
      <div className="relative z-30 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentLocation && (
            <motion.div
              key={`card-${currentLocation.id}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3
              }}
              className="h-full overflow-y-auto scroll-smooth-mobile"
            >
              <div className="pb-6">
                <LocationCard
                  location={currentLocation}
                  onSubmitAnswer={handleSubmitAnswer}
                  isSubmitting={submitLoading === currentLocation.id}
                  isActive={true}
                  animationDelay={0}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
