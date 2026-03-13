# 🚀 AKS.lab — Galactic AI Portfolio

> A premium developer portfolio inspired by cinematic sci-fi interfaces and galactic exploration, built for **Ayush Kumar Singh**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss) ![Three.js](https://img.shields.io/badge/Three.js-r172-black?logo=three.js)

---

## ✨ Live Features

### 🌌 Hero Section
- **Full 3D Space Scene** — React Three Fiber powered starfield (4000 particles), nebula clouds, wireframe neural nodes, and a holographic grid plane
- **Scroll-driven camera** — GSAP ScrollTrigger pushes the camera forward as you scroll, creating a wormhole rush-in effect with widening FOV
- **Mouse parallax** — Camera, stars and neural nodes react to mouse position in real-time
- **Glitch name animation** — CSS pseudo-element glitch effect on "AYUSH KUMAR SINGH" in cyan/pink
- **GSAP entrance** — Staggered reveal of role badges → name → subtitle → CTA buttons
- **Magnetic CTA buttons** — Elastic magnet effect following cursor on hover

### 🪐 Projects Section
- **Live 3D Solar System** — Orbiting planets represent projects, centered on a glowing icosahedron star
- **Clickable planets** — Click any planet to open its GitHub repo in a new tab
- **Hover interactions** — Planet glows brighter, scales up, cursor changes to pointer
- **3D floating labels** — Project name floats above each planet via `@react-three/drei` `<Text>`, with a "↗ click to open" sub-label on hover
- **"Click to access project" hint banner** — Pulsing animated banner above the solar system
- **Holographic project cards** — Feature list, tech stack badges, GitHub links

### 🌟 Skills Section
- **Interactive constellation map** — Canvas-based animated star nodes with glowing connection lines
- **4 skill categories** — Programming, Frameworks, Libraries, Concepts — click to re-animate

### 👤 About Section
- **Profile card** with role tags, KIIT education, CGPA
- **Stats grid** — CGPA, Projects, Technologies, Graduating Year
- **Animated timeline** — 3-step journey (2023–2025) with scroll-triggered entrance

### 📡 Contact Section
- **Email** → opens Gmail compose directly (`mail.google.com/mail/...`) pre-addressed
- **Phone** → `tel:` link opens native dialer with number pre-filled
- **LinkedIn** → direct profile link
- **GitHub** → direct profile link
- **One-click copy** buttons with visual "✓ Copied!" feedback
- **Hover hints** — action hint text appears on each card hover

### 🧭 Navbar
- Glassmorphic blur on scroll
- Animated layout pill for active nav link
- LinkedIn + GitHub buttons (desktop + mobile)
- Mobile hamburger menu with staggered reveal

### ⚙️ Core UX
- **Custom glowing cursor** — cyan dot + trailing ring (minimal lag lerp = 0.55)
- **Lenis smooth scrolling** — buttery smooth scroll via `@studio-freight` Lenis
- **Bidirectional infinite loop** — scroll past bottom → instantly at top; scroll up from top → instantly at bottom (via `wheel` event + `lenis.scrollTo(0, { immediate: true })`)
- **No scrollbar** — completely hidden across all browsers
- **Loading screen** — animated progress bar with 4 phases, spinning orb, fades into portfolio

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 3.4, Vanilla CSS |
| 3D Engine | Three.js r172, `@react-three/fiber` v9, `@react-three/drei` |
| Animation | Framer Motion 11, GSAP 3.12 + ScrollTrigger |
| Smooth Scroll | Lenis 1.3 |
| Fonts | Orbitron, Inter, JetBrains Mono (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system, animations, glow effects
│   ├── layout.tsx           # Root layout, fonts, providers
│   └── page.tsx             # Main page, loading screen, infinite loop
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       # Responsive navbar with scroll glass effect
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis setup + window.__lenis
│   ├── sections/
│   │   ├── HeroSection.tsx  # Hero + GSAP entrance + ScrollTrigger
│   │   ├── ProjectsSection.tsx  # 3D solar system + project cards
│   │   ├── SkillsSection.tsx    # Constellation map
│   │   ├── AboutSection.tsx     # Profile, stats, timeline
│   │   └── ContactSection.tsx   # Contact cards, Gmail/tel links
│   ├── three/
│   │   └── SpaceScene.tsx   # R3F starfield, nebula, neural nodes, scroll camera
│   └── ui/
│       └── CustomCursor.tsx # Glowing cursor dot + lagging ring
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Rooms for Improvement

### Performance
- [ ] **R3F instance sharing** — The Hero and Projects sections each create their own `<Canvas>`. Merging them into a single shared canvas would cut GPU memory usage
- [ ] **Texture atlasing** — Planet materials use procedural shaders; baked textures would be faster on mobile
- [ ] **Dynamic imports with fallback** — `SpaceScene` and `ProjectsSection` 3D scenes are already lazy-loaded, but adding skeleton/shimmer fallbacks would improve perceived performance
- [ ] **`react-three/offscreen`** — Move 3D rendering to a WebWorker to avoid blocking the main thread

### Features
- [ ] **Resume/CV download** — Add PDF upload to `/public/resume.pdf` and a download button in Hero or About section
- [ ] **Blog / Devlog section** — MDX-based posts about projects and learnings
- [ ] **Dark/Light mode toggle** — Currently locked to dark; a toggle could be added
- [ ] **Project detail modals** — Clicking a project card opens a full-screen modal with screenshots, live demo link, and extended description
- [ ] **More projects** — Add future projects to the `projects` array in `ProjectsSection.tsx`
- [ ] **Contact form** — Replace static links with an actual message form (e.g. EmailJS or Resend API)
- [ ] **Achievement/Certification section** — Highlight hackathons, certifications, or awards

### UX / Polish
- [ ] **Mobile touch loop** — The infinite loop uses `wheel` events; touch swipe at boundaries needs separate `touchstart/touchend` handling
- [ ] **Responsive 3D** — The solar system and hero scene are not optimized for mobile screen sizes; dynamic quality scaling would help
- [ ] **Scroll snap** — Add CSS `scroll-snap-type` for a more intentional section-by-section navigation on desktop
- [ ] **OG / Social preview image** — No Open Graph image set; generating one would improve link previews on social media
- [ ] **SEO** — Add `generateMetadata` per page, sitemap, and `robots.txt`
- [ ] **PWA support** — `next-pwa` is installed but not configured; adding a service worker would enable offline usage

### Code Quality
- [ ] **ESLint + Prettier** — Currently bypassed during builds; enabling would enforce consistent code style
- [ ] **Unit tests** — No tests exist; adding Vitest + React Testing Library for component tests would increase confidence
- [ ] **Storybook** — Isolated component development and visual testing

---

## 👨‍💻 Author

**Ayush Kumar Singh**  
B.Tech CSE — KIIT University (CGPA: 8.38)

[![GitHub](https://img.shields.io/badge/GitHub-ayushks110205-181717?logo=github)](https://github.com/ayushks110205)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ayush_Kumar_Singh-0A66C2?logo=linkedin)](https://www.linkedin.com/in/ayush-kumar-singh-384a58285/)
[![Email](https://img.shields.io/badge/Email-classsciencea@gmail.com-EA4335?logo=gmail)](mailto:classsciencea@gmail.com)

---

*Built with ❤️ and too many Three.js particles.*
