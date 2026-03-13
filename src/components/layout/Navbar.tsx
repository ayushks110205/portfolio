'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string, label: string) => {
    setActiveLink(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur bg-[#020408]/80 border-b border-cyan-500/10' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollTo('#hero', 'Home')}
            >
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-spin-slow" />
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600" />
              </div>
              <span className="font-orbitron font-bold text-sm md:text-base tracking-wider text-white">
                AKS<span className="text-cyan-400">.</span>lab
              </span>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href, link.label)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg group ${
                    activeLink === link.label ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'
                  }`}
                  data-cursor="hover"
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeLink === link.label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 group-hover:w-3/4 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="https://www.linkedin.com/in/ayush-kumar-singh-384a58285/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 text-sm font-semibold font-orbitron tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2"
                style={{ color: '#0A66C2', border: '1px solid rgba(10,102,194,0.4)', background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,102,194,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                data-cursor="hover"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/ayushks110205"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 text-sm font-semibold font-orbitron tracking-wider text-cyan-400 border border-cyan-400/40 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400/70 transition-all duration-300 neon-border-cyan"
                data-cursor="hover"
              >
                GitHub
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex md:hidden flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor="hover"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-cyan-400"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block w-4 h-px bg-cyan-400"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-cyan-400"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden nav-blur bg-[#020408]/95 border-b border-cyan-500/10 px-4 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href, link.label)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeLink === link.label
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                href="https://www.linkedin.com/in/ayush-kumar-singh-384a58285/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 text-center text-sm font-semibold font-orbitron tracking-wider rounded-lg border flex items-center justify-center gap-2"
                style={{ color: '#0A66C2', borderColor: 'rgba(10,102,194,0.4)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </motion.a>
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.07 }}
                href="https://github.com/ayushks110205"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-center text-sm font-semibold font-orbitron tracking-wider text-cyan-400 border border-cyan-400/40 rounded-lg"
              >
                GitHub Profile
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
