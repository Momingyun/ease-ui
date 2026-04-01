<template>
  <div class="worktab-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">WorkTab 多标签页</h1>
      <p class="doc-desc">
        管理系统多标签页组件，支持标签切换、关闭、右键菜单、横向滚动、KeepAlive 页面缓存。
      </p>
    </div>

    <!-- 涉及文件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">📦 涉及文件</h2>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>文件路径</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>src/components/xly-worktab/index.vue</code></td>
              <td>WorkTab 组件本体（标签栏 UI + 交互逻辑）</td>
            </tr>
            <tr>
              <td><code>src/stores/tabs.ts</code></td>
              <td>Pinia Store，管理标签页列表、激活状态、缓存列表</td>
            </tr>
            <tr>
              <td><code>src/layouts/index.vue</code></td>
              <td>布局集成入口，连接路由与标签页、KeepAlive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 组件 Props / Expose -->
    <section class="doc-section">
      <h2 class="doc-section__title">🔗 组件接口</h2>
      <p class="doc-section__desc">
        <code>&lt;XlyWorktab /&gt;</code> 当前为无 Props 设计，标签数据完全由 Store 驱动。通过 <code>ref</code> 可调用暴露方法。
      </p>

      <h3 class="doc-subtitle">Expose 方法</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>方法</th><th>说明</th><th>调用时机</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>onTabsChange()</code></td>
              <td>更新滚动状态并滚动到激活标签</td>
              <td>路由切换后、标签增删后调用</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="doc-code">
        <pre><code>const worktabRef = ref&lt;InstanceType&lt;typeof XlyWorktab&gt;&gt;()

