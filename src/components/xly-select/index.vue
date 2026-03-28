<template>
  <div class="xly-select" :class="[`xly-select--${size}`, { 'is-disabled': disabled, 'is-focus': visible }]">
    <!-- 触发器 -->
    <div ref="triggerRef" class="xly-select__wrapper" :class="{ 'is-hover': hovering && !disabled }" @click="toggleDropdown" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <!-- 前缀 -->
      <span v-if="$slots.prefix || prefixIcon" class="xly-select__prefix">
        <slot name="prefix" />
        <XlyIcon v-if="!$slots.prefix && prefixIcon" :name="prefixIcon" />
      </span>

      <!-- 多选标签 -->
      <div v-if="multiple && selectedLabels.length" ref="tagsContainerRef" class="xly-select__tags">
        <span
          v-for="(label, i) in visibleLabels"
          :key="i"
          :ref="el => setTagRef(el, i)"
          class="xly-select__tag"
        >
          {{ label }}
          <span class="xly-select__tag-close" @click.stop="removeTag(i)">
            <XlyIcon name="el:Close" :size="12" />
          </span>
        </span>
        <span v-if="hiddenCount > 0" class="xly-select__tag xly-select__tag--count">+{{ hiddenCount }}</span>
      </div>

      <!-- 选中值显示 -->
      <span v-else class="xly-select__value" :class="{ 'is-placeholder': !selectedLabels.length }">
        {{ displayLabel }}
      </span>

      <!-- 后缀 -->
      <span class="xly-select__suffix">
        <!-- 清除 -->
        <span v-if="clearable && hasValue && !disabled" class="xly-select__clear" @click.stop="clear">
          <XlyIcon name="el:Close" />
        </span>
        <!-- 自定义后缀 -->
        <slot name="suffix" />
        <XlyIcon v-if="!$slots.suffix && suffixIcon" :name="suffixIcon" />
        <!-- 箭头 -->
        <XlyIcon name="el:ArrowDown" class="xly-select__arrow" :class="{ 'is-reverse': visible }" />
      </span>
    </div>

    <!-- 下拉面板 -->
    <Teleport to="body">
      <Transition name="xly-select-zoom">
        <div
          v-if="visible"
          ref="dropdownRef"
          class="xly-select__dropdown"
          :style="dropdownStyle"
        >
          <!-- 搜索框 -->
          <div v-if="filterable" class="xly-select__search">
            <input
              ref="searchRef"
              v-model="searchQuery"
              class="xly-select__search-input"
              placeholder="搜索..."
              @keydown.stop
            />
            <button
              v-if="allowCreate"
              class="xly-select__search-btn"
              :disabled="!searchQuery.trim() || isQueryExisting"
              @click="handleCreateOption"
            >
              添加
            </button>
          </div>

          <!-- 选项列表 -->
          <div class="xly-select__list" :style="{ maxHeight: listMaxHeight }">
            <div
              v-for="(option, idx) in filteredOptions"
              :key="option[valueKey]"
              class="xly-select__option"
              :class="{
                'is-selected': isSelected(option[valueKey]),
                'is-disabled': isDisabled(option),
                'is-hover': hoverIndex === idx,
              }"
              @click="selectOption(option)"
              @mouseenter="hoverIndex = idx"
            >
              <!-- 多选复选框 -->
              <span v-if="multiple" class="xly-select__option-check">
                <XlyIcon v-if="isSelected(option[valueKey])" name="el:Check" />
              </span>
              <!-- 默认选项内容 -->
              <span v-if="!slots.option" class="xly-select__option-label">{{ option[labelKey] }}</span>
              <!-- 自定义选项插槽 -->
              <slot v-else name="option" :option="option" :index="idx" :selected="isSelected(option[valueKey])"></slot>
            </div>
            <div v-if="filteredOptions.length === 0" class="xly-select__empty">
              {{ props.loading ? '加载中...' : '暂无数据' }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'

defineOptions({ name: 'XlySelect' })

export interface SelectOption {
  [key: string]: any
}

export interface SelectProps {
  modelValue?: string | number | boolean | (string | number | boolean)[]
  /** 选项数组，支持对象数组 [{label, value}, ...] 或基础数组 ['选项1', '选项2', ...] */
  options?: SelectOption[] | string[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  /** 是否允许用户创建新条目，需配合 filterable 使用 */
  allowCreate?: boolean
  multiple?: boolean
  maxTagCount?: number
  size?: 'large' | 'default' | 'small'
  listMaxHeight?: string
  /** 前缀图标名称，使用 XlyIcon 的 name 格式，如 `el:Search`、`svg:edit` */
  prefixIcon?: string
  /** 后缀图标名称，使用 XlyIcon 的 name 格式，如 `el:Calendar`、`svg:edit` */
  suffixIcon?: string
  /** 选项值对应的字段名，默认 `'value'` */
  valueKey?: string
  /** 选项标签对应的字段名，默认 `'label'` */
  labelKey?: string
  /** 选项禁用状态对应的字段名，默认 `'disabled'`。也可以是一个函数 `(option: SelectOption) => boolean` 用于自定义禁用逻辑 */
  disabledKey?: string | ((option: SelectOption) => boolean)
  /** 是否启用远程搜索，需配合 remoteMethod 使用 */
  remote?: boolean
  /** 远程搜索方法，接收搜索关键字作为参数 */
  remoteMethod?: (query: string) => void
  /** 是否显示加载中状态 */
  loading?: boolean
  /** 远程搜索防抖延迟（毫秒），默认 300 */
  debounce?: number
  /** 多选时返回值的类型，'array' 返回数组，'string' 返回逗号分隔的字符串，默认 'array' */
  valueType?: 'array' | 'string'
  /** 多选且 valueType='string' 时的分隔符，默认 ',' */
  separator?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  filterable: false,
  allowCreate: false,
  multiple: false,
  maxTagCount: 3,
  size: 'default',
  listMaxHeight: '274px',
  prefixIcon: undefined,
  suffixIcon: undefined,
  valueKey: 'value',
  labelKey: 'label',
  disabledKey: 'disabled',
  remote: false,
  remoteMethod: undefined,
  loading: false,
  debounce: 300,
  valueType: 'array',
  separator: ',',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'clear'): void
  (e: 'remove-tag', value: any, index: number): void
  (e: 'search', query: string): void
  (e: 'create', value: any): void
}>()

const slots = defineSlots()
const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)
const tagsContainerRef = ref<HTMLElement | null>(null)
const tagRefs = ref<(HTMLElement | null)[]>([])

