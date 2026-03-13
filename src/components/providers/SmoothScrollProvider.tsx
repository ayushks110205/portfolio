'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Extend window to hold the global lenis instance
declare global {
  interface Window { __lenis?: Lenis }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite:        false,
    })

    lenisRef.current = lenis
    window.__lenis   = lenis  // expose globally for loop resets

    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
