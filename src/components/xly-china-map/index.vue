<template>
  <div class="xly-china-map" :style="{ width: computedWidth, height: computedHeight }">
    <!-- 标题区域 -->
    <div class="xly-china-map__header">
      <div v-if="title || subtitle" class="xly-china-map__title-wrap">
        <span v-if="title" class="xly-china-map__title">{{ title }}</span>
        <span v-if="subtitle" class="xly-china-map__subtitle">{{ subtitle }}</span>
      </div>
      <!-- 切换模式 Tab（tooltip-mode="switch" 时显示） -->
      <div v-if="isMultiDataset && tooltipMode === 'switch'" class="xly-china-map__dataset-tabs">
        <button
          v-for="(ds, index) in datasets"
          :key="index"
          class="dataset-tab"
          :class="{ 'is-active': currentDatasetIndex === index }"
          @click="currentDatasetIndex = index"
        >
          {{ ds.name }}
        </button>
      </div>
      <!-- 对比模式标签（tooltip-mode="compare" 时显示） -->
      <div v-else-if="isMultiDataset && tooltipMode === 'compare'" class="xly-china-map__dataset-tags">
        <span
          v-for="(ds, index) in datasets"
          :key="index"
          class="dataset-tag"
          :style="ds.colorRange ? { background: ds.colorRange[1], borderColor: ds.colorRange[1] } : {}"
        >
          {{ ds.name }}
        </span>
      </div>
    </div>

    <!-- 地图主体 -->
    <div
      class="xly-china-map__body"
      ref="containerRef"
      :class="{ 'is-dragging': isDragging }"
      @wheel.prevent="onWheel"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <svg
        ref="svgRef"
        class="xly-china-map__svg"
        :viewBox="`0 0 ${SVG_W} ${SVG_H}`"
        xmlns="http://www.w3.org/2000/svg"
        @mouseleave="hideTooltip"
        @mousemove="onSvgMouseMove"
      >
        <!-- 阴影滤镜 -->
        <defs>
          <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.15)" />
          </filter>
          <linearGradient :id="`grad-${uid}`" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="currentColorRange[0]" />
            <stop offset="100%" :stop-color="currentColorRange[1]" />
          </linearGradient>
        </defs>

        <!-- 地图内容（带缩放变换） -->
        <g :transform="`translate(${translateX}, ${translateY}) scale(${scale})`">
          <!-- 省份路径 -->
          <g class="xly-china-map__provinces">
            <g
              v-for="province in provinces"
              :key="province.name"
              :transform="province.scale ? `translate(${province.labelX}, ${province.labelY}) scale(${province.scale}) translate(${-province.labelX}, ${-province.labelY})` : ''"
            >
              <path
                :d="province.path"
                :fill="getProvinceColor(province.name)"
                :stroke="strokeColor"
                :stroke-width="province.scale ? strokeWidth / province.scale : strokeWidth"
                class="xly-china-map__province"
                :class="{ 'is-active': activeProvince === province.name, 'is-hover': hoverProvince === province.name }"
                @mouseenter="onProvinceEnter(province, $event)"
                @mouseleave="onProvinceLeave"
                @click="onProvinceClick(province)"
              />
            </g>
          </g>

          <!-- 扩展线（用于港澳台等小区域） -->
          <g class="xly-china-map__extension-lines">
            <template v-for="province in provinces" :key="'ext-' + province.name">
              <g v-if="province.extensionLine">
                <!-- 扩展线本身 -->
                <line
                  :x1="province.extensionLine.fromX"
                  :y1="province.extensionLine.fromY"
                  :x2="province.extensionLine.toX"
                  :y2="province.extensionLine.toY"
                  class="xly-china-map__extension-line"
                />
              </g>
            </template>
          </g>

          <!-- 省份名称标签 -->
          <g v-if="showLabel" class="xly-china-map__labels">
            <text
              v-for="province in provinces"
              :key="'label-' + province.name"
              :x="province.labelX"
              :y="province.labelY"
              class="xly-china-map__label"
              :class="{ 'is-full': labelMode === 'full' }"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ labelMode === 'full' ? province.name : province.shortName }}
            </text>
          </g>

          <!-- 数据标记气泡 -->
          <g v-if="showBubble && dataMap.size" class="xly-china-map__bubbles">
            <template v-for="province in provinces" :key="'bubble-' + province.name">
              <circle
                v-if="dataMap.get(province.name)"
                :cx="province.labelX"
                :cy="province.labelY"
                :r="getBubbleRadius(province.name)"
                class="xly-china-map__bubble"
                :fill="bubbleColor"
                :fill-opacity="0.5"
                @mouseenter="onProvinceEnter(province, $event)"
                @mouseleave="onProvinceLeave"
                @click="onProvinceClick(province)"
              />
            </template>
          </g>
        </g>
      </svg>

      <!-- 图例 -->
      <div v-if="showLegend && legendItems.length" class="xly-china-map__legend">
        <div class="legend-title">{{ legendTitle }}</div>
        <div class="legend-gradient">
          <div
            class="legend-gradient__bar"
            :style="{ background: `linear-gradient(to right, ${colorRange[0]}, ${colorRange[1]})` }"
          ></div>
          <div class="legend-gradient__labels">
            <span>{{ formatValue(legendMin) }}</span>
            <span>{{ formatValue(legendMax) }}</span>
          </div>
        </div>
      </div>

      <!-- 缩放控制 -->
      <div v-if="zoomable" class="xly-china-map__zoom-controls">
        <button class="zoom-btn" @click.stop="zoomIn" title="放大">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <div class="zoom-level">{{ Math.round(scale * 100) }}%</div>
        <button class="zoom-btn" @click.stop="zoomOut" title="缩小">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button class="zoom-btn" @click.stop="resetZoom" title="重置">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-show="tooltip.visible"
        ref="tooltipRef"
        class="xly-china-map__tooltip"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <div class="tooltip-title">{{ tooltip.title }}</div>
        <!-- 多数据集展示 -->
        <template v-if="tooltip.datasets.length > 1">
          <div
            v-for="(ds, index) in tooltip.datasets"
            :key="index"
            class="tooltip-value"
          >
            <span class="tooltip-label">{{ ds.name }}</span>
            <span class="tooltip-num" :style="ds.color ? { color: ds.color } : {}">
              {{ ds.value !== null ? formatValue(ds.value) : '-' }}
            </span>
          </div>
        </template>
        <!-- 单数据集展示 -->
        <template v-else-if="tooltip.datasets.length === 1">
          <div class="tooltip-value">
            <span class="tooltip-label">{{ tooltip.datasets[0].label || valueLabel }}</span>
            <span class="tooltip-num">{{ tooltip.datasets[0].value !== null ? formatValue(tooltip.datasets[0].value) : '-' }}</span>
          </div>
        </template>
        <div v-else class="tooltip-empty">暂无数据</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PROVINCE_PATHS } from './provinces'

