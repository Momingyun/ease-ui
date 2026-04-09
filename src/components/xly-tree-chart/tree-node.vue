<script setup lang="ts">
import { computed } from 'vue'
import type { TreeNodeData, NodeConfig } from './types'


interface Props {
  node: TreeNodeData
  nodeConfig: NodeConfig
  layout: 'horizontal' | 'vertical'
  level: number
  colors?: string[]
  defaultExpandAll?: boolean
  expandedKeys?: Set<string | number>
  expandable?: boolean
  loadingKeys?: Set<string | number>
}

const props = withDefaults(defineProps<Props>(), {
  expandable: true,
  loadingKeys: () => new Set(),
})

const emit = defineEmits<{
  'node-click': [node: TreeNodeData]
  'toggle-expand': [node: TreeNodeData, expanded: boolean]
  'load-more': [node: TreeNodeData]
}>()

defineOptions({ name: 'TreeNode' })

// 节点颜色 - 经典企业蓝
const nodeColor = computed(() => {
  if (props.colors && props.colors.length > 0) {
    return props.colors[props.level % props.colors.length]
  }
  const colors = ['#1a365d', '#2c5282', '#3182ce', '#4299e1', '#63b3ed', '#90cdf4']
  return colors[props.level % colors.length]
})

// 展开状态
const isExpanded = computed(() => {
  const key = props.node[props.nodeConfig.keyField]
  return props.expandedKeys?.has(key) ?? false
})

// 是否有子节点
const hasChildren = computed(() => {
  const children = props.node[props.nodeConfig.childrenField]
  return children && Array.isArray(children) && children.length > 0
})

// 子节点列表
const children = computed(() => {
  return props.node[props.nodeConfig.childrenField] || []
})

// 节点是否处于加载中
const isLoading = computed(() => {
  const key = props.node[props.nodeConfig.keyField]
  return props.loadingKeys?.has(key) ?? false
})

// 节点是否有待加载的子节点（没有本地数据但有远程数据）
const hasRemoteChildren = computed(() => {
  return props.node.hasRemoteChildren === true
})

// 节点样式计算（通过 CSS 变量传递给 hover 样式）
const nodeVars = computed(() => {
  const vars: Record<string, string> = {}

  // 普通样式
  if (props.node.borderColor) {
    vars['--node-border-color'] = props.node.borderColor
  }
  if (props.node.backgroundColor) {
    vars['--node-bg-color'] = props.node.backgroundColor
  }
  if (props.node.textColor) {
    vars['--node-text-color'] = props.node.textColor
  }

  // 激活（hover）样式
  if (props.node.activeBorderColor) {
    vars['--node-active-border-color'] = props.node.activeBorderColor
  }
  if (props.node.activeBackgroundColor) {
    vars['--node-active-bg-color'] = props.node.activeBackgroundColor
  }
  if (props.node.activeTextColor) {
    vars['--node-active-text-color'] = props.node.activeTextColor
  }

  return vars
})

// 切换展开
function toggleExpand() {
  if (!props.expandable) return

  // 如果没有本地子节点但标记为有远程子节点，触发远程加载
  if (!hasChildren.value && hasRemoteChildren.value) {
    emit('load-more', props.node)
    return
  }

  if (!hasChildren.value) return
  emit('toggle-expand', props.node, !isExpanded.value)
}

// 点击节点
function handleNodeClick() {
  emit('node-click', props.node)
}

// 节点类型
const nodeType = computed(() => {
  if (props.level === 0) return 'root'
  if (hasChildren.value || hasRemoteChildren.value) return 'parent'
  return 'leaf'
})
</script>

