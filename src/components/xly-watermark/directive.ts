/**
 * v-watermark 指令
 *
 * 为任意 DOM 元素添加水印覆盖层。
 *
 * 用法：
 * ```vue
 * <div v-watermark="{ content: '内部机密' }">内容区域</div>
 *
 * <div v-watermark="{
 *   content: ['公司名称', '2026-03-21'],
 *   fontColor: 'rgba(0,0,0,0.1)',
 *   rotate: -15,
 * }">
 * </div>
 * ```
 */
import type { App, Directive, DirectiveBinding } from 'vue'
import type { WatermarkOptions } from './index.vue'

function createWatermarkOverlay(
  el: HTMLElement,
  options: WatermarkOptions,
): HTMLCanvasElement {
  // 确保容器有定位
  const position = getComputedStyle(el).position
  if (!position || position === 'static') {
    el.style.position = 'relative'
  }
  el.style.overflow = 'hidden'

  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9;'
  canvas.dataset.watermark = 'true'
  el.appendChild(canvas)

  renderWatermark(canvas, el, options)
  return canvas
}

function renderWatermark(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  options: WatermarkOptions,
) {
  const {
    content = '',
    image = '',
    rotate = -22,
    width = 120,
    height = 64,
    fontSize = 14,
    fontColor = 'rgba(0, 0, 0, 0.15)',
    fontFamily = 'sans-serif',
    fontWeight = 'normal',
    opacity = 1,
    gapX = 100,
    gapY = 100,
    offset = {},
    imageWidth = 120,
  } = options

  // 统一 content 为数组
  const lines: string[] = Array.isArray(content) ? content.filter(Boolean) : content ? [content] : []

  const tileCanvas = document.createElement('canvas')
  const ctx = tileCanvas.getContext('2d')!
  const ratio = window.devicePixelRatio || 1

  tileCanvas.width = (width + gapX) * ratio
  tileCanvas.height = (height + gapY) * ratio
  ctx.scale(ratio, ratio)

  ctx.translate(width / 2 + (offset.x || 0), height / 2 + (offset.y || 0))
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.globalAlpha = opacity

  if (image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const imgW = imageWidth
      const imgH = (img.naturalHeight / img.naturalWidth) * imgW
      ctx.drawImage(img, -imgW / 2, -imgH / 2, imgW, imgH)
      applyTileToOverlay(tileCanvas, canvas, container)
    }
    img.onerror = () => {
      if (lines.length > 0) {
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
        ctx.fillStyle = fontColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(lines[0], 0, 0)
      }
      applyTileToOverlay(tileCanvas, canvas, container)
    }
    img.src = image
  } else {
    if (lines.length === 0) return

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.fillStyle = fontColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (lines.length === 1) {
      ctx.fillText(lines[0], 0, 0)
    } else {
      const lineHeight = fontSize * 1.4
      const totalH = lineHeight * lines.length
      const startY = -totalH / 2 + lineHeight / 2
      lines.forEach((line, i) => {
        ctx.fillText(line, 0, startY + i * lineHeight)
      })
    }

    applyTileToOverlay(tileCanvas, canvas, container)
  }
}

function applyTileToOverlay(
  tileCanvas: HTMLCanvasElement,
  overlay: HTMLCanvasElement,
  container: HTMLElement,
) {
  const ratio = window.devicePixelRatio || 1
  overlay.width = container.offsetWidth * ratio
  overlay.height = container.offsetHeight * ratio

  const ctx = overlay.getContext('2d')!
  ctx.clearRect(0, 0, overlay.width, overlay.height)

  const img = new Image()
  img.onload = () => {
    const pat = ctx.createPattern(img, 'repeat')
    if (pat) {
      ctx.fillStyle = pat
      ctx.fillRect(0, 0, overlay.width, overlay.height)
    }
  }
  img.src = tileCanvas.toDataURL()
}

const watermarkDirective: Directive<HTMLElement, WatermarkOptions> = {
  mounted(el, binding) {
    const options = binding.value || {}
    const canvas = createWatermarkOverlay(el, options)

    // 监听容器大小变化
    const ro = new ResizeObserver(() => {
      renderWatermark(canvas, el, options)
    })
    ro.observe(el)
    ;(el as any)._watermarkRO = ro
  },

  updated(el, binding) {
    const options = binding.value || {}
    const canvas = el.querySelector('canvas[data-watermark]') as HTMLCanvasElement | null
    if (canvas) {
      renderWatermark(canvas, el, options)
    }
  },

  unmounted(el) {
    const ro = (el as any)._watermarkRO as ResizeObserver | undefined
    ro?.disconnect()
    const canvas = el.querySelector('canvas[data-watermark]')
    canvas?.remove()
  },
}

/** 安装全局水印指令 */
export function setupWatermarkDirective(app: App) {
  app.directive('watermark', watermarkDirective)
}

export default watermarkDirective
