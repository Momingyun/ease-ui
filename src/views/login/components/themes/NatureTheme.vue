<template>
  <div class="t-nature">
    <!-- 背景 -->
    <div class="t-nature__bg" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-waves">
        <svg class="wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,100 C360,180 720,20 1080,100 C1260,140 1380,80 1440,100 L1440,200 L0,200 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
        <svg class="wave wave--2" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,120 C240,60 480,160 720,100 C960,40 1200,140 1440,80 L1440,200 L0,200 Z"
            fill="rgba(255,255,255,0.04)"
          />
        </svg>
      </div>
      <span v-for="i in 6" :key="i" class="float-circle" :class="`float-circle--${i}`" />
    </div>

    <!-- 内容区 -->
    <div class="t-nature__content">
      <!-- 顶部 logo -->
      <div class="t-nature__logo">
        <div class="logo-ring-wrap">
          <img :src="logoUrl" alt="logo" class="logo-img" />
          <span class="logo-ring logo-ring--1" />
          <span class="logo-ring logo-ring--2" />
        </div>
        <div class="logo-text">
          <h1 class="logo-name">心灵云</h1>
          <p class="logo-tagline">数字健康 · 守护生命</p>
        </div>
      </div>

      <!-- 表单卡片 -->
      <div class="t-nature__card">
        <div class="card-header">
          <div class="card-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              width="22"
              height="22"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h2 class="card-title">员工健康管理系统</h2>
            <p class="card-sub">请使用企业账号登录</p>
          </div>
        </div>

        <!-- ========== 登录表单（内联） ========== -->
        <form class="nature-form" @submit.prevent="handleSubmit">
          <div class="nf-field">
            <label class="nf-label">账号</label>
            <div class="nf-input-wrap">
              <svg
                class="nf-input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                v-model="form.username"
                type="text"
                class="nf-input"
                placeholder="请输入账号"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="nf-field">
            <label class="nf-label">密码</label>
            <div class="nf-input-wrap">
              <svg
                class="nf-input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                v-model="form.password"
                :type="showPwd ? 'text' : 'password'"
                class="nf-input nf-input--pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
              <button type="button" class="nf-toggle" @click="showPwd = !showPwd">
                <svg
                  v-if="!showPwd"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  width="16"
                  height="16"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  width="16"
                  height="16"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="nf-error">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="14"
              height="14"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ error }}
          </div>

          <button
            type="submit"
            class="nf-btn"
            :disabled="loading || !form.username || !form.password"
          >
            <span class="nf-btn-shimmer" />
            <span v-if="loading" class="nf-btn-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </span>
            <template v-else>
              <span class="nf-btn-text">立即登录</span>
              <span class="nf-btn-arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </template>
            <span v-if="loading" class="nf-btn-text">验证中...</span>
          </button>

          <!-- 测试账号提示 -->
          <div class="nf-hint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="12"
              height="12"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            测试账号: EaseUI / 密码: 123456
          </div>
        </form>
      </div>

      <!-- 底部特性标签 -->
      <div class="t-nature__badges">
        <span v-for="b in badges" :key="b.text" class="badge">
          <svg :viewBox="b.icon.vb" fill="currentColor" width="13" height="13">
            <path :d="b.icon.d" />
          </svg>
          {{ b.text }}
        </span>
      </div>
    </div>

    <footer class="t-nature__footer">
      <span>© 2025 心灵云科技集团有限公司</span>
      <span class="footer-dot">·</span>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">蜀ICP备19027113号</a>
      <span class="footer-dot">·</span>
      <span>关注健康，关爱生命</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import logoUrl from '@/assets/logo.png'

defineProps<{ loading?: boolean; error?: string }>()
const emit = defineEmits<{ submit: [form: { username: string; password: string }] }>()

const badges = [
  {
    text: 'SSL 加密传输',
    icon: { vb: '0 0 24 24', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  },
  {
    text: '数据安全合规',
    icon: {
      vb: '0 0 24 24',
      d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
  },
  {
    text: '7×24小时服务',
    icon: { vb: '0 0 24 24', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  },
]

const showPwd = ref(false)
const form = reactive({ username: 'EaseUI', password: '123456' })

function handleSubmit() {
  if (form.username && form.password) {
    emit('submit', { username: form.username, password: form.password })
  }
}
</script>

<style scoped lang="scss">
.t-nature {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #064e3b;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

/* 背景 */
.t-nature__bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(150deg, #065f46 0%, #047857 30%, #059669 65%, #10b981 100%);
}
.bg-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
}
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 200px;
  animation: wave-move 8s ease-in-out infinite;
}
.wave--2 {
  animation-delay: -4s;
  animation-duration: 11s;
}
@keyframes wave-move {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-30px);
  }
}

