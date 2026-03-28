<template>
  <div class="xly-progress" :class="progressClass" :style="progressStyle">
    <!-- 线性进度条 -->
    <template v-if="type === 'line'">
      <div class="xly-progress__track" :style="trackStyle">
        <div class="xly-progress__bar" :style="barStyle">
          <div v-if="indeterminate" class="xly-progress__bar__animation"></div>
        </div>
      </div>

      <!-- 文本信息 -->
      <div v-if="showInfo" class="xly-progress__text">
        <span v-if="status === 'success'" class="xly-progress__status">
          <XlyIcon name="el:CircleCheck" />
        </span>
        <span v-else-if="status === 'exception'" class="xly-progress__status">
          <XlyIcon name="el:CircleClose" />
        </span>
        <span v-else-if="status === 'warning'" class="xly-progress__status">
          <XlyIcon name="el:Warning" />
        </span>
        <span v-else class="xly-progress__percentage">
          {{ text || `${displayPercentage}%` }}
        </span>
      </div>
    </template>

    <!-- 圆形进度条 -->
    <template v-else-if="type === 'circle'">
      <svg class="xly-progress__svg" viewBox="0 0 120 120" :width="circleSize" :height="circleSize">
        <!-- 轨道 -->
        <circle
          class="xly-progress__track"
          cx="60"
          cy="60"
          :r="radius"
          fill="none"
          :stroke="trackColorValue"
          :stroke-width="strokeWidth"
        />
        <!-- 进度 -->
        <circle
          class="xly-progress__bar"
          cx="60"
          cy="60"
          :r="radius"
          fill="none"
          :stroke="colorValue"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          :transform="`rotate(-90 60 60)`"
          :class="{ 'xly-progress__bar--animated': animated }"
        />
      </svg>

      <!-- 文本信息 -->
      <div v-if="showInfo" class="xly-progress__text">
        <span v-if="status === 'success'" class="xly-progress__status">
          <XlyIcon name="el:CircleCheck" />
        </span>
        <span v-else-if="status === 'exception'" class="xly-progress__status">
          <XlyIcon name="el:CircleClose" />
        </span>
        <span v-else-if="status === 'warning'" class="xly-progress__status">
          <XlyIcon name="el:Warning" />
        </span>
        <span v-else class="xly-progress__percentage">
          {{ text || `${displayPercentage}%` }}
        </span>
      </div>
    </template>

    <!-- 仪表盘进度条 -->
    <template v-else-if="type === 'dashboard'">
      <svg class="xly-progress__svg" viewBox="0 0 120 120" :width="circleSize" :height="circleSize">
        <!-- 轨道（半圆） -->
        <path
          class="xly-progress__track"
          d="M 10 60 A 50 50 0 1 1 110 60"
          fill="none"
          :stroke="trackColorValue"
          :stroke-width="strokeWidth"
          :stroke-linecap="round"
        />
        <!-- 进度（半圆） -->
        <path
          class="xly-progress__bar"
          d="M 10 60 A 50 50 0 1 1 110 60"
          fill="none"
          :stroke="colorValue"
          :stroke-width="strokeWidth"
          :stroke-dasharray="halfCircumference"
          :stroke-dashoffset="dashOffset"
          :stroke-linecap="round"
          :class="{ 'xly-progress__bar--animated': animated }"
        />
      </svg>

      <!-- 文本信息 -->
      <div v-if="showInfo" class="xly-progress__text">
        <span v-if="status === 'success'" class="xly-progress__status">
          <XlyIcon name="el:CircleCheck" />
        </span>
        <span v-else-if="status === 'exception'" class="xly-progress__status">
          <XlyIcon name="el:CircleClose" />
        </span>
        <span v-else-if="status === 'warning'" class="xly-progress__status">
          <XlyIcon name="el:Warning" />
        </span>
        <span v-else class="xly-progress__percentage">
          {{ text || `${displayPercentage}%` }}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import XlyIcon from '../xly-icon/index.vue'

defineOptions({ name: 'XlyProgress' })

type ProgressStatus = 'normal' | 'success' | 'exception' | 'warning' | 'active'
type ProgressType = 'line' | 'circle' | 'dashboard'

const props = withDefaults(defineProps<{
  /** 进度百分比（0-100） */
  percentage?: number
  /** 是否为不确定进度（动画效果） */
  indeterminate?: boolean
  /** 进度条状态 */
  status?: ProgressStatus
  /** 进度条类型 */
  type?: ProgressType
  /** 是否显示进度文字 */
  showInfo?: boolean
  /** 自定义文本 */
  text?: string
  /** 轨道高度（line 类型，单位 px） */
  strokeWidth?: number
  /** 进度条颜色 */
  color?: string | ((percentage: number) => string)
  /** 轨道背景色 */
  trackColor?: string
  /** 圆形进度条宽度（circle/dashboard 类型，单位 px） */
  circleSize?: number
  /** 是否开启环形进度条动画（circle/dashboard 类型） */
  animated?: boolean
  /** 自定义类名 */
  customClass?: string
}>(), {
  percentage: 0,
  indeterminate: false,
  status: 'normal',
  type: 'line',
  showInfo: true,
  text: '',
  strokeWidth: 6,
  color: '',
  trackColor: '',
  circleSize: 120,
  animated: true,
  customClass: '',
})

