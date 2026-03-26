<template>
  <div class="xly-descriptions" :class="descriptionsClass" :style="cssVars">
    <!-- 标题栏 -->
    <div v-if="title || $slots.title || $slots.extra" class="xly-descriptions__header">
      <div class="xly-descriptions__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="xly-descriptions__extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- 内容表格 (水平布局) -->
    <div v-if="layout === 'horizontal'" class="xly-descriptions__body">
      <table class="xly-descriptions__table">
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="xly-descriptions__row"
          >
            <template v-for="(cell, cellIndex) in row" :key="cellIndex">
              <td class="xly-descriptions__label" :style="labelCellStyle">
                <XlyIcon v-if="cell.icon" :name="cell.icon" :size="13" class="label-icon" />
                <span class="label-text">{{ cell.label }}</span>
              </td>
              <td class="xly-descriptions__content" :colspan="cell.span * 2 - 1">
                <component :is="() => cell.children" />
              </td>
            </template>
            <!-- 末行补齐空白 -->
            <template v-if="rowIndex === rows.length - 1 && lastRowPadding > 0">
              <td class="xly-descriptions__label is-empty"></td>
              <td class="xly-descriptions__content" :colspan="lastRowPadding * 2 - 1"></td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 内容网格 (垂直布局) -->
    <div v-else class="xly-descriptions__body xly-descriptions__body--vertical">
      <div class="xly-descriptions__grid">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="xly-descriptions__item"
          :class="getItemClass(idx)"
          :style="{ gridColumn: `span ${item.span}` }"
        >
          <div class="xly-descriptions__label xly-descriptions__label--vertical">
            <XlyIcon v-if="item.icon" :name="item.icon" :size="13" class="label-icon" />
            <span class="label-text">{{ item.label }}</span>
          </div>
          <div class="xly-descriptions__content xly-descriptions__content--vertical">
            <component :is="() => item.children" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, VNode, Fragment, Comment, Text } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

const props = withDefaults(defineProps<{
  title?: string
  column?: number
  colon?: boolean
  bordered?: boolean
  layout?: 'horizontal' | 'vertical'
  size?: 'small' | 'default' | 'large'
  labelWidth?: string | number
  labelAlign?: 'left' | 'right' | 'center'
}>(), {
  title: '',
  column: 3,
  colon: false,
  bordered: false,
  layout: 'horizontal',
  size: 'default',
  labelWidth: '',
  labelAlign: 'left',
})

defineOptions({ name: 'XlyDescriptions' })

const slots = useSlots()

interface ParsedItem {
  label: string
  icon: string
  span: number
  children: VNode[]
}

function flattenVNodes(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (!vnode) continue
    if (vnode.type === Comment || vnode.type === Text) continue
    if (vnode.type === Fragment) {
      result.push(...flattenVNodes(vnode.children as VNode[]))
    } else {
      result.push(vnode)
    }
  }
  return result
}

const items = computed<ParsedItem[]>(() => {
  const flat = flattenVNodes(slots.default?.() || [])
  return flat.map(vnode => {
    const p = (vnode.props || {}) as Record<string, unknown>
    const children: VNode[] = []
    if (vnode.children && typeof vnode.children === 'object') {
      const c = vnode.children as Record<string, unknown>
      if (typeof c.default === 'function') {
        const rendered = c.default()
        if (Array.isArray(rendered)) children.push(...rendered)
        else children.push(rendered as VNode)
      }
    }
    return {
      label: String(p.label ?? ''),
      icon: String(p.icon ?? ''),
      span: Math.max(1, Number(p.span ?? 1)),
      children,
    }
  })
})

// 水平布局行分组
const rows = computed(() => {
  const result: ParsedItem[][] = []
  let currentRow: ParsedItem[] = []
  let currentCols = 0
  items.value.forEach((item) => {
    const span = Math.min(item.span, props.column)
    currentRow.push({ ...item, span })
    currentCols += span
    if (currentCols >= props.column) {
      result.push(currentRow)
      currentRow = []
      currentCols = 0
    }
  })
  if (currentRow.length > 0) result.push(currentRow)
  return result
})

