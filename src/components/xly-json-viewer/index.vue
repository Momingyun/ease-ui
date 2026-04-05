<template>
  <div class="xly-json-viewer" :class="[`xly-json-viewer--${theme}`]" :style="{ width }">
    <!-- 工具栏 -->
    <div v-if="showToolbar" class="xly-json-viewer__toolbar">
      <span class="xly-json-viewer__toolbar-left">
        <span v-if="showCopy" class="xly-json-viewer__btn" title="复制" @click="handleCopy">
          <XlyIcon name="el:CopyDocument" />
          <span>复制</span>
        </span>
      </span>
      <span class="xly-json-viewer__toolbar-right">
        <span
          v-if="showExpand"
          class="xly-json-viewer__btn"
          title="展开全部"
          @click="handleExpandAll"
        >
          <XlyIcon name="el:ArrowDown" />
          <span>展开</span>
        </span>
        <span
          v-if="showExpand"
          class="xly-json-viewer__btn"
          title="折叠全部"
          @click="handleCollapseAll"
        >
          <XlyIcon name="el:ArrowUp" />
          <span>折叠</span>
        </span>
      </span>
    </div>

    <!-- JSON 内容 -->
    <div class="xly-json-viewer__content" :style="{ maxHeight: maxHeight }">
      <pre
        v-if="parsedData !== null"
        class="xly-json-viewer__pre"
      ><JsonNode :data="parsedData" :path="'root'" :depth="0" :max-depth="currentDepth" :theme="theme" :expanded-set="expandedSet" :collapsed-set="collapsedSet" @toggle="toggleNode" /></pre>
      <div v-else class="xly-json-viewer__empty">暂无数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, h, defineComponent, type VNode } from 'vue'
import { xly } from '@/utils/xly'

defineOptions({ name: 'XlyJsonViewer' })

// ========== 递归节点组件 ==========

interface NodeProps {
  data: unknown
  path: string
  depth: number
  maxDepth: number
  theme: 'light' | 'dark'
  expandedSet: Set<string>
  collapsedSet: Set<string>
}

const JsonNode = defineComponent({
  name: 'JsonNode',
  props: {
    data: { type: null, required: true },
    path: { type: String, required: true },
    depth: { type: Number, required: true },
    maxDepth: { type: Number, required: true },
    theme: { type: String, required: true },
    expandedSet: { type: Set, required: true },
    collapsedSet: { type: Set, required: true },
  },
  emits: ['toggle'],
  setup(nodeProps: NodeProps, { emit }) {
    // 当前是否展开
    const isExpanded = computed(() => {
      if (nodeProps.collapsedSet.has(nodeProps.path)) return false
      if (nodeProps.expandedSet.has(nodeProps.path)) return true
      // depth=0 表示全部展开，maxDepth=0 也表示全部展开
      return nodeProps.maxDepth <= 0 || nodeProps.depth < nodeProps.maxDepth
    })

    // 是否可展开
    const isExpandable = computed(() => {
      const d = nodeProps.data
      if (d === null) return false
      if (typeof d !== 'object') return false
      if (Array.isArray(d)) return d.length > 0
      return Object.keys(d).length > 0
    })

    // 子项数量
    const itemCount = computed(() => {
      const d = nodeProps.data
      if (d === null || !isExpandable.value) return 0
      if (Array.isArray(d)) return d.length
      return Object.keys(d).length
    })

    // 点击切换
    const handleClick = (e: Event) => {
      e.stopPropagation()
      if (!isExpandable.value) return
      emit('toggle', nodeProps.path, isExpanded.value)
    }

    // 渲染基础类型
    const renderPrimitive = (val: unknown, theme: string): VNode => {
      let cls = 'json-primitive'
      let text = String(val)
      if (val === null) {
        cls = 'json-null'
        text = 'null'
      } else if (typeof val === 'string') {
        cls = 'json-string'
        text = `"${val}"`
      } else if (typeof val === 'number') cls = 'json-number'
      else if (typeof val === 'boolean') cls = 'json-boolean'

      return h('span', { class: ['json-value', cls, `json-value--${theme}`] }, text)
    }

    // 递归渲染子节点
    const renderChildren = (d: unknown, path: string, depth: number, theme: string): VNode[] => {
      const nodes: VNode[] = []
      const indent = '  '.repeat(depth + 1)

      if (Array.isArray(d)) {
        d.forEach((item, idx) => {
          const childPath = `${path}-${idx}`
          nodes.push(h('span', { class: 'json-indent' }, '\n' + indent))
          nodes.push(
            h(JsonNode, {
              data: item,
              path: childPath,
              depth: depth + 1,
              maxDepth: nodeProps.maxDepth,
              theme,
              expandedSet: nodeProps.expandedSet,
              collapsedSet: nodeProps.collapsedSet,
              onToggle: (id: string, current: boolean) => emit('toggle', id, current),
            }),
          )
          if (idx < d.length - 1) {
            nodes.push(h('span', { class: 'json-comma' }, ','))
          }
        })
      } else {
        const entries = Object.entries(d as Record<string, unknown>)
        entries.forEach(([key, val], idx) => {
          const childPath = `${path}-${key}`
          nodes.push(h('span', { class: 'json-indent' }, '\n' + indent))
          nodes.push(
            h('span', { class: ['json-key', `json-key--${theme}`] }, `"${key}"`),
            h('span', { class: 'json-colon' }, ': '),
            h(JsonNode, {
              data: val,
              path: childPath,
              depth: depth + 1,
              maxDepth: nodeProps.maxDepth,
              theme,
              expandedSet: nodeProps.expandedSet,
              collapsedSet: nodeProps.collapsedSet,
              onToggle: (id: string, current: boolean) => emit('toggle', id, current),
            }),
          )
          if (idx < entries.length - 1) {
            nodes.push(h('span', { class: 'json-comma' }, ','))
          }
        })
      }
      return nodes
    }

    return () => {
      const d = nodeProps.data
      const t = nodeProps.theme
      const depth = nodeProps.depth
      const path = nodeProps.path
      const expanded = isExpanded.value

      // 基础类型
      if (d === null || typeof d !== 'object') {
        return h('span', { class: 'json-node' }, [renderPrimitive(d, t)])
      }

      // 对象或数组
      const isArr = Array.isArray(d)
      const open = isArr ? '[' : '{'
      const close = isArr ? ']' : '}'

      const content: VNode[] = []

      // 切换图标（图标在 { 前面）
      if (isExpandable.value) {
        content.push(
          h('span', { class: 'json-toggle', onClick: handleClick }, expanded ? '▼' : '▶'),
        )
      }

      // 开括号
      content.push(h('span', { class: 'json-bracket' }, open))

      if (!expanded) {
        content.push(
          h(
            'span',
            { class: ['json-collapsed', `json-collapsed--${t}`] },
            `... ${itemCount.value} 项`,
          ),
        )
      } else {
        const children = renderChildren(d, path, depth, t)
        content.push(...children)
        const indent = '  '.repeat(depth)
        content.push(h('span', { class: 'json-indent' }, '\n' + indent))
      }

      content.push(h('span', { class: 'json-bracket' }, close))

      return h('span', { class: 'json-node' }, content)
    }
  },
})

