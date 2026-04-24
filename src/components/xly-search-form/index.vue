<template>
  <div class="xly-search-form" :class="{ 'is-expanded': expanded }">
    <div class="search-form-body">
      <!-- 搜索表单 -->
      <XlyForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        :inline="inline"
        :size="size"
        :disabled="disabled"
        :span="4"
      >
        <template v-for="item in visibleItems" :key="item.prop">
          <XlyFormItem
            :label="item.label"
            :prop="item.prop"
            :required="item.required"
            :span="item.span"
          >
            <!-- 输入框 -->
            <XlyInput
              v-if="item.type === 'input' || !item.type"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :readonly="item.readonly"
              :maxlength="item.maxlength"
              :show-word-limit="item.showWordLimit"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              @keyup.enter="handleSearch"
            />

            <!-- 文本域 -->
            <XlyInput
              v-else-if="item.type === 'textarea'"
              v-model="formData[item.prop]"
              type="textarea"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :readonly="item.readonly"
              :maxlength="item.maxlength"
              :show-word-limit="item.showWordLimit"
              :rows="item.rows || 2"
            />

            <!-- 选择器 -->
            <XlySelect
              v-else-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :multiple="item.multiple"
              :filterable="item.filterable"
              :options="item.options"
              :value-type="item.valueType"
              :separator="item.separator"
            />

            <!-- 级联选择器 -->
            <XlyCascader
              v-else-if="item.type === 'cascader'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :multiple="item.multiple"
              :filterable="item.filterable"
              :options="item.cascaderOptions"
              :value-type="item.valueType"
              :separator="item.separator"
            />

            <!-- 日期选择器 -->
            <XlyDatePicker
              v-else-if="item.type === 'date'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
              :value-format="item.valueFormat"
            />

            <!-- 日期范围选择器 -->
            <XlyDateRangePicker
              v-else-if="item.type === 'daterange'"
              v-model:start="formData[item.prop]"
              v-model:end="formData[item.endProp]"
              :start-placeholder="item.startPlaceholder"
              :end-placeholder="item.endPlaceholder"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
              :value-format="item.valueFormat"
              :separator="item.rangeSeparator"
              :size="size"
            />

            <!-- 日期时间选择器 -->
            <XlyDateTimePicker
              v-else-if="item.type === 'datetime'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
              :show-seconds="item.showSeconds"
            />

            <!-- 日期时间范围选择器 -->
            <XlyDateTimeRangePicker
              v-else-if="item.type === 'datetimerange'"
              v-model:start="formData[item.prop]"
              v-model:end="formData[item.endProp]"
              :start-placeholder="item.startPlaceholder"
              :end-placeholder="item.endPlaceholder"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
              :show-seconds="item.showSeconds"
              :separator="item.rangeSeparator"
              :size="size"
            />

            <!-- 时间选择器 -->
            <XlyTimePicker
              v-else-if="item.type === 'time'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
            />

            <!-- 时间范围选择器 -->
            <XlyTimeRangePicker
              v-else-if="item.type === 'timerange'"
              v-model:start="formData[item.prop]"
              v-model:end="formData[item.endProp]"
              :start-placeholder="item.startPlaceholder"
              :end-placeholder="item.endPlaceholder"
              :clearable="item.clearable !== false"
              :disabled="item.disabled || disabled"
              :format="item.format"
              :separator="item.rangeSeparator"
              :size="size"
            />

            <!-- 自定义插槽 -->
            <slot
              v-else-if="item.type === 'custom'"
              :name="`field-${item.prop}`"
              :model-value="formData[item.prop]"
              :item="item"
              :form-data="formData"
              @update:model-value="(val: any) => formData[item.prop] = val"
            />
          </XlyFormItem>
        </template>

        <!-- 操作按钮 -->
        <XlyFormItem class="search-actions">
          <XlyButton type="primary" :size="size" :loading="loading" @click="handleSearch">
            {{ searchButtonText }}
          </XlyButton>
          <span class="action-divider"></span>
          <XlyButton :size="size" @click="handleReset">
            {{ resetButtonText }}
          </XlyButton>
          <span v-if="showExpandButton" class="action-divider"></span>
          <XlyButton v-if="showExpandButton" :size="size" link @click="toggleExpanded">
            {{ expanded ? '收起' : '展开' }}
            <XlyIcon :name="expanded ? 'el:ArrowUp' : 'el:ArrowDown'" />
          </XlyButton>
        </XlyFormItem>
      </XlyForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import XlyForm from '../xly-form/index.vue'
import XlyFormItem from '../xly-form/xly-form-item.vue'
import XlyInput from '../xly-input/index.vue'
import XlySelect from '../xly-select/index.vue'
import XlyCascader from '../xly-cascader/index.vue'
import XlyDatePicker from '../xly-date-picker/index.vue'
import XlyDateTimePicker from '../xly-date-time-picker/index.vue'
import XlyTimePicker from '../xly-time-picker/index.vue'
import XlyDateRangePicker from '../xly-date-range-picker/index.vue'
import XlyDateTimeRangePicker from '../xly-date-time-range-picker/index.vue'
import XlyTimeRangePicker from '../xly-time-range-picker/index.vue'
import XlyButton from '../xly-button/index.vue'
import XlyIcon from '../xly-icon/index.vue'

defineOptions({
  name: 'XlySearchForm'
})

