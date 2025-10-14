import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnimeNavBarWrapper } from '@/components/ui/anime-navbar-wrapper'
import FloatingContactButton from '@/components/floating-contact-button'
import ScrollBehaviorHandler from '@/components/scroll-behavior-handler'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PerformanceOptimizer from "@/components/performance-optimizer";

export const metadata: Metadata = {
  title: "ARK - Outdoor Scavenger Hunt Toronto | Top Summer Activities & Downtown Adventures 2025",
  description: "Discover Toronto's #1 outdoor scavenger hunt experience! Perfect summer activity for groups, team building, date nights, and weekend adventures. Interactive puzzles and mystery solving across downtown Toronto. Book your outdoor escape room adventure today!",
  keywords: [
    // Primary keywords
    "outdoor scavenger hunt Toronto", "scavenger hunt Toronto", "outdoor scavenger hunt downtown Toronto",
    "summer activities Toronto", "things to do in Toronto summer", "outdoor activities Toronto",
    // Secondary keywords
    "outdoor escape room Toronto", "escape room downtown Toronto", "outdoor adventure Toronto",
    "summer activities Toronto 2025", "Toronto summer events", "outdoor games Toronto",
    // Activity-specific
    "team building activities Toronto", "group activities Toronto", "friends activities Toronto",
    "date ideas Toronto", "weekend activities Toronto", "fun things to do Toronto",
    // Experience-related
    "interactive experience Toronto", "puzzle solving Toronto", "mystery game Toronto",
    "adventure game Toronto", "treasure hunt Toronto", "city exploration Toronto",
    // Audience-specific
    "young professionals Toronto", "downtown Toronto activities", "unique experience Toronto",
    "outdoor entertainment Toronto", "Toronto attractions", "Toronto tourist activities"
  ],
  authors: [{ name: "ARK Scavenger Hunt", url: "https://www.funwithark.ca" }],
  creator: "ARK Scavenger Hunt",
  publisher: "ARK Scavenger Hunt",
  alternates: {
    canonical: "https://www.funwithark.ca",
  },
  openGraph: {
    title: "ARK - Outdoor Scavenger Hunt Toronto | Top Summer Activities 2025",
    description: "Toronto's #1 outdoor scavenger hunt! Perfect summer activity for team building, dates, and weekend fun. Interactive puzzles across downtown Toronto. Book your adventure today!",
    type: "website",
    siteName: "ARK Scavenger Hunt",
    url: "https://www.funwithark.ca",
    locale: "en_CA",
    images: [
      {
        url: "/ark-logo.webp",
        width: 1200,
        height: 630,
        alt: "ARK - Outdoor Scavenger Hunt and Summer Activities in Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FunWithARK",
    creator: "@FunWithARK",
    title: "ARK - Outdoor Scavenger Hunt Toronto | Top Summer Activities",
    description: "Toronto's #1 outdoor scavenger hunt! Perfect summer activity for groups, team building, and weekend adventures in downtown Toronto.",
    images: ["/ark-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Entertainment",
  classification: "Outdoor Scavenger Hunt, Summer Activities & Interactive Adventures",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.funwithark.ca"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.funwithark.ca/#organization",
        "name": "ARK",
        "alternateName": "Fun With ARK",
        "description": "Toronto's #1 outdoor scavenger hunt and summer activity destination. Interactive puzzle-solving adventures, outdoor escape room experiences, and team building activities across downtown Toronto. Perfect for groups, dates, and weekend entertainment.",
        "url": "https://www.funwithark.ca",
        "telephone": "+1-647-839-8849", 
        "email": "team@funwithark.ca",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.6532",
          "longitude": "-79.3832"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Toronto"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Ontario"
          }
        ],
        "serviceType": [
          "Outdoor Scavenger Hunt",
          "Summer Activities",
          "Outdoor Escape Room", 
          "Team Building Activities",
          "Adventure Game", 
          "Group Activities", 
          "Interactive Experience",
          "Tourist Attraction"
        ],
        "priceRange": "$$",
        "image": "https://www.funwithark.ca/ark-logo.webp",
        "logo": "https://www.funwithark.ca/ark-logo.webp",
        "sameAs": [
          "https://www.facebook.com/funwithark",
          "https://www.instagram.com/funwithark",
          "https://www.linkedin.com/company/funwithark"
        ],
        "knowsAbout": [
          "Outdoor Scavenger Hunts",
          "Summer Activities Toronto",
          "Team Building",
          "Escape Room Experiences",
          "Downtown Toronto Adventures"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.funwithark.ca/#service",
        "name": "Outdoor Scavenger Hunt Toronto",
        "alternateName": "ARK Outdoor Escape Room Adventure",
        "description": "Toronto's premier outdoor scavenger hunt experience. Perfect summer activity combining puzzle-solving, city exploration, and team building. Interactive outdoor escape room adventure across downtown Toronto for groups, dates, and weekend fun.",
        "provider": {
          "@id": "https://www.funwithark.ca/#organization"
        },
        "serviceType": "Outdoor Scavenger Hunt and Summer Activities",
        "areaServed": {
          "@type": "City",
          "name": "Toronto",
          "sameAs": "https://en.wikipedia.org/wiki/Toronto"
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Young Professionals, Groups, Tourists, and Adventure Seekers"
        },
        "category": "Entertainment & Recreation",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceLocation": {
            "@type": "City",
            "name": "Downtown Toronto"
          }
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "CAD",
          "description": "Outdoor scavenger hunt and escape room experience in Toronto"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "ARK Adventures",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Outdoor Scavenger Hunt",
                "description": "Interactive outdoor scavenger hunt across downtown Toronto"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Team Building Activities",
                "description": "Corporate and group team building adventures"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Summer Activities",
                "description": "Seasonal outdoor entertainment and adventures"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.funwithark.ca/#website",
        "url": "https://www.funwithark.ca",
        "name": "ARK - Outdoor Scavenger Hunt Toronto",
        "description": "Toronto's #1 outdoor scavenger hunt and summer activities destination. Interactive puzzle-solving adventures and outdoor escape room experiences in downtown Toronto.",
        "publisher": {
          "@id": "https://www.funwithark.ca/#organization"
        },
        "inLanguage": "en-CA",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.funwithark.ca/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.funwithark.ca/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.funwithark.ca"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.funwithark.ca/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an outdoor scavenger hunt in Toronto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An outdoor scavenger hunt is an interactive adventure game where teams explore downtown Toronto while solving puzzles and completing challenges. ARK offers Toronto's premier outdoor scavenger hunt experience, combining escape room elements with city exploration for an unforgettable group activity."
            }
          },
          {
            "@type": "Question",
            "name": "What are the best summer activities in Toronto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ARK's outdoor scavenger hunt is one of Toronto's top summer activities. Perfect for groups, team building, date nights, and weekend adventures. Our interactive outdoor experience combines puzzle-solving with exploring downtown Toronto's landmarks and hidden gems."
            }
          },
          {
            "@type": "Question",
            "name": "Is ARK good for team building activities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! ARK is an excellent team building activity in Toronto. Our outdoor scavenger hunt encourages collaboration, communication, and problem-solving while teams explore downtown Toronto together."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the outdoor scavenger hunt take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ARK's outdoor scavenger hunt typically takes 2-3 hours to complete, making it a perfect summer activity for a half-day adventure in downtown Toronto."
            }
          }
        ]
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://www.funwithark.ca/#attraction",
        "name": "ARK Outdoor Scavenger Hunt",
        "description": "Interactive outdoor scavenger hunt and summer activity in downtown Toronto featuring puzzles, mysteries, and city exploration.",
        "touristType": "Groups, Tourists, Young Professionals",
        "isAccessibleForFree": false,
        "availableLanguage": ["English"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "addressCountry": "CA"
        }
      }
    ]
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Preload critical LCP image */}
        <link 
          rel="preload" 
          as="image" 
          href="/ark-logo.webp"
          fetchPriority="high"
        />
        {/* Optimized font loading with preconnect and async */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Agrandir:wght@400;500;600;700;800&display=swap"
          media="print"
          // @ts-ignore - onLoad is valid for link elements
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Agrandir:wght@400;500;600;700;800&display=swap"
          />
        </noscript>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/gagalin"
          media="print"
          // @ts-ignore - onLoad is valid for link elements
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/gagalin" />
        </noscript>
        {/* DNS prefetch for analytics - defer non-critical connections */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body
        className="antialiased min-h-screen"
      >
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PerformanceOptimizer />
        <ScrollBehaviorHandler />
        <AnimeNavBarWrapper />
        <FloatingContactButton />
        {children}
        <SpeedInsights sampleRate={0.1} />
        <Analytics mode="production" />
      </body>
    </html>
  );
}
