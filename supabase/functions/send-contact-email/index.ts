import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactData {
  name: string
  email: string
  phone?: string
  team_size?: string
  preferred_date?: string
  message: string
}

const contactFormTemplates = {
  // Email sent to ARK team when someone submits the contact form
  teamNotification: (data: {
    company_name: string
    contact_person: string
    email: string
    phone?: string
    team_size?: string
    preferred_date?: string
    special_requirements?: string
  }) => ({
    subject: `🎯 New Scavenger Hunt Inquiry from ${data.company_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Scavenger Hunt Inquiry</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎯 New Lead Alert!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">ARK Scavenger Hunt Inquiry</p>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📋 Contact Information</h3>
            <p><strong>🏢 Company:</strong> ${data.company_name}</p>
            <p><strong>👤 Contact Person:</strong> ${data.contact_person}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></p>
            ${data.phone ? `<p><strong>📞 Phone:</strong> <a href="tel:${data.phone}" style="color: #3b82f6;">${data.phone}</a></p>` : ''}
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">🎪 Event Details</h3>
            ${data.team_size ? `<p><strong>👥 Team Size:</strong> ${data.team_size} people</p>` : '<p><strong>👥 Team Size:</strong> Not specified</p>'}
            ${data.preferred_date ? `<p><strong>📅 Preferred Date:</strong> ${data.preferred_date}</p>` : '<p><strong>📅 Preferred Date:</strong> Not specified</p>'}
            ${data.special_requirements ? `<p><strong>🎯 Special Requirements:</strong> ${data.special_requirements}</p>` : ''}
          </div>

          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required</h3>
            <p style="color: #92400e; margin: 0; font-weight: 500;">
              Follow up with this lead within <strong>24 hours</strong> to discuss their scavenger hunt requirements and provide a quote.
            </p>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${data.email}?subject=Re: Your ARK Scavenger Hunt Inquiry" 
               style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
              📧 Reply to ${data.contact_person}
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p>This inquiry was submitted via the ARK Scavenger Hunt website contact form.</p>
        </div>
      </body>
      </html>
    `
  }),

  // Email sent to customer as confirmation
  customerConfirmation: (data: {
    company_name: string
    contact_person: string
    email: string
    team_size?: string
    preferred_date?: string
  }) => ({
    subject: '🎯 Your ARK Scavenger Hunt Inquiry - We\'ll Be In Touch Soon!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - ARK Scavenger Hunt</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">🎯 Thank You!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">We're excited to create your mystery adventure!</p>
        </div>
        
        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Hi ${data.contact_person},</p>
          
          <p style="color: #64748b; line-height: 1.7; margin-bottom: 20px;">
            Thank you for your interest in our Cluedo-themed scavenger hunt experience! We're thrilled to help you create an unforgettable team-building adventure in Toronto that your team will be talking about for months.
          </p>

          <div style="background-color: #f1f5f9; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e293b; margin-top: 0; font-size: 20px;">📋 What Happens Next?</h3>
            <ul style="color: #475569; padding-left: 20px; line-height: 1.8;">
              <li><strong>Within 24 hours:</strong> Our team will review your requirements and contact you</li>
              <li><strong>Customization:</strong> We'll discuss dates, locations, and tailor the experience to your team</li>
              <li><strong>Proposal:</strong> You'll receive a detailed proposal with pricing and logistics</li>
              <li><strong>Booking:</strong> Once confirmed, we'll handle all the planning and coordination</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); padding: 25px; border-radius: 10px; margin: 30px 0;">
            <h3 style="color: white; margin-top: 0; font-size: 20px;">📝 Quick Recap of Your Inquiry</h3>
            <div style="color: white; line-height: 1.8;">
              <p style="margin: 8px 0;"><strong>🏢 Company:</strong> ${data.company_name}</p>
              ${data.team_size ? `<p style="margin: 8px 0;"><strong>👥 Team Size:</strong> ${data.team_size} people</p>` : ''}
              ${data.preferred_date ? `<p style="margin: 8px 0;"><strong>📅 Preferred Date:</strong> ${data.preferred_date}</p>` : ''}
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:team@funwithark.ca" 
               style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; margin: 0 10px;">
              📧 Email Us
            </a>
          </div>

          <p style="color: #64748b; margin-top: 30px;">
            Best regards,<br>
            <strong>The ARK Scavenger Hunt Team</strong><br>
            <span style="color: #3b82f6;">team@funwithark.ca</span>
          </p>
        </div>
      </body>
      </html>
    `
  })
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not found')
    }

    // Get the contact data from the request
    const contactData: ContactData = await req.json()
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, or message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Save to Supabase
    const { data: savedContact, error: dbError } = await supabase
      .from('contacts')
      .insert({
        company_name: 'Individual Inquiry',
        contact_person: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        team_size: contactData.team_size ? parseInt(contactData.team_size.split('-')[0]) : null,
        preferred_date: contactData.preferred_date || null,
        special_requirements: contactData.message || null,
        status: 'new',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save contact information')
    }

    // Prepare email templates
    const teamEmail = contactFormTemplates.teamNotification({
      company_name: 'Individual Inquiry',
      contact_person: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      team_size: contactData.team_size,
      preferred_date: contactData.preferred_date,
      special_requirements: contactData.message,
    })

    const customerEmail = contactFormTemplates.customerConfirmation({
      company_name: 'Individual Inquiry',
      contact_person: contactData.name,
      email: contactData.email,
      team_size: contactData.team_size,
      preferred_date: contactData.preferred_date,
    })

    // Send team notification email
    const teamEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ARK Scavenger Hunt <team@funwithark.ca>',
        to: (Deno.env.get('ARK_TEAM_EMAILS') || 'team@funwithark.ca')
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean),
        subject: teamEmail.subject,
        html: teamEmail.html,
      }),
    })

    if (!teamEmailResponse.ok) {
      const errorText = await teamEmailResponse.text()
      console.error('Team email error:', errorText)
      throw new Error('Failed to send team notification email')
    }

    // Send customer confirmation email
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ARK Scavenger Hunt <team@funwithark.ca>',
        to: [contactData.email],
        subject: customerEmail.subject,
        html: customerEmail.html,
      }),
    })

    if (!customerEmailResponse.ok) {
      const errorText = await customerEmailResponse.text()
      console.error('Customer email error:', errorText)
      // Don't fail the entire request if customer email fails
    }

    return new Response(
      JSON.stringify({ 
        message: 'Contact information saved and emails sent successfully',
        id: savedContact.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
