<template>
  <div class="xly-date-picker" :class="[`xly-date-picker--${size}`, { 'is-disabled': disabled }]">
    <div
      ref="wrapperRef"
      class="xly-date-picker__wrapper"
      :class="{ 'is-focus': focusing, 'is-hover': hovering && !disabled }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 前缀图标 -->
      <span class="xly-date-picker__prefix">
        <slot name="prefix">
          <el-icon><Calendar /></el-icon>
        </slot>
      </span>

      <!-- 日期输入 -->
      <input
        ref="inputRef"
        class="xly-date-picker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="openPicker"
      />

      <!-- 清除 -->
      <span v-if="clearable && modelValue && !disabled" class="xly-date-picker__clear" @click.stop="clear">
        <el-icon><Close /></el-icon>
      </span>
    </div>

    <!-- 日期选择面板 -->
    <Teleport to="body">
      <Transition name="xly-date-picker-fade">
        <div
          v-if="panelVisible"
          ref="panelRef"
          class="xly-date-picker__panel"
          :style="panelStyle"
          @mousedown.prevent
        >
          <!-- 头部：年月切换 -->
          <div class="xly-date-panel__header">
            <el-icon class="xly-date-panel__nav" @click="prevMonth"><ArrowLeft /></el-icon>
            <span class="xly-date-panel__title" :class="{ 'is-title-clickable': type !== 'year' }" @click="toggleYearMode">{{ panelTitle }}</span>
            <el-icon class="xly-date-panel__nav" @click="nextMonth"><ArrowRight /></el-icon>
          </div>

          <!-- 年份选择 -->
          <div v-if="type === 'year' || yearMode" class="xly-date-panel__body">
            <div class="xly-date-panel__year-grid">
              <div
                v-for="year in yearRange"
                :key="year"
                class="xly-date-panel__year-cell"
                :class="{
                  'is-current': year === currentYear && type !== 'month',
                  'is-selected': isYearSelected(year),
                }"
                @click="selectYear(year)"
              >
                {{ year }}
              </div>
            </div>
          </div>

          <!-- 月份选择 -->
          <div v-else-if="type?.startsWith('month')" class="xly-date-panel__body">
            <div class="xly-date-panel__month-grid">
              <div
                v-for="(m, i) in months"
                :key="i"
                class="xly-date-panel__month-cell"
                :class="{
                  'is-current': i === currentMonth && panelYear === currentYear,
                  'is-selected': isMonthSelected(i),
                }"
                @click="selectMonth(i)"
              >
                {{ m }}
              </div>
            </div>
          </div>

          <!-- 日历（日期模式） -->
          <div v-else class="xly-date-panel__body">
            <!-- 星期标题 -->
            <div class="xly-date-panel__weekdays">
              <span v-for="w in weekdays" :key="w">{{ w }}</span>
            </div>
            <!-- 日期网格 -->
            <div class="xly-date-panel__days">
              <div
                v-for="(day, i) in calendarDays"
                :key="i"
                class="xly-date-panel__day"
                :class="{
                  'is-other': !day.isCurrentMonth,
                  'is-today': day.isToday,
                  'is-selected': isSelectedDate(day),
                  'is-range-start': isRangeStart(day),
                  'is-range-end': isRangeEnd(day),
                  'is-in-range': isInRange(day),
                }"
                @click="selectDay(day)"
              >
                {{ day.date }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { Calendar, Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

export interface DatePickerProps {
  modelValue?: string
  type?: 'date' | 'month' | 'year'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  format?: string
  size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  type: 'date',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: true,
  format: 'YYYY-MM-DD',
  size: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const focusing = ref(false)
const hovering = ref(false)
const panelVisible = ref(false)
const yearMode = ref(false)
const tick = ref(0)

// 面板当前显示的年月
const now = new Date()
const panelYear = ref(now.getFullYear())
const panelMonth = ref(now.getMonth())
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

// 从 modelValue 解析选中日期
const selectedDate = computed(() => {
  if (!props.modelValue) return null
  const d = new Date(props.modelValue)
  return isNaN(d.getTime()) ? null : d
})

const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  return formatDate(selectedDate.value)
})

const panelTitle = computed(() => {
  if (yearMode.value) return `${yearRangeStart.value} - ${yearRangeStart.value + 11}`
  if (props.type === 'month') return `${panelYear.value}`
  return `${panelYear.value} 年 ${panelMonth.value + 1} 月`
})

// 年份范围
const yearRangeStart = computed(() => {
  const start = Math.floor(panelYear.value / 10) * 10
  return start
})

const yearRange = computed(() => {
  const start = yearRangeStart.value
  return Array.from({ length: 12 }, (_, i) => start + i)
})

// 生成日历天
const calendarDays = computed(() => {
  const year = panelYear.value
  const month = panelMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekday = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  // 上月补齐
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

  // 下月补齐到 6 行
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, isCurrentMonth: false, isToday: false, fullDate: '' })
  }

  return days
})

// 面板定位
const panelStyle = computed(() => {
  // 依赖 tick，确保每次打开面板时重新计算位置
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tick.value
  if (!wrapperRef.value) return {}
  const rect = wrapperRef.value.getBoundingClientRect()
  return {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
  }
})

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return props.format
    .replace('YYYY', String(y))
    .replace('MM', m)
    .replace('DD', d)
}

