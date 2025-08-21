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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show desktop restriction message
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <Image
            src="/ark-logo.png"
            alt="ARK Experience"
            width={120}
            height={120}
            className="mx-auto"
          />
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Are you trying to cheat? 🤔
            </h1>
            <p className="text-lg text-gray-600">
              Kidding! This side of the website is only available on mobile.
            </p>
            <p className="text-sm text-gray-500">
              Please access this page from your mobile device to participate in the hunt.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <p className="text-xs text-gray-400">
              🔍 The hunt experience is designed for mobile devices with GPS and camera access.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Mobile layout
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <Image
            src="/ark-logo.png"
            alt="ARK Experience"
            width={40}
            height={40}
          />
          <h1 className="text-lg font-semibold text-gray-800">Hunt</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <main className="pb-20">
        {children}
      </main>
    </div>
  )
}
