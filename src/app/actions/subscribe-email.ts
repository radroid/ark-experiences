'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function subscribeEmail(email: string) {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existingEmail } = await supabaseAdmin
      .from('email_signups')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (existingEmail) {
      return { success: false, error: 'This email is already subscribed!' };
    }

    // Insert email into Supabase
    const { data, error } = await supabaseAdmin
      .from('email_signups')
      .insert([
        {
          email: normalizedEmail,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: 'Failed to subscribe. Please try again.' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Subscribe error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

