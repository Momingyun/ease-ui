<template>
  <div class="upload-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">FileUpload 文件上传</h1>
      <p class="doc-desc">
        支持本地预览与网络上传的文件上传组件，提供 v-model
        双向绑定，支持上传数量限制、拖拽上传、进度展示和文件类型识别功能。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        默认使用本地模式，读取本地文件并以 <code>base64</code> 形式存储，无需后端接口即可看到完整效果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="value1" />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="fileList" />` }}</code></pre>
        </div>
      </div>
      <div class="demo-value-display">
        <span class="demo-value-label">当前值：</span>
        <span class="demo-value-content" v-if="value1 && value1.length">[{{ value1.length }} 个文件]</span>
        <span class="demo-value-content" v-else>（空）</span>
      </div>
    </section>

    <!-- v-model 绑定 -->
    <section class="doc-section">
      <h2 class="doc-section__title">v-model 双向绑定</h2>
      <p class="doc-section__desc">
        <code>modelValue</code> 支持 <strong>对象数组</strong> 和 <strong>JSON 字符串</strong> 两种格式传入，
        通过 <code>value-mode</code> 控制返回格式。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-vmodel">
          <div class="demo-vmodel-item">
            <div class="demo-vmodel-label">返回对象数组（默认）</div>
            <XlyUpload v-model="value2Array" :limit="3" />
            <div class="demo-value-display">
              <span class="demo-value-label">类型：</span>
              <span class="demo-value-content">UploadFileItem[]</span>
            </div>
          </div>
          <div class="demo-vmodel-item">
            <div class="demo-vmodel-label">返回 JSON 字符串（value-mode="string"）</div>
            <XlyUpload v-model="value2String" value-mode="string" :limit="3" />
            <div class="demo-value-display">
              <span class="demo-value-label">类型：</span>
              <span class="demo-value-content demo-value-str">JSON.stringify([...])</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 返回对象数组（默认） -->
<XlyUpload v-model="fileList" />

<!-- 返回 JSON 字符串 -->
<XlyUpload v-model="fileJson" value-mode="string" />

// 对象结构
interface UploadFileItem {
  id: string      // 文件唯一标识
  name: string    // 文件名称
  url: string     // 文件地址
  size?: number   // 文件大小（KB）
}` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 限制数量 -->
    <section class="doc-section">
      <h2 class="doc-section__title">限制上传数量</h2>
      <p class="doc-section__desc">
        通过 <code>limit</code> 属性设置最大上传数量，达到上限后上传按钮自动隐藏。
        超出时会触发 <code>@exceed</code> 事件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 40px; align-items: flex-start">
          <div>
            <div class="demo-label">limit=1</div>
            <XlyUpload v-model="value3Single" :limit="1" />
          </div>
          <div>
            <div class="demo-label">limit=3</div>
            <XlyUpload v-model="value3Multi" :limit="3" />
          </div>
          <div>
            <div class="demo-label">不限制数量</div>
            <XlyUpload v-model="value3Unlimited" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 限制 1 个文件 -->
<XlyUpload v-model="file" :limit="1" />

<!-- 限制 3 个 -->
<XlyUpload v-model="files" :limit="3" @exceed="handleExceed" />

