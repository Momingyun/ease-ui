<template>
  <div class="xly-gantt" ref="rootRef">
    <!-- 头部工具栏 -->
    <div class="xly-gantt__header">
      <div class="xly-gantt__title" v-if="title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {{ title }}
      </div>
      <div class="xly-gantt__actions">
        <div class="xly-gantt__view-switch" v-if="showViewSwitch">
          <button
            v-for="view in views"
            :key="view.value"
            :class="{ 'is-active': currentView === view.value }"
            @click="currentView = view.value"
          >
            {{ view.label }}
          </button>
        </div>
        <div class="xly-gantt__zoom" v-if="zoomable">
          <button @click="zoomOut" :disabled="scale <= 0.5" title="缩小">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <span class="xly-gantt__zoom-level">{{ Math.round(scale * 100) }}%</span>
          <button @click="zoomIn" :disabled="scale >= 3" title="放大">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="xly-gantt__body">
      <!-- 左侧任务列表 -->
      <div class="xly-gantt__sidebar" :class="{ 'is-auto': sidebarWidth === 'auto' }" :style="sidebarWidth !== 'auto' ? { width: sidebarWidth + 'px' } : {}">
        <!-- 多列表头 -->
        <div class="xly-gantt__sidebar-header">
          <div
            v-for="(col, ci) in columns"
            :key="ci"
            class="xly-gantt__sidebar-header-cell"
            :style="getHeaderColumnStyle(col, ci)"
          >
            {{ col.label }}
          </div>
        </div>
        <!-- 多列内容 -->
        <div class="xly-gantt__sidebar-body" ref="sidebarBodyRef" @scroll="onSidebarScroll">
          <div
            v-for="(task, index) in flatTasks"
            :key="task.id"
            class="xly-gantt__task-row"
            :class="{
              'is-group': task.isGroup,
              'is-milestone': task.isMilestone,
              'is-expanded': task.expanded,
              'is-collapsed': task.collapsed
            }"
            :style="{ height: rowHeight + 'px' }"
          >
            <!-- 遍历渲染每列 -->
            <div
              v-for="(col, ci) in columns"
              :key="ci"
              class="xly-gantt__task-cell"
              :class="{ 'is-first': ci === 0 }"
              :style="getColumnStyle(col, ci, task)"
            >
              <!-- 第一列特殊处理：包含展开按钮和图标 -->
              <template v-if="ci === 0">
                <button
                  v-if="task.children && task.children.length > 0"
                  class="xly-gantt__toggle"
                  @click="toggleTask(task)"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline v-if="task.expanded" points="6 9 12 15 18 9"/>
                    <polyline v-else points="9 18 15 12 9 6"/>
                  </svg>
                </button>

                <span class="xly-gantt__task-icon">
                  <template v-if="task.isMilestone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </template>
                  <template v-else-if="task.isGroup">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                  </template>
                  <template v-else>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                  </template>
                </span>

                <span class="xly-gantt__task-name" :title="task.name">{{ task.name }}</span>
              </template>
              <!-- 其他列：显示对应字段 -->
              <template v-else>
                <slot :name="col.prop" :row="task" :value="task?.[col.prop]">
                  {{ task?.[col.prop] }}
                </slot>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧时间轴 -->
      <div class="xly-gantt__timeline" ref="timelineRef" @scroll="onTimelineScroll">
        <!-- 固定头部 -->
        <div class="xly-gantt__timeline-header">
          <svg :width="timelineWidth * scale" :height="headerHeight" class="xly-gantt__svg-header">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#aeaeb2"/>
              </marker>
            </defs>
            <!-- 头部背景 -->
            <rect x="0" y="0" :width="timelineWidth * scale" :height="headerHeight" fill="#f5f5f7"/>
            <!-- 年/月/周 头部 -->
            <g v-for="(header, hi) in timelineHeaders" :key="'h' + hi">
              <text v-if="header.yearLabel" :x="getTimeX(parseDate(header.year)) + 8" y="22" class="xly-gantt__header-year">{{ header.yearLabel }}</text>
              <g v-for="(cell, ci) in header.cells" :key="'c' + hi + '-' + ci">
                <rect :x="cell.x" :y="cell.y" :width="cell.width - 1" :height="cell.height - 1" :class="'xly-gantt__header-cell ' + (cell.isWeekend ? 'is-weekend' : '')" fill="#fff"/>
                <text :x="cell.x + cell.width / 2" :y="cell.y + cell.height / 2" class="xly-gantt__header-text" text-anchor="middle" dominant-baseline="middle">{{ cell.label }}</text>
              </g>
            </g>
            <!-- 头部底部边框 -->
            <line x1="0" :y1="headerHeight" :x2="timelineWidth * scale" :y2="headerHeight" stroke="#e2e8f0" stroke-width="1"/>
            <!-- 今日红线头部 -->
            <g v-if="todayX >= 0">
              <line :x1="todayX" :y1="0" :x2="todayX" :y2="headerHeight" class="xly-gantt__today-line"/>
              <circle :cx="todayX" cy="0" r="3" fill="#ef4444"/>
              <text :x="todayX + 8" y="14" class="xly-gantt__today-label">今天</text>
            </g>
          </svg>
        </div>

        <!-- 可滚动内容 -->
        <div class="xly-gantt__timeline-body" ref="timelineBodyRef" @scroll="onTimelineBodyScroll">
          <svg :width="timelineWidth * scale" :height="flatTasks.length * rowHeight" class="xly-gantt__svg-body">
            <!-- SVG 定义 -->
            <defs>
              <marker id="body-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#aeaeb2"/>
              </marker>
            </defs>
            <!-- 任务条 -->
            <g v-for="(task, ti) in flatTasks" :key="'t' + task.id">
              <!-- 行背景 -->
              <rect :x="0" :y="ti * rowHeight" :width="timelineWidth * scale" :height="rowHeight" :class="'xly-gantt__row-bg ' + (ti % 2 === 0 ? 'is-even' : '')" fill="#fff"/>

              <!-- 任务条 -->
              <g v-if="!task.isMilestone && task.startDate && task.endDate">
                <!-- 阴影 -->
                <rect :x="getTimeX(parseDate(task.startDate)) + 2" :y="ti * rowHeight + (rowHeight - barHeight) / 2 + 2" :width="Math.max(getTimeX(parseDate(task.endDate)) - getTimeX(parseDate(task.startDate)), minBarWidth)" :height="barHeight" :rx="6" fill="#000" opacity="0.08"/>
                <!-- 基础条 -->
                <rect :x="getTimeX(parseDate(task.startDate))" :y="ti * rowHeight + (rowHeight - barHeight) / 2" :width="Math.max(getTimeX(parseDate(task.endDate)) - getTimeX(parseDate(task.startDate)), minBarWidth)" :height="barHeight" :rx="6" :class="'xly-gantt__bar ' + (task.colorClass || 'is-default')" @click="handleBarClick(task)" @mouseenter="(e) => showTooltip(e, task)" @mouseleave="hideTooltip"/>
                <!-- 进度条遮罩 -->
                <rect v-if="task.progress !== undefined && task.progress > 0" :x="getTimeX(parseDate(task.startDate))" :y="ti * rowHeight + (rowHeight - barHeight) / 2" :width="Math.max((getTimeX(parseDate(task.endDate)) - getTimeX(parseDate(task.startDate))) * (task.progress / 100), 6)" :height="barHeight" :rx="6" class="xly-gantt__bar-progress"/>
                <!-- 进度文字 -->
                <text v-if="task.progress !== undefined && task.progress > 0" :x="getTimeX(parseDate(task.startDate)) + 10" :y="ti * rowHeight + rowHeight / 2" class="xly-gantt__bar-progress-text" dominant-baseline="middle">{{ task.progress }}%</text>
                <!-- 依赖箭头 -->
                <g v-if="task.dependencies && task.dependencies.length > 0">
                  <!-- 渲染前清空角使用记录 -->
                  <path
                    v-for="(depId, di) in (clearCornerUsage(), task.dependencies)"
                    :key="depId + '-' + di"
                    :d="getDependencyPath(task, getTaskById(depId), ti)"
                    :stroke="getDepColor(depId)"
                    fill="none"
                    stroke-width="1.5"
                    marker-end="url(#body-arrowhead)"
                  />
                </g>
              </g>

              <!-- 里程碑 -->
              <g v-if="task.isMilestone && task.startDate">
                <polygon :points="getMilestonePoints(ti)" :class="'xly-gantt__milestone ' + (task.colorClass || 'is-default')" @click="handleBarClick(task)" @mouseenter="(e) => showTooltip(e, task)" @mouseleave="hideTooltip"/>
              </g>

              <!-- 行底部边框 -->
              <line :x1="0" :y1="(ti + 1) * rowHeight" :x2="timelineWidth * scale" :y2="(ti + 1) * rowHeight" class="xly-gantt__row-border"/>
            </g>

            <!-- 今日红线 - 内容区 -->
            <g v-if="todayX >= 0">
              <line :x1="todayX" :y1="0" :x2="todayX" :y2="flatTasks.length * rowHeight" class="xly-gantt__today-line"/>
            </g>
          </svg>
        </div>

        <!-- Tooltip -->
        <Transition name="xly-gantt-fade">
          <div v-if="tooltipVisible" class="xly-gantt__tooltip" :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }">
            <div class="xly-gantt__tooltip-header">
              <span class="xly-gantt__tooltip-icon" :class="tooltipData?.colorClass || 'is-default'">
                <svg v-if="tooltipData?.isMilestone" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              </span>
              {{ tooltipData?.name }}
            </div>
            <div class="xly-gantt__tooltip-body">
              <div class="xly-gantt__tooltip-row" v-if="tooltipData?.startDate">
                <span class="label">开始时间</span>
                <span class="value">{{ tooltipData?.startDate }}</span>
              </div>
              <div class="xly-gantt__tooltip-row" v-if="tooltipData?.endDate">
                <span class="label">结束时间</span>
                <span class="value">{{ tooltipData?.endDate }}</span>
              </div>
              <div class="xly-gantt__tooltip-row" v-if="tooltipData?.progress !== undefined">
                <span class="label">完成进度</span>
                <span class="value-progress">{{ tooltipData?.progress }}%</span>
              </div>
              <div class="xly-gantt__tooltip-row" v-if="tooltipData?.assignee">
                <span class="label">负责人</span>
                <span class="value">{{ tooltipData?.assignee }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

defineOptions({ name: 'XlyGantt' })

const props = defineProps({
  data: { type: Array, default: () => [] },
  title: { type: String, default: '' },
  taskListTitle: { type: String, default: '任务名称' },
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
  sidebarWidth: { type: [Number, String], default: 280 },
  rowHeight: { type: Number, default: 44 },
  barHeight: { type: Number, default: 24 },
  minBarWidth: { type: Number, default: 20 },
  dayWidth: { type: Number, default: 40 },
  showViewSwitch: { type: Boolean, default: true },
  zoomable: { type: Boolean, default: true },
  defaultView: { type: String, default: 'day', validator: (v) => ['day', 'week', 'month'].includes(v) },
  dateFormat: { type: String, default: 'YYYY-MM-DD' },
  showToday: { type: Boolean, default: true },
  columns: {
    type: Array,
    default: () => [
      { prop: 'name', label: '任务名称', width: 'auto' }
    ]
  }
})

const emit = defineEmits(['click', 'change', 'task-click'])

const views = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' }
]

