import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'

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
      await resend.emails.send({
        from: 'ARK Scavenger Hunt <hello@arkscavengerhunt.com>',
        to: ['hello@arkscavengerhunt.com'],
        subject: `New Scavenger Hunt Inquiry from ${company_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Scavenger Hunt Inquiry</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Contact Information</h3>
              <p><strong>Company:</strong> ${company_name}</p>
              <p><strong>Contact Person:</strong> ${contact_person}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Event Details</h3>
              ${team_size ? `<p><strong>Team Size:</strong> ${team_size} people</p>` : ''}
              ${preferred_date ? `<p><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
              ${special_requirements ? `<p><strong>Special Requirements:</strong> ${special_requirements}</p>` : ''}
            </div>

            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
              <p style="margin: 0; color: #92400e;">
                <strong>Action Required:</strong> Follow up with this lead within 24 hours to discuss their scavenger hunt requirements.
              </p>
            </div>
          </div>
        `,
      })

      // Send confirmation email to customer
      await resend.emails.send({
        from: 'ARK Scavenger Hunt <hello@arkscavengerhunt.com>',
        to: [email],
        subject: 'Your Scavenger Hunt Inquiry - We\'ll Be In Touch Soon!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
            </div>
            
            <div style="padding: 30px 20px; background-color: #ffffff;">
              <p style="font-size: 18px; color: #334155;">Hi ${contact_person},</p>
              
              <p style="color: #64748b; line-height: 1.6;">
                Thank you for your interest in our Cluedo-themed scavenger hunt experience! We're excited to help you create an unforgettable team-building adventure in Toronto.
              </p>

              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">What Happens Next?</h3>
                <ul style="color: #475569; padding-left: 20px;">
                  <li>We'll review your requirements and team size</li>
                  <li>Our team will contact you within 24 hours</li>
                  <li>We'll discuss dates, locations, and customization options</li>
                  <li>You'll receive a detailed proposal and quote</li>
                </ul>
              </div>

              <div style="background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: white; margin-top: 0;">Quick Recap of Your Inquiry:</h3>
                <p style="color: white; margin: 5px 0;"><strong>Company:</strong> ${company_name}</p>
                ${team_size ? `<p style="color: white; margin: 5px 0;"><strong>Team Size:</strong> ${team_size} people</p>` : ''}
                ${preferred_date ? `<p style="color: white; margin: 5px 0;"><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
              </div>

              <p style="color: #64748b; line-height: 1.6;">
                In the meantime, feel free to reach out if you have any immediate questions at 
                <a href="mailto:hello@arkscavengerhunt.com" style="color: #3b82f6;">hello@arkscavengerhunt.com</a> 
                or call us at <strong>+1 (416) 555-0123</strong>.
              </p>

              <p style="color: #64748b;">
                Looking forward to creating an amazing mystery adventure for your team!
              </p>

              <p style="color: #64748b;">
                Best regards,<br>
                <strong>The ARK Scavenger Hunt Team</strong>
              </p>
            </div>

            <div style="background-color: #1e293b; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                © 2024 ARK Scavenger Hunt | Toronto's Premier Team Building Experience
              </p>
            </div>
          </div>
        `,
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