// 在标签页变化后调用
worktabRef.value?.onTabsChange()</code></pre>
      </div>
    </section>

    <!-- Store API -->
    <section class="doc-section">
      <h2 class="doc-section__title">💾 Store API（tabs.ts）</h2>
      <p class="doc-section__desc">
        标签页状态通过 Pinia Store 集中管理。<code>import { useTabsStore } from '@/stores/tabs'</code>
      </p>

      <h3 class="doc-subtitle">TabItem 类型</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>path</code></td>
              <td><code>string</code></td>
              <td>✅</td>
              <td>路由路径，作为唯一标识</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>✅</td>
              <td>标签显示名称</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string | symbol | null</code></td>
              <td>—</td>
              <td>路由名称，用于 KeepAlive include 匹配组件 name</td>
            </tr>
            <tr>
              <td><code>affix</code></td>
              <td><code>boolean</code></td>
              <td>—</td>
              <td>是否固定，固定标签不显示关闭按钮、不可通过菜单/右键关闭</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">State</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>属性</th><th>类型</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tabs</code></td>
              <td><code>TabItem[]</code></td>
              <td>已打开的标签页列表</td>
            </tr>
            <tr>
              <td><code>activeTab</code></td>
              <td><code>string</code></td>
              <td>当前激活的标签页路径</td>
            </tr>
            <tr>
              <td><code>cachedNames</code></td>
              <td><code>string[]</code>（computed）</td>
              <td>从 tabs 中提取的 name 列表，用于 KeepAlive include</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Actions</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>方法</th><th>参数</th><th>返回值</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>addTab(route)</code></td>
              <td><code>RouteLocationNormalized</code></td>
              <td><code>void</code></td>
              <td>添加标签（已存在则仅切换激活）</td>
            </tr>
            <tr>
              <td><code>closeTab(path)</code></td>
              <td><code>string</code></td>
              <td><code>string | null</code></td>
              <td>关闭指定标签，返回需要跳转的路径（关闭当前激活时）</td>
            </tr>
            <tr>
              <td><code>closeOtherTabs(path?)</code></td>
              <td><code>string</code>（可选）</td>
              <td><code>void</code></td>
              <td>关闭其他标签，保留当前 + 固定标签</td>
            </tr>
            <tr>
              <td><code>closeAllTabs()</code></td>
              <td>—</td>
              <td><code>string | null</code></td>
              <td>关闭全部可关闭标签，返回应跳转的路径</td>
            </tr>
            <tr>
              <td><code>closeRightTabs(path)</code></td>
              <td><code>string</code></td>
              <td><code>void</code></td>
              <td>关闭指定标签右侧的所有可关闭标签</td>
            </tr>
            <tr>
              <td><code>closeLeftTabs(path)</code></td>
              <td><code>string</code></td>
              <td><code>void</code></td>
              <td>关闭指定标签左侧的所有可关闭标签</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 右键菜单 -->
    <section class="doc-section">
      <h2 class="doc-section__title">🖱️ 右键菜单</h2>
      <p class="doc-section__desc">
        在标签上右键点击弹出上下文菜单。菜单通过 <code>Teleport</code> 挂载到 body，确保不被父容器裁切。
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>菜单项</th><th>说明</th><th>特殊逻辑</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>关闭</td>
              <td>关闭当前右键的标签</td>
              <td>固定标签时禁用（<code>is-disabled</code>）</td>
            </tr>
            <tr>
              <td>关闭左侧</td>
              <td>关闭该标签左侧所有可关闭标签</td>
              <td>固定标签不受影响</td>
            </tr>
            <tr>
              <td>关闭右侧</td>
              <td>关闭该标签右侧所有可关闭标签</td>
              <td>固定标签不受影响</td>
            </tr>
            <tr>
              <td>关闭其他</td>
              <td>仅保留右键标签 + 所有固定标签</td>
              <td>—</td>
            </tr>
            <tr>
              <td>关闭全部</td>
              <td>关闭所有可关闭标签</td>
              <td>固定标签不受影响</td>
            </tr>
            <tr>
              <td>刷新</td>
              <td>刷新当前页面（<code>router.go(0)</code>）</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 集成方式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">🛠️ 集成方式</h2>
      <p class="doc-section__desc">
        WorkTab 已集成到 <code>src/layouts/index.vue</code>。以下为完整集成代码和步骤说明，方便二开时参考。
      </p>

      <h3 class="doc-subtitle">1. 布局模板</h3>
      <div class="doc-code">
        <pre><code>&lt;template&gt;
  &lt;div class="layout-container"&gt;
    &lt;HeaderLayout /&gt;
    &lt;div class="layout-body"&gt;
      &lt;FixedSidebar /&gt;
      &lt;div class="layout-main"&gt;
        &lt;!-- ① 放置 WorkTab 组件 --&gt;
        &lt;XlyWorktab ref="worktabRef" /&gt;

        &lt;!-- ② KeepAlive 包裹 RouterView --&gt;
        &lt;main class="layout-content"&gt;
          &lt;RouterView v-slot="{ Component, route }"&gt;
            &lt;KeepAlive&gt;
              &lt;component :is="Component" :key="route.path" /&gt;
            &lt;/KeepAlive&gt;
          &lt;/RouterView&gt;
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
      </div>

      <h3 class="doc-subtitle">2. 路由监听（自动添加标签）</h3>
      <div class="doc-code">
        <pre><code>&lt;script setup lang="ts"&gt;
import { ref, watch, nextTick } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import XlyWorktab from '@/components/xly-worktab/index.vue'
import { useTabsStore } from '@/stores/tabs'

const route = useRoute()
const tabsStore = useTabsStore()
const worktabRef = ref&lt;InstanceType&lt;typeof XlyWorktab&gt;&gt;()

// 监听路由变化 → 自动添加标签
watch(
  () =&gt; route.path,
  () =&gt; {
    tabsStore.addTab({
      ...route,
      meta: { ...route.meta, title: getRouteTitle(route.path) },
    })
    // 标签变化后更新滚动位置
    nextTick(() =&gt; {
      worktabRef.value?.onTabsChange()
    })
  },
  { immediate: true },
)
&lt;/script&gt;</code></pre>
      </div>

      <h3 class="doc-subtitle">3. 路由标题匹配</h3>
      <p class="doc-section__desc">
        <code>addTab</code> 会从 <code>route.meta.title</code> 获取标题。当前通过遍历 <code>menu.json</code> 匹配路径。如果你改用了 vue-router 的 meta 配置，可直接在路由定义中设置 <code>meta: { title: '页面名' }</code>，去掉 <code>getRouteTitle</code> 函数。
      </p>
      <div class="doc-code">
        <pre><code>// 方式一：当前做法 —— 从 menu.json 匹配标题