defineOptions({ name: 'XlyChinaMap' })

// ===================== 类型定义 =====================
export interface MapDataItem {
  name: string      // 省份名称（支持全称或缩写，内部自动匹配）
  value: number     // 数值
  label?: string    // 自定义 tooltip 标签
  extra?: string    // 额外信息
}

// 数据集（用于多组数据切换，如2023年/2024年）
export interface MapDataSet {
  name: string       // 数据集名称，如 "2023年"
  data: MapDataItem[]
  colorRange?: [string, string]  // 可选的自定义颜色
}

interface ProvinceInfo {
  name: string
  shortName: string
  path: string
  labelX: number
  labelY: number
  scale?: number
  extensionLine?: {
    fromX: number
    fromY: number
    toX: number
    toY: number
  }
}

// ===================== Props =====================
const props = withDefaults(defineProps<{
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 数据列表 - 支持两种格式：
   * 1. 简单格式: MapDataItem[] - 单组数据
   * 2. 多组格式: MapDataSet[] - 多组数据切换
   *    如: [{ name: '2023年', data: [...] }, { name: '2024年', data: [...] }]
   */
  data?: MapDataItem[] | MapDataSet[]
  /** 组件宽度 */
  width?: number | string
  /** 组件高度 */
  height?: number | string
  /** 颜色范围 [最小色, 最大色] */
  colorRange?: [string, string]
  /** 无数据时填充颜色 */
  emptyColor?: string
  /** 描边颜色 */
  strokeColor?: string
  /** 描边宽度 */
  strokeWidth?: number
  /** 是否显示省份名称 */
  showLabel?: boolean
  /** 标签模式：'short' 显示简称，'full' 显示完整名称 */
  labelMode?: 'short' | 'full'
  /** 是否显示图例 */
  showLegend?: boolean
  /** 图例标题 */
  legendTitle?: string
  /** 数值标签文字 */
  valueLabel?: string
  /** 是否显示气泡 */
  showBubble?: boolean
  /** 气泡颜色 */
  bubbleColor?: string
  /** 当前激活省份 */
  activeProvince?: string
  /** 是否可缩放 */
  zoomable?: boolean
  /** 最小缩放比例 */
  minScale?: number
  /** 最大缩放比例 */
  maxScale?: number
  /** Tooltip 模式：'compare' 同时展示所有数据，'switch' Tab 切换模式 */
  tooltipMode?: 'compare' | 'switch'
}>(), {
  data: () => [],
  width: '100%',
  height: 520,
  colorRange: () => ['#bfdbfe', '#1d4ed8'],
  emptyColor: '#e2e8f0',
  strokeColor: '#ffffff',
  strokeWidth: 0.8,
  showLabel: true,
  labelMode: 'short',
  showLegend: true,
  legendTitle: '数值',
  valueLabel: '数值',
  showBubble: false,
  bubbleColor: '#ef4444',
  zoomable: true,
  minScale: 0.5,
  maxScale: 4,
  tooltipMode: 'compare',
})

