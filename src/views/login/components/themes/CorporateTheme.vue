<template>
  <div class="t-corp">
    <!-- 背景 -->
    <div class="t-corp__bg" aria-hidden="true">
      <div class="bg-base" />
      <div class="bg-lines">
        <span v-for="i in 8" :key="i" class="bg-line" :style="`animation-delay:${i * 0.4}s`" />
      </div>
      <div class="bg-corner bg-corner--tl" />
      <div class="bg-corner bg-corner--br" />
    </div>

    <!-- 页眉 -->
    <header class="t-corp__header">
      <div class="h-left">
        <img :src="logoUrl" alt="logo" class="h-logo" />
        <div class="h-divider" />
        <span class="h-title">心灵云集团管理系统</span>
      </div>
      <div class="h-right">
        <span class="h-time">{{ timeStr }}</span>
        <span class="h-date">{{ dateStr }}</span>
      </div>
    </header>

    <!-- 主体 -->
    <main class="t-corp__main">
      <!-- 左侧装饰 -->
      <div class="t-corp__accent" aria-hidden="true">
        <div class="accent-line" />
        <div class="accent-dot" />
        <div class="accent-line" />
      </div>

      <!-- 左侧文字 -->
      <div class="t-corp__left">
        <div class="corp-badge">ENTERPRISE EDITION</div>
        <h2 class="corp-title">安全 · 可靠<br /><span>心灵云集团信息系统</span></h2>
        <p class="corp-desc">
          面向大型企业的安全管控体系，集成多因子认证、权限管理、操作审计于一体，保障企业数据资产安全。
        </p>

        <div class="corp-certs">
          <div v-for="c in certs" :key="c" class="cert-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              width="18"
              height="18"
            >
              <path
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span>{{ c }}</span>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="t-corp__sep" aria-hidden="true">
        <div class="sep-line" />
        <div class="sep-diamond" />
        <div class="sep-line" />
      </div>

      <!-- 右侧登录卡片 -->
      <div class="t-corp__card">
        <div class="card-top-bar" />
        <div class="card-inner">
          <div class="card-head">
            <div class="card-head__logo">
              <img :src="logoUrl" alt="logo" />
            </div>
            <div>
              <h3 class="card-head__title">账号认证登录</h3>
              <p class="card-head__sub">请使用您的企业账号</p>
            </div>
          </div>

          <!-- ========== 登录表单（内联） ========== -->
          <form class="corp-form" @submit.prevent="handleSubmit">
            <div class="corpf-field">
              <label class="corpf-label">账号</label>
              <div class="corpf-input-wrap">
                <svg
                  class="corpf-input-icon"
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
                  class="corpf-input"
                  placeholder="请输入账号"
                  autocomplete="username"
                />
              </div>
            </div>

            <div class="corpf-field">
              <label class="corpf-label">密码</label>
              <div class="corpf-input-wrap">
                <svg
                  class="corpf-input-icon"
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
                  class="corpf-input corpf-input--pwd"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                />
                <button type="button" class="corpf-toggle" @click="showPwd = !showPwd">
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

            <div v-if="error" class="corpf-error">
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
              class="corpf-btn"
              :disabled="loading || !form.username || !form.password"
            >
              <span class="corpf-btn-shimmer" />
              <span v-if="loading" class="corpf-btn-spinner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              </span>
              <template v-else>
                <span class="corpf-btn-text">立即登录</span>
                <span class="corpf-btn-arrow">
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
              <span v-if="loading" class="corpf-btn-text">验证中...</span>
            </button>

            <!-- 测试账号提示 -->
            <div class="corpf-hint">
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
        <div class="card-bottom-bar" />
      </div>
    </main>

    <footer class="t-corp__footer">
      <span>© 2025 心灵云科技集团有限公司</span>
      <span class="footer-dot">·</span>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">蜀ICP备19027113号</a>
      <span class="footer-dot">·</span>
      <span>版权所有 · 违法必究</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import logoUrl from '@/assets/logo.png'

defineProps<{ loading?: boolean; error?: string }>()
const emit = defineEmits<{ submit: [form: { username: string; password: string }] }>()

const certs = ['等保三级认证', '国家信息安全标准', '企业数据合规认证']

const timeStr = ref('')
const dateStr = ref('')
const showPwd = ref(false)
const form = reactive({ username: 'EaseUI', password: '123456' })

function updateTime() {
  const now = new Date()
  timeStr.value = now.toLocaleTimeString('zh-CN', { hour12: false })
  dateStr.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})
onUnmounted(() => clearInterval(timer))

function handleSubmit() {
  if (form.username && form.password) {
    emit('submit', { username: form.username, password: form.password })
  }
}
</script>

<style scoped lang="scss">
$gold: #d4af37;
$gold-light: #f0d060;
$gold-dark: #a07c18;
$dark-bg: #0c0e1a;
$dark-card: #111422;

