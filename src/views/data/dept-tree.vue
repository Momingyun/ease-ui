<template>
  <div class="dept-tree-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">DeptTree 部门树</h1>
      <p class="doc-desc">
        用于展示组织架构、部门层级等树形结构数据。基于 Vue 3 实现，支持树形数据和扁平数据两种格式，
        内置展开/折叠、节点选中、高亮等功能，零第三方依赖。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>data</code> 属性即可展示部门树结构，支持树形数据直接传入。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDeptTree :data="treeData" @select="handleSelect" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree :data="treeData" @select="handleSelect" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 扁平数据 -->
    <section class="doc-section">
      <h2 class="doc-section__title">扁平数据</h2>
      <p class="doc-section__desc">
        如果传入的是带 <code>pid</code> 字段的扁平数据，组件会自动构建成树结构。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDeptTree :data="flatData" @select="handleSelect" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree :data="flatData" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 默认展开层级 -->
    <section class="doc-section">
      <h2 class="doc-section__title">默认展开层级 <code>default-expand-level</code></h2>
      <p class="doc-section__desc">
        通过 <code>default-expand-level</code> 属性控制默认展开的层级深度。设为 <code>0</code> 则全部展开。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div>
            <span class="demo-label">default-expand-level=1</span>
            <XlyDeptTree :data="treeData" :default-expand-level="1" />
          </div>
          <div>
            <span class="demo-label">default-expand-level=2</span>
            <XlyDeptTree :data="treeData" :default-expand-level="2" />
          </div>
          <div>
            <span class="demo-label">default-expand-level=0（全部展开）</span>
            <XlyDeptTree :data="treeData" :default-expand-level="0" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree :data="treeData" :default-expand-level="1" /&gt;
&lt;XlyDeptTree :data="treeData" :default-expand-level="2" /&gt;
&lt;XlyDeptTree :data="treeData" :default-expand-level="0" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 高亮当前 -->
    <section class="doc-section">
      <h2 class="doc-section__title">高亮当前选中 <code>highlight-current</code></h2>
      <p class="doc-section__desc">
        设置 <code>highlight-current</code> 属性可以高亮当前选中的节点。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDeptTree
            :data="treeData"
            :selected-id="currentId"
            :default-expand-level="2"
            @select="handleSelect2"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree
  :data="treeData"
  :selected-id="currentId"
  :default-expand-level="2"
  @select="handleSelect"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义节点字段 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义节点字段 <code>node-key</code></h2>
      <p class="doc-section__desc">
        通过 <code>node-key</code> 属性可以自定义数据中的字段名。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDeptTree
            :data="customData"
            :node-key="{ id: 'deptId', pid: 'parentId', label: 'deptName', children: 'subDepts' }"
            :default-expand-level="1"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree
  :data="customData"
  :node-key="{ id: 'deptId', pid: 'parentId', label: 'deptName', children: 'subDepts' }"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 空状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">空状态</h2>
      <p class="doc-section__desc">
        数据为空时显示的内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDeptTree :data="[]" empty-text="暂无部门" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDeptTree :data="[]" empty-text="暂无部门" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 事件示例 -->
    <section class="doc-section">
      <h2 class="doc-section__title">事件示例</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyDeptTree
            :data="treeData"
            :default-expand-level="2"
            @select="handleSelect"
            @toggle="handleToggle"
          />
          <div class="demo-events">
            <span class="demo-label">选中的节点：</span>
            <code v-if="selectedNode">{{ JSON.stringify(selectedNode) }}</code>
            <span v-else class="demo-empty">点击节点查看</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>// 选择节点
const handleSelect = (node) => {
  console.log('选中节点:', node)
}

