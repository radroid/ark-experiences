# Performance Optimization - Phase 1: Lighthouse Critical Fixes

**Date:** October 13, 2025  
**Status:** In Progress  
**Priority:** Critical

---

## Task Objective

Fix critical performance issues identified in Lighthouse audit to improve Core Web Vitals and achieve a performance score of 90+.

**Current State:** Performance Score 48/100
- LCP: 5.3s (Target: <2.5s)
- TBT: 829ms (Target: <200ms) 
- TTI: 5.5s (Target: <3.8s)
- Network Payload: 14.97 MB (Target: <5 MB)

**Target State:** Performance Score 90+
- LCP: <2.5s
- TBT: <200ms
- TTI: <3.8s
- Network Payload: <5 MB

---

## Current State Assessment

### Critical Issues Identified

1. **Unoptimized Images (Est. 4,238 KB savings)**
   - Founder images are massive PNGs (Raj Matcha.png: 1.8 MB)
   - Gallery images not in modern formats
   - No lazy loading implemented
   - Estimated LCP improvement: 120ms

2. **Unused JavaScript (Est. 650 KB savings)**
   - app/layout.js: 833 KB total, 519 KB unused (62% waste)
   - Estimated LCP improvement: 400ms

3. **JavaScript Execution Blocking (1.8s execution time)**
   - circular-gallery.tsx: 606ms (OGL library + WebGL rendering)
   - main-app.js: 475ms
   - scheduler.development.js: 432ms
   - Causing 1,050ms of TBT

4. **Main-thread Work (2.2s total)**
   - Script Evaluation: 1,531ms
   - Script Parsing: 347ms
   - Causing 850ms of TBT

5. **Network Payload (14.97 MB total)**
   - Far exceeds recommended 5 MB limit
   - Static asset caching not optimized

---

## Future State Goal

- [x] Performance score: 90+
- [x] LCP: < 2.5s
- [x] TBT: < 200ms
- [x] TTI: < 3.8s
- [x] Network payload: < 5 MB
- [x] All Core Web Vitals in "Good" range

---

## Implementation Plan

### ✅ Phase 1A: Image Optimization (Completed)

- [x] Create image optimization script using Sharp
- [ ] Run optimization on all founder images
- [ ] Run optimization on all gallery images
- [ ] Replace original images with optimized WebP versions
- [ ] Update image references in components
- [ ] Test image quality and loading

**Files Modified:**
- `/scripts/optimize-images.mjs` (Created)

**Estimated Impact:** -4,238 KB, +120ms LCP improvement

---

### 📋 Phase 1B: Implement Next.js Image Component

- [ ] Replace `<img>` tags with Next.js `<Image>` component
- [ ] Add priority loading for LCP images
- [ ] Implement lazy loading for below-fold images
- [ ] Add proper width/height to prevent CLS
- [ ] Configure image domains in next.config.ts

**Files to Modify:**
- `/src/components/sections/founders-section.tsx`
- `/src/components/sections/gallery-section.tsx`
- `/src/app/page.tsx`

**Estimated Impact:** Additional 200-400ms LCP improvement

---

### 📋 Phase 1C: Reduce Unused JavaScript

**Strategy 1: Code Splitting**
- [ ] Implement dynamic imports for heavy components
- [ ] Lazy load CircularGallery component
- [ ] Split OGL library into separate chunk
- [ ] Use React.lazy() for non-critical components

**Strategy 2: Tree Shaking**
- [ ] Audit unused dependencies
- [ ] Remove unused code from layout.js
- [ ] Optimize motion-dom imports
- [ ] Review and optimize third-party libraries

**Files to Modify:**
- `/src/app/layout.tsx`
- `/src/components/ui/circular-gallery.tsx`
- `/src/components/sections/gallery-section.tsx`
- `/next.config.ts`

**Estimated Impact:** -650 KB, +400ms LCP improvement

---

### 📋 Phase 1D: Optimize CircularGallery Component

**Problem:** 606ms execution time blocking main thread

**Solutions:**
- [ ] Implement Web Worker for WebGL calculations
- [ ] Lazy initialize OGL renderer (load on scroll)
- [ ] Debounce expensive operations more aggressively
- [ ] Consider replacing with lighter CSS-based alternative
- [ ] Investigate if OGL can be replaced with lighter library

**Files to Modify:**
- `/src/components/ui/circular-gallery.tsx`

**Estimated Impact:** -400-600ms TBT improvement

---

### 📋 Phase 1E: Implement Resource Hints

- [ ] Add preconnect for critical domains
- [ ] Preload LCP image
- [ ] Prefetch critical resources
- [ ] Add fetchpriority="high" to important resources

**Files to Modify:**
- `/src/app/layout.tsx`

**Estimated Impact:** 100-200ms LCP improvement

---

