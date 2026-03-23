<template>
  <div class="xly-time-picker" :class="[`xly-time-picker--${size}`, { 'is-disabled': disabled }]">
    <div
      ref="wrapperRef"
      class="xly-time-picker__wrapper"
      :class="{ 'is-focus': focusing, 'is-hover': hovering && !disabled }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 前缀图标 -->
      <span class="xly-time-picker__prefix">
        <slot name="prefix">
          <el-icon><Clock /></el-icon>
        </slot>
      </span>

      <!-- 时间输入（只读，点击打开弹窗） -->
      <input
        ref="inputRef"
        class="xly-time-picker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="openPanel"
      />

      <!-- 清除 -->
      <span
        v-if="clearable && modelValue && !disabled"
        class="xly-time-picker__clear"
        @click.stop="clear"
      >
        <el-icon><Close /></el-icon>
      </span>
    </div>

    <!-- 时间面板 -->
    <Teleport to="body">
      <Transition name="xly-time-picker-fade">
        <div
          v-if="panelVisible"
          ref="panelRef"
          class="xly-time-picker__panel"
          :style="panelStyle"
          @mousedown="handlePanelMouseDown"
        >
          <!-- 手动输入区 -->
          <div class="xly-time-panel__input-area">
            <input
              ref="hoursInputRef"
              class="xly-time-panel__time-input"
              maxlength="2"
              :value="String(panelHours).padStart(2, '0')"
              @input="onTimeInput($event, 'hours')"
              @blur="onTimeBlur($event, 'hours')"
              @keydown.down.prevent="adjustInput('hours', 1)"
              @keydown.up.prevent="adjustInput('hours', -1)"
              @keydown.enter.prevent="focusNextInput('minutes')"
            />
            <span class="xly-time-panel__input-sep">:</span>
            <input
              ref="minutesInputRef"
              class="xly-time-panel__time-input"
              maxlength="2"
              @input="onTimeInput($event, 'minutes')"
              @blur="onTimeBlur($event, 'minutes')"
              @keydown.down.prevent="adjustInput('minutes', 1)"
              @keydown.up.prevent="adjustInput('minutes', -1)"
              @keydown.enter.prevent="showSeconds ? focusNextInput('seconds') : confirm()"
            />
            <template v-if="showSeconds">
              <span class="xly-time-panel__input-sep">:</span>
              <input
                ref="secondsInputRef"
                class="xly-time-panel__time-input"
                maxlength="2"
                @input="onTimeInput($event, 'seconds')"
                @blur="onTimeBlur($event, 'seconds')"
                @keydown.down.prevent="adjustInput('seconds', 1)"
                @keydown.up.prevent="adjustInput('seconds', -1)"
                @keydown.enter.prevent="confirm"
              />
            </template>
          </div>

          <!-- 滚动列表区 -->
          <div class="xly-time-panel__body">
            <!-- 时 -->
            <div class="xly-time-panel__column">
              <div class="xly-time-panel__list-wrap">
                <div
                  ref="hoursListRef"
                  class="xly-time-panel__list"
                  @scroll.passive="onScroll($event, 'hours')"
                >
                  <div
                    v-for="h in 24"
                    :key="h - 1"
                    class="xly-time-panel__item"
                    :class="{ 'is-selected': h - 1 === panelHours }"
                    @click="selectHour(h - 1)"
                  >
                    {{ String(h - 1).padStart(2, '0') }}
                  </div>
                </div>
              </div>
            </div>

            <span class="xly-time-panel__sep">:</span>

            <!-- 分 -->
            <div class="xly-time-panel__column">
              <div class="xly-time-panel__list-wrap">
                <div
                  ref="minutesListRef"
                  class="xly-time-panel__list"
                  @scroll.passive="onScroll($event, 'minutes')"
                >
                  <div
                    v-for="m in 60"
                    :key="m - 1"
                    class="xly-time-panel__item"
                    :class="{ 'is-selected': m - 1 === panelMinutes }"
                    @click="selectMinute(m - 1)"
                  >
                    {{ String(m - 1).padStart(2, '0') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 秒（可选） -->
            <template v-if="showSeconds">
              <span class="xly-time-panel__sep">:</span>
              <div class="xly-time-panel__column">
                <div class="xly-time-panel__list-wrap">
                  <div
                    ref="secondsListRef"
                    class="xly-time-panel__list"
                    @scroll.passive="onScroll($event, 'seconds')"
                  >
                    <div
                      v-for="s in 60"
                      :key="s - 1"
                      class="xly-time-panel__item"
                      :class="{ 'is-selected': s - 1 === panelSeconds }"
                      @click="selectSecond(s - 1)"
                    >
                      {{ String(s - 1).padStart(2, '0') }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 底部按钮 -->
          <div class="xly-time-panel__footer">
            <button class="xly-time-panel__btn xly-time-panel__btn--now" @click="setNow">
              此刻
            </button>
            <button class="xly-time-panel__btn xly-time-panel__btn--primary" @click="confirm">
              确定
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Clock, Close } from '@element-plus/icons-vue'

export interface TimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showSeconds?: boolean
  size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: true,
  showSeconds: false,
  size: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const hoursListRef = ref<HTMLElement | null>(null)
const minutesListRef = ref<HTMLElement | null>(null)
const secondsListRef = ref<HTMLElement | null>(null)
const hoursInputRef = ref<HTMLInputElement | null>(null)
const minutesInputRef = ref<HTMLInputElement | null>(null)
const secondsInputRef = ref<HTMLInputElement | null>(null)
const focusing = ref(false)
const hovering = ref(false)
const panelVisible = ref(false)
const tick = ref(0)

// 面板临时值
const panelHours = ref(0)
const panelMinutes = ref(0)
const panelSeconds = ref(0)

const ITEM_HEIGHT = 32
const VISIBLE_ITEMS = 7
const SCROLL_OFFSET = Math.floor(VISIBLE_ITEMS / 2) // = 3

function parseTime(val: string) {
  if (!val) return { h: 0, m: 0, s: 0 }
  const parts = val.split(':').map(Number)
  return {
    h: isNaN(parts[0]) ? 0 : Math.max(0, Math.min(23, parts[0])),
    m: isNaN(parts[1]) ? 0 : Math.max(0, Math.min(59, parts[1])),
    s: isNaN(parts[2]) ? 0 : Math.max(0, Math.min(59, parts[2])),
  }
}

const displayValue = computed(() => props.modelValue)

const panelStyle = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tick.value
  if (!wrapperRef.value) return {}
  const rect = wrapperRef.value.getBoundingClientRect()
  return {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
  }
})

