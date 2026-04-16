import { BaseNodeModel } from '@/components/xly-flow-designer/mimic/js/baseNodeModel'
import { BaseNodeView } from '@/components/xly-flow-designer/mimic/js/baseNodeView'

class BetweenModel extends BaseNodeModel {}

class BetweenView extends BaseNodeView {}

export default {
  type: "between",
  model: BetweenModel,
  view: BetweenView,
};
