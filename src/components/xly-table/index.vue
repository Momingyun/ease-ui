<template>
  <div class="xly-table" :class="tableClass">
    <!-- 工具栏 -->
    <div v-if="$slots.toolbar || title" class="xly-table__toolbar">
      <div class="xly-table__toolbar-left">
        <span v-if="title" class="xly-table__title">{{ title }}</span>
        <slot name="toolbar-left" />
      </div>
      <div class="xly-table__toolbar-right">
        <!-- 刷新按钮 -->
        <xly-button
          v-if="showRefresh"
          type="ghost"
          size="small"
          shape="circle"
          @click="handleRefresh"
        >
          <template #icon>
            <xly-icon name="el:Refresh" :size="16" />
          </template>
        </xly-button>
        <!-- 导出按钮 -->
        <xly-button
          v-if="showExport"
          type="ghost"
          size="small"
          shape="circle"
          @click="handleExport"
        >
          <template #icon>
            <xly-icon name="el:Download" :size="16" />
          </template>
        </xly-button>
        <!-- 列设置按钮 -->
        <xly-button
          v-if="showColumnSettings"
          type="ghost"
          size="small"
          shape="circle"
          @click="showColumnSettingsPanel = true"
        >
          <template #icon>
            <xly-icon name="el:Operation" :size="16" />
          </template>
        </xly-button>
        <slot name="toolbar" />
      </div>
    </div>

    <!-- 表格容器 -->
    <div class="xly-table__container" :style="containerStyle">
      <table class="xly-table__inner" :style="{ minWidth: tableMinWidth }">
        <!-- 表头 -->
        <thead class="xly-table__thead">
          <tr>
            <!-- 选择列 - 多选模式 -->
            <th v-if="selectable && selectionMode === 'multiple'" class="xly-table__th xly-table__th--selection">
              <label class="xly-table__checkbox">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate="isIndeterminate"
                  @change="handleSelectAll"
                />
                <span class="xly-table__checkbox-inner" />
              </label>
            </th>
            <!-- 选择列 - 单选模式 -->
            <th v-if="selectable && selectionMode === 'single'" class="xly-table__th xly-table__th--selection" />
            <!-- 序号列 -->
            <th v-if="showIndex" class="xly-table__th xly-table__th--index">
              {{ indexLabel }}
            </th>
            <!-- 数据列 -->
            <th
              v-for="col in visibleColumns"
              :key="col.prop"
              class="xly-table__th"
              :class="[
                col.align ? `xly-table__th--${col.align}` : '',
                col.sortable ? 'is-sortable' : '',
                sortState.key === col.prop ? 'is-sorted' : '',
                col.fixed ? `xly-table__th--fixed xly-table__th--fixed-${col.fixed}` : '',
              ]"
              :style="getColStyle(col)"
              @click="col.sortable ? handleSort(col.prop) : undefined"
            >
              <span class="xly-table__th-inner">
                <span class="xly-table__th-label">{{ col.name }}</span>
                <span v-if="col.sortable" class="xly-table__sort-icons">
                  <svg
                    class="xly-table__sort-icon"
                    :class="{
                      'is-active': sortState.key === col.prop && sortState.order === 'asc',
                    }"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                  >
                    <path d="M12 7l-5 5h10z" fill="currentColor" />
                  </svg>
                  <svg
                    class="xly-table__sort-icon"
                    :class="{
                      'is-active': sortState.key === col.prop && sortState.order === 'desc',
                    }"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                  >
                    <path d="M12 17l5-5H7z" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </th>
            <!-- 操作列 -->
            <th v-if="$slots.action" class="xly-table__th xly-table__th--action">
              {{ actionLabel }}
            </th>
          </tr>
        </thead>

        <!-- 表体 -->
        <tbody class="xly-table__tbody">
          <!-- 加载状态 -->
          <tr v-if="loading" class="xly-table__loading-row">
            <td :colspan="totalColCount">
              <div class="xly-table__loading">
                <div class="xly-table__loading-spinner">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="xly-table__loading-bar"
                    :style="{ animationDelay: `${i * 0.1}s` }"
                  ></div>
                </div>
                <span v-if="loadingText" class="xly-table__loading-text">{{ loadingText }}</span>
              </div>
            </td>
          </tr>

          <!-- 空状态 -->
          <tr v-else-if="displayData.length === 0" class="xly-table__empty-row">
            <td :colspan="totalColCount">
              <div class="xly-table__empty">
                <slot name="empty">
                  <svg
                    viewBox="0 0 80 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="xly-table__empty-icon"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="72"
                      height="46"
                      rx="4"
                      fill="#f5f7fa"
                      stroke="#e2e4ed"
                      stroke-width="1.5"
                    />
                    <rect
                      x="4"
                      y="10"
                      width="72"
                      height="14"
                      rx="4"
                      fill="#eef0f6"
                      stroke="#e2e4ed"
                      stroke-width="1.5"
                    />
                    <rect x="14" y="32" width="26" height="4" rx="2" fill="#dde0ea" />
                    <rect x="14" y="42" width="18" height="4" rx="2" fill="#dde0ea" />
                    <rect x="46" y="32" width="20" height="4" rx="2" fill="#dde0ea" />
                    <rect x="46" y="42" width="12" height="4" rx="2" fill="#dde0ea" />
                  </svg>
                  <p class="xly-table__empty-text">{{ emptyText }}</p>
                </slot>
              </div>
            </td>
          </tr>

          <!-- 数据行 -->
          <template v-else>
            <tr
              v-for="(row, rowIndex) in displayData"
              :key="rowIndex"
              class="xly-table__tr"
              :class="{
                'is-selected': isRowSelected(row),
                'is-stripe': stripe && rowIndex % 2 === 1,
                'is-clickable': rowClickable,
              }"
              @click="handleRowClick(row, rowIndex)"
            >
              <!-- 选择列 - 多选模式 -->
              <td v-if="selectable && selectionMode === 'multiple'" class="xly-table__td xly-table__td--selection">
                <label class="xly-table__checkbox" @click.stop>
                  <input
                    type="checkbox"
                    :checked="isRowSelected(row)"
                    @change="handleRowSelect(row)"
                  />
                  <span class="xly-table__checkbox-inner" />
                </label>
              </td>
              <!-- 选择列 - 单选模式 -->
              <td v-if="selectable && selectionMode === 'single'" class="xly-table__td xly-table__td--selection">
                <label class="xly-table__radio" @click.prevent="handleRowSelect(row)">
                  <span
                    class="xly-table__radio-inner"
                    :class="{ 'is-checked': isRowSelected(row) }"
                  />
                </label>
              </td>
              <!-- 序号列 -->
              <td v-if="showIndex" class="xly-table__td xly-table__td--index">
                {{ getRowIndex(rowIndex) }}
              </td>
              <!-- 数据列 -->
              <td
                v-for="col in visibleColumns"
                :key="col.prop"
                class="xly-table__td"
                :class="[
                  col.align ? `xly-table__td--${col.align}` : '',
                  col.fixed ? `xly-table__td--fixed xly-table__td--fixed-${col.fixed}` : '',
                ]"
                :style="getColStyle(col)"
              >
                <slot
                  :name="`col-${col.prop}`"
                  v-bind="{ row, col, value: getCellValue(row, col.prop), index: rowIndex }"
                >
                  <span
                    class="xly-table__cell-text"
                    :class="{ 'is-ellipsis': col.ellipsis }"
                    @mouseenter="
                      col.ellipsis &&
                      showCellTooltip($event, String(getCellValue(row, col.prop) ?? ''))
                    "
                    @mousemove="col.ellipsis && updateTooltipPosition($event)"
                    @mouseleave="col.ellipsis && hideCellTooltip()"
                    >{{ formatCell(row, col) }}</span
                  >
                </slot>
              </td>
              <!-- 操作列 -->
              <td v-if="$slots.action" class="xly-table__td xly-table__td--action">
                <slot name="action" v-bind="{ row, index: rowIndex }" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div
      v-if="pagination && total > 0"
      class="xly-table__pagination"
      :class="`xly-table__pagination--${props.paginationPosition}`"
    >
      <!-- 总数 -->
      <span class="xly-table__pagination-total">共 {{ total }} 条</span>

      <!-- 页码按钮 -->
      <div class="xly-table__pagination-pages">
        <button
          class="xly-table__page-btn xly-table__page-btn--prev"
          :disabled="currentPage <= 1"
          @click="handlePageChange(currentPage - 1)"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          v-for="p in pageNumbers"
          :key="p"
          class="xly-table__page-btn"
          :class="{ 'is-current': p === currentPage, 'is-ellipsis': p === '...' }"
          :disabled="typeof p === 'string'"
          @click="typeof p === 'number' && handlePageChange(p)"
        >
          <template v-if="typeof p === 'string'">···</template>
          <template v-else>{{ p }}</template>
        </button>

        <button
          class="xly-table__page-btn xly-table__page-btn--next"
          :disabled="currentPage >= totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <!-- 页码输入 -->
      <div v-if="showPageInput" class="xly-table__pagination-jump">
        <span>跳至</span>
        <input
          v-model.number="jumpPageInput"
          type="number"
          class="xly-table__pagination-input"
          :min="1"
          :max="totalPages"
          @keyup.enter="handleJumpPageEnter"
        />
        <span>页</span>
        <button class="xly-table__pagination-go" @click="handleJumpPage">Go</button>
      </div>

      <!-- 每页条数选择 -->
      <xly-select
        v-if="showPageSize"
        v-model="currentPageSize"
        :options="pageSizeSelectOptions"
        size="small"
        style="width: 120px"
        class="xly-table__page-size-select"
        @change="handlePageSizeChange"
      />
    </div>

    <!-- 列设置面板 -->
    <div
      v-if="showColumnSettingsPanel"
      class="xly-table__column-settings-overlay"
      @click="showColumnSettingsPanel = false"
    >
      <div class="xly-table__column-settings-panel" @click.stop>
        <div class="xly-table__column-settings-header">
          <h3>列设置</h3>
          <button class="xly-table__column-settings-close" @click="showColumnSettingsPanel = false">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="xly-table__column-settings-body">
          <div
            class="xly-table__column-settings-item"
            v-for="(col, index) in localColumns"
            :key="col.prop"
            :draggable="isColumnDraggable(col) && props.columnDraggable"
            @dragstart="handleDragStart($event, index)"
            @dragover="handleDragOver($event, index)"
            @drop="handleDrop($event, index)"
            @dragend="handleDragEnd"
            :class="{
              'is-dragging': dragState.draggingIndex === index,
              'is-drag-over': dragState.dragOverIndex === index,
              'is-disabled': !isColumnDraggable(col) || !props.columnDraggable,
            }"
          >
            <div
              class="xly-table__column-settings-drag-handle"
              :class="{ 'is-disabled': !isColumnDraggable(col) || !props.columnDraggable }"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="8" y1="6" x2="8" y2="6"></line>
                <line x1="8" y1="12" x2="8" y2="12"></line>
                <line x1="8" y1="18" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="6"></line>
                <line x1="16" y1="12" x2="16" y2="12"></line>
                <line x1="16" y1="18" x2="16" y2="18"></line>
              </svg>
            </div>
            <label class="xly-table__column-settings-label">
              <input
                type="checkbox"
                :checked="col.visible !== false"
                @change="handleColumnVisibleChange(col.prop, $event)"
              />
              <span>{{ col.name }}</span>
            </label>
          </div>
        </div>
        <div class="xly-table__column-settings-footer">
          <button class="xly-table__column-settings-btn--reset" @click="resetColumnVisibility">
            重置
          </button>
          <button
            class="xly-table__column-settings-btn--confirm"
            @click="showColumnSettingsPanel = false"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <!-- Ellipsis Tooltip -->
    <Teleport to="body">
      <Transition name="xly-tooltip-fade">
        <div
          v-if="tooltipState.visible"
          class="xly-table__tooltip"
          :style="{ left: tooltipState.x + 'px', top: tooltipState.y + 'px' }"
        >
          {{ tooltipState.content }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, useSlots, watch } from 'vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyIcon from '@/components/xly-icon/index.vue'

