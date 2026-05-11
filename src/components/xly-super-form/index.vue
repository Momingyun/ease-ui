<template>
  <form class="xly-super-form" :class="`xly-super-form--${size}`" @submit.prevent>
    <XlyRow :gutter="20">
      <XlyCol
        v-for="field in fieldList"
        :key="field.prop"
        :span="field.span ?? defaultSpan"
        class="xly-super-form__item"
        :class="[{ 'is-error': errors[getErrorKey(field)] }]"
      >
        <!-- 标签 -->
        <label
          v-if="field.showLabel !== false"
          class="xly-super-form__label"
          :style="{ width: getFieldLabelWidth(field) }"
        >
          <span v-if="field.required" class="xly-super-form__required">*</span>
          {{ field.label || field.prop }}
        </label>

        <!-- 控件 -->
        <div class="xly-super-form__control">
          <!-- 双绑定组件（如日期范围） -->
          <template v-if="isDualBinding(field)">
            <component
              :is="getComponent(field)"
              v-model:start="formData[field.startProp!]"
              v-model:end="formData[field.endProp!]"
              v-bind="getFieldProps(field)"
              :ref="(el) => setFieldRef(field.prop, el)"
            />
          </template>
          <!-- 普通组件 -->
          <template v-else>
            <component
              :is="getComponent(field)"
              v-model="formData[field.prop]"
              v-bind="getFieldProps(field)"
              :ref="(el) => setFieldRef(field.prop, el)"
            >
              <template #prepend v-if="field.props?.prefix">{{ field.props?.prefix }}</template>
              <template #append v-if="field.props?.suffix">{{ field.props?.suffix }}</template>
            </component>
          </template>

          <!-- 错误信息 -->
          <div v-if="errors[getErrorKey(field)]" class="xly-super-form__error">
            {{ errors[getErrorKey(field)] }}
          </div>
        </div>
      </XlyCol>
    </XlyRow>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, type Component } from 'vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlyRow from '@/components/xly-row/index.vue'
import XlyCol from '@/components/xly-col/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyDatePicker from '@/components/xly-date-picker/index.vue'
import XlySwitch from '@/components/xly-switch/index.vue'
import XlyRate from '@/components/xly-rate/index.vue'
import XlyDateRangePicker from '@/components/xly-date-range-picker/index.vue'
import XlyCascader from '@/components/xly-cascader/index.vue'
import XlyTimePicker from '@/components/xly-time-picker/index.vue'
import XlyTimeRangePicker from '@/components/xly-time-range-picker/index.vue'
import XlyDateTimePicker from '@/components/xly-date-time-picker/index.vue'
import XlyDateTimeRangePicker from '@/components/xly-date-time-range-picker/index.vue'
import XlyImageUpload from '@/components/xly-image-upload/index.vue'
import XlyUserPicker from '@/components/xly-user-picker/index.vue'

// ============ 类型定义 ============

/** 字段配置 */
export interface SuperField {
  /** 字段名（属性名） */
  prop: string
  /** 标签文字，默认使用 prop */
  label?: string
  /** 是否显示标签，默认 true */
  showLabel?: boolean
  /** 标签宽度，默认 100px */
  labelWidth?: string
  /** 是否必填 */
  required?: boolean
  /** 组件类型：input | select | datePicker | dateRangePicker | dateTimePicker | dateTimeRangePicker | timePicker | timeRangePicker | cascader | switch | rate */
  type?: string
  /** 自定义组件（兼容旧写法） */
  component?: Component
  /** 传递给组件的额外属性 */
  props?: Record<string, any>
  /** 栅格占位（1-24），默认继承 span */
  span?: number
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 校验规则 */
  rules?: FieldRule[]
  /** 开始日期/时间字段名（范围组件用），同时作为错误信息的 key */
  startProp?: string
  /** 结束日期/时间字段名（范围组件用） */
  endProp?: string
  /** 远程搜索方法（用于 select/cascader 组件） */
  remoteMethod?: (query: string, instance: any) => void
}