function openPicker() {
  if (props.disabled || props.readonly) return
  if (selectedDate.value) {
    panelYear.value = selectedDate.value.getFullYear()
    panelMonth.value = selectedDate.value.getMonth()
  }
  if (props.type === 'year') {
    yearMode.value = true
  }
  tick.value++
  panelVisible.value = true
}

function closePicker() {
  panelVisible.value = false
  yearMode.value = false
}

function prevMonth() {
  if (props.type === 'year' || yearMode.value) {
    panelYear.value -= 10
  } else {
    panelMonth.value--
    if (panelMonth.value < 0) { panelMonth.value = 11; panelYear.value-- }
  }
}

function nextMonth() {
  if (props.type === 'year' || yearMode.value) {
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
  if (props.type === 'year') {
    emit('update:modelValue', String(year))
    emit('change', String(year))
    closePicker()
  } else {
    yearMode.value = false
  }
}

function selectMonth(month: number) {
  panelMonth.value = month
  if (props.type?.startsWith('month')) {
    const val = `${panelYear.value}-${String(month + 1).padStart(2, '0')}`
    emit('update:modelValue', val)
    emit('change', val)
    closePicker()
  }
}

function selectDay(day: { date: number; isCurrentMonth: boolean; fullDate: string }) {
  if (!day.isCurrentMonth) return
  emit('update:modelValue', day.fullDate)
  emit('change', day.fullDate)
  closePicker()
}

function isSelectedDate(day: { fullDate: string }) {
  if (!day.fullDate || !props.modelValue) return false
  return day.fullDate === props.modelValue
}

function isYearSelected(year: number) {
  return props.modelValue === String(year)
}

function isMonthSelected(month: number) {
  return props.modelValue === `${panelYear.value}-${String(month + 1).padStart(2, '0')}`
}

function isRangeStart() { return false }
function isRangeEnd() { return false }
function isInRange() { return false }

function clear() {
  emit('update:modelValue', '')
  emit('change', '')
}

function handleFocus() { focusing.value = true }
function handleBlur() { focusing.value = false }

function handleClickOutside(e: MouseEvent) {
  if (!panelVisible.value) return
  const target = e.target as HTMLElement
  if (wrapperRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePicker()
}

function handleScrollClose(e: Event) {
  if (!panelVisible.value) return
  // 排除面板内部的滚动（如年份列表滚动不应关闭面板）
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
$primary-light-hover: rgba(79, 110, 247, 0.15);
$border-color: #e2e4ed;
$border-focus: #4f6ef7;
$border-hover: #c8cbd8;
$disabled-bg: #f5f7fa;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;
$transition: all 0.2s ease;

.xly-date-picker {
  display: inline-flex;
  width: 100%;

  &--large &__wrapper { height: 44px; }
  &--large &__input { font-size: 15px; }
  &--default &__wrapper { height: 36px; }
  &--default &__input { font-size: 14px; }
  &--small &__wrapper { height: 30px; }
  &--small &__input { font-size: 13px; }
}

.xly-date-picker__wrapper {
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

.xly-date-picker__prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  color: $text-placeholder;
  flex-shrink: 0;
}

.xly-date-picker__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: $text-color;
  cursor: pointer;
  font-family: inherit;

  &::placeholder { color: $text-placeholder; }
}

.xly-date-picker__clear {
  display: inline-flex;
  cursor: pointer;
  color: $text-placeholder;
  border-radius: 50%;
  &:hover { color: $text-color; }
}

// ========== 触发器样式（scoped）==========
.xly-date-picker__clear {
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

// ========== 选择面板（Teleport 到 body，不能 scoped）==========
.xly-date-picker__panel {
  position: fixed;
  z-index: 2000;
  width: 300px;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.06);
  padding: 8px;
  user-select: none;
}

.xly-date-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 8px;
}

.xly-date-panel__nav {
  display: inline-flex;
  cursor: pointer;
  color: $text-color;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.15s;
  &:hover { background: $primary-light; }
}

.xly-date-panel__title {
  font-size: 15px;
  font-weight: 600;
  color: $text-color;
  padding: 2px 8px;
  border-radius: 4px;

  &.is-title-clickable {
    cursor: pointer;
    &:hover { background: $primary-light; }
  }
}

.xly-date-panel__weekdays {
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

.xly-date-panel__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 4px 0;
}

.xly-date-panel__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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
  &.is-range-start { border-radius: 6px 0 0 6px; background: $primary-light-hover; }
  &.is-range-end { border-radius: 0 6px 6px 0; background: $primary-light-hover; }
  &.is-in-range { background: $primary-light; border-radius: 0; }
}

.xly-date-panel__month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
}

.xly-date-panel__month-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  color: $text-color;

  &:hover:not(.is-selected) { background: $primary-light; }
  &.is-current { color: $primary; font-weight: 600; }
  &.is-selected { background: $primary; color: #fff; }
}

.xly-date-panel__year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
}

.xly-date-panel__year-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  color: $text-color;

  &:hover:not(.is-selected) { background: $primary-light; }
  &.is-current { color: $primary; font-weight: 600; }
  &.is-selected { background: $primary; color: #fff; }
}

.xly-date-picker-fade-enter-active,
.xly-date-picker-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top center;
}
.xly-date-picker-fade-enter-from,
.xly-date-picker-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}
</style>
