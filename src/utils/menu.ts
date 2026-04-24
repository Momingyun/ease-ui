/**
 * 菜单工具类
 * 统一管理菜单数据，支持本地 JSON 和远程 API 两种获取方式
 */
import type { Component } from 'vue'
import { ElMessage } from 'element-plus'

// 菜单配置类型
export interface MenuItem {
  id: string
  name: string
  key: string
  icon?: string
  path?: string
  component?: string
  children?: MenuItem[]
  [key: string]: any
}

// 菜单数据源类型
export type MenuDataSource = 'local' | 'remote'

// 菜单缓存
let menuCache: MenuItem[] | null = null
let cacheSource: MenuDataSource | null = null

/**
 * 获取菜单数据
 * @param source 数据来源：'local' 本地JSON | 'remote' 远程API
 * @param apiUrl 远程API地址（仅 remote 模式需要）
 * @param forceRefresh 是否强制刷新缓存
 */
export async function getMenuData(
  source: MenuDataSource = 'local',
  apiUrl?: string,
  forceRefresh = false
): Promise<MenuItem[]> {
  // 如果有缓存且来源相同且不强制刷新，直接返回缓存
  if (menuCache && cacheSource === source && !forceRefresh) {
    return menuCache
  }

  let data: MenuItem[] = []

  if (source === 'local') {
    // 本地 JSON 模式
    const modules = import.meta.glob<{ default: MenuItem[] }>('../data/menu.json', { eager: true })
    const module = modules['../data/menu.json']
    data = module?.default || []
  } else if (source === 'remote' && apiUrl) {
    // 远程 API 模式
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data = await response.json()
    } catch (error) {
      console.error('[Menu] 获取远程菜单失败:', error)
      ElMessage.error('菜单加载失败，请刷新页面重试')
      // 失败时降级使用缓存或空数组
      return menuCache || []
    }
  }

  // 更新缓存
  menuCache = data
  cacheSource = source

  return data
}

/**
 * 清除菜单缓存
 */
export function clearMenuCache(): void {
  menuCache = null
  cacheSource = null
}

/**
 * 获取当前缓存的菜单数据（同步）
 * 如果没有缓存，返回空数组
 */
export function getCachedMenuData(): MenuItem[] {
  return menuCache || []
}

/**
 * 动态导入组件
 */
const viewModules = import.meta.glob<{ default: Component }>('../views/**/*.vue')

/**
 * 根据 component 字段解析对应的组件路径
 * @param component 组件路径，如 "home/home" -> views/home/home.vue
 */
export function resolveComponent(component: string): (() => Promise<Component>) | undefined {
  const candidates = [`../views/${component}.vue`, `../views/${component}/index.vue`]

  for (const path of candidates) {
    if (viewModules[path]) {
      return viewModules[path]
    }
  }

  console.warn(`[Menu] 未找到组件: ${component}`)
  return undefined
}

/**
 * 扁平化菜单数据（用于菜单组件）
 * 将嵌套的菜单结构展平为一维数组
 */
export function flattenMenu(data: MenuItem[]): MenuItem[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
    path: item.path,
    active: false,
    open: false,
    children: item.children ? flattenMenu(item.children) : undefined,
  }))
}

/**
 * 根据路径查找菜单项
 */
export function findMenuByPath(data: MenuItem[], path: string): MenuItem | null {
  for (const item of data) {
    if (item.path === path) return item
    if (item.children) {
      const found = findMenuByPath(item.children, path)
      if (found) return found
    }
  }
  return null
}

/**
 * 根据路径查找父级菜单
 */
export function findParentMenu(data: MenuItem[], path: string): MenuItem | null {
  for (const item of data) {
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return item
      }
      const found = findParentMenu(item.children, path)
      if (found) return found
    }
  }
  return null
}

/**
 * 菜单持久化存储键名
 */
export const MENU_STORAGE_KEY = 'xly_menu_permissions'

/**
 * 保存用户菜单权限到本地存储
 */
export function saveMenuPermissions(permissions: string[]): void {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(permissions))
}

/**
 * 获取用户菜单权限
 */
export function getMenuPermissions(): string[] {
  const stored = localStorage.getItem(MENU_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

/**
 * 清除用户菜单权限
 */
export function clearMenuPermissions(): void {
  localStorage.removeItem(MENU_STORAGE_KEY)
}

/**
 * 根据权限过滤菜单
 * @param data 完整菜单数据
 * @param permissions 用户权限列表
 */
export function filterMenuByPermissions(data: MenuItem[], permissions: string[]): MenuItem[] {
  return data.filter((item) => {
    // 如果有 children，递归过滤子菜单
    if (item.children?.length) {
      const filteredChildren = filterMenuByPermissions(item.children, permissions)
      // 只有当子菜单中有可显示的项时才显示父级
      return filteredChildren.length > 0
    }
    // 没有 children 的菜单，根据权限判断
    if (item.key && permissions.includes(item.key)) {
      return true
    }
    // 如果没有设置 key，默认显示
    return !item.key
  }).map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        children: filterMenuByPermissions(item.children, permissions),
      }
    }
    return item
  })
}

// 导出默认配置
export const defaultMenuConfig = {
  dataSource: 'local' as MenuDataSource,
  apiUrl: '/api/menu',
  cacheEnabled: true,
}
