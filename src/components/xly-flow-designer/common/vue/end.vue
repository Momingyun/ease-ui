<template>
  <div>
    <xly-form ref="formRef" :model="form" label-width="120px" :disabled="disabled" class="endForm">
      <xly-form-item label="节点编码" prop="nodeCode">
        <xly-input v-model="form.nodeCode" :disabled="disabled" />
      </xly-form-item>
    </xly-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const form = ref(props.modelValue)
const formRef = ref()
</script>

<style scoped lang="scss">
.endForm {
  padding: 15px;
}
</style>
