import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

interface Place {
  code?: string
  city?: string
}
interface Airline {
  code?: string
  name?: string
}

const asPlace = (v: unknown): Place => (v && typeof v === 'object' ? (v as Place) : {})
const asAirline = (v: unknown): Airline => (v && typeof v === 'object' ? (v as Airline) : {})

/** Showcase: boarding-pass style flight card (read-only demo). */
export const flightTicketAtom: Primitive = (props) => {
  const from = asPlace(props.from)
  const to = asPlace(props.to)
  const airline = asAirline(props.airline)
  const cabin = str(props.cabin || props.class || '—')
  const fields = [
    { label: 'Date', value: str(props.date) || '—' },
    { label: 'Gate', value: str(props.gate) || '—' },
    { label: 'Flight', value: str(props.flightNo) || '—' },
    { label: 'Boarding', value: str(props.boardingTime) || '—' },
    { label: 'Seat', value: str(props.seat) || '—' },
    { label: 'Cabin', value: cabin },
  ]

  return (
    <div style={{ maxWidth: 480 }}>
      <div
        style={{
          background: 'var(--aui-card)',
          border: '1px solid var(--aui-border)',
          borderRadius: 'var(--aui-radius)',
          color: 'var(--aui-foreground)',
          overflow: 'hidden',
          boxShadow: '0 6px 16px color-mix(in srgb, var(--aui-foreground) 8%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '18px 22px',
            borderBottom: '1px dashed var(--aui-border)',
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.5 }}>{str(from.code) || '—'}</div>
            <div style={{ marginTop: 6, fontSize: 12, color: 'var(--aui-muted)' }}>{str(from.city)}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--aui-muted)' }}>
            <span style={{ flex: 1, borderTop: '1px dashed var(--aui-border)' }} />
            <span style={{ fontSize: 18 }}>✈</span>
            <span style={{ flex: 1, borderTop: '1px dashed var(--aui-border)' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.5 }}>{str(to.code) || '—'}</div>
            <div style={{ marginTop: 6, fontSize: 12, color: 'var(--aui-muted)' }}>{str(to.city)}</div>
          </div>
        </div>
        <div style={{ padding: '16px 22px 18px' }}>
          <div style={{ fontSize: 12, color: 'var(--aui-muted)', marginBottom: 12 }}>
            {str(airline.name) || str(airline.code) || 'Airline'}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            {fields.map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: 11, color: 'var(--aui-muted)' }}>{f.label}</div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
