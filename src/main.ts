import '../src/styles/theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'


// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// xly 全局服务安装
import { setupXly } from '@/utils/xly'

// XlyWatermark 全局指令注册
import { setupWatermarkDirective } from '@/components/xly-watermark/directive'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 全局注册常用的 Element Plus 组件
app.use(ElementPlus, { locale: zhCn });

app.use(createPinia())
app.use(router)

// 全局安装 xly 服务（消息提示、加载等）
setupXly(app)

// 全局注册水印指令
setupWatermarkDirective(app)

app.mount('#app')
