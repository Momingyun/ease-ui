<template>
  <div class="xly-upload" :class="{ 'is-disabled': disabled }">
    <!-- 图片列表 -->
    <div class="xly-upload__list">
      <!-- 已上传图片 -->
      <TransitionGroup name="xly-upload-fade">
        <div
          v-for="(item, index) in fileList"
          :key="item.uid"
          class="xly-upload__item"
          :class="[`xly-upload__item--${item.status}`]"
          :style="itemStyle"
        >
          <!-- 预览图 -->
          <img
            v-if="item.url"
            :src="item.url"
            :alt="item.name"
            class="xly-upload__img"
            :style="{ objectFit: fit }"
            @click="handlePreview(index)"
          />

          <!-- 上传进度 -->
          <div v-if="item.status === 'uploading'" class="xly-upload__progress">
            <div class="xly-upload__progress-ring">
              <svg viewBox="0 0 36 36" class="progress-svg">
                <circle
                  class="progress-track"
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="3"
                />
                <circle
                  class="progress-fill"
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke="#fff"
                  stroke-width="3"
                  stroke-linecap="round"
                  :stroke-dasharray="`${(item.percent || 0) * 0.88} 88`"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span class="progress-text">{{ item.percent || 0 }}%</span>
            </div>
          </div>

          <!-- 错误遮罩 -->
          <div v-if="item.status === 'error'" class="xly-upload__error-mask">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>上传失败</span>
          </div>

          <!-- 操作遮罩（hover 显示） -->
          <div v-if="!disabled && item.status !== 'uploading'" class="xly-upload__actions">
            <!-- 预览 -->
            <span
              v-if="item.url && previewable"
              class="xly-upload__action"
              title="预览"
              @click.stop="handlePreview(index)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <!-- 删除 -->
            <span
              class="xly-upload__action xly-upload__action--danger"
              title="删除"
              @click.stop="handleRemove(index)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </span>
          </div>

          <!-- 状态角标 -->
          <div v-if="item.status === 'success'" class="xly-upload__badge">
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#fff" stroke-width="2">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </div>
        </div>
      </TransitionGroup>

      <!-- 上传触发区域 -->
      <div
        v-if="!disabled && !isMaxReached"
        class="xly-upload__trigger"
        :class="{ 'is-dragover': isDragover }"
        :style="itemStyle"
        @click="handleTriggerClick"
        @dragover.prevent="isDragover = true"
        @dragleave.prevent="isDragover = false"
        @drop.prevent="handleDrop"
      >
        <slot name="trigger">
          <div class="xly-upload__trigger-inner">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span v-if="triggerText" class="xly-upload__trigger-text">{{ triggerText }}</span>
          </div>
        </slot>
      </div>

      <!-- 隐藏的 input -->
      <input
        ref="inputRef"
        type="file"
        :accept="accept"
        :multiple="multiple && (limit === undefined || limit > 1)"
        class="xly-upload__input"
        @change="handleInputChange"
      />
    </div>

    <!-- 提示文字 -->
    <div v-if="tip || $slots.tip" class="xly-upload__tip">
      <slot name="tip">{{ tip }}</slot>
    </div>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
      <Transition name="xly-upload-preview">
        <div
          v-if="previewVisible"
          class="xly-upload-preview-modal"
          @click.self="previewVisible = false"
          @wheel.prevent="handlePreviewWheel"
        >
          <!-- 关闭 -->
          <button class="xly-upload-preview__close" @click="previewVisible = false">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- 上一张 -->
          <button
            v-if="previewUrlList.length > 1"
            class="xly-upload-preview__arrow xly-upload-preview__arrow--prev"
            @click="previewPrev"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <!-- 图片 -->
          <div class="xly-upload-preview__body" @mousedown="handlePreviewDragStart">
            <img
              :src="previewUrlList[previewIndex]"
              :style="previewImgStyle"
              class="xly-upload-preview__img"
              draggable="false"
            />
          </div>

          <!-- 下一张 -->
          <button
            v-if="previewUrlList.length > 1"
            class="xly-upload-preview__arrow xly-upload-preview__arrow--next"
            @click="previewNext"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <!-- 底部工具栏 -->
          <div class="xly-upload-preview__footer">
            <span class="xly-upload-preview__count">{{ previewIndex + 1 }} / {{ previewUrlList.length }}</span>
            <div class="xly-upload-preview__toolbar">
              <button class="preview-btn" title="缩小" @click="previewZoomOut">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button class="preview-btn" title="放大" @click="previewZoomIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button class="preview-btn" title="向左旋转" @click="previewRotateLeft">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                </svg>
              </button>
              <button class="preview-btn" title="向右旋转" @click="previewRotateRight">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.95" />
                </svg>
              </button>
              <button class="preview-btn" title="重置" @click="previewReset">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// ===================== 🔧 上传配置区（修改这里自定义上传逻辑） =====================

