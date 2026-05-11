<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">Super Form 快速表单</h1>
      <p class="doc-desc">
        配置驱动的表单组件。通过 <code>fields</code> 配置字段，组件自动渲染、支持校验。 支持
        <code>useFormFields</code> 生成器简化配置。
      </p>
    </header>

    <!-- 输入类组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">输入类组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="inputForm" :fields="inputFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitInput">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { input, textarea, password, rules } = useFormFields()

const fields = [
  input('name', '姓名', { required: true }),
  input('phone', '手机号', { rules: rules.phone() }),
  input('email', '邮箱', { rules: rules.email() }),
  textarea('remark', '备注', { props: { rows: 3 } }),
  password('password', '密码'),
]</code></pre>
      </div>
    </section>

    <!-- 选择类组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">选择类组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="selectForm" :fields="selectFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitSelect">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { select, cascader } = useFormFields()

const fields = [
  select('dept', '部门', {
    required: true,
    props: {
      clearable: true,
      options: [
        { label: '技术部', value: 1 },
        { label: '运营部', value: 2 },
        { label: '市场部', value: 3 },
      ]
    }
  }),
  cascader('region', '地区', {
    props: {
      clearable: true,
      options: [
        { label: '北京', value: 'bj', children: [
          { label: '朝阳区', value: 'cy' }
        ]},
        { label: '上海', value: 'sh', children: [
          { label: '浦东新区', value: 'pd' }
        ]},
      ]
    }
  }),
]</code></pre>
      </div>
    </section>

    <!-- 日期类组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">日期类组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="dateForm" :fields="dateFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitDate">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { datePicker, dateRangePicker } = useFormFields()

// 范围组件：prop, label, startProp, endProp, options
// - prop: 组件标识（后端字段前缀）
// - label: 显示的标签名
// - startProp: 开始日期字段（对应后端）
// - endProp: 结束日期字段（对应后端）
const fields = [
  datePicker('birthday', '生日', { props: { clearable: true } }),
  dateRangePicker('dateRange', '有效期', 'startDate', 'endDate', {
    props: { clearable: true }
  }),
]</code></pre>
      </div>
    </section>

    <!-- 日期时间类组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">日期时间类组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="dateTimeForm" :fields="dateTimeFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitDateTime">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { dateTimePicker, dateTimeRangePicker } = useFormFields()

// 范围组件：prop, label, startProp, endProp, options
const fields = [
  dateTimePicker('startTime', '开始时间', { props: { clearable: true } }),
  dateTimeRangePicker('dateTimeRange', '施工时间', 'beginTime', 'finishTime', {
    props: { clearable: true }
  }),
]</code></pre>
      </div>
    </section>

    <!-- 时间类组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">时间类组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="timeForm" :fields="timeFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitTime">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { timePicker, timeRangePicker } = useFormFields()

// 范围组件：prop, label, startProp, endProp, options
const fields = [
  timePicker('time', '时间', { props: { clearable: true } }),
  timeRangePicker('timeRange', '营业时间', 'startTime', 'endTime', {
    props: { clearable: true }
  }),
]</code></pre>
      </div>
    </section>

    <!-- 远程搜索 -->
    <section class="doc-section">
      <h2 class="doc-section__title">远程搜索</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="remoteForm" :fields="remoteFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitRemote">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { select } = useFormFields()

// 远程搜索方法
async function searchUser(query: string) {
  if (!query) return []
  // 模拟 API 调用
  return [
    { label: `用户 ${query}1`, value: query + '1' },
    { label: `用户 ${query}2`, value: query + '2' },
  ]
}

const fields = [
  select('user', '用户', {
    remoteMethod: searchUser,
    props: { filterable: true, remote: true, placeholder: '输入关键词搜索用户' }
  }),
]</code></pre>
      </div>
    </section>

    <!-- 前后缀 -->
    <section class="doc-section">
      <h2 class="doc-section__title">前后缀</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="prefixForm" :fields="prefixFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitPrefix">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { inputSlot } = useFormFields()

// 使用 inputSlot() 创建带前后缀的输入框
const fields = [
  input('domain', '域名', { props: { prefix: 'https://', suffix: '.com' } }),
  input('price', '价格', { props: { prefix: '¥', suffix: '元' } }),
]</code></pre>
      </div>
    </section>

    <!-- 复杂校验 -->
    <section class="doc-section">
      <h2 class="doc-section__title">复杂校验</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="validateForm" :fields="validateFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitValidate">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { input, rules } = useFormFields()

