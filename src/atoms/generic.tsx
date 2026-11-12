import type { CSSProperties, ReactNode } from 'react'
import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

const cardStyle: CSSProperties = {
  background: 'var(--aui-card)',
  border: '1px solid var(--aui-border)',
  borderRadius: 'var(--aui-radius)',
  padding: 'var(--aui-pad)',
  color: 'var(--aui-foreground)',
}

type TableCol = { key: string; label: string }

function tableColumns(columns: unknown, rows: unknown[]): TableCol[] {
  if (Array.isArray(columns) && columns.length > 0) {
    return columns.map((c, i) => {
      if (c && typeof c === 'object') {
        const o = c as Record<string, unknown>
        const key = str(o.key ?? o.label ?? i)
        return { key, label: str(o.label ?? o.key ?? key) }
      }
      return { key: str(c), label: str(c) }
    })
  }
  const first = rows.find((r) => r && typeof r === 'object' && !Array.isArray(r)) as
    | Record<string, unknown>
    | undefined
  if (first) return Object.keys(first).map((k) => ({ key: k, label: k }))
  return []
}

function tableRowCells(row: unknown, cols: TableCol[]): unknown[] {
  if (Array.isArray(row)) return row
  if (row && typeof row === 'object') {
    const o = row as Record<string, unknown>
    if (cols.length) return cols.map((c) => o[c.key])
    return Object.values(o)
  }
  return []
}

function Shell({
  title,
  children,
  style,
}: {
  title?: unknown
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <div style={{ ...cardStyle, ...style }}>
      {title != null ? (
        <div style={{ fontWeight: 650, marginBottom: 'var(--aui-gap)', fontSize: 14 }}>{str(title)}</div>
      ) : null}
      {children}
    </div>
  )
}

