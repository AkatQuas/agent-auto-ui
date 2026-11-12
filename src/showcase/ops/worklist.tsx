import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

interface Item {
  label?: string
  count?: number
  unit?: string
  tone?: 'ok' | 'warn' | 'danger' | string
  hint?: string
  route?: string
}

/** Showcase: ops worklist — “what to do now” tiles (navigate logs only). */
export const worklistAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : []) as Item[]
  const title = str(props.title) || 'Work queue'
  const actor = str(props.actor)
  const asOf = str(props.asOf)
  const note = str(props.note)

  const toneColor = (tone?: string) =>
    tone === 'danger' ? 'var(--aui-danger)' : tone === 'warn' ? '#d97706' : 'var(--aui-success)'

  return (
    <div
      style={{
        background: 'var(--aui-card)',
        border: '1px solid var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <b style={{ fontSize: 14 }}>{title}</b>
        {actor ? <span style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{actor}</span> : null}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--aui-muted)' }}>{asOf}</span>
      </div>
      {items.length === 0 ? (
        <div style={{ color: 'var(--aui-muted)', fontSize: 13 }}>Nothing to do.</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 8,
          }}
        >
          {items.map((it, i) => {
            const can = typeof it.route === 'string' && it.route !== ''
            return (
              <button
                key={i}
                type="button"
                disabled={!can}
                onClick={() => {
                  if (can) console.info('[showcase] navigate', { route: it.route, label: it.label })
                }}
                style={{
                  textAlign: 'left',
                  border: '1px solid var(--aui-border)',
                  borderRadius: 'var(--aui-radius-sm)',
                  padding: '9px 11px',
                  background: 'color-mix(in srgb, var(--aui-card) 92%, var(--aui-primary))',
                  cursor: can ? 'pointer' : 'default',
                  color: 'inherit',
                  opacity: can ? 1 : 0.92,
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{it.label ?? '—'}</div>
                <div style={{ fontSize: 20, fontWeight: 650, lineHeight: 1.3, marginTop: 2, color: toneColor(it.tone) }}>
                  {typeof it.count === 'number' ? it.count : '—'}
                  {it.unit != null ? (
                    <span style={{ marginLeft: 2, fontSize: 12, fontWeight: 400, color: 'var(--aui-muted)' }}>
                      {it.unit}
                    </span>
                  ) : null}
                </div>
                {it.hint ? (
                  <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 3, lineHeight: 1.5 }}>{it.hint}</div>
                ) : null}
                {can ? (
                  <div style={{ fontSize: 11, color: 'var(--aui-primary)', marginTop: 4 }}>Open →</div>
                ) : null}
              </button>
            )
          })}
        </div>
      )}
      {note ? <div style={{ marginTop: 10, fontSize: 12, color: 'var(--aui-muted)' }}>{note}</div> : null}
    </div>
  )
}