const slots = useSlots()

/* ====================================================
   Ellipsis Tooltip
==================================================== */
const tooltipState = reactive({
  visible: false,
  content: '',
  x: 0,
  y: 0,
})

function showCellTooltip(event: MouseEvent, content: string) {
  tooltipState.content = content
  tooltipState.x = event.clientX
  tooltipState.y = event.clientY
  tooltipState.visible = true
}

function hideCellTooltip() {
  tooltipState.visible = false
}

function updateTooltipPosition(event: MouseEvent) {
  tooltipState.x = event.clientX
  tooltipState.y = event.clientY
}

/* ====================================================
   类型定义
==================================================== */
export type TableAlign = 'left' | 'center' | 'right'
export type SortOrder = 'asc' | 'desc' | null

export interface TableColumn {
  /** 列唯一标识，也是数据字段的 key */
  prop: string
  /** 列标题 */
  name: string
  /** 列宽度 */
  width?: number | string
  /** 最小宽度 */
  minWidth?: number | string
  /** 文字对齐 */
  align?: TableAlign
  /** 是否可排序 */
  sortable?: boolean
  /** 超出文字是否省略 */
  ellipsis?: boolean
  /** 自定义格式化函数 */
  formatter?: (row: Record<string, any>, value: any) => string
  /** 是否显示该列 */
  visible?: boolean
  /** 列固定位置：'left' | 'right' | undefined */
  fixed?: 'left' | 'right'
  /** 是否可拖动排序 */
  drag?: boolean
  /** 列内容前缀 */
  prefix?: string
  /** 列内容后缀 */
  suffix?: string
}

