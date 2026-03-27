<template>
  <div class="upload-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Upload 图片上传</h1>
      <p class="doc-desc">
        支持本地预览与网络上传的图片上传组件，提供 v-model 双向绑定，支持上传数量限制、拖拽上传、进度展示和预览功能。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        默认使用本地模式，读取本地图片并以 <code>base64</code> 形式存储，无需后端接口即可看到完整效果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="value1" />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="imageList" />` }}</code></pre>
        </div>
      </div>
      <div class="demo-value-display">
        <span class="demo-value-label">当前值：</span>
        <span class="demo-value-content" v-if="value1&&value1.length">{{ JSON.stringify(value1)?.substring(0, 30) }}..."]</span>
      </div>
    </section>

    <!-- v-model 绑定 -->
    <section class="doc-section">
      <h2 class="doc-section__title">v-model 双向绑定</h2>
      <p class="doc-section__desc">
        <code>modelValue</code> 支持 <strong>字符串数组</strong> 和 <strong>逗号拼接字符串</strong> 两种格式传入，
        通过 <code>value-mode</code> 控制返回格式（<code>array</code> 返回数组 / <code>string</code> 返回逗号拼接字符串）。
        <br />
        💡 <strong>原理：</strong><code>value-mode="string"</code> 时，每项 URL 先经过 <code>encodeURIComponent</code> 编码再用逗号拼接，
        base64 中的逗号被编码为 <code>%2C</code>，解析时 <code>split(',')</code> 不会出错，再逐项 <code>decodeURIComponent</code> 还原。
        兼容未编码的普通 http URL（无 <code>%</code> 字符时 decode 不受影响）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-vmodel">
          <div class="demo-vmodel-item">
            <div class="demo-vmodel-label">传入数组 / 返回数组（默认）</div>
            <XlyUpload v-model="value2Array" :limit="3" />
            <div class="demo-value-display">
              <span class="demo-value-label">值：</span>
              <span class="demo-value-content">Array({{ Array.isArray(value2Array) ? value2Array.length : 0 }})</span>
            </div>
          </div>
          <div class="demo-vmodel-item">
            <div class="demo-vmodel-label">返回逗号拼接字符串（value-mode="string"）</div>
            <XlyUpload v-model="value2String" value-mode="string" :limit="3" />
            <div class="demo-value-display">
              <span class="demo-value-label">值：</span>
              <span class="demo-value-content demo-value-str">
                {{ typeof value2String === 'string' && value2String ? `[${value2String.split(',').length} 张]` : '（空）' }}
              </span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 返回数组（默认） -->
<XlyUpload v-model="imageList" />

<!-- 返回逗号拼接字符串 -->
<XlyUpload v-model="imageStr" value-mode="string" />

// 传入时两种格式均支持：
const imageList = ref(['https://img1.jpg', 'https://img2.jpg'])
const imageStr  = ref('https://img1.jpg,https://img2.jpg')` }}</code></pre>
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
        <div class="doc-preview__body" style="gap: 40px; align-items: flex-start;">
          <div>
            <div class="demo-label">limit=1（头像单图）</div>
            <XlyUpload v-model="value3Single" :limit="1" />
          </div>
          <div>
            <div class="demo-label">limit=3</div>
            <XlyUpload v-model="value3Multi" :limit="3" @exceed="handleExceed" />
          </div>
          <div>
            <div class="demo-label">不限制数量</div>
            <XlyUpload v-model="value3Unlimited" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 限制 1 张 -->
<XlyUpload v-model="avatar" :limit="1" />

<!-- 限制 3 张，超出触发事件 -->
<XlyUpload v-model="images" :limit="3" @exceed="handleExceed" />

