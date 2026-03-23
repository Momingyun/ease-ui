import { createApp, type App } from 'vue'
import XlyMessageComp from './index.vue'
import { XlyMsg } from './message'

/**
 * 全局安装消息提示组件
 *
 * 在 main.ts 中调用：
 * ```ts
 * import { setupXlyMessage } from '@/components/xly-message/install'
 * setupXlyMessage(app)
 * ```
 *
 * 安装后任意组件中直接使用：
 * - 模板：`@click="XlyMsg.success('成功')"`
 * - 脚本：`XlyMsg.success('成功')`
 */
export function setupXlyMessage(app: App) {
  // 挂载隐藏的消息容器到 body
  const container = document.createElement('div')
  container.id = 'xly-message-global-container'
  document.body.appendChild(container)

  const messageApp = createApp(XlyMessageComp)
  messageApp.mount(container)

  // 同时挂载两处，确保 script setup 和模板都能访问
  app.config.globalProperties.XlyMsg = XlyMsg
  app.provide('__XLY_MSG__', XlyMsg)

  // mixin 将 XlyMsg 注入到每个组件的渲染上下文（模板中直接使用）
  app.mixin({
    computed: {
      XlyMsg() {
        return XlyMsg
      },
    },
  })
}
