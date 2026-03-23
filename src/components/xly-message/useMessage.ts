import { ref, type Ref } from 'vue'
import XlyMessage from '@/components/xly-message/index.vue'
import { XlyMsg, type MessageOptions } from './message'

export type { MessageOptions }

export function useMessage() {
  const messageRef = ref<InstanceType<typeof XlyMessage> | null>(null)

  function success(message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) {
    messageRef.value?.success(message, opts)
  }

  function warning(message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) {
    messageRef.value?.warning(message, opts)
  }

  function danger(message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) {
    messageRef.value?.danger(message, opts)
  }

  function info(message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) {
    messageRef.value?.info(message, opts)
  }

  function text(message: string, opts?: Omit<MessageOptions, 'message' | 'type'>) {
    messageRef.value?.text(message, opts)
  }

  function closeAll() {
    messageRef.value?.closeAll()
  }

  return {
    messageRef: messageRef as Ref<InstanceType<typeof XlyMessage> | null>,
    success,
    warning,
    danger,
    info,
    text,
    closeAll,
  }
}
