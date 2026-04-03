<template>
  <div class="xly-file-preview">
    <!-- 文件列表 -->
    <div class="xly-file-preview__list">
      <div
        v-for="(file, index) in normalizedFiles"
        :key="index"
        class="xly-file-preview__item"
        @click="openPreview(file)"
      >
        <div class="xly-file-preview__icon" :class="`xly-file-preview__icon--${getFileType(file.url)}`">
          <component :is="getFileIcon(file.url)" />
        </div>
        <div class="xly-file-preview__info">
          <span class="xly-file-preview__name" :title="file.name">{{ file.name }}</span>
          <span v-if="file.size" class="xly-file-preview__size">{{ formatSize(file.size) }}</span>
        </div>
        <button class="xly-file-preview__btn" title="预览">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>
      <div v-if="normalizedFiles.length === 0" class="xly-file-preview__empty">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        <span>暂无文件</span>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <Teleport to="body">
      <Transition name="xly-fp-fade">
        <div v-if="visible" class="xly-fp-mask" @click.self="closePreview">
          <Transition name="xly-fp-zoom" appear>
            <div v-if="visible" class="xly-fp-dialog">
              <!-- 头部 -->
              <div class="xly-fp-header">
                <div class="xly-fp-header__left">
                  <div class="xly-fp-header__icon" :class="`xly-fp-header__icon--${currentType}`">
                    <component :is="currentIcon" />
                  </div>
                  <div class="xly-fp-header__info">
                    <span class="xly-fp-header__name" :title="currentFile?.name">{{ currentFile?.name }}</span>
                    <span v-if="currentFile?.size" class="xly-fp-header__size">{{ formatSize(currentFile.size) }}</span>
                  </div>
                </div>
                <div class="xly-fp-header__actions">
                  <div v-if="normalizedFiles.length > 1" class="xly-fp-nav">
                    <button class="xly-fp-nav__btn" :disabled="currentIndex <= 0" @click="navigate(-1)" title="上一个">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span class="xly-fp-nav__text">{{ currentIndex + 1 }} / {{ normalizedFiles.length }}</span>
                    <button class="xly-fp-nav__btn" :disabled="currentIndex >= normalizedFiles.length - 1" @click="navigate(1)" title="下一个">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                  <a class="xly-fp-action-btn" :href="currentFile?.url" :download="currentFile?.name" title="下载">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </a>
                  <a class="xly-fp-action-btn" :href="currentFile?.url" target="_blank" title="在新标签页打开">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <button class="xly-fp-action-btn xly-fp-close" @click="closePreview" title="关闭">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>

              <!-- 内容区 -->
              <div class="xly-fp-body">
                <!-- Loading 遮罩 -->
                <div v-if="loading" class="xly-fp-loading">
                  <div class="xly-fp-loading__spinner"></div>
                  <span>{{ loadingText }}</span>
                </div>

                <!-- PDF（vue-office/pdf）-->
                <template v-if="currentType === 'pdf' && officeSrc">
                  <VueOfficePdf
                    :src="officeSrc"
                    class="xly-fp-office-viewer"
                    @rendered="onRendered"
                    @error="onError"
                  />
                </template>

                <!-- Word（vue-office/docx）-->
                <template v-else-if="currentType === 'word' && !officeError">
                  <VueOfficeDocx
                    :src="officeSrc"
                    class="xly-fp-office-viewer"
                    @rendered="onRendered"
                    @error="onError"
                  />
                </template>

                <!-- Excel（vue-office/excel）-->
                <template v-else-if="currentType === 'excel' && !officeError">
                  <VueOfficeExcel
                    :src="officeSrc"
                    class="xly-fp-office-viewer"
                    @rendered="onRendered"
                    @error="onError"
                  />
                </template>

                <!-- Office 错误提示 -->
                <template v-else-if="officeError && ['pdf', 'word', 'excel'].includes(currentType)">
                  <div class="xly-fp-unsupported">
                    <div class="xly-fp-unsupported__icon" :class="`xly-fp-unsupported__icon--${currentType}`">
                      <component :is="currentIcon" />
                    </div>
                    <h3 class="xly-fp-unsupported__title">无法预览此文件</h3>
                    <p class="xly-fp-unsupported__desc">{{ officeError }}</p>
                    <div class="xly-fp-unsupported__actions">
                      <a class="xly-fp-btn xly-fp-btn--primary" :href="currentFile?.url" :download="currentFile?.name">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        下载文件
                      </a>
                    </div>
                  </div>
                </template>

                <!-- PPT（pptx-preview）-->
                <div v-else-if="currentType === 'ppt' && !officeError" ref="pptContainerRef" class="xly-fp-ppt-container"></div>

                <!-- PPT 错误提示 -->
                <template v-else-if="currentType === 'ppt' && officeError">
                  <div class="xly-fp-unsupported">
                    <div class="xly-fp-unsupported__icon xly-fp-unsupported__icon--ppt">
                      <component :is="currentIcon" />
                    </div>
                    <h3 class="xly-fp-unsupported__title">无法预览此文件</h3>
                    <p class="xly-fp-unsupported__desc">{{ officeError }}</p>
                    <div class="xly-fp-unsupported__actions">
                      <a class="xly-fp-btn xly-fp-btn--primary" :href="currentFile?.url" :download="currentFile?.name">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        下载文件
                      </a>
                    </div>
                  </div>
                </template>

                <!-- 图片 -->
                <template v-else-if="currentType === 'image'">
                  <div class="xly-fp-image-wrap"><img :src="currentFile?.url" :alt="currentFile?.name" class="xly-fp-image" /></div>
                </template>

                <!-- 视频 -->
                <template v-else-if="currentType === 'video'">
                  <div class="xly-fp-video-wrap"><video :src="currentFile?.url" controls class="xly-fp-video" /></div>
                </template>

                <!-- 不支持的文件类型 -->
                <template v-else-if="currentType === 'file'">
                  <div class="xly-fp-unsupported">
                    <div class="xly-fp-unsupported__icon xly-fp-unsupported__icon--file"><FileIcon /></div>
                    <h3 class="xly-fp-unsupported__title">暂不支持此格式预览</h3>
                    <p class="xly-fp-unsupported__desc">文件类型：<code>{{ getExt(currentFile?.url ?? '') }}</code></p>
                    <a class="xly-fp-btn xly-fp-btn--primary" :href="currentFile?.url" :download="currentFile?.name">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      下载文件
                    </a>
                  </div>
                </template>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineComponent, h, onBeforeUnmount, nextTick } from 'vue'
