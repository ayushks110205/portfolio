'use client'

import { useState, useEffect } from 'react'

export type DeviceQuality = 'high' | 'medium' | 'low'

/**
 * useDeviceQuality
 *
 * Returns a quality tier used to scale down heavy 3D scenes on weaker devices.
 *
 * Scoring:
 *   Screen width  < 768px   → -2 pts  (mobile)
 *   Screen width  < 1280px  → -1 pt   (tablet/small laptop)
 *   CPU cores     < 4       → -1 pt
 *   DPR           > 2       → -1 pt   (retina on a weak device = extra burden)
 *
 *   Score >= 0  → 'high'
 *   Score == -1 → 'medium'
 *   Score <= -2 → 'low'
 */
export function useDeviceQuality(): DeviceQuality {
  const [quality, setQuality] = useState<DeviceQuality>('high')

  useEffect(() => {
    let score = 0
    const w = window.innerWidth

    if (w < 768)       score -= 2
    else if (w < 1280) score -= 1

    const cores = navigator.hardwareConcurrency ?? 4
    if (cores < 4) score -= 1

    const dpr = window.devicePixelRatio ?? 1
    if (dpr > 2) score -= 1

    if      (score >= 0)  setQuality('high')
    else if (score === -1) setQuality('medium')
    else                   setQuality('low')
  }, [])

  return quality
}

/** Returns clamped pixel ratio based on quality tier */
export function getDprRange(quality: DeviceQuality): [number, number] {
  if (quality === 'low')    return [0.5, 1]
  if (quality === 'medium') return [0.75, 1.5]
  return [1, 2]
}

/** Returns star count based on quality tier */
export function getStarCount(quality: DeviceQuality): number {
  if (quality === 'low')    return 600
  if (quality === 'medium') return 1800
  return 4000
}