export interface SearchItem {
  /** 字段名 */
  prop: string
  /** 标签文本 */
  label: string
  /** 栅格占据的列数 */
  span?: number
  /** 组件类型 */
  type?: 'input' | 'textarea' | 'select' | 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'time' | 'timerange' | 'cascader' | 'custom'
  /** 占位符 */
  placeholder?: string
  /** 是否可清空 */
  clearable?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 最大长度 */
  maxlength?: number
  /** 是否显示字数统计 */
  showWordLimit?: boolean
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** textarea 行数 */
  rows?: number
  /** 选项列表（select 用） */
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  /** 是否多选（select 用） */
  multiple?: boolean
  /** 是否可搜索（select 用） */
  filterable?: boolean
  /** 多选时返回值的类型（select、cascader 用） */
  valueType?: 'array' | 'string'
  /** 多选且 valueType='string' 时的分隔符（select、cascader 用） */
  separator?: string
  /** 级联选择器选项（cascader 用） */
  cascaderOptions?: Array<{ label: string; value: any; children?: any[] }>
  /** 日期格式 */
  format?: string
  /** 日期值格式 */
  valueFormat?: string
  /** 是否显示秒（datetime 用） */
  showSeconds?: boolean
  /** 范围选择结束属性名（daterange、datetimerange、timerange 用） */
  endProp?: string
  /** 范围分隔符 */
  rangeSeparator?: string
  /** 开始日期占位符 */
  startPlaceholder?: string
  /** 结束日期占位符 */
  endPlaceholder?: string
  /** 是否必填 */
  required?: boolean
  /** 校验规则 */
  rules?: any[]
  /** 默认值 */
  defaultValue?: any
  /** 是否在收起时隐藏（用于展开/收起功能） */
  hiddenWhenCollapsed?: boolean
}

interface Props {
  /** 搜索项配置 */
  items?: SearchItem[]
  /** 初始数据 */
  modelValue?: Record<string, any>
  /** 是否内联布局 */
  inline?: boolean
  /** 组件尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 加载状态 */
  loading?: boolean
  /** 搜索按钮文本 */
  searchButtonText?: string
  /** 重置按钮文本 */
  resetButtonText?: string
  /** 是否显示展开按钮 */
  showExpandButton?: boolean
  /** 默认展开 */
  defaultExpanded?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 表单验证规则 */
  rules?: Record<string, any[]>
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  modelValue: () => ({}),
  inline: true,
  size: 'default',
  loading: false,
  searchButtonText: '查询',
  resetButtonText: '重置',
  showExpandButton: false,
  defaultExpanded: false,
  disabled: false,
  rules: () => ({})
})

const emit = defineEmits<{
  (e: 'search', data: Record<string, any>): void
  (e: 'reset'): void
  (e: 'expand', expanded: boolean): void
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

// 表单引用
const formRef = ref()

// 展开状态
const expanded = ref(props.defaultExpanded)

// 表单数据
const formData = reactive<Record<string, any>>({})

// 可见的搜索项
const visibleItems = computed(() => {
  if (!props.showExpandButton || expanded.value) {
    return props.items
  }
  return props.items.filter(item => !item.hiddenWhenCollapsed)
})

// 初始化表单数据
const initFormData = () => {
  props.items.forEach(item => {
    const value = props.modelValue?.[item.prop] ?? item.defaultValue ?? null
    formData[item.prop] = value
    // 初始化范围选择器的结束属性
    if (item.endProp) {
      const endValue = props.modelValue?.[item.endProp] ?? null
      formData[item.endProp] = endValue
    }
  })
}

// 处理搜索
const handleSearch = async () => {
  // 验证表单
  const isValid = await formRef.value?.validate().catch(() => false)
  if (!isValid) return

  const searchData = { ...formData }

  // 更新双向绑定
  emit('update:modelValue', searchData)
  emit('search', searchData)
}

// 处理重置
const handleReset = () => {
  formRef.value?.resetFields()

  // 重置为默认值
  props.items.forEach(item => {
    formData[item.prop] = item.defaultValue ?? null
  })

  emit('reset')
  emit('update:modelValue', {})
}

// 切换展开状态
const toggleExpanded = () => {
  expanded.value = !expanded.value
  emit('expand', expanded.value)
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.keys(val).forEach(key => {
        if (key in formData) {
          formData[key] = val[key]
        }
      })
    }
  },
  { deep: true }
)

// 监听展开状态变化
watch(() => props.defaultExpanded, (val) => {
  expanded.value = val
})

// 暴露方法
defineExpose({
  // 获取表单数据
  getData: () => ({ ...formData }),
  // 设置表单数据
  setData: (data: Record<string, any>) => {
    Object.keys(data).forEach(key => {
      if (key in formData) {
        formData[key] = data[key]
      }
    })
    emit('update:modelValue', { ...formData })
  },
  // 重置表单
  reset: handleReset,
  // 搜索
  search: handleSearch,
  // 验证表单
  validate: () => formRef.value?.validate(),
  // 清除验证
  clearValidate: () => formRef.value?.clearValidate(),
  // 展开
  expand: () => {
    expanded.value = true
    emit('expand', true)
  },
  // 收起
  collapse: () => {
    expanded.value = false
    emit('expand', false)
  },
  // 获取表单引用
  getFormRef: () => formRef.value
})

// 初始化
onMounted(() => {
  initFormData()
})
</script>

<style scoped lang="scss">
.xly-search-form {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e4ed;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c0c4cc;
  }
}

.search-form-body {
  padding: 16px 20px;

  :deep(.xly-form) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 16px;

    .xly-form-item {
      margin-bottom: 0;
    }
  }

  .search-actions {
    margin-left: auto;
    flex-shrink: 0;

    :deep(.xly-form-item__label) {
      display: none;
    }

    :deep(.xly-form-item__content) {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .action-divider {
        width: 12px;
        display: inline-block;
      }
    }
  }
}
</style>