function scrollToValue(listEl: HTMLElement | null, value: number) {
  if (!listEl) return
  listEl.scrollTop = (value - SCROLL_OFFSET) * ITEM_HEIGHT
}

function openPanel() {
  if (props.disabled || props.readonly) return
  const parsed = parseTime(props.modelValue)
  panelHours.value = parsed.h
  panelMinutes.value = parsed.m
  panelSeconds.value = parsed.s
  tick.value++
  panelVisible.value = true
  nextTick(() => {
    syncInputsFromValues()
    scrollToAllLists()
  })
}

function closePanel() {
  panelVisible.value = false
}

function scrollToAllLists() {
  scrollToValue(hoursListRef.value, panelHours.value)
  scrollToValue(minutesListRef.value, panelMinutes.value)
  scrollToValue(secondsListRef.value, panelSeconds.value)
}

function formatOutput(): string {
  const h = String(panelHours.value).padStart(2, '0')
  const m = String(panelMinutes.value).padStart(2, '0')
  if (props.showSeconds) return `${h}:${m}:${String(panelSeconds.value).padStart(2, '0')}`
  return `${h}:${m}`
}

function setNow() {
  const now = new Date()
  panelHours.value = now.getHours()
  panelMinutes.value = now.getMinutes()
  panelSeconds.value = now.getSeconds()
  nextTick(() => {
    syncInputsFromValues()
    scrollToAllLists()
  })
}

function confirm() {
  const val = formatOutput()
  emit('update:modelValue', val)
  emit('change', val)
  closePanel()
}

function selectHour(h: number) {
  panelHours.value = h
  scrollToValue(hoursListRef.value, h)
  syncInputsFromValues()
}

