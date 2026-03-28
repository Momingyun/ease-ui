<template>
  <div
    class="xly-statistic"
    :class="[
      `xly-statistic--${size}`,
      `xly-statistic--${variant}`,
      { 'xly-statistic--bordered': bordered },
      { 'xly-statistic--hoverable': hoverable },
    ]"
  >
    <!-- 标题区域 -->
    <div v-if="title || $slots.title || icon" class="xly-statistic-header">
      <div v-if="icon" class="xly-statistic-icon">
        <xly-icon :name="icon" />
      </div>
      <div class="xly-statistic-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>

    <!-- 数值区域 -->
    <div class="xly-statistic-value">
      <!-- 前缀 -->
      <div v-if="prefix || $slots.prefix" class="xly-statistic-prefix">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>

      <!-- 主数值 -->
      <div
        ref="valueRef"
        class="xly-statistic-number"
        :class="{ 'xly-statistic-number--animated': animated }"
      >
        {{ formattedValue }}
      </div>

      <!-- 后缀 -->
      <div v-if="suffix || $slots.suffix" class="xly-statistic-suffix">
        <slot name="suffix">
          {{ suffix }}
        </slot>
      </div>
    </div>

    <!-- 趋势 -->
    <div v-if="trend" class="xly-statistic-trend">
      <div class="xly-statistic-trend-icon" :class="`xly-statistic-trend--${trend}`">
        <xly-icon :name="trend === 'up' ? 'el:Top' : 'el:Bottom'" />
      </div>
      <div class="xly-statistic-trend-text">
        <slot name="trendLabel">
          {{ trendLabel }}
        </slot>
      </div>
    </div>

    <!-- 说明 -->
    <div v-if="extra || $slots.extra" class="xly-statistic-extra">
      <slot name="extra">
        {{ extra }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import XlyIcon from '../xly-icon/index.vue'

defineOptions({ name: 'XlyStatistic' })

// 千分位格式化
const formatNumber = (num: number, precision: number = 0): string => {
  if (isNaN(num)) return '0'

  const factor = Math.pow(10, precision)
  const rounded = Math.round(num * factor) / factor
  const [integerPart, decimalPart] = rounded.toString().split('.')

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (decimalPart) {
    const paddedDecimal = decimalPart.padEnd(precision, '0')
    return `${formattedInteger}.${paddedDecimal}`
  }

  return formattedInteger
}

interface Props {
  // 基础
  title?: string
  value: number | string
  precision?: number

  // 前后缀
  prefix?: string
  suffix?: string

  // 样式
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'| 'info'
  size?: 'sm' | 'md' | 'lg'

  // 趋势
  trend?: 'up' | 'down'
  trendLabel?: string

  // 图标
  icon?: string

  // 说明
  extra?: string

  // 选项
  bordered?: boolean
  hoverable?: boolean
  animated?: boolean
  animationDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  precision: 0,
  variant: 'default',
  size: 'md',
  bordered: false,
  hoverable: false,
  animated: false,
  animationDuration: 1000,
})

const emit = defineEmits<{
  animationComplete: []
}>()

const valueRef = ref<HTMLElement>()
const animatedValue = ref(0)

// 格式化数值
const formattedValue = computed(() => {
  if (typeof props.value === 'string') {
    return props.value
  }

  if (props.animated) {
    return formatNumber(animatedValue.value, props.precision)
  }

  return formatNumber(props.value, props.precision)
})

// 数值增长动画
onMounted(() => {
  if (props.animated && typeof props.value === 'number') {
    const startTime = Date.now()
    const startValue = 0
    const endValue = props.value

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / props.animationDuration!, 1)

      // 缓动函数
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      animatedValue.value = startValue + (endValue - startValue) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        emit('animationComplete')
      }
    }

    requestAnimationFrame(animate)
  }
})

// 监听数值变化
watch(
  () => props.value,
  (newVal) => {
    if (props.animated && typeof newVal === 'number') {
      animatedValue.value = 0
      onMounted()
    }
  },
)
</script>

<style scoped lang="scss">
.xly-statistic {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  transition: all 0.2s ease;

  // 边框模式
  &--bordered {
    border: 1px solid #e5e7eb;
  }

  // 悬浮效果
  &--hoverable:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  // 尺寸
  &--sm {
    padding: 16px;
    gap: 8px;
    border-radius: 12px;

    .xly-statistic-number {
      font-size: 28px;
    }

    .xly-statistic-title {
      font-size: 12px;
    }

    .xly-statistic-icon {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
  }

  &--md {
    .xly-statistic-number {
      font-size: 36px;
    }

    .xly-statistic-title {
      font-size: 14px;
    }

    .xly-statistic-icon {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }
  }

  &--lg {
    padding: 28px;
    gap: 16px;
    border-radius: 20px;

    .xly-statistic-number {
      font-size: 48px;
    }

    .xly-statistic-title {
      font-size: 16px;
    }

    .xly-statistic-icon {
      width: 44px;
      height: 44px;
      font-size: 20px;
    }
  }

  // 变体颜色
  &--default {
    .xly-statistic-number {
      color: #111827;
    }

    .xly-statistic-icon {
      background: #f3f4f6;
      color: #6b7280;
    }
  }

  &--primary {
    .xly-statistic-number {
      color: #3b82f6;
    }

    .xly-statistic-icon {
      background: #eff6ff;
      color: #3b82f6;
    }
  }

  &--success {
    .xly-statistic-number {
      color: #10b981;
    }

    .xly-statistic-icon {
      background: #ecfdf5;
      color: #10b981;
    }
  }

  &--warning {
    .xly-statistic-number {
      color: #f59e0b;
    }

    .xly-statistic-icon {
      background: #fffbeb;
      color: #f59e0b;
    }
  }

  &--danger {
    .xly-statistic-number {
      color: #ef4444;
    }

    .xly-statistic-icon {
      background: #fef2f2;
      color: #ef4444;
    }
  }
}

// 标题区域
.xly-statistic-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.xly-statistic-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: transform 0.2s ease;

  .xly-statistic--hoverable:hover & {
    transform: scale(1.05);
  }
}

.xly-statistic-title {
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 0.01em;
}

// 数值区域
.xly-statistic-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 4px;
}

.xly-statistic-number {
  font-weight: 700;
  line-height: 1;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease;

  &--animated {
    animation: number-pulse 1.5s ease-in-out infinite;
  }
}

.xly-statistic-prefix,
.xly-statistic-suffix {
  color: #9ca3af;
  font-size: 0.75em;
  font-weight: 500;
}

// 趋势
.xly-statistic-trend {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  width: fit-content;
  margin-top: 4px;

  &--up {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;

    .xly-statistic-trend-icon {
      color: #10b981;
    }
  }

  &--down {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;

    .xly-statistic-trend-icon {
      color: #ef4444;
    }
  }

  &-icon {
    font-size: 14px;
  }

  &-text {
    font-weight: 600;
  }
}

// 说明
.xly-statistic-extra {
  margin-top: 8px;
  color: #9ca3af;
  font-size: 13px;
  line-height: 1.5;
}

// 动画
@keyframes number-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

// 响应式
@media (max-width: 768px) {
  .xly-statistic--lg .xly-statistic-number {
    font-size: 40px;
  }

  .xly-statistic {
    padding: 20px;
  }
}
</style>
