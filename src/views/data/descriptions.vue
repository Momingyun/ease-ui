<template>
  <div class="descriptions-doc">
    <div class="doc-header">
      <h1 class="doc-title">Descriptions 描述列表</h1>
      <p class="doc-desc">以键值对形式结构化展示信息，适用于详情页、信息确认等场景。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>XlyDescriptionsItem</code> 配置每一项内容，默认水平排列（label 左，内容右）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDescriptions title="用户信息">
            <XlyDescriptionsItem label="姓名">张明</XlyDescriptionsItem>
            <XlyDescriptionsItem label="工号">EMP-2026001</XlyDescriptionsItem>
            <XlyDescriptionsItem label="部门">技术研发部</XlyDescriptionsItem>
            <XlyDescriptionsItem label="职位">高级工程师</XlyDescriptionsItem>
            <XlyDescriptionsItem label="手机">138-xxxx-xxxx</XlyDescriptionsItem>
            <XlyDescriptionsItem label="邮箱">zhang@company.com</XlyDescriptionsItem>
          </XlyDescriptions>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions title="用户信息"&gt;
  &lt;XlyDescriptionsItem label="姓名"&gt;张明&lt;/XlyDescriptionsItem&gt;
  &lt;XlyDescriptionsItem label="工号"&gt;EMP-2026001&lt;/XlyDescriptionsItem&gt;
  &lt;XlyDescriptionsItem label="部门"&gt;技术研发部&lt;/XlyDescriptionsItem&gt;
&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 垂直布局 -->
    <section class="doc-section">
      <h2 class="doc-section__title">垂直布局</h2>
      <p class="doc-section__desc">设置 <code>layout="vertical"</code>，label 显示在上方，内容在下方，适合卡片式展示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body flex-col">
          <div>
            <div class="sub-label">无边框</div>
            <XlyDescriptions title="项目概况" layout="vertical">
              <XlyDescriptionsItem label="项目名称">EaseUI 企业级组件库</XlyDescriptionsItem>
              <XlyDescriptionsItem label="负责人">张明</XlyDescriptionsItem>
              <XlyDescriptionsItem label="创建时间">2026-01-01</XlyDescriptionsItem>
              <XlyDescriptionsItem label="当前版本">v2.4.0</XlyDescriptionsItem>
              <XlyDescriptionsItem label="开源协议">MIT</XlyDescriptionsItem>
              <XlyDescriptionsItem label="当前状态">
                <span class="status-badge status-active"><span class="status-dot"></span>进行中</span>
              </XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
          <div>
            <div class="sub-label">有边框</div>
            <XlyDescriptions title="订单信息" layout="vertical" bordered>
              <XlyDescriptionsItem label="订单编号">ORD-20260325-001</XlyDescriptionsItem>
              <XlyDescriptionsItem label="下单时间">2026-03-25 14:30:00</XlyDescriptionsItem>
              <XlyDescriptionsItem label="支付方式">微信支付</XlyDescriptionsItem>
              <XlyDescriptionsItem label="商品名称">Vue3 企业级组件库</XlyDescriptionsItem>
              <XlyDescriptionsItem label="数量">1</XlyDescriptionsItem>
              <XlyDescriptionsItem label="订单金额">¥ 299.00</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 上下布局 --&gt;
&lt;XlyDescriptions layout="vertical"&gt;
  &lt;XlyDescriptionsItem label="项目名称"&gt;EaseUI&lt;/XlyDescriptionsItem&gt;
  ...
&lt;/XlyDescriptions&gt;

&lt;!-- 上下布局 + 边框 --&gt;
&lt;XlyDescriptions layout="vertical" bordered&gt;
  ...
&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 有边框 (水平) -->
    <section class="doc-section">
      <h2 class="doc-section__title">有边框（水平）</h2>
      <p class="doc-section__desc">使用 <code>bordered</code> 属性展示更清晰的网格结构，同时支持 <code>span</code> 跨列。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDescriptions title="订单详情" bordered>
            <XlyDescriptionsItem label="订单编号">ORD-20260325-001</XlyDescriptionsItem>
            <XlyDescriptionsItem label="下单时间">2026-03-25 14:30:00</XlyDescriptionsItem>
            <XlyDescriptionsItem label="支付方式">微信支付</XlyDescriptionsItem>
            <XlyDescriptionsItem label="商品名称">Vue3 企业级组件库</XlyDescriptionsItem>
            <XlyDescriptionsItem label="商品数量">1</XlyDescriptionsItem>
            <XlyDescriptionsItem label="订单金额">¥ 299.00</XlyDescriptionsItem>
            <XlyDescriptionsItem label="收货地址" :span="3">广东省深圳市南山区科技园南区 A 栋 8 楼 801 室</XlyDescriptionsItem>
          </XlyDescriptions>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions title="订单详情" bordered&gt;
  &lt;XlyDescriptionsItem label="订单编号"&gt;ORD-001&lt;/XlyDescriptionsItem&gt;
  &lt;!-- span 属性实现跨列 --&gt;
  &lt;XlyDescriptionsItem label="收货地址" :span="3"&gt;
    广东省深圳市...
  &lt;/XlyDescriptionsItem&gt;