const currentView = ref(props.defaultView)
const scale = ref(1)
const rootRef = ref(null)
const timelineRef = ref(null)
const timelineBodyRef = ref(null)
const sidebarBodyRef = ref(null)
const headerHeight = 60
const scrollLeft = ref(0)
const tooltipVisible = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipData = ref(null)

const dateRange = computed(() => {
  if (props.data.length === 0) {
    const today = new Date()
    return { start: new Date(today.getFullYear(), today.getMonth(), 1), end: new Date(today.getFullYear(), today.getMonth() + 2, 0) }
  }
  let minDate = null, maxDate = null
  const findDates = (tasks) => {
    tasks.forEach(task => {
      if (task.startDate) { const start = parseDate(task.startDate); if (!minDate || start < minDate) minDate = start }
      if (task.endDate) { const end = parseDate(task.endDate); if (!maxDate || end > maxDate) maxDate = end }
      if (task.children) findDates(task.children)
    })
  }
  findDates(props.data)
  if (!minDate || !maxDate) {
    const today = new Date()
    return { start: new Date(today.getFullYear(), today.getMonth(), 1), end: new Date(today.getFullYear(), today.getMonth() + 2, 0) }
  }
  const start = new Date(minDate); start.setDate(start.getDate() - 7)
  const end = new Date(maxDate); end.setDate(end.getDate() + 14)
  return { start, end }
})