const fields = [
  input('name', '姓名', { required: true }),
  input('phone', '手机号', { rules: rules.phone() }),
  input('email', '邮箱', { rules: rules.email() }),
  input('age', '年龄', {
    rules: rules.range(18, 60, '年龄必须在 18-60 岁之间')
  }),
  // 自定义校验：两次密码一致
  input('password', '密码', { required: true }),
  input('confirmPwd', '确认密码', {
    rules: [
      rules.required('请确认密码'),
      rules.custom((value, formData) => {
        if (value !== formData?.password) return '两次密码不一致'
        return true
      })
    ]
  }),
  // 异步校验示例
  input('username', '用户名', {
    rules: [
      rules.required(),
      rules.custom(async (value) => {
        // 模拟异步校验：检查用户名是否已存在
        await new Promise(r => setTimeout(r, 500))
        if (['admin', 'root'].includes(value)) return '用户名已存在'
        return true
      }, '用户名已被注册')
    ]
  }),
]</code></pre>
      </div>
    </section>

    <!-- 自定义组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="customForm" :fields="customFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitCustom">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'
import { ElInput } from 'element-plus'
const { custom } = useFormFields()

// custom(prop, component, label, options)
// component: 自定义 Vue 组件，需支持 v-model
const fields = [
  input('name', '姓名', { required: true }),
  custom('addr', ElInput, '地址', { props: { placeholder: '请输入地址' } })
]

        </code></pre>
      </div>
    </section>

    <!-- 特殊组件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">特殊组件</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="swForm" :fields="swFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitSw">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { sw, rate } = useFormFields()

const fields = [
  // 开关
  sw('enabled', '启用', {
    props: { activeText: '是', inactiveText: '否' }
  }),
  // 评分
  rate('rating', '评分', { required: true }),
]</code></pre>
      </div>
    </section>

    <!-- 栅格布局 -->
    <section class="doc-section">
      <h2 class="doc-section__title">栅格布局</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <XlySuperForm :fields="spanFields" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { input } = useFormFields()

const fields = [
  // span: 栅格占比，默认 24（占整行），12 是一半，8 是三分之一
  input('name', '姓名', { span: 12 }),
  input('phone', '手机号', { span: 12 }),
  input('remark', '备注', { span: 24 }),  // 占整行
]</code></pre>
      </div>
    </section>

    <!-- 链式调用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">链式调用</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 400px">
            <XlySuperForm ref="chainForm" :fields="chainFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitChain">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { input, select, sw, rules } = useFormFields()

const fields = [
  input('name').$required(),
  input('phone').$required().$rule(rules.phone()),
  input('email').$rule(rules.email()),
  select('dept').$required().$options([
    { label: '技术部', value: 1 },
    { label: '运营部', value: 2 },
  ]),
  sw('enabled').$required(),
]</code></pre>
      </div>
    </section>

    <!-- 完整示例 -->
    <section class="doc-section">
      <h2 class="doc-section__title">完整示例</h2>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%">
            <XlySuperForm ref="fullForm" :fields="fullFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitFull">提交</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const {
  input, textarea, select,
  datePicker, dateRangePicker,
  sw, rate, rules
} = useFormFields()

const fields = [
  input('name', '姓名', { required: true }),
  input('phone', '手机号', { rules: rules.phone() }),
  select('dept', '部门', { options: [{ label: '技术部', value: 1 }] }),
  datePicker('birthday', '生日'),
  dateRangePicker('dateRange', '有效期', 'startDate', 'endDate'),
  sw('enabled', '启用'),
  rate('rating', '评分'),
  textarea('remark', '备注', { span: 24 }),
]

async function submitFull() {
  const valid = await fullForm.value?.validate()
  if (!valid) return
  console.log(fullForm.value?.getFormData())
}</code></pre>
      </div>
    </section>

    <!-- v-model 双向绑定 -->
    <section class="doc-section">
      <h2 class="doc-section__title">v-model 双向绑定</h2>
      <p class="doc-desc">
        支持通过 <code>v-model</code> 绑定外部数据对象，实现表单数据的双向同步。 使用
        <code>getFormData()</code> 方法获取表单数据。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <div style="width: 100%; max-width: 500px">
            <XlySuperForm ref="vmodelForm" v-model="vmodelData" :fields="vmodelFields" />
          </div>
          <div style="margin-top: 16px">
            <XlyButton type="primary" @click="submitVmodel">提交</XlyButton>
            <XlyButton style="margin-left: 8px" @click="resetVmodel">重置</XlyButton>
            <XlyButton style="margin-left: 8px" @click="fillVmodel">填充初始值</XlyButton>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>import { ref } from 'vue'
