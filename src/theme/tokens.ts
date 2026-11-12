export type ColorMode = 'light' | 'dark'

export interface ThemeTokens {
  primary: string
  foreground: string
  muted: string
  card: string
  border: string
  danger: string
  success: string
  radius: string
  radiusSm: string
  pad: string
  gap: string
}

export const LIGHT_DEFAULTS: ThemeTokens = {
  primary: '#2563eb',
  foreground: '#0f172a',
  muted: '#64748b',
  card: '#ffffff',
  border: '#e2e8f0',
  danger: '#dc2626',
  success: '#16a34a',
  radius: '12px',
  radiusSm: '8px',
  pad: '14px',
  gap: '10px',
}

export const DARK_DEFAULTS: ThemeTokens = {
  primary: '#60a5fa',
  foreground: '#f1f5f9',
  muted: '#94a3b8',
  card: '#1e293b',
  border: '#334155',
  danger: '#f87171',
  success: '#4ade80',
  radius: '12px',
  radiusSm: '8px',
  pad: '14px',
  gap: '10px',
}

export function tokensToCssVars(t: ThemeTokens): Record<string, string> {
  return {
    '--aui-primary': t.primary,
    '--aui-foreground': t.foreground,
    '--aui-muted': t.muted,
    '--aui-card': t.card,
    '--aui-border': t.border,
    '--aui-danger': t.danger,
    '--aui-success': t.success,
    '--aui-radius': t.radius,
    '--aui-radius-sm': t.radiusSm,
    '--aui-pad': t.pad,
    '--aui-gap': t.gap,
  }
}
