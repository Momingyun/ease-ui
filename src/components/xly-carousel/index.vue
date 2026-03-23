<template>
  <div
    class="xly-carousel"
    :class="{
      'xly-carousel--vertical': direction === 'vertical',
      'xly-carousel--3d': mode === '3d',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 轮播容器 -->
    <div class="xly-carousel__container" ref="containerRef" :style="containerStyle">
      <!-- ===== 普通模式 ===== -->
      <TransitionGroup
        v-if="mode === 'slide'"
        :name="transitionName"
        tag="div"
        class="xly-carousel__track"
      >
        <div
          v-for="(item, index) in items"
          :key="itemKey ? item[itemKey] : index"
          class="xly-carousel__item"
          :class="{ 'is-active': index === currentIndex }"
          v-show="index === currentIndex"
        >
          <slot name="item" :item="item" :index="index">
            <img
              v-if="typeof item === 'string'"
              :src="item"
              :alt="'carousel-' + index"
              class="xly-carousel__img"
            />
            <img
              v-else-if="(item as Record<string, unknown>).src"
              :src="(item as Record<string, unknown>).src as string"
              :alt="'carousel-' + index"
              class="xly-carousel__img"
            />
            <div v-else class="xly-carousel__custom-item">
              {{ item }}
            </div>
          </slot>
        </div>
      </TransitionGroup>

      <!-- ===== 3D 模式 ===== -->
      <div v-else-if="mode === '3d'" class="xly-carousel__perspective">
        <div class="xly-carousel__3d-track" :style="track3dStyle">
          <div
            v-for="(item, index) in items"
            :key="itemKey ? item[itemKey] : index"
            class="xly-carousel__3d-item"
            :class="{
              'is-active': index === currentIndex,
              'is-prev': index === prevIndex,
            }"
            :style="getItem3dStyle(index)"
          >
            <slot name="item" :item="item" :index="index">
              <img
                v-if="typeof item === 'string'"
                :src="item"
                :alt="'carousel-' + index"
                class="xly-carousel__img"
              />
              <img
                v-else-if="(item as Record<string, unknown>).src"
                :src="(item as Record<string, unknown>).src as string"
                :alt="'carousel-' + index"
                class="xly-carousel__img"
              />
              <div v-else class="xly-carousel__custom-item">
                {{ item }}
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div v-if="showTitle && currentTitle" class="xly-carousel__title">
      <slot name="title" :item="items[currentIndex]" :index="currentIndex">
        <span class="xly-carousel__title-text">{{ currentTitle }}</span>
        <span v-if="showCounter" class="xly-carousel__counter">
          {{ currentIndex + 1 }} / {{ items.length }}
        </span>
      </slot>
    </div>

    <!-- 左右箭头 -->
    <template v-if="showArrows && arrow !== 'never'">
      <button
        class="xly-carousel__arrow xly-carousel__arrow--left"
        :class="{ 'is-hidden': arrow === 'hover' && !isHovering }"
        @click="prev"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        class="xly-carousel__arrow xly-carousel__arrow--right"
        :class="{ 'is-hidden': arrow === 'hover' && !isHovering }"
        @click="next"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </template>

    <!-- 指示器 -->
    <div
      v-if="showDots"
      class="xly-carousel__dots"
      :class="[
        `xly-carousel__dots--${dotPosition}`,
        { 'xly-carousel__dots--number': dotType === 'number' },
      ]"
    >
      <template v-if="dotType === 'number'">
        <!-- 数字指示器 -->
        <div class="xly-carousel__number">
          <button class="xly-carousel__number-btn" @click="prev">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span class="xly-carousel__number-current">{{
            String(currentIndex + 1)
          }}</span>
          <span class="xly-carousel__number-sep">/</span>
          <span class="xly-carousel__number-total">{{
            String(items.length)
          }}</span>
          <button class="xly-carousel__number-btn" @click="next">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </template>
      <template v-else>
        <!-- 圆点 / 线条 指示器 -->
        <button
          v-for="(_, index) in items"
          :key="index"
          class="xly-carousel__dot"
          :class="{
            'is-active': index === currentIndex,
            [`xly-carousel__dot--${dotType}`]: true,
          }"
          @click="goTo(index)"
        >
          <span v-if="dotType === 'line'" class="xly-carousel__dot-inner"></span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/** 轮播模式 */
type CarouselMode = 'slide' | '3d'
/** 轮播方向 */
type CarouselDirection = 'horizontal' | 'vertical'
/** 箭头显示策略 */
type ArrowDisplay = 'always' | 'hover' | 'never'
/** 指示器位置 */
type DotPosition = 'bottom' | 'left' | 'right'
/** 指示器类型 */
type DotType = 'dot' | 'line' | 'number'

