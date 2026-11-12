import { useMemo, useState, type CSSProperties } from 'react'
import { Markdown } from '@/react/Markdown'
import { renderUi } from '@/react/render'
import { DEFAULT_LIVE_MARKDOWN, GALLERY, toAgentUiYamlFence, type GalleryItem } from './gallery-data'
import { ThemePanel } from './ThemePanel'

type Tab = 'live' | 'gallery'
type GalleryGroup = 'atoms' | 'showcase'

const GROUP_LABEL: Record<GalleryGroup, string> = {
  atoms: 'Atoms',
  showcase: 'Showcase',
}

export function Playground() {
  const [tab, setTab] = useState<Tab>('gallery')
  const [source, setSource] = useState(DEFAULT_LIVE_MARKDOWN)
  const [streamSettled, setStreamSettled] = useState(true)
  const [group, setGroup] = useState<GalleryGroup>('atoms')
  const [copied, setCopied] = useState<string | null>(null)
  const [lastSampleName, setLastSampleName] = useState<string | null>(null)

  const items = useMemo(() => GALLERY.filter((g) => g.group === group), [group])

  const applyItem = (item: GalleryItem) => {
    const fence = toAgentUiYamlFence(item.spec)
    setSource(`# ${item.title}\n\n${item.desc}\n\n${fence}\n`)
    setLastSampleName(item.name)
    setTab('live')
  }

  const randomSample = () => {
    if (GALLERY.length === 0) return
    if (GALLERY.length === 1) {
      applyItem(GALLERY[0])
      return
    }
    let pick = GALLERY[Math.floor(Math.random() * GALLERY.length)]!
    // Avoid no-op: never repeat the currently shown sample.
    let guard = 0
    while (pick.name === lastSampleName && guard++ < 12) {
      pick = GALLERY[Math.floor(Math.random() * GALLERY.length)]!
    }
    if (pick.name === lastSampleName) {
      const alt = GALLERY.find((g) => g.name !== lastSampleName)
      if (alt) pick = alt
    }
    applyItem(pick)
  }

  const copyItem = async (item: GalleryItem) => {
    const fence = toAgentUiYamlFence(item.spec)
    await navigator.clipboard?.writeText(fence)
    setCopied(item.name)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div style={{ maxWidth: 1680, margin: '0 auto', padding: '20px 20px 48px' }}>
      <header
        style={{
          marginBottom: 18,
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em', flex: '0 0 auto' }}>Agent Auto UI</h1>
        <span style={{ color: 'var(--aui-border)', fontSize: 18, lineHeight: 1, userSelect: 'none' }} aria-hidden>
          |
        </span>
        <p style={{ margin: 0, color: 'var(--aui-muted)', fontSize: 14, lineHeight: 1.5, flex: '1 1 240px', minWidth: 0 }}>
          Compose atomic UI from Markdown <code>```agent-ui</code> fences (YAML). Showcase cards demonstrate real business usage.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {([
          ['gallery', 'Gallery'],
          ['live', 'Playground'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            style={{
              border: '1px solid var(--aui-border)',
              borderRadius: 999,
              padding: '6px 14px',
              background: tab === id ? 'var(--aui-primary)' : 'var(--aui-card)',
              color: tab === id ? '#fff' : 'var(--aui-foreground)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 240px',
          gap: 14,
          alignItems: 'start',
        }}
      >
        <main>
          {tab === 'live' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                gap: 12,
                minHeight: 520,
              }}
            >
              <div style={paneStyle}>
                <div style={paneBar}>
                  <span>Markdown source</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button type="button" style={smallBtn} onClick={randomSample} title="Load a random atom or Showcase sample">
                      Random
                    </button>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--aui-muted)' }}>
                      <input
                        type="checkbox"
                        checked={streamSettled}
                        onChange={(e) => setStreamSettled(e.target.checked)}
                      />
                      streamSettled
                    </label>
                  </div>
                </div>
                <textarea
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  spellCheck={false}
                  style={{
                    flex: 1,
                    width: '100%',
                    border: 0,
                    resize: 'none',
                    padding: 12,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    background: 'transparent',
                    color: 'var(--aui-foreground)',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={paneStyle}>
                <div style={paneBar}>
                  <span>Preview</span>
                </div>
                <div style={{ padding: 14, overflow: 'auto' }}>
                  <Markdown streamSettled={streamSettled}>{source}</Markdown>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {(['atoms', 'showcase'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    style={{
                      border: '1px solid var(--aui-border)',
                      borderRadius: 8,
                      padding: '4px 10px',
                      background:
                        group === g ? 'color-mix(in srgb, var(--aui-primary) 14%, var(--aui-card))' : 'var(--aui-card)',
                      color: 'var(--aui-foreground)',
                      cursor: 'pointer',
                      fontSize: 12,
                    }}
                  >
                    {GROUP_LABEL[g]}
                  </button>
                ))}
              </div>
              {/* CSS column masonry: uneven heights without forced row alignment */}
              <div className="aui-masonry">
                {items.map((item) => (
                  <section key={item.name} className="aui-masonry-item" style={{ ...paneStyle, padding: 14, display: 'inline-block', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong style={{ fontSize: 14 }}>{item.title}</strong>
                          <code style={{ fontSize: 11, color: 'var(--aui-muted)' }}>{item.name}</code>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginTop: 2 }}>{item.desc}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button type="button" style={smallBtn} onClick={() => applyItem(item)}>
                          Playground
                        </button>
                        <button type="button" style={smallBtn} onClick={() => copyItem(item)}>
                          {copied === item.name ? 'Copied' : 'Copy YAML'}
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        border: '1px dashed var(--aui-border)',
                        borderRadius: 'var(--aui-radius-sm)',
                        padding: 12,
                        background: 'color-mix(in srgb, var(--aui-card) 88%, var(--aui-primary))',
                      }}
                    >
                      {renderUi(item.spec)}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}
        </main>

        <aside style={{ position: 'sticky', top: 12 }}>
          <ThemePanel />
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--aui-muted)', lineHeight: 1.5 }}>
            Change Primary / Radius / Padding — atoms and Showcase follow CSS variables.
          </div>
        </aside>
      </div>
    </div>
  )
}

const paneStyle: CSSProperties = {
  border: '1px solid var(--aui-border)',
  borderRadius: 'var(--aui-radius)',
  background: 'var(--aui-card)',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  overflow: 'hidden',
}

const paneBar: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderBottom: '1px solid var(--aui-border)',
  fontSize: 12,
  color: 'var(--aui-muted)',
}

const smallBtn: CSSProperties = {
  border: '1px solid var(--aui-border)',
  borderRadius: 8,
  padding: '4px 8px',
  background: 'transparent',
  color: 'var(--aui-foreground)',
  cursor: 'pointer',
  fontSize: 12,
}
