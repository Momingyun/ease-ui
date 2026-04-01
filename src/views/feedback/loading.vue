<template>
  <div class="loading-doc">
    <div class="doc-header">
      <h1 class="doc-title">加载 Loading</h1>
      <p class="doc-desc">用于页面和区块的加载中状态，支持多种动画类型和自定义配置。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>v-model</code> 控制加载显示，支持多种动画类型。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="loading-types">
            <div 
              v-for="type in loadingTypes" 
              :key="type.value"
              class="type-item"
              :class="{ 'is-active': currentType === type.value }"
              @click="currentType = type.value"
            >
              <XlyLoading :model-value="true" :type="type.value" :mask="false" size="large" />
              <span class="type-label">{{ type.label }}</span>
            </div>
          </div>
          <div class="demo-actions">
            <button class="demo-btn demo-btn--primary" @click="showLoading">
              显示 {{ currentType }} 加载
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading v-model="loading" type="spinner" text="加载中..." /&gt;

&lt;!-- 不同动画类型 --&gt;
&lt;XlyLoading type="spinner" /&gt;  &lt;!-- 旋转点 --&gt;
&lt;XlyLoading type="wave" /&gt;     &lt;!-- 波浪 --&gt;
&lt;XlyLoading type="pulse" /&gt;    &lt;!-- 脉冲 --&gt;
&lt;XlyLoading type="ring" /&gt;     &lt;!-- 环形 --&gt;
&lt;XlyLoading type="default" /&gt;  &lt;!-- 双点 --&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带文本 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带文本提示</h2>
      <p class="doc-section__desc">通过 <code>text</code> 属性添加加载提示文字。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="loading-texts">
            <div class="text-item">
              <XlyLoading :model-value="true" type="spinner" text="正在加载..." :mask="false" />
            </div>
            <div class="text-item">
              <XlyLoading :model-value="true" type="wave" text="数据提交中" :mask="false" />
            </div>
            <div class="text-item">
              <XlyLoading :model-value="true" type="pulse" text="请稍候" :mask="false" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading type="spinner" text="正在加载..." /&gt;
&lt;XlyLoading type="wave" text="数据提交中" /&gt;
&lt;XlyLoading type="pulse" text="请稍候" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置加载大小，支持 small、medium、large 或自定义数值。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="loading-sizes">
            <div class="size-item">
              <XlyLoading :model-value="true" type="spinner" size="small" :mask="false" />
              <span>small (24px)</span>
            </div>
            <div class="size-item">
              <XlyLoading :model-value="true" type="spinner" size="medium" :mask="false" />
              <span>medium (32px)</span>
            </div>
            <div class="size-item">
              <XlyLoading :model-value="true" type="spinner" size="large" :mask="false" />
              <span>large (48px)</span>
            </div>
            <div class="size-item">
              <XlyLoading :model-value="true" type="spinner" :size="64" :mask="false" />
              <span>自定义 (64px)</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading size="small" /&gt;     &lt;!-- 24px --&gt;
&lt;XlyLoading size="medium" /&gt;    &lt;!-- 32px --&gt;
&lt;XlyLoading size="large" /&gt;     &lt;!-- 48px --&gt;
&lt;XlyLoading :size="64" /&gt;       &lt;!-- 自定义 64px --&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">通过 <code>color</code> 和 <code>textColor</code> 属性自定义加载颜色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="loading-colors">
            <div class="color-item">
              <XlyLoading :model-value="true" type="spinner" color="#4f6ef7" text="蓝色" text-color="#4f6ef7" :mask="false" />
            </div>
            <div class="color-item">
              <XlyLoading :model-value="true" type="wave" color="#10b981" text="绿色" text-color="#10b981" :mask="false" />
            </div>
            <div class="color-item">
              <XlyLoading :model-value="true" type="pulse" color="#f59e0b" text="橙色" text-color="#f59e0b" :mask="false" />
            </div>
            <div class="color-item">
              <XlyLoading :model-value="true" type="ring" color="#ec4899" text="粉色" text-color="#ec4899" :mask="false" progress="75" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading color="#4f6ef7" text-color="#4f6ef7" text="蓝色" /&gt;
