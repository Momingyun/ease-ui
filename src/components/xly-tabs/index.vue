<template>
  <div class="xly-tabs" :class="tabsClass">
    <!-- 选项卡头部导航 -->
    <div class="xly-tabs__header" :class="{ 'is-sticky': sticky }" :style="sticky ? { top: stickyTop } : undefined">
      <div class="xly-tabs__nav-wrap">
        <!-- 左滚动按钮 -->
        <span
          v-if="scrollable && scrollOffset > 0"
          class="xly-tabs__nav-btn xly-tabs__nav-btn--prev"
          @click="scrollBy(-scrollStep)"
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>

        <div
          ref="navScrollRef"
          class="xly-tabs__nav-scroll"
          @wheel.prevent="handleWheel"
        >
          <div ref="navRef" class="xly-tabs__nav">
            <div
              v-for="pane in panes"
              :key="pane.uid"
              :ref="el => setItemRef(el, pane.uid)"
              class="xly-tabs__item"
              :class="{
                'is-active': pane.name === modelValue,
                'is-disabled': pane.disabled,
              }"
              @click="handleTabClick(pane)"
            >
              <span v-if="pane.icon" class="xly-tabs__item-icon">
                <el-icon><component :is="pane.icon" /></el-icon>
              </span>
              <span class="xly-tabs__item-label">{{ pane.label }}</span>
            </div>
            <!-- 活动指示条（line 类型） -->
            <div
              v-if="type === 'line'"
              class="xly-tabs__active-bar"
              :style="activeBarStyle"
            />
          </div>
        </div>

        <!-- 右滚动按钮 -->
        <span
          v-if="scrollable && canScrollRight"
          class="xly-tabs__nav-btn xly-tabs__nav-btn--next"
          @click="scrollBy(scrollStep)"
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </div>

    <!-- 选项卡内容区域 -->
    <div class="xly-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  provide,
  watch,
  onMounted,
  onUpdated,
  nextTick,
  getCurrentInstance,
} from 'vue'

export type TabType = 'line' | 'card' | 'segment'
export type TabPosition = 'top' | 'bottom'
export type TabSize = 'large' | 'default' | 'small'

export interface TabPaneInfo {
  uid: number
  name: string | number
  label: string
  disabled: boolean
  icon?: string
}

export interface TabsProps {
  /** 当前激活的选项卡标识（v-model） */
  modelValue: string | number
  /** 选项卡类型 */
  type?: TabType
  /** 尺寸 */
  size?: TabSize
  /** 选项卡位置 */
  tabPosition?: TabPosition
  /** 激活态颜色 */
  activeColor?: string
  /** 是否可滚动（当选项卡过多时） */
  scrollable?: boolean
  /** 是否开启粘性头部 */
  sticky?: boolean
  /** 粘性定位的 top 值 */
  stickyTop?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  type: 'line',
  size: 'default',
  tabPosition: 'top',
  activeColor: '#4f6ef7',
  scrollable: true,
  sticky: false,
  stickyTop: '0px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'tab-click', pane: TabPaneInfo): void
  (e: 'tab-change', value: string | number): void
}>()

// 选项卡面板注册/注销机制
let uidSeed = 0
const panes = ref<TabPaneInfo[]>([])

/** 子组件 TabPane 调用此方法注册自己 */
function registerPane(pane: Omit<TabPaneInfo, 'uid'>) {
  uidSeed++
  const uid = uidSeed
  panes.value.push({ uid, ...pane })
}

/** 子组件 TabPane 调用此方法注销自己 */
function unregisterPane(name: string | number) {
  const idx = panes.value.findIndex(p => p.name === name)
  if (idx > -1) panes.value.splice(idx, 1)
}

// provide 给子组件使用
provide('xlyTabsContext', {
  activeName: computed(() => props.modelValue),
  registerPane,
  unregisterPane,
})

// 导航相关 ref
const navScrollRef = ref<HTMLDivElement>()
const navRef = ref<HTMLDivElement>()
const scrollOffset = ref(0)
const canScrollRight = ref(false)
const itemRefs: Record<number, HTMLElement> = {}

// 样式计算
const tabsClass = computed(() => [
  `xly-tabs--${props.type}`,
  `xly-tabs--${props.size}`,
  `xly-tabs--${props.tabPosition}`,
])

const activeBarStyle = computed(() => {
  if (props.type !== 'line') return { display: 'none' }
  return {
    backgroundColor: props.activeColor,
  }
})

const scrollStep = 200

function setItemRef(el: any, uid: number) {
  if (el) {
    itemRefs[uid] = el as HTMLElement
  }
}

function handleTabClick(pane: TabPaneInfo) {
  if (pane.disabled) return
  if (pane.name !== props.modelValue) {
    emit('update:modelValue', pane.name)
    emit('tab-change', pane.name)
  }
  emit('tab-click', pane)
}

function handleWheel(e: WheelEvent) {
  if (!props.scrollable) return
  const delta = e.deltaY || e.deltaX
  scrollBy(Math.abs(delta) > 40 ? (delta > 0 ? scrollStep : -scrollStep) : delta)
}

function scrollBy(offset: number) {
  const el = navScrollRef.value
  if (!el) return
  const maxOffset = Math.max(0, el.scrollWidth - el.clientWidth)
  scrollOffset.value = Math.min(maxOffset, Math.max(0, scrollOffset.value + offset))
  updateScrollState()
}

function updateScrollState() {
  const el = navScrollRef.value
  if (!el) return
  canScrollRight.value = scrollOffset.value < el.scrollWidth - el.clientWidth
}