export interface TableProps {
  /** 表格数据 */
  data?: Record<string, any>[]
  /** 列配置 */
  columns?: TableColumn[]
  /** 表格标题 */
  title?: string
  /** 是否加载中 */
  loading?: boolean
  /** 加载文字 */
  loadingText?: string
  /** 空数据文字 */
  emptyText?: string
  /** 是否显示斑马纹 */
  stripe?: boolean
  /** 是否显示边框 */
  border?: boolean
  /** 是否可选中行 */
  selectable?: boolean
  /** 是否显示序号 */
  showIndex?: boolean
  /** 序号列标题 */
  indexLabel?: string
  /** 操作列标题 */
  actionLabel?: string
  /** 表格最大高度（超出滚动） */
  maxHeight?: number | string
  /** 行 key 字段 */
  rowKey?: string
  /** 行是否可点击 */
  rowClickable?: boolean
  /** 是否显示分页 */
  pagination?: boolean
  /** 总数据量（服务端分页） */
  total?: number
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  pageSize?: number
  /** 是否显示每页条数选择 */
  showPageSize?: boolean
  /** 每页条数选项 */
  pageSizeOptions?: number[]
  /** 紧凑模式 */
  compact?: boolean
  /** 悬停行高亮 */
  highlight?: boolean
  /** 分页位置 */
  paginationPosition?: 'left' | 'center' | 'right'
  /** 是否显示页码输入框 */
  showPageInput?: boolean
  /** 是否显示列设置按钮 */
  showColumnSettings?: boolean
  /** 是否允许列拖动排序（默认 true） */
  columnDraggable?: boolean
  /** 是否显示刷新按钮 */
  showRefresh?: boolean
  /** 是否显示导出按钮 */
  showExport?: boolean
  /** 选择模式：multiple 多选，single 单选 */
  selectionMode?: 'multiple' | 'single'
}

