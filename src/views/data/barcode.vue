<template>
  <div class="barcode-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Barcode 条码生成器</h1>
      <p class="doc-desc">
        基于 JsBarcode 库实现的条码生成器，支持多种条码格式（CODE128, CODE39, EAN13, EAN8, UPC 等）。
        生成 SVG 格式矢量条码，支持下载为 SVG 或 PNG。
      </p>
      <div class="doc-requires">
        <span class="doc-requires__label">依赖安装</span>
        <code class="doc-requires__cmd">pnpm add jsbarcode</code>
      </div>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>content</code> 属性即可生成条码，默认格式 CODE128。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyBarcode content="ABC-123456" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyBarcode content="ABC-123456" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 条码格式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">条码格式</h2>
      <p class="doc-section__desc">
        通过 <code>format</code> 属性设置条码格式。常用格式：
        <code>CODE128</code>（通用，最灵活）、
        <code>CODE39</code>（工业标准）、
        <code>EAN13</code>（商品条码）、
        <code>EAN8</code>（8位商品码）、
        <code>UPC</code>（美国商品码）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body barcode-format-group">
          <div class="barcode-format-item">
            <XlyBarcode content="CODE128-TEST" format="CODE128" :height="60" :font-size="14" />
            <span>CODE128（通用）</span>
          </div>
          <div class="barcode-format-item">
            <XlyBarcode content="CODE39-TEST" format="CODE39" :height="60" :font-size="14" />
            <span>CODE39（工业）</span>
          </div>
          <div class="barcode-format-item">
            <XlyBarcode content="490123456789" format="EAN13" :height="60" :font-size="14" />
            <span>EAN13（商品）</span>
          </div>
          <div class="barcode-format-item">
            <XlyBarcode content="12345670" format="EAN8" :height="60" :font-size="14" />
            <span>EAN8（8位商品）</span>
          </div>
          <div class="barcode-format-item">
            <XlyBarcode content="012345678905" format="UPC" :height="60" :font-size="14" />
            <span>UPC（美国）</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyBarcode content="CODE128-TEST" format="CODE128" /&gt;
&lt;XlyBarcode content="CODE39-TEST" format="CODE39" /&gt;
&lt;XlyBarcode content="490123456789" format="EAN13" /&gt;
&lt;XlyBarcode content="12345670" format="EAN8" /&gt;
&lt;XlyBarcode content="012345678905" format="UPC" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义样式</h2>
      <p class="doc-section__desc">
        通过 <code>width</code>、<code>height</code>、<code>lineColor</code>、<code>background</code> 等属性自定义条码外观。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body barcode-style-group">
          <div class="barcode-style-item">
            <XlyBarcode
              content="THIN-BARS"
              :width="1"
              :height="80"
              line-color="#1a1a2e"
              :font-size="12"
            />
            <span>细条</span>
          </div>
          <div class="barcode-style-item">
            <XlyBarcode
              content="THICK-BARS"
              :width="4"
              :height="120"
              line-color="#4F6EF7"
              :font-size="18"
            />
            <span>粗条</span>
          </div>
          <div class="barcode-style-item">
            <XlyBarcode
              content="RED-BARS"
              :height="100"
              line-color="#FF3B30"
              background="#FFF5F5"
              :font-size="16"
            />
            <span>红条白底</span>
          </div>
          <div class="barcode-style-item">
            <XlyBarcode
              content="GREEN-BARS"
              :height="100"
              line-color="#34C759"
              background="#E8F5E9"
              :font-size="16"
            />
            <span>绿条浅绿底</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 细条 --&gt;
&lt;XlyBarcode content="THIN-BARS" :width="1" :height="80" /&gt;

&lt;!-- 粗条蓝条 --&gt;
&lt;XlyBarcode content="THICK-BARS" :width="4" :height="120" line-color="#4F6EF7" /&gt;

