<template>
  <div class="xly-tree-chat" ref="containerRef">
    <!-- 控制栏 -->
    <div v-if="showToolbar" class="xly-tree-chat__toolbar">
      <div class="xly-tree-chat__toolbar-left">
        <slot name="toolbar" />
      </div>
      <div class="xly-tree-chat__toolbar-right">
        <!-- 布局切换 -->
        <button
          class="xly-tree-chat__btn"
          :class="{ 'is-active': internalLayout === 'horizontal' }"
          title="横向布局"
          @click="setLayout('horizontal')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="6" y="3" width="4" height="18" rx="1" />
            <rect x="14" y="3" width="4" height="12" rx="1" />
          </svg>
        </button>
        <button
          class="xly-tree-chat__btn"
          :class="{ 'is-active': internalLayout === 'vertical' }"
          title="竖向布局"
          @click="setLayout('vertical')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="6" width="18" height="4" rx="1" />
            <rect x="3" y="14" width="12" height="4" rx="1" />
          </svg>
        </button>
        <div class="xly-tree-chat__divider" />
        <!-- 缩放控制 -->
        <button class="xly-tree-chat__btn" title="缩小" @click="zoomOut">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <span class="xly-tree-chat__zoom-text">{{ Math.round(scale * 100) }}%</span>
        <button class="xly-tree-chat__btn" title="放大" @click="zoomIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button class="xly-tree-chat__btn" title="重置视图" @click="resetView">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 画布容器 -->
    <div
      class="xly-tree-chat__canvas-wrapper"
      ref="canvasWrapperRef"
      :class="{ 'is-panning': isPanning }"
      :style="canvasWrapperStyle"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      @wheel.prevent="onWheel"
      @contextmenu.prevent
    >
      <!-- 画布内容 -->
      <div
        class="xly-tree-chat__canvas"
        ref="canvasRef"
        :style="canvasStyle"
      >
        <!-- SVG 连接线层 -->
        <svg
          class="xly-tree-chat__lines"
          ref="linesSvgRef"
          :width="canvasWidth"
          :height="canvasHeight"
          :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
        >
          <g v-for="link in connectionLines" :key="link.id">
            <path
              :d="link.path"
              :stroke="link.color"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="square"
            />
          </g>
        </svg>

        <!-- 递归渲染树节点 -->
        <div class="xly-tree-chat__root" :class="`xly-tree-chat__root--${internalLayout}`">
          <TreeNode
            v-for="(node, index) in data"
            :key="getNodeKey(node, index)"
            :node="node"
            :node-config="mergedNodeConfig"
            :layout="internalLayout"
            :level="0"
            :colors="colors"
            :default-expand-all="defaultExpandAll"
            :expanded-keys="currentExpandedKeys"
            :expandable="expandable"
            @node-click="handleNodeClick"
            @toggle-expand="handleToggleExpand"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="isEmpty" class="xly-tree-chat__empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import TreeNode from './tree-node.vue'

// ========== 类型定义 ==========
export interface TreeChatNode {
  /** 节点唯一标识 */
  id: string | number
  /** 节点显示文字 */
  label: string
  /** 子节点 */
  children?: TreeChatNode[]
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义颜色 */
  color?: string
  /** 展开状态 */
  expanded?: boolean
  /** 额外数据 */
  [key: string]: any
}

export interface NodeConfig {
  /** 节点宽度 */
  nodeWidth?: number
  /** 节点最小高度 */
  nodeMinHeight?: number
  /** 水平间距 */
  horizontalGap?: number
  /** 垂直间距 */
  verticalGap?: number
  /** 连接线颜色 */
  lineColor?: string
  /** 连接线宽度 */
  lineWidth?: number
  /** 节点唯一标识字段 */
  keyField?: string
  /** 子节点字段名 */
  childrenField?: string
  /** 标题字段名 */
  titleField?: string
  /** 描述字段名 */
  descField?: string
  /** 头像字段名 */
  avatarField?: string
}

// 连接线类型
interface ConnectionLine {
  id: string
  path: string
  color: string
}