/**
 * 上传模式：
 * - local：本地上传（base64，纯前端预览，无需后端接口）
 * - network：网络上传（需要后端接口）
 */
const UPLOAD_MODE: 'local' | 'network' = 'local'

/**
 * 网络上传配置（mode = 'network' 时生效）
 * ⚠️ 修改这里的配置来自定义你的上传接口  此配置仅为参考示例，请根据实际业务需求进行修改
 */
const NETWORK_CONFIG = {
  /** 上传接口地址 */
  url: '/api/upload/image',
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
    // 'scene': 'avatar',
  },
  /**
   * 如何从响应中提取图片 URL？
   * 支持三种路径写法（自动兼容）：
   * - 'url'          → response: { url: '...' }
   * - 'data'         → response: { data: '...' }
   * - 'data.url'     → response: { data: { url: '...' } }
   */
  responseUrlPath: 'data',
}

// ===================== 类型定义 =====================

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
export type UploadValueMode = 'array' | 'string'

export interface UploadFile {
  uid: string
  name: string
  url?: string
  status: UploadStatus
  percent?: number
  raw?: File
}

interface Props {
  /** v-model 绑定值，支持字符串数组或逗号拼接字符串 */
  modelValue?: string[] | string
  /** 返回值模式：array 返回数组，string 返回逗号拼接（每项 encodeURIComponent 编码） */
  valueMode?: UploadValueMode
  /** 最多上传数量 */
  limit?: number
  /** 是否支持多选 */
  multiple?: boolean
  /** 原生 accept 属性（文件选择框筛选） */
  accept?: string
  /** 图片填充方式 */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /** 缩略图尺寸（px） */
  size?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持预览 */
  previewable?: boolean
  /** 提示文字 */
  tip?: string
  /** 触发区域文字 */
  triggerText?: string

  // ===== 内置校验配置（无需写 JS） =====
  /** 允许的文件后缀或 MIME 类型，逗号拼接，如 "jpg,png,gif" 或 "image/jpeg,image/png" */
  acceptTypes?: string
  /** 单文件最大尺寸（MB），不设置则不限制 */
  maxSize?: number
  /** 单文件最小尺寸（MB），默认 0 */
  minSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  valueMode: 'array',
  multiple: true,
  accept: 'image/*',
  fit: 'cover',
  size: 100,
  disabled: false,
  previewable: true,
  triggerText: '',
  minSize: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[] | string]
  'change': [fileList: UploadFile[]]
  'remove': [file: UploadFile, fileList: UploadFile[]]
  'success': [url: string, file: UploadFile]
  'error': [error: Error, file: UploadFile]
  'exceed': [files: File[], limit: number]
  'validate-error': [msg: string, file: File]
}>()

defineOptions({ name: 'XlyUpload' })

// ===================== 内部状态 =====================

const inputRef = ref<HTMLInputElement>()
const isDragover = ref(false)

// 内部文件列表
const fileList = ref<UploadFile[]>([])

// 是否达到上传上限
const isMaxReached = computed(() => {
  if (props.limit === undefined) return false
  return fileList.value.filter(f => f.status !== 'error').length >= props.limit
})

// ===================== 内置校验 =====================

