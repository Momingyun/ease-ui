import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

const STORAGE_KEY = 'xly-worktab'
const STORAGE_VERSION = 1
const HOME_PATH = '/'

export interface TabItem {
  /** 路由路径，作为唯一标识 */
  path: string
  /** 标签显示名称 */
  title: string
  /** 路由名称（用于 keep-alive 匹配组件 name） */
  name?: string | symbol | null
  /** 是否固定（不可关闭） */
  affix?: boolean
}

export const useTabsStore = defineStore('tabs', () => {
  // 从 localStorage 恢复
  const saved = loadStorage()
  const tabs = ref<TabItem[]>(saved?.tabs || [])
  const activeTab = ref(saved?.activeTab || HOME_PATH)

  // 校验：activeTab 指向的标签必须存在
  if (!tabs.value.find((t) => t.path === activeTab.value)) {
    activeTab.value = tabs.value.length > 0 ? tabs.value[0]!.path : HOME_PATH
  }

  // 自动保存到 localStorage
  watchEffect(() => {
    // @ts-ignore
    saveStorage({
      tabs: tabs.value,
      activeTab: activeTab.value,
    })
  })

  // 缓存的路由名称列表（用于 keep-alive 的 include）
  const cachedNames = computed(() => {
    return tabs.value.filter((tab) => !!tab.name).map((tab) => String(tab.name))
  })

  /**
   * 添加标签页（如果已存在则只切换激活）
   */
  function addTab(route: RouteLocationNormalized) {
    const path = route.path

    // 已存在则切换激活
    const exist = tabs.value.find((tab) => tab.path === path)
    if (exist) {
      activeTab.value = path
      return
    }

    // 新增标签页
    const title = (route.meta?.title as string) || route.name?.toString() || path
    const isAffix = path === HOME_PATH
    tabs.value.push({
      path,
      title,
      name: route.name,
      ...(isAffix ? { affix: true } : {}),
    })
    activeTab.value = path
  }

  /**
   * 关闭标签页，返回应该跳转到的路径
   */
  function closeTab(path: string): string | null {
    const idx = tabs.value.findIndex((tab) => tab.path === path)
    if (idx === -1) return null

    // 固定标签不可关闭
    const tab = tabs.value[idx]!
    if (tab.affix) return null

    tabs.value.splice(idx, 1)

    // 如果关闭的是当前激活的标签，需要切换到相邻标签
    if (activeTab.value === path) {
      const nextIdx = Math.min(idx, tabs.value.length - 1)
      const next = tabs.value[nextIdx]!
      activeTab.value = next.path
      return next.path
    }

    return null
  }

  /**
   * 关闭其他标签页（保留当前 + 固定标签）
   */
  function closeOtherTabs(path?: string) {
    const keepPath = path || activeTab.value
    tabs.value = tabs.value.filter((tab) => tab.path === keepPath || tab.affix)
    activeTab.value = keepPath
  }

  /**
   * 关闭所有可关闭的标签页
   */
  function closeAllTabs(): string | null {
    const affixTabs = tabs.value.filter((tab) => tab.affix)
    tabs.value = affixTabs
    if (affixTabs.length > 0) {
      const lastTab = affixTabs[affixTabs.length - 1]!
      activeTab.value = lastTab.path
      return activeTab.value
    }
    activeTab.value = ''
    return HOME_PATH
  }

  /**
   * 关闭右侧标签页
   */
  function closeRightTabs(path: string) {
    const idx = tabs.value.findIndex((tab) => tab.path === path)
    if (idx === -1) return
    tabs.value = tabs.value.filter((tab, i) => i <= idx || tab.affix)
    // 如果当前激活的在关闭范围内，切换到该标签
    const currentIdx = tabs.value.findIndex((tab) => tab.path === activeTab.value)
    if (currentIdx === -1) {
      activeTab.value = path
    }
  }

  /**
   * 关闭左侧标签页
   */
  function closeLeftTabs(path: string) {
    const idx = tabs.value.findIndex((tab) => tab.path === path)
    if (idx === -1) return
    tabs.value = tabs.value.filter((tab, i) => i >= idx || tab.affix)
    const currentIdx = tabs.value.findIndex((tab) => tab.path === activeTab.value)
    if (currentIdx === -1) {
      activeTab.value = path
    }
  }

  return {
    tabs,
    activeTab,
    cachedNames,
    addTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    closeRightTabs,
    closeLeftTabs,
  }
})

// ========== 持久化工具函数 ==========

interface StorageData {
  tabs: TabItem[]
  activeTab: string
  version: number
}

function loadStorage(): StorageData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as StorageData
    // 版本不匹配则废弃旧数据
    if (data.version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function saveStorage(data: StorageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, version: STORAGE_VERSION }))
  } catch {
    // quota exceeded or privacy mode
  }
}