function selectMinute(m: number) {
  panelMinutes.value = m
  scrollToValue(minutesListRef.value, m)
  syncInputsFromValues()
}

function selectSecond(s: number) {
  panelSeconds.value = s
  scrollToValue(secondsListRef.value, s)
  syncInputsFromValues()
}

function onScroll(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  const el = e.target as HTMLElement
  const value = Math.round(el.scrollTop / ITEM_HEIGHT) + SCROLL_OFFSET
  if (unit === 'hours') panelHours.value = Math.max(0, Math.min(23, value))
  else if (unit === 'minutes') panelMinutes.value = Math.max(0, Math.min(59, value))
  else panelSeconds.value = Math.max(0, Math.min(59, value))
  syncInputsFromValues()
}

// ========== 面板内分段输入框 ==========

function getInputRef(unit: 'hours' | 'minutes' | 'seconds') {
  if (unit === 'hours') return hoursInputRef
  if (unit === 'minutes') return minutesInputRef
  return secondsInputRef
}

function getUnitMax(unit: 'hours' | 'minutes' | 'seconds') {
  return unit === 'hours' ? 23 : 59
}

/** 将面板值同步到所有输入框 DOM */
function syncInputsFromValues() {
  const h = hoursInputRef.value
  const m = minutesInputRef.value
  const s = secondsInputRef.value
  if (h) h.value = String(panelHours.value).padStart(2, '0')
  if (m) m.value = String(panelMinutes.value).padStart(2, '0')
  if (s) s.value = String(panelSeconds.value).padStart(2, '0')
}

/** 输入事件：只过滤非数字、限制2位，不干预光标 */
function onTimeInput(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  const el = e.target as HTMLInputElement
  const raw = el.value.replace(/\D/g, '').slice(0, 2)

  // 只在内容真的被过滤时才重写（避免干扰正常输入和光标位置）
  if (raw !== el.value) {
    el.value = raw
  }

  const max = getUnitMax(unit)
  const num = raw.length > 0 ? parseInt(raw, 10) : 0
  const val = isNaN(num) ? 0 : Math.max(0, Math.min(max, num))

  if (unit === 'hours') panelHours.value = val
  else if (unit === 'minutes') panelMinutes.value = val
  else panelSeconds.value = val
  scrollToAllLists()
}

/** blur 时格式化（补零、限制范围） */
function onTimeBlur(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  const el = e.target as HTMLInputElement
  const max = getUnitMax(unit)
  const num = parseInt(el.value, 10)
  if (isNaN(num) || el.value.trim() === '') {
    el.value = '00'
  } else {
    el.value = String(Math.max(0, Math.min(max, num))).padStart(2, '0')
  }
  // blur 时将最终值同步到面板
  const val = parseInt(el.value, 10)
  if (unit === 'hours') panelHours.value = val
  else if (unit === 'minutes') panelMinutes.value = val
  else panelSeconds.value = val
}

/** 上下键调整数值 */
function adjustInput(unit: 'hours' | 'minutes' | 'seconds', delta: number) {
  const max = getUnitMax(unit) + 1
  if (unit === 'hours') panelHours.value = (panelHours.value + delta + max) % max
  else if (unit === 'minutes') panelMinutes.value = (panelMinutes.value + delta + max) % max
  else panelSeconds.value = (panelSeconds.value + delta + max) % max
  syncInputsFromValues()
  scrollToAllLists()
}

/** Enter 键跳转到下一个输入框 */
function focusNextInput(unit: 'hours' | 'minutes' | 'seconds') {
  const ref = getInputRef(unit)
  nextTick(() => {
    if (ref.value) ref.value.focus()
  })
}

// ========== 外部事件 ==========
function handlePanelMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement
  const isInput = target.closest('.xly-time-panel__input-area')
  if (!isInput) {
    e.preventDefault()
  }
}

function clear() {
  emit('update:modelValue', '')
  emit('change', '')
}

