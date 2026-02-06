# Repository Setup Prompt for ARK Scavenger Hunt Companion App

Use this prompt to set up a new repository that follows the same best practices, structure, and conventions as the main ARK Scavenger Hunt project.

## 🎯 Project Overview

Create a companion app for players participating in the ARK Amazing Race scavenger hunt. This should be a modern, responsive Progressive Web App (PWA) that provides real-time game features, team management, and interactive experiences.

## 🏗️ Repository Structure & Best Practices

### Core Architecture Rules

1. **Monorepo Structure** (Future-ready)
   - Use `apps/` for applications and `packages/` for shared libraries
   - Keep framework-specific deps (Next.js, Tailwind) in each app
   - Place cross-cutting tools (ESLint, Prettier, Jest) at repo root
   - Prefer pnpm with workspace ranges for shared packages

2. **Next.js & React Conventions**
   - Target Next.js 15+ using App Router
   - Prefer Server Components, minimize `use client`
   - Use server actions, Route Handlers, and edge/runtime configs
   - Keep client components presentational
   - Use Suspense/streaming for data-heavy UI

3. **State Management**
   - Prefer server-derived state
   - Use Zustand only for ephemeral client UI state
   - Keep Zustand stores small with selector-based subscriptions

### File Structure Template

```
├── apps/
│   ├── companion/              # Main companion PWA app
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router
│   │   │   │   ├── (auth)/    # Auth routes
│   │   │   │   ├── (dashboard)/ # Dashboard routes
│   │   │   │   ├── api/       # API routes
│   │   │   │   ├── globals.css
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── manifest.ts
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── features/  # Feature-specific components
│   │   │   │   │   ├── ar-*   # AR features (if needed)
│   │   │   │   │   ├── game/  # Game-specific components
│   │   │   │   │   ├── team/  # Team management
│   │   │   │   │   └── location/ # Location-based features
│   │   │   │   ├── ui/        # Shadcn/ui components
│   │   │   │   └── shared/    # Shared components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── lib/           # Utilities and configurations
│   │   │   │   ├── supabase.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── validations.ts
│   │   │   ├── stores/        # Zustand stores
│   │   │   └── types/         # TypeScript definitions
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── web/                   # Landing/marketing site (if needed)
├── packages/
│   ├── ui-3d/                 # Shared 3D/AR components
│   ├── shared-types/          # Shared TypeScript types
│   └── shared-utils/          # Shared utilities
├── supabase/                  # Supabase configuration
│   ├── config.toml
│   ├── functions/
│   └── migrations/
├── scripts/                   # Build and utility scripts
├── .github/                   # GitHub workflows
├── docs/                      # Documentation
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # pnpm workspace config
├── turbo.json                 # Turborepo configuration
└── README.md
```

## 🛠️ Technology Stack

### Core Dependencies
```json
{
  "dependencies": {
    "next": "15.3.4",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "@supabase/supabase-js": "^2.53.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "lucide-react": "^0.525.0",
    "framer-motion": "^12.23.12",
    "zustand": "^4.4.0",
    "zod": "^3.25.76",
    "react-hook-form": "^7.62.0"
  },
  "devDependencies": {
    "@types/node": "^20.19.9",
    "@types/react": "^19.1.9",
    "@types/react-dom": "^19.1.7",
    "typescript": "^5.9.2",
    "tailwindcss": "^4.1.11",
    "eslint": "^9.32.0",
    "eslint-config-next": "15.3.4",
    "sharp": "^0.33.5"
  }
}
```

### AR/3D Dependencies (if needed)
```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "react-xr": "^3.0.0"
  }
}
```

## 📋 Configuration Files

### 1. Root package.json
```json
{
  "name": "ark-companion-app",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "latest",
    "eslint": "^9.32.0",
    "prettier": "^3.0.0",
    "typescript": "^5.9.2"
  }
}
```

### 2. pnpm-workspace.yaml
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 3. turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}
```

### 4. Next.js Config (apps/companion/next.config.ts)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeServerReact: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 5. TypeScript Config (apps/companion/tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 6. ESLint Config (eslint.config.mjs)
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {},
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
```

### 7. Shadcn/ui Config (apps/companion/components.json)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## 🎨 Code Quality & Style Rules

### TypeScript & Code Style
- Use strict TypeScript everywhere. Avoid `any` and unsafe casts
- Embrace functional, declarative programming; avoid classes and OOP patterns
- Limit files to ≤150 lines. If exceeded, refactor into smaller modules
- Prefer iteration and composition over duplication. Be DRY
- Use descriptive, semantic names with auxiliaries: `isLoading`, `hasError`, `shouldRender`
- Directories and files use lowercase-dash naming: `components/auth-wizard`
- Favor named exports for components and utilities
- Use RORO: functions receive one object and return one object
- Keep components small and focused. Extract hooks and utilities when logic grows

