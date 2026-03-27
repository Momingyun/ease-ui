<template>
  <div class="progress-doc">
    <div class="doc-header">
      <h1 class="doc-title">进度条 Progress</h1>
      <p class="doc-desc">用于展示操作当前进度，支持线性、圆形、仪表盘等多种样式和状态。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过 <code>percentage</code> 属性设置进度百分比（0-100）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>0%</label>
            <XlyProgress :percentage="0" />
          </div>
          <div class="progress-demo">
            <label>30%</label>
            <XlyProgress :percentage="30" />
          </div>
          <div class="progress-demo">
            <label>70%</label>
            <XlyProgress :percentage="70" />
          </div>
          <div class="progress-demo">
            <label>100%</label>
            <XlyProgress :percentage="100" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress :percentage="0" /&gt;
&lt;XlyProgress :percentage="30" /&gt;
&lt;XlyProgress :percentage="70" /&gt;
&lt;XlyProgress :percentage="100" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不确定进度 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不确定进度</h2>
      <p class="doc-section__desc">
        设置 <code>indeterminate</code> 为 true，显示动画效果，用于加载中状态。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyProgress :percentage="0" indeterminate text="加载中..." />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress :percentage="0" indeterminate text="加载中..." /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同状态</h2>
      <p class="doc-section__desc">
        通过 <code>status</code> 属性设置进度条状态，包含 normal、success、exception、warning、active。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>normal</label>
            <XlyProgress :percentage="50" status="normal" />
          </div>
          <div class="progress-demo">
            <label>success</label>
            <XlyProgress :percentage="100" status="success" />
          </div>
          <div class="progress-demo">
            <label>exception</label>
            <XlyProgress :percentage="60" status="exception" />
          </div>
          <div class="progress-demo">
            <label>warning</label>
            <XlyProgress :percentage="80" status="warning" />
          </div>
          <div class="progress-demo">
            <label>active</label>
            <XlyProgress :percentage="40" status="active" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress :percentage="50" status="normal" /&gt;
&lt;XlyProgress :percentage="100" status="success" /&gt;
&lt;XlyProgress :percentage="60" status="exception" /&gt;
&lt;XlyProgress :percentage="80" status="warning" /&gt;
&lt;XlyProgress :percentage="40" status="active" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">
        通过 <code>color</code> 属性自定义进度条颜色，支持固定颜色或动态颜色函数。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>固定颜色</label>
            <XlyProgress :percentage="60" color="#4f6ef7" />
          </div>
          <div class="progress-demo">
            <label>自定义颜色</label>
            <XlyProgress :percentage="70" color="#10b981" />
          </div>
          <div class="progress-demo">
            <label>动态颜色</label>
            <XlyProgress :percentage="80" :color="dynamicColor" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 固定颜色 --&gt;
&lt;XlyProgress :percentage="60" color="#4f6ef7" /&gt;

&lt;!-- 动态颜色函数 --&gt;
&lt;script setup&gt;
const dynamicColor = (percentage) =&gt; {
  if (percentage &lt; 30) return '#f56c6c'
  if (percentage &lt; 70) return '#e6a23c'
  return '#67c23a'
}
&lt;/script&gt;
&lt;XlyProgress :percentage="80" :color="dynamicColor" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义文本 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义文本</h2>
      <p class="doc-section__desc">
        通过 <code>text</code> 属性自定义进度文本，设置 <code>showInfo</code> 为 false 隐藏文本。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>自定义文本</label>
            <XlyProgress :percentage="60" text="上传中..." />
          </div>
          <div class="progress-demo">
            <label>详细文本</label>
            <XlyProgress :percentage="85" text="85/100 已完成" />
          </div>
          <div class="progress-demo">
            <label>隐藏文本</label>
            <XlyProgress :percentage="45" :showInfo="false" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 自定义文本 --&gt;
&lt;XlyProgress :percentage="60" text="上传中..." /&gt;
&lt;XlyProgress :percentage="85" text="85/100 已完成" /&gt;

