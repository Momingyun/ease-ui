<template>
  <div class="xly-row" :class="rowClasses" :style="rowStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { ROW_GUTTER_KEY } from './types'

interface RowProps {
  /** 栅格间隔，支持像素值或响应式对象 { xs, sm, md, lg, xl } */
  gutter?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  /** flex 布局，水平排列方式 */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  /** flex 布局，垂直对齐方式 */
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  /** 标签 */
  tag?: string
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: undefined,
  align: undefined,
  tag: 'div',
})

const gutterValue = computed(() => {
  const g = props.gutter
  if (typeof g === 'number') return { horizontal: g, vertical: 0 }
  // 响应式对象取最大值（简化处理，实际应响应窗口变化）
  return { horizontal: g.lg ?? g.md ?? g.sm ?? g.xs ?? g.xl ?? 0, vertical: 0 }
})

provide(ROW_GUTTER_KEY, gutterValue)

const rowClasses = computed(() => [
  `xly-row--${props.tag === 'div' ? 'default' : props.tag}`,
  {
    'is-justify-start': props.justify === 'start',
    'is-justify-end': props.justify === 'end',
    'is-justify-center': props.justify === 'center',
    'is-justify-space-around': props.justify === 'space-around',
    'is-justify-space-between': props.justify === 'space-between',
    'is-justify-space-evenly': props.justify === 'space-evenly',
    'is-align-top': props.align === 'top',
    'is-align-middle': props.align === 'middle',
    'is-align-bottom': props.align === 'bottom',
    'is-align-stretch': props.align === 'stretch',
    'is-flex': props.justify || props.align,
  },
])

const rowStyle = computed(() => {
  const style: Record<string, string> = {}
  const h = gutterValue.value.horizontal
  if (h > 0) {
    style.marginLeft = `-${h / 2}px`
    style.marginRight = `-${h / 2}px`
  }
  return style
})
</script>

<style scoped lang="scss">
.xly-row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  &.is-flex {
    display: flex;
  }

  &.is-justify-start { justify-content: flex-start; }
  &.is-justify-end { justify-content: flex-end; }
  &.is-justify-center { justify-content: center; }
  &.is-justify-space-around { justify-content: space-around; }
  &.is-justify-space-between { justify-content: space-between; }
  &.is-justify-space-evenly { justify-content: space-evenly; }

  &.is-align-top { align-items: flex-start; }
  &.is-align-middle { align-items: center; }
  &.is-align-bottom { align-items: flex-end; }
  &.is-align-stretch { align-items: stretch; }
}
</style>