import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { input, select, rules } = useFormFields()

// 外部数据对象（通过 v-model 绑定）
const formData = ref({
  name: '',
  dept: null,
})

const fields = [
  input('name', '姓名', { required: true }),
  select('dept', '部门', {
    required: true,
    props: {
      options: [
        { label: '技术部', value: 1 },
        { label: '运营部', value: 2 },
      ]
    }
  }),
]

// 获取表单数据
function submit() {
  // 方式1：通过 getFormData() 方法
  const data = vmodelForm.value?.getFormData()
  console.log('表单数据:', data)
  // 方式2：直接使用外部绑定的数据
  console.log('外部数据:', formData.value)
}

// 填充初始值
function fillData() {
  formData.value = {
    name: '张三',
    dept: 1,
  }
}

// 重置
function reset() {
  formData.value = { name: '', dept: null }
}</code></pre>
      </div>
    </section>

    <!-- 扩展组件支持 -->
    <section class="doc-section">
      <h2 class="doc-section__title">扩展组件支持</h2>
      <p class="doc-desc">
        通过添加 <code>typeMap</code> 映射，可以像内置组件一样使用自定义组件。
      </p>

      <h3 class="doc-subtitle">步骤一：在 useFormFields.ts 中添加字段生成函数</h3>
      <div class="doc-code">
        <pre><code>// 假设我们要添加一个 XlyNumber 数字输入框组件

// 在 useFormFields() 函数中添加：
function number(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
  const { label, ...rest } = normalizeOptions(labelOrOptions, options)
  return createChainField(prop, 'number', { label, ...rest })
}

// 在 return 中导出：
return {
  input, textarea, password,
  select, cascader,
  // ... 其他
  number,  // 👈 添加这行
  // ...
}</code></pre>
      </div>

      <h3 class="doc-subtitle">步骤二：在 index.vue 中注册组件</h3>
      <div class="doc-code">
        <pre><code>// 1. 导入组件
import XlyNumber from '@/components/xly-number/index.vue'

// 2. 在 typeMap 中添加映射
const typeMap: Record&lt;string, Component&gt; = {
  input: XlyInput,
  select: XlySelect,
  // ... 其他
  number: XlyNumber,  // 👈 添加这行
}

// 3. 如需错误样式高亮，在 SCSS 中添加选择器
.is-error {
  :deep(.el-input__wrapper),
  :deep(.el-select__wrapper),
  :deep(.xly-number__wrapper) {  // 👈 添加新组件的选择器
    box-shadow: 0 0 0 1px #f56c6c inset;
  }
}</code></pre>
      </div>

      <h3 class="doc-subtitle">步骤三：使用新组件</h3>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'

const { number } = useFormFields()

const fields = [
  number('price', '价格', { required: true }),
  number('quantity', '数量', { props: { min: 1, max: 100 } }),
]</code></pre>
      </div>

      <h3 class="doc-subtitle">添加自定义组件（通过 component 属性）</h3>
      <p class="doc-desc">
        如果你只是想偶尔使用某个自定义组件，不需要修改源码，可以使用 <code>custom()</code> 生成器：
      </p>
      <div class="doc-code">
        <pre><code>import { useFormFields } from '@/components/xly-super-form/useFormFields'
import MyCustomInput from '@/components/my-custom-input/index.vue'

const { custom } = useFormFields()

