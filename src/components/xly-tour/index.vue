<template>
  <Teleport to="body">
    <!-- 遮罩层 -->
    <div
      v-if="visible && steps.length > 0 && currentStep"
      class="xly-tour-overlay"
      :style="overlayStyle"
      @click.self="onOverlayClick"
    >
      <!-- 高亮区域 -->
      <div
        v-if="showMask"
        class="xly-tour-highlight"
        :class="{ 'is-round': currentStep.highlightRadius }"
        :style="highlightStyle"
      ></div>
    </div>

    <!-- 气泡卡片：始终在 visible 时渲染，用 opacity/visibility 控制显隐 -->
    <div
      v-show="visible && steps.length > 0 && currentStep"
      ref="popoverRef"
      class="xly-tour-popover"
      :class="[
        `xly-tour-popover--${effectivePlacement}`,
        { 'is-arrow-hidden': !showArrow, 'is-visible': positionReady }
      ]"
      :style="popoverStyle"
    >
      <!-- 箭头 -->
      <div v-if="showArrow && positionReady" class="xly-tour-arrow"></div>

      <!-- 内容区 -->
      <div class="xly-tour-content">
        <!-- 标题栏 -->
        <div v-if="currentStep.title" class="xly-tour-header">
          <div class="xly-tour-title">
            <span class="xly-tour-title__text">{{ currentStep.title }}</span>
            <span v-if="showStepIndex" class="xly-tour-title__index">
              {{ current + 1 }} / {{ total }}
            </span>
          </div>
          <button v-if="showClose" class="xly-tour-close" @click="handleClose">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 描述内容 -->
        <div class="xly-tour-body">
          <p v-if="currentStep.description" class="xly-tour-description">{{ currentStep.description }}</p>
          <slot :current="current" :step="currentStep" :total="total"></slot>
        </div>

        <!-- 底部操作栏 -->
        <div class="xly-tour-footer">
          <div class="xly-tour-footer__left">
            <slot name="prev" :current="current" :step="currentStep" :total="total">
              <button
                v-if="showPrev"
                class="xly-tour-btn xly-tour-btn--default"
                @click="handlePrev"
              >
                {{ prevText }}
              </button>
            </slot>
          </div>
          <div class="xly-tour-footer__right">
            <slot name="next" :current="current" :step="currentStep" :total="total">
              <button
                v-if="isLast"
                class="xly-tour-btn xly-tour-btn--primary"
                @click="handleFinish"
              >
                {{ finishText }}
              </button>
              <button
                v-else
                class="xly-tour-btn xly-tour-btn--primary"
                @click="handleNext"
              >
                {{ nextText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onUnmounted,
  nextTick,
  isRef,
  unref
} from 'vue'

defineOptions({ name: 'XlyTour' })

/** 步骤配置 */
export interface TourStep {
  /** 目标元素选择器或 DOM 元素 */
  target: string | HTMLElement
  /** 标题 */
  title?: string
  /** 描述文本 */
  description?: string
  /** 气泡位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** 气泡与目标间距 (px) */
  gap?: number
  /** 是否高亮该元素 */
  highlight?: boolean
  /** 高亮圆角 */
  highlightRadius?: number
  /** 是否可跳过该步骤（点击遮罩时） */
  allowSkip?: boolean
}

export interface TourProps {
  /** 是否显示引导 */
  modelValue?: boolean
  /** 步骤列表 */
  steps?: TourStep[]
  /** 默认气泡位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** 气泡与目标间距 (px) */
  gap?: number
  /** 是否显示遮罩 */
  mask?: boolean
  /** 遮罩颜色 */
  maskColor?: string
  /** 是否显示箭头 */
  arrow?: boolean
  /** 是否显示关闭按钮 */
  closeBtn?: boolean
  /** 是否显示步骤索引 */
  showIndex?: boolean
  /** 是否显示上一步按钮 */
  prevBtn?: boolean
  /** "下一步"文字 */
  nextText?: string
  /** "上一步"文字 */
  prevText?: string
  /** "完成"文字 */
  finishText?: string
  /** 起始步骤 (0-indexed) */
  startStep?: number
  /** 主题色 */
  color?: string
  /** 点击遮罩是否关闭 */
  closeOnOverlay?: boolean
  /** 气泡最大宽度 */
  maxWidth?: number | string
  /** 自动滚动到目标元素 */
  scrollIntoView?: boolean
  /** 滚动行为 */
  scrollBehavior?: 'auto' | 'smooth' | 'instant'
  /** z-index */
  zIndex?: number
}

const props = withDefaults(defineProps<TourProps>(), {
  modelValue: false,
  steps: () => [],
  placement: 'bottom',
  gap: 12,
  mask: true,
  maskColor: 'rgba(0, 0, 0, 0.45)',
  arrow: true,
  closeBtn: true,
  showIndex: true,
  prevBtn: true,
  nextText: '下一步',
  prevText: '上一步',
  finishText: '完成',
  startStep: 0,
  color: '#4f6ef7',
  closeOnOverlay: true,
  maxWidth: 360,
  scrollIntoView: true,
  scrollBehavior: 'smooth',
  zIndex: 9000
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', current: number): void
  (e: 'finish'): void
  (e: 'close'): void
  (e: 'skip'): void
  (e: 'next', current: number): void
  (e: 'prev', current: number): void
}>()

const visible = ref(false)
const current = ref(props.startStep)
const popoverRef = ref<HTMLElement | null>(null)
const targetRect = ref<DOMRect | null>(null)
const effectivePlacement = ref(props.placement)
const positionReady = ref(false)
const popoverTop = ref(0)
const popoverLeft = ref(0)
let resizeObserver: ResizeObserver | null = null
let scrollParentHandler: (() => void) | null = null

const total = computed(() => props.steps.length)
const currentStep = computed(() => props.steps[current.value] || null)
const isLast = computed(() => current.value >= total.value - 1)
const isFirst = computed(() => current.value === 0)
const showPrev = computed(() => props.prevBtn && !isFirst.value)
const showArrow = computed(() => props.arrow)
const showMask = computed(() => props.mask && currentStep.value?.highlight !== false && !!targetRect.value)
const showClose = computed(() => props.closeBtn)
const showStepIndex = computed(() => props.showIndex && total.value > 1)

const overlayStyle = computed(() => ({
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: props.zIndex,
  pointerEvents: props.closeOnOverlay ? 'auto' as const : 'none' as const
}))

const highlightStyle = computed(() => {
  if (!targetRect.value) return { display: 'none' }
  const r = targetRect.value
  const radius = currentStep.value?.highlightRadius || 0
  return {
    position: 'fixed' as const,
    top: `${r.top - 4}px`,
    left: `${r.left - 4}px`,
    width: `${r.width + 8}px`,
    height: `${r.height + 8}px`,
    borderRadius: radius ? `${radius}px` : '4px',
    boxShadow: `0 0 0 9999px ${props.maskColor}`,
    zIndex: props.zIndex + 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none'
  }
})

const popoverStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${popoverTop.value}px`,
  left: `${popoverLeft.value}px`,
  zIndex: props.zIndex + 2,
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
  '--tour-color': props.color,
  opacity: positionReady.value ? 1 : 0,
  visibility: positionReady.value ? 'visible' as const : 'hidden' as const,
  transition: positionReady.value ? 'top 0.25s cubic-bezier(0.4, 0, 0.2, 1), left 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease' : 'none'
}))

/** 获取目标元素 */
function getTargetElement(step: TourStep): HTMLElement | null {
  if (!step) return null
  let target = step.target as any
  // 用 Vue 的 unref 自动解包 ref 对象
  if (isRef(target)) {
    target = unref(target)
  }
  if (target instanceof HTMLElement) return target
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  return null
}

let updateTimer: ReturnType<typeof setTimeout> | null = null

/** 更新弹窗位置 */
function updatePosition(shouldScroll = true) {
  if (updateTimer) {
    clearTimeout(updateTimer)
    updateTimer = null
  }
  if (!currentStep.value || !visible.value || !popoverRef.value) {
    positionReady.value = false
    return
  }

  const target = getTargetElement(currentStep.value)
  if (!target) {
    positionReady.value = false
    return
  }

  // 滚动到可视区域（仅步骤切换时）
  if (shouldScroll && props.scrollIntoView) {
    target.scrollIntoView({ behavior: props.scrollBehavior, block: 'center', inline: 'center' })
  }

  // 等待滚动完成后再计算位置
  const delay = (shouldScroll && props.scrollIntoView) ? (props.scrollBehavior === 'smooth' ? 400 : 80) : 0
  updateTimer = setTimeout(() => {
    updateTimer = null
    doPositionCalculation(target)
  }, delay)
}

/** 实际执行位置计算 */
function doPositionCalculation(target: HTMLElement) {
  if (!popoverRef.value || !visible.value) return

  const rect = target.getBoundingClientRect()
  targetRect.value = rect

  const popoverRect = popoverRef.value.getBoundingClientRect()
  // 弹窗还没尺寸（首次渲染可能 0），再等一帧
  if (popoverRect.width === 0 && popoverRect.height === 0) {
    nextTick(() => doPositionCalculation(target))
    return
  }

  const gap = currentStep.value?.gap ?? props.gap
  const placement = currentStep.value?.placement || props.placement

  effectivePlacement.value = placement

  const pos = calculatePosition(rect, popoverRect, placement, gap)

  // 设置位置（通过 ref，由 Vue 响应式更新 style）
  popoverTop.value = pos.top
  popoverLeft.value = pos.left

  // 标记位置就绪，显示弹窗
  positionReady.value = true
}

/** 计算弹窗位置 */
function calculatePosition(
  tRect: DOMRect,
  pRect: DOMRect,
  placement: string,
  gap: number
): { top: number; left: number } {
  const { top, left, width, height } = tRect
  const vw = window.innerWidth
  const vh = window.innerHeight

  // 检查是否有足够空间，不够则翻转
  let p = placement
  const space = {
    top: top - gap,
    bottom: vh - (top + height) - gap,
    left: left - gap,
    right: vw - (left + width) - gap
  }

  if (p === 'top' && space.top < pRect.height && space.bottom >= pRect.height) p = 'bottom'
  else if (p === 'bottom' && space.bottom < pRect.height && space.top >= pRect.height) p = 'top'
  else if (p === 'left' && space.left < pRect.width && space.right >= pRect.width) p = 'right'
  else if (p === 'right' && space.right < pRect.width && space.left >= pRect.width) p = 'left'

  effectivePlacement.value = p as any

  let resultTop = 0
  let resultLeft = 0

  switch (p) {
    case 'top':
      resultTop = top - pRect.height - gap
      resultLeft = left + (width - pRect.width) / 2
      break
    case 'bottom':
      resultTop = top + height + gap
      resultLeft = left + (width - pRect.width) / 2
      break
    case 'left':
      resultTop = top + (height - pRect.height) / 2
      resultLeft = left - pRect.width - gap
      break
    case 'right':
      resultTop = top + (height - pRect.height) / 2
      resultLeft = left + width + gap
      break
  }

  // 边界约束
  resultLeft = Math.max(12, Math.min(resultLeft, vw - pRect.width - 12))
  resultTop = Math.max(12, Math.min(resultTop, vh - pRect.height - 12))

  return { top: resultTop, left: resultLeft }
}

/** 开始监听 */
function startObserving() {
  stopObserving()

  resizeObserver = new ResizeObserver(() => updatePosition(false))
  resizeObserver.observe(document.body)

  scrollParentHandler = () => updatePosition(false)
  window.addEventListener('scroll', scrollParentHandler, true)
  window.addEventListener('resize', scrollParentHandler)
}

function stopObserving() {
  if (updateTimer) {
    clearTimeout(updateTimer)
    updateTimer = null
  }
  resizeObserver?.disconnect()
  resizeObserver = null
  if (scrollParentHandler) {
    window.removeEventListener('scroll', scrollParentHandler, true)
    window.removeEventListener('resize', scrollParentHandler)
    scrollParentHandler = null
  }
}

/** 事件处理 */
function handleNext() {
  if (current.value < total.value - 1) {
    emit('next', current.value)
    current.value++
    emit('change', current.value)
    positionReady.value = false
    // 等两帧：第一帧更新 DOM（标题/描述变化），第二帧弹窗尺寸稳定后再定位
    nextTick(() => nextTick(() => updatePosition()))
  }
}

function handlePrev() {
  if (current.value > 0) {
    emit('prev', current.value)
    current.value--
    emit('change', current.value)
    positionReady.value = false
    nextTick(() => nextTick(() => updatePosition()))
  }
}

function handleFinish() {
  visible.value = false
  positionReady.value = false
  stopObserving()
  targetRect.value = null
  emit('update:modelValue', false)
  emit('finish')
}

function handleClose() {
  visible.value = false
  positionReady.value = false
  stopObserving()
  targetRect.value = null
  emit('update:modelValue', false)
  emit('close')
}

function onOverlayClick() {
  if (props.closeOnOverlay) {
    visible.value = false
    positionReady.value = false
    stopObserving()
    targetRect.value = null
    emit('update:modelValue', false)
    emit('skip')
  }
}

/** 监听外部 v-model */
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    current.value = Math.min(props.startStep, total.value - 1)
    positionReady.value = false
    // 等两帧确保弹窗渲染完成
    nextTick(() => nextTick(() => {
      updatePosition()
      startObserving()
    }))
  } else {
    stopObserving()
    positionReady.value = false
    targetRect.value = null
  }
})

watch(() => props.steps, () => {
  if (visible.value) {
    positionReady.value = false
    nextTick(() => nextTick(() => updatePosition()))
  }
}, { deep: true })

/** 暴露方法 */
defineExpose({
  start: (stepIndex = 0) => {
    current.value = stepIndex
    visible.value = true
    emit('update:modelValue', true)
    positionReady.value = false
    nextTick(() => nextTick(() => {
      updatePosition()
      startObserving()
    }))
  },
  next: handleNext,
  prev: handlePrev,
  goTo: (index: number) => {
    if (index >= 0 && index < total.value) {
      current.value = index
      emit('change', current.value)
      positionReady.value = false
      nextTick(() => nextTick(() => updatePosition()))
    }
  },
  finish: handleFinish,
  close: handleClose,
  updatePosition
})

onUnmounted(() => {
  stopObserving()
})
</script>

<style scoped lang="scss">
/* 遮罩层 */
.xly-tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
}

/* 高亮区域 */
.xly-tour-highlight {
  position: fixed;
  border-radius: 4px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.45);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 9001;

  &.is-round {
    border-radius: 50%;
  }
}

/* 气泡卡片 */
.xly-tour-popover {
  position: fixed;
  z-index: 9002;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 10px 20px 2px rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.06);
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 360px;
  transform: scale(0.96);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;

  &.is-visible {
    transform: scale(1);
  }

  .xly-tour-content {
    padding: 16px 20px 12px;
  }
}

/* 箭头 */
.xly-tour-arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  transform: rotate(45deg);
  z-index: 1;
}

.xly-tour-popover--bottom .xly-tour-arrow {
  top: -5px;
  left: 50%;
  margin-left: -5px;
}

.xly-tour-popover--top .xly-tour-arrow {
  bottom: -5px;
  left: 50%;
  margin-left: -5px;
}

.xly-tour-popover--left .xly-tour-arrow {
  right: -5px;
  top: 50%;
  margin-top: -5px;
}

.xly-tour-popover--right .xly-tour-arrow {
  left: -5px;
  top: 50%;
  margin-top: -5px;
}

.is-arrow-hidden .xly-tour-arrow {
  display: none;
}

/* 标题栏 */
.xly-tour-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.xly-tour-title {
  display: flex;
  align-items: center;
  gap: 8px;

  &__text {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  }

  &__index {
    font-size: 12px;
    font-weight: 500;
    color: var(--tour-color, #4f6ef7);
    background: color-mix(in srgb, var(--tour-color, #4f6ef7) 10%, transparent);
    padding: 1px 8px;
    border-radius: 10px;
    line-height: 20px;
    white-space: nowrap;
  }
}

.xly-tour-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
}

/* 描述内容 */
.xly-tour-body {
  margin-bottom: 16px;
}

.xly-tour-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* 底部操作栏 */
.xly-tour-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.xly-tour-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.4;
  white-space: nowrap;

  &--default {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }

  &--primary {
    background: var(--tour-color, #4f6ef7);
    color: #fff;

    &:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
