<template>
  <div class="t-classic">
    <!-- 背景光斑 -->
    <div class="t-classic__bg" aria-hidden="true">
      <span class="blob blob--1" />
      <span class="blob blob--2" />
      <span class="blob blob--3" />
      <span class="grid" />
    </div>

    <!-- 主卡片 -->
    <div class="t-classic__card">
      <!-- 左侧品牌区 -->
      <div class="t-classic__brand">
        <div class="brand-rings" aria-hidden="true">
          <span v-for="i in 5" :key="i" class="brand-ring" :class="`brand-ring--${i}`" />
        </div>
        <div class="brand-body">
          <div class="brand-logo">
            <img :src="logoUrl" alt="logo" />
          </div>
          <h1 class="brand-title">心灵云</h1>
          <p class="brand-desc">企业级数字化健康管理平台</p>
          <ul class="brand-features">
            <li v-for="f in features" :key="f">
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>
        <div class="brand-footer">
          <span>© 2025 心灵云 版权所有</span>
          <span>v2.0.0</span>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="t-classic__form-area">
        <div class="form-header">
          <h2 class="form-title">欢迎回来</h2>
          <p class="form-sub">请登录您的账号以继续使用</p>
        </div>

        <!-- ========== 登录表单（内联） ========== -->
        <form class="classic-form" @submit.prevent="handleSubmit">
          <div class="cf-field">
            <label class="cf-label">账号</label>
            <div class="cf-input-wrap">
              <svg class="cf-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <input
                v-model="form.username"
                type="text"
                class="cf-input"
                placeholder="请输入账号"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="cf-field">
            <label class="cf-label">密码</label>
            <div class="cf-input-wrap">
              <svg class="cf-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                v-model="form.password"
                :type="showPwd ? 'text' : 'password'"
                class="cf-input cf-input--pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
              <button type="button" class="cf-toggle" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="cf-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ error }}
          </div>

          <button
            type="submit"
            class="cf-btn"
            :disabled="loading || !form.username || !form.password"
          >
            <span class="cf-btn-shimmer" />
            <span v-if="loading" class="cf-btn-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a10 10 0 0 1 10 10" /></svg>
            </span>
            <template v-else>
              <span class="cf-btn-text">立即登录</span>
              <span class="cf-btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </template>
            <span v-if="loading" class="cf-btn-text">验证中...</span>
          </button>

          <!-- 测试账号提示 -->
          <div class="cf-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            测试账号: EaseUI / 密码: 123456
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- 全局底部版权 -->
  <footer class="classic-page-footer">
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

const features = ['智能健康档案管理', '多维度数据分析', '全流程业务闭环']
const showPwd = ref(false)
const form = reactive({ username: 'EaseUI', password: '123456' })

function handleSubmit() {
  if (form.username && form.password) {
    emit('submit', { username: form.username, password: form.password })
  }
}
</script>

<style scoped lang="scss">
.t-classic {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f8;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景 */
.t-classic__bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;

  &--1 { width: 600px; height: 600px; background: rgba(79,110,247,0.14); top: -200px; right: -100px; animation: fa 20s ease-in-out infinite; }
  &--2 { width: 400px; height: 400px; background: rgba(124,58,237,0.1); bottom: -150px; left: -100px; animation: fb 25s ease-in-out infinite; }
  &--3 { width: 300px; height: 300px; background: rgba(56,189,248,0.08); top: 50%; left: 40%; animation: fc 18s ease-in-out infinite; }
}

@keyframes fa { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-40px,30px); } }
@keyframes fb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-40px); } }
@keyframes fc { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }

.grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(79,110,247,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79,110,247,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 主卡片 */
.t-classic__card {
  display: flex;
  width: 100%; max-width: 920px; min-height: 540px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03);
  position: relative; z-index: 1;
  animation: rise 0.65s cubic-bezier(0.16,1,0.3,1);
}

@keyframes rise {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}