// 展开/折叠
const handleToggle = (node, expanded) => {
  console.log(`${node.label} 节点${expanded ? '展开' : '折叠'}`)
}</code></pre>
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
              <th style="width: 160px;">属性名</th>
              <th>说明</th>
              <th style="width: 180px;">类型</th>
              <th style="width: 100px;">默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data</code></td>
              <td>部门数据，支持树形结构或带 pid 的扁平数据</td>
              <td><code>DeptNode[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>node-key</code></td>
              <td>字段映射，配置 id/pid/label/children 字段名</td>
              <td><code>NodeKey</code></td>
              <td><code>{ id: 'id', pid: 'pid', label: 'label', children: 'children' }</code></td>
            </tr>
            <tr>
              <td><code>selected-id</code></td>
              <td>当前选中的节点 ID</td>
              <td><code>string | number</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>default-expand-level</code></td>
              <td>默认展开的层级，设为 0 全部展开</td>
              <td><code>number</code></td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><code>highlight-current</code></td>
              <td>是否高亮当前选中节点</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>empty-text</code></td>
              <td>空状态文本</td>
              <td><code>string</code></td>
              <td><code>'暂无数据'</code></td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>是否显示加载状态</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th style="width: 120px;">事件名</th>
              <th>说明</th>
              <th style="width: 200px;">回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>select</code></td>
              <td>节点被选中时触发</td>
              <td><code>(node: DeptNode) =&gt; void</code></td>
            </tr>
            <tr>
              <td><code>toggle</code></td>
              <td>节点展开/折叠时触发</td>
              <td><code>(node: DeptNode, expanded: boolean) =&gt; void</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 树形数据
const treeData = [
  {
    id: '1',
    label: '总公司',
    children: [
      {
        id: '1-1',
        label: '研发部',
        children: [
          { id: '1-1-1', label: '前端组' },
          { id: '1-1-2', label: '后端组' },
          { id: '1-1-3', label: '测试组' },
        ],
      },
      {
        id: '1-2',
        label: '产品部',
        children: [
          { id: '1-2-1', label: '产品设计组' },
          { id: '1-2-2', label: '产品运营组' },
        ],
      },
      {
        id: '1-3',
        label: '市场部',
        children: [
          { id: '1-3-1', label: '市场推广组' },
          { id: '1-3-2', label: '商务合作组' },
        ],
      },
      {
        id: '1-4',
        label: '财务部',
        children: [
          { id: '1-4-1', label: '会计组' },
          { id: '1-4-2', label: '出纳组' },
        ],
      },
    ],
  },
]

// 扁平数据
const flatData = [
  { id: '1', pid: '', label: '总公司' },
  { id: '1-1', pid: '1', label: '研发部' },
  { id: '1-1-1', pid: '1-1', label: '前端组' },
  { id: '1-1-2', pid: '1-1', label: '后端组' },
  { id: '1-2', pid: '1', label: '产品部' },
  { id: '1-2-1', pid: '1-2', label: '产品设计组' },
]

// 自定义字段数据
const customData = [
  {
    deptId: '100',
    deptName: '集团总部',
    subDepts: [
      { deptId: '101', deptName: '技术中心', subDepts: [] },
      { deptId: '102', deptName: '运营中心', subDepts: [] },
    ],
  },
]

// 选中状态
const currentId = ref('1-1-1')
const selectedNode = ref<any>(null)

// 处理选择
const handleSelect = (node: any) => {
  selectedNode.value = node
  console.log('选中:', node)
}

// 处理选择2
const handleSelect2 = (node: any) => {
  currentId.value = node.id
}

// 处理展开/折叠
const handleToggle = (node: any, expanded: boolean) => {
  console.log(`${node.label} ${expanded ? '展开' : '折叠'}`)
}
</script>

<style scoped lang="scss">
.dept-tree-doc {
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

.demo-label {
  display: inline-block; margin-bottom: 8px;
  font-size: 13px; color: #8e8ea0;
}

.demo-empty {
  color: #8e8ea0; font-style: italic;
}

.demo-events {
  padding: 12px; background: #f5f7fa; border-radius: 6px; font-size: 13px;
  code { color: #409eff; }
}
</style>