const visible = ref(false)
const hovering = ref(false)
const hoverIndex = ref(-1)
const searchQuery = ref('')
const tick = ref(0)
const remoteOptions = ref<SelectOption[]>([])
const visibleLabelCount = ref(0)
const hiddenCount = computed(() => Math.max(0, selectedLabels.value.length - visibleLabelCount.value))
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let calcTimeout: ReturnType<typeof setTimeout> | null = null

// 判断是否为基础数组（非对象数组）
const isSimpleArray = computed(() => {
  const opts = props.options
  if (!Array.isArray(opts) || opts.length === 0) return false
  // 检查第一个元素是否为非对象
  const firstItem = opts[0]
  return typeof firstItem !== 'object' || firstItem === null
})

// 将基础数组转换为标准选项格式
const normalizedOptions = computed<SelectOption[]>(() => {
  if (!isSimpleArray.value) {
    return props.options as SelectOption[]
  }
  // 基础数组转换为 { label, value } 格式
  return (props.options as string[]).map(item => ({
    [props.labelKey]: item,
    [props.valueKey]: item,
  }))
})

const isMultiple = computed(() => props.multiple)
const hasValue = computed(() => {
  if (props.multiple) {
    const val = props.modelValue
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'string') return val.trim() !== ''
    return false
  }
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

// 将 modelValue 转换为数组（内部统一使用数组处理）
const internalValue = computed<(string | number | boolean)[]>(() => {
  if (!props.multiple) {
    return props.modelValue !== undefined && props.modelValue !== null ? [props.modelValue] : []
  }

  const val = props.modelValue
  if (Array.isArray(val)) return val
  if (typeof val === 'string' && val.trim() !== '') {
    return val.split(props.separator).map(v => v.trim())
  }
  return []
})

// 将内部数组转换为 modelValue（根据 valueType）
const formatModelValue = (arr: (string | number | boolean)[]): any => {
  if (!props.multiple) {
    return arr[0] || undefined
  }

  if (props.valueType === 'string') {
    return arr.map(String).join(props.separator)
  }
  return arr
}

// 合并远程搜索结果与本地选项，用于查找选中标签
const allOptions = computed(() => {
  if (props.remote && props.filterable) return remoteOptions.value
  return normalizedOptions.value
})

const selectedLabels = computed(() => {
  if (props.multiple) {
    return internalValue.value.map(v => {
      const opt = allOptions.value.find(o => o[props.valueKey] === v)
      return opt?.[props.labelKey] || String(v)
    })
  }
  const opt = allOptions.value.find(o => o[props.valueKey] === props.modelValue)
  return opt ? [opt[props.labelKey]] : []
})

const displayLabel = computed(() => {
  if (selectedLabels.value.length > 0) return selectedLabels.value.join(', ')
  return ''
})

const visibleLabels = computed(() => {
  return selectedLabels.value.slice(0, visibleLabelCount.value)
})

const filteredOptions = computed(() => {
  if (props.remote && props.filterable) return remoteOptions.value
  if (!props.filterable || !searchQuery.value) return normalizedOptions.value
  const q = searchQuery.value.toLowerCase()
  return normalizedOptions.value.filter(o => String(o[props.labelKey]).toLowerCase().includes(q))
})

// 判断搜索内容是否已存在于选项中
const isQueryExisting = computed(() => {
  if (!searchQuery.value) return true
  return normalizedOptions.value.some(
    o => o[props.labelKey] === searchQuery.value || o[props.valueKey] === searchQuery.value
  )
})

const dropdownStyle = computed(() => {
  // 依赖 tick，确保每次打开面板时重新计算位置
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tick.value
  if (!triggerRef.value) return {}
  const rect = triggerRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const dropH = 280

  if (spaceBelow < dropH) {
    return {
      top: `${rect.top - dropH - 4}px`,
      left: `${rect.left}px`,
      minWidth: `${rect.width}px`,
    }
  }
  return {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
})

function isSelected(value: any) {
  if (props.multiple) return internalValue.value.includes(value)
  return props.modelValue === value
}

// 判断选项是否禁用
function isDisabled(option: SelectOption): boolean {
  if (typeof props.disabledKey === 'function') {
    return props.disabledKey(option)
  }
  return !!option[props.disabledKey as string]
}

// 设置标签引用
function setTagRef(el: any, index: number) {
  if (el) {
    tagRefs.value[index] = el
  }
}

// 计算可见标签数量
function calculateVisibleLabels() {
  // 清除之前的计算定时器
  if (calcTimeout) {
    clearTimeout(calcTimeout)
  }

  // 延迟计算，等待 DOM 更新完成
  calcTimeout = setTimeout(() => {
    if (!tagsContainerRef.value || selectedLabels.value.length === 0) {
      visibleLabelCount.value = selectedLabels.value.length
      return
    }

    const container = tagsContainerRef.value
    const containerWidth = container.clientWidth
    const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft)
    const paddingRight = parseFloat(getComputedStyle(container).paddingRight)
    const availableWidth = containerWidth - paddingLeft - paddingRight - 20 // 20px for suffix space

    let totalWidth = 0
    let count = 0
    let hasUnrenderedTag = false

    for (let i = 0; i < selectedLabels.value.length; i++) {
      const tag = tagRefs.value[i]
      if (!tag) {
        // 标签未渲染，暂时显示全部
        hasUnrenderedTag = true
        break
      }

      const tagWidth = tag.offsetWidth

      // 计算是否需要显示 +N 标签
      const remaining = selectedLabels.value.length - i - 1
      const needsCountTag = remaining > 0
      const countTagWidth = needsCountTag ? 30 : 0 // 估算 +N 标签宽度

      if (totalWidth + tagWidth + countTagWidth > availableWidth) {
        break
      }

      totalWidth += tagWidth + 4 // 4px 是 gap
      count++
    }

    // 如果有未渲染的标签，暂时显示全部
    if (hasUnrenderedTag) {
      visibleLabelCount.value = selectedLabels.value.length
    } else {
      // 确保至少显示一个标签
      visibleLabelCount.value = Math.max(1, count)
    }
  }, 0)
}




function toggleDropdown() {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    tick.value++
    nextTick(() => {
      if (props.filterable) searchRef.value?.focus()
    })
  } else {
    searchQuery.value = ''
  }
}

