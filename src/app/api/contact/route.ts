import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

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

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await convex.action(api.contacts.submitAndNotify, {
      company_name: 'Individual Inquiry',
      contact_person: name,
      email,
      phone: phone || undefined,
      team_size: team_size ? parseInt(String(team_size).split('-')[0]) : undefined,
      preferred_date: preferred_date || undefined,
      special_requirements: message || undefined,
    })

    return NextResponse.json(
      { message: 'Contact information saved successfully', id: result.id },
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