/* ====================================================
   Props & Emits
==================================================== */
const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  loadingText: '加载中...',
  emptyText: '暂无数据',
  stripe: false,
  border: false,
  selectable: false,
  showIndex: true,
  indexLabel: '#',
  actionLabel: '操作',
  rowClickable: false,
  pagination: true,
  total: 0,
  page: 1,
  pageSize: 10,
  showPageSize: true,
  pageSizeOptions: () => [10, 20, 50, 100],
  compact: false,
  highlight: true,
  paginationPosition: 'right',
  showPageInput: true,
  showColumnSettings: false,
  columnDraggable: true,
  showRefresh: false,
  showExport: false,
  selectionMode: 'multiple',
})

const emit = defineEmits<{
  (e: 'selection-change', rows: Record<string, any>[]): void
  (e: 'row-click', row: Record<string, any>, index: number): void
  (e: 'sort-change', key: string, order: SortOrder): void
  (e: 'page-change', page: number): void
  (e: 'page-size-change', pageSize: number): void
  (e: 'column-order-change', columns: TableColumn[]): void
  (e: 'refresh'): void
  (e: 'export'): void
}>()

/* ====================================================
   刷新 & 导出
==================================================== */
function handleRefresh() {
  emit('refresh')
}

function handleExport() {
  emit('export')
}

/* ====================================================
   样式
==================================================== */
const tableClass = computed(() => ({
  'xly-table--border': props.border,
  'xly-table--stripe': props.stripe,
  'xly-table--compact': props.compact,
  'xly-table--highlight': props.highlight,
  'xly-table--loading': props.loading,
}))

const containerStyle = computed(() => {
  if (!props.maxHeight) {
    // 没有 maxHeight 时，只需要横向滚动
    return {
      overflowX: 'auto' as const,
    }
  }
  return {
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
    overflowY: 'auto' as const,
    overflowX: 'auto' as const,
  }
})

/* ====================================================
   列配置工具
==================================================== */
function getColStyle(col: TableColumn) {
  const style: Record<string, string> = {}
  if (col.width) {
    style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
    style.maxWidth = style.width // 限制最大宽度，确保 ellipsis 生效
  }
  if (col.minWidth)
    style.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
  return style
}

// 获取列的实际宽度（用于动态计算）
function getColumnActualWidth(col: TableColumn): number {
  if (col.width) {
    return typeof col.width === 'number' ? col.width : parseInt(col.width as string, 10)
  }
  // 如果没有设置宽度，使用 minWidth 或默认值
  if (col.minWidth) {
    return typeof col.minWidth === 'number' ? col.minWidth : parseInt(col.minWidth as string, 10)
  }
  return 0 // 0 表示 auto
}

// 本地列配置（用于响应式修改）
const localColumns = ref<TableColumn[]>([])

// 监听 props.columns 变化，同步到本地
watch(
  () => props.columns,
  (cols) => {
    localColumns.value = [...cols.map((col) => ({ ...col }))]
  },
  { immediate: true, deep: true },
)

// 可见列计算属性
const visibleColumns = computed(() => {
  return localColumns.value.filter((col) => col.visible !== false)
})

// 列设置面板状态
const showColumnSettingsPanel = ref(false)

// 拖动状态
const dragState = ref({
  draggingIndex: -1,
  dragOverIndex: -1,
})

// 判断列是否可拖动
function isColumnDraggable(col: TableColumn) {
  // 如果列明确设置了 drag，使用该设置；否则默认为 true
  return col.drag !== false
}