&lt;XlyLoading color="#10b981" text-color="#10b981" text="绿色" /&gt;
&lt;XlyLoading color="#f59e0b" text-color="#f59e0b" text="橙色" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 环形进度 -->
    <section class="doc-section">
      <h2 class="doc-section__title">环形进度</h2>
      <p class="doc-section__desc">使用 <code>type="ring"</code> 显示环形进度，通过 <code>progress</code> 属性控制进度（0-100）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="ring-progress-demo">
            <XlyLoading :model-value="true" type="ring" :progress="ringProgress" :mask="false" size="large" text="上传中..." />
            <div class="progress-control">
              <span>进度: {{ ringProgress }}%</span>
              <input v-model.number="ringProgress" type="range" min="0" max="100" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading type="ring" :progress="75" text="上传中..." /&gt;

&lt;!-- 动态进度 --&gt;
&lt;XlyLoading type="ring" :progress="uploadProgress" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 全屏加载 -->
    <section class="doc-section">
      <h2 class="doc-section__title">全屏加载</h2>
      <p class="doc-section__desc">设置 <code>fullscreen</code> 为 true 可显示全屏加载，常用于页面初始化或全局操作。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <button class="demo-btn demo-btn--primary" @click="showFullscreenLoading">
            显示全屏加载 (2秒后关闭)
          </button>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyLoading v-model="fullscreenLoading" fullscreen text="页面加载中..." /&gt;

&lt;!-- 锁定滚动 --&gt;
&lt;XlyLoading v-model="loading" fullscreen lock text="处理中..." /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 容器内加载 -->
    <section class="doc-section">
      <h2 class="doc-section__title">容器内加载</h2>
      <p class="doc-section__desc">设置 <code>containerFullscreen</code> 可在父容器内显示全屏加载，适用于表格、卡片等局部区域。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="container-demo">
            <div class="demo-box">
              <h4>数据列表</h4>
              <ul>
                <li>数据项 1</li>
                <li>数据项 2</li>
                <li>数据项 3</li>
              </ul>
              <XlyLoading 
                v-model="containerLoading" 
                containerFullscreen 
                text="数据加载中..."
                type="wave"
              />
            </div>
            <button class="demo-btn" @click="toggleContainerLoading">
              {{ containerLoading ? '关闭' : '显示' }}容器加载
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;div class="data-container" style="position: relative;"&gt;
  &lt;!-- 数据内容 --&gt;
  &lt;XlyLoading 
    v-model="loading" 
    containerFullscreen 
    text="数据加载中..."
  /&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 全局 API 调用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">命令式调用</h2>
      <p class="doc-section__desc">通过 <code>xly.$loading</code> 在任意位置调用，无需在模板中写组件。统一入口：<code>import { xly } from '@/utils/xly'</code></p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="api-demo-section">
            <h4>全屏加载</h4>
            <div class="demo-actions">
              <button class="demo-btn demo-btn--primary" @click="showApiFullscreenLoading">
                xly.$loading.open()
              </button>
              <button class="demo-btn" @click="showQuickFullscreen">
                xly.$loading.fullscreen()
              </button>
            </div>
          </div>
          
          <div class="api-demo-section">
            <h4>容器内加载</h4>
            <div class="api-container-box">
              <h5>数据列表</h5>
              <ul>
                <li>数据项 1</li>
                <li>数据项 2</li>
                <li>数据项 3</li>
              </ul>
            </div>
            <div class="demo-actions">
              <button class="demo-btn demo-btn--primary" @click="showApiContainerLoading">
                xly.$loading.open({ target })
              </button>
              <button class="demo-btn" @click="showQuickContainer">
                xly.$loading.container()
              </button>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>import { xly } from '@/utils/xly'

