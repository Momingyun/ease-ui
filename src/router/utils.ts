import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import { getMenuData, resolveComponent } from '@/utils/menu'
import type { MenuItem } from '@/types/menu.ts'

// 动态导入 views 目录下所有 .vue 文件
const viewModules = import.meta.glob<Component>('../views/**/*.vue')

// 缓存已解析的组件
const componentCache = new Map<string, (() => Promise<Component>) | undefined>()

/**
 * 根据 component 字段解析对应的组件路径
 * component 值直接对应 src/views 下的文件路径（去掉 .vue 后缀）
 *   "xly/button"    → views/xly/button.vue
 *   "home/home"     → views/home/home.vue
 */
function resolveComponentPath(component: string): (() => Promise<Component>) | undefined {
  // 先检查缓存
  if (componentCache.has(component)) {
    return componentCache.get(component)
  }

  const candidates = [`../views/${component}.vue`, `../views/${component}/index.vue`]

  for (const path of candidates) {
    if (viewModules[path]) {
      componentCache.set(component, viewModules[path])
      return viewModules[path]
    }
  }

  console.warn(`[Router] 未找到组件: ${component}，已尝试: ${candidates.join(', ')}`)
  componentCache.set(component, undefined)
  return undefined
}

// 转换菜单数据为路由配置
function transformMenuToRoutes(menuItems: MenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  for (const item of menuItems) {
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      const childrenRoutes = transformMenuToRoutes(item.children)
      if (childrenRoutes.length > 0) {
        routes.push(...childrenRoutes)
      }
    } else if (item.component && item.path) {
      const loader = resolveComponentPath(item.component)
      if (loader) {
        routes.push({
          path: item.path,
          name: item.key,
          component: loader,
        })
      }
    }
  }

  return routes
}

// 生成路由配置
export async function generateRoutes(): Promise<RouteRecordRaw[]> {
  const menuData = await getMenuData()
  return transformMenuToRoutes(menuData)
}

// 同步版本（仅用于本地模式，快速返回）
export function generateLocalRoutes(): RouteRecordRaw[] {
  // 使用动态导入获取本地菜单
  const modules = import.meta.glob<{ default: MenuItem[] }>('../data/menu.json', { eager: true })
  const module = modules['../data/menu.json']
  const menuData = module?.default || []
  return transformMenuToRoutes(menuData)
}