// custom(prop, component, label?, options?)
const fields = [
  custom('content', MyCustomInput, '自定义内容', {
    props: { placeholder: '请输入' }
  }),
]</code></pre>
      </div>

      <h3 class="doc-subtitle">注意事项</h3>
      <ul class="doc-list">
        <li>新组件必须支持 <code>v-model</code> 双向绑定</li>
        <li>组件需要处理 <code>v-bind</code> 传递的属性（如 <code>placeholder</code>、<code>disabled</code> 等）</li>
        <li>如果需要错误样式高亮，确保组件根元素有可设置边框/阴影的选择器</li>
        <li>使用 <code>:deep()</code> 选择器穿透子组件作用域样式</li>
      </ul>
    </section>

    <!-- Props 说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Props 说明</h2>
      <table class="doc-table">
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
            <td><code>fields</code></td>
            <td>表单字段配置数组</td>
            <td><code>Field[]</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>layout</code></td>
            <td>布局方式</td>
            <td><code>'vertical' | 'horizontal' | 'inline'</code></td>
            <td><code>'vertical'</code></td>
          </tr>
          <tr>
            <td><code>labelWidth</code></td>
            <td>标签宽度</td>
            <td><code>string</code></td>
            <td><code>'100px'</code></td>
          </tr>
          <tr>
            <td><code>span</code></td>
            <td>栅格占比（1-24）</td>
            <td><code>number</code></td>
            <td><code>24</code></td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-subtitle">Field 属性</h3>
      <table class="doc-table">
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
            <td><code>prop</code></td>
            <td>字段名（对应后端）</td>
            <td><code>string</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>label</code></td>
            <td>标签文字</td>
            <td><code>string</code></td>
            <td>自动推断</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td>组件类型</td>
            <td><code>string</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>required</code></td>
            <td>是否必填</td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>span</code></td>
            <td>栅格占比</td>
            <td><code>number</code></td>
            <td><code>24</code></td>
          </tr>
          <tr>
            <td><code>showLabel</code></td>
            <td>是否显示标签</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td><code>rules</code></td>
            <td>校验规则</td>
            <td><code>FieldRule[]</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>props</code></td>
            <td>传递给组件的属性</td>
            <td><code>Record&lt;string, any&gt;</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>startProp</code></td>
            <td>范围组件开始字段名</td>
            <td><code>string</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>endProp</code></td>
            <td>范围组件结束字段名</td>
            <td><code>string</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>options</code></td>
            <td>下拉/级联等选项</td>
            <td><code>any[]</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>remoteMethod</code></td>
            <td>远程搜索方法</td>
            <td><code>(query: string) =&gt; any[]</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>component</code></td>
            <td>自定义组件（使用 custom() 生成时）</td>
            <td><code>Component</code></td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-subtitle">支持的组件类型</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th>type</th>
            <th>说明</th>
            <th>特有 props</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>input</code></td>
            <td>输入框</td>
            <td><code>type: 'text' | 'password' | 'textarea'</code></td>
          </tr>
          <tr>
            <td><code>select</code></td>
            <td>下拉选择</td>
            <td><code>options, clearable, filterable, remote</code></td>
          </tr>
          <tr>
            <td><code>cascader</code></td>
            <td>级联选择</td>
            <td><code>options, clearable</code></td>
          </tr>
          <tr>
            <td><code>datePicker</code></td>
            <td>日期选择</td>
            <td><code>placeholder, clearable</code></td>
          </tr>
          <tr>
            <td><code>dateRangePicker</code></td>
            <td>日期范围</td>
            <td><code>startProp, endProp, placeholder[], clearable</code></td>
          </tr>
          <tr>
            <td><code>dateTimePicker</code></td>
            <td>日期时间选择</td>
            <td><code>placeholder, clearable</code></td>
          </tr>
          <tr>
            <td><code>dateTimeRangePicker</code></td>
            <td>日期时间范围</td>
            <td><code>startProp, endProp, placeholder[], clearable</code></td>
          </tr>
          <tr>
            <td><code>timePicker</code></td>
            <td>时间选择</td>
            <td><code>placeholder, clearable</code></td>
          </tr>
          <tr>
            <td><code>timeRangePicker</code></td>
            <td>时间范围</td>
            <td><code>startProp, endProp, placeholder[], clearable</code></td>
          </tr>
          <tr>
            <td><code>switch</code></td>
            <td>开关</td>
            <td><code>activeText, inactiveText</code></td>
          </tr>
          <tr>
            <td><code>rate</code></td>
            <td>评分</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.component-doc {
  padding: 24px;
  max-width: 1200px;
}

.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px;
}

.doc-desc {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.doc-section {
  margin-bottom: 48px;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.doc-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.doc-preview {
  margin-bottom: 20px;
}

.doc-preview__body {
  display: flex;
  gap: 16px;
}

.doc-code {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

.doc-code pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
}

.doc-code code {
  font-family: inherit;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 20px;
}

.doc-table th,
.doc-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.doc-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #303133;
}

.doc-table td {
  color: #606266;
}

.doc-table code {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #409eff;
}

.doc-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 24px 0 16px;
}