import VueOfficeDocx from '@vue-office/docx/lib/v3/vue-office-docx.mjs'
import '@vue-office/docx/lib/v3/index.css'
import VueOfficeExcel from '@vue-office/excel/lib/v3/vue-office-excel.mjs'
import '@vue-office/excel/lib/v3/index.css'
import VueOfficePdf from '@vue-office/pdf/lib/v3/vue-office-pdf.mjs'
import { init as initPptxPreview } from 'pptx-preview'
import type { PPTXPreviewer as PptxPreviewerType } from 'pptx-preview/dist/index'

defineOptions({ name: 'XlyFilePreview' })

// ==================== 类型定义 ====================
export interface FileItem { name: string; url: string; size?: number | string }
export interface FieldNames { name?: string; url?: string; size?: string }
type FileInputType = string | FileItem | Record<string, any>

const props = withDefaults(defineProps<{
  files?: FileInputType | FileInputType[]
  fieldNames?: FieldNames
}>(), {
  files: () => [],
  fieldNames: () => ({ name: 'name', url: 'url', size: 'size' }),
})

// ==================== 文件规范化 ====================
const normalizedFiles = computed<FileItem[]>(() => {
  const { name: nf = 'name', url: uf = 'url', size: sf = 'size' } = props.fieldNames ?? {}
  const raw = props.files
  if (!raw) return []
  if (typeof raw === 'string') return raw.split(',').map(s => s.trim()).filter(Boolean).map(url => ({ name: getFileName(url), url, size: undefined }))
  if (Array.isArray(raw)) {
    if (raw.length === 0) return []
    return raw.map(item => {
      if (typeof item === 'string') return { name: getFileName(item), url: item, size: undefined }
      const url = String((item as any)[uf] ?? '')
      return { name: String((item as any)[nf] ?? getFileName(url)), url, size: (item as any)[sf] }
    })
  }
  if (typeof raw === 'object') {
    const url = String((raw as any)[uf] ?? '')
    return [{ name: String((raw as any)[nf] ?? getFileName(url)), url, size: (raw as any)[sf] }]
  }
  return []
})

// ==================== 弹窗状态 ====================
const visible = ref(false)
const currentIndex = ref(0)
const loading = ref(false)
const loadingText = ref('加载中...')
const officeSrc = ref<string | ArrayBuffer | Blob>('')
const officeError = ref('')
const pptContainerRef = ref<HTMLElement | null>(null)
let pptPreviewer: PptxPreviewerType | null = null

