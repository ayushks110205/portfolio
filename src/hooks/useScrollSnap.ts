'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SECTION_IDS   = ['hero', 'projects', 'skills', 'about', 'contact']
const DEBOUNCE_MS   = 700       // min ms between two snaps
const MIN_DELTA     = 40        // minimum wheel delta to trigger a snap
const TOUCH_MIN_PX  = 50        // minimum swipe to trigger a snap

/**
 * useScrollSnap
 *
 * GSAP-powered section snapping that works with Lenis smooth scroll.
 *   • Wheel: one wheel event = snap to next/prev section
 *   • Touch:  swipe end = snap to next/prev section
 *   • Desktop only (≥ 768px)
 *
 * Uses window.__lenis?.scrollTo for smooth, Lenis-compatible navigation.
 * Falls back to gsap.to(window, { scrollTo }) if Lenis is unavailable.
 */
export function useScrollSnap(enabled: boolean) {
  const lastSnapTime  = useRef(0)
  const currentIndex  = useRef(0)
  const touchStartY   = useRef(0)
  const isSnapping    = useRef(false)

  useEffect(() => {
    if (!enabled) return
    if (typeof window === 'undefined') return
    // Desktop only
    if (window.innerWidth < 768) return

    // Build section offset map
    const getSectionOffsets = () =>
      SECTION_IDS.map(id => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY : 0
      })

    // Find which section is currently closest to viewport top
    const getCurrentIndex = (offsets: number[]) => {
      const scrollY = window.scrollY
      let closest = 0
      let minDist  = Infinity
      offsets.forEach((off, i) => {
        const d = Math.abs(off - scrollY)
        if (d < minDist) { minDist = d; closest = i }
      })
      return closest
    }

    const snapTo = (index: number) => {
      const offsets = getSectionOffsets()
      const clamped = Math.max(0, Math.min(offsets.length - 1, index))
      currentIndex.current = clamped
      isSnapping.current   = true

      const target = offsets[clamped]

      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          duration: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      } else {
        gsap.to(window, {
          scrollTo: { y: target, autoKill: false },
          duration: 1.1,
          ease: 'power4.out',
        })
      }

      setTimeout(() => { isSnapping.current = false }, DEBOUNCE_MS + 200)
    }

    // ── Wheel handler ──
    const onWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastSnapTime.current < DEBOUNCE_MS) return
      if (Math.abs(e.deltaY) < MIN_DELTA) return

      lastSnapTime.current = now
      const offsets = getSectionOffsets()
      const idx     = getCurrentIndex(offsets)
      snapTo(e.deltaY > 0 ? idx + 1 : idx - 1)
    }

    // ── Touch handlers ──
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const now    = Date.now()
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < TOUCH_MIN_PX) return
      if (now - lastSnapTime.current < DEBOUNCE_MS) return

      lastSnapTime.current = now
      const offsets = getSectionOffsets()
      const idx     = getCurrentIndex(offsets)
      snapTo(deltaY > 0 ? idx + 1 : idx - 1)
    }

    window.addEventListener('wheel',      onWheel,      { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })

    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [enabled])
}
