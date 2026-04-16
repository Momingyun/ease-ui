<template>
  <div
    class="base-node"
    ref="baseNodeDiv"
    :class="
      status == null
        ? ''
        : status == 0
          ? 'base-node-not-done'
          : status == 1
            ? 'base-node-todo'
            : 'base-node-done'
    "
  >
    <div class="top-section">
      <div class="node-header">
        <div class="header-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 5V8L10 10"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span v-show="showSpan" @click="editNodeName" class="node-title">
          {{ nodeName }}
        </span>
        <ElInput
          v-show="editingNodeName"
          ref="nodeNameInput"
          v-model="nodeName"
          @blur="saveNodeName"
          size="small"
          class="node-name-input"
        >
        </ElInput>
        <span
          v-show="props.type === 'between' && (!chartStatusColor || chartStatusColor.length === 0)"
          class="delete-btn"
          @click.stop="deleteNode"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 3.5L3.5 10.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3.5 3.5L10.5 10.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="bottom-section" @click="editNode" :title="handler">
      <div class="handler-container">
        <div class="handler-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3333 4.66666C11.3333 6.50761 9.84095 8 8 8C6.15905 8 4.66663 6.50761 4.66663 4.66666C4.66663 2.82571 6.15905 1.33333 8 1.33333C9.84095 1.33333 11.3333 2.82571 11.3333 4.66666Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 10.6667C5.79086 10.6667 4 11.5617 4 12.6667V14H12V12.6667C12 11.5617 10.2091 10.6667 8 10.6667Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="handler-text">
          <!--可以自行更换为自己的人员信息展示组件-->
          <span v-if="handler">{{handler}}</span>
          <span v-else>所有人</span>
        </div>
      </div>
      <div class="edit-indicator">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66669 9.33333L9.33335 4.66666L4.66669 3.33333L3.33335 8.66666L4.66669 9.33333Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.33335 4.66666L8.00002 3.33333"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.66669 9.33333L4.33335 8.00002"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default() {
      return ''
    },
  },
  permissionFlag: {
    type: String,
    default() {
      return ''
    },
  },
  chartStatusColor: {
    type: Array,
    default() {
      return []
    },
  },
  status: {
    type: Number,
    default() {
      return null
    },
  },
  type: {
    type: String,
    default() {
      return ''
    },
  },
  fill: {
    type: String,
    default() {
      return ''
    },
  },
  stroke: {
    type: String,
    default() {
      return ''
    },
  },
})

const showSpan = ref(true)
const baseNodeDiv = ref(null)
const nodeName = ref('发起人')
const handler = ref('')
const nodeNameInput = ref(null)
const editingNodeName = ref(false)
const emit = defineEmits(['updateNodeName', 'deleteNode', 'editNode']) // 添加 deleteNode 事件

const deleteNode = () => {
  emit('deleteNode') // 触发删除事件，由父组件处理
}

watch(
  () => props.text,
  (newVal) => {
    if (newVal) {
      nodeName.value = newVal
    }
  },
  { deep: true, immediate: true },
)

watch(
  () => props.permissionFlag,
  (newVal) => {
    if (newVal) {
      handler.value = newVal
    } else {
      handler.value = ''
    }
  },
  { immediate: true, deep: true },
)

const editNodeName = () => {
  if (props.chartStatusColor && props.chartStatusColor.length > 0) {
    return
  }
  editingNodeName.value = true
  showSpan.value = false
}

const saveNodeName = () => {
  if (props.chartStatusColor && props.chartStatusColor.length > 0) {
    return
  }
  editingNodeName.value = false
  showSpan.value = true
  emit('updateNodeName', nodeName.value)
}

const editNode = () => {
  emit('editNode')
}

function handleLeave() {
  editingNodeName.value = false
  showSpan.value = true
}
</script>

<style scoped>
.base-node {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 3px 6px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
}

.base-node-not-done {
  border: 2px solid rgb(166, 178, 189);
}

.base-node-done {
  border: 2px solid rgb(0, 103, 192);
}

.base-node-todo {
  border: 2px solid rgb(255, 197, 90);
}

.base-node::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
}

.base-node:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.top-section {
  height: 36px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0067c0, #005a9e);
  padding: 0 12px;
  position: relative;
}

.node-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
}

.node-title {
  font-size: 13px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-title:hover {
  background: rgba(255, 255, 255, 0.15);
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  transform: scale(0.8);
}

.base-node:hover .delete-btn {
  opacity: 1;
  transform: scale(1);
}

.delete-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.bottom-section {
  height: calc(100% - 36px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.7);
}

.bottom-section:hover {
  background: rgba(255, 255, 255, 0.9);
}

.handler-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.handler-icon {
  color: #0067c0;
  display: flex;
  align-items: center;
}

.handler-text {
  font-size: 13px;
  color: #333;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.edit-indicator {
  color: #999;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: translateX(5px);
}

.bottom-section:hover .edit-indicator {
  opacity: 1;
  transform: translateX(0);
}

.node-name-input {
  flex: 1;
  color: #000000;
}

.node-name-input :deep(.el-input__inner) {
  height: 26px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 13px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 1px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  color: #000000;
}

.node-name-input :deep(.el-input__inner:focus) {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.4);
  outline: none;
}

.node-name-input :deep(.el-input__inner)::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* 状态为1时的虚线边框样式 */
.base-node[data-status='1'] {
  border: 2px dashed rgba(0, 120, 212, 0.5);
}
</style>
