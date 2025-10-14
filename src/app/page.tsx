import HeroSection from '@/components/sections/hero-section'
import WhatSection from '@/components/sections/what-section'
import HowItWorks from '@/components/sections/how-it-works'
import GallerySection from '@/components/sections/gallery-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import Footer from '@/components/sections/footer'
import SectionScrollContainer from '@/components/sections/section-scroll-container'
import LazySection from '@/components/lazy-section'

export default function Home() {
  return (
    <main id="main-content">
      <SectionScrollContainer>
        {/* Hero loads immediately - critical for LCP */}
        <HeroSection />
        <WhatSection />
        <HowItWorks />
        
        <LazySection>
          <GallerySection />
        </LazySection>
        
        <TestimonialsSection />       
        <Footer />
        
      </SectionScrollContainer>
    </main>
  )
}
