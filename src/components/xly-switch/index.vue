<template>
  <div
    class="xly-switch"
    :class="[
      `xly-switch--${size}`,
      {
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-loading': loading,
      },
    ]"
    @click="handleClick"
  >
    <span
      class="xly-switch__core"
      :style="{
        background: isChecked ? activeColor : inactiveColor
      }"
    >
      <span v-if="loading" class="xly-switch__loading" />
      <span v-else class="xly-switch__dot" />
    </span>
    <span v-if="activeText || inactiveText" class="xly-switch__text">
      {{ isChecked ? activeText : inactiveText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'XlySwitch' })

export interface SwitchProps {
  /** 绑定值 */
  modelValue?: boolean | string | number
  /** 选中时的值 */
  activeValue?: boolean | string | number
  /** 未选中时的值 */
  inactiveValue?: boolean | string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 开启时的颜色 */
  activeColor?: string
  /** 关闭时的颜色 */
  inactiveColor?: string
  /** 开启时的文字描述 */
  activeText?: string
  /** 关闭时的文字描述 */
  inactiveText?: string
  /** 加载状态 */
  loading?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  disabled: false,
  size: 'default',
  activeColor: '#4f6ef7',
  inactiveColor: '#e2e4ed',
  activeText: '',
  inactiveText: '',
  loading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | string | number): void
  (e: 'change', value: boolean | string | number): void
}>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

function handleClick() {
  if (props.disabled || props.loading) return

  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped lang="scss">
$xly-switch-width: (
  'large': 48px,
  'default': 40px,
  'small': 32px
) !default;

$xly-switch-height: (
  'large': 24px,
  'default': 20px,
  'small': 16px
) !default;

$xly-switch-dot-size: (
  'large': 18px,
  'default': 16px,
  'small': 12px
) !default;

$xly-switch-dot-offset: (
  'large': 3px,
  'default': 2px,
  'small': 2px
) !default;

.xly-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.is-loading {
    cursor: wait;
  }
}

.xly-switch__core {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: map-get($xly-switch-width, 'default');
  height: map-get($xly-switch-height, 'default');
  border-radius: 100px;
  background: #e2e4ed;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;

  .xly-switch--large & {
    width: map-get($xly-switch-width, 'large');
    height: map-get($xly-switch-height, 'large');
  }

  .xly-switch--small & {
    width: map-get($xly-switch-width, 'small');
    height: map-get($xly-switch-height, 'small');
  }
}

.xly-switch__dot {
  position: absolute;
  width: map-get($xly-switch-dot-size, 'default');
  height: map-get($xly-switch-dot-size, 'default');
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  left: map-get($xly-switch-dot-offset, 'default');

  .xly-switch--large & {
    width: map-get($xly-switch-dot-size, 'large');
    height: map-get($xly-switch-dot-size, 'large');
    left: map-get($xly-switch-dot-offset, 'large');
  }

  .xly-switch--small & {
    width: map-get($xly-switch-dot-size, 'small');
    height: map-get($xly-switch-dot-size, 'small');
    left: map-get($xly-switch-dot-offset, 'small');
  }
}

.xly-switch__loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: switch-loading 0.8s linear infinite;
}

@keyframes switch-loading {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.xly-switch__text {
  margin-left: 8px;
  font-size: 14px;
  line-height: 1;
  transition: all 0.3s ease;

  .xly-switch--large & {
    font-size: 15px;
  }

  .xly-switch--small & {
    font-size: 13px;
    margin-left: 6px;
  }
}

// 选中状态 - 颜色现在通过内联样式控制

.xly-switch.is-checked .xly-switch__dot {
  left: calc(100% - #{map-get($xly-switch-dot-size, 'default')} - #{map-get($xly-switch-dot-offset, 'default')});

  .xly-switch--large & {
    left: calc(100% - #{map-get($xly-switch-dot-size, 'large')} - #{map-get($xly-switch-dot-offset, 'large')});
  }

  .xly-switch--small & {
    left: calc(100% - #{map-get($xly-switch-dot-size, 'small')} - #{map-get($xly-switch-dot-offset, 'small')});
  }
}

// 悬停效果
.xly-switch:not(.is-disabled):not(.is-loading):hover {
  .xly-switch__core {
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
  }

  &.is-checked .xly-switch__core {
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.2);
  }
}
</style>
