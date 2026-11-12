import { useState, type ReactNode } from 'react'
import type { Primitive } from '@/protocol/types'
import { cardShell, str } from '../ui'

function Card({ title, sub, children }: { title?: string; sub?: string; children: ReactNode }) {
  return (
    <div className="sc-card">
      <style>{cardShell}</style>
      {(title || sub) && (
        <div className="sc-hd">
          {title ? <b>{title}</b> : null}
          {sub ? <span className="sc-sub">{sub}</span> : null}
        </div>
      )}
      <div className="sc-bd">{children}</div>
    </div>
  )
}

export const briefingAtom: Primitive = (props) => {
  const metrics = (Array.isArray(props.metrics) ? props.metrics : []) as { label?: string; value?: unknown; unit?: string; hint?: string }[]
  const items = (Array.isArray(props.items) ? props.items : []) as { severity?: string; title?: string; detail?: string; code?: string }[]
  const caveats = (Array.isArray(props.caveats) ? props.caveats : []).map(str).filter(Boolean)
  return (
    <Card title={str(props.title) || "Today's focus"} sub={str(props.asOf)}>
      {str(props.headline) ? <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 10 }}>{str(props.headline)}</div> : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 8, marginBottom: 12 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: 'color-mix(in srgb, var(--aui-muted) 10%, var(--aui-card))', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>{str(m.label)}</div>
            <div style={{ fontSize: 20, fontWeight: 650 }}>
              {str(m.value)}
              {m.unit ? <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--aui-muted)', marginLeft: 2 }}>{str(m.unit)}</span> : null}
            </div>
            {m.hint ? <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 2 }}>{str(m.hint)}</div> : null}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => {
          const sev = String(it.severity || 'low').toLowerCase()
          const cls = sev === 'high' ? 'sc-sev-high' : sev === 'medium' ? 'sc-sev-medium' : 'sc-sev-low'
          return (
            <div key={i} style={{ display: 'flex', gap: 8, border: '1px solid var(--aui-border)', borderRadius: 10, padding: '8px 10px' }}>
              <span className={`sc-pill ${cls}`} style={{ border: 0, height: 18, lineHeight: '18px' }}>
                {sev === 'high' ? 'High' : sev === 'medium' ? 'Medium' : 'Low'}
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 500 }}>{str(it.title)}</div>
                {it.detail || it.code ? <div style={{ fontSize: 13, color: 'var(--aui-muted)', marginTop: 2 }}>{str(it.detail || it.code)}</div> : null}
              </div>
            </div>
          )
        })}
      </div>
      {caveats.length ? (
        <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 12, color: 'var(--aui-muted)' }}>
          {caveats.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      ) : null}
    </Card>
  )
}

export const refChipsAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : []) as { label?: string; code?: string }[]
  return (
    <Card title={str(props.title) || 'Related documents'}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            className="sc-btn"
            onClick={() => console.info('[showcase] open-ref', it)}
            style={{ borderRadius: 999 }}
          >
            {str(it.label || it.code || '—')}
          </button>
        ))}
      </div>
    </Card>
  )
}

export const confirmActionAtom: Primitive = (props) => (
  <Card title={str(props.title) || 'Action pending confirmation'} sub={str(props.stagedId)}>
    <div style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 12 }}>{str(props.summary)}</div>
    <div style={{ display: 'flex', gap: 8 }}>
      <button type="button" className="sc-btn primary" onClick={() => console.info('[showcase] confirm', props.stagedId)}>
        Confirm
      </button>
      <button type="button" className="sc-btn" onClick={() => console.info('[showcase] reject', props.stagedId)}>
        Reject
      </button>
    </div>
  </Card>
)

