<template>
  <div class="theme-switcher">
    <span class="ts-label">切换风格</span>
    <div class="ts-list">
      <button
        v-for="t in themes"
        :key="t.id"
        class="ts-item"
        :class="{ active: modelValue === t.id }"
        :title="t.name"
        @click="$emit('update:modelValue', t.id)"
      >
        <span class="ts-dot" :style="{ background: t.color }" />
        <span class="ts-name">{{ t.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ThemeConfig {
  id: string
  name: string
  color: string
}

defineProps<{
  modelValue: string
  themes: ThemeConfig[]
}>()

defineEmits<{
  'update:modelValue': [id: string]
}>()
</script>

<style scoped lang="scss">
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 18, 36, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 48px;
  padding: 7px 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22);
}

.ts-label {
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-weight: 500;
  white-space: nowrap;
  margin-right: 4px;
}

.ts-list {
  display: flex;
  gap: 5px;
}

.ts-item {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 20px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.22s;
  background: transparent;

  &.active {
    background: rgba(255,255,255,0.11);
    border-color: rgba(255,255,255,0.22);
  }

  &:hover:not(.active) {
    background: rgba(255,255,255,0.07);
  }
}

.ts-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}

.ts-name {
  font-size: 11px;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
}

/* 小屏隐藏名称 */
@media (max-width: 600px) {
  .ts-name { display: none; }
  .ts-item { padding: 0 7px; }
}
</style>
