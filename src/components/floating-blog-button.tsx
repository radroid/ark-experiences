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
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
      style={{
        backgroundColor: 'var(--primary-blue)',
        color: 'var(--pure-white)'
      }}
      aria-label="Visit Blog"
    >
      <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div 
        className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        style={{
          backgroundColor: 'var(--eerie-black-800)',
          color: 'var(--ghost-white)'
        }}
      >
        Blog
        <div 
          className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
          style={{borderTopColor: 'var(--eerie-black-800)'}}
        ></div>
      </div>
    </Link>
  );
}