// 组件类型映射表
const typeMap: Record<string, Component> = {
  input: XlyInput,
  select: XlySelect,
  datePicker: XlyDatePicker,
  dateRangePicker: XlyDateRangePicker,
  dateTimePicker: XlyDateTimePicker,
  dateTimeRangePicker: XlyDateTimeRangePicker,
  timePicker: XlyTimePicker,
  timeRangePicker: XlyTimeRangePicker,
  cascader: XlyCascader,
  switch: XlySwitch,
  rate: XlyRate,
  imageUpload: XlyImageUpload,
  user: XlyUserPicker
}

/** 校验规则 */
export interface FieldRule {
  type?: 'required' | 'email' | 'phone' | 'url' | 'pattern'
  message?: string
  pattern?: string | RegExp
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  validator?: (value: any, formData?: AnyObj) => string | boolean
}

/** 通用对象 */
type AnyObj = { [key: string]: any }

// ============ Props ============

interface Props {
  /** 表单数据对象（支持双向绑定） */
  modelValue?: AnyObj
  /** 字段配置 */
  fields: SuperField[]
  /** 布局方式 */
  layout?: 'vertical' | 'inline'
  /** 标签宽度 */
  labelWidth?: string
  /** 默认栅格占位（1-24） */
  span?: number
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  labelWidth: '100px',
  span: 24,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: AnyObj]
  submit: [data: AnyObj]
  reset: []
  validate: [result: { valid: boolean; errors: AnyObj }]
}>()

// 内部数据
const internalData = reactive<AnyObj>({})

// 如果外部传入了 modelValue，通过 watch 同步；否则直接使用内部数据
const formData = computed(() => props.modelValue ?? internalData)

// 同步锁：防止外部 modelValue 变化时触发 emit
let syncingFromExternal = false

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      syncingFromExternal = true
      // 深拷贝避免引用导致的循环
      const copied = JSON.parse(JSON.stringify(newVal))
      for (const key in copied) {
        internalData[key] = copied[key]
      }
      // 延迟解锁到下一个事件循环，确保 emit 被正确忽略
      setTimeout(() => {
        syncingFromExternal = false
      }, 0)
    }
  },
  { immediate: true },
)

// 提交时通知外部（仅在外部修改时触发）
watch(
  () => internalData,
  () => {
    if (syncingFromExternal) return
    if (props.modelValue !== undefined) {
      Object.assign(props.modelValue, internalData)
      emit('update:modelValue', props.modelValue)
    }
  },
  { deep: true },
)

const defaultSpan = computed(() => props.span)

// ============ 数据状态 ============

const errors = ref<Record<string, string>>({})

// 存储字段的组件实例
const fieldRefs = ref<Record<string, any>>({})

// ============ 计算属性 ============

const fieldList = computed<SuperField[]>(() => props.fields || [])

// 获取字段的标签宽度
function getFieldLabelWidth(field: SuperField): string {
  return field.labelWidth ?? props.labelWidth
}

// 根据 type 或 component 获取组件
function getComponent(field: SuperField): Component {
  if (field.component) {
    return field.component
  }
  if (field.type) {
    return typeMap[field.type] || XlyInput
  }
  return XlyInput
}

// 是否为双绑定组件（日期范围等）
function isDualBinding(field: SuperField): boolean {
  return !!field.startProp && !!field.endProp
}

// 获取错误信息的 key
function getErrorKey(field: SuperField): string {
  return field.startProp || field.prop
}

// 设置字段组件实例
function setFieldRef(prop: string, el: any) {
  if (el) {
    fieldRefs.value[prop] = el
  }
}

// 获取字段的 props（处理远程搜索方法）
function getFieldProps(field: SuperField): Record<string, any> {
  const fieldProps = { ...(field.props || {}) }

  // 如果有 remoteMethod，包装一下自动更新 options
  if (field.remoteMethod) {
    fieldProps.remote = true
    fieldProps.filterable = true
    fieldProps['remote-method'] = async (query: string) => {
      const instance = fieldRefs.value[field.prop]
      if (!instance) return

      if (!query) {
        instance.remoteOptions.value = []
        return
      }

      // 用户返回数组或 Promise，组件自动填充
      let result = field.remoteMethod!(query)
      if (result instanceof Promise) {
        result = await result
      }
      // remoteOptions 是 ref，需要用 .value 赋值
      instance.remoteOptions.value = result || []
    }
  }

  return fieldProps
}

