<template>
  <div class="tabs-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Tabs 选项卡</h1>
      <p class="doc-desc">选项卡切换组件，支持 Line / Card / Segment 三种风格，多种尺寸，粘性头部和横向滚动。</p>
    </div>

    <!-- 基础用法 - Line -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">默认 <code>type="line"</code>，底部带有滑动指示条。通过 <code>v-model</code> 绑定当前激活的选项卡。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab1">
            <xly-tab-pane name="user" label="用户管理">
              <div class="tab-demo-content">
                <p>这里是用户管理的内容区域。</p>
                <p>可以放置表格、表单等复杂内容。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="role" label="角色管理">
              <div class="tab-demo-content">
                <p>这里是角色管理的内容区域。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="perm" label="权限配置">
              <div class="tab-demo-content">
                <p>这里是权限配置的内容区域。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab"&gt;
  &lt;xly-tab-pane name="user" label="用户管理"&gt;
    用户管理内容
  &lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="role" label="角色管理"&gt;
    角色管理内容
  &lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="perm" label="权限配置"&gt;
    权限配置内容
  &lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 卡片类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">卡片类型</h2>
      <p class="doc-section__desc">设置 <code>type="card"</code>，呈现卡片风格的选项卡。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab2" type="card">
            <xly-tab-pane name="overview" label="概览">
              <div class="tab-demo-content">
                <p>系统运行概览数据。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="monitor" label="监控">
              <div class="tab-demo-content">
                <p>系统监控信息。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="alarm" label="告警">
              <div class="tab-demo-content">
                <p>告警记录与处理。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="log" label="日志">
              <div class="tab-demo-content">
                <p>系统运行日志。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab" type="card"&gt;
  &lt;xly-tab-pane name="overview" label="概览"&gt;概览内容&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="monitor" label="监控"&gt;监控内容&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="alarm" label="告警"&gt;告警内容&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="log" label="日志"&gt;日志内容&lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 分段控制器类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">分段控制器</h2>
      <p class="doc-section__desc">设置 <code>type="segment"</code>，呈现分段控制器风格，适合选项较少的切换场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab3" type="segment">
            <xly-tab-pane name="all" label="全部">
              <div class="tab-demo-content">
                <p>显示全部内容。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="active" label="进行中">
              <div class="tab-demo-content">
                <p>显示进行中的内容。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="done" label="已完成">
              <div class="tab-demo-content">
                <p>显示已完成的内容。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab" type="segment"&gt;
  &lt;xly-tab-pane name="all" label="全部"&gt;全部内容&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="active" label="进行中"&gt;进行中内容&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="done" label="已完成"&gt;已完成内容&lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置选项卡尺寸，支持 <code>large</code> / <code>default</code> / <code>small</code> 三种规格。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch; gap: 32px;">
          <div>
            <p class="size-label">Large</p>
            <xly-tabs v-model="activeTab4" size="large">
              <xly-tab-pane name="a" label="选项一"><div class="tab-demo-content"><p>Large 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="b" label="选项二"><div class="tab-demo-content"><p>Large 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="c" label="选项三"><div class="tab-demo-content"><p>Large 选项卡内容</p></div></xly-tab-pane>
            </xly-tabs>
          </div>
          <div>
            <p class="size-label">Default</p>
            <xly-tabs v-model="activeTab4">
              <xly-tab-pane name="a" label="选项一"><div class="tab-demo-content"><p>Default 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="b" label="选项二"><div class="tab-demo-content"><p>Default 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="c" label="选项三"><div class="tab-demo-content"><p>Default 选项卡内容</p></div></xly-tab-pane>
            </xly-tabs>
          </div>
          <div>
            <p class="size-label">Small</p>
            <xly-tabs v-model="activeTab4" size="small">
              <xly-tab-pane name="a" label="选项一"><div class="tab-demo-content"><p>Small 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="b" label="选项二"><div class="tab-demo-content"><p>Small 选项卡内容</p></div></xly-tab-pane>
              <xly-tab-pane name="c" label="选项三"><div class="tab-demo-content"><p>Small 选项卡内容</p></div></xly-tab-pane>
            </xly-tabs>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab" size="large"&gt;...&lt;/xly-tabs&gt;