const timelineWidth = computed(() => {
  const days = Math.ceil((dateRange.value.end - dateRange.value.start) / (1000 * 60 * 60 * 24))
  return days * props.dayWidth
})

function parseDate(dateStr) {
  if (!dateStr) return new Date()
  if (dateStr instanceof Date) return dateStr
  if (typeof dateStr !== 'string') return new Date()
  const parts = dateStr.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/)
  if (parts) return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]))
  return new Date(dateStr)
}

function getTimeX(date) {
  const diff = Math.ceil((date - dateRange.value.start) / (1000 * 60 * 60 * 24))
  return diff * props.dayWidth * scale.value
}

const timelineHeaders = computed(() => {
  const headers = []
  const { start, end } = dateRange.value
  const current = new Date(start)

  if (currentView.value === 'day') {
    let currentYear = null, currentMonth = null
    while (current <= end) {
      const y = current.getFullYear(), m = current.getMonth()
      if (y !== currentYear) { currentYear = y; headers.push({ year: y, yearLabel: `${y}年`, cells: [] }) }
      if (m !== currentMonth || headers[headers.length - 1].year !== y) {
        currentMonth = m
        headers[headers.length - 1].cells.push({ label: `${m + 1}月`, x: getTimeX(new Date(y, m, 1)), y: 0, width: getTimeX(new Date(y, m + 1, 1)) - getTimeX(new Date(y, m, 1)), height: 30, isWeekend: false })
      }
      current.setDate(current.getDate() + 1)
    }
    const days = []
    const dayCurrent = new Date(start)
    while (dayCurrent <= end) {
      const isWeekend = dayCurrent.getDay() === 0 || dayCurrent.getDay() === 6
      days.push({ label: dayCurrent.getDate().toString(), x: getTimeX(dayCurrent), y: 30, width: props.dayWidth * scale.value, height: 30, isWeekend })
      dayCurrent.setDate(dayCurrent.getDate() + 1)
    }
    return [{ year: headers[0]?.year, yearLabel: headers[0]?.yearLabel, cells: headers.flatMap(h => h.cells) }, { cells: days }]
  }

  if (currentView.value === 'week') {
    let currentYear = null, currentMonth = null, weekNum = 0
    while (current <= end) {
      const y = current.getFullYear(), m = current.getMonth()
      if (y !== currentYear) { currentYear = y; headers.push({ year: y, yearLabel: `${y}年`, cells: [] }) }
      if (m !== currentMonth || headers[headers.length - 1].year !== y) {
        currentMonth = m
        headers[headers.length - 1].cells.push({ label: `${y}年${m + 1}月`, x: getTimeX(new Date(y, m, 1)), y: 0, width: getTimeX(new Date(y, m + 1, 1)) - getTimeX(new Date(y, m, 1)), height: 30, isWeekend: false })
      }
      headers[headers.length - 1].cells.push({ label: `第${++weekNum}周`, x: getTimeX(current), y: 30, width: 7 * props.dayWidth * scale.value, height: 30, isWeekend: false })
      current.setDate(current.getDate() + 7)
    }
    return headers
  }

  if (currentView.value === 'month') {
    let currentYear = null
    while (current <= end) {
      const y = current.getFullYear(), m = current.getMonth()
      if (y !== currentYear) { currentYear = y; headers.push({ year: y, yearLabel: `${y}年`, cells: [] }) }
      // 单层结构：直接显示"2026年4月"
      headers[headers.length - 1].cells.push({ label: `${y}年${m + 1}月`, x: getTimeX(new Date(y, m, 1)), y: 0, width: getTimeX(new Date(y, m + 1, 1)) - getTimeX(new Date(y, m, 1)), height: 30, isWeekend: false })
      current.setMonth(current.getMonth() + 1)
    }
    return headers
  }
  return []
})

