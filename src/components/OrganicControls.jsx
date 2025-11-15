import React from 'react'
import { motion } from 'framer-motion'
import { Waves, Radar, Cog, Fish, Activity } from 'lucide-react'

const RippleButton = ({ icon: Icon, label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="relative group inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 text-cyan-100 hover:from-cyan-500/30 hover:to-fuchsia-500/30 backdrop-blur-md overflow-hidden"
    whileTap={{ scale: 0.96 }}
  >
    <span className="absolute inset-0 rounded-2xl">
      <span className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300">
        <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-2xl" />
      </span>
    </span>
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
)

const JellyCounter = ({ label, value, hue = 'from-cyan-400 via-fuchsia-400 to-blue-400' }) => (
  <motion.div
    className={`relative rounded-3xl p-4 bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className={`absolute -inset-8 bg-gradient-to-r ${hue} opacity-20 blur-3xl animate-pulse`} />
    <div className="relative">
      <p className="text-xs uppercase tracking-wider text-cyan-100/70">{label}</p>
      <motion.p
        key={value}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="mt-1 text-3xl font-extrabold text-cyan-50 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
)

const OrganicControls = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <JellyCounter label="Species detected" value={128} />
      <JellyCounter label="Active signals" value={42} hue="from-violet-400 via-fuchsia-400 to-cyan-400" />
      <JellyCounter label="Health index" value={96} hue="from-blue-400 via-cyan-400 to-emerald-400" />

      <div className="md:col-span-3 flex flex-wrap items-center gap-3 mt-2">
        <RippleButton icon={Waves} label="Pulse Scan" onClick={() => {}} />
        <RippleButton icon={Radar} label="Auto-Track" onClick={() => {}} />
        <RippleButton icon={Activity} label="Stabilize" onClick={() => {}} />
        <RippleButton icon={Fish} label="Summon Swarm" onClick={() => {}} />
        <RippleButton icon={Cog} label="Tuning" onClick={() => {}} />
      </div>
    </div>
  )
}

export default OrganicControls
