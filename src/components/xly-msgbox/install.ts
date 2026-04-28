import { createApp, type App } from 'vue'
import XlyMsgBoxComp from './index.vue'
import { XlyMsgBox } from './msgbox'

/**
 * 全局安装 MessageBox 组件
 *
 * 在 main.ts 中调用：
 * ```ts
 * import { setupXlyMsgBox } from '@/components/xly-msgbox/install'
 * setupXlyMsgBox(app)
 * ```
 *
 * 安装后任意组件中直接使用：
 * - 脚本：`xly.$msgbox.confirm('确定删除？', '删除确认', { type: 'warning' })`
 * - 脚本：`xly.$msgbox.alert('操作成功', { type: 'success' })`
 * - 脚本：`xly.$msgbox.prompt('请输入名称', '新建')`
 */
export function setupXlyMsgBox(app: App) {
  // 挂载弹框容器到 body
  const container = document.createElement('div')
  container.id = 'xly-msgbox-global-container'
  document.body.appendChild(container)

  const msgboxApp = createApp(XlyMsgBoxComp)
  msgboxApp.mount(container)

  // 挂载到全局属性
  app.config.globalProperties.XlyMsgBox = XlyMsgBox
  app.provide('__XLY_MSGBOX__', XlyMsgBox)

  // mixin 注入渲染上下文（模板直接访问）
  app.mixin({
    computed: {
      XlyMsgBox() {
        return XlyMsgBox
      },
    },
  })
}
