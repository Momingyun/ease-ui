<template>
  <div class="between">
    <xly-form
      ref="formRef"
      class="betweenForm"
      :model="form"
      label-width="100px"
      :rules="rules"
      :disabled="disabled"
      label-position="left"
    >
      <xly-tabs v-model="tabsValue" type="line">
        <!-- 基础设置 tab -->
        <xly-tab-pane label="基础设置" name="1">
          <div class="tabPane">
            <xly-form-item label="节点编码：" prop="nodeCode">
              <xly-input v-model="form.nodeCode" :disabled="true" />
            </xly-form-item>
            <xly-form-item label="节点名称：" prop="nodeName">
              <xly-input v-model="form.nodeName" :disabled="disabled" />
            </xly-form-item>
            <xly-form-item label="协作方式：" prop="collaborativeWay">
              <xly-radio-group v-model="form.collaborativeWay">
                <xly-radio label="1" v-if="form.collaborativeWay === '1' || showWays">
                  <span class="flex-hc">
                    或签
                    <el-tooltip class="box-item" effect="dark" content="只需一个人审批">
                      <el-icon :size="14" class="ml5"><WarningFilled /></el-icon>
                    </el-tooltip>
                  </span>
                </xly-radio>
                <xly-radio label="2" v-if="form.collaborativeWay === '2' || showWays">
                  <span class="flex-hc">
                    票签
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="部分办理人审批，建议选择用户；如果选择角色或者部门等，需自行通过办理人表达式或者监听器，转成具体办理用户"
                    >
                      <el-icon :size="14" class="ml5"><WarningFilled /></el-icon>
                    </el-tooltip>
                  </span>
                </xly-radio>
                <xly-radio label="3" v-if="form.collaborativeWay === '3' || showWays">
                  <span class="flex-hc">
                    会签
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="所有办理都需要审批，建议选择用户；如果选择角色或者部门等，需自行通过办理人表达式或者监听器，转成具体办理用户"
                    >
                      <el-icon :size="14" class="ml5"><WarningFilled /></el-icon>
                    </el-tooltip>
                  </span>
                </xly-radio>
              </xly-radio-group>
            </xly-form-item>
            <xly-form-item label="票签占比：" prop="nodeRatio" v-if="form.collaborativeWay === '2'">
              <xly-input v-model="form.nodeRatio" type="number" placeholder="请输入" />
              <div class="placeholder mt5">票签比例范围：(0-100)的值</div>
            </xly-form-item>
            <xly-form-item label="办理人：" prop="permissionFlag">
              <!-- 自行更换为自己的人员选择组件-->
              <xly-input v-model="form.permissionFlag" placeholder="自行更换为自己的人员选择组件" />
              <div class="placeholder mt5">tips:自行更换为自己的人员选择组件</div>
            </xly-form-item>
            <xly-form-item label="驳回节点" prop="formCustom">
              <template #label>
                <span v-if="form.collaborativeWay === '2'" class="mr5" style="color: red">*</span
                >驳回节点
              </template>
              <xly-select
                v-model="form.anyNodeSkip"
                :options="filteredNodes.map((d) => ({ label: d.text.value, value: d.id }))"
                clearable
                style="width: 80%"
              />
              <div class="placeholder mt5">【票签】必须选择驳到指定节点！</div>
            </xly-form-item>
          </div>
        </xly-tab-pane>

        <!-- 监听器 tab -->
        <xly-tab-pane label="监听器" name="2">
          <div class="listenerItem tabPane">
            <xly-table
              :data="form.listenerRows"
              :columns="listenerColumns"
              :pagination="false"
              :show-index="false"
              style="width: 100%"
            >
              <template #col-listenerType="{ row, index }">
                <xly-form-item
                  :prop="`listenerRows.${index}.listenerType`"
                  :rules="rules.listenerType"
                >
                  <xly-select
                    v-model="row.listenerType"
                    :options="listenerTypeOptions"
                    placeholder="请选择"
                  />
                </xly-form-item>
              </template>
              <template #col-listenerPath="{ row, index }">
                <xly-form-item
                  :prop="`listenerRows.${index}.listenerPath`"
                  :rules="rules.listenerPath"
                >
                  <xly-input v-model="row.listenerPath" placeholder="请输入" />
                </xly-form-item>
              </template>
              <template v-if="!disabled" #action="{ index }">
                <xly-button type="danger" size="small" @click="handleDeleteRow(index)"
                  >删除</xly-button
                >
              </template>
            </xly-table>
            <xly-button
              v-if="!disabled"
              type="primary"
              style="margin-top: 10px"
              @click="handleAddRow"
            >
              增加行
            </xly-button>
          </div>
        </xly-tab-pane>

        <!-- 节点扩展属性 tab（动态生成） -->
        <xly-tab-pane
          v-for="item in tabsList.slice(2)"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <div class="tabPane">
            <nodeExtList
              v-if="buttonList[item.name]?.length > 0"
              :ref="(el) => setNodeExtRef(el, item.name)"
              v-model="form.ext"
              :formList="buttonList[item.name]"
              :disabled="disabled"
            />
          </div>
        </xly-tab-pane>
      </xly-tabs>
    </xly-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import nodeExtList from './nodeExtList.vue'
