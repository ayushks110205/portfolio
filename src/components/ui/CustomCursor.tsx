'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      setIsVisible(true)
    }

    const animate = () => {
      ringX += (dotX - ringX) * 0.55
      ringY += (dotY - ringY) * 0.55

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }

      animId = requestAnimationFrame(animate)
    }

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(animate)

    const interactives = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}
