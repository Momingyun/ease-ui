<template>
  <div class="xly-card" :class="cardClass" :style="cardStyle">
    <!-- 头部 -->
    <div v-if="hasHeader" class="xly-card__header">
      <slot name="header">
        <div class="xly-card__title">
          <slot name="icon">
            <XlyIcon v-if="icon" :name="icon" :size="16" />
          </slot>
          <span>{{ title }}</span>
        </div>
      </slot>
      <div v-if="$slots.extra" class="xly-card__extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- 内容区 -->
    <div class="xly-card__body">
      <slot />
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="xly-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

type ShadowType = 'always' | 'hover' | 'never'

const props = withDefaults(defineProps<{
  /** 卡片标题 */
  title?: string
  /** 标题图标 */
  icon?: string
  /** 是否有圆角 */
  rounded?: boolean
  /** 边框 */
  bordered?: boolean
  /** 阴影类型 */
  shadow?: ShadowType
  /** 是否禁用 */
  disabled?: boolean
  /** 是否悬浮时上浮 */
  hoverable?: boolean
}>(), {
  title: '',
  icon: '',
  rounded: true,
  bordered: true,
  shadow: 'always',
  disabled: false,
  hoverable: false,
})

defineOptions({
  name: 'XlyCard',
})

const slots = useSlots()
const hasHeader = computed(() => props.title || slots.header || slots.icon)

const cardClass = computed(() => [
  {
    'is-rounded': props.rounded,
    'is-bordered': props.bordered,
    'is-disabled': props.disabled,
    'is-hoverable': props.hoverable,
  },
  `xly-card--shadow-${props.shadow}`,
])

const cardStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.disabled) {
    style.opacity = '0.5'
    style.cursor = 'not-allowed'
  }
  return style
})
</script>

<style scoped lang="scss">
/* ========== 现代设计系统 ========== */

/* 色彩体系 - 清新明亮 */
$bg-white: #ffffff;
$bg-light: #fafbfc;
$bg-subtle: #f4f5f7;

$text-primary: #1a1a1a;
$text-regular: #4a4a4a;
$text-secondary: #71717a;
$text-muted: #a1a1aa;

$border-color: #e4e4e7;
$border-light: #f1f1f4;

/* 主题色 */
$primary: #3b82f6;
$primary-light: #eff6ff;
$success: #10b981;
$success-light: #ecfdf5;
$warning: #f59e0b;
$warning-light: #fffbeb;
$danger: #ef4444;
$danger-light: #fef2f2;

/* 阴影 - 柔和现代 */
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
$shadow-hover: 0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);

/* 圆角 */
$radius: 10px;
$radius-sm: 6px;

/* ========== 卡片主体 ========== */
.xly-card {
  position: relative;
  background: $bg-white;
  color: $text-regular;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  /* 圆角 */
  &.is-rounded {
    border-radius: $radius;
  }

  /* 边框 */
  &.is-bordered {
    border: 1px solid $border-light;
  }

  /* 悬浮效果 */
  &.is-hoverable {
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
      box-shadow: $shadow-hover;
      border-color: #e5e5e8; // darken($border-light, 5%) → $border-light=#f1f1f4
    }
  }

  /* 阴影类型 */
  &--shadow-always {
    box-shadow: $shadow-md;
  }

  &--shadow-hover:hover {
    box-shadow: $shadow-hover;
  }

  &--shadow-never {
    box-shadow: none;
  }

  /* 禁用状态 */
  &.is-disabled {
    pointer-events: none;
  }
}

/* ========== 卡片头部 ========== */
.xly-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid $border-light;

  .xly-card--shadow-never & {
    border-bottom: 1px solid $border-light;
  }
}

.xly-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.4;

  > .xly-icon {
    color: $primary;
    flex-shrink: 0;
  }
}

.xly-card__extra {
  flex-shrink: 0;
  margin-left: 12px;
  font-size: 13px;
}

/* ========== 卡片内容区 ========== */
.xly-card__body {
  padding: 18px;
  font-size: 14px;
  line-height: 1.6;
  color: $text-regular;
}

/* ========== 卡片底部 ========== */
.xly-card__footer {
  padding: 14px 18px;
  border-top: 1px solid $border-light;
  font-size: 13px;
  color: $text-secondary;

  &:empty {
    display: none;
  }

  .xly-card--shadow-never & {
    border-top: 1px solid $border-light;
  }
}
</style>
