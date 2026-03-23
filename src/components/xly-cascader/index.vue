<template>
  <div class="xly-cascader" :class="[`xly-cascader--${size}`, { 'is-disabled': disabled, 'is-focus': panelVisible }]">
    <!-- 触发器 -->
    <div
      ref="triggerRef"
      class="xly-cascader__wrapper"
      :class="{ 'is-hover': hovering && !disabled, 'has-tags': multiple && selectedLabels.length > 0 }"
      @click="togglePanel"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 多选标签 -->
      <div v-if="multiple && selectedLabels.length" ref="tagsContainerRef" class="xly-cascader__tags">
        <span
          v-for="(tag, i) in visibleLabels"
          :key="i"
          :ref="el => setTagRef(el, i)"
          class="xly-cascader__tag"
        >
          {{ tag }}
          <span class="xly-cascader__tag-close" @click.stop="removeSelected(i)">
            <XlyIcon name="el:Close" :size="12" />
          </span>
        </span>
        <span v-if="hiddenCount > 0" class="xly-cascader__tag xly-cascader__tag--count">+{{ hiddenCount }}</span>
      </div>

      <!-- 单选显示 -->
      <span v-else class="xly-cascader__value" :class="{ 'is-placeholder': !selectedLabels.length }">
        {{ displayLabel }}
      </span>

      <!-- 后缀 -->
      <span class="xly-cascader__suffix">
        <span v-if="clearable && hasValue && !disabled" class="xly-cascader__clear" @click.stop="clear">
          <XlyIcon name="el:Close" />
        </span>
        <XlyIcon name="el:ArrowDown" class="xly-cascader__arrow" :class="{ 'is-reverse': panelVisible }" />
      </span>
    </div>

    <!-- 下拉面板 -->
    <Teleport to="body">
      <Transition name="xly-cascader-zoom">
        <div
          v-if="panelVisible"
          ref="panelRef"
          class="xly-cascader__panel"
          :style="panelStyle"
          @mousedown.prevent
        >
          <!-- 搜索框 -->
          <div v-if="filterable" class="xly-cascader__search">
            <input
              ref="searchRef"
              v-model="searchQuery"
              class="xly-cascader__search-input"
              placeholder="搜索..."
              @input="handleSearch"
            />
          </div>

          <!-- 搜索结果模式 -->
          <div v-if="filterable && searchQuery" class="xly-cascader__search-results">
            <div
              v-for="(result, idx) in searchResults"
              :key="idx"
              class="xly-cascader__search-item"
              :class="{ 'is-selected': isSearchResultSelected(result.path) }"
              @click="selectSearchResult(result)"
            >
              <span v-if="multiple" class="xly-cascader__search-check">
                <XlyIcon v-if="isSearchResultSelected(result.path)" name="el:Check" />
              </span>
              <span class="xly-cascader__search-path">
                <span v-for="(label, li) in result.pathLabels" :key="li">
                  {{ label }}<span v-if="li < result.pathLabels.length - 1" class="xly-cascader__search-sep"> / </span>
                </span>
              </span>
            </div>
            <div v-if="searchResults.length === 0" class="xly-cascader__empty">{{ props.loading ? '加载中...' : '暂无数据' }}</div>
          </div>

          <!-- 级联菜单模式 -->
          <div v-else class="xly-cascader__menu">
            <div
              v-for="(menu, level) in activeMenus"
              :key="level"
              class="xly-cascader__menu-list"
            >
              <div
                v-for="(node, idx) in menu"
                :key="getNodeKey(node)"
                class="xly-cascader__menu-item"
                :class="[
                  {
                    'is-active': isNodeInActivePath(node, level),
                    'is-disabled': node.disabled,
                    'is-loading': node._loading,
                  },
                  getMenuNodeClass(node, level),
                ]"
                :style="getMenuNodeStyle(node, level)"
                @mouseenter="handleNodeHover(node, level)"
              >
                <!-- 多选模式：勾选框用于选择 -->
                <span
                  v-if="multiple"
                  class="xly-cascader__menu-checkbox"
                  @click.stop="handleCheckboxClick(node, level)"
                >
                  <XlyIcon v-if="isNodeChecked(node)" name="el:Check" />
                </span>
                <!-- 文本区域：多选模式下点击展开下一级，单选模式下点击直接选择 -->
                <span
                  class="xly-cascader__menu-label"
                  @click="multiple ? handleNodeClick(node, level) : handleNodeClickAndSelect(node, level)"
                >
                  {{ node[labelKey] }}
                </span>
                <XlyIcon v-if="!isLeaf(node)" name="el:ArrowRight" class="xly-cascader__menu-arrow" />
                <span v-if="node._loading" class="xly-cascader__menu-loading">...</span>
              </div>
              <div v-if="menu.length === 0" class="xly-cascader__empty">暂无数据</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