&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义列数 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义列数</h2>
      <p class="doc-section__desc">通过 <code>column</code> 属性设置每行显示的列数，默认为 3。</p>
      <div class="doc-preview">
        <div class="doc-preview__body flex-col">
          <div>
            <div class="sub-label">column = 2</div>
            <XlyDescriptions :column="2" bordered>
              <XlyDescriptionsItem label="项目名称">EaseUI 企业级组件库</XlyDescriptionsItem>
              <XlyDescriptionsItem label="创建时间">2026-01-01</XlyDescriptionsItem>
              <XlyDescriptionsItem label="负责人">张明</XlyDescriptionsItem>
              <XlyDescriptionsItem label="当前状态">进行中</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
          <div>
            <div class="sub-label">column = 4</div>
            <XlyDescriptions :column="4" bordered>
              <XlyDescriptionsItem label="CPU">Intel Core i9</XlyDescriptionsItem>
              <XlyDescriptionsItem label="内存">64 GB DDR5</XlyDescriptionsItem>
              <XlyDescriptionsItem label="硬盘">2 TB NVMe SSD</XlyDescriptionsItem>
              <XlyDescriptionsItem label="显卡">NVIDIA RTX 4090</XlyDescriptionsItem>
              <XlyDescriptionsItem label="操作系统">macOS Sequoia</XlyDescriptionsItem>
              <XlyDescriptionsItem label="序列号">MAC-2026-00128</XlyDescriptionsItem>
              <XlyDescriptionsItem label="购买日期">2026-01-15</XlyDescriptionsItem>
              <XlyDescriptionsItem label="保修期至">2029-01-15</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions :column="2" bordered&gt;...&lt;/XlyDescriptions&gt;
&lt;XlyDescriptions :column="4" bordered&gt;...&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 富内容 -->
    <section class="doc-section">
      <h2 class="doc-section__title">富文本内容</h2>
      <p class="doc-section__desc">描述项内容支持任意 HTML 和 Vue 组件，包括标签、按钮、评分等。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDescriptions title="员工档案" bordered>
            <XlyDescriptionsItem label="姓名">李雯</XlyDescriptionsItem>
            <XlyDescriptionsItem label="在职状态">
              <span class="status-badge status-active">
                <span class="status-dot"></span> 在职
              </span>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="入职日期">2023-06-01</XlyDescriptionsItem>
            <XlyDescriptionsItem label="技能标签">
              <div class="tag-group">
                <span class="tech-tag blue">Vue 3</span>
                <span class="tech-tag green">TypeScript</span>
                <span class="tech-tag orange">Node.js</span>
                <span class="tech-tag purple">Go</span>
              </div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="绩效评级">
              <div class="rating-row">
                <XlyIcon v-for="i in 5" :key="i" name="el:StarFilled" :size="15" :class="i <= 4 ? 'star-on' : 'star-off'" />
                <span class="rating-text">4.0 / 5.0</span>
              </div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="操作">
              <div class="action-group">
                <XlyButton type="primary" size="small">编辑</XlyButton>
                <XlyButton size="small">查看档案</XlyButton>
              </div>
            </XlyDescriptionsItem>
          </XlyDescriptions>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptionsItem label="在职状态"&gt;
  &lt;span class="status-badge"&gt;在职&lt;/span&gt;
&lt;/XlyDescriptionsItem&gt;
&lt;XlyDescriptionsItem label="技能标签"&gt;
  &lt;span v-for="s in skills" :key="s"&gt;{{ s }}&lt;/span&gt;
