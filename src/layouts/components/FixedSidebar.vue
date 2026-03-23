<template>
  <aside class="sidebar">
    <div class="sidebar-menu">
      <!-- 一级菜单 -->
      <div class="sidebar-menu-left">
        <div
          v-for="item in menuList"
          :key="item.id"
          class="sidebar-menu-item"
          :class="{ 'menu-is-active': item.active }"
          @click="handleLeftMenuClick(item)"
        >
          <ElIcon class="sidebar-menu-item-icon">
            <component :is="item.icon" />
          </ElIcon>
          <span class="sidebar-menu-item-text">{{ item.name }}</span>
        </div>
      </div>

      <!-- 二级菜单 -->
      <div v-if="subMenuList.length" class="sidebar-menu-right">
        <div class="sidebar-menu-right-title">{{ menuList.find((item) => item.open)?.name }}</div>
        <div v-for="sub in subMenuList" :key="sub.id" class="sub-menu-group">
          <div
            class="sidebar-menu-item-sub"
            :class="{ 'has-children': sub.children, active: sub.active }"
            @click="handleSubMenuClick(sub)"
          >
            <span class="sub-menu-text">{{ sub.name }}</span>
            <span v-if="sub.children" class="sidebar-menu-item-expand">
              <ElIcon>
                <ArrowUp v-if="sub.open" />
                <ArrowDown v-else />
              </ElIcon>
            </span>
          </div>

          <!-- 三级菜单（内联展开在二级菜单下方） -->
          <template v-if="sub.open && sub.children">
            <div
              v-for="child in sub.children"
              :key="child.id"
              class="sidebar-menu-item-sub-sub"
              :class="{ active: child.active }"
              @click.stop="handleThirdMenuClick(child)"
            >
              <span class="sub-sub-menu-text">{{ child.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import menuData from '@/data/menu.json'
import type { MenuItem } from '@/types/menu'

const router = useRouter()

/** 扩展 MenuItem，增加 UI 交互状态 */
interface SidebarMenuItem extends MenuItem {
  open?: boolean
  active?: boolean
  children?: SidebarMenuItem[]
}
/** 初始化菜单数据，附加交互状态 */
function initMenuItems(items: MenuItem[]): SidebarMenuItem[] {
  return items.map((item) => ({
    ...item,
    open: false,
    active: false,
    children: item.children ? initMenuItems(item.children) : undefined,
  }))
}

const menuList = reactive<SidebarMenuItem[]>(initMenuItems(menuData))

/** 当前展开的一级菜单的子项 */
const subMenuList = computed(() => {
  const active = menuList.find((item) => item.open)
  return active?.children ?? []
})

/** 判断是否为叶子菜单（有 path 且无 children，可触发路由跳转） */
function isLeafMenu(item: SidebarMenuItem): boolean {
  return !!item.path && !item.children?.length
}

/** 点击一级菜单：折叠其他，取消其他选中，展开当前 */
function handleLeftMenuClick(item: SidebarMenuItem) {
  menuList.forEach((m) => {
    m.open = false
    m.active = false
  })
  item.open = true
  item.active = true
  // 如果一级菜单是叶子节点（如首页），直接跳转
  if (isLeafMenu(item) && item.path) {
    router.push(item.path)
  }
}

/** 清除所有子菜单的激活状态（有子菜单的项跳过，其激活由自身展开控制） */
function clearSubMenuActive(items: SidebarMenuItem[]) {
  items.forEach((sub) => {
    if (sub.children?.length) {
      clearSubMenuActive(sub.children)
    } else {
      sub.active = false
    }
  })
}

/** 清除所有一级菜单下所有子菜单的激活状态 */
function clearAllSubMenuActive() {
  menuList.forEach((m) => {
    if (m.children?.length) {
      clearSubMenuActive(m.children)
    }
  })
}

/** 点击二级菜单：有子项则展开/折叠，无子项则清除全局激活并选中并跳转 */
function handleSubMenuClick(item: SidebarMenuItem) {
  if (item.children?.length) {
    item.open = !item.open
  } else {
    clearAllSubMenuActive()
    item.active = true
    if (item.path) {
      router.push(item.path)
    }
  }
}

/** 点击三级菜单：清除全局激活，选中当前并跳转 */
function handleThirdMenuClick(item: SidebarMenuItem) {
  clearAllSubMenuActive()
  item.active = true
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$sidebar-bg: #eef1f8;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$text-active-blue: #4f6ef7;
$bg-hover: rgba(79, 110, 247, 0.06);
$bg-active-blue: rgba(79, 110, 247, 0.1);
$left-width: 150px;
$right-width: 200px;
$transition-fast: 0.18s ease;
$transition-normal: 0.25s ease;

/* ========== 整体侧边栏 ========== */
.sidebar-menu {
  display: flex;
  height: calc(100vh - 100px);
  overflow: hidden;
  background-color: $sidebar-bg;
}

/* ========== 左侧一级菜单 ========== */
.sidebar-menu-left {
  flex: none;
  min-width: $left-width;
  padding: 16px 0;
  overflow-y: auto;
  overflow-x: hidden;

  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
}

.sidebar-menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 10px;
  height: 56px;
  margin: 4px 12px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  border-radius: 10px;
  transition: background-color $transition-fast;

  &:hover:not(.menu-is-active) {
    background-color: rgba(0, 0, 0, 0.03);
  }
}

.menu-is-active {
  background-color: #fff !important;

  .sidebar-menu-item-icon {
    color: $text-active-blue;
    transform: scale(1.1);
  }

  .sidebar-menu-item-text {
    color: $text-primary;
    font-weight: 600;
    font-size: 15px;
  }
}

/* 左侧一级菜单图标 */
.sidebar-menu-item-icon {
  font-size: 22px;
  color: $text-default;
  transition:
    color $transition-fast,
    transform $transition-normal;
  flex-shrink: 0;
}

/* 一级菜单文字 */
.sidebar-menu-item-text {
  margin-left: 12px;
  font-size: 14px;
  color: $text-secondary;
  transition:
    color $transition-fast,
    font-weight $transition-fast;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

/* ========== 右侧二/三级菜单 ========== */

.sidebar-menu-right {
  flex: none;
  width: $right-width;
  min-width: $right-width;
  max-width: $right-width;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0;
  border-top-left-radius: 20px;

  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.06);
    border-radius: 3px;
  }

  .sidebar-menu-right-title {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 0.5px;
    width: 100%;
    text-align: left;
    padding: 32px 24px 18px;
    line-height: 1.2;
    color: $text-primary;
    border-bottom: 1px solid #f2f3f7;
    margin-bottom: 8px;
  }
}

.sub-menu-group {
  overflow: hidden;
}

/* 二级菜单项 */
.sidebar-menu-item-sub {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 14px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  transition: background-color $transition-fast;

  &:hover:not(.active) {
    background-color: $bg-hover;
  }

  .sub-menu-text {
    font-size: 14px;
    font-weight: 400;
    color: $text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    transition:
      color $transition-fast,
      font-weight $transition-fast;
    letter-spacing: 0.2px;
  }

  &.has-children .sub-menu-text {
    color: $text-primary;
    font-weight: 600;
    font-size: 14px;
  }

  &.active {
    .sub-menu-text {
      color: $text-active-blue;
      font-weight: 600;
    }
    background-color: $bg-active-blue;
  }
}

/* 箭头图标 */
.sidebar-menu-item-expand {
  flex-shrink: 0;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  color: $text-default;
  font-size: 13px;
  transition: transform $transition-normal;
}

/* 三级菜单：内联在二级菜单下方，仅通过左侧缩进区分层级 */
.sidebar-menu-item-sub-sub {
  display: flex;
  align-items: center;
  margin: 2px 14px;
  padding: 12px 16px 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  transition: background-color $transition-fast;

  .sub-sub-menu-text {
    font-size: 14px;
    font-weight: 400;
    color: $text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    transition:
      color $transition-fast,
      font-weight $transition-fast;
    letter-spacing: 0.2px;
  }

  &:hover:not(.active) {
    background-color: $bg-hover;

    .sub-sub-menu-text {
      color: $text-secondary;
    }
  }

  &.active {
    .sub-sub-menu-text {
      color: $text-active-blue;
      font-weight: 600;
    }
    background-color: $bg-active-blue;
  }
}
</style>
