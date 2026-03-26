<template>
  <slot />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  /** 标签文字 */
  label?: string
  /** 标签图标 */
  icon?: string
  /** 跨列数 */
  span?: number
}>(), {
  label: '',
  icon: '',
  span: 1,
})

defineOptions({ name: 'XlyDescriptionsItem' })
</script>
