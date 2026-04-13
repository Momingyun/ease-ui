<template>
  <div class="file-preview-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">FilePreview 文件预览</h1>
      <p class="doc-desc">
        支持展示文件列表并点击打开预览弹窗，内置 PDF、Word、Excel、PPT、图片、视频六种格式预览能力，
        基于 <code>@vue-office</code> 系列组件实现高还原度文档渲染。支持多种数据格式传入，灵活适配各类业务场景。
      </p>
    </div>

    <!-- 基础用法：逗号字符串 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法 — 逗号拼接字符串</h2>
      <p class="doc-section__desc">
        最简单的用法：直接传入逗号分隔的 URL 字符串，组件自动解析文件名和类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview :files="stringFiles" />
        </div>
        <div class="doc-code">
          <pre><code>{{ stringCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- URL 数组 -->
    <section class="doc-section">
      <h2 class="doc-section__title">URL 字符串数组</h2>
      <p class="doc-section__desc">
        传入 URL 字符串组成的数组，文件名自动从 URL 末尾解析。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview :files="urlArrayFiles" />
        </div>
        <div class="doc-code">
          <pre><code>{{ urlArrayCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 对象数组（默认字段名） -->
    <section class="doc-section">
      <h2 class="doc-section__title">对象数组 — 默认字段名</h2>
      <p class="doc-section__desc">
        传入对象数组时，默认读取 <code>name</code>、<code>url</code>、<code>size</code> 三个字段。
        <code>size</code> 单位为 KB，组件自动格式化为可读单位。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview :files="objectFiles" />
        </div>
        <div class="doc-code">
          <pre><code>{{ objectCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义字段名映射 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段名映射 <code>field-names</code></h2>
      <p class="doc-section__desc">
        当后端返回的字段名与默认值不同时，使用 <code>field-names</code> 属性进行映射，
        支持自定义 <code>name</code>、<code>url</code>、<code>size</code> 三个字段的别名。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview
            :files="customFieldFiles"
            :field-names="{ name: 'fileName', url: 'fileUrl', size: 'fileSize' }"
          />
        </div>
        <div class="doc-code">
          <pre><code>{{ customFieldCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 多文件 / 支持翻页 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多种文件类型混合</h2>
      <p class="doc-section__desc">
        支持 PDF、Word、Excel、PPT、图片、视频等多种格式同时展示。
        弹窗中提供 <strong>上一个 / 下一个</strong> 切换按钮，方便连续浏览多个文件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview :files="mixedFiles" />
        </div>
        <div class="doc-code">
          <pre><code>{{ mixedCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- PDF 预览 -->
    <section class="doc-section">
      <h2 class="doc-section__title">PDF 预览演示</h2>
      <p class="doc-section__desc">
        使用阿里云 OSS 公网 PDF 文件，点击可直接体验预览效果。
        PDF 预览使用浏览器原生 <code>&lt;iframe&gt;</code> 渲染，本地与公网文件均支持。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyFilePreview :files="pdfFiles" />
        </div>
        <div class="doc-code">
          <pre><code>{{ pdfCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- Office 预览说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Office 文档预览说明</h2>
      <p class="doc-section__desc">
        Word、Excel、PDF 文档使用 <code>@vue-office</code> 系列组件实现<strong>高还原度</strong>渲染，
        接近原始文件外观。所有预览均在浏览器端完成，无需后端服务。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="office-notice">
            <div class="office-notice__icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="office-notice__content">
              <p class="office-notice__title">预览方案</p>
              <ul class="office-notice__list">
                <li><strong>Word</strong>：使用 <code>@vue-office/docx</code>，支持分页、样式、图片、表格等高还原度渲染</li>
                <li><strong>Excel</strong>：使用 <code>@vue-office/excel</code>，完整还原表格样式、Sheet 切换等</li>
                <li><strong>PDF</strong>：使用 <code>@vue-office/pdf</code>，Canvas 渲染，完美还原</li>
                <li><strong>PPT</strong>：使用 <code>pptx-preview</code> 库，支持幻灯片列表模式预览</li>
                <li>文件需配置 <strong>CORS 跨域</strong> 允许 fetch 访问（本地文件和同域文件无此限制）</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>{{ officeViewerCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 安装依赖 -->
    <section class="doc-section">
      <h2 class="doc-section__title">安装依赖</h2>
      <p class="doc-section__desc">
        文件预览组件依赖以下 npm 包，使用前请先安装：
      </p>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none;">
          <pre><code>{{ installCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Props</h2>
      <div class="doc-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>files</code></td>
              <td>文件数据，支持多种格式（见下方说明）</td>
              <td><code>string | string[] | object | object[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>field-names</code></td>
              <td>对象字段名映射</td>
              <td><code>{ name?, url?, size? }</code></td>
              <td><code>{ name: 'name', url: 'url', size: 'size' }</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- files 格式说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">files 支持的格式</h2>
      <div class="doc-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>格式</th>
              <th>示例</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>逗号拼接字符串</td>
              <td><code>"a.pdf,b.docx"</code></td>
              <td>自动按逗号分割，文件名从 URL 解析</td>
            </tr>
            <tr>
              <td>URL 字符串数组</td>
              <td><code>["a.pdf", "b.docx"]</code></td>
              <td>每项为文件 URL，文件名自动解析</td>
            </tr>
            <tr>
              <td>对象数组（默认字段）</td>
              <td><code>[{ name, url, size }]</code></td>
              <td>使用默认字段名，size 单位为 KB</td>
            </tr>
            <tr>
              <td>对象数组（自定义字段）</td>
              <td><code>[{ fileName, fileUrl, fileSize }]</code></td>
              <td>配合 field-names 映射自定义字段名</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 支持的文件类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">支持的文件类型</h2>
      <div class="doc-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>扩展名</th>
              <th>预览方式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PDF</td>
              <td><code>.pdf</code></td>
              <td>@vue-office/pdf Canvas 渲染</td>
            </tr>
            <tr>
              <td>Word</td>
              <td><code>.doc .docx</code></td>
              <td>@vue-office/docx 高还原度渲染</td>
            </tr>
            <tr>
              <td>Excel</td>
              <td><code>.xls .xlsx</code></td>
              <td>@vue-office/excel 完整还原表格</td>
            </tr>
            <tr>
              <td>PPT</td>
              <td><code>.ppt .pptx</code></td>
              <td>pptx-preview 幻灯片列表预览</td>
            </tr>
            <tr>
              <td>图片</td>
              <td><code>.jpg .jpeg .png .gif .webp .bmp .svg</code></td>
              <td>原生 img 标签展示</td>
            </tr>
            <tr>
              <td>视频</td>
              <td><code>.mp4 .webm .ogg .mov .avi</code></td>
              <td>原生 video 标签播放</td>
            </tr>
            <tr>
              <td>其他</td>
              <td>不在上述列表中</td>
              <td>展示不支持提示，提供下载按钮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyFilePreview from '@/components/xly-file-preview/index.vue'

// ==================== OSS 公网示例文件 ====================
const OSS = 'https://xlyoa.oss-cn-hangzhou.aliyuncs.com/xly/test'
const pdfUrl  = `${OSS}/EaseUI.pdf`
const docxUrl = `${OSS}/EaseUI.docx`
const xlsxUrl = `${OSS}/EaseUI.xlsx`
const pptxUrl = `${OSS}/EaseUI.pptx`

// ==================== 示例数据 ====================

// 逗号拼接字符串
const stringFiles = [pdfUrl, docxUrl, xlsxUrl].join(',')

// URL 数组
const urlArrayFiles = [pdfUrl, xlsxUrl, pptxUrl]

// 对象数组（默认字段名）
const objectFiles = [
  { name: 'EaseUI.pdf',  url: pdfUrl,  size: 1500 },
  { name: 'EaseUI.xlsx', url: xlsxUrl, size: 200  },
  { name: 'EaseUI.docx', url: docxUrl, size: 350  },
]

// 自定义字段名
const customFieldFiles = [
  { fileName: 'EaseUI.docx', fileUrl: docxUrl, fileSize: 350 },
  { fileName: 'EaseUI.xlsx', fileUrl: xlsxUrl, fileSize: 200 },
]

// 多种文件类型混合
const mixedFiles = [
  { name: 'EaseUI.pdf',  url: pdfUrl,  size: 1500 },
  { name: 'EaseUI.docx', url: docxUrl, size: 350  },
  { name: 'EaseUI.xlsx', url: xlsxUrl, size: 200  },
  { name: 'EaseUI.pptx', url: pptxUrl, size: 2048 },
]

// PDF 预览
const pdfFiles = [
  { name: 'EaseUI.pdf', url: pdfUrl, size: 1500 },
]

// ==================== 代码示例 ====================

const installCode = `# Office 文档预览依赖（Word / Excel / PDF）
npm install @vue-office/docx @vue-office/excel @vue-office/pdf

# PPT 预览依赖
npm install pptx-preview`

const stringCode = `<!-- 逗号拼接字符串，最简用法 -->
<XlyFilePreview files="https://oss.com/EaseUI.pdf,https://oss.com/EaseUI.xlsx,https://oss.com/EaseUI.docx" />`

const urlArrayCode = `<XlyFilePreview :files="[
  'https://oss.com/EaseUI.pdf',
  'https://oss.com/EaseUI.xlsx',
  'https://oss.com/EaseUI.pptx',
]" />`

const objectCode = `const files = [
  { name: 'EaseUI.pdf',  url: 'https://oss.com/EaseUI.pdf',  size: 1536000 },
  { name: 'EaseUI.xlsx', url: 'https://oss.com/EaseUI.xlsx', size: 204800  },
  { name: 'EaseUI.docx', url: 'https://oss.com/EaseUI.docx', size: 358400  },
]

<XlyFilePreview :files="files" />`

const customFieldCode = `const files = [
  { fileName: 'EaseUI.docx', fileUrl: 'https://oss.com/EaseUI.docx', fileSize: 358400 },
  { fileName: 'EaseUI.xlsx', fileUrl: 'https://oss.com/EaseUI.xlsx', fileSize: 204800 },
]

<XlyFilePreview
  :files="files"
  :field-names="{ name: 'fileName', url: 'fileUrl', size: 'fileSize' }"
/>`

const mixedCode = `const files = [
  { name: 'EaseUI.pdf',  url: 'https://oss.com/EaseUI.pdf',  size: 1536000 },
  { name: 'EaseUI.docx', url: 'https://oss.com/EaseUI.docx', size: 358400  },
  { name: 'EaseUI.xlsx', url: 'https://oss.com/EaseUI.xlsx', size: 204800  },
  { name: 'EaseUI.pptx', url: 'https://oss.com/EaseUI.pptx', size: 2097152 },
]

<XlyFilePreview :files="files" />`

const officeViewerCode = `<!-- Office 预览方案 -->
<!-- @vue-office/docx  → Word 高还原度渲染   -->
<!-- @vue-office/excel → Excel 完整表格还原   -->
<!-- @vue-office/pdf   → PDF Canvas 渲染      -->
<!-- pptx-preview      → PPT 幻灯片预览       -->

// 组件内部自动识别文件类型并选择对应渲染器
// 支持传入 URL 字符串、ArrayBuffer 或 Blob`

const pdfCode = `<!-- PDF 使用 @vue-office/pdf Canvas 渲染 -->
<XlyFilePreview :files="[{
  name: 'EaseUI.pdf',
  url: 'https://xlyoa.oss-cn-hangzhou.aliyuncs.com/xly/test/EaseUI.pdf',
  size: 1536000
}]" />`
</script>

<style scoped lang="scss">
.file-preview-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 36px;
}

.doc-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
  margin: 0 0 10px;
}

.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  line-height: 1.7;
  margin: 0;
}

.doc-section {
  margin-bottom: 32px;
}

.doc-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f7;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  code {
    font-size: 14px;
    font-weight: 400;
    color: #4f46e5;
    background: #eef2ff;
    padding: 2px 8px;
    border-radius: 4px;
  }
}

.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  line-height: 1.7;
  margin: 0 0 12px;

  code {
    background: #f1f5f9;
    color: #4a4a6a;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12.5px;
  }

  strong {
    color: #1a1a2e;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
}

.doc-preview__body {
  padding: 20px;
  background: #fff;
}

.doc-code {
  background: #fafbfd;
  border-top: 1px solid #f2f3f7;
  padding: 16px 20px;

  pre {
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      font-size: 12.5px;
      color: #4a4a6a;
      line-height: 1.6;
      white-space: pre;
    }
  }
}

.doc-table-wrap {
  overflow-x: auto;
  border: 1px solid #f2f3f7;
  border-radius: 12px;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    background: #fafbfd;
    color: #1a1a2e;
    font-weight: 600;
    padding: 10px 16px;
    text-align: left;
    border-bottom: 1px solid #f2f3f7;
    white-space: nowrap;
  }

  td {
    color: #4a4a6a;
    padding: 10px 16px;
    border-bottom: 1px solid #f2f3f7;
    line-height: 1.5;

    &:last-child {
      border-bottom: none;
    }

    code {
      background: #f1f5f9;
      color: #4a4a6a;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 12px;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}

// Office 说明区块
.office-notice {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
}

.office-notice__icon {
  flex-shrink: 0;
  color: #2563eb;
  margin-top: 1px;
}

.office-notice__content {
  flex: 1;
  min-width: 0;
}

.office-notice__title {
  font-size: 13px;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 6px;
}

.office-notice__list {
  margin: 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  li {
    font-size: 13px;
    color: #1e40af;
    line-height: 1.5;

    strong {
      color: #1e3a8a;
    }
  }
}
</style>
