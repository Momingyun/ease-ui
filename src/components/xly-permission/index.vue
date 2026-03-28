<template>
  <div class="xly-permission">
    <!-- 全选 -->
    <div v-if="showSelectAll" class="permission-header">
      <el-checkbox
        :model-value="rootState === 'checked'"
        :indeterminate="rootState === 'half'"
        :disabled="disabled"
        @change="onRootToggle"
      >
        {{ selectAllText }}
      </el-checkbox>
    </div>

    <!-- 表格 -->
    <table class="permission-table" :class="['is-bordered', `max-level-${maxLevel}`]">
      <!-- 表头 -->
      <thead>
        <tr>
          <th v-if="maxLevel >= 1" class="cell-module">{{ displayHeaders[0] }}</th>
          <th v-if="maxLevel >= 2" class="cell-page">{{ displayHeaders[1] }}</th>
          <th v-if="maxLevel >= 3" :class="maxLevel >= 4 ? 'cell-l3' : 'cell-action'">
            {{ displayHeaders[2] }}
          </th>
          <th v-if="maxLevel >= 4" class="cell-l4">{{ displayHeaders[3] }}</th>
          <th v-if="maxLevel >= 5" class="cell-l5">{{ displayHeaders[4] }}</th>
        </tr>
      </thead>
      <!-- 表格内容 -->
      <tbody>
        <tr v-for="row in tableRows" :key="row.key">
          <!-- 模块列（一级及以上显示） -->
          <td
            v-if="maxLevel >= 1 && row.isModuleFirst"
            :rowspan="row.moduleRowspan"
            class="cell-module"
          >
            <el-checkbox
              :model-value="getNodeState(row.moduleId) === 'checked'"
              :indeterminate="getNodeState(row.moduleId) === 'half'"
              :disabled="disabled || row.moduleDisabled"
              @change="(val: boolean) => onNodeToggle(row.moduleId, val)"
            >
              {{ row.moduleLabel }}
            </el-checkbox>
          </td>
          <!-- 页面列（二级及以上显示） -->
          <td
            v-if="maxLevel >= 2 && row.isPageFirst && row.pageId"
            :rowspan="row.pageRowspan || 1"
            class="cell-page"
          >
            <el-checkbox
              :model-value="getNodeState(row.pageId) === 'checked'"
              :indeterminate="getNodeState(row.pageId) === 'half'"
              :disabled="disabled || row.pageDisabled"
              @change="(val: boolean) => onNodeToggle(row.pageId, val)"
            >
              {{ row.pageLabel }}
            </el-checkbox>
          </td>
          <!-- 操作列（三级用actions数组横向排列，四五级用单个action） -->
          <td
            v-if="maxLevel >= 3"
            :class="[maxLevel >= 4 ? 'cell-l3' : 'cell-action', maxLevel === 3 ? 'cell-last' : '']"
          >
            <div class="item-list">
              <template v-if="row.actions.length > 0">
                <!-- 三级：多个操作横向排列 -->
                <el-checkbox
                  v-for="item in row.actions"
                  :key="item._id"
                  :model-value="getNodeState(item._id) === 'checked'"
                  :indeterminate="getNodeState(item._id) === 'half'"
                  :disabled="disabled || item._disabled"
                  @change="(val: boolean) => onNodeToggle(item._id, val)"
                >
                  {{ item._label }}
                </el-checkbox>
              </template>
              <template v-else-if="row.action">
                <!-- 四五级：单个操作 -->
                <el-checkbox
                  :model-value="getNodeState(row.action._id) === 'checked'"
                  :indeterminate="getNodeState(row.action._id) === 'half'"
                  :disabled="disabled || row.action._disabled"
                  @change="(val: boolean) => onNodeToggle(row.action._id, val)"
                >
                  {{ row.action._label }}
                </el-checkbox>
              </template>
            </div>
          </td>
          <!-- 功能列（四级） -->
          <td v-if="maxLevel >= 4" :class="['cell-l4', maxLevel === 4 ? 'cell-last' : '']">
            <div class="item-list">
              <el-checkbox
                v-for="item in row.features"
                :key="item._id"
                :model-value="getNodeState(item._id) === 'checked'"
                :indeterminate="getNodeState(item._id) === 'half'"
                :disabled="disabled || item._disabled"
                @change="(val: boolean) => onNodeToggle(item._id, val)"
              >
                {{ item._label }}
              </el-checkbox>
            </div>
          </td>
          <!-- 数据列（五级） -->
          <td v-if="maxLevel >= 5" class="cell-l5 cell-last">
            <div class="item-list">
              <el-checkbox
                v-for="item in row.dataItems"
                :key="item._id"
                :model-value="getNodeState(item._id) === 'checked'"
                :indeterminate="getNodeState(item._id) === 'half'"
                :disabled="disabled || item._disabled"
                @change="(val: boolean) => onNodeToggle(item._id, val)"
              >
                {{ item._label }}
              </el-checkbox>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 已选展示 -->
    <div v-if="showSelected && modelValue.length > 0" class="selected-info">
      <div class="selected-header">
        <span class="selected-title">已选权限</span>
        <span class="selected-count">{{ modelValue.length }} 个</span>
      </div>
      <div class="selected-tags">
        <el-tag v-for="id in modelValue" :key="id" size="small" closable @close="onRemoveTag(id)">
          {{ labelMap[id] || id }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'XlyPermission' })

