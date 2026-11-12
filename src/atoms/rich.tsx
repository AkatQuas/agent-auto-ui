import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

const box: CSSProperties = {
  background: 'var(--aui-card)',
  border: '1px solid var(--aui-border)',
  borderRadius: 'var(--aui-radius)',
  padding: 'var(--aui-pad)',
  color: 'var(--aui-foreground)',
}

function Title({ children }: { children?: ReactNode }) {
  if (children == null || children === '') return null
  return <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 10 }}>{children}</div>
}

const ICON_GLYPH: Record<string, string> = {
  sparkles: '✦',
  zap: '⚡',
  shield: '⛨',
  rocket: '▲',
  star: '★',
  heart: '♥',
  trend: '↗',
  globe: '○',
  cpu: '▣',
  lock: '🔒',
  cloud: '☁',
  gauge: '◔',
  sun: '☀',
  moon: '☾',
  rain: '☂',
  snow: '❄',
  fog: '≡',
  thunder: '↯',
  'partly-cloudy': '⛅',
}

function Glyph({ name, size = 18 }: { name?: unknown; size?: number }) {
  const key = str(name).toLowerCase()
  return (
    <span style={{ fontSize: size, lineHeight: 1 }} aria-hidden>
      {ICON_GLYPH[key] || ICON_GLYPH[key.split('-')[0] || ''] || '●'}
    </span>
  )
}