/* 左侧品牌 */
.t-classic__brand {
  width: 380px; flex-shrink: 0;
  background: linear-gradient(155deg, #4f6ef7 0%, #6d28d9 55%, #7c3aed 100%);
  display: flex; flex-direction: column;
  padding: 48px 36px 32px;
  position: relative; overflow: hidden;
}

.brand-rings { position: absolute; inset: 0; pointer-events: none; }
.brand-ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.07);
  &--1 { width: 300px; height: 300px; top: -70px; right: -70px; }
  &--2 { width: 200px; height: 200px; top: -10px; right: -10px; border-color: rgba(255,255,255,0.04); }
  &--3 { width: 160px; height: 160px; bottom: 80px; left: -40px; }
  &--4 { width: 90px;  height: 90px;  bottom: 120px; left: 0; border-color: rgba(255,255,255,0.04); }
  &--5 { width: 70px;  height: 70px;  top: 55%; right: 20%; background: rgba(255,255,255,0.04); border: none; }
}

.brand-body {
  position: relative; z-index: 1;
  flex: 1;
  display: flex; flex-direction: column; justify-content: center;
}

.brand-logo {
  width: 60px; height: 60px;
  margin-bottom: 24px;
  background: rgba(255,255,255,0.15);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  img { width: 44px; height: 44px; object-fit: contain; }
}

.brand-title { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: 4px; margin: 0 0 10px; }
.brand-desc  { font-size: 13px; color: rgba(255,255,255,0.7); margin: 0 0 28px; line-height: 1.7; }

.brand-features {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 12px;
  li {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,0.85);
    svg { color: rgba(255,255,255,0.6); flex-shrink: 0; }
  }
}

.brand-footer {
  position: relative; z-index: 1;
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 12px; color: rgba(255,255,255,0.45);
  margin-top: auto;
}

/* 右侧表单 */
.t-classic__form-area {
  flex: 1;
  padding: 52px 48px;
  display: flex; flex-direction: column; justify-content: center;
}

.form-header { margin-bottom: 32px; }
.form-title  { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 7px; }
.form-sub    { font-size: 13px; color: #9ca3af; margin: 0; }

/* ========== 内联表单样式 ========== */
.classic-form { display: flex; flex-direction: column; gap: 0; }

.cf-field { margin-bottom: 18px; }

.cf-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.cf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.cf-input-icon {
  position: absolute;
  left: 14px;
  width: 16px; height: 16px;
  color: #9ca3af;
  pointer-events: none;
}

.cf-input {
  width: 100%;
  height: 48px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;

  &::placeholder { color: #d1d5db; }

  &:focus {
    border-color: #4f6ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,110,247,0.1);
  }
}

.cf-input--pwd { padding-right: 44px; }

.cf-toggle {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px; height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 6px;
  transition: color 0.2s;
  &:hover { color: #6b7280; }
}

.cf-error {
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
  0%,100% { transform: translateX(0); }
  20%,60%  { transform: translateX(-4px); }
  40%,80%  { transform: translateX(4px); }
}

/* 登录按钮 */
.cf-btn {
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
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.3s ease,
              opacity 0.2s ease;
  box-shadow: 0 4px 20px rgba(79,110,247,0.3);

  .cf-btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: translateX(-100%);
    pointer-events: none;
  }

  .cf-btn-arrow {
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    svg { width: 17px; height: 17px; }
  }

  .cf-btn-text {
    transition: letter-spacing 0.25s;
    position: relative;
    z-index: 1;
  }

  .cf-btn-spinner {
    display: flex;
    align-items: center;
    svg { width: 18px; height: 18px; animation: spin 0.75s linear infinite; }
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.012);
    box-shadow: 0 8px 30px rgba(79,110,247,0.4);

    .cf-btn-shimmer { transform: translateX(100%); transition: transform 0.55s ease; }
    .cf-btn-arrow  { opacity: 1; transform: translateX(0); }
    .cf-btn-text    { letter-spacing: 4px; }
  }

  &:active:not(:disabled) { transform: translateY(0) scale(0.975); }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
}
@keyframes spin { to { transform: rotate(360deg); } }

/* 测试账号提示 */
.cf-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 11px;
  color: #9ca3af;
}

/* 全局底部版权 */
.classic-page-footer {
  position: fixed;
  bottom: 16px;
  left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 11px;
  color: #9ca3af;
  z-index: 10;
  .footer-dot { color: #d1d5db; }
  a { color: inherit; text-decoration: none; &:hover { text-decoration: underline; } }
}

@media (max-width: 768px) {
  .t-classic__brand { display: none; }
  .t-classic__card  { max-width: 440px; min-height: auto; }
  .t-classic__form-area { padding: 40px 28px; }
}
</style>
