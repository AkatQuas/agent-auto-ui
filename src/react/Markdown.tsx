import { useMemo } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  normalizeAgentUiTags,
  remarkAgentUi,
  remarkAgentUiRehypeHandlers,
} from '@/remark/remark-agent-ui'
import { AgentUiSlot } from './AgentUiSlot'

export function Markdown({
  children,
  streamSettled = true,
  className,
}: {
  children: string
  streamSettled?: boolean
  className?: string
}) {
  const remarkPlugins = useMemo(() => [remarkGfm, [remarkAgentUi, { streamSettled }] as const], [streamSettled])
  const components = useMemo(
    () =>
      ({
        'agent-ui-slot': AgentUiSlot,
      }) as unknown as Components,
    [],
  )
  const source = normalizeAgentUiTags(children ?? '')

  return (
    <div className={className} style={{ lineHeight: 1.65, fontSize: 14 }}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins as never}
        remarkRehypeOptions={{ handlers: remarkAgentUiRehypeHandlers }}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
