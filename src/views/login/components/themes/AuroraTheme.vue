<template>
  <div class="t-aurora">
    <!-- 动态极光背景 -->
    <div class="t-aurora__bg" aria-hidden="true">
      <div class="aurora aurora--1" />
      <div class="aurora aurora--2" />
      <div class="aurora aurora--3" />
      <div class="aurora aurora--4" />
      <div class="star-field">
        <span v-for="i in 60" :key="i" class="star" :style="starStyle(i)" />
      </div>
    </div>

    <!-- 主布局：左侧插图 + 右侧居中卡片 -->
    <div class="t-aurora__layout">
      <!-- 左侧插图文案 -->
      <div class="t-aurora__left">
        <div class="left-content">
          <div class="left-orbit" aria-hidden="true">
            <div class="orbit-core">
              <img :src="logoUrl" alt="logo" class="orbit-logo" />
            </div>
            <div class="orbit-ring orbit-ring--1" />
            <div class="orbit-ring orbit-ring--2" />
            <div class="orbit-dot orbit-dot--1" />
            <div class="orbit-dot orbit-dot--2" />
          </div>
          <h2 class="left-title">迈向未来<br />健康管理新纪元</h2>
          <p class="left-desc">融合前沿科技与人文关怀，构建企业级数字健康生态，让每位员工都能享受专业化的健康守护。</p>
          <div class="left-pills">
            <span v-for="p in pills" :key="p" class="pill">{{ p }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧毛玻璃卡片（居中于右侧区域） -->
      <div class="t-aurora__right">
        <div class="t-aurora__card">
          <!-- 顶部彩虹光边 -->
          <div class="card-rainbow" />

          <div class="card-logo">
            <img :src="logoUrl" alt="logo" />
          </div>
          <h3 class="card-title">登录心灵云</h3>
          <p class="card-sub">XINGLING CLOUD · 健康管理系统</p>

          <!-- ========== 登录表单（内联） ========== -->
          <form class="aurora-form" @submit.prevent="handleSubmit">
            <div class="af-field">
              <label class="af-label">账号</label>
              <div class="af-input-wrap">
                <svg class="af-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  v-model="form.username"
                  type="text"
                  class="af-input"
                  placeholder="请输入账号"
                  autocomplete="username"
                />
              </div>
            </div>

            <div class="af-field">
              <label class="af-label">密码</label>
              <div class="af-input-wrap">
                <svg class="af-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  v-model="form.password"
                  :type="showPwd ? 'text' : 'password'"
                  class="af-input af-input--pwd"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                />
                <button type="button" class="af-toggle" @click="showPwd = !showPwd">
                  <svg v-if="!showPwd" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 错误提示 -->
            <div v-if="error" class="af-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {{ error }}
            </div>

            <!-- 登录按钮 -->
            <button
              type="submit"
              class="af-btn"
              :class="{ 'af-btn--loading': loading }"
              :disabled="loading || !form.username || !form.password"
            >
              <span class="af-btn-shimmer" />
              <span v-if="loading" class="af-btn-spinner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              </span>
              <template v-else>
                <span class="af-btn-text">立即登录</span>
                <span class="af-btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </template>
              <span v-if="loading" class="af-btn-text">验证中...</span>
            </button>
          </form>

          <div class="card-links">
            <span>忘记密码？</span>
            <span class="dot">·</span>
            <span>联系管理员</span>
          </div>

          <!-- 测试账号提示 -->
          <div class="af-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            测试账号: EaseUI / 密码: 123456
          </div>
        </div>
      </div>
    </div>

    <!-- 全局底部版权 -->
    <footer class="aurora-footer">
      <span>© 2025 心灵云科技集团有限公司</span>
    <span class="footer-dot">·</span>
    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">蜀ICP备19027113号</a>
    <span class="footer-dot">·</span>
      <span>版权所有 · 违法必究</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import logoUrl from '@/assets/logo.png'

defineProps<{ loading?: boolean; error?: string }>()
const emit = defineEmits<{ submit: [form: { username: string; password: string }] }>()

const pills = ['AI 健康评估', '智能问诊', '风险预警', '数据看板']
const showPwd = ref(false)
const form = reactive({ username: 'EaseUI', password: '123456' })

function handleSubmit() {
  if (form.username && form.password) {
    emit('submit', { username: form.username, password: form.password })
  }
}

function starStyle(i: number) {
  const size = Math.random() * 2.5 + 0.5
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${Math.random() * 3 + 2}s`,
  }
}
</script>

<style scoped lang="scss">
.t-aurora {
  min-height: 100vh;
  background: #030618;
  position: relative; overflow: hidden;
}

/* 极光背景 */
.t-aurora__bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

.aurora {
  position: absolute; border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: screen;
  animation: aurora-float ease-in-out infinite;

  &--1 {
    width: 70vw; height: 50vh;
    background: radial-gradient(ellipse, rgba(79,110,247,0.35) 0%, transparent 60%);
    top: -20vh; left: -10vw;
    animation-duration: 18s;
  }
  &--2 {
    width: 55vw; height: 60vh;
    background: radial-gradient(ellipse, rgba(168,85,247,0.3) 0%, transparent 60%);
    top: 10vh; right: -10vw;
    animation-duration: 22s; animation-delay: -6s;
  }
  &--3 {
    width: 50vw; height: 40vh;
    background: radial-gradient(ellipse, rgba(6,182,212,0.25) 0%, transparent 60%);
    bottom: -10vh; left: 20vw;
    animation-duration: 26s; animation-delay: -12s;
  }
  &--4 {
    width: 40vw; height: 40vh;
    background: radial-gradient(ellipse, rgba(236,72,153,0.2) 0%, transparent 60%);
    top: 40vh; left: 30vw;
    animation-duration: 20s; animation-delay: -4s;
  }
}
@keyframes aurora-float {
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(30px,-20px) scale(1.05); }
  66%      { transform: translate(-20px,30px) scale(0.95); }
}

/* 星星 */
.star-field { position: absolute; inset: 0; }
.star {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,0.8);
  animation: star-twinkle ease-in-out infinite;
}
@keyframes star-twinkle {
  0%,100% { opacity: 0.2; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.3); }
}

/* 布局：左侧弹性扩展，右侧固定宽度并居中 */
.t-aurora__layout {
  position: relative; z-index: 1;
  min-height: 100vh;
  display: flex; align-items: stretch;
}

/* 左侧 */
.t-aurora__left {
  flex: 0.8;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px;
}

.left-content {
  max-width: 460px;
  animation: fade-left 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
}
@keyframes fade-left { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }

/* 轨道 logo */
.left-orbit {
  width: 120px; height: 120px;
  position: relative; margin: 0 0 36px;
}

.orbit-core {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 64px; height: 64px; border-radius: 18px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
}
.orbit-logo { width: 44px; height: 44px; object-fit: contain; }

.orbit-ring {
  position: absolute; top: 50%; left: 50%; border-radius: 50%;
  border: 1px solid;
  &--1 { width: 90px; height: 90px; margin: -45px 0 0 -45px; border-color: rgba(79,110,247,0.4); animation: orbit-spin 8s linear infinite; }
  &--2 { width: 115px; height: 115px; margin: -57px 0 0 -57px; border-color: rgba(168,85,247,0.25); animation: orbit-spin 12s linear infinite reverse; }
}
@keyframes orbit-spin { to { transform:rotate(360deg); } }

.orbit-dot {
  position: absolute; width: 8px; height: 8px; border-radius: 50%;
  &--1 { top: 12px; left: 50%; transform: translateX(-50%); background: #4f6ef7; box-shadow: 0 0 8px #4f6ef7; animation: dot-orbit 8s linear infinite; }
  &--2 { bottom: 8px; left: 50%; transform: translateX(-50%); background: #a855f7; box-shadow: 0 0 8px #a855f7; animation: dot-orbit 12s linear infinite reverse; }
}
@keyframes dot-orbit {
  from { transform: translateX(-50%) rotate(0) translateX(42px) rotate(0); }
  to   { transform: translateX(-50%) rotate(360deg) translateX(42px) rotate(-360deg); }
}

.left-title {
  font-size: 40px; font-weight: 800; color: #fff; line-height: 1.25;
  margin: 0 0 20px;
  background: linear-gradient(135deg, #fff 0%, rgba(168,130,255,0.9) 50%, rgba(79,200,255,0.9) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.left-desc {
  font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.9; margin: 0 0 28px;
}

.left-pills { display: flex; flex-wrap: wrap; gap: 10px; }
.pill {
  font-size: 12px; color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 6px 14px; border-radius: 20px;
  backdrop-filter: blur(8px);
  transition: all 0.25s;
  &:hover {
    background: rgba(79,110,247,0.2);
    border-color: rgba(79,110,247,0.4);
    color: #a5c8ff;
  }
}

/* 右侧 — 居中于右侧区域 */
.t-aurora__right {
  width: 500px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute; left: 0; top: 10%; height: 80%;
    width: 1px;
    background: linear-gradient(transparent, rgba(255,255,255,0.08), transparent);
  }
}

.t-aurora__card {
  width: 100%;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(32px) saturate(1.5);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 40px 80px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.1);
  padding: 40px 36px 36px;
  animation: fade-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both;
}
@keyframes fade-right { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:none; } }

.card-rainbow {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #4f6ef7, #a855f7, #ec4899, #f59e0b, #06b6d4, #4f6ef7);
  background-size: 200%;
  animation: rainbow-shift 4s linear infinite;
  margin: -40px -36px 0;
}
@keyframes rainbow-shift { to { background-position: 200% 0; } }

.card-logo {
  width: 56px; height: 56px;
  margin: 0 auto 18px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  img { width: 40px; height: 40px; object-fit: contain; }
}

.card-title {
  font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 6px;
  color: #fff;
}
.card-sub {
  font-size: 11px; text-align: center; margin: 0 0 28px;
  color: rgba(255,255,255,0.4); letter-spacing: 2px;
}

/* ========== 内联表单样式 ========== */
.aurora-form { display: flex; flex-direction: column; gap: 0; }

.af-field { margin-bottom: 16px; }

.af-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  letter-spacing: 2px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.af-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.af-input-icon {
  position: absolute;
  left: 14px;
  width: 16px; height: 16px;
  color: rgba(255,255,255,0.35);
  pointer-events: none;
  flex-shrink: 0;
}

.af-input {
  width: 100%;
  height: 46px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #fff;
  outline: none;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;

  &::placeholder { color: rgba(255,255,255,0.3); }

  &:focus {
    border-color: rgba(79,110,247,0.6);
    background: rgba(79,110,247,0.08);
    box-shadow: 0 0 0 3px rgba(79,110,247,0.12);
  }
}

.af-input--pwd { padding-right: 44px; }

.af-toggle {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px; height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255,255,255,0.35);
  border-radius: 6px;
  transition: color 0.2s;
  &:hover { color: rgba(255,255,255,0.7); }
}

/* 错误提示 */
.af-error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #f87171;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60%  { transform: translateX(-4px); }
  40%,80%  { transform: translateX(4px); }
}

/* 登录按钮 */
.af-btn {
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
  background: linear-gradient(135deg, #4f6ef7, #6d28d9);
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.3s ease,
              opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba(79,110,247,0.3);

  .af-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: translateX(-100%);
    pointer-events: none;
  }

  .af-btn-arrow {
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    svg { width: 17px; height: 17px; }
  }

  .af-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .af-btn-spinner {
    display: flex;
    align-items: center;
    svg { width: 18px; height: 18px; animation: lf-rotate 0.75s linear infinite; }
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.012);
    box-shadow: 0 8px 30px rgba(79,110,247,0.4);

    .af-btn-shimmer { transform: translateX(100%); transition: transform 0.55s ease; }
    .af-btn-arrow  { opacity: 1; transform: translateX(0); }
    .af-btn-text    { letter-spacing: 4px; }
  }

  &:active:not(:disabled) { transform: translateY(0) scale(0.975); }
  &:disabled { opacity: 0.38; cursor: not-allowed; transform: none; }
}
@keyframes lf-rotate { to { transform: rotate(360deg); } }

.card-links {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.4);
  .dot { color: rgba(255,255,255,0.2); }
  span:not(.dot) { cursor: pointer; transition: color 0.2s; &:hover { color: rgba(255,255,255,0.8); } }
}

/* 测试账号提示 */
.af-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 14px;
  font-size: 11px;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.3px;
}

/* 全局底部版权 */
.aurora-footer {
  position: fixed;
  bottom: 18px;
  left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  z-index: 10;
  .footer-dot { color: rgba(255,255,255,0.15); }
  a { color: inherit; text-decoration: none; &:hover { text-decoration: underline; } }
}

@media (max-width: 960px) {
  .t-aurora__left { display: none; }
  .t-aurora__right { width: 100%; padding: 40px 24px; }
  .t-aurora__right::before { display: none; }
}
</style>