export interface CascaderNode {
  [key: string]: any
}

export interface CascaderProps {
  modelValue?: (string | number)[] | (string | number)[][] | any[][]
  options?: CascaderNode[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  maxTagCount?: number
  size?: 'large' | 'default' | 'small'
  /** 级联层级，默认不限制（根据 children 自动展开） */
  maxLevel?: number
  /** 懒加载回调，接收节点和回调函数 */
  lazyLoad?: (node: CascaderNode, callback: (children: CascaderNode[]) => void) => void
  /** 展开/关闭子菜单的触发方式，'click' 或 'hover'，默认 'click' */
  expandTrigger?: 'click' | 'hover'
  /** 相邻两级菜单是否展开时收起其他菜单，默认 false */
  accordion?: boolean
  /** 是否可以选择任意层级节点，默认 false（只能选叶子节点） */
  checkStrictly?: boolean
  /** 选项值对应的字段名，默认 'value' */
  valueKey?: string
  /** 选项标签对应的字段名，默认 'label' */
  labelKey?: string
  /** 子节点字段名，默认 'children' */
  childrenKey?: string
  /** 是否启用远程搜索，需配合 remoteMethod 使用 */
  remote?: boolean
  /** 远程搜索方法，接收搜索关键字作为参数 */
  remoteMethod?: (query: string) => void
  /** 是否显示加载中状态 */
  loading?: boolean
  /** 远程搜索防抖延迟（毫秒），默认 300 */
  debounce?: number
  /** 多选时返回值的类型，'array' 返回二维数组，'string' 返回逗号分隔的字符串，默认 'array' */
  valueType?: 'array' | 'string'
  /** 多选且 valueType='string' 时的分隔符，默认 ',' */
  separator?: string
  /** 菜单项自定义类名，可以是字符串或函数。如果是函数，接收当前节点和层级作为参数，返回类名字符串
   * @example
   * // 字符串形式：所有菜单项应用相同样式类
   * <xly-cascader :menu-node-class="'custom-menu-item'" />
   *
   * @example
   * // 函数形式：根据节点数据动态应用样式类
   * <xly-cascader :menu-node-class="(node, level) => node.value === 'special' ? 'highlight-item' : ''" />
   *
   * @example
   * // 根据层级应用不同样式类
   * <xly-cascader :menu-node-class="(node, level) => level === 0 ? 'first-level' : 'sub-level'" />
   */
  menuNodeClass?: string | ((node: CascaderNode, level: number) => string)
  /** 菜单项自定义样式，可以是字符串或函数。如果是函数，接收当前节点和层级作为参数，返回样式字符串
   * @example
   * // 字符串形式：所有菜单项应用相同样式
   * <xly-cascader :menu-node-style="'color: red; font-weight: bold;'" />
   *
   * @example
   * // 函数形式：根据节点数据动态应用样式
   * <xly-cascader :menu-node-style="(node, level) => node.value === 'special' ? 'color: #ff4d4f;' : ''" />
   *
   * @example
   * // 根据层级应用不同样式
   * <xly-cascader :menu-node-style="(node, level) => level === 0 ? 'font-size: 15px;' : 'font-size: 14px;'" />
   *
   * @example
   * // 根据节点属性应用样式
   * <xly-cascader :menu-node-style="(node, level) => node.disabled ? 'color: #ccc; cursor: not-allowed;' : ''" />
   */
  menuNodeStyle?: string | ((node: CascaderNode, level: number) => string)
}

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  filterable: false,
  multiple: false,
  maxTagCount: 3,
  size: 'default',
  maxLevel: undefined,
  lazyLoad: undefined,
  expandTrigger: 'click',
  accordion: false,
  checkStrictly: false,
  valueKey: 'value',
  labelKey: 'label',
  childrenKey: 'children',
  remote: false,
  remoteMethod: undefined,
  loading: false,
  debounce: 300,
  valueType: 'array',
  separator: ',',
  menuNodeClass: undefined,
  menuNodeStyle: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[] | (string | number)[][]): void
  (e: 'change', value: (string | number)[] | (string | number)[][]): void
  (e: 'expand-change', value: (string | number)[]): void
  (e: 'search', query: string): void
}>()

