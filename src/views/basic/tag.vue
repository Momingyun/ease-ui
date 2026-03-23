<template>
  <div class="tag-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Tag 标签</h1>
      <p class="doc-desc">用于标记和分类，支持多种类型、尺寸、主题效果，以及可关闭、可点击、圆角、图标等丰富特性。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>type</code> 属性设置标签类型，支持 <code>default</code>、<code>primary</code>、<code>success</code>、<code>warning</code>、<code>danger</code>、<code>info</code> 六种类型。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-tag>默认</xly-tag>
          <xly-tag type="primary">主要</xly-tag>
          <xly-tag type="success">成功</xly-tag>
          <xly-tag type="warning">警告</xly-tag>
          <xly-tag type="danger">危险</xly-tag>
          <xly-tag type="info">信息</xly-tag>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag&gt;默认&lt;/xly-tag&gt;
&lt;xly-tag type="primary"&gt;主要&lt;/xly-tag&gt;
&lt;xly-tag type="success"&gt;成功&lt;/xly-tag&gt;
&lt;xly-tag type="warning"&gt;警告&lt;/xly-tag&gt;
&lt;xly-tag type="danger"&gt;危险&lt;/xly-tag&gt;
&lt;xly-tag type="info"&gt;信息&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 主题效果 -->
    <section class="doc-section">
      <h2 class="doc-section__title">主题效果</h2>
      <p class="doc-section__desc">通过 <code>effect</code> 属性切换主题，支持 <code>light</code>（浅色，默认）、<code>plain</code>（描边）、<code>dark</code>（深色）三种效果。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div class="tag-row">
            <span class="effect-label">light</span>
            <xly-tag>默认</xly-tag>
            <xly-tag type="primary">主要</xly-tag>
            <xly-tag type="success">成功</xly-tag>
            <xly-tag type="warning">警告</xly-tag>
            <xly-tag type="danger">危险</xly-tag>
            <xly-tag type="info">信息</xly-tag>
          </div>
          <div class="tag-row">
            <span class="effect-label">plain</span>
            <xly-tag effect="plain">默认</xly-tag>
            <xly-tag type="primary" effect="plain">主要</xly-tag>
            <xly-tag type="success" effect="plain">成功</xly-tag>
            <xly-tag type="warning" effect="plain">警告</xly-tag>
            <xly-tag type="danger" effect="plain">危险</xly-tag>
            <xly-tag type="info" effect="plain">信息</xly-tag>
          </div>
          <div class="tag-row">
            <span class="effect-label">dark</span>
            <xly-tag effect="dark">默认</xly-tag>
            <xly-tag type="primary" effect="dark">主要</xly-tag>
            <xly-tag type="success" effect="dark">成功</xly-tag>
            <xly-tag type="warning" effect="dark">警告</xly-tag>
            <xly-tag type="danger" effect="dark">危险</xly-tag>
            <xly-tag type="info" effect="dark">信息</xly-tag>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 浅色（默认）--&gt;
&lt;xly-tag effect="light"&gt;...&lt;/xly-tag&gt;

&lt;!-- 描边 --&gt;
&lt;xly-tag effect="plain"&gt;...&lt;/xly-tag&gt;

&lt;!-- 深色 --&gt;
&lt;xly-tag effect="dark"&gt;...&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置标签大小，支持 <code>large</code>、<code>default</code>、<code>small</code> 三种规格。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-tag type="primary" size="large">Large</xly-tag>
          <xly-tag type="primary">Default</xly-tag>
          <xly-tag type="primary" size="small">Small</xly-tag>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" size="large"&gt;Large&lt;/xly-tag&gt;
&lt;xly-tag type="primary"&gt;Default&lt;/xly-tag&gt;
&lt;xly-tag type="primary" size="small"&gt;Small&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 圆角样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">圆角样式</h2>
      <p class="doc-section__desc">添加 <code>round</code> 属性，标签变为胶囊形圆角。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-tag round>默认</xly-tag>
          <xly-tag type="primary" round>主要</xly-tag>
          <xly-tag type="success" round>成功</xly-tag>
          <xly-tag type="warning" round>警告</xly-tag>
          <xly-tag type="danger" round>危险</xly-tag>
          <xly-tag type="info" round>信息</xly-tag>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" round&gt;主要&lt;/xly-tag&gt;
&lt;xly-tag type="success" round&gt;成功&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带图标</h2>
      <p class="doc-section__desc">通过 <code>icon</code> 属性为标签添加前置图标，使用 Element Plus 图标名称。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-tag type="primary" icon="User">用户</xly-tag>
          <xly-tag type="success" icon="CircleCheck">已通过</xly-tag>
          <xly-tag type="warning" icon="Warning">待审核</xly-tag>
          <xly-tag type="danger" icon="CircleClose">已拒绝</xly-tag>
          <xly-tag type="info" icon="Clock">处理中</xly-tag>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" icon="User"&gt;用户&lt;/xly-tag&gt;
