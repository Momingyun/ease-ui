<template>
  <div
    class="xly-date-time-range-picker"
    :class="[`xly-date-time-range-picker--${size}`, { 'is-disabled': disabled }]"
  >
    <!-- 开始日期时间选择器 -->
    <div class="date-time-range-picker__start">
      <XlyDateTimePicker
        :model-value="start"
        :placeholder="startPlaceholder || '开始时间'"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :format="format"
        :show-seconds="showSeconds"
        :size="size"
        @update:model-value="handleStartChange"
      />
    </div>

    <!-- 分隔符 -->
    <span class="date-time-range-picker__separator">{{ separator }}</span>

    <!-- 结束日期时间选择器 -->
    <div class="date-time-range-picker__end">
      <XlyDateTimePicker
        :model-value="end"
        :placeholder="endPlaceholder || '结束时间'"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :format="format"
        :show-seconds="showSeconds"
        :size="size"
        @update:model-value="handleEndChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import XlyDateTimePicker from '../xly-date-time-picker/index.vue'

export interface DateTimeRangePickerProps {
  /** 开始时间值 */
  start?: string
  /** 结束时间值 */
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
  /** 是否显示秒 */
  showSeconds?: boolean
  /** 分隔符 */
  separator?: string
  /** 组件尺寸 */
  size?: 'large' | 'default' | 'small'
}

defineOptions({
  name: 'XlyDateTimeRangePicker',
})

const props = withDefaults(defineProps<DateTimeRangePickerProps>(), {
  start: '',
  end: '',
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  disabled: false,
  readonly: false,
  clearable: true,
  format: '',
  showSeconds: false,
  separator: '至',
  size: 'default',
})

const emit = defineEmits<{
  (e: 'update:start', value: string): void
  (e: 'update:end', value: string): void
  (e: 'change', value: { start: string; end: string }): void
}>()

// 处理开始时间变化
const handleStartChange = (value: string) => {
  emit('update:start', value)
  emit('change', { start: value, end: props.end })
}

// 处理结束时间变化
const handleEndChange = (value: string) => {
  emit('update:end', value)
  emit('change', { start: props.start, end: value })
}
</script>

<style scoped lang="scss">
.xly-date-time-range-picker {
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
    :deep(.xly-date-time-picker) {
      .xly-date-time-picker__wrapper {
        height: 40px;
        padding: 0 15px;
      }
      .xly-date-time-picker__input {
        font-size: 14px;
      }
    }
  }

  &--default {
    :deep(.xly-date-time-picker) {
      .xly-date-time-picker__wrapper {
        height: 32px;
        padding: 0 12px;
      }
      .xly-date-time-picker__input {
        font-size: 14px;
      }
    }
  }

  &--small {
    :deep(.xly-date-time-picker) {
      .xly-date-time-picker__wrapper {
        height: 28px;
        padding: 0 10px;
      }
      .xly-date-time-picker__input {
        font-size: 13px;
      }
    }
  }
}
</style>
