import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
import { setCommonStyle } from '@/components/xly-flow-designer/common/js/tool.js'

class SkipModel extends PolylineEdgeModel {
  setAttributes() {
    this.offset = 20;
  }

  getEdgeStyle() {
    const style = setCommonStyle(super.getEdgeStyle(), this.properties, "skip");
    style.strokeWidth = 1.8;
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 12;
    style.color = '#4e5969';
    style.background = {
      fill: '#fff',
      stroke: 'none',
      radius: 4,
      padding: [3, 6, 3, 6],
    };
    return style;
  }

  /**
   * 重写此方法，使保存数据是能带上锚点数据。
   */
  getData() {
    const data = super.getData();
    data.sourceAnchorId = this.sourceAnchorId;
    data.targetAnchorId = this.targetAnchorId;
    return data;
  }
}

export default {
  type: "skip",
  view: PolylineEdge,
  model: SkipModel,
};
