'use client'

import { Button } from '@/components/ui/button-2'
import { MapPin, Users, Clock } from 'lucide-react'
import { Typewriter } from '@/components/ui/typewriter'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function HeroSection() {
  const stats = [
    { icon: MapPin, label: '5 Secret Locations', description: 'Across Downtown Toronto' },
    { icon: Users, label: '2-3 Players', description: 'Per team' },
    { icon: Clock, label: '2 Hours', description: 'Duration' },
  ]

  const openEmailPopover = () => {
    window.dispatchEvent(new CustomEvent('openEmailPopover'));
  }

  return (
    <section id="hero-section" className="relative min-h-screen max-w-screen flex items-center justify-center overflow-hidden p-10">
      {/* Modern Grid Pattern Background */}
      <GridPattern
        width={100}
        height={95}
        x={-1}
        y={-1}
        strokeDasharray="0"
        className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
      />
      
      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0" style={{backgroundColor: 'var(--pure-white)', opacity: 0.5}} />

      {/* Main Content - Using CSS animations instead of Framer Motion */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="hero-inner space-y-8">
          <h1 
            className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{color: 'var(--text-primary)'}}
          >
            <span>Experience Toronto&apos;s </span>
            <br />
            <span style={{color: 'var(--primary-blue)'}}>
              <Typewriter 
                text={['Downtown', 'Simple Race', 'Mystery Hunt', 'Outdoor Adventure']}
                speed={100}
                deleteSpeed={50}
                waitTime={2000}
                loop={true}
                cursorChar="|"
                cursorClassName="ml-0"
              />
            </span>
          </h1>

          <p 
            className="hero-description text-md md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{color: 'var(--text-body)'}}
          >
            A race through Toronto&apos;s downtown where teams compete to complete challenges and unlock clues across 5 secret locations
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={openEmailPopover}
              className="px-8 py-6 text-lg font-semibold rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: 'var(--pure-white)'
              }}
            >
              Get Early Access
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => {
                const section = document.getElementById('how-it-works');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-6 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'var(--primary-blue)',
                color: 'var(--primary-blue)'
              }}
            >
              Learn More
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="hero-stats grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(51, 100, 255, 0.1)',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="p-3 rounded-full"
                    style={{
                      backgroundColor: 'rgba(51, 100, 255, 0.1)'
                    }}
                  >
                    <stat.icon 
                      className="w-6 h-6" 
                      style={{color: 'var(--primary-blue)'}}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="font-bold text-lg mb-1"
                      style={{color: 'var(--text-primary)'}}
                    >
                      {stat.label}
                    </p>
                    <p 
                      className="text-sm"
                      style={{color: 'var(--text-body)', opacity: 0.8}}
                    >
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* CSS animations - Much faster than Framer Motion! */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-content {
          animation: fadeIn 0.6s ease-out;
        }

        .hero-title {
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .hero-description {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .hero-cta {
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        .hero-stats {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .stat-card {
          animation: slideUp 0.6s ease-out both;
        }

        .stat-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>
    </section>
  )
}