const props = withDefaults(defineProps<{
  /** 树形数据 */
  data?: TreeChatNode[]
  /** 节点配置 */
  nodeConfig?: NodeConfig
  /** 布局方向 */
  layout?: 'horizontal' | 'vertical'
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean
  /** 受控展开的节点 keys（不传则使用内部状态） */
  expandedKeys?: (string | number)[]
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 自定义颜色列表 */
  colors?: string[]
  /** 最小缩放比例 */
  minScale?: number
  /** 最大缩放比例 */
  maxScale?: number
  /** 是否启用展开收起功能 */
  expandable?: boolean
  /** 背景色 */
  backgroundColor?: string
  /** 是否显示网格背景 */
  showGrid?: boolean
  /** 网格颜色 */
  gridColor?: string
  /** 画布宽度 */
  width?: number | string
  /** 画布高度 */
  height?: number | string
}>(), {
  data: () => [],
  nodeConfig: () => ({}),
  layout: 'horizontal',
  defaultExpandAll: true,
  expandedKeys: null,
  showToolbar: true,
  colors: () => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'],
  minScale: 0.3,
  maxScale: 3,
  expandable: true,
  backgroundColor: '#ffffff',
  showGrid: true,
  gridColor: '#f1f2f5',
  width: '100%',
  height: '100%',
})

const emit = defineEmits<{
  /** 节点点击 */
  'node-click': [node: TreeChatNode, nodePath: TreeChatNode[]]
  /** 展开/收起 */
  'toggle-expand': [node: TreeChatNode, expanded: boolean]
  /** 更新展开的 keys（受控模式） */
  'update:expandedKeys': [keys: (string | number)[]]
}>()

defineOptions({ name: 'XlyTreeChart' })

// ========== 响应式状态 ==========
const containerRef = ref<HTMLElement | null>(null)
const canvasWrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)
const linesSvgRef = ref<SVGSVGElement | null>(null)

// 缩放和平移
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

// 画布尺寸
const canvasWidth = ref(2000)
const canvasHeight = ref(2000)

// 内部布局状态
const internalLayout = ref<'horizontal' | 'vertical'>(props.layout ?? 'horizontal')

// 拖拽状态
const isPanning = ref(false)
const startX = ref(0)
const startY = ref(0)
const startTranslateX = ref(0)
const startTranslateY = ref(0)

// 内部展开状态
const internalExpandedKeys = ref<Set<string | number>>(new Set())

// 连接线
const connectionLines = ref<ConnectionLine[]>([])

// ========== 计算属性 ==========
const isEmpty = computed(() => !props.data || props.data.length === 0)

const canvasStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transformOrigin: '0 0',
}))

// 画布容器背景样式
const canvasWrapperStyle = computed(() => {
  const style: any = {
    backgroundColor: props.backgroundColor,
  }
  if (props.showGrid) {
    style.backgroundImage = `linear-gradient(${props.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${props.gridColor} 1px, transparent 1px)`
    style.backgroundSize = '20px 20px'
    style.backgroundPosition = 'center center'
  }
  return style
})

const mergedNodeConfig = computed(() => ({
  nodeWidth: props.nodeConfig?.nodeWidth ?? 160,
  nodeMinHeight: props.nodeConfig?.nodeMinHeight ?? 48,
  horizontalGap: props.nodeConfig?.horizontalGap ?? 60,
  verticalGap: props.nodeConfig?.verticalGap ?? 24,
  lineColor: props.nodeConfig?.lineColor ?? '#94a3b8',
  lineWidth: props.nodeConfig?.lineWidth ?? 1.5,
  keyField: props.nodeConfig?.keyField ?? 'id',
  childrenField: props.nodeConfig?.childrenField ?? 'children',
  titleField: props.nodeConfig?.titleField ?? 'label',
  descField: props.nodeConfig?.descField ?? 'desc',
  avatarField: props.nodeConfig?.avatarField ?? 'avatar',
}))

