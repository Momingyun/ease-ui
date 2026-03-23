import { shallowRef, type Component, type ShallowRef } from 'vue'

/**
 * SVG 图标加载器
 *
 * 自动扫描 src/assets/icon/svg/ 目录下所有 .svg 文件，
 * 将其内容缓存供 XlyIcon 组件使用。
 *
 * 使用方式：
 * - name="svg:edit" → 渲染 assets/icon/svg/edit.svg
 * - name="svg:arrow-down" → 渲染 assets/icon/svg/arrow-down.svg
 */

/** SVG 文件内容原始映射（Vite import.meta.glob 生成，eager 模式同步加载） */
const svgModules = import.meta.glob<{ default: string }>('../../assets/icon/svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** SVG 内容缓存：文件名(不含后缀) → SVG 原始字符串 */
const svgContentMap = new Map<string, string>()

/** 获取所有已加载的 SVG 图标名称列表 */
export function getSvgIconNames(): string[] {
  return [...svgContentMap.keys()]
}

/** 检查指定名称的 SVG 图标是否存在 */
export function hasSvgIcon(name: string): boolean {
  const svgName = name.replace(/^svg:/, '')
  return svgContentMap.has(svgName)
}

/** 获取指定名称的 SVG 图标的原始内容 */
export function getSvgContent(name: string): string | undefined {
  const svgName = name.replace(/^svg:/, '')
  return svgContentMap.get(svgName)
}

/**
 * 初始化：扫描所有 SVG 模块并缓存内容
 *
 * 在模块首次加载时自动执行，将 assets/icon/svg/*.svg
 * 文件名(不含后缀) 作为图标名称注册。
 */
for (const [filePath, svgContent] of Object.entries(svgModules)) {
  // 从路径中提取文件名：../../assets/icon/svg/edit.svg → edit
  const fileName = filePath.split('/').pop() || ''
  const iconName = fileName.replace(/\.svg$/i, '')

  if (iconName && typeof svgContent === 'string' && svgContent.includes('<svg')) {
    svgContentMap.set(iconName, svgContent)
  }
}
