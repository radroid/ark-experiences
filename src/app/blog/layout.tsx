import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import BlogScrollHandler from '@/components/blog-scroll-handler'

export const metadata: Metadata = {
  title: "Outdoor Adventure Blog - Toronto Escape Room Insights & Tips | ARK",
  description: "Expert insights on outdoor escape rooms in Toronto, adventure planning, and creating memorable experiences for young professionals. Tips, guides, and local Toronto recommendations.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlogScrollHandler />
      <div className="min-h-screen" style={{backgroundColor: 'var(--ghost-white)'}}>
        {/* Blog Header */}
        <div className="py-6" style={{backgroundColor: 'var(--yinmn-blue)', color: 'var(--ghost-white)'}}>
          <div className="container mx-auto px-4">
            {/* Navigation breadcrumb */}
            <div className="flex items-center gap-2 mb-4" style={{color: 'var(--ghost-white-200)'}}>
              <Link 
                href="/" 
                className="transition-colors duration-200 flex items-center gap-1"
                style={{color: 'var(--ghost-white-200)'}}
              >
                🏠 Home
              </Link>
              <span>→</span>
              <span style={{color: 'var(--ghost-white)'}}>Blog</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Outdoor Adventure Blog</h1>
                <p className="mt-1" style={{color: 'var(--ghost-white-100)'}}>Expert insights for Toronto escape room and adventure experiences</p>
              </div>
              
              {/* Back to Home Button */}
              <Link 
                href="/"
                className="inline-flex items-center backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--ghost-white-200)',
                  color: 'var(--ghost-white)'
                }}
              >
                ← Back to ARK
              </Link>
            </div>
          </div>
        </div>
        
        {/* Content Area with proper scrolling */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </>
  )
}