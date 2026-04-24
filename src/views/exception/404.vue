<template>
  <div class="exception-page">
    <div class="exception-content">
      <!-- 404 图形 -->
      <div class="exception-illustration">
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 云朵 -->
          <ellipse cx="320" cy="60" rx="50" ry="30" fill="#eef1f8" />
          <ellipse cx="350" cy="50" rx="35" ry="22" fill="#eef1f8" />
          <ellipse cx="295" cy="55" rx="30" ry="18" fill="#eef1f8" />
          <!-- 地面 -->
          <rect x="50" y="240" width="300" height="8" rx="4" fill="#e2e6ef" />
          <!-- 左侧建筑 -->
          <rect x="60" y="160" width="60" height="80" rx="4" fill="#dce3f5" />
          <rect x="70" y="175" width="15" height="15" rx="2" fill="#c4cded" />
          <rect x="95" y="175" width="15" height="15" rx="2" fill="#c4cded" />
          <rect x="70" y="200" width="15" height="15" rx="2" fill="#c4cded" />
          <rect x="95" y="200" width="15" height="15" rx="2" fill="#c4cded" />
          <rect x="82" y="220" width="16" height="20" rx="2" fill="#b8c4e3" />
          <!-- 右侧建筑 -->
          <rect x="280" y="140" width="70" height="100" rx="4" fill="#dce3f5" />
          <rect x="290" y="155" width="18" height="18" rx="2" fill="#c4cded" />
          <rect x="320" y="155" width="18" height="18" rx="2" fill="#c4cded" />
          <rect x="290" y="185" width="18" height="18" rx="2" fill="#c4cded" />
          <rect x="320" y="185" width="18" height="18" rx="2" fill="#c4cded" />
          <rect x="290" y="215" width="18" height="18" rx="2" fill="#c4cded" />
          <rect x="320" y="215" width="18" height="18" rx="2" fill="#c4cded" />
          <!-- 404 数字 -->
          <text x="140" y="180" font-family="Arial Black, sans-serif" font-size="100" font-weight="900" fill="#4f6ef7" opacity="0.9">404</text>
          <!-- 问号 -->
          <text x="260" y="150" font-family="Arial, sans-serif" font-size="40" fill="#8e8ea0">?</text>
        </svg>
      </div>

      <!-- 错误信息 -->
      <div class="exception-info">
        <h1 class="exception-title">页面不存在</h1>
        <p class="exception-desc">抱歉，您访问的页面已经迷路啦，请检查网址是否正确</p>
      </div>

      <!-- 操作按钮 -->
      <div class="exception-actions">
        <el-button type="primary" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled, ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;

.exception-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.exception-content {
  text-align: center;
  max-width: 500px;
}

.exception-illustration {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 32px;

  svg {
    width: 100%;
    height: auto;
  }
}

.exception-info {
  margin-bottom: 32px;
}

.exception-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.exception-desc {
  font-size: 15px;
  color: $text-default;
  margin: 0;
  line-height: 1.6;
}

.exception-actions {
  display: flex;
  gap: 16px;
  justify-content: center;

  .el-button {
    min-width: 120px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;

    .el-icon {
      margin-right: 6px;
    }
  }
}
</style>