const emit = defineEmits<{
  (e: 'change', percentage: number): void
}>()

const displayPercentage = computed(() => {
  return Math.min(Math.max(props.percentage, 0), 100)
})

// 圆形进度条的半径
const radius = computed(() => 50 - props.strokeWidth / 2)

// 圆周长
const circumference = computed(() => 2 * Math.PI * radius.value)

// 半圆周长（仪表盘用）
const halfCircumference = computed(() => Math.PI * radius.value)

// 进度条偏移量
const dashOffset = computed(() => {
  const maxOffset = props.type === 'dashboard' ? halfCircumference.value : circumference.value
  return maxOffset - (displayPercentage.value / 100) * maxOffset
})

// 进度条颜色
const colorValue = computed(() => {
  if (props.status === 'success') return '#67c23a'
  if (props.status === 'exception') return '#f56c6c'
  if (props.status === 'warning') return '#e6a23c'
  if (typeof props.color === 'function') {
    return props.color(displayPercentage.value)
  }
  return props.color || '#4f6ef7'
})

// 轨道颜色
const trackColorValue = computed(() => {
  return props.trackColor || '#e8e8e8'
})

const progressClass = computed(() => [
  `xly-progress--${props.type}`,
  `xly-progress--status-${props.status}`,
  props.customClass,
])

const progressStyle = computed(() => {
  const style: Record<string, string> = {}
  return style
})

const trackStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.type === 'line' && props.trackColor) {
    style.backgroundColor = props.trackColor
  }
  if (props.type === 'line') {
    style.height = `${props.strokeWidth}px`
  }
  return style
})

const barStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.type === 'line' && !props.indeterminate) {
    style.width = `${displayPercentage.value}%`
  }
  if (props.type === 'line') {
    style.height = `${props.strokeWidth}px`
    style.backgroundColor = colorValue.value
  }
  return style
})
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$primary-color: #4f6ef7;
$success-color: #67c23a;
$warning-color: #e6a23c;
$danger-color: #f56c6c;
$track-color: #e8e8e8;
$text-color: #4b5563;

/* ========== 基础进度条 ========== */
.xly-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &--line {
    width: 100%;
  }

  &--circle,
  &--dashboard {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}

/* ========== 轨道（线性） ========== */
.xly-progress__track {
  flex: 1;
  background-color: $track-color;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  transition: height 0.3s ease;
}

/* ========== 进度条（线性） ========== */
.xly-progress__bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: $primary-color;
  border-radius: 999px;
  transition: width 0.3s ease, background-color 0.3s ease;

  &--animated {
    transition: stroke-dashoffset 0.3s ease;
  }

  .xly-progress--status-active & {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 20px 20px;
    animation: progress-stripe 1s linear infinite;
  }

  /* 不确定进度的动画 */
  &__animation {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: progress-indeterminate 2s ease-in-out infinite;
  }
}

/* ========== SVG 样式 ========== */
.xly-progress__svg {
  display: block;
}

.xly-progress--circle .xly-progress__track,
.xly-progress--circle .xly-progress__bar,
.xly-progress--dashboard .xly-progress__track,
.xly-progress--dashboard .xly-progress__bar {
  transition: stroke-dashoffset 0.3s ease, stroke 0.3s ease;
}

/* ========== 不确定进度动画 ========== */
@keyframes progress-stripe {
  0% {
    background-position: 20px 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* ========== 文本信息 ========== */
.xly-progress__text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: $text-color;
  font-weight: 500;
  white-space: nowrap;
  min-width: 40px;

  .xly-progress--line & {
    justify-content: flex-end;
  }

  .xly-progress--circle &,
  .xly-progress--dashboard & {
    position: absolute;
    font-size: 18px;
    font-weight: 600;
    justify-content: center;
    z-index: 1;
  }

  .xly-progress--dashboard & {
    bottom: 10%;
  }

  .xly-progress__status {
    display: flex;
    align-items: center;
    font-size: 16px;

    .xly-progress--status-success & {
      color: $success-color;
    }

    .xly-progress--status-exception & {
      color: $danger-color;
    }

    .xly-progress--status-warning & {
      color: $warning-color;
    }
  }

  .xly-progress__percentage {
    font-variant-numeric: tabular-nums;
  }
}
</style>
