import { defineStore } from 'pinia'
import { ref } from 'vue'

export type MenuLayout = 'vertical' | 'split' | 'horizontal'

export const useMenuLayoutStore = defineStore('menuLayout', () => {
  const currentLayout = ref<MenuLayout>('split')

  function setLayout(layout: MenuLayout) {
    currentLayout.value = layout
  }

  return {
    currentLayout,
    setLayout,
  }
})
