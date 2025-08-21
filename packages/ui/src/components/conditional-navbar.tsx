'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar for hunting routes
  const showNavbar = !pathname.startsWith('/hunting')
  
  return showNavbar ? <Navbar /> : null
}
