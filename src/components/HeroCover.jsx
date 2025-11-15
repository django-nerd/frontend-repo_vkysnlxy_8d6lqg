import React from 'react'
import Spline from '@splinetool/react-spline'

const HeroCover = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
      <Spline scene="https://prod.spline.design/g2cnMT7B1IgkJ7Ie/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      {/* Glass gradient overlay to tint the scene without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1026]/20 to-[#030712]" />
      {/* Title cluster */}
      <div className="absolute inset-0 flex items-end md:items-center justify-center">
        <div className="pointer-events-none text-center px-6 md:px-10">
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-blue-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            AquaVision AI
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-cyan-100/80 max-w-3xl mx-auto">
            A living dashboard grown from bioluminescent data reefs and sentient currents.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroCover
