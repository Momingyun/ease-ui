<script setup lang="ts">
const features = [
  {
    icon: '📄',
    title: '单文件组件，即拷即用',
    desc: '每个组件都是完全独立的 .vue 单文件，包含模板、逻辑、样式。无需任何配置，直接复制到项目即可使用。',
  },
  {
    icon: '🔌',
    title: '仅依赖 Element Plus',
    desc: '不引入其他 UI 库，无样式冲突。如果你的项目已使用 Element Plus，可以无缝集成。',
  },
  {
    icon: '🎨',
    title: '样式完全独立',
    desc: '所有样式内联在组件内部，零样式污染。直接修改组件内的 SCSS 变量即可定制主题。',
  },
  {
    icon: '🎯',
    title: '解决真实业务痛点',
    desc: '每个组件都源于实际项目需求，解决表格选择混乱、搜索表单臃肿、日期范围绑定繁琐等痛点。',
  },
]

const componentGroups = [
  {
    name: '基础组件',
    color: '#409eff',
    bgColor: '#ecf5ff',
    count: 9,
    items: [
      'xly-avatar',
      'xly-button',
      'xly-card',
      'xly-carousel',
      'xly-divider',
      'xly-empty',
      'xly-icon',
      'xly-tag',
      'xly-watermark',
    ],
  },
  {
    name: '数据展示',
    color: '#7c3aed',
    bgColor: '#f3f0ff',
    count: 6,
    items: [
      'xly-chart',
      'xly-descriptions',
      'xly-image',
      'xly-statistic',
      'xly-table',
      'xly-timeline',
    ],
  },
  {
    name: '导航组件',
    color: '#0891b2',
    bgColor: '#ecfeff',
    count: 3,
    items: ['xly-dropdown', 'xly-steps', 'xly-tabs'],
  },
  {
    name: '表单组件',
    color: '#67c23a',
    bgColor: '#f0f9eb',
    count: 13,
    items: [
      'xly-form',
      'xly-input',
      'xly-select',
      'xly-radio',
      'xly-cascader',
      'xly-rate',
      'xly-date-picker',
      'xly-date-time-picker',
      'xly-time-picker',
      'xly-search-form',
      'xly-range-picker',
      'xly-image-upload',
      'xly-file-upload',
    ],
  },
  {
    name: '反馈组件',
    color: '#f56c6c',
    bgColor: '#fef0f0',
    count: 5,
    items: ['xly-drawer', 'xly-modal', 'xly-loading', 'xly-message', 'xly-progress'],
  },
  {
    name: '布局组件',
    color: '#e6a23c',
    bgColor: '#fdf6ec',
    count: 2,
    items: ['xly-row', 'xly-col'],
  },
  {
    name: '业务组件',
    color: '#909399',
    bgColor: '#f4f4f5',
    count: 2,
    items: ['xly-chat', 'xly-permission'],
  },
]

const painPoints = [
  {
    icon: '🔧',
    title: '组件库太重',
    desc: '引入一套组件库需要学习整套 API、主题配置、构建配置，成本太高',
  },
  {
    icon: '📋',
    title: '复制粘贴难',
    desc: '想从项目 A 复用组件到项目 B，发现依赖了各种公共样式、工具函数，拆不出来',
  },
  {
    icon: '🧩',
    title: 'Element Plus 不够用',
    desc: '基础组件有了，但带展开收起的搜索表单、智能表格等业务组件还得自己写',
  },
  {
    icon: '🔄',
    title: '重复造轮子',
    desc: '每个项目都要重新实现表格选择、日期范围绑定、表单布局...',
  },
]
</script>

