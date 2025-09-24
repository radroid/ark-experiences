# Project Context

- Apps: Landing (Next.js App Router, RSC-first), PWA app (offline-capable).
- AR/3D: Lives in the PWA app only; use `three`, `@react-three/fiber`, `@react-three/drei`, optional `react-xr`.
- Shared: `packages/` for UI, utils, types. Use named exports.
- UI: Shadcn components managed via `npx shadcn@latest add` per app.
- Data: Supabase integration; server-side usage preferred. Client access only with `NEXT_PUBLIC_*`.
- State: Server-derived first; Zustand for ephemeral UI state.
- Monorepo: `apps/` and `packages/`; pnpm workspaces; Turborepo tasks.
- Quality: Strict TS, functional style, ≤150-line files, RORO, DRY.
- PWA: Manifest, SW, offline routes, installability.
- Docs: Build Notes and Contexts per rules.
