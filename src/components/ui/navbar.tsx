import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu'

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex items-center justify-between px-8">
      {/* Logo in top left */}
      <Link href="#hero-section" className="flex-shrink-0">
        <Image 
          src="/ark-logo.png" 
          alt="ARK Experience Logo" 
          width={90} 
          height={90} 
          className="drop-shadow-xl hover:scale-105 transition-transform duration-200" 
        />
      </Link>
      
      {/* Centered Capsule Nav */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="w-[60vw] h-20 flex items-center justify-center rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 px-8" style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)'}}>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-12">
              <NavigationMenuItem>
                <Link href="#how-it-works" className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                  How It Works
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#gallery" className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                  Gallery
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#testimonials" className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                  Testimonials
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#contact" className="font-semibold text-lg text-black hover:text-white hover:bg-[#1b6cfd] transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Invisible spacer to maintain layout balance */}
      <div className="w-[90px] h-[90px] flex-shrink-0"></div>
    </nav>
  )
} 