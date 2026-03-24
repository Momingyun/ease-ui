<template>
  <div class="xly-divider" :class="dividerClass" :style="dividerStyle">
    <span v-if="$slots.default && !plain" class="xly-divider__text" :class="[`xly-divider__text--${contentPosition}`]">
      <slot />
    </span>
    <span v-else-if="$slots.default && plain" class="xly-divider__text xly-divider__text--plain" :class="[`xly-divider__text--${contentPosition}`]">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type DividerDirection = 'horizontal' | 'vertical'
type DividerContentPosition = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  /** 分割线方向 */
  direction?: DividerDirection
  /** 是否为简约样式（隐藏分割线） */
  plain?: boolean
  /** 分割线内容位置 */
  contentPosition?: DividerContentPosition
  /** 自定义颜色 */
  color?: string
  /** 自定义线宽（px） */
  borderWidth?: string | number
  /** 自定义类名 */
  customClass?: string
}>(), {
  direction: 'horizontal',
  plain: false,
  contentPosition: 'center',
  color: '',
  borderWidth: 1,
  customClass: '',
})

const dividerClass = computed(() => [
  `xly-divider--${props.direction}`,
  props.plain ? 'xly-divider--plain' : '',
  props.customClass,
])

const dividerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.color) {
    style.borderColor = props.color
  }
  
  if (props.direction === 'horizontal') {
    style.borderWidth = `${props.borderWidth}px 0 0 0`
  } else {
    style.borderWidth = `0 ${props.borderWidth}px 0 0`
  }
  
  return style
})
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$border-color: #e8e8e8;
$text-color: #8e8ea0;
$text-primary: #1a1a2e;

/* ========== 基础分割线 ========== */
.xly-divider {
  position: relative;
  background-color: $border-color;
  border: none;
  margin: 0;
  box-sizing: border-box;

  &--horizontal {
    display: block;
    width: 100%;
    border-top: 1px solid $border-color;
    margin: 20px 0;
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    vertical-align: middle;
    border-right: 1px solid $border-color;
    margin: 0 16px;
  }

  &--plain {
    background-color: transparent;
  }
}

/* ========== 分割线文字 ========== */
.xly-divider__text {
  position: absolute;
  display: inline-block;
  padding: 0 16px;
  background-color: #fff;
  font-size: 14px;
  color: $text-color;
  line-height: 1;
  transform: translateY(-50%);
  white-space: nowrap;

  &--left {
    left: 20px;
  }

  &--center {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  &--right {
    right: 20px;
  }

  &--plain {
    background-color: transparent;
    color: $text-primary;
    font-weight: 500;
  }
}

/* ========== 垂直分割线的文字位置 ========== */
.xly-divider--vertical.xly-divider--horizontal {
  // 垂直分割线不支持内容
}

/* 垂直分割线不需要文字位置调整 */
.xly-divider--vertical .xly-divider__text {
  position: relative;
  transform: none;
  padding: 0 8px;
  top: auto;
  left: auto;
  right: auto;
}
</style>
