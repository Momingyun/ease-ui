<template>
  <div>
    <xly-tabs v-model="tabsValue" type="line">
      <xly-tab-pane name="basic" label="基础设置">
        <xly-form ref="formRef" :model="form" label-width="100px" :disabled="disabled" class="startForm">
          <slot name="form-item-task-name" :model="form" field="nodeCode">
            <xly-form-item label="节点编码" prop="nodeCode">
              <xly-input v-model="form.nodeCode" :disabled="disabled" />
            </xly-form-item>
          </slot>
          <slot name="form-item-task-name" :model="form" field="nodeName">
            <xly-form-item label="节点名称" prop="nodeName">
              <xly-input
                ref="nodeInput"
                v-model="form.nodeName"
                :disabled="disabled"
                @change="nodeNameChange"
              />
            </xly-form-item>
          </slot>
        </xly-form>
      </xly-tab-pane>

      <xly-tab-pane name="listener" label="监听器">
        <div class="listenerPane">
          <slot name="form-item-task-listenerType" :model="form" field="listenerType">
            <xly-table
              :data="form.listenerRows || []"
              :columns="listenerColumns"
              :pagination="false"
              :show-index="false"
              style="width: 100%"
            >
              <!-- 类型列 -->
              <template #col-listenerType="{ row }">
                <xly-select
                  v-model="row.listenerType"
                  :options="listenerTypeOptions"
                  placeholder="请选择"
                  :disabled="disabled"
                />
              </template>
              <!-- 路径列 -->
              <template #col-listenerPath="{ row }">
                <xly-input
                  v-model="row.listenerPath"
                  placeholder="请输入"
                  :disabled="disabled"
                />
              </template>
              <!-- 操作列 -->
              <template v-if="!disabled" #action="{ index }">
                <xly-button type="danger" size="small" @click="handleDeleteRow(index)">
                  删除
                </xly-button>
              </template>
            </xly-table>
            <xly-button v-if="!disabled" type="primary" style="margin-top: 10px" @click="handleAddRow">
              增加行
            </xly-button>
          </slot>
        </div>
      </xly-tab-pane>
    </xly-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import XlyTabs from '@/components/xly-tabs/index.vue'
import XlyTabPane from '@/components/xly-tabs/xly-tab-pane.vue'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyTable from '@/components/xly-table/index.vue'
import XlyButton from '@/components/xly-button/index.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {}
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

const tabsValue = ref<string | number>('basic')
const form = ref(props.modelValue)
const formRef = ref()
const nodeInput = ref()

// 监听器表格列配置
const listenerColumns = [
  { prop: 'listenerType', name: '类型', width: 160 },
  { prop: 'listenerPath', name: '路径' },
]

// 监听器类型下拉选项
const listenerTypeOptions = [
  { label: '开始', value: 'start' },
  { label: '分派', value: 'assignment' },
  { label: '完成', value: 'finish' },
  { label: '创建', value: 'create' },
]

watch(
  () => form,
  (n) => {
    if (n) {
      emit('change', n)
    }
  },
  { deep: true }
)

function nodeNameChange() {
  nodeInput.value?.focus?.()
}

// 初始化监听器行数据
if (form.value.listenerType) {
  const listenerTypes = form.value.listenerType.split(',')
  const listenerPaths = form.value.listenerPath.split('@@')
  form.value.listenerRows = listenerTypes.map((type: string, index: number) => ({
    listenerType: type,
    listenerPath: listenerPaths[index]
  }))
}

// 增加行
function handleAddRow() {
  if (!form.value.listenerRows) {
    form.value.listenerRows = []
  }
  form.value.listenerRows.push({ listenerType: '', listenerPath: '' })
}

// 删除行
function handleDeleteRow(index: number) {
  form.value.listenerRows.splice(index, 1)
}
</script>

<style scoped lang="scss">
.startForm {
  padding: 15px;
}

.listenerPane {
  padding: 15px;
}
</style>
