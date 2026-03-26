<template>
  <div class="chat-demo">
    <header class="demo-header">
      <h1 class="demo-title">聊天组件 Chat</h1>
      <p class="demo-desc">
        功能完整的聊天对话组件，支持 Markdown 渲染、打字效果、附件上传、流式输出等功能。
      </p>
    </header>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2 class="demo-section__title">基础用法</h2>
      <p class="demo-section__desc">
        通过 <code>messages</code> 传入消息列表，组件会自动渲染用户消息和助手消息。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 500px">
          <XlyChat
            ref="chatRef1"
            v-model:messages="messages1"
            placeholder="输入消息..."
            @send="handleSend1"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;XlyChat
  v-model:messages="messages"
  placeholder="输入消息..."
  @send="handleSend"
/&gt;

const messages = ref&lt;ChatMessage[]&gt;([
  {
    id: 1,
    role: 'user',
    content: '你好！',
    time: new Date(),
  },
  {
    id: 2,
    role: 'assistant',
    content: '你好！有什么我可以帮助你的吗？',
    time: new Date(),
  },
])

function handleSend(content: string, attachments: ChatAttachment[]) {
  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })

  // 模拟 AI 回复
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: '这是我的回复',
      time: new Date(),
    })
  }, 1000)
}</code></pre>
      </div>
    </section>

    <!-- 打字效果 -->
    <section class="demo-section">
      <h2 class="demo-section__title">打字效果</h2>
      <p class="demo-section__desc">
        开启 <code>enable-typing</code> 属性，助手消息会以打字机效果逐字显示。通过 <code>typing-speed</code> 可以调整打字速度。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 500px">
          <XlyChat
            ref="chatRef2"
            v-model:messages="messages2"
            enable-typing
            :typing-speed="50"
            placeholder="输入消息..."
            @send="handleSend2"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;XlyChat
  v-model:messages="messages"
  enable-typing
  :typing-speed="50"
  placeholder="输入消息..."
  @send="handleSend"
/&gt;

