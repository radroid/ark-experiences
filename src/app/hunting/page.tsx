'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/lib/auth'
import { HuntManager } from '@/lib/hunt-data'
import { HuntLocation, HuntAnswer } from '@/types'
import { LocationCard } from '@/components/hunt/location-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Mail, Loader2, Trophy, Lock } from 'lucide-react'
import Image from 'next/image'

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

  const initializeHunt = useCallback(async () => {
    if (!user) return

    setHuntLoading(true)
    try {
      const manager = new HuntManager(user.id)
      const loadedLocations = await manager.loadProgress()
      setHuntManager(manager)
      setLocations(loadedLocations)
    } catch (err) {
      console.error('Error initializing hunt:', err)
      setMessage({ type: 'error', text: 'Failed to load hunt data' })
    } finally {
      setHuntLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user && isApprovedUser) {
      initializeHunt()
    }
  }, [user, isApprovedUser, initializeHunt])

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

  // Not signed in
  if (!user) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4 mt-8">
          <Image
            src="/ark-logo.png"
            alt="ARK Experience"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800">Welcome to the Hunt</h1>
          <p className="text-gray-600">Sign in with your approved email to begin</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signInLoading}
                >
                  {signInLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Magic Link
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Check your email</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    We sent a magic link to {email}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false)
                    setEmail('')
                  }}
                  className="w-full"
                >
                  Try different email
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {message && (
          <div className={`max-w-md mx-auto p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    )
  }

  // User not approved
  if (!isApprovedUser) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4 mt-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Access Restricted</h1>
          <div className="max-w-md mx-auto space-y-2">
            {!huntUser?.isApproved && (
              <p className="text-gray-600">
                Your email is not on the approved participants list.
              </p>
            )}
            {huntUser?.isApproved && !huntUser?.hasSignedWaiver && (
              <p className="text-gray-600">
                Please complete and sign the waiver form before participating.
              </p>
            )}
            <p className="text-sm text-gray-500">
              Contact the organizers if you believe this is an error.
            </p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign out
          </Button>
        </div>
      </div>
    )
  }

  // Hunt completed
  if (huntManager?.isHuntCompleted()) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4 mt-8">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Congratulations!</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            You&apos;ve successfully completed the ARK Scavenger Hunt! Well done, adventurer.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm border max-w-md mx-auto">
            <p className="text-sm text-gray-500 mb-2">Your Progress</p>
            <Progress value={100} className="mb-2" />
            <p className="text-sm font-medium">7/7 Locations Completed</p>
          </div>
        </div>
      </div>
    )
  }

  // Main hunt interface
  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white p-4 border-b sticky top-[73px] z-40">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">
              Progress: {huntManager?.getCompletionPercentage() || 0}%
            </p>
            <Button onClick={signOut} variant="ghost" size="sm">
              Sign out
            </Button>
          </div>
          <Progress value={huntManager?.getCompletionPercentage() || 0} className="w-full" />
          <p className="text-xs text-gray-500">
            {locations.filter(l => l.isCompleted).length} of 7 locations completed
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className={`mx-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Location Cards */}
      <div className="space-y-6">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onSubmitAnswer={handleSubmitAnswer}
            isSubmitting={submitLoading === location.id}
          />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  )
}
