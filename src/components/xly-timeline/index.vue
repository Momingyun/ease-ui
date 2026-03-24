<template>
  <div class="xly-timeline" :class="[`xly-timeline--${direction}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, useSlots } from 'vue'

type TimelineDirection = 'horizontal' | 'vertical'
type TimelineStatus = 'wait' | 'process' | 'finish' | 'error'

const props = withDefaults(defineProps<{
  /** 时间线方向 */
  direction?: TimelineDirection
  /** 是否倒序显示 */
  reverse?: boolean
  /** 自定义类名 */
  customClass?: string
}>(), {
  direction: 'vertical',
  reverse: false,
  customClass: '',
})

const slots = useSlots()

// 计算子节点数量
const items = computed(() => {
  if (!slots.default) return []
  return slots.default().filter((vnode) => {
    return vnode.component?.type?.name === 'XlyTimelineItem'
  })
})

const itemCount = computed(() => items.value.length)

// 提供时间线上下文给子组件
const timelineContext = ref({
  direction: computed(() => props.direction),
  reverse: computed(() => props.reverse),
  itemCount,
})

provide('timeline', timelineContext)

defineOptions({
  name: 'XlyTimeline',
})
</script>

<style scoped lang="scss">
.xly-timeline {
  &--vertical {
    padding-left: 0;
  }

  &--horizontal {
    display: flex;
    align-items: flex-start;
    width: 100%;

    :deep(.xly-timeline-item) {
      flex: 1;
    }
  }
}
</style>
