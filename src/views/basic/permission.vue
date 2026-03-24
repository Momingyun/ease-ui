<template>
  <div class="permission-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Permission 权限配置</h1>
      <p class="doc-desc">表格形式的权限配置组件，支持三/四/五级数据结构，内置父子级联动、半选状态和祖先路径自动补全。</p>
    </div>

    <!-- 联动规则说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">联动规则</h2>
      <p class="doc-section__desc">勾选任意节点时，自动联动其子级和父级。返回值始终包含完整的祖先路径。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="rule-list">
            <div class="rule-item">
              <span class="rule-tag">选中子级</span>
              <span>勾选叶子节点 → 所有祖先自动变为半选 → 返回值包含该节点 + 所有祖先路径</span>
            </div>
            <div class="rule-item">
              <span class="rule-tag">选中父级</span>
              <span>勾选父节点 → 所有子级（叶子）自动选中 → 返回值包含所有叶子 + 祖先路径</span>
            </div>
            <div class="rule-item">
              <span class="rule-tag">全选</span>
              <span>全选 → 所有节点选中 → 返回值包含全部节点</span>
            </div>
            <div class="rule-item">
              <span class="rule-tag">取消</span>
              <span>取消叶子 → 祖先重新计算状态；取消父级 → 所有子级取消 → 无用祖先自动移除</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 一级结构 -->
    <section class="doc-section">
      <h2 class="doc-section__title">一级结构</h2>
      <p class="doc-section__desc">只有模块层级。表格一列：<code>功能模块</code>。每个模块一行。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.level1" :data="dataLevel1" :max-level="1" />
        </div>
        <div class="doc-code">
          <pre><code>// 数据结构：只有模块（无children）
const data = [
  { id: 'system', label: '系统管理' },
  { id: 'content', label: '内容管理' },
  { id: 'order', label: '订单管理' }
]

&lt;xly-permission v-model="selected" :data="data" :max-level="1" /&gt;</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.level1 }}</code>
      </div>
    </section>

    <!-- 二级结构 -->
    <section class="doc-section">
      <h2 class="doc-section__title">二级结构</h2>
      <p class="doc-section__desc">模块 → 页面。表格两列：<code>功能模块 | 页面权限</code>。模块列跨行，页面列每个页面一行。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.level2" :data="dataLevel2" :max-level="2" />
        </div>
        <div class="doc-code">
          <pre><code>// 数据结构：模块 → 页面
const data = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      { id: 'user', label: '用户管理' },
      { id: 'role', label: '角色管理' },
      { id: 'menu', label: '菜单管理' }
    ]
  },
  {
    id: 'content',
    label: '内容管理',
    children: [
      { id: 'article', label: '文章管理' },
      { id: 'category', label: '分类管理' }
    ]
  }
]

&lt;xly-permission v-model="selected" :data="data" :max-level="2" /&gt;</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.level2 }}</code>
      </div>
    </section>

    <!-- 三级结构 -->
    <section class="doc-section">
      <h2 class="doc-section__title">三级结构</h2>
      <p class="doc-section__desc">模块 → 页面 → 操作。表格三列：<code>功能模块 | 页面权限 | 操作权限</code>（横向排列）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.level3" :data="dataLevel3" />
        </div>
        <div class="doc-code">
          <pre><code>// 数据结构：模块 → 页面 → 操作
const data = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          { id: 'user:view', label: '查看' },
          { id: 'user:add', label: '新增' },
          { id: 'user:edit', label: '编辑' },
          { id: 'user:delete', label: '删除' }
        ]
      }
    ]
  }
]

&lt;xly-permission v-model="selected" :data="data" /&gt;

// 勾选 user:view → 返回 ['system', 'user', 'user:view']
// 勾选用户管理全部 → 返回 ['system', 'user', 'user:view', 'user:add', 'user:edit', 'user:delete']</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.level3 }}</code>
      </div>
    </section>

    <!-- 四级结构 -->
    <section class="doc-section">
      <h2 class="doc-section__title">四级结构</h2>
      <p class="doc-section__desc">模块 → 页面 → 操作 → 功能。表格四列：<code>功能模块 | 页面权限 | 操作权限 | 功能权限</code>。通过 <code>max-level="4"</code> 设置。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.level4" :data="dataLevel4" :max-level="4" />
        </div>
        <div class="doc-code">
          <pre><code>// 数据结构：模块 → 页面 → 操作 → 功能
