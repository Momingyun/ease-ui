<template>
  <div class="login-layout">
    <!-- 左侧品牌区 -->
    <div class="brand-panel crm-brand">
      <div class="brand-content">
        <div class="brand-logo">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="16" cy="18" r="5" stroke="currentColor" stroke-width="2"/>
            <circle cx="32" cy="18" r="5" stroke="currentColor" stroke-width="2"/>
            <circle cx="24" cy="34" r="5" stroke="currentColor" stroke-width="2"/>
            <line x1="20" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            <line x1="18" y1="22" x2="21" y2="30" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            <line x1="30" y1="22" x2="27" y2="30" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
          </svg>
        </div>
        <h1 class="brand-title">客户关系管理系统</h1>
        <p class="brand-sub">Customer Relationship Management</p>
        <div class="brand-divider"></div>
        <p class="brand-slogan">洞察客户 · 连接价值 · 驱动增长</p>
      </div>
      <div class="geo-accent">
        <div class="grid-lines"></div>
      </div>
    </div>

    <!-- 右侧登录区 -->
    <div class="form-panel">
      <div class="form-card">
        <div class="form-header">
          <h2>用户登录</h2>
          <p>请输入账号信息以继续访问</p>
        </div>
        <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="handleLogin">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号" size="large" :prefix-icon="User"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" :prefix-icon="Lock" show-password/>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.remember">记住账号</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" :loading="loading" class="submit-btn" @click="handleLogin">登 录</el-button>
          </el-form-item>
        </el-form>
        <p class="test-hint">测试账号：EaseUI / 123456</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
defineProps({ loading: Boolean })
const emit = defineEmits(['submit'])
const form = reactive({ username: 'EaseUI', password: '123456', remember: false })
const formRef = ref()
const rules = { username: [{ required: true, message: '请输入账号' }], password: [{ required: true, message: '请输入密码' }] }
const handleLogin = () => formRef.value?.validate(valid => valid && emit('submit', { ...form }))
</script>

<style scoped>
.login-layout { display: flex; height: 100vh; }
.brand-panel { width: 45%; background: #1c1917; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.brand-content { position: relative; z-index: 2; text-align: center; padding: 0 40px; }
.brand-logo { width: 68px; height: 68px; margin: 0 auto 28px; color: #f87171; }
.brand-logo svg { width: 100%; height: 100%; }
.brand-title { font-size: 26px; font-weight: 700; color: #fafaf9; margin: 0 0 10px; letter-spacing: 4px; }
.brand-sub { font-size: 12px; color: #57534e; margin: 0 0 32px; letter-spacing: 1px; text-transform: uppercase; }
.brand-divider { width: 40px; height: 2px; background: #ef4444; margin: 0 auto 28px; }
.brand-slogan { font-size: 13px; color: #78716c; margin: 0; letter-spacing: 3px; }
.geo-accent { position: absolute; inset: 0; pointer-events: none; }
.grid-lines { position: absolute; inset: 20px; border: 1px solid rgba(239,68,68,0.06); }
.form-panel { flex: 1; display: flex; align-items: center; justify-content: center; background: #fafaf9; }
.form-card { width: 380px; }
.form-header { margin-bottom: 36px; }
.form-header h2 { font-size: 26px; font-weight: 700; color: #1c1917; margin: 0 0 10px; }
.form-header p { font-size: 14px; color: #a8a29e; margin: 0; }
:deep(.el-input__wrapper) { border-radius: 6px; }
.submit-btn { width: 100%; height: 44px; font-size: 15px; border-radius: 6px; }
.test-hint { text-align: center; font-size: 12px; color: #d6d3d1; margin: 12px 0 0; }
</style>
