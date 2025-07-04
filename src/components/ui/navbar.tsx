import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#hero-section" className="flex-shrink-0">
            <Image 
              src="/ark-logo.png" 
              alt="ARK Experience Logo" 
              width={48} 
              height={48} 
              className="rounded-full shadow-soft hover:scale-105 transition-transform duration-200" 
            />
          </Link>
          
          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#how-it-works" 
                  className="font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  How It Works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#gallery" 
                  className="font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  Gallery
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#testimonials" 
                  className="font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#contact" 
                  className="font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
} 