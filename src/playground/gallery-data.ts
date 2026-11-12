import { stringify } from 'yaml'
import type { UiNode } from '@/protocol/types'

export interface GalleryItem {
  name: string
  title: string
  desc: string
  group: 'atoms' | 'showcase'
  spec: UiNode
}

export function toAgentUiYamlFence(spec: UiNode): string {
  return '```agent-ui\n' + stringify(spec).trimEnd() + '\n```'
}

export const GALLERY: GalleryItem[] = [
  {
    name: 'card+stat',
    title: 'Card + stats',
    desc: 'Atom combo: container wrapping metrics',
    group: 'atoms',
    spec: {
      component: 'card',
      props: { title: 'This week at a glance', description: 'Rich block built from atomic components' },
      children: [
        {
          component: 'row',
          children: [
            { component: 'stat', props: { label: 'Revenue', value: '128', unit: 'k CNY', size: 'lg' } },
            { component: 'stat', props: { label: 'Orders', value: '86', unit: 'orders' } },
            { component: 'badge', props: { label: 'WoW +12%', tone: 'success' } },
          ],
        },
        { component: 'progress', props: { label: 'Goal progress', value: 72 } },
      ],
    },
  },
  {
    name: 'table',
    title: 'Table',
    desc: 'General-purpose data table',
    group: 'atoms',
    spec: {
      component: 'table',
      props: {
        title: 'Inventory snapshot',
        columns: ['SKU', 'Warehouse', 'Qty'],
        rows: [
          ['PEN-01', 'East China DC', 120],
          ['PAPER-A4', 'South China DC', 40],
        ],
      },
    },
  },
  {
    name: 'chart',
    title: 'Bar chart',
    desc: 'Lightweight SVG chart',
    group: 'atoms',
    spec: {
      component: 'chart',
      props: {
        type: 'bar',
        title: 'Revenue — last 5 months',
        unit: 'k CNY',
        data: [
          { label: 'Feb', value: 86 },
          { label: 'Mar', value: 102 },
          { label: 'Apr', value: 95 },
          { label: 'May', value: 118 },
          { label: 'Jun', value: 134 },
        ],
      },
    },
  },
  {
    name: 'steps',
    title: 'Steps',
    desc: 'Content block (no extra card shell to avoid nested frames)',
    group: 'atoms',
    spec: {
      component: 'card',
      props: { title: 'Getting started' },
      children: [
        {
          component: 'steps',
          props: {
            items: [
              { title: 'Write Markdown', desc: 'Insert an agent-ui fence in the reply' },
              { title: 'Compose atoms', desc: 'card / stat / table …' },
              { title: 'Theme tokens', desc: 'Swap skins by updating CSS variables' },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'faq',
    title: 'FAQ',
    desc: 'Expandable Q&A (standalone, not hard-bound to steps)',
    group: 'atoms',
    spec: {
      component: 'card',
      props: { title: 'Common questions' },
      children: [
        {
          component: 'faq',
          props: {
            items: [
              { q: 'Why YAML?', a: 'Fewer quotes than JSON, so models are less likely to break the fence.' },
              { q: 'Can I nest components?', a: 'Yes. Put more component nodes under children.' },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'callout',
    title: 'Callout',
    desc: 'info / warning',
    group: 'atoms',
    spec: {
      component: 'callout',
      props: {
        tone: 'warning',
        title: 'Heads up',
        text: 'The content below is composed by the model from atomic components—verify critical numbers manually.',
      },
    },
  },
  {
    name: 'weather',
    title: 'Weather',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'weather',
      props: {
        location: 'Hangzhou',
        condition: 'Light rain',
        temp: 18,
        unit: 'C',
        high: 21,
        low: 15,
        icon: 'rain',
        forecast: [
          { day: 'Today', icon: 'rain', high: 21, low: 15 },
          { day: 'Wed', icon: 'cloud', high: 23, low: 16 },
          { day: 'Thu', icon: 'sun', high: 27, low: 18 },
        ],
      },
    },
  },
  {
    name: 'flight',
    title: 'Flight list',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'flight',
      props: {
        from: 'Hangzhou',
        to: 'Chengdu',
        date: 'Tomorrow',
        flights: [
          {
            airline: 'Sichuan Airlines',
            code: '3U8884',
            depart: '08:20',
            arrive: '11:20',
            duration: '3h',
            price: 'from ¥300',
            tag: 'Lowest',
          },
          {
            airline: 'China Eastern',
            code: 'MU2409',
            depart: '08:55',
            arrive: '11:45',
            duration: '2h50m',
            price: '¥560',
            tag: 'Fastest',
          },
        ],
      },
    },
  },
  {
    name: 'timeline',
    title: 'Timeline',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'timeline',
      props: {
        title: 'Milestones',
        items: [
          { time: '2021', title: 'Founded', content: 'Core team assembled.' },
          { time: '2023', title: 'Shipped v1', content: 'First public release went live.' },
          { time: '2025', title: 'Scale', content: 'Expanded into more industry scenarios.' },
        ],
      },
    },
  },
  {
    name: 'hero',
    title: 'Hero',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'hero',
      props: {
        title: 'Agent composition',
        highlight: 'Atomic UI',
        subtitle: 'Rich expression driven by Markdown fences',
        effect: 'aurora',
      },
    },
  },
  {
    name: 'feature-cards',
    title: 'Feature cards',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'feature-cards',
      props: {
        title: 'Core capabilities',
        columns: 3,
        items: [
          { icon: 'zap', title: 'Fast generation', desc: 'Structured cards in seconds' },
          { icon: 'shield', title: 'Allowlist render', desc: 'Only registered components render' },
          { icon: 'trend', title: 'Theme tokens', desc: 'One place to change the skin' },
        ],
      },
    },
  },
  {
    name: 'stat-cards',
    title: 'Stat cards',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'stat-cards',
      props: {
        items: [
          { label: 'Total return', value: '52.1', unit: '%', delta: '+8.2%', icon: 'trend' },
          { label: 'Annualized', value: '38.7', unit: '%', delta: '+3.1%', icon: 'gauge' },
          { label: 'Max drawdown', value: '-18.6', unit: '%', delta: '-2.0%', icon: 'shield' },
        ],
      },
    },
  },
  {
    name: 'quote',
    title: 'Quote',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'quote',
      props: { text: 'Turn a complex workflow into something you can explain in one sentence.', author: 'Product', role: 'Design review' },
    },
  },
  {
    name: 'article-list',
    title: 'Article list',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'article-list',
      props: {
        title: 'Related reads',
        items: [
          { title: 'How to write a YAML fence', excerpt: 'The component / props / children shape.', tag: 'Protocol', meta: '3 min' },
          { title: 'Theme variable cheat sheet', excerpt: 'primary / radius / pad to reskin.', tag: 'Theme', meta: '2 min' },
        ],
      },
    },
  },
  {
    name: 'code-block',
    title: 'Code block',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'code-block',
      props: {
        filename: 'mount.ts',
        language: 'ts',
        code: "mount(el, { cardBizId: 'demo' })",
      },
    },
  },
  {
    name: 'terminal',
    title: 'Terminal',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'terminal',
      props: {
        title: 'zsh',
        lines: [{ cmd: 'npm run dev' }, { out: 'Local: http://localhost:5177/' }],
      },
    },
  },
  {
    name: 'pricing',
    title: 'Pricing',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'pricing',
      props: {
        title: 'Plans',
        plans: [
          { name: 'Starter', price: '¥0', period: 'mo', features: ['Core components', 'Local preview'] },
          { name: 'Pro', price: '¥99', period: 'mo', features: ['All atoms', 'Business showcase'], featured: true, cta: 'Upgrade' },
        ],
      },
    },
  },
  {
    name: 'team',
    title: 'Team',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'team',
      props: {
        title: 'Roles',
        members: [
          { name: 'Strategy', role: 'Plan generation' },
          { name: 'Render', role: 'Component assembly' },
          { name: 'Verify', role: 'Result review' },
        ],
      },
    },
  },
  {
    name: 'image-grid',
    title: 'Image grid',
    desc: 'rich atom',
    group: 'atoms',
    spec: {
      component: 'image-grid',
      props: {
        title: 'Scenes',
        columns: 3,
        items: [
          {
            image: 'https://images.pexels.com/photos/21823060/pexels-photo-21823060.jpeg?auto=compress&cs=tinysrgb&w=400',
            title: 'Lakeside',
            subtitle: 'Early morning',
          },
          {
            image: 'https://images.pexels.com/photos/33794219/pexels-photo-33794219.jpeg?auto=compress&cs=tinysrgb&w=400',
            title: 'Forest trail',
            subtitle: 'Afternoon',
          },
          {
            image: 'https://images.pexels.com/photos/30836752/pexels-photo-30836752.jpeg?auto=compress&cs=tinysrgb&w=400',
            title: 'Mountain path',
            subtitle: 'Dusk',
          },
        ],
      },
    },
  },
  {
    name: 'typewriter',
    title: 'Typewriter',
    desc: 'text-effect',
    group: 'atoms',
    spec: { component: 'typewriter', props: { text: 'Agent is composing atomic UI…', speed: 45 } },
  },
  {
    name: 'biz-flight-ticket',
    title: 'Flight boarding pass',
    desc: 'travel',
    group: 'showcase',
    spec: {
      component: 'biz-flight-ticket',
      props: {
        from: { code: 'HGH', city: 'Hangzhou' },
        to: { code: 'CTU', city: 'Chengdu' },
        airline: { code: '3U', name: 'Sichuan Airlines' },
        date: 'Tomorrow',
        gate: 'B12',
        flightNo: '3U8884',
        boardingTime: '07:50',
        seat: '14A',
        cabin: 'Economy',
      },
    },
  },
  {
    name: 'biz-stock-candidates',
    title: 'Stock picks',
    desc: 'finance',
    group: 'showcase',
    spec: {
      component: 'biz-stock-candidates',
      props: {
        title: "Today's watchlist",
        items: [
          {
            code: '300568',
            name: 'SVOLT Energy',
            price: 28.6,
            change: 3.2,
            tag: 'Battery',
            reason: 'Separator shipments are recovering; valuation near historical median.',
          },
          {
            code: '300308',
            name: 'InnoLight',
            price: 142.1,
            change: -1.1,
            tag: 'Optical',
            reason: 'North American hyperscaler capex expectations revised upward.',
          },
        ],
      },
    },
  },
  {
    name: 'biz-strategy-summary',
    title: 'Strategy summary',
    desc: 'finance',
    group: 'showcase',
    spec: {
      component: 'biz-strategy-summary',
      props: {
        title: 'Balanced strategy',
        summary: 'Blend dividend and growth names, cap single-name weight—suited to moderate risk appetite.',
        metrics: [
          { label: 'Expected annualized', value: '12', unit: '%' },
          { label: 'Max drawdown', value: '-8', unit: '%' },
          { label: 'Holdings', value: '8', unit: 'names' },
        ],
        risks: ['Backtests do not guarantee future returns', 'Rebalance when sector concentration gets high'],
      },
    },
  },
  {
    name: 'biz-app-recommend',
    title: 'App recommendations',
    desc: 'market',
    group: 'showcase',
    spec: {
      component: 'biz-app-recommend',
      props: {
        title: 'Recommended for you',
        items: [
          { id: 1, title: 'Mind Map Pro', min_price: 0, like_count: 1280 },
          { id: 2, title: 'Weekly Report Builder', min_price: 9.9, like_count: 560 },
          { id: 3, title: 'PDF to Word', min_price: 19.9, like_count: 13200 },
        ],
      },
    },
  },
  {
    name: 'biz-briefing',
    title: 'Operations briefing',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-briefing',
      props: {
        title: 'Focus for today',
        asOf: '09:00',
        metrics: [
          { label: 'Open work orders', value: 18, unit: 'orders' },
          { label: 'Overdue', value: 3, unit: 'orders', hint: 'By planned completion date' },
        ],
        items: [{ severity: 'high', title: '6 days past plan, no labor reported', code: 'SC-20260728-0003' }],
        caveats: ['Overdue = plannedEndDate before today'],
      },
    },
  },
  {
    name: 'biz-ref-chips',
    title: 'Document reference chips',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-ref-chips',
      props: {
        title: 'Documents mentioned',
        items: [
          { label: 'Hongtu Heavy Industry due Aug 5', code: 'XS-20260712-0001' },
          { label: 'All open material requests', code: 'MR-open' },
        ],
      },
    },
  },
  {
    name: 'biz-confirm-action',
    title: 'Single pending confirmation',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-confirm-action',
      props: {
        stagedId: 'sa_01H9Z',
        title: 'Purchase order CG-AW-0002 · Approve',
        summary: 'Vendor East China Metals, order total 580.13 CNY.',
      },
    },
  },
  {
    name: 'biz-confirm-queue',
    title: 'Confirmation queue',
    desc: 'enterprise',
    group: 'showcase',
    spec: { component: 'biz-confirm-queue', props: { title: 'Actions awaiting your confirmation' } },
  },
  {
    name: 'biz-transition',
    title: 'Status transition',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-transition',
      props: {
        code: 'CG-AW-0002',
        title: 'Purchase order · Receive',
        action: 'Receive',
        from: 'Awaiting receipt',
        to: 'Received',
        fields: [{ label: 'Vendor', value: 'East China Metals' }],
        params: [{ label: 'Receiving warehouse', required: true }],
      },
    },
  },
  {
    name: 'biz-doc-detail',
    title: 'Document detail',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-doc-detail',
      props: {
        title: 'Purchase order',
        code: 'CG-AW-0002',
        status: 'Awaiting receipt',
        fields: [{ label: 'Vendor', value: 'East China Metals' }],
        lines: { rows: [{ Material: 'Hex bolt M8', Qty: 200, 'Unit price': 1.2 }] },
        transitions: [{ code: 'receive', action: 'Receive' }],
      },
    },
  },
  {
    name: 'biz-create-confirm',
    title: 'Create confirmation',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-create-confirm',
      props: {
        title: 'New receipt · Hongtu Heavy Industry 1,000 CNY',
        fields: [
          { label: 'Linked AR invoice', value: 'YS-20260701-0001 (open 680)' },
          { label: 'Receipt amount', value: '1,000 CNY' },
        ],
        note: 'Only 680 CNY is still open on that AR; a 1,000 receipt over-collects by 320.',
      },
    },
  },
  {
    name: 'biz-batch-create',
    title: 'Batch create',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-batch-create',
      props: {
        title: 'Batch purchase requisitions',
        items: [
          { key: '1', title: 'Hex bolt M8 × 120', status: 'Pending create' },
          { key: '2', title: 'Washer Φ8 × 150', status: 'Pending create' },
        ],
      },
    },
  },
  {
    name: 'biz-edit-confirm',
    title: 'Edit confirmation',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-edit-confirm',
      props: {
        title: 'Edit sales order',
        code: 'XS-20260712-0001',
        patch: [
          { label: 'Delivery date', from: '2026-08-05', to: '2026-08-12' },
          { label: 'Quantity', from: 100, to: 120 },
        ],
      },
    },
  },
  {
    name: 'biz-form-draft',
    title: 'Form draft',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-form-draft',
      props: {
        title: 'New material issue',
        entity: 'materialIssue',
        summary: 'Issue assembly materials from central warehouse',
        fields: [
          { label: 'Warehouse', value: 'Central DC' },
          { label: 'Purpose', value: 'Work order SC-1180' },
        ],
        submitLabel: 'Submit issue',
      },
    },
  },
  {
    name: 'biz-metric-tiles',
    title: 'Metric tiles',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-metric-tiles',
      props: {
        title: 'This month',
        metrics: [
          { label: 'Sales', value: '328', unit: 'k CNY', trend: 'up', delta: '+6.2%', traceId: 'ev-sales' },
          { label: 'Gross margin', value: '31.4', unit: '%', trend: 'flat', delta: '0.0%' },
          { label: 'Overdue AR', value: '42', unit: 'k CNY', trend: 'down', delta: '-3.1%', traceId: 'ev-ar' },
        ],
      },
    },
  },
  {
    name: 'biz-evidence-table',
    title: 'Evidence table',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-evidence-table',
      props: {
        title: 'Overdue receivables',
        columns: ['Document', 'Customer', 'Amount', 'Days overdue'],
        rows: [
          ['AR-1021', 'Hua Tong Mfg', '180k CNY', 21],
          ['AR-1033', 'Voyager Trading', '120k CNY', 14],
          ['AR-1040', 'Goldstone Mech', '120k CNY', 9],
        ],
      },
    },
  },
  {
    name: 'biz-shortage',
    title: 'Kitting shortage',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-shortage',
      props: {
        verdict: '2 materials are short; new purchase orders are required',
        because: ['Expanded 7 materials; 2 need to be purchased', 'Inventory is summed across all warehouses'],
      },
    },
  },
  {
    name: 'biz-plan-review',
    title: 'Purchase recommendation',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-plan-review',
      props: { verdict: '2 materials need to be purchased' },
    },
  },
  {
    name: 'biz-bill-table',
    title: 'Document list',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-bill-table',
      props: {
        title: 'Overdue production orders',
        total: 7,
        rows: [
          { code: 'SC-20260801-0007', product: 'Smart Speaker Pro', qty: 500, status: 'In production', planEndDate: '2026-07-30' },
          { code: 'SC-20260728-0003', product: 'Bluetooth Earbuds X', qty: 1200, status: 'Awaiting dispatch', planEndDate: '2026-07-29' },
        ],
      },
    },
  },
  {
    name: 'biz-group-chart',
    title: 'Grouped bar chart',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-group-chart',
      props: {
        title: 'Backlog by workshop',
        unit: 'items',
        labelKey: 'workshop',
        rows: [
          { workshop: 'Injection', count: 38 },
          { workshop: 'Assembly', count: 21 },
          { workshop: 'Packaging', count: 9 },
        ],
      },
    },
  },
  {
    name: 'biz-ask',
    title: 'Follow-up options',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-ask',
      props: {
        question: 'What should I do next?',
        note: 'Final assembly line 1 defect rate 5.21% (211 reported, 11 defects)',
        options: [
          { label: 'Show defect details for line 1', send: 'List defect details for final assembly line 1', hint: 'Per labor report' },
          { label: 'Group defects by operator', send: 'Group line 1 defects by operator' },
          { label: 'Compare to last month', send: 'Compare line 1 defect rate vs last month' },
        ],
      },
    },
  },
  {
    name: 'biz-flow-run',
    title: 'Flow steps',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-flow-run',
      props: {
        code: 'order-to-production',
        label: 'Sales order to production',
        purpose: 'After you win an order, turn it into a production order the shop floor recognizes',
        writes: true,
        steps: [
          { no: 1, label: 'Submit sales order', module: 'Sales', action: 'Submit for approval' },
          { no: 2, label: 'Approve sales order', module: 'Sales', action: 'Approve' },
          { no: 3, label: 'Convert to production', module: 'Sales', action: 'Convert to production' },
          { no: 4, label: 'Submit production order', module: 'Production', action: 'Submit for approval' },
        ],
      },
    },
  },
  {
    name: 'biz-notify-rule',
    title: 'Notification rule',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-notify-rule',
      props: { mode: 'create', title: 'Custom notification', note: 'Spell out when, who, and what gets sent.' },
    },
  },
  {
    name: 'biz-notify-debug',
    title: 'Notification debug',
    desc: 'enterprise',
    group: 'showcase',
    spec: { component: 'biz-notify-debug', props: { title: 'Rule dry-run log' } },
  },
  {
    name: 'biz-analysis-asset',
    title: 'Analysis asset progress',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-analysis-asset',
      props: {
        title: 'Ten-year sales detail',
        taskId: 'task-demo-1',
        state: 'running',
        progress: { stage: 'parsing', rows: 32768, invalidRows: 12 },
      },
    },
  },
  {
    name: 'biz-action-confirm',
    title: 'Action confirmation',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-action-confirm',
      props: {
        actionId: '23',
        title: 'Purchase order · Approve',
        risk: 'medium',
        summary: 'Will move purchase order CG-AW-4000 from "Pending approval" to "Awaiting receipt".',
        preview: [
          { Field: 'Document', Value: 'Purchase order CG-AW-4000' },
          { Field: 'Status', Value: 'Pending approval → Awaiting receipt' },
          { Field: 'Credit used', Value: '580.13' },
        ],
      },
    },
  },
  {
    name: 'biz-approval-queue',
    title: 'Approval queue',
    desc: 'enterprise',
    group: 'showcase',
    spec: {
      component: 'biz-approval-queue',
      props: {
        title: 'Drafts awaiting my confirmation',
        note: 'You must confirm before records are persisted',
        items: [
          { title: 'Purchase order · Approve', code: 'CG-AW-4000', risk: 'medium', summary: 'Pending approval → Awaiting receipt', amount: '580.13' },
          { title: 'Production material issue', code: 'SC-AW-1180', risk: 'high', summary: 'Issue 3 materials from central DC' },
        ],
      },
    },
  },
  {
    name: 'biz-worklist',
    title: 'Work queue',
    desc: 'ops',
    group: 'showcase',
    spec: {
      component: 'biz-worklist',
      props: {
        title: 'Work queue',
        actor: 'Planner',
        asOf: 'Today 09:30',
        items: [
          { label: 'Ops to dispatch', count: 12, unit: 'steps', tone: 'warn', hint: 'Rush orders first', route: '/production/dispatch' },
          { label: 'Shortage alerts', count: 3, unit: 'items', tone: 'danger', hint: 'Hits this week’s deliveries', route: '/purchase/shortage' },
          { label: 'PO approvals', count: 5, unit: 'orders', tone: 'ok', route: '/purchase/approve' },
          { label: 'QC backlog', count: 8, unit: 'batches', tone: 'warn' },
        ],
        note: 'Demo: clicking “Go” only logs the route to the console.',
      },
    },
  },
  {
    name: 'biz-flow-status',
    title: 'Flow progress',
    desc: 'ops',
    group: 'showcase',
    spec: {
      component: 'biz-flow-status',
      props: {
        title: 'Flow progress',
        subject: 'XS-AW-43689 Hangzhou Yunfan Technology',
        steps: [
          { label: 'Sales order approved', state: 'done', code: 'XS-AW-43689', at: '08-01 14:20' },
          { label: 'Converted to production order', state: 'done', code: 'MO-20260804-0007', at: '08-04 09:05' },
          {
            label: 'Release',
            state: 'blocked',
            code: 'REL-20260805-0002',
            owner: 'Planner',
            blockedBy: 'Missing required field: finishing warehouse. Complete it before operations can be expanded.',
          },
          { label: 'Finish and stock in', state: 'todo' },
        ],
      },
    },
  },
  {
    name: 'biz-capacity-board',
    title: 'Capacity board',
    desc: 'ops · new',
    group: 'showcase',
    spec: {
      component: 'biz-capacity-board',
      props: {
        title: 'Capacity load this week',
        asOf: 'Mon 08:00',
        lines: [
          { workshop: 'Injection', load: 42, capacity: 40, shift: 'Day', risk: 'Over capacity—consider subcontracting 2 orders' },
          { workshop: 'Assembly', load: 28, capacity: 36, shift: 'Day' },
          { workshop: 'Packaging', load: 33, capacity: 30, shift: 'Night', risk: 'Near limit' },
        ],
      },
    },
  },
  {
    name: 'biz-delivery-promise',
    title: 'Delivery promise',
    desc: 'ops · new',
    group: 'showcase',
    spec: {
      component: 'biz-delivery-promise',
      props: {
        title: 'Delivery promise',
        orderNo: 'XS-AW-43689',
        promiseDate: '2026-08-18',
        confidence: 68,
        status: 'at-risk',
        milestones: [
          { label: 'Kitting complete', date: '08-10', done: false },
          { label: 'Final assembly complete', date: '08-15', done: false },
          { label: 'Ship', date: '08-18', done: false },
        ],
        blockers: ['Washer Φ8 short 150', 'Release blocked—finishing warehouse missing'],
      },
    },
  },
]

export const DEFAULT_LIVE_MARKDOWN = `Hi — this is ordinary Markdown with embedded Agent UI below:

\`\`\`agent-ui
component: card
props:
  title: This week at a glance
  description: Rich content composed from atomic components
children:
  - component: row
    children:
      - component: stat
        props: { label: Revenue, value: "128", unit: k CNY, size: lg }
      - component: stat
        props: { label: Orders, value: "86", unit: orders }
  - component: callout
    props:
      tone: info
      title: Note
      text: Fence bodies default to YAML, which is easier for models than JSON.
\`\`\`

You can keep writing prose after the fence.
`
