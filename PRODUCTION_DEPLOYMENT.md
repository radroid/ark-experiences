# Production Deployment Guide

## 🚀 Production Readiness Checklist

### ✅ Completed Optimizations

- **Monorepo Structure**: Properly configured with pnpm workspaces
- **Build Optimizations**: Production-ready Next.js configurations
- **Security Headers**: Implemented in Next.js configs and nginx
- **Image Optimization**: WebP/AVIF support enabled
- **Compression**: Gzip enabled in nginx
- **Rate Limiting**: API and general request limits
- **Docker Support**: Multi-stage builds for optimal container sizes
- **CI/CD Pipeline**: GitHub Actions with staging/production environments
- **Type Safety**: All TypeScript errors resolved
- **Linting**: ESLint configured and passing

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `env.example`

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   ```

### Option 2: Docker + VPS/Cloud

1. **Build and Run with Docker Compose**
   ```bash
   # Copy environment file
   cp env.example .env.local
   # Edit .env.local with your values
   
   # Build and start services
   docker-compose up -d
   ```

2. **SSL Setup** (for custom domains)
   ```bash
   # Generate SSL certificates (Let's Encrypt)
   certbot certonly --webroot -w /var/www/html -d yourdomain.com
   
   # Copy certificates to ssl/ directory
   cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
   cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
   ```

### Option 3: Manual Server Setup

1. **Server Requirements**
   - Node.js 20+
   - pnpm 9+
   - Nginx (optional, for reverse proxy)
   - SSL certificate

2. **Build and Deploy**
   ```bash
   # Install dependencies
   pnpm install --frozen-lockfile
   
   # Build applications
   pnpm build:production
   
   # Start applications
   pnpm start
   ```

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Required for contact forms)
RESEND_API_KEY=your-resend-api-key

# Application URLs (Production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_HUNT_URL=https://yourdomain.com/hunt
```

### Optional Environment Variables

```bash
# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Security
NEXTAUTH_SECRET=your-secure-random-string
NEXTAUTH_URL=https://yourdomain.com
```

## 🔒 Security Checklist

- ✅ Security headers configured
- ✅ Rate limiting implemented
- ✅ HTTPS enforced
- ✅ Environment variables secured
- ✅ No sensitive data in client bundles
- ✅ CORS properly configured
- ✅ Input validation in place

## 📊 Monitoring & Performance

### Built-in Monitoring

- **Vercel Analytics**: Enabled for performance tracking
- **Next.js Speed Insights**: Real user metrics
- **Health Checks**: Available at `/health` endpoint

### Performance Optimizations

- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic with Next.js
- **Compression**: Gzip enabled
- **Caching**: Optimized cache headers
- **Bundle Analysis**: Run `pnpm build` to see bundle sizes

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   pnpm clean
   pnpm install
   pnpm build
   ```

2. **Environment Variable Issues**
   ```bash
   # Verify variables are loaded
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```

3. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check database schema is set up
   - Ensure RLS policies are configured

### Health Checks

```bash
# Check web app
curl https://yourdomain.com/health

# Check hunt app  
curl https://yourdomain.com/hunt/health
```

## 📈 Scaling Considerations

### Horizontal Scaling

- **Load Balancer**: Configure nginx upstream for multiple instances
- **Database**: Supabase handles scaling automatically
- **CDN**: Vercel provides global CDN automatically

### Vertical Scaling

- **Memory**: Monitor Node.js memory usage
- **CPU**: Profile with Next.js built-in profiler
- **Database**: Monitor Supabase dashboard for performance

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **Lint & Type Check**: Ensures code quality
2. **Build**: Creates production bundles
3. **Test**: Runs test suite
4. **Security Scan**: Vulnerability scanning
5. **Deploy**: Automatic deployment to staging/production

### Required GitHub Secrets

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🎯 Post-Deployment

1. **Verify Applications**
   - Test web app functionality
   - Test hunt app on mobile devices
   - Verify email functionality

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error rates
   - Review Core Web Vitals

3. **Set Up Alerts**
   - Configure uptime monitoring
   - Set up error tracking
   - Monitor database performance

Your ARK Scavenger Hunt monorepo is now production-ready! 🎉