&lt;/XlyDescriptionsItem&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 垂直布局富内容 -->
    <section class="doc-section">
      <h2 class="doc-section__title">垂直布局 · 富内容</h2>
      <p class="doc-section__desc">垂直布局同样支持任意内容插槽，适合仪表盘数据卡片展示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDescriptions title="运营数据" layout="vertical" :column="4" bordered>
            <XlyDescriptionsItem label="今日新增用户">
              <div class="metric-value">1,280</div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="月活跃用户">
              <div class="metric-value">42,680</div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="累计订单量">
              <div class="metric-value">158,092</div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="今日营收">
              <div class="metric-value revenue">¥ 86,420</div>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="系统状态">
              <span class="status-badge status-active"><span class="status-dot"></span>正常运行</span>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="最后同步">2026-03-26 13:00:00</XlyDescriptionsItem>
            <XlyDescriptionsItem label="数据版本">v20260326-003</XlyDescriptionsItem>
            <XlyDescriptionsItem label="操作">
              <div class="action-group">
                <XlyButton size="small" type="primary">刷新</XlyButton>
                <XlyButton size="small">导出</XlyButton>
              </div>
            </XlyDescriptionsItem>
          </XlyDescriptions>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions layout="vertical" :column="4" bordered&gt;
  &lt;XlyDescriptionsItem label="今日新增用户"&gt;
    &lt;div class="metric-value"&gt;1,280&lt;/div&gt;
  &lt;/XlyDescriptionsItem&gt;
  ...
&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 标题 extra 插槽 -->
    <section class="doc-section">
      <h2 class="doc-section__title">标题与额外操作</h2>
      <p class="doc-section__desc">使用 <code>#title</code> 和 <code>#extra</code> 插槽自定义头部。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyDescriptions bordered>
            <template #title>
              <div class="custom-title">
                <XlyIcon name="el:Document" :size="15" class="custom-title__icon" />
                合同基本信息
              </div>
            </template>
            <template #extra>
              <div class="extra-group">
                <XlyButton size="small">打印</XlyButton>
                <XlyButton size="small" type="primary">编辑</XlyButton>
              </div>
            </template>
            <XlyDescriptionsItem label="合同编号">HT-2026-00128</XlyDescriptionsItem>
            <XlyDescriptionsItem label="签署日期">2026-03-01</XlyDescriptionsItem>
            <XlyDescriptionsItem label="合同状态">
              <span class="status-badge status-active">
                <span class="status-dot"></span> 生效中
              </span>
            </XlyDescriptionsItem>
            <XlyDescriptionsItem label="甲方">深圳市云华科技有限公司</XlyDescriptionsItem>
            <XlyDescriptionsItem label="乙方">北京易代码信息技术有限公司</XlyDescriptionsItem>
            <XlyDescriptionsItem label="合同金额">¥ 1,280,000.00</XlyDescriptionsItem>
          </XlyDescriptions>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions bordered&gt;
  &lt;template #title&gt;
    &lt;XlyIcon name="el:Document" /&gt; 合同信息
  &lt;/template&gt;
  &lt;template #extra&gt;
    &lt;XlyButton size="small" type="primary"&gt;编辑&lt;/XlyButton&gt;
  &lt;/template&gt;
  ...
&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">尺寸</h2>
      <p class="doc-section__desc">支持 <code>small</code>、<code>default</code>、<code>large</code> 三种尺寸，水平/垂直布局均可用。</p>
      <div class="doc-preview">
        <div class="doc-preview__body flex-col">
          <div>
            <div class="sub-label">size = small</div>
            <XlyDescriptions size="small" bordered>
              <XlyDescriptionsItem label="姓名">张明</XlyDescriptionsItem>
              <XlyDescriptionsItem label="工号">EMP-001</XlyDescriptionsItem>
              <XlyDescriptionsItem label="部门">技术研发部</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
          <div>
            <div class="sub-label">size = default</div>
            <XlyDescriptions size="default" bordered>
              <XlyDescriptionsItem label="姓名">张明</XlyDescriptionsItem>
              <XlyDescriptionsItem label="工号">EMP-001</XlyDescriptionsItem>
              <XlyDescriptionsItem label="部门">技术研发部</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
          <div>
            <div class="sub-label">size = large</div>
            <XlyDescriptions size="large" bordered>
              <XlyDescriptionsItem label="姓名">张明</XlyDescriptionsItem>
              <XlyDescriptionsItem label="工号">EMP-001</XlyDescriptionsItem>
              <XlyDescriptionsItem label="部门">技术研发部</XlyDescriptionsItem>
            </XlyDescriptions>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDescriptions size="small" bordered&gt;...&lt;/XlyDescriptions&gt;