function handleFocus() {
  focusing.value = true
}
function handleBlur() {
  focusing.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (!panelVisible.value) return
  const active = document.activeElement as HTMLElement | null
  if (active && panelRef.value?.contains(active)) return
  const target = e.target as HTMLElement
  if (wrapperRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePanel()
}

function handleScrollClose(e: Event) {
  if (!panelVisible.value) return
  const target = e.target as HTMLElement
  if (panelRef.value?.contains(target)) return
  closePanel()
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', handleScrollClose, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', handleScrollClose, true)
})
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$border-focus: #4f6ef7;
$border-hover: #c8cbd8;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;
$transition: all 0.2s ease;

.xly-time-picker {
  display: inline-flex;
  width: 100%;

  &--large &__wrapper {
    height: 44px;
  }
  &--large &__input {
    font-size: 15px;
  }
  &--default &__wrapper {
    height: 36px;
  }
  &--default &__input {
    font-size: 14px;
  }
  &--small &__wrapper {
    height: 30px;
  }
  &--small &__input {
    font-size: 13px;
  }
}

.xly-time-picker__wrapper {
  flex: 1;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  cursor: pointer;
  transition: $transition;

  &.is-hover:not(.is-disabled) {
    border-color: $border-hover;
  }
  &.is-focus {
    border-color: $border-focus;
    box-shadow: 0 0 0 2px $primary-light;
  }
}

.xly-time-picker__prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  color: $text-placeholder;
  flex-shrink: 0;
}

.xly-time-picker__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: $text-color;
  cursor: pointer;
  font-family: inherit;
  &::placeholder {
    color: $text-placeholder;
  }
}

.xly-time-picker__clear {
  display: inline-flex;
  cursor: pointer;
  color: $text-placeholder;
  border-radius: 50%;
  &:hover {
    color: $text-color;
  }
}
</style>

<style lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;

// ========== 时间面板（Teleport 到 body，不能 scoped）==========
.xly-time-picker__panel {
  position: fixed;
  z-index: 2000;
  width: auto;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  user-select: none;
}

// 手动输入区
.xly-time-panel__input-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px 12px;
  border-bottom: 1px solid #f0f1f5;
  gap: 2px;
}

.xly-time-panel__time-input {
  width: 44px;
  height: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  color: $text-color;
  background: #f5f7fa;
  border: 1px solid transparent;
  border-radius: 6px;
  outline: none;
  cursor: text;
  transition: all 0.15s;

  &:focus {
    background: #fff;
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(79, 110, 247, 0.12);
  }
}

.xly-time-panel__input-sep {
  font-size: 16px;
  font-weight: 600;
  color: $text-placeholder;
  margin: 0 2px;
}

// 滚动列表区
.xly-time-panel__body {
  display: flex;
  align-items: stretch;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 8px;
    right: 8px;
    height: 32px;
    transform: translateY(-50%);
    background: rgba(79, 110, 247, 0.06);
    border-radius: 6px;
    pointer-events: none;
    z-index: 1;
  }
}

.xly-time-panel__column {
  width: 48px;
  position: relative;
}

.xly-time-panel__sep {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: $text-placeholder;
  width: 16px;
  flex-shrink: 0;
}

.xly-time-panel__list-wrap {
  height: 224px;
  overflow: hidden;
}

.xly-time-panel__list {
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.xly-time-panel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 13px;
  color: $text-color;
  cursor: pointer;
  transition:
    color 0.15s,
    font-size 0.15s,
    font-weight 0.15s;
  scroll-snap-align: start;
  position: relative;
  z-index: 2;
  padding-left: 25px;

  &.is-selected {
    color: $primary;
    font-weight: 600;
    font-size: 14px;
  }
}

// 底部
.xly-time-panel__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
}

.xly-time-panel__btn {
  padding: 4px 12px;
  border: none;
  background: transparent;
  color: $text-color;
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.5;

  &--now {
    color: $text-placeholder;
    &:hover {
      color: $primary;
    }
  }

  &--primary {
    background: transparent;
    color: $primary;
    font-weight: 500;
    &:hover {
      background: $primary;
      color: #fff;
    }
  }
}

// 过渡
.xly-time-picker-fade-enter-active,
.xly-time-picker-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.xly-time-picker-fade-enter-from,
.xly-time-picker-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}
</style>
