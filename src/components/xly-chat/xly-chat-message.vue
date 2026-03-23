<template>
  <div
    class="xly-chat-message"
    :class="{
      'is-user': message.role === 'user',
      'is-assistant': message.role === 'assistant',
      'is-system': message.role === 'system',
    }"
  >
    <!-- 头像 -->
    <div v-if="showAvatar" class="xly-chat-message__avatar">
      <slot name="avatar" :message="message">
        <img v-if="message.avatar" :src="message.avatar" :alt="message.role" />
        <XlyIcon v-else-if="message.role === 'user'" name="el:User" />
        <XlyIcon v-else-if="message.role === 'assistant'" name="el:ChatDotRound" />
        <XlyIcon v-else name="el:InfoFilled" />
      </slot>
    </div>

    <!-- 消息内容 -->
    <div class="xly-chat-message__content">
      <!-- 用户名 -->
      <div v-if="message.name && showName" class="xly-chat-message__name">
        {{ message.name }}
      </div>

      <!-- 时间 -->
      <div v-if="message.time && showTime" class="xly-chat-message__time">
        {{ formatTime(message.time) }}
      </div>

      <!-- Markdown 内容 -->
      <div
        v-if="message.content && message.content.trim()"
        ref="textRef"
        class="xly-chat-message__text"
        :class="{ 'is-typing': isTyping }"
        v-html="renderedMarkdown"
      ></div>

      <!-- 附件列表 -->
      <div v-if="message.attachments && message.attachments.length > 0" class="xly-chat-message__attachments">
        <div
          v-for="(attachment, index) in message.attachments"
          :key="index"
          class="xly-chat-message__attachment"
          @click="handleAttachmentClick(attachment)"
        >
          <!-- 图片附件 -->
          <img
            v-if="isImage(attachment)"
            :src="attachment.url"
            :alt="attachment.name"
          />
          <!-- 其他附件 -->
          <div v-else class="xly-chat-message__attachment-file">
            <XlyIcon name="el:Document" />
            <span class="file-name">{{ attachment.name }}</span>
            <span class="size">{{ formatSize(attachment.size) }}</span>
          </div>
        </div>
      </div>

      <!-- 自定义消息内容插槽 -->
      <slot name="content" :message="message"></slot>

      <!-- 操作按钮 -->
      <div v-if="showActions" class="xly-chat-message__actions">
        <slot name="actions" :message="message">
          <button
            v-if="allowCopy"
            class="xly-chat-message__action-btn"
            @click="handleCopy"
            title="复制"
          >
            <XlyIcon name="el:DocumentCopy" />
          </button>
          <button
            v-if="allowRegenerate && message.role === 'assistant'"
            class="xly-chat-message__action-btn"
            @click="handleRegenerate"
            title="重新生成"
          >
            <XlyIcon name="el:Refresh" />
          </button>
          <button
            v-if="allowDelete"
            class="xly-chat-message__action-btn"
            @click="handleDelete"
            title="删除"
          >
            <XlyIcon name="el:Delete" />
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import MarkdownIt from 'markdown-it'
import XlyIcon from '../xly-icon/index.vue'

export interface ChatAttachment {
  name: string
  url: string
  size?: number
  type?: string
}

export interface ChatMessage {
  id?: string | number
  role: 'user' | 'assistant' | 'system'
  content?: string
  name?: string
  avatar?: string
  time?: string | Date
  attachments?: ChatAttachment[]
  typing?: boolean // 是否正在打字中
}

export interface ChatMessageProps {
  message: ChatMessage
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
  /** 打字速度（毫秒/字） */
  typingSpeed?: number
}

const props = withDefaults(defineProps<ChatMessageProps>(), {
  showAvatar: true,
  showName: false,
  showTime: false,
  showActions: true,
  allowCopy: true,
  allowRegenerate: true,
  allowDelete: false,
  typingSpeed: 50,
})

const emit = defineEmits<{
  (e: 'copy', content: string): void
  (e: 'regenerate', message: ChatMessage): void
  (e: 'delete', message: ChatMessage): void
  (e: 'attachment-click', attachment: ChatAttachment): void
}>()

// 打字效果状态
const textRef = ref<HTMLElement | null>(null)

// const slots = defineSlots()

// Markdown 解析器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true, // 支持 \n 换行
})

// 判断是否正在打字
const isTyping = computed(() => props.message.typing || false)

// 显示的内容
// 流式输出模式：typing=true 时直接显示 message.content（因为内容在实时更新）
// 动画模式：typing=false 时显示完整内容
const displayContent = computed(() => {
  return props.message.content || ''
})

// 渲染 Markdown 内容
const renderedMarkdown = computed(() => {
  const content = displayContent.value
  if (!content.trim()) return ''

  return md.render(content)
})

// 在更新后，把光标移动到最后一个文本节点的后面
onUpdated(() => {
  if (textRef.value) {
    // 移除旧的光标
    const oldCursor = textRef.value.querySelector('.typing-cursor')
    if (oldCursor) {
      oldCursor.remove()
    }

    // 如果正在打字，创建新的光标
    if (isTyping.value) {
      const cursor = document.createElement('span')
      cursor.className = 'typing-cursor'
      cursor.textContent = '|'

      // 找到最后一个文本节点
      const textNodes = []
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
          textNodes.push(node)
        }
        for (const child of node.childNodes) {
          walk(child)
        }
      }
      walk(textRef.value)

      // 把光标插入到最后一个文本节点后面
      if (textNodes.length > 0) {
        const lastTextNode = textNodes[textNodes.length - 1]
        const parent = lastTextNode.parentNode
        if (parent && lastTextNode.nextSibling) {
          parent.insertBefore(cursor, lastTextNode.nextSibling)
        } else if (parent) {
          parent.appendChild(cursor)
        }
      } else {
        // 如果没有文本节点，直接追加到容器末尾
        textRef.value.appendChild(cursor)
      }
    }
  }
})

