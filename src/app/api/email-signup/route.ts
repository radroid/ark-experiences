// TODO: Create email signup route which accepts an email address and sends it to the backend supabase API to save.

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  console.log('Email signup:', email)

  const { data, error } = await supabaseAdmin.from('email_signups').insert({ email })
  if (error) {
    console.error('Error saving email:', error)
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Email signup successful' })
}