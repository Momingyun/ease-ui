<template>
  <div class="card-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Card 卡片</h1>
      <p class="doc-desc">简洁现代的卡片组件，用于组织和展示内容区块。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">包含头部、内容区和底部的卡片结构。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard style="width: 380px;">
            <template #header>
              <div class="header-title">项目详情</div>
            </template>
            <p class="base-text">
              这是一个基于 Vue 3 + TypeScript 构建的管理系统，提供了丰富的企业级 UI 组件库，支持快速开发。
            </p>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">创建时间</span>
                <span class="info-value">2026-03-01</span>
              </div>
              <div class="info-item">
                <span class="info-label">项目状态</span>
                <span class="badge badge-success">进行中</span>
              </div>
            </div>
            <template #footer>
              <div class="footer-actions">
                <XlyButton type="primary" size="small">确认</XlyButton>
                <XlyButton size="small">取消</XlyButton>
              </div>
            </template>
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCard&gt;
  &lt;template #header&gt;
    &lt;div class="header-title"&gt;项目详情&lt;/div&gt;
  &lt;/template&gt;
  &lt;p&gt;卡片内容...&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;div class="footer-actions"&gt;
      &lt;XlyButton type="primary" size="small"&gt;确认&lt;/XlyButton&gt;
      &lt;XlyButton size="small"&gt;取消&lt;/XlyButton&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/XlyCard&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带标题的卡片 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带标题的卡片</h2>
      <p class="doc-section__desc">使用 <code>title</code> 属性快速设置标题，或使用 <code>icon</code> 添加图标。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="grid-2">
            <XlyCard title="基本信息" style="width: 260px;">
              <div class="info-list">
                <div class="info-row">
                  <span class="label">姓名</span>
                  <span class="value">张明</span>
                </div>
                <div class="info-row">
                  <span class="label">工号</span>
                  <span class="value">EMP-2024001</span>
                </div>
                <div class="info-row">
                  <span class="label">部门</span>
                  <span class="value">技术研发部</span>
                </div>
                <div class="info-row">
                  <span class="label">职位</span>
                  <span class="value">高级工程师</span>
                </div>
              </div>
            </XlyCard>
            <XlyCard title="联系方式" icon="el:Message" style="width: 260px;">
              <div class="info-list">
                <div class="info-row">
                  <span class="label">手机</span>
                  <span class="value">138-xxxx-xxxx</span>
                </div>
                <div class="info-row">
                  <span class="label">邮箱</span>
                  <span class="value">zhang@company.com</span>
                </div>
                <div class="info-row">
                  <span class="label">办公室</span>
                  <span class="value">A栋 8层 801</span>
                </div>
              </div>
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCard title="基本信息"&gt;
  &lt;div&gt;内容...&lt;/div&gt;
&lt;/XlyCard&gt;

&lt;XlyCard title="联系方式" icon="el:Message"&gt;
  &lt;div&gt;内容...&lt;/div&gt;
&lt;/XlyCard&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 阴影效果 -->
    <section class="doc-section">
      <h2 class="doc-section__title">阴影效果</h2>
      <p class="doc-section__desc">通过 <code>shadow</code> 属性设置阴影显示时机。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="grid-3">
            <XlyCard title="始终显示" shadow="always" style="width: 160px;">
              <div class="demo-text">默认带阴影</div>
            </XlyCard>
            <XlyCard title="悬浮显示" shadow="hover" style="width: 160px;">
              <div class="demo-text">悬浮时显示</div>
            </XlyCard>
            <XlyCard title="无阴影" shadow="never" style="width: 160px;">
              <div class="demo-text">始终无阴影</div>
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCard shadow="always"&gt;...&lt;/XlyCard&gt;
&lt;XlyCard shadow="hover"&gt;...&lt;/XlyCard&gt;
&lt;XlyCard shadow="never"&gt;...&lt;/XlyCard&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 悬浮效果 -->
    <section class="doc-section">
      <h2 class="doc-section__title">悬浮效果</h2>
      <p class="doc-section__desc">使用 <code>hoverable</code> 属性使卡片可交互。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="grid-3">
            <XlyCard hoverable title="用户管理" style="width: 160px;">
              <div class="demo-text">点击查看详情</div>
            </XlyCard>
            <XlyCard hoverable title="订单管理" style="width: 160px;">
              <div class="demo-text">点击查看详情</div>
            </XlyCard>
            <XlyCard hoverable title="系统设置" style="width: 160px;">
              <div class="demo-text">点击查看详情</div>
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCard hoverable title="用户管理"&gt;
  &lt;div&gt;点击查看详情&lt;/div&gt;
