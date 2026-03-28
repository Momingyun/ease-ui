<template>
  <i
    class="xly-icon"
    :class="[iconClass, { 'xly-icon--clickable': clickable }]"
    :style="rootStyle"
    @click="handleClick"
  >
    <!-- Element Plus 图标 (el:xxx) -->
    <el-icon v-if="mode === 'element'" :size="size" :color="color">
      <component :is="epComponent" />
    </el-icon>

    <!-- 自定义 SVG 图标 (svg:xxx → assets/icon/svg/) -->
    <span
      v-else-if="mode === 'svg'"
      class="xly-icon__svg"
      :style="{
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
        color: color || undefined,
      }"
      v-html="svgContent"
    />

    <!-- 图片 URL (无前缀，以 .png/.jpg/.webp 等结尾或 http(s):// 开头，或 @/ 开头的 Vite 别名路径) -->
    <img
      v-else-if="mode === 'image'"
      :src="resolvedImageSrc"
      :alt="alt"
      class="xly-icon__img"
      :style="{
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
      }"
      draggable="false"
      @error="handleImageError"
      @load="handleImageLoad"
    />
  </i>
</template>

<script setup lang="ts">
import { type Component, computed, type CSSProperties, markRaw } from 'vue'
import * as EpIcons from '@element-plus/icons-vue'
import { getSvgContent } from './svg-map'

defineOptions({ name: 'XlyIcon' })

export interface XlyIconProps {
  /**
   * 图标名称，通过前缀区分类型：
   * - `el:Search` / `el:arrow-down` → Element Plus 图标
   * - `svg:edit` / `svg:dashboard` → assets/icon/svg/ 下的 SVG 文件
   * - `@/assets/icon/img/img.png` / `@/assets/logo.png` → 支持 Vite 别名路径的图片
   * - 无前缀或以 http(s):// 开头：图片 URL（.png/.jpg/.webp 等）
   */
  name: string
  /** 图标大小，单位 px */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 自定义 CSS 类名 */
  iconClass?: string
  /** 是否可点击（添加 cursor:pointer 和 hover 效果） */
  clickable?: boolean
  /** 图片 alt 文本 */
  alt?: string
}

const props = withDefaults(defineProps<XlyIconProps>(), {
  size: undefined,
  color: undefined,
  iconClass: undefined,
  clickable: false,
  alt: '',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

type IconMode = 'element' | 'svg' | 'image'

/** 解析前缀和实际名称 */
const parsed = computed(() => {
  const n = props.name.trim()
  if (n.startsWith('el:')) {
    return { type: 'element' as IconMode, value: n.slice(3) }
  }
  if (n.startsWith('svg:')) {
    return { type: 'svg' as IconMode, value: n.slice(4) }
  }
  // 无前缀：图片 URL
  return { type: 'image' as IconMode, value: n }
})

const mode = computed<IconMode>(() => parsed.value.type)

/** Element Plus 图标映射（避免重复导入） */
const epIconsMap = markRaw(EpIcons) as Record<string, Component>

/** 动态解析 Element Plus 图标组件 */
const epComponent = computed<Component | null>(() => {
  if (mode.value !== 'element') return null
  const name = parsed.value.value
  // 将 kebab-case 转为 PascalCase：arrow-down → ArrowDown
  const pascalName = name.replace(/(?:^|-)(\w)/g, (_, c: string) => c.toUpperCase())
  return epIconsMap[pascalName] || epIconsMap[name] || null
})

/** SVG 内容 */
const svgContent = computed(() => {
  if (mode.value !== 'svg') return ''
  return getSvgContent(parsed.value.value) || ''
})

/** 解析图片路径 */
const resolvedImageSrc = computed<string>(() => {
  const src = parsed.value.value
  console.log('[XlyIcon] Original src:', src)

  // http(s):// 开头的网络图片，直接使用
  if (src.startsWith('http://') || src.startsWith('https://')) {
    console.log('[XlyIcon] Using as network URL')
    return src
  }

  // @/ 开头的 Vite 别名路径，使用 new URL() 解析
  if (src.startsWith('@/')) {
    try {
      // 将 @/ 替换为 /src/，new URL 需要绝对路径
      const absolutePath = src.replace(/^\@\//, '/src/')
      console.log('[XlyIcon] Converting @/ path:', absolutePath, 'from', import.meta.url)
      const result = new URL(absolutePath, import.meta.url).href
      console.log('[XlyIcon] Resolved to:', result)
      return result
    } catch (error) {
      console.error('[XlyIcon] Failed to resolve @/ path:', src, error)
      return src
    }
  }

  // 相对路径和其他情况，直接使用
  console.log('[XlyIcon] Using as-is (relative path)')
  return src
})

/** 根元素样式 */
const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style.color = props.color
  }
  return style
})

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  console.log('[XlyIcon] Image loaded successfully:', props.name, '→', img.src)
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  console.error(
    '[XlyIcon] Failed to load image:',
    props.name,
    '\n尝试加载的 URL:',
    img.src,
    '\n支持的用法：',
    '- 网络图片: <XlyIcon name="https://example.com/icon.png" />',
    '- Vite 别名: <XlyIcon name="@/assets/icon/img.png" />',
    '- import URL: import imgUrl from "@/assets/icon.png?url"',
  )
  img.style.display = 'none'
}
</script>

<style scoped lang="scss">
.xly-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 0;
  font-size: inherit;
  color: inherit;

  &--clickable {
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }
}

.xly-icon__svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  :deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}

.xly-icon__img {
  display: inline-block;
  object-fit: contain;
  vertical-align: -0.15em;
  flex-shrink: 0;
}
</style>
