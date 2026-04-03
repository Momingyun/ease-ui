/// <reference types="vite/client" />

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否为公开页面（无需登录即可访问） */
    public?: boolean
  }
}