const currentFile = computed(() => normalizedFiles.value[currentIndex.value])
const currentType = computed(() => getFileType(currentFile.value?.url ?? ''))
const currentIcon = computed(() => getFileIconComponent(currentFile.value?.url ?? ''))

function cleanupResources() {
  officeSrc.value = ''
  officeError.value = ''
  if (pptPreviewer) { pptPreviewer.destroy(); pptPreviewer = null }
  if (pptContainerRef.value) pptContainerRef.value.innerHTML = ''
}

async function openPreview(file: FileItem) {
  const idx = normalizedFiles.value.findIndex(f => f.url === file.url)
  currentIndex.value = idx >= 0 ? idx : 0
  cleanupResources()
  loading.value = true
  loadingText.value = '加载中...'
  visible.value = true
  await nextTick()
  await loadFileContent()
}

function closePreview() { visible.value = false }

async function navigate(dir: 1 | -1) {
  const next = currentIndex.value + dir
  if (next < 0 || next >= normalizedFiles.length) return
  currentIndex.value = next
  cleanupResources()
  loading.value = true
  loadingText.value = '加载中...'
  await loadFileContent()
}

async function loadFileContent() {
  const url = currentFile.value?.url
  if (!url) { loading.value = false; return }
  const type = currentType.value

  // vue-office 支持 pdf/word/excel，直接传 URL 即可
  if (type === 'pdf' || type === 'word' || type === 'excel') {
    const typeLabel = type === 'pdf' ? 'PDF' : type === 'word' ? 'Word' : 'Excel'
    loadingText.value = `正在加载 ${typeLabel} 文档...`
    try {
      officeSrc.value = url
    } catch (e: any) {
      officeError.value = e.message || '文件加载失败'
    }
  } else if (type === 'ppt') {
    loadingText.value = '正在加载 PPT 文档...'
    try {
      // 需要先等 DOM 就绪（pptContainerRef 存在）
      await nextTick()
      const container = pptContainerRef.value
      if (!container) { console.error('[FilePreview] PPT 容器 ref 为 null'); throw new Error('PPT 渲染容器未就绪') }

      // 先 init，再 fetch + preview
      if (pptPreviewer) { pptPreviewer.destroy(); pptPreviewer = null }
      pptPreviewer = initPptxPreview(container, { mode: 'list', width: 960 })

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = await res.arrayBuffer()
      console.log('[FilePreview] PPT ArrayBuffer loaded:', buffer.byteLength, 'bytes')
      await pptPreviewer.preview(buffer)
      console.log('[FilePreview] PPT preview() done, wrapper children:', container.querySelectorAll('.pptx-preview-wrapper').length, container.innerHTML.length)
    } catch (e: any) {
      console.error('[FilePreview] PPT 渲染失败:', e)
      officeError.value = typeof e === 'string' ? e : e?.message || 'PPT 加载失败'
    }
  }

  loading.value = false
}

function onRendered() {
  loading.value = false
}

function onError(e: any) {
  loading.value = false
  officeError.value = typeof e === 'string' ? e : e?.message || '文件渲染失败'
}

// ==================== 基础工具 ====================
function getExt(url: string): string {
  const clean = url.split('?')[0].split('#')[0]
  const parts = clean.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}

function getFileName(url: string): string {
  const clean = url.split('?')[0].split('#')[0]
  return decodeURIComponent(clean.split('/').pop() || '未知文件')
}

const EXT_MAP: Record<string, string> = {
  pdf: 'pdf', doc: 'word', docx: 'word', xls: 'excel', xlsx: 'excel', ppt: 'ppt', pptx: 'ppt',
  jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', webp: 'image', bmp: 'image', svg: 'image',
  mp4: 'video', webm: 'video', ogg: 'video', mov: 'video', avi: 'video',
}

function getFileType(url: string): string { return EXT_MAP[getExt(url)] ?? 'file' }

function formatSize(size: number | string | undefined): string {
  if (size === undefined || size === null || size === '') return ''
  const n = typeof size === 'string' ? parseFloat(size) : size
  if (isNaN(n)) return String(size)
  if (n < 1) return (n * 1024).toFixed(0) + ' B'
  if (n < 1024) return n.toFixed(1) + ' KB'
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' MB'
  return (n / 1024 / 1024).toFixed(1) + ' GB'
}