const props = withDefaults(
  defineProps<{
    /** 轮播数据列表，支持图片 URL 字符串或任意对象 */
    items: (string | Record<string, any>)[]
    /** 轮播模式：slide（滑动）或 3d（3D 透视） */
    mode?: CarouselMode
    /** 自动播放间隔（毫秒），0 表示不自动播放 */
    interval?: number
    /** 是否循环播放 */
    loop?: boolean
    /** 轮播方向 */
    direction?: CarouselDirection
    /** 箭头显示策略 */
    arrow?: ArrowDisplay
    /** 指示器位置 */
    dotPosition?: DotPosition
    /** 指示器样式类型 */
    dotType?: DotType
    /** 是否显示指示器 */
    showDots?: boolean
    /** 是否显示箭头 */
    showArrows?: boolean
    /** 数据中用作唯一 key 的字段名 */
    itemKey?: string
    /** 是否在鼠标悬停时暂停自动播放 */
    pauseOnHover?: boolean
    /** 初始索引 */
    initialIndex?: number
    /** 是否显示标题（取 items 中的 title 字段，或通过 #title 插槽自定义） */
    showTitle?: boolean
    /** 是否在标题旁显示计数器（当前/总数） */
    showCounter?: boolean
    /** 标题字段名，当 items 为对象数组时，从中读取标题文本 */
    titleField?: string
    /** 轮播容器高度，支持 CSS 值如 '200px'、'40vh'、'300' */
    height?: number | string
  }>(),
  {
    mode: 'slide',
    interval: 3000,
    loop: true,
    direction: 'horizontal',
    arrow: 'hover',
    dotPosition: 'bottom',
    dotType: 'dot',
    showDots: true,
    showArrows: true,
    itemKey: undefined,
    pauseOnHover: true,
    initialIndex: 0,
    showTitle: false,
    showCounter: false,
    titleField: 'title',
    height: undefined,
  },
)

const emit = defineEmits<{
  (e: 'change', index: number, prevIndex: number): void
}>()

const currentIndex = ref(props.initialIndex)
const prevIndex = ref(0)
const isHovering = ref(false)
const containerRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null
let slideDirection = ref<'forward' | 'backward'>('forward')

// ===== 计算属性 =====

const transitionName = computed(() => {
  const prefix = props.direction === 'vertical' ? 'xly-slide-v' : 'xly-slide'
  return slideDirection.value === 'forward' ? `${prefix}-forward` : `${prefix}-backward`
})

/** 当前标题文本 */
const currentTitle = computed(() => {
  const item = props.items[currentIndex.value]
  if (typeof item === 'string') return ''
  return ((item as Record<string, unknown>)[props.titleField] as string) || ''
})

/** 容器自定义高度样式 */
const containerStyle = computed(() => {
  if (!props.height) return undefined
  const val = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { height: val }
})

/** 3D 模式轨道样式 */
const track3dStyle = computed(() => ({
  transform: `rotateY(0deg)`,
}))

