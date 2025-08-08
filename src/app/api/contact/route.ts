import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      team_size,
      preferred_date,
      message,
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Invoke Supabase Edge Function which saves and sends emails
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceRole) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json(
        { error: 'Server not configured for email sending' },
        { status: 500 }
      )
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseServiceRole}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        team_size,
        preferred_date,
        message,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('send-contact-email failed:', text)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    const data = await res.json()
    return NextResponse.json(
      { message: 'Contact information saved successfully', id: data.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 