&lt;xly-tabs v-model="activeTab" size="default"&gt;...&lt;/xly-tabs&gt;
&lt;xly-tabs v-model="activeTab" size="small"&gt;...&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带图标</h2>
      <p class="doc-section__desc">通过 TabPane 的 <code>icon</code> 属性设置标题前缀图标，使用 Element Plus 图标名称。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab5">
            <xly-tab-pane name="home" label="首页" icon="HomeFilled">
              <div class="tab-demo-content">
                <p>首页内容，包含常用功能和快捷入口。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="setting" label="设置" icon="Setting">
              <div class="tab-demo-content">
                <p>系统设置与偏好配置。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="user" label="用户" icon="User">
              <div class="tab-demo-content">
                <p>用户信息与账户管理。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="bell" label="通知" icon="Bell">
              <div class="tab-demo-content">
                <p>消息通知与提醒。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab"&gt;
  &lt;xly-tab-pane name="home" label="首页" icon="HomeFilled"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="setting" label="设置" icon="Setting"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="user" label="用户" icon="User"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="bell" label="通知" icon="Bell"&gt;...&lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用选项卡 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用选项卡</h2>
      <p class="doc-section__desc">通过 TabPane 的 <code>disabled</code> 属性禁用某个选项卡，禁用后无法点击切换。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab6">
            <xly-tab-pane name="basic" label="基本信息">
              <div class="tab-demo-content">
                <p>基本信息配置。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="security" label="安全设置">
              <div class="tab-demo-content">
                <p>安全相关配置。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="advanced" label="高级设置" disabled>
              <div class="tab-demo-content">
                <p>高级功能（需升级版本后解锁）。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab"&gt;
  &lt;xly-tab-pane name="basic" label="基本信息"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="security" label="安全设置"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="advanced" label="高级设置" disabled&gt;...&lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">选项卡位置</h2>
      <p class="doc-section__desc">通过 <code>tab-position</code> 属性设置选项卡位置，目前支持 <code>top</code>（默认）和 <code>bottom</code>。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs v-model="activeTab7" tab-position="bottom">
            <xly-tab-pane name="tab1" label="选项一">
              <div class="tab-demo-content">
                <p>选项卡位于底部的示例内容。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="tab2" label="选项二">
              <div class="tab-demo-content">
                <p>适合需要内容区域在上方展示的场景。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="tab3" label="选项三">
              <div class="tab-demo-content">
                <p>底部选项卡内容。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab" tab-position="bottom"&gt;
  &lt;xly-tab-pane name="tab1" label="选项一"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="tab2" label="选项二"&gt;...&lt;/xly-tab-pane&gt;
  &lt;xly-tab-pane name="tab3" label="选项三"&gt;...&lt;/xly-tab-pane&gt;
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义激活色</h2>
      <p class="doc-section__desc">通过 <code>active-color</code> 属性自定义激活态颜色，适配不同业务场景的视觉风格。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch; gap: 24px;">
          <xly-tabs v-model="activeTab8" active-color="#34c759">
            <xly-tab-pane name="g1" label="绿色主题"><div class="tab-demo-content"><p>成功 / 绿色激活色</p></div></xly-tab-pane>
            <xly-tab-pane name="g2" label="选项二"><div class="tab-demo-content"><p>绿色主题内容</p></div></xly-tab-pane>
            <xly-tab-pane name="g3" label="选项三"><div class="tab-demo-content"><p>绿色主题内容</p></div></xly-tab-pane>
          </xly-tabs>
          <xly-tabs v-model="activeTab8" active-color="#f5a623" type="card">
            <xly-tab-pane name="o1" label="橙色主题"><div class="tab-demo-content"><p>警告 / 橙色激活色</p></div></xly-tab-pane>
            <xly-tab-pane name="o2" label="选项二"><div class="tab-demo-content"><p>橙色主题内容</p></div></xly-tab-pane>
            <xly-tab-pane name="o3" label="选项三"><div class="tab-demo-content"><p>橙色主题内容</p></div></xly-tab-pane>
          </xly-tabs>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs v-model="activeTab" active-color="#34c759"&gt;...&lt;/xly-tabs&gt;