&lt;!-- 隐藏文本 --&gt;
&lt;XlyProgress :percentage="45" :showInfo="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 调整轨道高度 -->
    <section class="doc-section">
      <h2 class="doc-section__title">调整轨道高度</h2>
      <p class="doc-section__desc">
        通过 <code>strokeWidth</code> 属性调整轨道高度（单位 px）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>4px</label>
            <XlyProgress :percentage="60" :strokeWidth="4" />
          </div>
          <div class="progress-demo">
            <label>8px</label>
            <XlyProgress :percentage="60" :strokeWidth="8" />
          </div>
          <div class="progress-demo">
            <label>12px</label>
            <XlyProgress :percentage="60" :strokeWidth="12" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress :percentage="60" :strokeWidth="4" /&gt;
&lt;XlyProgress :percentage="60" :strokeWidth="8" /&gt;
&lt;XlyProgress :percentage="60" :strokeWidth="12" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 圆形进度条 -->
    <section class="doc-section">
      <h2 class="doc-section__title">圆形进度条</h2>
      <p class="doc-section__desc">
        设置 <code>type="circle"</code> 显示圆形进度条，通过 <code>circleSize</code> 调整尺寸。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="circle-demo">
            <div class="circle-item">
              <XlyProgress type="circle" :percentage="70" :circleSize="120" />
              <span>70%</span>
            </div>
            <div class="circle-item">
              <XlyProgress type="circle" :percentage="90" status="success" :circleSize="120" />
              <span>90%</span>
            </div>
            <div class="circle-item">
              <XlyProgress type="circle" :percentage="50" status="exception" :circleSize="120" />
              <span>50%</span>
            </div>
            <div class="circle-item">
              <XlyProgress type="circle" :percentage="100" :circleSize="80" text="Done" />
              <span>自定义文本</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress type="circle" :percentage="70" /&gt;
&lt;XlyProgress type="circle" :percentage="90" status="success" /&gt;
&lt;XlyProgress type="circle" :percentage="50" status="exception" /&gt;
&lt;XlyProgress type="circle" :percentage="100" :circleSize="80" text="Done" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 仪表盘进度条 -->
    <section class="doc-section">
      <h2 class="doc-section__title">仪表盘进度条</h2>
      <p class="doc-section__desc">
        设置 <code>type="dashboard"</code> 显示仪表盘进度条，适用于展示评分、性能指标等。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="dashboard-demo">
            <div class="dashboard-item">
              <XlyProgress type="dashboard" :percentage="75" :circleSize="120" />
              <span>75%</span>
            </div>
            <div class="dashboard-item">
              <XlyProgress type="dashboard" :percentage="85" status="success" :circleSize="120" />
              <span>85%</span>
            </div>
            <div class="dashboard-item">
              <XlyProgress type="dashboard" :percentage="60" status="warning" :circleSize="120" />
              <span>60%</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyProgress type="dashboard" :percentage="75" /&gt;
&lt;XlyProgress type="dashboard" :percentage="85" status="success" /&gt;
&lt;XlyProgress type="dashboard" :percentage="60" status="warning" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 动态进度演示 -->
    <section class="doc-section">
      <h2 class="doc-section__title">动态进度演示</h2>
      <p class="doc-section__desc">
        实时更新进度的效果演示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="progress-demo">
            <label>上传进度</label>
            <XlyProgress :percentage="uploadProgress" status="active" text="上传中..." />
          </div>
          <div class="progress-control">
            <button class="demo-btn demo-btn--primary" @click="startUpload" :disabled="isUploading">
              {{ isUploading ? '上传中...' : '开始上传' }}
            </button>
            <button class="demo-btn" @click="resetProgress" :disabled="isUploading">
              重置
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;template&gt;
  &lt;XlyProgress :percentage="uploadProgress" status="active" text="上传中..." /&gt;
  &lt;button @click="startUpload"&gt;开始上传&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const uploadProgress = ref(0)
const isUploading = ref(false)
let timer: number | null = null

