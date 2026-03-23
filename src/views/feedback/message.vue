<template>
  <div class="message-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Message 消息提示</h1>
      <p class="doc-desc">
        全局消息提示组件，支持多种类型、弹出位置、自定义标题、进度条、鼠标悬停暂停自动关闭等功能。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过统一入口 <code>xly.$msg</code> 调用消息提示。默认 3 秒后自动关闭。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="xly.$msg.success('保存成功')">成功消息</XlyButton>
          <XlyButton @click="xly.$msg.warning('请注意，余额即将不足')">警告消息</XlyButton>
          <XlyButton @click="xly.$msg.danger('操作失败，请重试')">错误消息</XlyButton>
          <XlyButton @click="xly.$msg.info('您有一条新消息')">信息消息</XlyButton>
          <XlyButton @click="xly.$msg.text('这是一条纯文本提示')">纯文本</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>import { xly } from '@/utils/xly'

xly.$msg.success('保存成功')
xly.$msg.warning('请注意')
xly.$msg.danger('操作失败')
xly.$msg.info('新消息')
xly.$msg.text('纯文本')</code></pre>
        </div>
      </div>
    </section>

    <!-- 带标题 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带标题的消息</h2>
      <p class="doc-section__desc">
        通过 <code>title</code> 参数为消息添加标题，让信息层次更清晰。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="xly.$msg.success('数据已成功保存到数据库', { title: '操作成功' })"
            >带标题成功</XlyButton
          >
          <XlyButton @click="xly.$msg.danger('网络连接已断开，请检查网络设置', { title: '连接错误' })"
            >带标题错误</XlyButton
          >
        </div>
        <div class="doc-code">
          <pre><code>xly.$msg.success('数据已保存到数据库', { title: '操作成功' })
xly.$msg.danger('网络连接已断开', { title: '连接错误' })</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义弹出位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义弹出位置</h2>
      <p class="doc-section__desc">
        通过 <code>position</code> 参数设置消息弹出位置，支持 6 个方向。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="xly.$msg.info('顶部居中', { position: 'top' })">顶部居中</XlyButton>
          <XlyButton @click="xly.$msg.info('左上角', { position: 'top-left' })">左上角</XlyButton>
          <XlyButton @click="xly.$msg.info('右上角', { position: 'top-right' })">右上角</XlyButton>
          <XlyButton @click="xly.$msg.info('底部居中', { position: 'bottom' })">底部居中</XlyButton>
          <XlyButton @click="xly.$msg.info('左下角', { position: 'bottom-left' })">左下角</XlyButton>
          <XlyButton @click="xly.$msg.info('右下角', { position: 'bottom-right' })">右下角</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>xly.$msg.info('右上角提示', { position: 'top-right' })
xly.$msg.success('左下角提示', { position: 'bottom-left' })</code></pre>
        </div>
      </div>
    </section>

    <!-- 进度条 -->
    <section class="doc-section">
      <h2 class="doc-section__title">进度条</h2>
      <p class="doc-section__desc">
        通过 <code>showProgress: true</code> 显示倒计时进度条，直观展示消息剩余显示时间。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton
            @click="
              xly.$msg.success('保存成功，即将自动关闭', { showProgress: true, duration: 5000 })
            "
            >成功 + 进度条</XlyButton
          >
          <XlyButton
            @click="xly.$msg.danger('错误信息，5秒后关闭', { showProgress: true, duration: 5000 })"
            >错误 + 进度条</XlyButton
          >
          <XlyButton @click="xly.$msg.info('提示信息', { showProgress: true, duration: 5000 })"
            >信息 + 进度条</XlyButton
          >
        </div>
        <div class="doc-code">
          <pre><code>xly.$msg.success('保存成功', { showProgress: true, duration: 5000 })
xly.$msg.danger('操作失败', { showProgress: true, duration: 5000 })</code></pre>
        </div>
      </div>
    </section>

    <!-- 悬停暂停 -->
    <section class="doc-section">
      <h2 class="doc-section__title">悬停暂停</h2>
      <p class="doc-section__desc">
        鼠标悬停在消息上时自动暂停倒计时，移开后继续倒计时，方便用户阅读较长的消息内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton
            @click="
              xly.$msg.info(
                '这是一条较长的消息提示，鼠标悬停在此处会暂停关闭倒计时，移开后继续倒计时。适用于需要用户仔细阅读的场景。',
                { duration: 5000, showProgress: true, title: '悬停暂停提示' },
              )
            "
            >长消息 + 进度条</XlyButton
          >
        </div>
        <div class="doc-code">
          <pre><code>// 鼠标悬停自动暂停，移开继续