### Performance & Web Vitals
- Optimize Web Vitals (LCP, CLS, FID)
- Budget images, defer non-critical JS, prefetch where appropriate
- Run regular refactors and code reviews to enforce consistency
- Lazy-load 3D code paths using dynamic imports
- Use suspense and route-level code splitting for scenes
- Optimize assets: Draco/KTX2 compression, texture atlases

## 🗄️ Database Schema (Supabase)

### Core Tables
```sql
-- Teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  game_session_id UUID REFERENCES game_sessions(id)
);

-- Players table
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  team_id UUID REFERENCES teams(id),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Game sessions table
CREATE TABLE game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  coordinates POINT,
  clue_text TEXT,
  hint_text TEXT,
  order_index INTEGER,
  game_session_id UUID REFERENCES game_sessions(id)
);

-- Team progress table
CREATE TABLE team_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  location_id UUID REFERENCES locations(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  score INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_progress ENABLE ROW LEVEL SECURITY;
```

## 🚀 PWA Configuration

### Manifest (apps/companion/src/app/manifest.ts)
```typescript
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARK Companion - Scavenger Hunt',
    short_name: 'ARK Companion',
    description: 'Companion app for ARK Scavenger Hunt participants',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

## 📱 Key Features to Implement

### Core Features
1. **Team Management**
   - Team creation and joining
   - Player roles and permissions
   - Real-time team status

2. **Game Interface**
   - Location-based clues and hints
   - Progress tracking
   - Score display and leaderboards
   - AR integration for clue discovery

3. **Real-time Features**
   - Live game updates
   - Team communication
   - Location check-ins
   - Time tracking

4. **Offline Support**
   - PWA capabilities
   - Offline clue access
   - Sync when online

### AR Features (if applicable)
- WebXR integration for AR clues
- Three.js 3D elements
- Location-based AR experiences
- Camera integration for clue scanning

## 🔧 Development Workflow

### Setup Commands
```bash
# Initialize repository
git init
git remote add origin <your-repo-url>

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Fill in environment variables

# Run development
pnpm dev

# Build for production
pnpm build
```

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="ARK Companion"

# Optional: AR/3D Configuration
NEXT_PUBLIC_ENABLE_AR=true
NEXT_PUBLIC_AR_DEBUG=false
```

## 📚 Documentation Structure

### Required Documentation
1. **README.md** - Project overview, setup, and usage
2. **docs/API.md** - API documentation
3. **docs/DEPLOYMENT.md** - Deployment instructions
4. **docs/ARCHITECTURE.md** - System architecture
5. **docs/CONTRIBUTING.md** - Contribution guidelines

### Build Notes (Following ARK pattern)
- Create `/docs/build-notes/` directory
- Use naming: `build-title_phase-#_task-group-name.md`
- Include: Task Objective, Current State, Future State, Implementation Plan
- Move completed notes to `/docs/build-notes/completed/`

## 🎯 Implementation Checklist

### Phase 1: Foundation
- [ ] Set up monorepo structure
- [ ] Configure Next.js 15 with App Router
- [ ] Set up TypeScript with strict mode
- [ ] Configure Tailwind CSS and Shadcn/ui
- [ ] Set up Supabase database
- [ ] Implement basic authentication
- [ ] Create PWA manifest and service worker

### Phase 2: Core Features
- [ ] Team creation and management
- [ ] Player registration and roles
- [ ] Game session management
- [ ] Location and clue system
- [ ] Progress tracking
- [ ] Real-time updates with Supabase

### Phase 3: Advanced Features
- [ ] AR integration (if needed)
- [ ] Offline support
- [ ] Push notifications
- [ ] Analytics and monitoring
- [ ] Performance optimization

### Phase 4: Polish
- [ ] UI/UX improvements
- [ ] Accessibility enhancements
- [ ] Testing implementation
- [ ] Documentation completion
- [ ] Deployment setup

## 🚨 Important Notes

1. **Follow the existing ARK project patterns** for consistency
2. **Keep components small and focused** - extract when they grow
3. **Use server-first approach** - minimize client-side JavaScript
4. **Implement proper error boundaries** and loading states
5. **Test on mobile devices** - this is primarily a mobile app
6. **Consider offline-first architecture** for better UX
7. **Implement proper security** with RLS policies
8. **Monitor performance** with Web Vitals
9. **Use semantic HTML** for accessibility
10. **Follow PWA best practices** for installability

This prompt provides a comprehensive foundation for creating a companion app that matches the quality and structure of your main ARK Scavenger Hunt project while being optimized for the specific needs of game participants.