const emit = defineEmits<{
  (e: 'click', province: string, data: MapDataItem | null): void
}>()

// ===================== 常量 =====================
const SVG_W = 1000
const SVG_H = 800
const uid = Math.random().toString(36).slice(2, 8)

// 省份路径数据从 provinces.ts 导入（真实 GeoJSON 数据）

// ===================== 响应式状态 =====================
const containerRef = ref<HTMLElement>()
const svgRef = ref<SVGElement>()
const tooltipRef = ref<HTMLElement>()

// 调试用：鼠标在 SVG 上的坐标
const mouseX = ref<number | null>(null)
const mouseY = ref<number | null>(null)

const hoverProvince = ref<string>('')
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  // 多数据集支持：存储所有数据集的该省份数据
  datasets: [] as Array<{
    name: string
    value: number | null
    label?: string
    color?: string
  }>,
})

// 缩放状态
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

// 拖拽状态
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

// 多数据集状态
const currentDatasetIndex = ref(0)

// ===================== 计算属性 =====================

// 判断是否为多组数据格式
const isMultiDataset = computed(() => {
  if (!props.data || props.data.length === 0) return false
  return 'data' in props.data[0] && 'name' in props.data[0]
})

// 数据集列表（用于 Tab 切换）
const datasets = computed(() => {
  if (isMultiDataset.value) {
    return props.data as MapDataSet[]
  }
  // 单组数据也包装成数组格式
  return [{ name: '', data: props.data || [] }] as MapDataSet[]
})

// 当前选中的数据集
const currentDataset = computed(() => {
  return datasets.value[currentDatasetIndex.value]
})

// 当前数据集的颜色范围
const currentColorRange = computed(() => {
  return currentDataset.value?.colorRange || props.colorRange || ['#e0f2fe', '#0369a1']
})

// 当前数据集的数据列表
const currentDataList = computed(() => {
  return currentDataset.value?.data || []
})
const computedWidth = computed(() => {
  const w = props.width
  return typeof w === 'number' ? `${w}px` : w
})

const computedHeight = computed(() => {
  const h = props.height
  return typeof h === 'number' ? `${h}px` : h
})

// 名称映射：简称 -> 完整名称
const NAME_ALIAS: Record<string, string> = {
  '北京': '北京市', '天津': '天津市', '上海': '上海市', '重庆': '重庆市',
  '河北': '河北省', '山西': '山西省', '辽宁': '辽宁省', '吉林': '吉林省',
  '黑龙江': '黑龙江省', '江苏': '江苏省', '浙江': '浙江省', '安徽': '安徽省',
  '福建': '福建省', '江西': '江西省', '山东': '山东省', '河南': '河南省',
  '湖北': '湖北省', '湖南': '湖南省', '广东': '广东省', '海南': '海南省',
  '四川': '四川省', '贵州': '贵州省', '云南': '云南省', '陕西': '陕西省',
  '甘肃': '甘肃省', '青海': '青海省', '内蒙古': '内蒙古',
  '广西': '广西', '西藏': '西藏', '宁夏': '宁夏',
  '新疆': '新疆',
  '台湾': '台湾省', '台湾省': '台湾省',
  '香港': '香港',
  '澳门': '澳门',
}

// 构建数据 Map，支持全称/简称匹配
const dataMap = computed(() => {
  const map = new Map<string, MapDataItem>()
  for (const item of currentDataList.value) {
    const fullName = NAME_ALIAS[item.name] || item.name
    // 优先用完整名称匹配
    const province = PROVINCE_PATHS.find(p => p.name === fullName)
    if (province) {
      map.set(province.name, item)
    }
  }
  return map
})

const legendMin = computed(() => {
  if (currentDataList.value.length === 0) return 0
  return Math.min(...currentDataList.value.map(d => d.value))
})

const legendMax = computed(() => {
  if (currentDataList.value.length === 0) return 100
  return Math.max(...currentDataList.value.map(d => d.value))
})

