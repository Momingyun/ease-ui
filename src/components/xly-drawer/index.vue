<template>
  <Teleport to="body">
    <Transition name="xly-drawer-fade">
      <div v-if="modelValue" class="xly-drawer-mask" :class="{ 'xly-drawer-mask--transparent': !showMask }" @click.self="handleMaskClick">
        <Transition :name="`xly-drawer-${direction}`" appear>
          <div
            v-if="modelValue"
            ref="drawerRef"
            class="xly-drawer"
            :class="drawerClass"
            :style="drawerStyle"
          >
            <!-- 头部 -->
            <div v-if="showHeader" class="xly-drawer__header">
              <div class="xly-drawer__title">
                <slot name="header">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <button v-if="showClose" class="xly-drawer__close" @click="handleClose">
                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <!-- 主体 -->
            <div class="xly-drawer__body">
              <slot />
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="xly-drawer__footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

const props = withDefaults(defineProps<{
  /** 是否显示抽屉（v-model） */
  modelValue: boolean
  /** 抽屉标题 */
  title?: string
  /** 抽屉方向 */
  direction?: DrawerDirection
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 是否显示头部 */
  showHeader?: boolean
  /** 是否显示遮罩层 */
  showMask?: boolean
  /** 点击遮罩是否关闭 */
  closeOnClickModal?: boolean
  /** 自定义宽度/高度，方向为 left/right 时为宽度，为 top/bottom 时为高度 */
  size?: string | number
  /** 自定义类名 */
  customClass?: string
  /** 是否显示底部插槽区域 */
  showFooter?: boolean
}>(), {
  title: '',
  direction: 'right',
  showClose: true,
  showHeader: true,
  showMask: true,
  closeOnClickModal: true,
  size: '30%',
  customClass: '',
  showFooter: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'afterClose'): void
}>()

const drawerRef = ref<HTMLDivElement>()

const isHorizontal = computed(() => props.direction === 'left' || props.direction === 'right')

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (typeof props.size === 'number') {
    if (isHorizontal.value) {
      style.width = `${props.size}px`
    } else {
      style.height = `${props.size}px`
    }
  } else {
    if (isHorizontal.value) {
      style.width = props.size
    } else {
      style.height = props.size
    }
  }
  
  return style
})

const drawerClass = computed(() => [
  `xly-drawer--${props.direction}`,
  props.customClass,
])

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleMaskClick() {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      emit('open')
      // 等 DOM 渲染完后触发 opened
      requestAnimationFrame(() => {
        emit('opened')
      })
    }
  },
)

// ESC 关闭
watch(
  () => props.modelValue,
  (val) => {
    if (!val) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.modelValue) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handler)
    // 关闭后移除
    watch(
      () => props.modelValue,
      (v) => {
        if (!v) {
          window.removeEventListener('keydown', handler)
          emit('afterClose')
        }
      },
      { once: true },
    )
  },
)
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$bg-mask: rgba(0, 0, 0, 0.45);
$bg-body: #fff;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$border-color: #f2f3f7;
$radius: 14px;
$shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06);
$transition-fast: 0.2s ease;

/* ========== 遮罩层 ========== */
.xly-drawer-mask {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: $bg-mask;
  overflow: hidden;
  transition: background-color 0.25s ease;

  &--transparent {
    background-color: transparent;
  }
}

/* ========== 抽屉主体 ========== */
.xly-drawer {
  position: absolute;
  background-color: $bg-body;
  box-shadow: $shadow;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &--left {
    top: 0;
    left: 0;
    height: 100vh;
    border-radius: 0 $radius $radius 0;
  }

  &--right {
    top: 0;
    right: 0;
    height: 100vh;
    border-radius: $radius 0 0 $radius;
  }

  &--top {
    top: 0;
    left: 0;
    width: 100vw;
    border-radius: 0 0 $radius $radius;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    width: 100vw;
    border-radius: $radius $radius 0 0;
  }
}

/* ========== 头部 ========== */
.xly-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 12px;
  user-select: none;
  flex-shrink: 0;
}

.xly-drawer__title {
  font-size: 17px;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
}

.xly-drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: $text-default;
  transition: all $transition-fast;
  flex-shrink: 0;
  margin: -4px -4px -4px 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: $text-secondary;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
}

/* ========== 主体 ========== */
.xly-drawer__body {
  padding: 4px 24px 20px;
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.7;
  overflow-y: auto;
  flex: 1;

  // 美化滚动条
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
}

/* ========== 底部 ========== */
.xly-drawer__footer {
  padding: 12px 24px 20px;
  flex-shrink: 0;
  border-top: 1px solid $border-color;
}

/* ========== 动画 ========== */

// 遮罩淡入淡出
.xly-drawer-fade-enter-active {
  transition: opacity 0.25s ease;
}
.xly-drawer-fade-leave-active {
  transition: opacity 0.2s ease;
}
.xly-drawer-fade-enter-from,
.xly-drawer-fade-leave-to {
  opacity: 0;
}

// 左侧滑入
.xly-drawer-left-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.xly-drawer-left-leave-active {
  transition: all 0.25s ease;
}
.xly-drawer-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.xly-drawer-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

// 右侧滑入
.xly-drawer-right-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.xly-drawer-right-leave-active {
  transition: all 0.25s ease;
}
.xly-drawer-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.xly-drawer-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// 顶部滑入
.xly-drawer-top-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.xly-drawer-top-leave-active {
  transition: all 0.25s ease;
}
.xly-drawer-top-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.xly-drawer-top-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

// 底部滑入
.xly-drawer-bottom-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.xly-drawer-bottom-leave-active {
  transition: all 0.25s ease;
}
.xly-drawer-bottom-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.xly-drawer-bottom-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
