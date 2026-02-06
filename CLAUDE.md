# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ARK Scavenger Hunt is a marketing/landing website for ARK Experiences, a corporate team-building scavenger hunt service in Toronto. Built with Next.js 15 (App Router), React 19, TypeScript 5.9, and Tailwind CSS 4. Deployed on Vercel with Supabase as the backend.

## Commands

```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build (NODE_ENV=production)
pnpm start        # Start production server
pnpm lint         # ESLint (next/core-web-vitals + next/typescript)
pnpm run optimize:images   # Sharp-based image optimization script
```

Package manager is **pnpm**. No test suite is configured.

## Architecture

### Routing & Rendering

- **App Router** with file-based routing in `src/app/`
- Server Components by default; `'use client'` only for interactive sections (hero, gallery, testimonials)
- API routes: `POST /api/contact` (contact form), `POST /api/email-signup` (newsletter)
- Server action in `src/app/actions/subscribe-email.ts`
- Blog pages under `src/app/blog/[slug]/page.tsx`

### Component Organization

- `src/components/sections/` — Full-page sections composing the homepage (hero, what, how-it-works, gallery, testimonials, founders, footer)
- `src/components/ui/` — Reusable primitives (Shadcn/ui style with CVA variants, Radix UI primitives)
- `src/components/blocks/` — Composite UI blocks (testimonials columns, cards stack)
- `src/components/lazy-section.tsx` — Intersection Observer wrapper for lazy-loading non-critical sections

### Backend Integration

- **Supabase**: PostgreSQL database with RLS enabled. Tables: `contacts`, `reviews`, `gallery_images`, `videos`, `email_signups`
- **Supabase Edge Functions**: `supabase/functions/send-contact-email/` (Deno) handles contact form email dispatch
- **Resend**: Email API for team notifications and customer confirmations. Templates in `src/lib/email-templates.ts`
- Supabase clients configured in `src/lib/supabase.ts` (public client + admin client with service role key)

### Key Libraries

- **Framer Motion** + **GSAP** for animations
- **CVA** (class-variance-authority) for type-safe component variants
- **Lucide React** for icons
- **OGL** for WebGL (future use)
- **Vercel Analytics** + **Speed Insights** for performance monitoring

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

## Code Conventions (from .cursor/rules/)

- **Strict TypeScript** — no `any`, no unsafe casts
- **Functional/declarative** — no classes or OOP patterns
- **File size limit** — 150 lines max; refactor when exceeded
- **Naming** — lowercase-dash for files/directories (`auth-wizard`), semantic names with auxiliaries (`isLoading`, `hasError`)
- **Named exports** preferred over default exports
- **RORO pattern** — functions receive one object, return one object
- **Server-first** — minimize `'use client'`; keep client components presentational
- **Shadcn UI** — add components via `npx shadcn@latest add`, don't fork core styles
- **Zustand** for ephemeral client UI state only (not currently used but planned)

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NEXT_PUBLIC_APP_URL           # http://localhost:3000 for dev
```

Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`

## Build Notes & Documentation

- Build notes go in `/ProjectDocs/Build_Notes/` with naming `build-title_phase-#_task-group-name.md`
- Notes are append-only; move completed ones to `/ProjectDocs/Build_Notes/completed/`
- Master project context in `/ProjectDocs/contexts/projectContext.md`

## Design System

WCAG 2.0 compliant color palette defined as CSS variables in `globals.css`:
- Primary Blue: `#0941B3` (14.6:1 contrast)
- YInMn Blue: `#2E5090` (dark backgrounds)
- Accent Orange: `#BD2E00` (8.7:1 contrast)
- Highlight Gold: `#A28300`
- Custom fonts: Agrandir (sans), Gagalin (heading), Courier (mono)

## Security Notes

- CSP frame-ancestors restricted to `curlycloud.dev` (for iframe embedding)
- `next.config.ts` sets security headers (X-Content-Type-Options, Referrer-Policy, X-DNS-Prefetch-Control)
- Console output stripped in production via compiler option
- Max webpack chunk size: 244KB