export interface Permission {
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    modelValue?: (string | number)[]
    data?: Permission[]
    maxLevel?: number
    disabled?: boolean
    showSelectAll?: boolean
    selectAllText?: string
    bordered?: boolean
    showSelected?: boolean
    idKey?: string
    labelKey?: string
    childrenKey?: string
    disabledKey?: string
    /** 自定义禁用判断函数，优先级最高，用于复杂逻辑 */
    isDisabled?: (item: Permission, level: number) => boolean
    /** 禁用字段名，配合 disabledValue 使用（如 status） */
    disabledField?: string
    /** 禁用字段的值，支持单个值或数组（如 2 或 [1, 2]） */
    disabledValue?: string | number | (string | number)[]
    headers?: string[]
  }>(),
  {
    modelValue: () => [],
    data: () => [],
    maxLevel: 3,
    disabled: false,
    showSelectAll: true,
    selectAllText: '全选',
    bordered: true,
    showSelected: true,
    idKey: 'id',
    labelKey: 'label',
    childrenKey: 'children',
    disabledKey: 'disabled',
    headers: () => ['功能模块', '页面权限', '操作权限', '功能权限', '数据权限'],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[]]
}>()

// ============================================================
// 树结构解析
// ============================================================

interface TreeNode {
  id: string | number
  label: string
  disabled: boolean
  parent: string | number | null
  children: (string | number)[]
}

const nodeMap = computed<Record<string | number, TreeNode>>(() => {
  const map: Record<string | number, TreeNode> = {}

  const parse = (items: Permission[], parentId: string | number | null, level = 1) => {
    for (const item of items) {
      const id = item[props.idKey]
      const children = item[props.childrenKey] || []
      // 优先使用 isDisabled 函数，否则使用 disabledKey
      const isDisabledByKey = !!item[props.disabledKey]
      const isDisabledByFn = props.isDisabled ? props.isDisabled(item, level) : false
      map[id] = {
        id,
        label: item[props.labelKey] || String(id),
        disabled: props.isDisabled ? isDisabledByFn : isDisabledByKey,
        parent: parentId,
        children: children.map((c: Permission) => c[props.idKey]),
      }
      if (children.length > 0) parse(children, id, level + 1)
    }
  }

  parse(props.data, null, 1)
  return map
})

const leafIds = computed(() => {
  const result: (string | number)[] = []
  for (const id in nodeMap.value) {
    if (nodeMap.value[id].children.length === 0) {
      result.push(nodeMap.value[id].id)
    }
  }
  return result
})

const labelMap = computed<Record<string | number, string>>(() => {
  const map: Record<string | number, string> = {}
  for (const id in nodeMap.value) {
    map[nodeMap.value[id].id] = nodeMap.value[id].label
  }
  return map
})

// ============================================================
// 状态判断
// ============================================================