export const confirmQueueAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : [
    { title: 'Purchase order · Review', summary: 'Vendor East China Metals, order total 580.13' },
    { title: 'Material request · Approve', summary: 'Central warehouse: 3 items to pick' },
  ]) as { title?: string; summary?: string }[]
  return (
    <Card title={str(props.title) || 'Confirmation queue'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ border: '1px solid var(--aui-border)', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{str(it.title)}</div>
            <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 4 }}>{str(it.summary)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export const transitionAtom: Primitive = (props) => {
  const fields = (Array.isArray(props.fields) ? props.fields : []) as { label?: string; value?: unknown }[]
  const params = (Array.isArray(props.params) ? props.params : []) as { label?: string; required?: boolean }[]
  return (
    <Card title={str(props.title) || str(props.action) || 'Status transition'} sub={str(props.code)}>
      <div style={{ fontSize: 13, marginBottom: 10 }}>
        <span className="sc-pill">{str(props.from) || '—'}</span>
        <span style={{ margin: '0 8px', color: 'var(--aui-muted)' }}>→</span>
        <span className="sc-pill">{str(props.to) || '—'}</span>
      </div>
      {fields.map((f, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
          <span style={{ color: 'var(--aui-muted)' }}>{str(f.label)}</span>
          <span>{str(f.value)}</span>
        </div>
      ))}
      {params.length ? (
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--aui-muted)' }}>
          Required: {params.map((p) => `${str(p.label)}${p.required ? '*' : ''}`).join(', ')}
        </div>
      ) : null}
      <div style={{ marginTop: 12 }}>
        <button type="button" className="sc-btn primary" onClick={() => console.info('[showcase] run-transition', props)}>
          {str(props.action) || 'Run'}
        </button>
      </div>
    </Card>
  )
}

export const docDetailAtom: Primitive = (props) => {
  const fields = (Array.isArray(props.fields) ? props.fields : []) as { label?: string; value?: unknown }[]
  const lines = props.lines && typeof props.lines === 'object' ? (props.lines as { rows?: Record<string, unknown>[] }) : null
  const rows = Array.isArray(lines?.rows) ? lines!.rows! : []
  const cols = rows[0] ? Object.keys(rows[0]) : []
  const transitions = (Array.isArray(props.transitions) ? props.transitions : []) as { action?: string; code?: string }[]
  return (
    <Card title={str(props.title) || 'Document details'} sub={`${str(props.code)} · ${str(props.status)}`}>
      {fields.map((f, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
          <span style={{ color: 'var(--aui-muted)' }}>{str(f.label)}</span>
          <span>{str(f.value)}</span>
        </div>
      ))}
      {cols.length ? (
        <table className="sc-tbl" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c}>{str(r[c])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {transitions.length ? (
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {transitions.map((t, i) => (
            <button key={i} type="button" className="sc-btn primary" onClick={() => console.info('[showcase] transition', t)}>
              {str(t.action || t.code)}
            </button>
          ))}
        </div>
      ) : null}
    </Card>
  )
}

export const createConfirmAtom: Primitive = (props) => {
  const fields = (Array.isArray(props.fields) ? props.fields : []) as { label?: string; value?: unknown }[]
  return (
    <Card title={str(props.title) || 'Create confirmation'}>
      {fields.map((f, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
          <span style={{ color: 'var(--aui-muted)' }}>{str(f.label)}</span>
          <span>{str(f.value)}</span>
        </div>
      ))}
      {str(props.note) ? (
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--aui-danger)', background: 'color-mix(in srgb, var(--aui-danger) 8%, transparent)', padding: '8px 10px', borderRadius: 8 }}>
          {str(props.note)}
        </div>
      ) : null}
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="button" className="sc-btn primary" onClick={() => console.info('[showcase] create', props.header)}>
          Confirm create
        </button>
        <button type="button" className="sc-btn">Cancel</button>
      </div>
    </Card>
  )
}

export const batchCreateAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : []) as { key?: string; title?: string; status?: string }[]
  return (
    <Card title={str(props.title) || 'Batch create'} sub={`${items.length} items`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--aui-border)', borderRadius: 8, padding: '8px 10px', fontSize: 13 }}>
            <span>{str(it.title || it.key)}</span>
            <span className="sc-pill">{str(it.status) || 'Pending create'}</span>
          </div>
        ))}
      </div>
      <button type="button" className="sc-btn primary" style={{ marginTop: 12 }} onClick={() => console.info('[showcase] batch-create', items)}>
        Create all
      </button>
    </Card>
  )
}

