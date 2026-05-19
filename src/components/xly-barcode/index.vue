<template>
  <div class="xly-barcode">
    <svg ref="svgRef" class="xly-barcode__svg" />
    <div v-if="!content" class="xly-barcode__placeholder">
      <slot name="placeholder">
        <span>请输入内容</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import JsBarcode from 'jsbarcode'

defineOptions({ name: 'XlyBarcode' })

export interface BarcodeOptions {
  /** 条码内容 */
  content?: string
  /** 条码格式，支持：CODE39, CODE128, EAN13, EAN8, UPC, CODE93, ITF14, MSI, POSTNET 等 */
  format?: string
  /** 条码宽度（单个条的宽度），单位 px，默认 2 */
  width?: number
  /** 条码高度，单位 px，默认 100 */
  height?: number
  /** 是否显示文本内容，默认 true */
  displayValue?: boolean
  /** 文本字体，默认 'Courier New' */
  font?: string
  /** 文本字体大小，默认 20 */
  fontSize?: number
  /** 文本对齐方式，默认 'center' */
  textAlign?: 'left' | 'center' | 'right'
  /** 文本距离条的距离，单位 px，默认 10 */
  margin?: number
  /** 背景色，默认 #ffffff */
  background?: string
  /** 条的颜色，默认 #000000 */
  lineColor?: string
}

const props = withDefaults(defineProps<BarcodeOptions>(), {
  content: '',
  format: 'CODE128',
  width: 2,
  height: 100,
  displayValue: true,
  font: 'Courier New',
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
  background: '#ffffff',
  lineColor: '#000000',
})

const emit = defineEmits<{
  /** 生成完成时触发 */
  (e: 'generated', svgElement: SVGElement): void
  /** 生成失败时触发 */
  (e: 'error', error: Error): void
}>()

const svgRef = ref<SVGElement | null>(null)

/** 绘制条码 */
function drawBarcode(): void {
  if (!svgRef.value || !props.content) return

  try {
    // 清空旧的条码内容，防止重复叠加
    const svgEl = svgRef.value
    while (svgEl.firstChild) {
      svgEl.removeChild(svgEl.firstChild)
    }

    // 使用 JsBarcode 绘制（会自动设置 SVG 的 width/height 属性和 viewBox）
    JsBarcode(svgEl, props.content, {
      format: props.format,
      width: props.width,
      height: props.height,
      displayValue: props.displayValue,
      font: props.font,
      fontSize: props.fontSize,
      textAlign: props.textAlign as 'left' | 'center' | 'right',
      margin: props.margin,
      background: props.background,
      lineColor: props.lineColor,
    })

    // 让 SVG 按属性宽高显示（style 覆盖，防止被 scoped 样式影响）
    const w = svgEl.getAttribute('width')
    const h = svgEl.getAttribute('height')
    if (w && h) {
      svgEl.style.cssText = `width:${w}px;height:${h}px;background:${props.background};display:block`
    }

    // 触发完成事件
    emit('generated', svgEl)
  } catch (error) {
    emit('error', error as Error)
  }
}

/** 暴露的方法 */
defineExpose({
  /** 获取 SVG 元素 */
  getSvgElement(): SVGElement | null {
    return svgRef.value
  },
  /** 获取 SVG 字符串 */
  toSVGString(): string {
    return svgRef.value?.outerHTML || ''
  },
  /** 下载为 SVG 文件 */
  downloadSVG(filename = 'barcode.svg'): void {
    const svg = svgRef.value
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  },
  /** 下载为 PNG 图片 */
  downloadPNG(filename = 'barcode.png', scale = 2): void {
    const svg = svgRef.value
    if (!svg) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      ctx.fillStyle = props.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const pngUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = filename
      link.href = pngUrl
      link.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  },
})

// 监听属性变化
  watch(
    () => [
      props.content,
      props.format,
      props.width,
      props.height,
      props.displayValue,
      props.font,
      props.fontSize,
      props.textAlign,
      props.margin,
      props.background,
      props.lineColor,
    ],
    async () => {
      await nextTick()
      drawBarcode()
    },
    { deep: true },
  )

  onMounted(async () => {
    await nextTick()
    drawBarcode()
  })
</script>

<style scoped lang="scss">
.xly-barcode {
  position: relative;
  display: inline-block;

  &__svg {
    display: block;
    /*SVG 由 JS 动态设置 width/height 属性，scoped 样式不再覆盖 */
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
