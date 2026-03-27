<template>
  <div class="xly-upload" :class="{ 'is-disabled': disabled }">
    <!-- ========================================
         文件列表
         包含上传按钮和已上传文件列表
    ======================================== -->
    <div class="xly-upload__list">
      <!-- ----------------------------------------
           上传按钮（放在最上面）
      ---------------------------------------- -->
      <div
        v-if="!disabled && !isMaxReached"
        class="xly-upload__trigger"
        :class="{ 'is-dragover': isDragover }"
        @click="handleTriggerClick"
        @dragover.prevent="isDragover = true"
        @dragleave.prevent="isDragover = false"
        @drop.prevent="handleDrop"
      >
        <!-- 自定义触发区域插槽 -->
        <slot name="trigger">
          <div class="xly-upload__trigger-inner">
            <!-- 图标 -->
            <div class="xly-upload__trigger-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <!-- 文字 -->
            <div class="xly-upload__trigger-text">
              <span class="primary">{{ triggerText || '点击上传' }}</span>
              <span class="secondary">或拖拽文件到此处</span>
            </div>
          </div>
        </slot>
      </div>

      <!-- ----------------------------------------
           已上传文件列表
      ---------------------------------------- -->
      <TransitionGroup name="xly-upload-fade">
        <div
          v-for="(item, index) in fileList"
          :key="item.id"
          class="xly-upload__item"
          :class="[`xly-upload__item--${item.status}`]"
        >
          <!-- 文件图标 -->
          <div class="xly-upload__file-icon">
            <component :is="getFileIcon(item)" />
          </div>

          <!-- 文件信息 -->
          <div class="xly-upload__file-info">
            <span class="xly-upload__file-name" :title="item.name">{{ item.name }}</span>
            <span v-if="item.size" class="xly-upload__file-size">{{
              formatFileSize(item.size)
            }}</span>
          </div>

          <!-- 上传进度 -->
          <div v-if="item.status === 'uploading'" class="xly-upload__progress">
            <div class="xly-upload__progress-bar">
              <div class="xly-upload__progress-fill" :style="{ width: `${item.percent || 0}%` }" />
            </div>
            <span class="xly-upload__progress-text">{{ item.percent || 0 }}%</span>
          </div>

          <!-- 操作按钮 -->
          <div v-if="!disabled && item.status !== 'uploading'" class="xly-upload__actions">
            <!-- 下载 -->
            <button
              v-if="item.url && downloadable"
              class="xly-upload__btn xly-upload__btn--download"
              title="下载"
              @click.stop="handleDownload(item)"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <!-- 删除 -->
            <button
              class="xly-upload__btn xly-upload__btn--delete"
              title="删除"
              @click.stop="handleRemove(index)"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>

          <!-- 成功状态角标 -->
          <div v-if="item.status === 'success'" class="xly-upload__badge">
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              fill="none"
              stroke="#fff"
              stroke-width="2"
            >
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </div>

          <!-- 错误标签 -->
          <div v-if="item.status === 'error'" class="xly-upload__error-tag">
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            上传失败
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- ========================================
         提示文字
    ======================================== -->
    <div v-if="tip || $slots.tip" class="xly-upload__tip">
      <slot name="tip">{{ tip }}</slot>
    </div>

    <!-- 隐藏的文件输入框 -->
    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple && (limit === undefined || limit > 1)"
      class="xly-upload__input"
      @change="handleInputChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'

// ============================================================
// 🔧 上传配置区（修改这里自定义上传逻辑）
// ============================================================

/**
 * 上传模式：
 * - local：本地上传（base64，纯前端预览，无需后端接口）
 * - network：网络上传（需要后端接口）
 */
const UPLOAD_MODE: 'local' | 'network' = 'local'

/**
 * 网络上传配置（mode = 'network' 时生效）
 * ⚠️ 修改这里的配置来自定义你的上传接口
 * 此配置仅为参考示例，请根据实际业务需求进行修改
 */
