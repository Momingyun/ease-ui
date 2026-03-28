<template>
  <div
    class="xly-radio-group"
    :class="[
      `xly-radio-group--${size}`,
      { 'is-disabled': disabled },
    ]"
    role="radiogroup"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({ name: 'XlyRadioGroup' })

export interface RadioGroupProps {
  /** 绑定值 */
  modelValue?: string | number | boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 原生 name 属性 */
  name?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  disabled: false,
  size: 'default',
  name: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
}>()

provide('xlyRadioGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  changeEvent(val: string | number | boolean) {
    emit('update:modelValue', val)
    emit('change', val)
  },
})
</script>

<style scoped lang="scss">
.xly-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  &.is-disabled {
    cursor: not-allowed;
  }
}
</style>
