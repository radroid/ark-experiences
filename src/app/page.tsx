import HeroSection from '@/components/sections/hero-section'
import HowItWorks from '@/components/sections/how-it-works'
import GallerySection from '@/components/sections/gallery-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ContactForm from '@/components/sections/contact-form'
import SectionScrollContainer from '@/components/sections/section-scroll-container'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionScrollContainer>
        <HeroSection />
        <HowItWorks />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />
      </SectionScrollContainer>
    </main>
  )
}