/** 获取 3D 模式下每个 item 的样式 */
function getItem3dStyle(index: number) {
  const len = props.items.length
  const current = currentIndex.value

  // 计算相对位置（考虑循环）
  let offset = index - current
  if (offset > Math.floor(len / 2)) offset -= len
  if (offset < -Math.floor(len / 2)) offset += len

  const translateZ = 0
  const translateX = offset * 65
  const rotateY = -offset * 25
  const opacity = offset === 0 ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.3)
  const zIndex = len - Math.abs(offset)
  const scale = offset === 0 ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.1)

  return {
    transform: `translateX(${translateX}%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
    opacity,
    zIndex,
  }
}

// ===== 定时器 =====

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function startTimer() {
  clearTimer()
  if (props.interval > 0) {
    timer = setInterval(() => {
      if (!props.pauseOnHover || !isHovering.value) {
        next()
      }
    }, props.interval)
  }
}

// ===== 导航 =====

function goTo(index: number, direction: 'forward' | 'backward' = 'forward') {
  if (index === currentIndex.value) return

  const oldIndex = currentIndex.value
  prevIndex.value = oldIndex
  slideDirection.value = direction
  currentIndex.value = index
  emit('change', index, oldIndex)
}

function next() {
  const len = props.items.length
  if (len <= 1) return

  if (props.loop) {
    const nextIndex = (currentIndex.value + 1) % len
    goTo(nextIndex, 'forward')
  } else {
    if (currentIndex.value < len - 1) {
      goTo(currentIndex.value + 1, 'forward')
    }
  }
}

function prev() {
  const len = props.items.length
  if (len <= 1) return

  if (props.loop) {
    const prevIndex = (currentIndex.value - 1 + len) % len
    goTo(prevIndex, 'backward')
  } else {
    if (currentIndex.value > 0) {
      goTo(currentIndex.value - 1, 'backward')
    }
  }
}

// ===== 事件 =====

function handleMouseEnter() {
  isHovering.value = true
  if (props.pauseOnHover) {
    clearTimer()
  }
}

function handleMouseLeave() {
  isHovering.value = false
  startTimer()
}

function handleKeydown(e: KeyboardEvent) {
  if (props.direction === 'horizontal') {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
  } else {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      next()
    }
  }
}

onMounted(() => {
  startTimer()
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  clearTimer()
  document.removeEventListener('keydown', handleKeydown)
})

watch(
  () => props.interval,
  () => {
    startTimer()
  },
)

defineExpose({
  next,
  prev,
  goTo,
  currentIndex,
})
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.25);
$arrow-bg: rgba(0, 0, 0, 0.25);
$arrow-hover-bg: rgba(0, 0, 0, 0.45);
$dot-color: rgba(255, 255, 255, 0.5);
$dot-active-color: #ffffff;
$transition: all 0.3s ease;

.xly-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: #f5f6fa;

  &--vertical {
    .xly-carousel__container {
      height: 300px;
    }
  }
}

/* ========== 容器 ========== */
.xly-carousel__container {
  position: relative;
  width: 100%;
  height: 200px;
}

.xly-carousel__track {
  position: relative;
  width: 100%;
  height: 100%;
}

.xly-carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xly-carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.xly-carousel__custom-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* ========== 标题 ========== */
.xly-carousel__title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
  padding: 48px 20px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;

  &-text {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.4;
  }
}

.xly-carousel__counter {
  flex-shrink: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  background: rgba(0, 0, 0, 0.25);
  padding: 2px 10px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

/* ========== 3D 模式 ========== */
.xly-carousel--3d {
  .xly-carousel__container {
    height: 260px;
    perspective: 1200px;
  }
}

.xly-carousel__perspective {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

.xly-carousel__3d-track {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.xly-carousel__3d-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

  &.is-active {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  }

  img {
    border-radius: 12px;
  }
}

/* ========== 箭头 ========== */
.xly-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: $arrow-bg;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;
  opacity: 1;
  backdrop-filter: blur(4px);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: $arrow-hover-bg;
  }

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  &--left {
    left: 12px;
  }
  &--right {
    right: 12px;
  }
}

/* 垂直模式箭头位置调整 */
.xly-carousel--vertical {
  .xly-carousel__arrow {
    top: auto;
    left: 50%;
    transform: translateX(-50%);

    &--left {
      top: 12px;
      transform: translateX(-50%);
    }
    &--right {
      bottom: 12px;
      top: auto;
      transform: translateX(-50%);
    }
  }
}

/* ========== 指示器 ========== */
.xly-carousel__dots {
  position: absolute;
  z-index: 10;
  display: flex;
  gap: 8px;

  &--bottom {
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
  &--left {
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }
  &--right {
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  // 有标题时指示器上移
  .xly-carousel__title ~ &--bottom {
    bottom: 52px;
  }
}

.xly-carousel__dot {
  border: none;
  cursor: pointer;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;

  &--dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $dot-color;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    &.is-active {
      background: $dot-active-color;
      box-shadow: 0 0 8px $primary-light;
      transform: scale(1.2);
    }
  }

  &--line {
    width: 24px;
    height: 4px;
    border-radius: 2px;
    background: $dot-color;
    overflow: hidden;

    .xly-carousel__dot-inner {
      display: block;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 2px;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &.is-active {
      background: rgba(255, 255, 255, 0.3);
      .xly-carousel__dot-inner {
        background: $dot-active-color;
        transform: scaleX(1);
      }
    }
  }
}

/* ========== 数字指示器 ========== */
.xly-carousel__dots--number {
  gap: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 4px;
}

.xly-carousel__number {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 14px;
  user-select: none;
}

.xly-carousel__number-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: $transition;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

.xly-carousel__number-current {
  font-size: 16px;
  min-width: 24px;
  text-align: center;
}

.xly-carousel__number-sep {
  opacity: 0.5;
  font-weight: 400;
}

.xly-carousel__number-total {
  font-size: 13px;
  opacity: 0.6;
  min-width: 24px;
  text-align: center;
}

/* ========== 过渡动画 - 水平 ========== */
.xly-slide-forward-enter-active,
.xly-slide-forward-leave-active,
.xly-slide-backward-enter-active,
.xly-slide-backward-leave-active {
  transition: all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.xly-slide-forward-enter-from {
  transform: translateX(100%);
  opacity: 0.5;
}
.xly-slide-forward-leave-to {
  transform: translateX(-100%);
  opacity: 0.5;
}
.xly-slide-backward-enter-from {
  transform: translateX(-100%);
  opacity: 0.5;
}
.xly-slide-backward-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}

/* ========== 过渡动画 - 垂直 ========== */
.xly-slide-v-forward-enter-active,
.xly-slide-v-forward-leave-active,
.xly-slide-v-backward-enter-active,
.xly-slide-v-backward-leave-active {
  transition: all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.xly-slide-v-forward-enter-from {
  transform: translateY(100%);
  opacity: 0.5;
}
.xly-slide-v-forward-leave-to {
  transform: translateY(-100%);
  opacity: 0.5;
}
.xly-slide-v-backward-enter-from {
  transform: translateY(-100%);
  opacity: 0.5;
}
.xly-slide-v-backward-leave-to {
  transform: translateY(100%);
  opacity: 0.5;
}
</style>
