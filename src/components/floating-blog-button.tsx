'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingBlogButton() {
  const pathname = usePathname();

  // Don't show on blog pages
  if (pathname?.startsWith('/blog')) {
    return null;
  }

  return (
    <Link
      href="/blog"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
      aria-label="Visit Blog"
    >
      <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Blog
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
      </div>
    </Link>
  );
}