const flatTasks = computed(() => {
  const result = []
  const flatten = (tasks, level = 0) => {
    tasks.forEach(task => {
      result.push({ ...task, level, expanded: task.expanded !== false, collapsed: task.expanded === false })
      if (task.children && task.children.length > 0 && result[result.length - 1].expanded) flatten(task.children, level + 1)
    })
  }
  flatten(props.data)
  return result
})

const todayX = computed(() => {
  if (!props.showToday) return -1
  const today = new Date()
  if (today < dateRange.value.start || today > dateRange.value.end) return -1
  return getTimeX(today)
})

function getTaskById(id) {
  const findTask = (tasks) => {
    for (const task of tasks) {
      if (task.id === id) return task
      if (task.children) { const found = findTask(task.children); if (found) return found }
    }
    return null
  }
  return findTask(props.data)
}

// 依赖线颜色数组
const depColors = ['#4f6ef7', '#f7c94f', '#4fe07c', '#f74f6e', '#9f4ff7', '#4fd1f7', '#f74f9f', '#4ff7c9']

// 根据依赖 ID 获取颜色
function getDepColor(depId) {
  const str = String(depId)
  const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return depColors[hash % depColors.length]
}

// ─────────────────────────────────────────────────
//  角使用记录（每次渲染前由外部 resetCornerUsage 清空）
// ─────────────────────────────────────────────────
const cornerUsage = new Map() // taskId -> Set<corner>

function resetCornerUsage() {
  cornerUsage.clear()
}

function isCornerUsed(taskId, corner) {
  return cornerUsage.get(taskId)?.has(corner) ?? false
}

function useCorner(taskId, corner) {
  if (!cornerUsage.has(taskId)) cornerUsage.set(taskId, new Set())
  cornerUsage.get(taskId).add(corner)
}

function getUnusedCorners(taskId) {
  const all = ['tl', 'tr', 'bl', 'br']
  const used = cornerUsage.get(taskId)
  return used ? all.filter(c => !used.has(c)) : [...all]
}

// ─────────────────────────────────────────────────
//  几何辅助
// ─────────────────────────────────────────────────

// 获取 bar 真实像素矩形（不含行空白），用于碰撞检测
// 向内收缩 1px，避免"恰好在边框上"被判为穿柱
function getBarRect(taskIndex) {
  const task = flatTasks.value[taskIndex]
  if (!task || !task.startDate) return null

  if (task.isMilestone) {
    const cx = getTimeX(parseDate(task.startDate))
    const cy = taskIndex * props.rowHeight + props.rowHeight / 2
    return { x1: cx - 9, x2: cx + 9, y1: cy - 9, y2: cy + 9 }
  }

  if (!task.endDate) return null

  const x1 = getTimeX(parseDate(task.startDate)) + 1   // 向内 1px
  const x2 = getTimeX(parseDate(task.endDate))  - 1
  const rawTop = taskIndex * props.rowHeight + (props.rowHeight - props.barHeight) / 2
  const y1 = rawTop + 1
  const y2 = rawTop + props.barHeight - 1

  return { x1, x2, y1, y2 }
}