// 拖动开始
function handleDragStart(event: DragEvent, index: number) {
  dragState.value.draggingIndex = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

// 拖动经过
function handleDragOver(event: DragEvent, index: number) {
  event.preventDefault()
  if (dragState.value.draggingIndex !== index) {
    dragState.value.dragOverIndex = index
  }
}

// 放置
function handleDrop(event: DragEvent, targetIndex: number) {
  event.preventDefault()
  const sourceIndex = dragState.value.draggingIndex

  if (sourceIndex === -1 || sourceIndex === targetIndex) {
    return
  }

  // 交换列位置
  const [removed] = localColumns.value.splice(sourceIndex, 1)
  localColumns.value.splice(targetIndex, 0, removed)

  // 更新父组件的列配置
  emit('column-order-change', [...localColumns.value])

  dragState.value.draggingIndex = -1
  dragState.value.dragOverIndex = -1
}

// 拖动结束
function handleDragEnd() {
  dragState.value.draggingIndex = -1
  dragState.value.dragOverIndex = -1
}

// 保存原始可见性配置，用于重置
const originalColumnVisibility = ref<Record<string, boolean>>({})

// 初始化时保存原始配置
watch(
  () => props.columns,
  (cols) => {
    originalColumnVisibility.value = cols.reduce(
      (acc, col) => {
        acc[col.prop] = col.visible !== false
        return acc
      },
      {} as Record<string, boolean>,
    )
  },
  { immediate: true },
)

// 切换列显示/隐藏
function handleColumnVisibleChange(prop: string, event: Event) {
  const target = event.target as HTMLInputElement
  const col = localColumns.value.find((c) => c.prop === prop)
  if (col) {
    col.visible = target.checked
  }
}

// 重置列可见性
function resetColumnVisibility() {
  localColumns.value.forEach((col) => {
    col.visible = originalColumnVisibility.value[col.prop] !== false
  })
}

/* ====================================================
   总列数（用于 colspan）
==================================================== */
const totalColCount = computed(() => {
  let count = visibleColumns.value.length
  if (props.selectable) count++
  if (props.showIndex) count++
  return count
})

// 计算表格最小宽度（所有列宽度之和 + 额外列宽度），确保列宽不被压缩
const tableMinWidth = computed(() => {
  let total = 0
  for (const col of visibleColumns.value) {
    total += getColumnActualWidth(col)
  }
  // 额外列：选择列 56px、序号列 56px
  if (props.selectable) total += 56
  if (props.showIndex) total += 56
  // 操作列预估宽度
  if (slots.action) total += 120
  return total > 0 ? `${total}px` : undefined
})

/* ====================================================
   数据处理 & 排序
==================================================== */
const sortState = ref<{ key: string; order: SortOrder }>({ key: '', order: null })

function handleSort(key: string) {
  if (sortState.value.key !== key) {
    sortState.value = { key, order: 'asc' }
  } else if (sortState.value.order === 'asc') {
    sortState.value = { key, order: 'desc' }
  } else {
    sortState.value = { key: '', order: null }
  }
  emit('sort-change', sortState.value.key, sortState.value.order)
}

const sortedData = computed(() => {
  const { key, order } = sortState.value
  if (!key || !order) return [...props.data]

  return [...props.data].sort((a, b) => {
    const va = a[key]
    const vb = b[key]
    if (va == null && vb == null) return 0
    if (va == null) return 1
    if (vb == null) return -1
    if (typeof va === 'number' && typeof vb === 'number') {
      return order === 'asc' ? va - vb : vb - va
    }
    const sa = String(va)
    const sb = String(vb)
    return order === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa)
  })
})

/* ====================================================
   分页（前端分页）
==================================================== */
const currentPage = ref(props.page)
const currentPageSize = ref(props.pageSize)

watch(
  () => props.page,
  (v) => {
    currentPage.value = v
  },
)
watch(
  () => props.pageSize,
  (v) => {
    currentPageSize.value = v
  },
)

// 如果传入了 total（服务端分页），直接用 total；否则用数据长度
const total = computed(() => (props.total > 0 ? props.total : sortedData.value.length))
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / currentPageSize.value)))

const displayData = computed(() => {
  // 服务端分页：直接显示当前 data
  if (props.total > 0) return sortedData.value
  // 前端分页
  if (!props.pagination) return sortedData.value
  const start = (currentPage.value - 1) * currentPageSize.value
  return sortedData.value.slice(start, start + currentPageSize.value)
})

// 每页条数选择器的选项
const pageSizeSelectOptions = computed(() => {
  return props.pageSizeOptions.map((size) => ({
    value: size,
    label: `${size}条/页`,
  }))
})

function handlePageChange(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  emit('page-change', page)
}

function handlePageSizeChange(size: number) {
  currentPageSize.value = size
  currentPage.value = 1
  emit('page-size-change', size)
}

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | '...')[] = []

  if (total === 0) return pages

  // 总页数少，全部显示
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  // 始终显示第一页
  pages.push(1)

  // 如果当前页离第一页较远，显示省略号
  if (current > 3) {
    pages.push('...')
  } else {
    // 当前页靠近开头，显示 2 到 current+1
    for (let i = 2; i <= Math.min(3, current + 1); i++) {
      if (!pages.includes(i)) pages.push(i)
    }
  }

  // 显示当前页附近的页码
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) pages.push(i)
  }

  // 如果当前页离最后一页较远，显示省略号
  if (current < total - 2) {
    pages.push('...')
  } else {
    // 当前页靠近结尾，显示 total-2 到 total-1
    for (let i = Math.max(total - 2, current); i < total; i++) {
      if (!pages.includes(i)) pages.push(i)
    }
  }

  // 始终显示最后一页
  if (!pages.includes(total)) pages.push(total)

  return pages
})

