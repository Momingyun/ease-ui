<template>
  <Teleport to="body">
    <Transition name="xly-msgbox-fade">
      <div
        v-if="state.visible"
        class="xly-msgbox-overlay"
        :class="{ 'xly-msgbox-overlay--center': true }"
        @click.self="handleOverlayClick"
      >
        <Transition name="xly-msgbox-zoom">
          <div
            v-if="state.visible"
            class="xly-msgbox"
            :class="[state.options.customClass]"
            role="dialog"
            aria-modal="true"
            @keydown.esc="handleEsc"
          >
            <!-- 关闭按钮 -->
            <button
              v-if="state.options.showClose !== false"
              class="xly-msgbox__close"
              aria-label="关闭"
              @click="handleClose"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- 头部：图标 + 标题 -->
            <div class="xly-msgbox__header" :class="{ 'xly-msgbox__header--no-title': !state.options.title }">
              <div v-if="showIcon" class="xly-msgbox__icon" :class="`xly-msgbox__icon--${state.options.type || 'info'}`">
                <!-- success -->
                <svg v-if="state.options.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8,12 11,15 16,9" />
                </svg>
                <!-- warning -->
                <svg v-else-if="state.options.type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <!-- danger -->
                <svg v-else-if="state.options.type === 'danger'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <!-- info (default) -->
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <span v-if="state.options.title" class="xly-msgbox__title">{{ state.options.title }}</span>
            </div>

            <!-- 内容 -->
            <div class="xly-msgbox__body">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p
                v-if="state.options.dangerouslyUseHTMLString"
                class="xly-msgbox__message"
                v-html="state.options.message"
              />
              <p v-else class="xly-msgbox__message">{{ state.options.message }}</p>

              <!-- 输入框 -->
              <div v-if="state.options.showInput" class="xly-msgbox__input-wrap">
                <textarea
                  v-if="state.options.input?.inputType === 'textarea'"
                  ref="inputRef"
                  v-model="state.inputValue"
                  class="xly-msgbox__input xly-msgbox__input--textarea"
                  :class="{ 'xly-msgbox__input--error': state.inputError }"
                  :placeholder="state.options.input?.placeholder || ''"
                  rows="3"
                  @keydown.enter.ctrl="handleConfirm"
                />
                <input
                  v-else
                  ref="inputRef"
                  v-model="state.inputValue"
                  class="xly-msgbox__input"
                  :class="{ 'xly-msgbox__input--error': state.inputError }"
                  :type="state.options.input?.inputType || 'text'"
                  :placeholder="state.options.input?.placeholder || ''"
                  @keydown.enter="handleConfirm"
                />
                <Transition name="xly-msgbox-err">
                  <span v-if="state.inputError" class="xly-msgbox__input-error">{{ state.inputError }}</span>
                </Transition>
              </div>
            </div>

            <!-- 按钮区 -->
            <div class="xly-msgbox__footer">
              <button
                v-if="state.options.showCancelButton !== false && state.options.showCancelButton"
                class="xly-msgbox__btn xly-msgbox__btn--cancel"
                :disabled="state.loading"
                @click="handleCancel"
              >
                {{ state.options.cancelButtonText || '取消' }}
              </button>
              <button
                v-if="state.options.showConfirmButton !== false"
                class="xly-msgbox__btn xly-msgbox__btn--confirm"
                :class="{ 'xly-msgbox__btn--danger': state.options.confirmButtonDanger }"
                :disabled="state.loading"
                @click="handleConfirm"
              >
                <span v-if="state.loading" class="xly-msgbox__btn-loader" />
                {{ state.options.confirmButtonText || '确定' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { msgboxState } from './msgbox'

defineOptions({ name: 'XlyMsgBox' })

const state = msgboxState
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)

// 输入框出现时自动聚焦
watch(
  () => state.visible,
  async (v) => {
    if (v && state.options.showInput) {
      await nextTick()
      inputRef.value?.focus()
    }
  },
)

// 是否显示头部图标
const showIcon = computed(() => !!state.options.type)

// ---------- 事件处理 ----------

function handleOverlayClick() {
  if (state.options.closeOnClickModal) {
    handleClose()
  }
}

function handleEsc() {
  if (state.options.closeOnPressEscape !== false) {
    handleClose()
  }
}

function handleClose() {
  if (state.options.distinguishCancelAndClose) {
    state._reject('close')
    state.options.onCancel?.()
  } else {
    state._reject('cancel')
    state.options.onCancel?.()
  }
}

function handleCancel() {
  state._reject('cancel')
  state.options.onCancel?.()
}

async function handleConfirm() {
  // Prompt 模式校验
  if (state.options.showInput) {
    const pattern = state.options.input?.pattern
    if (pattern) {
      const reg = new RegExp(pattern)
      if (!reg.test(state.inputValue)) {
        state.inputError = state.options.input?.patternMessage || '输入内容不符合要求'
        return
      }
    }
    if (!state.inputValue.trim() && state.options.input?.inputType !== 'number') {
      state.inputError = '请输入内容'
      return
    }
  }

  state.inputError = ''
  state.options.onConfirm?.(state.inputValue)
  state._resolve('confirm', state.inputValue)
}

// 清除错误提示
watch(
  () => state.inputValue,
  () => {
    if (state.inputError) state.inputError = ''
  },
)
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$color-primary: #4f6ef7;
$color-success: #2ea44f;
$color-warning: #d48806;
$color-danger: #cf222e;
$color-info: #4f6ef7;

$bg-dialog: #ffffff;
$radius-dialog: 12px;
$shadow-dialog: 0 8px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06);