const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)
const tagsContainerRef = ref<HTMLElement | null>(null)
const tagRefs = ref<(HTMLElement | null)[]>([])
const panelVisible = ref(false)
const hovering = ref(false)
const tick = ref(0)
const searchQuery = ref('')
const remoteOptions = ref<CascaderNode[]>([])
const visibleLabelCount = ref(0)
const hiddenCount = computed(() => Math.max(0, selectedLabels.value.length - visibleLabelCount.value))
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let calcTimeout: ReturnType<typeof setTimeout> | null = null

// 活跃的菜单列表（每级一个数组）
const activeMenus = ref<CascaderNode[][]>([])

// 当前展开的路径节点（用于高亮）
const activePathNodes = ref<CascaderNode[]>([])

// 搜索结果
const searchResults = ref<{ path: (string | number)[], pathLabels: string[] }[]>([])

// ========== 工具函数 ==========

function getNodeKey(node: CascaderNode) {
  return `${node[props.valueKey]}_${node[props.labelKey]}`
}

// 获取菜单节点自定义类名
function getMenuNodeClass(node: CascaderNode, level: number): string {
  if (typeof props.menuNodeClass === 'function') {
    return props.menuNodeClass(node, level)
  }
  return props.menuNodeClass || ''
}

// 获取菜单节点自定义样式
function getMenuNodeStyle(node: CascaderNode, level: number): string {
  if (typeof props.menuNodeStyle === 'function') {
    return props.menuNodeStyle(node, level)
  }
  return props.menuNodeStyle || ''
}

// 设置标签引用
function setTagRef(el: any, index: number) {
  if (el) {
    tagRefs.value[index] = el
  }
}

// 计算可见标签数量
function calculateVisibleLabels() {
  // 清除之前的计算定时器
  if (calcTimeout) {
    clearTimeout(calcTimeout)
  }

  // 延迟计算，等待 DOM 更新完成
  calcTimeout = setTimeout(() => {
    if (!tagsContainerRef.value || selectedLabels.value.length === 0) {
      visibleLabelCount.value = selectedLabels.value.length
      return
    }

    const container = tagsContainerRef.value
    const containerWidth = container.clientWidth
    const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft)
    const paddingRight = parseFloat(getComputedStyle(container).paddingRight)
    const availableWidth = containerWidth - paddingLeft - paddingRight - 20 // 20px for suffix space

    let totalWidth = 0
    let count = 0
    let hasUnrenderedTag = false

    for (let i = 0; i < selectedLabels.value.length; i++) {
      const tag = tagRefs.value[i]
      if (!tag) {
        // 标签未渲染，暂时显示全部
        hasUnrenderedTag = true
        break
      }

      const tagWidth = tag.offsetWidth

      // 计算是否需要显示 +N 标签
      const remaining = selectedLabels.value.length - i - 1
      const needsCountTag = remaining > 0
      const countTagWidth = needsCountTag ? 30 : 0 // 估算 +N 标签宽度

      if (totalWidth + tagWidth + countTagWidth > availableWidth) {
        break
      }

      totalWidth += tagWidth + 4 // 4px 是 gap
      count++
    }

    // 如果有未渲染的标签，暂时显示全部
    if (hasUnrenderedTag) {
      visibleLabelCount.value = selectedLabels.value.length
    } else {
      // 确保至少显示一个标签
      visibleLabelCount.value = Math.max(1, count)
    }
  }, 0)
}

