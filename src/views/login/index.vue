<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="login-bg">
      <div class="login-bg__circle login-bg__circle--1" />
      <div class="login-bg__circle login-bg__circle--2" />
      <div class="login-bg__circle login-bg__circle--3" />
      <div class="login-bg__grid" />
    </div>

    <!-- 主体卡片 -->
    <div class="login-card">
      <!-- 左侧品牌区 -->
      <div class="login-brand">
        <div class="login-brand__decor">
          <span v-for="i in 6" :key="i" class="login-brand__ring" :class="`login-brand__ring--${i}`" />
        </div>
        <div class="login-brand__content">
          <div class="login-brand__logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.15)" />
              <path
                d="M12 24C12 17.373 17.373 12 24 12C30.627 12 36 17.373 36 24"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
              />
              <circle cx="24" cy="27" r="6" fill="#fff" />
            </svg>
          </div>
          <h1 class="login-brand__title">EASE UI</h1>
          <p class="login-brand__desc">基于 Vue 3 的企业级管理后台组件库</p>
          <div class="login-brand__features">
            <div class="login-brand__feature">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
              <span>零依赖原生组件</span>
            </div>
            <div class="login-brand__feature">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
              <span>TypeScript 支持</span>
            </div>
            <div class="login-brand__feature">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
              <span>完善的文档示例</span>
            </div>
          </div>
        </div>
        <div class="login-brand__footer">
          <span class="login-brand__version">v1.0.0</span>
          <a class="login-brand__link" href="https://gitee.com/yun_hua_admin/ease-ui" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Gitee</span>
          </a>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="login-form">
        <div class="login-form__header">
          <h2 class="login-form__title">欢迎回来</h2>
          <p class="login-form__subtitle">请登录你的账号以继续</p>
        </div>

        <form class="login-form__body" @submit.prevent="handleLogin">
          <div class="login-field">
            <label class="login-field__label">账号</label>
            <div class="login-field__wrap">
              <svg class="login-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input
                v-model="form.username"
                class="login-field__input"
                type="text"
                placeholder="请输入账号"
                autocomplete="username"
                :disabled="loading"
              />
            </div>
          </div>

          <div class="login-field">
            <label class="login-field__label">密码</label>
            <div class="login-field__wrap">
              <svg class="login-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                v-model="form.password"
                class="login-field__input"
                type="password"
                placeholder="请输入密码"
                autocomplete="current-password"
                :disabled="loading"
              />
            </div>
          </div>

          <div v-if="errorMsg" class="login-form__error">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>{{ errorMsg }}</span>
          </div>

          <button type="submit" class="login-btn" :disabled="loading || !form.username || !form.password">
            <svg v-if="loading" class="login-btn__spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            <span>{{ loading ? '登录中...' : '登 录' }}</span>
          </button>
        </form>

        <div class="login-form__footer">
          <span>提示：任意账号密码均可登录（模拟模式）</span>
        </div>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="login-copyright">
      <span>© 2025 Ease UI. All rights reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

defineOptions({ name: 'XlyLogin' })

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const errorMsg = ref('')

const form = reactive({
  username: 'EaseUI',
  password: '123456',
})

async function handleLogin() {
  if (!form.username.trim() || !form.password.trim()) {
    errorMsg.value = '请输入账号和密码'
    return
  }

  errorMsg.value = ''
  loading.value = true

  try {
    await userStore.login(form.username.trim(), form.password.trim())
    const redirect = (router.currentRoute.value.query.redirect as string) || '/'
    await router.push(redirect)
  } catch {
    errorMsg.value = '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$primary-hover: #4540d4;
$primary-light: rgba(79, 110, 247, 0.08);
$radius: 12px;
$radius-lg: 20px;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-muted: #8e8ea0;

/* ========== 页面容器 ========== */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f8;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* ========== 背景装饰 ========== */
.login-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.login-bg__circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;

  &--1 {
    width: 600px;
    height: 600px;
    background: rgba($primary, 0.15);
    top: -200px;
    right: -100px;
    animation: float-1 20s ease-in-out infinite;
  }

  &--2 {
    width: 400px;
    height: 400px;
    background: rgba(124, 58, 237, 0.12);
    bottom: -150px;
    left: -100px;
    animation: float-2 25s ease-in-out infinite;
  }

  &--3 {
    width: 300px;
    height: 300px;
    background: rgba(56, 189, 248, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float-3 18s ease-in-out infinite;
  }
}

.login-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 110, 247, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 110, 247, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-40px, 30px); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -40px); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.15); }
}

