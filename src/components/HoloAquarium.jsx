import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Floating holographic aquarium with particle fish
const HoloAquarium = () => {
  const canvasRef = useRef(null)
  const fishRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = Math.min(1200, window.innerWidth - 32))
    let height = (canvas.height = 320)

    const spawnFish = (count) => {
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 1 + Math.random() * 2,
          vy: (Math.random() - 0.5) * 0.6,
          hue: 190 + Math.random() * 160,
          size: 1 + Math.random() * 2,
        })
      }
      return arr
    }
    fishRef.current = spawnFish(40)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // aquarium glass effect
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, 'rgba(59,130,246,0.12)')
      grad.addColorStop(1, 'rgba(236,72,153,0.08)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      for (const f of fishRef.current) {
        f.x += f.vx
        f.y += f.vy + Math.sin((f.x + Date.now() * 0.002) * 0.02)
        if (f.x > width + 20) {
          f.x = -20
          f.y = Math.random() * height
        }
        if (f.y < 0) f.y = height
        if (f.y > height) f.y = 0

        // draw particle fish: head core + trailing dots
        for (let t = 0; t < 6; t++) {
          const px = f.x - t * 4
          const py = f.y + Math.sin((f.x + t * 10) * 0.08) * 3
          const alpha = Math.max(0, 0.9 - t * 0.15)
          ctx.fillStyle = `hsla(${f.hue}, 90%, 65%, ${alpha})`
          ctx.beginPath()
          ctx.arc(px, py, f.size * (1.4 - t * 0.15), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <motion.div
      className="relative rounded-3xl border border-cyan-300/20 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(56,189,248,0.25)] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-300/10 via-fuchsia-400/10 to-blue-400/10" />
      <canvas ref={canvasRef} className="relative w-full h-[320px]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cyan-300/20 to-transparent" />
      </div>
    </motion.div>
  )
}

export default HoloAquarium
