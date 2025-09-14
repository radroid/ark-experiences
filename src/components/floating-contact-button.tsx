'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingContactButton() {
  const pathname = usePathname();

  // Don't show on blog pages
  if (pathname?.startsWith('/blog')) {
    return null;
  }

  return (
    <Link
      href="#contact"
      className="fixed bottom-6 right-24 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
      aria-label="Contact Us"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Contact Us
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
      </div>
    </Link>
  );
}