// 流式输出场景：逐字追加内容
function handleSend(content: string) {
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content,
    time: new Date(),
  })

  // 创建 AI 回复消息（初始为空，typing: true）
  const newMessage = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    typing: true,
    time: new Date(),
  }
  messages.value.push(newMessage)

  // 模拟流式输出：逐字追加内容
  const response = '这是一条很长的回复...'
  let index = 0
  const typeNext = () => {
    if (index < response.length) {
      newMessage.content += response[index]
      index++
      setTimeout(typeNext, 30)
    } else {
      // 输出完成，关闭打字状态
      newMessage.typing = false
    }
  }
  typeNext()
}</code></pre>
      </div>
    </section>

    <!-- Markdown 渲染 -->
    <section class="demo-section">
      <h2 class="demo-section__title">Markdown 渲染</h2>
      <p class="demo-section__desc">
        助手消息支持 Markdown 格式渲染，包括标题、列表、代码块、表格等。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 500px">
          <XlyChat
            ref="chatRef3"
            v-model:messages="messages3"
            placeholder="输入消息..."
            @send="handleSend3"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>const markdownContent = `
# 标题
这是一段 **加粗** 的文字，还有 *斜体* 文字。

## 列表
- 项目 1
- 项目 2
- 项目 3

## 代码块
\`\`\`javascript
console.log('Hello, World!')
\`\`\`

## 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
\`

messages.value.push({
  id: 1,
  role: 'assistant',
  content: markdownContent,
  time: new Date(),
})</code></pre>
      </div>
    </section>

    <!-- 附件上传 -->
    <section class="demo-section">
      <h2 class="demo-section__title">附件上传</h2>
      <p class="demo-section__desc">
        支持 <code>allow-upload</code> 属性，用户可以上传附件。图片附件会直接展示，其他附件会显示文件名和大小。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 500px">
          <XlyChat
            ref="chatRef4"
            v-model:messages="messages4"
            allow-upload
            :max-attachments="3"
            placeholder="输入消息或上传附件..."
            @send="handleSend4"
            @upload="handleUpload4"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;XlyChat
  v-model:messages="messages"
  allow-upload
  :max-attachments="3"
  placeholder="输入消息或上传附件..."
  @send="handleSend"
  @upload="handleUpload"
/&gt;

function handleSend(content: string, attachments: ChatAttachment[]) {
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments, // 包含附件
    time: new Date(),
  })
}

function handleUpload(files: File[]) {
  console.log('上传的文件:', files)
}</code></pre>
      </div>
    </section>

    <!-- 滚动到顶部加载 -->
    <section class="demo-section">
      <h2 class="demo-section__title">滚动到顶部加载</h2>
      <p class="demo-section__desc">
        通过 <code>scroll-to-top</code> 事件，可以在消息列表滚动到顶部时触发加载历史消息。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 500px">
          <XlyChat
            ref="chatRef5"
            v-model:messages="messages5"
            :loading="loading5"
            placeholder="输入消息..."
            @send="handleSend5"
            @scroll-to-top="handleScrollToTop5"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;XlyChat
  v-model:messages="messages"
  :loading="loading"
  placeholder="输入消息..."
  @send="handleSend"
  @scroll-to-top="handleScrollToTop"
/&gt;

const loading = ref(false)

async function handleScrollToTop() {
  loading.value = true
  // 加载历史消息
  const historyMessages = await loadHistory()
  // 将历史消息添加到列表开头
  messages.value = [...historyMessages, ...messages.value]
  loading.value = false
}</code></pre>
      </div>
    </section>

    <!-- 输入框组件 -->
    <section class="demo-section">
      <h2 class="demo-section__title">输入框组件</h2>
      <p class="demo-section__desc">
        独立的聊天输入框组件，支持附件上传、自动高度调整等功能。
      </p>
      <div class="demo-preview">
        <div class="chat-container" style="height: 200px">
          <XlyChatInput
            v-model="inputValue"
            placeholder="请输入消息..."
            :allow-upload="true"
            :max-attachments="3"
            :maxlength="500"
            show-char-count
            @send="handleSendInput"
            @upload="handleUploadInput"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;XlyChatInput
  v-model="inputValue"
  placeholder="请输入消息..."
  :allow-upload="true"
  :max-attachments="3"
  :maxlength="500"
  show-char-count
  @send="handleSendInput"
  @upload="handleUploadInput"
/&gt;

const inputValue = ref('')

function handleSendInput(content: string, attachments: ChatAttachment[]) {
  console.log('发送内容:', content)
  console.log('附件:', attachments)
}

function handleUploadInput(files: File[]) {
  console.log('上传文件:', files)
}</code></pre>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="demo-section">
      <h3 class="demo-subtitle">API</h3>

      <h4 class="demo-subheading">Chat Props</h4>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>messages</code></td>
              <td>消息列表</td>
              <td><code>ChatMessage[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>输入框占位文本</td>
              <td><code>string</code></td>
              <td><code>'请输入消息...'</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>是否加载中</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>show-avatar</code></td>
              <td>是否显示头像</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-name</code></td>
              <td>是否显示用户名</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>show-time</code></td>
              <td>是否显示时间</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>enable-typing</code></td>
              <td>是否开启打字效果</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>typing-speed</code></td>
              <td>打字速度（毫秒/字）</td>
              <td><code>number</code></td>
              <td><code>50</code></td>
            </tr>
            <tr>
              <td><code>allow-upload</code></td>
              <td>是否允许上传附件</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>max-attachments</code></td>
              <td>最大附件数量</td>
              <td><code>number</code></td>
              <td><code>5</code></td>
            </tr>
            <tr>
              <td><code>rows</code></td>
              <td>输入框初始行数</td>
              <td><code>number</code></td>
              <td><code>3</code></td>
            </tr>
            <tr>
              <td><code>min-rows</code></td>
              <td>输入框最小行数</td>
              <td><code>number</code></td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><code>max-rows</code></td>
              <td>输入框最大行数</td>
              <td><code>number</code></td>
              <td><code>8</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="demo-subheading">ChatMessage 接口</h4>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td>消息唯一标识</td>
              <td><code>string | number</code></td>
            </tr>
            <tr>
              <td><code>role</code></td>
              <td>消息角色：'user' | 'assistant' | 'system'</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>消息内容（支持 Markdown）</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>用户名</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>avatar</code></td>
              <td>头像 URL</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>time</code></td>
              <td>发送时间</td>
              <td><code>string | Date</code></td>
            </tr>
            <tr>
              <td><code>attachments</code></td>
              <td>附件列表</td>
              <td><code>ChatAttachment[]</code></td>
            </tr>
            <tr>
              <td><code>typing</code></td>
              <td>是否正在流式输出（为 true 时显示光标闪烁效果）</td>
              <td><code>boolean</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="demo-subheading">Chat Events</h4>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>send</code></td>
              <td>发送消息时触发</td>
              <td><code>(content: string, attachments: ChatAttachment[])</code></td>
            </tr>
            <tr>
              <td><code>upload</code></td>
              <td>上传附件时触发</td>
              <td><code>(files: File[])</code></td>
            </tr>
            <tr>
              <td><code>scroll-to-top</code></td>
              <td>滚动到顶部时触发</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td><code>scroll-to-bottom</code></td>
              <td>滚动到底部时触发</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td><code>copy</code></td>
              <td>复制消息时触发</td>
              <td><code>(content: string)</code></td>
            </tr>
            <tr>
              <td><code>regenerate</code></td>
              <td>重新生成时触发</td>
              <td><code>(message: ChatMessage)</code></td>
            </tr>
            <tr>
              <td><code>delete</code></td>
              <td>删除消息时触发</td>
              <td><code>(message: ChatMessage)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="demo-subheading">Slots</h4>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>avatar</code></td>
              <td>自定义头像，参数：{ message }</td>
            </tr>
            <tr>
              <td><code>message-content</code></td>
              <td>自定义消息内容，参数：{ message }</td>
            </tr>
            <tr>
              <td><code>actions</code></td>
              <td>自定义操作按钮，参数：{ message }</td>
            </tr>
            <tr>
              <td><code>input-toolbar</code></td>
              <td>输入框工具栏插槽</td>
            </tr>
            <tr>
              <td><code>empty</code></td>
              <td>空状态插槽</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyChat, { type ChatMessage, type ChatAttachment } from '@/components/xly-chat/index.vue'
import XlyChatInput from '@/components/xly-chat/xly-chat-input.vue'

// 输入框组件
const inputValue = ref('')

function handleSendInput(content: string, attachments: ChatAttachment[]) {
  console.log('发送内容:', content)
  console.log('附件:', attachments)
}

function handleUploadInput(files: File[]) {
  console.log('上传文件:', files)
}

// 基础用法
const chatRef1 = ref<InstanceType<typeof XlyChat> | null>(null)
const messages1 = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'user',
    content: '你好！',
    time: new Date(),
  },
  {
    id: 2,
    role: 'assistant',
    content: '你好！有什么我可以帮助你的吗？',
    time: new Date(),
  },
])

function handleSend1(content: string, attachments: ChatAttachment[]) {
  messages1.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })

  setTimeout(() => {
    messages1.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: `我收到了你的消息：${content || '(空)'}`,
      time: new Date(),
    })
  }, 1000)
}

// 打字效果
const chatRef2 = ref<InstanceType<typeof XlyChat> | null>(null)
const messages2 = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好！试试发送一条消息，你会看到打字效果。',
    time: new Date(),
  },
])

function handleSend2(content: string, attachments: ChatAttachment[]) {
  messages2.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })

  // 模拟 AI 流式回复（带打字效果）
  const longResponse = `这是一条很长的回复，会以打字机效果逐字显示。

