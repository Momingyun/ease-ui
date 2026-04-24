<template>
  <XlyDrawer
    v-model="drawerVisible"
    title="消息通知"
    direction="right"
    :showHeader="true"
    :showClose="true"
    :showMask="true"
    :closeOnClickModal="true"
  >
    <!-- 分类标签 -->
    <div class="message-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="message-tab"
        :class="{ 'is-active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="message-tab__count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="message-list">
      <template v-if="filteredMessages.length > 0">
        <div
          v-for="msg in filteredMessages"
          :key="msg.id"
          class="message-item"
          :class="{ 'is-unread': !msg.isRead }"
          @click="handleReadMessage(msg)"
        >
          <div class="message-item__icon" :class="`message-item__icon--${msg.type}`">
            <svg
              v-if="msg.type === 'system'"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <svg
              v-else-if="msg.type === 'notice'"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div class="message-item__content">
            <div class="message-item__title">{{ msg.title }}</div>
            <div class="message-item__desc">{{ msg.content }}</div>
            <div class="message-item__time">{{ msg.time }}</div>
          </div>
          <div v-if="!msg.isRead" class="message-item__dot"></div>
        </div>
      </template>
      <div v-else class="message-empty">
        <svg
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          opacity="0.3"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span>暂无消息</span>
      </div>
    </div>

    <!-- 底部操作 -->
    <template #footer>
      <div class="message-footer">
        <button class="message-footer__btn" @click="handleReadAll">全部已读</button>
        <button class="message-footer__btn" @click="handleClear">清空消息</button>
      </div>
    </template>
  </XlyDrawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import XlyDrawer from '@/components/xly-drawer/index.vue'

defineOptions({ name: 'MessageDrawer' })

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// 抽屉显示状态
const drawerVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// 消息类型
type MessageType = 'system' | 'notice' | 'task'

interface Message {
  id: number
  type: MessageType
  title: string
  content: string
  time: string
  isRead: boolean
}

// 模拟消息数据
const messages = ref<Message[]>([
  {
    id: 1,
    type: 'system',
    title: '系统升级通知',
    content: '系统将于今晚22:00进行例行升级，预计耗时30分钟。',
    time: '10:30',
    isRead: false,
  },
  {
    id: 2,
    type: 'notice',
    title: '新功能上线',
    content: '消息通知功能已上线，支持分类查看和批量操作。',
    time: '09:15',
    isRead: false,
  },
  {
    id: 3,
    type: 'task',
    title: '待处理任务',
    content: '您有3个待审核的患者申请，请及时处理。',
    time: '昨天',
    isRead: false,
  },
  {
    id: 4,
    type: 'notice',
    title: '数据备份完成',
    content: '您的数据已成功备份到云端，备份时间：2026-04-24。',
    time: '昨天',
    isRead: true,
  },
  {
    id: 5,
    type: 'system',
    title: '安全提醒',
    content: '检测到您的账号在新的设备登录，如非本人操作请及时修改密码。',
    time: '前天',
    isRead: true,
  },
  {
    id: 6,
    type: 'task',
    title: '随访提醒',
    content: '患者张先生的随访计划即将到期，请确认随访结果。',
    time: '前天',
    isRead: true,
  },
  {
    id: 7,
    type: 'notice',
    title: '版本更新',
    content: 'EASE UI v1.2.0 正式发布，修复了若干问题并优化了性能。',
    time: '3天前',
    isRead: true,
  },
  {
    id: 8,
    type: 'system',
    title: '存储空间提醒',
    content: '您的云存储空间已使用80%，建议清理不需要的文件。',
    time: '3天前',
    isRead: true,
  },
  {
    id: 9,
    type: 'task',
    title: '审核超时提醒',
    content: '患者李女士的检验报告已等待审核超过48小时。',
    time: '4天前',
    isRead: false,
  },
  {
    id: 10,
    type: 'notice',
    title: '会议通知',
    content: '明日上午10点有科室例会，请准时参加。',
    time: '4天前',
    isRead: true,
  },
  {
    id: 11,
    type: 'system',
    title: '权限变更',
    content: '您的账号已获得「数据导出」权限。',
    time: '5天前',
    isRead: true,
  },
  {
    id: 12,
    type: 'task',
    title: '处方审核',
    content: '王医生提交了一张特殊处方，需要您进行审核。',
    time: '5天前',
    isRead: false,
  },
  {
    id: 13,
    type: 'notice',
    title: '报告生成完成',
    content: '月度统计报告已生成，可在报告中心下载。',
    time: '6天前',
    isRead: true,
  },
  {
    id: 14,
    type: 'system',
    title: '登录提醒',
    content: '您的账号于2026-04-18在iPad设备上登录。',
    time: '6天前',
    isRead: true,
  },
  {
    id: 15,
    type: 'task',
    title: '用药提醒',
    content: '患者赵先生的降压药处方将在3天后到期。',
    time: '7天前',
    isRead: true,
  },
  {
    id: 16,
    type: 'notice',
    title: '新患者登记',
    content: '新患者陈某已成功登记基本信息，请完善病历档案。',
    time: '7天前',
    isRead: true,
  },
  {
    id: 17,
    type: 'system',
    title: 'API调用提醒',
    content: '您的API调用量本周增长15%，当前使用量在配额范围内。',
    time: '8天前',
    isRead: true,
  },
  {
    id: 18,
    type: 'task',
    title: '满意度调查',
    content: '您有5位患者待发送满意度调查问卷。',
    time: '8天前',
    isRead: false,
  },
  {
    id: 19,
    type: 'notice',
    title: '培训通知',
    content: '下周将举办新功能操作培训，欢迎参加。',
    time: '9天前',
    isRead: true,
  },
  {
    id: 20,
    type: 'system',
    title: '系统维护公告',
    content: '本周日凌晨2:00-4:00进行数据库优化，届时系统可能短暂中断。',
    time: '10天前',
    isRead: true,
  },
  {
    id: 21,
    type: 'task',
    title: '复诊提醒',
    content: '患者刘某的复诊时间为明天，请提前准备相关资料。',
    time: '10天前',
    isRead: true,
  },
  {
    id: 22,
    type: 'notice',
    title: '新人入职引导',
    content: '新员工孙某已完成入职培训，您可以将其加入项目组。',
    time: '11天前',
    isRead: true,
  },
  {
    id: 23,
    type: 'system',
    title: '密码强度提醒',
    content: '您的密码已超过90天未更换，为了账号安全建议及时更换。',
    time: '12天前',
    isRead: true,
  },
  {
    id: 24,
    type: 'task',
    title: '转诊申请',
    content: '来自市第一医院的转诊申请需要您确认接收。',
    time: '12天前',
    isRead: false,
  },
  {
    id: 25,
    type: 'notice',
    title: '设备绑定通知',
    content: '您的账号已与新设备（iPhone 15 Pro）成功绑定。',
    time: '13天前',
    isRead: true,
  },
  {
    id: 26,
    type: 'system',
    title: '数据导出完成',
    content: '您申请的数据导出任务已完成，文件已发送至您的邮箱。',
    time: '14天前',
    isRead: true,
  },
  {
    id: 27,
    type: 'task',
    title: '体检报告审核',
    content: '某科技公司员工的年度体检报告待审核，共42份。',
    time: '14天前',
    isRead: true,
  },
])