const jumpPageInput = ref<number>(currentPage.value)
watch(
  () => currentPage.value,
  (newVal) => {
    jumpPageInput.value = newVal
  },
)

function handleJumpPage() {
  const page = Number(jumpPageInput.value)
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    handlePageChange(page)
  } else {
    jumpPageInput.value = currentPage.value
  }
}

function handleJumpPageEnter(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleJumpPage()
  }
}

/* ====================================================
   行选择
==================================================== */
const selectedRows = ref<Record<string, any>[]>([])
// 使用 Map 存储: key → row，key 为行唯一标识
const selectedMap = ref<Map<any, Record<string, any>>>(new Map())

// 获取行的唯一标识 key
function getRowKey(row: Record<string, any>) {
  return props.rowKey ? row[props.rowKey] : row
}

function isRowSelected(row: Record<string, any>) {
  return selectedMap.value.has(getRowKey(row))
}

const isAllSelected = computed(
  () => displayData.value.length > 0 && displayData.value.every((r) => selectedMap.value.has(getRowKey(r))),
)
const isIndeterminate = computed(
  () => displayData.value.some((r) => selectedMap.value.has(getRowKey(r))) && !isAllSelected.value,
)

function handleSelectAll(e: Event) {
  const isChecked = (e.target as HTMLInputElement).checked
  if (isChecked) {
    displayData.value.forEach((r) => {
      const key = getRowKey(r)
      if (!selectedMap.value.has(key)) {
        selectedMap.value.set(key, r)
      }
    })
  } else {
    displayData.value.forEach((r) => {
      selectedMap.value.delete(getRowKey(r))
    })
  }
  selectedRows.value = [...selectedMap.value.values()]
  emit('selection-change', [...selectedRows.value])
}

function handleRowSelect(row: Record<string, any>) {
  const key = getRowKey(row)
  if (selectedMap.value.has(key)) {
    selectedMap.value.delete(key)
  } else {
    if (props.selectionMode === 'single') {
      selectedMap.value.clear()
    }
    selectedMap.value.set(key, row)
  }
  selectedRows.value = [...selectedMap.value.values()]
  emit('selection-change', [...selectedRows.value])
}

/* ====================================================
   行点击
==================================================== */
function handleRowClick(row: Record<string, any>, index: number) {
  if (!props.rowClickable) return
  emit('row-click', row, index)
}

/* ====================================================
   行序号
==================================================== */
function getRowIndex(rowIndex: number) {
  if (!props.pagination) return rowIndex + 1
  return (currentPage.value - 1) * currentPageSize.value + rowIndex + 1
}

/* ====================================================
   单元格取值与格式化
==================================================== */
function getCellValue(row: Record<string, any>, prop: string) {
  // 支持 "a.b.c" 嵌套路径
  return prop.split('.').reduce((obj: any, k) => obj?.[k], row)
}

function formatCell(row: Record<string, any>, col: TableColumn) {
  const value = getCellValue(row, col.prop)
  if (col.formatter) return col.formatter(row, value)
  if (value == null) return '—'

  const formattedValue = String(value)
  const prefix = col.prefix || ''
  const suffix = col.suffix || ''

  return `${prefix}${formattedValue}${suffix}`
}

/* ====================================================
   暴露方法
==================================================== */
function clearSelection() {
  selectedRows.value = []
  emit('selection-change', [])
}

function getSelection() {
  return [...selectedRows.value]
}

defineExpose({ clearSelection, getSelection })
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$primary: #5e6ad2;
$primary-light: #f0f1ff;
$text-primary: #1a1a2e;
$text-regular: #4a4a6a;
$text-secondary: #8e8ea0;
$text-disabled: #c0c0d0;
$border-color: #f2f3f7;
$bg-header: #ffffff;
$bg-hover: #f8f9ff;
$bg-selected: #edeeff;
$radius-sm: 6px;
$radius-md: 8px;
$radius-lg: 16px;
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.02);
$shadow-md: 0 4px 20px rgba(94, 106, 210, 0.08);
$transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

/* ========== 容器 ========== */
.xly-table {
  background: #fff;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  box-shadow: $shadow-sm;
  font-size: 14px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', sans-serif;
  letter-spacing: 0;
  line-height: 1.5;
  overflow: hidden;

  &:hover {
    box-shadow: $shadow-md;
  }

  &--border {
    .xly-table__th,
    .xly-table__td {
      border-right: 1px solid $border-color;

      &:last-child {
        border-right: none;
      }
    }
  }

  &--compact {
    .xly-table__th,
    .xly-table__td {
      padding: 10px 14px;
      font-size: 13px;
    }
  }

  &--loading {
    opacity: 0.5;
    pointer-events: none;
  }
}

