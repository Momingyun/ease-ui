import { h, PolygonNode, PolygonNodeModel } from '@logicflow/core'
import { setCommonStyle } from '@/components/xly-flow-designer/common/js/tool.js'

class SerialModel extends PolygonNodeModel {
  static extendKey = 'SerialModel';
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = ''
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 45
      }
    }
    super(data, graphModel)
    this.points = [
      [30, 0],
      [60, 30],
      [30, 60],
      [0, 30]
    ]
  }

  getNodeStyle() {
    const style = setCommonStyle(super.getNodeStyle(), this.properties, "node");
    style.strokeWidth = 2;
    return style;
  }
}

class SerialView extends PolygonNode {
  static extendKey = 'SerialNode';

  getShape() {
    const { model } = this.props;
    const { x, y, width, height, points } = model;
    const style = model.getNodeStyle();

    return h(
      'g',
      { transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})` },
      // 菱形主体
      h('polygon', {
        ...style,
        x,
        y,
        points,
      }),
      // X 形互斥图标（精致的叉号）
      h('g', {
        transform: 'translate(30, 30)',
        stroke: style.stroke || '#666',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
        fill: 'none',
        opacity: 0.8,
      }, [
        h('line', { x1: -7, y1: -7, x2: 7, y2: 7 }),
        h('line', { x1: 7, y1: -7, x2: -7, y2: 7 }),
      ])
    )
  }
}

export default {
  type: 'serial',
  view: SerialView,
  model: SerialModel
};