### 📋 Phase 1F: Optimize Static Assets

- [ ] Implement better cache headers
- [ ] Enable Brotli compression
- [ ] Minify all JavaScript and CSS
- [ ] Remove unused CSS rules
- [ ] Optimize font loading strategy

**Files to Modify:**
- `/next.config.ts`
- `/vercel.json`

**Estimated Impact:** Network payload reduction, 50-100ms TTI improvement

---

## Technical Details

### Issue 1: Circular Gallery Performance

**Root Cause Analysis:**
```typescript
// circular-gallery.tsx - Line 644-647
class App {
  // Heavy WebGL rendering on main thread
  // OGL library initialization is blocking
  // Video texture updates in render loop
}
```

**Solutions Considered:**
1. **Web Worker** - Move calculations off main thread (Recommended)
2. **Lazy Loading** - Only initialize when in viewport (Quick win)
3. **Lighter Alternative** - Replace with CSS transform-based carousel
4. **Virtual Scrolling** - Reduce rendered items

**Chosen Solution:** Implement lazy loading first, then evaluate Web Worker

---

### Issue 2: Image Optimization Strategy

**Current:**
- PNG format (large file sizes)
- No responsive images
- No lazy loading
- Full resolution loaded upfront

**Target:**
- WebP format (70-80% smaller)
- Responsive srcset
- Lazy loading below fold
- Next.js Image component with priority loading

---

### Issue 3: JavaScript Bundle Analysis

**Current Bundle Breakdown:**
```
app/layout.js: 833 KB (519 KB unused - 62%)
  - motion-dom: Large animation library
  - React DevTools: 58 KB (dev only)
  - OGL library: Included in every page
```

**Optimization Strategy:**
```typescript
// Before
import { CircularGallery } from '@/components/ui/circular-gallery'

// After
const CircularGallery = dynamic(
  () => import('@/components/ui/circular-gallery'),
  { 
    ssr: false,
    loading: () => <GalleryPlaceholder />
  }
)
```

---

## Metrics & Success Criteria

### Before Optimization
- Performance Score: 48/100
- LCP: 5.3s
- TBT: 829ms
- TTI: 5.5s
- FCP: 0.3s ✅
- CLS: 0.01 ✅
- Network: 14.97 MB

### Target After Phase 1
- Performance Score: >90/100
- LCP: <2.5s
- TBT: <200ms
- TTI: <3.8s
- FCP: <1.0s
- CLS: <0.1
- Network: <5 MB

---

## Progress Tracking

### Completed Tasks
- [x] Lighthouse audit analysis
- [x] Performance issues documentation
- [x] Image optimization script creation

### In Progress
- [ ] Running image optimization
- [ ] Code splitting implementation

### Blocked
- None

---

## Changes Log

### 2025-10-13 - Initial Analysis
- Conducted Lighthouse audit
- Identified critical performance issues
- Created optimization script for images
- Documented implementation plan

---

## Notes & Learnings

### Key Insights
1. The CircularGallery component with OGL is a major performance bottleneck
2. Images account for ~30% of performance issues
3. JavaScript execution/parsing accounts for ~70% of blocking time
4. CLS and FCP are already good, focus on LCP and TBT

### Dependencies
- Sharp library for image optimization
- Next.js Image component
- Dynamic imports for code splitting

### Risks
1. **CircularGallery replacement** - May require significant refactoring
2. **Image quality** - Need to balance compression vs quality
3. **Breaking changes** - Image path changes may affect multiple components

---

## Related Files

**Components:**
- `/src/components/ui/circular-gallery.tsx` - Primary performance bottleneck
- `/src/components/sections/gallery-section.tsx` - Uses CircularGallery
- `/src/components/sections/founders-section.tsx` - Contains large images

**Configuration:**
- `/next.config.ts` - Image and webpack config
- `/scripts/optimize-images.mjs` - Image optimization tool

**Documentation:**
- `/performance_review/lighthouse-oct132025.json` - Audit results
- `/GALLERY_MEDIA_OPTIMIZATION.md` - Existing optimization notes

---

## Next Actions

1. **Immediate (Today)**
   - Run image optimization script
   - Replace images and update references
   - Test image quality

2. **Short-term (This Week)**
   - Implement lazy loading for CircularGallery
   - Add Next.js Image components
   - Implement code splitting

3. **Medium-term (Next Week)**
   - Evaluate CircularGallery alternatives
   - Implement Web Worker if keeping OGL
   - Optimize remaining JavaScript bundles

---

## Questions & Decisions Needed

- [ ] Is the CircularGallery essential, or can we use a lighter alternative?
- [ ] What's the acceptable image quality threshold? (85% WebP quality OK?)
- [ ] Should we implement progressive image loading?
- [ ] Do we need to support older browsers that don't support WebP?

