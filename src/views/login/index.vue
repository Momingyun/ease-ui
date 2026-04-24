<template>
  <div class="login-root">
    <!-- 主题切换浮层 -->
    <ThemeSwitcher v-model="currentTheme" :themes="themes" />

    <!-- 主题渲染 -->
    <component
      :is="currentComponent"
      :key="currentTheme"
      :loading="loading"
      :error="errorMsg"
      @submit="handleLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import ThemeSwitcher, { type ThemeConfig } from './components/ThemeSwitcher.vue'
import ClassicTheme   from './components/themes/ClassicTheme.vue'
import DarkTheme      from './components/themes/DarkTheme.vue'
import MinimalTheme   from './components/themes/MinimalTheme.vue'
import GrandTheme     from './components/themes/GrandTheme.vue'
import NatureTheme    from './components/themes/NatureTheme.vue'
import CorporateTheme from './components/themes/CorporateTheme.vue'
import AuroraTheme    from './components/themes/AuroraTheme.vue'

defineOptions({ name: 'XlyLogin' })

/* ============ 主题列表 ============ */
const themes: ThemeConfig[] = [
  { id: 'classic',   name: '经典蓝',   color: 'linear-gradient(135deg,#4f6ef7,#7c3aed)' },
  { id: 'dark',      name: '暗黑科技', color: 'linear-gradient(135deg,#0d1117,#4f6ef7)' },
  { id: 'minimal',   name: '极简白',   color: 'linear-gradient(135deg,#e8ecff,#4f6ef7)' },
  { id: 'grand',     name: '大气磅礴', color: 'linear-gradient(135deg,#0a1628,#3b7de8)' },
  { id: 'nature',    name: '清新自然', color: 'linear-gradient(135deg,#065f46,#10b981)' },
  { id: 'corporate', name: '商务金融', color: 'linear-gradient(135deg,#0c0e1a,#d4af37)' },
  { id: 'aurora',    name: '极光渐变', color: 'linear-gradient(135deg,#030618,#a855f7)' }
]

const themeMap: Record<string, ReturnType<typeof shallowRef>['value']> = {
  classic:   ClassicTheme,
  dark:      DarkTheme,
  minimal:   MinimalTheme,
  grand:     GrandTheme,
  nature:    NatureTheme,
  corporate: CorporateTheme,
  aurora:    AuroraTheme
}

const currentTheme = ref('classic')
const currentComponent = computed(() => themeMap[currentTheme.value] ?? ClassicTheme)

/* ============ 登录逻辑 ============ */
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin(form: { username: string; password: string }) {
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

<style>
/* 全局重置：确保 html/body 无多余边距 */
html, body { margin: 0; padding: 0; }
*, *::before, *::after { box-sizing: border-box; }
</style>

<style scoped lang="scss">
.login-root {
  position: relative;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 主题切换动画 */
.theme-fade-enter-active,
.theme-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.theme-fade-enter-from {
  opacity: 0;
  transform: scale(1.01) translateY(8px);
}
.theme-fade-leave-to {
  opacity: 0;
  transform: scale(0.99) translateY(-8px);
}
</style>
