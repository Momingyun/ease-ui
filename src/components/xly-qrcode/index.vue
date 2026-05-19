<template>
  <div class="xly-qrcode" :style="{ width: `${size}px`, height: `${size}px` }">
    <canvas ref="canvasRef" class="xly-qrcode__canvas" />
    <div v-if="!content" class="xly-qrcode__placeholder">
      <slot name="placeholder">
        <span>请输入内容</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import QRCode from 'qrcode'

defineOptions({ name: 'XlyQrcode' })

export interface QrcodeOptions {
  /** 二维码内容（文本、URL等） */
  content?: string
  /** 二维码尺寸（宽度和高度），单位 px，默认 200 */
  size?: number
  /** 前景色，默认 #000000 */
  colorDark?: string
  /** 背景色，默认 #ffffff */
  colorLight?: string
  /** 纠错级别：L/M/Q/H，默认 M */
  correctLevel?: 'L' | 'M' | 'Q' | 'H'
  /** 是否在中心显示 logo */
  logo?: string
  /** logo 尺寸，单位 px，默认尺寸的 15% */
  logoSize?: number
  /** logo 背景色（用于白边），默认白色 */
  logoBackgroundColor?: string
  /** logo 圆角，默认 8px */
  logoRadius?: number
  /** 二维码白边宽度，默认 size * 0.04 */
  margin?: number
}

const props = withDefaults(defineProps<QrcodeOptions>(), {
  content: '',
  size: 200,
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: 'M',
  logo: '',
  logoSize: 0,
  logoBackgroundColor: '#ffffff',
  logoRadius: 8,
  margin: 0,
})

const emit = defineEmits<{
  /** 生成完成时触发 */
  (e: 'generated', dataUrl: string): void
  /** 生成失败时触发 */
  (e: 'error', error: Error): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

/** 绘制二维码到 Canvas */
async function drawQRCode(): Promise<void> {
  if (!canvasRef.value || !props.content) return

  try {
    const canvas = canvasRef.value
    canvas.width = props.size
    canvas.height = props.size
    canvas.style.width = `${props.size}px`
    canvas.style.height = `${props.size}px`

    // 使用 qrcode 库绘制
    await QRCode.toCanvas(canvas, props.content, {
      width: props.size,
      margin: props.margin,
      errorCorrectionLevel: props.correctLevel,
      color: {
        dark: props.colorDark,
        light: props.colorLight,
      },
    })

    // 绘制 Logo
    if (props.logo) {
      await drawLogo(canvas)
    }

    // 触发完成事件
    const dataUrl = canvas.toDataURL('image/png')
    emit('generated', dataUrl)
  } catch (error) {
    emit('error', error as Error)
  }
}

/** 绘制 Logo */
async function drawLogo(canvas: HTMLCanvasElement): Promise<void> {
  if (!props.logo) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const logoSize = props.logoSize || props.size * 0.15
  const x = (canvas.width - logoSize) / 2
  const y = (canvas.height - logoSize) / 2
  const r = props.logoRadius

  // 绘制白色背景
  ctx.fillStyle = props.logoBackgroundColor
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + logoSize - r, y)
  ctx.quadraticCurveTo(x + logoSize, y, x + logoSize, y + r)
  ctx.lineTo(x + logoSize, y + logoSize - r)
  ctx.quadraticCurveTo(x + logoSize, y + logoSize, x + logoSize - r, y + logoSize)
  ctx.lineTo(x + r, y + logoSize)
  ctx.quadraticCurveTo(x, y + logoSize, x, y + logoSize - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()

  // 加载并绘制 Logo 图片
  try {
    const img = await loadImage(props.logo)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + logoSize - r, y)
    ctx.quadraticCurveTo(x + logoSize, y, x + logoSize, y + r)
    ctx.lineTo(x + logoSize, y + logoSize - r)
    ctx.quadraticCurveTo(x + logoSize, y + logoSize, x + logoSize - r, y + logoSize)
    ctx.lineTo(x + r, y + logoSize)
    ctx.quadraticCurveTo(x, y + logoSize, x, y + logoSize - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(img, x, y, logoSize, logoSize)
    ctx.restore()
  } catch {
    // Logo 加载失败，跳过
  }
}

/** 加载图片 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** 暴露的方法 */
defineExpose({
  /** 生成并返回 base64 数据 URL */
  toDataURL(): string {
    return canvasRef.value?.toDataURL('image/png') || ''
  },
  /** 生成并返回 Blob 对象 */
  toBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!canvasRef.value) {
        resolve(null)
        return
      }
      canvasRef.value.toBlob(resolve, 'image/png')
    })
  },
  /** 下载二维码图片 */
  download(filename = 'qrcode.png'): void {
    const link = document.createElement('a')
    link.download = filename
    link.href = canvasRef.value?.toDataURL('image/png') || ''
    link.click()
  },
})

// 监听属性变化
watch(
  () => [
    props.content,
    props.size,
    props.colorDark,
    props.colorLight,
    props.correctLevel,
    props.logo,
    props.logoSize,
    props.logoBackgroundColor,
    props.logoRadius,
    props.margin,
  ],
  () => nextTick(drawQRCode),
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    if (props.content) {
      drawQRCode()
    }
  })
})
</script>

<style scoped lang="scss">
.xly-qrcode {
  position: relative;
  display: inline-block;

  &__canvas {
    display: block;
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #999;
    font-size: 14px;
    border: 1px dashed #ddd;
    border-radius: 4px;
  }
}
</style>
