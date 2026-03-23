/**
 * XlyLoading 加载组件
 *
 * 两种使用方式：
 *
 * 1. 组件方式（模板中使用）
 * ```vue
 * <template>
 *   <XlyLoading v-model="loading" text="加载中..." />
 * </template>
 *
 * <script setup>
 * import XlyLoading from '@/components/xly-loading/index.vue'
 * </script>
 * ```
 *
 * 2. 命令式调用（任意位置，推荐统一入口）
 * ```ts
 * import { xly } from '@/utils/xly'
 *
 * const loading = xly.$loading.open({ text: '加载中...' })
 * loading.close()
 *
 * xly.$loading.fullscreen('加载中...')
 * xly.$loading.container('.my-container', '加载中...')
 * ```
 */

// 组件
export { default as XlyLoading } from './index.vue'

// 命令式 API
export { XlyLoading as $loading, setupXlyLoading } from './loading'
export type { LoadingInstance, LoadingOptions } from './loading'

// 默认导出组件
export { default } from './index.vue'