const legendItems = computed(() => currentDataList.value)

const provinces = computed(() => PROVINCE_PATHS as unknown as ProvinceInfo[])

// ===================== 方法 =====================
function getProvinceColor(name: string): string {
  const item = dataMap.value.get(name)
  if (!item) return props.emptyColor

  const { value } = item
  const min = legendMin.value
  const max = legendMax.value
  const range = max - min

  if (range === 0) return currentColorRange.value[1]

  // 插值计算颜色
  const t = Math.max(0, Math.min(1, (value - min) / range))
  return interpolateColor(currentColorRange.value[0], currentColorRange.value[1], t)
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16)
  const g1 = parseInt(c1.slice(3, 5), 16)
  const b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16)
  const g2 = parseInt(c2.slice(3, 5), 16)
  const b2 = parseInt(c2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

const maxBubbleRadius = 28
const minBubbleRadius = 6

function getBubbleRadius(name: string): number {
  const item = dataMap.value.get(name)
  if (!item) return 0
  const min = legendMin.value
  const max = legendMax.value
  const range = max - min
  if (range === 0) return maxBubbleRadius
  const t = (item.value - min) / range
  return minBubbleRadius + (maxBubbleRadius - minBubbleRadius) * t
}

function formatValue(val: number | null): string {
  if (val === null || val === undefined) return '-'
  if (val >= 100000000) return (val / 100000000).toFixed(1) + '亿'
  if (val >= 10000) return (val / 10000).toFixed(1) + '万'
  return val.toLocaleString()
}

function onProvinceEnter(province: ProvinceInfo, event: MouseEvent) {
  hoverProvince.value = province.name

  // 对比模式：收集所有数据集的该省份数据
  if (props.tooltipMode === 'compare') {
    const datasetsData = datasets.value.map((ds) => {
      const item = findProvinceData(ds.data, province.name)
      return {
        name: ds.name || props.valueLabel || '数值',
        value: item ? item.value : null,
        label: item?.label,
        color: ds.colorRange ? ds.colorRange[1] : undefined,
      }
    })
    tooltip.value = {
      visible: true,
      x: event.clientX + 12,
      y: event.clientY - 8,
      title: province.name,
      datasets: datasetsData,
    }
  } else {
    // 切换模式：只显示当前选中数据集的数据
    const item = findProvinceData(currentDataList.value, province.name)
    tooltip.value = {
      visible: true,
      x: event.clientX + 12,
      y: event.clientY - 8,
      title: province.name,
      datasets: [{
        name: props.valueLabel,
        value: item ? item.value : null,
        label: item?.label,
      }],
    }
  }
}

// 辅助函数：根据省份名称查找数据
function findProvinceData(dataList: MapDataItem[], provinceName: string): MapDataItem | undefined {
  return dataList.find(d => {
    const fullName = NAME_ALIAS[d.name] || d.name
    const provinceMatch = PROVINCE_PATHS.find(p => p.name === fullName)
    return provinceMatch && provinceMatch.name === provinceName
  })
}

function onProvinceLeave() {
  hoverProvince.value = ''
  tooltip.value.visible = false
}

function hideTooltip() {
  tooltip.value.visible = false
  hoverProvince.value = ''
  mouseX.value = null
  mouseY.value = null
}

// 调试用：追踪鼠标在 SVG 上的坐标
function onSvgMouseMove(e: MouseEvent) {
  if (!svgRef.value) return
  const rect = svgRef.value.getBoundingClientRect()
  const svgScaleX = 1000 / rect.width
  const svgScaleY = 800 / rect.height
  mouseX.value = (e.clientX - rect.left) * svgScaleX
  mouseY.value = (e.clientY - rect.top) * svgScaleY
}

function onProvinceClick(province: ProvinceInfo) {
  const item = dataMap.value.get(province.name) || null
  emit('click', province.name, item)
}

// ===================== 缩放/平移方法 =====================
function onWheel(e: WheelEvent) {
  if (!props.zoomable) return

  const oldScale = scale.value
  const delta = e.deltaY > 0 ? -0.15 : 0.15
  const newScale = Math.max(props.minScale, Math.min(props.maxScale, oldScale + delta))

  if (newScale === oldScale) return

  const svgRect = svgRef.value?.getBoundingClientRect()
  const containerRect = containerRef.value?.getBoundingClientRect()
  if (svgRect && containerRect) {
    // 鼠标相对于 SVG 的位置
    const mouseX = e.clientX - svgRect.left
    const mouseY = e.clientY - svgRect.top

    // SVG 会自动缩放 viewBox 以适应容器
    // svgScale = SVG 实际尺寸 / viewBox 尺寸
    const svgScale = svgRect.width / 1000

    translateX.value = translateX.value + mouseX / svgScale * (1 / newScale - 1 / oldScale)
    translateY.value = translateY.value + mouseY / svgScale * (1 / newScale - 1 / oldScale)
  }

  scale.value = newScale
}

function onMouseDown(e: MouseEvent) {
  if (!props.zoomable || e.button !== 0) return
  isDragging.value = true
  dragStart.value = { x: e.clientX - translateX.value, y: e.clientY - translateY.value }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  translateX.value = e.clientX - dragStart.value.x
  translateY.value = e.clientY - dragStart.value.y
}

function onMouseUp() {
  isDragging.value = false
}

function zoomIn() {
  if (!props.zoomable) return
  scale.value = Math.min(props.maxScale, scale.value + 0.2)
}

function zoomOut() {
  if (!props.zoomable) return
  scale.value = Math.max(props.minScale, scale.value - 0.2)
}

function resetZoom() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

// 鼠标移动时更新 tooltip 位置
onMounted(() => {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (tooltip.value.visible) {
      tooltip.value.x = e.clientX + 12
      tooltip.value.y = e.clientY - 8
    }
  })
})
</script>

