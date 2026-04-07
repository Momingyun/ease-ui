<template>
  <div class="xly-dept-tree">
    <div v-if="loading" class="xly-dept-tree__loading">
      <XlyIcon name="el:Loading" class="xly-dept-tree__loading-icon" />
      <span>加载中...</span>
    </div>
    <div v-else-if="emptyText && treeData.length === 0" class="xly-dept-tree__empty">
      {{ emptyText }}
    </div>
    <div v-else class="xly-dept-tree__content">
      <DeptNode
        v-for="node in treeData"
        :key="node[nodeKey.id]"
        :node="node"
        :node-key="nodeKey"
        :node-style="nodeStyle"
        :highlight-current="highlightCurrent"
        :expand-all="expandAll"
        :default-expand-level="defaultExpandLevel"
        :selected-id="selectedId"
        :expanded-set="expandedSet"
        @select="handleSelect"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import DeptNode from './DeptNode.vue'

defineOptions({ name: 'XlyDeptTree' })

interface TreeNode {
  id?: string | number
  pid?: string | number
  label?: string
  children?: TreeNode[]
  [key: string]: unknown
}

interface NodeKey {
  id: string
  pid?: string
  label?: string
  children?: string
}

interface Props {
  data?: TreeNode[] | null
  nodeKey?: NodeKey
  nodeStyle?: Record<string, string>
  highlightCurrent?: boolean
  expandAll?: boolean
  defaultExpandLevel?: number
  selectedId?: string | number | null
  emptyText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  nodeKey: () => ({ id: 'id', pid: 'pid', label: 'label', children: 'children' }),
  nodeStyle: () => ({}),
  highlightCurrent: false,
  expandAll: false,
  defaultExpandLevel: 1,
  selectedId: null,
  emptyText: '暂无数据',
  loading: false,
})

const emit = defineEmits<{
  select: [node: TreeNode]
  toggle: [node: TreeNode, expanded: boolean]
}>()

// 将平铺数据转换为树结构
const treeData = computed(() => {
  if (!props.data || props.data.length === 0) return []

  // 检查数据格式：如果有 pid 字段则是平铺数据，否则直接返回
  const firstItem = props.data[0]
  if (firstItem[props.nodeKey.pid || 'pid'] !== undefined) {
    return buildTree(props.data, props.nodeKey)
  }

  return props.data as TreeNode[]
})

// 构建树结构
const buildTree = (list: TreeNode[], nodeKey: NodeKey): TreeNode[] => {
  const idKey = nodeKey.id
  const pidKey = nodeKey.pid || 'pid'
  const childrenKey = nodeKey.children || 'children'

  const map = new Map<string | number, TreeNode>()
  const roots: TreeNode[] = []

  // 建立映射
  list.forEach((item) => {
    const id = item[idKey]
    if (id !== undefined) {
      map.set(id, { ...item, [childrenKey]: item[childrenKey] || [] })
    }
  })

  // 构建树
  list.forEach((item) => {
    const id = item[idKey]
    const pid = item[pidKey]

    if (pid === undefined || pid === null || pid === '') {
      roots.push(map.get(id)!)
    } else {
      const parent = map.get(pid)
      if (parent) {
        (parent[childrenKey] as TreeNode[]).push(map.get(id)!)
      } else {
        roots.push(map.get(id)!)
      }
    }
  })

  return roots
}

// 选中的节点
const selectedId = ref<string | number | null>(props.selectedId)

// 展开状态集合
const expandedSet = ref(new Set<string>())

watch(() => props.selectedId, (val) => {
  selectedId.value = val
})

// 处理选中
const handleSelect = (node: TreeNode) => {
  const id = node[props.nodeKey.id]
  selectedId.value = id
  emit('select', node)
}

// 处理展开/折叠
const handleToggle = (node: TreeNode, expanded: boolean) => {
  const id = String(node[props.nodeKey.id])
  if (expanded) {
    expandedSet.value.add(id)
  } else {
    expandedSet.value.delete(id)
  }
  emit('toggle', node, expanded)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
