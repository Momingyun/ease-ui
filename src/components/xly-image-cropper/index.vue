<template>
  <div class="xly-image-cropper">
    <!-- 工具栏 -->
    <div v-if="toolbar" class="xly-image-cropper__toolbar">
      <div class="xly-image-cropper__group">
        <el-tooltip content="左旋转90°" placement="top">
          <button class="xly-image-cropper__btn" @click="onRotate(-90)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
            </svg>
            <span>左旋</span>
          </button>
        </el-tooltip>
        <el-tooltip content="右旋转90°" placement="top">
          <button class="xly-image-cropper__btn" @click="onRotate(90)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
            </svg>
            <span>右旋</span>
          </button>
        </el-tooltip>
      </div>
      <div class="xly-image-cropper__sep" />
      <div class="xly-image-cropper__group">
        <el-tooltip content="左右翻转" placement="top">
          <button class="xly-image-cropper__btn" @click="onScaleX">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 20v2M12 2v2"/>
            </svg>
            <span>镜像</span>
          </button>
        </el-tooltip>
        <el-tooltip content="上下翻转" placement="top">
          <button class="xly-image-cropper__btn" @click="onScaleY">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M20 12H4M2 12h2"/>
            </svg>
            <span>翻转</span>
          </button>
        </el-tooltip>
      </div>
      <div class="xly-image-cropper__sep" />
      <div class="xly-image-cropper__group">
        <el-tooltip content="放大" placement="top">
          <button class="xly-image-cropper__btn" @click="onZoom(0.1)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
            <span>放大</span>
          </button>
        </el-tooltip>
        <el-tooltip content="缩小" placement="top">
          <button class="xly-image-cropper__btn" @click="onZoom(-0.1)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>
            </svg>
            <span>缩小</span>
          </button>
        </el-tooltip>
      </div>
      <div class="xly-image-cropper__sep" />
      <div class="xly-image-cropper__group">
        <el-tooltip content="重置" placement="top">
          <button class="xly-image-cropper__btn xly-image-cropper__btn--reset" @click="onReset">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
            <span>重置</span>
          </button>
        </el-tooltip>
      </div>
    </div>

    <!-- 裁剪区域 -->
    <div class="xly-image-cropper__view">
      <img
        v-if="src"
        ref="imgRef"
        class="xly-image-cropper__img"
        :src="src"
        :alt="alt"
        style="display: block; max-width: 100%;"
        @error="onImgError"
      />
      <div v-else class="xly-image-cropper__placeholder">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="#ccc">
          <rect x="6" y="10" width="36" height="28" rx="2" stroke="#ccc" stroke-width="2" fill="none"/>
          <circle cx="16" cy="20" r="4" stroke="#ccc" stroke-width="2" fill="none"/>
          <path d="M6 32l8-8 6 6 12-12 10 10" stroke="#ccc" stroke-width="2" fill="none"/>
        </svg>
        <span>请选择图片</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div v-if="$slots.action || showAction" class="xly-image-cropper__action">
      <slot name="action">
        <XlyButton @click="handleCancel">取消</XlyButton>
        <XlyButton type="primary" @click="handleConfirm">确认裁剪</XlyButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import XlyButton from '@/components/xly-button/index.vue'

defineOptions({ name: 'XlyImageCropper' })

export interface CropData {
  /** 裁剪区域的 Canvas */
  canvas: HTMLCanvasElement
  /** 裁剪区域的坐标和尺寸 */
  cropBox: { left: number; top: number; width: number; height: number }
  /** 原图尺寸 */
  naturalSize: { width: number; height: number }
  /** 裁剪后的 Blob 对象 */
  blob: Blob | null
  /** Base64 数据 URL */
  dataURL: string
}

