import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const result = await convex.mutation(api.emailSignups.subscribe, { email })

    if (result.alreadySubscribed) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    return NextResponse.json({ message: 'Email signup successful' })
  } catch (error) {
    console.error('Error saving email:', error)
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    )
  }
}
