<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">级联选择器 Cascader</h1>
      <p class="doc-desc">通过多层级联菜单逐级选择，支持懒加载、多选、搜索过滤、手风琴模式等功能。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过 <code>options</code> 传入树形数据，每个节点包含 <code>value</code>、<code>label</code> 和可选的 <code>children</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val1" :options="areaOptions" placeholder="请选择地区" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ JSON.stringify(val1) }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" placeholder="请选择地区" /&gt;

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      { label: '杭州市', value: 'hangzhou', children: [
        { label: '西湖区', value: 'xihu' },
        { label: '余杭区', value: 'yuhang' },
      ]},
    ],
  },
]</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">可清除</h2>
      <p class="doc-section__desc">设置 <code>clearable</code> 属性后，选中值右侧会出现清除图标。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val2" :options="areaOptions" placeholder="可清除" clearable />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" clearable /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">多选</h2>
      <p class="doc-section__desc">设置 <code>multiple</code> 属性后，可选择多个路径，选中项以标签形式展示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 400px;">
            <XlyCascader
              v-model="val3"
              :options="areaOptions"
              placeholder="可多选"
              multiple
              :max-tag-count="2"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ JSON.stringify(val3) }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" multiple :max-tag-count="2" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">返回值类型</h2>
      <p class="doc-section__desc">
        通过 <code>valueType</code> 属性可以设置多选时返回值的类型。支持 <code>'array'</code>（返回二维数组）和 <code>'string'</code>（返回路径字符串）两种模式。
        <code>separator</code> 属性可以自定义字符串模式下多条路径间的分隔符，默认为 <code>','</code>。路径内部使用 <code>/</code> 分隔各级节点。
        此功能也支持默认传入字符串值，组件会自动解析为二维数组进行渲染。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 400px;">
            <XlyCascader
              v-model="val10"
              :options="areaOptions"
              placeholder="返回二维数组（默认）"
              multiple
              value-type="array"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（二维数组）：{{ JSON.stringify(val10) }}</span>

          <div style="width: 400px;">
            <XlyCascader
              v-model="val11"
              :options="areaOptions"
              placeholder="返回字符串（逗号分隔）"
              multiple
              value-type="string"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（字符串）：{{ val11 }}</span>

          <div style="width: 400px;">
            <XlyCascader
              v-model="val12"
              :options="areaOptions"
              placeholder="自定义分隔符（分号）"
              multiple
              value-type="string"
              separator=";"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（分号分隔）：{{ val12 }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>// 1. 返回二维数组（默认）
&lt;XlyCascader v-model="value" :options="options" multiple value-type="array" /&gt;
// 输出: [["zhejiang", "hangzhou", "xihu"], ["jiangsu", "nanjing", "xuanwu"]]

// 2. 返回字符串（逗号分隔多条路径，/ 分隔路径内节点）
&lt;XlyCascader v-model="value" :options="options" multiple value-type="string" /&gt;
// 输出: "zhejiang/hangzhou/xihu,jiangsu/nanjing/xuanwu"

// 3. 自定义分隔符
&lt;XlyCascader v-model="value" :options="options" multiple value-type="string" separator=";" /&gt;
// 输出: "zhejiang/hangzhou/xihu;jiangsu/nanjing/xuanwu"

// 4. 支持默认传入字符串值，组件会自动解析
const value = ref("zhejiang/hangzhou/xihu,jiangsu/nanjing/xuanwu")
// 组件会自动将其解析为 [["zhejiang", "hangzhou", "xihu"], ["jiangsu", "nanjing", "xuanwu"]] 进行渲染</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">可搜索</h2>
      <p class="doc-section__desc">设置 <code>filterable</code> 属性后，可通过输入关键字快速筛选选项，搜索结果展示完整路径。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val4" :options="areaOptions" placeholder="搜索地区..." filterable />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" filterable /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">禁用选项 & 禁用状态</h2>
      <p class="doc-section__desc">通过在选项中设置 <code>disabled: true</code> 来禁用单个选项，或通过 <code>disabled</code> 属性禁用整个选择器。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val5" :options="disabledOptions" placeholder="含禁用选项" />
          </div>
          <div style="width: 300px;">
            <XlyCascader v-model="val5" :options="areaOptions" placeholder="整组禁用" disabled />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" /&gt;
&lt;XlyCascader v-model="value" :options="options" disabled /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置三种尺寸。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val6" :options="areaOptions" placeholder="大尺寸" size="large" />
          </div>
          <div style="width: 300px;">
            <XlyCascader v-model="val6" :options="areaOptions" placeholder="默认尺寸" />
          </div>
          <div style="width: 300px;">
            <XlyCascader v-model="val6" :options="areaOptions" placeholder="小尺寸" size="small" />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" size="large" /&gt;
&lt;XlyCascader v-model="value" :options="options" /&gt;
&lt;XlyCascader v-model="value" :options="options" size="small" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">选择任意层级</h2>
      <p class="doc-section__desc">默认只能选择末级节点，设置 <code>check-strictly</code> 后可选择任意层级节点，同时非叶子节点选中后仍会展开下级菜单。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader v-model="val7" :options="areaOptions" placeholder="可选中任意层级" check-strictly clearable  filterable multiple/>
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ JSON.stringify(val7) }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader v-model="value" :options="options" check-strictly clearable filterable multiple/&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段名</h2>
      <p class="doc-section__desc">
        当后端返回的字段名不是 <code>value</code> / <code>label</code> / <code>children</code> 时，可以通过 <code>valueKey</code>、<code>labelKey</code>、<code>childrenKey</code> 自定义映射。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader
              v-model="val8"
              :options="customFieldOptions"
              value-key="id"
              label-key="name"
              children-key="subList"
              placeholder="自定义字段名"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ JSON.stringify(val8) }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader
  v-model="value"
  :options="options"
  value-key="id"
  label-key="name"
  children-key="subList"