/** 更新活动指示条（line 类型） */
function updateActiveBar() {
  if (props.type !== 'line' || !navRef.value) return
  const activeIdx = panes.value.findIndex(p => p.name === props.modelValue)
  if (activeIdx === -1) return

  const bar = navRef.value.querySelector('.xly-tabs__active-bar') as HTMLElement
  const item = itemRefs[panes.value[activeIdx]!.uid]
  if (!bar || !item) return

  const navRect = navRef.value.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()

  bar.style.left = `${itemRect.left - navRect.left + scrollOffset.value}px`
  bar.style.width = `${itemRect.width}px`
}

function refreshLayout() {
  nextTick(() => {
    updateScrollState()
    updateActiveBar()
  })
}

onMounted(() => {
  refreshLayout()
})

onUpdated(() => {
  refreshLayout()
})

watch(() => props.modelValue, () => {
  refreshLayout()
})

watch(() => props.type, () => {
  refreshLayout()
})
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$primary: #4f6ef7;
$primary-hover: #3d5ce5;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$text-disabled: #c0c4cc;
$border-color: #e2e4ed;
$border-hover: #c8cbd8;
$bg-card: #f5f7fa;
$bg-segment: #f2f3f7;
$radius: 8px;
$radius-sm: 6px;
$transition: all 0.2s ease;

/* ========== 尺寸变量 ========== */
$size-large-height: 44px;
$size-large-font: 15px;
$size-large-padding: 0 20px;
$size-large-gap: 32px;

$size-default-height: 38px;
$size-default-font: 14px;
$size-default-padding: 0 16px;
$size-default-gap: 24px;

$size-small-height: 32px;
$size-small-font: 13px;
$size-small-padding: 0 12px;
$size-small-gap: 16px;

/* ========== 基础布局 ========== */
.xly-tabs {
  display: flex;
  flex-direction: column;

  &--bottom {
    flex-direction: column-reverse;
  }
}

/* ========== 头部 ========== */
.xly-tabs__header {
  flex-shrink: 0;

  &.is-sticky {
    position: sticky;
    z-index: 10;
    background-color: #fff;
  }
}

.xly-tabs__nav-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

/* ========== 导航滚动区域 ========== */
.xly-tabs__nav-scroll {
  overflow: hidden;
  flex: 1;

  // segment 类型不需要滚动
  .xly-tabs--segment & {
    overflow: visible;
  }
}

.xly-tabs__nav {
  position: relative;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  white-space: nowrap;
}

/* ========== 滚动按钮 ========== */
.xly-tabs__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  color: $text-default;
  transition: $transition;
  flex-shrink: 0;
  border: none;
  background: transparent;
  font-size: 16px;

  &:hover {
    color: $text-primary;
    background-color: rgba(0, 0, 0, 0.06);
  }
}

.xly-tabs__nav-btn--prev {
  margin-right: 4px;
}

.xly-tabs__nav-btn--next {
  margin-left: 4px;
}

/* ========== 选项卡项 ========== */
.xly-tabs__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: $size-default-padding;
  height: $size-default-height;
  font-size: $size-default-font;
  color: $text-secondary;
  cursor: pointer;
  transition: $transition;
  user-select: none;
  white-space: nowrap;
  position: relative;
  font-weight: 500;
  flex-shrink: 0;

  /* 大尺寸 */
  .xly-tabs--large & {
    padding: $size-large-padding;
    height: $size-large-height;
    font-size: $size-large-font;
  }

  /* 小尺寸 */
  .xly-tabs--small & {
    padding: $size-small-padding;
    height: $size-small-height;
    font-size: $size-small-font;
  }

  &:hover:not(.is-active):not(.is-disabled) {
    color: $primary;
  }

  &.is-disabled {
    color: $text-disabled;
    cursor: not-allowed;
  }
}

/* ========== Line 类型 ========== */
.xly-tabs--line {
  .xly-tabs__nav {
    gap: $size-default-gap;
    border-bottom: 1px solid $border-color;

    .xly-tabs--large & {
      gap: $size-large-gap;
    }
    .xly-tabs--small & {
      gap: $size-small-gap;
    }
  }

  .xly-tabs__item.is-active {
    color: $primary;
  }

  .xly-tabs__active-bar {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 1px;
    transition: left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                background-color 0.2s ease;
    z-index: 1;
  }
}

/* ========== Card 类型 ========== */
.xly-tabs--card {
  .xly-tabs__nav {
    border-bottom: 1px solid $border-color;
    gap: 4px;
  }

  .xly-tabs__item {
    padding: 0 20px;
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: $radius-sm $radius-sm 0 0;

    .xly-tabs--large & {
      padding: 0 24px;
    }
    .xly-tabs--small & {
      padding: 0 14px;
    }

    &.is-active {
      background-color: #fff;
      border-color: $border-color;
      color: $primary;
    }

    &:hover:not(.is-active):not(.is-disabled) {
      background-color: $bg-card;
    }
  }
}

/* ========== Segment 类型 ========== */
.xly-tabs--segment {
  .xly-tabs__nav {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    background-color: $bg-segment;
    border-radius: $radius;
  }

  .xly-tabs__item {
    border-radius: $radius-sm;
    justify-content: center;
    color: $text-secondary;

    &.is-active {
      background-color: #fff;
      color: $primary;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &:hover:not(.is-active):not(.is-disabled) {
      color: $text-primary;
    }
  }
}

/* ========== 图标 ========== */
.xly-tabs__item-icon {
  display: inline-flex;
  align-items: center;
  font-size: 1em;
}

/* ========== 内容区域 ========== */
.xly-tabs__content {
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
}
</style>
