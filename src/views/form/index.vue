<template>
  <div class="form-doc">
    <div class="doc-header">
      <h1 class="doc-title">Form 表单</h1>
      <p class="doc-desc">
        完整的表单组件集，包含输入框、下拉选择、评分、日期选择器、时间选择器等，并支持表单校验。
      </p>
    </div>

    <!-- 基础表单 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础表单 + 校验</h2>
      <p class="doc-section__desc">
        使用 <code>XlyForm</code> + <code>XlyFormItem</code> 包裹表单项，传入 <code>rules</code> 配置校验规则。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="form-demo-card">
            <XlyForm ref="basicFormRef" v-model="basicForm" :rules="basicRules" :label-width="100">
              <XlyFormItem label="姓名" prop="name">
                <XlyInput v-model="basicForm.name" placeholder="请输入姓名" clearable />
              </XlyFormItem>
              <XlyFormItem label="邮箱" prop="email">
                <XlyInput v-model="basicForm.email" placeholder="请输入邮箱" clearable />
              </XlyFormItem>
              <XlyFormItem label="手机号" prop="phone">
                <XlyInput v-model="basicForm.phone" placeholder="请输入手机号" maxlength="11" clearable />
              </XlyFormItem>
              <XlyFormItem label="部门" prop="department">
                <XlySelect
                  v-model="basicForm.department"
                  :options="departmentOptions"
                  placeholder="请选择部门"
                  clearable
                />
              </XlyFormItem>
              <XlyFormItem>
                <div class="form-demo-actions">
                  <XlyButton @click="submitBasicForm">提交</XlyButton>
                  <XlyButton type="ghost" @click="resetBasicForm">重置</XlyButton>
                </div>
              </XlyFormItem>
            </XlyForm>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyForm ref="formRef" v-model="form" :rules="rules" :label-width="100"&gt;
  &lt;XlyFormItem label="姓名" prop="name"&gt;
    &lt;XlyInput v-model="form.name" placeholder="请输入姓名" /&gt;
  &lt;/XlyFormItem&gt;
  &lt;XlyFormItem&gt;
    &lt;XlyButton @click="submit"&gt;提交&lt;/XlyButton&gt;
  &lt;/XlyFormItem&gt;
&lt;/XlyForm&gt;

const rules = {
  name: [required('请输入姓名'), minLength(2)],
  email: [required('请输入邮箱'), email()],
}
const valid = await formRef.value.validate()</code></pre>
        </div>
      </div>
    </section>

    <!-- 日期和时间 -->
    <section class="doc-section">
      <h2 class="doc-section__title">日期 & 时间选择</h2>
      <p class="doc-section__desc">
        日期选择器支持 date / month / year 三种模式，时间选择器支持 showSeconds 控制是否显示秒。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="form-demo-card">
            <XlyForm v-model="dateForm" :label-width="100">
              <XlyFormItem label="日期">
                <XlyDatePicker v-model="dateForm.date" placeholder="选择日期" />
              </XlyFormItem>
              <XlyFormItem label="月份">
                <XlyDatePicker v-model="dateForm.month" type="month" placeholder="选择月份" />
              </XlyFormItem>
              <XlyFormItem label="年份">
                <XlyDatePicker v-model="dateForm.year" type="year" placeholder="选择年份" />
              </XlyFormItem>
              <XlyFormItem label="时间">
                <XlyTimePicker v-model="dateForm.time" placeholder="选择时间" />
              </XlyFormItem>
              <XlyFormItem label="时分秒">
                <XlyTimePicker v-model="dateForm.timeWithSeconds" placeholder="精确到秒" show-seconds />
              </XlyFormItem>
            </XlyForm>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDatePicker v-model="date" placeholder="选择日期" /&gt;
&lt;XlyDatePicker v-model="month" type="month" placeholder="选择月份" /&gt;
&lt;XlyTimePicker v-model="time" placeholder="选择时间" /&gt;
&lt;XlyTimePicker v-model="time" show-seconds /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 评分 -->
    <section class="doc-section">
      <h2 class="doc-section__title">评分 Rate</h2>
      <p class="doc-section__desc">
        支持半星、自定义颜色、文字提示、禁用等。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="rate-demo-group">
            <div class="rate-demo-item">
              <span class="rate-demo-label">基础评分</span>
              <XlyRate v-model="rate1" />
            </div>
            <div class="rate-demo-item">
              <span class="rate-demo-label">半星</span>
              <XlyRate v-model="rate2" allow-half />
            </div>
            <div class="rate-demo-item">
              <span class="rate-demo-label">文字提示</span>
              <XlyRate v-model="rate3" show-text :texts="['很差', '一般', '不错', '很好', '极佳']" />
            </div>
            <div class="rate-demo-item">
              <span class="rate-demo-label">自定义颜色</span>
              <XlyRate v-model="rate4" color="#f56c6c" />
            </div>
            <div class="rate-demo-item">
              <span class="rate-demo-label">禁用</span>
              <XlyRate v-model="rate5" disabled />
            </div>
            <div class="rate-demo-item">
              <span class="rate-demo-label">大号</span>
              <XlyRate v-model="rate6" size="large" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyRate v-model="value" /&gt;
