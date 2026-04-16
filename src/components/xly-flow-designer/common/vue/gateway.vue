<template>
  <div>
    <xly-form ref="formRef" :model="form" label-width="120px" :disabled="disabled" class="gatewayForm">
      <xly-form-item label="节点编码" prop="nodeCode">
        <xly-input v-model="form.nodeCode" :disabled="disabled" />
      </xly-form-item>
      <xly-form-item label="节点名称" prop="nodeName">
        <xly-input
          ref="nodeInput"
          v-model="form.nodeName"
          :disabled="disabled"
          @change="nodeNameChange"
        />
      </xly-form-item>
    </xly-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'

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
  },
})

const emit = defineEmits(['change'])

const form = ref(props.modelValue)
const formRef = ref()
const nodeInput = ref()

watch(
  () => form,
  (n) => {
    if (n) emit('change', n)
  },
  { deep: true }
)

function nodeNameChange() {
  nodeInput.value?.focus?.()
}
</script>

<style scoped lang="scss">
.gatewayForm {
  padding: 15px;
}
</style>
