# ARK Scavenger Hunt - Monorepo Project Plan

## Project Overview
A complete digital platform for ARK Scavenger Hunt featuring both a marketing website and an interactive mobile hunt application. The project has evolved from a single website into a comprehensive monorepo solution.

## Project Goals
- ✅ **Marketing Website**: Compelling showcase of scavenger hunt experiences
- ✅ **Hunt Application**: Interactive mobile scavenger hunt platform
- ✅ **Lead Generation**: Contact forms and customer engagement
- ✅ **Social Proof**: Reviews, testimonials, and gallery
- ✅ **Production Ready**: Fully deployable monorepo structure

## Technical Stack

### Monorepo Architecture
- **Package Manager**: pnpm with workspaces
- **Applications**: 2 Next.js apps (`web`, `hunt`)
- **Shared Packages**: UI components, utilities, types
- **Build System**: Concurrent builds and development

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0 (strict mode)
- **Styling**: Tailwind CSS 4.0 with custom utilities
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: Shared component library (`packages/ui`)
- **Typography**: Modern font stack (Inter/Geist)

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Resend for contact form notifications
- **File Upload**: Supabase Storage for media uploads
- **Deployment**: Vercel (optimized for monorepos)
- **CI/CD**: GitHub Actions with automated testing

### Design Principles
- Modern, Framer-inspired design with gradients and glass-morphism
- Responsive design (mobile-first approach)
- Accessibility compliance (WCAG 2.1)

## 🎉 Project Status: COMPLETED

### ✅ Completed Features

#### Marketing Website (`apps/web`)
- ✅ Modern responsive design with glass-morphism effects
- ✅ Hero section with animated background
- ✅ Interactive gallery with lightbox functionality
- ✅ Customer testimonials section
- ✅ Contact form with Zod validation
- ✅ SEO optimization (meta tags, sitemap)
- ✅ Performance optimization (Core Web Vitals)
- ✅ Email integration with Resend

#### Hunt Application (`apps/hunt`)
- ✅ Mobile-first scavenger hunt interface
- ✅ Progressive location unlocking system
- ✅ Multi-media answer submission (text, image, audio, video)
- ✅ Real-time progress tracking
- ✅ Dev mode for testing without backend
- ✅ Smart fallback between Supabase and localStorage
- ✅ Authentication system with email magic links
- ✅ Complete hunt flow with 7 locations

#### Shared Infrastructure
- ✅ Monorepo structure with pnpm workspaces
- ✅ Shared UI component library (`packages/ui`)
- ✅ Shared utilities and types (`packages/lib`, `packages/types`)
- ✅ TypeScript strict mode across all packages
- ✅ ESLint and Prettier configuration
- ✅ Production build optimization

#### Development & Deployment
- ✅ Development environment setup
- ✅ Production build configuration
- ✅ Vercel deployment configuration
- ✅ GitHub Actions CI/CD pipeline
- ✅ Environment variable management
- ✅ Comprehensive documentation

### 🚀 Ready for Production

The monorepo is now **production-ready** with:
- Both applications building successfully
- All TypeScript errors resolved
- Comprehensive test coverage via dev mode
- Deployment configuration for Vercel
- Complete documentation suite
- Performance optimization (Core Web Vitals)

## Website Structure (Single Page with Sections)

### 1. Hero Section
- Compelling headline about team-building scavenger hunts
- Cluedo theme visual elements
- Call-to-action button
- Background: Gradient with animated elements

### 2. Experience Overview
- Description of the scavenger hunt concept
- Toronto locations showcase
- Team-building benefits
- Interactive elements showing the 9 locations

### 3. How It Works
- Step-by-step process explanation
- Cluedo murder mystery elements (weapon, person, reason)
- Scoring system explanation
- Animated timeline/process flow

### 4. Video Showcase
- Hero video upload capability
- Video player with modern controls
- Call-to-action overlay

### 5. Gallery Section
- Image carousel/grid of past events
- Interactive hover effects
- Lightbox functionality
- Upload capability for new images

### 6. Reviews & Testimonials
- Customer testimonials with ratings
- Company logos of past clients
- Social proof elements
- Review submission form

### 7. Contact Form
- Lead capture form with fields:
  - Company name
  - Contact person
  - Email
  - Phone
  - Team size
  - Preferred date
  - Special requirements
- Integration with Supabase and Resend

### 8. Footer
- Contact information
- Social media links
- Legal links (Privacy Policy, Terms)

## Database Schema (Supabase)

### Tables

#### `contacts`
```sql
- id (uuid, primary key)
- company_name (text)
- contact_person (text)
- email (text, required)
- phone (text)
- team_size (integer)
- preferred_date (date)
- special_requirements (text)
- created_at (timestamp)
- status (enum: 'new', 'contacted', 'converted')
```

#### `reviews`
```sql
- id (uuid, primary key)
- company_name (text)
- reviewer_name (text)
- rating (integer, 1-5)
- review_text (text)
- image_url (text)
- created_at (timestamp)
- is_featured (boolean)
```

#### `gallery_images`
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- image_url (text)
- thumbnail_url (text)
- created_at (timestamp)
- is_featured (boolean)
```

#### `videos`
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- video_url (text)
- thumbnail_url (text)
- created_at (timestamp)
- is_hero_video (boolean)
```

## Development Phases

### Phase 1: Project Setup & Infrastructure
1. Initialize Next.js 14 project with TypeScript
2. Configure Tailwind CSS and Shadcn/ui
3. Set up Supabase project and database
4. Configure Resend email service
5. Set up basic project structure

### Phase 2: Core Components & Layout
1. Create reusable UI components
2. Implement responsive layout
3. Set up Framer Motion animations
4. Create gradient and glass-morphism styles

### Phase 3: Main Sections Development
1. Hero section with animations
2. Experience overview with interactive elements
3. How it works timeline
4. Gallery with image management

### Phase 4: Advanced Features
1. Video upload and playback
2. Review system with ratings
3. Contact form with validation
4. Admin functionality for content management

### Phase 5: Backend Integration
1. Supabase database setup
2. File upload to Supabase Storage
3. Contact form submission handling
4. Email notifications via Resend

### Phase 6: Deployment & Optimization
1. Cloudflare Pages deployment setup
2. Performance optimization
3. SEO implementation
4. Analytics integration

## Key Features Implementation

### Animation Strategy
- Page load animations with stagger effects
- Scroll-triggered animations using Intersection Observer
- Hover effects with micro-interactions
- Smooth page transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images for different screen sizes

### Performance Optimization
- Next.js Image optimization
- Lazy loading for images and videos
- Code splitting and tree shaking
- Caching strategies for Cloudflare deployment

## Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Success Metrics
- Page load speed < 2 seconds
- Mobile responsiveness score > 95%
- Accessibility score > 90%
- Contact form conversion rate tracking
- User engagement metrics

## Timeline Estimate
- **Week 1**: Setup, infrastructure, and basic layout
- **Week 2**: Core sections and animations
- **Week 3**: Advanced features and backend integration
- **Week 4**: Testing, optimization, and deployment

## Next Steps
1. Initialize Next.js project
2. Set up development environment
3. Configure Supabase and Resend
4. Begin with hero section development 