<script setup lang="ts">
defineOptions({ name: 'Home' })

const features = [
  { title: '单文件组件', desc: '每个组件都是独立的 .vue 文件，复制即用，不依赖公共模块。' },
  { title: '零额外依赖', desc: '只依赖 Element Plus，不引入任何第三方库，无版本冲突。' },
  { title: 'SCSS 变量换肤', desc: '所有样式通过 SCSS 变量控制，改一个变量全局换色。' },
  { title: '真实业务场景', desc: '搜索表单、高级表格、权限树…实际项目打磨。' },
]

const componentGroups = [
  { name: '基础', prefix: '/basic', items: ['button', 'icon', 'tag', 'divider', 'avatar', 'card', 'watermark', 'carousel', 'empty', 'badge', 'list'] },
  { name: '数据展示', prefix: '/data', items: ['table', 'chart', 'statistic', 'descriptions', 'image', 'timeline', 'video', 'china-map', 'file-preview', 'json-viewer', 'dept-tree', 'tree-chart', 'gantt'] },
  { name: '导航', prefix: '/nav', items: ['tabs', 'steps', 'dropdown'] },
  { name: '表单', prefix: '/form', items: ['input', 'select', 'radio', 'cascader', 'rate', 'switch', 'date-picker', 'time-picker', 'date-time-picker', 'search-form', 'range-picker', 'image-upload', 'file-upload', 'upload', 'dict-select'] },
  { name: '反馈', prefix: '/feedback', items: ['modal', 'drawer', 'loading', 'message', 'tour', 'progress'] },
  { name: '布局', prefix: '/layout', items: ['grid', 'worktab'] },
  { name: '业务', prefix: '/business', items: ['permission', 'chat', 'user-picker', 'dict-tag'] },
]

/** 组件 key → 路由路径（个别路径不规则的在此修正） */
const pathOverrides: Record<string, string> = {
  'search-form': '/form/searchForm',
}

function compPath(group: typeof componentGroups[0], key: string) {
  return pathOverrides[key] || `${group.prefix}/${key}`
}
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Vue 3 · Element Plus · TypeScript
        </div>
        <h1 class="hero-title">
          为中后台开发<br>
          <span class="hero-accent">量身定做</span>的组件库
        </h1>
        <p class="hero-desc">
          54 个组件，覆盖搜索、表格、权限、上传等真实业务场景。<br>
          零额外依赖，复制即用。
        </p>
        <div class="hero-actions">
          <a href="https://gitee.com/yun_hua_admin/ease-ui" target="_blank" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.984 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.926c0 .982.796 1.778 1.778 1.778h4.444a.593.593 0 0 0 .593-.593v-2.963a.593.593 0 0 0-.593-.593H11.63a.592.592 0 0 1-.592-.592v-1.482c0-.327.266-.592.592-.592h2.964a2.666 2.666 0 0 1 2.666 2.666v4.444a2.666 2.666 0 0 1-2.666 2.667H8.148a2.667 2.667 0 0 1-2.667-2.667V8.296a2.667 2.667 0 0 1 2.667-2.666h9.333a.594.594 0 0 1 .593.703z"/></svg>
            Gitee
          </a>
          <a href="https://github.com/Momingyun/ease-ui" target="_blank" class="btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- 特性 -->
    <section class="features">
      <div class="container">
        <div class="feature-grid">
          <div v-for="item in features" :key="item.title" class="feature-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 组件 -->
    <section class="components">
      <div class="container">
        <h2 class="section-title">组件</h2>
        <p class="section-desc">覆盖中后台开发全场景，看中哪个复制哪个。</p>
        <div class="comp-list">
          <div v-for="group in componentGroups" :key="group.name" class="comp-row">
            <span class="comp-cat">{{ group.name }}</span>
            <div class="comp-tags">
              <router-link v-for="tag in group.items" :key="tag" :to="compPath(group, tag)" class="comp-tag">{{ tag }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 上手 -->
    <section class="start">
      <div class="container">
        <h2 class="section-title">快速上手</h2>
        <ol class="start-steps">
          <li><strong>浏览</strong> — 左侧菜单查看演示效果和 API 文档</li>
          <li><strong>复制</strong> — 将 <code>src/components/xly-xxx</code> 复制到你的项目</li>
          <li><strong>使用</strong> — 按需调整 SCSS 变量，融入你的项目</li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
/* === Tokens === */
$black: #09090b;
$text-1: #18181b;
$text-2: #71717a;
$text-3: #a1a1aa;
$border: #e4e4e7;
$bg-subtle: #fafafa;
$accent: #18181b;

/* === Base === */
.home {
  color: $text-1;
  font-size: 14px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

/* === Hero === */
.hero {
  padding: 100px 0 80px;
  background: $bg-subtle;
  border-bottom: 1px solid $border;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: $text-2;
  margin-bottom: 24px;
  background: #fff;
  border: 1px solid $border;
  padding: 5px 14px;
  border-radius: 100px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
}

.hero-title {
  font-size: 44px;
  font-weight: 700;
  line-height: 1.15;
  color: $black;
  margin: 0 0 20px;
  letter-spacing: -0.03em;
}

.hero-accent {
  background: linear-gradient(135deg, $black 0%, #52525b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 16px;
  color: $text-2;
  line-height: 1.8;
  margin: 0 0 32px;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  background: $accent;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  background: #fff;
  color: $text-1;
  border: 1px solid $border;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s;

  &:hover {
    background: $bg-subtle;
  }
}

/* === Features === */
.features {
  padding: 64px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: $border;
  border: 1px solid $border;
  border-radius: 12px;
  overflow: hidden;
}

.feature-card {
  background: #fff;
  padding: 28px 28px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: $text-1;
    margin: 0 0 6px;
  }

  p {
    font-size: 13px;
    color: $text-2;
    margin: 0;
    line-height: 1.6;
  }
}

/* === Components === */
.components {
  padding: 64px 0;
  border-top: 1px solid $border;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: $text-2;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 6px;
}

.section-desc {
  font-size: 14px;
  color: $text-3;
  margin: 0 0 28px;
}

.comp-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comp-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.comp-cat {
  font-size: 12px;
  font-weight: 500;
  color: $text-3;
  min-width: 52px;
  padding-top: 4px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.comp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.comp-tag {
  font-size: 12.5px;
  color: $text-2;
  padding: 3px 10px;
  background: $bg-subtle;
  border: 1px solid transparent;
  border-radius: 6px;
  font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
  transition: all 0.12s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    border-color: $border;
    background: #fff;
    color: $accent;
  }
}

/* === Start === */
.start {
  padding: 64px 0 80px;
  border-top: 1px solid $border;
}

.start-steps {
  margin: 8px 0 0;
  padding-left: 20px;
  font-size: 14px;
  color: $text-2;
  line-height: 2.2;

  strong {
    color: $text-1;
    font-weight: 600;
  }

  code {
    font-family: 'SF Mono', 'Consolas', monospace;
    font-size: 12px;
    background: $bg-subtle;
    border: 1px solid $border;
    color: $text-1;
    padding: 1px 6px;
    border-radius: 4px;
  }
}

/* === Responsive === */
@media (max-width: 768px) {
  .hero {
    padding: 64px 0 56px;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-desc br {
    display: none;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .comp-row {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
