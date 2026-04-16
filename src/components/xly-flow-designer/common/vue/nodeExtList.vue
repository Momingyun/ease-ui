<template>
  <xly-form
    ref="nodeExtRef"
    class="nodeExtForm"
    :model="form"
    label-width="100px"
    :disabled="disabled"
    label-position="left"
  >
    <xly-form-item
      v-for="(item, index) in formList"
      :key="index"
      :label="`${item.label}：`"
      :prop="item.code"
      :rules="[{ required: item.must, message: `${item.label}不能为空`, trigger: ['blur', 'change'] }]"
    >
      <!-- 单行文本 -->
      <xly-input
        v-if="item.type === 1"
        v-model="form[item.code]"
        placeholder="请输入"
      />
      <!-- 多行文本 -->
      <xly-input
        v-else-if="item.type === 2"
        v-model="form[item.code]"
        :rows="2"
        type="textarea"
        placeholder="请输入"
      />
      <!-- 下拉选择 -->
      <xly-select
        v-else-if="item.type === 3"
        v-model="form[item.code]"
        clearable
        :multiple="item.multiple || false"
        :options="item.dict.map((d: any) => ({ label: d.label, value: d.value }))"
      />
      <!-- Radio / Checkbox -->
      <div v-else-if="item.type === 4">
        <xly-radio-group v-if="!item.multiple" v-model="form[item.code]">
          <el-row :gutter="20">
            <el-col
              v-for="(dItem, dIndex) in item.dict"
              :key="dIndex"
              :span="item.dict.length < 3 ? undefined : 8"
            >
              <xly-radio :label="String(dItem.value)">{{ dItem.label }}</xly-radio>
            </el-col>
          </el-row>
        </xly-radio-group>
        <el-checkbox-group v-else v-model="form[item.code]">
          <el-row :gutter="20">
            <el-col
              v-for="(dItem, dIndex) in item.dict"
              :key="dIndex"
              :span="item.dict.length < 3 ? undefined : 8"
            >
              <el-checkbox :label="String(dItem.value)">{{ dItem.label }}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
    </xly-form-item>
  </xly-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyRadioGroup from '@/components/xly-radio/radio-group.vue'
import XlyRadio from '@/components/xly-radio/index.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {}
    }
  },
  formList: {
    type: Array,
    default() {
      return []
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const form = ref(props.modelValue)
const nodeExtRef = ref()

// 表单必填校验
async function validate() {
  let isValid: boolean | null = null
  await nodeExtRef.value?.validate((valid: boolean) => {
    isValid = valid
  })
  return isValid
}

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
