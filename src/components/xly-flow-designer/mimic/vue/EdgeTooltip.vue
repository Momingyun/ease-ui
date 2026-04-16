<template>
  <div
    class="edge-tooltip"
    :style="tooltipPosition"
    @mouseenter="handleTooltipEnter"
    @mouseleave="handleTooltipLeave"
  >
    <div
      v-for="(item, index) in options"
      :key="index"
      @click="handleClick(item)"
      class="tooltip-item"
    >
      <span class="tooltip-icon" v-html="iconMap[item.icon]"></span>
      <div class="tooltip-text">
        <span class="tooltip-label">{{ item.label }}</span>
        <span class="tooltip-desc">{{ descMap[item.icon] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  position: Object,
  tooltipEdge: Object,
})

const options = [
  { icon: 'check', label: '审批节点' },
  { icon: 'serial', label: '互斥网关' },
  { icon: 'parallel', label: '并行网关' },
]

const descMap: Record<string, string> = {
  check: '串行审批，按顺序执行',
  serial: '条件分支，只走一条路径',
  parallel: '并行分支，同时执行多条路径',
}

// 企业级风格 inline SVG 图标 — 圆角方形 + 品牌色
const iconMap: Record<string, string> = {
  check: `<svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="38" rx="10" fill="#E8F5E9" stroke="#43A047" stroke-width="1.2"/>
    <circle cx="20" cy="20" r="10" fill="#43A047" opacity="0.1"/>
    <path d="M13 20L18 25L27 15" stroke="#43A047" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  serial: `<svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="38" rx="10" fill="#FFF3E0" stroke="#EF6C00" stroke-width="1.2"/>
    <circle cx="20" cy="20" r="10" fill="#EF6C00" opacity="0.1"/>
    <path d="M20 10V30M20 10L15 15M20 10L25 15M20 30L15 25M20 30L25 25" stroke="#EF6C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 20H30" stroke="#EF6C00" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
  parallel: `<svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="38" rx="10" fill="#E3F2FD" stroke="#1E88E5" stroke-width="1.2"/>
    <circle cx="20" cy="20" r="10" fill="#1E88E5" opacity="0.1"/>
    <path d="M20 10V30M20 10L15 15M20 10L25 15M20 30L15 25M20 30L25 25" stroke="#1E88E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
}

const emit = defineEmits(['option-click', 'close-tooltip'])

// 仅保留定位相关的 inline style，其余全部交给 CSS class
const tooltipPosition = computed(() => ({
  top: `${props.position.y - 80}px`,
  left: `${props.position.x}px`,
  position: 'absolute' as const,
  pointerEvents: 'auto' as const,
}))

function handleTooltipEnter() {
  window.isTooltipHovered = true
}

function handleTooltipLeave() {
  window.isTooltipHovered = false
  emit('close-tooltip')
}

const handleClick = (item: { icon: string; label: string }) => {
  const content = {
    label: item.label,
    icon: item.icon === 'check' ? 'between' : item.icon,
  }
  content['tooltipEdge'] = props.tooltipEdge
  emit('option-click', content)
}
</script>

<style scoped>
/* ====== 弹出面板容器 ====== */
.edge-tooltip {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.08),
    0 3px 6px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 1000;
  min-width: 180px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', Roboto,
    sans-serif;
  animation: tooltipFadeIn 0.18s ease-out;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ====== 菜单项 ====== */
.tooltip-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.15s ease;
  user-select: none;
}

.tooltip-item:hover {
  background: #f2f3f5;
}

.tooltip-item:active {
  background: #e8eaed;
}

/* ====== 图标 ====== */
.tooltip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 10px;
  border-radius: 8px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tooltip-item:hover .tooltip-icon {
  transform: scale(1.1);
}

/* ====== 文本区 ====== */
.tooltip-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.tooltip-label {
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
  line-height: 22px;
}

.tooltip-desc {
  font-size: 12px;
  color: #86909c;
  line-height: 18px;
}
</style>
