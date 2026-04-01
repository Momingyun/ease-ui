<template>
  <div class="xly-worktab">
    <!-- 标签页容器 -->
    <div class="worktab-wrapper">
      <!-- 左滚动按钮 -->
      <button
        v-show="canScrollLeft"
        class="worktab-scroll-btn worktab-scroll-btn--left"
        @click="scrollBy(-scrollStep)"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- 标签页内容 -->
      <div
        ref="scrollRef"
        class="worktab-scroll"
        @wheel.prevent="handleWheel"
      >
        <TransitionGroup name="tab-fade" tag="div" class="worktab-list">
          <div
            v-for="tab in tabsStore.tabs"
            :key="tab.path"
            class="worktab-item"
            :class="{ 'is-active': tab.path === tabsStore.activeTab }"
            @click="handleClick(tab)"
            @contextmenu.prevent="(e) => handleContextMenu(e, tab)"
          >
            <span class="worktab-item__title">{{ tab.title }}</span>
            <button
              v-if="!tab.affix"
              class="worktab-item__close"
              @click.stop="handleClose(tab.path)"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </TransitionGroup>
      </div>

      <!-- 右滚动按钮 -->
      <button
        v-show="canScrollRight"
        class="worktab-scroll-btn worktab-scroll-btn--right"
        @click="scrollBy(scrollStep)"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <!-- 操作按钮 -->
    <div class="worktab-actions">
      <el-dropdown trigger="click" @command="handleCommand">
        <button class="worktab-action-btn" title="操作">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="close-current">
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item command="close-left">
              关闭左侧
            </el-dropdown-item>
            <el-dropdown-item command="close-right">
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item command="close-other">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item command="close-all" divided>
              关闭全部
            </el-dropdown-item>
            <el-dropdown-item command="refresh">
              刷新当前
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 右键菜单 -->
    <Teleport to="body">
      <Transition name="context-menu-fade">
        <div
          v-if="contextMenu.visible"
          class="worktab-context-menu"
          :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
        >
          <div
            class="worktab-context-menu__item"
            :class="{ 'is-disabled': contextMenu.tab?.affix }"
            @click="handleContextAction('close-current')"
          >
            关闭
          </div>
          <div
            class="worktab-context-menu__item"
            @click="handleContextAction('close-left')"
          >
            关闭左侧
          </div>
          <div
            class="worktab-context-menu__item"
            @click="handleContextAction('close-right')"
          >
            关闭右侧
          </div>
          <div class="worktab-context-menu__divider" />
          <div
            class="worktab-context-menu__item"
            @click="handleContextAction('close-other')"
          >
            关闭其他
          </div>
          <div
            class="worktab-context-menu__item"
            @click="handleContextAction('close-all')"
          >
            关闭全部
          </div>
          <div class="worktab-context-menu__divider" />
          <div
            class="worktab-context-menu__item"
            @click="handleContextAction('refresh')"
          >
            刷新
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsStore, type TabItem } from '@/stores/tabs'

defineOptions({ name: 'XlyWorktab' })

const router = useRouter()
const tabsStore = useTabsStore()

// 滚动相关
const scrollRef = ref<HTMLDivElement>()
const scrollStep = 200
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = scrollRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 1
}

function scrollBy(offset: number) {
  const el = scrollRef.value
  if (!el) return
  el.scrollBy({ left: offset, behavior: 'smooth' })
  // 短延迟后更新状态（等滚动动画完成）
  setTimeout(updateScrollState, 200)
}

function handleWheel(e: WheelEvent) {
  const delta = e.deltaY || e.deltaX
  const el = scrollRef.value
  if (!el) return
  const offset = Math.abs(delta) > 40 ? (delta > 0 ? scrollStep : -scrollStep) : delta
  el.scrollBy({ left: offset })
  nextTick(updateScrollState)
}

// 点击标签切换
function handleClick(tab: TabItem) {
  if (tab.path === tabsStore.activeTab) return
  router.push(tab.path)
}

// 关闭标签
function handleClose(path: string) {
  const target = tabsStore.closeTab(path)
  if (target) {
    router.push(target)
  }
}

// 下拉菜单操作
function handleCommand(command: string) {
  const path = tabsStore.activeTab
  switch (command) {
    case 'close-current': {
      const target = tabsStore.closeTab(path)
      if (target) router.push(target)
      break
    }
    case 'close-left':
      tabsStore.closeLeftTabs(path)
      break
    case 'close-right':
      tabsStore.closeRightTabs(path)
      break
    case 'close-other':
      tabsStore.closeOtherTabs(path)
      break
    case 'close-all': {
      const target = tabsStore.closeAllTabs()
      if (target) router.push(target)
      break
    }
    case 'refresh':
      router.go(0)
      break
  }
}

