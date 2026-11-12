import type { ReactNode } from 'react'
import { REGISTRY } from '@/atoms/registry'
import type { UiNode } from '@/protocol/types'

function pretty(node: unknown): string {
  try {
    return JSON.stringify(node, null, 2)
  } catch {
    return String(node)
  }
}

export function UiCardLoading() {
  return (
    <div
      style={{
        border: '1px dashed var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
        color: 'var(--aui-muted)',
        fontSize: 13,
      }}
    >
      Loading card…
    </div>
  )
}

export function UiCardError({ detail, raw }: { detail?: string; raw?: string }) {
  return (
    <div
      style={{
        border: '1px solid color-mix(in srgb, var(--aui-danger) 40%, var(--aui-border))',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
        background: 'color-mix(in srgb, var(--aui-danger) 8%, var(--aui-card))',
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 650, color: 'var(--aui-danger)', marginBottom: 4 }}>Unable to display this card</div>
      {detail ? <div style={{ color: 'var(--aui-muted)' }}>{detail}</div> : null}
      {raw ? (
        <pre
          style={{
            marginTop: 8,
            fontSize: 11,
            overflow: 'auto',
            maxHeight: 120,
            color: 'var(--aui-muted)',
          }}
        >
          {raw}
        </pre>
      ) : null}
    </div>
  )
}

/** Recursively render a UiNode against the atom / showcase registry. */
export function renderUi(node: unknown, key?: number): ReactNode {
  if (!node || typeof node !== 'object') return null
  const n = node as UiNode
  if (typeof n.component !== 'string' || !n.component.trim()) return null

  const Comp = REGISTRY[n.component]
  if (!Comp) {
    return <UiCardError key={key} detail={`Unknown/unregistered component: ${n.component}`} raw={pretty(n)} />
  }

  const children = Array.isArray(n.children) ? n.children.map((c, i) => renderUi(c, i)) : undefined
  return (
    <Comp key={key} {...(n.props || {})}>
      {children}
    </Comp>
  )
}
