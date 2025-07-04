import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { contactFormTemplates } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      company_name,
      contact_person,
      email,
      phone,
      team_size,
      preferred_date,
      special_requirements,
    } = body

    // Validate required fields
    if (!company_name || !contact_person || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert({
        company_name,
        contact_person,
        email,
        phone: phone || null,
        team_size: team_size ? parseInt(team_size.split('-')[0]) : null,
        preferred_date: preferred_date || null,
        special_requirements: special_requirements || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      )
    }

    // Send notification email via Resend
    try {
      // Send notification to ARK team
      const teamEmail = contactFormTemplates.teamNotification({
        company_name,
        contact_person,
        email,
        phone,
        team_size,
        preferred_date,
        special_requirements,
      })

      await resend.emails.send({
        from: 'ARK Scavenger Hunt <hello@arkscavengerhunt.com>',
        to: ['hello@arkscavengerhunt.com'],
        subject: teamEmail.subject,
        html: teamEmail.html,
      })

      // Send confirmation email to customer
      const customerEmail = contactFormTemplates.customerConfirmation({
        company_name,
        contact_person,
        email,
        team_size,
        preferred_date,
      })

      await resend.emails.send({
        from: 'ARK Scavenger Hunt <hello@arkscavengerhunt.com>',
        to: [email],
        subject: customerEmail.subject,
        html: customerEmail.html,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the entire request if email fails
    }

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