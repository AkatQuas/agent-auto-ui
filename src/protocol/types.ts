import type { ReactNode } from 'react'

/** Declarative UI node: model composes atoms via component + props + children. */
export interface UiNode {
  component: string
  props?: Record<string, unknown>
  children?: UiNode[]
}

export type Primitive = (props: Record<string, unknown> & { children?: ReactNode }) => ReactNode

export type AgentUiStatus = 'ui' | 'loading' | 'error'

export interface AgentUiAstNode {
  type: 'agentUi'
  status: AgentUiStatus
  spec?: UiNode
  detail?: string
  raw?: string
}
