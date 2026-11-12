/** Shared visual chrome for business showcase cards (theme via CSS vars). */
export const cardShell = `
  .sc-card{background:var(--aui-card);border:1px solid var(--aui-border);border-radius:var(--aui-radius);color:var(--aui-foreground);overflow:hidden}
  .sc-hd{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--aui-border);flex-wrap:wrap}
  .sc-hd b{font-size:14px;font-weight:650}
  .sc-sub{font-size:12px;color:var(--aui-muted)}
  .sc-bd{padding:var(--aui-pad)}
  .sc-muted{color:var(--aui-muted);font-size:13px}
  .sc-btn{border:1px solid var(--aui-border);border-radius:var(--aui-radius-sm);background:transparent;color:var(--aui-foreground);padding:6px 10px;font-size:12px;cursor:pointer}
  .sc-btn.primary{background:var(--aui-primary);border-color:var(--aui-primary);color:#fff}
  .sc-btn:hover{border-color:var(--aui-primary)}
  .sc-tbl{width:100%;border-collapse:collapse;font-size:13px}
  .sc-tbl th,.sc-tbl td{padding:8px 12px;text-align:left;border-bottom:1px solid var(--aui-border)}
  .sc-tbl th{color:var(--aui-muted);font-weight:600}
  .sc-pill{display:inline-block;font-size:11px;padding:1px 7px;border-radius:999px;border:1px solid var(--aui-border);color:var(--aui-muted)}
  .sc-sev-high{background:var(--aui-danger);color:#fff}
  .sc-sev-medium{background:#d97706;color:#fff}
  .sc-sev-low{background:var(--aui-success);color:#fff}
`

export const str = (v: unknown) => (v == null ? '' : String(v))
