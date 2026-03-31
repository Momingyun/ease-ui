<template>
  <div class="xly-user-picker">
    <!-- 已选用户显示区 -->
    <div class="xly-user-picker__selected">
      <!-- 禁用状态下的占位 -->
      <div
        v-if="disabled && selectedUsers.length === 0"
        class="xly-user-picker__placeholder"
      >
        {{ placeholder }}
      </div>

      <!-- 已选用户标签 -->
      <div
        v-for="user in selectedUsers"
        :key="user[valueKey]"
        class="xly-user-picker__tag"
      >
        <img v-if="user[avatarKey]" :src="user[avatarKey]" class="xly-user-picker__avatar" />
        <span v-else class="xly-user-picker__avatar-text">{{ getInitials(user) }}</span>
        <span class="xly-user-picker__name">{{ user[nameKey] }}</span>
        <span
          v-if="showExtra && user[extraKey]"
          class="xly-user-picker__extra"
        >{{ user[extraKey] }}</span>
        <span
          v-if="!disabled"
          class="xly-user-picker__close"
          @click.stop="handleRemove(user)"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
      </div>

      <!-- 单选模式添加按钮（未禁用时始终显示在右侧） -->
      <div
        v-if="!disabled && !multiple"
        class="xly-user-picker__add"
        @click="handleOpen"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>{{ selectedUsers.length > 0 ? '切换' : placeholder }}</span>
      </div>

      <!-- 多选模式添加按钮 -->
      <div
        v-if="!disabled && multiple"
        class="xly-user-picker__add"
        @click="handleOpen"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>{{ placeholder }}</span>
      </div>
    </div>

    <!-- 选择弹窗 -->
    <Teleport to="body">
      <div v-if="visible" class="xly-user-picker__modal" @click.self="handleClose">
        <div class="xly-user-picker__dialog">
          <div class="xly-user-picker__header">
            <h3>选择用户</h3>
            <button class="xly-user-picker__close" @click="handleClose">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- 搜索框 -->
          <div class="xly-user-picker__search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input
              v-model="searchText"
              type="text"
              placeholder="搜索用户名..."
              @input="handleSearch"
            />
          </div>

          <!-- 用户列表 -->
          <div class="xly-user-picker__list">
            <div v-if="loading" class="xly-user-picker__loading">
              <svg class="xly-user-picker__spinner" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="60" stroke-dashoffset="20"/>
              </svg>
              <span>加载中...</span>
            </div>
            <template v-else>
              <div
                v-for="user in filteredUsers"
                :key="user[valueKey]"
                class="xly-user-picker__item"
                :class="{
                  'is-selected': isSelected(user),
                  'is-disabled': isDisabled(user),
                }"
                @click="handleSelect(user)"
              >
                <div class="xly-user-picker__item-check">
                  <svg v-if="isSelected(user)" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <img v-if="user[avatarKey]" :src="user[avatarKey]" class="xly-user-picker__item-avatar" />
                <span v-else class="xly-user-picker__item-avatar-text">{{ getInitials(user) }}</span>
                <div class="xly-user-picker__item-info">
                  <span class="xly-user-picker__item-name">{{ user[nameKey] }}</span>
                  <span v-if="showExtra && user[extraKey]" class="xly-user-picker__item-extra">{{ user[extraKey] }}</span>
                </div>
              </div>
              <div v-if="!loading && filteredUsers.length === 0" class="xly-user-picker__empty">
                暂无数据
              </div>
            </template>
          </div>

          <!-- 底部操作 -->
          <div class="xly-user-picker__footer">
            <span class="xly-user-picker__tip">
              已选 {{ tempSelected.length }}{{ multiple ? `/${max}` : '' }} 个
            </span>
            <div class="xly-user-picker__actions">
              <button class="xly-user-picker__btn xly-user-picker__btn--cancel" @click="handleClose">取消</button>
              <button class="xly-user-picker__btn xly-user-picker__btn--confirm" @click="handleConfirm">确定</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

defineOptions({ name: 'XlyUserPicker' })

export interface UserItem {
  [key: string]: any
}

export interface FetchUsersOptions {
  keyword?: string
}

export interface UserPickerProps {
  /** 绑定值 */
  modelValue?: number | string | number[] | string[] | null
  /** 是否多选 */
  multiple?: boolean
  /** 最大选择数量（多选模式） */
  max?: number
  /** 禁用 */
  disabled?: boolean
  /** 占位文字 */
  placeholder?: string
  /** 是否显示额外信息 */
  showExtra?: boolean
  /** 值字段名 */
  valueKey?: string
  /** 名称字段名 */
  nameKey?: string
  /** 头像字段名 */
  avatarKey?: string
  /** 额外信息字段名 */
  extraKey?: string
  /** 禁用判断函数 */
  isDisabled?: (user: UserItem) => boolean
  /** 多选时返回值类型：array 返回数组，string 返回逗号拼接字符串 */
  returnType?: 'array' | 'string'
}