function getRouteTitle(path: string): string {
  for (const item of menuData) {
    if (item.path === path) return item.name
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return child.name
      }
    }
  }
  return path
}

// 方式二（推荐）：在路由定义中配置 meta
// router/index.ts
{
  path: '/user/list',
  component: () =&gt; import('@/views/user/list.vue'),
  meta: { title: '用户管理' }
}</code></pre>
      </div>

      <h3 class="doc-subtitle">4. KeepAlive 缓存原理</h3>
      <p class="doc-section__desc">
        KeepAlive 通过组件的 <code>name</code> 进行缓存匹配。页面组件必须通过 <code>defineOptions({ name: 'XxxPage' })</code> 声明名称，Store 的 <code>cachedNames</code> 会自动从 <code>tab.name</code>（即路由名称）收集。
      </p>
      <div class="doc-tip doc-tip--warning">
        <strong>⚠️ 注意：</strong>如果页面组件没有声明 <code>defineOptions({ name: 'xxx' })</code>，KeepAlive 将无法缓存该页面。
      </div>

      <h3 class="doc-subtitle">5. 固定标签（首页固定）✅ 已内置</h3>
      <div class="doc-tip doc-tip--info">
        <strong>✅ 已内置：</strong>路径为 <code>/</code> 的标签会自动标记 <code>affix: true</code>，不可关闭。布局初始化时也会确保首页标签始终存在。
      </div>
      <p class="doc-section__desc">
        如需固定其他页面，修改 <code>src/stores/tabs.ts</code> 中 <code>addTab</code> 的 <code>HOME_PATH</code> 常量，或改为数组判断：
      </p>
      <div class="doc-code">
        <pre><code>// stores/tabs.ts
const AFFIX_PATHS = ['/', '/dashboard']

function addTab(route: RouteLocationNormalized) {
  // ...
  const isAffix = AFFIX_PATHS.includes(route.path)
  tabs.value.push({ path, title, name: route.name, ...(isAffix ? { affix: true } : {}) })
}</code></pre>
      </div>

      <h3 class="doc-subtitle">6. 持久化标签页（刷新不丢失）✅ 已内置</h3>
      <div class="doc-tip doc-tip--info">
        <strong>✅ 已内置：</strong>Store 通过 <code>watchEffect</code> 自动将标签页列表和激活状态保存到 <code>localStorage</code>（key: <code>xly-worktab</code>），页面刷新时自动恢复。
      </div>
      <p class="doc-section__desc">
        如需禁用持久化或更换存储 key，修改 <code>src/stores/tabs.ts</code> 顶部的 <code>STORAGE_KEY</code> 常量，并注释掉 <code>loadStorage</code> / <code>saveStorage</code> 调用。
      </p>
    </section>

    <!-- 二开指南 -->
    <section class="doc-section">
      <h2 class="doc-section__title">🧩 二开指南</h2>

      <h3 class="doc-subtitle">场景一：自定义标签样式</h3>
      <p class="doc-section__desc">
        修改 <code>src/components/xly-worktab/index.vue</code> 底部的 SCSS 变量即可全局调整风格：
      </p>
      <div class="doc-code">
        <pre><code>// src/components/xly-worktab/index.vue &lt;style&gt;
