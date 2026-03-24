<template>
  <div class="xly-image" :class="[`xly-image--${displayMode}`]">
    <!-- 单图模式 -->
    <template v-if="displayImages.length === 1">
      <div class="xly-image__single" :style="singleStyle" @click="handlePreview(0)">
        <img
          :src="displayImages[0]"
          :alt="alt"
          class="xly-image__img"
          :style="{ objectFit: fit }"
          @error="handleError"
        />
        <div v-if="$slots.overlay" class="xly-image__overlay">
          <slot name="overlay" />
        </div>
      </div>
    </template>

    <!-- 多图模式 -->
    <template v-else>
      <div class="xly-image__list" :style="listStyle">
        <div
          v-for="(img, index) in visibleImages"
          :key="index"
          class="xly-image__item"
          @click="handlePreview(index)"
        >
          <img
            :src="img"
            :alt="alt"
            class="xly-image__img"
            :style="{ objectFit: fit }"
            @error="handleError"
          />
          <!-- 超出提示：显示在最后一个可见图片上 -->
          <div v-if="index === visibleImages.length - 1 && hideCount > 0" class="xly-image__mask">
            <span>+{{ hideCount }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 预览弹窗 -->
    <Teleport to="body">
      <div
        v-if="previewVisible"
        class="xly-image-preview"
        @click.self="closePreview"
        @wheel.prevent="handleWheel"
      >
        <!-- 关闭按钮（右上角） -->
        <div class="xly-image-preview__close">
          <XlyButton type="text" @click="closePreview">
            <XlyIcon name="el:Close" />
          </XlyButton>
        </div>

        <!-- 图片容器（居中） -->
        <div
          ref="previewContainerRef"
          class="xly-image-preview__container"
          style="display: block; grid-template-columns: unset"
          @mousedown="handleDragStart"
        >
          <img
            ref="previewImgRef"
            :src="previewSrc"
            :style="previewImgStyle"
            class="xly-image-preview__img"
            style="width: auto; height: auto; max-width: 100%; max-height: 100%"
            @error="handleError"
          />
        </div>

        <!-- 左侧切换按钮 -->
        <XlyButton
          v-if="displayImages.length > 1 && hasAction('prev')"
          class="xly-image-preview__arrow xly-image-preview__arrow--left"
          type="text"
          @click="prevImage"
        >
          <XlyIcon name="el:ArrowLeft" :size="30" />
        </XlyButton>

        <!-- 右侧切换按钮 -->
        <XlyButton
          v-if="displayImages.length > 1 && hasAction('next')"
          class="xly-image-preview__arrow xly-image-preview__arrow--right"
          type="text"
          @click="nextImage"
        >
          <XlyIcon name="el:ArrowRight" :size="30" />
        </XlyButton>

        <!-- 底部控制栏 -->
        <div class="xly-image-preview__footer">
          <!-- 指示器 -->
          <div v-if="displayImages.length > 1" class="xly-image-preview__indicators">
            <span
              v-for="(_, index) in displayImages"
              :key="index"
              class="xly-image-preview__indicator"
              :class="{ 'is-active': index === previewIndex }"
              @click="previewIndex = index"
            />
          </div>

          <!-- 图片信息 -->
          <div class="xly-image-preview__info">
            {{ previewIndex + 1 }} / {{ displayImages.length }}
          </div>

          <!-- 操作栏 -->
          <div class="xly-image-preview__toolbar">
            <XlyButton v-if="hasAction('zoomOut')" type="text" @click="zoomOut">
              <XlyIcon name="el:ZoomOut" />
            </XlyButton>
            <XlyButton v-if="hasAction('zoomIn')" type="text" @click="zoomIn">
              <XlyIcon name="el:ZoomIn" />
            </XlyButton>
            <XlyButton v-if="hasAction('rotateLeft')" type="text" @click="rotateLeft">
              <XlyIcon name="el:RefreshLeft" />
            </XlyButton>
            <XlyButton v-if="hasAction('rotateRight')" type="text" @click="rotateRight">
              <XlyIcon name="el:RefreshRight" />
            </XlyButton>
            <XlyButton v-if="hasAction('reset')" type="text" @click="resetTransform">
              <XlyIcon name="el:Refresh" />
            </XlyButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyIcon from '@/components/xly-icon/index.vue'

type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

const props = withDefaults(
  defineProps<{
    /** 图片地址，支持数组或逗号拼接的字符串 */
    src?: string | string[]
    /** 图片 alt */
    alt?: string
    /** 预览图片列表（可单独设置，与 src 互斥） */
    previewSrcList?: string[]
    /** 预览是否开启 */
    preview?: boolean
    /** 预览操作按钮 */
    previewActions?:
      | Array<'zoomIn' | 'zoomOut' | 'rotateLeft' | 'rotateRight' | 'reset' | 'prev' | 'next'>
      | true
    /** 多图模式下显示数量 */
    max?: number
    /** 图片填充方式 */
    fit?: ImageFit
    /** 预览模式: 单图single/多图grid */
    mode?: 'single' | 'grid'
    /** 图片宽度，支持数字(px)或字符串(如 '120px', '50%') */
    width?: number | string
    /** 图片高度，支持数字(px)或字符串(如 '120px', '50%') */
    height?: number | string
  }>(),
  {
    src: '',
    alt: '',
    previewSrcList: () => [],
    preview: true,
    previewActions: true,
    max: 4,
    fit: 'cover',
    mode: 'grid',
  },
)

const emit = defineEmits<{
  error: [event: Event]
  preview: [index: number]
}>()

defineOptions({
  name: 'XlyImage',
})

// ============ 图片解析 ============

// 解析图片列表
const displayImages = computed(() => {
  // 优先使用 previewSrcList
  if (props.previewSrcList && props.previewSrcList.length > 0) {
    return props.previewSrcList
  }

  // 解析 src
  if (!props.src) return []

  if (Array.isArray(props.src)) {
    return props.src
  }

  // 处理逗号拼接的字符串
  if (typeof props.src === 'string') {
    return props.src
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  return []
})

// 预览时的图片列表
const previewImages = computed(() => {
  if (props.previewSrcList && props.previewSrcList.length > 0) {
    return props.previewSrcList
  }
  return displayImages.value
})

// 实际显示的图片列表（根据 max 截断）
const visibleImages = computed(() => {
  return displayImages.value.slice(0, props.max)
})

// 超出数量
const hideCount = computed(() => {
  if (displayImages.value.length <= props.max) return 0
  return displayImages.value.length - props.max
})

// 显示模式
const displayMode = computed(() => {
  if (props.mode === 'single') return 'single'
  // 使用 visibleImages 判断：只有一张可见图片时才是单图模式
  return visibleImages.value.length === 1 ? 'single' : 'grid'
})

// ============ 样式计算 ============

// 计算最终尺寸值：仅设置宽或高时，两者相同
const finalWidth = computed(() => props.width ?? props.height ?? 120)
const finalHeight = computed(() => props.height ?? props.width ?? 120)

const singleStyle = computed(() => {
  if (props.width !== undefined || props.height !== undefined) {
    return {
      width: getSizeValue(finalWidth.value),
      height: getSizeValue(finalHeight.value),
    }
  }
  return {}
})

const listStyle = computed(() => {
  if (props.width !== undefined || props.height !== undefined) {
    return {
      '--image-width': getSizeValue(finalWidth.value),
      '--image-height': getSizeValue(finalHeight.value),
    }
  }
  return {}
})

// 处理尺寸值，支持数字或字符串
const getSizeValue = (value: number | string) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

// ============ 预览功能 ============

const previewVisible = ref(false)
const previewIndex = ref(0)
const previewSrc = ref<string>('')
const previewContainerRef = ref<HTMLElement>()
const previewImgRef = ref<HTMLImageElement>()

// 预览相关状态
const scale = ref(1)
const rotation = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragPosition = ref({ x: 0, y: 0 })

const previewImgStyle = computed(() => ({
  transform: `translate(${position.value.x + dragPosition.value.x}px, ${position.value.y + dragPosition.value.y}px) scale(${scale.value}) rotate(${rotation.value}deg)`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease',
}))

// 打开预览
const handlePreview = (index: number) => {
  if (!props.preview) return
  previewIndex.value = index
  previewSrc.value = previewImages.value[index] ?? ''
  previewVisible.value = true
  resetTransform()
  emit('preview', index)
}

// 关闭预览
const closePreview = () => {
  previewVisible.value = false
}

// 切换图片（循环）
const prevImage = () => {
  previewIndex.value =
    previewIndex.value > 0 ? previewIndex.value - 1 : previewImages.value.length - 1
  previewSrc.value = previewImages.value[previewIndex.value] ?? ''
  resetTransform()
}

const nextImage = () => {
  previewIndex.value =
    previewIndex.value < previewImages.value.length - 1 ? previewIndex.value + 1 : 0
  previewSrc.value = previewImages.value[previewIndex.value] ?? ''
  resetTransform()
}

// 缩放
const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.2, 5)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.2, 0.2)
}

