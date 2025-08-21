import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARK - Toronto\'s Ultimate Outdoor Escape Room',
    short_name: 'ARK',
    description: 'Toronto\'s most exciting outdoor escape room adventure! Perfect for escape room enthusiasts, board game lovers, and young professionals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/ark-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/ark-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['entertainment', 'business', 'games'],
    lang: 'en',
    orientation: 'portrait',
    scope: '/',
  }
}