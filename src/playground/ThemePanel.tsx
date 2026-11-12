import type { CSSProperties } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

export function ThemePanel() {
  const { mode, setMode, tokens, setTokens, resetTokens } = useTheme()

  return (
    <section style={panelStyle}>
      <div style={panelHead}>
        <strong>Theme</strong>
        <button type="button" style={ghostBtn} onClick={resetTokens}>
          Reset
        </button>
      </div>

      <label style={labelStyle}>
        Mode
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'light' | 'dark')}
          style={inputStyle}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>

      <label style={labelStyle}>
        Primary
        <input
          type="color"
          value={toHex(tokens.primary)}
          onChange={(e) => setTokens({ primary: e.target.value })}
          style={{ width: '100%', height: 32, border: 0, background: 'transparent' }}
        />
      </label>

      <label style={labelStyle}>
        Radius ({tokens.radius})
        <input
          type="range"
          min={0}
          max={24}
          value={parseInt(tokens.radius, 10) || 12}
          onChange={(e) =>
            setTokens({
              radius: `${e.target.value}px`,
              radiusSm: `${Math.max(0, Number(e.target.value) - 4)}px`,
            })
          }
        />
      </label>

      <label style={labelStyle}>
        Padding ({tokens.pad})
        <input
          type="range"
          min={6}
          max={28}
          value={parseInt(tokens.pad, 10) || 14}
          onChange={(e) => setTokens({ pad: `${e.target.value}px` })}
        />
      </label>

      <label style={labelStyle}>
        Gap ({tokens.gap})
        <input
          type="range"
          min={4}
          max={20}
          value={parseInt(tokens.gap, 10) || 10}
          onChange={(e) => setTokens({ gap: `${e.target.value}px` })}
        />
      </label>
    </section>
  )
}

function toHex(color: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color
  return '#2563eb'
}

const panelStyle: CSSProperties = {
  border: '1px solid var(--aui-border)',
  borderRadius: 'var(--aui-radius)',
  padding: 12,
  background: 'var(--aui-card)',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}

const panelHead: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 13,
}

const labelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: 12,
  color: 'var(--aui-muted)',
}

const inputStyle: CSSProperties = {
  border: '1px solid var(--aui-border)',
  borderRadius: 8,
  padding: '6px 8px',
  background: 'transparent',
  color: 'var(--aui-foreground)',
}

const ghostBtn: CSSProperties = {
  border: '1px solid var(--aui-border)',
  borderRadius: 8,
  padding: '2px 8px',
  background: 'transparent',
  color: 'var(--aui-muted)',
  cursor: 'pointer',
  fontSize: 12,
}
