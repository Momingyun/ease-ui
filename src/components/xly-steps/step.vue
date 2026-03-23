<template>
  <div
    class="xly-step"
    :class="[
      `xly-step--${currentStatus}`,
      {
        'is-center': stepsData?.alignCenter,
        'is-vertical': stepsData?.direction === 'vertical',
        'is-last': isLast,
      },
    ]"
    :style="stepStyle"
  >
    <!-- 图标区域 -->
    <div class="xly-step__head">
      <div class="xly-step__icon-wrapper">
        <div class="xly-step__icon" :class="[`is-${currentStatus}`]">
          <!-- 自定义图标 -->
          <slot name="icon">
            <template v-if="props.icon">
              <XlyIcon :name="props.icon" :size="16" color="currentColor" />
            </template>
            <template v-else-if="currentStatus === 'success' || currentStatus === 'finish'">
              <XlyIcon name="el:Check" :size="16" color="currentColor" />
            </template>
            <template v-else-if="currentStatus === 'error'">
              <XlyIcon name="el:Close" :size="16" color="currentColor" />
            </template>
            <span v-else class="xly-step__number">{{ index + 1 }}</span>
          </slot>
        </div>
        <!-- 脉冲动画效果（仅进行中状态） -->
        <div v-if="currentStatus === 'process'" class="xly-step__pulse" />
      </div>
      <!-- 连接线 -->
      <div v-if="!isLast" class="xly-step__line" :class="[`is-${lineStatus}`]">
        <div class="xly-step__line-progress" :class="[`is-${lineStatus}`]" />
      </div>
    </div>
    <!-- 文字区域 -->
    <div class="xly-step__main">
      <div class="xly-step__title" :class="[`is-${currentStatus}`]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="xly-step__description" :class="[`is-${currentStatus}`]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

export interface StepProps {
  /** 步骤标题 */
  title?: string
  /** 步骤描述 */
  description?: string
  /** 手动指定状态 */
  status?: 'wait' | 'process' | 'finish' | 'success' | 'error'
  /** 步骤索引（自动计算，也可手动指定） */
  index?: number
  /** 自定义图标名称（支持 el: 前缀使用 Element Plus 图标） */
  icon?: string
}

const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
})

const stepsData = computed(() => stepsInfo?.value)

const stepsInfo = inject<ComputedRef<{
  active: number
  direction: string
  finishStatus: string
  processStatus: string
  alignCenter: boolean
  stepCount: number
  color?: {
    primary?: string
    success?: string
    error?: string
    wait?: string
  }
}>>('xly-steps')

const stepCount = inject<Ref<number>>('xly-steps-count')

// 计算步骤样式（颜色）
const stepStyle = computed(() => {
  const color = stepsData.value?.color
  if (!color) return {}
  
  const style: Record<string, string> = {}
  
  if (color.primary) {
    style['--step-primary'] = color.primary
    style['--step-primary-light'] = hexToRgba(color.primary, 0.15)
    style['--step-shadow-primary'] = hexToRgba(color.primary, 0.25)
  }
  
  if (color.success) {
    style['--step-success'] = color.success
    style['--step-success-light'] = hexToRgba(color.success, 0.15)
    style['--step-shadow-success'] = hexToRgba(color.success, 0.25)
  }
  
  if (color.error) {
    style['--step-error'] = color.error
    style['--step-error-light'] = hexToRgba(color.error, 0.15)
    style['--step-shadow-error'] = hexToRgba(color.error, 0.25)
  }
  
  if (color.wait) {
    style['--step-wait'] = color.wait
    style['--step-wait-bg'] = hexToRgba(color.wait, 0.2)
  }
  
  return style
})

// 辅助函数：hex颜色转rgba
function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '')
  let r: number, g: number, b: number
  
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16)
    g = parseInt(cleanHex[1] + cleanHex[1], 16)
    b = parseInt(cleanHex[2] + cleanHex[2], 16)
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16)
    g = parseInt(cleanHex.substring(2, 4), 16)
    b = parseInt(cleanHex.substring(4, 6), 16)
  }
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// 自动分配 index
const instanceIndex = computed(() => {
  if (props.index !== undefined) return props.index
  return autoIndex.value
})

const autoIndex = computed(() => {
  return props.index ?? 0
})

// 注册到父组件
onMounted(() => {
  if (stepCount) {
    stepCount.value++
  }
})

onUnmounted(() => {
  if (stepCount) {
    stepCount.value--
  }
})

const index = computed(() => props.index ?? 0)

const isLast = computed(() => {
  return stepsData.value ? index.value === stepsData.value.stepCount - 1 : false
})

const currentStatus = computed(() => {
  if (props.status) return props.status
  if (!stepsData.value) return 'wait'
  const { active, finishStatus, processStatus } = stepsData.value
  if (index.value < active) return finishStatus
  if (index.value === active) return processStatus
  return 'wait'
})