&lt;XlyRate v-model="value" allow-half /&gt;
&lt;XlyRate v-model="value" show-text :texts="['很差','一般','不错']" /&gt;
&lt;XlyRate v-model="value" color="#f56c6c" /&gt;
&lt;XlyRate v-model="value" disabled /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 输入框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">输入框 Input</h2>
      <p class="doc-section__desc">
        支持前后缀、密码切换、清除、字数统计、不同尺寸等。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="input-demo-group">
            <div class="input-demo-item">
              <span class="input-demo-label">默认</span>
              <XlyInput v-model="inputVal" placeholder="请输入" clearable />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">密码</span>
              <XlyInput v-model="inputPwd" type="password" placeholder="请输入密码" />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">前缀</span>
              <XlyInput v-model="inputVal2" placeholder="搜索" prefix-icon="el:Search" />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">字数限制</span>
              <XlyInput v-model="inputVal3" placeholder="最多20字" :maxlength="20" show-word-limit />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">复合输入</span>
              <XlyInput v-model="inputUrl" placeholder="请输入网址">
                <template #prepend>https://</template>
                <template #append>.com</template>
              </XlyInput>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyInput v-model="value" placeholder="请输入" clearable /&gt;
&lt;XlyInput v-model="value" type="password" /&gt;
&lt;XlyInput v-model="value" prefix-icon="el:Search" /&gt;
&lt;XlyInput v-model="value" :maxlength="20" show-word-limit /&gt;
&lt;XlyInput v-model="value"&gt;
  &lt;template #prepend&gt;https://&lt;/template&gt;
  &lt;template #append&gt;.com&lt;/template&gt;
&lt;/XlyInput&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 下拉选择 -->
    <section class="doc-section">
      <h2 class="doc-section__title">下拉选择 Select</h2>
      <p class="doc-section__desc">
        支持单选、多选、搜索过滤、清除等。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="input-demo-group">
            <div class="input-demo-item">
              <span class="input-demo-label">单选</span>
              <XlySelect v-model="selectVal" :options="fruitOptions" placeholder="请选择" clearable />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">可搜索</span>
              <XlySelect v-model="selectVal2" :options="fruitOptions" placeholder="搜索选择" filterable clearable />
            </div>
            <div class="input-demo-item">
              <span class="input-demo-label">多选</span>
              <XlySelect v-model="selectMulti" :options="fruitOptions" placeholder="可多选" multiple />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySelect v-model="value" :options="options" clearable /&gt;
&lt;XlySelect v-model="value" :options="options" filterable /&gt;
&lt;XlySelect v-model="value" :options="options" multiple /&gt;

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 校验规则 API -->
    <section class="doc-section">
      <h2 class="doc-section__title">校验规则 API</h2>
      <p class="doc-section__desc">内置常用校验规则，从 <code>xly-form/utils</code> 引入。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="doc-table-wrapper">
            <table class="doc-table">
              <thead>
                <tr><th>规则</th><th>说明</th><th>示例</th></tr>
              </thead>
              <tbody>
                <tr><td><code>required(msg?)</code></td><td>必填</td><td><code>required('请输入姓名')</code></td></tr>
                <tr><td><code>email(msg?)</code></td><td>邮箱格式</td><td><code>email('邮箱格式错误')</code></td></tr>
                <tr><td><code>phone(msg?)</code></td><td>手机号</td><td><code>phone()</code></td></tr>
                <tr><td><code>minLength(n, msg?)</code></td><td>最小长度</td><td><code>minLength(2, '至少2字')</code></td></tr>
                <tr><td><code>maxLength(n, msg?)</code></td><td>最大长度</td><td><code>maxLength(20)</code></td></tr>
                <tr><td><code>min(n, msg?)</code></td><td>最小值</td><td><code>min(0)</code></td></tr>
                <tr><td><code>max(n, msg?)</code></td><td>最大值</td><td><code>max(100)</code></td></tr>
                <tr><td><code>pattern(reg, msg?)</code></td><td>正则匹配</td><td><code>pattern(/^\d+$/)</code></td></tr>
                <tr><td><code>url(msg?)</code></td><td>URL 格式</td><td><code>url()</code></td></tr>
                <tr><td><code>custom(fn, trigger?)</code></td><td>自定义校验</td><td><code>custom(v => v > 0 || '需大于0')</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyDatePicker from '@/components/xly-date-picker/index.vue'