xly.$msg.info('这是一条较长的消息...', {
  duration: 5000,
  showProgress: true,
  title: '悬停暂停提示'
})</code></pre>
        </div>
      </div>
    </section>

    <!-- 持久消息 -->
    <section class="doc-section">
      <h2 class="doc-section__title">持久消息</h2>
      <p class="doc-section__desc">
        设置 <code>duration: 0</code> 使消息不会自动关闭，需要用户手动点击关闭按钮。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton
            @click="
              xly.$msg.warning('系统正在升级中，请稍后操作', { duration: 0, title: '系统通知' })
            "
            >持久消息</XlyButton
          >
          <XlyButton @click="xly.$msg.closeAll()">清除所有</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>// duration 设为 0 不自动关闭
xly.$msg.warning('系统正在升级中', { duration: 0, title: '系统通知' })

// 手动清除所有
xly.$msg.closeAll()</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">消息提示在实际业务中的常见用法。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton type="primary" @click="handleSave">保存数据</XlyButton>
          <XlyButton type="danger" @click="handleDelete">删除记录</XlyButton>
          <XlyButton @click="handleCopy">复制内容</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>function handleSave() {
  setTimeout(() => {
    xly.$msg.success('保存成功', { title: '操作成功' })
  }, 500)
}

function handleDelete() {
  xly.$msg.danger('删除失败，权限不足', { title: '操作失败' })
}

function handleCopy() {
  xly.$msg.text('内容已复制到剪贴板')
}</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">xly.$msg</h3>
      <p class="doc-section__desc" style="margin-bottom: 12px">
        通过统一入口 <code>import { xly } from '@/utils/xly'</code>，
        在任意位置调用 <code>xly.$msg</code> 消息方法。
      </p>

      <h3 class="doc-subtitle">方法</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>success</code></td>
              <td>成功消息</td>
              <td><code>(message: string, opts?: Options)</code></td>
            </tr>
            <tr>
              <td><code>warning</code></td>
              <td>警告消息</td>
              <td><code>(message: string, opts?: Options)</code></td>
            </tr>
            <tr>
              <td><code>danger</code></td>
              <td>错误消息</td>
              <td><code>(message: string, opts?: Options)</code></td>
            </tr>
            <tr>
              <td><code>info</code></td>
              <td>信息消息</td>
              <td><code>(message: string, opts?: Options)</code></td>
            </tr>
            <tr>
              <td><code>text</code></td>
              <td>纯文本消息（无图标）</td>
              <td><code>(message: string, opts?: Options)</code></td>
            </tr>
            <tr>
              <td><code>closeAll</code></td>
              <td>关闭所有消息</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Options</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>message</code></td>
              <td>消息内容</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>消息类型（方法调用时自动设置）</td>
              <td><code>'success' | 'warning' | 'danger' | 'info' | 'text'</code></td>
              <td><code>'info'</code></td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>标题</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>duration</code></td>
              <td>显示时长（ms），0 表示不自动关闭</td>
              <td><code>number</code></td>
              <td><code>3000</code></td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td>是否可手动关闭</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>弹出位置</td>
              <td>
                <code
                  >'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' |
                  'bottom-right'</code
                >
              </td>
              <td><code>'top'</code></td>
            </tr>
            <tr>
              <td><code>showProgress</code></td>
              <td>是否显示倒计时进度条</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>customClass</code></td>
              <td>自定义类名</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>customStyle</code></td>
              <td>自定义样式</td>
              <td><code>Record&lt;string, string&gt;</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td>关闭时的回调函数</td>
              <td><code>() =&gt; void</code></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyButton from '@/components/xly-button/index.vue'
import { xly } from '@/utils/xly'

function handleSave() {
  setTimeout(() => {
    xly.$msg.success('数据已成功保存', { title: '操作成功' })
  }, 500)
}

function handleDelete() {
  xly.$msg.danger('删除失败，您没有操作权限', { title: '操作失败' })
}

function handleCopy() {
  xly.$msg.text('内容已复制到剪贴板')
}
</script>

<style scoped lang="scss">
.message-doc {
  padding: 8px 0 40px;
}
.doc-header {
  margin-bottom: 36px;
}
.doc-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0;
  line-height: 1.6;
}
.doc-section {
  margin-bottom: 32px;
}
.doc-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f7;
}
.doc-section__desc {
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
.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
}
.doc-code {
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
.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}
.doc-table {
  overflow-x: auto;
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
