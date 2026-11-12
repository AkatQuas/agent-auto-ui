import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))
const num = (v: unknown) => (typeof v === 'number' ? v : Number(v) || 0)

/** Lightweight SVG chart (no external chart lib). */
export const chartAtoms: Record<string, Primitive> = {
  chart: ({ type, title, data, unit }) => {
    const rows = (Array.isArray(data) ? data : []) as { label?: string; value?: unknown }[]
    const values = rows.map((r) => num(r.value))
    const max = Math.max(1, ...values)
    const kind = str(type) || 'bar'
    const w = 320
    const h = 140
    const pad = 16

    return (
      <div
        style={{
          background: 'var(--aui-card)',
          border: '1px solid var(--aui-border)',
          borderRadius: 'var(--aui-radius)',
          padding: 'var(--aui-pad)',
        }}
      >
        {title != null ? <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 10 }}>{str(title)}</div> : null}
        {kind === 'pie' ? (
          <Pie values={values} labels={rows.map((r) => str(r.label))} unit={str(unit)} />
        ) : (
          <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
            {kind === 'bar'
              ? rows.map((r, i) => {
                  const bw = (w - pad * 2) / Math.max(rows.length, 1)
                  const bh = ((h - pad * 2) * num(r.value)) / max
                  return (
                    <g key={i}>
                      <rect
                        x={pad + i * bw + 4}
                        y={h - pad - bh}
                        width={Math.max(bw - 8, 4)}
                        height={bh}
                        rx={4}
                        fill="var(--aui-primary)"
                        opacity={0.85}
                      />
                      <text
                        x={pad + i * bw + bw / 2}
                        y={h - 2}
                        textAnchor="middle"
                        fontSize={10}
                        fill="var(--aui-muted)"
                      >
                        {str(r.label)}
                      </text>
                    </g>
                  )
                })
              : (
                  <polyline
                    fill="none"
                    stroke="var(--aui-primary)"
                    strokeWidth={2.5}
                    points={rows
                      .map((r, i) => {
                        const x = pad + (i * (w - pad * 2)) / Math.max(rows.length - 1, 1)
                        const y = h - pad - ((h - pad * 2) * num(r.value)) / max
                        return `${x},${y}`
                      })
                      .join(' ')}
                  />
                )}
          </svg>
        )}
        {unit ? <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 4 }}>Unit: {str(unit)}</div> : null}
      </div>
    )
  },
}

function Pie({ values, labels, unit }: { values: number[]; labels: string[]; unit: string }) {
  const total = values.reduce((a, b) => a + b, 0) || 1
  let angle = -Math.PI / 2
  const cx = 70
  const cy = 70
  const r = 54
  const colors = ['var(--aui-primary)', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        {values.map((v, i) => {
          const slice = (v / total) * Math.PI * 2
          const x1 = cx + r * Math.cos(angle)
          const y1 = cy + r * Math.sin(angle)
          angle += slice
          const x2 = cx + r * Math.cos(angle)
          const y2 = cy + r * Math.sin(angle)
          const large = slice > Math.PI ? 1 : 0
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
              fill={colors[i % colors.length]}
              opacity={0.9}
            />
          )
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
        {labels.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: colors[i % colors.length],
                display: 'inline-block',
              }}
            />
            <span>
              {l}: {values[i]}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
