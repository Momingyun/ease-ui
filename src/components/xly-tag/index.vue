<template>
  <span
    v-if="visible"
    class="xly-tag"
    :class="tagClass"
    :style="tagStyle"
    @click="handleClick"
  >
    <!-- 前置图标 -->
    <span v-if="icon" class="xly-tag__icon">
      <el-icon><component :is="icon" /></el-icon>
    </span>

    <!-- 标签文字 -->
    <span class="xly-tag__text"><slot /></span>

    <!-- 关闭按钮 -->
    <span
      v-if="closable"
      class="xly-tag__close"
      @click.stop="handleClose"
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'XlyTag' })

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagSize = 'large' | 'default' | 'small'
export type TagEffect = 'light' | 'plain' | 'dark'

export interface TagProps {
  /** 标签类型 */
  type?: TagType
  /** 标签尺寸 */
  size?: TagSize
  /** 主题效果 */
  effect?: TagEffect
  /** 是否可关闭 */
  closable?: boolean
  /** 是否为圆角胶囊形 */
  round?: boolean
  /** 是否可点击（带 hover 效果） */
  clickable?: boolean
  /** 前置图标（Element Plus 图标名） */
  icon?: string
  /** 自定义颜色（覆盖 type） */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'default',
  effect: 'light',
  closable: false,
  round: false,
  clickable: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
  (e: 'click', event: MouseEvent): void
}>()

const visible = ref(true)

const tagClass = computed(() => [
  `xly-tag--${props.type}`,
  `xly-tag--${props.size}`,
  `xly-tag--${props.effect}`,
  {
    'is-round': props.round,
    'is-closable': props.closable,
    'is-clickable': props.clickable && !props.disabled,
    'is-disabled': props.disabled,
  },
])

const tagStyle = computed(() => {
  if (!props.color) return {}
  // 自定义颜色：根据 effect 生成相应样式
  const color = props.color
  if (props.effect === 'dark') {
    return {
      backgroundColor: color,
      borderColor: color,
      color: '#fff',
    }
  }
  if (props.effect === 'plain') {
    return {
      backgroundColor: 'transparent',
      borderColor: color,
      color,
    }
  }
  // light
  return {
    backgroundColor: `${color}1a`,
    borderColor: `${color}40`,
    color,
  }
})

function handleClick(e: MouseEvent) {
  if (props.disabled) return
  if (props.clickable) {
    emit('click', e)
  }
}

function handleClose(e: MouseEvent) {
  if (props.disabled) return
  emit('close', e)
  visible.value = false
}

/** 重置显示状态（外部调用） */
function show() {
  visible.value = true
}

defineExpose({ show })
</script>

<style scoped lang="scss">
@use 'sass:color';

/* ========== 设计令牌 ========== */
$radius: 6px;
$radius-round: 100px;
$transition: all 0.2s ease;

/* ========== 类型色板 ========== */
// default
$default-text:   #606266;
$default-bg:     #f4f4f5;
$default-border: #e9e9eb;
$default-dark-bg: #909399;

// primary
$primary:        #4f6ef7;
$primary-light-bg:   rgba(79, 110, 247, 0.1);
$primary-light-border: rgba(79, 110, 247, 0.25);

// success
$success:        #34c759;
$success-light-bg:   rgba(52, 199, 89, 0.1);
$success-light-border: rgba(52, 199, 89, 0.25);

// warning
$warning:        #f5a623;
$warning-light-bg:   rgba(245, 166, 35, 0.1);
$warning-light-border: rgba(245, 166, 35, 0.25);

// danger
$danger:         #ff3b30;
$danger-light-bg:    rgba(255, 59, 48, 0.1);
$danger-light-border: rgba(255, 59, 48, 0.25);

// info
$info:           #8e8ea0;
$info-light-bg:      rgba(142, 142, 160, 0.1);
$info-light-border:  rgba(142, 142, 160, 0.25);