/** 内置校验：返回错误信息字符串，null 表示校验通过 */
function validateFile(file: File): string | null {
  // 校验文件类型
  if (props.acceptTypes) {
    const allowed = props.acceptTypes.split(',').map(t => t.trim().toLowerCase())
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const mimeMatch = allowed.some(t => t === file.type.toLowerCase())
    const extMatch = allowed.some(t => t === ext || t === `.${ext}`)
    if (!mimeMatch && !extMatch) {
      return `不支持 ${ext || file.type} 格式，请上传 ${props.acceptTypes} 格式`
    }
  }
  // 校验最小尺寸
  if (props.minSize && file.size < props.minSize * 1024 * 1024) {
    return `文件大小不能小于 ${props.minSize}MB`
  }
  // 校验最大尺寸
  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    return `文件大小不能超过 ${props.maxSize}MB`
  }
  return null
}

// 缩略图尺寸样式
const itemStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

// ===================== modelValue 同步 =====================

/**
 * 将外部 modelValue 解析为 url 数组。
 * string 模式：每项经过 encodeURIComponent 编码后用逗号拼接，
 * 解析时 split(',') 再逐项 decodeURIComponent 还原。
 * base64 中的逗号被编码为 %2C，不会干扰分隔。
 * 普通 http URL 无 % 字符，decode 后原样还原，兼容旧数据。
 */
function parseModelValue(val: string[] | string | undefined): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val.filter(Boolean)
  return val
    .split(',')
    .map(s => { try { return decodeURIComponent(s.trim()) } catch { return s.trim() } })
    .filter(Boolean)
}

/** 将内部 url 数组序列化为 modelValue 格式 */
function serializeUrls(urls: string[]): string[] | string {
  if (props.valueMode === 'string') return urls.map(u => encodeURIComponent(u)).join(',')
  return urls
}

// 监听外部值变化 → 同步到 fileList（仅同步已有 URL）
watch(
  () => props.modelValue,
  (val) => {
    const urls = parseModelValue(val)
    // 只有当外部值与内部不一致时才同步（避免循环更新）
    const currentUrls = fileList.value.filter(f => f.url && f.status === 'success').map(f => f.url!)
    const isSame = urls.length === currentUrls.length && urls.every((u, i) => u === currentUrls[i])
    if (isSame) return

    fileList.value = urls.map((url, i) => ({
      uid: `init-${i}-${url}`,
      name: url.split('/').pop() || `image-${i}`,
      url,
      status: 'success' as UploadStatus,
    }))
  },
  { immediate: true },
)

/** 向外 emit 更新 */
function emitUpdate() {
  const successUrls = fileList.value
    .filter(f => f.status === 'success' && f.url)
    .map(f => f.url!)
  emit('update:modelValue', serializeUrls(successUrls))
  emit('change', [...fileList.value])
}

// ===================== 触发选文件 =====================

function handleTriggerClick() {
  if (props.disabled) return
  inputRef.value?.click()
}

// 处理 input 选文件
function handleInputChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (!files.length) return
  input.value = '' // 重置，以便重复选同一文件
  processFiles(files)
}

// 处理拖拽
function handleDrop(e: DragEvent) {
  isDragover.value = false
  if (props.disabled) return
  const files = Array.from(e.dataTransfer?.files || []).filter(f => f.type.startsWith('image/'))
  processFiles(files)
}

// ===================== 文件处理 =====================

async function processFiles(files: File[]) {
  // 检查上限
  if (props.limit !== undefined) {
    const currentValid = fileList.value.filter(f => f.status !== 'error').length
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

  for (const file of files) {
    await uploadFile(file)
  }
}

async function uploadFile(file: File) {
  // 内置校验
  const validateError = validateFile(file)
  if (validateError) {
    emit('validate-error', validateError, file)
    return
  }

  const uid = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const uploadItem: UploadFile = {
    uid,
    name: file.name,
    status: 'uploading',
    percent: 0,
    raw: file,
  }
  fileList.value.push(uploadItem)

  const item = fileList.value.find(f => f.uid === uid)!

  // 根据 mode 选择上传方式
  if (UPLOAD_MODE === 'network') {
    networkUpload({ file, item })
  } else {
    defaultLocalUpload({ file, item })
  }
}

/** 网络上传（mode = 'network' 时使用） 以下为示例，可根据实际开发中后端接口和代码风格修改上传逻辑*/
async function networkUpload(opts: { file: File; item: UploadFile }) {
  const { file, item } = opts
  const { url, method, fieldName, headers, data, responseUrlPath } = NETWORK_CONFIG

  const formData = new FormData()
  formData.append(fieldName, file)
  // 添加额外参数
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
    let imageUrl: string
    if (responseUrlPath === 'url') {
      imageUrl = response.url
    } else if (responseUrlPath === 'data') {
      imageUrl = response.data
    } else if (responseUrlPath === 'data.url') {
      imageUrl = response.data?.url
    } else {
      imageUrl = (response as any)[responseUrlPath]
    }

    if (!imageUrl) throw new Error('响应中未找到图片地址')

    item.url = imageUrl
    item.status = 'success'
    item.percent = 100
    emit('success', imageUrl, { ...item })
    emitUpdate()
  } catch (error) {
    item.status = 'error'
    emit('error', error as Error, { ...item })
  }
}