&lt;!-- 红条白底 --&gt;
&lt;XlyBarcode content="RED-BARS" line-color="#FF3B30" background="#FFF5F5" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 文本样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">文本样式</h2>
      <p class="doc-section__desc">
        通过 <code>font</code>、<code>fontSize</code>、<code>textAlign</code> 等属性自定义条码下方的文本。
        设置 <code>displayValue</code> 为 <code>false</code> 可隐藏文本。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body barcode-text-group">
          <div class="barcode-text-item">
            <XlyBarcode content="HELLO-WORLD" :height="80" :font-size="14" text-align="center" />
            <span>居中（默认）</span>
          </div>
          <div class="barcode-text-item">
            <XlyBarcode content="HELLO-WORLD" :height="80" :font-size="14" text-align="left" />
            <span>左对齐</span>
          </div>
          <div class="barcode-text-item">
            <XlyBarcode content="HELLO-WORLD" :height="80" :font-size="14" text-align="right" />
            <span>右对齐</span>
          </div>
          <div class="barcode-text-item">
            <XlyBarcode content="NO-TEXT" :height="80" :display-value="false" />
            <span>隐藏文本</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyBarcode content="HELLO-WORLD" :font-size="14" text-align="center" /&gt;
&lt;XlyBarcode content="HELLO-WORLD" :font-size="14" text-align="left" /&gt;
&lt;XlyBarcode content="NO-TEXT" :display-value="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 动态生成与交互 -->
    <section class="doc-section">
      <h2 class="doc-section__title">动态生成与交互</h2>
      <p class="doc-section__desc">
        通过 <code>ref</code> 获取组件实例，可下载为 SVG 或 PNG。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="barcode-interactive">
            <div class="barcode-interactive__left">
              <el-input
                v-model="dynamicContent"
                type="textarea"
                :rows="3"
                placeholder="请输入要生成条码的内容"
                style="margin-bottom: 16px"
              />
              <div class="barcode-interactive__controls">
                <XlyButton type="primary" @click="handleDownloadSVG">下载 SVG</XlyButton>
                <XlyButton type="ghost" @click="handleDownloadPNG">下载 PNG</XlyButton>
              </div>
            </div>
            <div class="barcode-interactive__right">
              <XlyBarcode ref="barcodeRef" :content="dynamicContent" :height="100" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>const barcodeRef = ref()
const dynamicContent = ref('DYNAMIC-CODE')

// 下载 SVG
function handleDownloadSVG() {
  barcodeRef.value?.downloadSVG('my-barcode.svg')
}

