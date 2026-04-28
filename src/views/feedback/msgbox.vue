<template>
  <div class="msgbox-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">MsgBox 消息弹出框</h1>
      <p class="doc-desc">
        模态弹出框组件，提供 Alert、Confirm、Prompt 三种调用模式，支持 Promise 链式调用，用法参照 Element Plus MessageBox。
      </p>
    </div>

    <!-- Alert 弹框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Alert 提示框</h2>
      <p class="doc-section__desc">
        仅包含确认按钮，用于向用户展示重要信息。通过 <code>type</code> 参数设置图标类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handleAlert('info')">信息提示</XlyButton>
          <XlyButton @click="handleAlert('success')">成功提示</XlyButton>
          <XlyButton @click="handleAlert('warning')">警告提示</XlyButton>
          <XlyButton @click="handleAlert('danger')">错误提示</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>import { xly } from '@/utils/xly'

// 基础用法
await xly.$msgbox.alert('您的账户已成功创建', '注册成功', { type: 'success' })

// 或者简写，title 可省略（默认"提示"）
await xly.$msgbox.alert('此操作不可撤销，请谨慎操作', '警告', { type: 'warning' })</code></pre>
        </div>
      </div>
    </section>

    <!-- Confirm 弹框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Confirm 确认框</h2>
      <p class="doc-section__desc">
        包含确认和取消按钮，用于需要用户二次确认的操作场景。返回 Promise，确认 resolve，取消 reject。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handleConfirm">删除确认</XlyButton>
          <XlyButton @click="handleConfirmDanger">危险操作</XlyButton>
          <XlyButton @click="handleConfirmCancelable">可关闭遮罩</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>// 基础 Confirm
xly.$msgbox.confirm('确定要删除该记录吗？此操作不可撤销。', '删除确认', {
  type: 'warning',
})
  .then(() => {
    xly.$msg.success('删除成功')
  })
  .catch(() => {
    // 用户取消
  })

// 危险操作：确认按钮变红
xly.$msgbox.confirm('即将清空所有数据，此操作不可恢复！', '危险操作', {
  type: 'danger',
  confirmButtonDanger: true,
  confirmButtonText: '确认清空',
})

// 点击遮罩可关闭
xly.$msgbox.confirm('是否保存当前修改？', '保存提示', {
  type: 'info',
  closeOnClickModal: true,
})</code></pre>
        </div>
      </div>
    </section>

    <!-- Prompt 输入框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Prompt 输入框</h2>
      <p class="doc-section__desc">
        包含输入框的弹框，用于需要用户输入内容的场景。支持输入校验，通过 <code>pattern</code> 正则校验输入内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handlePrompt">输入名称</XlyButton>
          <XlyButton @click="handlePromptValidate">带校验规则</XlyButton>
          <XlyButton @click="handlePromptPassword">密码输入</XlyButton>
          <XlyButton @click="handlePromptTextarea">文本域输入</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>// 基础 Prompt
xly.$msgbox.prompt('请输入项目名称', '新建项目', {
  input: { placeholder: '请输入 2-20 个字符' },
}).then(({ value }) => {
  xly.$msg.success(`创建成功：${value}`)
})

// 带正则校验
xly.$msgbox.prompt('请输入手机号', '绑定手机', {
  input: {
    placeholder: '请输入 11 位手机号',
    pattern: '^1[3-9]\\d{9}$',
    patternMessage: '手机号格式不正确',
  },
})

// 密码输入框
xly.$msgbox.prompt('请输入新密码', '修改密码', {
  input: { inputType: 'password', placeholder: '请输入至少 6 位密码' },
})