import XlyTimePicker from '@/components/xly-time-picker/index.vue'
import XlyRate from '@/components/xly-rate/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import { required, email, phone, minLength } from '@/components/xly-form/utils'
import { xly } from '@/utils/xly'

/** ===== 基础表单 ===== */
const basicFormRef = ref<InstanceType<typeof XlyForm> | null>(null)
const basicForm = reactive({
  name: '',
  email: '',
  phone: '',
  department: '',
})

const basicRules = {
  name: [required('请输入姓名'), minLength(2, '姓名至少2个字符')],
  email: [required('请输入邮箱'), email('请输入正确的邮箱地址')],
  phone: [required('请输入手机号'), phone('请输入正确的手机号')],
  department: [required('请选择部门')],
}

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '市场部', value: 'marketing' },
  { label: '运营部', value: 'operation' },
]

async function submitBasicForm() {
  const valid = await basicFormRef.value?.validate()
  if (valid) {
    xly.$msg.success('表单校验通过！')
    console.log('表单数据:', { ...basicForm })
  } else {
    xly.$msg.danger('请检查表单填写是否正确')
  }
}

function resetBasicForm() {
  basicFormRef.value?.resetFields()
  xly.$msg.info('表单已重置')
}

/** ===== 日期时间 ===== */
const dateForm = reactive({
  date: '',
  month: '',
  year: '',
  time: '',
  timeWithSeconds: '',
})

/** ===== 评分 ===== */
const rate1 = ref(3)
const rate2 = ref(2.5)
const rate3 = ref(4)
const rate4 = ref(3)
const rate5 = ref(4)
const rate6 = ref(5)

/** ===== 输入框 ===== */
const inputVal = ref('')
const inputVal2 = ref('')
const inputVal3 = ref('')
const inputPwd = ref('')
const inputUrl = ref('')

/** ===== 下拉选择 ===== */
const fruitOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
  { label: '西瓜', value: 'watermelon' },
  { label: '草莓', value: 'strawberry' },
]
const selectVal = ref<string | number>()
const selectVal2 = ref<string | number>()
const selectMulti = ref<(string | number)[]>([])
</script>

<style scoped lang="scss">
.doc-header { margin-bottom: 32px; }
.doc-title { font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; }
.doc-desc {
  font-size: 14px; color: #8e8ea0; line-height: 1.6; margin: 0;
  code { padding: 2px 6px; background: #f0f2f5; border-radius: 4px; font-size: 13px; color: #4f6ef7; font-family: 'Menlo','Monaco','Courier New',monospace; }
}
.doc-section { margin-bottom: 40px; }
.doc-section__title { font-size: 20px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; }
.doc-section__desc {
  font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 16px;
  code { padding: 2px 6px; background: #f0f2f5; border-radius: 4px; font-size: 13px; color: #4f6ef7; font-family: 'Menlo','Monaco','Courier New',monospace; }
}
.doc-preview { border: 1px solid #e2e4ed; border-radius: 12px; overflow: hidden; }
.doc-preview__body { padding: 24px; }
.doc-code {
  border-top: 1px solid #e2e4ed; padding: 16px; background: #fafbfc;
  pre { margin: 0; overflow-x: auto; }
  code { font-size: 13px; line-height: 1.6; color: #4a4a6a; font-family: 'Menlo','Monaco','Courier New',monospace; }
}

.form-demo-card {
  max-width: 520px;
  background: #fff;
  border: 1px solid #e2e4ed;
  border-radius: 12px;
  padding: 24px;
}

.form-demo-actions {
  display: flex;
  gap: 10px;
}

/* ========== 演示组 ========== */
.rate-demo-group,
.input-demo-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rate-demo-item,
.input-demo-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rate-demo-label,
.input-demo-label {
  flex-shrink: 0;
  width: 80px;
  font-size: 13px;
  color: #6b7280;
  text-align: right;
}

.input-demo-item {
  .xly-input,
  .xly-select {
    flex: 1;
    max-width: 320px;
  }
}

/* ========== 表格 ========== */
.doc-table-wrapper { overflow-x: auto; }
.doc-table {
  width: 100%; border-collapse: collapse; font-size: 14px;
  th, td { padding: 10px 16px; text-align: left; border-bottom: 1px solid #e2e4ed; }
  th { background: #f8f9fb; font-weight: 600; color: #1a1a2e; white-space: nowrap; }
  td { color: #4a4a6a; }
  code { padding: 2px 6px; background: #f0f2f5; border-radius: 4px; font-size: 13px; color: #4f6ef7; font-family: 'Menlo','Monaco','Courier New',monospace; }
}
</style>