function getNodeChildren(node: CascaderNode): CascaderNode[] {
  const children = node[props.childrenKey]
  if (children && children.length > 0) return children
  return []
}

function isLeaf(node: CascaderNode): boolean {
  // 明确标记为叶子节点
  if (node.leaf === true) return true
  const children = node[props.childrenKey]
  // 没有子节点且已经加载过
  if (node._loaded === true && (!children || children.length === 0)) return true
  // 有子节点
  if (children && children.length > 0) return false
  // 懒加载模式
  if (props.lazyLoad) return false
  // 没有懒加载且没有 children，视为叶子
  return true
}

// ========== 初始化菜单 ==========

function initMenus() {
  activeMenus.value = [props.options]
  activePathNodes.value = []
}

// ========== 路径相关 ==========

function getActivePath(): (string | number)[] {
  return activePathNodes.value.map(n => n[props.valueKey])
}

function isNodeInActivePath(node: CascaderNode, level: number): boolean {
  return activePathNodes.value[level]?.[props.valueKey] === node[props.valueKey]
}

// ========== 选中状态 ==========

// 将 modelValue 转换为二维数组（内部统一使用二维数组处理）
const internalValue = computed<(string | number)[][]>(() => {
  if (!props.multiple) {
    const val = props.modelValue as (string | number)[]
    if (Array.isArray(val) && val.length > 0) return [val]
    return []
  }

  const val = props.modelValue
  if (Array.isArray(val) && val.length > 0) {
    // 已经是二维数组
    if (Array.isArray(val[0])) return val as (string | number)[][]
    // 是一维数组，包装成二维数组（单选值）
    return [val as (string | number)[]]
  }
  if (typeof val === 'string' && val.trim() !== '') {
    // 是字符串，按分隔符拆分
    return val.split(props.separator).map(v => {
      // 每个路径项可能包含多级，用另一个分隔符拆分（默认斜杠）
      return v.split('/').map(item => item.trim())
    })
  }
  return []
})

// 将内部二维数组转换为 modelValue（根据 valueType）
const formatModelValue = (arr: (string | number)[][]): any => {
  if (!props.multiple) {
    return arr[0] || []
  }

  if (props.valueType === 'string') {
    return arr.map(path => path.join('/')).join(props.separator)
  }
  return arr
}

const selectedValues = computed<(string | number)[][]>(() => {
  return internalValue.value
})

function isNodeChecked(node: CascaderNode): boolean {
  // 获取从根节点到当前节点的完整路径
  const nodePath = getNodePath(node)
  return selectedValues.value.some(v => JSON.stringify(v) === JSON.stringify(nodePath))
}

// 获取节点到根节点的完整路径
function getNodePath(targetNode: CascaderNode): (string | number)[] {
  const path: (string | number)[] = []

  // 递归查找节点路径
  function findPath(nodes: CascaderNode[], target: CascaderNode, currentPath: (string | number)[]): boolean {
    for (const node of nodes) {
      const nodeValue = node[props.valueKey]
      const newPath = [...currentPath, nodeValue]

      if (nodeValue === target[props.valueKey]) {
        path.push(...newPath)
        return true
      }

      const children = getNodeChildren(node)
      if (children.length > 0 && findPath(children, target, newPath)) {
        return true
      }
    }
    return false
  }

  findPath(props.options, targetNode, [])
  return path
}