/** 默认本地上传：模拟进度 + FileReader 读取 base64 */
function defaultLocalUpload(opts: { file: File; item: UploadFile }) {
  const { file, item } = opts
  // 模拟进度
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

  const reader = new FileReader()
  reader.onload = (e) => {
    clearInterval(timer)
    item.url = e.target?.result as string
    item.status = 'success'
    item.percent = 100
    emit('success', item.url, { ...item })
    emitUpdate()
  }
  reader.onerror = () => {
    clearInterval(timer)
    item.status = 'error'
    emit('error', new Error('读取文件失败'), { ...item })
  }
  reader.readAsDataURL(file)
}

// ===================== 删除 =====================

function handleRemove(index: number) {
  const removed = fileList.value.splice(index, 1)[0]
  emit('remove', removed, [...fileList.value])
  emitUpdate()
}

// ===================== 预览 =====================

const previewVisible = ref(false)
const previewIndex = ref(0)
const previewScale = ref(1)
const previewRotation = ref(0)
const previewPos = ref({ x: 0, y: 0 })
const previewDragOffset = ref({ x: 0, y: 0 })
const previewIsDragging = ref(false)

const previewUrlList = computed(() =>
  fileList.value.filter(f => f.status === 'success' && f.url).map(f => f.url!)
)

const previewImgStyle = computed(() => ({
  transform: `translate(${previewPos.value.x + previewDragOffset.value.x}px, ${previewPos.value.y + previewDragOffset.value.y}px) scale(${previewScale.value}) rotate(${previewRotation.value}deg)`,
  transition: previewIsDragging.value ? 'none' : 'transform 0.25s ease',
  cursor: previewScale.value > 1 ? (previewIsDragging.value ? 'grabbing' : 'grab') : 'default',
}))

function handlePreview(index: number) {
  if (!props.previewable) return
  // 映射到 success 图片的索引
  const successItems = fileList.value.filter(f => f.status === 'success' && f.url)
  const successIndex = successItems.findIndex((_, i) => {
    const allIndex = fileList.value.indexOf(successItems[i])
    return allIndex === index
  })
  previewIndex.value = Math.max(0, successIndex)
  previewReset()
  previewVisible.value = true
}

function previewPrev() {
  previewIndex.value = previewIndex.value > 0 ? previewIndex.value - 1 : previewUrlList.value.length - 1
  previewReset()
}

function previewNext() {
  previewIndex.value = previewIndex.value < previewUrlList.value.length - 1 ? previewIndex.value + 1 : 0
  previewReset()
}

function previewZoomIn() { previewScale.value = Math.min(previewScale.value + 0.25, 5) }
function previewZoomOut() { previewScale.value = Math.max(previewScale.value - 0.25, 0.2) }
function previewRotateLeft() { previewRotation.value -= 90 }
function previewRotateRight() { previewRotation.value += 90 }
function previewReset() {
  previewScale.value = 1
  previewRotation.value = 0
  previewPos.value = { x: 0, y: 0 }
  previewDragOffset.value = { x: 0, y: 0 }
}

function handlePreviewWheel(e: WheelEvent) {
  e.deltaY < 0 ? previewZoomIn() : previewZoomOut()
}