// ==================== ESC / 清理 ====================
watch(visible, (val) => {
  if (!val) return
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { closePreview(); window.removeEventListener('keydown', handler) } }
  window.addEventListener('keydown', handler)
  watch(visible, v => { if (!v) window.removeEventListener('keydown', handler) }, { once: true })
})
watch(visible, v => { if (!v) cleanupResources() })
onBeforeUnmount(() => cleanupResources())

// ==================== 图标组件 ====================
const PdfIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('path', { d: 'M9 13h2a1 1 0 0 1 0 2H9v-4h2a1 1 0 0 1 0 2' }), h('path', { d: 'M14 13v4' }), h('path', { d: 'M17 13h-1.5a1.5 1.5 0 0 0 0 3H17' })]) })
const WordIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('path', { d: 'M8 13l2 6 2-4 2 4 2-6' })]) })
const ExcelIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('line', { x1: '9', y1: '12', x2: '15', y2: '18' }), h('line', { x1: '15', y1: '12', x2: '9', y2: '18' })]) })
const PptIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('rect', { x: '8', y: '12', width: '8', height: '5', rx: '1' }), h('line', { x1: '12', y1: '12', x2: '12', y2: '10' })]) })
const ImageIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }), h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }), h('polyline', { points: '21 15 16 10 5 21' })]) })
const VideoIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('polygon', { points: '23 7 16 12 23 17 23 7' }), h('rect', { x: '1', y: '5', width: '15', height: '14', rx: '2', ry: '2' })]) })
const FileIcon = defineComponent({ render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }), h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }), h('polyline', { points: '10 9 9 9 8 9' })]) })
const ICON_MAP: Record<string, any> = { pdf: PdfIcon, word: WordIcon, excel: ExcelIcon, ppt: PptIcon, image: ImageIcon, video: VideoIcon, file: FileIcon }
function getFileIcon(url: string) { return ICON_MAP[getFileType(url)] ?? FileIcon }
function getFileIconComponent(url: string) { return ICON_MAP[getFileType(url)] ?? FileIcon }
</script>

<style scoped lang="scss">
$primary: #4f46e5; $text-primary: #1a1a2e; $text-secondary: #4a4a6a; $text-muted: #8e8ea0;
$border: #f2f3f7; $bg: #fff; $bg-hover: #f8f9ff; $radius: 10px;
$shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06); $transition: 0.2s ease;
$color-pdf: #ef4444; $color-word: #2563eb; $color-excel: #16a34a; $color-ppt: #ea580c;
$color-image: #7c3aed; $color-video: #0891b2; $color-file: #64748b;

@mixin tc($t, $c) {
  .xly-file-preview__icon--#{$t}, .xly-fp-header__icon--#{$t}, .xly-fp-unsupported__icon--#{$t} { color: $c; background-color: rgba($c, 0.1); }
}

.xly-file-preview { display: flex; flex-direction: column; gap: 6px; }
.xly-file-preview__list { display: flex; flex-direction: column; gap: 4px; }
.xly-file-preview__item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: $radius; border: 1px solid $border; background: $bg; cursor: pointer; transition: all $transition; user-select: none;
  &:hover { background: $bg-hover; border-color: rgba($primary, 0.3); box-shadow: 0 2px 8px rgba($primary, 0.08); .xly-file-preview__btn { opacity: 1; color: $primary; } } }
.xly-file-preview__icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: $text-muted; background: #f1f5f9; svg { width: 18px; height: 18px; }
  @include tc(pdf, $color-pdf); @include tc(word, $color-word); @include tc(excel, $color-excel); @include tc(ppt, $color-ppt); @include tc(image, $color-image); @include tc(video, $color-video); @include tc(file, $color-file); }
.xly-file-preview__info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.xly-file-preview__name { font-size: 13px; font-weight: 500; color: $text-primary; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.xly-file-preview__size { font-size: 12px; color: $text-muted; }
.xly-file-preview__btn { flex-shrink: 0; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 6px; cursor: pointer; color: $text-muted; opacity: 0; transition: all $transition; &:hover { background: rgba($primary, 0.08); } }
.xly-file-preview__empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 32px 16px; color: $text-muted; font-size: 13px; svg { opacity: 0.4; } }

.xly-fp-mask { position: fixed; inset: 0; z-index: 2100; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(2px); }
.xly-fp-dialog { width: min(92vw, 1100px); height: min(90vh, 800px); background: $bg; border-radius: 16px; box-shadow: $shadow; display: flex; flex-direction: column; overflow: hidden; position: relative; }
.xly-fp-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid $border; flex-shrink: 0; gap: 12px; z-index: 10; }
.xly-fp-header__left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
.xly-fp-header__icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: $text-muted; background: #f1f5f9; svg { width: 18px; height: 18px; }
  @include tc(pdf, $color-pdf); @include tc(word, $color-word); @include tc(excel, $color-excel); @include tc(ppt, $color-ppt); @include tc(image, $color-image); @include tc(video, $color-video); @include tc(file, $color-file); }
