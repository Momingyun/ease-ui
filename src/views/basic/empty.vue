<template>
  <div class="empty-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Empty 空状态</h1>
      <p class="doc-desc">
        当列表数据为空、搜索无结果、无权限等场景下展示的占位插图与提示文字，提升用户体验。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        不传任何属性时，展示默认的空状态插图与"暂无数据"文字。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyEmpty />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyEmpty /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 内置类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">内置类型</h2>
      <p class="doc-section__desc">
        通过 <code>type</code> 属性切换内置插图，涵盖常见的空状态场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-types">
          <div v-for="item in typeList" :key="item.type" class="demo-type-item">
            <XlyEmpty :type="item.type" />
            <div class="demo-type-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyEmpty type="default" /&gt;
&lt;XlyEmpty type="search" /&gt;
&lt;XlyEmpty type="network" /&gt;
&lt;XlyEmpty type="permission" /&gt;
&lt;XlyEmpty type="list" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>size</code> 属性设置组件尺寸，提供 <code>small</code> / <code>default</code> / <code>large</code> 三种预设。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-sizes">
          <div class="demo-size-item">
            <XlyEmpty size="small" description="小尺寸" />
            <div class="demo-type-label">small</div>
          </div>
          <div class="demo-size-item">
            <XlyEmpty description="默认尺寸" />
            <div class="demo-type-label">default</div>
          </div>
          <div class="demo-size-item">
            <XlyEmpty size="large" description="大尺寸" />
            <div class="demo-type-label">large</div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyEmpty size="small" description="小尺寸" /&gt;
&lt;XlyEmpty description="默认尺寸" /&gt;
&lt;XlyEmpty size="large" description="大尺寸" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义描述 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义描述</h2>
      <p class="doc-section__desc">
        通过 <code>description</code> 属性或 <code>#description</code> 插槽自定义描述内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 48px;">
          <XlyEmpty description="暂时没有相关数据，稍后再试" />
          <XlyEmpty type="search">
            <template #description>
              未找到 <strong style="color: #4f6ef7">"{{ keyword }}"</strong> 相关内容
            </template>
          </XlyEmpty>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 属性方式 --&gt;
&lt;XlyEmpty description="暂时没有相关数据，稍后再试" /&gt;

&lt;!-- 插槽方式（支持富文本） --&gt;
&lt;XlyEmpty type="search"&gt;
  &lt;template #description&gt;
    未找到 &lt;strong&gt;"关键词"&lt;/strong&gt; 相关内容
  &lt;/template&gt;
&lt;/XlyEmpty&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 底部操作按钮 -->
    <section class="doc-section">
      <h2 class="doc-section__title">底部操作</h2>
      <p class="doc-section__desc">
        通过 <code>default</code> 默认插槽可在空状态下方放置操作按钮。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 64px;">
          <XlyEmpty description="暂无数据">
            <XlyButton type="primary">立即创建</XlyButton>
          </XlyEmpty>
          <XlyEmpty type="network" description="网络连接异常">
            <XlyButton @click="handleRetry">重新连接</XlyButton>
            <XlyButton type="primary" @click="handleRetry">刷新页面</XlyButton>
          </XlyEmpty>
          <XlyEmpty type="permission" description="暂无权限访问">
            <XlyButton type="primary" @click="handleApply">申请权限</XlyButton>
          </XlyEmpty>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyEmpty description="暂无数据"&gt;
  &lt;XlyButton type="primary"&gt;立即创建&lt;/XlyButton&gt;
&lt;/XlyEmpty&gt;

&lt;XlyEmpty type="network" description="网络连接异常"&gt;
  &lt;XlyButton&gt;重新连接&lt;/XlyButton&gt;
  &lt;XlyButton type="primary"&gt;刷新页面&lt;/XlyButton&gt;
&lt;/XlyEmpty&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义图片 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义图片</h2>
      <p class="doc-section__desc">
        通过 <code>image</code> 属性传入自定义图片地址，或使用 <code>#image</code> 插槽放置任意内容。
        <code>image-size</code> 可控制图片区域宽度。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 64px;">
          <XlyEmpty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            :image-size="120"
            description="使用自定义图片"
          />
          <XlyEmpty description="使用插槽自定义图片区域">
            <template #image>
              <div class="custom-image-slot">
                <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                  <circle cx="40" cy="40" r="38" fill="#eef0f8" stroke="#d0d5e8" stroke-width="2"/>
                  <text x="40" y="52" font-size="30" text-anchor="middle" fill="#c8cde4">📦</text>
                </svg>
              </div>
            </template>
          </XlyEmpty>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 自定义图片地址 --&gt;
&lt;XlyEmpty image="https://..." :image-size="120" description="使用自定义图片" /&gt;

&lt;!-- 插槽方式 --&gt;
&lt;XlyEmpty description="..."&gt;
  &lt;template #image&gt;
    &lt;img src="..." /&gt;
  &lt;/template&gt;
