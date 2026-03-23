import { reactive, computed } from 'vue'

type MessageType = 'success' | 'warning' | 'danger' | 'info' | 'text'
type MessagePosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

export interface MessageOptions {
  /** 消息内容 */
  message: string
  /** 消息类型 */
  type?: MessageType
  /** 标题（可选） */
  title?: string
  /** 显示时长（ms），0 表示不自动关闭 */
  duration?: number
  /** 是否可手动关闭 */
  closable?: boolean
  /** 弹出位置 */
  position?: MessagePosition
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: Record<string, string>
  /** 是否显示进度条 */
  showProgress?: boolean
  /** 关闭回调 */
  onClose?: () => void
}

export interface MessageItem extends Required<Pick<MessageOptions, 'type' | 'closable' | 'position' | 'showProgress'>> {
  id: number
  message: string
  title: string
  duration: number
  customClass: string
  customStyle: Record<string, string>
  onClose?: () => void
  timer: ReturnType<typeof setTimeout> | null
  paused: boolean
  remaining: number
}

export type { MessageType, MessagePosition }

export const positions: MessagePosition[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']

let seed = 0

export const messageList = reactive<MessageItem[]>([])

export const groupedList = computed(() => {
  const groups: Record<MessagePosition, MessageItem[]> = {
    top: [],
    'top-left': [],
    'top-right': [],
    bottom: [],
    'bottom-left': [],
    'bottom-right': [],
  }
  for (const item of messageList) {
    groups[item.position].push(item)
  }
  return groups
})

function genId() {
  return ++seed
}

/** 创建消息提示 */
function createMessage(options: MessageOptions | string): MessageItem {
  const opts: MessageOptions = typeof options === 'string' ? { message: options } : options

  const item: MessageItem = {
    id: genId(),
    message: opts.message,
    type: opts.type || 'info',
    title: opts.title || '',
    duration: opts.duration ?? 3000,
    closable: opts.closable ?? true,
    position: opts.position || 'top',
    customClass: opts.customClass || '',
    customStyle: opts.customStyle || {},
    showProgress: opts.showProgress ?? false,
    onClose: opts.onClose,
    timer: null,
    paused: false,
    remaining: opts.duration ?? 3000,
  }

  messageList.push(item)
  startTimer(item)
  return item
}

function startTimer(item: MessageItem) {
  if (item.duration <= 0) return
  item.remaining = item.duration
  item.timer = setTimeout(() => {
    closeMessage(item.id)
  }, item.remaining)
}

export function handleMouseEnter(item: MessageItem) {
  if (item.timer && item.duration > 0) {
    clearTimeout(item.timer)
    item.paused = true
  }
}

export function handleMouseLeave(item: MessageItem) {
  if (item.paused && item.duration > 0) {
    item.paused = false
    item.timer = setTimeout(() => {
      closeMessage(item.id)
    }, item.remaining)
  }
}

function closeMessage(id: number) {
  const index = messageList.findIndex((m) => m.id === id)
  if (index === -1) return
  const item = messageList[index]!
  if (item.timer) {
    clearTimeout(item.timer)
    item.timer = null
  }
  messageList.splice(index, 1)
  item.onClose?.()
}

/** 消息实例方法 */
export const XlyMsg = {
  /** 成功提示 */
  success: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'success' }),
  /** 警告提示 */
  warning: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'warning' }),
  /** 错误提示 */
  danger: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'danger' }),
  /** 信息提示 */
  info: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'info' }),
  /** 纯文本提示（无图标） */
  text: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'text' }),
  /** 关闭指定消息 */
  close: closeMessage,
  /** 关闭所有消息 */
  closeAll: () => {
    [...messageList].forEach((m) => closeMessage(m.id))
  },
}

/** @deprecated 请使用 XlyMsg */
export const messageMethods = {
  /** 成功提示 */
  success: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'success' }),
  /** 警告提示 */
  warning: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'warning' }),
  /** 错误提示 */
  danger: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'danger' }),
  /** 信息提示 */
  info: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'info' }),
  /** 纯文本提示（无图标） */
  text: (message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) =>
    createMessage({ ...opts, message, type: 'text' }),
  /** 关闭指定消息 */
  close: closeMessage,
  /** 关闭所有消息 */
  closeAll: () => {
    [...messageList].forEach((m) => closeMessage(m.id))
  },
}
