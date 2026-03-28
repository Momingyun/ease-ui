<template>
  <div class="xly-empty" :class="[`xly-empty--${size}`]" :style="wrapStyle">
    <!-- 图片区域 -->
    <div class="xly-empty__image" :style="imageStyle">
      <slot name="image">
        <!-- 自定义图片 -->
        <img v-if="image" :src="image" :alt="description || '暂无数据'" class="xly-empty__img" />
        <!-- 内置 SVG 插图 -->
        <component :is="currentSvg" v-else class="xly-empty__svg" />
      </slot>
    </div>

    <!-- 描述文字 -->
    <div class="xly-empty__description">
      <slot name="description">
        <span>{{ description || defaultDescMap[type] }}</span>
      </slot>
    </div>

    <!-- 底部操作区 -->
    <div v-if="$slots.default" class="xly-empty__footer">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

defineOptions({ name: 'XlyEmpty' })

export type EmptyType = 'default' | 'data' | 'search' | 'network' | 'permission' | 'list'
export type EmptySize = 'small' | 'default' | 'large'

interface Props {
  /** 空状态类型，影响内置插图 */
  type?: EmptyType
  /** 自定义图片地址（优先级高于 type） */
  image?: string
  /** 图片尺寸（宽度，高度等比） */
  imageSize?: number | string
  /** 描述文字 */
  description?: string
  /** 组件尺寸 */
  size?: EmptySize
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
})

const defaultDescMap: Record<EmptyType, string> = {
  default: '暂无数据',
  data: '暂无数据',
  search: '没有找到相关内容',
  network: '网络连接异常',
  permission: '暂无权限访问',
  list: '列表为空',
}

const wrapStyle = computed(() => ({}))

const imageStyle = computed(() => {
  if (!props.imageSize) return {}
  const size = typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize
  return { width: size }
})

// ────────────────────────────────────────────
// 内置 SVG 插图（全部 inline，零依赖）
// ────────────────────────────────────────────

/** 默认/数据 空状态 */
const SvgDefault = () =>
  h(
    'svg',
    {
      viewBox: '0 0 200 160',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
    },
    [
      // 背景椭圆
      h('ellipse', { cx: '100', cy: '145', rx: '70', ry: '10', fill: '#f2f3f7' }),
      // 盒子底部
      h('path', {
        d: 'M40 80 L100 55 L160 80 L160 130 L40 130 Z',
        fill: '#eef0f8',
        stroke: '#d0d5e8',
        'stroke-width': '1.5',
      }),
      // 盒子侧面
      h('path', { d: 'M40 80 L40 130 L100 145 L100 95 Z', fill: '#dde1f0', stroke: '#d0d5e8', 'stroke-width': '1.5' }),
      h('path', {
        d: 'M160 80 L160 130 L100 145 L100 95 Z',
        fill: '#cfd4ea',
        stroke: '#d0d5e8',
        'stroke-width': '1.5',
      }),
      // 盒子顶部开口
      h('path', {
        d: 'M40 80 L100 55 L160 80 L100 95 Z',
        fill: '#f8f9ff',
        stroke: '#d0d5e8',
        'stroke-width': '1.5',
      }),
      // 开口折叠左
      h('path', { d: 'M40 80 L70 67.5 L100 95 L70 102.5 Z', fill: '#eef0f8', stroke: '#d0d5e8', 'stroke-width': '1' }),
      // 开口折叠右
      h('path', {
        d: 'M160 80 L130 67.5 L100 95 L130 102.5 Z',
        fill: '#e4e7f5',
        stroke: '#d0d5e8',
        'stroke-width': '1',
      }),
      // 文档线条
      h('line', { x1: '62', y1: '100', x2: '90', y2: '108', stroke: '#b8bdd6', 'stroke-width': '2', 'stroke-linecap': 'round' }),
      h('line', { x1: '62', y1: '108', x2: '85', y2: '115', stroke: '#b8bdd6', 'stroke-width': '2', 'stroke-linecap': 'round' }),
    ],
  )

/** 搜索无结果 */
const SvgSearch = () =>
  h(
    'svg',
    { viewBox: '0 0 200 160', xmlns: 'http://www.w3.org/2000/svg', fill: 'none' },
    [
      h('ellipse', { cx: '100', cy: '148', rx: '68', ry: '9', fill: '#f2f3f7' }),
      // 放大镜圆圈
      h('circle', { cx: '88', cy: '78', r: '38', fill: '#eef0f8', stroke: '#c8cde4', 'stroke-width': '5' }),
      // 放大镜手柄
      h('line', { x1: '116', y1: '106', x2: '148', y2: '138', stroke: '#c8cde4', 'stroke-width': '7', 'stroke-linecap': 'round' }),
      // 叉叉
      h('line', { x1: '76', y1: '66', x2: '100', y2: '90', stroke: '#b8bdd6', 'stroke-width': '3.5', 'stroke-linecap': 'round' }),
      h('line', { x1: '100', y1: '66', x2: '76', y2: '90', stroke: '#b8bdd6', 'stroke-width': '3.5', 'stroke-linecap': 'round' }),
      // 小星星
      h('circle', { cx: '148', cy: '52', r: '4', fill: '#d0d5e8' }),
      h('circle', { cx: '40', cy: '90', r: '3', fill: '#dde1f0' }),
      h('circle', { cx: '158', cy: '100', r: '2.5', fill: '#c8cde4' }),
    ],
  )