<style scoped lang="scss">
.xly-china-map {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: inherit;
  user-select: none;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0 4px;
  }

  &__title-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.4;
  }

  &__subtitle {
    font-size: 12px;
    color: #8e8ea0;
    line-height: 1.4;
  }

  // 数据集标签（纯展示）
  &__dataset-tags {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    position: relative;
    overflow: hidden;
    cursor: grab;

    &.is-dragging {
      cursor: grabbing;
    }
  }

  &__svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__province {
    cursor: pointer;
    transition: filter 0.2s ease, opacity 0.2s ease;

    &.is-hover {
      filter: brightness(0.88);
    }

    &.is-active {
      filter: brightness(0.82) drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
    }
  }

  &__label {
    font-size: 10px;
    fill: #374151;
    pointer-events: none;
    font-weight: 500;

    &.is-full {
      font-size: 8px;
    }
  }

  // 扩展线样式（用于港澳台等小区域）
  &__extension-line {
    stroke: #9ca3af;
    stroke-width: 1;
    stroke-dasharray: 3 2;
    pointer-events: none;
  }

  &__bubble {
    cursor: pointer;
    transition: r 0.3s ease;
    stroke: #fff;
    stroke-width: 1.5;
  }

  // 图例
  &__legend {
    position: absolute;
    right: 12px;
    bottom: 12px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 10px 14px;
    min-width: 140px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .legend-title {
      font-size: 11px;
      color: #8e8ea0;
      margin-bottom: 7px;
      font-weight: 500;
    }

    .legend-gradient {
      &__bar {
        height: 8px;
        border-radius: 4px;
        margin-bottom: 4px;
      }

      &__labels {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #6b7280;
      }
    }
  }

  // 缩放控件
  &__zoom-controls {
    position: absolute;
    left: 12px;
    bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .zoom-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: #4b5563;
      transition: all 0.15s ease;

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background: #f3f4f6;
        color: #1d4ed8;
      }

      &:active {
        background: #e5e7eb;
        transform: scale(0.95);
      }
    }

    .zoom-level {
      font-size: 11px;
      color: #6b7280;
      font-weight: 500;
      padding: 2px 0;
      min-width: 40px;
      text-align: center;
    }
  }
}

// Tooltip（非 scoped，Teleport 到 body）
</style>

<style lang="scss">
.xly-china-map__tooltip {
  position: fixed;
  z-index: 9999;
  background: rgba(30, 32, 50, 0.92);
  color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(4px);
  transition: opacity 0.15s;

  .tooltip-title {
    font-weight: 600;
    margin-bottom: 4px;
    font-size: 13px;
  }

  .tooltip-value {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    .tooltip-label {
      color: rgba(255, 255, 255, 0.7);
    }

    .tooltip-num {
      font-weight: 700;
      font-size: 14px;
      color: #60a5fa;
    }
  }

  .tooltip-empty {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
}

// 数据集标签样式
.dataset-tag {
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  background: #3b82f6;
  border: 1px solid #3b82f6;
  border-radius: 4px;
}

// 数据集切换 Tab 样式
.dataset-tab {
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }

  &:not(:first-child) {
    margin-left: -1px;
  }

  &:hover {
    color: #374151;
    background: #f9fafb;
  }

  &.is-active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
    position: relative;
    z-index: 1;
  }
}
</style>
