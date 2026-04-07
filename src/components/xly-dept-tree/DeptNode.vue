<template>
  <div class="dept-node" :class="{ 'dept-node--selected': isSelected, 'dept-node--leaf': !hasChildren }">
    <div
      class="dept-node__row"
      :style="{ ...nodeStyle, paddingLeft: `${depth * 24 + 20}px` }"
      @click="handleClick"
    >
      <!-- 展开/折叠图标 -->
      <span
        v-if="hasChildren"
        class="dept-node__toggle"
        :class="{ 'dept-node__toggle--expanded': isExpanded }"
        @click.stop="handleToggle"
      >
        <XlyIcon name="el:ArrowRight" />
      </span>
      <span v-else class="dept-node__toggle-placeholder"></span>

      <!-- 节点图标 -->
      <span class="dept-node__icon">
        <XlyIcon :name="hasChildren ? 'el:OfficeBuilding' : 'el:UserFilled'" />
      </span>

      <!-- 节点标签 -->
      <span class="dept-node__label">{{ nodeLabel }}</span>
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && isExpanded" class="dept-node__children">
      <DeptNode
        v-for="child in nodeChildren"
        :key="child[nodeKey.id]"
        :node="child"
        :node-key="nodeKey"
        :node-style="nodeStyle"
        :highlight-current="highlightCurrent"
        :expand-all="expandAll"
        :default-expand-level="defaultExpandLevel"
        :selected-id="selectedId"
        :expanded-set="expandedSet"
        :depth="depth + 1"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event, arguments[1])"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TreeNode {
  id?: string | number
  label?: string
  children?: TreeNode[]
  [key: string]: unknown
}

interface Props {
  node: TreeNode
  nodeKey: { id: string; pid?: string; label?: string; children?: string }
  nodeStyle: Record<string, string>
  highlightCurrent: boolean
  expandAll: boolean
  defaultExpandLevel: number
  selectedId: string | number | null
  expandedSet: Set<string>
  depth?: number
}

const props = withDefaults(defineProps<Props>(), {
  nodeStyle: () => ({}),
  highlightCurrent: false,
  expandAll: false,
  defaultExpandLevel: 1,
  selectedId: null,
  depth: 0,
})

const emit = defineEmits<{
  select: [node: TreeNode]
  toggle: [node: TreeNode, expanded: boolean]
}>()

// 节点标识
const nodeId = computed(() => String(props.node[props.nodeKey.id]))
const nodeLabel = computed(() => (props.node[props.nodeKey.label || 'label'] as string) || '')
const nodeChildren = computed(() => (props.node[props.nodeKey.children || 'children'] as TreeNode[]) || [])
const hasChildren = computed(() => nodeChildren.value.length > 0)

// 选中状态
const isSelected = computed(() => props.selectedId === props.node[props.nodeKey.id])

// 根据默认展开层级判断
const shouldAutoExpand = computed(() => {
  if (props.expandAll) return true
  if (props.defaultExpandLevel <= 0) return true
  return props.depth < props.defaultExpandLevel
})

// 展开状态 - 优先使用 expandedSet，否则使用默认展开逻辑
const isExpanded = computed(() => {
  return props.expandedSet.has(nodeId.value) || shouldAutoExpand.value
})

// 点击选中
const handleClick = () => {
  emit('select', props.node)
}

// 点击展开/折叠
const handleToggle = () => {
  const expanded = !isExpanded.value
  emit('toggle', props.node, expanded)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
