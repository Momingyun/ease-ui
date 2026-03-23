<template>
  <div class="xly-chat" :class="{ 'is-disabled': disabled }">
    <!-- 消息列表 -->
    <div
      ref="messagesContainerRef"
      class="xly-chat__messages"
      @scroll="handleScroll"
    >
      <!-- 欢迎消息/空状态 -->
      <div v-if="messages.length === 0" class="xly-chat__empty">
        <slot name="empty">
          <div class="xly-chat__empty-content">
            <XlyIcon name="el:ChatDotRound" :size="48" />
            <p>开始对话吧！</p>
          </div>
        </slot>
      </div>

      <!-- 消息列表 -->
      <XlyChatMessage
        v-for="message in messages"
        :key="message.id || messageIndex(message)"
        :message="message"
        :show-avatar="showAvatar"
        :show-name="showName"
        :show-time="showTime"
        :show-actions="showActions"
        :allow-copy="allowCopy"
        :allow-regenerate="allowRegenerate"
        :allow-delete="allowDelete"
        :typing-speed="typingSpeed"
        @copy="handleCopy"
        @regenerate="handleRegenerate"
        @delete="handleDelete"
        @attachment-click="handleAttachmentClick"
      >
        <!-- 自定义头像插槽 -->
        <template v-if="slots.avatar" #avatar="{ message }">
          <slot name="avatar" :message="message"></slot>
        </template>

        <!-- 自定义内容插槽 -->
        <template v-if="slots['message-content']" #content="{ message }">
          <slot name="message-content" :message="message"></slot>
        </template>

        <!-- 自定义操作按钮插槽 -->
        <template v-if="slots.actions" #actions="{ message }">
          <slot name="actions" :message="message"></slot>
        </template>
      </XlyChatMessage>

      <!-- 加载更多指示器 -->
      <div v-if="loading" class="xly-chat__loading">
        <XlyIcon name="el:Loading" class="xly-chat__loading-icon" />
        <span>AI 正在思考...</span>
      </div>

      <!-- 滚动到底部按钮 -->
      <button
        v-if="showScrollToBottom"
        class="xly-chat__scroll-btn"
        @click="scrollToBottom"
      >
        <XlyIcon name="el:ArrowDown" />
      </button>
    </div>

    <!-- 输入框 -->
    <div v-if="!disabled" class="xly-chat__input-wrapper">
      <XlyChatInput
        ref="inputRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="loading"
        :readonly="readonly"
        :maxlength="maxlength"
        :show-char-count="showCharCount"
        :allow-upload="allowUpload"
        :accept="accept"
        :multiple="multiple"
        :max-attachments="maxAttachments"
        :autofocus="autofocus"
        :rows="rows"
        :min-rows="minRows"
        :max-rows="maxRows"
        @send="handleSend"
        @upload="handleUpload"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <!-- 输入框工具栏插槽 -->
        <template v-if="slots['input-toolbar']" #toolbar>
          <slot name="input-toolbar"></slot>
        </template>
      </XlyChatInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import XlyChatMessage, {
  type ChatMessage,
  type ChatAttachment,
} from './xly-chat-message.vue'
import XlyChatInput, {
  type ChatInputProps,
} from './xly-chat-input.vue'
import XlyIcon from '../xly-icon/index.vue'

export interface ChatProps {
  /** 消息列表 */
  messages: ChatMessage[]
  /** 输入框占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否显示头像 */
  showAvatar?: boolean
  /** 是否显示用户名 */
  showName?: boolean
  /** 是否显示时间 */
  showTime?: boolean
  /** 是否显示操作按钮 */
  showActions?: boolean
  /** 是否允许复制 */
  allowCopy?: boolean
  /** 是否允许重新生成 */
  allowRegenerate?: boolean
  /** 是否允许删除 */
  allowDelete?: boolean
  /** 是否开启打字效果 */
  enableTyping?: boolean
  /** 打字速度（毫秒/字） */
  typingSpeed?: number
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
  /** 输入框初始行数 */
  rows?: number
  /** 输入框最小行数 */
  minRows?: number
  /** 输入框最大行数 */
  maxRows?: number
}

