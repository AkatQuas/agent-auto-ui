import { useState } from 'react'
import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

interface StockItem {
  code?: string
  name?: string
  price?: number | string
  change?: number
  reason?: string
  tag?: string
}

function fmtPct(n: number) {
  const sign = n > 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

/** Showcase: stock candidate list (emit logged to console). */
export const stockCandidatesAtom: Primitive = (props) => {
  const title = str(props.title) || 'Stock picks'
  const items = (Array.isArray(props.items) ? props.items : []) as StockItem[]
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [added, setAdded] = useState<Set<number>>(new Set())

  return (
    <div
      style={{
        background: 'var(--aui-card)',
        border: '1px solid var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: 'var(--aui-primary)',
            display: 'inline-block',
          }}
        />
        <span style={{ fontWeight: 650, fontSize: 14 }}>{title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--aui-muted)' }}>{items.length} symbols</span>
      </div>
      {items.map((it, i) => {
        const chg = Number(it.change ?? 0)
        const opened = expanded.has(i)
        const chgColor = chg > 0 ? 'var(--aui-danger)' : chg < 0 ? 'var(--aui-success)' : 'var(--aui-muted)'
        return (
          <div key={i} style={{ borderTop: i ? '1px solid var(--aui-border)' : undefined, padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#fff',
                  background: 'var(--aui-primary)',
                  flex: '0 0 auto',
                }}
              >
                {i + 1}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{it.name || '—'}</span>
                  <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--aui-muted)' }}>{it.code}</span>
                </div>
                {it.tag ? (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 3,
                      fontSize: 10,
                      color: 'var(--aui-primary)',
                      border: '1px solid var(--aui-border)',
                      borderRadius: 4,
                      padding: '1px 6px',
                    }}
                  >
                    {it.tag}
                  </span>
                ) : null}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{str(it.price)}</div>
                <div style={{ fontSize: 12, color: chgColor, fontVariantNumeric: 'tabular-nums' }}>{fmtPct(chg)}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  console.info('[showcase] add-watchlist', { code: it.code, name: it.name })
                  setAdded((prev) => new Set(prev).add(i))
                }}
                style={{
                  fontSize: 11,
                  border: '1px solid var(--aui-border)',
                  borderRadius: 'var(--aui-radius-sm)',
                  padding: '4px 8px',
                  background: added.has(i) ? 'color-mix(in srgb, var(--aui-primary) 12%, var(--aui-card))' : 'transparent',
                  color: 'var(--aui-foreground)',
                  cursor: 'pointer',
                }}
              >
                {added.has(i) ? 'Added' : 'Watch'}
              </button>
            </div>
            {it.reason ? (
              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) => {
                    const next = new Set(prev)
                    next.has(i) ? next.delete(i) : next.add(i)
                    return next
                  })
                }
                style={{
                  marginTop: 6,
                  marginLeft: 32,
                  border: 0,
                  background: 'transparent',
                  color: 'var(--aui-muted)',
                  fontSize: 11,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {opened ? 'Hide rationale' : 'View rationale'}
              </button>
            ) : null}
            {opened && it.reason ? (
              <div style={{ marginLeft: 32, marginTop: 4, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.55 }}>
                {it.reason}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
