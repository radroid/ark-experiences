import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/ui/navbar'
import FloatingContactButton from '@/components/floating-contact-button'
import ScrollBehaviorHandler from '@/components/scroll-behavior-handler'
import PerformanceOptimizer from '@/components/performance-optimizer'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARK - Toronto's Ultimate Outdoor Escape Room & Downtown Adventure Experience",
  description: "Experience Toronto's most exciting outdoor escape room adventure! Perfect for escape room enthusiasts, board game lovers, and young professionals who want to explore downtown Toronto in a whole new way. Interactive puzzles, mystery solving, and unforgettable group experiences.",
  keywords: [
    "outdoor escape room Toronto", "escape room downtown Toronto", "outdoor adventure Toronto", "board game experience Toronto",
    "friends activities Toronto", "group activities Toronto", "puzzle solving Toronto", "mystery game Toronto",
    "interactive experience Toronto", "escape room alternative", "outdoor puzzle game", "adventure game Toronto",
    "downtown Toronto activities", "young professionals Toronto", "weekend activities Toronto", "date activity Toronto",
    "unique experience Toronto", "problem solving game", "outdoor mystery", "escape room enthusiasts", "board game lovers"
  ],
  authors: [{ name: "ARK Scavenger Hunt", url: "https://www.funwithark.ca" }],
  creator: "ARK Scavenger Hunt",
  publisher: "ARK Scavenger Hunt",
  alternates: {
    canonical: "https://www.funwithark.ca",
  },
  openGraph: {
    title: "ARK - Toronto's Ultimate Outdoor Escape Room Adventure",
    description: "The ultimate outdoor escape room experience in downtown Toronto! Perfect for escape room enthusiasts, board game lovers, and friends looking for unique adventures. Book your mystery today!",
    type: "website",
    siteName: "ARK Scavenger Hunt",
    url: "https://www.funwithark.ca",
    locale: "en_CA",
    images: [
      {
        url: "/ark-logo.png",
        width: 1200,
        height: 630,
        alt: "ARK Scavenger Hunt - Outdoor Escape Room Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FunWithARK",
    creator: "@FunWithARK",
    title: "ARK - Toronto's Ultimate Outdoor Escape Room Adventure",
    description: "The ultimate outdoor escape room experience in downtown Toronto! Perfect for escape room enthusiasts and board game lovers.",
    images: ["/ark-logo.png"],
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
  classification: "Outdoor Escape Room & Interactive Adventure",
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
        "description": "Toronto's ultimate outdoor escape room experience for young professionals, escape room enthusiasts, and board game lovers. Interactive puzzle solving adventures across downtown Toronto.",
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
        "serviceType": ["Outdoor Escape Room", "Adventure Game", "Group Activities", "Interactive Experience"],
        "priceRange": "$$",
        "image": "https://www.funwithark.ca/ark-logo.png",
        "logo": "https://www.funwithark.ca/ark-logo.png",
        "sameAs": [
          "https://www.facebook.com/funwithark",
          "https://www.instagram.com/funwithark",
          "https://www.linkedin.com/company/funwithark"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.funwithark.ca/#how-it-works",
        "name": "Outdoor Escape Room Adventure",
        "description": "Interactive outdoor escape room experience designed for escape room enthusiasts, board game lovers, and young professionals exploring downtown Toronto.",
        "provider": {
          "@id": "https://www.funwithark.ca/"
        },
        "serviceType": "Outdoor Escape Room Experience",
        "areaServed": {
          "@type": "City",
          "name": "Toronto",
          "sameAs": "https://en.wikipedia.org/wiki/Toronto"
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Young Professionals and Escape Room Enthusiasts"
        },
        "category": "Entertainment",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "CAD"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.funwithark.ca/",
        "url": "https://www.funwithark.ca",
        "name": "ARK",
        "description": "Toronto's ultimate outdoor escape room adventure for young professionals and escape room enthusiasts",
        "publisher": {
          "@id": "https://www.funwithark.ca/"
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
        "@id": "https://www.funwithark.ca/",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.funwithark.ca"
          }
        ]
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PerformanceOptimizer />
        <ScrollBehaviorHandler />
        <Navbar />
        <FloatingContactButton />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