type CheckState = 'none' | 'half' | 'checked'

const getLeafDescendants = (nodeId: string | number): (string | number)[] => {
  const node = nodeMap.value[nodeId]
  if (!node) return []
  if (node.children.length === 0) return [nodeId]

  const leaves: (string | number)[] = []
  const walk = (id: string | number) => {
    const n = nodeMap.value[id]
    if (!n) return
    if (n.children.length === 0) {
      leaves.push(id)
    } else {
      n.children.forEach(walk)
    }
  }
  walk(nodeId)
  return leaves
}

const getNodeState = (nodeId: string | number): CheckState => {
  const leaves = getLeafDescendants(nodeId)
  if (leaves.length === 0) return 'none'
  const checkedCount = leaves.filter((id) => props.modelValue.includes(id)).length
  if (checkedCount === 0) return 'none'
  if (checkedCount === leaves.length) return 'checked'
  return 'half'
}

// ============================================================
// 勾选逻辑
// ============================================================

const getAncestors = (nodeId: string | number): (string | number)[] => {
  const ancestors: (string | number)[] = []
  let current = nodeMap.value[nodeId]
  while (current && current.parent != null) {
    ancestors.push(current.parent)
    current = nodeMap.value[current.parent]
  }
  return ancestors
}

const fillAncestors = (ids: Set<string | number>): Set<string | number> => {
  const result = new Set(ids)
  for (const id of ids) {
    getAncestors(id).forEach((a) => result.add(a))
  }
  return result
}

const onNodeToggle = (nodeId: string | number, checked: boolean) => {
  const currentSet = new Set(props.modelValue)

  if (checked) {
    getLeafDescendants(nodeId).forEach((leaf) => currentSet.add(leaf))
  } else {
    getLeafDescendants(nodeId).forEach((leaf) => currentSet.delete(leaf))
    currentSet.delete(nodeId)
    // 清理不再需要的祖先
    const remainingLeaves = leafIds.value.filter((id) => currentSet.has(id))
    const neededAncestors = new Set<string | number>()
    remainingLeaves.forEach((leaf) => {
      getAncestors(leaf).forEach((a) => neededAncestors.add(a))
    })
    for (const id of currentSet) {
      const node = nodeMap.value[id]
      if (node && node.children.length > 0 && !neededAncestors.has(id)) {
        currentSet.delete(id)
      }
    }
  }

  emitUpdate([...fillAncestors(currentSet)])
}

const rootState = computed<CheckState>(() => {
  const allLeaves = leafIds.value
  if (allLeaves.length === 0) return 'none'
  const checkedCount = allLeaves.filter((id) => props.modelValue.includes(id)).length
  if (checkedCount === 0) return 'none'
  if (checkedCount === allLeaves.length) return 'checked'
  return 'half'
})

const onRootToggle = (checked: boolean) => {
  if (checked) {
    const allIds: (string | number)[] = []
    for (const id in nodeMap.value) allIds.push(nodeMap.value[id].id)
    emitUpdate(allIds)
  } else {
    emitUpdate([])
  }
}

const onRemoveTag = (id: string | number) => {
  const currentSet = new Set(props.modelValue)
  getLeafDescendants(id).forEach((leaf) => currentSet.delete(leaf))
  currentSet.delete(id)
  const remainingLeaves = leafIds.value.filter((li) => currentSet.has(li))
  const neededAncestors = new Set<string | number>()
  remainingLeaves.forEach((leaf) => getAncestors(leaf).forEach((a) => neededAncestors.add(a)))
  for (const ci of currentSet) {
    const node = nodeMap.value[ci]
    if (node && node.children.length > 0 && !neededAncestors.has(ci)) currentSet.delete(ci)
  }
  emitUpdate([...currentSet])
}

const emitUpdate = (value: (string | number)[]) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// ============================================================
// 表格行构建（适配三级/四级/五级）
// ============================================================

interface RowItem {
  _id: string | number
  _label: string
  _disabled: boolean
}

