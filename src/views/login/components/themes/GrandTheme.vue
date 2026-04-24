<template>
  <div class="t-grand">
    <!-- 背景 -->
    <div class="t-grand__bg" aria-hidden="true">
      <div class="bg-overlay" />
      <div class="bg-mesh" />
      <div class="bg-halo bg-halo--1" />
      <div class="bg-halo bg-halo--2" />
    </div>

    <!-- 顶部导航栏 -->
    <header class="t-grand__header">
      <div class="header-brand">
        <img :src="logoUrl" alt="logo" class="header-logo" />
        <span class="header-name">心灵云企业数字健康管理平台</span>
      </div>
      <div class="header-right">
        <span class="header-tag">企业专属版</span>
      </div>
    </header>

    <!-- 主体 -->
    <main class="t-grand__body">
      <!-- 左侧信息 -->
      <div class="t-grand__info">
        <div class="info-badge">
          <span class="info-badge__dot" />
          安全认证系统
        </div>
        <h2 class="info-title">数字驱动，<br />健康赋能</h2>
        <p class="info-desc">
          为企业提供全方位员工健康管理解决方案，助力企业构建健康、高效的工作环境。
        </p>
        <div class="info-tags">
          <span v-for="tag in tags" :key="tag" class="info-tag">{{ tag }}</span>
        </div>
        <div class="info-nums">
          <div v-for="n in nums" :key="n.label" class="info-num">
            <span class="num-val"
              >{{ n.val }}<em>{{ n.unit }}</em></span
            >
            <span class="num-label">{{ n.label }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧登录卡片 -->
      <div class="t-grand__card">
        <div class="card-top">
          <h3 class="card-title">账号登录</h3>
          <p class="card-sub">欢迎使用心灵云管理系统</p>
        </div>

        <!-- ========== 登录表单（内联） ========== -->
        <form class="grand-form" @submit.prevent="handleSubmit">
          <div class="gf-field">
            <label class="gf-label">账号</label>
            <div class="gf-input-wrap">
              <svg
                class="gf-input-icon"
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
                class="gf-input"
                placeholder="请输入账号"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="gf-field">
            <label class="gf-label">密码</label>
            <div class="gf-input-wrap">
              <svg
                class="gf-input-icon"
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
                class="gf-input gf-input--pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
              <button type="button" class="gf-toggle" @click="showPwd = !showPwd">
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

          <div v-if="error" class="gf-error">
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
            class="gf-btn"
            :disabled="loading || !form.username || !form.password"
          >
            <span class="gf-btn-shimmer" />
            <span v-if="loading" class="gf-btn-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </span>
            <template v-else>
              <span class="gf-btn-text">立即登录</span>
              <span class="gf-btn-arrow">
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
            <span v-if="loading" class="gf-btn-text">验证中...</span>
          </button>

          <!-- 测试账号提示 -->
          <div class="gf-hint">
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
    </main>

    <footer class="t-grand__footer">
      <span>© 2025 心灵云科技集团有限公司</span>
      <span class="footer-dot">·</span>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">蜀ICP备19027113号</a>
      <span class="footer-dot">·</span>
      <span>All Rights Reserved</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import logoUrl from '@/assets/logo.png'

defineProps<{ loading?: boolean; error?: string }>()
const emit = defineEmits<{ submit: [form: { username: string; password: string }] }>()

const tags = ['健康档案', '风险预警', '数据分析', '智能报告']
const nums = [
  { val: '1200', unit: '+', label: '企业客户' },
  { val: '300', unit: '万+', label: '服务人次' },
  { val: '98', unit: '%', label: '用户满意度' },
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
.t-grand {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #07102a;
  position: relative;
  overflow: hidden;
}

/* 背景 */
.t-grand__bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 15% 85%, rgba(79, 110, 247, 0.2), transparent),
    radial-gradient(ellipse 60% 60% at 85% 15%, rgba(30, 80, 200, 0.15), transparent),
    linear-gradient(160deg, #07102a 0%, #0d1e45 50%, #091530 100%);
}
.bg-mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 110, 247, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 110, 247, 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
}
.bg-halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  &--1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(79, 110, 247, 0.08), transparent 60%);
    top: -200px;
    left: -100px;
  }
  &--2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.08), transparent 60%);
    bottom: -150px;
    right: -100px;
  }
}

/* 顶部栏 */
.t-grand__header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
.header-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
}
.header-tag {
  font-size: 11px;
  color: #80a8ff;
  letter-spacing: 1px;
  background: rgba(79, 110, 247, 0.12);
  border: 1px solid rgba(79, 110, 247, 0.3);
  padding: 4px 12px;
  border-radius: 20px;
}

/* 主体 */
.t-grand__body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 左侧信息 */
.t-grand__info {
  flex: 1;
  max-width: 480px;
  animation: slide-in-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-32px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 24px;
}
.info-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  animation: dot-blink 2s ease-in-out infinite;
}
@keyframes dot-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.info-title {
  font-size: 46px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 20px;
  letter-spacing: 2px;
  text-shadow: 0 0 60px rgba(79, 110, 247, 0.25);
}
.info-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.9;
  margin: 0 0 28px;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}
.info-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 20px;
  transition: all 0.25s;
  &:hover {
    background: rgba(79, 110, 247, 0.14);
    border-color: rgba(79, 110, 247, 0.4);
    color: #80a8ff;
  }
}

.info-nums {
  display: flex;
  gap: 40px;
}
.info-num {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.num-val {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  em {
    font-style: normal;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-left: 2px;
  }
}
.num-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.38);
}

/* 右侧卡片 */
.t-grand__card {
  width: 420px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  animation: slide-in-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  padding: 44px 40px 40px;
}
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(32px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.card-top {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: linear-gradient(180deg, #4f6ef7, #7c3aed);
    border-radius: 2px;
    flex-shrink: 0;
  }
}
.card-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 0 14px;
}

/* ========== 内联表单样式 ========== */
.grand-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.gf-field {
  margin-bottom: 16px;
}

.gf-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.gf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.gf-input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: rgba(79, 110, 247, 0.5);
  pointer-events: none;
}

.gf-input {
  width: 100%;
  height: 46px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
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
    border-color: rgba(79, 110, 247, 0.5);
    background: rgba(79, 110, 247, 0.06);
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
  }
}

.gf-input--pwd {
  padding-right: 44px;
}

.gf-toggle {
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
  color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  transition: color 0.2s;
  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
}

.gf-error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #f87171;
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.2);
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
.gf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 3px;
  position: relative;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(135deg, #1a3a8f, #4f6ef7, #6d28d9);
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba(79, 110, 247, 0.3);

  .gf-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .gf-btn-arrow {
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

  .gf-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .gf-btn-spinner {
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

    .gf-btn-shimmer {
      transform: translateX(100%);
      transition: transform 0.55s ease;
    }
    .gf-btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .gf-btn-text {
      letter-spacing: 4px;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.975);
  }
  &:disabled {
    opacity: 0.38;
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
.gf-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: rgba(79, 110, 247, 0.5);
}

/* 页脚 */
.t-grand__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.22);
  letter-spacing: 1px;
  .footer-dot {
    color: rgba(255, 255, 255, 0.12);
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 1024px) {
  .t-grand__info {
    display: none;
  }
  .t-grand__body {
    padding: 20px 24px;
  }
  .t-grand__card {
    width: 100%;
    max-width: 440px;
  }
}
@media (max-width: 768px) {
  .t-grand__header {
    padding: 18px 20px;
  }
  .t-grand__header .header-name {
    font-size: 13px;
  }
}
</style>
