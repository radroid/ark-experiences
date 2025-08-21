'use client'

import { useEffect, useState } from 'react'
import { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { HuntUser } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [huntUser, setHuntUser] = useState<HuntUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }: { data: { session: Session | null }, error: AuthError | null }) => {
      if (error) {
        setError(error.message)
      } else {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchHuntUser(session.user.email!)
        }
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchHuntUser(session.user.email!)
      } else {
        setHuntUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchHuntUser = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('hunt_users')
        .select('*')
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      setHuntUser(data)
    } catch (err) {
      console.error('Error fetching hunt user:', err)
      setError('Failed to verify user access')
    }
  }

  const signInWithEmail = async (email: string) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/hunting`,
        },
      })

      if (error) throw error

      return { success: true }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const isApprovedUser = huntUser?.isApproved && huntUser?.hasSignedWaiver

  return {
    user,
    huntUser,
    loading,
    error,
    isApprovedUser,
    signInWithEmail,
    signOut,
  }
}

// Check if user is approved for hunt access
export async function checkHuntAccess(email: string): Promise<{
  isApproved: boolean
  hasSignedWaiver: boolean
  error?: string
}> {
  try {
    const { data, error } = await supabase
      .from('hunt_users')
      .select('is_approved, has_signed_waiver')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return { isApproved: false, hasSignedWaiver: false, error: 'User not found in approved list' }
      }
      throw error
    }

    return {
      isApproved: data.is_approved,
      hasSignedWaiver: data.has_signed_waiver,
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return {
      isApproved: false,
      hasSignedWaiver: false,
      error: errorMessage,
    }
  }
}
