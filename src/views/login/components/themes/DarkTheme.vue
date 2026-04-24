<template>
  <div class="t-dark">
    <canvas ref="canvasRef" class="t-dark__canvas" aria-hidden="true" />

    <div class="t-dark__center">
      <!-- 左侧装饰线 -->
      <div class="side-lines side-lines--left" aria-hidden="true">
        <span
          v-for="i in 5"
          :key="i"
          class="side-line"
          :style="`animation-delay:${i * 0.28}s;width:${[110, 70, 90, 55, 80][i - 1]}px`"
        />
      </div>

      <!-- 主卡片 -->
      <div class="t-dark__card">
        <div class="card-glow" aria-hidden="true" />
        <div class="scan-line" aria-hidden="true" />

        <div class="t-dark__logo">
          <img :src="logoUrl" alt="logo" />
          <div class="logo-ring" />
        </div>

        <h1 class="t-dark__title">心灵云管理系统</h1>
        <p class="t-dark__sub">XINGLING CLOUD PLATFORM</p>

        <!-- 状态指示器 -->
        <div class="status-bar">
          <span class="status-dot" />
          <span class="status-text">系统安全运行中</span>
          <span class="status-value">99.9%</span>
        </div>

        <!-- ========== 登录表单（内联） ========== -->
        <form class="dark-form" @submit.prevent="handleSubmit">
          <div class="df-field">
            <label class="df-label">账号</label>
            <div class="df-input-wrap">
              <svg
                class="df-input-icon"
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
                class="df-input"
                placeholder="请输入账号"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="df-field">
            <label class="df-label">密码</label>
            <div class="df-input-wrap">
              <svg
                class="df-input-icon"
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
                class="df-input df-input--pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
              <button type="button" class="df-toggle" @click="showPwd = !showPwd">
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

          <div v-if="error" class="df-error">
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
            class="df-btn"
            :disabled="loading || !form.username || !form.password"
          >
            <span class="df-btn-shimmer" />
            <span v-if="loading" class="df-btn-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </span>
            <template v-else>
              <span class="df-btn-text">立即登录</span>
              <span class="df-btn-arrow">
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
            <span v-if="loading" class="df-btn-text">验证中...</span>
          </button>

          <!-- 测试账号提示 -->
          <div class="df-hint">
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

      <!-- 右侧装饰线 -->
      <div class="side-lines side-lines--right" aria-hidden="true">
        <span
          v-for="i in 5"
          :key="i"
          class="side-line"
          :style="`animation-delay:${i * 0.28 + 0.14}s;width:${[110, 70, 90, 55, 80][i - 1]}px`"
        />
      </div>
    </div>

    <footer class="dark-page-footer">
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

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}
let pts: Particle[] = []

