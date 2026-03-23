<template>
  <div class="icon-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Icon 图标</h1>
      <p class="doc-desc">
        统一的图标组件，通过 <code>name</code> 前缀区分类型： <code>el:</code> Element Plus
        图标、<code>svg:</code> 自定义 SVG 图标、 无前缀自动识别为图片
        URL。使用时无需在页面中引入图标库。
      </p>
    </div>

    <!-- Element Plus 图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Element Plus 图标</h2>
      <p class="doc-section__desc">
        使用 <code>el:</code> 前缀 + Element Plus 图标名称（PascalCase 或
        kebab-case），组件会自动渲染对应的图标。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-grid">
            <div v-for="icon in basicElIcons" :key="icon" class="icon-grid__item">
              <XlyIcon :name="`el:${icon}`" :size="24" />
              <span class="icon-grid__label">{{ icon }}</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyIcon name="el:Search" :size="24" /&gt;
&lt;XlyIcon name="el:Edit" :size="24" /&gt;
&lt;XlyIcon name="el:arrow-down" :size="24" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义 SVG 图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义 SVG 图标</h2>
      <p class="doc-section__desc">
        将 <code>.svg</code> 文件放入 <code>src/assets/icon/svg/</code> 目录， 使用
        <code>svg:文件名</code>（不含后缀）即可渲染。组件会自动扫描该目录。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-grid">
            <div v-for="icon in svgIconList" :key="icon" class="icon-grid__item">
              <XlyIcon :name="`svg:${icon}`" :size="24" />
              <span class="icon-grid__label">{{ icon }}</span>
            </div>
          </div>
          <div v-if="svgIconList.length === 0" class="empty-tip">
            暂无自定义 SVG 图标，请将 .svg 文件放入 src/assets/icon/svg/ 目录
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- assets/icon/svg/check-circle.svg --&gt;
&lt;XlyIcon name="svg:check-circle" :size="24" /&gt;

&lt;!-- assets/icon/svg/dashboard.svg --&gt;
&lt;XlyIcon name="svg:dashboard" :size="32" color="#4f6ef7" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 & 大小 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色与大小</h2>
      <p class="doc-section__desc">
        通过 <code>color</code> 和 <code>size</code> 属性设置图标颜色和大小，适用于所有图标类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-showcase">
            <div class="icon-showcase__item">
              <XlyIcon name="el:Setting" :size="16" color="#8e8ea0" />
              <span>16px 灰色</span>
            </div>
            <div class="icon-showcase__item">
              <XlyIcon name="el:Setting" :size="20" color="#4f6ef7" />
              <span>20px 蓝色</span>
            </div>
            <div class="icon-showcase__item">
              <XlyIcon name="el:Setting" :size="28" color="#34c759" />
              <span>28px 绿色</span>
            </div>
            <div class="icon-showcase__item">
              <XlyIcon name="el:Setting" :size="36" color="#f5a623" />
              <span>36px 橙色</span>
            </div>
            <div class="icon-showcase__item">
              <XlyIcon name="el:Setting" :size="48" color="#f56c6c" />
              <span>48px 红色</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyIcon name="el:Setting" :size="24" color="#4f6ef7" /&gt;
&lt;XlyIcon name="svg:dashboard" :size="36" color="#34c759" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 图片 URL -->
    <section class="doc-section">
      <h2 class="doc-section__title">图片图标</h2>
      <p class="doc-section__desc">
        无前缀传入图片 URL，支持以下格式：
        <br />
        - <code>@/</code> 开头的 Vite 别名路径（像 <code>&lt;img&gt;</code> 一样简单）
        <br />
        - <code>http(s)://</code> 开头的网络图片
        <br />
        - 相对路径（如 <code>./assets/icon.png</code>） <br /><br />
        组件会自动解析 <code>@/</code> 路径并渲染为 <code>&lt;img&gt;</code> 标签。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-showcase">
            <div class="icon-showcase__item">
              <XlyIcon name="@/assets/icon/img/img.png" :size="32" />
              <span>简单方式：直接使用 @/ 路径（推荐）</span>
            </div>
            <div class="icon-showcase__item">
              <XlyIcon
                name="https://img2.baidu.com/it/u=3879244448,1206251298&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                :size="32"
              />
              <span>网络图片</span>
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 简单方式：直接使用 @/ 路径（推荐） --&gt;
&lt;XlyIcon name="@/assets/icon/img/img.png" :size="32" /&gt;

&lt;!-- 网络图片 --&gt;
&lt;XlyIcon name="https://example.com/icon.png" :size="32" /&gt;

