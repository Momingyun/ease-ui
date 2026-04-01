<template>
  <div class="grid-doc">
    <div class="doc-header">
      <h1 class="doc-title">栅格布局 Grid</h1>
      <p class="doc-desc">通过基础的 24 分栏，迅速简便地创建布局。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">使用 <code>XlyRow</code> 和 <code>XlyCol</code> 组件创建栅格布局，通过 <code>span</code> 属性设置分栏数。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlyRow>
            <XlyCol :span="24"><div class="grid-content bg-purple-dark"></div></XlyCol>
          </XlyRow>
          <XlyRow>
            <XlyCol :span="12"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="12"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow>
            <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
          <XlyRow>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow>
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow&gt;
  &lt;XlyCol :span="24"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
&lt;/XlyRow&gt;
&lt;XlyRow&gt;
  &lt;XlyCol :span="12"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="12"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 分栏间隔 -->
    <section class="doc-section">
      <h2 class="doc-section__title">分栏间隔</h2>
      <p class="doc-section__desc">通过 <code>gutter</code> 属性设置分栏之间的间隔（单位 px）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyRow :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow :gutter="20"&gt;
  &lt;XlyCol :span="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 混合布局 -->
    <section class="doc-section">
      <h2 class="doc-section__title">混合布局</h2>
      <p class="doc-section__desc">通过组合不同的 <code>span</code> 值，创建灵活的混合布局。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlyRow :gutter="20">
            <XlyCol :span="16"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow :gutter="20">
            <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow :gutter="20">
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="16"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow :gutter="20"&gt;
  &lt;XlyCol :span="16"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="8"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 分栏偏移 -->
    <section class="doc-section">
      <h2 class="doc-section__title">分栏偏移</h2>
      <p class="doc-section__desc">通过 <code>offset</code> 属性设置分栏的偏移量。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlyRow :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow :gutter="20">
            <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          </XlyRow>
          <XlyRow :gutter="20">
            <XlyCol :span="12" :offset="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow :gutter="20"&gt;
  &lt;XlyCol :span="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
  &lt;XlyCol :span="6" :offset="6"&gt;&lt;div class="content"&gt;&lt;/div&gt;&lt;/XlyCol&gt;
&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 对齐方式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">对齐方式</h2>
      <p class="doc-section__desc">通过 <code>justify</code> 属性设置子元素的水平排列方式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlyRow justify="center" :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
          <XlyRow justify="end" :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
          <XlyRow justify="space-between" :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
          <XlyRow justify="space-around" :gutter="20">
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
            <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow justify="center" :gutter="20"&gt;...&lt;/XlyRow&gt;
&lt;XlyRow justify="end" :gutter="20"&gt;...&lt;/XlyRow&gt;
&lt;XlyRow justify="space-between" :gutter="20"&gt;...&lt;/XlyRow&gt;
&lt;XlyRow justify="space-around" :gutter="20"&gt;...&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 响应式布局 -->
    <section class="doc-section">
      <h2 class="doc-section__title">响应式布局</h2>
      <p class="doc-section__desc">参照 Bootstrap 的响应式设计，预设六个响应尺寸：xs、sm、md、lg、xl。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyRow :gutter="10">
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple"></div>
            </XlyCol>
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple-light"></div>
            </XlyCol>
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple"></div>
            </XlyCol>
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple-light"></div>
            </XlyCol>
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple"></div>
            </XlyCol>
            <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple-light"></div>
            </XlyCol>
          </XlyRow>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRow :gutter="10"&gt;
  &lt;XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4"&gt;
    &lt;div class="content"&gt;&lt;/div&gt;
  &lt;/XlyCol&gt;
&lt;/XlyRow&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Row Attributes</h3>
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
              <td>gutter</td>
              <td>栅格间隔</td>
              <td>number</td>
              <td>—</td>
              <td>0</td>
            </tr>
            <tr>
              <td>justify</td>
              <td>水平排列方式</td>
              <td>string</td>
              <td>start / end / center / space-between / space-around</td>
              <td>start</td>
            </tr>
            <tr>
              <td>align</td>
              <td>垂直排列方式</td>
              <td>string</td>
              <td>top / middle / bottom</td>
              <td>top</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Col Attributes</h3>
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
              <td>span</td>
              <td>栅格占据的列数</td>
              <td>number</td>
              <td>1-24</td>
              <td>24</td>
            </tr>
            <tr>
              <td>offset</td>
              <td>栅格左侧的间隔格数</td>
              <td>number</td>
              <td>0-24</td>
              <td>0</td>
            </tr>
            <tr>
              <td>xs</td>
              <td>&lt;768px 响应式栅格数</td>
              <td>number</td>
              <td>1-24</td>
              <td>—</td>
            </tr>
            <tr>
              <td>sm</td>
              <td>≥768px 响应式栅格数</td>
              <td>number</td>
              <td>1-24</td>
              <td>—</td>
            </tr>
            <tr>
              <td>md</td>
              <td>≥992px 响应式栅格数</td>
              <td>number</td>
              <td>1-24</td>
              <td>—</td>
            </tr>
            <tr>
              <td>lg</td>
              <td>≥1200px 响应式栅格数</td>
              <td>number</td>
              <td>1-24</td>
              <td>—</td>
            </tr>
            <tr>
              <td>xl</td>
              <td>≥1920px 响应式栅格数</td>
              <td>number</td>
              <td>1-24</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyRow from '@/components/xly-row/index.vue'
import XlyCol from '@/components/xly-col/index.vue'
</script>

<style scoped lang="scss">
.grid-doc {
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
}

.bg-purple-dark {
  background-color: #99a9bf;
}

.bg-purple {
  background-color: #7e57c2;
}

.bg-purple-light {
  background-color: #b39ddb;
}

:deep(.xly-row) {
  width: 100%;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