function selectOption(option: SelectOption) {
  if (isDisabled(option)) return
  const optionValue = option[props.valueKey]

  if (props.multiple) {
    const current = [...internalValue.value]
    const idx = current.indexOf(optionValue)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(optionValue)
    }
    emit('update:modelValue', formatModelValue(current))
    emit('change', formatModelValue(current))
  } else {
    emit('update:modelValue', optionValue)
    emit('change', optionValue)
    visible.value = false
  }
}

// 处理点击添加按钮，创建新选项
function handleCreateOption() {
  if (!props.allowCreate || !searchQuery.value.trim()) return

  const query = searchQuery.value.trim()

  // 如果选项已存在，不创建
  if (isQueryExisting.value) {
    // 找到对应的选项并选中
    const existingOption = normalizedOptions.value.find(
      o => o[props.labelKey] === query || o[props.valueKey] === query
    )
    if (existingOption) {
      selectOption(existingOption)
    }
    return
  }

  // 创建新选项
  const newOption: SelectOption = {
    [props.valueKey]: query,
    [props.labelKey]: query,
  }

  if (props.multiple) {
    // 多选模式：直接添加到选中值
    const current = [...internalValue.value]
    if (!current.includes(query)) {
      current.push(query)
      emit('update:modelValue', formatModelValue(current))
      emit('change', formatModelValue(current))
      emit('create', query)
    }
  } else {
    // 单选模式：选中新选项
    emit('update:modelValue', query)
    emit('change', query)
    emit('create', query)
    visible.value = false
  }

  // 清空搜索框
  searchQuery.value = ''
}

