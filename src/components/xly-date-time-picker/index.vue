<template>
  <div class="xly-date-time-picker" :class="[`xly-date-time-picker--${size}`, { 'is-disabled': disabled }]">
    <div
      ref="wrapperRef"
      class="xly-date-time-picker__wrapper"
      :class="{ 'is-focus': focusing, 'is-hover': hovering && !disabled }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 前缀图标 -->
      <span class="xly-date-time-picker__prefix">
        <slot name="prefix">
          <el-icon><Calendar /></el-icon>
        </slot>
      </span>

      <!-- 输入 -->
      <input
        ref="inputRef"
        class="xly-date-time-picker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="openPicker"
      />

      <!-- 清除 -->
      <span v-if="clearable && modelValue && !disabled" class="xly-date-time-picker__clear" @click.stop="clear">
        <el-icon><Close /></el-icon>
      </span>
    </div>

    <!-- 选择面板 -->
    <Teleport to="body">
      <Transition name="xly-dtp-fade">
        <div
          v-if="panelVisible"
          ref="panelRef"
          class="xly-date-time-picker__panel"
          :style="panelStyle"
          @mousedown="handlePanelMouseDown"
        >
          <!-- 左侧：日期选择 -->
          <div class="xly-dtp__date-section">
            <!-- 头部：年月切换 -->
            <div class="xly-dtp-date__header">
              <el-icon class="xly-dtp-date__nav" @click="prevMonth"><ArrowLeft /></el-icon>
              <span class="xly-dtp-date__title" @click="toggleYearMode">{{ panelTitle }}</span>
              <el-icon class="xly-dtp-date__nav" @click="nextMonth"><ArrowRight /></el-icon>
            </div>

            <!-- 年份选择 -->
            <div v-if="yearMode" class="xly-dtp-date__body">
              <div class="xly-dtp-date__year-grid">
                <div
                  v-for="year in yearRange"
                  :key="year"
                  class="xly-dtp-date__year-cell"
                  :class="{
                    'is-current': year === currentYear,
                    'is-selected': year === panelYear,
                  }"
                  @click="selectYear(year)"
                >
                  {{ year }}
                </div>
              </div>
            </div>

            <!-- 日历 -->
            <div v-else class="xly-dtp-date__body">
              <div class="xly-dtp-date__weekdays">
                <span v-for="w in weekdays" :key="w">{{ w }}</span>
              </div>
              <div class="xly-dtp-date__days">
                <div
                  v-for="(day, i) in calendarDays"
                  :key="i"
                  class="xly-dtp-date__day"
                  :class="{
                    'is-other': !day.isCurrentMonth,
                    'is-today': day.isToday,
                    'is-selected': day.fullDate === panelDateStr,
                  }"
                  @click="selectDay(day)"
                >
                  {{ day.date }}
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：时间选择 -->
          <div class="xly-dtp__time-section">
            <!-- 手动输入区 -->
            <div class="xly-dtp-time__input-area">
              <input
                ref="hoursInputRef"
                class="xly-dtp-time__time-input"
                maxlength="2"
                @input="onTimeInput($event, 'hours')"
                @blur="onTimeBlur($event, 'hours')"
                @keydown.down.prevent="adjustInput('hours', 1)"
                @keydown.up.prevent="adjustInput('hours', -1)"
                @keydown.enter.prevent="focusNextInput('minutes')"
              />
              <span class="xly-dtp-time__input-sep">:</span>
              <input
                ref="minutesInputRef"
                class="xly-dtp-time__time-input"
                maxlength="2"
                @input="onTimeInput($event, 'minutes')"
                @blur="onTimeBlur($event, 'minutes')"
                @keydown.down.prevent="adjustInput('minutes', 1)"
                @keydown.up.prevent="adjustInput('minutes', -1)"
                @keydown.enter.prevent="showSeconds ? focusNextInput('seconds') : confirm()"
              />
              <template v-if="showSeconds">
                <span class="xly-dtp-time__input-sep">:</span>
                <input
                  ref="secondsInputRef"
                  class="xly-dtp-time__time-input"
                  maxlength="2"
                  @input="onTimeInput($event, 'seconds')"
                  @blur="onTimeBlur($event, 'seconds')"
                  @keydown.down.prevent="adjustInput('seconds', 1)"
                  @keydown.up.prevent="adjustInput('seconds', -1)"
                  @keydown.enter.prevent="confirm()"
                />
              </template>
            </div>

            <!-- 滚动列表面板 -->
            <div class="xly-dtp-time__body">
              <!-- 时 -->
              <div class="xly-dtp-time__column">
                <div class="xly-dtp-time__list-wrap">
                  <div
                    ref="hoursListRef"
                    class="xly-dtp-time__list"
                    @scroll.passive="onScroll($event, 'hours')"
                  >
                    <div
                      v-for="h in 24"
                      :key="h - 1"
                      class="xly-dtp-time__item"
                      :class="{ 'is-selected': h - 1 === panelHours }"
                      @click="selectTimeUnit('hours', h - 1)"
                    >
                      {{ String(h - 1).padStart(2, '0') }}
                    </div>
                  </div>
                </div>
              </div>

              <span class="xly-dtp-time__sep">:</span>

              <!-- 分 -->
              <div class="xly-dtp-time__column">
                <div class="xly-dtp-time__list-wrap">
                  <div
                    ref="minutesListRef"
                    class="xly-dtp-time__list"
                    @scroll.passive="onScroll($event, 'minutes')"
                  >
                    <div
                      v-for="m in 60"
                      :key="m - 1"
                      class="xly-dtp-time__item"
                      :class="{ 'is-selected': m - 1 === panelMinutes }"
                      @click="selectTimeUnit('minutes', m - 1)"
                    >
                      {{ String(m - 1).padStart(2, '0') }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 秒 -->
              <template v-if="showSeconds">
                <span class="xly-dtp-time__sep">:</span>
                <div class="xly-dtp-time__column">
                  <div class="xly-dtp-time__list-wrap">
                    <div
                      ref="secondsListRef"
                      class="xly-dtp-time__list"
                      @scroll.passive="onScroll($event, 'seconds')"
                    >
                      <div
                        v-for="s in 60"
                        :key="s - 1"
                        class="xly-dtp-time__item"
                        :class="{ 'is-selected': s - 1 === panelSeconds }"
                        @click="selectTimeUnit('seconds', s - 1)"
                      >
                        {{ String(s - 1).padStart(2, '0') }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="xly-dtp__footer">
            <button class="xly-dtp__btn xly-dtp__btn--now" @click="setNow">此刻</button>
            <button class="xly-dtp__btn xly-dtp__btn--primary" @click="confirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { Calendar, Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

defineOptions({ name: 'XlyDateTimePicker' })

export interface DateTimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showSeconds?: boolean
  size?: 'large' | 'default' | 'small'
  /** 输出格式，默认 'YYYY-MM-DD HH:mm[:ss]' */
  format?: string
}

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期时间',
  disabled: false,
  readonly: false,
  clearable: true,
  showSeconds: false,
  size: 'default',
  format: '',
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
const yearMode = ref(false)
const tick = ref(0)
// 用户正在手动输入时间时，阻止 scroll 回调覆盖输入框内容
const isManualInputting = ref(false)

// ========== 日历相关 ==========
const now = new Date()
const panelYear = ref(now.getFullYear())
const panelMonth = ref(now.getMonth())
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const yearRangeStart = computed(() => Math.floor(panelYear.value / 10) * 10)
const yearRange = computed(() => {
  const start = yearRangeStart.value
  return Array.from({ length: 12 }, (_, i) => start + i)
})

const panelTitle = computed(() => {
  if (yearMode.value) return `${yearRangeStart.value} - ${yearRangeStart.value + 11}`
  return `${panelYear.value} 年 ${panelMonth.value + 1} 月`
})

const calendarDays = computed(() => {
  const year = panelYear.value
  const month = panelMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekday = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const prevLastDay = new Date(year, month, 0).getDate()

  const days: Array<{ date: number; isCurrentMonth: boolean; isToday: boolean; fullDate: string }> = []

  for (let i = startWeekday - 1; i >= 0; i--) {
    days.push({ date: prevLastDay - i, isCurrentMonth: false, isToday: false, fullDate: '' })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i)
    days.push({
      date: i,
      isCurrentMonth: true,
      isToday: d.toDateString() === now.toDateString(),
      fullDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
    })
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, isCurrentMonth: false, isToday: false, fullDate: '' })
  }

  return days
})

