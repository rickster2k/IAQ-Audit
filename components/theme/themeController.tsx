// components/ThemeController.tsx
'use client'

import { useTheme } from '@/components/theme/themeProvider'

export default function ThemeController() {
  const { mode, toggleMode } = useTheme()

  return (
    <div className="absolute bottom-6 right-6 bg-card border border-border rounded-lg shadow-lg p-4 space-y-4 min-w-60">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Mode</h3>
        <button
          onClick={toggleMode}
          className="w-full px-3 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-2"
        >
          {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Current mode: <span className="font-medium text-foreground">{mode}</span>
        </p>
      </div>
    </div>
  )
}
