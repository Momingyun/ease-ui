<template>
  <div
    class="xly-chart"
    :class="{ [`legend-${legendPosition}`]: legendPosition === 'left' || legendPosition === 'right' }"
    :style="{ width: computedWidth, height: computedHeight }"
    ref="rootRef"
  >
    <!-- 标题 + 下载按钮 -->
    <div class="xly-chart__header" :class="{ 'has-content': title || subtitle }">
      <div class="xly-chart__header-left">
        <div v-if="title" class="xly-chart__title">{{ title }}</div>
        <div v-if="subtitle" class="xly-chart__subtitle">{{ subtitle }}</div>
      </div>
      <!-- 下载按钮 -->
      <div v-if="showDownload" class="xly-chart__download" ref="downloadRef">
        <button class="xly-chart__download-btn" title="下载图表" @click.stop="toggleDownloadMenu">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        <!-- 下载菜单 -->
        <div v-if="downloadMenuVisible" class="xly-chart__download-menu">
          <div class="xly-chart__download-item" @click="downloadAs('png')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            下载 PNG
          </div>
          <div class="xly-chart__download-item" @click="downloadAs('svg')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            下载 SVG
          </div>
        </div>
      </div>
    </div>

    <!-- 图例 -->
    <div v-if="showLegend && legendItems.length > 0" class="xly-chart__legend" :class="`xly-chart__legend--${legendPosition}`">
      <div
        v-for="item in legendItems"
        :key="item.name"
        class="xly-chart__legend-item"
        :class="{ 'is-hidden': hiddenSeries.has(item.name) }"
        @click="toggleSeries(item.name)"
      >
        <span
          class="xly-chart__legend-dot"
          :style="{
            background: item.color,
            borderRadius: type === 'line' ? '50%' : '2px'
          }"
        ></span>
        <span class="xly-chart__legend-label">{{ item.name }}</span>
      </div>
    </div>

    <!-- SVG 绘图区 -->
    <div
      class="xly-chart__body"
      ref="bodyRef"
      :class="{ 'is-scrollable': scrollable, 'is-dragging': isDragging }"
      @wheel.prevent="onWheel"
    >
      <svg
        v-if="svgWidth > 0"
        :width="svgWidth"
        :height="svgHeight"
        class="xly-chart__svg"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @mousedown="onDragStart"
      >
        <!-- ClipPath：水平裁剪数据区（左右不超出绘图区），垂直方向留足空间让 X 轴标签正常显示 -->
        <defs>
          <clipPath :id="clipPathId">
            <rect
              :x="padding.left"
              :y="padding.top - 8"
              :width="plotWidth"
              :height="svgHeight - padding.top + 8"
            />
          </clipPath>
        </defs>

        <!-- 折线图 / 柱状图 -->
        <template v-if="type === 'line' || type === 'bar'">
          <!-- 背景网格 -->
          <g v-if="showGrid" class="xly-chart__grid">
            <line
              v-for="(tick, i) in yTicks"
              :key="`hy-${i}`"
              :x1="padding.left"
              :y1="getY(tick)"
              :x2="svgWidth - padding.right"
              :y2="getY(tick)"
              class="xly-chart__grid-line"
            />
          </g>

          <!-- Y轴 -->
          <g class="xly-chart__axis-y">
            <line
              :x1="padding.left"
              :y1="padding.top"
              :x2="padding.left"
              :y2="svgHeight - padding.bottom"
              class="xly-chart__axis-line"
            />
            <g v-for="(tick, i) in yTicks" :key="`yt-${i}`">
              <text
                :x="padding.left - 8"
                :y="getY(tick)"
                class="xly-chart__axis-text"
                text-anchor="end"
                dominant-baseline="middle"
              >{{ formatValue(tick) }}</text>
            </g>
          </g>

          <!-- X轴 -->
          <g class="xly-chart__axis-x">
            <line
              :x1="padding.left"
              :y1="svgHeight - padding.bottom"
              :x2="svgWidth - padding.right"
              :y2="svgHeight - padding.bottom"
              class="xly-chart__axis-line"
            />
            <!-- X轴标签随 scroll 偏移，并裁剪 -->
            <g :clip-path="`url(#${clipPathId})`">
              <g v-for="(label, i) in xLabels" :key="`xl-${i}`">
                <text
                  :x="getXCenter(i)"
                  :y="svgHeight - padding.bottom + 18"
                  class="xly-chart__axis-text"
                  text-anchor="middle"
                >{{ label }}</text>
              </g>
            </g>
          </g>

          <!-- 折线图数据（clip 裁剪） -->
          <template v-if="type === 'line'">
            <g :clip-path="`url(#${clipPathId})`">
              <g v-for="(serie, si) in visibleSeries" :key="`ls-${si}`">
                <!-- 面积填充 -->
                <path
                  v-if="serie.areaFill !== false && areaFill"
                  :d="getAreaPath(serie.data)"
                  :fill="serie.color || defaultColors[si % defaultColors.length]"
                  opacity="0.12"
                />
                <!-- 折线 -->
                <path
                  :d="getLinePath(serie.data)"
                  :stroke="serie.color || defaultColors[si % defaultColors.length]"
                  stroke-width="2.5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="xly-chart__line"
                />
                <!-- 数据点 -->
                <circle
                  v-for="(val, i) in serie.data"
                  :key="`lp-${i}`"
                  :cx="getXCenter(i)"
                  :cy="getY(val)"
                  :r="activeIndex === i ? 6 : 4"
                  :fill="activeIndex === i ? serie.color || defaultColors[si % defaultColors.length] : '#fff'"
                  :stroke="serie.color || defaultColors[si % defaultColors.length]"
                  stroke-width="2.5"
                  class="xly-chart__point"
                  @click="onBarLineClick(i)"
                />
                <!-- 数据标签 -->
                <text
                  v-if="showLabel"
                  v-for="(val, i) in serie.data"
                  :key="`ll-${i}`"
                  :x="getXCenter(i)"
                  :y="getY(val) - 10"
                  text-anchor="middle"
                  dominant-baseline="auto"
                  class="xly-chart__data-label"
                  :fill="serie.color || defaultColors[si % defaultColors.length]"
                >{{ formatValue(val) }}</text>
              </g>
            </g>
          </template>

          <!-- 柱状图数据（clip 裁剪） -->
          <template v-if="type === 'bar'">
            <g :clip-path="`url(#${clipPathId})`">
              <g v-for="(serie, si) in visibleSeries" :key="`bs-${si}`">
                <rect
                  v-for="(val, i) in serie.data"
                  :key="`br-${i}`"
                  :x="getBarX(i, si)"
                  :y="getY(val)"
                  :width="barWidth"
                  :height="svgHeight - padding.bottom - getY(val)"
                  :fill="serie.color || defaultColors[si % defaultColors.length]"
                  :rx="barRadius"
                  :ry="barRadius"
                  :opacity="activeIndex !== -1 && activeIndex !== i ? 0.55 : 1"
                  class="xly-chart__bar"
                  @click="onBarLineClick(i)"
                />
                <!-- 数据标签 -->
                <text
                  v-if="showLabel"
                  v-for="(val, i) in serie.data"
                  :key="`bl-${i}`"
                  :x="getBarX(i, si) + barWidth / 2"
                  :y="getY(val) - 5"
                  text-anchor="middle"
                  dominant-baseline="auto"
                  class="xly-chart__data-label"
                  :fill="serie.color || defaultColors[si % defaultColors.length]"
                >{{ formatValue(val) }}</text>
              </g>
            </g>
          </template>

          <!-- Tooltip 触发竖线 -->
          <line
            v-if="activeIndex >= 0 && getXCenter(activeIndex) >= padding.left && getXCenter(activeIndex) <= svgWidth - padding.right"
            :x1="getXCenter(activeIndex)"
            :y1="padding.top"
            :x2="getXCenter(activeIndex)"
            :y2="svgHeight - padding.bottom"
            class="xly-chart__tooltip-line"
          />

          <!-- 滚动条 -->
          <g v-if="scrollable" class="xly-chart__scrollbar">
            <!-- 轨道 -->
            <rect
              :x="padding.left"
              :y="svgHeight - 6"
              :width="plotWidth"
              height="4"
              rx="2"
              class="xly-chart__scrollbar-track"
            />
            <!-- 滑块 -->
            <rect
              :x="scrollbarThumbLeft"
              :y="svgHeight - 7"
              :width="scrollbarThumbW"
              height="6"
              rx="3"
              class="xly-chart__scrollbar-thumb"
              @mousedown.stop="onScrollbarDragStart"
            />
          </g>
        </template>

        <!-- 饼图 / 环形图 -->
        <template v-if="type === 'pie' || type === 'donut'">
          <g :transform="`translate(${pieCenter.x}, ${pieCenter.y})`">
            <path
              v-for="(slice, i) in pieSlices"
              :key="`ps-${i}`"
              :d="slice.path"
              :fill="slice.color"
              :opacity="activePieIndex !== -1 && activePieIndex !== i ? 0.6 : 1"
              :transform="activePieIndex === i ? `translate(${slice.offsetX * 8}, ${slice.offsetY * 8})` : ''"
              class="xly-chart__pie-slice"
              @mouseenter="onPieEnter(i, $event)"
              @mouseleave="onPieLeave"
              @click="onPieClick(i)"
            />
            <!-- 饼图/环形图数据标签：显示百分比，切片 >5% 才显示避免拥挤 -->
            <template v-if="showLabel">
              <text
                v-for="(slice, i) in pieSlices"
                :key="`pl-${i}`"
                v-show="slice.percent >= 5"
                :x="slice.labelX"
                :y="slice.labelY"
                text-anchor="middle"
                dominant-baseline="middle"
                class="xly-chart__pie-label"
              >{{ slice.percent }}%</text>
            </template>
            <!-- 环形图中心 -->
            <template v-if="type === 'donut'">
              <circle :r="donutInnerRadius" fill="white" />
              <text
                v-if="donutLabel"
                text-anchor="middle"
                dominant-baseline="middle"
                class="xly-chart__donut-label"
              >{{ donutLabel }}</text>
              <text
                v-if="donutValue"
                text-anchor="middle"
                dominant-baseline="middle"
                y="18"
                class="xly-chart__donut-value"
              >{{ donutValue }}</text>
            </template>
          </g>
        </template>

        <!-- 漏斗图 -->
        <template v-if="type === 'funnel'">
          <g>
            <path
              v-for="(item, i) in funnelItems"
              :key="`fi-${i}`"
              :d="item.path"
              :fill="item.color"
              :opacity="activeFunnelIndex !== -1 && activeFunnelIndex !== i ? 0.55 : 1"
              class="xly-chart__funnel-item"
              @mouseenter="onFunnelEnter(i, $event)"
              @mouseleave="onFunnelLeave"
              @click="onFunnelClick(i)"
            />
            <!-- 层标签：名称 + 数值 -->
            <g v-for="(item, i) in funnelItems" :key="`fl-${i}`">
              <text
                :x="item.labelX"
                :y="item.labelY - 8"
                text-anchor="middle"
                dominant-baseline="middle"
                class="xly-chart__funnel-label"
              >{{ item.name }}</text>
              <text
                :x="item.labelX"
                :y="item.labelY + 10"
                text-anchor="middle"
                dominant-baseline="middle"
                class="xly-chart__funnel-value"
              >{{ formatValue(item.value) }} ({{ item.percent }}%)</text>
            </g>
          </g>
        </template>

        <!-- 横向柱状图（hbar） -->
        <template v-if="type === 'hbar'">
          <!-- 背景网格（垂直线） -->
          <g v-if="showGrid">
            <line
              v-for="(tick, i) in hbarXTicks"
              :key="`hg-${i}`"
              :x1="getHBarTickX(tick)"
              :y1="padding.top"
              :x2="getHBarTickX(tick)"
              :y2="svgHeight - padding.bottom"
              class="xly-chart__grid-line"
            />
          </g>
          <!-- X轴底部刻度数值 -->
          <g>
            <line
              :x1="padding.left"
              :y1="svgHeight - padding.bottom"
              :x2="svgWidth - padding.right"
              :y2="svgHeight - padding.bottom"
              class="xly-chart__axis-line"
            />
            <text
              v-for="(tick, i) in hbarXTicks"
              :key="`hxt-${i}`"
              :x="getHBarTickX(tick)"
              :y="svgHeight - padding.bottom + 14"
              class="xly-chart__axis-text"
              text-anchor="middle"
            >{{ formatValue(tick) }}</text>
          </g>
          <!-- Y轴左侧行标签 -->
          <g>
            <line
              :x1="padding.left"
              :y1="padding.top"
              :x2="padding.left"
              :y2="svgHeight - padding.bottom"
              class="xly-chart__axis-line"
            />
            <text
              v-for="(label, di) in (labels ?? [])"
              :key="`hyl-${di}`"
              :x="padding.left - 8"
              :y="padding.top + hbarRowH * di + hbarRowH / 2"
              class="xly-chart__axis-text"
              text-anchor="end"
              dominant-baseline="middle"
            >{{ label }}</text>
          </g>
          <!-- 柱条 -->
          <g v-for="item in hbarItems" :key="`hb-${item.serieIdx}-${item.dataIdx}`">
            <rect
              :x="item.barX"
              :y="item.barY"
              :width="item.barW"
              :height="item.barH"
              :fill="item.color"
              :rx="barRadius"
              :ry="barRadius"
              :opacity="activeHBarIndex !== -1 && activeHBarIndex !== item.dataIdx ? 0.55 : 1"
              class="xly-chart__bar"
              @click="onHBarClick(item)"
            />
            <!-- 数值标签 -->
            <text
              v-if="item.barW > 20"
              :x="item.valX"
              :y="item.barY + item.barH / 2"
              class="xly-chart__hbar-val"
              dominant-baseline="middle"
            >{{ formatValue(item.value) }}</text>
          </g>
          <!-- hover 高亮行 -->
          <rect
            v-if="activeHBarIndex >= 0"
            :x="padding.left"
            :y="padding.top + hbarRowH * activeHBarIndex"
            :width="plotWidth"
            :height="hbarRowH"
            class="xly-chart__hbar-hover"
          />
        </template>

        <!-- 仪表盘（gauge） -->
        <template v-if="type === 'gauge'">
          <!-- 轨道底色（灰色背景弧，最底层） -->
          <path
            :d="gaugeTrackPath"
            stroke="#f1f1f4"
            :stroke-width="gaugeTrackW"
            fill="none"
            stroke-linecap="round"
          />
          <!-- 轨道分段弧（颜色区段） -->
          <path
            v-for="(arc, i) in gaugeArcs"
            :key="`ga-${i}`"
            :d="arc.path"
            :stroke="arc.color"
            :stroke-width="gaugeTrackW"
            fill="none"
            stroke-linecap="butt"
            opacity="0.3"
          />
          <!-- 进度弧（高亮当前值） -->
          <path
            v-if="gaugeProgressPath"
            :d="gaugeProgressPath"
            :stroke="gaugeArcs.length ? gaugeArcs[Math.min(Math.floor(gaugeRatio * gaugeArcs.length), gaugeArcs.length - 1)].color : defaultColors[0]"
            :stroke-width="gaugeTrackW"
            fill="none"
            stroke-linecap="round"
            class="xly-chart__gauge-progress"
          />
          <!-- 刻度文字（靠近轨道外圈，不画线） -->
          <text
            v-for="(tick, i) in gaugeTicks"
            :key="`gtick-${i}`"
            :x="tick.lx" :y="tick.ly"
            class="xly-chart__axis-text"
            text-anchor="middle"
            dominant-baseline="middle"
          >{{ tick.label }}</text>
          <!-- 指针 -->
          <path
            :d="gaugeNeedle.path"
            fill="#374151"
            opacity="0.88"
            class="xly-chart__gauge-needle"
          />
          <circle :cx="gaugeNeedle.cx" :cy="gaugeNeedle.cy" r="7" fill="#374151" />
          <circle :cx="gaugeNeedle.cx" :cy="gaugeNeedle.cy" r="3" fill="#fff" />
          <!-- 中心数值 -->
          <text
            :x="gaugeCx"
            :y="gaugeCy + gaugeR * 0.36"
            text-anchor="middle"
            class="xly-chart__gauge-val"
          >{{ formatValue(gaugeValue) }}{{ gaugeUnit }}</text>
        </template>
      </svg>

      <!-- 空状态 -->
      <div v-if="isEmpty" class="xly-chart__empty">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="28" width="8" height="16" rx="2" fill="#e4e4e7"/>
          <rect x="20" y="18" width="8" height="26" rx="2" fill="#e4e4e7"/>
          <rect x="36" y="10" width="8" height="34" rx="2" fill="#e4e4e7"/>
        </svg>
        <p>暂无数据</p>
      </div>
    </div>

    <!-- Tooltip：挂在根容器上，避免被 body 的 overflow:hidden 裁剪 -->
    <div
      v-if="tooltip.visible"
      class="xly-chart__tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <div class="xly-chart__tooltip-title">{{ tooltip.title }}</div>
      <div
        v-for="item in tooltip.items"
        :key="item.name"
        class="xly-chart__tooltip-item"
      >
        <span class="xly-chart__tooltip-dot" :style="{ background: item.color }"></span>
        <span class="xly-chart__tooltip-name">{{ item.name }}</span>
        <span class="xly-chart__tooltip-val">{{ formatValue(item.value) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick, watch, getCurrentInstance } from 'vue'

// ========== 类型定义 ==========
export interface ChartSerie {
  name: string
  data: number[]
  color?: string
  areaFill?: boolean
  /** 任意额外字段，不参与绘制，仅透传到 drill 事件的 extra 中 */
  [key: string]: any
}

export interface PieItem {
  name: string
  value: number
  color?: string
  /** 任意额外字段，不参与绘制，仅透传到 drill 事件的 extra 中 */
  [key: string]: any
}

type ChartType = 'line' | 'bar' | 'hbar' | 'pie' | 'donut' | 'funnel' | 'gauge'

const props = withDefaults(defineProps<{
  /** 图表类型 */
  type?: ChartType
  /** 图表标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 宽度 */
  width?: number | string
  /** 高度 */
  height?: number | string
  /** 折线/柱状图的 X 轴标签 */
  labels?: string[]
  /** 折线/柱状图的数据系列 */
  series?: ChartSerie[]
  /** 饼图/环形图/漏斗图/仪表盘的数据 */
  data?: PieItem[]
  /** 是否显示网格 */
  showGrid?: boolean
  /** 是否显示图例 */
  showLegend?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 折线图面积填充 */
  areaFill?: boolean
  /** 自定义颜色 */
  colors?: string[]
  /** 柱图圆角 */
  barRadius?: number
  /** 环形图中心文字 */
  donutLabel?: string
  /** 环形图中心数值 */
  donutValue?: string
  /** Y轴格式化函数 */
  formatter?: (val: number) => string
  /** 是否动画 */
  animated?: boolean
  /** 是否在图形上显示数据标签 */
  showLabel?: boolean
  /** 是否显示下载按钮 */
  showDownload?: boolean
  /** 每个数据点最小宽度（px），超出时启用横向拖拽，0=自动 */
  minItemWidth?: number
  /** 仪表盘：当前值 */
  gaugeValue?: number
  /** 仪表盘：最小值 */
  gaugeMin?: number
  /** 仪表盘：最大值 */
  gaugeMax?: number
  /** 仪表盘：单位 */
  gaugeUnit?: string
}>(), {
  type: 'line',
  title: '',
  subtitle: '',
  width: '100%',
  height: 300,
  labels: () => [],
  series: () => [],
  data: () => [],
  showGrid: true,
  showLegend: true,
  showLabel: false,
  legendPosition: 'bottom',
  areaFill: true,
  barRadius: 4,
  animated: true,
  showDownload: true,
  minItemWidth: 0,
  gaugeValue: 0,
  gaugeMin: 0,
  gaugeMax: 100,
  gaugeUnit: '',
})

const emit = defineEmits<{
  /** 下钻事件：点击图表元素时触发 */
  drill: [payload: { type: ChartType; label: string; value: number; seriesName?: string; index: number; extra?: Record<string, any> }]
}>()

defineOptions({ name: 'XlyChart' })

// ========== 唯一实例 id（解决多图表 clipPath id 冲突）==========
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const clipPathId = `xly-plot-clip-${uid}`

// ========== 响应式状态 ==========
const rootRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)
const downloadRef = ref<HTMLElement | null>(null)
const svgWidth = ref(0)
const resizeObserver = ref<ResizeObserver | null>(null)