.xly-fp-header__info { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.xly-fp-header__name { font-size: 14px; font-weight: 600; color: $text-primary; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 500px; }
.xly-fp-header__size { font-size: 12px; color: $text-muted; }
.xly-fp-header__actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.xly-fp-nav { display: flex; align-items: center; gap: 2px; margin-right: 8px; padding: 0 4px; border-right: 1px solid $border; }
.xly-fp-nav__btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 6px; cursor: pointer; color: $text-secondary; transition: all $transition; &:hover:not(:disabled) { background: $bg-hover; color: $primary; } &:disabled { opacity: 0.3; cursor: not-allowed; } }
.xly-fp-nav__text { font-size: 12px; color: $text-muted; padding: 0 6px; white-space: nowrap; }
.xly-fp-action-btn { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: $text-secondary; text-decoration: none; transition: all $transition; &:hover { background: $bg-hover; color: $primary; } }
.xly-fp-close:hover { background: #fef2f2 !important; color: #ef4444 !important; }

.xly-fp-body { flex: 1; position: relative; overflow: hidden; background: #f8fafc; }
.xly-fp-office-viewer { width: 100%; height: 100%; overflow: auto; }
.xly-fp-ppt-container { position: absolute; inset: 0; overflow: auto; background: #e5e7eb; z-index: 1; }

// vue-office/docx 样式覆盖
.xly-fp-office-viewer :deep(.docx-wrapper) {
  background: #e5e7eb !important;
  padding: 20px 0 !important;
  & > section.docx {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.12) !important;
    margin: 12px auto !important;
  }
}

// vue-office/excel 样式覆盖
.xly-fp-office-viewer :deep(.excel-container) {
  width: 100% !important;
  height: 100% !important;
}

.xly-fp-loading { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: $text-muted; font-size: 14px; background: rgba(248, 250, 252, 0.92); z-index: 10; }
.xly-fp-loading__spinner { width: 32px; height: 32px; border: 3px solid $border; border-top-color: $primary; border-radius: 50%; animation: fp-spin 0.8s linear infinite; }
@keyframes fp-spin { to { transform: rotate(360deg); } }

.xly-fp-image-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px; background: repeating-conic-gradient(#e2e8f0 0% 25%, transparent 0% 50%) 0 0 / 16px 16px; }
.xly-fp-image { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12); }
.xly-fp-video-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; }
.xly-fp-video { max-width: 100%; max-height: 100%; }

.xly-fp-unsupported { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 40px; text-align: center; }
.xly-fp-unsupported__icon { width: 72px; height: 72px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: $text-muted; svg { width: 36px; height: 36px; }
  @include tc(pdf, $color-pdf); @include tc(word, $color-word); @include tc(excel, $color-excel); @include tc(ppt, $color-ppt); @include tc(image, $color-image); @include tc(video, $color-video); @include tc(file, $color-file); }
.xly-fp-unsupported__title { font-size: 16px; font-weight: 600; color: $text-primary; margin: 0; }
.xly-fp-unsupported__desc { font-size: 13px; color: $text-muted; line-height: 1.6; margin: 0; code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: $text-secondary; } }
.xly-fp-unsupported__actions { display: flex; gap: 8px; margin-top: 4px; }
.xly-fp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid $border; background: $bg; color: $text-secondary; cursor: pointer; text-decoration: none; transition: all $transition;
  &:hover { border-color: rgba($primary, 0.4); color: $primary; }
  &--primary { background: $primary; border-color: $primary; color: #fff; &:hover { background: #4540d4; color: #fff; } } }

.xly-fp-fade-enter-active { transition: opacity 0.25s ease; }
.xly-fp-fade-leave-active { transition: opacity 0.2s ease; }
.xly-fp-fade-enter-from, .xly-fp-fade-leave-to { opacity: 0; }
.xly-fp-zoom-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.xly-fp-zoom-leave-active { transition: all 0.2s ease; }
.xly-fp-zoom-enter-from { opacity: 0; transform: scale(0.88) translateY(12px); }
.xly-fp-zoom-leave-to { opacity: 0; transform: scale(0.95); }
</style>
