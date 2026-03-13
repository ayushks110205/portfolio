'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SpaceScene = dynamic(() => import('@/components/three/SpaceScene'), { ssr: false })

// ─── Magnetic Button ─────────────────────────────────────────────────────────
const MagneticButton = ({ children, className, onClick }: {
  children: React.ReactNode
  className: string
  onClick?: () => void
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-cursor="hover"
    >
      {children}
    </button>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const scrollRef    = useRef(0)            // <- shared with SpaceScene via R3F
  const sectionRef   = useRef<HTMLElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const badgesRef    = useRef<HTMLDivElement>(null)
  const btnsRef      = useRef<HTMLDivElement>(null)

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth  - 0.5) * 2)
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // GSAP: hero entrance + ScrollTrigger camera
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Entrance timeline ──
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.fromTo(badgesRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(titleRef.current,    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, '-=0.3')
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo(btnsRef.current,     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    })

    // ── ScrollTrigger: drives 3D camera via scrollRef ──
    const st = ScrollTrigger.create({
      trigger:  sectionRef.current,
      start:    'top top',
      end:      'bottom top',
      scrub:    1,
      onUpdate: (self) => {
        scrollRef.current = self.progress
      },
    })

    return () => {
      ctx.revert()
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-[#020408]" />}>
          <SpaceScene mouseX={mouseX} mouseY={mouseY} scrollRef={scrollRef} />
        </Suspense>
      </div>

      {/* Vignette overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#020408]/40 to-[#020408]/80 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020408] to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Role badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-2 mb-8 opacity-0">
          {['CS Student', 'Web Developer', 'ML Enthusiast'].map((role, i) => (
            <span
              key={role}
              className="px-3 py-1 text-xs font-mono tracking-widest border rounded-full"
              style={{
                color:       i === 0 ? '#00FFFF' : i === 1 ? '#A78BFA' : '#00FF88',
                borderColor: i === 0 ? 'rgba(0,255,255,0.3)' : i === 1 ? 'rgba(167,139,250,0.3)' : 'rgba(0,255,136,0.3)',
                background:  i === 0 ? 'rgba(0,255,255,0.05)' : i === 1 ? 'rgba(167,139,250,0.05)' : 'rgba(0,255,136,0.05)',
              }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Name — Glitch heading */}
        <h1
          ref={titleRef}
          className="glitch font-orbitron font-black opacity-0 mb-6 leading-none"
          data-text="AYUSH KUMAR SINGH"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #00FFFF 40%, #7C3AED 70%, #FF00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.3))',
          }}
        >
          AYUSH KUMAR SINGH
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="h-px w-32 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500" />
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="h-px w-16 bg-gradient-to-r from-pink-500 to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-inter text-slate-300 opacity-0 mb-12 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', maxWidth: '600px', margin: '0 auto 3rem' }}
        >
          Exploring the universe of{' '}
          <span className="text-cyan-400 font-medium">intelligent systems</span>
          {' '}and{' '}
          <span className="text-violet-400 font-medium">interactive algorithms</span>.
        </p>

        {/* CTA Buttons */}
        <div ref={btnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <MagneticButton
            className="group relative px-8 py-4 font-orbitron font-bold text-sm tracking-widest text-black bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Enter Galaxy
            </span>
          </MagneticButton>

          <MagneticButton
            className="group relative px-8 py-4 font-orbitron font-bold text-sm tracking-widest text-cyan-400 border border-cyan-400/50 rounded-xl transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7 7m7-7l-7-7" />
              </svg>
              View Projects
            </span>
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <div className="w-px h-10 bg-gradient-to-b from-cyan-500/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
