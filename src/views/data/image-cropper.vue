<template>
  <div class="cropper-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">ImageCropper 图片裁剪器</h1>
      <p class="doc-desc">
        基于 <code>Cropper.js</code> 封装的图片裁剪组件，支持自由裁剪、固定比例、旋转、翻转、缩放，可导出裁剪后的
        Canvas / Base64 / Blob。
      </p>
      <div class="doc-requires">
        <span class="doc-requires__label">依赖安装</span>
        <code class="doc-requires__cmd">pnpm add cropperjs</code>
      </div>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>src</code> 显示图片，调用 <code>crop()</code> 或点击确认按钮获取裁剪结果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="cropper-demo-wrapper">
            <XlyImageCropper
              ref="cropperRef"
              :src="basicSrc"
              toolbar
              show-action
              @confirm="onBasicConfirm"
              @cancel="onBasicCancel"
            />
          </div>
          <div v-if="basicResult" class="cropper-result">
            <span>裁剪结果：</span>
            <img :src="basicResult" alt="cropped" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>const cropperRef = ref()

// 通过 ref 获取结果
async function getCrop() {
  const dataURL = cropperRef.value.getCroppedDataURL()
  console.log(dataURL)
}

// 通过事件获取结果
function onConfirm(data) {
  console.log(data.dataURL)
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 固定比例裁剪 -->
    <section class="doc-section">
      <h2 class="doc-section__title">固定比例裁剪</h2>
      <p class="doc-section__desc">
        通过 <code>aspect-ratio</code> 设置裁剪框宽高比。<code>1</code> 为正方形，
        <code>16/9</code> 为 16:9 横版，<code>9/16</code> 为竖版。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body cropper-ratio-group">
          <div class="cropper-ratio-item">
            <XlyImageCropper
              :src="basicSrc"
              :aspect-ratio="1"
              :toolbar="false"
              :show-action="false"
            />
            <span>1:1 正方形</span>
          </div>
          <div class="cropper-ratio-item">
            <XlyImageCropper
              :src="basicSrc"
              :aspect-ratio="16 / 9"
              :toolbar="false"
              :show-action="false"
            />
            <span>16:9 横版</span>
          </div>
          <div class="cropper-ratio-item">
            <XlyImageCropper
              :src="basicSrc"
              :aspect-ratio="9 / 16"
              :toolbar="false"
              :show-action="false"
            />
            <span>9:16 竖版</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImageCropper :src="imgSrc" :aspect-ratio="1" /&gt;
&lt;XlyImageCropper :src="imgSrc" :aspect-ratio="16/9" /&gt;
&lt;XlyImageCropper :src="imgSrc" :aspect-ratio="9/16" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 隐藏工具栏 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏工具栏</h2>
      <p class="doc-section__desc">
        设置 <code>toolbar</code> 和 <code>show-action</code> 为 <code>false</code> 隐藏操作区，通过
        <code>ref</code> 调用方法自行控制。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="cropper-no-toolbar">
            <XlyImageCropper
              ref="noToolbarRef"
              :src="basicSrc"
              :toolbar="false"
              :show-action="false"
            />
            <div class="cropper-no-toolbar__btns">
              <XlyButton size="small" @click="noToolbarRotate">旋转90°</XlyButton>
              <XlyButton size="small" @click="noToolbarReset">重置</XlyButton>
              <XlyButton size="small" type="primary" @click="noToolbarCrop">获取裁剪</XlyButton>
            </div>
          </div>
          <div v-if="noToolbarResult" class="cropper-result">
            <img :src="noToolbarResult" alt="cropped" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImageCropper
  ref="cropperRef"
  :src="imgSrc"
  :toolbar="false"
  :show-action="false"
/&gt;

// 旋转
cropperRef.value.rotate(90)

// 重置
cropperRef.value.reset()

// 获取裁剪结果
const dataURL = cropperRef.value.getCroppedDataURL()
const blob = await cropperRef.value.getCroppedBlob()</code></pre>
        </div>
      </div>
    </section>

    <!-- 交互式演示 -->
    <section class="doc-section">
      <h2 class="doc-section__title">完整交互演示</h2>
      <p class="doc-section__desc">
        实时选择图片上传，体验完整裁剪流程。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="cropper-interact">
            <div class="cropper-interact__uploader" @click="triggerUpload">
              <img v-if="interactSrc" :src="interactSrc" class="cropper-interact__preview" />
              <div v-else class="cropper-interact__upload">
                <span>+ 选择图片</span>
              </div>
            </div>
            <input
              ref="uploadInputRef"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFileChange"
            />
            <div v-if="interactSrc" class="cropper-interact__cropper">
              <XlyImageCropper
                ref="interactRef"
                :src="interactSrc"
                toolbar
                show-action
                :output-quality="0.9"
                output-type="png"
                @confirm="onInteractConfirm"
              />
            </div>
          </div>
          <div v-if="interactResult" class="cropper-result">
            <span>裁剪结果：</span>
            <img :src="interactResult" alt="cropped" />
            <span class="cropper-result__size">{{ interactResultSize }}</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>// 上传图片
function triggerUpload() {
  uploadInputRef.value.click()
}

function onFileChange(e) {
  const file = e.target.files[0]
  interactSrc.value = URL.createObjectURL(file)
}

// 确认裁剪
async function onConfirm(data) {
  interactResult.value = data.dataURL
  const blob = await cropperRef.value.getCroppedBlob()
  console.log(blob.size, 'bytes')
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
              <td><code>src</code></td>
              <td>图片地址</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>alt</code></td>
              <td>图片 alt 属性</td>
              <td><code>string</code></td>
              <td><code>'cropper'</code></td>
            </tr>
            <tr>
              <td><code>toolbar</code></td>
              <td>是否显示工具栏</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-action</code></td>
              <td>是否显示底部操作按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>aspect-ratio</code></td>
              <td>裁剪框宽高比（如 1、16/9、9/16）</td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
            </tr>
            <tr>
              <td><code>auto-crop-area</code></td>
              <td>初始裁剪区域大小，0-1</td>
              <td><code>number</code></td>
              <td><code>0.8</code></td>
            </tr>
            <tr>
              <td><code>view-mode</code></td>
              <td>视图模式（0自由 1限制 2限制画布 3两边限制）</td>
              <td><code>0 | 1 | 2 | 3</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>drag-mode</code></td>
              <td>默认拖拽模式</td>
              <td><code>'crop' | 'move' | 'none'</code></td>
              <td><code>'crop'</code></td>
            </tr>
            <tr>
              <td><code>output-type</code></td>
              <td>输出格式</td>
              <td><code>'jpeg' | 'png' | 'webp'</code></td>
              <td><code>'png'</code></td>
            </tr>
            <tr>
              <td><code>output-quality</code></td>
              <td>输出质量，0-1</td>
              <td><code>number</code></td>
              <td><code>0.9</code></td>
            </tr>
            <tr>
              <td><code>output-width</code></td>
              <td>输出宽度（限制最大宽度）</td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
            </tr>
            <tr>
              <td><code>output-height</code></td>
              <td>输出高度（限制最大高度）</td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
            </tr>
            <tr>
              <td><code>guides</code></td>
              <td>显示裁剪引导线</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>center</code></td>
              <td>显示中心指示线</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>high</code></td>
              <td>启用高质量模式</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
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
              <th>返回值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>crop()</code></td>
              <td>执行裁剪，返回裁剪数据</td>
              <td><code>CropData | null</code></td>
            </tr>
            <tr>
              <td><code>getCroppedCanvas()</code></td>
              <td>获取裁剪后的 Canvas 元素</td>
              <td><code>HTMLCanvasElement | null</code></td>
            </tr>
            <tr>
              <td><code>getCroppedBlob()</code></td>
              <td>获取裁剪后的 Blob 对象</td>
              <td><code>Promise&lt;Blob | null&gt;</code></td>
            </tr>
            <tr>
              <td><code>getCroppedDataURL()</code></td>
              <td>获取裁剪后的 Base64 字符串</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>reset()</code></td>
              <td>重置到初始状态</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rotate(degree)</code></td>
              <td>旋转指定角度</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>zoom(ratio)</code></td>
              <td>缩放（正数放大，负数缩小）</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>scaleX()</code></td>
              <td>左右翻转</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>scaleY()</code></td>
              <td>上下翻转</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>setDragMode(mode)</code></td>
              <td>设置拖拽模式</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>replace(url)</code></td>
              <td>替换图片</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>destroy()</code></td>
              <td>销毁裁剪器实例</td>
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
              <td><code>cropped</code></td>
              <td>裁剪完成时触发（手动或确认按钮）</td>
              <td><code>(data: CropData) =&gt; void</code></td>
            </tr>
            <tr>
              <td><code>confirm</code></td>
              <td>点击确认按钮时触发</td>
              <td><code>(data: CropData) =&gt; void</code></td>
            </tr>
            <tr>
              <td><code>cancel</code></td>
              <td>点击取消按钮时触发</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>ready</code></td>
              <td>裁剪器初始化完成时触发</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>destroyed</code></td>
              <td>裁剪器销毁时触发</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import XlyImageCropper from '@/components/xly-image-cropper/index.vue'
import XlyButton from '@/components/xly-button/index.vue'

// 基础示例
const cropperRef = ref<InstanceType<typeof XlyImageCropper>>()
const basicSrc = 'https://picsum.photos/seed/cropper/800/600'
const basicResult = ref('')

function onBasicConfirm(data: { dataURL: string }) {
  basicResult.value = data.dataURL
  ElMessage.success('裁剪成功')
}

function onBasicCancel() {
  ElMessage.info('已取消')
}

// 固定比例示例
// 使用同 basicSrc

// 隐藏工具栏示例
const noToolbarRef = ref<InstanceType<typeof XlyImageCropper>>()
const noToolbarResult = ref('')

function noToolbarRotate() {
  noToolbarRef.value?.rotate(90)
}

function noToolbarReset() {
  noToolbarRef.value?.reset()
}

async function noToolbarCrop() {
  const result = noToolbarRef.value?.getCroppedDataURL()
  if (result) {
    noToolbarResult.value = result
    ElMessage.success('已获取裁剪结果')
  }
}

// 交互式演示
const uploadInputRef = ref<HTMLInputElement | null>(null)
const interactRef = ref<InstanceType<typeof XlyImageCropper>>()
const interactSrc = ref('')
const interactResult = ref('')
const interactResultSize = ref('')

function triggerUpload() {
  uploadInputRef.value?.click()
}

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    interactSrc.value = URL.createObjectURL(file)
    interactResult.value = ''
  }
}

