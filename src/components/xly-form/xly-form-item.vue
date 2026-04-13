<template>
  <div class="xly-form-item" :class="{ 'is-error': !!errorMessage, 'is-required': isRequired }" :style="itemStyle">
    <label v-if="label" class="xly-form-item__label" :style="{ width: labelWidth || undefined }">
      <span class="xly-form-item__label-text">{{ label }}</span>
    </label>
    <div class="xly-form-item__content">
      <div class="xly-form-item__control">
        <slot />
      </div>
      <Transition name="xly-form-error-fade">
        <div v-if="errorMessage" class="xly-form-item__error">
          {{ errorMessage }}
        </div>
      </Transition>
      <div v-if="$slots.tip && !errorMessage" class="xly-form-item__tip">
        <slot name="tip" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'
import type { FormRule, Rule } from './utils'
import { required } from './utils'

const TOTAL_COL = 24

export interface FormItemProps {
  label?: string
  prop?: string
  rules?: Rule[]
  required?: boolean
  msg?: string
  /** 栅格占位，默认 24（占满一行），inline 模式下常用 6/8/12 等值控制一行几个 */
  span?: number
}

const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  prop: '',
  rules: undefined,
  required: false,
  msg: undefined,
})

// 从 Form 注入的上下文
const formContext = inject<{
  labelWidth?: string
  span?: number | ComputedRef<number | undefined>
  modelValue?: Record<string, any>
  errors: Ref<Record<string, string>>
  registerField: (prop: string, rules: Rule[]) => void
  unregisterField: (prop: string) => void
  getMergedRules?: () => Record<string, Rule[]>
} | null>('xlyFormContext', null)

// 处理 required 属性，将其转换为规则
const effectiveRules = computed<Rule[]>(() => {
  const rules = props.rules || []

  // 如果设置了 required 属性，自动添加必填规则
  if (props.required) {
    const hasRequiredRule = rules.some(rule => {
      if (typeof rule === 'string') {
        return rule === 'required'
      }
      // 检查 FormRule 的 validator 是否包含 '必填' 或 'required'
      const fnStr = rule.validator.toString()
      return fnStr.includes('必填') || fnStr.includes('required')
    })

    if (!hasRequiredRule) {
      // 优先使用自定义消息，否则使用"请填写 + label"
      const message = props.msg || `请填写${props.label}`
      return [required(message), ...rules]
    }
  }

  return rules
})

// 注册/注销字段
onMounted(() => {
  if (props.prop && formContext?.registerField) {
    formContext.registerField(props.prop, effectiveRules.value)
  }
})

onUnmounted(() => {
  if (props.prop && formContext?.unregisterField) {
    formContext.unregisterField(props.prop)
  }
})

const errorMessage = computed(() => {
  if (props.prop && formContext?.errors) {
    return formContext.errors.value[props.prop] || ''
  }
  return ''
})

const isRequired = computed(() => {
  // 如果明确设置了 required 属性，直接返回 true
  if (props.required) return true

  // 获取合并后的规则（Form 级别 + Field 级别）
  let rules: Rule[] = []
  if (props.prop && formContext?.getMergedRules) {
    const mergedRules = formContext.getMergedRules()
    rules = mergedRules[props.prop] || []
  } else {
    // 如果 prop 不存在或无法获取合并规则，回退到 props.rules
    rules = props.rules || []
  }

  // 检查规则中是否有必填规则
  return rules.some(r => {
    if (typeof r === 'string') {
      return r === 'required'
    }
    // 检查 FormRule 的 required 标记
    return r.required === true
  })
})

const labelWidth = computed(() => formContext?.labelWidth)

/** 栅格宽度：优先取自身 span，否则取 Form 注入的 span，都没有则占满一行 */
const itemStyle = computed(() => {
  const formSpan = formContext?.span
  const span = props.span ?? (typeof formSpan === 'number' ? formSpan : formSpan?.value)
  if (!span || span >= TOTAL_COL) return undefined
  return { width: `${(span / TOTAL_COL) * 100}%` }
})
</script>

<style scoped lang="scss">
$danger: #f56c6c;
$text-secondary: #6b7280;
$text-placeholder: #8e8ea0;
$transition: all 0.2s ease;

.xly-form-item {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
  min-height: 32px;

  &.is-error {
    :deep(.xly-input__wrapper) {
      border-color: $danger !important;
      box-shadow: 0 0 0 1px $danger inset !important;
    }
    :deep(.xly-select .xly-select__wrapper) {
      border-color: $danger !important;
      box-shadow: 0 0 0 1px $danger inset !important;
    }
  }

  &.is-required {
    .xly-form-item__label-text::before {
      content: '*';
      color: $danger;
      margin-right: 4px;
    }
  }
}

.xly-form-item__label {
  flex-shrink: 0;
  padding-top: 6px;
  text-align: right;
  padding-right: 12px;
  box-sizing: border-box;
}

.xly-form-item__label-text {
  font-size: 14px;
  color: #1a1a2e;
  font-weight: 500;
  line-height: 1.4;
}

.xly-form-item__content {
  flex: 1;
  min-width: 0;
  position: relative;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  min-height: 36px;
}

.xly-form-item__control {
  width: 100%;
}

.xly-form-item__error {
  font-size: 12px;
  color: $danger;
  line-height: 1.4;
  margin-top: 4px;
  word-break: break-all;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 1;
}

.xly-form-item__tip {
  font-size: 12px;
  color: $text-placeholder;
  line-height: 1.4;
  margin-top: 4px;
}

.xly-form-error-fade-enter-active,
.xly-form-error-fade-leave-active {
  transition: opacity 0.2s ease;
}
.xly-form-error-fade-enter-from,
.xly-form-error-fade-leave-to {
  opacity: 0;
}
</style>