const data = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          {
            id: 'user:query',
            label: '查询',
            children: [
              { id: 'user:query:basic', label: '基础查询' },
              { id: 'user:query:advanced', label: '高级查询' }
            ]
          },
          {
            id: 'user:operate',
            label: '操作',
            children: [
              { id: 'user:add', label: '新增' },
              { id: 'user:edit', label: '编辑' },
              { id: 'user:delete', label: '删除' }
            ]
          }
        ]
      }
    ]
  }
]

&lt;xly-permission v-model="selected" :data="data" :max-level="4" /&gt;

// 勾选 user:query:basic → 返回 ['system', 'user', 'user:query', 'user:query:basic']
// 勾选 查询 全部 → 返回 ['system', 'user', 'user:query', 'user:query:basic', 'user:query:advanced']</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.level4 }}</code>
      </div>
    </section>

    <!-- 五级结构 -->
    <section class="doc-section">
      <h2 class="doc-section__title">五级结构</h2>
      <p class="doc-section__desc">模块 → 页面 → 操作 → 功能 → 数据。通过 <code>max-level="5"</code> 设置。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.level5" :data="dataLevel5" :max-level="5" />
        </div>
        <div class="doc-code">
          <pre><code>// 数据结构：模块 → 页面 → 操作 → 功能 → 数据