<template>
  <div class="home">
    <!-- Hero 区域 -->
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-badge">Vue 3 · TypeScript · Element Plus</div>
        <div class="hero-title-row">
          <h1 class="hero-title">Ease UI</h1>
          <a
            href="https://gitee.com/yun_hua_admin/ease-ui/stargazers"
            target="_blank"
            class="title-star"
          >
            <img
              src="https://gitee.com/yun_hua_admin/ease-ui/badge/star.svg?theme=dark"
              alt="star"
              class="star-badge"
            />
          </a>
        </div>
        <p class="hero-subtitle">即插即用的 Vue 3 业务组件库，让中后台开发回归简单</p>
        <p class="hero-desc">
          一套为「快速复制」而生的业务组件库。每个组件都是独立的 .vue
          单文件，不依赖任何外部样式或工具函数，<br />
          直接复制到你的项目即可使用，让组件复用像复制代码一样简单。
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">40</span>
            <span class="stat-label">个组件</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">7</span>
            <span class="stat-label">个分类</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">0</span>
            <span class="stat-label">额外依赖</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">100%</span>
            <span class="stat-label">样式隔离</span>
          </div>
        </div>

        <!-- 开源地址 -->
        <div class="hero-links">
          <span class="link-label">开源地址：</span>
          <a href="https://gitee.com/yun_hua_admin/ease-ui" target="_blank" class="link-url">
            https://gitee.com/yun_hua_admin/ease-ui
          </a>
        </div>
      </div>
    </div>

    <!-- 痛点区域 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">💡 为什么需要它</h2>
        <p class="section-subtitle">中后台开发中你一定遇到过这些问题</p>
      </div>
      <div class="pain-grid">
        <div v-for="item in painPoints" :key="item.title" class="pain-card">
          <span class="pain-icon">{{ item.icon }}</span>
          <div class="pain-content">
            <h4 class="pain-title">{{ item.title }}</h4>
            <p class="pain-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="section section-gray">
      <div class="section-header">
        <h2 class="section-title">✨ 核心优势</h2>
        <p class="section-subtitle">极致轻量，即拷即用</p>
      </div>
      <div class="feature-grid">
        <div v-for="item in features" :key="item.title" class="feature-card">
          <span class="feature-icon">{{ item.icon }}</span>
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 组件分类 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">📦 组件总览</h2>
        <p class="section-subtitle">共 40 个组件，覆盖中后台常用场景</p>
      </div>
      <div class="component-groups">
        <div v-for="group in componentGroups" :key="group.name" class="group-card">
          <div class="group-header" :style="{ borderLeftColor: group.color }">
            <div class="group-left">
              <span class="group-name">{{ group.name }}</span>
              <span class="group-count" :style="{ background: group.bgColor, color: group.color }">
                {{ group.count }} 个
              </span>
            </div>
          </div>
          <div class="group-tags">
            <span
              v-for="tag in group.items"
              :key="tag"
              class="comp-tag"
              :style="{ borderColor: group.color + '40', color: group.color }"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="section section-gray">
      <div class="section-header">
        <h2 class="section-title">🚀 快速使用</h2>
        <p class="section-subtitle">找到你需要的组件，直接复制，无需安装</p>
      </div>
      <div class="steps-row">
        <div class="step-item">
          <div class="step-num">01</div>
          <h4 class="step-title">浏览组件</h4>
          <p class="step-desc">在左侧菜单中找到你需要的组件，查看演示效果</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <div class="step-num">02</div>
          <h4 class="step-title">复制源码</h4>
          <p class="step-desc">直接复制 <code>src/components/xly-xxx/index.vue</code> 文件</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <div class="step-num">03</div>
          <h4 class="step-title">粘贴使用</h4>
          <p class="step-desc">放入你的项目，按需修改 SCSS 变量定制样式</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
$primary: #4f6ef7;
$border: #e4e7ed;
$text-primary: #1a1a2e;
$text-secondary: #606266;
$text-muted: #909399;
$radius: 12px;
$radius-sm: 8px;

.home {
  min-height: 100%;
  background: #fff;
}