// 分类标签
const tabs = computed(() => [
  { key: 'all', label: '全部', count: messages.value.length },
  { key: 'unread', label: '未读', count: messages.value.filter((m) => !m.isRead).length },
  { key: 'system', label: '系统', count: messages.value.filter((m) => m.type === 'system').length },
  { key: 'notice', label: '通知', count: messages.value.filter((m) => m.type === 'notice').length },
  { key: 'task', label: '任务', count: messages.value.filter((m) => m.type === 'task').length },
])

const activeTab = ref<string>('all')

// 根据分类过滤消息
const filteredMessages = computed(() => {
  if (activeTab.value === 'all') return messages.value
  if (activeTab.value === 'unread') return messages.value.filter((m) => !m.isRead)
  return messages.value.filter((m) => m.type === activeTab.value)
})

// 点击消息标记为已读
function handleReadMessage(msg: Message) {
  msg.isRead = true
}

// 全部标为已读
function handleReadAll() {
  messages.value.forEach((m) => (m.isRead = true))
}

// 清空消息
function handleClear() {
  messages.value = []
  activeTab.value = 'all'
}
</script>

<style scoped lang="scss">
// ========== 覆盖 drawer body padding ==========
:deep(.xly-drawer__body) {
  padding: 0 24px 16px;
}
:deep(.xly-drawer__footer) {
  padding: 12px 24px 20px;
}

// ========== 设计令牌 ==========
$bg-hover: #f5f7fa;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$primary: #4f6ef7;
$success: #34d399;
$warning: #fbbf24;
$danger: #f87171;
$border-color: #f2f3f7;

// ========== 分类标签 ==========
.message-tabs {
  display: flex;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid $border-color;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.message-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 13px;
  color: $text-secondary;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: $bg-hover;
  }

  &.is-active {
    color: $primary;
    background: rgba($primary, 0.08);
    border-color: rgba($primary, 0.2);
  }

  &__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    font-size: 11px;
    font-weight: 500;
    color: #fff;
    background: $primary;
    border-radius: 9px;
  }
}

// ========== 消息列表 ==========
.message-list {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: $bg-hover;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }

  &.is-unread {
    background: rgba($primary, 0.03);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    flex-shrink: 0;

    &--system {
      color: $primary;
      background: rgba($primary, 0.1);
    }

    &--notice {
      color: $success;
      background: rgba($success, 0.1);
    }

    &--task {
      color: $warning;
      background: rgba($warning, 0.1);
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: $text-primary;
    margin-bottom: 4px;
    line-height: 1.4;
  }

  &__desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__time {
    font-size: 12px;
    color: $text-default;
    margin-top: 6px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    background: $primary;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 6px;
  }
}

// ========== 空状态 ==========
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: $text-default;

  span {
    margin-top: 12px;
    font-size: 14px;
  }
}

// ========== 底部操作 ==========
.message-footer {
  display: flex;
  justify-content: space-between;

  &__btn {
    flex: 1;
    padding: 10px 16px;
    font-size: 14px;
    color: $text-secondary;
    background: $bg-hover;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:not(:last-child) {
      margin-right: 12px;
    }

    &:hover {
      background: #ebedf2;
      color: $text-primary;
    }
  }
}
</style>