const props = withDefaults(defineProps<ChatProps>(), {
  placeholder: '请输入消息...',
  disabled: false,
  readonly: false,
  loading: false,
  showAvatar: true,
  showName: false,
  showTime: true,
  showActions: true,
  allowCopy: true,
  allowRegenerate: true,
  allowDelete: false,
  enableTyping: false,
  typingSpeed: 50,
  maxlength: undefined,
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
  (e: 'update:messages', messages: ChatMessage[]): void
  (e: 'send', content: string, attachments: ChatAttachment[]): void
  (e: 'upload', files: File[]): void
  (e: 'scroll-to-top'): void
  (e: 'scroll-to-bottom'): void
  (e: 'copy', content: string): void
  (e: 'regenerate', message: ChatMessage): void
  (e: 'delete', message: ChatMessage): void
  (e: 'attachment-click', attachment: ChatAttachment): void
}>()

const slots = defineSlots()

const messagesContainerRef = ref<HTMLElement | null>(null)
const inputRef = ref<InstanceType<typeof XlyChatInput> | null>(null)
const inputValue = ref('')
const showScrollToBottom = ref(false)
const isScrollingTop = ref(false) // 标记是否正在滚动到顶部

// 监听消息列表变化，自动滚动到底部（但不在滚动到顶部时）
watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    // 如果正在滚动到顶部加载历史消息，不要自动滚动到底部
    if (!isScrollingTop.value) {
      scrollToBottom(false)
    }
  }
)

// 计算消息索引
function messageIndex(message: ChatMessage): number {
  return props.messages.indexOf(message)
}

// 处理发送
function handleSend(content: string, attachments: ChatAttachment[]) {
  emit('send', content, attachments)
  inputValue.value = ''
}

// 处理上传
function handleUpload(files: File[]) {
  emit('upload', files)
}

// 处理滚动
function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target

  // 距离底部超过 200px 时显示滚动到底部按钮
  const distanceToBottom = scrollHeight - scrollTop - clientHeight
  showScrollToBottom.value = distanceToBottom > 200

  // 滚动到顶部时触发回调
  if (scrollTop === 0) {
    isScrollingTop.value = true // 标记正在滚动到顶部
    emit('scroll-to-top')

    // 延迟取消标记，确保加载完成后不会自动滚动到底部
    setTimeout(() => {
      isScrollingTop.value = false
    }, 1000)
  }
}

// 滚动到底部
function scrollToBottom(smooth: boolean = true) {
  if (!messagesContainerRef.value) return

  const container = messagesContainerRef.value
  container.scrollTo({
    top: container.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })

  showScrollToBottom.value = false
}

// 处理复制
function handleCopy(content: string) {
  emit('copy', content)
}

// 处理重新生成
function handleRegenerate(message: ChatMessage) {
  emit('regenerate', message)
}

// 处理删除
function handleDelete(message: ChatMessage) {
  emit('delete', message)
}

// 处理附件点击
function handleAttachmentClick(attachment: ChatAttachment) {
  emit('attachment-click', attachment)
}

// 处理聚焦
function handleFocus() {
  // 可选：聚焦时的逻辑
}

// 处理失焦
function handleBlur() {
  // 可选：失焦时的逻辑
}

// 暴露方法
defineExpose({
  scrollToBottom,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: () => inputRef.value?.clear(),
  getMessages: () => props.messages,
})
</script>

<style scoped lang="scss">
$xly-primary: #4f6ef7;
$xly-bg: #f5f6fa;
$xly-text: #1a1a2e;
$xly-text-secondary: #8e8ea0;
$xly-border: #e2e4ed;
$xly-radius: 12px;

.xly-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-radius: $xly-radius;
  overflow: hidden;

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.xly-chat__messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d3d4dd;
    border-radius: 3px;

    &:hover {
      background: #b8b9c3;
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.xly-chat__empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xly-chat__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: $xly-text-secondary;
  font-size: 14px;

  :first-child {
    color: $xly-primary;
    opacity: 0.5;
  }
}

.xly-chat__loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin: 12px 0;
  background: $xly-bg;
  border-radius: 8px;
  font-size: 14px;
  color: $xly-text-secondary;
}

.xly-chat__loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.xly-chat__scroll-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: $xly-primary;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(79, 110, 247, 0.3);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  animation: bounceIn 0.3s ease;

  &:hover {
    background: #4056d6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 110, 247, 0.4);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.xly-chat__input-wrapper {
  padding: 16px 20px;
  border-top: 1px solid $xly-border;
  background: #fff;
}
</style>