// 文本域
xly.$msgbox.prompt('请输入备注', '添加备注', {
  input: { inputType: 'textarea', placeholder: '请输入备注内容...' },
})</code></pre>
        </div>
      </div>
    </section>

    <!-- async/await 用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">async / await 用法</h2>
      <p class="doc-section__desc">
        所有方法均返回 Promise，可使用 <code>async/await</code> 语法简化代码，通过 try/catch 捕获取消动作。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handleAsyncAwait">async/await 示例</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>async function handleDelete() {
  try {
    await xly.$msgbox.confirm('确定删除该用户吗？', '删除用户', {
      type: 'warning',
      confirmButtonDanger: true,
    })
    // 用户点击"确定"
    await deleteUser(userId)
    xly.$msg.success('删除成功')
  } catch {
    // 用户点击"取消"或关闭
    xly.$msg.info('已取消操作')
  }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义按钮文字 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义按钮文字</h2>
      <p class="doc-section__desc">
        通过 <code>confirmButtonText</code> 和 <code>cancelButtonText</code> 自定义按钮的显示文字。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handleCustomText">自定义按钮文字</XlyButton>
          <XlyButton @click="handleNoClose">隐藏关闭图标</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>xly.$msgbox.confirm('检测到未保存的内容，是否离开当前页面？', '离开提示', {
  confirmButtonText: '离开',
  cancelButtonText: '留下',
  type: 'warning',
})

// 隐藏右上角关闭按钮
xly.$msgbox.confirm('请确认以下操作', '二次确认', {
  showClose: false,
  closeOnClickModal: false,
})</code></pre>
        </div>
      </div>
    </section>

    <!-- 通用 open 方法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">通用 open 方法</h2>
      <p class="doc-section__desc">
        使用 <code>xly.$msgbox.open()</code> 可完整控制所有配置项，适合复杂场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="handleOpen">通用弹框</XlyButton>
          <XlyButton @click="handleHtmlContent">HTML 内容</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>// 通用调用
xly.$msgbox.open({
  title: '自定义弹框',
  message: '这是一条自定义内容',
  type: 'success',
  showCancelButton: true,
  confirmButtonText: '我知道了',
  cancelButtonText: '稍后再说',
})

// HTML 内容（确保内容安全可信）
xly.$msgbox.open({
  title: '公告',
  message: '&lt;strong&gt;重要通知：&lt;/strong&gt;系统将于今晚 &lt;span style="color:#cf222e"&gt;22:00&lt;/span&gt; 进行维护。',
  dangerouslyUseHTMLString: true,
  type: 'warning',
})</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">消息弹出框在实际业务中的典型使用场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton type="danger" @click="handleBizDelete">删除记录</XlyButton>
          <XlyButton type="primary" @click="handleBizRename">重命名</XlyButton>
          <XlyButton @click="handleBizLeave">离开页面</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>// 删除记录
async function handleDelete(id: number) {
  await xly.$msgbox.confirm('确定删除该记录？删除后不可恢复。', '删除确认', {
    type: 'danger',
    confirmButtonDanger: true,
    confirmButtonText: '删除',
  })
  await api.delete(id)
  xly.$msg.success('删除成功')
}

// 重命名
xly.$msgbox.prompt('请输入新名称', '重命名', {
  input: { value: currentName, placeholder: '请输入名称' },
}).then(({ value }) => rename(value))

