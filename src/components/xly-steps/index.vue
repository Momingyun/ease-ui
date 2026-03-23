<template>
  <div 
    class="xly-steps" 
    :class="[`xly-steps--${direction}`]"
    :style="customColorsStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, computed, useSlots, ref, onMounted, onUpdated } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'success' | 'error'

export interface StepsProps {
  /** 当前激活步骤（从 0 开始） */
  active?: number
  /** 方向 */
  direction?: 'horizontal' | 'vertical'
  /** 已完成步骤的状态 */
  finishStatus?: 'success' | 'finish'
  /** 当前步骤的状态 */
  processStatus?: 'process' | 'error'
  /** 是否居中对齐 */
  alignCenter?: boolean
  /** 自定义状态颜色 */
  color?: {
    primary?: string
    success?: string
    error?: string
    wait?: string
  }
}

const props = withDefaults(defineProps<StepsProps>(), {
  active: 0,
  direction: 'horizontal',
  finishStatus: 'success',
  processStatus: 'process',
  alignCenter: false,
})

const stepCount = ref(0)

// 计算自定义颜色样式
const customColorsStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.color?.primary) {
    style['--step-primary'] = props.color.primary
    style['--step-primary-light'] = hexToRgba(props.color.primary, 0.15)
    style['--step-shadow-primary'] = hexToRgba(props.color.primary, 0.25)
  }
  
  if (props.color?.success) {
    style['--step-success'] = props.color.success
    style['--step-success-light'] = hexToRgba(props.color.success, 0.15)
    style['--step-shadow-success'] = hexToRgba(props.color.success, 0.25)
  }
  
  if (props.color?.error) {
    style['--step-error'] = props.color.error
    style['--step-error-light'] = hexToRgba(props.color.error, 0.15)
    style['--step-shadow-error'] = hexToRgba(props.color.error, 0.25)
  }
  
  if (props.color?.wait) {
    style['--step-wait'] = props.color.wait
    style['--step-wait-bg'] = hexToRgba(props.color.wait, 0.2)
  }
  
  return style
})

// 辅助函数：hex颜色转rgba
function hexToRgba(hex: string, alpha: number): string {
  // 移除 # 号
  const cleanHex = hex.replace('#', '')
  
  // 处理简写格式 #rgb
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

provide('xly-steps', computed(() => ({
  active: props.active,
  direction: props.direction,
  finishStatus: props.finishStatus,
  processStatus: props.processStatus,
  alignCenter: props.alignCenter,
  stepCount: stepCount.value,
  color: props.color,
})))

provide('xly-steps-count', stepCount)
</script>

<style scoped>
.xly-steps {
  display: flex;
  width: 100%;
}

.xly-steps--horizontal {
  flex-direction: row;
}

.xly-steps--vertical {
  flex-direction: column;
}
</style>
