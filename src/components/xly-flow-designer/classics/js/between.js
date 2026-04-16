import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { setCommonStyle } from '@/components/xly-flow-designer/common/js/tool.js'

class BetweenModel extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 120;
    this.height = 60;
    this.radius = 8;
  }

  getNodeStyle() {
    return setCommonStyle(super.getNodeStyle(), this.properties, "node");
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 13;
    style.fontWeight = 500;
    style.color = '#1d2129';
    return style;
  }
}

class BetweenView extends RectNode {
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    const topBarH = 4;
    const iconSize = 18;
    const iconY = y - 2;

    return h('g', { style: { cursor: 'pointer' } }, [
      // 底部阴影
      h('rect', {
        x: x - width / 2 + 1,
        y: y - height / 2 + 2,
        width,
        height,
        rx: radius,
        ry: radius,
        fill: 'rgba(0,0,0,0.06)',
        style: { filter: 'blur(2px)' },
      }),
      // 主矩形背景
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        rx: radius,
        ry: radius,
      }),
      // 顶部品牌色装饰条（圆角只在上部）
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height: topBarH,
        rx: radius,
        ry: radius,
        fill: style.stroke,
      }),
      // 覆盖装饰条底部圆角
      h('rect', {
        x: x - width / 2,
        y: y - height / 2 + topBarH - 2,
        width,
        height: 2,
        fill: style.stroke,
      }),
      // 人物图标 — 简洁版
      h('g', { transform: `translate(${x - iconSize / 2 - 42}, ${iconY - iconSize / 2})` }, [
        // 头部
        h('circle', {
          cx: iconSize / 2,
          cy: 6,
          r: 4,
          fill: style.stroke,
          opacity: 0.7,
        }),
        // 身体
        h('path', {
          d: `M${2},${iconSize - 2} Q${2},${iconSize - 8} ${iconSize / 2},${iconSize - 8} Q${iconSize - 2},${iconSize - 8} ${iconSize - 2},${iconSize - 2}`,
          fill: style.stroke,
          opacity: 0.7,
        }),
      ]),
    ]);
  }
}

export default {
  type: "between",
  model: BetweenModel,
  view: BetweenView,
};
