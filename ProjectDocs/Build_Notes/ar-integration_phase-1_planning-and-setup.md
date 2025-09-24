# AR Integration — Phase 1 — Planning and Setup

## Task Objective
Integrate AR and 3D rendering into the PWA app using three.js and WebXR, without impacting the landing page bundle.

## Current State Assessment
- Single Next.js app with landing and initial pages.
- No monorepo separation yet; no 3D/AR libs installed.
- PWA structure present but limited.

## Future State Goal
- Monorepo with `apps/pwa` housing AR features and three.js stack.
- Lazy-loaded 3D routes/components; no three.js on landing.
- Device capability checks, fallbacks, and performance budgets in place.

## Implementation Plan
1. Monorepo Setup
   - [ ] Scaffold `apps/pwa`, `apps/landing`, `packages/ui`, `packages/utils`.
   - [ ] Configure pnpm workspaces and Turborepo pipelines.
   - [ ] Move current app into `apps/landing` (temporary) and prep `apps/pwa`.
2. AR/3D Dependencies
   - [ ] Add `three`, `@react-three/fiber`, `@react-three/drei`, optional `react-xr` to `apps/pwa`.
   - [ ] Add loaders/compression tooling (Draco/KTX2) as needed.
3. PWA Enhancements
   - [ ] Ensure manifest, icons, SW caching strategies are defined for `apps/pwa`.
   - [ ] Add offline fallbacks and route-level caching.
4. Feature Structure
   - [ ] Create `apps/pwa/src/features/ar-scene` with minimal scene.
   - [ ] Add device support checks and graceful fallback UI.
   - [ ] Implement dynamic imports and Suspense for 3D routes.
5. Performance & Metrics
   - [ ] Establish fps and Web Vitals measurement for AR routes.
   - [ ] Define texture/asset budgets and loading strategy.
6. QA & Rollout
   - [ ] Test on target devices; verify offline and permissions flows.
   - [ ] Document learnings and update contexts if scope changes.

## Completion Summary
- (To be filled upon completion; do not delete plan items.)