function removeTag(visibleIndex: number) {
  if (visibleIndex < 0 || visibleIndex >= visibleLabels.value.length) return

  const current = [...internalValue.value]
  // visibleIndex 是 visibleLabels 中的索引，需要找到对应的原始值
  const visibleLabelValue = visibleLabels.value[visibleIndex]

  if (!visibleLabelValue) return

  // 直接使用 visibleLabelValue 来查找对应的值
  const originalIndex = current.findIndex(v => {
    const opt = allOptions.value.find(o => o && o[props.valueKey] === v)
    return opt && opt[props.labelKey] === visibleLabelValue
  })

  if (originalIndex > -1) {
    const removed = current.splice(originalIndex, 1)
    emit('update:modelValue', formatModelValue(current))
    emit('change', formatModelValue(current))
    emit('remove-tag', removed[0], originalIndex)
  }
}

function clear() {
  const val = props.multiple ? formatModelValue([]) : undefined
  emit('update:modelValue', val)
  emit('change', val)
  emit('clear')
}

function handleClickOutside(e: MouseEvent) {
  if (!visible.value) return
  const target = e.target as HTMLElement
  if (triggerRef.value?.contains(target)) return
  if (dropdownRef.value?.contains(target)) return
  visible.value = false
  searchQuery.value = ''
}

function handleScrollClose(e: Event) {
  if (!visible.value) return
  // 排除下拉面板内部的滚动（选项列表滚动不应关闭面板）
  const target = e.target as HTMLElement
  if (dropdownRef.value?.contains(target)) return
  visible.value = false
  searchQuery.value = ''
}

watch(searchQuery, (val) => {
  hoverIndex.value = -1
  if (props.remote && props.remoteMethod) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      props.remoteMethod(val)
      emit('search', val)
    }, props.debounce)
  }
})