const props = withDefaults(defineProps<UserPickerProps>(), {
  modelValue: null,
  multiple: false,
  max: 999,
  disabled: false,
  placeholder: '选择用户',
  showExtra: false,
  valueKey: 'id',
  nameKey: 'name',
  avatarKey: 'avatar',
  extraKey: 'department',
  isDisabled: () => false,
  returnType: 'array',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string | number[] | string[] | null): void
  (e: 'change', value: number | string | number[] | string[] | null): void
  (e: 'pick'): void
}>()

// 模拟用户数据（用于演示，二开时请修改 getMockUsers 函数）
const mockUsers: UserItem[] = [
  { id: 1, name: '张三', department: '技术部', avatar: '' },
  { id: 2, name: '李四', department: '产品部', avatar: '' },
  { id: 3, name: '王五', department: '设计部', avatar: '' },
  { id: 4, name: '赵六', department: '市场部', avatar: '' },
  { id: 5, name: '钱七', department: '运营部', avatar: '' },
  { id: 6, name: '孙八', department: '技术部', avatar: '' },
  { id: 7, name: '周九', department: '产品部', avatar: '' },
  { id: 8, name: '吴十', department: '设计部', avatar: '' },
]

const visible = ref(false)
const searchText = ref('')
const tempSelected = ref<UserItem[]>([])
const userList = ref<UserItem[]>([])
const loading = ref(false)

/**
 * 获取用户数据（默认使用模拟数据）
 * 二开时请将此函数替换为你的真实接口调用
 * @param keyword 搜索关键词
 * @returns 用户列表
 */
async function getMockUsers(keyword?: string): Promise<UserItem[]> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  // 默认过滤逻辑
  if (keyword) {
    const kw = keyword.toLowerCase()
    return mockUsers.filter(u =>
      u.name.toLowerCase().includes(kw) ||
      u.department.toLowerCase().includes(kw)
    )
  }
  return [...mockUsers]
}

// 组件挂载时加载数据
onMounted(async () => {
  await loadUsers()
})

// 根据 modelValue 解析为数组
function parseModelValue(val: any): (number | string)[] {
  if (val === null || val === undefined) return []
  if (Array.isArray(val)) return val.map(v => String(v))
  // 单选模式：可能是单个值，也可能是逗号拼接的字符串
  if (typeof val === 'string' && val.includes(',')) {
    return val.split(',').filter(Boolean)
  }
  return [String(val)]
}

// 根据 modelValue 反查出用户对象列表
const selectedUsers = computed(() => {
  const values = parseModelValue(props.modelValue)
  if (values.length === 0) return []

  // 构建 valueKey -> user 的映射
  const valueMap = new Map<string, UserItem>()
  userList.value.forEach(user => {
    valueMap.set(String(user[props.valueKey]), user)
  })

  return values.map(v => valueMap.get(String(v))).filter((u): u is UserItem => !!u)
})

// 过滤后的用户列表
const filteredUsers = computed(() => {
  if (!searchText.value) return userList.value
  const keyword = searchText.value.toLowerCase()
  return userList.value.filter(user => {
    const name = String(user[props.nameKey] || '').toLowerCase()
    const extra = String(user[props.extraKey] || '').toLowerCase()
    return name.includes(keyword) || extra.includes(keyword)
  })
})

// 判断用户是否已选
function isSelected(user: UserItem): boolean {
  const value = user[props.valueKey]
  return tempSelected.value.some(u => u[props.valueKey] === value)
}

// 判断用户是否禁用
function isDisabled(user: UserItem): boolean {
  return props.isDisabled(user)
}

// 获取姓名首字母
function getInitials(user: UserItem): string {
  const name = String(user[props.nameKey] || '')
  if (!name) return '?'
  const match = name.match(/^[a-zA-Z]/)
  if (match) return match[0].toUpperCase()
  return name.slice(0, 2)
}

// 加载用户数据
async function loadUsers(keyword?: string) {
  loading.value = true
  try {
    userList.value = await getMockUsers(keyword)
  } finally {
    loading.value = false
  }
}

// 打开弹窗
function handleOpen() {
  if (props.disabled) return
  visible.value = true
  tempSelected.value = [...selectedUsers.value]
  searchText.value = ''
}

// 关闭弹窗
function handleClose() {
  visible.value = false
}

// 选择用户
function handleSelect(user: UserItem) {
  if (isDisabled(user)) return

  const value = user[props.valueKey]
  const index = tempSelected.value.findIndex(u => u[props.valueKey] === value)

  if (props.multiple) {
    if (index > -1) {
      tempSelected.value.splice(index, 1)
    } else {
      if (tempSelected.value.length < props.max) {
        tempSelected.value.push(user)
      }
    }
  } else {
    tempSelected.value = [user]
  }
}