const NETWORK_CONFIG = {
  /** 上传接口地址 */
  url: '/api/upload/file',
  /** 请求方法 */
  method: 'POST' as const,
  /** 上传字段名（FormData 的 key） */
  fieldName: 'file',
  /** 请求头 */
  headers: {
    // 'Authorization': 'Bearer xxx',
  },
  /** 额外表单参数 */
  data: {
    // 'scene': 'document',
  },
  /**
   * 如何从响应中提取文件 URL？
   * 支持三种路径写法（自动兼容）：
   * - 'url'          → response: { url: '...' }
   * - 'data'         → response: { data: '...' }
   * - 'data.url'     → response: { data: { url: '...' } }
   */
  responseUrlPath: 'data',
}

// ============================================================
// 类型定义
// ============================================================

/** 文件上传状态 */
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'

/** v-model 返回值模式 */
export type UploadValueMode = 'array' | 'string'

/**
 * 上传文件对象
 * @property id - 文件唯一标识
 * @property name - 文件名称
 * @property url - 文件地址
 * @property size - 文件大小（单位 KB）
 * @property status - 上传状态
 * @property percent - 上传进度
 * @property raw - 原始文件对象
 */
export interface UploadFileItem {
  /** 文件唯一标识 */
  id: string
  /** 文件名称 */
  name: string
  /** 文件地址 */
  url: string
  /** 文件大小（KB） */
  size?: number
  /** 上传状态 */
  status?: UploadStatus
  /** 上传进度 0-100 */
  percent?: number
  /** 原始文件对象 */
  raw?: File
}

// ============================================================
// Props 定义
// ============================================================

interface Props {
  /** v-model 绑定值，支持对象数组或 JSON 字符串 */
  modelValue?: UploadFileItem[] | string
  /** 返回值模式：array 返回对象数组，string 返回 JSON 字符串 */
  valueMode?: UploadValueMode
  /** 最多上传数量 */
  limit?: number
  /** 是否支持多选 */
  multiple?: boolean
  /** 原生 accept 属性（文件选择框筛选） */
  accept?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持下载 */
  downloadable?: boolean
  /** 提示文字 */
  tip?: string
  /** 触发区域文字 */
  triggerText?: string
  /** 列表方向 */
  listType?: 'horizontal' | 'vertical'

  // ===== 内置校验配置（无需写 JS） =====
  /** 允许的文件后缀或 MIME 类型，逗号拼接，如 "pdf,doc,docx" */
  acceptTypes?: string
  /** 单文件最大尺寸（KB），如 2048 表示 2MB */
  maxSize?: number
  /** 单文件最小尺寸（KB），默认 0 */
  minSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  valueMode: 'array',
  multiple: true,
  accept: '*',
  disabled: false,
  downloadable: true,
  triggerText: '',
  listType: 'horizontal',
  minSize: 0,
})

// ============================================================
// Emits 定义
// ============================================================

const emit = defineEmits<{
  /** v-model 更新 */
  'update:modelValue': [value: UploadFileItem[] | string]
  /** 文件列表变化 */
  change: [fileList: UploadFileItem[]]
  /** 删除文件 */
  remove: [file: UploadFileItem, fileList: UploadFileItem[]]
  /** 单文件上传成功 */
  success: [file: UploadFileItem]
  /** 单文件上传失败 */
  error: [error: Error, file: UploadFileItem]
  /** 超出数量限制 */
  exceed: [files: File[], limit: number]
  /** 校验失败 */
  'validate-error': [msg: string, file: File]
}>()

defineOptions({ name: 'XlyUpload' })

// ============================================================
// 内部状态
// ============================================================

/** 文件输入框引用 */
const inputRef = ref<HTMLInputElement>()
/** 是否正在拖拽 */
const isDragover = ref(false)
/** 内部文件列表 */
const fileList = ref<UploadFileItem[]>([])

/** 是否达到上传上限 */
const isMaxReached = computed(() => {
  if (props.limit === undefined) return false
  return fileList.value.filter((f) => f.status !== 'error').length >= props.limit
})

// ============================================================
// 文件图标
// ============================================================

/**
 * 根据文件类型获取对应的 SVG 图标组件
 * @param item - 上传文件项
 * @returns SVG 组件
 */