// 获取当前展开状态
const currentExpandedKeys = computed(() => {
  // 如果外部传入了 expandedKeys（非 null），使用外部状态（受控模式）
  if (props.expandedKeys !== null && props.expandedKeys !== undefined) {
    return new Set(props.expandedKeys)
  }
  // 否则使用内部状态（非受控模式）
  return internalExpandedKeys.value
})

// ========== 方法 ==========
function getNodeKey(node: TreeChatNode, index: number): string {
  return String(node.id ?? `node-${index}`)
}

function setLayout(newLayout: 'horizontal' | 'vertical') {
  internalLayout.value = newLayout
  resetView()
  nextTick(() => updateConnectionLines())
}

function zoomIn() {
  const newScale = Math.min(props.maxScale, scale.value * 1.2)
  scale.value = Math.round(newScale * 100) / 100
}

function zoomOut() {
  const newScale = Math.max(props.minScale, scale.value / 1.2)
  scale.value = Math.round(newScale * 100) / 100
}

function resetView() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function onWheel(e: WheelEvent) {
  if (e.ctrlKey || e.metaKey) {
    // Mac 上是 ctrlKey 或 metaKey
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.max(props.minScale, Math.min(props.maxScale, scale.value * delta))
    scale.value = Math.round(newScale * 100) / 100
  } else {
    // 普通滚动，平移画布
    translateX.value -= e.deltaX || 0
    translateY.value -= e.deltaY || 0
  }
}

function onMouseDown(e: MouseEvent) {
  if (e.button === 0) {
    isPanning.value = true
    startX.value = e.clientX
    startY.value = e.clientY
    startTranslateX.value = translateX.value
    startTranslateY.value = translateY.value
  }
}

function onMouseMove(e: MouseEvent) {
  if (isPanning.value) {
    const dx = e.clientX - startX.value
    const dy = e.clientY - startY.value
    translateX.value = startTranslateX.value + dx
    translateY.value = startTranslateY.value + dy
  }
}

function onMouseUp() {
  isPanning.value = false
}

function handleNodeClick(node: TreeChatNode, nodePath: TreeChatNode[]) {
  emit('node-click', node, nodePath)
}

function handleToggleExpand(node: TreeChatNode, expanded: boolean) {
  emit('toggle-expand', node, expanded)

  const key = node.id
  const newKeys = new Set(currentExpandedKeys.value)

  if (expanded) {
    newKeys.add(key)
  } else {
    newKeys.delete(key)
  }

  // 如果是受控模式，通过 emit 更新
  if (props.expandedKeys !== null && props.expandedKeys !== undefined) {
    emit('update:expandedKeys', Array.from(newKeys))
  } else {
    internalExpandedKeys.value = newKeys
  }

  // 延迟更新连接线，等待 DOM 完全渲染
  nextTick(() => {
    requestAnimationFrame(() => {
      setTimeout(() => updateConnectionLines(), 50)
    })
  })
}