const lastRowPadding = computed(() => {
  if (rows.value.length === 0) return 0
  const used = rows.value[rows.value.length - 1].reduce((s, i) => s + i.span, 0)
  return props.column - used
})

// 垂直布局：计算每个 item 是否是"该行最后一列"和"最后一行"，用于控制边框
const totalRows = computed(() => {
  let col = 0
  let rowCount = 0
  items.value.forEach(item => {
    col += item.span
    if (col >= props.column) {
      rowCount++
      col = 0
    }
  })
  if (col > 0) rowCount++
  return rowCount
})

// 计算每个 item 所在行号（0-based）
const itemRowIndex = computed(() => {
  const result: number[] = []
  let col = 0
  let row = 0
  items.value.forEach(item => {
    result.push(row)
    col += item.span
    if (col >= props.column) {
      row++
      col = 0
    }
  })
  return result
})

// 计算每个 item 所在列号（0-based）
const itemColIndex = computed(() => {
  const result: number[] = []
  let col = 0
  items.value.forEach(item => {
    result.push(col)
    col += item.span
    if (col >= props.column) col = 0
  })
  return result
})

function getItemClass(idx: number) {
  const colIdx = itemColIndex.value[idx]
  const rowIdx = itemRowIndex.value[idx]
  const span = items.value[idx]?.span ?? 1
  const isLastCol = (colIdx + span) >= props.column
  const isLastRow = rowIdx === totalRows.value - 1
  return {
    'is-last-col': isLastCol,
    'is-last-row': isLastRow,
  }
}

const descriptionsClass = computed(() => [
  `xly-descriptions--${props.size}`,
  `xly-descriptions--${props.layout}`,
  { 'is-bordered': props.bordered },
])

// CSS 变量：传递 column 给 grid-template-columns
const cssVars = computed(() => ({
  '--xly-desc-columns': props.column,
}))

const labelCellStyle = computed(() => {
  const style: Record<string, string> = { textAlign: props.labelAlign }
  if (props.labelWidth) {
    style.width = typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : String(props.labelWidth)
  }
  return style
})
</script>

<style scoped lang="scss">
// ─── 现代设计 Token ───────────────────────────────────────────
$c-text-heading: #1a1a2e;
$c-text-body: #4a4a6a;
$c-text-label: #8e8ea0;
$c-text-subtle: #b0b0c0;
$c-border: #e8eaed;
$c-border-subtle: #f2f3f7;
$c-bg-label: #fafbfd;
$c-bg-stripe: #f8f9fa;
$radius: 12px;
$radius-sm: 8px;

