'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'

interface HintTooltipProps {
  text: string
  className?: string
}

export default function HintTooltip({ text, className = '' }: HintTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span
      className={`relative inline-flex items-center justify-center cursor-help ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info className="w-4 h-4 text-slate-600 hover:text-slate-600 transition-colors" />

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-50">
          <div className="bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg min-w-150 whitespace-normal">
            {text}
            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-800 transform rotate-45" />
          </div>
        </div>
      )}
    </span>
  )
}