// ========== 主组件逻辑 ==========

// Props
const props = withDefaults(
  defineProps<{
    data?: unknown
    depth?: number
    width?: string
    maxHeight?: string
    theme?: 'light' | 'dark'
    showToolbar?: boolean
    showCopy?: boolean
    showExpand?: boolean
  }>(),
  {
    depth: 3,
    theme: 'light',
    showToolbar: true,
    showCopy: true,
    showExpand: true,
  },
)

// 展开深度：0 表示全部展开
const currentDepth = ref(props.depth ?? 3)

// 手动操作记录
const expandedSet = ref<Set<string>>(new Set())
const collapsedSet = ref<Set<string>>(new Set())

// 解析 JSON
const parsedData = computed(() => {
  if (props.data === undefined || props.data === null) return null
  if (typeof props.data === 'string') {
    try {
      return JSON.parse(props.data)
    } catch {
      return props.data
    }
  }
  return props.data
})

// 收集所有路径
const collectAllPaths = (data: unknown, path: string): string[] => {
  const paths: string[] = []
  if (data === null || typeof data !== 'object') return paths
  if (Array.isArray(data) && data.length > 0) {
    paths.push(path)
    data.forEach((item, idx) => paths.push(...collectAllPaths(item, `${path}-${idx}`)))
  } else if (!Array.isArray(data)) {
    const keys = Object.keys(data)
    if (keys.length > 0) {
      paths.push(path)
      keys.forEach((key) =>
        paths.push(...collectAllPaths((data as Record<string, unknown>)[key], `${path}-${key}`)),
      )
    }
  }
  return paths
}

// 展开全部
const handleExpandAll = () => {
  collapsedSet.value = new Set()
  if (parsedData.value !== null) {
    const allPaths = collectAllPaths(parsedData.value, 'root')
    expandedSet.value = new Set(allPaths)
  }
}

// 折叠全部
const handleCollapseAll = () => {
  if (parsedData.value !== null) {
    const allPaths = collectAllPaths(parsedData.value, 'root')
    expandedSet.value = new Set()
    collapsedSet.value = new Set(allPaths)
  }
}

// 切换节点
const toggleNode = (nodePath: string, currentExpanded: boolean) => {
  if (currentExpanded) {
    expandedSet.value.delete(nodePath)
    collapsedSet.value.add(nodePath)
    expandedSet.value = new Set(expandedSet.value)
    collapsedSet.value = new Set(collapsedSet.value)
  } else {
    collapsedSet.value.delete(nodePath)
    expandedSet.value.add(nodePath)
    collapsedSet.value = new Set(collapsedSet.value)
    expandedSet.value = new Set(expandedSet.value)
  }
}

// 复制
const handleCopy = () => {
  if (parsedData.value === null) return
  const str =
    typeof parsedData.value === 'string'
      ? parsedData.value
      : JSON.stringify(parsedData.value, null, 2)
  navigator.clipboard.writeText(str).then(() => {
    xly.$msg.success('已复制到剪贴板')
  })
}

// 监听 data 变化
watch(
  () => props.data,
  () => {
    currentDepth.value = props.depth ?? 3
    expandedSet.value = new Set()
    collapsedSet.value = new Set()
  },
)
</script>

<style lang="scss">
@use './index.scss';
</style>