/&gt;

const options = [
  {
    name: '电子产品',
    id: 100,
    subList: [
      { name: '手机', id: 101, subList: [
        { name: 'iPhone', id: 102 },
        { name: '华为', id: 103 },
      ]},
    ],
  },
]</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">远程搜索</h2>
      <p class="doc-section__desc">
        设置 <code>remote</code> 和 <code>remote-method</code> 属性启用远程搜索。搜索关键字将通过 <code>remote-method</code> 回调传入，你可以在回调中发起请求并通过组件实例的 <code>remoteOptions</code> 更新搜索结果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyCascader
              ref="remoteCascaderRef"
              v-model="val9"
              :options="[]"
              placeholder="远程搜索地区..."
              filterable
              remote
              :remote-method="remoteCascaderSearch"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ JSON.stringify(val9) }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyCascader
  ref="cascaderRef"
  v-model="value"
  :options="[]"
  filterable
  remote
  :remote-method="handleRemoteSearch"
  clearable
/&gt;

// 在 remoteMethod 中发起远程请求并更新搜索结果
function handleRemoteSearch(query: string) {
  fetchOptions(query).then(options =&gt; {
    // 将扁平化的远程结果转换为组件需要的格式
    cascaderRef.value?.remoteOptions.push(...)
  })
}</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>绑定值，单选时为路径数组，多选时为路径数组的二维数组</td><td><code>(string|number)[] | (string|number)[][]</code></td><td><code>[]</code></td></tr>
            <tr><td><code>options</code></td><td>选项数据（树形结构）</td><td><code>CascaderNode[]</code></td><td><code>[]</code></td></tr>
            <tr><td><code>placeholder</code></td><td>占位文本</td><td><code>string</code></td><td><code>'请选择'</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>clearable</code></td><td>是否可清除</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>filterable</code></td><td>是否可搜索</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>multiple</code></td><td>是否多选</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>valueType</code></td><td>多选时返回值的类型，'array' 返回二维数组，'string' 返回路径字符串（路径内用 / 分隔）</td><td><code>'array' | 'string'</code></td><td><code>'array'</code></td></tr>
            <tr><td><code>separator</code></td><td>多选且 valueType='string' 时多条路径间的分隔符，路径内使用 / 分隔</td><td><code>string</code></td><td><code>','</code></td></tr>
            <tr><td><code>maxTagCount</code></td><td>多选时最多显示的标签数</td><td><code>number</code></td><td><code>3</code></td></tr>
            <tr><td><code>size</code></td><td>尺寸</td><td><code>'large' | 'default' | 'small'</code></td><td><code>'default'</code></td></tr>
            <tr><td><code>lazyLoad</code></td><td>懒加载回调函数</td><td><code>(node, callback) =&gt; void</code></td><td>—</td></tr>
            <tr><td><code>expandTrigger</code></td><td>展开子菜单的触发方式</td><td><code>'click' | 'hover'</code></td><td><code>'click'</code></td></tr>
            <tr><td><code>accordion</code></td><td>是否开启手风琴模式</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>checkStrictly</code></td><td>是否可以选择任意层级节点</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>valueKey</code></td><td>选项值对应的字段名</td><td><code>string</code></td><td><code>'value'</code></td></tr>
            <tr><td><code>labelKey</code></td><td>选项标签对应的字段名</td><td><code>string</code></td><td><code>'label'</code></td></tr>
            <tr><td><code>childrenKey</code></td><td>子节点字段名</td><td><code>string</code></td><td><code>'children'</code></td></tr>
            <tr><td><code>remote</code></td><td>是否启用远程搜索</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>remoteMethod</code></td><td>远程搜索方法</td><td><code>(query: string) =&gt; void</code></td><td>—</td></tr>
            <tr><td><code>loading</code></td><td>是否显示加载中状态</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>debounce</code></td><td>远程搜索防抖延迟（毫秒）</td><td><code>number</code></td><td><code>300</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">CascaderNode</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>字段</th><th>说明</th><th>类型</th></tr></thead>
          <tbody>
            <tr><td><code>value</code></td><td>节点值（必填），可通过 <code>valueKey</code> 修改</td><td><code>string | number</code></td></tr>
            <tr><td><code>label</code></td><td>节点显示文本（必填），可通过 <code>labelKey</code> 修改</td><td><code>string</code></td></tr>
            <tr><td><code>children</code></td><td>子节点数组，可通过 <code>childrenKey</code> 修改</td><td><code>CascaderNode[]</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td></tr>
            <tr><td><code>leaf</code></td><td>是否为叶子节点（用于懒加载）</td><td><code>boolean</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>update:modelValue</code></td><td>值变化时触发</td><td><code>(value)</code></td></tr>
            <tr><td><code>change</code></td><td>值变化时触发</td><td><code>(value)</code></td></tr>
            <tr><td><code>expand-change</code></td><td>展开子菜单时触发</td><td><code>(value: (string|number)[])</code></td></tr>
            <tr><td><code>search</code></td><td>远程搜索时触发</td><td><code>(query: string)</code></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyCascader from '@/components/xly-cascader/index.vue'

