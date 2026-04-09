<template>
  <div class="layout-container">
    <!-- 顶部导航 -->
    <HeaderLayout />
    <!-- 主体区域 -->
    <div class="layout-body">
      <!-- 左侧菜单 -->
      <FixedSidebar ref="sidebarRef" class="layout-sidebar" />
      <!-- 右侧内容 -->
      <div class="layout-main">
        <!-- 标签页 -->
        <XlyWorktab ref="worktabRef" />
        <!-- 页面内容（keep-alive 缓存） -->
        <main class="layout-content" ref="contentRef">
          <RouterView v-slot="{ Component, route }">
            <KeepAlive>
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </RouterView>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderLayout from './components/HeaderLayout.vue'
import FixedSidebar from './components/FixedSidebar.vue'
import XlyWorktab from '@/components/xly-worktab/index.vue'
import { useTabsStore } from '@/stores/tabs'
import menuData from '@/data/menu.json'

const route = useRoute()
const tabsStore = useTabsStore()
const worktabRef = ref<InstanceType<typeof XlyWorktab>>()
const contentRef = ref<HTMLElement>()

// 路由变化时重置内容区滚动位置
watch(
  () => route.path,
  () => {
    if (contentRef.value) {
      contentRef.value.scrollTop = 0
    }
  },
)

// 从菜单数据中匹配路由标题
function getRouteTitle(path: string): string {
  for (const item of menuData) {
    if (item.path === path) return item.name
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return child.name
        if (child.children) {
          for (const grand of child.children) {
            if (grand.path === path) return grand.name
          }
        }
      }
    }
  }
  return path
}

// 监听路由变化，自动添加标签
watch(
  () => route.path,
  () => {
    tabsStore.addTab({
      ...route,
      meta: { ...route.meta, title: getRouteTitle(route.path) },
    })
    nextTick(() => {
      worktabRef.value?.onTabsChange()
    })
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
$corner-radius: 20px;

.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.layout-sidebar {
  overflow: hidden;
  flex-shrink: 0;
}

.layout-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.layout-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-top-left-radius: $corner-radius;

  /* 美化滚动条 */
  .layout-content::-webkit-scrollbar {
    width: 6px;
  }
  .layout-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  .layout-content::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
