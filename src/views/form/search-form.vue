<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">搜索表单 SearchForm</h1>
      <p class="doc-desc">基于 xly 组件库的搜索表单,支持多种表单控件、展开/收起等功能。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">最简单的搜索表单,通过 <code>items</code> 配置搜索项。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySearchForm v-model="searchData1" :items="basicItems" @search="handleSearch" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;template&gt;
  &lt;XlySearchForm v-model="searchData" :items="items" @search="handleSearch" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const searchData = ref({})

const items = [
  { prop: 'name', label: '姓名', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]}
]

const handleSearch = (data) =&gt; {
  console.log('搜索数据:', data)
}
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">多种类型</h2>
      <p class="doc-section__desc">支持输入框、选择器、日期选择器等多种类型。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySearchForm v-model="searchData2" :items="multipleTypeItems" @search="handleSearch" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>const items = [
  { prop: 'keyword', label: '关键词', type: 'input', placeholder: '请输入关键词' },
  { prop: 'type', label: '类型', type: 'select', options: [
    { label: '类型A', value: 'A' },
    { label: '类型B', value: 'B' }
  ]},
  { prop: 'date', label: '日期', type: 'date', placeholder: '请选择日期' },
  { prop: 'beginDate', label: '日期范围', type: 'daterange', endProp: 'endDate', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
  { prop: 'beginTime', label: '时间范围', type: 'timerange', endProp: 'endTime', startPlaceholder: '开始时间', endPlaceholder: '结束时间' },
  { prop: 'beginDateTime', label: '日期时间范围', type: 'datetimerange', endProp: 'endDateTime', showSeconds: true, startPlaceholder: '开始时间', endPlaceholder: '结束时间' }
]

// 结果会直接绑定到两个属性
// { beginDate: '2024-01-01', endDate: '2024-01-31' }</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义列宽</h2>
      <p class="doc-section__desc">通过 <code>span</code> 属性控制每个表单项占据的列数。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySearchForm v-model="searchData3" :items="spanItems" @search="handleSearch" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>const items = [
  { prop: 'name', label: '姓名', type: 'input', span: 6 },
  { prop: 'phone', label: '手机号', type: 'input', span: 6 },
  { prop: 'email', label: '邮箱', type: 'input', span: 6 },
  { prop: 'address', label: '地址', type: 'input', span: 12 }
]</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">展开/收起</h2>
      <p class="doc-section__desc">
        通过 <code>show-expand-button</code> 显示展开按钮,配合
        <code>hidden-when-collapsed</code> 控制某些字段在收起时隐藏。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySearchForm
            v-model="searchData4"
            :items="expandItems"
            show-expand-button
            @search="handleSearch"
          />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>const items = [
  { prop: 'name', label: '姓名', type: 'input' },
  { prop: 'phone', label: '手机号', type: 'input' },
  { prop: 'email', label: '邮箱', type: 'input' },
  { prop: 'address', label: '地址', type: 'input', hiddenWhenCollapsed: true },
  { prop: 'remark', label: '备注', type: 'textarea', rows: 2, hiddenWhenCollapsed: true }
]

&lt;XlySearchForm
  v-model="searchData"
  :items="items"
  show-expand-button
  @search="handleSearch"
/&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段</h2>
      <p class="doc-section__desc">通过 <code>type="custom"</code> 和插槽实现自定义字段。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySearchForm v-model="searchData5" :items="customItems" @search="handleSearch">
            <template #field-department="{ modelValue, item, formData, updateModelValue }">
              <XlySelect
                :model-value="modelValue"
                @update:model-value="updateModelValue"
                placeholder="请选择部门"
                :options="departmentOptions"
                clearable
              />
            </template>
          </XlySearchForm>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySearchForm v-model="searchData" :items="items" @search="handleSearch"&gt;
  &lt;template #field-department="{ modelValue, item, formData, updateModelValue }"&gt;
    &lt;XlySelect
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      placeholder="请选择部门"
      :options="departmentOptions"
      clearable
    /&gt;
  &lt;/template&gt;
&lt;/XlySearchForm&gt;

const items = [
  { prop: 'department', label: '部门', type: 'custom' }
]</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">API 文档</h2>
      <div class="doc-api">
        <h3 class="doc-api__title">SearchForm Props</h3>
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
                <td>items</td>
                <td>搜索项配置数组</td>
                <td>SearchItem[]</td>
                <td>[]</td>
              </tr>
              <tr>
                <td>modelValue</td>
                <td>表单数据(v-model)</td>
                <td>Record&lt;string, any&gt;</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>inline</td>
                <td>是否内联布局</td>
                <td>boolean</td>
                <td>true</td>
              </tr>
              <tr>
                <td>size</td>
                <td>组件尺寸</td>
                <td>'large' | 'default' | 'small'</td>
                <td>'default'</td>
              </tr>
              <tr>
                <td>loading</td>
                <td>加载状态</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>searchButtonText</td>
                <td>搜索按钮文本</td>
                <td>string</td>
                <td>'查询'</td>
              </tr>
              <tr>
                <td>resetButtonText</td>
                <td>重置按钮文本</td>
                <td>string</td>
                <td>'重置'</td>
              </tr>
              <tr>
                <td>showExpandButton</td>
                <td>是否显示展开按钮</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>defaultExpanded</td>
                <td>默认展开状态</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>是否禁用</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-api__title">SearchItem 配置项</h3>
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
                <td>prop</td>
                <td>字段名(必填)</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>label</td>
                <td>标签文本(必填)</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>span</td>
                <td>栅格占据的列数</td>
                <td>number</td>
                <td>-</td>
              </tr>
              <tr>
                <td>type</td>
                <td>组件类型</td>
                <td>
                  'input' | 'textarea' | 'select' | 'date' | 'daterange' | 'datetime' |
                  'datetimerange' | 'time' | 'timerange' | 'cascader' | 'custom'
                </td>
                <td>'input'</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>占位符</td>
                <td>string</td>
                <td>'请输入{label}'</td>
              </tr>
              <tr>
                <td>clearable</td>
                <td>是否可清空</td>
                <td>boolean</td>
                <td>true</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>是否禁用</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>readonly</td>
                <td>是否只读</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>maxlength</td>
                <td>最大长度</td>
                <td>number</td>
                <td>-</td>
              </tr>
              <tr>
                <td>showWordLimit</td>
                <td>是否显示字数统计</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>prefixIcon</td>
                <td>前缀图标</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>suffixIcon</td>
                <td>后缀图标</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>rows</td>
                <td>textarea 行数</td>
                <td>number</td>
                <td>2</td>
              </tr>
              <tr>
                <td>options</td>
                <td>选项列表(select 用)</td>
                <td>Array&lt;{ label, value }&gt;</td>
                <td>[]</td>
              </tr>
              <tr>
                <td>multiple</td>
                <td>是否多选(select 用)</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>filterable</td>
                <td>是否可搜索(select、cascader 用)</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>valueType</td>
                <td>多选时返回值的类型，'array' 返回数组，'string' 返回逗号分隔的字符串（select、cascader 用）</td>
                <td>'array' | 'string'</td>
                <td>'array'</td>
              </tr>
              <tr>
                <td>separator</td>
                <td>多选且 valueType='string' 时的分隔符（select、cascader 用）</td>
                <td>string</td>
                <td>','</td>
              </tr>
              <tr>
                <td>cascaderOptions</td>
                <td>级联选择器选项（cascader 用）</td>
                <td>Array&lt;{ label, value, children }&gt;</td>
                <td>[]</td>
              </tr>
              <tr>
                <td>format</td>
                <td>日期格式</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>valueFormat</td>
                <td>日期值格式</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>rangeSeparator</td>
                <td>范围分隔符</td>
                <td>string</td>
                <td>至</td>
              </tr>
              <tr>
                <td>startPlaceholder</td>
                <td>开始日期占位符</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>endPlaceholder</td>
                <td>结束日期占位符</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>endProp</td>
                <td>范围选择结束属性名（daterange、datetimerange、timerange 用）</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>showSeconds</td>
                <td>是否显示秒（datetime、datetimerange 用）</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>defaultValue</td>
                <td>默认值</td>
                <td>any</td>
                <td>null</td>
              </tr>
              <tr>
                <td>hiddenWhenCollapsed</td>
                <td>收起时是否隐藏</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-api__title">Events</h3>
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
                <td>search</td>
                <td>搜索事件</td>
                <td>表单数据</td>
              </tr>
              <tr>
                <td>reset</td>
                <td>重置事件</td>
                <td>-</td>
              </tr>
              <tr>
                <td>expand</td>
                <td>展开/收起事件</td>
                <td>展开状态</td>
              </tr>
              <tr>
                <td>update:modelValue</td>
                <td>表单数据变化</td>
                <td>表单数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-api__title">Slots</h3>
        <div class="doc-table">
          <table>
            <thead>
              <tr>
                <th>插槽名</th>
                <th>说明</th>
                <th>参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>field-{prop}</td>
                <td>自定义字段插槽</td>
                <td>{ modelValue, item, formData, updateModelValue }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlySearchForm from '@/components/xly-search-form/index.vue'

// 基础用法
const searchData1 = ref({})
const basicItems = [
  { prop: 'name', label: '姓名', type: 'input' },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
]

// 多种类型
const searchData2 = ref({
  beginDate: '',
  endDate: '',
  beginTime: '',
  endTime: '',
  beginDateTime: '',
  endDateTime: '',
})
const multipleTypeItems = [
  { prop: 'keyword', label: '关键词', type: 'input', placeholder: '请输入关键词' },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    options: [
      { label: '类型A', value: 'A' },
      { label: '类型B', value: 'B' },
      { label: '类型C', value: 'C' },
    ],
  },
  { prop: 'date', label: '日期', type: 'date', placeholder: '请选择日期' },
  {
    prop: 'beginDate',
    label: '日期范围',
    type: 'daterange',
    endProp: 'endDate',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    span: 6,
  },
  {
    prop: 'beginTime',
    label: '时间范围',
    type: 'timerange',
    endProp: 'endTime',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    span: 6,
  },
  {
    prop: 'beginDateTime',
    label: '日期时间范围',
    type: 'datetimerange',
    endProp: 'endDateTime',
    showSeconds: true,
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    span: 6,
  },
]