&lt;/XlyCard&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>

      <h3 class="doc-subtitle">数据统计</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="stat-grid">
            <XlyCard class="stat-card">
              <div class="stat-content">
                <div class="stat-top">
                  <span class="stat-label">总用户数</span>
                  <span class="trend up">↑ 12.5%</span>
                </div>
                <div class="stat-value">12,846</div>
                <div class="stat-bottom">较上月</div>
              </div>
            </XlyCard>
            <XlyCard class="stat-card">
              <div class="stat-content">
                <div class="stat-top">
                  <span class="stat-label">今日订单</span>
                  <span class="trend up">↑ 8.2%</span>
                </div>
                <div class="stat-value">358</div>
                <div class="stat-bottom">较昨日</div>
              </div>
            </XlyCard>
            <XlyCard class="stat-card">
              <div class="stat-content">
                <div class="stat-top">
                  <span class="stat-label">本月收入</span>
                  <span class="trend down">↓ 3.1%</span>
                </div>
                <div class="stat-value">¥89,230</div>
                <div class="stat-bottom">较上月</div>
              </div>
            </XlyCard>
            <XlyCard class="stat-card">
              <div class="stat-content">
                <div class="stat-top">
                  <span class="stat-label">待处理事项</span>
                </div>
                <div class="stat-value">24</div>
                <div class="stat-bottom">本周</div>
              </div>
            </XlyCard>
          </div>
        </div>
      </div>

      <h3 class="doc-subtitle">任务列表</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard style="width: 100%; max-width: 520px;">
            <template #header>
              <div class="task-header">
                <span class="header-title">我的任务</span>
                <span class="task-count">5 项待办</span>
              </div>
            </template>
            <div class="task-list">
              <div class="task-item">
                <XlyIcon name="el:Check" :size="15" class="icon-success" />
                <span class="task-text">完成需求文档编写</span>
                <span class="badge badge-success">已完成</span>
              </div>
              <div class="task-item">
                <XlyIcon name="el:Clock" :size="15" class="icon-primary" />
                <span class="task-text">评审技术方案</span>
                <span class="badge badge-primary">进行中</span>
              </div>
              <div class="task-item">
                <XlyIcon name="el:Clock" :size="15" class="icon-muted" />
                <span class="task-text">开发用户模块</span>
                <span class="badge badge-muted">待开始</span>
              </div>
            </div>
          </XlyCard>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">使用 <code>disabled</code> 属性禁用卡片。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard disabled title="禁用卡片" style="width: 260px;">
            <div class="demo-text muted">禁用状态下无法交互</div>
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCard disabled&gt;...&lt;/XlyCard&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>title</code></td>
              <td>卡片标题</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>标题前的图标</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>rounded</code></td>
              <td>是否圆角</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td>是否边框</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>shadow</code></td>
              <td>阴影时机</td>
              <td><code>'always' | 'hover' | 'never'</code></td>
              <td><code>'always'</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>hoverable</code></td>
              <td>是否悬浮上浮</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>卡片内容</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td>头部内容（优先级高于 title）</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>标题图标</td>
            </tr>
            <tr>
              <td><code>extra</code></td>
              <td>头部右侧内容</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td>底部内容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyButton from '@/components/xly-button/index.vue'
import XlyCard from '@/components/xly-card/index.vue'
import XlyIcon from '@/components/xly-icon/index.vue'
</script>

<style scoped lang="scss">
.card-doc {
  padding: 8px 0 40px;
}

/* ========== 页面头部 ========== */
.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.doc-desc {
  font-size: 14px;
  color: #71717a;
  margin: 0;
}

/* ========== 章节样式 ========== */
.doc-section {
  margin-bottom: 28px;
}

.doc-section__title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e4e7;
}

.doc-section__desc {
  font-size: 14px;
  color: #71717a;
  margin: 0 0 14px;

  code {
    background: #f4f5f7;
    color: #3b82f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
}

.doc-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #4a4a4a;
  margin: 24px 0 12px;
}

/* ========== 预览区域 ========== */
.doc-preview {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
}

.doc-code {
  border-top: 1px solid #e4e4e7;
  background: #fafbfc;
  padding: 12px 16px;

  pre {
    margin: 0;
  }

  code {
    font-family: 'SF Mono', Consolas, monospace;
    font-size: 13px;
    color: #4a4a4a;
  }
}

/* ========== 表格 ========== */
.doc-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th,
  td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid #e4e4e7;
  }

  th {
    background: #fafbfc;
    font-weight: 500;
    color: #1a1a1a;
  }

  td {
    color: #4a4a4a;
  }

  code {
    background: #f4f5f7;
    color: #3b82f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
}

/* ========== 布局 ========== */
.grid-2 {
  display: flex;
  gap: 16px;
}

.grid-3 {
  display: flex;
  gap: 16px;
}

/* ========== 卡片内容样式 ========== */
.header-title {
  font-weight: 600;
  font-size: 15px;
  color: #1a1a1a;
}

.base-text {
  margin: 0 0 16px;
  line-height: 1.6;
  color: #4a4a4a;
  font-size: 14px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.label {
  color: #a1a1aa;
}

.value {
  color: #4a4a4a;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.info-label {
  color: #a1a1aa;
}

.info-value {
  color: #4a4a4a;
}

.footer-actions {
  display: flex;
  gap: 8px;
}

.demo-text {
  font-size: 13px;
  color: #a1a1aa;
  text-align: center;

  &.muted {
    color: #d4d4d8;
  }
}

/* ========== 徽章 ========== */
.badge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;

  &-success {
    background: #ecfdf5;
    color: #10b981;
  }

  &-primary {
    background: #eff6ff;
    color: #3b82f6;
  }

  &-warning {
    background: #fffbeb;
    color: #f59e0b;
  }

  &-danger {
    background: #fef2f2;
    color: #ef4444;
  }

  &-muted {
    background: #f4f5f7;
    color: #71717a;
  }
}

/* ========== 统计卡片 ========== */
.stat-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-card {
  width: 160px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 13px;
  color: #71717a;
}

.trend {
  font-size: 12px;
  font-weight: 500;

  &.up {
    color: #10b981;
  }

  &.down {
    color: #ef4444;
  }
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  margin-top: 4px;
}

.stat-bottom {
  font-size: 12px;
  color: #a1a1aa;
  margin-top: 4px;
}

/* ========== 任务卡片 ========== */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.task-count {
  font-size: 12px;
  color: #71717a;
  background: #f4f5f7;
  padding: 2px 10px;
  border-radius: 10px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.task-text {
  flex: 1;
  color: #4a4a4a;
}

.icon-success {
  color: #10b981;
}

.icon-primary {
  color: #3b82f6;
}

.icon-muted {
  color: #a1a1aa;
}
</style>