// ============ 方法 ============

function initFormData() {
  // 如果外部传入了 modelValue，不在组件内部初始化（由外部管理初始值）
  if (props.modelValue !== undefined) return

  // 只在内部数据中初始化
  const data = internalData
  for (const field of fieldList.value) {
    // 初始化 prop
    if (data[field.prop] === undefined) {
      const p = field.props
      data[field.prop] = p?.multiple ? [] : ''
    }
    // 初始化 startProp/endProp（双绑定组件）
    if (field.startProp && data[field.startProp] === undefined) {
      data[field.startProp] = ''
    }
    if (field.endProp && data[field.endProp] === undefined) {
      data[field.endProp] = ''
    }
  }
}

async function validateField(prop: string): Promise<boolean> {
  const field = fieldList.value.find((f) => f.prop === prop)
  if (!field) return true

  const errorKey = getErrorKey(field)
  const data = formData.value
  const value = isDualBinding(field) ? data[field.startProp!] : data[prop]
  const labelText = field.label || field.startProp || field.prop

  if (field.required) {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors.value[errorKey] = `请填写${labelText}`
      return false
    }
  }

  if (field.rules?.length) {
    for (const rule of field.rules) {
      let error: string | boolean = true

      if (rule.type === 'required') {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          error = rule.message || `请填写${labelText}`
        }
      } else if (rule.type === 'email') {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = rule.message || '邮箱格式不正确'
        }
      } else if (rule.type === 'phone') {
        if (value && !/^1[3-9]\d{9}$/.test(value)) {
          error = rule.message || '手机号格式不正确'
        }
      } else if (rule.type === 'pattern' && rule.pattern) {
        const regex = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern
        if (value && !regex.test(value)) {
          error = rule.message || '格式不正确'
        }
      } else if (rule.validator) {
        error = rule.validator(value, formData.value)
      }

      if (error !== true) {
        errors.value[errorKey] = typeof error === 'string' ? error : String(error)
        return false
      }
    }
  }

  delete errors.value[errorKey]
  return true
}

async function validate(): Promise<boolean> {
  let valid = true
  errors.value = {}
  for (const field of fieldList.value) {
    const fieldValid = await validateField(field.prop)
    if (!fieldValid) valid = false
  }
  emit('validate', { valid, errors: { ...errors.value } })
  return valid
}

function handleReset() {
  const data = formData.value
  for (const field of fieldList.value) {
    const p = field.props
    data[field.prop] = p?.multiple ? [] : ''
  }
  errors.value = {}
  emit('reset')
}

async function handleSubmit() {
  const valid = await validate()
  if (valid) {
    emit('submit', { ...formData.value })
  }
}

// ============ 生命周期 ============

onMounted(() => {
  initFormData()
})

watch(
  () => props.fields,
  () => {
    initFormData()
  },
  { deep: true },
)

// ============ 暴露方法 ============

defineExpose({
  validate,
  validateField,
  resetFields: handleReset,
  clearValidate: (props?: string[]) => {
    if (props) {
      props.forEach((p) => delete errors.value[p])
    } else {
      errors.value = {}
    }
  },
  submit: handleSubmit,
  getFormData: () => formData.value,
})
</script>

<style scoped lang="scss">
.xly-super-form {
  width: 100%;
}

/* 通用 item 样式 */
.xly-super-form__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
  width: 100%;
  box-sizing: border-box;
}

/* 垂直布局 */
.xly-super-form__item--vertical {
  flex-direction: column;
  align-items: flex-start;

  .xly-super-form__label {
    text-align: left;
    margin-bottom: 4px;
  }
}

/* 标签样式 */
.xly-super-form__label {
  flex-shrink: 0;
  margin-right: 8px;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

.xly-super-form__required {
  color: #f56c6c;
  margin-right: 2px;
}

.xly-super-form__control {
  flex: 1;
  min-width: 200px;
  max-width: 100%;
}

.xly-super-form__error {
  font-size: 12px;
  color: #f56c6c;
  margin-top: 4px;
  line-height: 1.4;
}

/* 错误状态 */
.xly-super-form__item.is-error :deep(.el-input__wrapper),
.xly-super-form__item.is-error :deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
</style>