<template>
  <div class="tree-node-wrapper" :class="`layout-${layout}`">
    <!-- 节点 -->
    <div
      class="tree-node"
      :class="[`tree-node--${nodeType}`, { 'is-expanded': isExpanded, 'has-children': (hasChildren || hasRemoteChildren) && expandable }]"
      :style="{ '--node-color': nodeColor, ...nodeVars }"
      @click="handleNodeClick"
    >
      <span class="tree-node__title">{{ node[nodeConfig.titleField] }}</span>
      <span v-if="node[nodeConfig.descField]" class="tree-node__desc">{{ node[nodeConfig.descField] }}</span>
      <!-- 加载中状态 -->
      <span v-if="isLoading" class="tree-node__loading">
        <svg class="tree-node__loading-icon" width="16" height="16" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32">
            <animate attributeName="stroke-dashoffset" values="32;0;32" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </span>
      <!-- 展开收起按钮 -->
      <button
        v-else-if="(hasChildren || hasRemoteChildren) && expandable"
        class="tree-node__arrow"
        :class="{ 'is-expanded': isExpanded }"
        @click.stop="toggleExpand"
      >
        <!-- 竖向布局：v^ -->
        <svg v-if="layout === 'vertical' && !isExpanded" viewBox="0 0 24 24" width="16" height="16">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <svg v-else-if="layout === 'vertical' && isExpanded" viewBox="0 0 24 24" width="16" height="16">
          <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <!-- 横向布局：<> -->
        <svg v-else-if="layout === 'horizontal' && !isExpanded" viewBox="0 0 24 24" width="16" height="16">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </button>
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && isExpanded" class="tree-children">
      <TreeNode
        v-for="(child, index) in children"
        :key="child[nodeConfig.keyField] ?? index"
        :node="child"
        :node-config="nodeConfig"
        :layout="layout"
        :level="level + 1"
        :colors="colors"
        :default-expand-all="defaultExpandAll"
        :expanded-keys="expandedKeys"
        :expandable="expandable"
        @node-click="(n) => emit('node-click', n)"
        @toggle-expand="(n, e) => emit('toggle-expand', n, e)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
// 包装器
.tree-node-wrapper {
  display: flex;
  align-items: center;

  &.layout-horizontal {
    flex-direction: row;
    align-items: center;
  }

  &.layout-vertical {
    flex-direction: column;
  }
}

// 节点 - 经典组织架构图风格
.tree-node {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 10px 16px;
  background: var(--node-bg-color, #fff);
  border: 2px solid var(--node-border-color, var(--node-color));
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;

  // 标题
  &__title {
    font-size: 13px;
    font-weight: 600;
    color: var(--node-text-color, #1a202c);
    white-space: nowrap;
    text-align: center;
    line-height: 1.3;
  }

  // 描述
  &__desc {
    display: none;
  }

  // 展开箭头 - 放在节点内部右侧
  &__arrow {
    margin-left: 8px;
    padding: 0;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--node-border-color, var(--node-color));
    cursor: pointer;
    transition: all 0.15s;
    flex-shrink: 0;

    svg {
      transition: transform 0.2s;
    }
  }

  // 加载中
  &__loading {
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__loading-icon {
    animation: spin 1s linear infinite;
    color: var(--node-color);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  &.has-children {
    padding-right: 12px;
  }

  // 根节点 - 深蓝底白字
  &--root {
    background: var(--node-color);
    border-color: var(--node-color);
    padding: 12px 20px;

    .tree-node__title {
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }

    &:hover {
      filter: brightness(1.05);
    }
  }

  // 父节点 - 白底深蓝字，支持自定义样式
  &--parent {
    &:hover {
      background: var(--node-active-bg-color, var(--node-color));
      border-color: var(--node-active-border-color, var(--node-color));

      .tree-node__title {
        color: var(--node-active-text-color, #fff);
      }

      .tree-node__arrow {
        color: var(--node-active-text-color, #fff);
      }
    }
  }

  // 叶节点 - 灰底灰边，支持自定义样式
  &--leaf {
    border-color: var(--node-border-color, #a0aec0);
    background: var(--node-bg-color, #f7fafc);

    .tree-node__title {
      color: var(--node-text-color, #4a5568);
      font-weight: 500;
    }

    &:hover {
      border-color: var(--node-active-border-color, var(--node-color));
      background: var(--node-active-bg-color, var(--node-color));

      .tree-node__title {
        color: var(--node-active-text-color, #fff);
      }

      .tree-node__arrow {
        color: var(--node-active-text-color, #fff);
      }
    }
  }
}

// 子节点容器
.tree-children {
  display: flex;

  .layout-horizontal > & {
    flex-direction: column;
    justify-content: center;
    margin-left: 50px;
    gap: 20px;
  }

  .layout-vertical > & {
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    gap: 30px;
  }
}
</style>
