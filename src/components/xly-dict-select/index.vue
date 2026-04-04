<template>
  <XlySelect
    :model-value="modelValue"
    :options="normalizedOptions"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :multiple="multiple"
    :size="size"
    :value-type="valueType"
    :separator="separator"
    :value-key="returnField"
    :label-key="labelField"
    :loading="loading"
    :max-tag-count="maxTagCount"
    class="xly-dict-select"
    v-bind="$attrs"
    @update:model-value="handleChange"
    @change="handleChange"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import XlySelect from '@/components/xly-select/index.vue'
import type { SelectOption } from '@/components/xly-select/index.vue'

defineOptions({ name: 'XlyDictSelect' })

// ============================================================
// 字典数据类型定义
// ============================================================
export interface DictOption {
  /** 值字段（默认 id） */
  id: string | number
  /** 值文本（英文代码，如 NORMAL） */
  labelValue: string
  /** 标签名（显示文本，如 正常） */
  labelName: string
  /** 是否禁用此选项 */
  disabled?: boolean
}

export interface DictSelectProps {
  /**
   * 绑定值
   * - 单选时为 string
   * - 多选时为 string[]，或逗号拼接的字符串（组件内部自动拆分）
   */
  modelValue?: string | string[] | null
  /** 字典类型标识，组件根据此值请求字典数据 */
  dictType: string
  /** 是否多选，默认 false */
  multiple?: boolean
  /** 是否可清空，默认 true */
  clearable?: boolean
  /** 是否禁用，默认 false */
  disabled?: boolean
  /** 占位文本，默认 '请选择' */
  placeholder?: string
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 多选时折叠标签的最大数量，默认 3 */
  maxTagCount?: number
  /** 是否可搜索过滤，默认 false */
  filterable?: boolean
  /** label 显示字段名，默认 'labelName'（即用 labelName 字段的值作为下拉显示文本） */
  labelField?: string
  /** 匹配字段名，用于回显和 change 事件中匹配字典项，默认 'id' */
  valueField?: string
  /** 返回值字段名，默认 'id'（可设为 'labelValue' 返回英文代码） */
  returnField?: string
  /**
   * 多选时 v-model 的值格式：
   * - 'array'（默认）：string[]
   * - 'string'：逗号拼接的字符串，如 '1,2,3'
   */
  valueFormat?: 'array' | 'string'
  /** 分隔符，默认 ',' */
  separator?: string
}

const props = withDefaults(defineProps<DictSelectProps>(), {
  multiple: false,
  clearable: true,
  disabled: false,
  placeholder: '请选择',
  size: 'default',
  maxTagCount: 3,
  filterable: false,
  labelField: 'labelName',
  valueField: 'id',
  returnField: 'id',
  valueFormat: 'array',
  separator: ',',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | null]
  /** 值变化，同时返回完整字典项 */
  'change': [value: string | string[] | null, items: DictOption | DictOption[] | null]
  /** 清空 */
  'clear': []
}>()