const activeIndex = ref(-1)
const activePieIndex = ref(-1)
const activeFunnelIndex = ref(-1)
const hiddenSeries = ref(new Set<string>())
const downloadMenuVisible = ref(false)

// 横向滚动
const scrollOffsetX = ref(0)   // 当前向左偏移的像素数（>=0）
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartOffset = ref(0)
// 滚动条拖拽
const isScrollbarDragging = ref(false)
const scrollbarDragStartX = ref(0)
const scrollbarDragStartOffset = ref(0)

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  items: [] as { name: string; value: number; color: string }[],
})

// ========== 默认颜色 ==========
const defaultColors = computed(() =>
  props.colors?.length
    ? props.colors
    : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']
)

// ========== 尺寸计算 ==========
const computedWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)
const computedHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

const headerHeight = computed(() => (props.title || props.subtitle ? 52 : 0))
const legendH = computed(() => {
  if (!props.showLegend || legendItems.value.length === 0) return 0
  if (props.legendPosition === 'top' || props.legendPosition === 'bottom') return 36
  return 0
})

const svgHeight = computed(() => {
  const totalH = typeof props.height === 'number' ? props.height : 300
  return totalH - headerHeight.value - legendH.value
})

// ========== padding ==========
const padding = computed(() => {
  const isLinBar = props.type === 'line' || props.type === 'bar'
  const isHBar = props.type === 'hbar'
  if (isHBar) {
    // 横向柱状图：左边留名称空间，右边留数值空间
    const maxLabelLen = Math.max(...(props.labels ?? []).map(l => l.length), 4)
    const leftW = Math.min(Math.max(maxLabelLen * 7 + 12, 60), 140)
    return { top: 16, right: 60, bottom: 16, left: leftW }
  }
  return {
    top: 20,
    right: 24,
    bottom: isLinBar ? 40 : 20,
    left: isLinBar ? 56 : 20,
  }
})

