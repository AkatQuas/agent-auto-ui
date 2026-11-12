import type { Primitive } from '@/protocol/types'
import { cardShell, str } from '../ui'

/**
 * New showcase (inspired by flow-status + briefing):
 * delivery promise / SLA card with confidence and blockers.
 */
export const deliveryPromiseAtom: Primitive = (props) => {
  const title = str(props.title) || 'Delivery promise'
  const orderNo = str(props.orderNo)
  const promiseDate = str(props.promiseDate)
  const confidence = Math.max(0, Math.min(100, Number(props.confidence) || 0))
  const status = str(props.status) || 'on-track'
  const blockers = (Array.isArray(props.blockers) ? props.blockers : []).map(str).filter(Boolean)
  const milestones = (Array.isArray(props.milestones) ? props.milestones : []) as { label?: string; date?: string; done?: boolean }[]

  const statusColor =
    status === 'at-risk' ? '#d97706' : status === 'late' ? 'var(--aui-danger)' : 'var(--aui-success)'

  return (
    <div className="sc-card">
      <style>{cardShell}</style>
      <div className="sc-hd">
        <b>{title}</b>
        {orderNo ? <span className="sc-sub">{orderNo}</span> : null}
        <span className="sc-pill" style={{ marginLeft: 'auto', borderColor: statusColor, color: statusColor }}>
          {status}
        </span>
      </div>
      <div className="sc-bd">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>Promised date</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{promiseDate || '—'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>Confidence</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--aui-primary)' }}>{confidence}%</div>
          </div>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb, var(--aui-border) 80%, transparent)', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ width: `${confidence}%`, height: '100%', background: 'var(--aui-primary)' }} />
        </div>
        {milestones.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: blockers.length ? 12 : 0 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>
                  <span style={{ color: m.done ? 'var(--aui-success)' : 'var(--aui-muted)', marginRight: 6 }}>{m.done ? '✓' : '○'}</span>
                  {str(m.label)}
                </span>
                <span style={{ color: 'var(--aui-muted)' }}>{str(m.date)}</span>
              </div>
            ))}
          </div>
        ) : null}
        {blockers.length ? (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--aui-danger)', marginBottom: 4 }}>Blockers</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.5 }}>
              {blockers.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