&lt;/XlyEmpty&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">在实际项目中常见的使用场景示例。</p>

      <!-- 表格空状态 -->
      <h3 class="doc-subsection__title">表格空数据</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-table-wrap">
          <table class="demo-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>部门</th>
                <th>职位</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5">
                  <XlyEmpty size="small" description="暂无员工数据">
                    <XlyButton size="small" type="primary">添加员工</XlyButton>
                  </XlyEmpty>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 搜索无结果 -->
      <h3 class="doc-subsection__title">搜索无结果</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-search-result">
          <div class="demo-search-bar">
            <input v-model="keyword" class="demo-input" placeholder="输入搜索关键词..." />
            <XlyButton type="primary" size="small">搜索</XlyButton>
          </div>
          <div v-if="keyword" class="demo-result-body">
            <XlyEmpty type="search">
              <template #description>
                没有找到与 <strong style="color: #4f6ef7">"{{ keyword }}"</strong> 相关的内容
              </template>
              <XlyButton size="small" @click="keyword = ''">清除搜索</XlyButton>
            </XlyEmpty>
          </div>
          <div v-else class="demo-result-body demo-result-body--hint">
            <XlyEmpty size="small" description="请输入关键词开始搜索" />
          </div>
        </div>
      </div>

      <!-- 卡片列表空状态 -->
      <h3 class="doc-subsection__title">卡片列表空状态</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-card-container">
          <XlyEmpty type="list" description="还没有添加任何项目">
            <XlyButton type="primary">新建项目</XlyButton>
            <XlyButton>从模板创建</XlyButton>
          </XlyEmpty>
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
              <td><code>type</code></td>
              <td>内置空状态类型，影响插图样式</td>
              <td><code>'default' | 'data' | 'search' | 'network' | 'permission' | 'list'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td>自定义图片地址（优先级高于 type）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>image-size</code></td>
              <td>图片区域宽度，高度等比缩放</td>
              <td><code>number | string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td>描述文字</td>
              <td><code>string</code></td>
              <td>根据 type 自动匹配</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>组件尺寸</td>
              <td><code>'small' | 'default' | 'large'</code></td>
              <td><code>'default'</code></td>
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
              <td><code>default</code></td>
              <td>底部操作区域（通常放置按钮）</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td>自定义图片区域，完全替换默认插图</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td>自定义描述内容，支持富文本</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Type 类型说明</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>值</th>
              <th>适用场景</th>
              <th>默认描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>通用空数据状态</td>
              <td>暂无数据</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>同 default，语义化区分</td>
              <td>暂无数据</td>
            </tr>
            <tr>
              <td><code>search</code></td>
              <td>搜索/筛选无匹配结果</td>
              <td>没有找到相关内容</td>
            </tr>
            <tr>
              <td><code>network</code></td>
              <td>网络请求失败</td>
              <td>网络连接异常</td>
            </tr>
            <tr>
              <td><code>permission</code></td>
              <td>无访问权限</td>
              <td>暂无权限访问</td>
            </tr>
            <tr>
              <td><code>list</code></td>
              <td>列表/清单为空</td>
              <td>列表为空</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyEmpty from '@/components/xly-empty/index.vue'
import XlyButton from '@/components/xly-button/index.vue'

const keyword = ref('')

const typeList = [
  { type: 'default' as const, label: 'default（默认）' },
  { type: 'search' as const, label: 'search（搜索）' },
  { type: 'network' as const, label: 'network（网络）' },
  { type: 'permission' as const, label: 'permission（权限）' },
  { type: 'list' as const, label: 'list（列表）' },
]

function handleRetry() {
  alert('重试中...')
}

function handleApply() {
  alert('申请权限...')
}
</script>

<style scoped lang="scss">
.empty-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-subsection__title { font-size: 15px; font-weight: 600; color: #4a4a6a; margin: 24px 0 12px; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6; code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; &--noborder { border: none; background: #fafbfd; } }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 16px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto; pre { margin: 0; padding: 0; } code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; } }
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto; table { width: 100%; border-collapse: collapse; font-size: 14px; } th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; } th { background: #fafbfd; font-weight: 600; color: #1a1a2e; } td { color: #4a4a6a; } code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }

// 类型展示
.demo-types {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  padding: 0 !important;
  width: 100%;
}

.demo-type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px 12px;
  border-right: 1px solid #f2f3f7;
  &:last-child { border-right: none; }
}

.demo-type-label {
  font-size: 12px;
  color: #8e8ea0;
  margin-top: 4px;
  text-align: center;
}

// 尺寸展示
.demo-sizes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 0 !important;
  width: 100%;
}

.demo-size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-right: 1px solid #f2f3f7;
  &:last-child { border-right: none; }
}

// 表格空状态
.demo-table-wrap {
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid #f2f3f7;
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
  }

  td[colspan] {
    padding: 0;
    text-align: center;
  }
}

// 搜索结果
.demo-search-result {
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;
}

.demo-search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.demo-input {
  flex: 1;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e4e7f0;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f6ef7;
  }

  &::placeholder {
    color: #c0c4cc;
  }
}

.demo-result-body {
  border: 1px solid #f2f3f7;
  border-radius: 8px;
  background: #fafbfd;

  &--hint {
    background: #fff;
  }
}

// 卡片列表
.demo-card-container {
  border: 2px dashed #e4e7f0;
  border-radius: 12px;
  margin: 16px 24px;
  background: #fafbfd;
}
</style>