// 更新连接线
function updateConnectionLines() {
  if (!canvasRef.value) return

  const lines: ConnectionLine[] = []
  const canvas = canvasRef.value
  const canvasRect = canvas.getBoundingClientRect()
  const lineColor = mergedNodeConfig.value.lineColor || '#94a3b8'

  // 更新画布尺寸
  const rootEl = canvas.querySelector('.xly-tree-chat__root') as HTMLElement
  if (rootEl) {
    const rootRect = rootEl.getBoundingClientRect()
    canvasWidth.value = Math.max(2000, rootRect.width + 80)
    canvasHeight.value = Math.max(2000, rootRect.height + 80)
  }

  // 递归收集所有父子关系
  const collectConnections = (wrapper: Element, parentRect?: DOMRect) => {
    const treeNode = wrapper.querySelector('.tree-node') as HTMLElement

    if (!treeNode) return

    const nodeRect = treeNode.getBoundingClientRect()

    // 获取子节点容器
    const childrenContainer = wrapper.querySelector('.tree-children') as HTMLElement

    // 计算相对于画布的坐标
    const nodeLeft = nodeRect.left - canvasRect.left
    const nodeTop = nodeRect.top - canvasRect.top
    const nodeRight = nodeLeft + nodeRect.width
    const nodeBottom = nodeTop + nodeRect.height
    const nodeCenterX = nodeLeft + nodeRect.width / 2
    const nodeCenterY = nodeTop + nodeRect.height / 2


    // 获取子节点包装器
    const childWrappers = childrenContainer?.querySelectorAll(':scope > .tree-node-wrapper') || []

    if (childWrappers.length > 0 && internalLayout.value === 'vertical') {
      // 竖向布局
      const startX = nodeCenterX
      const startY = nodeBottom

      // 获取所有子节点位置
      const childPositions: { x: number; y: number; centerX: number }[] = []
      childWrappers.forEach((childWrapper) => {
        const childNode = childWrapper.querySelector('.tree-node') as HTMLElement
        if (childNode) {
          const childRect = childNode.getBoundingClientRect()
          childPositions.push({
            x: childRect.left - canvasRect.left,
            y: childRect.top - canvasRect.top,
            centerX: childRect.left - canvasRect.left + childRect.width / 2,
          })
        }
      })

      if (childPositions.length === 1) {
        // 单个子节点：直接画 L 形线
        const child = childPositions[0]
        const midY = startY + 18
        lines.push({
          id: `line-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${startX} ${startY} L ${startX} ${midY} L ${child.centerX} ${midY} L ${child.centerX} ${child.y}`,
          color: lineColor,
        })
      } else if (childPositions.length > 1) {
        // 多个子节点
        const firstChild = childPositions[0]
        const lastChild = childPositions[childPositions.length - 1]
        const midY = startY + 18

        // 从父节点到中间水平线
        lines.push({
          id: `line-v-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${startX} ${startY} L ${startX} ${midY}`,
          color: lineColor,
        })

        // 水平线连接所有子节点
        lines.push({
          id: `line-h-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${firstChild.centerX} ${midY} L ${lastChild.centerX} ${midY}`,
          color: lineColor,
        })

        // 每个子节点的垂直线
        childPositions.forEach((child, idx) => {
          lines.push({
            id: `line-child-${wrapper.getAttribute('data-key') || Math.random()}-${idx}`,
            path: `M ${child.centerX} ${midY} L ${child.centerX} ${child.y}`,
            color: lineColor,
          })
        })
      }

      // 递归处理子节点
      childWrappers.forEach((childWrapper) => {
        collectConnections(childWrapper, nodeRect)
      })
    } else if (childWrappers.length > 0 && internalLayout.value === 'horizontal') {
      // 水平布局
      const startX = nodeRight
      const startY = nodeCenterY

      // 获取所有子节点位置
      const childPositions: { x: number; y: number; centerY: number }[] = []
      childWrappers.forEach((childWrapper) => {
        const childNode = childWrapper.querySelector('.tree-node') as HTMLElement
        if (childNode) {
          const childRect = childNode.getBoundingClientRect()
          childPositions.push({
            x: childRect.left - canvasRect.left,
            y: childRect.top - canvasRect.top,
            centerY: childRect.top - canvasRect.top + childRect.height / 2,
          })
        }
      })

      if (childPositions.length === 1) {
        // 单个子节点
        const child = childPositions[0]
        const midX = startX + 25
        lines.push({
          id: `line-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${child.centerY} L ${child.x} ${child.centerY}`,
          color: lineColor,
        })
      } else if (childPositions.length > 1) {
        // 多个子节点
        const firstChild = childPositions[0]
        const lastChild = childPositions[childPositions.length - 1]
        const midX = startX + 25

        // 从父节点到中间垂直线
        lines.push({
          id: `line-h-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${startX} ${startY} L ${midX} ${startY}`,
          color: lineColor,
        })

        // 垂直线连接所有子节点
        lines.push({
          id: `line-v-${wrapper.getAttribute('data-key') || Math.random()}`,
          path: `M ${midX} ${firstChild.centerY} L ${midX} ${lastChild.centerY}`,
          color: lineColor,
        })

        // 每个子节点的水平线
        childPositions.forEach((child, idx) => {
          lines.push({
            id: `line-child-${wrapper.getAttribute('data-key') || Math.random()}-${idx}`,
            path: `M ${midX} ${child.centerY} L ${child.x} ${child.centerY}`,
            color: lineColor,
          })
        })
      }

      // 递归处理子节点
      childWrappers.forEach((childWrapper) => {
        collectConnections(childWrapper, nodeRect)
      })
    }
  }

  // 从根节点开始收集
  const rootWrappers = canvas.querySelectorAll('.xly-tree-chat__root > .tree-node-wrapper')
  rootWrappers.forEach((wrapper) => {
    collectConnections(wrapper)
  })

  connectionLines.value = lines
}

