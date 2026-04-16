import { CircleNode, CircleNodeModel, h } from "@logicflow/core";
import { setCommonStyle } from '@/components/xly-flow-designer/common/js/tool.js'

class StartModel extends CircleNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.r = 22;
  }

  getNodeStyle() {
    return setCommonStyle(super.getNodeStyle(), this.properties, "node");
  }
}

class StartView extends CircleNode {
  getShape() {
    const { model } = this.props;
    const { x, y, r, text } = model;
    const style = model.getNodeStyle();

    return h('g', {}, [
      // 外圈光晕
      h('circle', {
        cx: x,
        cy: y,
        r: r + 4,
        fill: 'none',
        stroke: style.stroke,
        strokeWidth: 1,
        opacity: 0.2,
      }),
      // 主圆
      h('circle', {
        cx: x,
        cy: y,
        r,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: 2,
      }),
      // 内部播放三角图标
      h('polygon', {
        points: `${x - 5},${y - 7} ${x - 5},${y + 7} ${x + 7},${y}`,
        fill: style.stroke,
        opacity: 0.85,
      }),
    ]);
  }
}

export default {
  type: "start",
  model: StartModel,
  view: StartView,
};
