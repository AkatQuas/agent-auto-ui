# Agent Auto UI Protocol

Agents embed an `agent-ui` fence in Markdown replies and declare a component tree in **YAML**. The frontend parses the fence with a remark plugin and renders whitelist components.

## Fence

Language tag: `agent-ui` (alias `agentui`).

````md
Normal prose…

```agent-ui
component: card
props:
  title: Weekly overview
children:
  - component: stat
    props: { label: Revenue, value: "128", unit: k }
```

More prose…
````

Accidental `<agent-ui>…</agent-ui>` tags are normalized into fences before parse.

## Node shape

Only three keys are allowed on each node:

```yaml
component: string   # required — registered component name
props: object       # optional
children:           # optional — UiNode array
  - component: …
```

No other keys. This avoids mistaking business rows that happen to contain a `component` field for UI specs.

## Parsing

1. Prefer **YAML** for the fence body.
2. If the body starts with `{`, try JSON first, then YAML (migration convenience; docs/examples stay YAML).
3. While streaming and parse fails → `loading`.
4. After `streamSettled`, still failing → `error` placeholder.

## Rendering pipeline

```
Markdown
  → normalizeAgentUiTags
  → remark-gfm + remarkAgentUi
  → rehype handler → <agent-ui-slot>
  → AgentUiSlot → renderUi(REGISTRY)
```

## Theme

CSS variables on the render root (editable in the playground):

| Variable | Meaning |
|---|---|
| `--aui-primary` | Brand / accent |
| `--aui-foreground` | Body text |
| `--aui-muted` | Secondary text |
| `--aui-card` | Card surface |
| `--aui-border` | Border |
| `--aui-danger` / `--aui-success` | Semantic colors |
| `--aui-radius` / `--aui-radius-sm` | Corner radius |
| `--aui-pad` / `--aui-gap` | Padding / gap |

Components should consume these variables only.

## Builtin atoms

**Generic:** `card` `text` `stat` `kv` `row` `grid` `divider` `badge` `list` `table` `progress` `image` `callout` `steps` `faq` `icon` `chart`

**Rich:** `weather` `flight` `timeline` `hero` `feature-cards` `stat-cards` `quote` `glare-card` `wobble-card` `spotlight-card` `profile-card` `article` `article-list` `team` `pricing` `code-block` `terminal` `image-carousel` `image-grid` `notch` `stateful-button` `world-map` `highlight-text` `gradient-text` `flip-words` `typewriter`

`steps` / `faq` are content blocks **without** their own card chrome. Wrap them in `card` when a frame is needed.

## Showcase components

| Name | Domain |
|---|---|
| `biz-flight-ticket` | travel |
| `biz-stock-candidates` | finance |
| `biz-strategy-summary` | finance |
| `biz-app-recommend` | market |
| `biz-briefing` | enterprise |
| `biz-ref-chips` | enterprise |
| `biz-confirm-action` | enterprise |
| `biz-confirm-queue` | enterprise |
| `biz-transition` | enterprise |
| `biz-doc-detail` | enterprise |
| `biz-create-confirm` | enterprise |
| `biz-batch-create` | enterprise |
| `biz-edit-confirm` | enterprise |
| `biz-form-draft` | enterprise |
| `biz-metric-tiles` | enterprise |
| `biz-evidence-table` | enterprise |
| `biz-shortage` | enterprise |
| `biz-plan-review` | enterprise |
| `biz-bill-table` | enterprise |
| `biz-group-chart` | enterprise |
| `biz-ask` | enterprise |
| `biz-flow-run` | enterprise |
| `biz-notify-rule` | enterprise |
| `biz-notify-debug` | enterprise |
| `biz-analysis-asset` | enterprise |
| `biz-action-confirm` | enterprise |
| `biz-approval-queue` | enterprise |
| `biz-worklist` | ops |
| `biz-flow-status` | ops |
| `biz-capacity-board` | ops (new) |
| `biz-delivery-promise` | ops (new) |
