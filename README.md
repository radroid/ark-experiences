# ARK Scavenger Hunt - Monorepo

A complete digital platform for ARK Scavenger Hunt featuring both a marketing website and an interactive mobile hunt application. Built with Next.js 15, TypeScript, Tailwind CSS, and deployed on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue) ![Supabase](https://img.shields.io/badge/Supabase-Database-green) ![pnpm](https://img.shields.io/badge/pnpm-Monorepo-orange)

## 🏗️ Monorepo Structure

This repository contains two main applications and shared packages:

### Applications
- **`apps/web`** - Marketing website showcasing ARK Scavenger Hunt experiences
- **`apps/hunt`** - Interactive mobile scavenger hunt application

### Shared Packages
- **`packages/ui`** - Shared UI components (buttons, forms, cards, etc.)
- **`packages/lib`** - Shared utilities (Supabase client, email, utils)
- **`packages/types`** - Shared TypeScript type definitions

## 🎯 Features

### Marketing Website (`apps/web`)
- **Modern Design**: Glass-morphism effects, gradients, and smooth animations
- **Responsive Layout**: Mobile-first approach with beautiful breakpoints
- **Interactive Sections**: 
  - Hero section with animated background
  - How It Works timeline
  - Image gallery with lightbox
  - Customer testimonials
  - Contact form with validation
- **SEO Optimized**: Meta tags, sitemap, structured data
- **Performance Optimized**: Next.js 15 with App Router, lazy loading, and optimized images

### Hunt Application (`apps/hunt`)
- **Mobile-First Design**: Optimized for mobile scavenger hunt experience
- **Progressive Hunt Flow**: Locations unlock as players progress
- **Multi-Media Answers**: Text, image, audio, and video submissions
- **Real-Time Progress**: Live progress tracking and validation
- **Offline Capable**: Works with dev mode for testing without backend
- **Smart Fallback**: Automatically switches between Supabase and local storage

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0 with custom utilities
- **Animations**: Framer Motion
- **UI Components**: Custom component library in `packages/ui`
- **Forms**: React Hook Form + Zod validation

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel
- **Package Manager**: pnpm (monorepo support)

### Development Tools
- **Monorepo**: pnpm workspaces
- **Linting**: ESLint + TypeScript
- **CI/CD**: GitHub Actions
- **Type Safety**: Strict TypeScript across all packages

## 📦 Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/ark-scavenger-hunt.git
   cd ark-scavenger-hunt
   pnpm install
   ```

2. **Start development servers**
   ```bash
   # Start both apps
   pnpm dev

   # Or start individually
   pnpm dev:web   # Marketing site on :3000
   pnpm dev:hunt  # Hunt app on :3001
   ```

3. **Test the hunt immediately**
   - Visit `http://localhost:3001`
   - Click "Show Dev Login Options" 
   - Select a test user and start hunting!
   - No database setup required for testing

## 🛠️ Development Commands

```bash
# Development
pnpm dev              # Start both apps
pnpm dev:web          # Start marketing website (:3000)
pnpm dev:hunt         # Start hunt application (:3001)

# Building
pnpm build            # Build both apps
pnpm build:web        # Build marketing website
pnpm build:hunt       # Build hunt application

# Production
pnpm start            # Start both apps in production mode
pnpm start:web        # Start marketing website (:3000)
pnpm start:hunt       # Start hunt application (:3001)

# Quality Assurance
pnpm lint             # Lint both apps
pnpm lint:fix         # Fix linting issues
pnpm type-check       # TypeScript type checking

# Utilities
pnpm clean            # Clean build artifacts
```

## 📁 Project Structure

```
ark-scavenger-hunt/
├── apps/
│   ├── web/                    # Marketing website
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router
│   │   │   └── components/    # Web-specific components
│   │   ├── public/            # Static assets
│   │   └── package.json
│   └── hunt/                   # Hunt application
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── components/    # Hunt-specific components
│       │   └── lib/           # Hunt logic & data
│       ├── public/            # Hunt assets
│       └── package.json
├── packages/
│   ├── ui/                     # Shared UI components
│   │   └── src/components/    # Reusable components
│   ├── lib/                    # Shared utilities
│   │   └── src/               # Supabase, email, utils
│   └── types/                  # Shared TypeScript types
│       └── src/index.ts       # Type definitions
├── .github/workflows/          # CI/CD pipelines
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # Workspace configuration
└── vercel.json               # Deployment configuration
```

## 🌐 Deployment

### Vercel (Recommended)

The monorepo is configured for Vercel deployment:

1. **Connect Repository**
   - Import your repository to Vercel
   - Vercel automatically detects the monorepo structure

2. **Configure Projects**
   - **Web App**: Root directory, builds `apps/web`
   - **Hunt App**: Create separate project for `apps/hunt`

3. **Environment Variables**
   ```bash
   # Required for both apps
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Required for web app (contact forms)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Deploy**
   - Push to main branch for automatic deployment
   - Or use `vercel --prod` for manual deployment

### Build Configuration

The `vercel.json` is configured for the web app. For the hunt app, create a separate Vercel project with:
- Build Command: `pnpm build:hunt`
- Output Directory: `apps/hunt/.next`
- Install Command: `pnpm install`

## 🔧 Environment Setup

### Development (No Setup Required)
The hunt app works immediately with dev mode - no database needed!

### Production Setup
1. **Create Supabase Project**
2. **Run Database Setup** (see `DATABASE_SETUP_DEV.sql`)
3. **Set Environment Variables** (see `env.example`)
4. **Configure Email Service** (Resend)

See `QUICK_START.md` for detailed setup instructions.

## 🧪 Testing

### Hunt Application Testing
```bash
# Start hunt app
pnpm dev:hunt

# Visit http://localhost:3001
# Use dev mode for instant testing:
# 1. Click "Show Dev Login Options"
# 2. Select any test user
# 3. Start solving locations
# 4. Try answer: "Re-Reading Cafe" for location 1
```

### Marketing Website Testing
```bash
# Start web app
pnpm dev:web

# Visit http://localhost:3000
# Test contact forms, navigation, responsive design
```

## 📊 Performance & Analytics

- **Core Web Vitals**: Optimized for excellent performance scores
- **Image Optimization**: WebP/AVIF support with Next.js Image
- **Code Splitting**: Automatic with Next.js App Router
- **Bundle Analysis**: Built-in with Next.js build process
- **Analytics**: Vercel Analytics integration ready

## 🔒 Security

- **Environment Variables**: Secure handling of API keys
- **Type Safety**: Full TypeScript coverage
- **Input Validation**: Zod schemas for all forms
- **Security Headers**: Configured in Next.js
- **Rate Limiting**: Ready for production deployment

## 🤝 Contributing

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code patterns
   - Update relevant documentation
   - Add types for new features

3. **Test Thoroughly**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   ```

4. **Submit Pull Request**
   - Clear description of changes
   - Link to relevant issues
   - Include screenshots for UI changes

## 📚 Documentation

- **`QUICK_START.md`** - Get up and running in minutes
- **`PRODUCTION_DEPLOYMENT.md`** - Complete deployment guide
- **`LOCAL_TESTING_GUIDE.md`** - Detailed testing instructions
- **`ENV_SETUP.md`** - Environment configuration
- **`HUNT_SETUP.md`** - Hunt-specific setup
- **`SUPABASE_SCHEMA.md`** - Database schema documentation

## 🆘 Support

- **Development Issues**: Check the documentation files
- **Hunt Logic**: See `apps/hunt/src/lib/hunt-data-dev.ts`
- **UI Components**: See `packages/ui/src/components/`
- **Type Definitions**: See `packages/types/src/index.ts`

## 📝 License

This project is private and proprietary to ARK Scavenger Hunt.

---

Built with ❤️ for unforgettable team building experiences in Toronto.

**Ready to hunt?** Start with `pnpm dev` and visit `localhost:3001` 🕵️‍♀️