// 旋转
const rotateLeft = () => {
  rotation.value -= 90
}

const rotateRight = () => {
  rotation.value += 90
}

// 重置变换
const resetTransform = () => {
  scale.value = 1
  rotation.value = 0
  position.value = { x: 0, y: 0 }
  dragPosition.value = { x: 0, y: 0 }
}

// 滚轮缩放
const handleWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

// 拖拽开始
const handleDragStart = (e: MouseEvent) => {
  if (scale.value <= 1) return

  isDragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }

  const handleMove = (moveEvent: MouseEvent) => {
    if (!isDragging.value) return
    dragPosition.value = {
      x: moveEvent.clientX - dragStart.value.x,
      y: moveEvent.clientY - dragStart.value.y,
    }
  }

  const handleUp = () => {
    isDragging.value = false
    position.value = {
      x: position.value.x + dragPosition.value.x,
      y: position.value.y + dragPosition.value.y,
    }
    dragPosition.value = { x: 0, y: 0 }
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseup', handleUp)
  }

  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', handleUp)
}

// 错误处理
const handleError = (e: Event) => {
  emit('error', e)
}

// 检查是否显示某个操作按钮
const hasAction = (action: string) => {
  if (props.previewActions === true) return true
  if (Array.isArray(props.previewActions)) {
    return props.previewActions.includes(action as any)
  }
  return false
}