// 自定义列宽
const searchData3 = ref({})
const spanItems = [
  { prop: 'name', label: '姓名', type: 'input', span: 6 },
  { prop: 'phone', label: '手机号', type: 'input', span: 6 },
  { prop: 'email', label: '邮箱', type: 'input', span: 6 },
  { prop: 'address', label: '地址', type: 'input', span: 12 },
]

// 展开/收起
const searchData4 = ref({})
const expandItems = [
  { prop: 'name', label: '姓名', type: 'input' },
  { prop: 'phone', label: '手机号', type: 'input' },
  { prop: 'email', label: '邮箱', type: 'input' },
  { prop: 'address', label: '地址', type: 'input', hiddenWhenCollapsed: true },
  { prop: 'remark', label: '备注', type: 'textarea', rows: 2, hiddenWhenCollapsed: true },
]

// 自定义字段
const searchData5 = ref({})
const customItems = [
  { prop: 'name', label: '姓名', type: 'input' },
  { prop: 'department', label: '部门', type: 'custom' },
]
const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '市场部', value: 'marketing' },
]

// 搜索处理
const handleSearch = (data: any) => {
  console.log('搜索数据:', data)
}
</script>

<style scoped lang="scss">
.component-doc {
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
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
.doc-api {
  .doc-api__title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 24px 0 12px;
  }
}
</style>
