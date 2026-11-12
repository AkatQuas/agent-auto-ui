import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

/** Showcase: strategy summary card. */
export const strategySummaryAtom: Primitive = (props) => {
  const title = str(props.title) || 'Strategy summary'
  const summary = str(props.summary || props.text)
  const metrics = (Array.isArray(props.metrics) ? props.metrics : []) as {
    label?: string
    value?: unknown
    unit?: string
  }[]
  const risks = (Array.isArray(props.risks) ? props.risks : []) as string[]

  return (
    <div
      style={{
        background: 'var(--aui-card)',
        border: '1px solid var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
      }}
    >
      <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 8 }}>{title}</div>
      {summary ? (
        <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--aui-foreground)', marginBottom: 12 }}>{summary}</div>
      ) : null}
      {metrics.length ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 8,
            marginBottom: risks.length ? 12 : 0,
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                border: '1px solid var(--aui-border)',
                borderRadius: 'var(--aui-radius-sm)',
                padding: '8px 10px',
              }}
            >
              <div style={{ fontSize: 11, color: 'var(--aui-muted)' }}>{str(m.label)}</div>
              <div style={{ marginTop: 2, fontWeight: 700, fontSize: 16 }}>
                {str(m.value)}
                {m.unit ? <span style={{ marginLeft: 2, fontSize: 11, fontWeight: 400, color: 'var(--aui-muted)' }}>{m.unit}</span> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {risks.length ? (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--aui-danger)' }}>Risk notes</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.5 }}>
            {risks.map((r, i) => (
              <li key={i}>{str(r)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
