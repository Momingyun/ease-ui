<template>
  <XlyDrawer
    v-model="drawerVisible"
    title="切换布局风格"
    direction="right"
    size="360px"
    :showHeader="true"
    :showClose="true"
    :showMask="true"
    :closeOnClickModal="true"
  >
    <div class="layout-selector">
      <div
        v-for="layout in layouts"
        :key="layout.key"
        class="layout-item"
        :class="{ active: currentLayout === layout.key }"
        @click="handleSelect(layout.key)"
      >
        <div class="layout-item__preview">
          <div class="layout-item__icon" :style="{ background: layout.bgColor }">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" :fill="layout.primaryColor" />
              <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
              <circle cx="16" cy="18" r="4" fill="#fff" />
            </svg>
          </div>
          <div class="layout-item__menu" :style="{ background: layout.menuBg }">
            <div v-for="i in 3" :key="i" class="layout-item__menu-line" :class="{ active: currentLayout === layout.key && i === 1 }"></div>
          </div>
        </div>
        <div class="layout-item__info">
          <span class="layout-item__name">{{ layout.label }}</span>
          <span class="layout-item__desc">{{ layout.desc }}</span>
        </div>
        <div v-if="currentLayout === layout.key" class="layout-item__check">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  </XlyDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import XlyDrawer from '@/components/xly-drawer/index.vue'
import { useMenuLayoutStore, type MenuLayout } from '@/stores/menuLayout'

defineOptions({ name: 'MenuLayoutDrawer' })

const menuLayoutStore = useMenuLayoutStore()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', layout: string): void
}>()

const drawerVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const currentLayout = computed(() => menuLayoutStore.currentLayout)

const layouts = [
  {
    key: 'vertical',
    label: '垂直布局',
    desc: '左侧垂直菜单，不占内容区',
    bgColor: '#eef1f8',
    primaryColor: '#4f6ef7',
    menuBg: '#eef1f8',
  },
  {
    key: 'split',
    label: '左右分栏',
    desc: '左侧菜单，右侧内容区',
    bgColor: '#ffffff',
    primaryColor: '#4f6ef7',
    menuBg: '#f5f7fa',
  },
  {
    key: 'horizontal',
    label: '水平布局',
    desc: '顶部水平菜单栏',
    bgColor: '#ffffff',
    primaryColor: '#4f6ef7',
    menuBg: '#f5f7fa',
  },
]

function handleSelect(key: MenuLayout) {
  menuLayoutStore.setLayout(key)
  emit('change', key)
}
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$text-primary: #1a1a2e;
$text-default: #8e8ea0;

.layout-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.layout-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: #fafafa;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f4ff;
    border-color: rgba($primary, 0.2);
  }

  &.active {
    background: #eaeffd;
    border-color: $primary;
  }

  &__preview {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
  }

  &__icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__menu {
    width: 36px;
    height: 40px;
    border-radius: 4px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
  }

  &__menu-line {
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;

    &:first-child {
      width: 100%;
    }

    &:nth-child(2) {
      width: 80%;
    }

    &:last-child {
      width: 60%;
    }

    &.active {
      background: $primary;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__name {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
  }

  &__desc {
    font-size: 12px;
    color: $text-default;
    line-height: 1.4;
  }

  &__check {
    width: 24px;
    height: 24px;
    background: $primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
  }
}
</style>