interface TableRow {
  key: string
  moduleId: string | number
  moduleLabel: string
  moduleDisabled: boolean
  // 模块跨多少行
  moduleRowspan: number
  // 是否是模块的第一行（显示模块名）
  isModuleFirst: boolean
  pageId: string | number
  pageLabel: string
  pageDisabled: boolean
  // 页面跨多少行
  pageRowspan: number
  // 是否是页面的第一行（显示页面名）
  isPageFirst: boolean
  // 操作（三级用数组横向排列，四五级用单个对象）
  action: RowItem | null
  actions: RowItem[]
  // 该操作下的所有功能
  features: RowItem[]
  // 该操作下的所有数据
  dataItems: RowItem[]
}

const defaultHeaders: Record<number, string[]> = {
  1: ['功能模块'],
  2: ['功能模块', '页面权限'],
  3: ['功能模块', '页面权限', '操作权限'],
  4: ['功能模块', '页面权限', '操作权限', '功能权限'],
  5: ['功能模块', '页面权限', '操作权限', '功能权限', '数据权限'],
}

const displayHeaders = computed(() => {
  if (props.headers && props.headers.length > 0) return props.headers
  return defaultHeaders[props.maxLevel] || defaultHeaders[3]
})

// 统一的禁用判断函数
const getItemDisabled = (item: Permission, level: number): boolean => {
  // 优先级1：isDisabled 函数（用于复杂逻辑）
  if (props.isDisabled) {
    return props.isDisabled(item, level)
  }
  // 优先级2：disabledField + disabledValue（简单配置）
  if (props.disabledField && props.disabledValue !== undefined) {
    const fieldVal = item[props.disabledField]
    const disabledValues = Array.isArray(props.disabledValue)
      ? props.disabledValue
      : [props.disabledValue]
    return disabledValues.includes(fieldVal)
  }
  // 优先级3：disabledKey 布尔字段（原有方式）
  return !!item[props.disabledKey]
}

const tableRows = computed<TableRow[]>(() => {
  const rows: TableRow[] = []
  let idx = 0

  // 一级结构：每个模块一行，没有页面列
  if (props.maxLevel === 1) {
    props.data.forEach((mod) => {
      rows.push({
        key: `row-${idx++}`,
        moduleId: mod[props.idKey],
        moduleLabel: mod[props.labelKey],
        moduleDisabled: getItemDisabled(mod, 1),
        moduleRowspan: 1,
        isModuleFirst: true,
        pageId: '',
        pageLabel: '',
        pageDisabled: false,
        pageRowspan: 0,
        isPageFirst: false,
        action: null,
        actions: [],
        features: [],
        dataItems: [],
      })
    })
    return rows
  }

  props.data.forEach((mod) => {
    const moduleId = mod[props.idKey]
    const moduleLabel = mod[props.labelKey]
    const moduleDisabled = getItemDisabled(mod, 1)
    const pages = mod[props.childrenKey] || []

    // 计算模块跨行数
    let moduleRowspan = 0
    if (props.maxLevel === 2) {
      // 二级：每个页面一行
      moduleRowspan = pages.length
    } else if (props.maxLevel === 3) {
      // 三级：每个页面一行
      moduleRowspan = pages.length
    } else {
      // 四五级：每个操作一行
      pages.forEach((page: Permission) => {
        moduleRowspan += (page[props.childrenKey] || []).length
      })
    }

    let moduleFirstShown = true

    if (props.maxLevel === 2) {
      // ===== 二级：每个页面一行 =====
      pages.forEach((page: Permission) => {
        rows.push({
          key: `row-${idx++}`,
          moduleId,
          moduleLabel,
          moduleDisabled,
          moduleRowspan,
          isModuleFirst: moduleFirstShown,
          pageId: page[props.idKey],
          pageLabel: page[props.labelKey],
          pageDisabled: getItemDisabled(page, 2),
          pageRowspan: 1,
          isPageFirst: true,
          action: null,
          actions: [],
          features: [],
          dataItems: [],
        })
        moduleFirstShown = false
      })
    } else if (props.maxLevel === 3) {
      // ===== 三级：每个页面一行，操作横向排列 =====
      pages.forEach((page: Permission) => {
        const pageId = page[props.idKey]
        const pageLabel = page[props.labelKey]
        const pageDisabled = getItemDisabled(page, 2)
        const ops = page[props.childrenKey] || []
        const actions = ops.map((op: Permission) => ({
          _id: op[props.idKey],
          _label: op[props.labelKey],
          _disabled: getItemDisabled(op, 3),
        }))

        rows.push({
          key: `row-${idx++}`,
          moduleId,
          moduleLabel,
          moduleDisabled,
          moduleRowspan,
          isModuleFirst: moduleFirstShown,
          pageId,
          pageLabel,
          pageDisabled,
          pageRowspan: 1,
          isPageFirst: true,
          action: { _id: actions[0]?._id, _label: '', _disabled: false },
          actions,
          features: [],
          dataItems: [],
        })

        moduleFirstShown = false
      })
    } else {
      // ===== 四五级：每个操作一行 =====
      pages.forEach((page: Permission) => {
        const pageId = page[props.idKey]
        const pageLabel = page[props.labelKey]
        const pageDisabled = getItemDisabled(page, 2)
        const ops = page[props.childrenKey] || []
        const pageRowspan = ops.length

        ops.forEach((op: Permission, oi: number) => {
          const features: RowItem[] = []
          const dataItems: RowItem[] = []
          ;(op[props.childrenKey] || []).forEach((fn: Permission) => {
            features.push({
              _id: fn[props.idKey],
              _label: fn[props.labelKey],
              _disabled: getItemDisabled(fn, 4),
            })
            ;(fn[props.childrenKey] || []).forEach((data: Permission) => {
              dataItems.push({
                _id: data[props.idKey],
                _label: data[props.labelKey],
                _disabled: getItemDisabled(data, 5),
              })
            })
          })

          rows.push({
            key: `row-${idx++}`,
            moduleId,
            moduleLabel,
            moduleDisabled,
            moduleRowspan,
            isModuleFirst: moduleFirstShown,
            pageId,
            pageLabel,
            pageDisabled,
            pageRowspan,
            isPageFirst: oi === 0,
            action: {
              _id: op[props.idKey],
              _label: op[props.labelKey],
              _disabled: getItemDisabled(op, 3),
            },
            actions: [],
            features,
            dataItems,
          })

          moduleFirstShown = false
        })
      })
    }
  })

  return rows
})
</script>

