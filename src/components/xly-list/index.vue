<template>
  <div class="xly-list" :class="{ 'xly-list--bordered': bordered }">
    <!-- 头部 -->
    <div v-if="header || $slots.header" class="xly-list__header">
      <slot name="header">{{ header }}</slot>
    </div>

    <!-- 内容区 -->
    <div class="xly-list__body" :style="{ maxHeight: maxHeight }">
      <!-- 加载中 -->
      <div v-if="loading" class="xly-list__loading">
        <XlyLoading size="20px" />
        <span>加载中...</span>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!list || list.length === 0" class="xly-list__empty">
        <slot name="empty">
          <XlyEmpty v-if="showEmpty" :description="emptyText" />
          <span v-else>{{ emptyText }}</span>
        </slot>
      </div>

      <!-- 列表内容 -->
      <div v-else class="xly-list__content">
        <div
          v-for="(item, index) in list"
          :key="getKey(item, index)"
          class="xly-list__item"
          :class="{
            'xly-list__item--hoverable': hoverable,
            'xly-list__item--clickable': clickable,
          }"
          @click="handleItemClick(item, index)"
        >
          <!-- 自定义渲染 -->
          <slot v-if="$slots.default" :item="item" :index="index" />
          <!-- 默认渲染 -->
          <template v-else>
            <div v-if="avatar && avatar !== ''" class="xly-list__item-avatar">
              <img v-if="isImageUrl(item[avatar])" :src="item[avatar]" alt="" />
              <span v-else>{{ getFieldValue(item, avatar) }}</span>
            </div>
            <div class="xly-list__item-content">
              <div class="xly-list__item-title">
                {{ getFieldValue(item, title) }}
              </div>
              <div v-if="description" class="xly-list__item-desc">
                {{ getFieldValue(item, description) }}
              </div>
            </div>
            <div v-if="$slots.extra || extra" class="xly-list__item-extra">
              <slot name="extra" :item="item" :index="index">
                {{ getFieldValue(item, extra!) }}
              </slot>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div v-if="footer || $slots.footer" class="xly-list__footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import XlyLoading from '@/components/xly-loading/index.vue'
import XlyEmpty from '@/components/xly-empty/index.vue'

defineOptions({ name: 'XlyList' })

export interface ListProps {
  /** 数据源 */
  list?: any[]
  /** 主字段名（默认 title） */
  title?: string
  /** 描述字段名 */
  description?: string
  /** 头像字段名或固定值 */
  avatar?: string
  /** 额外内容字段名 */
  extra?: string
  /** 唯一标识字段名（默认 id） */
  rowKey?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否显示空状态组件 */
  showEmpty?: boolean
  /** 空状态文字 */
  emptyText?: string
  /** 加载状态 */
  loading?: boolean
  /** 悬停效果 */
  hoverable?: boolean
  /** 最大高度 */
  maxHeight?: string
  /** 头部内容 */
  header?: string
  /** 底部内容 */
  footer?: string
}

const props = withDefaults(defineProps<ListProps>(), {
  list: () => [],
  title: 'title',
  description: '',
  avatar: '',
  extra: '',
  rowKey: 'id',
  bordered: false,
  showEmpty: true,
  emptyText: '暂无数据',
  loading: false,
  hoverable: false,
  maxHeight: '',
  header: '',
  footer: '',
})

const emit = defineEmits<{
  (e: 'item-click', item: any, index: number): void
}>()

function getKey(item: any, index: number): string | number {
  return item[props.rowKey] ?? index
}

function getFieldValue(item: any, field: string): string {
  return item?.[field] ?? ''
}

function handleItemClick(item: any, index: number) {
  emit('item-click', item, index)
}

function isImageUrl(url: string): boolean {
  if (!url) return false
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(url) || url.startsWith('http')
}
</script>

<style scoped lang="scss">
.xly-list {
  width: 100%;

  &.xly-list--bordered {
    border: 1px solid #f2f3f7;
    border-radius: 8px;
    overflow: hidden;
  }
}

.xly-list__header {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  background: #fafbfd;
  border-bottom: 1px solid #f2f3f7;
}

.xly-list__body {
  overflow-y: auto;
}

.xly-list__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  color: #8e8ea0;
  font-size: 14px;
}

.xly-list__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #8e8ea0;
  font-size: 14px;
}

.xly-list__content {
  // 默认列表样式
}

.xly-list__item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f2f3f7;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &.xly-list__item--hoverable:hover {
    background: #f5f7fa;
  }

  &.xly-list__item--clickable {
    cursor: pointer;
  }
}

.xly-list__item-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #8e8ea0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.xly-list__item-content {
  flex: 1;
  min-width: 0;
}

.xly-list__item-title {
  font-size: 14px;
  color: #1a1a2e;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-list__item-desc {
  font-size: 13px;
  color: #8e8ea0;
  line-height: 1.5;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-list__item-extra {
  flex-shrink: 0;
  margin-left: 12px;
  color: #8e8ea0;
  font-size: 13px;
}

.xly-list__footer {
  padding: 12px 16px;
  font-size: 14px;
  color: #8e8ea0;
  background: #fafbfd;
  border-top: 1px solid #f2f3f7;
}
</style>
