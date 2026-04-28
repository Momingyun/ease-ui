import { reactive } from 'vue'

// ==============================
// 类型定义
// ==============================

export type MsgBoxType = 'info' | 'success' | 'warning' | 'danger'
export type MsgBoxAction = 'confirm' | 'cancel' | 'close'

export interface MsgBoxInputConfig {
  /** 输入框占位符 */
  placeholder?: string
  /** 输入框初始值 */
  value?: string
  /** 输入校验正则（字符串形式） */
  pattern?: string
  /** 校验失败提示 */
  patternMessage?: string
  /** 输入框类型 */
  inputType?: 'text' | 'password' | 'number' | 'textarea'
}

export interface MsgBoxOptions {
  /** 消息内容（支持 HTML，需开启 dangerouslyUseHTMLString） */
  message: string
  /** 标题 */
  title?: string
  /** 弹框类型（影响图标颜色） */
  type?: MsgBoxType
  /** 确认按钮文字 */
  confirmButtonText?: string
  /** 取消按钮文字 */
  cancelButtonText?: string
  /** 是否显示取消按钮 */
  showCancelButton?: boolean
  /** 是否显示确认按钮 */
  showConfirmButton?: boolean
  /** 是否显示关闭图标 */
  showClose?: boolean
  /** 是否可点击遮罩关闭 */
  closeOnClickModal?: boolean
  /** 是否可按 Esc 关闭 */
  closeOnPressEscape?: boolean
  /** 是否使用 HTML 内容（危险，确保内容可信） */
  dangerouslyUseHTMLString?: boolean
  /** 确认按钮是否为危险色（红色） */
  confirmButtonDanger?: boolean
  /** 是否显示输入框（prompt 模式） */
  showInput?: boolean
  /** 输入框配置 */
  input?: MsgBoxInputConfig
  /** 自定义类名 */
  customClass?: string
  /** 是否区分取消和关闭动作（默认 false，统一作为 cancel） */
  distinguishCancelAndClose?: boolean
  /** 确认回调 */
  onConfirm?: (value?: string) => void
  /** 取消回调 */
  onCancel?: () => void
}

export interface MsgBoxInstance {
  visible: boolean
  options: MsgBoxOptions
  inputValue: string
  inputError: string
  loading: boolean
  _resolve: (action: MsgBoxAction, value?: string) => void
  _reject: (action: MsgBoxAction) => void
}

// ==============================
// 全局状态
// ==============================

export const msgboxState = reactive<MsgBoxInstance>({
  visible: false,
  options: { message: '' },
  inputValue: '',
  inputError: '',
  loading: false,
  _resolve: () => {},
  _reject: () => {},
})

// ==============================
// 核心方法
// ==============================

function openMsgBox(options: MsgBoxOptions): Promise<{ action: MsgBoxAction; value?: string }> {
  return new Promise((resolve, reject) => {
    // 初始化输入框默认值
    msgboxState.inputValue = options.input?.value ?? ''
    msgboxState.inputError = ''
    msgboxState.loading = false
    msgboxState.options = options
    msgboxState.visible = true

    msgboxState._resolve = (action, value) => {
      msgboxState.visible = false
      resolve({ action, value })
    }

    msgboxState._reject = (action) => {
      msgboxState.visible = false
      reject(action)
    }
  })
}

// ==============================
// 对外 API
// ==============================

export const XlyMsgBox = {
  /**
   * Alert 弹框 —— 仅确认按钮
   * @example
   * await xly.$msgbox.alert('请注意保存数据', '提示')
   */
  alert(
    message: string,
    title?: string | MsgBoxOptions,
    options?: Omit<MsgBoxOptions, 'message' | 'title'>,
  ): Promise<{ action: MsgBoxAction; value?: string }> {
    const opts = buildOptions(message, title, options)
    return openMsgBox({
      showCancelButton: false,
      showClose: true,
      closeOnClickModal: false,
      ...opts,
    })
  },

  /**
   * Confirm 弹框 —— 确认 + 取消
   * @example
   * xly.$msgbox.confirm('确定要删除该记录吗？', '删除确认', { type: 'warning' })
   *   .then(() => doDelete())
   *   .catch(() => {})
   */
  confirm(
    message: string,
    title?: string | MsgBoxOptions,
    options?: Omit<MsgBoxOptions, 'message' | 'title'>,
  ): Promise<{ action: MsgBoxAction; value?: string }> {
    const opts = buildOptions(message, title, options)
    return openMsgBox({
      showCancelButton: true,
      showClose: true,
      closeOnClickModal: false,
      ...opts,
    })
  },

  /**
   * Prompt 弹框 —— 带输入框
   * @example
   * xly.$msgbox.prompt('请输入用户名', '创建用户')
   *   .then(({ value }) => console.log(value))
   *   .catch(() => {})
   */
  prompt(
    message: string,
    title?: string | MsgBoxOptions,
    options?: Omit<MsgBoxOptions, 'message' | 'title'>,
  ): Promise<{ action: MsgBoxAction; value?: string }> {
    const opts = buildOptions(message, title, options)
    return openMsgBox({
      showCancelButton: true,
      showClose: true,
      closeOnClickModal: false,
      showInput: true,
      ...opts,
    })
  },

  /**
   * 通用弹框
   * @example
   * xly.$msgbox({ message: '自定义内容', title: '标题', type: 'success' })
   */
  open(options: MsgBoxOptions): Promise<{ action: MsgBoxAction; value?: string }> {
    return openMsgBox(options)
  },
}

// ==============================
// 辅助函数
// ==============================

function buildOptions(
  message: string,
  title?: string | MsgBoxOptions,
  options?: Omit<MsgBoxOptions, 'message' | 'title'>,
): MsgBoxOptions {
  if (typeof title === 'object') {
    // title 实际上是 options 对象
    return { message, ...title }
  }
  return { message, title: title || '提示', ...options }
}