async function onInteractConfirm(data: { dataURL: string; blob: Blob | null }) {
  interactResult.value = data.dataURL
  if (data.blob) {
    interactResultSize.value = `${(data.blob.size / 1024).toFixed(1)} KB`
  }
  ElMessage.success('裁剪成功')
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

/* ========== 组件演示区 ========== */
.cropper-demo-wrapper {
  width: 100%;
  max-width: 500px;
}

.cropper-ratio-group {
  flex-direction: row !important;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
}

.cropper-ratio-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 200px;

  :deep(.xly-image-cropper__view) {
    height: 200px;
  }

  span {
    font-size: 13px;
    color: #6b7280;
  }
}

/* ========== 无工具栏示例 ========== */
.cropper-no-toolbar {
  width: 100%;
  max-width: 400px;

  &__btns {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    justify-content: center;
  }
}

/* ========== 交互式演示 ========== */
.cropper-interact {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 700px;
  flex-wrap: wrap;
  justify-content: center;

  &__uploader {
    width: 120px;
    height: 120px;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: border-color 0.2s;
    flex-shrink: 0;

    &:hover {
      border-color: #4f6ef7;
    }
  }

  &__preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #999;
    font-size: 12px;
  }

  &__cropper {
    flex: 1;
    min-width: 280px;
    max-width: 500px;
  }
}

/* ========== 裁剪结果 ========== */
.cropper-result {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;

  img {
    max-height: 60px;
    max-width: 150px;
    border: 1px solid #e2e4ed;
    border-radius: 4px;
  }

  &__size {
    color: #34c759;
    font-size: 12px;
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
