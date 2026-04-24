import { defineStore } from 'pinia'
import { ref } from 'vue'

export type MenuStyle = 'fixed'

export const useMenuStyleStore = defineStore('menuStyle', () => {
  const currentStyle = ref<MenuStyle>('fixed')

  function setStyle(style: MenuStyle) {
    currentStyle.value = style
  }

  return {
    currentStyle,
    setStyle,
  }
})
