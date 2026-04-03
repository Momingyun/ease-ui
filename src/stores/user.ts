import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const TOKEN_KEY = 'xly-token'

export const useUserStore = defineStore('user', () => {
  // 从 localStorage 恢复 token
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')

  const isLoggedIn = computed(() => !!token.value)

  /**
   * 模拟登录（任意账号密码均可，延迟模拟网络请求）
   */
  async function login(username: string, _password: string): Promise<void> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    // 模拟 token（实际项目中替换为后端返回的 token）
    const fakeToken = `xly-${Date.now()}-${username}`
    token.value = fakeToken
    localStorage.setItem(TOKEN_KEY, fakeToken)
  }

  /**
   * 退出登录
   */
  function logout() {
    token.value = ''
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
  }
})