function isSearchResultSelected(path: (string | number)[]): boolean {
  return selectedValues.value.some(v => JSON.stringify(v) === JSON.stringify(path))
}

// ========== 显示 ==========

const hasValue = computed(() => {
  if (props.multiple) {
    const val = props.modelValue
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'string') return val.trim() !== ''
    return false
  }
  const val = props.modelValue as (string | number)[]
  return Array.isArray(val) && val.length > 0
})

function findNodeByPath(path: (string | number)[]): string {
  const labels: string[] = []
  let nodes = props.options
  for (const val of path) {
    const node = nodes.find(n => n[props.valueKey] === val)
    if (!node) break
    labels.push(node[props.labelKey] as string)
    nodes = (node[props.childrenKey] as CascaderNode[]) || []
  }
  return labels.join(' / ')
}

const selectedLabels = computed<string[]>(() => {
  if (props.multiple) {
    return internalValue.value.map(path => findNodeByPath(path))
  }
  const val = internalValue.value[0]
  if (val && val.length > 0) return [findNodeByPath(val)]
  return []
})

const displayLabel = computed(() => {
  if (selectedLabels.value.length > 0) return selectedLabels.value.join(', ')
  return ''
})

const visibleLabels = computed(() => {
  return selectedLabels.value.slice(0, visibleLabelCount.value)
})

// ========== 面板定位 ==========

const panelStyle = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tick.value
  if (!triggerRef.value) return {}
  const rect = triggerRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const dropH = 300
  if (spaceBelow < dropH) {
    return {
      top: `${rect.top - dropH - 4}px`,
      left: `${rect.left}px`,
      minWidth: `${rect.width}px`,
    }
  }
  return {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
})

// ========== 展开/收起 ==========

function togglePanel() {
  if (props.disabled) return
  panelVisible.value = !panelVisible.value
  if (panelVisible.value) {
    tick.value++
    initMenus()
    // 恢复选中状态对应的展开路径
    restoreExpandedPath()
    nextTick(() => {
      if (props.filterable) searchRef.value?.focus()
    })
  } else {
    searchQuery.value = ''
    searchResults.value = []
  }
}

function restoreExpandedPath() {
  const firstPath = internalValue.value[0]
  if (!firstPath || !firstPath.length) return

  let nodes = props.options
  const pathNodes: CascaderNode[] = []

  for (const val of firstPath) {
    const node = nodes.find(n => n[props.valueKey] === val)
    if (!node) break
    pathNodes.push(node)
    const children = node[props.childrenKey] as CascaderNode[]
    if (children && children.length > 0) {
      nodes = children
      activeMenus.value.push(children)
    } else {
      break
    }
  }

  activePathNodes.value = pathNodes
}

// ========== 菜单交互 ==========

function handleCheckboxClick(node: CascaderNode, level: number) {
  if (node.disabled || node._loading) return

  // 勾选时不更新激活路径，只处理选中状态
  if (props.multiple) {
    handleMultipleSelect(node, level)
  } else {
    handleSingleSelect(node, level)
  }
}

function handleNodeClick(node: CascaderNode, level: number) {
  if (node.disabled || node._loading) return

  // 更新当前层级的激活节点
  activePathNodes.value = [...activePathNodes.value.slice(0, level), node]

  // 只展开下一级菜单，不选择
  const nodeHasChildren = getNodeChildren(node).length > 0 || (!node._loaded && props.lazyLoad)

  if (nodeHasChildren) {
    activeMenus.value = activeMenus.value.slice(0, level + 1)

    if (getNodeChildren(node).length > 0) {
      activeMenus.value.push(getNodeChildren(node))
      const path = getActivePath()
      emit('expand-change', path)
    } else if (!node._loaded && props.lazyLoad) {
      loadChildren(node)
    }
  }
}