export const genericAtoms: Record<string, Primitive> = {
  card: ({ title, description, children }) => (
    <Shell title={title}>
      {description != null ? (
        <div style={{ color: 'var(--aui-muted)', fontSize: 13, marginBottom: 'var(--aui-gap)' }}>
          {str(description)}
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aui-gap)' }}>{children}</div>
    </Shell>
  ),

  text: ({ value }) => (
    <div style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--aui-foreground)' }}>{str(value)}</div>
  ),

  stat: ({ label, value, unit, size }) => {
    const big = str(size) === 'lg'
    // Reserve height for value slot at large size: labels top-align in a row; smaller values sit on the same baseline as large values
    const valueSlotH = 32
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          style={{
            fontSize: 12,
            lineHeight: 1.2,
            color: 'var(--aui-muted)',
            minHeight: '1.2em',
            visibility: label == null ? 'hidden' : 'visible',
          }}
        >
          {label == null ? ' ' : str(label)}
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            minHeight: valueSlotH,
            color: 'var(--aui-foreground)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, lineHeight: 1 }}>
            <span style={{ fontSize: big ? 32 : 22, fontWeight: 700, lineHeight: 1 }}>{str(value)}</span>
            {unit != null ? (
              <span style={{ fontSize: big ? 14 : 13, fontWeight: 400, color: 'var(--aui-muted)', lineHeight: 1 }}>
                {str(unit)}
              </span>
            ) : null}
          </span>
        </span>
      </div>
    )
  },

  kv: ({ items }) => (
    <div style={{ border: '1px solid var(--aui-border)', borderRadius: 'var(--aui-radius-sm)', overflow: 'hidden' }}>
      {(Array.isArray(items) ? items : []).map((it: { k?: string; v?: string }, i: number) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            padding: '8px 12px',
            fontSize: 13,
            borderTop: i > 0 ? '1px solid var(--aui-border)' : undefined,
          }}
        >
          <span style={{ color: 'var(--aui-muted)' }}>{it.k}</span>
          <span style={{ fontWeight: 560 }}>{it.v}</span>
        </div>
      ))}
    </div>
  ),

  // Top-align: stat labels share one line; values bottom-align within each slot (see stat)
  row: ({ children }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--aui-gap)' }}>{children}</div>
  ),

  grid: ({ cols, children }) => {
    const n = Math.max(1, Math.min(6, Number(cols) || 2))
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
          gap: 'var(--aui-gap)',
        }}
      >
        {children}
      </div>
    )
  },

  divider: () => <hr style={{ border: 0, borderTop: '1px solid var(--aui-border)', margin: '4px 0' }} />,

  badge: ({ label, tone }) => {
    const t = str(tone)
    const bg =
      t === 'danger'
        ? 'color-mix(in srgb, var(--aui-danger) 18%, transparent)'
        : t === 'success'
          ? 'color-mix(in srgb, var(--aui-success) 18%, transparent)'
          : 'color-mix(in srgb, var(--aui-primary) 16%, transparent)'
    const color =
      t === 'danger' ? 'var(--aui-danger)' : t === 'success' ? 'var(--aui-success)' : 'var(--aui-primary)'
    return (
      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 999,
          background: bg,
          color,
        }}
      >
        {str(label)}
      </span>
    )
  },

  list: ({ items, ordered }) => {
    const Tag = ordered ? 'ol' : 'ul'
    return (
      <Tag style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--aui-foreground)' }}>
        {(Array.isArray(items) ? items : []).map((it, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            {typeof it === 'string' || typeof it === 'number' ? str(it) : str((it as { text?: string }).text ?? it)}
          </li>
        ))}
      </Tag>
    )
  },

  table: ({ columns, rows, title }) => {
    const data = Array.isArray(rows) ? rows : []
    const cols = tableColumns(columns, data)
    return (
      <Shell title={title}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            {cols.length ? (
              <thead>
                <tr>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      style={{
                        textAlign: 'left',
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--aui-border)',
                        color: 'var(--aui-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {tableRowCells(row, cols).map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: '10px 14px',
                        borderBottom: i < data.length - 1 ? '1px solid var(--aui-border)' : undefined,
                      }}
                    >
                      {str(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Shell>
    )
  },

  progress: ({ value, label }) => {
    const pct = Math.max(0, Math.min(100, Number(value) || 0))
    return (
      <div>
        {label != null ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: 'var(--aui-muted)' }}>{str(label)}</span>
            <span>{pct}%</span>
          </div>
        ) : null}
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: 'color-mix(in srgb, var(--aui-border) 80%, transparent)',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--aui-primary)' }} />
        </div>
      </div>
    )
  },

  image: ({ src, alt, ratio }) => {
    if (!src) return null
    return (
      <div
        style={{
          borderRadius: 'var(--aui-radius-sm)',
          overflow: 'hidden',
          border: '1px solid var(--aui-border)',
          aspectRatio: str(ratio) || '16 / 9',
          background: 'color-mix(in srgb, var(--aui-muted) 12%, transparent)',
        }}
      >
        <img src={str(src)} alt={str(alt)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  },

  callout: ({ tone, title, text }) => {
    const t = str(tone) || 'info'
    const accent =
      t === 'danger' ? 'var(--aui-danger)' : t === 'success' ? 'var(--aui-success)' : 'var(--aui-primary)'
    return (
      <div
        style={{
          ...cardStyle,
          borderLeft: `3px solid ${accent}`,
          background: `color-mix(in srgb, ${accent} 8%, var(--aui-card))`,
        }}
      >
        {title != null ? <div style={{ fontWeight: 650, marginBottom: 4, fontSize: 13 }}>{str(title)}</div> : null}
        <div style={{ fontSize: 13, color: 'var(--aui-foreground)', lineHeight: 1.5 }}>{str(text)}</div>
      </div>
    )
  },

  // Content block: no extra card shell to avoid nested boxes inside card; wrap with outer card when used alone
  steps: ({ title, items }) => (
    <div>
      {title != null ? <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 10 }}>{str(title)}</div> : null}
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(Array.isArray(items) ? items : []).map((it: { title?: string; desc?: string }, i: number) => (
          <li key={i} style={{ display: 'flex', gap: 10 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: 'var(--aui-primary)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
            >
              {i + 1}
            </span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{str(it.title)}</div>
              {it.desc ? <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 2 }}>{str(it.desc)}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  ),

  faq: ({ title, items }) => (
    <div>
      {title != null ? <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 10 }}>{str(title)}</div> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(Array.isArray(items) ? items : []).map((it: { q?: string; a?: string }, i: number) => (
          <details
            key={i}
            style={{
              border: '1px solid var(--aui-border)',
              borderRadius: 'var(--aui-radius-sm)',
              padding: '8px 10px',
            }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{str(it.q)}</summary>
            <div style={{ marginTop: 6, fontSize: 13, color: 'var(--aui-muted)', lineHeight: 1.5 }}>{str(it.a)}</div>
          </details>
        ))}
      </div>
    </div>
  ),

  icon: ({ name }) => (
    <span
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        width: 28,
        height: 28,
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--aui-primary) 14%, transparent)',
        color: 'var(--aui-primary)',
        fontSize: 12,
        fontWeight: 700,
      }}
      title={str(name)}
    >
      {(str(name) || '?').slice(0, 1).toUpperCase()}
    </span>
  ),
}
