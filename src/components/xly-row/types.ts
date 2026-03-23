import type { InjectionKey, Ref } from 'vue'

export type GutterInjection = Ref<{ horizontal: number; vertical: number }>
export const ROW_GUTTER_KEY: InjectionKey<GutterInjection> = Symbol('xlyRowGutter')
