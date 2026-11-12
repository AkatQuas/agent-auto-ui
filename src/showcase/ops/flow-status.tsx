import type { Primitive } from '@/protocol/types'
import { cardShell, str } from '../ui'

interface Step {
  label?: string
  state?: 'done' | 'active' | 'blocked' | 'todo' | string
  code?: string
  owner?: string
  blockedBy?: string
  at?: string
}

/** Showcase: document flow chain with blocked owner. */
export const flowStatusAtom: Primitive = (props) => {
  const steps = (Array.isArray(props.steps) ? props.steps : []) as Step[]
  const title = str(props.title) || 'Flow progress'
  const subject = str(props.subject)
  const note = str(props.note)

  const color = (s?: string) =>
    s === 'done' ? 'var(--aui-success)' : s === 'active' ? 'var(--aui-primary)' : s === 'blocked' ? 'var(--aui-danger)' : 'var(--aui-muted)'

  return (
    <div className="sc-card">
      <style>{cardShell}</style>
      <div className="sc-hd">
        <b>{title}</b>
        {subject ? <span className="sc-sub">{subject}</span> : null}
      </div>
      <div className="sc-bd">
        {steps.length === 0 ? (
          <div className="sc-muted">No flow history.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16, flex: '0 0 16px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: color(s.state), marginTop: 4 }} />
                  {i < steps.length - 1 ? (
                    <span style={{ width: 2, flex: 1, minHeight: 14, background: 'var(--aui-border)' }} />
                  ) : null}
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 650 }}>
                    {str(s.label)}
                    {s.owner ? (
                      <span className="sc-pill" style={{ marginLeft: 6 }}>
                        {str(s.owner)}
                      </span>
                    ) : null}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 2 }}>
                    {s.code ? <span style={{ color: 'var(--aui-primary)' }}>{str(s.code)}</span> : null}
                    {s.at ? ` · ${str(s.at)}` : ''}
                  </div>
                  {s.blockedBy ? (
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: 'var(--aui-danger)',
                        background: 'color-mix(in srgb, var(--aui-danger) 8%, transparent)',
                        borderLeft: '2px solid var(--aui-danger)',
                        padding: '4px 8px',
                        borderRadius: '0 4px 4px 0',
                      }}
                    >
                      {str(s.blockedBy)}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
        {note ? <div className="sc-muted" style={{ marginTop: 4 }}>{note}</div> : null}
      </div>
    </div>
  )
}