// ========== 生命周期 ==========
onMounted(() => {
  // 初始化时展开所有或指定的节点
  if (props.defaultExpandAll) {
    const expandAll = (nodes: TreeChatNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          internalExpandedKeys.value.add(node.id)
          expandAll(node.children)
        }
      })
    }
    expandAll(props.data)
  }

  // 等待节点渲染后更新连接线
  nextTick(() => {
    requestAnimationFrame(() => {
      updateConnectionLines()
    })
  })

  // 监听窗口大小变化
  window.addEventListener('resize', updateConnectionLines)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateConnectionLines)
})

// 监听数据变化
watch(() => props.data, () => {
  if (props.defaultExpandAll) {
    internalExpandedKeys.value.clear()
    const expandAll = (nodes: TreeChatNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          internalExpandedKeys.value.add(node.id)
          expandAll(node.children)
        }
      })
    }
    expandAll(props.data)
  }
  nextTick(() => {
    requestAnimationFrame(() => {
      updateConnectionLines()
    })
  })
}, { deep: true })

// 监听展开状态变化
watch(() => [...currentExpandedKeys.value], () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      setTimeout(() => updateConnectionLines(), 50)
    })
  })
})

// ========== 暴露方法 ==========
defineExpose({
  zoomIn,
  zoomOut,
  resetView,
  setLayout,
})
</script>

<style scoped lang="scss">
$xly-tree-chat-prefix: '.xly-tree-chat';

#{$xly-tree-chat-prefix} {
  display: flex;
  flex-direction: column;
  width: v-bind('props.width');
  height: v-bind('props.height');
  max-width: v-bind('typeof props.width === "number" ? props.width + "px" : props.width');
  max-height: v-bind('typeof props.height === "number" ? props.height + "px" : props.height');
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

// 工具栏
#{$xly-tree-chat-prefix}__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #f2f3f7;
  background: #fafbfd;
  flex-shrink: 0;
  gap: 8px;
}

#{$xly-tree-chat-prefix}__toolbar-left,
#{$xly-tree-chat-prefix}__toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

#{$xly-tree-chat-prefix}__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #71717a;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #f1f2f5;
    color: #1a1a2e;
  }

  &.is-active {
    background: #3b82f6;
    color: #fff;

    &:hover {
      background: #2563eb;
      color: #fff;
    }
  }

  svg {
    flex-shrink: 0;
  }
}

#{$xly-tree-chat-prefix}__zoom-text {
  min-width: 48px;
  text-align: center;
  font-size: 12px;
  color: #71717a;
  font-variant-numeric: tabular-nums;
}

#{$xly-tree-chat-prefix}__divider {
  width: 1px;
  height: 20px;
  background: #e4e4e7;
  margin: 0 4px;
}

// 画布容器
#{$xly-tree-chat-prefix}__canvas-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  cursor: grab;

  &.is-panning {
    cursor: grabbing;
  }
}

#{$xly-tree-chat-prefix}__canvas {
  position: relative;
  width: max-content;
  min-width: 100%;
  min-height: 100%;
}

#{$xly-tree-chat-prefix}__lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

#{$xly-tree-chat-prefix}__root {
  position: relative;
  padding: 40px;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;

  &--horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &--vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

// 空状态
#{$xly-tree-chat-prefix}__empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #a1a1aa;
  font-size: 14px;
  pointer-events: none;

  svg {
    opacity: 0.4;
  }
}
</style>