// 获取四角坐标（角点正好在边框外 1px，避免连线一出发就触碰边框）
function getTaskCorners(taskIndex) {
  const task = flatTasks.value[taskIndex]
  if (!task || !task.startDate) return null

  if (task.isMilestone) {
    const x = getTimeX(parseDate(task.startDate))
    const cy = taskIndex * props.rowHeight + props.rowHeight / 2
    // 里程碑上下各 10px，左右取同一 x（菱形顶底）
    return {
      tl: { x: x - 1, y: cy - 10 },
      tr: { x: x + 1, y: cy - 10 },
      bl: { x: x - 1, y: cy + 10 },
      br: { x: x + 1, y: cy + 10 },
    }
  }

  if (!task.endDate) return null

  const startX = getTimeX(parseDate(task.startDate))
  const endX   = getTimeX(parseDate(task.endDate))
  const rawTop  = taskIndex * props.rowHeight + (props.rowHeight - props.barHeight) / 2
  const topY    = rawTop               // bar 顶边
  const bottomY = rawTop + props.barHeight // bar 底边

  // 角点往外偏移 1px，让线不贴边框
  return {
    tl: { x: startX - 1, y: topY    },
    tr: { x: endX   + 1, y: topY    },
    bl: { x: startX - 1, y: bottomY },
    br: { x: endX   + 1, y: bottomY },
  }
}

// 检测一条正交线段是否穿过矩形（严格，边框也算）
// eps: 允许的浮点误差（角点外偏 1px 后，端点不再在边框上）
function segmentHitsRect(x1, y1, x2, y2, rect, eps = 0.5) {
  if (!rect) return false

  // 水平线段
  if (Math.abs(y1 - y2) < 0.01) {
    const lx = Math.min(x1, x2), rx = Math.max(x1, x2)
    // y 在矩形内
    if (y1 > rect.y1 - eps && y1 < rect.y2 + eps) {
      // x 范围有实质重叠（允许端点恰好落在边框外 eps 内）
      if (rx > rect.x1 + eps && lx < rect.x2 - eps) return true
    }
    return false
  }

  // 垂直线段
  if (Math.abs(x1 - x2) < 0.01) {
    const ty = Math.min(y1, y2), by = Math.max(y1, y2)
    if (x1 > rect.x1 - eps && x1 < rect.x2 + eps) {
      if (by > rect.y1 + eps && ty < rect.y2 - eps) return true
    }
    return false
  }

  return false
}

// 检查折线路径是否穿过任意非排除柱子
function pathHitsAnyBar(points, excludeIds) {
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i], p2 = points[i + 1]
    for (let j = 0; j < flatTasks.value.length; j++) {
      if (excludeIds.includes(flatTasks.value[j].id)) continue
      const rect = getBarRect(j)
      if (!rect) continue
      if (segmentHitsRect(p1.x, p1.y, p2.x, p2.y, rect)) return true
    }
  }
  return false
}

function manhattanLen(pts) {
  let s = 0
  for (let i = 0; i < pts.length - 1; i++) {
    s += Math.abs(pts[i].x - pts[i+1].x) + Math.abs(pts[i].y - pts[i+1].y)
  }
  return s
}

// ─────────────────────────────────────────────────
//  路径候选生成
//  策略：以"不穿任何柱子"为硬约束，生成多条候选路径，
//  选代价（路径长度）最小的；全部失败则逐步加大绕行距离
// ─────────────────────────────────────────────────

/**
 * 从 start 到 end 生成一条 Z 形路径，途经中间 midX 纵向转折。
 * start/end 角点已外偏 1px，不会贴边框。
 */
function makePath(start, end, midX) {
  // 直接三折：start.x→midX 水平, midX 纵向, midX→end.x 水平
  return [
    { x: start.x, y: start.y },
    { x: midX,    y: start.y },
    { x: midX,    y: end.y   },
    { x: end.x,   y: end.y   },
  ]
}

/**
 * 针对两个任务生成多条候选路径：
 *  - 右绕：midX = max(depEndX, taskEndX) + gap
 *  - 左绕：midX = min(depStartX, taskStartX) - gap
 *  gap 从 20 开始，如果穿柱则逐步增大
 */
function candidatePaths(sc, ec, startCorners, endCorners, depStartX, depEndX, taskStartX, taskEndX) {
  const s = startCorners[sc]
  const e = endCorners[ec]
  const rightBase = Math.max(depEndX, taskEndX)
  const leftBase  = Math.min(depStartX, taskStartX)

  const paths = []

  // 右绕候选（gap 20 / 50 / 100）
  for (const gap of [20, 50, 100]) {
    paths.push(makePath(s, e, rightBase + gap))
  }
  // 左绕候选
  for (const gap of [20, 50, 100]) {
    paths.push(makePath(s, e, leftBase - gap))
  }

  return paths
}

// ─────────────────────────────────────────────────
//  clearCornerUsage 供模板调用（保持兼容）
// ─────────────────────────────────────────────────
function clearCornerUsage() {
  // 模板中每个任务的 dependencies 渲染前会调用此函数
  // 这里只清空当前渲染任务关联的角，不清全局，
  // 全局在 getDependencyPaths 收集时自己管理。
  // 此函数留空即可，全局重置由 resetCornerUsage 在计算属性中完成。
}