function handleExceed(files, limit) {
  alert(\`最多上传 \${limit} 张，已超出 \${files.length} 张\`)
}` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义缩略图尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>size</code> 属性设置缩略图边长（像素），默认 <code>100</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 32px; align-items: flex-end;">
          <div>
            <div class="demo-label">size=60</div>
            <XlyUpload v-model="valueSizeA" :size="60" />
          </div>
          <div>
            <div class="demo-label">size=100（默认）</div>
            <XlyUpload v-model="valueSizeB" :size="100" />
          </div>
          <div>
            <div class="demo-label">size=140</div>
            <XlyUpload v-model="valueSizeC" :size="140" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="images" :size="60" />
<XlyUpload v-model="images" :size="100" />  <!-- 默认 -->
<XlyUpload v-model="images" :size="140" />` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 拖拽上传 -->
    <section class="doc-section">
      <h2 class="doc-section__title">拖拽上传</h2>
      <p class="doc-section__desc">
        上传按钮区域支持直接将图片文件<strong>拖入</strong>，边框会高亮提示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="valueDrag" :size="120" trigger-text="点击或拖拽" />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- trigger-text 属性为触发区域添加提示文字 -->
<XlyUpload v-model="images" :size="120" trigger-text="点击或拖拽" />` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">
        设置 <code>disabled</code> 后，上传按钮隐藏，已有图片不可删除。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUpload v-model="valueDisabled" disabled />
        </div>
        <div class="doc-code">
          <pre><code>{{ `<XlyUpload v-model="images" disabled />` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 上传前校验 -->
    <section class="doc-section">
      <h2 class="doc-section__title">上传前校验</h2>
      <p class="doc-section__desc">
        通过 <code>accept-types</code>、<code>max-size</code>、<code>min-size</code> 属性配置校验规则，无需编写 JS 代码。
        校验失败时触发 <code>@validate-error</code> 事件并显示错误信息。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div>
            <div class="demo-label">accept-types="jpg,png" + max-size="2"</div>
            <XlyUpload v-model="valueValidate" accept-types="jpg,png" :max-size="2" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- 仅允许 JPG/PNG，不超过 2MB -->
<XlyUpload
  v-model="images"
  accept-types="jpg,png"
  :max-size="2"
  @validate-error="handleValidateError"
/>

function handleValidateError(msg) {
  alert(msg)
}

// 支持的格式（后缀或 MIME 类型均可）：
// accept-types="jpg,png,gif"
// accept-types="image/jpeg,image/png,image/gif"
// 最小尺寸同理：min-size="0.1"` }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 网络上传 -->
    <section class="doc-section">
      <h2 class="doc-section__title">切换上传模式</h2>
      <p class="doc-section__desc">
        组件顶部有一个 <code>UPLOAD_MODE</code> 配置项，修改它即可切换本地上传/网络上传，此说明仅作为参考，请根据实际业务需求进行修改。
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
  url: '/api/upload/image',   // ← 修改你的接口地址
  method: 'POST',
  fieldName: 'file',
  headers: { /* ... */ },
  data: { /* ... */ },
  responseUrlPath: 'data',   // ← 如何从响应中取 URL
}` }}</code></pre>
          </div>
          <p><strong>local</strong>：纯前端 base64 预览，无需后端接口，适合开发调试</p>
          <p><strong>network</strong>：上传到真实接口，上传成功后返回服务器图片地址</p>
        </div>
      </div>

      <!-- 接口返回格式 -->
      <div class="doc-upload-options">
        <h3 class="doc-subtitle">接口返回格式</h3>
        <p class="doc-section__desc">组件自动兼容以下三种响应格式，只需设置 <code>responseUrlPath</code> 即可：</p>
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
                <td><code>{ "url": "https://img.com/abc.jpg" }</code></td>
              </tr>
              <tr>
                <td><code>'data'</code></td>
                <td><code>{ "data": "https://img.com/abc.jpg" }</code></td>
              </tr>
              <tr>
                <td><code>'data.url'</code></td>
                <td><code>{ "data": { "url": "https://img.com/abc.jpg" } }</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- NETWORK_CONFIG 完整配置 -->
      <div class="doc-upload-options">
        <h3 class="doc-subtitle">NETWORK_CONFIG 完整配置</h3>
        <div class="doc-table">
          <table>
            <thead>
              <tr>
                <th>属性</th>
                <th>必填</th>
                <th>类型</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>url</code></td>
                <td><strong>是</strong></td>
                <td><code>string</code></td>
                <td>上传接口地址</td>
              </tr>
              <tr>
                <td><code>method</code></td>
                <td>否</td>
                <td><code>'POST' | 'PUT'</code></td>
                <td>请求方法，默认 <code>'POST'</code></td>
              </tr>
              <tr>
                <td><code>fieldName</code></td>
                <td>否</td>
                <td><code>string</code></td>
                <td>上传字段名，默认 <code>'file'</code></td>
              </tr>
              <tr>
                <td><code>headers</code></td>
                <td>否</td>
                <td><code>Record&lt;string, string&gt;</code></td>
                <td>请求头，如 <code>{ Authorization: 'Bearer xxx' }</code></td>
              </tr>
              <tr>
                <td><code>data</code></td>
                <td>否</td>
                <td><code>Record&lt;string, string&gt;</code></td>
                <td>额外表单参数</td>
              </tr>
              <tr>
                <td><code>responseUrlPath</code></td>
                <td>否</td>
                <td><code>string</code></td>
                <td>响应中取 URL 的路径，默认 <code>'data'</code></td>
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
        <div class="doc-preview__body" style="align-items: flex-start; gap: 48px;">
          <div>
            <div class="demo-label">tip 属性</div>
            <XlyUpload v-model="valueTip1" tip="支持 JPG/PNG/GIF，单张不超过 5MB" />
          </div>
          <div>
            <div class="demo-label">#tip 插槽</div>
            <XlyUpload v-model="valueTip2">
              <template #tip>
                <div style="color: #f5a623; font-size: 12px;">⚠️ 上传后不可撤销，请确认图片正确</div>
              </template>
            </XlyUpload>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ `<!-- tip 属性 -->
<XlyUpload v-model="images" tip="支持 JPG/PNG/GIF，单张不超过 5MB" />

<!-- #tip 插槽 -->
<XlyUpload v-model="images">
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

      <h3 class="doc-subsection__title">商品图片上传</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-form-scene">
          <div class="demo-form-row">
            <label class="demo-form-label">商品名称</label>
            <input v-model="productForm.name" class="demo-input" placeholder="请输入商品名称" />
          </div>
          <div class="demo-form-row">
            <label class="demo-form-label">主图 <span class="required">*</span></label>
            <XlyUpload
              v-model="productForm.cover"
              :limit="1"
              :size="120"
              tip="建议尺寸 800×800，支持 JPG/PNG"
            />
          </div>
          <div class="demo-form-row">
            <label class="demo-form-label">轮播图</label>
            <XlyUpload
              v-model="productForm.gallery"
              :limit="6"
              :size="100"
              tip="最多上传 6 张，每张不超过 5MB"
            />
          </div>
          <div class="demo-form-actions">
            <XlyButton type="primary" @click="handleProductSubmit">保存商品</XlyButton>
            <XlyButton>重置</XlyButton>
          </div>
        </div>
      </div>

      <h3 class="doc-subsection__title">头像修改</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-avatar-scene">
          <div class="demo-avatar-left">
            <div v-if="avatarImages.length" class="demo-avatar-preview">
              <img :src="Array.isArray(avatarImages) ? avatarImages[0] : ''" />
            </div>
            <div v-else class="demo-avatar-placeholder">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#c0c4cc" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div class="demo-avatar-right">
            <div class="demo-avatar-title">点击上传头像</div>
            <XlyUpload
              v-model="avatarImages"
              :limit="1"
              :size="80"
              tip="支持 JPG/PNG，建议正方形图片"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

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
              <td>绑定值，支持字符串数组或逗号拼接字符串</td>
              <td><code>string[] | string</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>value-mode</code></td>
              <td>返回值格式：<code>array</code> 返回数组，<code>string</code> 返回逗号拼接（每项经过 <code>encodeURIComponent</code> 编码，base64 安全）</td>
              <td><code>'array' | 'string'</code></td>
              <td><code>'array'</code></td>
            </tr>
            <tr>
              <td><code>limit</code></td>
              <td>最多上传数量，达到上限后隐藏上传按钮</td>
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
              <td>接受的文件类型</td>
              <td><code>string</code></td>
              <td><code>'image/*'</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>缩略图边长（px）</td>
              <td><code>number</code></td>
              <td><code>100</code></td>
            </tr>
            <tr>
              <td><code>fit</code></td>
              <td>缩略图填充方式</td>
              <td><code>'fill' | 'contain' | 'cover' | 'none' | 'scale-down'</code></td>
              <td><code>'cover'</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用（隐藏上传按钮，禁止删除）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>previewable</code></td>
              <td>是否支持点击预览</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>tip</code></td>
              <td>上传区域下方提示文字</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>trigger-text</code></td>
              <td>上传触发按钮内的文字</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>accept-types</code></td>
              <td>允许的文件后缀或 MIME 类型，逗号拼接，如 <code>jpg,png</code> 或 <code>image/jpeg,image/png</code></td>
              <td><code>string</code></td>
              <td>—（不限制）</td>
            </tr>
            <tr>
              <td><code>max-size</code></td>
              <td>单文件最大尺寸（MB）</td>
              <td><code>number</code></td>
              <td>—（不限制）</td>
            </tr>
            <tr>
              <td><code>min-size</code></td>
              <td>单文件最小尺寸（MB），默认 0</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
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
              <td>绑定值变化（v-model）</td>
              <td><code>(value: string[] | string)</code></td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>文件列表发生变化</td>
              <td><code>(fileList: UploadFile[])</code></td>
            </tr>
            <tr>
              <td><code>success</code></td>
              <td>单个文件上传成功</td>
              <td><code>(url: string, file: UploadFile)</code></td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>单个文件上传失败</td>
              <td><code>(error: Error, file: UploadFile)</code></td>
            </tr>
            <tr>
              <td><code>remove</code></td>
              <td>删除文件</td>
              <td><code>(file: UploadFile, fileList: UploadFile[])</code></td>
            </tr>
            <tr>
              <td><code>exceed</code></td>
              <td>超出 limit 限制时触发</td>
              <td><code>(files: File[], limit: number)</code></td>
            </tr>
            <tr>
              <td><code>validate-error</code></td>
              <td>内置校验未通过时触发（accept-types / max-size / min-size）</td>
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
              <td>自定义提示区域内容（支持富文本）</td>
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
              <td>清空所有文件（同时更新 v-model）</td>
            </tr>
            <tr>
              <td><code>getFileList()</code></td>
              <td>获取当前文件列表（UploadFile[]）</td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyUpload from '@/components/xly-image-upload/index.vue'
import XlyButton from '@/components/xly-button/index.vue'

// ---- 基础用法 ----
const value1 = ref<string[]>([])

// ---- v-model 双向绑定 ----
const value2Array = ref<string[]>([])
const value2String = ref<string>('')

// ---- 限制数量 ----
const value3Single = ref<string[]>([])
const value3Multi = ref<string[]>([])
const value3Unlimited = ref<string[]>([])

function handleExceed(files: File[], limit: number) {
  alert(`最多上传 ${limit} 张，已超出 ${files.length} 张，已自动截取前 ${limit} 张`)
}

// ---- 自定义尺寸 ----
const valueSizeA = ref<string[]>([])
const valueSizeB = ref<string[]>([])
const valueSizeC = ref<string[]>([])

// ---- 拖拽 ----
const valueDrag = ref<string[]>([])

// ---- 禁用 ----
const valueDisabled = ref<string[]>([
  'https://picsum.photos/seed/d1/200/200',
  'https://picsum.photos/seed/d2/200/200',
])

// ---- 校验 ----
const valueValidate = ref<string[]>([])
function handleValidateError(msg: string) {
  alert(msg)
}

// ---- 提示文字 ----
const valueTip1 = ref<string[]>([])
const valueTip2 = ref<string[]>([])

// ---- 商品表单 ----
const productForm = ref({
  name: '',
  cover: [] as string[],
  gallery: [] as string[],
})

function handleProductSubmit() {
  if (!productForm.value.cover.length) {
    alert('请上传主图！')
    return
  }
  alert(`保存成功！\n商品名称：${productForm.value.name}\n主图：已上传\n轮播图：${productForm.value.gallery.length} 张`)
}

// ---- 头像 ----
const avatarImages = ref<string[]>([])
</script>

<style scoped lang="scss">
.upload-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-subsection__title { font-size: 15px; font-weight: 600; color: #4a4a6a; margin: 24px 0 12px; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6; code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; &--noborder { border: none; background: #fafbfd; } }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto; pre { margin: 0; padding: 0; } code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; } }
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto; table { width: 100%; border-collapse: collapse; font-size: 14px; } th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; } th { background: #fafbfd; font-weight: 600; color: #1a1a2e; white-space: nowrap; } td { color: #4a4a6a; } code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }

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

// 网络上传提示
.demo-network-info {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(79, 110, 247, 0.06);
  border: 1px solid rgba(79, 110, 247, 0.2);
  border-radius: 8px;
  font-size: 13px;
  color: #4a4a6a;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 4px;

  code {
    background: rgba(79, 110, 247, 0.1);
    color: #4f6ef7;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
    font-family: 'SF Mono', Consolas, monospace;
  }
}

// 商品表单
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

  &::placeholder { color: #c0c4cc; }
}

.demo-form-actions {
  display: flex;
  gap: 8px;
  padding-left: 88px;
}

// 头像场景
.demo-avatar-scene {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 24px;
}

.demo-avatar-left {
  flex-shrink: 0;
}

.demo-avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e4e7f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.demo-avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed #e4e7f0;
  background: #fafbfd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-avatar-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-avatar-title {
  font-size: 14px;
  color: #4a4a6a;
  font-weight: 500;
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
      &:last-child { margin-bottom: 0; }
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

// 上传函数参数说明
.doc-upload-options {
  margin-top: 20px;
}
</style>
