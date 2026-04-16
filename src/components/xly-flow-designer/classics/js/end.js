import { CircleNode, CircleNodeModel, h } from "@logicflow/core";
import { setCommonStyle } from '@/components/xly-flow-designer/common/js/tool.js'

class EndModel extends CircleNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.r = 22;
  }

  getNodeStyle() {
    const style = setCommonStyle(super.getNodeStyle(), this.properties, "node");
    style.strokeWidth = 3;
    return style;
  }
}

class EndView extends CircleNode {
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
      // 外圆（粗边框）
      h('circle', {
        cx: x,
        cy: y,
        r,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth || 3,
      }),
      // 内部填充实心圆
      h('circle', {
        cx: x,
        cy: y,
        r: r - 7,
        fill: style.stroke,
        opacity: 0.75,
      }),
    ]);
  }
}

export default {
  type: "end",
  model: EndModel,
  view: EndView,
};
