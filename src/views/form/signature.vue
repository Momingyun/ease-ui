<template>
  <div class="sig-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Signature 签名板</h1>
      <p class="doc-desc">独立的手写签名画板组件，支持鼠标和触摸绘制、画笔自定义、撤销、清空、导出签名图片。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">默认配置的签名板，包含画笔粗细选择、撤销、清空和确认功能。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="sig-demo" style="max-width: 500px;">
            <XlySignature
              :height="200"
              @confirm="onConfirm"
              @change="onChange"
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySignature
  :height="200"
  @confirm="onConfirm"
  @change="onChange"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义画笔颜色</h2>
      <p class="doc-section__desc">通过 <code>showPenColor</code> 开启颜色选择器，或使用 <code>penColor</code> 直接指定画笔颜色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="sig-demo" style="max-width: 550px;">
            <XlySignature
              :height="200"
              show-pen-color
              pen-color="#ef4444"
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySignature
  :height="200"
  show-pen-color
  pen-color="#ef4444"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 暗色背景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">暗色画布</h2>
      <p class="doc-section__desc">通过 <code>canvasBgColor</code> 设置画布背景色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="sig-demo sig-demo--dark" style="max-width: 500px;">
            <XlySignature
              :height="200"
              canvas-bg-color="#1e293b"
              pen-color="#e2e8f0"
              :radius="10"
              toolbar-text
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySignature
  :height="200"
  canvas-bg-color="#1e293b"
  pen-color="#e2e8f0"
  :radius="10"
  toolbar-text
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 纯画板模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">纯画板模式</h2>
      <p class="doc-section__desc">隐藏工具栏，通过 <code>ref</code> 调用方法控制画板。适用于嵌入到自定义弹窗或表单中。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="sig-demo" style="max-width: 500px;">
            <XlySignature
              ref="pureSigRef"
              :height="160"
              :show-toolbar="false"
              :show-placeholder="false"
              canvas-bg-color="#fafafa"
              pen-color="#1a1a2e"
              :radius="0"
              placeholder=""
            />
            <div class="sig-actions">
              <button class="sig-action-btn" @click="pureSigRef?.undo()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                撤销
              </button>
              <button class="sig-action-btn" @click="pureSigRef?.clear()">清空</button>
              <button class="sig-action-btn sig-action-btn--primary" @click="handlePureConfirm">获取签名</button>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySignature
  ref="sigRef"
  :show-toolbar="false"
  :show-placeholder="false"
  :height="160"