&lt;xly-tabs v-model="activeTab" active-color="#f5a623" type="card"&gt;...&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 事件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">事件回调</h2>
      <p class="doc-section__desc">监听 <code>tab-click</code> 和 <code>tab-change</code> 事件获取用户交互信息。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch;">
          <xly-tabs
            v-model="activeTab9"
            @tab-click="handleTabClick"
            @tab-change="handleTabChange"
          >
            <xly-tab-pane name="event1" label="选项一">
              <div class="tab-demo-content">
                <p>点击或切换选项卡时，下方会显示事件日志。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="event2" label="选项二">
              <div class="tab-demo-content">
                <p>事件日志面板。</p>
              </div>
            </xly-tab-pane>
            <xly-tab-pane name="event3" label="选项三">
              <div class="tab-demo-content">
                <p>事件日志面板。</p>
              </div>
            </xly-tab-pane>
          </xly-tabs>
          <div v-if="eventLogs.length" class="event-logs">
            <p v-for="(log, i) in eventLogs" :key="i" class="event-log">{{ log }}</p>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-tabs
  v-model="activeTab"
  @tab-click="handleTabClick"
  @tab-change="handleTabChange"
&gt;
  ...
&lt;/xly-tabs&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Tabs Props</h3>
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
              <td><code>v-model</code></td>
              <td>当前激活的选项卡标识</td>
              <td><code>string | number</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>选项卡类型</td>
              <td><code>'line' | 'card' | 'segment'</code></td>
              <td><code>'line'</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>尺寸</td>
              <td><code>'large' | 'default' | 'small'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>tab-position</code></td>
              <td>选项卡位置</td>
              <td><code>'top' | 'bottom'</code></td>
              <td><code>'top'</code></td>
            </tr>
            <tr>
              <td><code>active-color</code></td>
              <td>激活态颜色</td>
              <td><code>string</code></td>
              <td><code>'#4f6ef7'</code></td>
            </tr>
            <tr>
              <td><code>scrollable</code></td>
              <td>是否可滚动</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>sticky</code></td>
              <td>是否开启粘性头部</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>sticky-top</code></td>
              <td>粘性定位的 top 值</td>
              <td><code>string</code></td>
              <td><code>'0px'</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TabPane Props</h3>
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
              <td><code>name</code></td>
              <td>选项卡标识（必填）</td>
              <td><code>string | number</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>选项卡标题（必填）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>标题前缀图标</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Tabs Events</h3>
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
              <td><code>tab-click</code></td>
              <td>选项卡被点击时触发</td>
              <td><code>(pane: TabPaneInfo)</code></td>
            </tr>
            <tr>
              <td><code>tab-change</code></td>
              <td>激活选项卡切换时触发</td>
              <td><code>(value: string | number)</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyTabs from '@/components/xly-tabs/index.vue'
import XlyTabPane from '@/components/xly-tabs/xly-tab-pane.vue'

const activeTab1 = ref('user')
const activeTab2 = ref('overview')
const activeTab3 = ref('all')
const activeTab4 = ref('a')
const activeTab5 = ref('home')
const activeTab6 = ref('basic')
const activeTab7 = ref('tab1')
const activeTab8 = ref('g1')
const activeTab9 = ref('event1')

const eventLogs = ref<string[]>([])

function handleTabClick(pane: any) {
  eventLogs.value.push(`[tab-click] name: ${pane.name}, label: ${pane.label}`)
}

function handleTabChange(value: string | number) {
  eventLogs.value.push(`[tab-change] value: ${value}`)
}
</script>

<style scoped lang="scss">
.tabs-doc {
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
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.tab-demo-content {
  padding: 16px;
  background: #fafbfd;
  border-radius: 8px;
  border: 1px dashed #e2e4ed;
  color: #4a4a6a;
  font-size: 14px;
  line-height: 1.6;

  p { margin: 0 0 8px; }
  p:last-child { margin: 0; }
}

.size-label {
  font-size: 13px;
  color: #8e8ea0;
  margin: 0 0 8px;
  font-weight: 500;
}

.event-logs {
  margin-top: 12px;
  padding: 12px 16px;
  background: #1a1a2e;
  border-radius: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.event-log {
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 12px;
  color: #34c759;
  margin: 0 0 4px;
  line-height: 1.6;

  &:last-child { margin: 0; }
}
</style>
