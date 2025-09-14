# ARK Scavenger Hunt - Next.js Website

A modern, responsive website for ARK Scavenger Hunt showcasing our Cluedo-themed team building experiences in Toronto. Built with Next.js 14, Tailwind CSS, Framer Motion, and deployed on Cloudflare Pages.

![ARK Scavenger Hunt](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue) ![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## 🎯 Features

- **Modern Design**: Glass-morphism effects, gradients, and smooth animations
- **Responsive Layout**: Mobile-first approach with beautiful breakpoints
- **Interactive Sections**: 
  - Hero section with animated background
  - How It Works timeline
  - Game modes and steps sections
  - Scoring system display
  - Image gallery with lightbox
  - Customer testimonials
  - Contact form with validation
- **Blog System**: SEO-optimized blog with dynamic routing
- **PWA Support**: Manifest file for progressive web app features
- **Backend Integration**: 
  - Supabase for database storage
  - Resend for email notifications
  - Form validation with Zod
- **Performance Optimized**: Next.js 15 with App Router, lazy loading, and optimized images

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.11 with custom utilities
- **Animations**: Framer Motion 12.23.12
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Forms**: React Hook Form 7.62.0 + Zod 3.25.76 validation
- **Icons**: Lucide React 0.525.0

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend 4.8.0
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ark-scavenger-hunt.git
   cd ark-scavenger-hunt
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # Resend Email Configuration
   RESEND_API_KEY=your_resend_api_key_here

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase Database**
   
   Run these SQL commands in your Supabase SQL editor:

   ```sql
   -- Create contacts table
   CREATE TABLE contacts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     company_name TEXT NOT NULL,
     contact_person TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     team_size INTEGER,
     preferred_date DATE,
     special_requirements TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted'))
   );

   -- Create reviews table
   CREATE TABLE reviews (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     company_name TEXT NOT NULL,
     reviewer_name TEXT NOT NULL,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     review_text TEXT NOT NULL,
     image_url TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     is_featured BOOLEAN DEFAULT FALSE
   );

   -- Create gallery_images table
   CREATE TABLE gallery_images (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     image_url TEXT NOT NULL,
     thumbnail_url TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     is_featured BOOLEAN DEFAULT FALSE
   );

   -- Create videos table
   CREATE TABLE videos (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     video_url TEXT NOT NULL,
     thumbnail_url TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     is_hero_video BOOLEAN DEFAULT FALSE
   );

   -- Enable Row Level Security
   ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
   ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
   ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

   -- Create policies for public access (adjust as needed)
   CREATE POLICY "Allow public inserts on contacts" ON contacts
     FOR INSERT WITH CHECK (true);

   CREATE POLICY "Allow public read on reviews" ON reviews
     FOR SELECT USING (is_featured = true);

   CREATE POLICY "Allow public read on gallery" ON gallery_images
     FOR SELECT USING (true);

   CREATE POLICY "Allow public read on videos" ON videos
     FOR SELECT USING (true);
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.


## 📁 Project Structure

```
├── apps/                    # Future monorepo applications
│   ├── hunt/               # Hunt-specific app (placeholder)
│   └── web/                # Web app (placeholder)
├── packages/               # Shared packages (future monorepo)
│   ├── lib/               # Shared library code
│   ├── types/             # Shared TypeScript types
│   └── ui/                # Shared UI components
├── src/                   # Main application source
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/   # Contact form API route
│   │   ├── blog/          # Blog pages and layout
│   │   ├── globals.css    # Global styles and custom utilities
│   │   ├── layout.tsx     # Root layout with metadata
│   │   ├── manifest.ts    # PWA manifest
│   │   ├── page.tsx       # Main homepage
│   │   └── sitemap.ts     # Dynamic sitemap generation
│   ├── components/
│   │   ├── sections/      # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── gallery-section.tsx
│   │   │   ├── game-modes-section.tsx
│   │   │   ├── game-steps-section.tsx
│   │   │   ├── scoring-system-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   ├── contact-form.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/            # Reusable UI components (Shadcn/ui)
│   │   └── blog-scroll-handler.tsx
│   ├── lib/
│   │   ├── supabase.ts    # Supabase client configuration
│   │   ├── resend.ts      # Resend email configuration
│   │   ├── email-templates.ts # Email template definitions
│   │   └── utils.ts       # Utility functions
│   └── types/
│       └── index.ts       # TypeScript type definitions
├── supabase/              # Supabase configuration and functions
│   ├── config.toml        # Supabase local config
│   └── functions/         # Edge functions
├── public/                # Static assets
│   ├── gallery/           # Gallery images and videos
│   └── ark-logo.png       # Brand assets
└── performance_review/    # Performance analysis reports
```

## 🎨 Customization

### Colors and Gradients
The website uses custom gradient classes defined in `globals.css`:
- `.gradient-hero` - Hero section background
- `.gradient-cluedo` - Cluedo-themed dark gradient
- `.glass` - Glass morphism effect
- `.animated-gradient` - Animated background gradient

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Follow the existing animation patterns with Framer Motion

### Modifying Forms
Forms use React Hook Form with Zod validation. Schema definitions are in each component file.

## 🔧 Development

### Available Scripts
- `pnpm dev` / `npm run dev` - Start development server
- `pnpm build` / `npm run build` - Build for production
- `pnpm start` / `npm run start` - Start production server
- `pnpm lint` / `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting - sometimes i prefer biome here.
- Tailwind CSS for styling
- Consistent naming conventions

## 📊 Analytics & Monitoring

Consider adding:
- Google Analytics or Vercel Analytics
- Sentry for error monitoring
- Supabase Analytics for database insights

## 📝 License

This project is private and proprietary to ARK Scavenger Hunt.

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Test thoroughly
4. Submit a pull request

## 🆘 Support

For technical issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Contact the development team

---

Built with ❤️ for unforgettable team building experiences in Toronto.
