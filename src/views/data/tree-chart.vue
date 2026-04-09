<template>
  <div class="tree-chart-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">TreeChart 思维导图</h1>
      <p class="doc-desc">
        基于纯 CSS + SVG 原生实现的思维导图组件，支持树形数据展示、横向/竖向布局切换、容器内缩放平移、节点点击等交互。
      </p>
    </div>

    <!-- ===== 基础用法 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">最简单的思维导图展示，数据驱动，自动渲染树形结构。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="basicData" :height="800" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="treeData" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 多棵树模式 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">多棵树模式</h2>
      <p class="doc-section__desc">
        通过 <code>:trees</code> 属性传入数组的数组，同时渲染多个独立的思维导图。
        竖向布局时多棵树横向排列，横向布局时多棵树纵向排列。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :trees="multiTreeData" :height="500" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :trees="[treeData1, treeData2]" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 数据结构 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">数据结构</h2>
      <p class="doc-section__desc">
        <code>TreeChartNode</code> 是思维导图节点的数据类型，支持嵌套的树形结构。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="structureData" :height="350" />
        </div>
        <div class="doc-code">
          <pre><code>import type { TreeChartNode } from '@/components/xly-tree-chart'

const treeData: TreeChartNode[] = [
  {
    id: 'root',           // 唯一标识（必填）
    label: '根节点',       // 显示文本（必填）
    children: [           // 子节点（可选）
      {
        id: 'child-1',
        label: '子节点 1',
        children: [
          { id: 'leaf-1', label: '叶子节点' },
        ],
      },
      {
        id: 'child-2',
        label: '子节点 2',
        color: '#ef4444', // 自定义颜色（可选）
      },
    ],
  },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 竖向布局 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">竖向布局</h2>
      <p class="doc-section__desc">
        设置 <code>layout="vertical"</code> 切换为竖向布局，根节点在上，子节点向下展开。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="basicData" layout="vertical" :height="500" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="treeData" layout="vertical" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 横向布局 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">横向布局</h2>
      <p class="doc-section__desc">
        设置 <code>layout="horizontal"</code> 切换为横向布局（默认），根节点在左，子节点向右展开。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="basicData" layout="horizontal" :height="300" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="treeData" layout="horizontal" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 禁用工具栏 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏工具栏</h2>
      <p class="doc-section__desc">
        设置 <code>:show-toolbar="false"</code> 隐藏工具栏，配合自定义操作按钮使用。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="basicData" :show-toolbar="false" :height="300" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="treeData" :show-toolbar="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 自定义节点配置 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义节点样式</h2>
      <p class="doc-section__desc">
        通过 <code>:node-config</code> 自定义节点的宽度、高度、间距等样式。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart
            :data="basicData"
            :node-config="customNodeConfig"
            :height="300"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  :node-config="{
    nodeWidth: 180,
    nodeMinHeight: 56,
    horizontalGap: 80,
    verticalGap: 32,
  }"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 自定义颜色 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">
        通过 <code>:colors</code> 属性自定义每一层节点的颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart
            :data="basicData"
            :colors="customColors"
            :height="300"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  :colors="['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 节点样式自定义 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">节点样式自定义</h2>
      <p class="doc-section__desc">
        通过节点数据属性自定义字体颜色、背景色、边框颜色等，支持普通状态和激活状态的独立样式设置。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="customStyleData" :height="400" />
        </div>
        <div class="doc-code">
          <pre><code>const treeData: TreeChartNode[] = [
  {
    id: 1,
    label: '产品研发部',
    // 普通状态样式
    textColor: '#1e40af',
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    // 悬停状态样式
    activeTextColor: '#ffffff',
    activeBackgroundColor: '#3b82f6',
    activeBorderColor: '#1d4ed8',
    children: [
      {
        id: 11,
        label: '前端组',
        textColor: '#166534',
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        activeTextColor: '#ffffff',
        activeBackgroundColor: '#22c55e',
        activeBorderColor: '#15803d',
      },
      {
        id: 12,
        label: '后端组',
        textColor: '#92400e',
        backgroundColor: '#fef3c7',
        borderColor: '#f59e0b',
      },
      {
        id: 13,
        label: '测试组',
        textColor: '#9f1239',
        backgroundColor: '#ffe4e6',
        borderColor: '#ef4444',
      },
    ],
  },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 节点点击事件 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">节点点击事件</h2>
      <p class="doc-section__desc">
        使用 <code>@node-click</code> 监听节点点击事件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div v-if="clickLog" class="click-log">
            <span class="click-tag">node-click</span>
            <code>{{ clickLog }}</code>
          </div>
          <XlyTreeChart :data="basicData" @node-click="onNodeClick" :height="300" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  @node-click="onNodeClick"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 展开收起事件 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">展开收起事件</h2>
      <p class="doc-section__desc">
        使用 <code>@toggle-expand</code> 监听节点展开收起事件，可实现受控展开。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div v-if="expandLog" class="click-log">
            <span class="click-tag">toggle-expand</span>
            <code>{{ expandLog }}</code>
          </div>
          <XlyTreeChart
            :data="basicData"
            :expanded-keys="controlledKeys"
            @toggle-expand="onToggleExpand"
            :height="300"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  :expanded-keys="controlledKeys"
  @toggle-expand="onToggleExpand"
  @update:expanded-keys="controlledKeys = $event"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 企业组织架构示例 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">企业组织架构</h2>
      <p class="doc-section__desc">
        使用思维导图展示企业组织架构的完整示例。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="orgData" layout="horizontal" :height="500" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="orgData" layout="horizontal" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 禁用展开收起 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用展开收起</h2>
      <p class="doc-section__desc">
        设置 <code>:expandable="false"</code> 禁用展开收起功能，节点无法展开或收起。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart :data="basicData" :expandable="false" :height="300" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart :data="treeData" :expandable="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 自定义背景 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义背景</h2>
      <p class="doc-section__desc">
        通过 <code>background-color</code>、<code>show-grid</code> 和 <code>grid-color</code> 自定义画布背景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart
            :data="basicData"
            background-color="#1a1a2e"
            :show-grid="true"
            grid-color="#3a3a5e"
            :height="300"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  background-color="#1a1a2e"
  :show-grid="true"
  grid-color="#3a3a5e"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 无网格背景 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">无网格背景</h2>
      <p class="doc-section__desc">
        设置 <code>:show-grid="false"</code> 隐藏网格背景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart
            :data="basicData"
            background-color="#f8fafc"
            :show-grid="false"
            :height="300"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  background-color="#f8fafc"
  :show-grid="false"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 自定义尺寸 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>width</code> 和 <code>height</code> 自定义画布尺寸，支持数字（像素）或字符串（百分比）。不设置时默认充满父容器。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTreeChart
            :data="basicData"
            :width="800"
            :height="300"
            layout="horizontal"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTreeChart
  :data="treeData"
  :width="800"
  :height="300"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== API 文档 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Props</h3>
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
              <td>data</td>
              <td>树形数据（单个树）</td>
              <td><code>TreeChartNode[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td>trees</td>
              <td>多棵树数据（支持同时渲染多个独立的思维导图）</td>
              <td><code>TreeChartNode[][]</code></td>
              <td><code>null</code></td>
            </tr>
            <tr>
              <td>layout</td>
              <td>布局方向</td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
            </tr>
            <tr>
              <td>node-config</td>
              <td>节点配置</td>
              <td><code>NodeConfig</code></td>
              <td>见下表</td>
            </tr>
            <tr>
              <td>show-toolbar</td>
              <td>是否显示工具栏</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>colors</td>
              <td>每层节点颜色数组</td>
              <td><code>string[]</code></td>
              <td>默认配色</td>
            </tr>
            <tr>
              <td>default-expand-all</td>
              <td>是否默认展开所有节点</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>expanded-keys</td>
              <td>受控展开的节点 keys（需配合 @update:expanded-keys）</td>
              <td><code>(string | number)[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td>min-scale</td>
              <td>最小缩放比例</td>
              <td><code>number</code></td>
              <td><code>0.3</code></td>
            </tr>
            <tr>
              <td>max-scale</td>
              <td>最大缩放比例</td>
              <td><code>number</code></td>
              <td><code>3</code></td>
            </tr>
            <tr>
              <td>expandable</td>
              <td>是否启用展开收起功能</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>background-color</td>
              <td>画布背景色</td>
              <td><code>string</code></td>
              <td><code>'#ffffff'</code></td>
            </tr>
            <tr>
              <td>show-grid</td>
              <td>是否显示网格背景</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>grid-color</td>
              <td>网格颜色</td>
              <td><code>string</code></td>
              <td><code>'#f1f2f5'</code></td>
            </tr>
            <tr>
              <td>width</td>
              <td>画布宽度（支持数字或百分比字符串）</td>
              <td><code>number | string</code></td>
              <td><code>'100%'</code></td>
            </tr>
            <tr>
              <td>height</td>
              <td>画布高度（支持数字或百分比字符串）</td>
              <td><code>number | string</code></td>
              <td><code>'100%'</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">NodeConfig</h3>
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
              <td>nodeWidth</td>
              <td>节点宽度</td>
              <td><code>number</code></td>
              <td><code>160</code></td>
            </tr>
            <tr>
              <td>nodeMinHeight</td>
              <td>节点最小高度</td>
              <td><code>number</code></td>
              <td><code>48</code></td>
            </tr>
            <tr>
              <td>horizontalGap</td>
              <td>水平间距</td>
              <td><code>number</code></td>
              <td><code>60</code></td>
            </tr>
            <tr>
              <td>verticalGap</td>
              <td>垂直间距</td>
              <td><code>number</code></td>
              <td><code>24</code></td>
            </tr>
            <tr>
              <td>lineColor</td>
              <td>连接线颜色</td>
              <td><code>string</code></td>
              <td><code>'#d1d5db'</code></td>
            </tr>
            <tr>
              <td>lineWidth</td>
              <td>连接线宽度</td>
              <td><code>number</code></td>
              <td><code>1.5</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TreeChartNode</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>节点唯一标识</td>
              <td><code>string | number</code></td>
            </tr>
            <tr>
              <td>label</td>
              <td>节点显示文字</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>children</td>
              <td>子节点</td>
              <td><code>TreeChartNode[]</code></td>
            </tr>
            <tr>
              <td>color</td>
              <td>自定义颜色（用于分层配色）</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>textColor</td>
              <td>字体颜色</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>backgroundColor</td>
              <td>背景色</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>activeBackgroundColor</td>
              <td>悬停背景色</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>activeTextColor</td>
              <td>悬停字体颜色</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>borderColor</td>
              <td>边框颜色（普通状态）</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>activeBorderColor</td>
              <td>悬停边框颜色</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td>[key: string]</td>
              <td>任意自定义字段</td>
              <td><code>any</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>node-click</td>
              <td>点击节点时触发</td>
              <td><code>(node: TreeChartNode, nodePath: TreeChartNode[])</code></td>
            </tr>
            <tr>
              <td>toggle-expand</td>
              <td>展开/收起节点时触发</td>
              <td><code>(node: TreeChartNode, expanded: boolean)</code></td>
            </tr>
            <tr>
              <td>update:expanded-keys</td>
              <td>展开状态变化时触发（受控模式）</td>
              <td><code>(keys: (string | number)[])</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Methods</h3>
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
              <td>zoomIn</td>
              <td>放大</td>
              <td>-</td>
            </tr>
            <tr>
              <td>zoomOut</td>
              <td>缩小</td>
              <td>-</td>
            </tr>
            <tr>
              <td>resetView</td>
              <td>重置视图</td>
              <td>-</td>
            </tr>
            <tr>
              <td>setLayout</td>
              <td>设置布局方向</td>
              <td><code>(layout: 'horizontal' | 'vertical')</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyTreeChart from '@/components/xly-tree-chart/index.vue'
import type { TreeChartNode } from '@/components/xly-tree-chart/index.vue'

// ===== 数据结构示例 =====
const structureData: TreeChartNode[] = [
  {
    id: 'root',
    label: '根节点',
    children: [
      {
        id: 'child-1',
        label: '子节点 1',
        children: [
          { id: 'leaf-1', label: '叶子节点 A' },
          { id: 'leaf-2', label: '叶子节点 B' },
        ],
      },
      {
        id: 'child-2',
        label: '子节点 2（自定义颜色）',
        color: '#ef4444',
      },
      {
        id: 'child-3',
        label: '子节点 3',
        children: [
          { id: 'leaf-3', label: '叶子节点 C' },
        ],
      },
    ],
  },
]

// ===== 基础数据 =====
const basicData: TreeChartNode[] = [
  {
    id: 1,
    label: '产品中心',
    children: [
      {
        id: 11,
        label: '前端研发部',
        children: [
          { id: 111, label: 'React 小组' },
          { id: 112, label: 'Vue 小组' },
          { id: 113, label: '小程序组' },
        ],
      },
      {
        id: 12,
        label: '后端研发部',
        children: [
          { id: 121, label: 'Java 组' },
          { id: 122, label: 'Python 组' },
          { id: 123, label: 'Go 组' },
        ],
      },
      {
        id: 13,
        label: 'UI 设计部',
        children: [
          { id: 131, label: '交互设计' },
          { id: 132, label: '视觉设计' },
        ],
      },
      {
        id: 14,
        label: '测试部',
        children: [
          { id: 141, label: '功能测试' },
          { id: 142, label: '自动化测试' },
        ],
      },
    ],
  },
]

// ===== 多棵树数据 =====
const multiTreeData: TreeChartNode[][] = [
  [
    {
      id: 'tree1-root',
      label: '前端技术栈',
      color: '#3b82f6',
      children: [
        { id: 'tree1-1', label: '框架', children: [
          { id: 'tree1-1-1', label: 'Vue' },
          { id: 'tree1-1-2', label: 'React' },
          { id: 'tree1-1-3', label: 'Angular' },
        ]},
        { id: 'tree1-2', label: '构建工具', children: [
          { id: 'tree1-2-1', label: 'Vite' },
          { id: 'tree1-2-2', label: 'Webpack' },
        ]},
      ],
    },
  ],
  [
    {
      id: 'tree2-root',
      label: '后端技术栈',
      color: '#10b981',
      children: [
        { id: 'tree2-1', label: '语言', children: [
          { id: 'tree2-1-1', label: 'Java' },
          { id: 'tree2-1-2', label: 'Go' },
          { id: 'tree2-1-3', label: 'Python' },
        ]},
        { id: 'tree2-2', label: '数据库', children: [
          { id: 'tree2-2-1', label: 'MySQL' },
          { id: 'tree2-2-2', label: 'Redis' },
        ]},
      ],
    },
  ],
  [
    {
      id: 'tree3-root',
      label: '运维工具',
      color: '#f59e0b',
      children: [
        { id: 'tree3-1', label: '容器化', children: [
          { id: 'tree3-1-1', label: 'Docker' },
          { id: 'tree3-1-2', label: 'K8s' },
        ]},
        { id: 'tree3-2', label: 'CI/CD', children: [
          { id: 'tree3-2-1', label: 'Jenkins' },
          { id: 'tree3-2-2', label: 'GitLab CI' },
        ]},
      ],
    },
  ],
]

// ===== 自定义节点配置 =====
const customNodeConfig = {
  nodeWidth: 180,
  nodeMinHeight: 56,
  horizontalGap: 80,
  verticalGap: 32,
  lineColor:'red'
}

// ===== 自定义颜色 =====
const customColors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

// ===== 节点样式自定义数据 =====
const customStyleData: TreeChartNode[] = [
  {
    id: 1,
    label: '产品研发部',
    // 普通状态样式
    textColor: '#1e40af',
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    // 悬停状态样式
    activeTextColor: '#ffffff',
    activeBackgroundColor: '#3b82f6',
    activeBorderColor: '#1d4ed8',
    children: [
      {
        id: 11,
        label: '前端组',
        textColor: '#166534',
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        activeTextColor: '#ffffff',
        activeBackgroundColor: '#22c55e',
        activeBorderColor: '#15803d',
        children: [
          {
            id: 111,
            label: 'React 小组',
            textColor: '#166534',
            backgroundColor: '#dcfce7',
            borderColor: '#22c55e',
          },
          {
            id: 112,
            label: 'Vue 小组',
            textColor: '#166534',
            backgroundColor: '#dcfce7',
            borderColor: '#22c55e',
          },
        ],
      },
      {
        id: 12,
        label: '后端组',
        textColor: '#92400e',
        backgroundColor: '#fef3c7',
        borderColor: '#f59e0b',
        children: [
          {
            id: 121,
            label: 'Java 组',
            textColor: '#92400e',
            backgroundColor: '#fef3c7',
            borderColor: '#f59e0b',
          },
          {
            id: 122,
            label: 'Go 组',
            textColor: '#92400e',
            backgroundColor: '#fef3c7',
            borderColor: '#f59e0b',
          },
        ],
      },
      {
        id: 13,
        label: '测试组',
        textColor: '#9f1239',
        backgroundColor: '#ffe4e6',
        borderColor: '#ef4444',
        children: [
          {
            id: 131,
            label: '功能测试',
            textColor: '#9f1239',
            backgroundColor: '#ffe4e6',
            borderColor: '#ef4444',
          },
          {
            id: 132,
            label: '自动化测试',
            textColor: '#9f1239',
            backgroundColor: '#ffe4e6',
            borderColor: '#ef4444',
          },
        ],
      },
    ],
  },
]

// ===== 企业组织架构 =====
const orgData: TreeChartNode[] = [
  {
    id: 'ceo',
    label: 'CEO',
    color: '#1a1a2e',
    children: [
      {
        id: 'cto',
        label: 'CTO',
        children: [
          {
            id: 'tech-1',
            label: '前端团队',
            children: [
              {
                id: 'tech-1-1',
                label: 'Web 开发组',
                children: [
                  { id: 'tech-1-1-1', label: 'React 工程师' },
                  { id: 'tech-1-1-2', label: 'Vue 工程师' },
                  { id: 'tech-1-1-3', label: 'Angular 工程师' },
                ],
              },
              {
                id: 'tech-1-2',
                label: '移动端组',
                children: [
                  { id: 'tech-1-2-1', label: 'iOS 工程师' },
                  { id: 'tech-1-2-2', label: 'Android 工程师' },
                  { id: 'tech-1-2-3', label: 'Flutter 工程师' },
                ],
              },
              {
                id: 'tech-1-3',
                label: '桌面端组',
                children: [
                  { id: 'tech-1-3-1', label: 'Electron 工程师' },
                  { id: 'tech-1-3-2', label: 'Tauri 工程师' },
                ],
              },
            ],
          },
          {
            id: 'tech-2',
            label: '后端团队',
            children: [
              {
                id: 'tech-2-1',
                label: 'Java 组',
                children: [
                  { id: 'tech-2-1-1', label: 'Java 高级工程师' },
                  { id: 'tech-2-1-2', label: 'Java 中级工程师' },
                  { id: 'tech-2-1-3', label: 'Java 初级工程师' },
                ],
              },
              {
                id: 'tech-2-2',
                label: 'Go 组',
                children: [
                  { id: 'tech-2-2-1', label: 'Go 高级工程师' },
                  { id: 'tech-2-2-2', label: 'Go 中级工程师' },
                ],
              },
              {
                id: 'tech-2-3',
                label: 'Python 组',
                children: [
                  { id: 'tech-2-3-1', label: 'Python 高级工程师' },
                  { id: 'tech-2-3-2', label: 'Python 中级工程师' },
                ],
              },
            ],
          },
          {
            id: 'tech-3',
            label: '算法团队',
            children: [
              {
                id: 'tech-3-1',
                label: 'AI 实验室',
                children: [
                  { id: 'tech-3-1-1', label: 'NLP 工程师' },
                  { id: 'tech-3-1-2', label: 'CV 工程师' },
                  { id: 'tech-3-1-3', label: '推荐算法工程师' },
                ],
              },
              {
                id: 'tech-3-2',
                label: '数据团队',
                children: [
                  { id: 'tech-3-2-1', label: '数据工程师' },
                  { id: 'tech-3-2-2', label: '数据分析师' },
                ],
              },
            ],
          },
          {
            id: 'tech-4',
            label: '基础架构团队',
            children: [
              {
                id: 'tech-4-1',
                label: '云原生组',
                children: [
                  { id: 'tech-4-1-1', label: 'K8s 工程师' },
                  { id: 'tech-4-1-2', label: 'DevOps 工程师' },
                ],
              },
              {
                id: 'tech-4-2',
                label: '安全组',
                children: [
                  { id: 'tech-4-2-1', label: '安全工程师' },
                  { id: 'tech-4-2-2', label: '渗透测试工程师' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cfo',
        label: 'CFO',
        children: [
          {
            id: 'fin-1',
            label: '财务部',
            children: [
              {
                id: 'fin-1-1',
                label: '会计组',
                children: [
                  { id: 'fin-1-1-1', label: '总账会计' },
                  { id: 'fin-1-1-2', label: '成本会计' },
                ],
              },
              {
                id: 'fin-1-2',
                label: '审计组',
                children: [
                  { id: 'fin-1-2-1', label: '内审专员' },
                  { id: 'fin-1-2-2', label: '外审对接' },
                ],
              },
            ],
          },
          {
            id: 'fin-2',
            label: '人力资源',
            children: [
              {
                id: 'fin-2-1',
                label: '招聘组',
                children: [
                  { id: 'fin-2-1-1', label: '校招专员' },
                  { id: 'fin-2-1-2', label: '社招专员' },
                ],
              },
              {
                id: 'fin-2-2',
                label: '培训组',
                children: [
                  { id: 'fin-2-2-1', label: '培训专员' },
                  { id: 'fin-2-2-2', label: '课程设计' },
                ],
              },
              {
                id: 'fin-2-3',
                label: '薪酬福利组',
                children: [
                  { id: 'fin-2-3-1', label: '薪酬专员' },
                  { id: 'fin-2-3-2', label: '福利专员' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'coo',
        label: 'COO',
        children: [
          {
            id: 'op-1',
            label: '运营部',
            children: [
              {
                id: 'op-1-1',
                label: '用户运营组',
                children: [
                  { id: 'op-1-1-1', label: '用户增长' },
                  { id: 'op-1-1-2', label: '用户留存' },
                ],
              },
              {
                id: 'op-1-2',
                label: '内容运营组',
                children: [
                  { id: 'op-1-2-1', label: '内容编辑' },
                  { id: 'op-1-2-2', label: '内容审核' },
                ],
              },
              {
                id: 'op-1-3',
                label: '活动运营组',
                children: [
                  { id: 'op-1-3-1', label: '活动策划' },
                  { id: 'op-1-3-2', label: '活动执行' },
                ],
              },
            ],
          },
          {
            id: 'op-2',
            label: '市场部',
            children: [
              {
                id: 'op-2-1',
                label: '品牌组',
                children: [
                  { id: 'op-2-1-1', label: '品牌经理' },
                  { id: 'op-2-1-2', label: '公关专员' },
                ],
              },
              {
                id: 'op-2-2',
                label: '渠道组',
                children: [
                  { id: 'op-2-2-1', label: '渠道经理' },
                  { id: 'op-2-2-2', label: '渠道专员' },
                ],
              },
              {
                id: 'op-2-3',
                label: '数字营销组',
                children: [
                  { id: 'op-2-3-1', label: 'SEO 工程师' },
                  { id: 'op-2-3-2', label: 'SEM 专员' },
                ],
              },
            ],
          },
          {
            id: 'op-3',
            label: '客服部',
            children: [
              {
                id: 'op-3-1',
                label: '售前组',
                children: [
                  { id: 'op-3-1-1', label: '售前工程师' },
                  { id: 'op-3-1-2', label: '方案顾问' },
                ],
              },
              {
                id: 'op-3-2',
                label: '售后组',
                children: [
                  { id: 'op-3-2-1', label: '售后工程师' },
                  { id: 'op-3-2-2', label: '技术支持' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cmo',
        label: 'CMO',
        children: [
          {
            id: 'mkt-1',
            label: '产品部',
            children: [
              {
                id: 'mkt-1-1',
                label: '产品规划组',
                children: [
                  { id: 'mkt-1-1-1', label: '产品总监' },
                  { id: 'mkt-1-1-2', label: '高级产品经理' },
                ],
              },
              {
                id: 'mkt-1-2',
                label: '产品设计组',
                children: [
                  { id: 'mkt-1-2-1', label: 'UI 设计师' },
                  { id: 'mkt-1-2-2', label: 'UX 设计师' },
                ],
              },
            ],
          },
          {
            id: 'mkt-2',
            label: '质量管理部',
            children: [
              {
                id: 'mkt-2-1',
                label: '测试组',
                children: [
                  { id: 'mkt-2-1-1', label: '测试工程师' },
                  { id: 'mkt-2-1-2', label: '测试开发工程师' },
                ],
              },
              {
                id: 'mkt-2-2',
                label: '质量保障组',
                children: [
                  { id: 'mkt-2-2-1', label: 'QA 工程师' },
                  { id: 'mkt-2-2-2', label: '流程优化专员' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

// ===== 事件处理 =====
const clickLog = ref('')
function onNodeClick(node: TreeChartNode) {
  clickLog.value = JSON.stringify({ id: node.id, label: node.label }, null, 2)
  setTimeout(() => {
    clickLog.value = ''
  }, 3000)
}

const controlledKeys = ref<(string | number)[]>([1])
const expandLog = ref('')
function onToggleExpand(node: TreeChartNode, expanded: boolean) {
  // 更新受控状态
  if (expanded) {
    if (!controlledKeys.value.includes(node.id)) {
      controlledKeys.value = [...controlledKeys.value, node.id]
    }
  } else {
    controlledKeys.value = controlledKeys.value.filter(k => k !== node.id)
  }
  expandLog.value = JSON.stringify({ id: node.id, label: node.label, expanded, controlledKeys: controlledKeys.value }, null, 2)
  setTimeout(() => {
    expandLog.value = ''
  }, 3000)
}
</script>

<style scoped lang="scss">
.tree-chart-doc {
  width: 80%;
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

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.doc-preview__body {
  padding: 24px;
  background: #fff;
}
.doc-code {
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;
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

.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}
.doc-table {
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
    white-space: nowrap;
  }
  td {
    color: #4a4a6a;
  }
  td:first-child {
    white-space: nowrap;
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

// 点击日志
.click-log {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #166534;
  animation: fade-in 0.2s ease;
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 11px;
    white-space: pre-wrap;
  }
}
.click-tag {
  background: #10b981;
  color: #fff;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
