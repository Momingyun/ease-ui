<template>
  <div class="xly-date-range-picker" :class="[`xly-date-range-picker--${size}`, { 'is-disabled': disabled }]">
    <!-- 开始日期选择器 -->
    <div class="date-range-picker__start">
      <XlyDatePicker
        :model-value="start"
        :placeholder="startPlaceholder || '开始日期'"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :format="format"
        :value-format="valueFormat"
        :size="size"
        @update:model-value="handleStartChange"
      />
    </div>

    <!-- 分隔符 -->
    <span class="date-range-picker__separator">{{ separator }}</span>

    <!-- 结束日期选择器 -->
    <div class="date-range-picker__end">
      <XlyDatePicker
        :model-value="end"
        :placeholder="endPlaceholder || '结束日期'"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :format="format"
        :value-format="valueFormat"
        :size="size"
        @update:model-value="handleEndChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import XlyDatePicker from '../xly-date-picker/index.vue'

export interface DateRangePickerProps {
  /** 开始日期值 */
  start?: string
  /** 结束日期值 */
  end?: string
  /** 占位符 */
  startPlaceholder?: string
  /** 结束占位符 */
  endPlaceholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 日期格式 */
  format?: string
  /** 日期值格式 */
  valueFormat?: string
  /** 分隔符 */
  separator?: string
  /** 组件尺寸 */
  size?: 'large' | 'default' | 'small'
}

defineOptions({
  name: 'XlyDateRangePicker'
})

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  start: '',
  end: '',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  disabled: false,
  readonly: false,
  clearable: true,
  format: 'YYYY-MM-DD',
  valueFormat: '',
  separator: '至',
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:start', value: string): void
  (e: 'update:end', value: string): void
  (e: 'change', value: { start: string; end: string }): void
}>()

// 处理开始日期变化
const handleStartChange = (value: string) => {
  emit('update:start', value)
  emit('change', { start: value, end: props.end })
}

// 处理结束日期变化
const handleEndChange = (value: string) => {
  emit('update:end', value)
  emit('change', { start: props.start, end: value })
}
</script>

<style scoped lang="scss">
.xly-date-range-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__separator {
    color: #909399;
    font-size: 14px;
    flex-shrink: 0;
    user-select: none;
  }

  &__start,
  &__end {
    flex: 1;
    min-width: 0;
  }

  // 尺寸变体
  &--large {
    :deep(.xly-date-picker) {
      .xly-date-picker__wrapper {
        height: 40px;
        padding: 0 15px;
      }
      .xly-date-picker__input {
        font-size: 14px;
      }
    }
  }

  &--default {
    :deep(.xly-date-picker) {
      .xly-date-picker__wrapper {
        height: 32px;
        padding: 0 12px;
      }
      .xly-date-picker__input {
        font-size: 14px;
      }
    }
  }

  &--small {
    :deep(.xly-date-picker) {
      .xly-date-picker__wrapper {
        height: 28px;
        padding: 0 10px;
      }
      .xly-date-picker__input {
        font-size: 13px;
      }
    }
  }
}
</style>