const data = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          {
            id: 'user:query',
            label: '查询',
            children: [
              {
                id: 'user:query:basic',
                label: '基础查询',
                children: [
                  { id: 'user:query:basic:exact', label: '精确查询' },
                  { id: 'user:query:basic:fuzzy', label: '模糊查询' }
                ]
              },
              {
                id: 'user:query:advanced',
                label: '高级查询',
                children: [
                  { id: 'user:query:adv:condition', label: '条件筛选' },
                  { id: 'user:query:adv:export', label: '导出结果' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

&lt;xly-permission v-model="selected" :data="data" :max-level="5" /&gt;

// 勾选 精确查询 → 返回 ['system','user','user:query','user:query:basic','user:query:basic:exact']
// 勾选 基础查询 全部 → 返回 ['system','user','user:query','user:query:basic','user:query:basic:exact','user:query:basic:fuzzy']</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.level5 }}</code>
      </div>
    </section>

    <!-- 自定义字段 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段</h2>
      <p class="doc-section__desc">通过 <code>id-key</code>、<code>label-key</code>、<code>children-key</code> 自定义数据字段名，兼容不同后端数据格式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.custom" :data="dataCustom" id-key="code" label-key="name" children-key="sub" />
        </div>
        <div class="doc-code">
          <pre><code>const data = [
  {
    code: 'system',
    name: '系统管理',
    sub: [
      {
        code: 'user',
        name: '用户管理',
        sub: [
          { code: 'user:view', name: '查看' },
          { code: 'user:add', name: '新增' }
        ]
      }
    ]
  }
]

&lt;xly-permission
  v-model="selected"
  :data="data"
  id-key="code"
  label-key="name"
  children-key="sub"
/&gt;</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值：</span>
        <code>{{ values.custom }}</code>
      </div>
    </section>

    <!-- 自定义表头 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义表头</h2>
      <p class="doc-section__desc">通过 <code>headers</code> 属性设置表头文字。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.headers" :data="dataLevel3" :headers="['功能分组', '页面名称', '操作项']" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-permission
  v-model="selected"
  :data="data"
  :headers="['功能分组', '页面名称', '操作项']"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">通过 <code>disabled</code> 禁用整个组件，或在数据中设置 <code>disabled: true</code> 禁用单个节点。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <div>
            <span class="doc-preview__label">整体禁用：</span>
            <xly-permission v-model="values.disabled" :data="dataLevel3" disabled />
          </div>
          <div>
            <span class="doc-preview__label">部分禁用：</span>
            <xly-permission v-model="values.partial" :data="dataPartial" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 整体禁用 --&gt;
&lt;xly-permission v-model="selected" :data="data" disabled /&gt;

&lt;!-- 部分禁用 --&gt;
{ id: 'user:delete', label: '删除', disabled: true }</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义禁用判断 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义禁用判断</h2>
      <p class="doc-section__desc">提供两种方式：<strong>简单配置</strong>（disabled-field + disabled-value）和 <strong>函数判断</strong>（is-disabled，用于复杂逻辑）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <div>
            <span class="doc-preview__label">简单配置（status=2 禁用）：</span>
            <xly-permission v-model="values.fieldDisabled" :data="dataFieldDisabled" disabled-field="status" :disabled-value="2" />
          </div>
          <div>
            <span class="doc-preview__label">简单配置（type in [1,2] 禁用）：</span>
            <xly-permission v-model="values.fieldDisabled2" :data="dataFieldDisabled2" disabled-field="type" :disabled-value="[1, 2]" />
          </div>
          <div>
            <span class="doc-preview__label">函数判断（复杂逻辑）：</span>
            <xly-permission v-model="values.isDisabled" :data="dataIsDisabled" :is-disabled="checkDisabled" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>// 方式1：简单配置 - 指定字段和值
&lt;!-- status === 2 禁用 --&gt;
&lt;xly-permission
  v-model="selected"
  :data="data"
  disabled-field="status"
  :disabled-value="2"
/&gt;

&lt;!-- type 为 1 或 2 时禁用 --&gt;
&lt;xly-permission
  v-model="selected"
  :data="data"
  disabled-field="type"
  :disabled-value="[1, 2]"
/&gt;

// 方式2：函数判断 - 用于复杂逻辑
const checkDisabled = (item, level) => {
  return item.status === 2 || (level > 2 && item.forbidden)
}

&lt;xly-permission
  v-model="selected"
  :data="data"
  :is-disabled="checkDisabled"
/&gt;</code></pre>
        </div>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值（简单配置1）：</span>
        <code>{{ values.fieldDisabled }}</code>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值（简单配置2）：</span>
        <code>{{ values.fieldDisabled2 }}</code>
      </div>
      <div class="doc-result">
        <span class="doc-result__label">返回值（函数判断）：</span>
        <code>{{ values.isDisabled }}</code>
      </div>
    </section>

    <!-- 无边框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">无边框模式</h2>
      <p class="doc-section__desc">通过 <code>:bordered="false"</code> 隐藏边框。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-permission v-model="values.noborder" :data="dataLevel3" :bordered="false" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-permission v-model="selected" :data="data" :bordered="false" /&gt;</code></pre>
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
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>v-model</code></td>
              <td>选中项ID数组（含祖先路径）</td>
              <td><code>(string | number)[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>权限树数据</td>
              <td><code>Permission[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>max-level</code></td>
              <td>数据层级（1/2/3/4/5），默认3</td>
              <td><code>number</code></td>
              <td><code>3</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用整个组件</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>show-select-all</code></td>
              <td>是否显示全选</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>select-all-text</code></td>
              <td>全选按钮文字</td>
              <td><code>string</code></td>
              <td><code>'全选'</code></td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td>是否显示边框</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-selected</code></td>
              <td>是否显示已选标签</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>id-key</code></td>
              <td>ID字段名</td>
              <td><code>string</code></td>
              <td><code>'id'</code></td>
            </tr>
            <tr>
              <td><code>label-key</code></td>
              <td>标签字段名</td>
              <td><code>string</code></td>
              <td><code>'label'</code></td>
            </tr>
            <tr>
              <td><code>children-key</code></td>
              <td>子级字段名</td>
              <td><code>string</code></td>
              <td><code>'children'</code></td>
            </tr>
            <tr>
              <td><code>disabled-key</code></td>
              <td>禁用字段名（布尔字段）</td>
              <td><code>string</code></td>
              <td><code>'disabled'</code></td>
            </tr>
            <tr>
              <td><code>disabled-field</code></td>
              <td>禁用判断字段名，配合 disabled-value 使用（简单配置）</td>
              <td><code>string</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>disabled-value</code></td>
              <td>禁用的字段值，支持单个值或数组。<code>string | number | (string | number)[]</code></td>
              <td><code>string | number | array</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>is-disabled</code></td>
              <td>自定义禁用判断函数，优先级最高，用于复杂逻辑。<code>(item, level) =&gt; boolean</code></td>
              <td><code>function</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>headers</code></td>
              <td>自定义表头文字</td>
              <td><code>string[]</code></td>
              <td><code>['功能模块', '页面权限', '操作权限']</code></td>
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
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td>选中值变化时触发</td>
              <td><code>(value: (string | number)[])</code></td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>选中值变化时触发</td>
              <td><code>(value: (string | number)[])</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 一级数据
const dataLevel1 = [
  { id: 'system', label: '系统管理' },
  { id: 'content', label: '内容管理' },
  { id: 'order', label: '订单管理' },
  { id: 'finance', label: '财务管理' }
]

// 二级数据
const dataLevel2 = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      { id: 'user', label: '用户管理' },
      { id: 'role', label: '角色管理' },
      { id: 'menu', label: '菜单管理' }
    ]
  },
  {
    id: 'content',
    label: '内容管理',
    children: [
      { id: 'article', label: '文章管理' },
      { id: 'category', label: '分类管理' },
      { id: 'tag', label: '标签管理' }
    ]
  },
  {
    id: 'order',
    label: '订单管理',
    children: [
      { id: 'order-list', label: '订单列表' },
      { id: 'order-refund', label: '退款管理' }
    ]
  }
]

// 三级数据
const dataLevel3 = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          { id: 'user:view', label: '查看' },
          { id: 'user:add', label: '新增' },
          { id: 'user:edit', label: '编辑' },
          { id: 'user:delete', label: '删除' }
        ]
      },
      {
        id: 'role',
        label: '角色管理',
        children: [
          { id: 'role:view', label: '查看' },
          { id: 'role:add', label: '新增' },
          { id: 'role:edit', label: '编辑' },
          { id: 'role:delete', label: '删除' }
        ]
      }
    ]
  },
  {
    id: 'content',
    label: '内容管理',
    children: [
      {
        id: 'article',
        label: '文章管理',
        children: [
          { id: 'article:view', label: '查看' },
          { id: 'article:add', label: '新增' },
          { id: 'article:edit', label: '编辑' },
          { id: 'article:delete', label: '删除' }
        ]
      }
    ]
  }
]

