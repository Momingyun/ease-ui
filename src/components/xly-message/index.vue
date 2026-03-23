<template>
  <Teleport to="body">
    <template v-for="pos in positions" :key="pos">
      <TransitionGroup
        v-if="groupedList[pos]?.length"
        name="xly-message"
        tag="div"
        class="xly-message-container"
        :class="`xly-message-container--${pos}`"
      >
        <div
          v-for="item in groupedList[pos]"
          :key="item.id"
          class="xly-message"
          :class="[
            `xly-message--${item.type}`,
            { 'xly-message--closable': item.closable },
            item.customClass || '',
          ]"
          :style="item.customStyle"
          @mouseenter="handleMouseEnter(item)"
          @mouseleave="handleMouseLeave(item)"
        >
          <!-- 图标 -->
          <div class="xly-message__icon" v-if="item.type !== 'text'">
            <svg v-if="item.type === 'success'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="8,12 11,15 16,9" />
            </svg>
            <svg v-else-if="item.type === 'warning'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <svg v-else-if="item.type === 'danger'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <svg v-else-if="item.type === 'info'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>

          <!-- 内容 -->
          <div class="xly-message__content">
            <span v-if="item.title" class="xly-message__title">{{ item.title }}</span>
            <span class="xly-message__text">{{ item.message }}</span>
          </div>

          <!-- 关闭按钮 -->
          <button v-if="item.closable" class="xly-message__close" @click="closeMessage(item.id)">
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="8" y1="8" x2="16" y2="16" />
              <line x1="16" y1="8" x2="8" y2="16" />
            </svg>
          </button>

          <!-- 进度条 -->
          <div v-if="item.showProgress" class="xly-message__progress">
            <div
              class="xly-message__progress-bar"
              :class="`xly-message__progress-bar--${item.type}`"
              :style="{ animationDuration: item.duration + 'ms' }"
            />
          </div>
        </div>
      </TransitionGroup>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { positions, groupedList, type MessageItem, handleMouseEnter, handleMouseLeave, XlyMsg } from './message'

defineExpose(XlyMsg)
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$bg-white: #ffffff;
$bg-success: rgba(52, 199, 89, 0.08);
$bg-warning: rgba(255, 159, 10, 0.08);
$bg-danger: rgba(245, 108, 108, 0.08);
$bg-info: rgba(79, 110, 247, 0.08);
$text-primary: #1a1a2e;
$text-success: #2ea44f;
$text-warning: #d48806;
$text-danger: #cf222e;
$text-info: #4f6ef7;
$text-muted: #6e6e80;
$border-success: rgba(52, 199, 89, 0.25);
$border-warning: rgba(255, 159, 10, 0.25);
$border-danger: rgba(245, 108, 108, 0.25);
$border-info: rgba(79, 110, 247, 0.25);
$progress-success: #34c759;
$progress-warning: #ff9f0a;
$progress-danger: #f56c6c;
$progress-info: #4f6ef7;
$radius: 10px;
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04);
$shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.04);
$transition-fast: 0.2s ease;

/* ========== 容器 ========== */
.xly-message-container {
  position: fixed;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: 420px;

  &--top {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &--top-left {
    top: 20px;
    left: 20px;
  }

  &--top-right {
    top: 20px;
    right: 20px;
  }

  &--bottom {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom-left {
    bottom: 20px;
    left: 20px;
  }

  &--bottom-right {
    bottom: 20px;
    right: 20px;
  }
}

/* ========== 消息项 ========== */
.xly-message {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-radius: $radius;
  background-color: $bg-white;
  box-shadow: $shadow-md;
  border: 1px solid transparent;
  pointer-events: auto;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 280px;
  max-width: 100%;
}

/* ========== 类型样式 ========== */
.xly-message--success {
  background-color: $bg-success;
  border-color: $border-success;

  .xly-message__icon {
    color: $text-success;
  }

  .xly-message__title {
    color: $text-success;
  }
}

.xly-message--warning {
  background-color: $bg-warning;
  border-color: $border-warning;

  .xly-message__icon {
    color: $text-warning;
  }

  .xly-message__title {
    color: $text-warning;
  }
}

.xly-message--danger {
  background-color: $bg-danger;
  border-color: $border-danger;

  .xly-message__icon {
    color: $text-danger;
  }

  .xly-message__title {
    color: $text-danger;
  }
}

.xly-message--info {
  background-color: $bg-info;
  border-color: $border-info;

  .xly-message__icon {
    color: $text-info;
  }

  .xly-message__title {
    color: $text-info;
  }
}

.xly-message--text {
  background-color: $bg-white;
  border-color: #ebedf2;
}

/* ========== 图标 ========== */
.xly-message__icon {
  flex-shrink: 0;
  font-size: 18px;
  line-height: 1.4;
  margin-top: 1px;
}

/* ========== 内容 ========== */
.xly-message__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.xly-message__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: $text-primary;
}

.xly-message__text {
  font-size: 13px;
  line-height: 1.6;
  color: $text-muted;
  word-break: break-word;
}

/* ========== 关闭按钮 ========== */
.xly-message__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #b0b0c0;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all $transition-fast;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    color: $text-muted;
  }
}

/* ========== 进度条 ========== */
.xly-message__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 0 0 $radius $radius;
  overflow: hidden;
}

.xly-message__progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation: xly-progress-shrink linear forwards;
  border-radius: 0 0 $radius $radius;

  &--success {
    background-color: $progress-success;
  }

  &--warning {
    background-color: $progress-warning;
  }

  &--danger {
    background-color: $progress-danger;
  }

  &--info {
    background-color: $progress-info;
  }

  &--text {
    background-color: #c0c0d0;
  }
}

@keyframes xly-progress-shrink {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}

/* ========== 过渡动画 ========== */
.xly-message-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}

.xly-message-leave-active {
  transition: all 0.2s ease;
}

.xly-message-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

.xly-message-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.xly-message-move {
  transition: transform 0.25s ease;
}
</style>
