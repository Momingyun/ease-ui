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
        <main class="layout-content">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLayout from './components/HeaderLayout.vue'
import FixedSidebar from './components/FixedSidebar.vue'
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
}

.layout-main {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
  border-top-left-radius: $corner-radius;

  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
