# César Diego Anovich - Portfolio

## Overview

A world-class personal portfolio for César Diego Anovich, a Full-Stack Developer and AdTech specialist. Built with React + Vite, featuring bilingual support (PT/EN), animations with Framer Motion, glassmorphism cards, floating WhatsApp button, and a dark navy/cyan/violet design.

## Artifacts

- **portfolio** — Main portfolio site at `/` (React + Vite)

## Portfolio Features

- Bilingual (PT/EN) with localStorage persistence
- Animated hero with typewriter effect
- Skills section with glassmorphism cards and hover glow effects
- Projects section with 3D tilt hover cards
- Activities section with stats
- Contact form with send animation
- Floating WhatsApp button with pulse animation
- Smooth scroll navigation, Framer Motion scroll animations
- Fully responsive (mobile hamburger menu)

---

# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
