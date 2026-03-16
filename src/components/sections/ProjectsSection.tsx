'use client'

import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    name: 'AI Puzzle Solver',
    fullName: 'AI Powered 8 Puzzle Solver',
    color: '#00FFFF',
    emissive: '#004466',
    orbitRadius: 14,
    orbitSpeed: 0.25,
    size: 1.5,
    phase: 0,
    github: 'https://8-puzzle-game-ecru.vercel.app/',
    features: [
      'A* Search Algorithm',
      'Manhattan Distance Heuristic',
      'Step-by-step Visualization',
      'Hint System & Timer',
      'PWA Support',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    description: 'An intelligent puzzle solver that uses A* algorithm with Manhattan Distance heuristic to solve the 8-Puzzle game with step-by-step visualization.',
  },
  {
    id: 2,
    name: 'N-Queens',
    fullName: 'N Queen Visualizer',
    color: '#A78BFA',
    emissive: '#3B0764',
    orbitRadius: 26,
    orbitSpeed: 0.15,
    size: 1.2,
    phase: Math.PI,
    github: 'https://n-queen-game-tau.vercel.app/',
    features: [
      'Backtracking Algorithm',
      'Dynamic Chessboard',
      'Interactive Animation',
      'Adjustable Board Size',
    ],
    tech: ['React', 'TypeScript', 'Algorithm Viz'],
    description: 'Visual N-Queens problem solver using backtracking algorithm with an interactive dynamic chessboard and adjustable board sizes.',
  },
]

// ─── 3-D Components ───────────────────────────────────────────────────────────

function Planet({
  project,
  index,
  onHover,
  onLeave,
  onClick,
}: {
  project: typeof projects[0]
  index: number
  onHover: (id: number) => void
  onLeave: () => void
  onClick: (github: string) => void
}) {
  const planetRef = useRef<THREE.Mesh>(null)
  const groupRef  = useRef<THREE.Group>(null)
  const glowRef   = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.elapsedTime * project.orbitSpeed + project.phase
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * project.orbitRadius
      groupRef.current.position.z = Math.sin(t) * project.orbitRadius
    }
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.5
      // Pulse scale when hovered
      const targetScale = hovered ? 1.25 : 1
      planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    if (glowRef.current) {
      const glowScale = hovered
        ? 1.4 + Math.sin(state.clock.elapsedTime * 4) * 0.1
        : 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.05
      glowRef.current.scale.setScalar(glowScale)
    }
  })

  const handlePointerOver = useCallback(() => {
    setHovered(true)
    onHover(project.id)
    document.body.style.cursor = 'pointer'
  }, [project.id, onHover])

  const handlePointerOut = useCallback(() => {
    setHovered(false)
    onLeave()
    document.body.style.cursor = 'none'
  }, [onLeave])

  const handleClick = useCallback(() => {
    onClick(project.github)
  }, [project.github, onClick])

  return (
    <group ref={groupRef}>
      {/* Glow aura */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[project.size * 1.6, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.18 : 0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Clickable planet body */}
      <mesh
        ref={planetRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[project.size, 32, 32]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.emissive}
          emissiveIntensity={hovered ? 1.4 : 0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Saturn-like ring on first planet */}
      {index === 0 && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[project.size * 1.7, project.size * 2.2, 32]} />
          <meshBasicMaterial color={project.color} transparent opacity={hovered ? 0.55 : 0.3} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* ── Floating project name label ── */}
      <Text
        position={[0, project.size + (hovered ? 1.6 : 1.1), 0]}
        fontSize={hovered ? 1.1 : 0.8}
        color={project.color}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.05}
        outlineColor="#000000"
        fillOpacity={hovered ? 1 : 0.6}
        renderOrder={10}
      >
        {project.name}
      </Text>

      {/* "Click to open" sub-label — only visible on hover */}
      {hovered && (
        <Text
          position={[0, project.size + 0.4, 0]}
          fontSize={0.52}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.03}
          outlineColor="#000000"
          fillOpacity={0.75}
          renderOrder={10}
        >
          ↗ click to open
        </Text>
      )}
    </group>
  )
}

