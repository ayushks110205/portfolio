'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: 'Programming',
    color: '#00FFFF',
    icon: '⬡',
    skills: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Frameworks',
    color: '#A78BFA',
    icon: '⬢',
    skills: ['React', 'Next.js', 'TailwindCSS'],
  },
  {
    name: 'Libraries',
    color: '#00FF88',
    icon: '◈',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
  },
  {
    name: 'Concepts',
    color: '#FF6B6B',
    icon: '◆',
    skills: ['Machine Learning', 'Data Preprocessing', 'Feature Engineering', 'Model Evaluation', 'Responsive Design', 'Progressive Web Apps'],
  },
]

interface Star {
  x: number
  y: number
  color: string
  label: string
  size: number
}

interface Line {
  from: number
  to: number
  color: string
}

function ConstellationCanvas({ activeCategory }: { activeCategory: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const cat = skillCategories[activeCategory]
    const count = cat.skills.length
    const cx = W / 2
    const cy = H / 2
    const radius = Math.min(W, H) * 0.35

    const stars: Star[] = cat.skills.map((skill, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + (activeCategory * 0.3)
      const r = radius * (0.7 + (i % 3) * 0.15)
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        color: cat.color,
        label: skill,
        size: 3 + Math.random() * 2,
      }
    })

    // Random connection lines
    const lines: Line[] = []
    stars.forEach((_, i) => {
      const next = (i + 1) % stars.length
      lines.push({ from: i, to: next, color: cat.color })
      if (i % 2 === 0 && i + 2 < stars.length) {
        lines.push({ from: i, to: i + 2, color: cat.color })
      }
    })

    progressRef.current = 0
    let start: number | null = null

    const draw = (ts: number) => {
      if (!start) start = ts
      progressRef.current = Math.min((ts - start) / 1200, 1)

      ctx.clearRect(0, 0, W, H)

      // Draw faint background stars
      for (let i = 0; i < 60; i++) {
        const bx = (i * 137.5) % W
        const by = (i * 97.3) % H
        ctx.beginPath()
        ctx.arc(bx, by, 0.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.2)'
        ctx.fill()
      }

      // Lines
      lines.forEach(({ from, to, color }) => {
        const sf = stars[from]
        const st = stars[to]
        const dx = st.x - sf.x
        const dy = st.y - sf.y
        const ex = sf.x + dx * progressRef.current
        const ey = sf.y + dy * progressRef.current

        const grad = ctx.createLinearGradient(sf.x, sf.y, ex, ey)
        grad.addColorStop(0, `${color}80`)
        grad.addColorStop(1, `${color}20`)
        ctx.beginPath()
        ctx.moveTo(sf.x, sf.y)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Stars
      stars.forEach((star, i) => {
        const appear = Math.max(0, (progressRef.current * 1.5 - i * 0.08))
        if (appear <= 0) return

        // Outer glow
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5)
        glow.addColorStop(0, `${star.color}60`)
        glow.addColorStop(1, `${star.color}00`)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Label
        ctx.font = `500 11px 'JetBrains Mono', monospace`
        ctx.fillStyle = `rgba(255,255,255,${0.7 * appear})`
        ctx.textAlign = 'center'
        ctx.fillText(star.label, star.x, star.y + star.size + 14)
      })

      if (progressRef.current < 1) {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [activeCategory])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#06080F] to-[#020408]" />

      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[300, 500, 700].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-cyan-500/5"
            style={{ width: size, height: size, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.4em] text-violet-400/70 mb-4 block">
              // SKILL MATRIX
            </span>
            <h2 className="font-orbitron font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Constellation{' '}
              <span className="gradient-text-green-cyan">Skills</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              Each skill is a star in the galaxy, forming constellations of technical expertise.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Category tabs */}
          <div className="space-y-3">
            {skillCategories.map((cat, i) => (
              <motion.button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                  activeCategory === i
                    ? 'bg-white/5 border-white/15 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                }`}
                style={activeCategory === i ? { borderColor: `${cat.color}30`, boxShadow: `0 0 20px ${cat.color}10` } : {}}
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl" style={{ color: cat.color }}>{cat.icon}</span>
                    <span className="font-orbitron font-semibold text-sm tracking-wider" style={{ color: activeCategory === i ? cat.color : '#94a3b8' }}>
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {cat.skills.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="text-xs text-slate-400 font-mono">
                      {skill}{' '}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Constellation Map */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="holo-panel relative h-[380px] overflow-hidden"
          >
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: skillCategories[activeCategory].color }}
              />
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: skillCategories[activeCategory].color }}
              >
                {skillCategories[activeCategory].name.toUpperCase()}
              </span>
            </div>
            <ConstellationCanvas activeCategory={activeCategory} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