// ─────────────────────────────────────────────────
//  主函数：生成依赖连线 SVG path 字符串
// ─────────────────────────────────────────────────
function getDependencyPath(task, depTask, taskIndex) {
  if (!depTask || !depTask.endDate || !task.startDate) return ''

  const depTaskIndex = flatTasks.value.findIndex(t => t.id === depTask.id)
  if (depTaskIndex === -1) return ''

  const startCorners = getTaskCorners(depTaskIndex)
  const endCorners   = getTaskCorners(taskIndex)
  if (!startCorners || !endCorners) return ''

  const depStartX  = getTimeX(parseDate(depTask.startDate))
  const depEndX    = getTimeX(parseDate(depTask.endDate))
  const taskStartX = getTimeX(parseDate(task.startDate))
  const taskEndX   = getTimeX(parseDate(task.endDate))

  const excludeIds = [depTask.id, task.id]

  // 候选起点/终点角（优先未使用）
  const startUnused = getUnusedCorners(depTask.id)
  const endUnused   = getUnusedCorners(task.id)
  const startCandidates = startUnused.length > 0 ? startUnused : ['tl', 'tr', 'bl', 'br']
  const endCandidates   = endUnused.length   > 0 ? endUnused   : ['tl', 'tr', 'bl', 'br']

  let bestPath = null
  let bestSC = null, bestEC = null
  let bestCost = Infinity

  for (const sc of startCandidates) {
    for (const ec of endCandidates) {
      const candidates = candidatePaths(sc, ec, startCorners, endCorners, depStartX, depEndX, taskStartX, taskEndX)
      for (const pts of candidates) {
        if (!pathHitsAnyBar(pts, excludeIds)) {
          const cost = manhattanLen(pts)
          if (cost < bestCost) {
            bestCost = cost
            bestPath = pts
            bestSC = sc
            bestEC = ec
          }
        }
      }
    }
  }

  // 极端 fallback：超大绕行（200px），必有一条不穿柱子
  if (!bestPath) {
    const rightFar = Math.max(depEndX, taskEndX) + 200
    const leftFar  = Math.min(depStartX, taskStartX) - 200
    const sc = startCandidates[0], ec = endCandidates[0]
    const s = startCorners[sc], e = endCorners[ec]
    for (const midX of [rightFar, leftFar]) {
      const pts = makePath(s, e, midX)
      if (!pathHitsAnyBar(pts, excludeIds)) {
        bestPath = pts; bestSC = sc; bestEC = ec; break
      }
    }
    // 若仍为空（理论不会），强制用右绕
    if (!bestPath) {
      bestPath = makePath(s, e, rightFar)
      bestSC = sc; bestEC = ec
    }
  }

  // 记录已使用的角
  useCorner(depTask.id, bestSC)
  useCorner(task.id,    bestEC)

  // 转为 SVG path
  let d = `M ${bestPath[0].x} ${bestPath[0].y}`
  for (let i = 1; i < bestPath.length; i++) {
    d += ` L ${bestPath[i].x} ${bestPath[i].y}`
  }
  return d
}

function getMilestonePoints(taskIndex) {
  const task = flatTasks.value[taskIndex]
  const x = getTimeX(parseDate(task?.startDate))
  const y = taskIndex * props.rowHeight + props.rowHeight / 2
  const size = 10
  return `${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}`
}

function toggleTask(task) { task.expanded = !task.expanded; emit('change', flatTasks.value) }
function getColumnStyle(col, index, task = null) {
  const style = {}
  // 第一列特殊处理：带层级缩进
  if (index === 0) {
    style.paddingLeft = ((task?.level || 0) * 20 + 8) + 'px'
    style.flex = '1'
    style.minWidth = '0'
  } else {
    // 其他列：支持固定宽度或 auto
    if (col.width && col.width !== 'auto') {
      style.width = typeof col.width === 'number' ? col.width + 'px' : col.width
      style.flex = '0 0 ' + style.width
    } else {
      style.flex = '1'
    }
  }
  // 对齐方式
  if (col.align) {
    style.justifyContent = col.align === 'left' ? 'flex-start' : col.align === 'right' ? 'flex-end' : 'center'
  }
  return style
}
function getHeaderColumnStyle(col, index) {
  const style = {}
  // 第一列
  if (index === 0) {
    style.flex = '1'
    style.minWidth = '0'
  } else {
    // 其他列
    if (col.width && col.width !== 'auto') {
      style.width = typeof col.width === 'number' ? col.width + 'px' : col.width
      style.flex = '0 0 ' + style.width
    } else {
      style.flex = '1'
    }
  }
  return style
}
function zoomIn() { scale.value = Math.min(scale.value + 0.25, 3) }
function zoomOut() { scale.value = Math.max(scale.value - 0.25, 0.5) }
function showTooltip(event, task) {
  tooltipData.value = task
  // 使用 fixed 定位，直接基于视口坐标
  tooltipX.value = event.clientX + 15
  tooltipY.value = event.clientY - 10
  tooltipVisible.value = true
}
function hideTooltip() { tooltipVisible.value = false }
function handleBarClick(task) { emit('task-click', task); emit('click', task) }
function onTimelineScroll(e) {
  scrollLeft.value = e.target.scrollLeft
  // 同步头部水平滚动
  const header = timelineRef.value?.querySelector('.xly-gantt__timeline-header')
  if (header) header.scrollLeft = e.target.scrollLeft
}
function onTimelineBodyScroll(e) {
  // 同步左侧任务列表垂直滚动
  if (sidebarBodyRef.value) {
    sidebarBodyRef.value.scrollTop = e.target.scrollTop
  }
}
function onSidebarScroll(e) {
  // 同步右侧时间轴垂直滚动
  if (timelineBodyRef.value) {
    timelineBodyRef.value.scrollTop = e.target.scrollTop
  }
}
function scrollToToday() {
  if (timelineRef.value && todayX.value > 0) {
    const header = timelineRef.value.querySelector('.xly-gantt__timeline-header')
    const body = timelineRef.value.querySelector('.xly-gantt__timeline-body')
    const containerWidth = header ? header.clientWidth : timelineRef.value.clientWidth
    if (header) header.scrollLeft = todayX.value - containerWidth / 2
    if (body) body.scrollLeft = todayX.value - containerWidth / 2
  }
}
function scrollToDate(date) {
  if (timelineRef.value) {
    const x = getTimeX(parseDate(date))
    const header = timelineRef.value.querySelector('.xly-gantt__timeline-header')
    const containerWidth = header ? header.clientWidth : timelineRef.value.clientWidth
    header.scrollLeft = x - containerWidth / 2
  }
}