/** 网络异常 */
const SvgNetwork = () =>
  h(
    'svg',
    { viewBox: '0 0 200 160', xmlns: 'http://www.w3.org/2000/svg', fill: 'none' },
    [
      h('ellipse', { cx: '100', cy: '148', rx: '68', ry: '9', fill: '#f2f3f7' }),
      // 云朵
      h('path', {
        d: 'M148 85 a28 28 0 0 0-54-10 a20 20 0 1 0 4 39 h46 a20 20 0 0 0 4-29z',
        fill: '#eef0f8',
        stroke: '#c8cde4',
        'stroke-width': '2',
      }),
      // 叉叉
      h('line', { x1: '86', y1: '95', x2: '114', y2: '123', stroke: '#ff7b7b', 'stroke-width': '4', 'stroke-linecap': 'round' }),
      h('line', { x1: '114', y1: '95', x2: '86', y2: '123', stroke: '#ff7b7b', 'stroke-width': '4', 'stroke-linecap': 'round' }),
    ],
  )

/** 无权限 */
const SvgPermission = () =>
  h(
    'svg',
    { viewBox: '0 0 200 160', xmlns: 'http://www.w3.org/2000/svg', fill: 'none' },
    [
      h('ellipse', { cx: '100', cy: '148', rx: '68', ry: '9', fill: '#f2f3f7' }),
      // 锁体
      h('rect', { x: '62', y: '88', width: '76', height: '54', rx: '10', fill: '#eef0f8', stroke: '#c8cde4', 'stroke-width': '2' }),
      // 锁扣
      h('path', { d: 'M76 88 V72 a24 24 0 0 1 48 0 V88', stroke: '#c8cde4', 'stroke-width': '5', 'stroke-linecap': 'round', fill: 'none' }),
      // 锁孔
      h('circle', { cx: '100', cy: '110', r: '8', fill: '#d0d5e8' }),
      h('rect', { x: '96', y: '110', width: '8', height: '12', rx: '2', fill: '#d0d5e8' }),
    ],
  )

/** 列表空 */
const SvgList = () =>
  h(
    'svg',
    { viewBox: '0 0 200 160', xmlns: 'http://www.w3.org/2000/svg', fill: 'none' },
    [
      h('ellipse', { cx: '100', cy: '148', rx: '68', ry: '9', fill: '#f2f3f7' }),
      // 纸张
      h('rect', { x: '50', y: '30', width: '100', height: '115', rx: '8', fill: '#f8f9ff', stroke: '#d0d5e8', 'stroke-width': '1.5' }),
      // 折角
      h('path', { d: 'M120 30 L150 60 L120 60 Z', fill: '#eef0f8', stroke: '#d0d5e8', 'stroke-width': '1.5' }),
      // 横线（内容）
      h('line', { x1: '66', y1: '75', x2: '134', y2: '75', stroke: '#dde1f0', 'stroke-width': '2.5', 'stroke-linecap': 'round' }),
      h('line', { x1: '66', y1: '92', x2: '134', y2: '92', stroke: '#dde1f0', 'stroke-width': '2.5', 'stroke-linecap': 'round' }),
      h('line', { x1: '66', y1: '109', x2: '110', y2: '109', stroke: '#dde1f0', 'stroke-width': '2.5', 'stroke-linecap': 'round' }),
      // 问号
      h('text', { x: '91', y: '138', 'font-size': '22', fill: '#c8cde4', 'font-weight': '700', 'text-anchor': 'middle' }, '?'),
    ],
  )

const svgMap: Record<EmptyType, ReturnType<typeof h> | (() => ReturnType<typeof h>)> = {
  default: SvgDefault,
  data: SvgDefault,
  search: SvgSearch,
  network: SvgNetwork,
  permission: SvgPermission,
  list: SvgList,
}

const currentSvg = computed(() => svgMap[props.type] || SvgDefault)
</script>

<style scoped lang="scss">
.xly-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  box-sizing: border-box;

  // ---- 尺寸 ----
  &--small {
    padding: 16px 12px;

    .xly-empty__image {
      width: 80px;
    }

    .xly-empty__description {
      font-size: 13px;
      margin-top: 10px;
    }
  }

  &--default {
    .xly-empty__image {
      width: 120px;
    }

    .xly-empty__description {
      font-size: 14px;
      margin-top: 14px;
    }
  }

  &--large {
    padding: 48px 24px;

    .xly-empty__image {
      width: 180px;
    }

    .xly-empty__description {
      font-size: 15px;
      margin-top: 18px;
    }
  }
}

.xly-empty__image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .xly-empty__img {
    width: 100%;
    height: auto;
    display: block;
  }

  .xly-empty__svg {
    width: 100%;
    height: auto;
    display: block;
  }
}

.xly-empty__description {
  color: #8e8ea0;
  line-height: 1.6;
  text-align: center;

  span {
    display: block;
  }
}

.xly-empty__footer {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
