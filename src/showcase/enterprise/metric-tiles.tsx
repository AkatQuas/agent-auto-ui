import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

interface Metric {
  label?: string
  value?: unknown
  unit?: string
  trend?: string
  delta?: unknown
  traceId?: string
}

/** Showcase: KPI metric tiles (read-only; clicks log evidence id). */
export const metricTilesAtom: Primitive = (props) => {
  const title = str(props.title) || 'Business metrics'
  const metrics = (Array.isArray(props.metrics) ? props.metrics : []) as Metric[]
  const trendMark = (m: Metric) => (m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : m.trend === 'flat' ? '—' : '')

  return (
    <div
      style={{
        background: 'var(--aui-card)',
        border: '1px solid var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <b style={{ fontSize: 14 }}>{title}</b>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--aui-muted)' }}>{metrics.length} metrics</span>
      </div>
      {metrics.length === 0 ? (
        <div style={{ color: 'var(--aui-muted)', fontSize: 13 }}>No metrics yet.</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 'var(--aui-gap)',
          }}
        >
          {metrics.map((m, i) => {
            const tid = str(m.traceId)
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (tid) console.info('[showcase] open-evidence', { traceId: tid, label: m.label })
                }}
                style={{
                  textAlign: 'left',
                  border: '1px solid var(--aui-border)',
                  borderRadius: 'var(--aui-radius-sm)',
                  padding: '10px 12px',
                  background: 'color-mix(in srgb, var(--aui-card) 92%, var(--aui-primary))',
                  cursor: tid ? 'pointer' : 'default',
                  color: 'inherit',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginBottom: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                  {str(m.label)}
                  {tid ? (
                    <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--aui-success)', display: 'inline-block' }} />
                  ) : null}
                </div>
                <div style={{ fontSize: 20, fontWeight: 650, lineHeight: 1.3 }}>
                  {str(m.value ?? '—')}
                  {m.unit ? <span style={{ marginLeft: 2, fontSize: 12, fontWeight: 400, color: 'var(--aui-muted)' }}>{m.unit}</span> : null}
                </div>
                {(m.delta != null || m.trend) && (
                  <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 2 }}>
                    {trendMark(m)} {m.delta != null ? str(m.delta) : ''}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
