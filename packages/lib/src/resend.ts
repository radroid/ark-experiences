import { Resend } from 'resend'

// Use a placeholder API key for build time if not configured
const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder_key'

export const resend = new Resend(resendApiKey)

// Helper function to check if Resend is properly configured
export function isResendConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_key')
}
