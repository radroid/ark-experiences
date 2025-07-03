import HeroSection from '@/components/sections/hero-section'
import HowItWorks from '@/components/sections/how-it-works'
import GallerySection from '@/components/sections/gallery-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ContactForm from '@/components/sections/contact-form'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <GallerySection />
      <TestimonialsSection />
      <ContactForm />
    </main>
  )
}