function getFileIcon(item: UploadFileItem) {
  const type = item.raw?.type || ''
  const name = item.name || ''
  const ext = name.split('.').pop()?.toLowerCase() || ''

  // 图标配置映射表
  const iconMap: Record<string, { stroke: string; paths: any[] }> = {
    // 图片
    image: {
      stroke: '#52c41a',
      paths: [
        h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
        h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }),
        h('polyline', { points: '21 15 16 10 5 21' }),
      ],
    },
    // PDF
    pdf: {
      stroke: '#ff4d4f',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
        h('path', { d: 'M9 15h6M9 11h6' }),
      ],
    },
    // Word
    word: {
      stroke: '#1890ff',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
        h('path', { d: 'M8 13h2M8 17h2M14 13h2M14 17h2' }),
      ],
    },
    // Excel
    excel: {
      stroke: '#52c41a',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
        h('path', { d: 'M8 13h8M8 17h5' }),
      ],
    },
    // PPT
    ppt: {
      stroke: '#fa8c16',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
        h('path', { d: 'M10 12v4M14 12v1' }),
      ],
    },
    // 压缩包
    zip: {
      stroke: '#722ed1',
      paths: [h('path', { d: 'M21 8v13H3V8M1 3h22v5H1z' }), h('path', { d: 'M10 12h4' })],
    },
    // 视频
    video: {
      stroke: '#eb2f96',
      paths: [
        h('polygon', { points: '23 7 16 12 23 17 23 7' }),
        h('rect', { x: '1', y: '5', width: '15', height: '14', rx: '2', ry: '2' }),
      ],
    },
    // 音频
    audio: {
      stroke: '#13c2c2',
      paths: [
        h('path', { d: 'M9 18V5l12-2v13' }),
        h('circle', { cx: '6', cy: '18', r: '3' }),
        h('circle', { cx: '18', cy: '16', r: '3' }),
      ],
    },
    // 文本
    text: {
      stroke: '#8c8c8c',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
        h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
        h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
      ],
    },
    // 默认文件
    default: {
      stroke: '#8c8c8c',
      paths: [
        h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
        h('polyline', { points: '14 2 14 8 20 8' }),
      ],
    },
  }

  // 根据文件类型选择对应图标
  let icon = iconMap.default
  if (
    type.startsWith('image/') ||
    ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext)
  ) {
    icon = iconMap.image
  } else if (type === 'application/pdf' || ext === 'pdf') {
    icon = iconMap.pdf
  } else if (type === 'application/msword' || ['doc', 'docx'].includes(ext)) {
    icon = iconMap.word
  } else if (type === 'application/vnd.ms-excel' || ['xls', 'xlsx'].includes(ext)) {
    icon = iconMap.excel
  } else if (type === 'application/vnd.ms-powerpoint' || ['ppt', 'pptx'].includes(ext)) {
    icon = iconMap.ppt
  } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    icon = iconMap.zip
  } else if (type.startsWith('video/') || ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(ext)) {
    icon = iconMap.video
  } else if (type.startsWith('audio/') || ['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) {
    icon = iconMap.audio
  } else if (type.startsWith('text/') || ext === 'txt') {
    icon = iconMap.text
  }

  return h(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '36',
      height: '36',
      fill: 'none',
      stroke: icon.stroke,
      'stroke-width': '1.5',
    },
    icon.paths,
  )
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 格式化文件大小（KB 为单位）
 * @param sizeKB - 文件大小（KB）
 * @returns 格式化后的字符串，如 "2.5 MB"
 */
function formatFileSize(sizeKB: number | undefined): string {
  if (sizeKB === undefined || sizeKB === 0) return '0 B'
  const k = 1024
  if (sizeKB < k) return `${sizeKB} KB`
  const i = Math.floor(Math.log(sizeKB) / Math.log(k))
  return `${(sizeKB / Math.pow(k, i)).toFixed(i > 1 ? 1 : 0)} ${['KB', 'MB', 'GB', 'TB'][i]}`
}

// ============================================================
// 内置校验
// ============================================================

/**
 * 内置文件校验
 * @param file - 待校验的文件
 * @returns 错误信息字符串，null 表示校验通过
 */
