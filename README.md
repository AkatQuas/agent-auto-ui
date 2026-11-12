# Agent Auto UI

[![Deploy GitHub Pages](https://github.com/AkatQuas/agent-auto-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/AkatQuas/agent-auto-ui/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**Live demo:** https://akatquas.github.io/agent-auto-ui/

Let an agent compose **atomic UI components** inside Markdown via an `agent-ui` fence (YAML by default), producing themed rich output—not just plain text.

````md
Hello —

```agent-ui
component: card
props:
  title: Weekly overview
children:
  - component: stat
    props: { label: Revenue, value: "128", unit: k, size: lg }
  - component: callout
    props: { tone: info, text: Fence body is YAML for stabler model output. }
```
````

## Why

Models are good at structure, bad at inventing safe UI. Agent Auto UI keeps a **whitelist registry**: the model only picks `component` names and props; the host renders them. Business Showcase cards show how the same protocol looks in real domains (travel, finance, ops, …).

## Try it

1. Open the **Gallery** — browse atoms & Showcase (this is the default view).
2. Click **Playground** on a card — or switch to the Playground tab to edit Markdown live.
3. Tweak **Theme** (primary / radius / padding / light-dark); everything follows CSS variables.

### Local

```bash
npm install
npm run dev      # http://localhost:5177
npm run build
npm run preview
```

## Protocol

See [PROTOCOL.md](./PROTOCOL.md).

- Fence language: `agent-ui` (alias `agentui`)
- Body: **YAML** first (JSON accepted only when the body starts with `{`)
- Node shape: `{ component, props?, children? }` only

## Layout

```
src/
  protocol/     # parse fence body → UiNode
  remark/       # remarkAgentUi + rehype → <agent-ui-slot>
  react/        # AgentUiSlot, Markdown, renderUi
  theme/        # CSS variables + ThemeProvider
  atoms/        # generic + chart + rich primitives
  showcase/     # business demo cards
  playground/   # Gallery + Live + Theme panel
```

## GitHub Pages

Pushes to `main` build the Vite app and deploy with [GitHub Actions](.github/workflows/pages.yml) to the repository Pages site (`/agent-auto-ui/` base path).

## License

MIT
