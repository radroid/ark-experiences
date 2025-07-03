import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* Centered container with logo and nav */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="#hero-section" className="flex-shrink-0 pointer-events-auto">
          <Image 
            src="/ark-logo.png" 
            alt="ARK Experience Logo" 
            width={90} 
            height={90} 
            className="drop-shadow-xl rounded-full border-4 border-white bg-beige hover:scale-105 transition-transform duration-200" 
          />
        </Link>
        
        {/* TODO: hover effect not working. Fix it. */}
        {/* Capsule Nav */}
        <div className="w-[60vw] h-20 flex items-center justify-center rounded-full glass shadow-lg backdrop-blur-xl bg-white/40 border border-white/30 px-8" style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)'}}>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink href="#how-it-works" className="font-semibold text-lg text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer">How It Works</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#gallery" className="font-semibold text-lg text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer">Gallery</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#testimonials" className="font-semibold text-lg text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer">Testimonials</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#contact" className="font-semibold text-lg text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer">Contact</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
} 