function initCanvas() {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  c.width = window.innerWidth
  c.height = window.innerHeight

  pts = Array.from({ length: 90 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.6 + 0.3,
    a: Math.random() * 0.6 + 0.2,
  }))

  cancelAnimationFrame(animId)

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    pts.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > c.width) p.vx *= -1
      if (p.y < 0 || p.y > c.height) p.vy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(79,110,247,${p.a * 0.5})`
      ctx.fill()
    })
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x,
          dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 110) {
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(79,110,247,${(1 - d / 110) * 0.18})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => initCanvas())
onUnmounted(() => cancelAnimationFrame(animId))

const showPwd = ref(false)
const form = reactive({ username: 'EaseUI', password: '123456' })

function handleSubmit() {
  if (form.username && form.password) {
    emit('submit', { username: form.username, password: form.password })
  }
}
</script>

<style scoped lang="scss">
.t-dark {
  min-height: 100vh;
  background: #060a14;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.t-dark__canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.t-dark__center {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 28px;
}

/* 主卡片 */
.t-dark__card {
  width: 420px;
  background: rgba(10, 16, 30, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(79, 110, 247, 0.22);
  border-radius: 20px;
  padding: 44px 40px 40px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 60px rgba(79, 110, 247, 0.1),
    0 40px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: rise-up 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes rise-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.card-glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(79, 110, 247, 0.16), transparent 70%);
  pointer-events: none;
  animation: glow-pulse 4s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.25);
  }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(79, 110, 247, 0.6), transparent);
  animation: scan 3s ease-in-out infinite;
}
@keyframes scan {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* logo */
.t-dark__logo {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(79, 110, 247, 0.25), rgba(124, 58, 237, 0.25));
  border: 1px solid rgba(79, 110, 247, 0.35);
  border-radius: 18px;
  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
  }
}

.logo-ring {
  position: absolute;
  inset: -6px;
  border-radius: 24px;
  border: 1px solid rgba(79, 110, 247, 0.2);
  animation: ring-pulse 3s ease-in-out infinite;
}
@keyframes ring-pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.t-dark__title {
  font-size: 19px;
  font-weight: 700;
  color: #e0eaff;
  text-align: center;
  margin: 0 0 6px;
  letter-spacing: 2px;
}
.t-dark__sub {
  font-size: 11px;
  color: rgba(110, 150, 255, 0.45);
  text-align: center;
  margin: 0 0 20px;
  letter-spacing: 3px;
}

/* 状态条 */
.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  padding: 7px 12px;
  margin-bottom: 20px;
}
.status-dot {
  width: 7px;
  height: 7px;
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
.status-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  flex: 1;
}
.status-value {
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
}

/* ========== 内联表单样式 ========== */
.dark-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.df-field {
  margin-bottom: 16px;
}

.df-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: rgba(110, 150, 255, 0.6);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.df-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.df-input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: rgba(79, 110, 247, 0.5);
  pointer-events: none;
}

.df-input {
  width: 100%;
  height: 46px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(79, 110, 247, 0.2);
  border-radius: 10px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #e0eaff;
  outline: none;
  transition:
    border-color 0.25s,
    background 0.25s,
    box-shadow 0.25s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:focus {
    border-color: rgba(79, 110, 247, 0.6);
    background: rgba(79, 110, 247, 0.06);
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.12);
  }
}

.df-input--pwd {
  padding-right: 44px;
}

.df-toggle {
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
  color: rgba(79, 110, 247, 0.45);
  border-radius: 6px;
  transition: color 0.2s;
  &:hover {
    color: rgba(79, 110, 247, 0.8);
  }
}

.df-error {
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
.df-btn {
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
  box-shadow: 0 4px 20px rgba(79, 110, 247, 0.35);

  .df-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.18) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .df-btn-arrow {
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

  .df-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .df-btn-spinner {
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
    box-shadow: 0 8px 30px rgba(79, 110, 247, 0.45);

    .df-btn-shimmer {
      transform: translateX(100%);
      transition: transform 0.55s ease;
    }
    .df-btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .df-btn-text {
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

/* 侧边装饰线 */
.side-lines {
  display: flex;
  flex-direction: column;
  gap: 14px;
  &--left {
    align-items: flex-end;
  }
  &--right {
    align-items: flex-start;
  }
}
.side-line {
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(79, 110, 247, 0.55), transparent);
  animation: line-flash 2.5s ease-in-out infinite;
}
@keyframes line-flash {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.9;
  }
}

.t-dark__footer {
  position: fixed;
  bottom: 18px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(79, 110, 247, 0.28);
  z-index: 1;
}

/* 测试账号提示 */
.df-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: rgba(79, 110, 247, 0.4);
}

/* 全局底部版权 */
.dark-page-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  font-size: 11px;
  color: rgba(79, 110, 247, 0.28);
  z-index: 10;
  .footer-dot {
    color: rgba(79, 110, 247, 0.18);
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
  .side-lines {
    display: none;
  }
  .t-dark__card {
    width: 90%;
    max-width: 380px;
    padding: 36px 26px;
  }
}
</style>
