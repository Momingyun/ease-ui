<template>
  <div 
    v-if="visible" 
    class="xly-loading-wrapper"
    :class="wrapperClasses"
    :style="wrapperStyle"
  >
    <!-- 遮罩层 -->
    <div 
      v-if="mask" 
      class="xly-loading-mask"
      :style="maskStyle"
    ></div>
    
    <!-- 加载内容区域 -->
    <div class="xly-loading-content" :style="contentStyle">
      <!-- 加载动画 -->
      <div class="xly-loading-spinner" :class="spinnerClasses" :style="spinnerStyle">
        <!-- 旋转圆圈 -->
        <template v-if="type === 'spinner'">
          <div class="spinner-circle">
            <div 
              v-for="i in 8" 
              :key="i" 
              class="spinner-dot"
              :style="getDotStyle(i)"
            ></div>
          </div>
        </template>
        
        <!-- 波浪效果 -->
        <template v-else-if="type === 'wave'">
          <div class="wave-container">
            <div 
              v-for="i in 5" 
              :key="i" 
              class="wave-bar"
              :style="getWaveStyle(i)"
            ></div>
          </div>
        </template>
        
        <!-- 脉冲效果 -->
        <template v-else-if="type === 'pulse'">
          <div class="pulse-circle"></div>
        </template>
        
        <!-- 环形进度 -->
        <template v-else-if="type === 'ring'">
          <div class="ring-container">
            <svg class="ring-svg" viewBox="0 0 50 50">
              <circle 
                class="ring-bg" 
                cx="25" 
                cy="25" 
                r="20" 
                :stroke="backgroundColor"
                stroke-width="4"
                fill="none"
              />
              <circle 
                class="ring-progress" 
                cx="25" 
                cy="25" 
                r="20" 
                :stroke="color"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
              />
            </svg>
          </div>
        </template>
        
        <!-- 默认双点动画 -->
        <template v-else>
          <div class="default-spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
          </div>
        </template>
      </div>
      
      <!-- 加载文本 -->
      <div 
        v-if="text" 
        class="xly-loading-text"
        :style="{ color: textColor }"
      >
        {{ text }}
      </div>
      
      <!-- 自定义插槽内容 -->
      <div v-if="$slots.default" class="xly-loading-custom">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'XlyLoading'
})

export interface LoadingProps {
  /** 是否显示加载 */
  modelValue?: boolean
  /** 加载类型: spinner-旋转点 | wave-波浪 | pulse-脉冲 | ring-环形进度 | default-双点 */
  type?: 'spinner' | 'wave' | 'pulse' | 'ring' | 'default'
  /** 加载文本 */
  text?: string
  /** 是否显示遮罩 */
  mask?: boolean
  /** 遮罩颜色 */
  maskColor?: string
  /** 加载颜色 */
  color?: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 文本颜色 */
  textColor?: string
  /** 大小: small-24px | medium-32px | large-48px | 自定义数字 */
  size?: 'small' | 'medium' | 'large' | number
  /** 是否全屏 */
  fullscreen?: boolean
  /** 是否锁定滚动 */
  lock?: boolean
  /** 是否容器内全屏（相对于父容器）*/
  containerFullscreen?: boolean
  /** 是否在遮罩层上显示（用于弹窗等场景）*/
  overlayMode?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 环形进度百分比 (0-100) */
  progress?: number
}