// ========== 折线/柱状图计算 ==========
const xLabels = computed(() => props.labels)

const visibleSeries = computed(() =>
  props.series.filter(s => !hiddenSeries.value.has(s.name))
)

const allValues = computed(() => {
  if (props.type === 'pie' || props.type === 'donut') return []
  return visibleSeries.value.flatMap(s => s.data)
})

const yMin = computed(() => {
  if (allValues.value.length === 0) return 0
  const min = Math.min(...allValues.value)
  return min >= 0 ? 0 : min * 1.1
})

const yMax = computed(() => {
  if (allValues.value.length === 0) return 100
  const max = Math.max(...allValues.value)
  return max <= 0 ? 0 : max * 1.15
})

const yTicks = computed(() => {
  const count = 5
  const step = (yMax.value - yMin.value) / count
  return Array.from({ length: count + 1 }, (_, i) => yMin.value + step * i)
})

const plotWidth = computed(() => svgWidth.value - padding.value.left - padding.value.right)
const plotHeight = computed(() => svgHeight.value - padding.value.top - padding.value.bottom)

// ========== 横向滚动视口 ==========
/** 每个数据点实际占用宽度（虚拟 canvas 中） */
const itemWidth = computed(() => {
  if (props.minItemWidth > 0) {
    const dataLen = Math.max(xLabels.value.length, 1)
    const naturalW = plotWidth.value / dataLen
    return Math.max(naturalW, props.minItemWidth)
  }
  return plotWidth.value / Math.max(xLabels.value.length, 1)
})

/** 虚拟数据区总宽度 */
const virtualPlotWidth = computed(() => {
  const dataLen = Math.max(xLabels.value.length, 1)
  if (props.type === 'line') {
    return itemWidth.value * (dataLen - 1)
  }
  return itemWidth.value * dataLen
})

/** 是否启用横向滚动 */
const scrollable = computed(() =>
  (props.type === 'line' || props.type === 'bar') &&
  virtualPlotWidth.value > plotWidth.value + 1
)