function validateFile(file: File): string | null {
  // 校验文件类型
  if (props.acceptTypes) {
    const allowed = props.acceptTypes.split(',').map((t) => t.trim().toLowerCase())
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const mimeMatch = allowed.some((t) => t === file.type.toLowerCase())
    const extMatch = allowed.some((t) => t === ext || t === `.${ext}`)
    if (!mimeMatch && !extMatch) {
      return `不支持 ${ext || file.type} 格式`
    }
  }
  // 校验最小尺寸（转换为 KB）
  const sizeKB = file.size / 1024
  if (props.minSize && sizeKB < props.minSize) {
    return `文件不能小于 ${formatFileSize(props.minSize)}`
  }
  // 校验最大尺寸（转换为 KB）
  if (props.maxSize && sizeKB > props.maxSize) {
    return `文件不能超过 ${formatFileSize(props.maxSize)}`
  }
  return null
}

// ============================================================
// modelValue 同步
// ============================================================

/**
 * 将外部 modelValue 解析为对象数组
 * @param val - 外部传入的值
 * @returns 解析后的对象数组
 */
function parseModelValue(val: UploadFileItem[] | string | undefined): UploadFileItem[] {
  if (!val) return []
  // 数组直接返回
  if (Array.isArray(val)) return val.filter((f) => f.url)
  // JSON 字符串解析
  try {
    const parsed = JSON.parse(val)
    return Array.isArray(parsed) ? parsed.filter((f: UploadFileItem) => f.url) : []
  } catch {
    return []
  }
}

/**
 * 将内部文件列表序列化为 modelValue 格式
 * @param items - 文件列表
 * @returns 序列化后的值
 */
function serializeValue(items: UploadFileItem[]): UploadFileItem[] | string {
  const successItems = items.filter((f) => f.status !== 'error' && f.url)
  if (props.valueMode === 'string') {
    return JSON.stringify(successItems)
  }
  return successItems
}

// 监听外部值变化 → 同步到 fileList
watch(
  () => props.modelValue,
  (val) => {
    const items = parseModelValue(val)
    // 比较 ID 是否相同，避免不必要的更新
    const currentIds = fileList.value
      .filter((f) => f.url && f.status === 'success')
      .map((f) => f.id)
      .sort()
    const newIds = items.map((f) => f.id).sort()
    const isSame =
      currentIds.length === newIds.length && currentIds.every((id, i) => id === newIds[i])
    if (isSame) return

    fileList.value = items.map((item) => ({
      ...item,
      status: 'success' as UploadStatus,
    }))
  },
  { immediate: true },
)

/**
 * 向外 emit 更新
 */
function emitUpdate() {
  const successItems = fileList.value.filter((f) => f.status === 'success' && f.url)
  emit('update:modelValue', serializeValue(successItems))
  emit('change', [...fileList.value])
}

// ============================================================
// 触发选文件
// ============================================================

/** 触发文件选择 */
function handleTriggerClick() {
  if (props.disabled) return
  inputRef.value?.click()
}

/** 处理 input 选文件 */
function handleInputChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (!files.length) return
  input.value = '' // 重置，以便重复选同一文件
  processFiles(files)
}

/** 处理拖拽 */
function handleDrop(e: DragEvent) {
  isDragover.value = false
  if (props.disabled) return
  const files = Array.from(e.dataTransfer?.files || [])
  processFiles(files)
}

// ============================================================
// 文件处理
// ============================================================

/**
 * 处理文件列表
 * @param files - 文件列表
 */
async function processFiles(files: File[]) {
  // 检查上限
  if (props.limit !== undefined) {
    const currentValid = fileList.value.filter((f) => f.status !== 'error').length
    const allowed = props.limit - currentValid
    if (allowed <= 0) {
      emit('exceed', files, props.limit)
      return
    }
    if (files.length > allowed) {
      emit('exceed', files.slice(allowed), props.limit)
      files = files.slice(0, allowed)
    }
  }

  // 逐个上传
  for (const file of files) {
    await uploadFile(file)
  }
}

/**
 * 上传单个文件
 * @param file - 文件对象
 */
async function uploadFile(file: File) {
  // 内置校验
  const validateError = validateFile(file)
  if (validateError) {
    emit('validate-error', validateError, file)
    return
  }

  // 生成唯一 ID
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const uploadItem: UploadFileItem = {
    id,
    name: file.name,
    url: '',
    size: Math.round(file.size / 1024), // 转换为 KB
    status: 'uploading',
    percent: 0,
    raw: file,
  }
  fileList.value.push(uploadItem)

  const item = fileList.value.find((f) => f.id === id)!

  // 根据 mode 选择上传方式
  if (UPLOAD_MODE === 'network') {
    networkUpload({ file, item })
  } else {
    defaultLocalUpload({ file, item })
  }
}

