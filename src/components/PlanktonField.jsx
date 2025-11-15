import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Bioluminescent plankton particle field following cursor and reacting to clicks
const PlanktonField = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const createParticles = (count) => {
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          glow: Math.random() * 0.8 + 0.2,
        })
      }
      return arr
    }

    particlesRef.current = createParticles(160)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleClick = () => {
      // burst: add a short-lived energy pulse
      for (let i = 0; i < 30; i++) {
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          glow: 1.5,
          ttl: 60 + Math.random() * 40,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      // soft abyss background tint
      ctx.fillStyle = 'rgba(3,7,18,0.5)'
      ctx.fillRect(0, 0, width, height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]

        // attraction to cursor like curious sea creature
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.hypot(dx, dy) + 0.0001
        const force = Math.min(1.2 / dist, 0.03)
        p.vx += dx * force
        p.vy += dy * force

        // gentle current drift
        p.vx += Math.sin((p.y + Date.now() * 0.001) * 0.02) * 0.02
        p.vy += Math.cos((p.x + Date.now() * 0.001) * 0.02) * 0.02

        // velocity damping
        p.vx *= 0.96
        p.vy *= 0.96

        p.x += p.vx
        p.y += p.vy

        // wrap around
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // particle glow
        const radius = 1.4 + p.glow * 2.4
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        gradient.addColorStop(0, 'rgba(125,211,252,0.95)') // cyan-300
        gradient.addColorStop(1, 'rgba(168,85,247,0.0)') // purple-500 fade
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // TTL for burst particles
        if (p.ttl !== undefined) {
          p.ttl -= 1
          p.glow *= 0.98
          if (p.ttl <= 0) particlesRef.current.splice(i, 1)
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
  )
}

export default PlanktonField
