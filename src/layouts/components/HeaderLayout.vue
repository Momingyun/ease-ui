<template>
  <header class="header">
    <!-- 左侧：Logo + 系统名称 -->
    <div class="header__brand">
      <div class="header__logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#4f6ef7" />
          <path
            d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16"
            stroke="#fff"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <circle cx="16" cy="18" r="4" fill="#fff" />
        </svg>
      </div>
      <span class="header__title">EASE UI</span>
    </div>

    <!-- 右侧：功能操作区 -->
    <div class="header__actions">
      <!-- 搜索 -->
      <div class="header__search">
        <XlyIcon name="el:Search" :size="16" color="#8e8ea0" />
        <input class="header__search-input" type="text" placeholder="搜索菜单、功能..." />
        <kbd class="header__search-kbd">⌘K</kbd>
      </div>

      <!-- 通知 -->
      <button class="header__action-btn" title="通知">
        <XlyIcon name="el:Bell" :size="18" />
        <span class="header__badge">3</span>
      </button>

      <!-- 全屏 -->
      <button class="header__action-btn" title="全屏">
        <XlyIcon name="el:FullScreen" :size="18" />
      </button>

      <!-- 用户信息 -->
      <div class="header__user" @click="showUserMenu = !showUserMenu">
        <div class="header__avatar">
          <XlyIcon name="el:User" :size="18" color="#fff" />
        </div>
        <span class="header__username">Admin</span>
        <XlyIcon
          class="header__arrow"
          :class="{ 'is-open': showUserMenu }"
          name="el:ArrowDown"
          :size="12"
          color="#8e8ea0"
        />
      </div>

      <!-- 用户下拉菜单 -->
      <Transition name="dropdown-fade">
        <div v-if="showUserMenu" class="header__user-dropdown">
          <div class="header__user-dropdown-header">
            <div class="header__avatar header__avatar--dropdown">
              <XlyIcon name="el:User" :size="18" color="#fff" />
            </div>
            <div class="header__user-dropdown-info">
              <span class="header__user-dropdown-name">Admin</span>
              <span class="header__user-dropdown-email">admin@example.com</span>
            </div>
          </div>
          <div class="header__user-dropdown-divider"></div>
          <div class="header__user-dropdown-item">
            <XlyIcon name="el:UserFilled" :size="16" />
            <span>个人中心</span>
          </div>
          <div class="header__user-dropdown-item">
            <XlyIcon name="el:Plus" :size="16" />
            <span>新建</span>
          </div>
          <div class="header__user-dropdown-divider"></div>
          <div class="header__user-dropdown-item header__user-dropdown-item--danger">
            <XlyIcon name="el:SwitchButton" :size="16" />
            <span>退出登录</span>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

const showUserMenu = ref(false)

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.header__user') && !target.closest('.header__user-dropdown')) {
    showUserMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$header-height: 100px;
$header-bg: #eef1f8;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$primary: #4f6ef7;
$radius: 10px;

/* ========== Header ========== */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 28px;
  background-color: $header-bg;
  flex-shrink: 0;
  position: relative;
}

/* ========== 左侧品牌 ========== */
.header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
}

.header__title {
  font-size: 20px;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.02em;
  user-select: none;
}

/* ========== 右侧操作区 ========== */
.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ========== 搜索栏 ========== */
.header__search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 38px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid transparent;
  border-radius: $radius;
  cursor: text;
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    border-color: rgba(79, 110, 247, 0.2);
  }

  &:focus-within {
    background: #fff;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
  }
}

.header__search-input {
  width: 160px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: $text-primary;

  &::placeholder {
    color: $text-default;
  }
}

.header__search-kbd {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  font-size: 11px;
  font-family: inherit;
  color: $text-default;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  line-height: 1.6;
  user-select: none;
}

/* ========== 操作按钮 ========== */
.header__action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: $radius;
  background: transparent;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: $text-primary;
  }

  &:active {
    transform: scale(0.95);
  }
}

/* ========== 通知徽标 ========== */
.header__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 5px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  background: #f53f3f;
  border-radius: 8px;
  line-height: 16px;
  text-align: center;
  pointer-events: none;
}

/* ========== 用户信息 ========== */
.header__user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  padding: 6px 12px 6px 6px;
  border-radius: $radius;
  cursor: pointer;
  transition: background-color 0.18s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}

.header__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4f6ef7, #8b5cf6);
  border-radius: 50%;
  color: #fff;
}

.header__username {
  font-size: 14px;
  font-weight: 500;
  color: $text-primary;
}

.header__arrow {
  width: 12px;
  height: 12px;
  color: $text-default;
  transition: transform 0.2s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

/* ========== 用户下拉菜单 ========== */
.header__user-dropdown {
  position: absolute;
  top: 100%;
  right: 28px;
  margin-top: 8px;
  width: 220px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 6px;
  z-index: 100;
}

.header__user-dropdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
}

.header__avatar--dropdown {
  width: 34px;
  height: 34px;
}

.header__user-dropdown-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header__user-dropdown-name {
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
}

.header__user-dropdown-email {
  font-size: 12px;
  color: $text-default;
}

.header__user-dropdown-divider {
  height: 1px;
  background: #f0f1f5;
  margin: 4px 0;
}

.header__user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(79, 110, 247, 0.06);
    color: $text-primary;
  }

  &--danger {
    &:hover {
      background: rgba(245, 63, 63, 0.06);
      color: #f53f3f;
    }
  }
}

/* ========== 下拉过渡 ========== */
.dropdown-fade-enter-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-fade-leave-active {
  transition: all 0.15s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