const props = withDefaults(
  defineProps<{
    /** 图片地址 */
    src?: string
    /** 图片 alt */
    alt?: string
    /** 是否显示工具栏 */
    toolbar?: boolean
    /** 是否显示底部操作按钮 */
    showAction?: boolean
    /** 裁剪框宽高比，默认自由 */
    aspectRatio?: number
    /** 初始裁剪区域大小，0-1，默认 0.8 */
    autoCropArea?: number
    /** 视图模式：0-自由，1-限制裁剪框，2-限制画布，3-两边限制 */
    viewMode?: 0 | 1 | 2 | 3
    /** 输出格式 */
    outputType?: 'jpeg' | 'png' | 'webp'
    /** 输出质量 0-1 */
    outputQuality?: number
    /** 输出宽度 */
    outputWidth?: number
    /** 输出高度 */
    outputHeight?: number
    /** 是否显示引导线 */
    guides?: boolean
    /** 是否显示中心指示线 */
    center?: boolean
    /** 是否启用高质量模式 */
    high?: boolean
  }>(),
  {
    alt: 'cropper',
    toolbar: true,
    showAction: true,
    autoCropArea: 0.8,
    viewMode: 0,
    outputType: 'png',
    outputQuality: 0.9,
    guides: true,
    center: true,
    high: false,
  },
)

const emit = defineEmits<{
  /** 裁剪完成，返回裁剪数据 */
  (e: 'cropped', data: CropData): void
  /** 裁剪器就绪 */
  (e: 'ready'): void
  /** 裁剪器销毁 */
  (e: 'destroyed'): void
  /** 确认裁剪 */
  (e: 'confirm', data: CropData): void
  /** 取消 */
  (e: 'cancel'): void
}>()

const imgRef = ref<HTMLImageElement | null>(null)
let cropper: Cropper | null = null

/** 翻转方向 */
let scaleXValue = 1
let scaleYValue = 1

/** 初始化裁剪器 */
function initCropper(): void {
  if (!imgRef.value || !props.src) return
  if (!imgRef.value.complete || !imgRef.value.naturalWidth) return

  destroyCropper()

  cropper = new Cropper(imgRef.value, {
    aspectRatio: props.aspectRatio,
    viewMode: props.viewMode,
    dragMode: 'crop',
    autoCropArea: props.autoCropArea,
    guides: props.guides,
    center: props.center,
    background: false,
    responsive: true,
    restore: false,
    checkCrossOrigin: true,
    modal: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
    ready() {
      emit('ready')
    },
  })
}

/** 图片加载失败 */
function onImgError() {
  console.error('[XlyImageCropper] 图片加载失败:', props.src)
}

/** 销毁裁剪器 */
function destroyCropper(): void {
  if (cropper) {
    cropper.destroy()
    cropper = null
    emit('destroyed')
  }
}

/** 执行裁剪，获取数据 */
function getCropData(): CropData | null {
  if (!cropper) return null

  const canvas = cropper.getCroppedCanvas({
    maxWidth: props.outputWidth || undefined,
    maxHeight: props.outputHeight || undefined,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  })

  const cropBox = cropper.getCropBoxData()
  const imageData = cropper.getImageData()

  return {
    canvas,
    cropBox: {
      left: cropBox.left,
      top: cropBox.top,
      width: cropBox.width,
      height: cropBox.height,
    },
    naturalSize: {
      width: imageData.naturalWidth,
      height: imageData.naturalHeight,
    },
    blob: null,
    dataURL: '',
  }
}

/** 获取裁剪结果（含异步 blob） */
async function getCroppedData(): Promise<CropData | null> {
  const data = getCropData()
  if (!data) return null

  const blob = await new Promise<Blob | null>((resolve) => {
    data.canvas.toBlob(resolve, `image/${props.outputType}`, props.outputQuality)
  })

  data.blob = blob
  data.dataURL = data.canvas.toDataURL(`image/${props.outputType}`, props.outputQuality)

  return data
}

// ============ 工具栏事件处理 ============
function onRotate(degree: number) {
  cropper?.rotate(degree)
}

function onZoom(ratio: number) {
  cropper?.zoom(ratio)
}

function onReset() {
  cropper?.reset()
}

function onScaleX() {
  scaleXValue = -scaleXValue
  cropper?.scaleX(scaleXValue)
}

function onScaleY() {
  scaleYValue = -scaleYValue
  cropper?.scaleY(scaleYValue)
}