&lt;xly-tag type="success" icon="CircleCheck"&gt;已通过&lt;/xly-tag&gt;
&lt;xly-tag type="warning" icon="Warning"&gt;待审核&lt;/xly-tag&gt;
&lt;xly-tag type="danger" icon="CircleClose"&gt;已拒绝&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 可关闭 -->
    <section class="doc-section">
      <h2 class="doc-section__title">可关闭</h2>
      <p class="doc-section__desc">添加 <code>closable</code> 属性后，标签右侧出现关闭按钮，点击后触发 <code>close</code> 事件并隐藏标签。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <div class="tag-row">
            <xly-tag v-for="tag in closableTags1" :key="tag.label" :type="tag.type" closable @close="removeTag(closableTags1, tag)">
              {{ tag.label }}
            </xly-tag>
            <span v-if="closableTags1.length === 0" class="empty-hint">所有标签已关闭，刷新页面重置</span>
          </div>
          <div class="tag-row">
            <xly-tag v-for="tag in closableTags2" :key="tag.label" :type="tag.type" effect="plain" round closable @close="removeTag(closableTags2, tag)">
              {{ tag.label }}
            </xly-tag>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" closable @close="handleClose"&gt;可关闭&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 可点击 -->
    <section class="doc-section">
      <h2 class="doc-section__title">可点击</h2>
      <p class="doc-section__desc">添加 <code>clickable</code> 属性后，标签具有点击 hover 效果，并触发 <code>click</code> 事件。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <div class="tag-row">
            <xly-tag
              v-for="tag in clickableTags"
              :key="tag.label"
              :type="selectedTag === tag.label ? tag.type : 'default'"
              :effect="selectedTag === tag.label ? 'dark' : 'light'"
              clickable
              @click="selectedTag = tag.label"
            >
              {{ tag.label }}
            </xly-tag>
          </div>
          <div v-if="selectedTag" class="click-hint">已选中：<strong>{{ selectedTag }}</strong></div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" clickable @click="handleClick"&gt;点击我&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">通过 <code>disabled</code> 属性禁用标签，禁用后标签半透明且无法交互。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-tag type="primary" disabled>禁用</xly-tag>
          <xly-tag type="success" disabled closable>禁用关闭</xly-tag>
          <xly-tag type="warning" disabled clickable>禁用点击</xly-tag>
          <xly-tag type="danger" disabled effect="dark">禁用深色</xly-tag>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag type="primary" disabled&gt;禁用&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">通过 <code>color</code> 属性自定义标签颜色，结合 <code>effect</code> 属性可产生不同视觉效果。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div class="tag-row">
            <span class="effect-label">light</span>
            <xly-tag color="#7c3aed">紫色</xly-tag>
            <xly-tag color="#0ea5e9">天蓝</xly-tag>
            <xly-tag color="#f43f5e">玫瑰</xly-tag>
            <xly-tag color="#10b981">翠绿</xly-tag>
            <xly-tag color="#f97316">橙色</xly-tag>
          </div>
          <div class="tag-row">
            <span class="effect-label">plain</span>
            <xly-tag color="#7c3aed" effect="plain">紫色</xly-tag>
            <xly-tag color="#0ea5e9" effect="plain">天蓝</xly-tag>
            <xly-tag color="#f43f5e" effect="plain">玫瑰</xly-tag>
            <xly-tag color="#10b981" effect="plain">翠绿</xly-tag>
            <xly-tag color="#f97316" effect="plain">橙色</xly-tag>
          </div>
          <div class="tag-row">
            <span class="effect-label">dark</span>
            <xly-tag color="#7c3aed" effect="dark">紫色</xly-tag>
            <xly-tag color="#0ea5e9" effect="dark">天蓝</xly-tag>
            <xly-tag color="#f43f5e" effect="dark">玫瑰</xly-tag>
            <xly-tag color="#10b981" effect="dark">翠绿</xly-tag>
            <xly-tag color="#f97316" effect="dark">橙色</xly-tag>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag color="#7c3aed"&gt;紫色&lt;/xly-tag&gt;
