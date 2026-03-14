<div align="center">

# Ayush Kumar Singh — Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r172-black?logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

**A modern, interactive developer portfolio featuring immersive 3D scenes, cinematic scroll animations, and adaptive rendering — built for performance, accessibility, and discoverability.**

[Live Demo](https://ayushks110205.github.io/portfolio) · [GitHub](https://github.com/ayushks110205/portfolio) · [LinkedIn](https://www.linkedin.com/in/ayush-kumar-singh-384a58285/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Featured Projects](#featured-projects)
- [Core Features](#core-features)
- [Performance Optimizations](#performance-optimizations)
- [SEO & Metadata](#seo--metadata)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

This portfolio is designed to feel like navigating a **Galactic AI command center** — a cinematic, space-themed interface with real-time 3D visuals, scroll-driven camera animations, and section-snapping navigation. It is production-ready with full SEO, Open Graph social cards, adaptive 3D rendering, and mobile touch gesture support.

---

## Featured Projects

| Project | Description | Tech |
|---|---|---|
| **AI Powered 8-Puzzle Solver** | BFS/A* algorithm visualizer with animated state transitions and step-by-step solution playback | React, TypeScript, Canvas |
| **N-Queen Visualizer** | Interactive backtracking algorithm visualizer with configurable board size and animation speed | Next.js, React, PWA |
| **Vertebrae Classification** | ML pipeline for spine vertebrae classification from medical imaging datasets | Python, scikit-learn, ResNet |

---

## Core Features

### Hero Section
- Full 3D space scene rendered with **React Three Fiber** — 4 000-particle starfield, chromatic nebula clouds, animated wireframe neural nodes, and a holographic perspective grid
- **Scroll-driven camera** via GSAP ScrollTrigger: camera rushes forward with widening FOV as the hero scrolls out (wormhole effect)
- **Mouse parallax**: stars, nodes, and camera shift smoothly with cursor position
- CSS **glitch animation** on the name heading with GSAP staggered entrance for all elements
- **Magnetic CTA buttons** using GSAP elastic easing

### Smooth Scroll & Navigation
- **Lenis** smooth scrolling with custom easing curves
- **GSAP ScrollSnap**: wheel and touch events debounced and snapped to the nearest section using Lenis `scrollTo` — fully compatible with Lenis's virtual scroll engine
- **Bidirectional infinite loop**: reaching the bottom snaps instantly to the top, and vice versa — using `lenis.scrollTo(0, { immediate: true })` for a flash-frame reset
- Mobile touch swipe detection with 40 px minimum threshold for boundary loop transitions

### Projects — Interactive 3D Solar System
- Orbiting 3D planets represent portfolio projects, each planet clickable to open its GitHub repo
- **Floating 3D labels** per planet via `@react-three/drei` `<Text>` — dim at rest, bright + "↗ click to open" on hover
- Orbit rings centered precisely at `orbitRadius` to align exactly with planet trajectories
- Holographic project cards below the solar system with feature lists and tech badges

### Skills Section
- **Canvas-based constellation map** — animated glowing star nodes connected by live lines
- 4 interactive category tabs that re-animate the constellation on click

### Contact Section
- **Email** → opens Gmail compose pre-addressed (no copy-paste required)
- **Phone** → `tel:` link triggers native dialer with number pre-filled
- **LinkedIn / GitHub** → direct profile links
- One-click clipboard copy with visual feedback

### Custom UX
- Custom glowing cursor: cyan dot + tracking ring (lerp = 0.55, near-instant follow)
- Loading screen with animated progress bar and 4 calibration phases
- No scrollbar (hidden via CSS across all browsers)
- `overscroll-behavior: none` prevents iOS rubber-band / Android glow

---

## Performance Optimizations

### Adaptive 3D Quality Scaling

The `useDeviceQuality` hook scores the device on three axes and returns a tier:

| Tier | Condition | Stars | Effects | DPR | Antialias |
|---|---|---|---|---|---|
| `high` | Wide screen + ≥ 4 cores | 4 000 | Stars, Nebula, Nodes, Grid | 1 – 2 | ✅ |
| `medium` | Tablet / small laptop | 1 800 | Stars + Nebula | 0.75 – 1.5 | ❌ |
| `low` | Mobile (< 768px) | 600 | Stars only | 0.5 – 1 | ❌ |

On `low` quality, the Projects solar system 3D canvas is replaced with static holographic cards to avoid GPU pressure on battery-constrained devices.

### Scroll Performance
- **Lenis** virtualizes the scroll position, preventing layout thrash on `scroll` events
- ScrollTrigger only drives a `useRef` (not a React state), avoiding re-renders on every frame
- R3F `useFrame` reads the ref directly — no prop drilling, no reconciler overhead

### Animation
- GSAP `context()` scoping ensures all tweens are properly cleaned up on component unmount
- `ScrollTrigger.getAll().forEach(t => t.kill())` prevents stale triggers on route changes

---

## SEO & Metadata

| Feature | Implementation |
|---|---|
| **Open Graph image** | Edge-runtime `ImageResponse` at `/api/og` — 1200×630 branded card |
| **Twitter Card** | `summary_large_image` pointing to `/api/og` |
| **Canonical URL** | Set via `metadataBase` + `alternates.canonical` |
| **Structured data** | JSON-LD `Person` schema with jobTitle, alumniOf KIIT, sameAs social URLs |
| **Sitemap** | Auto-generated at `/sitemap.xml` via `app/sitemap.ts` |
| **robots.txt** | Auto-generated at `/robots.txt` via `app/robots.ts` |
| **Indexability** | `robots: { index: true, follow: true }` in metadata |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4, Vanilla CSS |
| 3D Engine | Three.js r172, `@react-three/fiber` v9, `@react-three/drei` |
| Animation | GSAP 3.12 + ScrollTrigger, Framer Motion 11 |
| Smooth Scroll | Lenis 1.3 |
| Fonts | Orbitron, Inter, JetBrains Mono (Google Fonts) |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/
├── public/                         # Static assets
├── src/
│   ├── app/
│   │   ├── api/og/route.tsx         # Edge OG image generation
│   │   ├── globals.css              # Design tokens, animations, glow effects
│   │   ├── layout.tsx               # Root layout: metadata, JSON-LD, fonts
│   │   ├── page.tsx                 # Main page: loading screen, infinite loop
│   │   ├── sitemap.ts               # Auto /sitemap.xml
│   │   └── robots.ts                # Auto /robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx           # Glassmorphic navbar, LinkedIn + GitHub CTAs
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx  # Lenis init + window.__lenis
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Hero, GSAP entrance, ScrollTrigger camera
│   │   │   ├── ProjectsSection.tsx  # 3D solar system + holographic cards
│   │   │   ├── SkillsSection.tsx    # Canvas constellation map
│   │   │   ├── AboutSection.tsx     # Profile, stats, timeline
│   │   │   └── ContactSection.tsx   # Gmail/tel/LinkedIn/GitHub links
│   │   ├── three/
│   │   │   └── SpaceScene.tsx       # R3F scene: stars, nebula, nodes, camera
│   │   └── ui/
│   │       └── CustomCursor.tsx     # Glowing cursor dot + tracking ring
│   └── hooks/
│       ├── useDeviceQuality.ts      # high / medium / low tier detection
│       ├── useInfiniteTouchLoop.ts  # Mobile swipe boundary loop
│       └── useScrollSnap.ts        # GSAP section-snapping (desktop)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ayushks110205/portfolio.git
cd portfolio

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: `--legacy-peer-deps` is required due to React 19 peer dependency resolution across the Three.js ecosystem.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Next.js dev server with HMR |
| Build | `npm run build` | Create optimized production bundle |
| Start | `npm run start` | Serve production build locally |
| Lint | `npm run lint` | Run Next.js ESLint rules |
| Type Check | `npx tsc --noEmit` | TypeScript type validation |

---

## Deployment

The project is configured for zero-config deployment on **Vercel**.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel --prod
```

Alternatively, connect the GitHub repository to Vercel via the [dashboard](https://vercel.com/new) for automatic deploys on every push to `main`.

> After deployment, update `BASE_URL` in `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/layout.tsx` to your production domain.

---

## Screenshots

> _Screenshots will be added after the first production deployment._

| Section | Preview |
|---|---|
| Hero — 3D Space Scene | _(coming soon)_ |
| Projects — Solar System | _(coming soon)_ |
| Skills — Constellation Map | _(coming soon)_ |
| Contact | _(coming soon)_ |

---

## Future Improvements

- [ ] **Interactive algorithm demos** — real-time visualizations embedded in project cards
- [ ] **Advanced AI showcase** — live inference demos for the Vertebrae Classification model
- [ ] **Blog / Devlog** — MDX-based posts on projects and learnings
- [ ] **Resume download** — PDF linked from Hero/About section
- [ ] **Contact form** — EmailJS or Resend API replacing static links
- [ ] **Shared WebGL canvas** — merge Hero and Projects scenes into one `<Canvas>` to halve GPU load
- [ ] **PWA support** — service worker + offline caching via `next-pwa`
- [ ] **Achievements section** — hackathons, certifications, awards
- [ ] **Dark/Light mode** — system-preference-aware theme toggle
- [ ] **Unit & E2E tests** — Vitest + Playwright for component and scroll behavior coverage

---

## License

```
MIT License

Copyright (c) 2026 Ayush Kumar Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Built with ❤️ and too many Three.js particles.**

[![GitHub](https://img.shields.io/badge/GitHub-ayushks110205-181717?logo=github)](https://github.com/ayushks110205)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ayush_Kumar_Singh-0A66C2?logo=linkedin)](https://www.linkedin.com/in/ayush-kumar-singh-384a58285/)
[![Email](https://img.shields.io/badge/Email-classsciencea@gmail.com-EA4335?logo=gmail)](mailto:classsciencea@gmail.com)

</div>