$text-primary: #1a1a2e;
$text-secondary: #4a4a5a;
$text-muted: #8888a0;

$border-color: #e4e6f0;
$bg-input: #f5f6fa;
$bg-input-focus: #ffffff;

/* ========== 遮罩层 ========== */
.xly-msgbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 3100;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== 弹框主体 ========== */
.xly-msgbox {
  position: relative;
  width: 420px;
  max-width: calc(100vw - 32px);
  background: $bg-dialog;
  border-radius: $radius-dialog;
  box-shadow: $shadow-dialog;
  overflow: hidden;
  outline: none;
}

/* ========== 关闭按钮 ========== */
.xly-msgbox__close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  color: $text-muted;
  z-index: 1;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    color: $text-secondary;
  }
}

/* ========== 头部 ========== */
.xly-msgbox__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 48px 0 22px;

  &--no-title {
    padding-bottom: 4px;
  }
}

/* ========== 图标 ========== */
.xly-msgbox__icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  &--success { color: $color-success; }
  &--warning { color: $color-warning; }
  &--danger  { color: $color-danger; }
  &--info    { color: $color-info; }
}

/* ========== 标题 ========== */
.xly-msgbox__title {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.4;
}

/* ========== 内容区 ========== */
.xly-msgbox__body {
  padding: 12px 22px 0;
}

.xly-msgbox__message {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: $text-secondary;
  word-break: break-word;
}

/* ========== 输入框 ========== */
.xly-msgbox__input-wrap {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.xly-msgbox__input {
  width: 100%;
  box-sizing: border-box;
  height: 38px;
  padding: 0 12px;
  font-size: 14px;
  color: $text-primary;
  background: $bg-input;
  border: 1.5px solid $border-color;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
  font-family: inherit;

  &::placeholder {
    color: $text-muted;
  }

  &:focus {
    background: $bg-input-focus;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.12);
  }

  &--error {
    border-color: $color-danger !important;
    box-shadow: 0 0 0 3px rgba(207, 34, 46, 0.1) !important;
  }

  &--textarea {
    height: auto;
    padding: 8px 12px;
    resize: vertical;
    line-height: 1.6;
  }
}

.xly-msgbox__input-error {
  font-size: 12px;
  color: $color-danger;
  line-height: 1.4;
}

/* ========== 按钮区 ========== */
.xly-msgbox__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 18px 22px 20px;
}

.xly-msgbox__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--cancel {
    background: #f5f6fa;
    color: $text-secondary;
    border-color: $border-color;

    &:hover:not(:disabled) {
      background: #ebedf5;
      border-color: darken(#e4e6f0, 6%);
    }

    &:active:not(:disabled) {
      background: #e0e2ec;
    }
  }

  &--confirm {
    background: $color-primary;
    color: #ffffff;
    border-color: $color-primary;

    &:hover:not(:disabled) {
      background: darken($color-primary, 6%);
      border-color: darken($color-primary, 6%);
    }

    &:active:not(:disabled) {
      background: darken($color-primary, 12%);
    }
  }

  &--danger {
    background: $color-danger !important;
    border-color: $color-danger !important;

    &:hover:not(:disabled) {
      background: darken($color-danger, 6%) !important;
      border-color: darken($color-danger, 6%) !important;
    }
  }
}

/* ========== 按钮 loading 图标 ========== */
.xly-msgbox__btn-loader {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: xly-msgbox-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes xly-msgbox-spin {
  to { transform: rotate(360deg); }
}

/* ========== 过渡动画 ========== */
.xly-msgbox-fade-enter-active,
.xly-msgbox-fade-leave-active {
  transition: opacity 0.22s ease;
}

.xly-msgbox-fade-enter-from,
.xly-msgbox-fade-leave-to {
  opacity: 0;
}

.xly-msgbox-zoom-enter-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
}

.xly-msgbox-zoom-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.xly-msgbox-zoom-enter-from,
.xly-msgbox-zoom-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

/* 输入错误提示动画 */
.xly-msgbox-err-enter-active {
  transition: opacity 0.18s, transform 0.18s;
}

.xly-msgbox-err-leave-active {
  transition: opacity 0.12s;
}

.xly-msgbox-err-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.xly-msgbox-err-leave-to {
  opacity: 0;
}
</style>