// 离开页面前确认
router.beforeEach(async (to, from, next) => {
  if (hasUnsavedChanges.value) {
    await xly.$msgbox.confirm('有未保存的修改，确定离开吗？', '提示', {
      confirmButtonText: '离开',
      cancelButtonText: '留下',
    })
  }
  next()
})</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">xly.$msgbox 方法</h3>
      <p class="doc-section__desc" style="margin-bottom: 12px">
        通过 <code>import { xly } from '@/utils/xly'</code> 调用 <code>xly.$msgbox</code>。
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
              <th>返回值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alert</code></td>
              <td>提示框（仅确认按钮）</td>
              <td><code>(message, title?, options?)</code></td>
              <td><code>Promise</code></td>
            </tr>
            <tr>
              <td><code>confirm</code></td>
              <td>确认框（确认 + 取消）</td>
              <td><code>(message, title?, options?)</code></td>
              <td><code>Promise</code></td>
            </tr>
            <tr>
              <td><code>prompt</code></td>
              <td>输入框弹框</td>
              <td><code>(message, title?, options?)</code></td>
              <td><code>Promise&lt;{action, value}&gt;</code></td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td>通用弹框（完整配置）</td>
              <td><code>(options: MsgBoxOptions)</code></td>
              <td><code>Promise</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">MsgBoxOptions</h3>
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
              <td>弹框内容</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>弹框标题</td>
              <td><code>string</code></td>
              <td><code>'提示'</code></td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>图标类型（影响头部图标颜色）</td>
              <td><code>'info' | 'success' | 'warning' | 'danger'</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>confirmButtonText</code></td>
              <td>确认按钮文字</td>
              <td><code>string</code></td>
              <td><code>'确定'</code></td>
            </tr>
            <tr>
              <td><code>cancelButtonText</code></td>
              <td>取消按钮文字</td>
              <td><code>string</code></td>
              <td><code>'取消'</code></td>
            </tr>
            <tr>
              <td><code>showCancelButton</code></td>
              <td>是否显示取消按钮</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>showConfirmButton</code></td>
              <td>是否显示确认按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showClose</code></td>
              <td>是否显示右上角关闭图标</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>confirmButtonDanger</code></td>
              <td>确认按钮是否使用危险色（红色）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>closeOnClickModal</code></td>
              <td>是否可点击遮罩关闭</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>closeOnPressEscape</code></td>
              <td>是否可按 Esc 关闭</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showInput</code></td>
              <td>是否显示输入框（prompt 模式）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>input</code></td>
              <td>输入框配置</td>
              <td><code>MsgBoxInputConfig</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>dangerouslyUseHTMLString</code></td>
              <td>是否将 message 作为 HTML 渲染</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>customClass</code></td>
              <td>自定义弹框类名</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>onConfirm</code></td>
              <td>确认回调</td>
              <td><code>(value?: string) =&gt; void</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>onCancel</code></td>
              <td>取消/关闭回调</td>
              <td><code>() =&gt; void</code></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">MsgBoxInputConfig</h3>
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
              <td><code>placeholder</code></td>
              <td>输入框占位文字</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>输入框初始值</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>inputType</code></td>
              <td>输入框类型</td>
              <td><code>'text' | 'password' | 'number' | 'textarea'</code></td>
              <td><code>'text'</code></td>
            </tr>
            <tr>
              <td><code>pattern</code></td>
              <td>校验正则（字符串形式）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>patternMessage</code></td>
              <td>校验失败时的提示文字</td>
              <td><code>string</code></td>
              <td><code>'输入内容不符合要求'</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Promise 返回值</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>字段</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>action</code></td>
              <td>用户操作：确认为 <code>'confirm'</code>，取消为 <code>'cancel'</code>，关闭为 <code>'close'</code></td>
              <td><code>'confirm' | 'cancel' | 'close'</code></td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>输入框的值（仅 prompt 模式有效）</td>
              <td><code>string | undefined</code></td>
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

// Alert 示例
function handleAlert(type: 'info' | 'success' | 'warning' | 'danger') {
  const messages = {
    info: { msg: '您有 3 条未读消息，请及时查阅。', title: '消息通知' },
    success: { msg: '账户已注册成功，欢迎使用！', title: '注册成功' },
    warning: { msg: '此操作不可撤销，请谨慎操作。', title: '操作警告' },
    danger: { msg: '请求失败，服务器返回错误 500。', title: '系统错误' },
  }
  const { msg, title } = messages[type]
  xly.$msgbox.alert(msg, title, { type })
}

// Confirm 示例
function handleConfirm() {
  xly.$msgbox
    .confirm('确定要删除该记录吗？此操作不可撤销。', '删除确认', { type: 'warning' })
    .then(() => xly.$msg.success('记录已删除'))
    .catch(() => xly.$msg.info('已取消'))
}

function handleConfirmDanger() {
  xly.$msgbox
    .confirm('即将清空所有数据，此操作不可恢复！', '危险操作', {
      type: 'danger',
      confirmButtonDanger: true,
      confirmButtonText: '确认清空',
    })
    .then(() => xly.$msg.success('已执行清空操作'))
    .catch(() => {})
}

function handleConfirmCancelable() {
  xly.$msgbox
    .confirm('是否保存当前修改内容？', '保存提示', {
      type: 'info',
      closeOnClickModal: true,
    })
    .then(() => xly.$msg.success('内容已保存'))
    .catch(() => xly.$msg.info('放弃保存'))
}

