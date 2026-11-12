import { registerComponent } from '@/atoms/registry'
import { flightTicketAtom } from './travel/flight-ticket'
import { stockCandidatesAtom } from './finance/stock-candidates'
import { strategySummaryAtom } from './finance/strategy-summary'
import { metricTilesAtom } from './enterprise/metric-tiles'
import { evidenceTableAtom } from './enterprise/evidence-table'
import {
  actionConfirmAtom,
  analysisAssetAtom,
  approvalQueueAtom,
  askAtom,
  batchCreateAtom,
  billTableAtom,
  briefingAtom,
  confirmActionAtom,
  confirmQueueAtom,
  createConfirmAtom,
  docDetailAtom,
  editConfirmAtom,
  flowRunAtom,
  formDraftAtom,
  groupChartAtom,
  notifyDebugAtom,
  notifyRuleAtom,
  planReviewAtom,
  refChipsAtom,
  shortageAtom,
  transitionAtom,
} from './enterprise/catalog'
import { appRecommendAtom } from './market/app-recommend'
import { worklistAtom } from './ops/worklist'
import { flowStatusAtom } from './ops/flow-status'
import { capacityBoardAtom } from './ops/capacity-board'
import { deliveryPromiseAtom } from './ops/delivery-promise'

let registered = false

/** Register business showcase cards into the shared component registry. */
export function registerShowcase() {
  if (registered) return

  registerComponent('biz-flight-ticket', flightTicketAtom)
  registerComponent('biz-stock-candidates', stockCandidatesAtom)
  registerComponent('biz-strategy-summary', strategySummaryAtom)
  registerComponent('biz-app-recommend', appRecommendAtom)

  registerComponent('biz-metric-tiles', metricTilesAtom)
  registerComponent('biz-evidence-table', evidenceTableAtom)
  registerComponent('biz-briefing', briefingAtom)
  registerComponent('biz-ref-chips', refChipsAtom)
  registerComponent('biz-confirm-action', confirmActionAtom)
  registerComponent('biz-confirm-queue', confirmQueueAtom)
  registerComponent('biz-transition', transitionAtom)
  registerComponent('biz-doc-detail', docDetailAtom)
  registerComponent('biz-create-confirm', createConfirmAtom)
  registerComponent('biz-batch-create', batchCreateAtom)
  registerComponent('biz-edit-confirm', editConfirmAtom)
  registerComponent('biz-form-draft', formDraftAtom)
  registerComponent('biz-shortage', shortageAtom)
  registerComponent('biz-plan-review', planReviewAtom)
  registerComponent('biz-bill-table', billTableAtom)
  registerComponent('biz-group-chart', groupChartAtom)
  registerComponent('biz-ask', askAtom)
  registerComponent('biz-flow-run', flowRunAtom)
  registerComponent('biz-notify-rule', notifyRuleAtom)
  registerComponent('biz-notify-debug', notifyDebugAtom)
  registerComponent('biz-analysis-asset', analysisAssetAtom)
  registerComponent('biz-action-confirm', actionConfirmAtom)
  registerComponent('biz-approval-queue', approvalQueueAtom)

  registerComponent('biz-worklist', worklistAtom)
  registerComponent('biz-flow-status', flowStatusAtom)
  registerComponent('biz-capacity-board', capacityBoardAtom)
  registerComponent('biz-delivery-promise', deliveryPromiseAtom)

  registered = true
}
