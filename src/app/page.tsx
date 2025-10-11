import HeroSection from '@/components/sections/hero-section'
import WhatSection from '@/components/sections/what-section'
import HowItWorks from '@/components/sections/how-it-works'
import GallerySection from '@/components/sections/gallery-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ContactForm from '@/components/sections/contact-form'
import Footer from '@/components/sections/footer'
import SectionScrollContainer from '@/components/sections/section-scroll-container'

export default function Home() {
  return (
    <main id="main-content">
      <SectionScrollContainer>
        <HeroSection />
        <WhatSection />
        <HowItWorks />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />
        <Footer />
      </SectionScrollContainer>
    </main>
  )
}