/**
 *  网络上传（mode = 'network' 时使用） 以下为示例，可根据实际开发中后端接口和代码风格修改上传逻辑
 * @param opts - 上传参数
 */
async function networkUpload(opts: { file: File; item: UploadFileItem }) {
  const { file, item } = opts
  const { url, method, fieldName, headers, data, responseUrlPath } = NETWORK_CONFIG

  // 构建 FormData
  const formData = new FormData()
  formData.append(fieldName, file)
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: formData,
    })

    if (!res.ok) throw new Error(`上传失败: ${res.status}`)

    const response = await res.json()

    // 从响应中提取 URL（兼容三种写法）
    let fileUrl: string
    if (responseUrlPath === 'url') {
      fileUrl = response.url
    } else if (responseUrlPath === 'data') {
      fileUrl = response.data
    } else if (responseUrlPath === 'data.url') {
      fileUrl = response.data?.url
    } else {
      fileUrl = (response as any)[responseUrlPath]
    }

    if (!fileUrl) throw new Error('响应中未找到文件地址')

    // 更新文件信息
    item.id = response.id || item.id
    item.name = response.name || item.name
    item.url = fileUrl
    if (response.size !== undefined) item.size = response.size
    item.status = 'success'
    item.percent = 100

    emit('success', { ...item })
    emitUpdate()
  } catch (error) {
    item.status = 'error'
    emit('error', error as Error, { ...item })
  }
}

/**
 * 本地上传：模拟进度 + FileReader 读取 base64
 * @param opts - 上传参数
 */
function defaultLocalUpload(opts: { file: File; item: UploadFileItem }) {
  const { file, item } = opts

  // 模拟上传进度
  let progress = 0
  const timer = setInterval(() => {
    progress += Math.random() * 30
    if (progress >= 90) {
      clearInterval(timer)
      item.percent = 90
    } else {
      item.percent = Math.floor(progress)
    }
  }, 80)

  // 读取文件为 base64
  const reader = new FileReader()
  reader.onload = (e) => {
    clearInterval(timer)
    item.url = e.target?.result as string
    item.status = 'success'
    item.percent = 100
    emit('success', { ...item })
    emitUpdate()
  }
  reader.onerror = () => {
    clearInterval(timer)
    item.status = 'error'
    emit('error', new Error('读取文件失败'), { ...item })
  }
  reader.readAsDataURL(file)
}

// ============================================================
// 删除文件
// ============================================================

/**
 * 删除文件
 * @param index - 文件索引
 */
function handleRemove(index: number) {
  const removed = fileList.value.splice(index, 1)[0]
  emit('remove', removed, [...fileList.value])
  emitUpdate()
}

// ============================================================
// 下载文件
// ============================================================

/**
 * 下载文件
 * @param item - 文件项
 */
function handleDownload(item: UploadFileItem) {
  if (!item.url) return

  // base64 文件创建下载链接
  if (item.url.startsWith('data:')) {
    const link = document.createElement('a')
    link.href = item.url
    link.download = item.name
    link.click()
  } else if (item.url.startsWith('http')) {
    // 网络 URL 新窗口打开
    window.open(item.url, '_blank')
  }
}

// ============================================================
// 暴露方法（通过 ref 调用）
// ============================================================

defineExpose({
  /** 手动触发选文件 */
  open: handleTriggerClick,
  /** 清空所有文件 */
  clear: () => {
    fileList.value = []
    emitUpdate()
  },
  /** 获取文件列表 */
  getFileList: () => [...fileList.value],
})
</script>

<style scoped lang="scss">
// ============================================================
// 设计令牌
// ============================================================
// ============================================================
// 样式变量
// ============================================================
$primary: #4f6ef7;
$primary-light: rgba($primary, 0.08);
$primary-hover: #6b85f8; // 比 primary 亮 15% 的颜色
$danger: #ff3b30;
$success: #34c759;
$border: #ebeef5;
$border-dark: #d3d6dc; // 比 border 深 15%
$text: #303133;
$text-secondary: #909399;
$radius: 8px;