// 格式化时间
function formatTime(time: string | Date): string {
  const date = typeof time === 'string' ? new Date(time) : time
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  // 小于1分钟
  if (diff < 60000) {
    return '刚刚'
  }
  // 小于1小时
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  }
  // 小于24小时
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  }
  // 大于24小时，显示具体时间
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

// 格式化文件大小
function formatSize(size?: number): string {
  if (!size) return ''
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)}MB`
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)}GB`
}

// 判断是否为图片
function isImage(attachment: ChatAttachment): boolean {
  const type = attachment.type || attachment.name.split('.').pop()?.toLowerCase()
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']
  return imageTypes.includes(type || '')
}

// 复制消息
function handleCopy() {
  if (!props.message.content) return
    
  // 创建临时 div 来渲染 Markdown
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = md.render(props.message.content)
    
  // 提取纯文本内容，保留 <br> 换行
  let textContent = ''
  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null)
  let node
  while ((node = walker.nextNode())) {
    textContent += node.textContent
    // 在文本节点后添加换行符（模拟原始换行）
    if (node.nextSibling && node.nextSibling.nodeType !== Node.TEXT_NODE) {
      textContent += '\n'
    }
  }
    
  // 清理多余的空行
  textContent = textContent.replace(/\n{3,}/g, '\n\n')
    
  navigator.clipboard.writeText(textContent)
  emit('copy', textContent)
}

// 重新生成
function handleRegenerate() {
  emit('regenerate', props.message)
}

// 删除消息
function handleDelete() {
  emit('delete', props.message)
}

// 点击附件
function handleAttachmentClick(attachment: ChatAttachment) {
  emit('attachment-click', attachment)
}
</script>

<style scoped lang="scss">
.xly-chat-message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;

  &.is-user {
    flex-direction: row-reverse;

    .xly-chat-message__content {
      align-items: flex-end;
    }

    .xly-chat-message__text {
      background: linear-gradient(135deg, #4f6ef7 0%, #4056d6 100%);
      color: #fff;
    }
  }

  &.is-assistant {
    .xly-chat-message__text {
      background: #f5f6fa;
      color: #1a1a2e;
    }
  }

  &.is-system {
    justify-content: center;

    .xly-chat-message__content {
      background: #f5f6fa;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 13px;
      color: #8e8ea0;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.xly-chat-message__avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8ea0;
  font-size: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.xly-chat-message__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: calc(100% - 52px);
}

.xly-chat-message__name {
  font-size: 13px;
  font-weight: 500;
  color: #4a4a6a;
  margin-bottom: 4px;
}

.xly-chat-message__time {
  font-size: 12px;
  color: #c0c4cc;
  margin-bottom: 4px;
}

.xly-chat-message__text {
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  // Markdown 样式
  :deep(h1),
  :deep(h2),
  :deep(h3) {
    margin: 0.5em 0;
    font-weight: 600;
  }

  :deep(h1) {
    font-size: 1.5em;
  }

  :deep(h2) {
    font-size: 1.3em;
  }

  :deep(h3) {
    font-size: 1.1em;
  }

  :deep(p) {
    margin: 0.5em 0;
  }

  :deep(code) {
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    background: #1a1a2e;
    color: #f5f6fa;
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 8px 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: 0.85em;
      line-height: 1.6;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid #4f6ef7;
    padding-left: 12px;
    margin: 8px 0;
    color: #8e8ea0;
  }

  :deep(ul),
  :deep(ol) {
    margin: 8px 0;
    padding-left: 24px;
  }

  :deep(li) {
    margin: 4px 0;
  }

  :deep(a) {
    color: #4f6ef7;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;

    th,
    td {
      border: 1px solid #e2e4ed;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background: #f5f6fa;
      font-weight: 600;
    }
  }

  // 打字效果光标
  :deep(.typing-cursor) {
    display: inline;
    color: #4f6ef7;
    animation: blink 1s step-end infinite;
    margin-left: 2px;
    vertical-align: baseline;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.xly-chat-message__attachments {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.xly-chat-message__attachment {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e4ed;
  transition: all 0.2s;
  background: #fff;

  &:hover {
    border-color: #4f6ef7;
    box-shadow: 0 4px 12px rgba(79, 110, 247, 0.15);
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
}

.xly-chat-message__attachment-file {
  padding: 16px;
  background: linear-gradient(135deg, #fafbfd 0%, #f5f6fa 100%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: #4a4a6a;
  align-items: flex-start;
  min-height: 120px;
  border: 1px solid transparent;

  .xly-chat-message__attachment:hover & {
    border-color: #4f6ef7;
  }

  :first-child {
    font-size: 32px;
    color: #4f6ef7;
    margin-bottom: 4px;
  }

  .file-name {
    font-weight: 500;
    color: #1a1a2e;
    word-break: break-word;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .size {
    font-size: 12px;
    color: #8e8ea0;
    margin-top: auto;
    padding-top: 8px;
    border-top: 1px solid #e2e4ed;
  }
}

.xly-chat-message__actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.2s;

  .xly-chat-message:hover & {
    opacity: 1;
  }
}

.xly-chat-message__action-btn {
  background: #f5f6fa;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  color: #8e8ea0;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background: #e2e4ed;
    color: #4a4a6a;
  }
}
</style>