// 下载 PNG
function handleDownloadPNG() {
  barcodeRef.value?.downloadPNG('my-barcode.png', 2)
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 事件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">事件</h2>
      <p class="doc-section__desc">
        条码生成成功或失败时会触发相应事件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyBarcode
            content="EVENT-TEST"
            :height="100"
            @generated="onGenerated"
            @error="onError"
          />
          <div v-if="eventLog.length" class="barcode-event-log">
            <div v-for="(log, index) in eventLog" :key="index" class="barcode-event-log__item">
              <el-tag :type="log.type === 'success' ? 'success' : 'danger'" size="small">
                {{ log.type }}
              </el-tag>
              <span>{{ log.message }}</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyBarcode
  content="EVENT-TEST"
  @generated="onGenerated"
  @error="onError"
/&gt;

function onGenerated(svgElement: SVGElement) {
  console.log('条码生成成功', svgElement)
}

function onError(error: Error) {
  console.error('条码生成失败', error)
}</code></pre>
        </div>
      </div>
    </section>

    <!-- Props API -->
    <section class="doc-section">
      <h2 class="doc-section__title">Props</h2>
      <div class="doc-table-wrapper">
        <table class="doc-table">
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
              <td><code>content</code></td>
              <td>条码内容</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>format</code></td>
              <td>条码格式</td>
              <td><code>string</code></td>
              <td><code>'CODE128'</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>单个条的宽度，单位 px</td>
              <td><code>number</code></td>
              <td><code>2</code></td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td>条码高度，单位 px</td>
              <td><code>number</code></td>
              <td><code>100</code></td>
            </tr>
            <tr>
              <td><code>displayValue</code></td>
              <td>是否显示文本</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>font</code></td>
              <td>文本字体</td>
              <td><code>string</code></td>
              <td><code>'Courier New'</code></td>
            </tr>
            <tr>
              <td><code>fontSize</code></td>
              <td>文本字体大小</td>
              <td><code>number</code></td>
              <td><code>20</code></td>
            </tr>
            <tr>
              <td><code>textAlign</code></td>
              <td>文本对齐方式</td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'center'</code></td>
            </tr>
            <tr>
              <td><code>margin</code></td>
              <td>文本距离条码的间距，单位 px</td>
              <td><code>number</code></td>
              <td><code>10</code></td>
            </tr>
            <tr>
              <td><code>background</code></td>
              <td>背景色</td>
              <td><code>string</code></td>
              <td><code>'#ffffff'</code></td>
            </tr>
            <tr>
              <td><code>lineColor</code></td>
              <td>条的颜色</td>
              <td><code>string</code></td>
              <td><code>'#000000'</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Methods API -->
    <section class="doc-section">
      <h2 class="doc-section__title">Methods</h2>
      <div class="doc-table-wrapper">
        <table class="doc-table">
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>downloadSVG</code></td>
              <td>下载为 SVG 文件</td>
              <td><code>filename?: string</code>，默认 'barcode.svg'</td>
            </tr>
            <tr>
              <td><code>downloadPNG</code></td>
              <td>下载为 PNG 图片</td>
              <td><code>filename?: string, scale?: number</code></td>
            </tr>
            <tr>
              <td><code>toSVGString</code></td>
              <td>获取 SVG 字符串</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>getSvgElement</code></td>
              <td>获取 SVG 元素</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events API -->
    <section class="doc-section">
      <h2 class="doc-section__title">Events</h2>
      <div class="doc-table-wrapper">
        <table class="doc-table">
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>generated</code></td>
              <td>条码生成成功时触发</td>
              <td><code>(svgElement: SVGElement) => void</code></td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>条码生成失败时触发</td>
              <td><code>(error: Error) => void</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 格式说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">支持的条码格式</h2>
      <div class="doc-table-wrapper">
        <table class="doc-table">
          <thead>
            <tr>
              <th>格式</th>
              <th>说明</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CODE128</code></td>
              <td>通用条码，支持所有 ASCII 字符，最灵活</td>
              <td>ABC-123456</td>
            </tr>
            <tr>
              <td><code>CODE39</code></td>
              <td>工业标准条码，只支持大写字母、数字和少量符号</td>
              <td>CODE39-TEST</td>
            </tr>
            <tr>
              <td><code>EAN13</code></td>
              <td>国际商品条码，13位数字（最后一位为校验位）</td>
              <td>490123456789</td>
            </tr>
            <tr>
              <td><code>EAN8</code></td>
              <td>8位商品条码，适用小商品</td>
              <td>12345670</td>
            </tr>
            <tr>
              <td><code>UPC</code></td>
              <td>美国 Universal Product Code，12位数字</td>
              <td>012345678905</td>
            </tr>
            <tr>
              <td><code>CODE93</code></td>
              <td>CODE39 的紧凑版，支持更多字符</td>
              <td>CODE93-TEST</td>
            </tr>
            <tr>
              <td><code>ITF14</code></td>
              <td>交叉二五码，常用于物流箱</td>
              <td>1234567890123</td>
            </tr>
            <tr>
              <td><code>MSI</code></td>
              <td>MSI Plessey 条码，常用于库存管理</td>
              <td>1234567890</td>
            </tr>
            <tr>
              <td><code>POSTNET</code></td>
              <td>美国邮政编码条码</td>
              <td>123456789</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'
import XlyBarcode from '@/components/xly-barcode/index.vue'
import XlyButton from '@/components/xly-button/index.vue'

const barcodeRef = ref<InstanceType<typeof XlyBarcode>>()
const dynamicContent = ref('DYNAMIC-CODE-123')

function handleDownloadSVG() {
  barcodeRef.value?.downloadSVG(`barcode-${Date.now()}.svg`)
  ElMessage.success('SVG 下载成功')
}

function handleDownloadPNG() {
  barcodeRef.value?.downloadPNG(`barcode-${Date.now()}.png`, 2)
  ElMessage.success('PNG 下载成功')
}

// 事件日志
const eventLog = ref<Array<{ type: 'success' | 'error'; message: string }>>([])

function onGenerated(svgElement: SVGElement) {
  eventLog.value.unshift({
    type: 'success',
    message: `生成成功，SVG 宽度: ${svgElement.getAttribute('width')}`,
  })
  if (eventLog.value.length > 3) {
    eventLog.value.pop()
  }
}

function onError(error: Error) {
  eventLog.value.unshift({
    type: 'error',
    message: `生成失败: ${error.message}`,
  })
}
</script>

<style scoped lang="scss">
/* ========== 文档页通用样式 ========== */
.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  line-height: 1.6;
  margin: 0;

  code {
    padding: 2px 6px;
    background: #f0f2f5;
    border-radius: 4px;
    font-size: 13px;
    color: #4f6ef7;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

/* ========== 依赖说明 ========== */
.doc-requires {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 12px 16px;
  background: #f0f2f5;
  border-radius: 8px;
  font-size: 14px;

  &__label {
    color: #6b7280;
    font-weight: 500;
  }

  &__cmd {
    padding: 4px 12px;
    background: #1a1a2e;
    color: #a5d6a7;
    border-radius: 6px;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    font-size: 13px;
  }
}

.doc-section {
  margin-bottom: 40px;
}

.doc-section__title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.doc-section__desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px;

  code {
    padding: 2px 6px;
    background: #f0f2f5;
    border-radius: 4px;
    font-size: 13px;
    color: #4f6ef7;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

.doc-preview {
  border: 1px solid #e2e4ed;
  border-radius: 12px;
  overflow: hidden;
}

.doc-preview__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.doc-code {
  border-top: 1px solid #e2e4ed;
  padding: 16px;
  background: #fafbfc;

  pre {
    margin: 0;
    overflow-x: auto;
  }

  code {
    font-size: 13px;
    line-height: 1.6;
    color: #4a4a6a;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

/* ========== 条码格式组 ========== */
.barcode-format-group {
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.barcode-format-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 13px;
    color: #6b7280;
  }
}

/* ========== 条码样式组 ========== */
.barcode-style-group {
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.barcode-style-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 13px;
    color: #6b7280;
  }
}

/* ========== 条码文本组 ========== */
.barcode-text-group {
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.barcode-text-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 13px;
    color: #6b7280;
  }
}

/* ========== 交互演示 ========== */
.barcode-interactive {
  display: flex;
  gap: 32px;
  width: 100%;
  max-width: 600px;

  &__left {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__controls {
    display: flex;
    gap: 8px;
  }
}

/* ========== 事件日志 ========== */
.barcode-event-log {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 400px;

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #4a4a6a;
  }
}

/* ========== API 表格 ========== */
.doc-table-wrapper {
  overflow-x: auto;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 10px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e4ed;
  }

  th {
    background: #f8f9fb;
    font-weight: 600;
    color: #1a1a2e;
    white-space: nowrap;
  }

  td {
    color: #4a4a6a;
  }

  code {
    padding: 2px 6px;
    background: #f0f2f5;
    border-radius: 4px;
    font-size: 13px;
    color: #4f6ef7;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}
</style>