// ============================================================
// ⚙️ 字典请求函数 — 二开指南
// ============================================================
// 替换此函数为您自己的接口请求，示例：
//
//   import { getDictList } from '@/api/system/dict'
//
//   async function fetchDictList(dictType: string): Promise<DictOption[]> {
//     const res = await getDictList({ dictType })
//     // 如果接口返回的字段名与 valueField/labelField 不一致，
//     // 可以在这里做字段映射，或直接使用组件的 value-field / label-field 属性
//     return res.data
//   }
//
// 注意：
//   1. 返回的数组中每条数据至少包含 valueField（默认 id）和 labelField（默认 labelName，显示文本）
//   2. 可携带 disabled 字段控制禁用状态
//   3. 如需全局缓存字典数据，可在外部实现缓存 Map，在此函数内先查缓存再请求接口
// ============================================================
async function fetchDictList(dictType: string): Promise<DictOption[]> {
  // 模拟网络延迟
  await new Promise(r => setTimeout(r, 300))

  const mockData: Record<string, DictOption[]> = {
    // 用户状态
    user_status: [
      { id: '1', labelValue: 'NORMAL',   labelName: '正常' },
      { id: '2', labelValue: 'DISABLED', labelName: '禁用' },
      { id: '3', labelValue: 'PENDING',  labelName: '待激活' },
      { id: '4', labelValue: 'DELETED',  labelName: '已注销' },
    ],
    // 审批状态
    approve_status: [
      { id: '0', labelValue: 'WAITING',   labelName: '待审批' },
      { id: '1', labelValue: 'PROCESSING', labelName: '审批中' },
      { id: '2', labelValue: 'APPROVED',  labelName: '已通过' },
      { id: '3', labelValue: 'REJECTED',   labelName: '已拒绝' },
      { id: '4', labelValue: 'WITHDRAWN', labelName: '已撤回' },
    ],
    // 性别
    gender: [
      { id: '1', labelValue: 'MALE',   labelName: '男' },
      { id: '2', labelValue: 'FEMALE', labelName: '女' },
      { id: '0', labelValue: 'UNKNOWN', labelName: '未知' },
    ],
    // 优先级
    priority: [
      { id: 'low',    labelValue: 'LOW',    labelName: '低' },
      { id: 'medium', labelValue: 'MEDIUM', labelName: '中' },
      { id: 'high',   labelValue: 'HIGH',   labelName: '高' },
      { id: 'urgent', labelValue: 'URGENT', labelName: '紧急' },
    ],
    // 订单状态
    order_status: [
      { id: '1', labelValue: 'UNPAID',    labelName: '待付款' },
      { id: '2', labelValue: 'UNSHIPPED', labelName: '待发货' },
      { id: '3', labelValue: 'SHIPPED',   labelName: '已发货' },
      { id: '4', labelValue: 'COMPLETED', labelName: '已完成' },
      { id: '5', labelValue: 'CANCELLED', labelName: '已取消' },
      { id: '6', labelValue: 'REFUNDING', labelName: '退款中', disabled: true },
    ],
    // 角色类型
    role_type: [
      { id: 'admin',   labelValue: 'SUPER_ADMIN', labelName: '超级管理员' },
      { id: 'manager', labelValue: 'ADMIN',      labelName: '管理员' },
      { id: 'editor',  labelValue: 'EDITOR',     labelName: '编辑者' },
      { id: 'viewer',  labelValue: 'VIEWER',     labelName: '查看者' },
    ],
    // 自定义字段演示
    custom_field_demo: [
      { id: 'active',   labelValue: 'ACTIVE',   labelName: '启用中' },
      { id: 'inactive', labelValue: 'INACTIVE', labelName: '已停用' },
      { id: 'pending',  labelValue: 'PENDING',  labelName: '待审核' },
    ],
  }

  return mockData[dictType] ?? []
}

// ============================================================
// 状态
// ============================================================
const dictList = ref<DictOption[]>([])
const loading = ref(false)

async function loadDict() {
  if (!props.dictType) return
  loading.value = true
  try {
    dictList.value = await fetchDictList(props.dictType)
  } finally {
    loading.value = false
  }
}

onMounted(loadDict)
watch(() => props.dictType, loadDict)

// ============================================================
// 将字典数据转换为 XlySelect 所需的 options 格式
// 字段名映射由 XlySelect 的 valueKey / labelKey 控制
// ============================================================
const normalizedOptions = computed<SelectOption[]>(() => {
  return dictList.value.map(item => {
    const retKey = props.returnField as keyof DictOption
    const lblKey = props.labelField as keyof DictOption
    return {
      // 实际返回的字段由 returnField 控制（默认 id，可设为 labelValue 返回英文代码）
      [retKey]: item[retKey],
      [lblKey]: item[lblKey],
      disabled: item.disabled,
    }
  })
})

// ============================================================
// valueType 映射：组件属性 valueFormat → XlySelect 的 valueType
// ============================================================
const valueType = computed(() => {
  if (!props.multiple) return 'array'
  return props.valueFormat
})

// ============================================================
// 事件处理
// ============================================================
function handleChange(val: any) {
  emit('update:modelValue', val)

  const retKey = props.returnField as keyof DictOption
  // 同时返回完整字典项
  if (props.multiple && Array.isArray(val)) {
    const items = val
      .map((v: string) => dictList.value.find(d => String(d[retKey]) === String(v)))
      .filter((d: any): d is DictOption => Boolean(d))
    emit('change', val, items)
  } else if (!props.multiple) {
    const item = dictList.value.find(d => String(d[retKey]) === String(val)) ?? null
    emit('change', val, item)
  }
}

function handleClear() {
  emit('update:modelValue', props.multiple ? [] : null)
  emit('clear')
}

// ============================================================
// 暴露：外部可通过 ref 调用 reload 重新加载字典
// ============================================================
defineExpose({ reload: loadDict, dictList })
</script>

<style scoped lang="scss">
.xly-dict-select {
  width: 100%;
}
</style>
