'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import { useInfiniteTouchLoop } from '@/hooks/useInfiniteTouchLoop'
import { useScrollSnap } from '@/hooks/useScrollSnap'

// ─── Loading Screen ────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('INITIALIZING')

  useEffect(() => {
    const phases = ['INITIALIZING...', 'LOADING ASSETS...', 'CALIBRATING 3D ENGINE...', 'ENTERING GALAXY...']
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 12 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onComplete, 600)
      }
      setProgress(Math.min(p, 100))
      setPhase(phases[Math.floor((p / 100) * phases.length)] || phases[3])
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[100, 180, 260].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-cyan-500/20"
            animate={{ rotate: 360, scale: [1, 1.02, 1] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div className="relative mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-500" style={{ borderRadius: '50%' }} />
        </motion.div>
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 flex items-center justify-center">
          <span className="font-orbitron font-black text-cyan-400">A</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-orbitron font-black text-white text-2xl mb-1 tracking-wider">
          AKS<span className="text-cyan-400">.</span>lab
        </h1>
        <p className="font-mono text-xs tracking-[0.3em] text-slate-500">GALACTIC AI PORTFOLIO</p>
      </div>

      <div className="w-64 space-y-3">
        <div className="h-px bg-slate-800/80 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00FFFF, #7C3AED, #FF00FF)',
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-slate-500">{phase}</span>
          <span className="font-mono text-xs text-cyan-400">{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const loopLock            = useRef(false)

  // ── Feature hooks (activate after loading completes) ──
  useInfiniteTouchLoop(loaded)   // mobile swipe boundary loop
  useScrollSnap(loaded)          // GSAP section-snap on desktop
  // ── Bidirectional infinite loop ──
  useEffect(() => {
    if (!loaded) return

    const onWheel = (e: WheelEvent) => {
      const scrolled = window.scrollY
      const viewH    = window.innerHeight
      const totalH   = document.documentElement.scrollHeight
      const atBottom = scrolled + viewH >= totalH - 60
      const atTop    = scrolled <= 1

      if (!loopLock.current) {
        if (atBottom && e.deltaY > 0) {
          // Scroll down past bottom → instant jump to top
          loopLock.current = true
          setTimeout(() => {
            if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
            else document.documentElement.scrollTop = 0
            setTimeout(() => { loopLock.current = false }, 800)
          }, 120)
        } else if (atTop && e.deltaY < 0) {
          // Scroll up past top → instant jump to bottom
          loopLock.current = true
          setTimeout(() => {
            const bottom = document.documentElement.scrollHeight - window.innerHeight
            if (window.__lenis) window.__lenis.scrollTo(bottom, { immediate: true })
            else document.documentElement.scrollTop = bottom
            setTimeout(() => { loopLock.current = false }, 800)
          }, 120)
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [loaded])

  return (
    <main className="relative min-h-screen bg-[#020408]">
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </motion.div>
      )}
    </main>
  )
}