&lt;XlyDescriptions size="default" bordered&gt;...&lt;/XlyDescriptions&gt;
&lt;XlyDescriptions size="large" bordered&gt;...&lt;/XlyDescriptions&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Descriptions Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>title</code></td><td>标题</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>layout</code></td><td>布局方向</td><td><code>'horizontal' | 'vertical'</code></td><td><code>'horizontal'</code></td></tr>
            <tr><td><code>column</code></td><td>每行列数</td><td><code>number</code></td><td><code>3</code></td></tr>
            <tr><td><code>bordered</code></td><td>是否边框</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>size</code></td><td>尺寸</td><td><code>'small' | 'default' | 'large'</code></td><td><code>'default'</code></td></tr>
            <tr><td><code>labelWidth</code></td><td>标签列宽度（水平布局有效）</td><td><code>string | number</code></td><td><code>''</code></td></tr>
            <tr><td><code>labelAlign</code></td><td>标签对齐（水平布局有效）</td><td><code>'left' | 'right' | 'center'</code></td><td><code>'left'</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Descriptions Slots</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>插槽名</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><code>default</code></td><td>放置 XlyDescriptionsItem 子项</td></tr>
            <tr><td><code>title</code></td><td>自定义标题内容</td></tr>
            <tr><td><code>extra</code></td><td>标题右侧操作区</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">DescriptionsItem Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>label</code></td><td>标签文字</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>icon</code></td><td>标签图标</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>span</code></td><td>跨列数</td><td><code>number</code></td><td><code>1</code></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyDescriptions from '@/components/xly-descriptions/index.vue'
import XlyDescriptionsItem from '@/components/xly-descriptions/item.vue'
import XlyIcon from '@/components/xly-icon/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
</script>

<style scoped lang="scss">
// 统一文档样式 - 与 Statistic 组件保持一致
.descriptions-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0;
  line-height: 1.6;
}

.doc-section {
  margin-bottom: 28px;
}

.doc-section__title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f2f3f7;
}

.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 14px;
  line-height: 1.6;

  code {
    background: #fafbfd;
    color: #1677ff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    border: 1px solid #e8eaed;
  }
}

.doc-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #4a4a6a;
  margin: 24px 0 12px;
}

.doc-preview {
  border: 1px solid #e8eaed;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.doc-preview__body {
  padding: 24px;

  &.flex-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.doc-code {
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;

  pre { margin: 0; padding: 0; }

  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #4a4a6a;
    white-space: pre;
  }
}

.doc-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
  }

  th, td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
    font-size: 13px;
  }

  td { color: #4a4a6a; }

  code {
    background: #fafbfd;
    color: #1677ff;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    border: 1px solid #e8eaed;
  }
}

/* ── 小标签 ── */
.sub-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #8e8ea0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #fafbfd;
  border: 1px solid #e8eaed;
  padding: 1px 8px;
  border-radius: 20px;
  margin-bottom: 10px;
}

/* ── 状态徽章 ── */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 20px;

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &.status-active {
    background: #e6fffb;
    color: #00b96b;
    border: 1px solid #b7eb8f;

    .status-dot { background: #00b96b; }
  }
}

/* ── 技术标签 ── */
.tag-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tech-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.02em;

  &.blue   { background: #e6f4ff; color: #1677ff; border: 1px solid #91caff; }
  &.green  { background: #f6ffed; color: #389e0d; border: 1px solid #b7eb8f; }
  &.orange { background: #fff7e6; color: #d46b08; border: 1px solid #ffd591; }
  &.purple { background: #f9f0ff; color: #531dab; border: 1px solid #d3adf7; }
}

/* ── 评分 ── */
.rating-row {
  display: flex;
  align-items: center;
  gap: 3px;
}

.star-on  { color: #fa8c16; }
.star-off { color: #d9d9d9; }

.rating-text {
  font-size: 12px;
  color: #8e8ea0;
  margin-left: 6px;
  font-weight: 500;
}

/* ── 操作按钮组 ── */
.action-group {
  display: flex;
  gap: 8px;
}

/* ── 自定义标题 ── */
.custom-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  font-size: 15px;
  color: #1a1a2e;
}

.custom-title__icon { color: #1677ff; }

.extra-group {
  display: flex;
  gap: 8px;
}

/* ── 指标数值 ── */
.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.5px;
  line-height: 1.3;

  &.revenue { color: #1677ff; }
}
</style>