watch(() => [selectedLabels.value, visible.value], () => {
  nextTick(() => {
    calculateVisibleLabels()
  })
}, { deep: true })

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', handleScrollClose, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', handleScrollClose, true)
  if (calcTimeout) {
    clearTimeout(calcTimeout)
  }
})

// 暴露 remoteOptions 供外部更新远程搜索结果
defineExpose({ blur: () => { visible.value = false }, remoteOptions })
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$border-focus: #4f6ef7;
$border-hover: #c8cbd8;
$disabled-bg: #f5f7fa;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;
$transition: all 0.2s ease;

.xly-select {
  display: inline-flex;
  width: 100%;
  position: relative;

  &--large &__wrapper { height: 44px; }
  &--large &__value { font-size: 15px; }
  &--default &__wrapper { height: 36px; }
  &--default &__value { font-size: 14px; }
  &--small &__wrapper { height: 30px; }
  &--small &__value { font-size: 13px; }

  &__wrapper {
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: $radius;
    cursor: pointer;
    transition: $transition;
    user-select: none;
    box-sizing: border-box;

    &.is-hover:not(.is-disabled) { border-color: $border-hover; }
  }

  &.is-focus &__wrapper {
    border-color: $border-focus;
    box-shadow: 0 0 0 2px $primary-light;
  }

  &.is-disabled &__wrapper {
    background-color: $disabled-bg;
    cursor: not-allowed;
  }

  &__prefix {
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
    color: $text-placeholder;
    flex-shrink: 0;
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $text-color;

    &.is-placeholder { color: $text-placeholder; }
  }

  &__tags {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 4px;
    overflow: hidden;
    align-items: center;
    min-width: 0;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px 6px;
    background: $primary-light;
    color: $primary;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    flex-shrink: 0;
    max-width: 100%;

    &--count {
      background: rgba(79, 110, 247, 0.12);
    }
  }

  &__tag-close {
    display: inline-flex;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.15s;

    &:hover { background: rgba(79, 110, 247, 0.15); }
  }

  &__suffix {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 6px;
    color: $text-placeholder;
    flex-shrink: 0;
  }

  &__clear {
    display: inline-flex;
    cursor: pointer;
    border-radius: 50%;
    transition: color 0.15s;
    &:hover { color: $text-color; }
  }

  &__arrow {
    transition: transform 0.2s ease;
    &.is-reverse { transform: rotate(180deg); }
  }
}

// ========== 过渡动画（Teleport 到 body，不能 scoped）==========
</style>

<style lang="scss">
$primary: #4f6ef7;
$primary-light: rgba(79, 110, 247, 0.08);
$border-color: #e2e4ed;
$disabled-color: #a8abb2;
$text-color: #4a4a6a;
$text-placeholder: #c0c4cc;
$radius: 8px;

.xly-select__dropdown {
  position: fixed;
  z-index: 2000;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.xly-select__search {
  padding: 8px;
  border-bottom: 1px solid $border-color;
  display: flex;
  gap: 8px;
}

.xly-select__search-input {
  flex: 1;
  height: 30px;
  padding: 0 10px;
  border: 1px solid $border-color;
  border-radius: 6px;
  outline: none;
  font-size: 13px;
  color: $text-color;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus { border-color: $primary; }
  &::placeholder { color: $text-placeholder; }
}

.xly-select__search-btn {
  padding: 0 12px;
  height: 30px;
  background: $primary;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) { background: #4056d6; }
  &:disabled {
    background: #d3d4dd;
    cursor: not-allowed;
  }
}

.xly-select__list {
  overflow-y: auto;
  padding: 4px;
}

.xly-select__option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: $text-color;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover, &.is-hover { background: $primary-light; }
  &.is-selected { color: $primary; font-weight: 500; }
  &.is-disabled { color: $disabled-color; cursor: not-allowed; }

  &-check { width: 16px; display: inline-flex; justify-content: center; }
}

.xly-select__empty {
  padding: 16px;
  text-align: center;
  color: $text-placeholder;
  font-size: 13px;
}

.xly-select-zoom-enter-active,
.xly-select-zoom-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top center;
}
.xly-select-zoom-enter-from,
.xly-select-zoom-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-4px);
}
</style>
