<template>
  <div class="xly-input" :class="wrapperClass">
    <!-- 前置内容 -->
    <div v-if="$slots.prepend && type !== 'textarea'" class="xly-input__prepend">
      <slot name="prepend" />
    </div>

    <div class="xly-input__wrapper" :class="[wrapperInnerClass, { 'is-textarea': type === 'textarea' }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <!-- 前缀图标 -->
      <span v-if="$slots.prefix || prefixIcon" class="xly-input__prefix">
        <slot name="prefix" />
        <XlyIcon v-if="!$slots.prefix && prefixIcon" :name="prefixIcon" />
      </span>

      <!-- 输入框 -->
      <template v-if="type === 'textarea'">
        <textarea
          ref="inputRef"
          class="xly-input__inner xly-input__inner--textarea"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :rows="rows"
          :style="textareaStyle"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          @compositionstart="isComposing = true"
          @compositionend="isComposing = false"
        />
        <!-- 字数统计 -->
        <span v-if="showWordLimit && maxlength" class="xly-input__word-limit">
          {{ (modelValue as string || '').length }}/{{ maxlength }}
        </span>
      </template>

      <!-- 输入框 -->
      <input
        v-else
        ref="inputRef"
        class="xly-input__inner"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="isComposing = true"
        @compositionend="isComposing = false"
      />

      <!-- 字数统计（非 textarea） -->
      <span v-if="type !== 'textarea' && showWordLimit && maxlength" class="xly-input__word-limit">
        {{ (modelValue as string || '').length }}/{{ maxlength }}
      </span>

      <!-- 后缀图标 / 清除 / 密码切换 -->
      <span v-if="showSuffix" class="xly-input__suffix">
        <!-- 清除按钮 -->
        <span v-if="clearable && modelValue && !disabled && !readonly" class="xly-input__clear" @click="clear">
          <XlyIcon name="el:Close" />
        </span>
        <!-- 密码显示/隐藏切换 -->
        <span v-if="type === 'password' && modelValue" class="xly-input__password-toggle" @click="togglePassword">
          <XlyIcon :name="passwordVisible ? 'el:View' : 'el:Hide'" />
        </span>
        <slot name="suffix" />
        <XlyIcon v-if="!$slots.suffix && suffixIcon" :name="suffixIcon" />
      </span>
    </div>

    <!-- 后置内容 -->
    <div v-if="$slots.append && type !== 'textarea'" class="xly-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'textarea' | 'number' | 'tel' | 'email' | 'url'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  maxlength?: number
  showWordLimit?: boolean
  /** 前缀图标名称，使用 XlyIcon 的 name 格式，如 `el:Search`、`svg:edit` */
  prefixIcon?: string
  /** 后缀图标名称，使用 XlyIcon 的 name 格式，如 `el:Calendar`、`svg:edit` */
  suffixIcon?: string
  autocomplete?: string
  inputmode?: string
  size?: 'large' | 'default' | 'small'
  /** textarea 初始行数，默认 2 */
  rows?: number
  /** textarea 是否允许拖动调整大小，默认 'vertical'，可选 'none' | 'both' | 'horizontal' | 'vertical' */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  maxlength: undefined,
  showWordLimit: false,
  prefixIcon: undefined,
  suffixIcon: undefined,
  autocomplete: 'off',
  inputmode: undefined,
  size: 'default',
  rows: 2,
  resize: 'vertical',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
const focusing = ref(false)
const hovering = ref(false)
const isComposing = ref(false)
const passwordVisible = ref(false)

// textarea 样式
const textareaStyle = computed(() => ({
  resize: props.resize,
}))