/* ========== 工具栏 ========== */
.xly-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #fff;
}

.xly-table__toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.xly-table__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.xly-table__title {
  font-size: 17px;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: -0.02em;
}

/* ========== 容器 ========== */
.xly-table__container {
  overflow-x: auto;
  overflow-y: auto;
}

/* ========== 表格主体 ========== */
.xly-table__inner {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

/* ========== 表头 ========== */
.xly-table__thead {
  position: sticky;
  top: 0;
  z-index: 2;
}

.xly-table__th {
  padding: 14px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: $text-regular;
  background: $bg-header;
  border-bottom: 1px solid $border-color;
  border-right: none;
  white-space: nowrap;
  user-select: none;
  line-height: 1.5;
  letter-spacing: 0;
  position: relative;

  &:last-child {
    border-right: none;
  }

  &--center {
    text-align: center;
  }
  &--right {
    text-align: right;
  }

  &--selection,
  &--index {
    width: 56px;
    text-align: center;
    color: $text-secondary;
  }

  &--action {
    text-align: center;
    white-space: nowrap;
  }

  &.is-sortable {
    cursor: pointer;
    transition: $transition;
    &:hover {
      color: $primary;
      background: $bg-hover;
    }
  }

  &.is-sorted {
    color: $primary;
  }
}

.xly-table__th-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* ========== 排序图标 ========== */
.xly-table__sort-icons {
  display: inline-flex;
  flex-direction: column;
  gap: -2px;
  margin-left: 4px;
}

.xly-table__sort-icon {
  display: block;
  color: $text-disabled;
  font-size: 8px;
  line-height: 1;
  transition: $transition;

  &.is-active {
    color: $primary;
  }
}

/* ========== 行 ========== */
.xly-table__tr {
  transition: $transition;
  cursor: default;

  &:hover {
    background: $bg-hover;
  }

  .xly-table--highlight &:hover {
    background: $bg-hover;
  }

  &.is-stripe {
    background: #fafbfc;
  }

  &.is-selected {
    background: $bg-selected !important;
  }

  &.is-clickable {
    cursor: pointer;
  }
}

/* ========== 单元格 ========== */
.xly-table__td {
  padding: 14px 20px;
  color: $text-regular;
  border-bottom: 1px solid $border-color;
  border-right: none;
  vertical-align: middle;
  line-height: 1.5;
  transition: $transition;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  background: transparent;

  &:last-child {
    border-right: none;
  }

  &--center {
    text-align: center;
  }
  &--right {
    text-align: right;
  }

  &--selection,
  &--index {
    text-align: center;
    color: $text-secondary;
    font-size: 13px;
    width: 56px;
    font-variant-numeric: tabular-nums;
  }

  &--action {
    text-align: center;
    white-space: nowrap;
  }
}

.xly-table__cell-text {
  &.is-ellipsis {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 100%;
  }
}

/* ========== 复选框 ========== */
.xly-table__checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 18px;
  height: 18px;

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .xly-table__checkbox-inner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1.5px solid #d0d5dc;
    border-radius: 4px;
    background: #fff;
    transition: $transition;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 9px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
    }
  }

  input:checked ~ .xly-table__checkbox-inner {
    background-color: $primary;
    border-color: $primary;
    &::after {
      display: block;
    }
  }

  input:indeterminate ~ .xly-table__checkbox-inner {
    background-color: $primary;
    border-color: $primary;
    &::after {
      display: block;
      top: 7px;
      left: 3px;
      width: 10px;
      height: 0;
      transform: none;
      border-width: 2px 0 0 0;
    }
  }

  &:hover .xly-table__checkbox-inner {
    border-color: $primary;
  }
}

/* 单选按钮 */
.xly-table__radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .xly-table__radio-inner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1.5px solid #d0d5dc;
    border-radius: 50%;
    background: #fff;
    transition: $transition;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      transform: translate(-50%, -50%);
    }

    &.is-checked {
      background-color: $primary;
      border-color: $primary;
      &::after {
        display: block;
      }
    }
  }

  &:hover .xly-table__radio-inner {
    border-color: $primary;
  }
}

/* ========== 加载状态 ========== */
.xly-table__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: $text-secondary;
}

.xly-table__loading-spinner {
  display: flex;
  align-items: center;
  gap: 6px;
}

.xly-table__loading-bar {
  width: 4px;
  height: 28px;
  border-radius: 2px;
  background: $primary;
  animation: xly-loading-wave 1s ease-in-out infinite;
  opacity: 0.6;
}

.xly-table__loading-text {
  font-size: 14px;
  color: $text-secondary;
}

@keyframes xly-loading-wave {
  0%,
  100% {
    transform: scaleY(0.4);
    opacity: 0.4;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* ========== 空状态 ========== */
.xly-table__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 16px;
}

.xly-table__empty-icon {
  width: 120px;
  height: 90px;
  opacity: 0.25;
}

.xly-table__empty-text {
  color: $text-secondary;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
}

/* ========== 分页 ========== */
.xly-table__pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #fff;

  &--left {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }
}

