import { parse as parseYaml } from 'yaml'
import type { UiNode } from './types'

/** Only these keys are allowed on a UI node (avoids mistaking business rows for specs). */
function isSpecShaped(value: unknown): value is UiNode {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const obj = value as Record<string, unknown>
  if (typeof obj.component !== 'string' || obj.component.trim() === '') return false
  return Object.keys(obj).every((k) => k === 'component' || k === 'props' || k === 'children')
}

function normalizeChildren(children: unknown): UiNode[] | undefined {
  if (!Array.isArray(children)) return undefined
  const out: UiNode[] = []
  for (const c of children) {
    const n = pickUi(c)
    if (n) out.push(n)
  }
  return out.length ? out : undefined
}

function pickUi(value: unknown): UiNode | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const obj = value as Record<string, unknown>
  if (isSpecShaped(obj.ui)) return normalizeNode(obj.ui)
  if (isSpecShaped(obj)) return normalizeNode(obj)
  return null
}

function normalizeNode(node: UiNode): UiNode {
  const children = normalizeChildren(node.children)
  return {
    component: node.component.trim(),
    ...(node.props && typeof node.props === 'object' && !Array.isArray(node.props)
      ? { props: node.props as Record<string, unknown> }
      : {}),
    ...(children ? { children } : {}),
  }
}

function tryJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function tryYaml(text: string): unknown {
  try {
    return parseYaml(text)
  } catch {
    return null
  }
}

/**
 * Parse fence body into a UiNode.
 * Prefer YAML; if the body looks like JSON (`{`), try JSON first then YAML.
 */
export function parseUiBody(body: string): UiNode | null {
  const text = body.trim()
  if (!text) return null

  const candidates: unknown[] = []
  if (text.startsWith('{')) {
    candidates.push(tryJson(text), tryYaml(text))
  } else {
    candidates.push(tryYaml(text), tryJson(text))
  }

  for (const cand of candidates) {
    const ui = pickUi(cand)
    if (ui) return ui
  }
  return null
}

/** Strip duplicate opening fence lines that can appear in streaming snapshots. */
export function fenceBodyForExtract(body: string): string {
  return body.replace(/^(?:\s*\n)*(?:```(?:agent-ui|agentui)[^\n]*\n)+/, '')
}

export function diagnoseUiFence(body: string): { detail: string; raw: string } {
  const raw = fenceBodyForExtract(body).trim()
  if (!raw) return { detail: 'Empty fence body', raw }
  try {
    const obj = raw.startsWith('{') ? JSON.parse(raw) : parseYaml(raw)
    if (!obj || typeof obj !== 'object') return { detail: 'Parsed value is not an object', raw }
    if (typeof (obj as { component?: unknown }).component !== 'string') {
      return { detail: 'Missing component field (not a UI node)', raw }
    }
    if (!isSpecShaped(obj) && !isSpecShaped((obj as { ui?: unknown }).ui)) {
      return { detail: 'Invalid node shape (only component / props / children allowed)', raw }
    }
    return { detail: `Parsed but unregistered component: ${(obj as UiNode).component}`, raw }
  } catch (e) {
    return { detail: `Parse failed: ${(e as Error).message}`, raw }
  }
}
