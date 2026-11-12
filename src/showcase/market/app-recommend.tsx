import { useState } from 'react'
import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

interface AppItem {
  id?: number | string
  title?: string
  cover_url?: string
  min_price?: number
  like_count?: number
}

function formatPrice(p: number | undefined): string {
  const n = Number(p ?? 0)
  return n === 0 ? 'Free' : `¥${n.toFixed(2)}`
}

function formatLike(n: number | undefined): string {
  const x = Number(n ?? 0)
  if (x >= 10000) return `${(x / 10000).toFixed(1)}w`
  return String(x)
}

/** Showcase: app recommendation list. */
export const appRecommendAtom: Primitive = (props) => {
  const title = str(props.title) || 'App picks'
  const items = (Array.isArray(props.items) ? props.items : []) as AppItem[]
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set())

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
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--aui-muted)' }}>{items.length} apps</span>
      </div>
      {items.length === 0 ? (
        <div style={{ fontSize: 13, color: 'var(--aui-muted)', textAlign: 'center', padding: 20 }}>No recommendations</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => {
            const cover = str(it.cover_url)
            const showImg = cover && !imgErrors.has(i)
            const free = Number(it.min_price ?? 0) === 0
            return (
              <button
                key={i}
                type="button"
                onClick={() => console.info('[showcase] open-app', { id: it.id, title: it.title })}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  padding: 12,
                  border: '1px solid var(--aui-border)',
                  borderRadius: 'var(--aui-radius)',
                  background: 'color-mix(in srgb, var(--aui-primary) 4%, var(--aui-card))',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'inherit',
                }}
              >
                {showImg ? (
                  <img
                    src={cover}
                    alt=""
                    onError={() => setImgErrors((prev) => new Set(prev).add(i))}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      objectFit: 'cover',
                      border: '1px solid var(--aui-border)',
                      flex: '0 0 auto',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      flex: '0 0 auto',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#fff',
                      background: 'var(--aui-primary)',
                      border: '1px solid var(--aui-border)',
                    }}
                  >
                    {(it.title || '?').slice(0, 1)}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {it.title || '—'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: free ? 'var(--aui-success)' : 'var(--aui-primary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {formatPrice(it.min_price)}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--aui-muted)', fontVariantNumeric: 'tabular-nums' }}>
                      ♥ {formatLike(it.like_count)}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
