'use client'

import { AlertTriangle, CheckCircle } from 'lucide-react'

export default function IAQHeroGraphic() {
  return (
    <div className="relative hidden lg:flex items-center justify-center py-8">
      {/* Outer wrapper handles ONLY the float — no rotation */}
      <div className="animate-float relative">

        {/* Inner card holds the static tilt + GPU compositing hints */}
        <div
          className="relative bg-linear-to-br from-[#1e3a5f] to-[#162e4d] rounded-2xl p-7 shadow-2xl"
          style={{
            width: '380px',
            transform: 'rotate(-3deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >

          {/* ── Top-left floating badge: Risk Alert ── */}
          <div className="absolute -top-5 -left-4 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 z-10 border border-slate-100">
            <div className="bg-red-100 p-1 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Risk Alert</span>
              <span className="text-xs font-bold text-slate-800">Mold Detected</span>
            </div>
          </div>

          {/* ── Top-right exclamation badge ── */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-yellow-400 flex items-center justify-center">
            <span className="text-yellow-400 font-black text-base leading-none">!</span>
          </div>

          {/* ── Health Score ── */}
          <div className="mb-5 mt-1">
            <p className="text-teal-400 font-bold uppercase tracking-widest text-[10px] mb-1">Health Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white leading-none">45</span>
              <span className="text-xl font-bold text-slate-400">/100</span>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-white/10 mb-5" />

          {/* ── Bullet rows ── */}
          <div className="flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
              <span className="text-white text-sm font-semibold">High Humidity Levels</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0 shadow-[0_0_6px_rgba(251,146,60,0.7)]" />
              <span className="text-white text-sm font-semibold">Inadequate Ventilation</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0 shadow-[0_0_6px_rgba(45,212,191,0.7)]" />
              <span className="text-white text-sm font-semibold">
                Cleaning Habits: <span className="text-teal-400">Good</span>
              </span>
            </div>
          </div>

          {/* ── Bottom-right floating badge: Analysis ── */}
          <div className="absolute -bottom-5 -right-4 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 z-10 border border-slate-100">
            <div className="bg-green-100 p-1 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Analysis</span>
              <span className="text-xs font-bold text-slate-800">Action Plan Ready</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}