// ============ defineExpose ============
defineExpose({
  /** 执行裁剪，返回裁剪数据（同步） */
  crop(): CropData | null {
    return getCropData()
  },
  /** 执行裁剪并触发 cropped 事件 */
  async cropAndEmit(): Promise<CropData | null> {
    const data = await getCroppedData()
    if (data) emit('cropped', data)
    return data
  },
  /** 获取裁剪后的 Canvas */
  getCroppedCanvas(): HTMLCanvasElement | null {
    return cropper?.getCroppedCanvas({
      maxWidth: props.outputWidth || undefined,
      maxHeight: props.outputHeight || undefined,
    }) || null
  },
  /** 获取裁剪后的 Blob */
  getCroppedBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const canvas = cropper?.getCroppedCanvas({
        maxWidth: props.outputWidth || undefined,
        maxHeight: props.outputHeight || undefined,
      })
      if (!canvas) {
        resolve(null)
        return
      }
      canvas.toBlob(resolve, `image/${props.outputType}`, props.outputQuality)
    })
  },
  /** 获取裁剪后的 Base64 */
  getCroppedDataURL(): string {
    const canvas = cropper?.getCroppedCanvas({
      maxWidth: props.outputWidth || undefined,
      maxHeight: props.outputHeight || undefined,
    })
    if (!canvas) return ''
    return canvas.toDataURL(`image/${props.outputType}`, props.outputQuality)
  },
  /** 重置 */
  reset(): void {
    cropper?.reset()
  },
  /** 旋转 */
  rotate(degree: number): void {
    cropper?.rotate(degree)
  },
  /** 缩放 */
  zoom(ratio: number): void {
    cropper?.zoom(ratio)
  },
  /** 左右翻转 */
  scaleX(): void {
    onScaleX()
  },
  /** 上下翻转 */
  scaleY(): void {
    onScaleY()
  },
  /** 替换图片 */
  replace(url: string, onlyColorChanged?: boolean): void {
    cropper?.replace(url, onlyColorChanged)
  },
  /** 销毁裁剪器 */
  destroy(): void {
    destroyCropper()
  },
})

/** 确认裁剪 */
async function handleConfirm(): Promise<void> {
  const data = await getCroppedData()
  if (data) {
    emit('confirm', data)
    emit('cropped', data)
  }
}

/** 取消 */
function handleCancel(): void {
  emit('cancel')
}

// 监听 src 变化
watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      nextTick(() => {
        if (!imgRef.value) return
        if (imgRef.value.complete && imgRef.value.naturalWidth) {
          initCropper()
        } else {
          imgRef.value.onload = () => initCropper()
          imgRef.value.onerror = () => onImgError()
        }
      })
    } else {
      destroyCropper()
    }
  },
)

onMounted(() => {
  if (!props.src || !imgRef.value) return
  if (imgRef.value.complete && imgRef.value.naturalWidth) {
    initCropper()
  } else {
    imgRef.value.onload = () => initCropper()
    imgRef.value.onerror = () => onImgError()
  }
})

onBeforeUnmount(() => {
  destroyCropper()
})
</script>

<style scoped lang="scss">
.xly-image-cropper {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    flex-shrink: 0;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__sep {
    width: 1px;
    height: 28px;
    background: #e0e0e0;
    margin: 0 4px;
    flex-shrink: 0;
  }

  &__btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    color: #555;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 11px;
    line-height: 1;
    min-width: 52px;

    svg {
      stroke: #666;
    }

    &:hover {
      border-color: #4f6ef7;
      color: #4f6ef7;
      background: #f0f2ff;

      svg {
        stroke: #4f6ef7;
      }
    }

    &:active {
      transform: scale(0.95);
    }

    &--reset {
      color: #999;

      svg {
        stroke: #999;
      }

      &:hover {
        border-color: #ff4d4f;
        color: #ff4d4f;
        background: #fff1f0;

        svg {
          stroke: #ff4d4f;
        }
      }
    }
  }

  &__view {
    position: relative;
    width: 100%;
    height: 400px;
    background: #f0f0f0;
    overflow: hidden;

    :deep(.cropper-modal) {
      background-color: rgba(0, 0, 0, 0.5);
    }

    :deep(.cropper-view-box) {
      outline-color: rgba(79, 110, 247, 0.75);
    }

    :deep(.cropper-line),
    :deep(.cropper-point) {
      background-color: #4f6ef7;
    }

    :deep(.cropper-point) {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      opacity: 1;
    }

    :deep(.cropper-point.point-se) {
      width: 14px;
      height: 14px;
    }
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #aaa;
    font-size: 14px;
    user-select: none;
    pointer-events: none;
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    background: #fafafa;
    border-top: 1px solid #e8e8e8;
    flex-shrink: 0;
  }
}
</style>