// ============================================================
// 组件容器
// ============================================================
.xly-upload {
  display: inline-block;
  width: 100%;

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

// ============================================================
// 文件列表
// ============================================================
.xly-upload__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// ============================================================
// 单个文件项
// ============================================================
.xly-upload__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid $border;
  border-radius: $radius;
  transition: all 0.2s ease;

  &:hover {
    border-color: $border-dark;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .xly-upload__actions {
      opacity: 1;
    }
  }

  &--success {
    border-color: rgba($success, 0.3);

    .xly-upload__badge {
      opacity: 1;
    }
  }

  &--uploading {
    border-color: rgba($primary, 0.5);
  }

  &--error {
    border-color: rgba($danger, 0.5);
    background: rgba($danger, 0.02);
  }
}

// ============================================================
// 文件图标
// ============================================================
.xly-upload__file-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfd;
  border-radius: 6px;

  svg {
    width: 28px;
    height: 28px;
  }
}

// ============================================================
// 文件信息
// ============================================================
.xly-upload__file-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.xly-upload__file-name {
  font-size: 14px;
  font-weight: 500;
  color: $text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.xly-upload__file-size {
  font-size: 12px;
  color: $text-secondary;
}

// ============================================================
// 进度条
// ============================================================
.xly-upload__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 16px;
  background: linear-gradient(to top, rgba(#fff, 0.98), rgba(#fff, 0.95));
  border-radius: 0 0 $radius $radius;
  display: flex;
  align-items: center;
  gap: 12px;
}

.xly-upload__progress-bar {
  flex: 1;
  height: 4px;
  background: #f0f2f5;
  border-radius: 2px;
  overflow: hidden;
}

.xly-upload__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $primary, $primary-hover);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.xly-upload__progress-text {
  font-size: 12px;
  font-weight: 500;
  color: $primary;
  min-width: 36px;
  text-align: right;
}

// ============================================================
// 操作按钮
// ============================================================
.xly-upload__actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.xly-upload__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &--download {
    background: $primary-light;
    color: $primary;

    &:hover {
      background: $primary;
      color: #fff;
    }
  }

  &--delete {
    background: rgba($danger, 0.08);
    color: $danger;

    &:hover {
      background: $danger;
      color: #fff;
    }
  }
}

// ============================================================
// 成功角标
// ============================================================
.xly-upload__badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: $success;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  box-shadow: 0 2px 4px rgba($success, 0.3);
}

// ============================================================
// 错误标签
// ============================================================
.xly-upload__error-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: $danger;
  background: rgba($danger, 0.08);
  padding: 4px 10px;
  border-radius: 4px;
}

// ============================================================
// 上传按钮
// ============================================================
.xly-upload__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed $border;
  border-radius: $radius;
  background: #fafbfd;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover,
  &.is-dragover {
    border-color: $primary;
    background: $primary-light;

    .xly-upload__trigger-icon {
      background: $primary;
      color: #fff;
      transform: translateY(-2px);
    }

    .xly-upload__trigger-text .primary {
      color: $primary;
    }
  }
}

.xly-upload__trigger-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.xly-upload__trigger-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  color: $primary;
  box-shadow: 0 2px 8px rgba($primary, 0.15);
  transition: all 0.25s ease;

  svg {
    width: 24px;
    height: 24px;
  }
}

.xly-upload__trigger-text {
  display: flex;
  flex-direction: column;
  gap: 2px;

  .primary {
    font-size: 15px;
    font-weight: 500;
    color: $text;
    transition: color 0.2s;
  }

  .secondary {
    font-size: 13px;
    color: $text-secondary;
  }
}

// ============================================================
// 隐藏 input
// ============================================================
.xly-upload__input {
  display: none;
}

// ============================================================
// 提示文字
// ============================================================
.xly-upload__tip {
  margin-top: 10px;
  font-size: 12px;
  color: $text-secondary;
  line-height: 1.5;
}

// ============================================================
// 过渡动画
// ============================================================
.xly-upload-fade-enter-active,
.xly-upload-fade-leave-active {
  transition: all 0.25s ease;
}

.xly-upload-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.xly-upload-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