/* ========== 基础样式 ========== */
.xly-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  height: 28px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  border-radius: $radius;
  border: 1px solid transparent;
  transition: $transition;
  white-space: nowrap;
  vertical-align: middle;
  box-sizing: border-box;
  cursor: default;
  user-select: none;

  &.is-round {
    border-radius: $radius-round;
  }

  &.is-clickable {
    cursor: pointer;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* -------- 尺寸 -------- */
  &--large {
    height: 34px;
    font-size: 14px;
    padding: 0 14px;
    gap: 5px;
  }

  &--small {
    height: 22px;
    font-size: 12px;
    padding: 0 7px;
    gap: 3px;
  }

  /* ====================================================
     default 类型
  ==================================================== */
  &--default {
    &.xly-tag--light {
      color: $default-text;
      background-color: $default-bg;
      border-color: $default-border;

      &.is-clickable:hover { background-color: color.adjust($default-bg, $lightness: -4%); }
    }
    &.xly-tag--plain {
      color: $default-text;
      background-color: transparent;
      border-color: $default-border;

      &.is-clickable:hover { background-color: $default-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $default-dark-bg;
      border-color: $default-dark-bg;

      &.is-clickable:hover { background-color: color.adjust($default-dark-bg, $lightness: -8%); border-color: color.adjust($default-dark-bg, $lightness: -8%); }
    }

    .xly-tag__close { color: color.adjust($default-text, $lightness: 10%); &:hover { color: $default-text; background-color: rgba(0,0,0,0.08); } }
  }

  /* ====================================================
     primary 类型
  ==================================================== */
  &--primary {
    &.xly-tag--light {
      color: $primary;
      background-color: $primary-light-bg;
      border-color: $primary-light-border;

      &.is-clickable:hover { background-color: rgba(79, 110, 247, 0.18); }
    }
    &.xly-tag--plain {
      color: $primary;
      background-color: transparent;
      border-color: $primary;

      &.is-clickable:hover { background-color: $primary-light-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $primary;
      border-color: $primary;

      &.is-clickable:hover { background-color: color.adjust($primary, $lightness: -8%); border-color: color.adjust($primary, $lightness: -8%); }
    }

    .xly-tag__close { color: color.change($primary, $alpha: 0.7); &:hover { color: $primary; background-color: color.change($primary, $alpha: 0.12); } }
  }

  /* ====================================================
     success 类型
  ==================================================== */
  &--success {
    &.xly-tag--light {
      color: $success;
      background-color: $success-light-bg;
      border-color: $success-light-border;

      &.is-clickable:hover { background-color: rgba(52, 199, 89, 0.18); }
    }
    &.xly-tag--plain {
      color: $success;
      background-color: transparent;
      border-color: $success;

      &.is-clickable:hover { background-color: $success-light-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $success;
      border-color: $success;

      &.is-clickable:hover { background-color: color.adjust($success, $lightness: -8%); border-color: color.adjust($success, $lightness: -8%); }
    }

    .xly-tag__close { color: color.change($success, $alpha: 0.7); &:hover { color: $success; background-color: color.change($success, $alpha: 0.12); } }
  }

  /* ====================================================
     warning 类型
  ==================================================== */
  &--warning {
    &.xly-tag--light {
      color: $warning;
      background-color: $warning-light-bg;
      border-color: $warning-light-border;

      &.is-clickable:hover { background-color: rgba(245, 166, 35, 0.18); }
    }
    &.xly-tag--plain {
      color: $warning;
      background-color: transparent;
      border-color: $warning;

      &.is-clickable:hover { background-color: $warning-light-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $warning;
      border-color: $warning;

      &.is-clickable:hover { background-color: color.adjust($warning, $lightness: -8%); border-color: color.adjust($warning, $lightness: -8%); }
    }

    .xly-tag__close { color: color.change($warning, $alpha: 0.7); &:hover { color: $warning; background-color: color.change($warning, $alpha: 0.12); } }
  }

  /* ====================================================
     danger 类型
  ==================================================== */
  &--danger {
    &.xly-tag--light {
      color: $danger;
      background-color: $danger-light-bg;
      border-color: $danger-light-border;

      &.is-clickable:hover { background-color: rgba(255, 59, 48, 0.18); }
    }
    &.xly-tag--plain {
      color: $danger;
      background-color: transparent;
      border-color: $danger;

      &.is-clickable:hover { background-color: $danger-light-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $danger;
      border-color: $danger;

      &.is-clickable:hover { background-color: color.adjust($danger, $lightness: -8%); border-color: color.adjust($danger, $lightness: -8%); }
    }

    .xly-tag__close { color: color.change($danger, $alpha: 0.7); &:hover { color: $danger; background-color: color.change($danger, $alpha: 0.12); } }
  }

  /* ====================================================
     info 类型
  ==================================================== */
  &--info {
    &.xly-tag--light {
      color: $info;
      background-color: $info-light-bg;
      border-color: $info-light-border;

      &.is-clickable:hover { background-color: rgba(142, 142, 160, 0.18); }
    }
    &.xly-tag--plain {
      color: $info;
      background-color: transparent;
      border-color: $info;

      &.is-clickable:hover { background-color: $info-light-bg; }
    }
    &.xly-tag--dark {
      color: #fff;
      background-color: $info;
      border-color: $info;

      &.is-clickable:hover { background-color: color.adjust($info, $lightness: -8%); border-color: color.adjust($info, $lightness: -8%); }
    }

    .xly-tag__close { color: color.change($info, $alpha: 0.7); &:hover { color: $info; background-color: color.change($info, $alpha: 0.12); } }
  }
}

/* ========== 图标 ========== */
.xly-tag__icon {
  display: inline-flex;
  align-items: center;
  font-size: 1em;
  flex-shrink: 0;
}

/* ========== 文字 ========== */
.xly-tag__text {
  line-height: 1;
}

/* ========== 关闭按钮 ========== */
.xly-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
  transition: $transition;
  flex-shrink: 0;
  margin-left: 2px;

  .xly-tag--small & {
    width: 14px;
    height: 14px;
    font-size: 9px;
  }

  .xly-tag--large & {
    width: 18px;
    height: 18px;
    font-size: 11px;
  }
}
</style>