/&gt;
&lt;button @click="sigRef?.undo()"&gt;撤销&lt;/button&gt;
&lt;button @click="sigRef?.clear()"&gt;清空&lt;/button&gt;
&lt;button @click="sigRef?.getDataUrl()"&gt;获取签名&lt;/button&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 签名预览 -->
    <section v-if="signatureDataUrl" class="doc-section">
      <h2 class="doc-section__title">签名预览</h2>
      <p class="doc-section__desc">确认签名后获取到的 PNG 图片 dataURL：</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="sig-preview">
            <img :src="signatureDataUrl" alt="签名预览" class="sig-preview__img" />
            <p class="sig-preview__size">大小：{{ formatDataUrlSize(signatureDataUrl) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- API -->
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
            <tr><td><code>width</code></td><td>画布宽度（像素），不设置则撑满容器</td><td><code>number</code></td><td>-</td></tr>
            <tr><td><code>height</code></td><td>画布高度（像素）</td><td><code>number</code></td><td><code>200</code></td></tr>
            <tr><td><code>penColor</code></td><td>画笔颜色</td><td><code>string</code></td><td><code>'#1a1a2e'</code></td></tr>
            <tr><td><code>penSize</code></td><td>画笔粗细（像素）</td><td><code>number</code></td><td><code>2</code></td></tr>
            <tr><td><code>canvasBgColor</code></td><td>画布背景色</td><td><code>string</code></td><td><code>'#ffffff'</code></td></tr>
            <tr><td><code>placeholder</code></td><td>占位提示文字</td><td><code>string</code></td><td><code>'请在此处手写签名'</code></td></tr>
            <tr><td><code>placeholderIcon</code></td><td>占位提示图标（XlyIcon 格式）</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>showToolbar</code></td><td>是否显示工具栏</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showPenSize</code></td><td>是否显示画笔粗细选择</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showPenColor</code></td><td>是否显示画笔颜色选择</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>showUndo</code></td><td>是否显示撤销按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showClear</code></td><td>是否显示清空按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showConfirm</code></td><td>是否显示确认按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showPlaceholder</code></td><td>是否显示占位提示</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>toolbarText</code></td><td>工具栏按钮是否带文字</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>radius</code></td><td>圆角（像素）</td><td><code>number</code></td><td><code>8</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead>
          <tbody>
            <tr><td><code>confirm</code></td><td>点击确认按钮时触发</td><td><code>dataUrl: string</code></td></tr>
            <tr><td><code>change</code></td><td>签名内容变化时触发</td><td><code>hasContent: boolean</code></td></tr>
            <tr><td><code>undo</code></td><td>撤销操作时触发</td><td>-</td></tr>
            <tr><td><code>clear</code></td><td>清空操作时触发</td><td>-</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Expose 方法</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>undo()</code></td><td>撤销上一笔</td><td>-</td></tr>
            <tr><td><code>clear()</code></td><td>清空画布</td><td>-</td></tr>
            <tr><td><code>confirm()</code></td><td>确认签名（触发 confirm 事件）</td><td>-</td></tr>
            <tr><td><code>getDataUrl()</code></td><td>获取签名图片 dataURL</td><td>-</td></tr>
            <tr><td><code>setPenColor(color)</code></td><td>设置画笔颜色</td><td><code>color: string</code></td></tr>
            <tr><td><code>setPenSize(size)</code></td><td>设置画笔粗细</td><td><code>size: number</code></td></tr>
            <tr><td><code>hasContent</code></td><td>是否有签名内容</td><td><code>Ref&lt;boolean&gt;</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>插槽名</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><code>placeholder</code></td><td>自定义占位提示内容</td></tr>
            <tr><td><code>toolbar-left</code></td><td>工具栏左侧自定义内容</td></tr>
            <tr><td><code>toolbar-right</code></td><td>工具栏右侧自定义内容（覆盖默认确认按钮）</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlySignature from '@/components/xly-signature/index.vue'

defineOptions({ name: 'SignatureDoc' })

const pureSigRef = ref<InstanceType<typeof XlySignature>>()
const signatureDataUrl = ref('')

function onConfirm(dataUrl: string) {
  signatureDataUrl.value = dataUrl
}

function onChange(hasContent: boolean) {
  console.log('签名状态:', hasContent ? '有内容' : '空白')
}

function handlePureConfirm() {
  const url = pureSigRef.value?.getDataUrl()
  if (url) {
    signatureDataUrl.value = url
  }
}

function formatDataUrlSize(dataUrl: string): string {
  const base64 = dataUrl.split(',')[1]
  if (!base64) return '0 B'
  const bytes = Math.round(base64.length * 0.75)
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}
</script>

<style scoped lang="scss">
.sig-doc {
  padding: 8px 0 40px;
}

/* ========== 页面头部 ========== */
.doc-header { margin-bottom: 32px; }
.doc-title { font-size: 22px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px; }
.doc-desc { font-size: 14px; color: #71717a; margin: 0; }

/* ========== 章节 ========== */
.doc-section { margin-bottom: 28px; }
.doc-section__title { font-size: 15px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px; padding-bottom: 8px; border-bottom: 1px solid #e4e4e7; }
.doc-section__desc { font-size: 14px; color: #71717a; margin: 0 0 14px;
  code { background: #f4f5f7; color: #3b82f6; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
}
.doc-subtitle { font-size: 14px; font-weight: 500; color: #4a4a4a; margin: 24px 0 12px; }

/* ========== 预览区 ========== */
.doc-preview { border: 1px solid #e4e4e7; border-radius: 10px; overflow: hidden; background: #fff; }
.doc-preview__body { display: flex; flex-wrap: wrap; gap: 16px; padding: 20px; }
.doc-code { border-top: 1px solid #e4e4e7; background: #fafbfc; padding: 12px 16px;
  pre { margin: 0; }
  code { font-family: 'SF Mono', Consolas, monospace; font-size: 13px; color: #4a4a4a; }
}

/* ========== 表格 ========== */
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e4e4e7; }
  th { background: #fafbfc; font-weight: 500; color: #1a1a1a; }
  td { color: #4a4a4a; }
  code { background: #f4f5f7; color: #3b82f6; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
}

/* ========== 签名演示区 ========== */
.sig-demo {
  width: 100%;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;

  &--dark {
    background: #0f172a;
    border-color: #1e293b;
  }
}

.sig-actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e4e4e7;
}

.sig-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  background: #fff;
  color: #6b7280;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { border-color: #4f6ef7; color: #4f6ef7; }

  &--primary {
    background: #4f6ef7;
    border-color: #4f6ef7;
    color: #fff;

    &:hover { background: #3b57d4; border-color: #3b57d4; color: #fff; }
  }
}

/* ========== 签名预览 ========== */
.sig-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
}

.sig-preview__img {
  max-width: 400px;
  border: 1px dashed #e4e4e7;
  border-radius: 8px;
  background: #fafafa;
  padding: 8px;
}

.sig-preview__size {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}
</style>
