<template>
  <div class="dict-select-doc">
    <!-- ===== 头部 ===== -->
    <div class="doc-header">
      <h1 class="doc-title">DictSelect 字典选择器</h1>
      <p class="doc-desc">根据字典类型自动请求并渲染下拉选项，无需手动维护选项列表，支持单选/多选，可对接任意后端字典接口。</p>
    </div>

    <!-- ===== 1. 基础单选 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <div class="doc-preview">
        <div class="preview-row">
          <xly-dict-select
            v-model="single1"
            dict-type="user_status"
            placeholder="请选择用户状态"
            style="width: 220px"
          />
          <span class="preview-value">当前值：<code>{{ JSON.stringify(single1) }}</code></span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code1 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 2. 多选 array 格式 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">多选 — Array 格式（默认）</h2>
      <p class="doc-section__desc">
        设置 <code>multiple</code> 开启多选，<code>v-model</code> 绑定值为 <code>string[]</code>。
        也可传入逗号拼接的字符串，组件会自动拆分。
      </p>
      <div class="doc-preview">
        <div class="preview-row wrap">
          <xly-dict-select
            v-model="multi1"
            dict-type="approve_status"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择审批状态（多选）"
            style="width: 300px"
          />
          <span class="preview-value">当前值：<code>{{ JSON.stringify(multi1) }}</code></span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code2 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 3. 多选 string 格式 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">多选 — 逗号字符串格式</h2>
      <p class="doc-section__desc">
        设置 <code>value-format="string"</code>，则 <code>v-model</code> 输出逗号拼接的字符串，
        方便直接存入数据库或表单。
      </p>
      <div class="doc-preview">
        <div class="preview-row wrap">
          <xly-dict-select
            v-model="multi2"
            dict-type="order_status"
            multiple
            value-format="string"
            filterable
            placeholder="请选择订单状态（多选，逗号格式）"
            style="width: 300px"
          />
          <span class="preview-value">当前值：<code>{{ JSON.stringify(multi2) }}</code></span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code3 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 4. 自定义字段名 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">自定义字段名</h2>
    <p class="doc-section__desc">
      组件默认用 <code>labelName</code>（显示文本）作为下拉选项，
      通过 <code>label-field</code> 可切换为 <code>labelValue</code>（英文代码）。
    </p>
      <div class="doc-preview">
        <div class="preview-row">
          <xly-dict-select
            v-model="custom1"
            dict-type="user_status"
            label-field="labelValue"
            placeholder="请选择（labelField=labelValue 显示英文代码）"
            style="width: 280px"
          />
          <span class="preview-value">当前值：<code>{{ JSON.stringify(custom1) }}</code></span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code4 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 4.1 自定义返回值字段 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">自定义返回值字段</h2>
      <p class="doc-section__desc">
        默认 <code>return-field="id"</code>，返回数字/字符串 ID。
        设为 <code>return-field="labelValue"</code> 则返回英文代码（如 NORMAL/DISABLED）。
      </p>
      <div class="doc-preview">
        <div class="preview-row">
          <xly-dict-select
            v-model="custom2"
            dict-type="user_status"
            return-field="labelValue"
            placeholder="返回 labelValue（英文代码）"
            style="width: 300px"
          />
          <span class="preview-value">当前值：<code>{{ JSON.stringify(custom2) }}</code></span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code4_1 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 5. change 事件 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">监听 change 事件</h2>
      <p class="doc-section__desc">
        <code>@change</code> 事件除了值之外，还会返回完整的字典项对象，方便获取 label 等额外信息。
      </p>
      <div class="doc-preview">
        <div class="preview-row wrap">
          <xly-dict-select
            v-model="event1"
            dict-type="role_type"
            placeholder="选择角色"
            style="width: 220px"
            @change="handleChange"
          />
          <span v-if="eventResult" class="preview-value">
            change 回调：<code>{{ JSON.stringify(eventResult) }}</code>
          </span>
        </div>
        <div class="doc-code">
          <pre><code>{{ code6 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 7. 禁用 / 尺寸 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">禁用 & 尺寸</h2>
      <div class="doc-preview">
        <div class="preview-row wrap" style="gap: 12px 16px;">
          <xly-dict-select v-model="size1" dict-type="gender" size="large" placeholder="large" style="width: 160px" />
          <xly-dict-select v-model="size2" dict-type="gender" size="default" placeholder="default" style="width: 160px" />
          <xly-dict-select v-model="size3" dict-type="gender" size="small" placeholder="small" style="width: 160px" />
          <xly-dict-select v-model="size4" dict-type="gender" disabled placeholder="disabled" style="width: 160px" />
        </div>
        <div class="doc-code">
          <pre><code>{{ code7 }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== 8. 二开指南 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">🔧 二开指南 — 对接真实接口</h2>
      <p class="doc-section__desc">
        组件内置了 <code>fetchDictList(dictType)</code> 函数用于模拟数据。
        在实际项目中，只需替换此函数即可对接后端字典接口。
      </p>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none; border-radius: 12px;">
          <pre><code>{{ devGuideCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ===== Props 文档 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">Props</h2>
      <div class="doc-preview" style="padding: 0; overflow: hidden;">
        <table class="doc-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in propsList" :key="prop.name">
              <td><code>{{ prop.name }}</code></td>
              <td><code>{{ prop.type }}</code></td>
              <td><code>{{ prop.default }}</code></td>
              <td>{{ prop.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ===== Events 文档 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">Events</h2>
      <div class="doc-preview" style="padding: 0; overflow: hidden;">
        <table class="doc-table">
          <thead>
            <tr>
              <th>事件名</th>
              <th>回调参数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td><code>(value: string | string[] | null)</code></td>
              <td>值变化时触发，支持 v-model 双向绑定</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td><code>(value, item: DictOption | DictOption[] | null)</code></td>
              <td>值变化时触发，第二个参数为完整字典项对象</td>
            </tr>
            <tr>
              <td><code>clear</code></td>
              <td>—</td>
              <td>点击清空按钮时触发</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ===== Expose 文档 ===== -->
    <div class="doc-section">
      <h2 class="doc-section__title">Expose（组件实例方法）</h2>
      <div class="doc-preview" style="padding: 0; overflow: hidden;">
        <table class="doc-table">
          <thead>
            <tr>
              <th>方法 / 属性</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>reload()</code></td>
              <td><code>() => Promise&lt;void&gt;</code></td>
              <td>手动重新加载字典数据（例如字典更新后刷新选项）</td>
            </tr>
            <tr>
              <td><code>dictList</code></td>
              <td><code>Ref&lt;DictOption[]&gt;</code></td>
              <td>当前已加载的字典选项列表</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// --- 基础单选 ---
const single1 = ref<string | null>(null)

// --- 多选 array ---
const multi1 = ref<string[]>([])

// --- 多选 string ---
const multi2 = ref<string>('')

// --- 自定义字段 ---
const custom1 = ref<string | null>(null)
const custom2 = ref<string | null>(null)

// --- 圆点 ---


// --- change 事件 ---
const event1 = ref<string | null>(null)
const eventResult = ref<any>(null)
function handleChange(value: any, item: any) {
  eventResult.value = { value, label: item?.labelValue ?? null }
}

// --- 尺寸 ---
const size1 = ref<string | null>(null)
const size2 = ref<string | null>(null)
const size3 = ref<string | null>(null)
const size4 = ref<string | null>(null)

// ===== 代码示例 =====
const code1 = `<xly-dict-select
  v-model="status"
  dict-type="user_status"
  placeholder="请选择用户状态"
/>`

const code2 = `<xly-dict-select
  v-model="statuses"
  dict-type="approve_status"
  multiple
  collapse-tags
  collapse-tags-tooltip
  placeholder="请选择审批状态（多选）"
/>
<!-- statuses 绑定值为 string[]，如 ['0', '2'] -->`

const code3 = `<xly-dict-select
  v-model="orderStatuses"
  dict-type="order_status"
  multiple
  value-format="string"
  filterable
  placeholder="请选择订单状态"
/>
<!-- orderStatuses 绑定值为逗号字符串，如 '1,2,4' -->`

const code4 = `<!-- 默认 labelField="labelName" 显示中文；切为 labelValue 则显示英文代码 -->
<xly-dict-select
  v-model="status"
  dict-type="user_status"
  label-field="labelValue"
  placeholder="显示英文代码"
/>`

const code4_1 = `<!-- 默认返回 id；设为 return-field="labelValue" 则返回英文代码 -->
<xly-dict-select
  v-model="status"
  dict-type="user_status"
  return-field="labelValue"
  placeholder="返回 NORMAL / DISABLED ..."
/>`

const code6 = `<xly-dict-select
  v-model="role"
  dict-type="role_type"
  @change="(value, item) => {
    console.log('选中值:', value)
    console.log('完整字典项:', item)  // { id: 'admin', labelValue: '超级管理员', labelName: '', type: 'danger' }
  }"
/>`

const code7 = `<xly-dict-select v-model="val" dict-type="gender" size="large" />
<xly-dict-select v-model="val" dict-type="gender" size="default" />
<xly-dict-select v-model="val" dict-type="gender" size="small" />
<xly-dict-select v-model="val" dict-type="gender" disabled />`

const devGuideCode = `// ① 在组件文件中找到 fetchDictList 函数（约第 80 行）
// ② 替换为以下实现（以 axios 为例）：

import { getDictList } from '@/api/system/dict'

async function fetchDictList(dictType: string): Promise<DictOption[]> {
  const res = await getDictList({ dictType })
  // 假设后端返回 { id, labelValue, labelName, type, ... }（labelValue=英文代码，labelName=中文）
  return res.data
}

// 如需字段映射（后端字段名不一致时）：
// return res.data.map((item: any) => ({
//   id: item.dictCode,    // → valueField（默认 id）
//   labelValue: item.code,      // → valueField（默认 id，但这里作值文本用）
//   labelName: item.dictLabel,  // → labelField（默认 labelName，显示文本）
//   type: item.listClass,
// }))

// ③ 全局字典缓存（可选）：
const dictCache = new Map<string, DictOption[]>()

async function fetchDictList(dictType: string): Promise<DictOption[]> {
  if (dictCache.has(dictType)) return dictCache.get(dictType)!
  const res = await getDictList({ dictType })
  dictCache.set(dictType, res.data)
  return res.data
}`

// ===== Props 表格 =====
const propsList = [
  { name: 'modelValue (v-model)', type: 'string | string[] | null', default: '—', desc: '绑定值。单选时为字符串，多选时为数组或逗号字符串' },
  { name: 'dictType', type: 'string', default: '—', desc: '（必填）字典类型标识，组件根据此值请求选项' },
  { name: 'multiple', type: 'boolean', default: 'false', desc: '是否开启多选模式' },
  { name: 'value-format', type: "'array' | 'string'", default: "'array'", desc: "多选时输出格式：array 为字符串数组，string 为逗号拼接" },
  { name: 'clearable', type: 'boolean', default: 'true', desc: '是否可清空' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' },
  { name: 'placeholder', type: 'string', default: "'请选择'", desc: '占位文本' },
  { name: 'size', type: "'large' | 'default' | 'small'", default: "'default'", desc: '选择器尺寸' },
  { name: 'filterable', type: 'boolean', default: 'false', desc: '是否可搜索过滤' },
  { name: 'collapse-tags', type: 'boolean', default: 'false', desc: '多选时是否折叠标签' },
  { name: 'collapse-tags-tooltip', type: 'boolean', default: 'true', desc: '折叠时鼠标悬浮是否显示 tooltip' },

  { name: 'label-field', type: 'string', default: "'labelName'", desc: '字典数据中用作显示文本的字段名，默认显示中文' },
  { name: 'value-field', type: 'string', default: "'id'", desc: '字典数据中用作选项值的字段名' },
  { name: 'return-field', type: 'string', default: "'id'", desc: 'v-model 最终返回值字段名，默认返回 id，可设为 labelValue 返回英文代码' },
]
</script>

<style scoped lang="scss">
.dict-select-doc {
  padding: 8px 0 40px;

  .doc-header {
    margin-bottom: 36px;
  }

  .doc-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.3px;
    margin: 0 0 10px;
  }

  .doc-desc {
    font-size: 14px;
    color: #8e8ea0;
    margin: 0;
    line-height: 1.7;
  }

  .doc-section {
    margin-bottom: 32px;
  }

  .doc-section__title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f3f7;
    margin: 0 0 18px;
  }

  .doc-section__desc {
    font-size: 13px;
    color: #606266;
    margin: -8px 0 14px;
    line-height: 1.8;

    code {
      background: #f4f4f5;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 12px;
      color: #4f6ef7;
    }
  }

  .doc-preview {
    border: 1px solid #f2f3f7;
    border-radius: 12px;
    overflow: hidden;
  }

  .preview-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 20px;
    flex-wrap: wrap;

    &.wrap { flex-wrap: wrap; }
  }

  .preview-value {
    font-size: 13px;
    color: #8e8ea0;

    code {
      color: #4f6ef7;
      background: #f0f2ff;
      border-radius: 4px;
      padding: 1px 6px;
    }
  }

  .doc-code {
    background: #fafbfd;
    border-top: 1px solid #f2f3f7;
    padding: 16px 20px;

    pre {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      color: #4a4a6a;
      white-space: pre-wrap;
      word-break: break-all;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    code { font-family: inherit; }
  }

  .doc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;

    th {
      background: #fafbfd;
      color: #1a1a2e;
      font-weight: 600;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #f2f3f7;
    }

    td {
      color: #4a4a6a;
      padding: 11px 16px;
      border-bottom: 1px solid #f8f8fb;

      code {
        background: #f4f4f5;
        border-radius: 4px;
        padding: 1px 5px;
        font-size: 12px;
        color: #4f6ef7;
      }
    }

    tr:last-child td { border-bottom: none; }
  }
}
</style>