defineExpose({ scrollToToday, scrollToDate, zoomIn, zoomOut })

onMounted(() => { nextTick(() => { scrollToToday() }) })
watch(() => props.data, () => { nextTick(() => { scrollToToday() }) }, { deep: true })
</script>

<style scoped lang="scss">
// 现代极简配色 - 苹果/Figma风格
$xly-primary: #5e5ce6;       // 靛蓝紫
$xly-primary-light: #7b7aff;
$xly-primary-bg: rgba(94, 92, 230, 0.08);
$xly-success: #30d158;       // 翠绿
$xly-success-light: #4be075;
$xly-success-bg: rgba(48, 209, 88, 0.1);
$xly-warning: #ff9f0a;       // 琥珀橙
$xly-warning-light: #ffb340;
$xly-warning-bg: rgba(255, 159, 10, 0.1);
$xly-danger: #ff453a;        // 珊瑚红
$xly-danger-light: #ff6961;
$xly-danger-bg: rgba(255, 69, 58, 0.1);
$xly-info: #64d2ff;          // 天蓝
$xly-info-light: #8bdbff;
$xly-info-bg: rgba(100, 210, 255, 0.1);
$xly-border: #e5e5ea;
$xly-border-light: #f2f2f7;
$xly-bg: #ffffff;
$xly-bg-subtle: #f5f5f7;
$xly-text: #1c1c1e;
$xly-text-secondary: #636366;
$xly-text-tertiary: #aeaeb2;