.t-corp {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $dark-bg;
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* 背景 */
.t-corp__bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.bg-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 175, 55, 0.06), transparent),
    radial-gradient(ellipse 60% 60% at 0% 100%, rgba(37, 40, 80, 0.5), transparent),
    linear-gradient(170deg, #0c0e1a, #14182e 60%, #0c0e1a);
}
.bg-lines {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.bg-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.08), transparent);
  animation: line-drift linear infinite;
  animation-duration: calc(8s + var(--i, 0) * 2s);
}
@for $i from 1 through 8 {
  .bg-line:nth-child(#{$i}) {
    top: #{($i - 1) * 13 + 5}%;
    --i: #{$i};
  }
}
@keyframes line-drift {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.bg-corner {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(212, 175, 55, 0.12);
  &--tl {
    top: -60px;
    left: -60px;
    border-radius: 50%;
  }
  &--br {
    bottom: -60px;
    right: -60px;
    border-radius: 50%;
  }
}

/* 页眉 */
.t-corp__header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  border-bottom: 1px solid rgba($gold, 0.15);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  animation: fade-down 0.6s ease;
}
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.h-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.h-logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba($gold, 0.3));
}
.h-divider {
  width: 1px;
  height: 22px;
  background: rgba($gold, 0.3);
}
.h-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
}

.h-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}
.h-time {
  font-size: 20px;
  font-weight: 300;
  color: $gold;
  letter-spacing: 3px;
  font-variant-numeric: tabular-nums;
}
.h-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
}

/* 主体 */
.t-corp__main {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 左侧装饰 */
.t-corp__accent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-right: 48px;
}
.accent-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(transparent, $gold, transparent);
}
.accent-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $gold;
  box-shadow: 0 0 10px rgba($gold, 0.6);
}

/* 左侧文字 */
.t-corp__left {
  flex: 1;
  max-width: 440px;
  padding-right: 48px;
  animation: slide-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(-28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.corp-badge {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 600;
  color: $gold;
  border: 1px solid rgba($gold, 0.4);
  background: rgba($gold, 0.08);
  padding: 4px 14px;
  border-radius: 4px;
  margin-bottom: 22px;
}

.corp-title {
  font-size: 38px;
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 20px;
  letter-spacing: 1px;
  span {
    color: $gold;
  }
}

.corp-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.9;
  margin: 0 0 32px;
}

.corp-certs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  svg {
    color: $gold;
    flex-shrink: 0;
  }
}

/* 分隔线 */
.t-corp__sep {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 48px;
}
.sep-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(transparent, rgba($gold, 0.25), transparent);
  min-height: 60px;
}
.sep-diamond {
  width: 10px;
  height: 10px;
  background: $gold;
  transform: rotate(45deg);
  box-shadow: 0 0 12px rgba($gold, 0.5);
}

/* 登录卡片 */
.t-corp__card {
  width: 400px;
  flex-shrink: 0;
  background: $dark-card;
  border: 1px solid rgba($gold, 0.18);
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba($gold, 0.05);
  animation: slide-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.card-top-bar {
  height: 3px;
  background: linear-gradient(90deg, $gold-dark, $gold, $gold-light, $gold, $gold-dark);
}
.card-bottom-bar {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba($gold, 0.3), transparent);
}

.card-inner {
  padding: 36px 36px 36px;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba($gold, 0.12);
}
.card-head__logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  flex-shrink: 0;
  background: rgba($gold, 0.1);
  border: 1px solid rgba($gold, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
}
.card-head__title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
}
.card-head__sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* ========== 内联表单样式 ========== */
.corp-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.corpf-field {
  margin-bottom: 16px;
}

.corpf-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: rgba($gold, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.corpf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.corpf-input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: rgba($gold, 0.5);
  pointer-events: none;
}

.corpf-input {
  width: 100%;
  height: 46px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba($gold, 0.2);
  border-radius: 6px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #fff;
  outline: none;
  transition:
    border-color 0.25s,
    background 0.25s,
    box-shadow 0.25s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:focus {
    border-color: rgba($gold, 0.5);
    background: rgba($gold, 0.04);
    box-shadow: 0 0 0 3px rgba($gold, 0.08);
  }
}

.corpf-input--pwd {
  padding-right: 44px;
}

.corpf-toggle {
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
  color: rgba($gold, 0.4);
  border-radius: 6px;
  transition: color 0.2s;
  &:hover {
    color: rgba($gold, 0.8);
  }
}

.corpf-error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #f87171;
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 6px;
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
.corpf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  margin-top: 8px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 3px;
  position: relative;
  overflow: hidden;
  color: #1a1a2e;
  background: linear-gradient(135deg, $gold-dark, $gold, $gold-light);
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba($gold, 0.3);

  .corpf-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .corpf-btn-arrow {
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

  .corpf-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .corpf-btn-spinner {
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
    box-shadow: 0 8px 30px rgba($gold, 0.4);

    .corpf-btn-shimmer {
      transform: translateX(100%);
      transition: transform 0.55s ease;
    }
    .corpf-btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .corpf-btn-text {
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
.corpf-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: rgba($gold, 0.55);
}

/* 页脚 */
.t-corp__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.22);
  letter-spacing: 0.5px;
  border-top: 1px solid rgba($gold, 0.08);
}
.footer-dot {
  color: rgba($gold, 0.4);
}
a {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 1024px) {
  .t-corp__left,
  .t-corp__accent,
  .t-corp__sep {
    display: none;
  }
  .t-corp__main {
    padding: 20px 24px;
  }
  .t-corp__card {
    width: 100%;
    max-width: 440px;
  }
  .t-corp__header {
    padding: 16px 20px;
  }
}
</style>
