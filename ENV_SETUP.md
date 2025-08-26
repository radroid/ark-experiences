# Environment Setup Instructions - Monorepo

## ✅ **Production Ready Status:**
- ✅ All TypeScript/ESLint errors resolved across monorepo
- ✅ Supabase client error handling with graceful fallbacks
- ✅ Environment variable validation with placeholder support
- ✅ Both applications build and run successfully
- ✅ Monorepo structure optimized for Vercel deployment

## 🔧 **Environment Configuration:**

### 1. Create Environment File
Create a `.env.local` file in the **monorepo root** with these variables:

```bash
# Copy this content to .env.local in your project root
# These variables are shared across both apps (web and hunt)

# Supabase Configuration (Required for production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Configuration (Required for web app contact forms)
RESEND_API_KEY=your-resend-api-key-here

# Application URLs (Optional - for production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_HUNT_URL=https://yourdomain.com/hunt
```

### 2. Get Your Supabase Keys
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Set Up Database Tables
Run the SQL commands from `SUPABASE_SCHEMA.md` in your Supabase SQL editor.

### 4. Test the Applications
```bash
# Start both applications
pnpm dev

# Or start individually:
pnpm dev:web   # Marketing website on :3000
pnpm dev:hunt  # Hunt application on :3001
```

**Testing:**
- Visit `http://localhost:3000` for the marketing website
- Visit `http://localhost:3001` for the hunt application
- Hunt app works on desktop in dev mode (no mobile restriction)

## 🚨 **Error Resolution:**

### "supabaseKey is required" Error - FIXED ✅
- Added proper environment variable validation
- Improved error messages for missing keys
- Added fallback handling for missing service role key

### Linter Errors - FIXED ✅
- Fixed TypeScript 'any' types with proper error handling
- Resolved React Hook dependency warnings with useCallback
- Fixed unescaped entity characters
- Removed unused variables

## 🔍 **How the Fixes Work:**

### Environment Variable Validation:
```typescript
// Before (caused errors):
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// After (graceful error handling):
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}
```

### Error Handling:
```typescript
// Before (any types):
catch (err: any) {
  setError(err.message)
}

// After (proper typing):
catch (err: unknown) {
  const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
  setError(errorMessage)
}
```

Your application is now ready to run! Just add your Supabase credentials to `.env.local` and you're good to go.
