<template>
  <div
    class="xly-info-card"
    :class="cardClass"
    :style="cardStyle"
    @click="handleClick"
  >
    <!-- 左侧图片 -->
    <div v-if="image" class="xly-info-card__image">
      <img :src="image" :alt="title" @error="handleImageError" />
    </div>

    <!-- 中间内容区 -->
    <div class="xly-info-card__content">
      <!-- 标题行：图标 + 标题 + 状态标签 -->
      <div class="xly-info-card__header">
        <div class="xly-info-card__title-wrap">
          <span v-if="icon" class="xly-info-card__icon" :style="iconStyle">
            <XlyIcon :name="icon" :size="iconSize" />
          </span>
          <span class="xly-info-card__title" :style="titleStyle">{{ title }}</span>
        </div>
        <span
          v-if="status"
          class="xly-info-card__status"
          :class="[`xly-info-card__status--${statusType}`]"
          :style="statusStyle"
        >
          {{ status }}
        </span>
      </div>

      <!-- 描述信息列表 -->
      <div class="xly-info-card__body">
        <div
          v-for="(item, index) in descriptionList"
          :key="index"
          class="xly-info-card__desc-item"
          :style="descStyle"
        >
          <XlyIcon
            v-if="item.icon"
            :name="item.icon"
            :size="12"
            class="xly-info-card__desc-icon"
            :style="descStyle"
          />
          <span v-else class="xly-info-card__desc-dot" :style="dotStyle" />
          <span class="xly-info-card__desc-text">{{ item.text }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧额外操作区 -->
    <div v-if="$slots.action" class="xly-info-card__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

export interface InfoCardDescItem {
  /** 描述文本 */
  text: string
  /** 前置图标（可选） */
  icon?: string
}

const props = withDefaults(
  defineProps<{
    /** 左侧图片地址 */
    image?: string
    /** 标题前的图标 */
    icon?: string
    /** 图标尺寸 */
    iconSize?: number
    /** 卡片标题 */
    title: string
    /** 描述信息，支持字符串数组或对象数组 */
    description?: string | string[] | InfoCardDescItem[]
    /** 状态标签文字 */
    status?: string
    /** 状态标签类型 */
    statusType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
    /** 自定义背景色 */
    backgroundColor?: string
    /** 自定义文字颜色 */
    textColor?: string
    /** 自定义标题颜色 */
    titleColor?: string
    /** 自定义描述文字颜色 */
    descriptionColor?: string
    /** 自定义状态标签背景色 */
    statusBackgroundColor?: string
    /** 自定义状态标签文字颜色 */
    statusTextColor?: string
    /** 是否可点击 */
    clickable?: boolean
    /** 是否显示边框 */
    bordered?: boolean
    /** 圆角大小 */
    radius?: number | string
  }>(),
  {
    image: '',
    icon: '',
    iconSize: 16,
    description: () => [],
    status: '',
    statusType: 'default',
    backgroundColor: '',
    textColor: '',
    titleColor: '',
    descriptionColor: '',
    statusBackgroundColor: '',
    statusTextColor: '',
    clickable: false,
    bordered: true,
    radius: 10,
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineOptions({
  name: 'XlyInfoCard',
})

// ============ 数据解析 ============

/** 统一描述信息为对象数组 */
const descriptionList = computed<InfoCardDescItem[]>(() => {
  const desc = props.description
  if (!desc) return []
  if (typeof desc === 'string') return [{ text: desc }]
  if (Array.isArray(desc)) {
    return desc.map((item) => {
      if (typeof item === 'string') return { text: item }
      return item
    })
  }
  return []
})

// ============ 样式计算 ============

const cardClass = computed(() => [
  {
    'is-clickable': props.clickable,
    'is-bordered': props.bordered,
  },
])

const cardStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.radius !== undefined) {
    style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius
  }
  return style
})

const titleStyle = computed(() => {
  if (props.titleColor) {
    return { color: props.titleColor }
  }
  if (props.textColor) {
    return { color: props.textColor }
  }
  return {}
})

const iconStyle = computed(() => {
  if (props.titleColor) {
    return { color: props.titleColor }
  }
  if (props.textColor) {
    return { color: props.textColor }
  }
  return {}
})

const descStyle = computed(() => {
  if (props.descriptionColor) {
    return { color: props.descriptionColor }
  }
  if (props.textColor) {
    return { color: props.textColor, opacity: '0.7' }
  }
  return {}
})

const dotStyle = computed(() => {
  if (props.descriptionColor) {
    return { backgroundColor: props.descriptionColor }
  }
  if (props.textColor) {
    return { backgroundColor: props.textColor }
  }
  return {}
})

const statusStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.statusBackgroundColor) {
    style.backgroundColor = props.statusBackgroundColor
  }
  if (props.statusTextColor) {
    style.color = props.statusTextColor
  }
  return style
})

// ============ 事件 ============

function handleClick(e: MouseEvent) {
  if (props.clickable) {
    emit('click', e)
  }
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$bg-default: #1e1e2e;
$bg-primary: rgba(59, 130, 246, 0.15);
$bg-success: rgba(16, 185, 129, 0.15);
$bg-warning: rgba(245, 158, 11, 0.15);
$bg-danger: rgba(239, 68, 68, 0.15);

$text-primary: #e4e4e7;
$text-secondary: #a1a1aa;
$text-muted: #71717a;

$border-color: rgba(255, 255, 255, 0.08);

$radius: 10px;
$radius-image: 6px;

/* ========== 卡片主体 ========== */
.xly-info-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  background: $bg-default;
  color: $text-primary;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: $radius;

  /* 边框 */
  &.is-bordered {
    border: 1px solid $border-color;
  }

  /* 可点击 */
  &.is-clickable {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

/* ========== 左侧图片 ========== */
.xly-info-card__image {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: $radius-image;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

/* ========== 中间内容区 ========== */
.xly-info-card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ========== 标题行 ========== */
.xly-info-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.xly-info-card__title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.xly-info-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: $text-primary;
}

.xly-info-card__title {
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ========== 状态标签 ========== */
.xly-info-card__status {
  flex-shrink: 0;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
  line-height: 1.4;

  &--default {
    background: rgba(255, 255, 255, 0.1);
    color: $text-secondary;
  }

  &--primary {
    background: $bg-primary;
    color: #60a5fa;
  }

  &--success {
    background: $bg-success;
    color: #34d399;
  }

  &--warning {
    background: $bg-warning;
    color: #fbbf24;
  }

  &--danger {
    background: $bg-danger;
    color: #f87171;
  }
}

/* ========== 描述信息 ========== */
.xly-info-card__body {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.xly-info-card__desc-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.4;
}

.xly-info-card__desc-icon {
  flex-shrink: 0;
  color: $text-muted;
}

.xly-info-card__desc-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $text-muted;
  flex-shrink: 0;
}

.xly-info-card__desc-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ========== 右侧操作区 ========== */
.xly-info-card__action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
</style>