// 四级数据
const dataLevel4 = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          {
            id: 'user:query',
            label: '查询',
            children: [
              { id: 'user:query:basic', label: '基础查询' },
              { id: 'user:query:advanced', label: '高级查询' }
            ]
          },
          {
            id: 'user:operate',
            label: '操作',
            children: [
              { id: 'user:add', label: '新增' },
              { id: 'user:edit', label: '编辑' },
              { id: 'user:delete', label: '删除' }
            ]
          }
        ]
      },
      {
        id: 'role',
        label: '角色管理',
        children: [
          {
            id: 'role:query',
            label: '查询',
            children: [
              { id: 'role:view', label: '查看' }
            ]
          },
          {
            id: 'role:operate',
            label: '操作',
            children: [
              { id: 'role:add', label: '新增' },
              { id: 'role:edit', label: '编辑' }
            ]
          }
        ]
      }
    ]
  }
]

// 五级数据
const dataLevel5 = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          {
            id: 'user:query',
            label: '查询',
            children: [
              {
                id: 'user:query:basic',
                label: '基础查询',
                children: [
                  { id: 'user:query:basic:exact', label: '精确查询' },
                  { id: 'user:query:basic:fuzzy', label: '模糊查询' }
                ]
              },
              {
                id: 'user:query:advanced',
                label: '高级查询',
                children: [
                  { id: 'user:query:adv:condition', label: '条件筛选' },
                  { id: 'user:query:adv:export', label: '导出结果' }
                ]
              }
            ]
          },
          {
            id: 'user:operate',
            label: '操作',
            children: [
              {
                id: 'user:add',
                label: '新增',
                children: [
                  { id: 'user:add:single', label: '单个新增' },
                  { id: 'user:add:batch', label: '批量新增' }
                ]
              },
              {
                id: 'user:delete',
                label: '删除',
                children: [
                  { id: 'user:delete:single', label: '单个删除' },
                  { id: 'user:delete:batch', label: '批量删除' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// 自定义字段数据
const dataCustom = [
  {
    code: 'system',
    name: '系统管理',
    sub: [
      {
        code: 'user',
        name: '用户管理',
        sub: [
          { code: 'user:view', name: '查看' },
          { code: 'user:add', name: '新增' }
        ]
      }
    ]
  }
]

// 部分禁用数据
const dataPartial = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          { id: 'user:view', label: '查看' },
          { id: 'user:add', label: '新增' },
          { id: 'user:delete', label: '删除', disabled: true }
        ]
      }
    ]
  }
]

