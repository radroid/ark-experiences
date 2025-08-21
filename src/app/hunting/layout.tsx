'use client'

import { useIsMobile } from '@/lib/device-detection'
import Image from 'next/image'

export default function HuntingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isMobile, isLoaded } = useIsMobile()

  // Show loading state while checking device
  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen bg-slate-900 flex items-center justify-center"
        role="status" 
        aria-live="polite"
        aria-label="Loading hunt application"
      >
        <div className="text-center space-y-4">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-400 border-t-transparent mx-auto"
            aria-hidden="true"
          />
          <p className="text-emerald-100 text-sm font-medium">
            Loading your adventure...
          </p>
        </div>
      </div>
    )
  }

  // Show desktop restriction message
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm text-center space-y-6">
          <Image
            src="/ark-logo.png"
            alt="ARK Experience Logo"
            width={100}
            height={100}
            className="mx-auto opacity-80"
            priority
          />
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white leading-tight">
              Mobile Adventure Awaits
            </h1>
            <div className="space-y-2">
              <p className="text-slate-300 text-base leading-relaxed">
                This experience is crafted for mobile devices with touch, camera, and GPS.
              </p>
              <p className="text-emerald-400 text-sm font-medium">
                📱 Switch to your phone to begin the hunt
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-xs leading-relaxed">
              The hunt requires camera access, location services, and touch interactions 
              optimized for mobile devices.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Simple mobile layout - no header, everything handled in page
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