.doc-list {
  margin: 12px 0;
  padding-left: 20px;
  color: #606266;
  font-size: 14px;
  line-height: 1.8;

  li {
    margin-bottom: 8px;
  }
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import XlySuperForm from '@/components/xly-super-form/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import { useFormFields } from '@/components/xly-super-form/useFormFields'
import { ElInput } from 'element-plus'

const {
  input,
  textarea,
  password,
  select,
  cascader,
  datePicker,
  dateRangePicker,
  dateTimePicker,
  dateTimeRangePicker,
  timePicker,
  timeRangePicker,
  sw,
  rate,
  rules,
  custom,
} = useFormFields()

// v-model 双向绑定
const vmodelForm = ref()
const vmodelData = reactive({
  name: '',
  dept: null as number | null,
})
const vmodelFields = [
  input('name', '姓名', { required: true }),
  select('dept', '部门', {
    required: true,
    props: {
      clearable: true,
      options: [
        { label: '技术部', value: 1 },
        { label: '运营部', value: 2 },
        { label: '市场部', value: 3 },
      ],
    },
  }),
]
async function submitVmodel() {
  const valid = await vmodelForm.value?.validate()
  if (!valid) return
  console.log('getFormData():', vmodelForm.value?.getFormData())
  console.log('v-model 数据:', vmodelData)
}
function resetVmodel() {
  vmodelData.name = ''
  vmodelData.dept = null
}
function fillVmodel() {
  vmodelData.name = '张三'
  vmodelData.dept = 1
}

// 输入类
const inputForm = ref()
const inputFields = [
  input('name', '姓名', { required: true, props: { placeholder: '请输入姓名' } }),
  input('phone', '手机号', { rules: rules.phone(), props: { placeholder: '请输入手机号' } }),
  input('email', '邮箱', { rules: rules.email(), props: { placeholder: '请输入邮箱' } }),
  textarea('remark', '备注', { props: { placeholder: '备注信息', rows: 3 } }),
  password('password', '密码'),
]
async function submitInput() {
  const valid = await inputForm.value?.validate()
  if (!valid) return
  console.log(inputForm.value?.getFormData())
}

// 选择类
const selectForm = ref()
const selectFields = [
  select('dept', '部门', {
    required: true,
    props: {
      placeholder: '请选择部门',
      clearable: true,
      options: [
        { label: '技术部', value: 1 },
        { label: '运营部', value: 2 },
        { label: '市场部', value: 3 },
      ],
    },
  }),
  cascader('region', '地区', {
    props: {
      placeholder: '请选择地区',
      clearable: true,
      options: [
        { label: '北京', value: 'bj', children: [{ label: '朝阳区', value: 'cy' }] },
        { label: '上海', value: 'sh', children: [{ label: '浦东新区', value: 'pd' }] },
      ],
    },
  }),
]
async function submitSelect() {
  const valid = await selectForm.value?.validate()
  if (!valid) return
  console.log(selectForm.value?.getFormData())
}

// 日期类
const dateForm = ref()
const dateFields = [
  datePicker('birthday', '生日', { props: { placeholder: '选择日期', clearable: true } }),
  // 范围组件：prop, label, startProp, endProp, options
  dateRangePicker('dateRange', '有效期', 'startDate', 'endDate', {
    props: { placeholder: ['开始日期', '结束日期'], clearable: true },
  }),
]
async function submitDate() {
  const valid = await dateForm.value?.validate()
  if (!valid) return
  console.log(dateForm.value?.getFormData())
}

// 日期时间类
const dateTimeForm = ref()
const dateTimeFields = [
  dateTimePicker('startTime', '开始时间', {
    props: { placeholder: '选择日期时间', clearable: true },
  }),
  // 范围组件：prop, label, startProp, endProp, options
  dateTimeRangePicker('dateTimeRange', '施工时间', 'beginTime', 'finishTime', {
    props: { placeholder: ['开始时间', '结束时间'], clearable: true },
  }),
]
async function submitDateTime() {
  const valid = await dateTimeForm.value?.validate()
  if (!valid) return
  console.log(dateTimeForm.value?.getFormData())
}

// 时间类
const timeForm = ref()
const timeFields = [
  timePicker('time', '时间', { props: { placeholder: '选择时间', clearable: true } }),
  // 范围组件：prop, label, startProp, endProp, options
  timeRangePicker('timeRange', '营业时间', 'startTime', 'endTime', {
    props: { placeholder: ['开始时间', '结束时间'], clearable: true },
  }),
]
async function submitTime() {
  const valid = await timeForm.value?.validate()
  if (!valid) return
  console.log(timeForm.value?.getFormData())
}

// 远程搜索
const remoteForm = ref()
const remoteFields = [
  select('user', '用户', {
    remoteMethod: async (query: string) => {
      if (!query) return []
      // 模拟 API 调用
      return [
        { label: `用户 ${query}1`, value: query + '1' },
        { label: `用户 ${query}2`, value: query + '2' },
      ]
    },
    props: { filterable: true, remote: true, placeholder: '输入关键词搜索用户' },
  }),
]
async function submitRemote() {
  const valid = await remoteForm.value?.validate()
  if (!valid) return
  console.log(remoteForm.value?.getFormData())
}

// 前后缀
const prefixForm = ref()
const prefixFields = [
  input('domain', '域名', { props: { prefix: 'https://', suffix: '.com' } }),
  input('price', '价格', { props: { prefix: '¥', suffix: '元' } }),
]
async function submitPrefix() {
  const valid = await prefixForm.value?.validate()
  if (!valid) return
  console.log(prefixForm.value?.getFormData())
}

// 复杂校验
const validateForm = ref()
const validateFields = [
  input('name', '姓名', { required: true }),
  input('phone', '手机号', { rules: rules.phone() }),
  input('email', '邮箱', { rules: rules.email() }),
  input('age', '年龄', {
    rules: rules.range(18, 60, '年龄必须在 18-60 岁之间'),
  }),
  input('password', '密码', { required: true }),
  input('confirmPwd', '确认密码', {
    rules: [
      rules.required('请确认密码'),
      rules.custom((value: string, formData?: any) => {
        if (value !== formData?.password) return '两次密码不一致'
        return true
      }),
    ],
  }),
  input('username', '用户名', {
    rules: [
      rules.required(),
      rules.custom(async (value: string) => {
        await new Promise((r) => setTimeout(r, 500))
        if (['admin', 'root'].includes(value)) return '用户名已存在'
        return true
      }, '用户名已被注册'),
    ],
  }),
]
async function submitValidate() {
  const valid = await validateForm.value?.validate()
  if (!valid) return
  console.log(validateForm.value?.getFormData())
}

// 自定义组件
const customForm = ref()
const customFields = [
  input('name', '姓名', { required: true }),
  // custom(prop, component, label, options)
  // 使用自定义 Vue 组件，组件需支持 v-model
  custom('addr', ElInput, '地址', { props: { placeholder: '请输入地址' } }),
]
async function submitCustom() {
  const valid = await customForm.value?.validate()
  if (!valid) return
  console.log(customForm.value?.getFormData())
}

// 特殊组件
const swForm = ref()
const swFields = [
  sw('enabled', '启用', { props: { activeText: '是', inactiveText: '否' } }),
  rate('rating', '评分', { required: true }),
]
async function submitSw() {
  const valid = await swForm.value?.validate()
  if (!valid) return
  console.log(swForm.value?.getFormData())
}

// 栅格布局
const spanFields = [
  input('name', '姓名', { span: 12 }),
  input('phone', '手机号', { span: 12 }),
  textarea('remark', '备注', { span: 24, props: { rows: 2 } }),
]

// 链式调用
const chainForm = ref()
const chainFields = [
  input('name').$required(),
  input('phone').$required().$rule(rules.phone()),
  input('email').$rule(rules.email()),
  select('dept')
    .$required()
    .$options([
      { label: '技术部', value: 1 },
      { label: '运营部', value: 2 },
    ]),
  sw('enabled').$required(),
]
async function submitChain() {
  const valid = await chainForm.value?.validate()
  if (!valid) return
  console.log(chainForm.value?.getFormData())
}

// 完整示例
const fullForm = ref()
const fullFields = [
  input('name', '姓名', { required: true }),
  input('phone', '手机号', { rules: rules.phone() }),
  select('dept', '部门', { options: [{ label: '技术部', value: 1 }] }),
  datePicker('birthday', '生日'),
  dateRangePicker('dateRange', '有效期', 'startDate', 'endDate'),
  sw('enabled', '启用'),
  rate('rating', '评分'),
  textarea('remark', '备注', { span: 24 }),
]
async function submitFull() {
  const valid = await fullForm.value?.validate()
  if (!valid) return
  console.log(fullForm.value?.getFormData())
}
</script>
