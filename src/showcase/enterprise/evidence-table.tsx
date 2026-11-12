import type { Primitive } from '@/protocol/types'

const str = (v: unknown) => (v == null ? '' : String(v))

/** Showcase: simple evidence detail table. */
export const evidenceTableAtom: Primitive = (props) => {
  const title = str(props.title) || 'Evidence details'
  const columns = (Array.isArray(props.columns) ? props.columns : []) as string[]
  const rows = (Array.isArray(props.rows) ? props.rows : []) as unknown[][]

  return (
    <div
      style={{
        background: 'var(--aui-card)',
        border: '1px solid var(--aui-border)',
        borderRadius: 'var(--aui-radius)',
        padding: 'var(--aui-pad)',
      }}
    >
      <div style={{ fontWeight: 650, fontSize: 14, marginBottom: 10 }}>
        {title}
        <span style={{ marginLeft: 8, fontWeight: 400, fontSize: 12, color: 'var(--aui-muted)' }}>{rows.length} rows</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          {columns.length ? (
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    key={c}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderBottom: '1px solid var(--aui-border)',
                      color: 'var(--aui-muted)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {(Array.isArray(row) ? row : []).map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: '10px 14px',
                      borderBottom: i < rows.length - 1 ? '1px solid var(--aui-border)' : undefined,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {str(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