function handleExceed(files, limit) {
  console.log(\`超出 \${files.length} 个\`)
}` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 拖拽上传 -->
    <section class="doc-section">
      <h2 class="doc-section__title">拖拽上传</h2>
      <p class="doc-section__desc">
        上传按钮区域支持直接将文件<strong>拖入</strong>，边框会高亮提示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="valueDrag" trigger-text="点击或拖拽上传" />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="files" trigger-text="点击或拖拽上传" />` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">
        设置 <code>disabled</code> 后，上传按钮隐藏，已有文件不可删除。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="valueDisabled" disabled />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="files" disabled />` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 上传前校验 -->
    <section class="doc-section">
      <h2 class="doc-section__title">上传前校验</h2>
      <p class="doc-section__desc">
        通过 <code>accept-types</code>、<code>max-size</code>、<code>min-size</code>
        属性配置校验规则，无需编写 JS 代码。校验失败时触发 <code>@validate-error</code> 事件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div>
            <div class="demo-label">accept-types="pdf,doc,docx" + max-size=2048（2MB）</div>
            <XlyUpload
              v-model="valueValidate"
              accept-types="pdf,doc,docx"
              :max-size="2048"
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 仅允许 PDF/Word，不超过 2MB -->
<XlyUpload
  v-model="files"
  accept-types="pdf,doc,docx"
  :max-size="2048"
  @validate-error="handleValidateError"
/>

// size 单位为 KB，2048 = 2MB
// 支持的格式（后缀或 MIME 类型均可）：
// accept-types="pdf,doc,docx"
// accept-types="application/pdf,application/msword"` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 网络上传 -->
    <section class="doc-section">
      <h2 class="doc-section__title">切换上传模式</h2>
      <p class="doc-section__desc">
        组件顶部有一个 <code>UPLOAD_MODE</code> 配置项，修改它即可切换本地上传/网络上传。
      </p>

      <div class="doc-alert">
        <div class="doc-alert__icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div class="doc-alert__body">
          <div class="doc-alert__title">如何切换？</div>
          <p>打开 <code>src/components/xly-upload/index.vue</code>，找到顶部的配置区：</p>
          <div class="doc-code doc-code--standalone">
            <pre><code>{{ `// 切换上传模式：'local' | 'network'
const UPLOAD_MODE: 'local' | 'network' = 'local'

// mode = 'network' 时，修改这里的配置
const NETWORK_CONFIG = {
  url: '/api/upload/file',   // ← 修改你的接口地址
  method: 'POST',
  fieldName: 'file',
  headers: { /* ... */ },
  data: { /* ... */ },
  responseUrlPath: 'data',   // ← 如何从响应中取 URL
}` }}</code></pre>
          </div>
          <p><strong>local</strong>：纯前端 base64 预览，无需后端接口，适合开发调试</p>
          <p><strong>network</strong>：上传到真实接口，返回服务器文件地址</p>
        </div>
      </div>

      <!-- 接口返回格式 -->
      <div class="doc-upload-options">
        <h3 class="doc-subtitle">接口返回格式</h3>
        <div class="doc-table">
          <table>
            <thead>
              <tr>
                <th>responseUrlPath</th>
                <th>接口返回格式</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>'url'</code></td>
                <td><code>{ "id": "1", "url": "https://..." }</code></td>
              </tr>
              <tr>
                <td><code>'data'</code></td>
                <td><code>{ "data": "https://..." }</code></td>
              </tr>
              <tr>
                <td><code>'data.url'</code></td>
                <td><code>{ "data": { "url": "https://..." } }</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 自定义提示 -->
    <section class="doc-section">
      <h2 class="doc-section__title">提示文字</h2>
      <p class="doc-section__desc">
        通过 <code>tip</code> 属性或 <code>#tip</code> 插槽在上传区域下方添加提示说明。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="align-items: flex-start; gap: 48px">
          <div>
            <div class="demo-label">tip 属性</div>
            <XlyUpload v-model="valueTip1" tip="支持 PDF/Word/Excel，单个不超过 10MB" />
          </div>
          <div>
            <div class="demo-label">#tip 插槽</div>
            <XlyUpload v-model="valueTip2">
              <template #tip>
                <div style="color: #fa8c16; font-size: 12px">⚠️ 上传后不可撤销，请确认文件正确</div>
              </template>
            </XlyUpload>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- tip 属性 -->
<XlyUpload v-model="files" tip="支持 PDF/Word，单个不超过 10MB" />

<!-- #tip 插槽 -->
<XlyUpload v-model="files">
  <template #tip>
    <span style="color: orange;">⚠️ 上传后不可撤销</span>
  </template>
</XlyUpload>` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">实际项目中常见的使用场景示例。</p>

      <h3 class="doc-subsection__title">附件上传</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-form-scene">
          <div class="demo-form-row">
            <label class="demo-form-label">文档标题</label>
            <input v-model="docForm.title" class="demo-input" placeholder="请输入文档标题" />
          </div>
          <div class="demo-form-row">
            <label class="demo-form-label">附件 <span class="required">*</span></label>
            <XlyUpload
              v-model="docForm.attachments"
              :limit="5"
              accept-types="pdf,doc,docx,xls,xlsx,ppt,pptx"
              :max-size="5120"
              tip="最多上传 5 个附件，单个不超过 5MB"
            />
          </div>
          <div class="demo-form-actions">
            <XlyButton type="primary" @click="handleDocSubmit">提交文档</XlyButton>
            <XlyButton>重置</XlyButton>
          </div>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">UploadFileItem 对象结构</h3>
      <div class="doc-table">
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
              <td>文件唯一标识</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>文件名称</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>url</code></td>
              <td>文件地址</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>文件大小（单位 KB）</td>
              <td><code>number</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>v-model</code></td>
              <td>绑定值，支持对象数组或 JSON 字符串</td>
              <td><code>UploadFileItem[] | string</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>value-mode</code></td>
              <td>返回值模式：array 返回对象数组，string 返回 JSON 字符串</td>
              <td><code>'array' | 'string'</code></td>
              <td><code>'array'</code></td>
            </tr>
            <tr>
              <td><code>limit</code></td>
              <td>最多上传数量</td>
              <td><code>number</code></td>
              <td>—（不限）</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>是否允许同时选多个文件</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>accept</code></td>
              <td>原生 accept 属性</td>
              <td><code>string</code></td>
              <td><code>'*'</code></td>
            </tr>
            <tr>
              <td><code>accept-types</code></td>
              <td>允许的文件后缀，逗号拼接，如 "pdf,doc,docx"</td>
              <td><code>string</code></td>
              <td>—（不限制）</td>
            </tr>
            <tr>
              <td><code>max-size</code></td>
              <td>单文件最大尺寸（KB），如 2048 表示 2MB</td>
              <td><code>number</code></td>
              <td>—（不限制）</td>
            </tr>
            <tr>
              <td><code>min-size</code></td>
              <td>单文件最小尺寸（KB）</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>downloadable</code></td>
              <td>是否支持下载</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>tip</code></td>
              <td>提示文字</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>trigger-text</code></td>
              <td>触发区域文字</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
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
              <td><code>update:modelValue</code></td>
              <td>v-model 更新</td>
              <td><code>(value: UploadFileItem[] | string)</code></td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>文件列表变化</td>
              <td><code>(fileList: UploadFileItem[])</code></td>
            </tr>
            <tr>
              <td><code>success</code></td>
              <td>单个文件上传成功</td>
              <td><code>(file: UploadFileItem)</code></td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>单个文件上传失败</td>
              <td><code>(error: Error, file: UploadFileItem)</code></td>
            </tr>
            <tr>
              <td><code>remove</code></td>
              <td>删除文件</td>
              <td><code>(file: UploadFileItem, fileList: UploadFileItem[])</code></td>
            </tr>
            <tr>
              <td><code>exceed</code></td>
              <td>超出 limit 限制</td>
              <td><code>(files: File[], limit: number)</code></td>
            </tr>
            <tr>
              <td><code>validate-error</code></td>
              <td>校验未通过</td>
              <td><code>(msg: string, file: File)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>trigger</code></td>
              <td>自定义上传触发区域内容</td>
            </tr>
            <tr>
              <td><code>tip</code></td>
              <td>自定义提示区域内容</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Exposes（ref 暴露方法）</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>open()</code></td>
              <td>手动触发文件选择框</td>
            </tr>
            <tr>
              <td><code>clear()</code></td>
              <td>清空所有文件</td>
            </tr>
            <tr>
              <td><code>getFileList()</code></td>
              <td>获取当前文件列表</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyUpload from '@/components/xly-file-upload/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import type { UploadFileItem } from '@/components/xly-file-upload/index.vue'

// ---- 基础用法 ----
const value1 = ref<UploadFileItem[]>([])

// ---- v-model 双向绑定 ----
const value2Array = ref<UploadFileItem[]>([])
const value2String = ref('')

// ---- 限制数量 ----
const value3Single = ref<UploadFileItem[]>([])
const value3Multi = ref<UploadFileItem[]>([])
const value3Unlimited = ref<UploadFileItem[]>([])

// ---- 拖拽 ----
const valueDrag = ref<UploadFileItem[]>([])

// ---- 禁用 ----
const valueDisabled = ref<UploadFileItem[]>([
  { id: '1', name: '项目文档.pdf', url: 'https://example.com/doc.pdf', size: 1024 },
  { id: '2', name: '数据报表.xlsx', url: 'https://example.com/report.xlsx', size: 2048 },
])

// ---- 校验 ----
const valueValidate = ref<UploadFileItem[]>([])

// ---- 提示文字 ----
const valueTip1 = ref<UploadFileItem[]>([])
const valueTip2 = ref<UploadFileItem[]>([])

// ---- 文档表单 ----
const docForm = ref({
  title: '',
  attachments: [] as UploadFileItem[],
})

function handleDocSubmit() {
  alert(`提交成功！\n文档标题：${docForm.value.title}\n附件数量：${docForm.value.attachments.length} 个`)
}
</script>

<style scoped lang="scss">
.upload-doc {
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

.doc-subsection__title {
  font-size: 15px;
  font-weight: 600;
  color: #4a4a6a;
  margin: 24px 0 12px;
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

  &--noborder {
    border: none;
    background: #fafbfd;
  }
}

.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
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
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
    white-space: nowrap;
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

// 当前值展示
.demo-value-display {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f6fa;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 12px;
}

.demo-value-label {
  color: #8e8ea0;
  flex-shrink: 0;
  line-height: 1.5;
}

.demo-value-content {
  color: #4f6ef7;
  font-family: 'SF Mono', Consolas, monospace;
  word-break: break-all;
  line-height: 1.5;
}

.demo-value-str {
  max-width: 300px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// v-model 演示
.demo-vmodel {
  align-items: flex-start !important;
  gap: 40px !important;
}

.demo-vmodel-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 280px;
}

.demo-vmodel-label {
  font-size: 13px;
  color: #4a4a6a;
  font-weight: 500;
}

.demo-label {
  font-size: 13px;
  color: #8e8ea0;
  margin-bottom: 8px;
}

// 文档表单
.demo-form-scene {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-form-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.demo-form-label {
  width: 72px;
  font-size: 14px;
  color: #4a4a6a;
  flex-shrink: 0;
  padding-top: 6px;
  text-align: right;

  .required {
    color: #ff3b30;
    margin-left: 2px;
  }
}

.demo-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e4e7f0;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a2e;
  outline: none;
  width: 240px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f6ef7;
  }

  &::placeholder {
    color: #c0c4cc;
  }
}

.demo-form-actions {
  display: flex;
  gap: 8px;
  padding-left: 88px;
}

// 说明提示框
.doc-alert {
  display: flex;
  gap: 12px;
  background: rgba(79, 110, 247, 0.05);
  border: 1px solid rgba(79, 110, 247, 0.2);
  border-radius: 10px;
  padding: 16px 18px;
  margin-top: 12px;

  &__icon {
    flex-shrink: 0;
    color: #4f6ef7;
    padding-top: 1px;
  }

  &__body {
    flex: 1;
    font-size: 14px;
    color: #4a4a6a;
    line-height: 1.7;

    p {
      margin: 0 0 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    code {
      background: rgba(79, 110, 247, 0.1);
      color: #4f6ef7;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 13px;
      font-family: 'SF Mono', Consolas, monospace;
    }
  }

  &__title {
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 8px;
    font-size: 14px;
  }
}

.doc-code--standalone {
  border-top: none !important;
  border: 1px solid #f2f3f7;
  border-radius: 8px;
  margin: 10px 0;
}

.doc-upload-options {
  margin-top: 20px;
}
</style>
