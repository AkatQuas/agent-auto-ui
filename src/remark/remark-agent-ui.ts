import type { Code, Parent, Root } from 'mdast'
import type { Handler } from 'mdast-util-to-hast'
import { visit } from 'unist-util-visit'
import {
  diagnoseUiFence,
  fenceBodyForExtract,
  parseUiBody,
} from '@/protocol/parse'
import type { AgentUiAstNode, AgentUiStatus } from '@/protocol/types'

/** Fence languages that map to Agent UI. */
export const UI_FENCE_LANGS = new Set(['agent-ui', 'agentui'])

export interface RemarkAgentUiOptions {
  /** Round finished: partial / bad body no longer shows loading. */
  streamSettled?: boolean
}

declare module 'mdast' {
  interface RootContentMap {
    agentUi: AgentUiAstNode
  }
}

function makeNode(
  status: AgentUiStatus,
  extra: Partial<Omit<AgentUiAstNode, 'type' | 'status'>> = {},
): AgentUiAstNode {
  return { type: 'agentUi', status, ...extra }
}

function resolveFenceCode(
  value: string,
  lang: string,
  opts: RemarkAgentUiOptions,
): AgentUiAstNode | null {
  const normalizedLang = (lang || '').toLowerCase()
  if (!UI_FENCE_LANGS.has(normalizedLang)) return null

  const body = fenceBodyForExtract(value)
  const streamSettled = opts.streamSettled ?? false
  const parsed = parseUiBody(body)

  if (parsed) return makeNode('ui', { spec: parsed })

  if (!streamSettled) return makeNode('loading')

  const { detail, raw } = diagnoseUiFence(value)
  return makeNode('error', { detail, raw })
}

/** Normalize accidental XML-style tags into fences before markdown parse. */
export function normalizeAgentUiTags(src: string): string {
  return src
    .replace(
      /<agent-ui>\s*([\s\S]*?)\s*<\/agent-ui>/gi,
      (_m, body) => '\n```agent-ui\n' + String(body).trim() + '\n```\n',
    )
    .replace(/<agent-ui>\s*([\s\S]*)$/i, (_m, body) => '\n```agent-ui\n' + String(body))
}

/** remark plugin: turn ```agent-ui fences into agentUi AST nodes. */
export function remarkAgentUi(opts: RemarkAgentUiOptions = {}) {
  return function transformer(tree: Root) {
    visit(tree, 'code', (node: Code, index, parent: Parent | undefined) => {
      if (index == null || !parent) return
      const card = resolveFenceCode(node.value, node.lang ?? '', opts)
      if (!card) return
      parent.children[index] = card as unknown as Code
    })
  }
}

/** mdast → hast: map agentUi to custom element for react-markdown components. */
export const remarkAgentUiRehypeHandlers: Record<string, Handler> = {
  agentUi: (_state, node) => {
    const n = node as AgentUiAstNode
    return {
      type: 'element',
      tagName: 'agent-ui-slot',
      properties: {
        dataStatus: n.status,
        dataSpec: n.spec != null ? JSON.stringify(n.spec) : undefined,
        dataDetail: n.detail,
        dataRaw: n.raw,
      },
      children: [],
    }
  },
}

export function toAgentUiFence(spec: unknown): string {
  // Gallery copies YAML via a separate helper; this JSON form is for debugging only.
  return '```agent-ui\n' + JSON.stringify(spec, null, 2) + '\n```'
}