// 单选模式：点击文本同时处理展开和选择
function handleNodeClickAndSelect(node: CascaderNode, level: number) {
  if (node.disabled || node._loading) return

  // 更新当前层级的激活节点
  activePathNodes.value = [...activePathNodes.value.slice(0, level), node]

  const nodeHasChildren = getNodeChildren(node).length > 0 || (!node._loaded && props.lazyLoad)

  // checkStrictly 模式或叶子节点：选中当前节点
  if (props.checkStrictly || !nodeHasChildren) {
    const nodePath = getNodePath(node)
    emit('update:modelValue', nodePath)
    emit('change', nodePath)
    if (!nodeHasChildren) {
      panelVisible.value = false
    }
  }

  // 如果有子节点，展开下一级菜单
  if (nodeHasChildren) {
    activeMenus.value = activeMenus.value.slice(0, level + 1)

    if (getNodeChildren(node).length > 0) {
      activeMenus.value.push(getNodeChildren(node))
      const nodePath = getNodePath(node)
      emit('expand-change', nodePath)
    } else if (!node._loaded && props.lazyLoad) {
      loadChildren(node)
    }
  }
}

function handleNodeHover(node: CascaderNode, level: number) {
  if (props.expandTrigger !== 'hover') return
  if (node.disabled || node._loading) return
  if (isLeaf(node)) return

  activePathNodes.value = [...activePathNodes.value.slice(0, level), node]
  activeMenus.value = activeMenus.value.slice(0, level + 1)
  activeMenus.value.push(getNodeChildren(node))

  // 懒加载
  if (getNodeChildren(node).length === 0 && !node._loaded && props.lazyLoad) {
    loadChildren(node)
  }
}

function handleSingleSelect(node: CascaderNode, level: number) {
  const nodePath = getNodePath(node)
  const nodeHasChildren = getNodeChildren(node).length > 0 || (!node._loaded && props.lazyLoad)

  // checkStrictly 模式或叶子节点：选中当前节点
  if (props.checkStrictly || !nodeHasChildren) {
    emit('update:modelValue', formatModelValue([nodePath]))
    emit('change', formatModelValue([nodePath]))
    if (!nodeHasChildren) {
      panelVisible.value = false
    }
  } else {
    // 非叶子节点且非 checkStrictly 模式：只选中，不关闭面板
    emit('update:modelValue', formatModelValue([nodePath]))
    emit('change', formatModelValue([nodePath]))
  }
}

function handleMultipleSelect(node: CascaderNode, level: number) {
  const nodePath = getNodePath(node)
  const nodeHasChildren = getNodeChildren(node).length > 0 || (!node._loaded && props.lazyLoad)

  const current = [...internalValue.value]
  const idx = current.findIndex(v => JSON.stringify(v) === JSON.stringify(nodePath))

  if (idx > -1) {
    current.splice(idx, 1)
  } else {
    current.push(nodePath)
  }

  emit('update:modelValue', formatModelValue(current))
  emit('change', formatModelValue(current))

  // 非叶子节点：展开下一级菜单
  if (nodeHasChildren) {
    activeMenus.value = activeMenus.value.slice(0, level + 1)

    if (getNodeChildren(node).length > 0) {
      activeMenus.value.push(getNodeChildren(node))
      emit('expand-change', nodePath)
    } else if (!node._loaded && props.lazyLoad) {
      loadChildren(node)
    }
  }
}

function loadChildren(node: CascaderNode) {
  if (!props.lazyLoad || node._loading) return
  node._loading = true

  props.lazyLoad(node, (children: CascaderNode[]) => {
    node._loading = false
    node._loaded = true
    node[props.childrenKey] = children
    // 更新菜单
    const level = activePathNodes.value.length - 1
    activeMenus.value = activeMenus.value.slice(0, level + 1)
    activeMenus.value.push(children)
  })
}

