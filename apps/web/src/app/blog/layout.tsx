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
      <div className="min-h-screen bg-white">
        {/* Blog Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
          <div className="container mx-auto px-4">
            {/* Navigation breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-blue-200">
              <Link 
                href="/" 
                className="hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                🏠 Home
              </Link>
              <span>→</span>
              <span className="text-white">Blog</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Outdoor Adventure Blog</h1>
                <p className="text-blue-100 mt-1">Expert insights for Toronto escape room and adventure experiences</p>
              </div>
              
              {/* Back to Home Button */}
              <Link 
                href="/"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
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