$primary: #4f6ef7;      // 激活标签颜色
$border-color: #ebeef5;  // 底部边框颜色
$bg-active: #ecf0ff;     // 激活标签背景
$bg-hover: #f5f7fa;      // 悬浮标签背景
// 标签尺寸：
.worktab-item { height: 28px; padding: 0 10px; font-size: 13px; max-width: 160px; }
// 标签栏高度：
.xly-worktab { height: 40px; }</code></pre>
      </div>

      <h3 class="doc-subtitle">场景二：添加标签图标</h3>
      <p class="doc-section__desc">
        当前标签只显示文字。如需在标签前加图标，修改组件模板中 <code>worktab-item</code> 的结构，并在 <code>TabItem</code> 类型中增加 <code>icon</code> 字段：
      </p>
      <div class="doc-code">
        <pre><code>// 1. 扩展 TabItem 类型（stores/tabs.ts）
export interface TabItem {
  path: string
  title: string
  name?: string | symbol | null
  affix?: boolean
  icon?: string  // 新增：图标名称
}

// 2. 在 addTab 中读取图标
function addTab(route: RouteLocationNormalized) {
  const icon = route.meta?.icon as string  // 从路由 meta 取
  tabs.value.push({ path, title, name: route.name, icon })
}

// 3. 组件模板中渲染图标
// &lt;XlyIcon :name="tab.icon" style="margin-right: 4px" /&gt;
// &lt;span class="worktab-item__title"&gt;{'{'}{ tab.title }{'}'}&lt;/span&gt;</code></pre>
      </div>

      <h3 class="doc-subtitle">场景三：持久化标签页（刷新不丢失）✅ 已内置</h3>
      <div class="doc-tip doc-tip--info">
        <strong>✅ 已内置：</strong>Store 已使用 <code>watchEffect</code> 和 <code>localStorage</code> 实现持久化，key 为 <code>xly-worktab</code>。无需额外配置。
      </div>
      <p class="doc-section__desc">
        如需关闭持久化或使用其他存储方式（如 IndexedDB），修改 <code>src/stores/tabs.ts</code> 中的 <code>loadStorage</code> / <code>saveStorage</code> 函数。
      </p>

      <h3 class="doc-subtitle">场景四：控制 KeepAlive 缓存范围</h3>
      <p class="doc-section__desc">
        当前 KeepAlive 缓存所有有 <code>name</code> 的页面。如需按需缓存：
      </p>
      <div class="doc-code">
        <pre><code>// 方式一：使用 cachedNames 控制 include
&lt;KeepAlive :include="tabsStore.cachedNames"&gt;
  &lt;component :is="Component" :key="route.path" /&gt;
&lt;/KeepAlive&gt;

// 方式二：在 TabItem 中增加 cached 字段
export interface TabItem {
  // ...
  cached?: boolean  // 是否参与 KeepAlive 缓存，默认 true
}

// 修改 cachedNames 计算：
const cachedNames = computed(() =&gt; {
  return tabs.value
    .filter((tab) =&gt; tab.name &amp;&amp; tab.cached !== false)
    .map((tab) =&gt; tab.name as string)
})</code></pre>
      </div>

      <h3 class="doc-subtitle">场景五：关闭全部标签后跳转到指定页面</h3>
      <p class="doc-section__desc">
        当前关闭全部标签后默认跳转到 <code>/</code>。如需跳转到首页或其他页面，修改 <code>closeAllTabs</code> 的返回值：
      </p>
      <div class="doc-code">
        <pre><code>// stores/tabs.ts
function closeAllTabs(): string | null {
  const affixTabs = tabs.value.filter((tab) =&gt; tab.affix)
  tabs.value = affixTabs
  if (affixTabs.length &gt; 0) {
    activeTab.value = affixTabs[affixTabs.length - 1].path
    return activeTab.value
  }
  activeTab.value = ''
  return '/home'  // ← 改为你的默认首页路径
}</code></pre>
      </div>

      <h3 class="doc-subtitle">场景六：禁用/隐藏 WorkTab</h3>
      <p class="doc-section__desc">
        如果某些场景下不需要标签页功能（如移动端、嵌入模式），可通过环境变量或配置控制：
      </p>
      <div class="doc-code">
        <pre><code>&lt;!-- layouts/index.vue --&gt;