// ========== 搜索 ==========

function flattenNodes(
  nodes: CascaderNode[],
  parentPath: (string | number)[] = [],
  parentLabels: string[] = [],
): { path: (string | number)[], pathLabels: string[] }[] {
  const results: { path: (string | number)[], pathLabels: string[] }[] = []

  for (const node of nodes) {
    const currentPath = [...parentPath, node[props.valueKey]]
    const currentLabels = [...parentLabels, node[props.labelKey]]
    const children = getNodeChildren(node)

    if (isLeaf(node) || children.length === 0) {
      results.push({ path: currentPath, pathLabels: currentLabels })
    } else {
      results.push(...flattenNodes(children, currentPath, currentLabels))
    }
  }

  return results
}

function handleSearch() {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }
  // 远程搜索模式
  if (props.remote && props.remoteMethod) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      props.remoteMethod(searchQuery.value)
      emit('search', searchQuery.value)
    }, props.debounce)
    return
  }
  // 本地搜索模式
  const q = searchQuery.value.toLowerCase()
  const all = flattenNodes(props.options)
  searchResults.value = all.filter(item =>
    item.pathLabels.some(label => label.toLowerCase().includes(q)),
  )
}

function selectSearchResult(result: { path: (string | number)[], pathLabels: string[] }) {
  if (props.multiple) {
    const current = [...internalValue.value]
    const idx = current.findIndex(v => JSON.stringify(v) === JSON.stringify(result.path))
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(result.path)
    }
    emit('update:modelValue', formatModelValue(current))
    emit('change', formatModelValue(current))
  } else {
    emit('update:modelValue', formatModelValue([result.path]))
    emit('change', formatModelValue([result.path]))
    panelVisible.value = false
  }
}

// ========== 清除 ==========

function clear() {
  const val = props.multiple ? formatModelValue([]) : []
  emit('update:modelValue', val)
  emit('change', val)
}

function removeSelected(visibleIndex: number) {
  const current = [...internalValue.value]
  // visibleIndex 是 visibleLabels 中的索引，需要找到对应的原始值
  const visibleLabelValue = visibleLabels.value[visibleIndex]
  const originalIndex = current.findIndex(path => {
    return findNodeByPath(path) === visibleLabelValue
  })

  if (originalIndex > -1) {
    current.splice(originalIndex, 1)
    emit('update:modelValue', formatModelValue(current))
    emit('change', formatModelValue(current))
  }
}

// ========== 外部事件 ==========

function handleClickOutside(e: MouseEvent) {
  if (!panelVisible.value) return
  const target = e.target as HTMLElement
  if (triggerRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  panelVisible.value = false
  searchQuery.value = ''
  searchResults.value = []
}

function handleScrollClose(e: Event) {
  if (!panelVisible.value) return
  const target = e.target as HTMLElement
  if (panelRef.value?.contains(target)) return
  panelVisible.value = false
  searchQuery.value = ''
  searchResults.value = []
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', handleScrollClose, true)
})

watch(() => [selectedLabels.value, panelVisible.value], () => {
  nextTick(() => {
    calculateVisibleLabels()
  })
}, { deep: true })

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', handleScrollClose, true)
  if (calcTimeout) {
    clearTimeout(calcTimeout)
  }
})

// 暴露 remoteOptions 供外部更新远程搜索结果
defineExpose({ blur: () => { panelVisible.value = false }, remoteOptions })
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$border-focus: #4f6ef7;
$border-hover: #c8cbd8;
$disabled-bg: #f5f7fa;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;
$transition: all 0.2s ease;

