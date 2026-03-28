<template>
  <span class="xly-badge">
    <span v-if="shouldShow" class="badge-mark" :class="[position, { circle }]">
      <span class="badge-text" :style="textStyle">{{ finalValue }}</span>
    </span>
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: [Number, String],
  max: { type: Number, default: 99 },
  overflowText: { type: String, default: '+' },
  type: { type: String, default: 'danger' },
  position: { type: String, default: 'top-right' },
  showZero: Boolean,
  color: String,
  circle: Boolean
})

const shouldShow = computed(() => {
  const v = props.value
  if (v === undefined || v === null) return false
  if (!props.showZero && (v === 0 || v === '0')) return false
  if (v === '') return false
  return true
})

const finalValue = computed(() => {
  const num = Number(props.value)
  if (!Number.isNaN(num)) {
    if (num > props.max) return props.max + props.overflowText
    return num
  }
  return props.value
})

// 颜色映射
const colorMap = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399'
}

const badgeColor = computed(() => props.color || colorMap[props.type] || colorMap.danger)

const textStyle = computed(() => ({
  backgroundColor: badgeColor.value
}))
</script>

<style>
.xly-badge {
  display: inline-flex;
  position: relative;
  vertical-align: middle;
}

.xly-badge .badge-mark {
  position: absolute;
  z-index: 100;
}

.xly-badge .badge-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
  white-space: nowrap;
}

/* 位置 */
.xly-badge .top-right { top: 0; right: 0; transform: translate(50%, -50%); }
.xly-badge .top-left { top: 0; left: 0; transform: translate(-50%, -50%); }
.xly-badge .bottom-right { bottom: 0; right: 0; transform: translate(50%, 50%); }
.xly-badge .bottom-left { bottom: 0; left: 0; transform: translate(-50%, 50%); }

/* 圆形 */
.xly-badge .badge-mark.circle .badge-text {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 50% !important;
}
</style>