// 全屏加载
const loading = xly.$loading.open({ text: '加载中...' })
loading.close()

// 容器内加载（传入选择器或 HTMLElement）
const loading = xly.$loading.open({
  target: '.my-container',
  text: '数据加载中...',
  type: 'wave'
})

// 快捷方法
xly.$loading.fullscreen('加载中...')
xly.$loading.container('.my-container')

// 动态更新
loading.setProgress(50)
loading.setText('处理中...')</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>
      
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
              <td>v-model / modelValue</td>
              <td>是否显示加载</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>type</td>
              <td>加载动画类型</td>
              <td>string</td>
              <td>spinner / wave / pulse / ring / default</td>
              <td>spinner</td>
            </tr>
            <tr>
              <td>text</td>
              <td>加载提示文本</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>mask</td>
              <td>是否显示遮罩层</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>maskColor</td>
              <td>遮罩层颜色</td>
              <td>string</td>
              <td>—</td>
              <td>rgba(255,255,255,0.3)</td>
            </tr>
            <tr>
              <td>color</td>
              <td>加载动画颜色</td>
              <td>string</td>
              <td>—</td>
              <td>#4f6ef7</td>
            </tr>
            <tr>
              <td>textColor</td>
              <td>文本颜色</td>
              <td>string</td>
              <td>—</td>
              <td>#1f2937</td>
            </tr>
            <tr>
              <td>size</td>
              <td>加载大小</td>
              <td>string / number</td>
              <td>small / medium / large / number</td>
              <td>medium</td>
            </tr>
            <tr>
              <td>fullscreen</td>
              <td>是否全屏显示</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>containerFullscreen</td>
              <td>是否容器内全屏</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>lock</td>
              <td>是否锁定滚动（fullscreen时有效）</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>progress</td>
              <td>环形进度值（type=ring时有效）</td>
              <td>number</td>
              <td>0-100</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">命令式 API (xly.$loading)</h3>
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
              <td>open</td>
              <td>打开 Loading</td>
              <td>LoadingOptions | string</td>
              <td>LoadingInstance</td>
            </tr>
            <tr>
              <td>close</td>
              <td>关闭指定目标的 Loading</td>
              <td>target?: string | HTMLElement</td>
              <td>—</td>
            </tr>
            <tr>
              <td>closeAll</td>
              <td>关闭所有 Loading</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>fullscreen</td>
              <td>快捷方法：全屏加载</td>
              <td>text?: string</td>
              <td>LoadingInstance</td>
            </tr>
            <tr>
              <td>container</td>
              <td>快捷方法：容器内加载</td>
              <td>target: string | HTMLElement, text?: string</td>
              <td>LoadingInstance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">LoadingInstance 方法</h3>
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
              <td>close</td>
              <td>关闭当前 Loading</td>
              <td>—</td>
            </tr>
            <tr>
              <td>setProgress</td>
              <td>设置进度（ring 类型）</td>
              <td>progress: number (0-100)</td>
            </tr>
            <tr>
              <td>setText</td>
              <td>更新加载文本</td>
              <td>text: string</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">组件 Methods</h3>
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
              <td>show</td>
              <td>显示加载</td>
              <td>—</td>
            </tr>
            <tr>
              <td>hide</td>
              <td>隐藏加载</td>
              <td>—</td>
            </tr>
            <tr>
              <td>toggle</td>
              <td>切换加载显示状态</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 全屏加载演示 -->
    <XlyLoading 
      v-model="fullscreenLoading" 
      fullscreen 
      :type="currentType"
      text="页面加载中..."
    />

    <!-- 基础加载演示 -->
    <XlyLoading 
      v-model="basicLoading" 
      :type="currentType"
      text="加载中..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyLoading from '@/components/xly-loading/index.vue'
import { xly } from '@/utils/xly'
import type { LoadingInstance } from '@/components/xly-loading'