.xly-cascader {
  display: inline-flex;
  width: 100%;

  &--large &__wrapper { min-height: 44px; }
  &--large &__wrapper.has-tags { min-height: 44px; }
  &--large &__value { font-size: 15px; }
  &--default &__wrapper { min-height: 36px; }
  &--default &__wrapper.has-tags { min-height: 36px; }
  &--default &__value { font-size: 14px; }
  &--small &__wrapper { min-height: 30px; }
  &--small &__wrapper.has-tags { min-height: 30px; }
  &--small &__value { font-size: 13px; }

  &__wrapper {
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: $radius;
    cursor: pointer;
    transition: $transition;
    user-select: none;
    box-sizing: border-box;

    &.is-hover:not(.is-disabled) { border-color: $border-hover; }
  }

  &.is-focus &__wrapper {
    border-color: $border-focus;
    box-shadow: 0 0 0 2px $primary-light;
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $text-color;

    &.is-placeholder { color: $text-placeholder; }
  }

  &__tags {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 4px;
    overflow: hidden;
    align-items: center;
    min-width: 0;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px 6px;
    background: $primary-light;
    color: $primary;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;

    &--count {
      background: rgba(79, 110, 247, 0.12);
    }
  }

  &__tag-close {
    display: inline-flex;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.15s;
    &:hover { background: rgba(79, 110, 247, 0.15); }
  }

  &__suffix {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 6px;
    color: $text-placeholder;
    flex-shrink: 0;
  }

  &__clear {
    display: inline-flex;
    cursor: pointer;
    border-radius: 50%;
    transition: color 0.15s;
    &:hover { color: $text-color; }
  }

  &__arrow {
    transition: transform 0.2s ease;
    &.is-reverse { transform: rotate(180deg); }
  }
}
</style>

<style lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;

.xly-cascader__panel {
  position: fixed;
  z-index: 2000;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.xly-cascader__search {
  padding: 8px;
  border-bottom: 1px solid $border-color;
}

.xly-cascader__search-input {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: 1px solid $border-color;
  border-radius: 6px;
  outline: none;
  font-size: 13px;
  color: $text-color;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus { border-color: $primary; }
  &::placeholder { color: $text-placeholder; }
}

.xly-cascader__search-results {
  max-height: 274px;
  overflow-y: auto;
}

.xly-cascader__search-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: $text-color;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: $primary-light; }
  &.is-selected { color: $primary; font-weight: 500; }
}

.xly-cascader__search-check {
  width: 16px;
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0;
}

.xly-cascader__search-path {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-cascader__search-sep {
  color: $text-placeholder;
}

.xly-cascader__menu {
  display: flex;
  max-height: 300px;
}

.xly-cascader__menu-list {
  min-width: 160px;
  max-height: 300px;
  overflow-y: auto;
  border-right: 1px solid $border-color;
  padding: 4px 0;

  &:last-child { border-right: none; }
}

.xly-cascader__menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: $text-color;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.15s;

  &:hover:not(.is-disabled) { background: $primary-light; }
  &.is-active { color: $primary; font-weight: 500; }
  &.is-disabled { color: $disabled-color; cursor: not-allowed; }
}

.xly-cascader__menu-checkbox {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid $border-color;
  border-radius: 3px;
  transition: all 0.15s;
  color: #fff;

  &:hover {
    border-color: $primary;
  }

  &:has(.xly-icon) {
    background: $primary;
    border-color: $primary;
  }
}

.xly-cascader__menu-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-cascader__menu-arrow {
  color: $text-placeholder;
  flex-shrink: 0;
}

.xly-cascader__menu-loading {
  color: $primary;
  font-size: 12px;
}

.xly-cascader__empty {
  padding: 16px;
  text-align: center;
  color: $text-placeholder;
  font-size: 13px;
}

.xly-cascader-zoom-enter-active,
.xly-cascader-zoom-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top center;
}
.xly-cascader-zoom-enter-from,
.xly-cascader-zoom-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-4px);
}
</style>
