import type { App } from 'vue'
import { XlyMsg } from '@/components/xly-message/message'
import { setupXlyMessage } from '@/components/xly-message/install'
import { XlyLoading } from '@/components/xly-loading/loading'
import { XlyTour } from '@/components/xly-tour/tour'
import { XlyBadge } from '@/components/xly-badge/badge'

/**
 * xly 全局工具对象
 *
 * 使用方式：
 * ```ts
 * import { xly } from '@/utils/xly'
 *
 * // 消息提示
 * xly.$msg.success('操作成功')
 * xly.$msg.warning('注意')
 * xly.$msg.danger('出错了')
 * xly.$msg.info('提示信息')
 *
 * // 加载
 * const loading = xly.$loading.open({ text: '加载中...' })
 * loading.close()
 * xly.$loading.fullscreen('加载中...')
 * xly.$loading.container('.my-box', '加载中...')
 *
 * // 操作引导
 * const tour = xly.$tour({ steps: [...] })
 * tour.finish()
 * ```
 */
export const xly = {
  /** 消息提示 */
  $msg: XlyMsg,
  /** 加载 */
  $loading: XlyLoading,
  /** 操作引导 */
  $tour: XlyTour,
  /** 徽标 */
  $badge: XlyBadge,
}

/**
 * 全局安装 xly 服务
 *
 * 在 main.ts 中调用：
 * ```ts
 * import { setupXly } from '@/utils/xly'
 * setupXly(app)
 * ```
 *
 * 安装后任意组件中直接使用：
 * - 脚本：`xly.$msg.success('成功')` / `xly.$loading.open()`
 * - 模板：`@click="xly.$msg.success('成功')"`
 */
export function setupXly(app: App) {
  // 挂载消息提示组件容器
  setupXlyMessage(app)

  // 同时挂载两处，确保 script setup 和模板都能访问 xly
  app.config.globalProperties.xly = xly
  app.provide('__XLY__', xly)

  // mixin 注入到每个组件的渲染上下文
  app.mixin({
    computed: {
      xly() {
        return xly
      },
    },
  })
}

// 类型导出
export type { MessageOptions } from '@/components/xly-message/message'
export type { LoadingInstance, LoadingOptions } from '@/components/xly-loading/loading'
export type { TourInstance, TourOptions } from '@/components/xly-tour/tour'
export type { BadgeInstance, BadgeOptions } from '@/components/xly-badge/badge'