const props = withDefaults(defineProps<LoadingProps>(), {
  modelValue: false,
  type: 'spinner',
  text: '',
  mask: true,
  maskColor: 'rgba(255, 255, 255, 0.3)',
  color: '#4f6ef7',
  backgroundColor: 'transparent',
  textColor: '#1f2937',
  size: 'medium',
  fullscreen: false,
  lock: false,
  containerFullscreen: false,
  overlayMode: false,
  customClass: '',
  progress: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// 响应式数据
const visible = ref(props.modelValue)
const bodyOverflow = ref('')

// 计算属性
const wrapperClasses = computed(() => [
  'xly-loading',
  `xly-loading--${props.type}`,
  `xly-loading--${getSizeClass()}`,
  {
    'is-fullscreen': props.fullscreen,
    'is-container-fullscreen': props.containerFullscreen,
    'is-overlay-mode': props.overlayMode,
    'is-lock': props.lock,
    'is-visible': visible.value
  },
  props.customClass
])

const wrapperStyle = computed(() => ({
  zIndex: props.fullscreen ? 9999 : props.containerFullscreen ? 1000 : undefined
}))

const contentStyle = computed(() => ({
  color: props.textColor
}))

const maskStyle = computed(() => ({
  backgroundColor: props.maskColor
}))

const spinnerClasses = computed(() => [
  'xly-loading-spinner',
  `spinner--${props.type}`
])

const spinnerStyle = computed(() => {
  const size = getSizeValue()
  return {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    '--spinner-color': props.color,
    '--spinner-bg-color': props.backgroundColor
  } as Record<string, string | number>
})

const circumference = computed(() => 2 * Math.PI * 20)
const progressOffset = computed(() => {
  const progress = Math.max(0, Math.min(100, props.progress))
  return circumference.value * (1 - progress / 100)
})

// 方法
function getSizeClass(): string {
  if (typeof props.size === 'string') {
    return props.size
  }
  if (props.size <= 20) return 'small'
  if (props.size <= 40) return 'medium'
  return 'large'
}

function getSizeValue(): number {
  if (typeof props.size === 'number') {
    return props.size
  }
  const sizes = { small: 24, medium: 32, large: 48 }
  return sizes[props.size] || sizes.medium
}

function getDotStyle(index: number) {
  return {
    animationDelay: `${(index - 1) * 0.1}s`,
    backgroundColor: props.color
  }
}

function getWaveStyle(index: number) {
  return {
    animationDelay: `${(index - 1) * 0.1}s`,
    backgroundColor: props.color
  }
}

function lockScroll() {
  if (props.lock && props.fullscreen) {
    bodyOverflow.value = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

function unlockScroll() {
  if (props.lock && props.fullscreen) {
    document.body.style.overflow = bodyOverflow.value
  }
}

// 监听器
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
  if (val) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

// 生命周期
onMounted(() => {
  if (props.modelValue) {
    lockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})

// 暴露方法
defineExpose({
  show: () => { visible.value = true },
  hide: () => { visible.value = false },
  toggle: () => { visible.value = !visible.value }
})
</script>

<style scoped lang="scss">
.xly-loading-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }
  
  &.is-container-fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  
  &.is-overlay-mode {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
  }
  
  &.is-lock {
    touch-action: none;
  }
}

.xly-loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(1px);
}

.xly-loading-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

// 旋转圆圈动画
.spinner-circle {
  position: relative;
  width: 100%;
  height: 100%;
  
  .spinner-dot {
    position: absolute;
    top: 0;
    left: 50%;
    width: 20%;
    height: 20%;
    background-color: var(--spinner-color);
    border-radius: 50%;
    transform-origin: 0 250%;
    animation: spinner-rotate 1s linear infinite;
  }
}

@keyframes spinner-rotate {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  100% {
    opacity: 0.2;
    transform: rotate(360deg);
  }
}

// 波浪动画
.wave-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  gap: 2px;
  
  .wave-bar {
    width: 4px;
    height: 100%;
    background-color: var(--spinner-color);
    border-radius: 2px;
    animation: wave 1.2s ease-in-out infinite;
  }
}

@keyframes wave {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

// 脉冲动画
.pulse-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--spinner-color);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

// 环形进度
.ring-container {
  width: 100%;
  height: 100%;
  
  .ring-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  
  .ring-bg {
    stroke: var(--spinner-bg-color);
  }
  
  .ring-progress {
    transition: stroke-dashoffset 0.3s ease;
  }
}

// 默认双点动画
.default-spinner {
  position: relative;
  width: 100%;
  height: 100%;
  
  .dot1, .dot2 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25%;
    height: 25%;
    background-color: var(--spinner-color);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: bounce 2s infinite ease-in-out;
  }
  
  .dot2 {
    animation-delay: -1s;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

// 文本样式
.xly-loading-text {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  max-width: 200px;
  word-break: break-word;
}

// 尺寸变体
.xly-loading--small {
  .xly-loading-spinner {
    width: 24px;
    height: 24px;
  }
  
  .xly-loading-text {
    font-size: 12px;
  }
}

.xly-loading--medium {
  .xly-loading-spinner {
    width: 32px;
    height: 32px;
  }
}

.xly-loading--large {
  .xly-loading-spinner {
    width: 48px;
    height: 48px;
  }
  
  .xly-loading-text {
    font-size: 16px;
  }
}

// 过渡动画
.xly-loading-wrapper {
  transition: opacity 0.3s ease;
  
  &:not(.is-visible) {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