// ESC 关闭预览
watch(previewVisible, (val) => {
  if (val) {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePreview()
      }
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$color-primary: #4f6ef7;
$color-white: #ffffff;
$color-black: #000000;
$color-text-regular: #4a4a6a;
$color-bg-mask: rgba(0, 0, 0, 0.7);
$color-border: #e8e8f0;
$radius-base: 8px;

/* ========== 图片组件 ========== */
.xly-image {
  &--single {
    .xly-image__single {
      width: 120px;
      height: 120px;
      border-radius: $radius-base;
      overflow: hidden;
      cursor: pointer;
    }
  }

  &--grid {
    // 使用 flex 布局，不再需要 grid
  }
}

.xly-image__single {
  position: relative;
}

.xly-image__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .xly-image__item {
    position: relative;
    width: var(--image-width, 120px);
    height: var(--image-height, 120px);
    border-radius: $radius-base;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.xly-image__item {
  &:hover {
    .xly-image__img {
      transform: scale(1.05);
    }
  }
}

.xly-image__img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  display: block;
}

.xly-image__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: $color-white;
  opacity: 0;
  transition: opacity 0.3s;

  .xly-image__single:hover &,
  .xly-image__item:hover & {
    opacity: 1;
  }
}

.xly-image__mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: $color-white;
  font-size: 16px;
  font-weight: 500;
}

/* ========== 预览弹窗 ========== */
.xly-image-preview {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: $color-bg-mask;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  line-height: 0;

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;

    .xly-button {
      color: $color-white;
      padding: 8px;

      &:hover {
        color: $color-primary;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  &__container {
    display: block !important;
    grid-template-columns: unset !important;
    max-width: calc(100% - 140px) !important;
    max-height: calc(100vh - 180px) !important;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__img {
    display: block !important;
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain;
    user-select: none;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: $color-white;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transition: all 0.3s;
    width: 44px;
    height: 44px;
    min-width: 44px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
      color: $color-white;
    }

    &--left {
      left: 20px;
    }

    &--right {
      right: 20px;
    }
  }

  &__footer {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__indicators {
    display: flex;
    gap: 8px;
  }

  &__indicator {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;

    &:hover,
    &.is-active {
      background: $color-white;
      transform: scale(1.2);
    }
  }

  &__info {
    color: $color-white;
    font-size: 14px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 24px;

    .xly-button {
      color: $color-white;
      padding: 8px;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      min-width: 36px;

      &:hover {
        color: $color-primary;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
