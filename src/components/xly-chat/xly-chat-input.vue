<template>
  <div class="xly-chat-input">
    <!-- 附件预览 -->
    <div v-if="attachments.length > 0" class="xly-chat-input__attachments">
      <div
        v-for="(attachment, index) in attachments"
        :key="index"
        class="xly-chat-input__attachment"
      >
        <img
          v-if="isImage(attachment)"
          :src="attachment.url"
          :alt="attachment.name"
        />
        <div v-else class="xly-chat-input__attachment-file">
          <XlyIcon name="el:Document" />
          <span>{{ attachment.name }}</span>
        </div>
        <button
          class="xly-chat-input__attachment-close"
          @click="removeAttachment(index)"
        >
          <XlyIcon name="el:Close" :size="12" />
        </button>
      </div>
    </div>

    <!-- 输入框区域 -->
    <div class="xly-chat-input__wrapper">
      <div class="xly-chat-input__toolbar">
        <!-- 上传附件按钮 -->
        <button
          v-if="allowUpload"
          class="xly-chat-input__toolbar-btn"
          @click="handleFileSelect"
          title="上传附件"
        >
          <XlyIcon name="el:Paperclip" />
        </button>
        <input
          ref="fileInputRef"
          type="file"
          :accept="accept"
          :multiple="multiple"
          @change="handleFileChange"
          style="display: none"
        />

        <!-- 其他工具按钮插槽 -->
        <slot name="toolbar"></slot>
      </div>

      <textarea
        ref="textareaRef"
        v-model="inputValue"
        class="xly-chat-input__textarea"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        @keydown="handleKeydown"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>

      <!-- 发送按钮 -->
      <button
        class="xly-chat-input__send-btn"
        :class="{ 'is-disabled': !canSend }"
        :disabled="disabled || readonly || !canSend"
        @click="handleSend"
      >
        <XlyIcon name="el:Promotion" />
      </button>
    </div>

    <!-- 提示信息 -->
    <div v-if="showCharCount && maxlength" class="xly-chat-input__footer">
      <span>{{ inputValue.length }} / {{ maxlength }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import XlyIcon from '../xly-icon/index.vue'

export interface ChatAttachment {
  name: string
  url: string
  size?: number
  type?: string
  file?: File
}

export interface ChatInputProps {
  /** 输入框内容 */
  modelValue: string
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 最大输入长度 */
  maxlength?: number
  /** 是否显示字符计数 */
  showCharCount?: boolean
  /** 是否允许上传附件 */
  allowUpload?: boolean
  /** 接受的文件类型 */
  accept?: string
  /** 是否允许多选 */
  multiple?: boolean
  /** 最大附件数量 */
  maxAttachments?: number
  /** 是否自动聚焦 */
  autofocus?: boolean
  /** 初始行数 */
  rows?: number
  /** 最小行数 */
  minRows?: number
  /** 最大行数 */
  maxRows?: number
}

const props = withDefaults(defineProps<ChatInputProps>(), {
  placeholder: '请输入消息...',
  disabled: false,
  readonly: false,
  showCharCount: false,
  allowUpload: true,
  accept: '*/*',
  multiple: true,
  maxAttachments: 5,
  autofocus: false,
  rows: 3,
  minRows: 1,
  maxRows: 8,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send', content: string, attachments: ChatAttachment[]): void
  (e: 'upload', files: File[]): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const slots = defineSlots()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref(props.modelValue)
const attachments = ref<ChatAttachment[]>([])
const isComposing = ref(false) // 是否正在输入法输入中

// 判断是否可以发送
const canSend = computed(() => {
  return (inputValue.value.trim() !== '' || attachments.value.length > 0) && !props.disabled
})

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

// 自动调整文本框高度
function autoResize() {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'
  const lineHeight = 24 // 行高
  const minHeight = props.minRows * lineHeight
  const maxHeight = props.maxRows * lineHeight

  textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)}px`
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
}

// 处理输入事件
function handleInput(e: Event) {
  autoResize()
  emit('update:modelValue', inputValue.value)
}

// 处理键盘事件
function handleKeydown(e: KeyboardEvent) {
  // Shift + Enter: 换行
  if (e.shiftKey && e.key === 'Enter') {
    return
  }

  // Enter: 发送（不在输入法输入中）
  if (e.key === 'Enter' && !isComposing.value) {
    e.preventDefault()
    handleSend()
  }
}

// 发送消息
function handleSend() {
  if (!canSend.value) return

  const content = inputValue.value.trim()
  if (content === '' && attachments.value.length === 0) return

  emit('send', content, [...attachments.value])

  // 清空输入框和附件
  inputValue.value = ''
  emit('update:modelValue', '')
  attachments.value = []

  // 重置文本框高度
  nextTick(() => {
    autoResize()
  })
}

// 处理文件选择
function handleFileSelect() {
  fileInputRef.value?.click()
}

// 处理文件变化
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length === 0) return

  // 检查附件数量限制
  if (attachments.value.length + files.length > props.maxAttachments) {
    alert(`最多只能上传 ${props.maxAttachments} 个附件`)
    target.value = ''
    return
  }

  // 处理文件
  const newAttachments: ChatAttachment[] = []
  for (const file of files) {
    const url = URL.createObjectURL(file)
    newAttachments.push({
      name: file.name,
      url,
      size: file.size,
      type: file.type,
      file,
    })
  }

  attachments.value.push(...newAttachments)
  emit('upload', files)

  // 清空 input
  target.value = ''
}

// 移除附件
function removeAttachment(index: number) {
  attachments.value.splice(index, 1)
}

// 判断是否为图片
function isImage(attachment: ChatAttachment): boolean {
  const type = attachment.type || attachment.name.split('.').pop()?.toLowerCase()
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']
  return imageTypes.includes(type || '')
}

// 聚焦
function handleFocus() {
  emit('focus')
}

// 失焦
function handleBlur() {
  emit('blur')
}

// 监听输入法事件
if (textareaRef.value) {
  textareaRef.value.addEventListener('compositionstart', () => {
    isComposing.value = true
  })
  textareaRef.value.addEventListener('compositionend', () => {
    isComposing.value = false
  })
}

// 暴露方法
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  clear: () => {
    inputValue.value = ''
    attachments.value = []
    emit('update:modelValue', '')
    nextTick(() => autoResize())
  },
})
</script>

<style scoped lang="scss">
$xly-primary: #4f6ef7;
$xly-primary-hover: #4056d6;
$xly-border: #e2e4ed;
$xly-bg: #f5f6fa;
$xly-text: #1a1a2e;
$xly-text-secondary: #8e8ea0;
$xly-radius: 12px;

.xly-chat-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.xly-chat-input__attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background: #fafbfd;
  border-radius: $xly-radius;
  border: 1px solid $xly-border;
}

.xly-chat-input__attachment {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $xly-border;
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.xly-chat-input__attachment-file {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: $xly-text-secondary;
  padding: 8px;

  :first-child {
    font-size: 24px;
    color: $xly-primary;
  }

  span {
    text-align: center;
    word-break: break-all;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.xly-chat-input__attachment-close {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
}

.xly-chat-input__wrapper {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  background: #fff;
  border: 1px solid $xly-border;
  border-radius: $xly-radius;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: $xly-primary;
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.08);
  }
}

.xly-chat-input__toolbar {
  display: flex;
  gap: 4px;
  padding-bottom: 8px;
}

.xly-chat-input__toolbar-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: $xly-bg;
  color: $xly-text-secondary;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background: #e2e4ed;
    color: $xly-text;
  }
}

.xly-chat-input__textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  color: $xly-text;
  background: transparent;
  font-family: inherit;
  min-height: 20px;
  padding: 0;
  overflow-y: hidden;

  &::placeholder {
    color: $xly-text-secondary;
  }

  &:disabled {
    background: $xly-bg;
    cursor: not-allowed;
  }
}

.xly-chat-input__send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: $xly-primary;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;

  &:hover:not(.is-disabled) {
    background: $xly-primary-hover;
    transform: scale(1.05);
  }

  &:active:not(.is-disabled) {
    transform: scale(0.95);
  }

  &.is-disabled {
    background: #d3d4dd;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:disabled {
    background: #d3d4dd;
    cursor: not-allowed;
  }
}

.xly-chat-input__footer {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: $xly-text-secondary;
}
</style>