const startUpload = () =&gt; {
  isUploading.value = true
  uploadProgress.value = 0
  timer = setInterval(() =&gt; {
    if (uploadProgress.value &gt;= 100) {
      clearInterval(timer!)
      isUploading.value = false
    } else {
      uploadProgress.value += 10
    }
  }, 300)
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section doc-section--api">
      <h2 class="doc-section__title doc-section__title--api">API 文档</h2>

      <div class="api-block">
        <h3 class="doc-subtitle">Attributes</h3>
        <div class="doc-table">
          <table>
            <thead>
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>可选值</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>percentage</td>
                <td>进度百分比（0-100）</td>
                <td>number</td>
                <td>—</td>
                <td>0</td>
              </tr>
              <tr>
                <td>indeterminate</td>
                <td>是否为不确定进度（动画效果）</td>
                <td>boolean</td>
                <td>—</td>
                <td>false</td>
              </tr>
              <tr>
                <td>status</td>
                <td>进度条状态</td>
                <td>string</td>
                <td>normal / success / exception / warning / active</td>
                <td>normal</td>
              </tr>
              <tr>
                <td>type</td>
                <td>进度条类型</td>
                <td>string</td>
                <td>line / circle / dashboard</td>
                <td>line</td>
              </tr>
              <tr>
                <td>showInfo</td>
                <td>是否显示进度文字</td>
                <td>boolean</td>
                <td>—</td>
                <td>true</td>
              </tr>
              <tr>
                <td>text</td>
                <td>自定义文本</td>
                <td>string</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td>strokeWidth</td>
                <td>轨道高度（line 类型，单位 px）</td>
                <td>number</td>
                <td>—</td>
                <td>6</td>
              </tr>
              <tr>
                <td>color</td>
                <td>进度条颜色</td>
                <td>string / function</td>
                <td>—</td>
                <td>#4f6ef7</td>
              </tr>
              <tr>
                <td>trackColor</td>
                <td>轨道背景色</td>
                <td>string</td>
                <td>—</td>
                <td>#e8e8e8</td>
              </tr>
              <tr>
                <td>circleSize</td>
                <td>圆形进度条尺寸（circle/dashboard 类型，单位 px）</td>
                <td>number</td>
                <td>—</td>
                <td>120</td>
              </tr>
              <tr>
                <td>animated</td>
                <td>是否开启环形进度条动画（circle/dashboard 类型）</td>
                <td>boolean</td>
                <td>—</td>
                <td>true</td>
              </tr>
              <tr>
                <td>customClass</td>
                <td>自定义类名</td>
                <td>string</td>
                <td>—</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="api-block">
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
                <td>change</td>
                <td>进度变化时触发</td>
                <td>(percentage: number)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyProgress from '@/components/xly-progress/index.vue'

const uploadProgress = ref(0)
const isUploading = ref(false)
let timer: number | null = null

// 动态颜色函数
const dynamicColor = (percentage: number) => {
  if (percentage < 30) return '#f56c6c'
  if (percentage < 70) return '#e6a23c'
  return '#67c23a'
}

// 开始上传
function startUpload() {
  if (isUploading.value) return
  isUploading.value = true
  uploadProgress.value = 0

  timer = setInterval(() => {
    if (uploadProgress.value >= 100) {
      clearInterval(timer!)
      isUploading.value = false
    } else {
      uploadProgress.value += Math.floor(Math.random() * 15) + 5
      if (uploadProgress.value > 100) {
        uploadProgress.value = 100
      }
    }
  }, 300) as unknown as number
}

// 重置进度
function resetProgress() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  uploadProgress.value = 0
  isUploading.value = false
}
</script>

<style scoped lang="scss">
.progress-doc {
  padding: 8px 0 40px;
  max-width: 900px;
}

.doc-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.doc-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px;
}

.doc-desc {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.doc-section {
  margin-bottom: 48px;
}

.doc-section__title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.doc-section__title--api {
  font-size: 24px;
  margin-bottom: 24px;
}

.doc-section__desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;

  code {
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', monospace;
    font-size: 13px;
    color: #4f6ef7;
  }
}

.doc-preview {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.doc-preview__body {
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.doc-preview__body--column {
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
}

.doc-code {
  margin-top: 16px;
  background-color: #1f2937;
  border-radius: 12px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    color: #e5e7eb;
    background-color: #1f2937;
  }
}

.doc-table {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #374151;
  }

  td {
    color: #4b5563;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.doc-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 24px 0 16px;
}

.api-block {
  margin-bottom: 32px;
}

// 进度条演示
.progress-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  }
}

.progress-control {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

// 圆形进度条演示
.circle-demo,
.dashboard-demo {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.circle-item,
.dashboard-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  span {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  }
}

// 按钮样式
.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #d1d5db;
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.demo-btn--primary {
  background: #4f6ef7;
  border-color: #4f6ef7;
  color: #fff;

  &:hover:not(:disabled) {
    background: #3d5ce5;
    border-color: #3d5ce5;
  }
}
</style>
