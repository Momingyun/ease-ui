import { createApp, h, ref, nextTick, type App, type VNode } from 'vue'
import XlyLoadingComp from './index.vue'
import type { LoadingProps } from './index.vue'

export interface LoadingOptions extends Omit<LoadingProps, 'modelValue'> {
  /** 目标容器，可以是选择器字符串或 HTMLElement，不传则全屏 */
  target?: string | HTMLElement
  /** 加载文本 */
  text?: string
  /** 加载类型 */
  type?: 'spinner' | 'wave' | 'pulse' | 'ring' | 'default'
  /** 是否显示遮罩 */
  mask?: boolean
  /** 加载颜色 */
  color?: string
  /** 文本颜色 */
  textColor?: string
  /** 大小 */
  size?: 'small' | 'medium' | 'large' | number
  /** 环形进度值 */
  progress?: number
  /** 自定义类名 */
  customClass?: string
}

interface LoadingInstance {
  /** 关闭加载 */
  close: () => void
  /** 设置进度（仅 ring 类型有效） */
  setProgress: (progress: number) => void
  /** 更新文本 */
  setText: (text: string) => void
  /** 是否已关闭 */
  closed: boolean
}

// 存储所有活跃的 loading 实例
const activeLoadings = new Map<string | HTMLElement, LoadingInstance>()

/**
 * 创建 Loading 实例
 * @param options 配置选项
 * @returns LoadingInstance 实例，包含 close、setProgress、setText 方法
 */
function createLoading(options: LoadingOptions = {}): LoadingInstance {
  const { target, ...props } = options
  
  // 确定挂载目标
  let mountTarget: HTMLElement = document.body
  let isFullscreen = true
  let isContainerFullscreen = false
  
  if (target) {
    if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) {
        mountTarget = el as HTMLElement
        isFullscreen = false
        isContainerFullscreen = true
      }
    } else if (target instanceof HTMLElement) {
      mountTarget = target
      isFullscreen = false
      isContainerFullscreen = true
    }
  }

  // 确保目标容器有定位
  if (!isFullscreen && mountTarget !== document.body) {
    const style = window.getComputedStyle(mountTarget)
    if (style.position === 'static') {
      mountTarget.style.position = 'relative'
    }
  }

  // 创建容器
  const container = document.createElement('div')
  container.className = 'xly-loading-global-container'
  mountTarget.appendChild(container)

  // 创建响应式数据
  const visible = ref(true)
  const progress = ref(props.progress || 0)
  const text = ref(props.text || '')

  // 创建 vnode
  const vnode: VNode = h(XlyLoadingComp, {
    ...props,
    modelValue: visible.value,
    fullscreen: isFullscreen,
    containerFullscreen: isContainerFullscreen,
    progress: progress.value,
    text: text.value,
    'onUpdate:modelValue': (val: boolean) => {
      visible.value = val
    }
  })

  // 创建应用实例
  const app = createApp({
    render() {
      return h(XlyLoadingComp, {
        ...props,
        modelValue: visible.value,
        fullscreen: isFullscreen,
        containerFullscreen: isContainerFullscreen,
        progress: progress.value,
        text: text.value,
        'onUpdate:modelValue': (val: boolean) => {
          visible.value = val
        }
      })
    }
  })

  // 挂载
  app.mount(container)

  // 创建实例对象
  const instance: LoadingInstance = {
    closed: false,
    
    close() {
      if (instance.closed) return
      instance.closed = true
      
      visible.value = false
      
      // 延迟卸载，等待动画完成
      setTimeout(() => {
        app.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        // 从活跃列表中移除
        activeLoadings.forEach((inst, key) => {
          if (inst === instance) {
            activeLoadings.delete(key)
          }
        })
      }, 300)
    },
    
    setProgress(val: number) {
      if (!instance.closed) {
        progress.value = Math.max(0, Math.min(100, val))
      }
    },
    
    setText(val: string) {
      if (!instance.closed) {
        text.value = val
      }
    }
  }

  // 存储实例
  activeLoadings.set(target || document.body, instance)

  return instance
}

/**
 * 全局 Loading API
 * 
 * 使用方式：
 * ```ts
 * import { XlyLoading } from '@/components/xly-loading'
 * 
 * // 全屏加载
 * const loading = XlyLoading.open({ text: '加载中...' })
 * loading.close()
 * 
 * // 容器内加载
 * const loading = XlyLoading.open({
 *   target: '.my-container',  // 或 document.querySelector('.my-container')
 *   text: '数据加载中...'
 * })
 * 
 * // 更新进度
 * loading.setProgress(50)
 * 
 * // 更新文本
 * loading.setText('处理中...')
 * ```
 */
export const XlyLoading = {
  /**
   * 打开 Loading
   * @param options 配置选项或文本字符串
   */
  open(options: LoadingOptions | string = {}): LoadingInstance {
    const opts: LoadingOptions = typeof options === 'string' ? { text: options } : options
    
    // 如果目标容器已有 loading，先关闭
    const key = opts.target || document.body
    const existing = activeLoadings.get(key)
    if (existing && !existing.closed) {
      existing.close()
    }
    
    return createLoading(opts)
  },
  
  /**
   * 关闭指定目标的 Loading
   * @param target 目标容器选择器或元素，不传则关闭全屏 loading
   */
  close(target?: string | HTMLElement) {
    const key = target || document.body
    const instance = activeLoadings.get(key)
    if (instance && !instance.closed) {
      instance.close()
    }
  },
  
  /**
   * 关闭所有 Loading
   */
  closeAll() {
    activeLoadings.forEach(instance => {
      if (!instance.closed) {
        instance.close()
      }
    })
    activeLoadings.clear()
  },
  
  /**
   * 快捷方法：全屏加载
   * @param text 加载文本
   */
  fullscreen(text?: string) {
    return this.open({ text, fullscreen: true })
  },
  
  /**
   * 快捷方法：容器内加载
   * @param target 目标容器
   * @param text 加载文本
   */
  container(target: string | HTMLElement, text?: string) {
    return this.open({ target, text, containerFullscreen: true })
  }
}

/**
 * 安装全局 Loading
 * 在 main.ts 中调用：
 * ```ts
 * import { setupXlyLoading } from '@/components/xly-loading/install'
 * setupXlyLoading(app)
 * ```
 */
export function setupXlyLoading(app: App) {
  // 挂载到全局属性
  app.config.globalProperties.$loading = XlyLoading
  
  // 提供注入
  app.provide('__XLY_LOADING__', XlyLoading)
  
  // mixin 让模板中可以直接访问
  app.mixin({
    computed: {
      $loading() {
        return XlyLoading
      }
    }
  })
}

export type { LoadingInstance, LoadingOptions }