export const editConfirmAtom: Primitive = (props) => {
  const patch = (Array.isArray(props.patch) ? props.patch : Array.isArray(props.changes) ? props.changes : []) as { label?: string; from?: unknown; to?: unknown }[]
  return (
    <Card title={str(props.title) || 'Edit confirmation'} sub={str(props.code)}>
      {patch.map((p, i) => (
        <div key={i} style={{ fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--aui-border)' }}>
          <div style={{ color: 'var(--aui-muted)', fontSize: 12 }}>{str(p.label)}</div>
          <div>
            <span style={{ textDecoration: 'line-through', color: 'var(--aui-muted)' }}>{str(p.from)}</span>
            <span style={{ margin: '0 8px' }}>→</span>
            <span style={{ fontWeight: 600 }}>{str(p.to)}</span>
          </div>
        </div>
      ))}
      <button type="button" className="sc-btn primary" style={{ marginTop: 12 }} onClick={() => console.info('[showcase] update', props)}>
        Confirm edit
      </button>
    </Card>
  )
}

export const formDraftAtom: Primitive = (props) => {
  const fields = (Array.isArray(props.fields) ? props.fields : Array.isArray(props.preset) ? Object.keys(props.preset as object).map((k) => ({ label: k, value: (props.preset as Record<string, unknown>)[k] })) : []) as { label?: string; value?: unknown }[]
  return (
    <Card title={str(props.title) || 'Form draft'} sub={str(props.entity || props.module)}>
      {str(props.summary) ? <div style={{ fontSize: 13, marginBottom: 10 }}>{str(props.summary)}</div> : null}
      {fields.map((f, i) => (
        <label key={i} style={{ display: 'block', marginBottom: 8, fontSize: 12, color: 'var(--aui-muted)' }}>
          {str(f.label)}
          <input
            readOnly
            value={str(f.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--aui-border)', background: 'transparent', color: 'var(--aui-foreground)' }}
          />
        </label>
      ))}
      <button type="button" className="sc-btn primary">{str(props.submitLabel) || 'Submit'}</button>
    </Card>
  )
}

export const shortageAtom: Primitive = (props) => {
  const because = (Array.isArray(props.because) ? props.because : []).map(str).filter(Boolean)
  const evidence = (Array.isArray(props.evidence) ? props.evidence : [
    { Material: 'Hex bolt M8', Demand: 200, Stock: 80, Shortfall: 120 },
    { Material: 'Washer Φ8', Demand: 200, Stock: 50, Shortfall: 150 },
  ]) as Record<string, unknown>[]
  const cols = evidence[0] ? Object.keys(evidence[0]) : []
  return (
    <Card title={str(props.title) || 'Kitting analysis'}>
      <div style={{ fontSize: 15, fontWeight: 650, marginBottom: 8 }}>{str(props.verdict)}</div>
      {because.length ? (
        <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 13, color: 'var(--aui-muted)' }}>
          {because.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
      {cols.length ? (
        <>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Line items</span>
            <span className="sc-pill">Sample data</span>
          </div>
          <table className="sc-tbl">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidence.map((r, i) => (
                <tr key={i}>
                  {cols.map((c) => (
                    <td key={c}>{str(r[c])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </Card>
  )
}

export const planReviewAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : [
    { name: 'Hex bolt M8', qty: 120, warehouse: 'Central warehouse' },
    { name: 'Washer Φ8', qty: 150, warehouse: 'Central warehouse' },
  ]) as { name?: string; qty?: unknown; warehouse?: string }[]
  return (
    <Card title={str(props.title) || 'Purchase recommendation'}>
      <div style={{ fontWeight: 650, marginBottom: 10 }}>{str(props.verdict)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--aui-border)', borderRadius: 8, padding: '8px 10px', fontSize: 13 }}>
            <span>{str(it.name)}</span>
            <span style={{ color: 'var(--aui-muted)' }}>
              {str(it.qty)} · {str(it.warehouse)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export const billTableAtom: Primitive = (props) => {
  const rows = (Array.isArray(props.rows) ? props.rows : []) as Record<string, unknown>[]
  const preferred = ['code', 'product', 'qty', 'status', 'planEndDate']
  const cols = rows[0] ? [...preferred.filter((k) => k in rows[0]), ...Object.keys(rows[0]).filter((k) => !preferred.includes(k) && k !== 'module' && k !== 'id')] : []
  const labels: Record<string, string> = { code: 'Doc no.', product: 'Product', qty: 'Qty', status: 'Status', planEndDate: 'Plan finish' }
  return (
    <Card title={str(props.title) || 'Document list'} sub={`${str(props.total ?? rows.length)} total`}>
      <table className="sc-tbl">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{labels[c] || c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ cursor: 'pointer' }} onClick={() => console.info('[showcase] open-bill', r)}>
              {cols.map((c) => (
                <td key={c}>{str(r[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export const groupChartAtom: Primitive = (props) => {
  const rows = (Array.isArray(props.rows) ? props.rows : []) as Record<string, unknown>[]
  const labelKey = str(props.labelKey) || Object.keys(rows[0] || {}).find((k) => k !== 'count') || 'name'
  const valueKey = str(props.valueKey) || 'count'
  const values = rows.map((r) => Number(r[valueKey]) || 0)
  const max = Math.max(1, ...values)
  return (
    <Card title={str(props.title) || 'Grouped stats'} sub={str(props.unit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r, i) => {
          const v = Number(r[valueKey]) || 0
          return (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>{str(r[labelKey])}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb, var(--aui-border) 80%, transparent)' }}>
                <div style={{ width: `${(v / max) * 100}%`, height: '100%', borderRadius: 999, background: 'var(--aui-primary)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export const askAtom: Primitive = (props) => {
  const options = (Array.isArray(props.options) ? props.options : []) as { label?: string; send?: string; hint?: string }[]
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <Card title={str(props.question) || "What's next?"}>
      {str(props.note) ? <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginBottom: 10 }}>{str(props.note)}</div> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((op, i) => (
          <button
            key={i}
            type="button"
            className="sc-btn"
            style={{ textAlign: 'left', background: picked === i ? 'color-mix(in srgb, var(--aui-primary) 12%, transparent)' : undefined }}
            onClick={() => {
              setPicked(i)
              console.info('[showcase] ask', op.send || op.label)
            }}
          >
            <div style={{ fontWeight: 600 }}>{str(op.label)}</div>
            {op.hint ? <div style={{ fontSize: 11, color: 'var(--aui-muted)', marginTop: 2 }}>{str(op.hint)}</div> : null}
          </button>
        ))}
      </div>
    </Card>
  )
}

export const flowRunAtom: Primitive = (props) => {
  const steps = (Array.isArray(props.steps) ? props.steps : []) as { no?: number; label?: string; module?: string; action?: string }[]
  return (
    <Card title={str(props.label) || str(props.code) || 'Workflow'} sub={str(props.purpose)}>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {steps.map((s, i) => (
          <li key={i} style={{ display: 'flex', gap: 10 }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--aui-primary)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flex: '0 0 auto' }}>
              {s.no ?? i + 1}
            </span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{str(s.label)}</div>
              <div style={{ fontSize: 12, color: 'var(--aui-muted)' }}>
                {str(s.module)} · {str(s.action)}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {props.writes ? <div style={{ marginTop: 10, fontSize: 12, color: 'var(--aui-danger)' }}>This workflow writes business data</div> : null}
    </Card>
  )
}

export const notifyRuleAtom: Primitive = (props) => (
  <Card title={str(props.title) || 'Notification rules'} sub={str(props.mode)}>
    <div style={{ fontSize: 13, color: 'var(--aui-muted)', marginBottom: 10 }}>{str(props.note) || 'Describe triggers, recipients, and content.'}</div>
    <div style={{ display: 'grid', gap: 8 }}>
      {['Trigger', 'Recipients', 'Message body'].map((label) => (
        <label key={label} style={{ fontSize: 12, color: 'var(--aui-muted)' }}>
          {label}
          <input
            placeholder="To be filled"
            style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--aui-border)', background: 'transparent', color: 'var(--aui-foreground)' }}
          />
        </label>
      ))}
    </div>
  </Card>
)

export const notifyDebugAtom: Primitive = (props) => {
  const logs = (Array.isArray(props.logs) ? props.logs : [
    { at: '09:01', level: 'info', message: 'Rule matched' },
    { at: '09:01', level: 'warn', message: 'Channel rate-limited; queued' },
  ]) as { at?: string; level?: string; message?: string }[]
  return (
    <Card title={str(props.title) || 'Notification debug'}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {logs.map((l, i) => (
          <div key={i}>
            <span style={{ color: 'var(--aui-muted)' }}>[{str(l.at)}]</span>{' '}
            <span style={{ color: l.level === 'warn' ? '#d97706' : 'var(--aui-primary)' }}>{str(l.level)}</span>{' '}
            {str(l.message)}
          </div>
        ))}
      </div>
    </Card>
  )
}

export const analysisAssetAtom: Primitive = (props) => {
  const progress = props.progress && typeof props.progress === 'object' ? (props.progress as Record<string, unknown>) : {}
  const state = str(props.state) || 'idle'
  const pct = state === 'done' ? 100 : state === 'running' ? 55 : state === 'failed' ? 100 : 10
  return (
    <Card title={str(props.title) || 'Analysis job'} sub={str(props.taskId)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span className="sc-pill">{state}</span>
        <span style={{ color: 'var(--aui-muted)' }}>{str(progress.stage)}</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb, var(--aui-border) 80%, transparent)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: state === 'failed' ? 'var(--aui-danger)' : 'var(--aui-primary)' }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--aui-muted)' }}>
        Rows {str(progress.rows ?? '—')} · Invalid {str(progress.invalidRows ?? 0)}
      </div>
    </Card>
  )
}

export const actionConfirmAtom: Primitive = (props) => {
  const preview = (Array.isArray(props.preview) ? props.preview : []) as Record<string, unknown>[]
  const risk = str(props.risk) || 'medium'
  return (
    <Card title={str(props.title) || 'Action confirmation'} sub={`Risk ${risk}`}>
      <div style={{ fontSize: 13, marginBottom: 10 }}>{str(props.summary)}</div>
      {preview.map((row, i) => {
        const label = str(row.label)
        const value = str(row.value)
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
            <span style={{ color: 'var(--aui-muted)' }}>{label}</span>
            <span>{value}</span>
          </div>
        )
      })}
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="button" className="sc-btn primary" onClick={() => console.info('[showcase] action-confirm', props.actionId)}>
          Confirm and run
        </button>
        <button type="button" className="sc-btn">Cancel</button>
      </div>
    </Card>
  )
}

export const approvalQueueAtom: Primitive = (props) => {
  const items = (Array.isArray(props.items) ? props.items : []) as { title?: string; code?: string; risk?: string; summary?: string; amount?: string }[]
  return (
    <Card title={str(props.title) || 'Drafts pending confirmation'} sub={str(props.note)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ border: '1px solid var(--aui-border)', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <b style={{ fontSize: 13 }}>{str(it.title)}</b>
              <span className="sc-pill">{str(it.risk)}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 4 }}>
              {str(it.code)} {it.amount ? `· ${str(it.amount)}` : ''}
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>{str(it.summary)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