// Prompt 示例
function handlePrompt() {
  xly.$msgbox
    .prompt('请输入项目名称', '新建项目', {
      input: { placeholder: '请输入 2-20 个字符' },
    })
    .then(({ value }) => xly.$msg.success(`已创建项目：${value}`))
    .catch(() => {})
}

function handlePromptValidate() {
  xly.$msgbox
    .prompt('请输入手机号', '绑定手机', {
      input: {
        placeholder: '请输入 11 位手机号',
        pattern: '^1[3-9]\\d{9}$',
        patternMessage: '手机号格式不正确',
      },
    })
    .then(({ value }) => xly.$msg.success(`手机号 ${value} 绑定成功`))
    .catch(() => {})
}

function handlePromptPassword() {
  xly.$msgbox
    .prompt('请输入新密码', '修改密码', {
      input: { inputType: 'password', placeholder: '请输入至少 6 位密码' },
    })
    .then(() => xly.$msg.success('密码修改成功'))
    .catch(() => {})
}

function handlePromptTextarea() {
  xly.$msgbox
    .prompt('请输入备注内容', '添加备注', {
      input: { inputType: 'textarea', placeholder: '请输入备注...' },
    })
    .then(({ value }) => xly.$msg.success(`备注已保存：${value}`))
    .catch(() => {})
}

// async/await 示例
async function handleAsyncAwait() {
  try {
    await xly.$msgbox.confirm('确定要提交审核吗？提交后将无法修改。', '提交确认', {
      type: 'warning',
      confirmButtonText: '提交',
    })
    xly.$msg.success('已提交审核，请等待处理')
  } catch {
    xly.$msg.info('已取消提交')
  }
}

// 自定义按钮
function handleCustomText() {
  xly.$msgbox
    .confirm('检测到未保存的内容，是否离开当前页面？', '离开提示', {
      confirmButtonText: '离开',
      cancelButtonText: '留下',
      type: 'warning',
    })
    .then(() => xly.$msg.info('已离开页面'))
    .catch(() => xly.$msg.success('继续编辑'))
}

function handleNoClose() {
  xly.$msgbox.confirm('请仔细阅读并确认以下操作内容。', '二次确认', {
    showClose: false,
    closeOnClickModal: false,
    type: 'warning',
  })
}

// 通用 open
function handleOpen() {
  xly.$msgbox.open({
    title: '自定义弹框',
    message: '这是一条通过 open() 方法创建的弹框，可完整控制所有配置项。',
    type: 'success',
    showCancelButton: true,
    confirmButtonText: '我知道了',
    cancelButtonText: '稍后再说',
  })
}

function handleHtmlContent() {
  xly.$msgbox.open({
    title: '系统公告',
    message:
      '<strong>重要通知：</strong>系统将于今晚 <span style="color:#cf222e;font-weight:600">22:00 - 23:00</span> 进行例行维护，期间服务将暂时不可用，请提前做好准备。',
    dangerouslyUseHTMLString: true,
    type: 'warning',
  })
}

// 业务场景
function handleBizDelete() {
  xly.$msgbox
    .confirm('确定删除该用户吗？删除后数据将无法恢复。', '删除用户', {
      type: 'danger',
      confirmButtonDanger: true,
      confirmButtonText: '删除',
    })
    .then(() => xly.$msg.success('用户已删除'))
    .catch(() => {})
}

function handleBizRename() {
  xly.$msgbox
    .prompt('请输入新名称', '重命名', {
      input: { value: '旧项目名称', placeholder: '请输入名称' },
    })
    .then(({ value }) => xly.$msg.success(`已重命名为：${value}`))
    .catch(() => {})
}

function handleBizLeave() {
  xly.$msgbox
    .confirm('您有未保存的修改，确定要离开当前页面吗？', '离开提示', {
      type: 'warning',
      confirmButtonText: '离开',
      cancelButtonText: '留下',
    })
    .then(() => xly.$msg.info('已离开页面'))
    .catch(() => xly.$msg.success('继续编辑'))
}
</script>

<style scoped lang="scss">
.msgbox-doc {
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