/** 最大可偏移量 */
const maxScrollOffsetX = computed(() =>
  scrollable.value ? Math.max(0, virtualPlotWidth.value - plotWidth.value) : 0
)

/** 当前偏移量（钳制在合法范围） */
const clampedOffsetX = computed(() =>
  Math.max(0, Math.min(scrollOffsetX.value, maxScrollOffsetX.value))
)

/** 滚动条宽度比例 */
const scrollbarRatio = computed(() => {
  if (!scrollable.value || virtualPlotWidth.value <= 0) return 1
  return Math.max(plotWidth.value / virtualPlotWidth.value, 0.06)
})

/** 滚动条轨道宽度（px） */
const scrollbarTrackW = computed(() => plotWidth.value)

/** 滚动条滑块宽度 */
const scrollbarThumbW = computed(() => Math.max(scrollbarTrackW.value * scrollbarRatio.value, 28))

/** 滚动条滑块 left 位置 */
const scrollbarThumbLeft = computed(() => {
  if (maxScrollOffsetX.value <= 0) return padding.value.left
  const travel = scrollbarTrackW.value - scrollbarThumbW.value
  return padding.value.left + (clampedOffsetX.value / maxScrollOffsetX.value) * travel
})

const stepX = computed(() => {
  const len = xLabels.value.length
  if (props.type === 'line') {
    return len > 1 ? virtualPlotWidth.value / (len - 1) : virtualPlotWidth.value
  }
  return itemWidth.value
})

function getXCenter(i: number): number {
  const offsetX = scrollable.value ? -clampedOffsetX.value : 0
  if (props.type === 'bar') {
    const seriesCount = visibleSeries.value.length
    const totalBarW = barWidth.value * seriesCount + barGap.value * (seriesCount - 1)
    return padding.value.left + offsetX + itemWidth.value * i + itemWidth.value / 2 - totalBarW / 2 + barWidth.value / 2
  }
  return padding.value.left + offsetX + stepX.value * i
}

function getY(val: number): number {
  const range = yMax.value - yMin.value || 1
  return padding.value.top + plotHeight.value * (1 - (val - yMin.value) / range)
}

function getLinePath(data: number[]): string {
  if (!data.length) return ''
  return data
    .map((val, i) => `${i === 0 ? 'M' : 'L'} ${getXCenter(i)} ${getY(val)}`)
    .join(' ')
}

