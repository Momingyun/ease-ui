import { BaseNodeModel } from '@/components/xly-flow-designer/mimic/js/baseNodeModel'
import { BaseNodeView } from '@/components/xly-flow-designer/mimic/js/baseNodeView'

class StartModel extends BaseNodeModel {}

class StartView extends BaseNodeView {}

export default {
  type: "start",
  model: StartModel,
  view: StartView,
};