&lt;!-- import 方式（如果你需要动态处理图片） --&gt;
&lt;script setup&gt;
import imgPng from '@/assets/icon/img/img.png?url'
&lt;/script&gt;
&lt;template&gt;
  &lt;XlyIcon :name="imgPng" :size="32" /&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 可点击图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">可点击图标</h2>
      <p class="doc-section__desc">
        设置 <code>clickable</code> 属性后图标变为可交互状态，支持点击事件和 hover 效果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-showcase">
            <XlyIcon name="el:Search" :size="24" clickable @click="handleIconClick('Search')" />
            <XlyIcon name="el:Edit" :size="24" clickable @click="handleIconClick('Edit')" />
            <XlyIcon
              name="el:Delete"
              :size="24"
              clickable
              color="#f56c6c"
              @click="handleIconClick('Delete')"
            />
            <XlyIcon name="el:Share" :size="24" clickable @click="handleIconClick('Share')" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyIcon
  name="el:Delete"
  :size="24"
  color="#f56c6c"
  clickable
  @click="handleIconClick('Delete')"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- Element Plus 全部图标浏览 -->
    <section class="doc-section">
      <h2 class="doc-section__title">全部 Element Plus 图标</h2>
      <p class="doc-section__desc">
        点击图标可复制使用代码到剪贴板。共 {{ allEpIcons.length }} 个图标。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="icon-grid icon-grid--all">
            <div
              v-for="icon in allEpIcons"
              :key="icon"
              class="icon-grid__item icon-grid__item--interactive"
              :title="`点击复制：el:${icon}`"
              @click="copyIconName(icon)"
            >
              <XlyIcon :name="`el:${icon}`" :size="20" />
              <span class="icon-grid__label">{{ icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import XlyIcon from '@/components/xly-icon/index.vue'
import { xly } from '@/utils/xly'
import * as EpIcons from '@element-plus/icons-vue'
import { getSvgIconNames } from '@/components/xly-icon/svg-map'

/** 常用基础 Element Plus 图标 */
const basicElIcons = [
  'Search',
  'Edit',
  'Delete',
  'Check',
  'Close',
  'Plus',
  'Minus',
  'InfoFilled',
  'WarningFilled',
  'SuccessFilled',
  'CircleCheckFilled',
  'CircleCloseFilled',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Setting',
  'User',
  'UserFilled',
  'Lock',
  'Unlock',
  'Star',
  'StarFilled',
  'Phone',
  'Position',
]

/** 已加载的自定义 SVG 图标列表 */
const svgIconList = computed(() => getSvgIconNames())

/** 全部 Element Plus 图标名称 */
const allEpIcons = Object.keys(EpIcons)

/** 图标点击事件 */
function handleIconClick(name: string) {
  xly.$msg.info(`点击了图标: ${name}`)
}

/** 复制图标使用代码 */
function copyIconName(name: string) {
  const code = `el:${name}`
  navigator.clipboard
    .writeText(code)
    .then(() => {
      xly.$msg.success(`已复制: ${code}`)
    })
    .catch(() => {
      xly.$msg.warning('复制失败，请手动复制')
    })
}
</script>

<style scoped lang="scss">
/* ========== 文档页通用样式 ========== */
.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  line-height: 1.6;
  margin: 0;

  code {
    padding: 2px 6px;
    background: #f0f2f5;
    border-radius: 4px;
    font-size: 13px;
    color: #4f6ef7;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

.doc-section {
  margin-bottom: 40px;
}

.doc-section__title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.doc-section__desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px;

  code {
    padding: 2px 6px;
    background: #f0f2f5;
    border-radius: 4px;
    font-size: 13px;
    color: #4f6ef7;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

.doc-preview {
  border: 1px solid #e2e4ed;
  border-radius: 12px;
  overflow: hidden;
}

.doc-preview__body {
  padding: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 48px;
}

.doc-code {
  border-top: 1px solid #e2e4ed;
  padding: 16px;
  background: #fafbfc;

  pre {
    margin: 0;
    overflow-x: auto;
  }

  code {
    font-size: 13px;
    line-height: 1.6;
    color: #4a4a6a;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
}

/* ========== 图标网格 ========== */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 4px;
  width: 100%;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 4px;
    border-radius: 8px;
    transition: background-color 0.15s ease;
    min-height: 72px;

    &--interactive {
      cursor: pointer;

      &:hover {
        background-color: rgba(79, 110, 247, 0.06);
      }
    }
  }

  &__label {
    font-size: 11px;
    color: #8e8ea0;
    text-align: center;
    word-break: break-all;
    line-height: 1.2;
  }

  &--all {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}

/* ========== 图标展示行 ========== */
.icon-showcase {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    span {
      font-size: 12px;
      color: #8e8ea0;
    }
  }
}

/* ========== 空状态 ========== */
.empty-tip {
  width: 100%;
  text-align: center;
  color: #8e8ea0;
  font-size: 14px;
  padding: 16px;
}
</style>