function getAreaPath(data: number[]): string {
  if (!data.length) return ''
  const linePart = data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${getXCenter(i)} ${getY(val)}`).join(' ')
  const base = svgHeight.value - padding.value.bottom
  return `${linePart} L ${getXCenter(data.length - 1)} ${base} L ${getXCenter(0)} ${base} Z`
}

// ========== 柱状图 ==========
const barGap = computed(() => 4)
const barWidth = computed(() => {
  const seriesCount = Math.max(visibleSeries.value.length, 1)
  const available = itemWidth.value * 0.7
  return Math.max(6, (available - barGap.value * (seriesCount - 1)) / seriesCount)
})

function getBarX(dataIdx: number, serieIdx: number): number {
  const seriesCount = visibleSeries.value.length
  const totalBarW = barWidth.value * seriesCount + barGap.value * (seriesCount - 1)
  const offsetX = scrollable.value ? -clampedOffsetX.value : 0
  const groupStart = padding.value.left + offsetX + itemWidth.value * dataIdx + (itemWidth.value - totalBarW) / 2
  return groupStart + (barWidth.value + barGap.value) * serieIdx
}

// ========== 饼图计算 ==========
const isEmpty = computed(() => {
  if (props.type === 'pie' || props.type === 'donut' || props.type === 'funnel') {
    return !props.data?.length || props.data.every(d => d.value === 0)
  }
  if (props.type === 'gauge') return false
  if (props.type === 'hbar') return !props.series?.length
  return !props.series?.length
})

const pieRadius = computed(() => {
  const r = Math.min(svgWidth.value, svgHeight.value) / 2 - 24
  return Math.max(r, 40)
})

const donutInnerRadius = computed(() => pieRadius.value * 0.55)

const pieCenter = computed(() => ({
  x: svgWidth.value / 2,
  y: svgHeight.value / 2,
}))

interface PieSlice {
  path: string
  color: string
  name: string
  value: number
  percent: number
  offsetX: number
  offsetY: number
  labelX: number
  labelY: number
  extra?: Record<string, any>
}

const pieSlices = computed((): PieSlice[] => {
  const items = props.data?.filter(d => !hiddenSeries.value.has(d.name)) ?? []
  if (!items.length) return []
  const total = items.reduce((s, d) => s + d.value, 0)
  if (total === 0) return []

  let startAngle = -Math.PI / 2
  const r = pieRadius.value
  const inner = props.type === 'donut' ? donutInnerRadius.value : 0

  return items.map((item, i) => {
    const angle = (item.value / total) * Math.PI * 2
    const endAngle = startAngle + angle
    const midAngle = startAngle + angle / 2

    const x1 = Math.cos(startAngle) * r
    const y1 = Math.sin(startAngle) * r
    const x2 = Math.cos(endAngle) * r
    const y2 = Math.sin(endAngle) * r

    const largeArc = angle > Math.PI ? 1 : 0

    let path: string
    if (inner > 0) {
      const ix1 = Math.cos(startAngle) * inner
      const iy1 = Math.sin(startAngle) * inner
      const ix2 = Math.cos(endAngle) * inner
      const iy2 = Math.sin(endAngle) * inner
      path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${largeArc} 0 ${ix1} ${iy1} Z`
    } else {
      path = `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    }

    const labelR = props.type === 'donut'
      ? (donutInnerRadius.value + r) / 2   // 环形图：标签放在环带中间
      : r * 0.65                            // 饼图：标签放在半径 65% 处
    startAngle = endAngle
    return {
      path,
      color: item.color || defaultColors.value[i % defaultColors.value.length],
      name: item.name,
      value: item.value,
      percent: Math.round((item.value / total) * 1000) / 10,
      offsetX: Math.cos(midAngle),
      offsetY: Math.sin(midAngle),
      labelX: Math.cos(midAngle) * labelR,
      labelY: Math.sin(midAngle) * labelR,
      extra: pickExtra(item, ['name', 'value', 'color']),
    }
  })
})

// ========== 漏斗图计算 ==========
const funnelGap = 4 // 层之间的间隙

interface FunnelItem {
  x: number       // 梯形左上角 x
  y: number       // 梯形顶部 y
  topW: number    // 顶部宽度
  botW: number    // 底部宽度
  h: number       // 高度
  color: string
  name: string
  value: number
  percent: number
  path: string
  labelX: number  // 标签居中 x
  labelY: number  // 标签居中 y
  extra?: Record<string, any>
}

const funnelItems = computed((): FunnelItem[] => {
  const items = props.data?.filter(d => !hiddenSeries.value.has(d.name)) ?? []
  if (!items.length) return []

  const padH = 16  // 上下留白
  const padW = 20  // 左右最小留白（最宽行）
  const areaW = svgWidth.value - padW * 2
  const areaH = svgHeight.value - padH * 2
  const count = items.length
  const itemH = (areaH - funnelGap * (count - 1)) / count

  // 最大值决定顶部最宽
  const maxVal = Math.max(...items.map(d => d.value))
  const minRatio = 0.15 // 最窄层至少占最宽的 15%

  return items.map((item, i) => {
    const ratio = maxVal > 0 ? item.value / maxVal : 1
    const clampedRatio = Math.max(ratio, minRatio)
    const topW = areaW * (i === 0 ? 1 : Math.max(items[i - 1].value / maxVal, minRatio))
    const botW = areaW * clampedRatio

    const yStart = padH + i * (itemH + funnelGap)
    const xTop = padW + (areaW - topW) / 2
    const xBot = padW + (areaW - botW) / 2

    // 梯形路径（左上、右上、右下、左下）
    const path = `M ${xTop} ${yStart} L ${xTop + topW} ${yStart} L ${xBot + botW} ${yStart + itemH} L ${xBot} ${yStart + itemH} Z`

    const color = item.color || defaultColors.value[i % defaultColors.value.length]
    const total = items.reduce((s, d) => s + d.value, 0)
    const percent = total > 0 ? Math.round((item.value / total) * 1000) / 10 : 0

    return {
      x: xTop,
      y: yStart,
      topW,
      botW,
      h: itemH,
      color,
      name: item.name,
      value: item.value,
      percent,
      path,
      labelX: svgWidth.value / 2,
      labelY: yStart + itemH / 2,
      extra: pickExtra(item, ['name', 'value', 'color']),
    }
  })
})

// ========== 横向柱状图（hbar）计算 ==========
interface HBarItem {
  label: string
  value: number
  color: string
  seriesName: string
  serieIdx: number
  dataIdx: number
  barY: number    // 柱子顶部 y
  barH: number    // 柱子高度
  barX: number    // 柱子起始 x（从 padding.left 开始）
  barW: number    // 柱子宽度
  valX: number    // 数值文字 x
  extra?: Record<string, any>  // 来自 serie 的额外透传字段
}

const hbarAllValues = computed(() => {
  if (props.type !== 'hbar') return []
  return visibleSeries.value.flatMap(s => s.data)
})

const hbarMax = computed(() => {
  const vals = hbarAllValues.value
  if (!vals.length) return 100
  return Math.max(...vals) * 1.15
})

/** 横向柱状图每行高度 */
const hbarRowH = computed(() => {
  const count = Math.max(props.labels?.length ?? 1, 1)
  return plotHeight.value / count
})

const hbarBarH = computed(() => {
  const seriesCount = Math.max(visibleSeries.value.length, 1)
  const available = hbarRowH.value * 0.65
  return Math.max(6, (available - 3 * (seriesCount - 1)) / seriesCount)
})

const hbarItems = computed((): HBarItem[] => {
  if (props.type !== 'hbar') return []
  const result: HBarItem[] = []
  const labels = props.labels ?? []
  const seriesCount = visibleSeries.value.length
  const barH = hbarBarH.value
  const gap = 3
  const totalGroupH = barH * seriesCount + gap * (seriesCount - 1)
  const chartW = plotWidth.value

  visibleSeries.value.forEach((serie, si) => {
    const serieExtra = pickExtra(serie, ['name', 'data', 'color', 'areaFill'])
    labels.forEach((label, di) => {
      const val = serie.data[di] ?? 0
      const ratio = hbarMax.value > 0 ? val / hbarMax.value : 0
      const barW = Math.max(0, ratio * chartW)
      const barX = padding.value.left
      const rowCenterY = padding.value.top + hbarRowH.value * di + hbarRowH.value / 2
      const barY = rowCenterY - totalGroupH / 2 + (barH + gap) * si
      result.push({
        label,
        value: val,
        color: serie.color || defaultColors.value[si % defaultColors.value.length],
        seriesName: serie.name,
        serieIdx: si,
        dataIdx: di,
        barY,
        barH,
        barX,
        barW,
        valX: barX + barW + 4,
        extra: serieExtra,
      })
    })
  })
  return result
})

/** hbar X轴刻度 */
const hbarXTicks = computed(() => {
  if (props.type !== 'hbar') return []
  const count = 5
  const step = hbarMax.value / count
  return Array.from({ length: count + 1 }, (_, i) => i * step)
})

function getHBarTickX(val: number): number {
  const ratio = hbarMax.value > 0 ? val / hbarMax.value : 0
  return padding.value.left + ratio * plotWidth.value
}

// ========== 仪表盘（gauge）计算 ==========
interface GaugeArc {
  path: string
  color: string
  startDeg: number
  endDeg: number
}

/** 仪表盘弧度范围：从 -210° 到 30°，共 240° */
const GAUGE_START_DEG = -210
const GAUGE_SWEEP_DEG = 240

const gaugeCx = computed(() => svgWidth.value / 2)
const gaugeTrackWBase = 14  // 先用固定值估算留白，再按实际 R 修正
const gaugeR = computed(() => {
  // 顶部留白 = R + trackW/2 + 24（刻度文字），底部留白 = R*0.5（指针+数值）
  // 解方程：gaugeCy - R - trackW/2 - 24 >= 8（最小上边距）
  // 保守取 R 不超过 svgHeight * 0.42、svgWidth * 0.36
  return Math.min(svgWidth.value * 0.36, svgHeight.value * 0.42, 120)
})
const gaugeTrackW = computed(() => Math.max(gaugeR.value * 0.14, 10))
/** 圆心 Y：确保顶部弧线 + 轨道宽 + 刻度文字不超出 SVG 上边界 */
const gaugeCy = computed(() => {
  const topMargin = gaugeR.value + gaugeTrackW.value / 2 + 26  // 弧顶 + 刻度文字高度
  return Math.max(topMargin, svgHeight.value * 0.54)
})

/** 将角度 deg 转换为 SVG 坐标 */
function gaugePt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function gaugeArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = gaugePt(cx, cy, r, startDeg)
  const end = gaugePt(cx, cy, r, endDeg)
  const sweep = endDeg - startDeg
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

const gaugeRatio = computed(() => {
  const range = props.gaugeMax - props.gaugeMin || 1
  return Math.max(0, Math.min((props.gaugeValue - props.gaugeMin) / range, 1))
})

/** 仪表盘轨道路径（灰色背景弧） */
const gaugeTrackPath = computed(() =>
  gaugeArcPath(gaugeCx.value, gaugeCy.value, gaugeR.value, GAUGE_START_DEG, GAUGE_START_DEG + GAUGE_SWEEP_DEG)
)

/** 仪表盘进度弧路径 */
const gaugeProgressPath = computed(() => {
  if (gaugeRatio.value <= 0) return ''
  const endDeg = GAUGE_START_DEG + GAUGE_SWEEP_DEG * gaugeRatio.value
  return gaugeArcPath(gaugeCx.value, gaugeCy.value, gaugeR.value, GAUGE_START_DEG, endDeg)
})

/** 仪表盘刻度线 */
interface GaugeTick { x1: number; y1: number; x2: number; y2: number; label: string; lx: number; ly: number }
const gaugeTicks = computed((): GaugeTick[] => {
  const count = 5
  const ticks: GaugeTick[] = []
  const cx = gaugeCx.value; const cy = gaugeCy.value; const r = gaugeR.value
  const innerR = r - gaugeTrackW.value - 4
  for (let i = 0; i <= count; i++) {
    const deg = GAUGE_START_DEG + (GAUGE_SWEEP_DEG / count) * i
    const outer = gaugePt(cx, cy, r + 6, deg)
    const inner = gaugePt(cx, cy, innerR, deg)
    const lp = gaugePt(cx, cy, r + 18, deg)
    const val = props.gaugeMin + ((props.gaugeMax - props.gaugeMin) / count) * i
    ticks.push({ x1: outer.x, y1: outer.y, x2: inner.x, y2: inner.y, label: formatValue(val), lx: lp.x, ly: lp.y })
  }
  return ticks
})

/** 仪表盘指针 */
const gaugeNeedle = computed(() => {
  const deg = GAUGE_START_DEG + GAUGE_SWEEP_DEG * gaugeRatio.value
  const cx = gaugeCx.value; const cy = gaugeCy.value; const r = gaugeR.value
  const tip = gaugePt(cx, cy, r - gaugeTrackW.value - 10, deg)
  const base1 = gaugePt(cx, cy, 10, deg + 90)
  const base2 = gaugePt(cx, cy, 10, deg - 90)
  return {
    path: `M ${base1.x} ${base1.y} L ${tip.x} ${tip.y} L ${base2.x} ${base2.y} Z`,
    cx, cy,
  }
})

/** 仪表盘颜色渐变区段 */
const gaugeArcs = computed((): GaugeArc[] => {
  const cx = gaugeCx.value; const cy = gaugeCy.value; const r = gaugeR.value
  const colors = props.colors?.length
    ? props.colors
    : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
  // 如果 data 传了区段信息就按 data 分段，否则按 4 等分上色
  const segments = props.data?.length
    ? props.data
    : colors.map((c, i) => ({ name: '', value: 1, color: c }))
  const total = segments.reduce((s, d) => s + d.value, 0)
  let cur = GAUGE_START_DEG
  return segments.map((seg, i) => {
    const sweep = (seg.value / total) * GAUGE_SWEEP_DEG
    const endDeg = cur + sweep
    const arc: GaugeArc = {
      path: gaugeArcPath(cx, cy, r, cur, endDeg),
      color: seg.color || colors[i % colors.length],
      startDeg: cur,
      endDeg,
    }
    cur = endDeg
    return arc
  })
})
const legendItems = computed(() => {
  if (props.type === 'pie' || props.type === 'donut' || props.type === 'funnel') {
    return (props.data ?? []).map((d, i) => ({
      name: d.name,
      color: d.color || defaultColors.value[i % defaultColors.value.length],
    }))
  }
  if (props.type === 'gauge') return []
  return props.series.map((s, i) => ({
    name: s.name,
    color: s.color || defaultColors.value[i % defaultColors.value.length],
  }))
})

function toggleSeries(name: string) {
  const s = new Set(hiddenSeries.value)
  if (s.has(name)) s.delete(name)
  else s.add(name)
  hiddenSeries.value = s
}

// ========== Tooltip ==========
function formatValue(val: number): string {
  if (props.formatter) return props.formatter(val)
  if (Math.abs(val) >= 10000) return (val / 10000).toFixed(1) + 'w'
  if (Number.isInteger(val)) return val.toString()
  return val.toFixed(1)
}

// ========== 下钻事件 ==========
/** 从对象中提取除已知字段外的所有额外字段 */
function pickExtra(obj: Record<string, any>, excludeKeys: string[]): Record<string, any> | undefined {
  const result: Record<string, any> = {}
  let hasExtra = false
  for (const key of Object.keys(obj)) {
    if (!excludeKeys.includes(key)) {
      result[key] = obj[key]
      hasExtra = true
    }
  }
  return hasExtra ? result : undefined
}

function emitDrill(payload: { label: string; value: number; seriesName?: string; index: number; extra?: Record<string, any> }) {
  emit('drill', { type: props.type as ChartType, ...payload })
}

// hbar hover 状态
const activeHBarIndex = ref(-1) // dataIdx

/**
 * 计算 Tooltip 相对根容器的定位。
 * 当鼠标靠近根容器右侧时，自动将 tooltip 显示在鼠标左侧，避免被裁剪。
 */
function calcTooltipPos(clientX: number, clientY: number, offsetRight = 12, offsetTop = 20) {
  if (!rootRef.value) return { x: 0, y: 0 }
  const rootRect = rootRef.value.getBoundingClientRect()
  const tooltipW = 170 // 预估 tooltip 宽度
  let rx = clientX - rootRect.left
  let ry = clientY - rootRect.top - offsetTop
  // 靠近右边界时翻转到鼠标左侧
  if (rx + offsetRight + tooltipW > rootRect.width) {
    rx = rx - tooltipW - offsetRight
  } else {
    rx = rx + offsetRight
  }
  return { x: Math.max(4, rx), y: Math.max(4, ry) }
}

function onMouseMove(e: MouseEvent) {
  if (!bodyRef.value) return
  // 拖拽中不触发 tooltip
  if (isDragging.value) return
  const rect = bodyRef.value.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  if (props.type === 'line' || props.type === 'bar') {
    // 找最近的 x 坐标（屏幕坐标系）
    let closest = -1
    let minDist = Infinity
    xLabels.value.forEach((_, i) => {
      const cx = getXCenter(i)
      const d = Math.abs(mx - cx)
      if (d < minDist) {
        minDist = d
        closest = i
      }
    })
    if (closest < 0 || minDist > 40 || getXCenter(closest) < padding.value.left || getXCenter(closest) > svgWidth.value - padding.value.right) {
      activeIndex.value = -1
      tooltip.value.visible = false
      return
    }
    activeIndex.value = closest

    const items = visibleSeries.value.map((s, si) => ({
      name: s.name,
      value: s.data[closest] ?? 0,
      color: s.color || defaultColors.value[si % defaultColors.value.length],
    }))
    const pos = calcTooltipPos(e.clientX, e.clientY)
    tooltip.value = {
      visible: true,
      x: pos.x,
      y: pos.y,
      title: xLabels.value[closest],
      items,
    }
  } else if (props.type === 'hbar') {
    // 找最近的行
    const labels = props.labels ?? []
    let closestRow = -1
    let minD = Infinity
    labels.forEach((_, di) => {
      const rowCY = padding.value.top + hbarRowH.value * di + hbarRowH.value / 2
      const d = Math.abs(my - rowCY)
      if (d < minD) { minD = d; closestRow = di }
    })
    if (closestRow < 0 || minD > hbarRowH.value / 2 + 4) {
      activeHBarIndex.value = -1; tooltip.value.visible = false; return
    }
    activeHBarIndex.value = closestRow
    const items = visibleSeries.value.map((s, si) => ({
      name: s.name,
      value: s.data[closestRow] ?? 0,
      color: s.color || defaultColors.value[si % defaultColors.value.length],
    }))
    const pos = calcTooltipPos(e.clientX, e.clientY)
    tooltip.value = {
      visible: true,
      x: pos.x,
      y: pos.y,
      title: labels[closestRow],
      items,
    }
  }
}

function onMouseLeave() {
  activeIndex.value = -1
  activeHBarIndex.value = -1
  tooltip.value.visible = false
  if (isDragging.value) stopDrag()
}

// hbar 点击下钻
function onHBarClick(item: HBarItem) {
  emitDrill({ label: item.label, value: item.value, seriesName: item.seriesName, index: item.dataIdx, extra: item.extra })
}


// ========== 拖拽滚动 ==========
function onDragStart(e: MouseEvent) {
  if (!scrollable.value) return
  if ((e.target as Element).classList.contains('xly-chart__scrollbar-thumb')) return
  isDragging.value = true
  dragStartX.value = e.clientX
  dragStartOffset.value = clampedOffsetX.value
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value) return
  const delta = dragStartX.value - e.clientX  // 向左拖 → 偏移增大（内容向左移动）
  const newOffset = dragStartOffset.value + delta
  scrollOffsetX.value = Math.max(0, Math.min(newOffset, maxScrollOffsetX.value))
}

function stopDrag() {
  isDragging.value = false
}

// ========== 滚动条拖拽 ==========
function onScrollbarDragStart(e: MouseEvent) {
  isScrollbarDragging.value = true
  scrollbarDragStartX.value = e.clientX
  scrollbarDragStartOffset.value = clampedOffsetX.value
}

function onScrollbarDragMove(e: MouseEvent) {
  if (!isScrollbarDragging.value) return
  const delta = e.clientX - scrollbarDragStartX.value
  const travel = scrollbarTrackW.value - scrollbarThumbW.value
  if (travel <= 0) return
  const newOffset = scrollbarDragStartOffset.value + (delta / travel) * maxScrollOffsetX.value
  scrollOffsetX.value = Math.max(0, Math.min(newOffset, maxScrollOffsetX.value))
}

function stopScrollbarDrag() {
  isScrollbarDragging.value = false
}

// ========== 滚轮滚动 ==========
function onWheel(e: WheelEvent) {
  if (!scrollable.value) return
  const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
  scrollOffsetX.value = Math.max(0, Math.min(scrollOffsetX.value + delta, maxScrollOffsetX.value))
}

function onPieEnter(i: number, e: MouseEvent) {
  activePieIndex.value = i
  const slice = pieSlices.value[i]
  const pos = calcTooltipPos(e.clientX, e.clientY)
  tooltip.value = {
    visible: true,
    x: pos.x,
    y: pos.y,
    title: slice.name,
    items: [{ name: `${slice.percent}%`, value: slice.value, color: slice.color }],
  }
}

function onPieLeave() {
  activePieIndex.value = -1
  tooltip.value.visible = false
}

function onPieClick(i: number) {
  const slice = pieSlices.value[i]
  emitDrill({ label: slice.name, value: slice.value, index: i, extra: slice.extra })
}

function onFunnelEnter(i: number, e: MouseEvent) {
  activeFunnelIndex.value = i
  const item = funnelItems.value[i]
  const pos = calcTooltipPos(e.clientX, e.clientY)
  tooltip.value = {
    visible: true,
    x: pos.x,
    y: pos.y,
    title: item.name,
    items: [{ name: `占比 ${item.percent}%`, value: item.value, color: item.color }],
  }
}

function onFunnelLeave() {
  activeFunnelIndex.value = -1
  tooltip.value.visible = false
}

function onFunnelClick(i: number) {
  const item = funnelItems.value[i]
  emitDrill({ label: item.name, value: item.value, index: i, extra: item.extra })
}

// 折线/柱状图点击下钻
function onBarLineClick(dataIdx: number) {
  if (dataIdx < 0) return
  visibleSeries.value.forEach((s) => {
    emitDrill({
      label: xLabels.value[dataIdx] ?? String(dataIdx),
      value: s.data[dataIdx] ?? 0,
      seriesName: s.name,
      index: dataIdx,
      extra: pickExtra(s, ['name', 'data', 'color', 'areaFill']),
    })
  })
}

// ========== resize ==========
function updateSize() {
  if (bodyRef.value) {
    svgWidth.value = bodyRef.value.clientWidth
  }
}

// ========== 下载功能 ==========
function toggleDownloadMenu() {
  downloadMenuVisible.value = !downloadMenuVisible.value
}

function onClickOutsideDownload(e: MouseEvent) {
  if (downloadRef.value && !downloadRef.value.contains(e.target as Node)) {
    downloadMenuVisible.value = false
  }
}

function getSvgElement(): SVGSVGElement | null {
  return bodyRef.value?.querySelector('svg.xly-chart__svg') ?? null
}

function getDownloadFileName(ext: string): string {
  return (props.title ? props.title.replace(/\s+/g, '_') : 'chart') + '.' + ext
}

function downloadAs(format: 'png' | 'svg') {
  downloadMenuVisible.value = false
  const svgEl = getSvgElement()
  if (!svgEl) return

  const scale = Math.max(window.devicePixelRatio || 2, 2)
  const padX = 20   // 左右内边距
  const padTop = 20 // 顶部内边距
  const padBot = 20 // 底部内边距

  // ---- 计算各区域尺寸 ----
  const chartW = svgEl.clientWidth || parseInt(svgEl.getAttribute('width') || '600')
  const chartH = svgEl.clientHeight || parseInt(svgEl.getAttribute('height') || '300')
  const totalW = chartW + padX * 2

  // 标题区高度
  let titleH = 0
  if (props.title) titleH += 22
  if (props.subtitle) titleH += 18
  if (titleH > 0) titleH += 16 // 上下 padding

  // 图例区高度（top/bottom 方向才单独占高度）
  const showLeg = props.showLegend && legendItems.value.length > 0
  const legIsHoriz = props.legendPosition === 'top' || props.legendPosition === 'bottom'
  let legendH_px = 0
  if (showLeg && legIsHoriz) legendH_px = 32

  const totalH = padTop + titleH + legendH_px + chartH + padBot

  // ---- 构建 SVG 字符串（注入内联样式）----
  const serializer = new XMLSerializer()
  const svgClone = svgEl.cloneNode(true) as SVGSVGElement
  svgClone.setAttribute('width', String(chartW))
  svgClone.setAttribute('height', String(chartH))
  const inlineStyle = document.createElementNS('http://www.w3.org/2000/svg', 'style')
  inlineStyle.textContent = `
    text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .xly-chart__grid-line { stroke: #f1f1f4; stroke-width: 1; }
    .xly-chart__axis-line { stroke: #e4e4e7; stroke-width: 1; }
    .xly-chart__axis-text { font-size: 11px; fill: #a1a1aa; }
    .xly-chart__tooltip-line { display: none; }
  `
  svgClone.insertBefore(inlineStyle, svgClone.firstChild)
  const svgStr = serializer.serializeToString(svgClone)

  if (format === 'svg') {
    // SVG 格式：构建一个包含标题+图例+图表的完整 SVG
    const fullSvg = buildFullSvg(totalW, totalH, padX, padTop, titleH, legendH_px, chartW, chartH, svgStr)
    const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' })
    triggerDownload(URL.createObjectURL(blob), getDownloadFileName('svg'))
    return
  }

  // PNG 格式：Canvas 绘制
  const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)
  const svgImg = new Image()

  svgImg.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = totalW * scale
    canvas.height = totalH * scale
    const ctx = canvas.getContext('2d')!
    ctx.scale(scale, scale)

    // 白色背景
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, totalW, totalH)

    let curY = padTop

    // 绘制标题
    if (props.title) {
      ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#1a1a1a'
      ctx.fillText(props.title, padX, curY + 15)
      curY += 22
    }
    if (props.subtitle) {
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#71717a'
      ctx.fillText(props.subtitle, padX, curY + 12)
      curY += 18
    }
    if (titleH > 0) curY += 8

    // 绘制图例（top 时在图表前，bottom 时在图表后暂存）
    const drawLegend = (offsetY: number) => {
      if (!showLeg) return
      let lx = padX
      const dotSize = 10
      const gap = 6
      const itemGap = 16
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      legendItems.value.forEach(item => {
        // 圆点
        ctx.fillStyle = item.color
        ctx.beginPath()
        if (props.type === 'line') {
          ctx.arc(lx + dotSize / 2, offsetY + dotSize / 2, dotSize / 2, 0, Math.PI * 2)
        } else {
          roundRect(ctx, lx, offsetY, dotSize, dotSize, 2)
        }
        ctx.fill()
        // 文字
        ctx.fillStyle = '#71717a'
        const labelW = ctx.measureText(item.name).width
        ctx.fillText(item.name, lx + dotSize + gap, offsetY + dotSize - 1)
        lx += dotSize + gap + labelW + itemGap
      })
    }

    if (showLeg && props.legendPosition === 'top') {
      drawLegend(curY + 6)
      curY += legendH_px
    }

    // 绘制 SVG 图表
    ctx.drawImage(svgImg, padX, curY, chartW, chartH)
    URL.revokeObjectURL(svgUrl)
    curY += chartH

    if (showLeg && props.legendPosition === 'bottom') {
      curY += 6
      drawLegend(curY)
    }

    canvas.toBlob(blob => {
      if (blob) triggerDownload(URL.createObjectURL(blob), getDownloadFileName('png'))
    }, 'image/png')
  }
  svgImg.src = svgUrl
}

/** 辅助：Canvas 绘制圆角矩形 */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/** 构建包含标题+图例+图表的完整 SVG 字符串 */
function buildFullSvg(
  totalW: number, totalH: number,
  padX: number, padTop: number,
  titleH: number, legendH_px: number,
  chartW: number, chartH: number,
  innerSvgStr: string,
): string {
  const lines: string[] = []
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}">`)
  lines.push(`<style>text{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}</style>`)
  // 白色背景
  lines.push(`<rect width="${totalW}" height="${totalH}" fill="white"/>`)

  let curY = padTop

  // 标题
  if (props.title) {
    lines.push(`<text x="${padX}" y="${curY + 15}" font-size="15" font-weight="600" fill="#1a1a1a">${escXml(props.title)}</text>`)
    curY += 22
  }
  if (props.subtitle) {
    lines.push(`<text x="${padX}" y="${curY + 12}" font-size="12" fill="#71717a">${escXml(props.subtitle)}</text>`)
    curY += 18
  }
  if (titleH > 0) curY += 8

  // 图例（简单估算每项宽度）
  const showLeg = props.showLegend && legendItems.value.length > 0
  const drawSvgLegend = (offsetY: number) => {
    if (!showLeg) return ''
    let lx = padX
    const dotSize = 10
    const charW = 7.5
    const itemParts: string[] = []
    legendItems.value.forEach(item => {
      const shape = props.type === 'line'
        ? `<circle cx="${lx + 5}" cy="${offsetY + 5}" r="5" fill="${item.color}"/>`
        : `<rect x="${lx}" y="${offsetY}" width="${dotSize}" height="${dotSize}" rx="2" fill="${item.color}"/>`
      const textX = lx + dotSize + 6
      itemParts.push(shape)
      itemParts.push(`<text x="${textX}" y="${offsetY + dotSize - 1}" font-size="12" fill="#71717a">${escXml(item.name)}</text>`)
      lx += dotSize + 6 + item.name.length * charW + 16
    })
    return itemParts.join('\n')
  }

  if (showLeg && props.legendPosition === 'top') {
    lines.push(drawSvgLegend(curY + 6))
    curY += legendH_px
  }

  // 嵌入图表 SVG（用 foreignObject 或直接 <svg> 嵌套）
  // 提取内部 SVG 内容并包裹进嵌套 svg
  const innerContent = innerSvgStr.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
  lines.push(`<svg x="${padX}" y="${curY}" width="${chartW}" height="${chartH}" xmlns="http://www.w3.org/2000/svg">`)
  lines.push(innerContent)
  lines.push('</svg>')
  curY += chartH

  if (showLeg && props.legendPosition === 'bottom') {
    lines.push(drawSvgLegend(curY + 6))
  }

  lines.push('</svg>')
  return lines.join('\n')
}

function escXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

onMounted(() => {
  nextTick(updateSize)
  resizeObserver.value = new ResizeObserver(updateSize)
  if (bodyRef.value) resizeObserver.value.observe(bodyRef.value)
  document.addEventListener('click', onClickOutsideDownload)
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('mousemove', onScrollbarDragMove)
  document.addEventListener('mouseup', stopScrollbarDrag)
})

onUnmounted(() => {
  resizeObserver.value?.disconnect()
  document.removeEventListener('click', onClickOutsideDownload)
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', onScrollbarDragMove)
  document.removeEventListener('mouseup', stopScrollbarDrag)
})

watch(() => props.series, () => { updateSize(); scrollOffsetX.value = 0 }, { deep: true })
watch(() => props.data, () => { updateSize(); scrollOffsetX.value = 0 }, { deep: true })
watch(() => props.labels, () => { scrollOffsetX.value = 0 }, { deep: true })
</script>

<style scoped lang="scss">
$text-primary: #1a1a1a;
$text-regular: #4a4a4a;
$text-secondary: #71717a;
$text-muted: #a1a1aa;
$border-color: #e4e4e7;
$bg-white: #ffffff;

.xly-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: $bg-white;
  box-sizing: border-box;
  user-select: none;

  // legend 在左/右时，整体改为横向排列
  &.legend-left,
  &.legend-right {
    flex-direction: row;
    flex-wrap: wrap;

    // 标题栏独占一行
    .xly-chart__header {
      flex: 0 0 100%;
      order: -2;
    }
  }
  &.legend-right .xly-chart__legend { order: 1; }
  &.legend-left  .xly-chart__legend { order: -1; }
}

// 标题
.xly-chart__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 0 18px;
  flex-shrink: 0;
  min-height: 8px;

  &.has-content {
    padding: 14px 18px 4px;
  }
}
.xly-chart__header-left {
  flex: 1;
  min-width: 0;
}
.xly-chart__title {
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.4;
}
.xly-chart__subtitle {
  font-size: 12px;
  color: $text-secondary;
  margin-top: 2px;
}