export const richAtoms: Record<string, Primitive> = {
  weather: ({ location, condition, temp, unit, high, low, icon, forecast }) => {
    const days = (Array.isArray(forecast) ? forecast : []) as { day?: string; icon?: string; high?: unknown; low?: unknown }[]
    return (
      <div style={box}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--aui-muted)' }}>{str(location)}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{str(temp)}</span>
              <span style={{ color: 'var(--aui-muted)' }}>°{str(unit) || 'C'}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13 }}>{str(condition)}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-muted)' }}>
              High {str(high)} / Low {str(low)}
            </div>
          </div>
          <Glyph name={icon || condition} size={36} />
        </div>
        {days.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(days.length, 5)}, 1fr)`, gap: 8, marginTop: 14 }}>
            {days.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 12 }}>
                <div style={{ color: 'var(--aui-muted)' }}>{str(d.day)}</div>
                <div style={{ margin: '6px 0' }}>
                  <Glyph name={d.icon} />
                </div>
                <div>
                  {str(d.high)}/{str(d.low)}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  },
  'weather-card': (p) => richAtoms.weather!(p),

  flight: ({ from, to, date, flights }) => {
    const list = (Array.isArray(flights) ? flights : []) as {
      airline?: string
      code?: string
      depart?: string
      arrive?: string
      duration?: string
      price?: string
      tag?: string
    }[]
    return (
      <div style={box}>
        <Title>
          {str(from)} → {str(to)} · {str(date)}
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((f, i) => (
            <div key={i} style={{ border: '1px solid var(--aui-border)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <b style={{ fontSize: 13 }}>{str(f.airline)}</b>
                {f.tag ? (
                  <span style={{ fontSize: 11, color: 'var(--aui-primary)' }}>{str(f.tag)}</span>
                ) : null}
              </div>
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>
                  {str(f.depart)} → {str(f.arrive)}
                </span>
                <span style={{ color: 'var(--aui-muted)' }}>{str(f.duration)}</span>
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-muted)' }}>
                {str(f.code)} · {str(f.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  'flight-card': (p) => richAtoms.flight!(p),

  timeline: ({ title, items }) => {
    const list = (Array.isArray(items) ? items : []) as { time?: string; title?: string; content?: string; image?: string }[]
    return (
      <div style={box}>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {list.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--aui-primary)', marginTop: 4 }} />
                {i < list.length - 1 ? <span style={{ width: 2, flex: 1, background: 'var(--aui-border)', minHeight: 16 }} /> : null}
              </div>
              <div style={{ paddingBottom: 12, flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{str(it.time)}</div>
                <div style={{ fontWeight: 650, fontSize: 13 }}>{str(it.title)}</div>
                {it.content ? <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 2 }}>{str(it.content)}</div> : null}
                {it.image ? (
                  <img src={str(it.image)} alt="" style={{ marginTop: 8, width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 8 }} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },

  hero: ({ title, subtitle, highlight, effect, height }) => (
    <div
      style={{
        ...box,
        minHeight: Number(height) || 160,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        background: `radial-gradient(60% 80% at 30% 20%, color-mix(in srgb, var(--aui-primary) 35%, transparent), transparent 70%), var(--aui-card)`,
        position: 'relative',
        overflow: 'hidden',
      }}
      data-effect={str(effect) || 'gradient'}
    >
      <div>
        <div style={{ fontSize: 22, fontWeight: 750 }}>
          {str(title)}{' '}
          {highlight != null ? <span style={{ color: 'var(--aui-primary)' }}>{str(highlight)}</span> : null}
        </div>
        {subtitle != null ? <div style={{ marginTop: 8, color: 'var(--aui-muted)', fontSize: 13 }}>{str(subtitle)}</div> : null}
      </div>
    </div>
  ),

  'feature-cards': ({ title, columns, items }) => {
    const list = (Array.isArray(items) ? items : []) as { icon?: string; title?: string; desc?: string }[]
    const cols = Math.min(4, Math.max(1, Number(columns) || (list.length >= 3 ? 3 : list.length || 1)))
    return (
      <div>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 10 }}>
          {list.map((f, i) => (
            <div key={i} style={{ ...box, padding: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'color-mix(in srgb, var(--aui-primary) 14%, transparent)',
                  color: 'var(--aui-primary)',
                }}
              >
                <Glyph name={f.icon} />
              </div>
              <div style={{ marginTop: 10, fontWeight: 650, fontSize: 13 }}>{str(f.title)}</div>
              {f.desc ? <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.5 }}>{str(f.desc)}</div> : null}
            </div>
          ))}
        </div>
      </div>
    )
  },

  'stat-cards': ({ items }) => {
    const list = (Array.isArray(items) ? items : []) as { label?: string; value?: unknown; unit?: string; delta?: string; icon?: string }[]
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {list.map((it, i) => (
          <div key={i} style={box}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--aui-muted)' }}>
              <span>{str(it.label)}</span>
              <Glyph name={it.icon} size={14} />
            </div>
            <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>{str(it.value)}</span>
              {it.unit ? <span style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{str(it.unit)}</span> : null}
            </div>
            {it.delta ? <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-primary)' }}>{str(it.delta)}</div> : null}
          </div>
        ))}
      </div>
    )
  },

  quote: ({ text, author, role }) => (
    <div style={{ ...box, borderLeft: '3px solid var(--aui-primary)' }}>
      <div style={{ fontSize: 15, lineHeight: 1.55, fontStyle: 'italic' }}>“{str(text)}”</div>
      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--aui-muted)' }}>
        {str(author)}
        {role ? ` · ${str(role)}` : ''}
      </div>
    </div>
  ),

  'glare-card': ({ title, subtitle, image }) => (
    <div style={{ ...box, position: 'relative', minHeight: 140, overflow: 'hidden', padding: 0 }}>
      {image ? (
        <img src={str(image)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, color-mix(in srgb, var(--aui-primary) 30%, transparent), transparent)' }} />
      )}
      <div style={{ position: 'relative', padding: 18 }}>
        <div style={{ fontWeight: 750, fontSize: 16 }}>{str(title)}</div>
        {subtitle != null ? <div style={{ marginTop: 6, color: 'var(--aui-muted)', fontSize: 13 }}>{str(subtitle)}</div> : null}
      </div>
    </div>
  ),

  'wobble-card': ({ title, subtitle }) => (
    <div style={{ ...box, transform: 'perspective(600px) rotateX(2deg)', boxShadow: '0 10px 24px color-mix(in srgb, var(--aui-foreground) 10%, transparent)' }}>
      <div style={{ fontWeight: 750, fontSize: 16 }}>{str(title)}</div>
      {subtitle != null ? <div style={{ marginTop: 6, color: 'var(--aui-muted)', fontSize: 13 }}>{str(subtitle)}</div> : null}
    </div>
  ),

  'spotlight-card': ({ title, subtitle, items }) => {
    const list = (Array.isArray(items) ? items : []).map(str)
    return (
      <div style={{ ...box, background: 'color-mix(in srgb, var(--aui-foreground) 92%, var(--aui-primary))', color: '#f8fafc' }}>
        <div style={{ fontWeight: 750, fontSize: 16 }}>{str(title)}</div>
        {subtitle != null ? <div style={{ marginTop: 4, opacity: 0.75, fontSize: 13 }}>{str(subtitle)}</div> : null}
        <ul style={{ margin: '12px 0 0', paddingLeft: 18, fontSize: 13, lineHeight: 1.55 }}>
          {list.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    )
  },

  'profile-card': ({ name, role, bio }) => (
    <div style={{ ...box, display: 'flex', gap: 12, alignItems: 'center' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          background: 'var(--aui-primary)',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          flex: '0 0 auto',
        }}
      >
        {str(name).slice(0, 1) || '?'}
      </div>
      <div>
        <div style={{ fontWeight: 650 }}>{str(name)}</div>
        <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{str(role)}</div>
        {bio != null ? <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-muted)' }}>{str(bio)}</div> : null}
      </div>
    </div>
  ),

  article: ({ title, cover, author, date, content }) => (
    <div style={{ ...box, padding: 0, overflow: 'hidden' }}>
      {cover ? <img src={str(cover)} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} /> : null}
      <div style={{ padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{str(title)}</div>
        <div style={{ marginTop: 4, fontSize: 12, color: 'var(--aui-muted)' }}>
          {[author, date].filter(Boolean).map(str).join(' · ')}
        </div>
        {content != null ? (
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{str(content)}</div>
        ) : null}
      </div>
    </div>
  ),

  'article-list': ({ title, items }) => {
    const list = (Array.isArray(items) ? items : []) as { title?: string; excerpt?: string; image?: string; tag?: string; meta?: string }[]
    return (
      <div style={box}>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              {it.image ? (
                <img src={str(it.image)} alt="" style={{ width: 72, height: 56, objectFit: 'cover', borderRadius: 8, flex: '0 0 auto' }} />
              ) : null}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 650, fontSize: 13 }}>{str(it.title)}</div>
                {it.excerpt ? <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 2 }}>{str(it.excerpt)}</div> : null}
                <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 4 }}>
                  {[it.tag, it.meta].filter(Boolean).map(str).join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },

  team: ({ title, members }) => {
    const list = (Array.isArray(members) ? members : []) as { name?: string; role?: string }[]
    return (
      <div style={box}>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
          {list.map((m, i) => (
            <div key={i} style={{ textAlign: 'center', border: '1px solid var(--aui-border)', borderRadius: 10, padding: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  margin: '0 auto',
                  background: 'var(--aui-primary)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                }}
              >
                {str(m.name).slice(0, 1)}
              </div>
              <div style={{ marginTop: 8, fontWeight: 650, fontSize: 13 }}>{str(m.name)}</div>
              <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{str(m.role)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },

  pricing: ({ title, plans }) => {
    const list = (Array.isArray(plans) ? plans : []) as {
      name?: string
      price?: string
      period?: string
      features?: string[]
      featured?: boolean
      cta?: string
    }[]
    return (
      <div>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(list.length || 1, 3)}, minmax(0,1fr))`, gap: 10 }}>
          {list.map((p, i) => (
            <div
              key={i}
              style={{
                ...box,
                borderColor: p.featured ? 'var(--aui-primary)' : 'var(--aui-border)',
                boxShadow: p.featured ? '0 0 0 1px var(--aui-primary)' : undefined,
              }}
            >
              <div style={{ fontWeight: 650 }}>{str(p.name)}</div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 24, fontWeight: 750 }}>{str(p.price)}</span>
                {p.period ? <span style={{ fontSize: 12, color: 'var(--aui-muted)' }}>/{str(p.period)}</span> : null}
              </div>
              <ul style={{ margin: '12px 0', paddingLeft: 18, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.55 }}>
                {(Array.isArray(p.features) ? p.features : []).map((f, j) => (
                  <li key={j}>{str(f)}</li>
                ))}
              </ul>
              <button
                type="button"
                style={{
                  width: '100%',
                  border: 0,
                  borderRadius: 8,
                  padding: '8px 10px',
                  background: p.featured ? 'var(--aui-primary)' : 'color-mix(in srgb, var(--aui-primary) 12%, transparent)',
                  color: p.featured ? '#fff' : 'var(--aui-foreground)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {str(p.cta) || 'Choose'}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  },

  'code-block': ({ filename, language, code }) => (
    <div style={{ ...box, padding: 0, overflow: 'hidden', background: '#0d1117', color: '#c9d1d9', borderColor: '#30363d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #30363d', fontSize: 12, color: '#8b949e' }}>
        <span>{str(filename) || 'untitled'}</span>
        <span>{str(language)}</span>
      </div>
      <pre style={{ margin: 0, padding: 12, fontSize: 12, lineHeight: 1.5, overflow: 'auto' }}>
        <code>{str(code)}</code>
      </pre>
    </div>
  ),

  terminal: ({ title, lines }) => {
    const list = (Array.isArray(lines) ? lines : []) as { cmd?: string; out?: string }[]
    return (
      <div style={{ ...box, padding: 0, overflow: 'hidden', background: '#0b1020', color: '#d7e0ff', borderColor: '#243049' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #243049', fontSize: 12, color: '#8fa0c3' }}>{str(title) || 'terminal'}</div>
        <div style={{ padding: 12, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.55 }}>
          {list.map((l, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              {l.cmd != null ? (
                <div>
                  <span style={{ color: '#7dd3a7' }}>$ </span>
                  {str(l.cmd)}
                </div>
              ) : null}
              {l.out != null ? <div style={{ color: '#9fb0d0', whiteSpace: 'pre-wrap' }}>{str(l.out)}</div> : null}
            </div>
          ))}
        </div>
      </div>
    )
  },

  'image-carousel': ({ title, cards }) => {
    const list = (Array.isArray(cards) ? cards : []) as { category?: string; title?: string; image?: string; images?: string[] }[]
    return (
      <div>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {list.map((c, i) => {
            const img = str(c.image || (Array.isArray(c.images) ? c.images[0] : ''))
            return (
              <div
                key={i}
                style={{
                  flex: '0 0 180px',
                  height: 240,
                  borderRadius: 16,
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--aui-border)',
                  background: 'var(--aui-card)',
                }}
              >
                {img ? <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.75), transparent 55%)' }} />
                <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, color: '#fff' }}>
                  {c.category ? <div style={{ fontSize: 11, opacity: 0.8 }}>{str(c.category)}</div> : null}
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{str(c.title)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },

  'image-grid': ({ title, columns, items }) => {
    const list = (Array.isArray(items) ? items : []) as { image?: string; title?: string; subtitle?: string }[]
    const cols = Math.min(4, Math.max(2, Number(columns) || 3))
    return (
      <div>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 8 }}>
          {list.map((it, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--aui-border)', position: 'relative', aspectRatio: '1 / 1' }}>
              {it.image ? <img src={str(it.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
              {(it.title || it.subtitle) && (
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 8, background: 'linear-gradient(to top, rgba(0,0,0,.7), transparent)', color: '#fff', fontSize: 12 }}>
                  <div style={{ fontWeight: 650 }}>{str(it.title)}</div>
                  {it.subtitle ? <div style={{ opacity: 0.8 }}>{str(it.subtitle)}</div> : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },

  notch: ({ title, status, tone }) => {
    const accent = str(tone) === 'danger' ? 'var(--aui-danger)' : str(tone) === 'success' ? 'var(--aui-success)' : 'var(--aui-primary)'
    return (
      <div style={{ ...box, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `3px solid ${accent}` }}>
        <span style={{ fontWeight: 650 }}>{str(title)}</span>
        <span style={{ fontSize: 12, color: accent }}>{str(status)}</span>
      </div>
    )
  },

  'stateful-button': ({ label, doneLabel }) => {
    const [done, setDone] = useState(false)
    return (
      <button
        type="button"
        onClick={() => setDone(true)}
        style={{
          border: 0,
          borderRadius: 10,
          padding: '10px 16px',
          background: done ? 'var(--aui-success)' : 'var(--aui-primary)',
          color: '#fff',
          fontWeight: 650,
          cursor: 'pointer',
        }}
      >
        {done ? str(doneLabel) || 'Done' : str(label) || 'Submit'}
      </button>
    )
  },

  'world-map': ({ title, markers }) => {
    const list = (Array.isArray(markers) ? markers : []) as { label?: string; x?: number; y?: number }[]
    return (
      <div style={box}>
        <Title>{title != null ? str(title) : null}</Title>
        <div style={{ position: 'relative', height: 160, borderRadius: 12, background: 'color-mix(in srgb, var(--aui-primary) 8%, var(--aui-card))', border: '1px dashed var(--aui-border)' }}>
          {list.map((m, i) => (
            <span
              key={i}
              title={str(m.label)}
              style={{
                position: 'absolute',
                left: `${Math.min(92, Math.max(4, Number(m.x) || 10 + i * 18))}%`,
                top: `${Math.min(88, Math.max(8, Number(m.y) || 20 + (i % 3) * 20))}%`,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: 'var(--aui-primary)',
                boxShadow: '0 0 0 4px color-mix(in srgb, var(--aui-primary) 25%, transparent)',
              }}
            />
          ))}
        </div>
      </div>
    )
  },

  'highlight-text': ({ before, highlight, after }) => (
    <div style={{ fontSize: 18, fontWeight: 650, lineHeight: 1.4 }}>
      {str(before)}
      <span style={{ background: 'color-mix(in srgb, var(--aui-primary) 22%, transparent)', padding: '0 4px', borderRadius: 4 }}>{str(highlight)}</span>
      {str(after)}
    </div>
  ),

  'gradient-text': ({ text }) => (
    <div
      style={{
        fontSize: 22,
        fontWeight: 750,
        backgroundImage: 'linear-gradient(90deg, var(--aui-primary), color-mix(in srgb, var(--aui-primary) 40%, #06b6d4))',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {str(text)}
    </div>
  ),

  'flip-words': ({ prefix, words, suffix }) => {
    const list = (Array.isArray(words) ? words : ['Agent', 'UI', 'Cards']).map(str)
    const [idx, setIdx] = useState(0)
    useEffect(() => {
      const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 1600)
      return () => clearInterval(t)
    }, [list.length])
    return (
      <div style={{ fontSize: 18, fontWeight: 650 }}>
        {str(prefix)} <span style={{ color: 'var(--aui-primary)' }}>{list[idx]}</span> {str(suffix)}
      </div>
    )
  },

  typewriter: ({ text, speed }) => {
    const full = str(text)
    const [n, setN] = useState(0)
    useEffect(() => {
      setN(0)
      const step = Math.max(20, Number(speed) || 40)
      const t = setInterval(() => setN((v) => (v >= full.length ? v : v + 1)), step)
      return () => clearInterval(t)
    }, [full, speed])
    return (
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14 }}>
        {full.slice(0, n)}
        <span style={{ opacity: 0.5 }}>▌</span>
      </div>
    )
  },
}

// Fix duplicate key in ICON_GLYPH - TypeScript might complain about cloud twice
// already have cloud once in the object - I accidentally listed cloud twice in the source above