const lineStatus = computed(() => {
  if (!stepsData.value) return 'wait'
  const { active, finishStatus } = stepsData.value
  if (index.value < active) return finishStatus
  return 'wait'
})
</script>

<style scoped>
/* ========== CSS 变量（默认值） ========== */
.xly-step {
  --step-primary: #4f6ef7;
  --step-primary-light: #eef1ff;
  --step-success: #10b981;
  --step-success-light: #d1fae5;
  --step-error: #ef4444;
  --step-error-light: #fee2e2;
  --step-wait: #d1d5db;
  --step-wait-bg: #f3f4f6;
  --step-text: #1f2937;
  --step-text-secondary: #6b7280;
  --step-desc: #9ca3af;
  --step-shadow-primary: rgba(79, 110, 247, 0.25);
  --step-shadow-success: rgba(16, 185, 129, 0.25);
  --step-shadow-error: rgba(239, 68, 68, 0.25);
}

.xly-step {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.xly-step.is-vertical {
  flex-direction: row;
  flex: none;
}

.xly-step.is-last {
  flex: none;
}

/* ========== Head ========== */
.xly-step__head {
  display: flex;
  align-items: center;
  position: relative;
}

.is-vertical > .xly-step__head {
  flex-direction: column;
  width: auto;
}

/* ========== Icon Wrapper ========== */
.xly-step__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== Icon ========== */
.xly-step__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid var(--step-wait);
  color: var(--step-wait);
  background: #fff;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.xly-step__icon :deep(.xly-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.xly-step__icon.is-process {
  border-color: var(--step-primary);
  background: var(--step-primary);
  color: #fff;
  box-shadow: 0 0 0 4px var(--step-primary-light), 0 4px 12px var(--step-shadow-primary);
  transform: scale(1.05);
}

.xly-step__icon.is-success,
.xly-step__icon.is-finish {
  border-color: var(--step-success);
  background: var(--step-success);
  color: #fff;
  box-shadow: 0 0 0 4px var(--step-success-light), 0 2px 8px var(--step-shadow-success);
}

.xly-step__icon.is-error {
  border-color: var(--step-error);
  background: var(--step-error);
  color: #fff;
  box-shadow: 0 0 0 4px var(--step-error-light), 0 2px 8px var(--step-shadow-error);
}

.xly-step__number {
  line-height: 1;
}

/* ========== Pulse Animation ========== */
.xly-step__pulse {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--step-primary);
  opacity: 0.3;
  z-index: 1;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* ========== Line ========== */
.xly-step__line {
  flex: 1;
  height: 3px;
  margin: 0 12px;
  background: var(--step-wait-bg);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.xly-step__line-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.xly-step__line-progress.is-success,
.xly-step__line-progress.is-finish {
  width: 100%;
  background: linear-gradient(90deg, var(--step-success) 0%, #34d399 100%);
}

/* vertical line */
.is-vertical > .xly-step__head > .xly-step__line {
  width: 3px;
  height: 100%;
  min-height: 50px;
  flex: none;
  margin: 8px 0;
  position: absolute;
  left: 15px;
  top: 40px;
  border-radius: 2px;
}

.is-vertical > .xly-step__head > .xly-step__line-progress {
  width: 100%;
  height: 0;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-vertical > .xly-step__head > .xly-step__line-progress.is-success,
.is-vertical > .xly-step__head > .xly-step__line-progress.is-finish {
  height: 100%;
}

/* ========== Main ========== */
.xly-step__main {
  margin-top: 10px;
  white-space: nowrap;
}

.is-center > .xly-step__main {
  text-align: center;
}

.is-vertical > .xly-step__main {
  margin-top: 2px;
  margin-left: 14px;
  padding-bottom: 32px;
  white-space: normal;
  flex: 1;
}

/* ========== Title ========== */
.xly-step__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--step-text-secondary);
  transition: all 0.3s ease;
}

.xly-step__title.is-process {
  color: var(--step-primary);
  font-weight: 600;
}

.xly-step__title.is-success,
.xly-step__title.is-finish {
  color: var(--step-text);
  font-weight: 600;
}

.xly-step__title.is-error {
  color: var(--step-error);
  font-weight: 600;
}

/* ========== Description ========== */
.xly-step__description {
  font-size: 12px;
  color: var(--step-desc);
  margin-top: 4px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.xly-step__description.is-process {
  color: var(--step-text-secondary);
}

.xly-step__description.is-success,
.xly-step__description.is-finish {
  color: var(--step-text-secondary);
}

.xly-step__description.is-error {
  color: var(--step-error);
}

/* ========== Hover Effects ========== */
.xly-step:not(.is-last):hover .xly-step__icon {
  transform: scale(1.08);
}

.xly-step:hover .xly-step__title {
  color: var(--step-text);
}
</style>