// 下载按钮
.xly-chart__download {
  position: relative;
  flex-shrink: 0;
  padding-top: 2px;
}
.xly-chart__download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid $border-color;
  border-radius: 6px;
  background: $bg-white;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.18s;
  padding: 0;
  outline: none;

  &:hover {
    background: #f4f5f7;
    color: $text-primary;
    border-color: darken($border-color, 5%);
  }
  &:active {
    background: #ebebee;
    transform: scale(0.95);
  }
}
.xly-chart__download-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
  z-index: 200;
  overflow: hidden;
  min-width: 130px;
  animation: menu-in 0.15s ease;

  @keyframes menu-in {
    from { opacity: 0; transform: translateY(-4px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
}
.xly-chart__download-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 13px;
  color: $text-regular;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;

  &:hover {
    background: #f4f5f7;
    color: $text-primary;
  }
  &:active {
    background: #ebebee;
  }
  svg {
    flex-shrink: 0;
    color: $text-secondary;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #f4f5f7;
  }
}

// 图例
.xly-chart__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 6px 18px;
  flex-shrink: 0;

  &--top { order: -1; padding-bottom: 4px; }
  &--bottom { padding-top: 4px; }
  &--left {
    flex-direction: column;
    padding: 14px 0 14px 8px;
    width: 120px;
    flex-shrink: 0;
  }
  &--right {
    flex-direction: column;
    padding: 14px 8px 14px 0;
    width: 120px;
    flex-shrink: 0;
  }
}
.xly-chart__legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
  &.is-hidden {
    opacity: 0.35;
  }
}
.xly-chart__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.xly-chart__legend-label {
  font-size: 12px;
  color: $text-secondary;
  white-space: nowrap;
}

