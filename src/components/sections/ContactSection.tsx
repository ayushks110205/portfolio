'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const contactLinks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: '@ayushks110205',
    href: 'https://github.com/ayushks110205',
    color: '#A78BFA',
    hint: 'View all repositories →',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'ayush-kumar-singh',
    href: 'https://www.linkedin.com/in/ayush-kumar-singh-384a58285/',
    color: '#0A66C2',
    hint: 'Connect on LinkedIn →',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'classsciencea@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=classsciencea@gmail.com&su=Hello%20Ayush!',
    color: '#00FFFF',
    hint: 'Opens Gmail compose →',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91-8987864093',
    href: 'tel:+918987864093',
    color: '#00FF88',
    hint: 'Tap to call / dial →',
  },
]

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(value)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] to-[#030508]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      {/* Glowing orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-cyan-900/20 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-pink-400/70 mb-4 block">
            // OPEN CHANNEL
          </span>
          <h2 className="font-orbitron font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Establish{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF00FF, #00FFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Contact</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to collaborate or discuss ideas? Transmit a signal across the cosmos. All channels are open.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="holo-panel p-6 group flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer"
              style={{
                borderColor: copied === link.value ? `${link.color}60` : undefined,
                boxShadow: copied === link.value ? `0 0 20px ${link.color}20` : undefined,
              }}
              data-cursor="hover"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                style={{
                  color: link.color,
                  borderColor: `${link.color}30`,
                  background: `${link.color}0A`,
                }}
              >
                {link.icon}
              </div>
              <div className="text-center">
                <p className="font-mono text-xs tracking-widest mb-1" style={{ color: link.color }}>
                  {link.label.toUpperCase()}
                </p>
                <p className="text-slate-300 text-xs break-all">{link.value}</p>
              </div>
              {'hint' in link && (
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: link.color }}>
                  {(link as typeof link & { hint: string }).hint}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCopy(link.value) }}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                {copied === link.value ? '✓ Copied!' : 'copy'}
              </button>
            </motion.a>
          ))}
        </div>

        {/* KIIT Education Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="holo-panel p-6 text-left max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-cyan-400">EDUCATION LOG</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-orbitron font-bold text-white text-sm mb-1">KIIT University</p>
              <p className="text-slate-400 text-xs">Kalinga Institute of Industrial Technology</p>
            </div>
            <div>
              <p className="font-orbitron font-bold text-white text-sm mb-1">B.Tech CSE</p>
              <p className="text-slate-400 text-xs">CGPA: <span className="text-cyan-400 font-bold">8.38</span> / 10.0</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 rounded-full border border-cyan-400/60 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white">AKS<span className="text-cyan-400">.</span>lab</span>
          </div>
          <p className="font-mono text-xs text-slate-500">
            © 2025 Ayush Kumar Singh · Built with Next.js + React Three Fiber
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-500">Online</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