const val1 = ref<(string | number)[]>([])
const val2 = ref<(string | number)[]>([])
const val3 = ref<(string | number)[][]>([])
const val4 = ref<(string | number)[]>([])
const val5 = ref<(string | number)[]>([])
const val6 = ref<(string | number)[]>([])
const val7 = ref<(string | number)[]>([])
const val8 = ref<(string | number)[]>([])
const val9 = ref<(string | number)[]>([])
const val10 = ref<(string | number)[][]>([])
const val11 = ref<string>()
const val12 = ref<string>()

// 远程搜索示例
const remoteCascaderRef = ref<InstanceType<typeof XlyCascader> | null>(null)

function remoteCascaderSearch(query: string) {
  if (!remoteCascaderRef.value) return
  // 模拟远程搜索：将扁平化的搜索结果推入 remoteOptions
  const cascader = remoteCascaderRef.value
  cascader.remoteOptions = []
  if (!query) return

  // 从本地数据模拟搜索结果
  const q = query.toLowerCase()
  function search(nodes: any[], path: (string | number)[] = [], pathLabels: string[] = []): any[] {
    const results: any[] = []
    for (const node of nodes) {
      const currentPath = [...path, node.value]
      const currentLabels = [...pathLabels, node.label]
      if ((node.label as string).toLowerCase().includes(q)) {
        results.push({
          value: currentPath[0],
          label: currentLabels.join(' / '),
          children: currentPath.length > 1 ? [{
            value: currentPath[1],
            label: currentLabels[1],
            children: currentPath.length > 2 ? [{ value: currentPath[2], label: currentLabels[2] }] : [],
          }] : [],
        })
      }
      if (node.children) {
        results.push(...search(node.children, currentPath, currentLabels))
      }
    }
    return results
  }
  cascader.remoteOptions = search(areaOptions)
}

const areaOptions = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
          { label: '滨江区', value: 'binjiang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '鄞州区', value: 'yinzhou' },
        ],
      },
      {
        label: '温州市',
        value: 'wenzhou',
        children: [
          { label: '鹿城区', value: 'lucheng' },
          { label: '龙湾区', value: 'longwan' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '鼓楼区', value: 'gulou' },
        ],
      },
      {
        label: '苏州市',
        value: 'suzhou',
        children: [
          { label: '姑苏区', value: 'gusu' },
          { label: '工业园区', value: 'gongyeyuanqu' },
        ],
      },
    ],
  },
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
        children: [
          { label: '天河区', value: 'tianhe' },
          { label: '越秀区', value: 'yuexiu' },
        ],
      },
      {
        label: '深圳市',
        value: 'shenzhen',
        children: [
          { label: '南山区', value: 'nanshan' },
          { label: '福田区', value: 'futian' },
        ],
      },
    ],
  },
]

const disabledOptions = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区（禁用）', value: 'yuhang', disabled: true },
        ],
      },
      { label: '宁波市（禁用）', value: 'ningbo', disabled: true },
    ],
  },
]

const customFieldOptions = [
  {
    name: '电子产品',
    id: 100,
    subList: [
      {
        name: '手机',
        id: 101,
        subList: [
          { name: 'iPhone', id: 102 },
          { name: '华为', id: 103 },
          { name: '小米', id: 104 },
        ],
      },
      {
        name: '电脑',
        id: 105,
        subList: [
          { name: '笔记本', id: 106 },
          { name: '台式机', id: 107 },
        ],
      },
    ],
  },
  {
    name: '服饰',
    id: 200,
    subList: [
      {
        name: '男装',
        id: 201,
        subList: [
          { name: 'T恤', id: 202 },
          { name: '外套', id: 203 },
        ],
      },
      {
        name: '女装',
        id: 204,
        subList: [
          { name: '连衣裙', id: 205 },
          { name: '半裙', id: 206 },
        ],
      },
    ],
  },
]
</script>

<style scoped lang="scss">
.component-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6;
  code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; }
}
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto;
  pre { margin: 0; padding: 0; }
  code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; }
}
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; }
  td { color: #4a4a6a; }
  code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; }
}
</style>
