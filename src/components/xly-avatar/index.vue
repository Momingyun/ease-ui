<template>
  <div
    class="xly-avatar"
    :class="avatarClass"
    :style="avatarStyle"
    @click="handleClick"
  >
    <img
      v-if="(src || srcSet) && !hasLoadError"
      class="xly-avatar__image"
      :src="src"
      :srcset="srcSet"
      :alt="alt"
      @error="handleError"
    />
    <span v-else-if="isShowText" class="xly-avatar__text">
      <slot />
    </span>
    <span v-else class="xly-avatar__icon">
      <slot name="icon">
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type AvatarSize = 'small' | 'default' | 'large'
type AvatarShape = 'circle' | 'square'

const props = withDefaults(defineProps<{
  /** 图片地址 */
  src?: string
  /** 图片地址集合，用于响应式图片 */
  srcSet?: string
  /** 图片描述 */
  alt?: string
  /** 头像尺寸 */
  size?: AvatarSize | number | string
  /** 头像形状 */
  shape?: AvatarShape
  /** 头像背景色 */
  color?: string
  /** 图片填充模式 */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /** 自定义类名 */
  customClass?: string
}>(), {
  alt: '',
  size: 'default',
  shape: 'circle',
  color: '',
  fit: 'cover',
  customClass: '',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'error', event: Event): void
}>()

const hasLoadError = ref(false)

const isShowText = ref(false)

// 检测是否有默认插槽内容
const hasDefaultSlot = ref(false)

// 尝试检测默认插槽
try {
  // eslint-disable-next-line vue/require-slots-except-default
  const slots = defineSlots()
  hasDefaultSlot.value = !!slots.default?.()
} catch {
  hasDefaultSlot.value = false
}

const avatarClass = computed(() => [
  `xly-avatar--${props.size}`,
  `xly-avatar--${props.shape}`,
  props.customClass,
])

const avatarStyle = computed(() => {
  const style: Record<string, string> = {}

  // 尺寸处理
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
    style.fontSize = `${props.size / 2}px`
  } else if (typeof props.size === 'string' && !['small', 'default', 'large'].includes(props.size)) {
    style.width = props.size
    style.height = props.size
  }

  // 背景色
  if (props.color) {
    style.backgroundColor = props.color
  }

  // 图片填充模式
  style.objectFit = props.fit

  return style
})

function handleClick(e: MouseEvent) {
  emit('click', e)
}

function handleError(e: Event) {
  hasLoadError.value = true
  emit('error', e)
}
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$bg-default: #e8e8ed;
$text-default: #909399;
$text-primary: #1a1a2e;

/* ========== 基础头像 ========== */
.xly-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: $bg-default;
  color: $text-default;
  flex-shrink: 0;
  user-select: none;
  cursor: pointer;

  &--small {
    width: 32px;
    height: 32px;
    font-size: 12px;
    border-radius: 4px;
  }

  &--default {
    width: 40px;
    height: 40px;
    font-size: 14px;
    border-radius: 6px;
  }

  &--large {
    width: 56px;
    height: 56px;
    font-size: 18px;
    border-radius: 8px;
  }

  &--circle {
    border-radius: 50% !important;

    &.xly-avatar--small {
      border-radius: 16px !important;
    }
  }

  &--square {
    border-radius: 6px;
  }

  &:hover {
    .xly-avatar__image {
      transform: scale(1.05);
    }
  }
}

/* ========== 头像图片 ========== */
.xly-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* ========== 头像文字 ========== */
.xly-avatar__text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  font-weight: 500;
  color: inherit;
  line-height: 1;
}

/* ========== 头像图标 ========== */
.xly-avatar__icon {
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-default;
  opacity: 0.7;
}
</style>