// 右键菜单
const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  tab: null as TabItem | null,
})

function handleContextMenu(e: MouseEvent, tab: TabItem) {
  contextMenu.visible = true
  contextMenu.x = e.clientX
  contextMenu.y = e.clientY
  contextMenu.tab = tab
}

function handleContextAction(action: string) {
  const tab = contextMenu.tab
  contextMenu.visible = false

  if (!tab) return

  // 先切换到右键点击的标签
  if (tab.path !== tabsStore.activeTab) {
    router.push(tab.path)
  }

  nextTick(() => {
    switch (action) {
      case 'close-current': {
        if (!tab.affix) {
          const target = tabsStore.closeTab(tab.path)
          if (target) router.push(target)
        }
        break
      }
      case 'close-left':
        tabsStore.closeLeftTabs(tab.path)
        break
      case 'close-right':
        tabsStore.closeRightTabs(tab.path)
        break
      case 'close-other':
        tabsStore.closeOtherTabs(tab.path)
        break
      case 'close-all': {
        const target = tabsStore.closeAllTabs()
        if (target) router.push(target)
        break
      }
      case 'refresh':
        router.go(0)
        break
    }
  })
}

// 点击空白处关闭右键菜单
function handleDocClick() {
  contextMenu.visible = false
}

// 监听标签变化，更新滚动状态
function onTabsChange() {
  nextTick(() => {
    updateScrollState()
    scrollToActive()
  })
}

// 滚动到激活的标签
function scrollToActive() {
  const el = scrollRef.value
  if (!el) return
  const activeItem = el.querySelector('.worktab-item.is-active') as HTMLElement
  if (!activeItem) return
  const containerRect = el.getBoundingClientRect()
  const itemRect = activeItem.getBoundingClientRect()
  // 判断是否在可视区域外
  if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
    const scrollLeft = el.scrollLeft + itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2
    el.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    setTimeout(updateScrollState, 200)
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocClick)
  nextTick(() => {
    updateScrollState()
    scrollToActive()
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocClick)
})

// 暴露给父组件监听
defineExpose({ onTabsChange })
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$border-color: #ebeef5;
$bg-hover: #f5f7fa;
$bg-active: #ecf0ff;
$transition: all 0.2s ease;

.xly-worktab {
  display: flex;
  align-items: center;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid $border-color;
  padding: 0 12px;
  flex-shrink: 0;
  gap: 8px;
}

.worktab-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 4px;
}

.worktab-scroll {
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.worktab-list {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  padding: 4px 0;
}

.worktab-scroll-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: $text-default;
  cursor: pointer;
  flex-shrink: 0;
  transition: $transition;

  &:hover {
    background: $bg-hover;
    color: $text-primary;
  }
}

.worktab-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  font-size: 13px;
  color: $text-secondary;
  cursor: pointer;
  user-select: none;
  transition: $transition;
  background: transparent;
  flex-shrink: 0;
  max-width: 160px;

  &:hover:not(.is-active) {
    background: $bg-hover;
    color: $text-primary;
  }

  &.is-active {
    background: $bg-active;
    color: $primary;
    font-weight: 500;
  }
}

.worktab-item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
  line-height: 1;
}

.worktab-item__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0;
  transition: $transition;
  padding: 0;

  .worktab-item:hover &,
  .worktab-item.is-active & {
    opacity: 0.6;
  }

  &:hover {
    opacity: 1 !important;
    background: rgba(0, 0, 0, 0.08);
  }
}

// 操作按钮区域
.worktab-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.worktab-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: $text-default;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: $bg-hover;
    color: $text-primary;
  }
}

// 标签动画
.tab-fade-enter-active {
  transition: all 0.2s ease;
}
.tab-fade-leave-active {
  transition: all 0.15s ease;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}
.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

// 右键菜单
.worktab-context-menu {
  position: fixed;
  z-index: 3000;
  min-width: 140px;
  padding: 4px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06);

  &__item {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 12px;
    font-size: 13px;
    color: $text-secondary;
    cursor: pointer;
    border-radius: 4px;
    transition: $transition;

    &:hover:not(.is-disabled) {
      background: rgba(79, 110, 247, 0.06);
      color: $primary;
    }

    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  &__divider {
    height: 1px;
    background: #f0f1f5;
    margin: 4px 0;
  }
}

.context-menu-fade-enter-active {
  transition: all 0.15s ease;
}
.context-menu-fade-leave-active {
  transition: all 0.1s ease;
}
.context-menu-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.context-menu-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