// 绘图区
.xly-chart__body {
  flex: 1;
  position: relative;
  min-height: 0;
  min-width: 0;  // 横向布局时 flex:1 需要 min-width:0 才能正确收缩
  overflow: hidden;
}

.xly-chart__svg {
  display: block;
  overflow: visible;
}

// 网格线
.xly-chart__grid-line {
  stroke: #f1f1f4;
  stroke-width: 1;
}

// 坐标轴
.xly-chart__axis-line {
  stroke: $border-color;
  stroke-width: 1;
}
.xly-chart__axis-text {
  font-size: 11px;
  fill: $text-muted;
}

// 折线
.xly-chart__line {
  transition: d 0.3s ease;
}
.xly-chart__point {
  cursor: pointer;
  transition: r 0.15s, fill 0.15s;
}

// 数据标签（折线/柱状图）
.xly-chart__data-label {
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
}

// 饼图/环形图切片标签
.xly-chart__pie-label {
  font-size: 11px;
  font-weight: 700;
  fill: #fff;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

// 柱子
.xly-chart__bar {
  cursor: pointer;
  transition: opacity 0.2s;
}

// 饼图
.xly-chart__pie-slice {
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
}

// 触发竖线
.xly-chart__tooltip-line {
  stroke: #d1d5db;
  stroke-width: 1;
  stroke-dasharray: 4 3;
  pointer-events: none;
}

// Tooltip
.xly-chart__tooltip {
  position: absolute;
  background: rgba(30, 30, 40, 0.92);
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  pointer-events: none;
  font-size: 12px;
  line-height: 1.6;
  min-width: 120px;
  max-width: 200px;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  backdrop-filter: blur(4px);
  animation: tooltip-in 0.15s ease;

  @keyframes tooltip-in {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
.xly-chart__tooltip-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(255,255,255,0.7);
  font-size: 11px;
}
.xly-chart__tooltip-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.xly-chart__tooltip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.xly-chart__tooltip-name {
  flex: 1;
  color: rgba(255,255,255,0.85);
}
.xly-chart__tooltip-val {
  font-weight: 600;
  color: #fff;
}

// 环形中心文字
.xly-chart__donut-label {
  font-size: 12px;
  fill: $text-secondary;
  y: -10px;
}
.xly-chart__donut-value {
  font-size: 18px;
  font-weight: 700;
  fill: $text-primary;
  y: 8px;
}

// 空状态
.xly-chart__empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: $text-muted;
  font-size: 13px;
}

// 漏斗图
.xly-chart__funnel-item {
  cursor: pointer;
  transition: opacity 0.2s;
}
.xly-chart__funnel-label {
  font-size: 13px;
  font-weight: 600;
  fill: #fff;
  pointer-events: none;
}
.xly-chart__funnel-value {
  font-size: 11px;
  fill: rgba(255, 255, 255, 0.85);
  pointer-events: none;
}

// 横向滚动
.xly-chart__body {
  &.is-scrollable {
    .xly-chart__svg {
      cursor: grab;
    }
  }
  &.is-dragging {
    .xly-chart__svg {
      cursor: grabbing;
    }
  }
}

.xly-chart__scrollbar-track {
  fill: #f1f1f4;
}
.xly-chart__scrollbar-thumb {
  fill: #c4c4cc;
  cursor: pointer;
  transition: fill 0.15s;

  &:hover {
    fill: #a1a1aa;
  }
}

// 横向柱状图
.xly-chart__hbar-val {
  font-size: 11px;
  fill: $text-secondary;
}
.xly-chart__hbar-hover {
  fill: #f4f5f7;
  pointer-events: none;
  opacity: 0.6;
}

// 仪表盘
.xly-chart__gauge-progress {
  transition: d 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.xly-chart__gauge-needle {
  transition: d 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.xly-chart__gauge-val {
  font-size: 22px;
  font-weight: 700;
  fill: $text-primary;
}
</style>