function handlePreviewDragStart(e: MouseEvent) {
  if (previewScale.value <= 1) return
  previewIsDragging.value = true
  const startX = e.clientX
  const startY = e.clientY
  const onMove = (me: MouseEvent) => {
    previewDragOffset.value = { x: me.clientX - startX, y: me.clientY - startY }
  }
  const onUp = () => {
    previewIsDragging.value = false
    previewPos.value = {
      x: previewPos.value.x + previewDragOffset.value.x,
      y: previewPos.value.y + previewDragOffset.value.y,
    }
    previewDragOffset.value = { x: 0, y: 0 }
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

// ESC 关闭预览
watch(previewVisible, (val) => {
  const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') previewVisible.value = false }
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

// ===================== 暴露方法 =====================

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
// ---- 设计令牌 ----
$primary: #4f6ef7;
$danger: #ff3b30;
$success: #34c759;
$border: #e4e7f0;
$radius: 8px;
$transition: all 0.2s ease;

// ==================== 组件容器 ====================
.xly-upload {
  display: inline-block;

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

// ==================== 文件列表 ====================
.xly-upload__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
}

// ==================== 单个文件项 ====================
.xly-upload__item {
  position: relative;
  border-radius: $radius;
  overflow: hidden;
  background: #f5f6fa;
  border: 1px solid $border;
  flex-shrink: 0;
  cursor: default;

  &--success {
    border-color: transparent;

    &:hover .xly-upload__actions {
      opacity: 1;
    }
  }

  &--uploading {
    border-color: $primary;
  }

  &--error {
    border-color: $danger;
  }
}

.xly-upload__img {
  width: 100%;
  height: 100%;
  display: block;
}

// ==================== 进度覆盖层 ====================
.xly-upload__progress {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.xly-upload__progress-ring {
  position: relative;
  width: 40px;
  height: 40px;

  .progress-svg {
    width: 100%;
    height: 100%;
    transform: none;
  }

  .progress-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
  }
}

// ==================== 错误遮罩 ====================
.xly-upload__error-mask {
  position: absolute;
  inset: 0;
  background: rgba(255, 59, 48, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 11px;
}

// ==================== 操作遮罩 ====================
.xly-upload__actions {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.xly-upload__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.1);
  }

  &--danger:hover {
    background: rgba($danger, 0.6);
  }
}

// ==================== 成功角标 ====================
.xly-upload__badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 18px;
  height: 18px;
  background: $success;
  border-radius: 4px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

// ==================== 触发区域 ====================
.xly-upload__trigger {
  border: 1.5px dashed $border;
  border-radius: $radius;
  background: #fafbfd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;
  flex-shrink: 0;

  &:hover,
  &.is-dragover {
    border-color: $primary;
    background: rgba($primary, 0.04);
    color: $primary;
  }
}

.xly-upload__trigger-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #c0c4cc;
  transition: color 0.2s;

  .xly-upload__trigger:hover &,
  .xly-upload__trigger.is-dragover & {
    color: $primary;
  }
}

.xly-upload__trigger-text {
  font-size: 12px;
  line-height: 1;
}

// ==================== 隐藏 input ====================
.xly-upload__input {
  display: none;
}

// ==================== 提示文字 ====================
.xly-upload__tip {
  margin-top: 8px;
  font-size: 12px;
  color: #8e8ea0;
  line-height: 1.5;
}

// ==================== 预览弹窗 ====================
.xly-upload-preview-modal {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
}

.xly-upload-preview__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.xly-upload-preview__body {
  max-width: calc(100% - 120px);
  max-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.xly-upload-preview__img {
  max-width: 100%;
  max-height: calc(100vh - 120px);
  object-fit: contain;
  user-select: none;
  display: block;
}

.xly-upload-preview__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;
  z-index: 10;

  &:hover { background: rgba(255, 255, 255, 0.3); }

  &--prev { left: 16px; }
  &--next { right: 16px; }
}

.xly-upload-preview__footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.xly-upload-preview__count {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.xly-upload-preview__toolbar {
  display: flex;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  padding: 6px 12px;
}

.preview-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
}

// ==================== 过渡动画 ====================
.xly-upload-fade-enter-active,
.xly-upload-fade-leave-active {
  transition: all 0.25s ease;
}

.xly-upload-fade-enter-from,
.xly-upload-fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.xly-upload-preview-enter-active,
.xly-upload-preview-leave-active {
  transition: opacity 0.25s ease;
}

.xly-upload-preview-enter-from,
.xly-upload-preview-leave-to {
  opacity: 0;
}
</style>