.float-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  animation: float-up ease-in-out infinite;
  &--1 {
    width: 300px;
    height: 300px;
    top: -80px;
    left: -80px;
    animation-duration: 25s;
  }
  &--2 {
    width: 200px;
    height: 200px;
    top: 20%;
    right: -60px;
    animation-duration: 20s;
    animation-delay: -5s;
  }
  &--3 {
    width: 160px;
    height: 160px;
    bottom: 100px;
    left: 5%;
    animation-duration: 18s;
    animation-delay: -8s;
  }
  &--4 {
    width: 80px;
    height: 80px;
    top: 60%;
    right: 15%;
    background: rgba(255, 255, 255, 0.08);
    animation-duration: 15s;
    animation-delay: -3s;
  }
  &--5 {
    width: 50px;
    height: 50px;
    top: 30%;
    left: 20%;
    background: rgba(255, 255, 255, 0.1);
    animation-duration: 22s;
    animation-delay: -10s;
  }
  &--6 {
    width: 120px;
    height: 120px;
    bottom: 20%;
    right: -30px;
    animation-duration: 30s;
    animation-delay: -15s;
  }
}
@keyframes float-up {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* 内容 */
.t-nature__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 440px;
}

/* Logo 区 */
.t-nature__logo {
  display: flex;
  align-items: center;
  gap: 16px;
  animation: drop-in 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes drop-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.logo-ring-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  filter: brightness(1.15);
}
.logo-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  &--1 {
    inset: -4px;
    animation: ring-spin 8s linear infinite;
  }
  &--2 {
    inset: -10px;
    border-color: rgba(255, 255, 255, 0.12);
    animation: ring-spin 12s linear infinite reverse;
  }
}
@keyframes ring-spin {
  to {
    transform: rotate(360deg);
  }
}

.logo-name {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 4px;
  margin: 0 0 4px;
}
.logo-tagline {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 2px;
  margin: 0;
}

/* 主卡片 */
.t-nature__card {
  width: 100%;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  padding: 36px 36px 36px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  animation: card-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
@keyframes card-rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}
.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #059669;
}
.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 3px;
}
.card-sub {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* ========== 内联表单样式 ========== */
.nature-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.nf-field {
  margin-bottom: 16px;
}

.nf-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.nf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.nf-input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  pointer-events: none;
}

.nf-input {
  width: 100%;
  height: 46px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #1a1a2e;
  outline: none;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;

  &::placeholder {
    color: #d1d5db;
  }

  &:focus {
    border-color: #10b981;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
}

.nf-input--pwd {
  padding-right: 44px;
}

.nf-toggle {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 6px;
  transition: color 0.2s;
  &:hover {
    color: #6b7280;
  }
}

.nf-error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}

/* 登录按钮 */
.nf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  margin-top: 12px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 3px;
  position: relative;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(135deg, #059669, #10b981);
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);

  .nf-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.22) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .nf-btn-arrow {
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateX(-6px);
    transition:
      opacity 0.25s,
      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    svg {
      width: 17px;
      height: 17px;
    }
  }

  .nf-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .nf-btn-spinner {
    display: flex;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      animation: spin 0.75s linear infinite;
    }
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.012);
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);

    .nf-btn-shimmer {
      transform: translateX(100%);
      transition: transform 0.55s ease;
    }
    .nf-btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .nf-btn-text {
      letter-spacing: 4px;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.975);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 底部标签 */
.t-nature__badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  animation: fade-in 0.6s ease 0.4s both;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 20px;
}

.t-nature__footer {
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  z-index: 10;
  .footer-dot {
    color: rgba(255, 255, 255, 0.18);
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

/* 测试账号提示 */
.nf-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: rgba(16, 185, 129, 0.55);
}

@media (max-width: 500px) {
  .t-nature__card {
    padding: 28px 24px 24px;
  }
}
</style>
