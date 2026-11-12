import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  DARK_DEFAULTS,
  LIGHT_DEFAULTS,
  tokensToCssVars,
  type ColorMode,
  type ThemeTokens,
} from './tokens'

interface ThemeContextValue {
  mode: ColorMode
  setMode: (m: ColorMode) => void
  tokens: ThemeTokens
  setTokens: (patch: Partial<ThemeTokens>) => void
  resetTokens: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>('light')
  const [overrides, setOverrides] = useState<Partial<ThemeTokens>>({})

  const base = mode === 'light' ? LIGHT_DEFAULTS : DARK_DEFAULTS
  const tokens = useMemo(() => ({ ...base, ...overrides }), [base, overrides])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode: (m) => {
        setMode(m)
        setOverrides({})
      },
      tokens,
      setTokens: (patch) => setOverrides((prev) => ({ ...prev, ...patch })),
      resetTokens: () => setOverrides({}),
    }),
    [mode, tokens],
  )

  const style = {
    ...tokensToCssVars(tokens),
    background: mode === 'light' ? '#f8fafc' : '#0f172a',
    color: tokens.foreground,
    minHeight: '100%',
  } as CSSProperties

  return (
    <ThemeContext.Provider value={value}>
      <div data-aui-theme={mode} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