## 功能特点
- 支持 Markdown 渲染
- 打字机效果
- 附件上传
- 滚动加载

## 代码示例
\`\`\`javascript
const message = 'Hello, World!'
console.log(message)
\`\`\`

希望你喜欢这个效果！`

  // 创建消息对象（初始内容为空，typing 为 true）
  const newMessage: ChatMessage = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    typing: true,
    time: new Date(),
  }
  messages2.value.push(newMessage)

  // 模拟流式输出：逐字追加内容
  let index = 0
  const chars = longResponse.split('')
  const typeNext = () => {
    if (index < chars.length) {
      // 通过索引更新消息对象，确保触发响应式更新
      const msgIndex = messages2.value.findIndex(m => m.id === newMessage.id)
      if (msgIndex !== -1) {
        messages2.value[msgIndex].content += chars[index]
      }
      index++
      setTimeout(typeNext, 30) // 每 30ms 输出一个字
    } else {
      // 输出完成，关闭打字状态
      const msgIndex = messages2.value.findIndex(m => m.id === newMessage.id)
      if (msgIndex !== -1) {
        messages2.value[msgIndex].typing = false
      }
    }
  }
  typeNext()
}

// Markdown 渲染
const chatRef3 = ref<InstanceType<typeof XlyChat> | null>(null)
const markdownContent = `
# Markdown 渲染示例

## 文本格式
这是 **加粗** 的文字，这是 *斜体* 文字，这是 ~~删除线~~ 文字。

## 列表
- 无序列表项 1
- 无序列表项 2
- 无序列表项 3

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

## 代码块
\`\`\`javascript
function sayHello(name) {
  console.log(\`Hello, \${name}!\`)
}

sayHello('World')
\`\`\`

## 表格
| 姓名 | 年龄 | 职业 |
|-----|------|------|
| 张三 | 25  | 工程师 |
| 李四 | 30  | 设计师 |
| 王五 | 28  | 产品经理 |

## 引用
> 这是一段引用文本
> 可以有多行

## 链接
[访问 GitHub](https://github.com)
`

