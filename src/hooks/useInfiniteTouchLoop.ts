'use client'

import { useEffect, useRef } from 'react'

/**
 * useInfiniteTouchLoop
 *
 * Mobile-compatible bidirectional infinite scroll loop.
 * - Swipe UP  at bottom → instant jump to top
 * - Swipe DOWN at top  → instant jump to bottom
 *
 * Uses lenis.scrollTo(pos, { immediate: true }) to bypass
 * Lenis's virtual scroll interception of window.scrollTo.
 *
 * Requires window.__lenis to be set by SmoothScrollProvider.
 */
export function useInfiniteTouchLoop(enabled: boolean) {
  const touchStartY = useRef(0)
  const lockRef     = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (lockRef.current) return

      const deltaY  = touchStartY.current - e.changedTouches[0].clientY
      const absD    = Math.abs(deltaY)
      if (absD < 40) return            // ignore taps / micro-swipes

      const scrolled = window.scrollY
      const viewH    = window.innerHeight
      const totalH   = document.documentElement.scrollHeight
      const atBottom = scrolled + viewH >= totalH - 80
      const atTop    = scrolled <= 4

      if (atBottom && deltaY > 0) {
        // Swiped UP at bottom → loop to top
        lockRef.current = true
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        else document.documentElement.scrollTop = 0
        setTimeout(() => { lockRef.current = false }, 900)
      } else if (atTop && deltaY < 0) {
        // Swiped DOWN at top → loop to bottom
        lockRef.current = true
        const bottom = totalH - viewH
        if (window.__lenis) window.__lenis.scrollTo(bottom, { immediate: true })
        else document.documentElement.scrollTop = bottom
        setTimeout(() => { lockRef.current = false }, 900)
      }
    }

    // passive: false not needed — we're not calling preventDefault
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [enabled])
}