function OrbitRings() {
  return (
    <>
      {projects.map((p) => (
        <mesh key={p.id} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[p.orbitRadius - 0.15, p.orbitRadius + 0.15, 128]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

function CentralStar() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
    }
  })
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF8800" emissiveIntensity={1.5} roughness={0} metalness={1} />
      </mesh>
      <pointLight color="#FFD700" intensity={3} distance={60} />
    </group>
  )
}

function SolarSystem({
  onHover,
  onLeave,
  onPlanetClick,
}: {
  onHover: (id: number) => void
  onLeave: () => void
  onPlanetClick: (github: string) => void
}) {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 30, 0]} intensity={1} color="#7C3AED" />
      <pointLight position={[30, 0, 0]} intensity={0.5} color="#00FFFF" />
      <CentralStar />
      <OrbitRings />
      {projects.map((project, i) => (
        <Planet
          key={project.id}
          project={project}
          index={i}
          onHover={onHover}
          onLeave={onLeave}
          onClick={onPlanetClick}
        />
      ))}
    </>
  )
}

// ─── Card variants ────────────────────────────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  }),
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handlePlanetClick = useCallback((github: string) => {
    window.open(github, '_blank', 'noopener,noreferrer')
  }, [])

  const hoveredProject = projects.find((p) => p.id === hoveredId)

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#060812] to-[#020408]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />

      {/* Section Label */}
      <div className="relative z-10 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.4em] text-cyan-500/70 mb-4 block">
            // MISSION LOG
          </span>
          <h2 className="font-orbitron font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Orbiting{' '}
            <span className="gradient-text-cyan-pink">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed px-4">
            Algorithmic explorations orbiting the galactic core of innovation and problem-solving.
          </p>
        </motion.div>
      </div>

      {/* ── Click-hint banner above canvas ── */}
      <div className="relative z-10 flex justify-center mb-3">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 backdrop-blur-sm"
        >
          <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="font-mono text-xs text-cyan-400 tracking-wider">
            Click on a planet to access the project
          </span>
        </motion.div>
      </div>

      {/* 3D Solar System */}
      <div className="relative h-[420px] mb-8">
        <Canvas camera={{ position: [0, 25, 40], fov: 50 }}>
          <SolarSystem
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onPlanetClick={handlePlanetClick}
          />
        </Canvas>

        {/* Hover tooltip overlay inside canvas area */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
              <div
                className="px-4 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl"
                style={{
                  borderColor: `${hoveredProject.color}40`,
                  background: `${hoveredProject.color}10`,
                  boxShadow: `0 0 20px ${hoveredProject.color}20`,
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: hoveredProject.color }} />
                <p className="font-orbitron font-bold text-white text-sm whitespace-nowrap">
                  {hoveredProject.fullName}
                </p>
                <span className="font-mono text-xs" style={{ color: hoveredProject.color }}>
                  → Click to open
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020408] to-transparent" />
      </div>

      {/* Project Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="holo-panel p-6 relative group"
          >
            {/* Card top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
                  />
                  <span className="font-mono text-xs tracking-widest" style={{ color: project.color }}>
                    PROJECT_{String(project.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-orbitron font-bold text-white text-lg md:text-xl leading-tight">
                  {project.fullName}
                </h3>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-2 rounded-lg border transition-all duration-300 hover:scale-110"
                style={{ borderColor: `${project.color}40`, color: project.color }}
                title="View Live Demo"
                data-cursor="hover"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-1.5 mb-5">
              {project.features.map((feat) => (
                <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span style={{ color: project.color }}>▸</span>
                  {feat}
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs font-mono rounded-full border"
                  style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}08` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {project.features.length} features
              </span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium flex items-center gap-1 transition-all duration-300 hover:gap-2"
                style={{ color: project.color }}
                data-cursor="hover"
              >
                View Live Demo
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