// 移除用户
function handleRemove(user: UserItem) {
  if (props.disabled) return

  const value = user[props.valueKey]

  if (props.multiple) {
    const currentValues = parseModelValue(props.modelValue)
    const idx = currentValues.findIndex(v => String(v) === String(value))
    if (idx > -1) {
      currentValues.splice(idx, 1)
      emitValue(currentValues)
    }
  } else {
    emitValue(null)
  }
}

// 确认选择
function handleConfirm() {
  // 从 tempSelected 提取 valueKey 值
  const values = tempSelected.value.map(u => u[props.valueKey])

  if (props.multiple) {
    emitValue(values)
  } else {
    emitValue(values[0] || null)
  }

  emit('pick')
  handleClose()
}

// 发送值
function emitValue(value: number | string | number[] | string[] | null) {
  let emitVal = value

  // 多选且 returnType 为 string 时，转换为逗号拼接字符串
  if (props.multiple && Array.isArray(value) && props.returnType === 'string') {
    emitVal = value.join(',')
  }

  emit('update:modelValue', emitVal)
  emit('change', emitVal)
}

// 搜索处理
async function handleSearch() {
  await loadUsers(searchText.value)
}

// 清空
function clear() {
  const empty = props.multiple ? [] : null
  emit('update:modelValue', empty)
  emit('change', empty)
}

// 暴露方法
defineExpose({
  open: handleOpen,
  close: handleClose,
  clear,
})
</script>

<style scoped lang="scss">
.xly-user-picker {
  width: 100%;
}

.xly-user-picker__selected {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  min-height: 42px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: text;

  &:hover {
    border-color: #4f6ef7;
  }
}

.xly-user-picker__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px 2px 4px;
  background: #f0f2f5;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #e6e8eb;
  }
}

.xly-user-picker__avatar,
.xly-user-picker__avatar-text {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}

.xly-user-picker__avatar {
  object-fit: cover;
}

.xly-user-picker__avatar-text {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4f6ef7;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
}

.xly-user-picker__name {
  font-size: 13px;
  color: #1a1a2e;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-user-picker__extra {
  font-size: 12px;
  color: #8e8ea0;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xly-user-picker__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  color: #8e8ea0;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #d0d2d9;
    color: #1a1a2e;
  }
}

.xly-user-picker__add {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  color: #4f6ef7;
  font-size: 13px;
  cursor: pointer;
  border: 1px dashed #4f6ef7;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(79, 110, 247, 0.08);
  }
}

// 禁用状态占位文字
.xly-user-picker__placeholder {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  color: #c0c4cc;
  font-size: 13px;
}

// 弹窗样式
.xly-user-picker__modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.xly-user-picker__dialog {
  width: 480px;
  max-width: 90vw;
  max-height: 70vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.xly-user-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f2f3f7;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
  }
}

.xly-user-picker__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #8e8ea0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #f0f2f5;
    color: #1a1a2e;
  }
}

.xly-user-picker__search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 16px;
  padding: 0 12px;
  height: 40px;
  background: #f5f6fa;
  border-radius: 8px;

  svg {
    color: #8e8ea0;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 14px;
    outline: none;

    &::placeholder {
      color: #8e8ea0;
    }
  }
}

.xly-user-picker__list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.xly-user-picker__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: #8e8ea0;
  font-size: 14px;
}

.xly-user-picker__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.xly-user-picker__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f6fa;
  }

  &.is-selected {
    background: rgba(79, 110, 247, 0.1);
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }
}

.xly-user-picker__item-check {
  width: 18px;
  height: 18px;
  border: 2px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  .is-selected & {
    background: #4f6ef7;
    border-color: #4f6ef7;
    color: #fff;
  }
}

.xly-user-picker__item-avatar,
.xly-user-picker__item-avatar-text {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.xly-user-picker__item-avatar {
  object-fit: cover;
}

.xly-user-picker__item-avatar-text {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4f6ef7 0%, #7c8ffa 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
}

.xly-user-picker__item-info {
  flex: 1;
  min-width: 0;
}

.xly-user-picker__item-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

.xly-user-picker__item-extra {
  display: block;
  font-size: 12px;
  color: #8e8ea0;
  margin-top: 2px;
}

.xly-user-picker__empty {
  padding: 40px;
  text-align: center;
  color: #8e8ea0;
  font-size: 14px;
}

.xly-user-picker__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
}

.xly-user-picker__tip {
  font-size: 13px;
  color: #8e8ea0;
}

.xly-user-picker__actions {
  display: flex;
  gap: 8px;
}

.xly-user-picker__btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &--cancel {
    background: #f0f2f5;
    color: #606266;

    &:hover {
      background: #e6e8eb;
    }
  }

  &--confirm {
    background: #4f6ef7;
    color: #fff;

    &:hover {
      background: #3d5ce5;
    }
  }
}
</style>