/* ========== 卡片 ========== */
.login-card {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 520px;
  background: #fff;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 1;
  animation: card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ========== 左侧品牌区 ========== */
.login-brand {
  width: 380px;
  flex-shrink: 0;
  background: linear-gradient(160deg, $primary 0%, #6d28d9 60%, #7c3aed 100%);
  display: flex;
  flex-direction: column;
  padding: 48px 36px 32px;
  position: relative;
  overflow: hidden;
}

.login-brand__decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-brand__ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);

  &--1 { width: 300px; height: 300px; top: -80px; right: -80px; }
  &--2 { width: 200px; height: 200px; top: -20px; right: -20px; border-color: rgba(255, 255, 255, 0.04); }
  &--3 { width: 150px; height: 150px; bottom: 60px; left: -40px; }
  &--4 { width: 100px; height: 100px; bottom: 100px; left: -10px; border-color: rgba(255, 255, 255, 0.04); }
  &--5 { width: 80px; height: 80px; top: 50%; left: 50%; transform: translate(-50%, -50%); border-color: rgba(255, 255, 255, 0.08); animation: pulse-ring 4s ease-in-out infinite; }
  &--6 { width: 50px; height: 50px; top: 60%; right: 30%; background: rgba(255, 255, 255, 0.04); border: none; }
}

@keyframes pulse-ring {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

.login-brand__content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-brand__logo {
  width: 52px;
  height: 52px;
  margin-bottom: 28px;
  animation: logo-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;

  svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes logo-in {
  from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
  to { opacity: 1; transform: scale(1) rotate(0); }
}

.login-brand__title {
  font-size: 30px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 3px;
  margin: 0 0 12px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.login-brand__desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0 0 32px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

@keyframes text-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-brand__features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

.login-brand__feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);

  svg {
    color: rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
  }
}

.login-brand__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
}

.login-brand__version {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
}

.login-brand__link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
}

/* ========== 右侧表单区 ========== */
.login-form {
  flex: 1;
  padding: 52px 48px 36px;
  display: flex;
  flex-direction: column;
}

.login-form__header {
  margin-bottom: 36px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.login-form__title {
  font-size: 26px;
  font-weight: 700;
  color: $text-primary;
  margin: 0 0 8px;
}

.login-form__subtitle {
  font-size: 14px;
  color: $text-muted;
  margin: 0;
}

.login-form__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}

/* ========== 表单字段 ========== */
.login-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.login-field__label {
  font-size: 13px;
  font-weight: 600;
  color: $text-secondary;
  letter-spacing: 0.2px;
}

.login-field__wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 46px;
  background: $primary-light;
  border: 1.5px solid transparent;
  border-radius: $radius;
  transition: all 0.25s ease;

  &:focus-within {
    background: #fff;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.1);
  }

  &:hover:not(:focus-within) {
    background: rgba($primary, 0.05);
  }
}

.login-field__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: $text-muted;
  transition: color 0.25s;
}

.login-field__wrap:focus-within .login-field__icon {
  color: $primary;
}

.login-field__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: $text-primary;
  height: 100%;
  font-family: inherit;

  &::placeholder {
    color: #b8bcc8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

/* ========== 错误提示 ========== */
.login-form__error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #f53f3f;
  background: #fef2f2;
  border-radius: $radius;
  border: 1px solid #fecaca;
  margin-top: -4px;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* ========== 登录按钮 ========== */
.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  margin-top: 6px;
  border: none;
  border-radius: $radius;
  background: linear-gradient(135deg, $primary 0%, #6d28d9 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover:not(:disabled)::before {
    opacity: 1;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow:
      0 4px 16px rgba($primary, 0.35),
      0 2px 4px rgba($primary, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.login-btn__spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ========== 底部提示 ========== */
.login-form__footer {
  text-align: center;
  font-size: 12px;
  color: $text-muted;
  padding-top: 16px;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

/* ========== 底部版权 ========== */
.login-copyright {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #b0b5c3;
  z-index: 1;
  animation: text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
}

/* ========== 响应式 ========== */
@media (max-width: 720px) {
  .login-brand {
    display: none;
  }

  .login-card {
    max-width: 420px;
    min-height: auto;
  }

  .login-form {
    padding: 40px 32px 32px;
  }
}
</style>
