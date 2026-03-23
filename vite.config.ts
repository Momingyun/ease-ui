import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动按需导入 API
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dts: 'src/types/import/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.auto-import.json',
        globalsPropValue: true,
      },
    }),
    // 自动按需导入组件
    Components({
      dts: 'src/types/import/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    // 压缩
    viteCompression({
      verbose: false, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 压缩后的文件名后缀
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240B = 10KB
      deleteOriginFile: false, // 压缩后是否删除原文件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // 代码分割优化
    rollupOptions: {
      output: {
        // 分离vendor chunks
        manualChunks: {
          // 第三方库分离
          'vue-vendor': ['vue', 'vue-router'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          'utils-vendor': ['@vueuse/core', 'axios']
        },
        // 优化chunk文件名
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entries/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 调整chunk大小警告限制
    chunkSizeWarningLimit: 1000,
  },
})