&lt;xly-tag color="#7c3aed" effect="plain"&gt;紫色描边&lt;/xly-tag&gt;
&lt;xly-tag color="#7c3aed" effect="dark"&gt;紫色深色&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 动态编辑 -->
    <section class="doc-section">
      <h2 class="doc-section__title">动态编辑标签</h2>
      <p class="doc-section__desc">结合 <code>closable</code> 与输入框，实现动态添加/删除标签的交互。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div class="tag-row" style="flex-wrap: wrap;">
            <xly-tag
              v-for="tag in dynamicTags"
              :key="tag"
              type="primary"
              effect="plain"
              closable
              @close="removeTagByValue(dynamicTags, tag)"
            >
              {{ tag }}
            </xly-tag>
            <div v-if="inputVisible" class="tag-input-wrap">
              <input
                ref="inputRef"
                v-model="inputValue"
                class="tag-input"
                placeholder="回车确认"
                @keyup.enter="addTag"
                @blur="addTag"
              />
            </div>
            <xly-tag
              v-else
              type="primary"
              effect="plain"
              clickable
              @click="showInput"
            >
              + 新增标签
            </xly-tag>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tag
  v-for="tag in tags"
  :key="tag"
  closable
  @close="removeTag(tag)"
&gt;{{ tag }}&lt;/xly-tag&gt;

&lt;xly-tag clickable @click="showInput"&gt;+ 新增&lt;/xly-tag&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Tag Props</h3>
      <div class="doc-table">
        <table>
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
              <td><code>type</code></td>
              <td>标签类型</td>
              <td><code>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>标签尺寸</td>
              <td><code>'large' | 'default' | 'small'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>effect</code></td>
              <td>主题效果</td>
              <td><code>'light' | 'plain' | 'dark'</code></td>
              <td><code>'light'</code></td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td>是否可关闭</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>round</code></td>
              <td>是否为圆角胶囊形</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>clickable</code></td>
              <td>是否可点击（带 hover 效果）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>前置图标（Element Plus 图标名）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>自定义颜色（覆盖 type）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Tag Events</h3>
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
              <td><code>close</code></td>
              <td>点击关闭按钮时触发</td>
              <td><code>(event: MouseEvent)</code></td>
            </tr>
            <tr>
              <td><code>click</code></td>
              <td>点击标签时触发（需设置 clickable）</td>
              <td><code>(event: MouseEvent)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Tag Methods</h3>
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
              <td><code>show()</code></td>
              <td>重置标签为显示状态（closable 关闭后可调用）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import XlyTag from '@/components/xly-tag/index.vue'

// 可关闭标签数据
const closableTags1 = ref([
  { label: '用户管理', type: 'primary' as const },
  { label: '角色配置', type: 'success' as const },
  { label: '权限审批', type: 'warning' as const },
  { label: '系统日志', type: 'danger' as const },
  { label: '数据备份', type: 'info' as const },
])
const closableTags2 = ref([
  { label: 'Vue 3', type: 'primary' as const },
  { label: 'TypeScript', type: 'success' as const },
  { label: 'Vite', type: 'warning' as const },
  { label: 'Tailwind', type: 'info' as const },
])

function removeTag(list: { label: string; type: string }[], tag: { label: string; type: string }) {
  const idx = list.indexOf(tag)
  if (idx > -1) list.splice(idx, 1)
}

// 可点击标签
const clickableTags = [
  { label: '技术', type: 'primary' as const },
  { label: '设计', type: 'success' as const },
  { label: '运营', type: 'warning' as const },
  { label: '产品', type: 'danger' as const },
  { label: '数据', type: 'info' as const },
]
const selectedTag = ref<string>('')

// 动态编辑
const dynamicTags = ref(['前端开发', 'UI 设计', '后端接口'])
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement>()

async function showInput() {
  inputVisible.value = true
  await nextTick()
  inputRef.value?.focus()
}

function addTag() {
  const val = inputValue.value.trim()
  if (val && !dynamicTags.value.includes(val)) {
    dynamicTags.value.push(val)
  }
  inputVisible.value = false
  inputValue.value = ''
}

function removeTagByValue(list: string[], tag: string) {
  const idx = list.indexOf(tag)
  if (idx > -1) list.splice(idx, 1)
}
</script>

<style scoped lang="scss">
.tag-doc {
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
  gap: 10px; padding: 24px;
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
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; white-space: nowrap; }
  td { color: #4a4a6a; }
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.effect-label {
  font-size: 12px;
  color: #8e8ea0;
  font-weight: 500;
  min-width: 36px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
}

.empty-hint {
  font-size: 13px;
  color: #c0c4cc;
}

.click-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 6px 12px;
  background: #f5f7fa;
  border-radius: 6px;

  strong { color: #4f6ef7; }
}

/* 动态编辑输入框 */
.tag-input-wrap {
  display: inline-flex;
}
.tag-input {
  height: 28px;
  padding: 0 10px;
  font-size: 13px;
  color: #1a1a2e;
  border: 1px solid #4f6ef7;
  border-radius: 6px;
  outline: none;
  width: 100px;
  background: #fff;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.15);
  }
}
</style>