const wrapperClass = computed(() => [
  `xly-input--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-focus': focusing.value,
  },
])

const wrapperInnerClass = computed(() => ({
  'is-hover': hovering.value && !props.disabled,
  'is-focus': focusing.value,
  'is-disabled': props.disabled,
  'has-prefix': !!props.prefixIcon || !!slots.prefix,
  'has-suffix': showSuffix.value,
}))

const slots = defineSlots()

const currentType = computed(() => {
  if (props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const showSuffix = computed(() => {
  return props.clearable || props.type === 'password' || !!props.suffixIcon || !!slots.suffix
})

function handleInput(e: Event) {
  if (isComposing.value) return
  const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

function handleChange() {
  emit('change', String(props.modelValue))
}

function handleFocus(e: FocusEvent) {
  focusing.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  focusing.value = false
  handleChange()
  emit('blur', e)
}

function handleKeydown(e: KeyboardEvent) {
  emit('keydown', e)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function togglePassword() {
  passwordVisible.value = !passwordVisible.value
}

/** 聚焦 */
function focus() {
  inputRef.value?.focus()
}

/** 失焦 */
function blur() {
  inputRef.value?.blur()
}

/** 选中 */
function select() {
  inputRef.value?.select()
}

defineExpose({ focus, blur, select, inputRef })
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$border-focus: #4f6ef7;
$border-hover: #c8cbd8;
$disabled-bg: #f5f7fa;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;
$danger: #f56c6c;
$transition: all 0.2s ease;

.xly-input {
  display: inline-flex;
  width: 100%;
  position: relative;

  // ========== 尺寸 ==========
  &--large .xly-input__wrapper { height: 44px; }
  &--large .xly-input__inner { font-size: 15px; }
  &--large .xly-input__prepend,
  &--large .xly-input__append { font-size: 14px; }

  &--default .xly-input__wrapper { height: 36px; }
  &--default .xly-input__inner { font-size: 14px; }
  &--default .xly-input__prepend,
  &--default .xly-input__append { font-size: 14px; }

  &--small .xly-input__wrapper { height: 30px; }
  &--small .xly-input__inner { font-size: 13px; }
  &--small .xly-input__prepend,
  &--small .xly-input__append { font-size: 12px; }

  // ========== 前后置 ==========
  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    background-color: #f5f7fa;
    color: $text-color;
    border: 1px solid $border-color;
    white-space: nowrap;
    font-weight: 500;
  }

  &__prepend {
    border-right: none;
    border-radius: $radius 0 0 $radius;
  }

  &__append {
    border-left: none;
    border-radius: 0 $radius $radius 0;
  }

  &__prepend + &__wrapper { border-radius: 0 $radius $radius 0; }

  // ========== 输入区域 ==========
  &__wrapper {
    flex: 1;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: $radius;
    transition: $transition;
    box-sizing: border-box;
    cursor: text;

    &.is-hover:not(.is-disabled) { border-color: $border-hover; }
    &.is-focus:not(.is-disabled) { border-color: $border-focus; box-shadow: 0 0 0 2px $primary-light; }
    &.is-disabled {
      background-color: $disabled-bg;
      cursor: not-allowed;
    }

    &.has-prefix { padding-left: 8px; }
    &.has-suffix { padding-right: 8px; }

    // textarea 模式
    &.is-textarea {
      display: flex;
      flex-direction: column;
      padding: 0;
      height: auto;
      min-height: auto;
      position: relative;
    }
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    color: $text-color;
    font-family: inherit;
    box-sizing: border-box;

    &::placeholder { color: $text-placeholder; }
    &:disabled { color: $disabled-color; cursor: not-allowed; }

    // textarea 样式
    &--textarea {
      padding: 8px 12px;
      line-height: 1.5;
      font-family: inherit;
      min-height: auto;
      box-sizing: border-box;
      overflow: auto;
      height: auto;
      flex: none;
    }
  }

  // ========== 前缀/后缀 ==========
  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $text-placeholder;
    transition: color $transition;
    flex-shrink: 0;
  }

  &__prefix { margin-right: 4px; }
  &__suffix { margin-left: 4px; }

  &__clear,
  &__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $text-placeholder;
    cursor: pointer;
    transition: color $transition;
    border-radius: 50%;

    &:hover { color: $text-color; }
  }

  // ========== 字数统计 ==========
  &__word-limit {
    flex-shrink: 0;
    margin-left: 8px;
    font-size: 12px;
    color: $text-placeholder;

    // textarea 模式下的字数统计
    .is-textarea & {
      position: absolute;
      right: 30px;
      bottom: 8px;
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 0;
      z-index: 10;
      pointer-events: none;
    }
  }
}
</style>