.xly-gantt {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: $xly-bg;
  font-size: 13px;
  color: $xly-text;
  border: 1px solid $xly-border;
  width: v-bind(width);
  height: v-bind(height);

  // 现代白色头部
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background: $xly-bg;
    border-bottom: 1px solid $xly-border;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: $xly-text;
    letter-spacing: -0.2px;

    svg { color: $xly-primary; }
  }

  &__actions { display: flex; align-items: center; gap: 16px; }

  // 极简按钮组
  &__view-switch {
    display: flex;
    background: $xly-bg-subtle;
    border-radius: 10px;
    padding: 4px;
    gap: 2px;

    button {
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: $xly-text-secondary;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &.is-active {
        background: $xly-bg;
        color: $xly-text;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
      }

      &:hover:not(.is-active) {
        color: $xly-text;
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }

  &__zoom {
    display: flex;
    align-items: center;
    gap: 4px;

    button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: $xly-text-secondary;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        background: $xly-primary-bg;
        color: $xly-primary;
      }

      &:disabled { opacity: 0.3; cursor: not-allowed; }
    }
  }

  &__zoom-level {
    font-size: 12px;
    color: $xly-text-tertiary;
    min-width: 40px;
    text-align: center;
    font-weight: 500;
  }

  &__body {
    display: flex;
    overflow: hidden;
    height: calc(100% - 60px);
  }

  &__sidebar {
    flex-shrink: 0;
    border-right: 1px solid $xly-border;
    background: $xly-bg;
    display: flex;
    flex-direction: column;

    &.is-auto {
      flex: 0 0 auto;
      max-width: 70%;
    }
  }

  &__sidebar-header {
    display: flex;
    height: 52px;
    border-bottom: 1px solid $xly-border;
    background: $xly-bg-subtle;
    overflow: hidden;
  }

  &__sidebar-header-cell {
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-weight: 600;
    color: $xly-text;
    font-size: 12px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    border-right: 1px solid $xly-border-light;
    white-space: nowrap;

    &:last-child { border-right: none; }
  }

  &__sidebar-body {
    flex: 1;
    overflow-y: auto;
    background: $xly-bg;

    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
      background: $xly-border;
      border-radius: 3px;
      &:hover { background: $xly-text-tertiary; }
    }
  }

  &__task-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $xly-border-light;
    transition: all 0.15s ease;
    position: relative;

    &.is-group {
      font-weight: 600;
      background: $xly-bg-subtle;
    }

    &.is-milestone {
      .xly-gantt__task-name { color: $xly-warning; font-weight: 500; }
      .xly-gantt__task-icon { color: $xly-warning; }
    }

    &:hover { background: $xly-primary-bg; }
  }

  &__task-cell {
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 100%;
    border-right: 1px solid $xly-border-light;
    overflow: hidden;

    &:last-child { border-right: none; }

    &.is-first {
      gap: 8px;
      padding-right: 8px;
    }
  }

  &__toggle {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    border-radius: 6px;
    color: $xly-text-tertiary;
    cursor: pointer;
    padding: 0;
    transition: all 0.15s;

    &:hover {
      background: $xly-primary-bg;
      color: $xly-primary;
    }
  }

  &__task-icon {
    display: flex;
    align-items: center;
    color: $xly-text-tertiary;
  }

  &__task-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $xly-text;
    font-size: 13px;
  }

  &__timeline {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: $xly-bg;
  }

  &__timeline-header {
    flex-shrink: 0;
    overflow-x: auto;
    overflow-y: hidden;
    background: $xly-bg;

    &::-webkit-scrollbar { display: none; }
  }

  &__timeline-body {
    flex: 1;
    overflow: auto;
    background: $xly-bg;
  }

  &__svg-header { display: block; }
  &__svg-body { display: block; }

  &__header-year { font-size: 12px; font-weight: 600; fill: $xly-text; letter-spacing: -0.2px; }

  &__header-cell {
    stroke: $xly-border-light;
    stroke-width: 1;

    &.is-weekend { fill: $xly-bg-subtle; }
  }

  &__header-text { font-size: 11px; fill: $xly-text-secondary; font-weight: 500; letter-spacing: 0.2px; }

  &__today-line { stroke: $xly-danger; stroke-width: 1.5; stroke-dasharray: 4 2; opacity: 0.8; }

  &__today-label { font-size: 11px; fill: $xly-danger; font-weight: 600; letter-spacing: 0.3px; }

  &__row-bg {
    &.is-even { fill: $xly-bg-subtle; }
    &.is-weekend { fill: $xly-bg-subtle; }
  }

  &__row-border { stroke: $xly-border-light; stroke-width: 1; }

  // 扁平化任务条
  &__bar {
    cursor: pointer;
    transition: filter 0.15s ease, opacity 0.15s ease;

    &:hover {
      filter: brightness(1.1);
    }

    &.is-default { fill: $xly-primary; }
    &.is-success { fill: $xly-success; }
    &.is-warning { fill: $xly-warning; }
    &.is-danger { fill: $xly-danger; }
    &.is-info { fill: $xly-info; }
  }

  &__bar-progress { fill: rgba(255, 255, 255, 0.35); pointer-events: none; }

  &__bar-progress-text { font-size: 10px; fill: #fff; font-weight: 600; letter-spacing: 0.2px; }

  &__milestone {
    cursor: pointer;
    transition: filter 0.15s ease;

    &.is-default { fill: $xly-primary; }
    &.is-success { fill: $xly-success; }
    &.is-warning { fill: $xly-warning; }
    &.is-danger { fill: $xly-danger; }
    &.is-info { fill: $xly-info; }

    &:hover { filter: brightness(1.15); }
  }

  &__dependency { fill: none; stroke: #aeaeb2; stroke-width: 1.5; marker-end: url(#body-arrowhead); }

  // 极简Tooltip
  &__tooltip {
    position: fixed;
    z-index: 99999;
    background: $xly-text;
    border-radius: 12px;
    color: #fff;
    font-size: 12px;
    pointer-events: none;
    min-width: 160px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  &__tooltip-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-weight: 600;
    font-size: 13px;
  }

  &__tooltip-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;

    &.is-default { background: rgba($xly-primary-light, 0.3); color: $xly-primary-light; }
    &.is-success { background: $xly-success-bg; color: $xly-success-light; }
    &.is-warning { background: $xly-warning-bg; color: $xly-warning-light; }
    &.is-danger { background: $xly-danger-bg; color: $xly-danger-light; }
    &.is-info { background: $xly-info-bg; color: $xly-info-light; }
  }

  &__tooltip-body { padding: 10px 14px; }

  &__tooltip-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    gap: 16px;

    .label { color: rgba(255, 255, 255, 0.5); font-size: 11px; }
    .value { font-weight: 500; font-size: 12px; }
    .value-progress { color: $xly-success-light; font-weight: 600; }
  }
}

.xly-gantt-fade-enter-active, .xly-gantt-fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.xly-gantt-fade-enter-from, .xly-gantt-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
