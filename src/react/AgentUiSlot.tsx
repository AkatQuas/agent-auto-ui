import { renderUi, UiCardError, UiCardLoading } from './render'

type SlotProps = {
  node?: unknown
  'data-status'?: string
  'data-spec'?: string
  'data-detail'?: string
  'data-raw'?: string
}

/** react-markdown custom tag for remarkAgentUi output. */
export function AgentUiSlot(props: SlotProps) {
  const status = props['data-status']
  if (status === 'loading') {
    return (
      <div style={{ margin: '10px 0' }}>
        <UiCardLoading />
      </div>
    )
  }
  if (status === 'error') {
    return (
      <div style={{ margin: '10px 0' }}>
        <UiCardError detail={props['data-detail']} raw={props['data-raw']} />
      </div>
    )
  }
  if (status === 'ui' && props['data-spec']) {
    try {
      const spec = JSON.parse(props['data-spec']) as unknown
      return <div style={{ margin: '10px 0' }}>{renderUi(spec)}</div>
    } catch {
      return (
        <div style={{ margin: '10px 0' }}>
          <UiCardError detail="Failed to parse data-spec JSON" raw={props['data-spec']} />
        </div>
      )
    }
  }
  return null
}