import { getPreviousNodes } from '@/components/xly-flow-designer/common/js/tool.js'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyTable from '@/components/xly-table/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyTabs from '@/components/xly-tabs/index.vue'
import XlyTabPane from '@/components/xly-tabs/xly-tab-pane.vue'
import XlyRadioGroup from '@/components/xly-radio/radio-group.vue'
import XlyRadio from '@/components/xly-radio/index.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {}
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showWays: {
    type: Boolean,
    default: true,
  },
  nodes: {
    type: Array,
    default() {
      return []
    },
  },
  skips: {
    type: Array,
    default() {
      return []
    },
  },
})

const tabsValue = ref('1')
// tabsList 只存动态扩展属性 tab（基础/监听已在模板中硬编码）
const tabsList = ref<{ label: string; name: string }[]>([])
const form = ref(props.modelValue)
const buttonList = ref<Record<string, any[]>>({})
const formRef = ref()

// 用 Map 管理动态 ref
const nodeExtRefs = new Map<string, any>()
function setNodeExtRef(el: any, name: string) {
  if (el) nodeExtRefs.set(name, el)
  else nodeExtRefs.delete(name)
}

const rules = reactive({
  nodeRatio: [
    { required: false, message: '请输入', trigger: 'change' },
    {
      pattern: /^(?:[1-9]\d?|0\.\d{1,3}|[1-9]\d?\.\d{1,3})$/,
      message: '请输入(0, 100)的值，最多保留三位小数',
      trigger: ['change', 'blur'],
    },
  ],
  listenerType: [{ required: true, message: '监听器类型不能为空', trigger: 'change' }],
  listenerPath: [{ required: true, message: '监听器路径不能为空', trigger: 'blur' }],
})

const emit = defineEmits(['update:modelValue'])

// 表格列配置
const listenerColumns = [
  { prop: 'listenerType', name: '类型', width: 160 },
  { prop: 'listenerPath', name: '路径' },
]

// 监听器类型选项
const listenerTypeOptions = [
  { label: '开始', value: 'start' },
  { label: '分派', value: 'assignment' },
  { label: '完成', value: 'finish' },
  { label: '创建', value: 'create' },
]

watch(
  () => form.value,
  (n) => {
    if (n) emit('update:modelValue', n)
  },
  { deep: true },
)

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

const filteredNodes = computed(() => {
  const previousNodes = getPreviousNodes(props.nodes, props.skips, form.value.nodeCode)
  return previousNodes.filter((node: any) => !['start', 'serial', 'parallel'].includes(node.type))
})

// 表单必填校验
function validate() {
  return new Promise<boolean>(async (resolve, reject) => {
    tabsValue.value = '1'
    await nextTick()
    formRef.value?.validate((valid: boolean) => {
      if (!valid) reject(false)
    })
    await tabsValidate(resolve, reject)
  })
}

async function tabsValidate(resolve: (v: boolean) => void, reject: (v: boolean) => void) {
  const addTabsList = tabsList.value
  if (addTabsList.length === 0) {
    resolve(true)
    return
  }
  for (const e of addTabsList) {
    tabsValue.value = e.name
    await nextTick()
    const extRef = nodeExtRefs.get(e.name)
    if (extRef && !(await extRef.validate())) {
      reject(false)
      return
    }
    if (e.name === addTabsList[addTabsList.length - 1].name) resolve(true)
  }
}

defineExpose({ validate })
</script>

<style scoped lang="scss">
.placeholder {
  color: #828f9e;
  font-size: 12px;
}

.tabPane {
  padding: 15px;
}

.betweenForm {
  border-top: 0;
}

:deep(.listenerItem) {
  display: inline-block;
  width: 100%;

  .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
