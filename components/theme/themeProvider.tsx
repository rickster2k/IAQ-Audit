'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light' // SSR fallback

  const saved = window.localStorage.getItem('mode') as ThemeMode | null
  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage / media query (no effect needed)
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode())

  // Sync DOM + localStorage when mode changes (this is still allowed)
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    window.localStorage.setItem('mode', mode)
  }, [mode])

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode)
  }

  const toggleMode = () => {
    setModeState(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