const messages3 = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: markdownContent,
    time: new Date(),
  },
])

function handleSend3(content: string, attachments: ChatAttachment[]) {
  messages3.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })
}

// 附件上传
const chatRef4 = ref<InstanceType<typeof XlyChat> | null>(null)
const messages4 = ref<ChatMessage[]>([])

function handleSend4(content: string, attachments: ChatAttachment[]) {
  messages4.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })

  setTimeout(() => {
    messages4.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: attachments.length > 0
        ? `我收到了你的 ${attachments.length} 个附件${content ? '和消息：' + content : ''}`
        : `我收到了你的消息：${content}`,
      time: new Date(),
    })
  }, 1000)
}

function handleUpload4(files: File[]) {
  console.log('上传的文件:', files)
}

// 滚动到顶部加载
const chatRef5 = ref<InstanceType<typeof XlyChat> | null>(null)
const loading5 = ref(false)
const messages5 = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'user',
    content: '你好！',
    time: new Date(Date.now() - 60000),
  },
  {
    id: 2,
    role: 'assistant',
    content: '你好！有什么我可以帮助你的吗？',
    time: new Date(Date.now() - 50000),
  },
  {
    id: 3,
    role: 'user',
    content: '查看更多历史消息？向上滚动试试！',
    time: new Date(Date.now() - 40000),
  },
])

function handleSend5(content: string, attachments: ChatAttachment[]) {
  messages5.value.push({
    id: Date.now(),
    role: 'user',
    content,
    attachments,
    time: new Date(),
  })
}

function handleScrollToTop5() {
  if (loading5.value) return

  loading5.value = true

  // 模拟加载历史消息
  setTimeout(() => {
    const historyMessages = [
      {
        id: Date.now() - 1,
        role: 'user',
        content: '这是一条历史消息',
        time: new Date(Date.now() - 120000),
      },
      {
        id: Date.now() - 2,
        role: 'assistant',
        content: '这是历史回复',
        time: new Date(Date.now() - 110000),
      },
      {
        id: Date.now() - 3,
        role: 'user',
        content: '更早的消息',
        time: new Date(Date.now() - 180000),
      },
    ]

    messages5.value = [...historyMessages, ...messages5.value]
    loading5.value = false
  }, 1000)
}
</script>

<style scoped lang="scss">
.chat-demo {
  padding: 8px 0 40px;
}

.demo-header {
  margin-bottom: 36px;
}

.demo-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.demo-desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0;
  line-height: 1.6;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f7;
}

.demo-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 16px;
  line-height: 1.6;
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.demo-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 16px;
}

.chat-container {
  padding: 16px;
  border-radius: 12px;
  background: #fafbfd;
}

.demo-code {
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;
  pre {
    margin: 0;
    padding: 0;
  }
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #4a4a6a;
    white-space: pre;
  }
}

.demo-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}

.demo-subheading {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 16px 0 8px;
}

.demo-table {
  overflow-x: auto;
  margin-bottom: 16px;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
    white-space: nowrap;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
  }
  td {
    color: #4a4a6a;
  }
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}
</style>
