/**
 * 全局消息提示 API
 *
 * 在 main.ts 中调用 setupXlyMessage(app) 安装后，在任意组件中使用：
 * ```ts
 * import { XlyMessage } from '@/components/xly-message'
 *
 * // 在 setup 中获取实例
 * const { success, danger } = XlyMessage()
 * // 或直接解构后模板中使用
 * const msg = XlyMessage()
 * msg.success('操作成功')
 * ```
 */
export { useXlyMessage as XlyMessage } from './install'
