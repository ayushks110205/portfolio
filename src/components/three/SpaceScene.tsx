'use client'

import { useRef, useMemo, MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { type DeviceQuality, getDprRange, getStarCount } from '@/hooks/useDeviceQuality'

// ─── StarField ─────────────────────────────────────────────────────────────
function StarField({ mouseX, mouseY, quality }: { mouseX: number; mouseY: number; quality: DeviceQuality }) {
  const ref   = useRef<THREE.Points>(null)
  const count = getStarCount(quality)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.02 + mouseY * 0.05
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + mouseX * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.3} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  )
}

// ─── NebulaClouds (medium/high only) ────────────────────────────────────────
function NebulaClouds({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref   = useRef<THREE.Points>(null)
  const count = 800

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [[0, 1, 1], [0.5, 0.1, 0.9], [1, 0, 1], [0, 1, 0.5]]
    for (let i = 0; i < count; i++) {
      const angle  = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 60
      pos[i * 3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 30 - 50
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.008 + mouseX * 0.03
    ref.current.rotation.x = mouseY * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={1.2} sizeAttenuation
        depthWrite={false} opacity={0.5} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

// ─── NeuralNodes (high only) ────────────────────────────────────────────────
function NeuralNodes({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef  = useRef<THREE.Group>(null)
  const nodeCount = 15

  const nodes = useMemo(() =>
    Array.from({ length: nodeCount }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 10,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.35,
      speed: 0.3  + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    })), [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = mouseX * 0.08
    groupRef.current.rotation.x = mouseY * 0.04
    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i]
      if (child instanceof THREE.Mesh) {
        child.position.y = nodes[i].position[1] + Math.sin(state.clock.elapsedTime * node.speed + node.phase) * 1.5
        child.rotation.x = state.clock.elapsedTime * 0.5
        child.rotation.y = state.clock.elapsedTime * 0.3
      }
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#7C3AED' : '#FF00FF'}
            emissive={i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#7C3AED' : '#FF00FF'}
            emissiveIntensity={0.8} transparent opacity={0.7} wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── FloatingGrid (high only) ───────────────────────────────────────────────
function FloatingGrid({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = -Math.PI / 2.5 + mouseY * 0.05
    ref.current.position.y = -8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5
  })

  return (
    <mesh ref={ref} position={[0, -8, -20]}>
      {/* Reduced segments on medium/low — high gets 40×25 */}
      <planeGeometry args={[120, 80, 20, 12]} />
      <meshStandardMaterial color="#00FFFF" emissive="#00FFFF"
        emissiveIntensity={0.3} transparent opacity={0.08} wireframe />
    </mesh>
  )
}

// ─── SceneCamera ────────────────────────────────────────────────────────────
function SceneCamera({ mouseX, mouseY, scrollRef }: {
  mouseX:    number
  mouseY:    number
  scrollRef: MutableRefObject<number>
}) {
  const { camera } = useThree()

  useFrame(() => {
    const scroll = scrollRef.current
    camera.position.x += (mouseX * 2  - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02

    const baseZ = 30 - scroll * 25
    const baseY = -mouseY * 1.5 + scroll * 15
    camera.position.z += (baseZ - camera.position.z) * 0.06
    camera.position.y += (baseY  - camera.position.y) * 0.03

    const cam = camera as THREE.PerspectiveCamera
    cam.fov  += (60 + scroll * 20 - cam.fov) * 0.05
    cam.updateProjectionMatrix()
    camera.lookAt(0, scroll * 5, 0)
  })

  return null
}

// ─── Public API ─────────────────────────────────────────────────────────────
export interface SpaceSceneProps {
  mouseX:    number
  mouseY:    number
  scrollRef: MutableRefObject<number>
  quality:   DeviceQuality
}

export default function SpaceScene({ mouseX, mouseY, scrollRef, quality }: SpaceSceneProps) {
  const dpr      = getDprRange(quality)
  const antialias = quality === 'high'

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias, alpha: true, powerPreference: 'high-performance' }}
      dpr={dpr}
    >
      {/* Lights — reduced on low quality */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]}    intensity={0.5} color="#00FFFF" />
      {quality !== 'low' && (
        <>
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7C3AED" />
          <pointLight position={[0, 20, -20]}    intensity={0.4} color="#FF00FF" />
        </>
      )}

      {/* Always: stars + camera */}
      <StarField   mouseX={mouseX} mouseY={mouseY} quality={quality} />
      <SceneCamera mouseX={mouseX} mouseY={mouseY} scrollRef={scrollRef} />

      {/* Medium + High: nebula */}
      {quality !== 'low' && <NebulaClouds mouseX={mouseX} mouseY={mouseY} />}

      {/* High only: neural nodes + grid */}
      {quality === 'high' && (
        <>
          <NeuralNodes  mouseX={mouseX} mouseY={mouseY} />
          <FloatingGrid mouseX={mouseX} mouseY={mouseY} />
        </>
      )}
    </Canvas>
  )
}
