'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '8.38', label: 'CGPA', unit: '/10' },
  { value: '2', label: 'Projects', unit: '+' },
  { value: '10+', label: 'Technologies', unit: '' },
  { value: '2026', label: 'Graduating', unit: '' },
]

const timeline = [
  {
    year: '2023',
    title: 'Started B.Tech CSE',
    desc: 'Enrolled at KIIT, pursuing Computer Science Engineering with a focus on algorithms, machine learning, and full-stack development.',
    color: '#00FFFF',
  },
  {
    year: '2024',
    title: 'Web Development Journey',
    desc: 'Built projects with React, Next.js, TypeScript. Discovered the intersection of algorithms and interactive UI.',
    color: '#A78BFA',
  },
  {
    year: '2025',
    title: 'ML & AI Exploration',
    desc: 'Deep dive into machine learning with Python, Scikit-learn, Pandas and NumPy. Building AI-powered applications.',
    color: '#00FF88',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#080B18] to-[#020408]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs tracking-[0.4em] text-green-400/70 mb-4 block">
              // CREW MANIFEST
            </span>
            <h2 className="font-orbitron font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00FF88, #00FFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Explorer</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile card */}
            <div className="holo-panel p-8 mb-8">
              <div className="flex items-start gap-5 mb-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 flex items-center justify-center border border-cyan-500/20">
                    <span className="font-orbitron font-black text-3xl text-cyan-400">A</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#060812] animate-pulse" />
                </div>

                <div>
                  <h3 className="font-orbitron font-bold text-white text-xl mb-1">Ayush Kumar Singh</h3>
                  <p className="text-cyan-400 text-sm font-mono mb-2">@ayushks110205</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['CS Student', 'Developer', 'ML Enthusiast'].map((tag, i) => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-full border"
                        style={{
                          color: i === 0 ? '#00FFFF' : i === 1 ? '#A78BFA' : '#00FF88',
                          borderColor: i === 0 ? '#00FFFF30' : i === 1 ? '#A78BFA30' : '#00FF8830',
                          background: i === 0 ? '#00FFFF08' : i === 1 ? '#A78BFA08' : '#00FF8808',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { icon: '🏛', label: 'Education', value: 'B.Tech CSE – KIIT University' },
                  { icon: '⭐', label: 'CGPA', value: '8.38 / 10.0' },
                  { icon: '📍', label: 'Location', value: 'India' },
                ].map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <span className="text-base">{info.icon}</span>
                    <span className="text-slate-500 font-mono text-xs w-20">{info.label}</span>
                    <span className="text-slate-200">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="holo-panel p-4 text-center"
                >
                  <div className="font-orbitron font-black text-2xl text-cyan-400 leading-none mb-1">
                    {stat.value}
                    <span className="text-sm text-slate-500">{stat.unit}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-slate-300 leading-relaxed mb-8 text-sm">
              A computer science engineering student at KIIT with a strong passion for building intelligent,
              interactive applications. I exist at the intersection of algorithmic thinking and creative development —
              turning complex problems into elegant digital experiences.
            </p>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative pl-12"
                  >
                    <div
                      className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: item.color,
                        background: `${item.color}10`,
                        boxShadow: `0 0 12px ${item.color}30`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    </div>

                    <div className="holo-panel p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs tracking-widest" style={{ color: item.color }}>
                          {item.year}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <h4 className="font-orbitron font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
