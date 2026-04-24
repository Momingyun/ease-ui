<template>
  <div class="t-minimal">
    <!-- 左侧插图区 -->
    <div class="t-minimal__left">
      <div class="art-wrap">
        <span class="art-circle art-circle--1" />
        <span class="art-circle art-circle--2" />
        <span class="art-circle art-circle--3" />
        <!-- 核心内容 -->
        <div class="art-content">
          <img :src="logoUrl" alt="logo" class="art-logo" />
          <h2 class="art-title">心灵云</h2>
          <p class="art-desc">专注企业数字健康管理<br />让每一份关怀都精准抵达</p>
          <div class="art-stats">
            <div v-for="s in stats" :key="s.label" class="stat-item">
              <span class="stat-num">{{ s.num }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧表单区 -->
    <div class="t-minimal__right">
      <div class="form-wrap">
        <div class="form-head">
          <img :src="logoUrl" alt="logo" class="form-logo" />
          <div>
            <h2 class="form-title">欢迎登录</h2>
            <p class="form-sub">心灵云企业健康管理平台</p>
          </div>
        </div>

        <!-- ========== 登录表单（内联） ========== -->
        <form class="minimal-form" @submit.prevent="handleSubmit">
          <div class="mf-field">
            <label class="mf-label">账号</label>
            <div class="mf-input-wrap">
              <svg
                class="mf-input-icon"
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
                class="mf-input"
                placeholder="请输入账号"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="mf-field">
            <label class="mf-label">密码</label>
            <div class="mf-input-wrap">
              <svg
                class="mf-input-icon"
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
                class="mf-input mf-input--pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
              <button type="button" class="mf-toggle" @click="showPwd = !showPwd">
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

          <div v-if="error" class="mf-error">
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
            class="mf-btn"
            :disabled="loading || !form.username || !form.password"
          >
            <span class="mf-btn-shimmer" />
            <span v-if="loading" class="mf-btn-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </span>
            <template v-else>
              <span class="mf-btn-text">立即登录</span>
              <span class="mf-btn-arrow">
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
            <span v-if="loading" class="mf-btn-text">验证中...</span>
          </button>

          <!-- 测试账号提示 -->
          <div class="mf-hint">
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

        <p class="form-tip">© 2025 心灵云 · 隐私政策 · 服务协议</p>
      </div>
    </div>
  </div>

  <!-- 全局底部版权 -->
  <footer class="minimal-page-footer">
    <span>© 2025 心灵云科技集团有限公司</span>
    <span class="footer-dot">·</span>
    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">蜀ICP备19027113号</a>
    <span class="footer-dot">·</span>
    <span>版权所有 · 违法必究</span>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import logoUrl from '@/assets/logo.png'

defineProps<{ loading?: boolean; error?: string }>()
const emit = defineEmits<{ submit: [form: { username: string; password: string }] }>()

const stats = [
  { num: '500+', label: '合作企业' },
  { num: '100万+', label: '服务用户' },
  { num: '99.9%', label: '系统稳定性' },
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
.t-minimal {
  min-height: 100vh;
  display: flex;
}

/* 左侧 */
.t-minimal__left {
  width: 55%;
  background: linear-gradient(140deg, #f0f4ff 0%, #e8f0fe 50%, #eff0ff 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.art-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.art-circle {
  position: absolute;
  border-radius: 50%;
  &--1 {
    width: 520px;
    height: 520px;
    border: 1px solid rgba(79, 110, 247, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &--2 {
    width: 360px;
    height: 360px;
    border: 1px solid rgba(79, 110, 247, 0.08);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin-slow 35s linear infinite;
  }
  &--3 {
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(79, 110, 247, 0.06), transparent);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes spin-slow {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.art-content {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: art-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes art-rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.art-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 20px;
  filter: drop-shadow(0 8px 24px rgba(79, 110, 247, 0.28));
}

.art-title {
  font-size: 34px;
  font-weight: 800;
  color: #1a1a3e;
  letter-spacing: 5px;
  margin: 0 0 14px;
}
.art-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.9;
  margin: 0 0 36px;
}

.art-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 18px 28px;
  border: 1px solid rgba(79, 110, 247, 0.1);
  box-shadow: 0 4px 24px rgba(79, 110, 247, 0.07);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 22px;
  &:not(:last-child) {
    border-right: 1px solid rgba(79, 110, 247, 0.14);
  }
}
.stat-num {
  font-size: 20px;
  font-weight: 700;
  color: #4f6ef7;
}
.stat-label {
  font-size: 11px;
  color: #9ca3af;
}

/* 右侧 */
.t-minimal__right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 48px;
  background: #fff;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8%;
    height: 84%;
    width: 1px;
    background: linear-gradient(transparent, rgba(79, 110, 247, 0.1), transparent);
  }
}

.form-wrap {
  width: 100%;
  max-width: 360px;
  animation: form-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}
@keyframes form-rise {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.form-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
}
.form-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
}
.form-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 3px;
}
.form-sub {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}
.form-tip {
  text-align: center;
  font-size: 11px;
  color: #d1d5db;
  margin-top: 24px;
}

/* ========== 内联表单样式 ========== */
.minimal-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mf-field {
  margin-bottom: 18px;
}

.mf-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.mf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.mf-input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  pointer-events: none;
}

.mf-input {
  width: 100%;
  height: 48px;
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
    border-color: #4f6ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
  }
}

.mf-input--pwd {
  padding-right: 44px;
}

.mf-toggle {
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

.mf-error {
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
.mf-btn {
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
  background: linear-gradient(135deg, #4f6ef7, #6d28d9);
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba(79, 110, 247, 0.3);

  .mf-btn-shimmer {
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

  .mf-btn-arrow {
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

  .mf-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .mf-btn-spinner {
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
    box-shadow: 0 8px 30px rgba(79, 110, 247, 0.4);

    .mf-btn-shimmer {
      transform: translateX(100%);
      transition: transform 0.55s ease;
    }
    .mf-btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .mf-btn-text {
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

/* 测试账号提示 */
.mf-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: #9ca3af;
}

/* 全局底部版权 */
.minimal-page-footer {
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 11px;
  color: #9ca3af;
  z-index: 10;
  .footer-dot {
    color: #d1d5db;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .t-minimal__left {
    display: none;
  }
  .t-minimal__right {
    padding: 40px 28px;
  }
  .t-minimal__right::before {
    display: none;
  }
}
</style>