// ========== 时间相关 ==========
const panelHours = ref(0)
const panelMinutes = ref(0)
const panelSeconds = ref(0)

const ITEM_HEIGHT = 32
const VISIBLE_ITEMS = 7
const SCROLL_OFFSET = Math.floor(VISIBLE_ITEMS / 2)

// ========== 面板日期字符串 ==========
const panelDateStr = computed(() => {
  return `${panelYear.value}-${String(panelMonth.value + 1).padStart(2, '0')}-${String(panelDay.value).padStart(2, '0')}`
})
const panelDay = ref(1)

// ========== 解析 modelValue ==========
function parseModelValue(val: string) {
  if (!val) return null
  // 尝试多种格式
  const date = new Date(val.replace(/-/g, '/'))
  if (isNaN(date.getTime())) return null
  return date
}

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue
})

// ========== 面板定位 ==========
const panelStyle = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tick.value
  if (!wrapperRef.value) return {}
  const rect = wrapperRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  if (spaceBelow < 400) {
    return {
      top: `${rect.top - 400 - 4}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
  }
})

// ========== 时间滚动 ==========
function scrollToValue(listEl: HTMLElement | null, value: number) {
  if (!listEl) return
  listEl.scrollTop = (value - SCROLL_OFFSET) * ITEM_HEIGHT
}

function scrollToAllTimeLists() {
  scrollToValue(hoursListRef.value, panelHours.value)
  scrollToValue(minutesListRef.value, panelMinutes.value)
  scrollToValue(secondsListRef.value, panelSeconds.value)
}

function onScroll(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  const el = e.target as HTMLElement
  const value = Math.round(el.scrollTop / ITEM_HEIGHT) + SCROLL_OFFSET
  if (unit === 'hours') panelHours.value = Math.max(0, Math.min(23, value))
  else if (unit === 'minutes') panelMinutes.value = Math.max(0, Math.min(59, value))
  else panelSeconds.value = Math.max(0, Math.min(59, value))
  syncInputsFromValues()
}

function selectTimeUnit(unit: 'hours' | 'minutes' | 'seconds', val: number) {
  if (unit === 'hours') {
    panelHours.value = val
    scrollToValue(hoursListRef.value, val)
  } else if (unit === 'minutes') {
    panelMinutes.value = val
    scrollToValue(minutesListRef.value, val)
  } else {
    panelSeconds.value = val
    scrollToValue(secondsListRef.value, val)
  }
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

/** 将面板值同步到所有输入框 DOM（输入中时跳过，避免覆盖用户正在输入的内容） */
function syncInputsFromValues() {
  if (isManualInputting.value) return
  const h = hoursInputRef.value
  const m = minutesInputRef.value
  const s = secondsInputRef.value
  if (h) h.value = String(panelHours.value).padStart(2, '0')
  if (m) m.value = String(panelMinutes.value).padStart(2, '0')
  if (s) s.value = String(panelSeconds.value).padStart(2, '0')
}

/** 滚动到指定单元的列表位置（不触发 onScroll 的同步） */
function scrollToUnit(unit: 'hours' | 'minutes' | 'seconds', value: number) {
  const listEl = unit === 'hours' ? hoursListRef.value
    : unit === 'minutes' ? minutesListRef.value
    : secondsListRef.value
  if (!listEl) return
  listEl.scrollTop = (value - SCROLL_OFFSET) * ITEM_HEIGHT
}

/** 输入事件：只过滤非数字、限制2位，不同步回输入框 */
function onTimeInput(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  isManualInputting.value = true
  const el = e.target as HTMLInputElement
  const raw = el.value.replace(/\D/g, '').slice(0, 2)
  if (raw !== el.value) {
    el.value = raw
  }
  const max = getUnitMax(unit)
  const num = raw.length > 0 ? parseInt(raw, 10) : 0
  const val = isNaN(num) ? 0 : Math.max(0, Math.min(max, num))
  if (unit === 'hours') panelHours.value = val
  else if (unit === 'minutes') panelMinutes.value = val
  else panelSeconds.value = val
  // 只滚动当前列，避免多列同时滚动引发多余的 onScroll
  scrollToUnit(unit, val)
}

/** blur 时格式化（补零、限制范围），延迟重置输入标志以防 passive scroll 异步触发 */
function onTimeBlur(e: Event, unit: 'hours' | 'minutes' | 'seconds') {
  const el = e.target as HTMLInputElement
  const max = getUnitMax(unit)
  const num = parseInt(el.value, 10)
  if (isNaN(num) || el.value.trim() === '') {
    el.value = '00'
  } else {
    el.value = String(Math.max(0, Math.min(max, num))).padStart(2, '0')
  }
  const val = parseInt(el.value, 10)
  if (unit === 'hours') panelHours.value = val
  else if (unit === 'minutes') panelMinutes.value = val
  else panelSeconds.value = val
  // 延迟重置，确保 passive scroll 事件不会再覆盖输入框
  setTimeout(() => {
    isManualInputting.value = false
  }, 100)
}

/** 上下键调整数值 */
function adjustInput(unit: 'hours' | 'minutes' | 'seconds', delta: number) {
  const max = getUnitMax(unit) + 1
  if (unit === 'hours') panelHours.value = (panelHours.value + delta + max) % max
  else if (unit === 'minutes') panelMinutes.value = (panelMinutes.value + delta + max) % max
  else panelSeconds.value = (panelSeconds.value + delta + max) % max
  syncInputsFromValues()
  scrollToAllTimeLists()
}

/** Enter 键跳转到下一个输入框 */
function focusNextInput(unit: 'hours' | 'minutes' | 'seconds') {
  const ref = getInputRef(unit)
  nextTick(() => {
    if (ref.value) ref.value.focus()
  })
}

// ========== 日历操作 ==========
function prevMonth() {
  if (yearMode.value) {
    panelYear.value -= 10
  } else {
    panelMonth.value--
    if (panelMonth.value < 0) { panelMonth.value = 11; panelYear.value-- }
  }
}

function nextMonth() {
  if (yearMode.value) {
    panelYear.value += 10
  } else {
    panelMonth.value++
    if (panelMonth.value > 11) { panelMonth.value = 0; panelYear.value++ }
  }
}

function toggleYearMode() {
  yearMode.value = !yearMode.value
}

function selectYear(year: number) {
  panelYear.value = year
  yearMode.value = false
}

function selectDay(day: { date: number; isCurrentMonth: boolean; fullDate: string }) {
  if (!day.isCurrentMonth) return
  panelDay.value = day.date
}

// ========== 面板操作 ==========
function openPicker() {
  if (props.disabled || props.readonly) return

  // 解析当前值
  const parsed = parseModelValue(props.modelValue)
  if (parsed) {
    panelYear.value = parsed.getFullYear()
    panelMonth.value = parsed.getMonth()
    panelDay.value = parsed.getDate()
    panelHours.value = parsed.getHours()
    panelMinutes.value = parsed.getMinutes()
    panelSeconds.value = parsed.getSeconds()
  } else {
    const n = new Date()
    panelYear.value = n.getFullYear()
    panelMonth.value = n.getMonth()
    panelDay.value = n.getDate()
    panelHours.value = 0
    panelMinutes.value = 0
    panelSeconds.value = 0
  }

  tick.value++
  panelVisible.value = true
  nextTick(() => {
    syncInputsFromValues()
    scrollToAllTimeLists()
  })
}

function closePicker() {
  panelVisible.value = false
  yearMode.value = false
}

function setNow() {
  const n = new Date()
  panelYear.value = n.getFullYear()
  panelMonth.value = n.getMonth()
  panelDay.value = n.getDate()
  panelHours.value = n.getHours()
  panelMinutes.value = n.getMinutes()
  panelSeconds.value = n.getSeconds()
  nextTick(() => {
    syncInputsFromValues()
    scrollToAllTimeLists()
  })
}

function formatOutput(): string {
  const y = panelYear.value
  const mo = String(panelMonth.value + 1).padStart(2, '0')
  const d = String(panelDay.value).padStart(2, '0')
  const h = String(panelHours.value).padStart(2, '0')
  const mi = String(panelMinutes.value).padStart(2, '0')
  const s = String(panelSeconds.value).padStart(2, '0')

  if (props.format) {
    return props.format
      .replace('YYYY', String(y))
      .replace('MM', mo)
      .replace('DD', d)
      .replace('HH', h)
      .replace('mm', mi)
      .replace('ss', s)
  }

  if (props.showSeconds) return `${y}-${mo}-${d} ${h}:${mi}:${s}`
  return `${y}-${mo}-${d} ${h}:${mi}`
}

function confirm() {
  const val = formatOutput()
  emit('update:modelValue', val)
  emit('change', val)
  closePicker()
}

function clear() {
  emit('update:modelValue', '')
  emit('change', '')
}

function handleFocus() { focusing.value = true }
function handleBlur() { focusing.value = false }

// ========== 外部事件 ==========

function handlePanelMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement
  const isInput = target.closest('.xly-dtp-time__input-area')
  if (!isInput) {
    e.preventDefault()
  }
}

function handleClickOutside(e: MouseEvent) {
  if (!panelVisible.value) return
  const active = document.activeElement as HTMLElement | null
  if (active && panelRef.value?.contains(active)) return
  const target = e.target as HTMLElement
  if (wrapperRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePicker()
}

function handleScrollClose(e: Event) {
  if (!panelVisible.value) return
  const target = e.target as HTMLElement
  if (panelRef.value?.contains(target)) return
  closePicker()
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

.xly-date-time-picker {
  display: inline-flex;
  width: 100%;

  &--large &__wrapper { height: 44px; }
  &--large &__input { font-size: 15px; }
  &--default &__wrapper { height: 36px; }
  &--default &__input { font-size: 14px; }
  &--small &__wrapper { height: 30px; }
  &--small &__input { font-size: 13px; }
}

.xly-date-time-picker__wrapper {
  flex: 1;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  cursor: pointer;
  transition: $transition;

  &.is-hover:not(.is-disabled) { border-color: $border-hover; }
  &.is-focus { border-color: $border-focus; box-shadow: 0 0 0 2px $primary-light; }
}

.xly-date-time-picker__prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  color: $text-placeholder;
  flex-shrink: 0;
}

.xly-date-time-picker__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: $text-color;
  cursor: pointer;
  font-family: inherit;

  &::placeholder { color: $text-placeholder; }
}

.xly-date-time-picker__clear {
  display: inline-flex;
  cursor: pointer;
  color: $text-placeholder;
  border-radius: 50%;
  &:hover { color: $text-color; }
}
</style>

<style lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$primary-light-hover: rgba(79, 110, 247, 0.15);
$border-color: #e2e4ed;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;

.xly-date-time-picker__panel {
  position: fixed;
  z-index: 2000;
  display: flex;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  user-select: none;
}

// 日期区
.xly-dtp__date-section {
  border-right: 1px solid $border-color;
  padding: 8px;
}

.xly-dtp-date__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 8px;
}

.xly-dtp-date__nav {
  display: inline-flex;
  cursor: pointer;
  color: $text-color;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.15s;
  &:hover { background: $primary-light; }
}

.xly-dtp-date__title {
  font-size: 15px;
  font-weight: 600;
  color: $text-color;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: $primary-light; }
}

.xly-dtp-date__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 4px 0;
  border-bottom: 1px solid $border-color;

  span {
    text-align: center;
    font-size: 12px;
    color: $text-placeholder;
    font-weight: 500;
    padding: 4px 0;
  }
}

.xly-dtp-date__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 4px 0;
}

.xly-dtp-date__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  color: $text-color;

  &:hover:not(.is-other):not(.is-selected) { background: $primary-light; }
  &.is-other { color: $disabled-color; }
  &.is-today { color: $primary; font-weight: 600; }
  &.is-selected { background: $primary; color: #fff; font-weight: 500; }
}

.xly-dtp-date__year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
}

.xly-dtp-date__year-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  color: $text-color;

  &:hover:not(.is-selected) { background: $primary-light; }
  &.is-current { color: $primary; font-weight: 600; }
  &.is-selected { background: $primary; color: #fff; }
}

// 时间区
.xly-dtp__time-section {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

// 手动输入区
.xly-dtp-time__input-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 8px;
  border-bottom: 1px solid #f0f1f5;
  gap: 2px;
  margin-bottom: 8px;
}

.xly-dtp-time__time-input {
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

.xly-dtp-time__input-sep {
  font-size: 16px;
  font-weight: 600;
  color: $text-placeholder;
  margin: 0 2px;
}

// 滚动列表区
.xly-dtp-time__body {
  display: flex;
  align-items: stretch;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 4px;
    right: 4px;
    height: 32px;
    transform: translateY(-50%);
    background: rgba(79, 110, 247, 0.06);
    border-radius: 6px;
    pointer-events: none;
    z-index: 1;
  }
}

.xly-dtp-time__column {
  width: 48px;
  position: relative;
}

.xly-dtp-time__sep {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: $text-placeholder;
  width: 12px;
  flex-shrink: 0;
}

.xly-dtp-time__list-wrap {
  height: 224px;
  overflow: hidden;
}

.xly-dtp-time__list {
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.xly-dtp-time__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 13px;
  color: $text-color;
  cursor: pointer;
  transition: color 0.15s, font-size 0.15s, font-weight 0.15s;
  scroll-snap-align: start;
  position: relative;
  z-index: 2;
  padding-left: 10px;

  &.is-selected {
    color: $primary;
    font-weight: 600;
    font-size: 14px;
  }
}

// 底部
.xly-dtp__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-top: 1px solid $border-color;
}

.xly-dtp__btn {
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
    &:hover { color: $primary; }
  }

  &--primary {
    background: transparent;
    color: $primary;
    font-weight: 500;
    &:hover { background: $primary; color: #fff; }
  }
}

// 过渡
.xly-dtp-fade-enter-active,
.xly-dtp-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top center;
}
.xly-dtp-fade-enter-from,
.xly-dtp-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}
</style>