.xly-table__pagination-total {
  font-size: 13px;
  color: $text-secondary;
  font-weight: 500;
  white-space: nowrap;
}

.xly-table__pagination-pages {
  display: flex;
  align-items: center;
  gap: 6px;
}

.xly-table__page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid $border-color;
  background: #fff;
  color: $text-regular;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;
  user-select: none;

  &:hover:not(:disabled):not(.is-current):not(.is-ellipsis) {
    border-color: $primary;
    color: $primary;
    background: $primary-light;
  }

  &--prev,
  &--next {
    padding: 0 12px;
  }

  &.is-current {
    background: $primary;
    border-color: $primary;
    color: #fff;
    font-weight: 600;
  }

  &.is-ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    color: $text-secondary;
    font-size: 18px;
    letter-spacing: 3px;
    font-weight: 600;
    min-width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 1 !important;
    padding: 0 2px;
  }

  &:disabled:not(.is-ellipsis) {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.xly-table__page-size-select {
  width: 100px;
  min-width: 100px;
}

.xly-table__pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: $text-regular;
  margin-left: 16px;
}

.xly-table__pagination-input {
  width: 50px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid $border-color;
  border-radius: 6px;
  font-size: 14px;
  color: $text-regular;
  text-align: center;
  outline: none;
  transition: $transition;
  font-weight: 500;

  &:hover,
  &:focus {
    border-color: $primary;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(94, 106, 210, 0.1);
  }
}

.xly-table__pagination-go {
  height: 36px;
  padding: 0 16px;
  border: 1px solid $border-color;
  border-radius: 6px;
  background: #fff;
  color: $text-regular;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;

  &:hover {
    border-color: $primary;
    color: $primary;
  }

  &:active {
    transform: scale(0.98);
  }
}

/* ========== 列设置 ========== */

.xly-table__column-settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: xly-fade-in 0.2s ease;
}

@keyframes xly-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.xly-table__column-settings-panel {
  background: #fff;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  width: 400px;
  max-width: 90vw;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  animation: xly-slide-up 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes xly-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.xly-table__column-settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid $border-color;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
  }
}

.xly-table__column-settings-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: $text-secondary;
  cursor: pointer;
  border-radius: $radius-sm;
  transition: $transition;

  &:hover {
    background: #f5f5f5;
    color: $text-regular;
  }
}

.xly-table__column-settings-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 24px;
}

.xly-table__column-settings-item {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: $transition;
  border-radius: $radius-sm;

  &:hover:not(.is-disabled) {
    background: $bg-hover;
  }

  &.is-dragging {
    opacity: 0.5;
  }

  &.is-drag-over {
    background: $primary-light;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.xly-table__column-settings-drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: $text-disabled;
  cursor: move;
  transition: $transition;

  &:hover:not(.is-disabled) {
    color: $primary;
  }

  &:active:not(.is-disabled) {
    cursor: grabbing;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}

.xly-table__column-settings-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: $text-regular;
  user-select: none;
  flex: 1;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: $primary;
    cursor: pointer;
  }

  span {
    flex: 1;
  }
}

.xly-table__column-settings-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid $border-color;
}

.xly-table__column-settings-btn--reset,
.xly-table__column-settings-btn--confirm {
  padding: 8px 20px;
  border-radius: $radius-md;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;
  border: 1px solid transparent;
}

.xly-table__column-settings-btn--reset {
  background: #fff;
  color: $text-regular;
  border-color: $border-color;

  &:hover {
    border-color: $primary;
    color: $primary;
  }
}

.xly-table__column-settings-btn--confirm {
  background: $primary;
  color: #fff;

  &:hover {
    background: #4a54b8;
  }
}

/* ========== 列固定 ========== */
.xly-table__th--fixed,
.xly-table__td--fixed {
  position: sticky;
  z-index: 1;
  background: #fff;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: $border-color;
  }

  &.xly-table__th--fixed-left,
  &.xly-table__td--fixed-left {
    left: 0;

    &::after {
      right: -1px;
    }
  }

  &.xly-table__th--fixed-right,
  &.xly-table__td--fixed-right {
    right: 0;

    &::after {
      left: -1px;
    }
  }
}

.xly-table__th--fixed {
  z-index: 3;
}

/* ========== Ellipsis Tooltip ========== */
.xly-table__tooltip {
  position: fixed;
  z-index: 9999;
  max-width: 320px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #fff;
  background: rgba(30, 30, 40, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-all;
  pointer-events: none;
  transform: translate(12px, -50%);

  // 右侧溢出时翻转到左侧
  &.xly-tooltip-fade-enter-active,
  &.xly-tooltip-fade-leave-active {
    transition: opacity 0.15s ease;
  }

  &.xly-tooltip-fade-enter-from,
  &.xly-tooltip-fade-leave-to {
    opacity: 0;
  }
}
</style>