&lt;XlyWorktab v-if="showWorkTab" ref="worktabRef" /&gt;

&lt;script setup&gt;
// 方式一：环境变量
const showWorkTab = import.meta.env.VITE_SHOW_WORKTAB !== 'false'

// 方式二：响应式配置（可运行时切换）
const showWorkTab = ref(true)
&lt;/script&gt;</code></pre>
      </div>

      <h3 class="doc-subtitle">场景七：最大标签数量限制</h3>
      <p class="doc-section__desc">
        防止标签过多导致性能问题，可在 Store 中增加上限：
      </p>
      <div class="doc-code">
        <pre><code>// stores/tabs.ts
const MAX_TABS = 20  // 最大标签数

function addTab(route: RouteLocationNormalized) {
  const path = route.path
  const exist = tabs.value.find((tab) =&gt; tab.path === path)
  if (exist) {
    activeTab.value = path
    return
  }

  // 超出限制时关闭最早的未固定标签
  if (tabs.value.length &gt;= MAX_TABS) {
    const removable = tabs.value.find((tab) =&gt; !tab.affix)
    if (removable) {
      const idx = tabs.value.indexOf(removable)
      tabs.value.splice(idx, 1)
    }
  }

  const title = (route.meta?.title as string) || path
  tabs.value.push({ path, title, name: route.name })
  activeTab.value = path
}</code></pre>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="doc-section">
      <h2 class="doc-section__title">📌 注意事项</h2>
      <div class="doc-note-list">
        <div class="doc-note-item">
          <span class="doc-note-item__label">KeepAlive 匹配</span>
          <span class="doc-note-item__desc">
            组件必须设置 <code>defineOptions({ name: 'XxxPage' })</code>，且 name 需与路由配置的 <code>name</code> 一致，否则缓存不生效。
          </span>
        </div>
        <div class="doc-note-item">
          <span class="doc-note-item__label">关闭标签跳转</span>
          <span class="doc-note-item__desc">
            <code>closeTab</code> 和 <code>closeAllTabs</code> 返回需要跳转的路径，调用方需自行 <code>router.push(target)</code>。
          </span>
        </div>
        <div class="doc-note-item">
          <span class="doc-note-item__label">右键菜单定位</span>
          <span class="doc-note-item__desc">
            右键菜单使用 <code>position: fixed</code> + <code>Teleport to="body"</code>，不受 overflow 裁切。如果页面有缩放（zoom），坐标可能需要手动修正。
          </span>
        </div>
        <div class="doc-note-item">
          <span class="doc-note-item__label">滚动按钮</span>
          <span class="doc-note-item__desc">
            左右滚动箭头在标签总宽度超出容器时自动显示，监听了 <code>scroll</code> 事件和鼠标滚轮（<code>@wheel</code>）。
          </span>
        </div>
        <div class="doc-note-item">
          <span class="doc-note-item__label">样式隔离</span>
          <span class="doc-note-item__desc">
            组件使用 <code>scoped</code> 样式。如需从外部覆盖样式，使用 <code>:deep(.worktab-item)</code> 穿透。
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'XlyWorktabDoc' })
</script>

<style scoped lang="scss">
.worktab-doc {
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

.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}

.doc-table {
  overflow-x: auto;
  margin-bottom: 16px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
    white-space: nowrap;
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
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

.doc-code {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;
  margin-bottom: 16px;

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

.doc-tip {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;

  &--warning {
    background: #fff8e6;
    border: 1px solid #ffe4a0;
    color: #996600;

    code {
      background: rgba(255, 180, 0, 0.1);
      color: #996600;
    }
  }

  strong {
    margin-right: 4px;
  }
}

.doc-note-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-note-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #fafbfd;
  border-radius: 8px;
  border: 1px solid #f2f3f7;

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    white-space: nowrap;
    min-width: 110px;
  }

  &__desc {
    font-size: 13px;
    color: #4a4a6a;
    line-height: 1.6;

    code {
      background: #f5f6fa;
      color: #4f6ef7;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    }
  }
}
</style>