// ─── Base ────────────────────────────────────────────────────
.xly-descriptions {
  width: 100%;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;

  // ── Header ──
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: $c-text-heading;
    line-height: 1.4;
    position: relative;
    padding-left: 12px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 2px;
      bottom: 2px;
      width: 3px;
      background: #1677ff;
      border-radius: 2px;
    }
  }

  &__extra {
    font-size: 13px;
    color: $c-text-label;
  }

  // ── Table body ──
  &__body {
    width: 100%;
    overflow: hidden;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
  }

  // ── Label (水平) ──
  &__label {
    white-space: nowrap;
    vertical-align: middle;
    font-weight: 500;

    .label-icon {
      color: $c-text-subtle;
      vertical-align: middle;
      margin-right: 6px;
      margin-top: -1px;
    }

    .label-text {
      color: $c-text-label;
      font-weight: 500;
    }
  }

  // ── Content (水平) ──
  &__content {
    color: $c-text-body;
    word-break: break-word;
    vertical-align: middle;
    font-weight: 400;
  }

  // ─── 垂直布局 ────────────────────────────────────────────────
  &__body--vertical {
    width: 100%;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(var(--xly-desc-columns, 3), 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__label--vertical {
    display: flex;
    align-items: center;
    white-space: nowrap;

    .label-text {
      color: $c-text-label;
      font-weight: 500;
    }

    .label-icon {
      color: $c-text-subtle;
      margin-right: 6px;
    }
  }

  &__content--vertical {
    color: $c-text-body;
    font-weight: 400;
    word-break: break-word;
  }

  // ─── Size ────────────────────────────────────────────────────
  &--small {
    .xly-descriptions__label:not(.xly-descriptions__label--vertical),
    .xly-descriptions__content:not(.xly-descriptions__content--vertical) {
      font-size: 12px;
      padding: 8px 12px;
      line-height: 1.5;
    }
    .xly-descriptions__item { padding: 12px 14px; }
    .xly-descriptions__label--vertical { font-size: 11px; margin-bottom: 4px; }
    .xly-descriptions__content--vertical { font-size: 13px; line-height: 1.5; }
    .xly-descriptions__title { font-size: 14px; padding-left: 10px; }
  }

  &--default {
    .xly-descriptions__label:not(.xly-descriptions__label--vertical),
    .xly-descriptions__content:not(.xly-descriptions__content--vertical) {
      font-size: 13px;
      padding: 10px 16px;
      line-height: 1.6;
    }
    .xly-descriptions__item { padding: 16px 20px; }
    .xly-descriptions__label--vertical { font-size: 12px; margin-bottom: 6px; }
    .xly-descriptions__content--vertical { font-size: 14px; line-height: 1.6; }
    .xly-descriptions__title { font-size: 15px; padding-left: 12px; }
  }

  &--large {
    .xly-descriptions__label:not(.xly-descriptions__label--vertical),
    .xly-descriptions__content:not(.xly-descriptions__content--vertical) {
      font-size: 14px;
      padding: 12px 20px;
      line-height: 1.6;
    }
    .xly-descriptions__item { padding: 20px 24px; }
    .xly-descriptions__label--vertical { font-size: 13px; margin-bottom: 8px; }
    .xly-descriptions__content--vertical { font-size: 15px; line-height: 1.6; }
    .xly-descriptions__title { font-size: 16px; padding-left: 14px; }
  }

  // ─── 水平 · 无边框 ───────────────────────────────────────────
  &--horizontal:not(.is-bordered) {
    .xly-descriptions__body {
      border: 1px solid $c-border-subtle;
      border-radius: $radius-sm;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .xly-descriptions__label {
      background: $c-bg-label;
      border-right: 1px solid $c-border-subtle;
      min-width: 120px;
    }

    .xly-descriptions__row {
      &:not(:last-child) td { border-bottom: 1px solid $c-border-subtle; }
      &:nth-child(even) .xly-descriptions__content { background: $c-bg-stripe; }
      td + td + td { border-left: 1px solid $c-border-subtle; }
    }
  }

  // ─── 水平 · 有边框 ───────────────────────────────────────────
  &--horizontal.is-bordered {
    .xly-descriptions__body {
      border: 1px solid $c-border;
      border-radius: $radius-sm;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    }

    .xly-descriptions__label {
      background: $c-bg-label;
      border-right: 1px solid $c-border;
      min-width: 120px;
    }

    .xly-descriptions__row {
      &:not(:last-child) td { border-bottom: 1px solid $c-border; }
      td + td { border-left: 1px solid $c-border; }
    }
  }

  // ─── 垂直 · 无边框 ───────────────────────────────────────────
  &--vertical:not(.is-bordered) {
    .xly-descriptions__body {
      border: 1px solid $c-border-subtle;
      border-radius: $radius-sm;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .xly-descriptions__item {
      border-right: 1px solid $c-border-subtle;
      border-bottom: 1px solid $c-border-subtle;

      &.is-last-col  { border-right: none; }
      &.is-last-row  { border-bottom: none; }
    }
  }

  // ─── 垂直 · 有边框 ───────────────────────────────────────────
  &--vertical.is-bordered {
    .xly-descriptions__body {
      border: 1px solid $c-border;
      border-radius: $radius-sm;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    }

    .xly-descriptions__item {
      border-right: 1px solid $c-border;
      border-bottom: 1px solid $c-border;
      padding: 0 !important;

      &.is-last-col  { border-right: none; }
      &.is-last-row  { border-bottom: none; }

      .xly-descriptions__label--vertical {
        background: $c-bg-label;
        border-bottom: 1px solid $c-border;
        padding: 10px 16px;
        margin-bottom: 0 !important;
      }

      .xly-descriptions__content--vertical {
        padding: 12px 16px;
      }
    }
  }
}
</style>