const loadingTypes = [
  { value: 'spinner' as const, label: '旋转点' },
  { value: 'wave' as const, label: '波浪' },
  { value: 'pulse' as const, label: '脉冲' },
  { value: 'ring' as const, label: '环形' },
  { value: 'default' as const, label: '双点' },
]

const currentType = ref('spinner')
const basicLoading = ref(false)
const fullscreenLoading = ref(false)
const containerLoading = ref(false)
const ringProgress = ref(75)

// 全局 API 示例
let apiLoading: LoadingInstance | null = null
let containerApiLoading: LoadingInstance | null = null

function showLoading() {
  basicLoading.value = true
  setTimeout(() => {
    basicLoading.value = false
  }, 2000)
}

function showFullscreenLoading() {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}

function toggleContainerLoading() {
  containerLoading.value = !containerLoading.value
}

// 使用全局 API 显示全屏加载
function showApiFullscreenLoading() {
  apiLoading = xly.$loading.open({
    type: currentType.value,
    text: '全局 API 加载中...'
  })
  
  setTimeout(() => {
    apiLoading?.close()
  }, 2000)
}

// 使用全局 API 显示容器内加载
function showApiContainerLoading() {
  containerApiLoading = xly.$loading.open({
    target: '.api-container-box',
    type: 'wave',
    text: '数据加载中...'
  })
  
  setTimeout(() => {
    containerApiLoading?.close()
  }, 2000)
}

// 使用快捷方法
function showQuickFullscreen() {
  const loading = xly.$loading.fullscreen('快捷全屏加载...')
  setTimeout(() => loading.close(), 2000)
}

function showQuickContainer() {
  const loading = xly.$loading.container('.api-container-box', '快捷容器加载...')
  setTimeout(() => loading.close(), 2000)
}
</script>

<style scoped lang="scss">
.loading-doc {
  padding: 8px 0 40px;
}

.doc-header { margin-bottom: 36px; }
.doc-title {
  font-size: 26px; font-weight: 700; color: #1a1a2e;
  margin: 0 0 8px; letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6;
}

.doc-section { margin-bottom: 32px; }
.doc-section__title {
  font-size: 18px; font-weight: 600; color: #1a1a2e;
  margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7;
}
.doc-section__desc {
  font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6;
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7; border-radius: 12px;
  overflow: hidden; background: #fff;
}
.doc-preview__body {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 12px; padding: 24px;
}
.doc-preview__body--column {
  flex-direction: column;
  align-items: stretch;
}
.doc-code {
  border-top: 1px solid #f2f3f7; background: #fafbfd;
  padding: 16px 20px; overflow-x: auto;
  pre { margin: 0; padding: 0; }
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre;
  }
}

.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; }
  td { color: #4a4a6a; }
}

// 加载类型选择
.loading-types {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }
  
  &.is-active {
    border-color: #4f6ef7;
    background: #f5f6ff;
  }
}

.type-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

// 带文本示例
.loading-texts {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}

.text-item {
  display: flex;
  align-items: center;
}

// 尺寸示例
.loading-sizes {
  display: flex;
  gap: 48px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
}

// 颜色示例
.loading-colors {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}

.color-item {
  display: flex;
  align-items: center;
}

// 环形进度
.ring-progress-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
}

.progress-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  span {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }
  
  input[type="range"] {
    width: 200px;
  }
}

// API 演示
.api-demo-section {
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h4 {
    margin: 0 0 12px;
    font-size: 14px;
    color: #374151;
    font-weight: 600;
  }
}

.api-container-box {
  position: relative;
  width: 300px;
  height: 150px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  margin-bottom: 12px;
  
  h5 {
    margin: 0 0 12px;
    font-size: 14px;
    color: #111827;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: #6b7280;
    font-size: 13px;
    
    li {
      margin-bottom: 6px;
    }
  }
}

.container-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.demo-box {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  
  h4 {
    margin: 0 0 12px;
    font-size: 16px;
    color: #111827;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: #6b7280;
    
    li {
      margin-bottom: 8px;
    }
  }
}

// 按钮样式
.demo-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
}

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