// 自定义禁用判断数据1：用于简单配置
const dataFieldDisabled = [
  {
    id: 'system',
    label: '系统管理',
    status: 0,
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          { id: 'user:view', label: '查看', status: 0 },
          { id: 'user:add', label: '新增', status: 0 },
          { id: 'user:edit', label: '编辑', status: 1 },
          { id: 'user:delete', label: '删除', status: 2 }
        ]
      }
    ]
  }
]

// 自定义禁用判断数据2：用于简单配置（多个值）
const dataFieldDisabled2 = [
  {
    id: 'content',
    label: '内容管理',
    children: [
      {
        id: 'article',
        label: '文章管理',
        children: [
          { id: 'article:view', label: '查看', type: 0 },
          { id: 'article:add', label: '新增', type: 0 },
          { id: 'article:edit', label: '编辑', type: 1 },
          { id: 'article:delete', label: '删除', type: 2 },
          { id: 'article:publish', label: '发布', type: 3 }
        ]
      }
    ]
  }
]

// 自定义禁用判断数据：用于函数判断
const dataIsDisabled = [
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'user',
        label: '用户管理',
        children: [
          { id: 'user:view', label: '查看' },
          { id: 'user:add', label: '新增' },
          { id: 'user:edit', label: '编辑', status: 1 },
          { id: 'user:delete', label: '删除', status: 2 }
        ]
      }
    ]
  }
]

// 自定义禁用判断函数（复杂逻辑示例）
const checkDisabled = (item: any, level: number) => {
  // 示例：status=2 禁用，或者三级以上且 forbidden=true 禁用
  return item.status === 2 || (level > 2 && item.forbidden === true)
}

// 各示例的选中值
const values = reactive({
  level1: [] as (string | number)[],
  level2: [] as (string | number)[],
  level3: [] as (string | number)[],
  level4: [] as (string | number)[],
  level5: [] as (string | number)[],
  custom: [] as (string | number)[],
  headers: [] as (string | number)[],
  disabled: [] as (string | number)[],
  partial: [] as (string | number)[],
  noborder: [] as (string | number)[],
  fieldDisabled: [] as (string | number)[],
  fieldDisabled2: [] as (string | number)[],
  isDisabled: [] as (string | number)[]
})
</script>

<style scoped lang="scss">
.permission-doc {
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
.doc-preview__label {
  font-size: 13px; font-weight: 600; color: #4a4a6a; margin-bottom: 8px;
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

.doc-result {
  margin-top: 10px; padding: 10px 16px;
  background: #f5f6fa; border-radius: 8px; font-size: 13px;
  word-break: break-all;
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    color: #4f6ef7;
  }
  &__label {
    font-weight: 600; color: #4a4a6a; margin-right: 8px;
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

// 联动规则
.rule-list {
  display: flex; flex-direction: column; gap: 12px; width: 100%;
}
.rule-item {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 13px; color: #4a4a6a; line-height: 1.6;
}
.rule-tag {
  flex-shrink: 0;
  display: inline-block;
  padding: 2px 8px;
  background: #f0f2ff; color: #4f6ef7;
  border-radius: 4px; font-size: 12px; font-weight: 500;
}
</style>