/* ========== Hero ========== */
.hero {
  padding: 56px 40px 48px;
  background: linear-gradient(135deg, #f5f7ff 0%, #eef2ff 50%, #f0f9eb 100%);
  border-bottom: 1px solid $border;

  .hero-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 20px;
    background: rgba($primary, 0.1);
    color: $primary;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
  }

  .hero-title {
    font-size: 40px;
    font-weight: 700;
    color: $text-primary;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .hero-title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 14px;

    .title-star {
      display: flex;
      align-items: center;

      .star-badge {
        height: 26px;
        border-radius: 6px;
      }
    }
  }

  .hero-subtitle {
    font-size: 18px;
    color: $primary;
    font-weight: 500;
    margin: 0 0 16px;
  }

  .hero-desc {
    font-size: 14px;
    color: $text-secondary;
    line-height: 1.8;
    margin: 0 0 36px;
  }
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: #fff;
  border: 1px solid $border;
  border-radius: 40px;
  padding: 12px 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;

    .stat-num {
      font-size: 24px;
      font-weight: 700;
      color: $primary;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: $text-muted;
      margin-top: 4px;
    }
  }

  .stat-divider {
    width: 1px;
    height: 36px;
    background: $border;
    flex-shrink: 0;
  }
}

.hero-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  .link-label {
    font-size: 14px;
    color: $text-secondary;
  }

  .link-url {
    font-size: 14px;
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* ========== Section ========== */
.section {
  padding: 52px 40px;

  &.section-gray {
    background: #f9fafb;
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 36px;

  .section-title {
    font-size: 24px;
    font-weight: 700;
    color: $text-primary;
    margin: 0 0 8px;
  }

  .section-subtitle {
    font-size: 14px;
    color: $text-muted;
    margin: 0;
  }
}

/* ========== Pain Points ========== */
.pain-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 860px;
  margin: 0 auto;
}

.pain-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: #fff;
  border: 1px solid $border;
  border-radius: $radius-sm;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .pain-icon {
    font-size: 28px;
    flex-shrink: 0;
    line-height: 1;
    margin-top: 2px;
  }

  .pain-title {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 6px;
  }

  .pain-desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
    margin: 0;
  }
}

/* ========== Features ========== */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  padding: 28px 24px;
  background: #fff;
  border: 1px solid $border;
  border-radius: $radius;
  text-align: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .feature-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 14px;
    line-height: 1;
  }

  .feature-title {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 10px;
  }

  .feature-desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.7;
    margin: 0;
  }
}

/* ========== Component Groups ========== */
.component-groups {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto;
}

.group-card {
  background: #fff;
  border: 1px solid $border;
  border-radius: $radius-sm;
  overflow: hidden;

  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-left: 4px solid;
    background: #fafafa;
    border-bottom: 1px solid $border;

    .group-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .group-name {
      font-size: 14px;
      font-weight: 600;
      color: $text-primary;
    }

    .group-count {
      font-size: 12px;
      padding: 2px 10px;
      border-radius: 20px;
      font-weight: 500;
    }
  }

  .group-tags {
    padding: 14px 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .comp-tag {
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid;
    font-family: 'Consolas', 'Monaco', monospace;
    background: #fff;
  }
}

/* ========== Steps ========== */
.steps-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
}

.step-item {
  flex: 1;
  text-align: center;
  padding: 28px 24px;
  background: #fff;
  border: 1px solid $border;
  border-radius: $radius-sm;

  .step-num {
    font-size: 28px;
    font-weight: 800;
    color: rgba($primary, 0.15);
    line-height: 1;
    margin-bottom: 12px;
    font-family: 'Arial', sans-serif;
    letter-spacing: -1px;
  }

  .step-title {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 8px;
  }

  .step-desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
    margin: 0;

    code {
      font-size: 12px;
      background: #f0f2f5;
      padding: 1px 6px;
      border-radius: 4px;
      color: $primary;
      font-family: 'Consolas', monospace;
    }
  }
}

.step-arrow {
  font-size: 20px;
  color: #c0c4cc;
  padding: 0 16px;
  flex-shrink: 0;
}
</style>
