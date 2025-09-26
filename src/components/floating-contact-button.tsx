// TODO: open the email drawer when the button is clicked
'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import EmailDrawer from './email-drawer';
import { useState } from 'react';

export default function FloatingContactButton() {
  const pathname = usePathname();
  const [isOpenEmailDrawer, setIsOpenEmailDrawer] = useState(false)

  // Don't show on blog pages
  if (pathname?.startsWith('/blog')) {
    return null;
  }

  return (
    <div>
    <button
      onClick={() => {
        setIsOpenEmailDrawer(true)
      }}
      className="pointer-events-auto fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
      style={{
        backgroundColor: 'var(--primary-blue)',
        color: 'var(--pure-white)'
      }}
      aria-label="Contact Us"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div 
        className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        style={{
          backgroundColor: 'var(--eerie-black-800)',
          color: 'var(--ghost-white)'
        }}
      >
        Contact Us
        <div 
          className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
          style={{borderTopColor: 'var(--eerie-black-800)'}}
        ></div>
      </div>
    </button>

    <EmailDrawer isOpen={isOpenEmailDrawer} onClose={() => setIsOpenEmailDrawer(false)} />
    </div>
  );
}
