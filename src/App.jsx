import React from 'react'
import HeroCover from './components/HeroCover'
import PlanktonField from './components/PlanktonField'
import HoloAquarium from './components/HoloAquarium'
import OrganicControls from './components/OrganicControls'
import CoralPanels from './components/CoralPanels'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen relative bg-[#030712] text-cyan-50 selection:bg-cyan-400/30 selection:text-cyan-50">
      {/* Ambient bioluminescent plankton field */}
      <PlanktonField />

      {/* Living Hero with Spline cover */}
      <HeroCover />

      {/* Main organism body */}
      <main className="relative z-10 -mt-16 md:-mt-24">
        <section className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            <div className="lg:col-span-3">
              <HoloAquarium />
              <div className="mt-6">
                <OrganicControls />
              </div>
            </div>
            <div className="lg:col-span-2">
              <CoralPanels />
            </div>
          </motion.div>

          {/* Drifting detection log */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-5 py-3 text-xs uppercase tracking-widest text-cyan-100/70 border-b border-white/10">Detection Stream</div>
            <div className="max-h-64 overflow-auto divide-y divide-white/5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <p className="text-sm text-cyan-50/90">Bio-signal #{(i + 1).toString().padStart(3, '0')} drifted across reef</p>
                  </div>
                  <span className="text-xs text-cyan-100/60">{new Date(Date.now() - i * 12000).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer vibes */}
          <div className="py-10 text-center text-cyan-100/50">
            Born from currents, not code. AquaVision AI.
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
