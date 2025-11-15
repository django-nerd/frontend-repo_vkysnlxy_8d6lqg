import React from 'react'
import { motion } from 'framer-motion'

const Panel = ({ title, children, delay = 0 }) => (
  <motion.div
    className="relative rounded-3xl p-5 bg-white/5 border border-white/10 backdrop-blur-xl shadow-[inset_0_0_40px_rgba(59,130,246,0.08)] overflow-hidden"
    initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -inset-20 bg-[conic-gradient(at_30%_40%,rgba(34,211,238,0.12),rgba(217,70,239,0.08),transparent)] animate-pulse" />
    </div>
    <div className="relative">
      <h3 className="text-sm font-semibold tracking-wide text-cyan-100 uppercase/loose mb-3">{title}</h3>
      {children}
    </div>
  </motion.div>
)

const CoralPanels = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Panel title="Currents" delay={0.05}>
        <div className="h-24 w-full rounded-2xl bg-gradient-to-r from-cyan-300/10 via-fuchsia-300/10 to-blue-400/10 animate-pulse" />
      </Panel>
      <Panel title="Signal Reef" delay={0.1}>
        <div className="h-24 w-full rounded-2xl bg-gradient-to-br from-blue-300/10 to-fuchsia-300/10" />
      </Panel>
      <Panel title="Echo Shell" delay={0.15}>
        <div className="h-24 w-full rounded-2xl bg-gradient-to-br from-cyan-300/10 to-violet-300/10" />
      </Panel>
    </div>
  )
}

export default CoralPanels
