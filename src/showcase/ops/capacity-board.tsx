import type { Primitive } from '@/protocol/types'
import { cardShell, str } from '../ui'

/**
 * New showcase (inspired by group charts + worklists):
 * workshop capacity board with load bars and shift tags.
 */
export const capacityBoardAtom: Primitive = (props) => {
  const title = str(props.title) || 'Capacity board'
  const asOf = str(props.asOf)
  const lines = (Array.isArray(props.lines) ? props.lines : []) as {
    workshop?: string
    load?: number
    capacity?: number
    shift?: string
    risk?: string
  }[]

  return (
    <div className="sc-card">
      <style>{cardShell}</style>
      <div className="sc-hd">
        <b>{title}</b>
        {asOf ? <span className="sc-sub">{asOf}</span> : null}
        <span className="sc-sub" style={{ marginLeft: 'auto' }}>{lines.length} workshops</span>
      </div>
      <div className="sc-bd" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lines.map((line, i) => {
          const cap = Math.max(1, Number(line.capacity) || 1)
          const load = Math.max(0, Number(line.load) || 0)
          const pct = Math.min(100, Math.round((load / cap) * 100))
          const over = load > cap
          return (
            <div key={i} style={{ border: '1px solid var(--aui-border)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <span style={{ fontWeight: 650, fontSize: 13 }}>{str(line.workshop)}</span>
                <span style={{ fontSize: 12, color: 'var(--aui-muted)' }}>
                  {load}/{cap} · {str(line.shift) || 'Day shift'}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb, var(--aui-border) 80%, transparent)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: over ? 'var(--aui-danger)' : pct > 80 ? '#d97706' : 'var(--aui-primary)',
                  }}
                />
              </div>
              {line.risk ? (
                <div style={{ marginTop: 6, fontSize: 12, color: over ? 'var(--aui-danger)' : 'var(--aui-muted)' }}>{str(line.risk)}</div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
