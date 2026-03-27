import { createApp, h, ref, nextTick, type App } from 'vue'
import XlyTourComp from './index.vue'
import type { TourStep, TourProps } from './index.vue'

export interface TourOptions extends Omit<TourProps, 'modelValue'> {
  /** 引导步骤列表 */
  steps: TourStep[]
  /** 引导完成回调 */
  onFinish?: () => void
  /** 关闭回调 */
  onClose?: () => void
  /** 跳过回调 */
  onSkip?: () => void
}

export interface TourInstance {
  /** 开始引导 */
  start: (stepIndex?: number) => void
  /** 下一步 */
  next: () => void
  /** 上一步 */
  prev: () => void
  /** 跳到指定步骤 */
  goTo: (index: number) => void
  /** 结束引导 */
  finish: () => void
  /** 关闭引导 */
  close: () => void
  /** 是否已关闭 */
  closed: boolean
}

/**
 * 创建命令式 Tour 实例
 * @param options TourOptions
 * @returns TourInstance
 */
function createTour(options: TourOptions): TourInstance {
  const { steps, ...props } = options

  // 创建容器
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 响应式状态
  const visible = ref(false)
  const currentStep = ref(props.startStep || 0)

  // 创建应用实例
  const app = createApp({
    setup() {
      return () => h(XlyTourComp, {
        ...props,
        steps,
        modelValue: visible.value,
        'onUpdate:modelValue': (val: boolean) => {
          visible.value = val
        },
        onChange: (index: number) => {
          currentStep.value = index
        },
        onFinish: () => {
          destroy()
          options.onFinish?.()
        },
        onClose: () => {
          destroy()
          options.onClose?.()
        },
        onSkip: () => {
          destroy()
          options.onSkip?.()
        }
      })
    }
  })

  app.mount(container)

  // 获取组件内部引用
  let componentRef: any = null
  nextTick(() => {
    componentRef = container.querySelector('.xly-tour-popover')?.__vueParentComponent
  })

  function destroy() {
    if (instance.closed) return
    instance.closed = true
    visible.value = false

    setTimeout(() => {
      app.unmount()
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }, 300)
  }

  const instance: TourInstance = {
    closed: false,

    start(stepIndex = 0) {
      if (instance.closed) return
      currentStep.value = stepIndex
      visible.value = true
    },

    next() {
      if (instance.closed) return
      if (componentRef?.next) {
        componentRef.next()
      }
    },

    prev() {
      if (instance.closed) return
      if (componentRef?.prev) {
        componentRef.prev()
      }
    },

    goTo(index: number) {
      if (instance.closed) return
      if (componentRef?.goTo) {
        componentRef.goTo(index)
      }
    },

    finish() {
      destroy()
    },

    close() {
      destroy()
    }
  }

  // 自动启动
  nextTick(() => {
    instance.start(props.startStep || 0)
  })

  return instance
}

/**
 * 全局 Tour API — 直接作为函数调用
 *
 * 使用方式：
 * ```ts
 * import { xly } from '@/utils/xly'
 *
 * // 启动引导
 * const tour = xly.$tour({
 *   steps: [
 *     { target: '#step1', title: '第一步', description: '欢迎！' },
 *     { target: '#step2', title: '第二步', description: '这是功能区域' },
 *     { target: '#step3', title: '第三步', description: '引导完成！' }
 *   ],
 *   color: '#4f6ef7'
 * })
 *
 * // 手动控制
 * tour.next()
 * tour.prev()
 * tour.goTo(2)
 * tour.finish()
 * ```
 */
export function XlyTour(options: TourOptions): TourInstance {
  return createTour(options)
}

export type { TourInstance, TourOptions }
