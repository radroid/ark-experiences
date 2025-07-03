import Image from 'next/image'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center w-full justify-center pointer-events-none">
      {/* Logo - outside the capsule */}
      <div className="relative -left-24 pointer-events-auto">
        <Image src="/ark-logo.png" alt="ARK Experience Logo" width={90} height={90} className="drop-shadow-xl rounded-full border-4 border-white bg-beige" />
      </div>
      {/* Capsule Nav */}
      <div className="w-[60vw] max-w-5xl h-20 flex items-center justify-center rounded-full glass shadow-2xl pointer-events-auto backdrop-blur-xl bg-white/40 border border-white/30" style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)'}}>
        <NavigationMenu className="w-full flex justify-between px-8">
          <NavigationMenuList className="flex w-full justify-between gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink href="#how-it-works" className="font-semibold text-lg text-blue-700 hover:text-orange-500 transition">How It Works</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#gallery" className="font-semibold text-lg text-blue-700 hover:text-orange-500 transition">Gallery</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#testimonials" className="font-semibold text-lg text-blue-700 hover:text-orange-500 transition">Testimonials</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#contact" className="font-semibold text-lg text-blue-700 hover:text-orange-500 transition">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
} 