<style scoped>
.xly-permission {
  width: 100%;
}

.permission-header {
  margin-bottom: 12px;
}

.permission-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.permission-table.is-bordered {
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.permission-table th,
.permission-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  text-align: left;
  vertical-align: middle;
}

.permission-table th {
  background: #fafafa;
  font-weight: 500;
  color: #606266;
  font-size: 13px;
}

.permission-table tbody tr:hover {
  background: #f5f7fa;
}

/* 父级列：根据内容自适应宽度 */
.cell-module,
.cell-page,
.cell-l3,
.cell-l4 {
  width: auto;
  white-space: nowrap;
}

.cell-module {
  background: #fafafa;
}

/* 操作列（三级最后一级占满，四五级自适应） */
.cell-action {
  width: auto;
  white-space: nowrap;
}

/* 功能列（四级最后一级占满，五级自适应） */
.cell-l4 {
  width: auto;
  white-space: nowrap;
}

/* 数据列（五级最后一级占满） */
.cell-l5 {
  width: 100%;
  min-width: 200px;
}

/* 二级：页面列占满 */
:deep(.max-level-2) .cell-page {
  width: 100%;
}

/* 三级：操作列占满 */
:deep(.max-level-3) .cell-action {
  width: 100%;
}

/* 四级：功能列占满 */
:deep(.max-level-4) .cell-l4 {
  width: 100%;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

/* 选中数据展示 */
.selected-info {
  margin-top: 16px;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 4px;
}

.selected-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.selected-title {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.selected-count {
  font-size: 12px;
  color: #909399;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

::deep(.el-checkbox) {
  margin-right: 0;
}

::deep(.el-checkbox__label) {
  padding-left: 8px;
  font-size: 13px;
  color: #303133;
}

::deep(.el-tag) {
  border-radius: 3px;
}
</style>
