<template>
  <div class="timeline-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Timeline 时间线</h1>
      <p class="doc-desc">
        垂直展示时间流信息，用于记录项目进度、订单状态、活动流程等。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        最简单的时间线，通过默认插槽添加节点内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTimeline>
            <XlyTimelineItem status="finish" timestamp="2024-01-15 09:30">
              <h4>项目启动</h4>
              <p>完成项目立项和团队组建</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="finish" timestamp="2024-02-01 14:00">
              <h4>需求分析</h4>
              <p>完成需求文档编写和评审</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="process" timestamp="2024-02-15 10:00">
              <h4>开发阶段</h4>
              <p>正在进行核心功能开发</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait" timestamp="2024-03-01">
              <h4>测试阶段</h4>
              <p>计划进行系统测试</p>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTimeline&gt;
  &lt;XlyTimelineItem status="finish" timestamp="2024-01-15"&gt;
    &lt;h4&gt;项目启动&lt;/h4&gt;
    &lt;p&gt;完成项目立项和团队组建&lt;/p&gt;
  &lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="process" timestamp="2024-02-15"&gt;
    &lt;h4&gt;开发阶段&lt;/h4&gt;
    &lt;p&gt;正在进行核心功能开发&lt;/p&gt;
  &lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="wait" timestamp="2024-03-01"&gt;
    &lt;h4&gt;测试阶段&lt;/h4&gt;
    &lt;p&gt;计划进行系统测试&lt;/p&gt;
  &lt;/XlyTimelineItem&gt;
&lt;/XlyTimeline&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同状态</h2>
      <p class="doc-section__desc">
        通过 <code>status</code> 属性设置节点状态：
        <code>finish</code>（完成）、<code>process</code>（进行中）、<code>wait</code>（待处理）、<code>error</code>（错误）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTimeline>
            <XlyTimelineItem status="finish">
              <h4>已完成</h4>
              <p>使用绿色勾选图标表示完成状态</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="process">
              <h4>进行中</h4>
              <p>使用蓝色圆点表示当前进行中的状态</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait">
              <h4>待处理</h4>
              <p>使用灰色圆圈表示待处理状态</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="error">
              <h4>错误状态</h4>
              <p>使用红色叉号表示错误或失败状态</p>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTimelineItem status="finish"&gt;...&lt;/XlyTimelineItem&gt;
&lt;XlyTimelineItem status="process"&gt;...&lt;/XlyTimelineItem&gt;
&lt;XlyTimelineItem status="wait"&gt;...&lt;/XlyTimelineItem&gt;
&lt;XlyTimelineItem status="error"&gt;...&lt;/XlyTimelineItem&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义节点图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义节点图标</h2>
      <p class="doc-section__desc">
        通过 <code>icon</code> 属性直接传入图标名称，使用已有的 <code>XlyIcon</code> 组件。支持 Element Plus 图标（<code>el:xxx</code>）和 SVG 图标（<code>svg:xxx</code>）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTimeline>
            <XlyTimelineItem status="finish" icon="el:Check">
              <h4>自定义图标</h4>
              <p>使用 el:Check 图标</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="process" icon="el:Loading">
              <h4>加载中</h4>
              <p>使用 el:Loading 图标</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait" icon="el:Clock">
              <h4>待处理</h4>
              <p>使用 el:Clock 图标</p>
            </XlyTimelineItem>
            <XlyTimelineItem status="error" icon="el:Close">
              <h4>错误状态</h4>
              <p>使用 el:Close 图标</p>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTimelineItem status="finish" icon="el:Check"&gt;
  &lt;h4&gt;自定义图标&lt;/h4&gt;
&lt;/XlyTimelineItem&gt;

&lt;XlyTimelineItem status="process" icon="el:Loading"&gt;
  &lt;h4&gt;加载中&lt;/h4&gt;
&lt;/XlyTimelineItem&gt;

&lt;XlyTimelineItem status="wait" icon="el:Clock"&gt;
  &lt;h4&gt;待处理&lt;/h4&gt;
&lt;/XlyTimelineItem&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 时间戳插槽 -->
    <section class="doc-section">
      <h2 class="doc-section__title">时间戳</h2>
      <p class="doc-section__desc">
        通过 <code>timestamp</code> 属性或 <code>#timestamp</code> 插槽添加时间信息。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTimeline>
            <XlyTimelineItem timestamp="2024-01-15 09:30:00">
              <h4>项目启动会议</h4>
              <p>明确项目目标和分工</p>
            </XlyTimelineItem>
            <XlyTimelineItem>
              <template #timestamp>
                <div class="custom-timestamp">
                  <span class="date">2024-02-01</span>
                  <span class="time">14:30</span>
                </div>
              </template>
              <h4>设计评审</h4>
              <p>完成 UI 设计稿评审</p>
            </XlyTimelineItem>
            <XlyTimelineItem timestamp="2024-02-15">
              <h4>开发启动</h4>
              <p>开始核心功能开发</p>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 使用 timestamp 属性 --&gt;
&lt;XlyTimelineItem timestamp="2024-01-15 09:30"&gt;
  ...
&lt;/XlyTimelineItem&gt;

&lt;!-- 使用 #timestamp 插槽 --&gt;
&lt;XlyTimelineItem&gt;
  &lt;template #timestamp&gt;
    &lt;span&gt;2024-02-01 14:30&lt;/span&gt;
  &lt;/template&gt;
  ...
&lt;/XlyTimelineItem&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 简洁模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">简洁模式</h2>
      <p class="doc-section__desc">
        不显示时间戳，仅展示关键节点信息。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyTimeline>
            <XlyTimelineItem status="finish">创建订单 #20240301</XlyTimelineItem>
            <XlyTimelineItem status="finish">支付成功</XlyTimelineItem>
            <XlyTimelineItem status="process">商品打包中</XlyTimelineItem>
            <XlyTimelineItem status="wait">等待发货</XlyTimelineItem>
            <XlyTimelineItem status="wait">确认收货</XlyTimelineItem>
          </XlyTimeline>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTimeline&gt;
  &lt;XlyTimelineItem status="finish"&gt;创建订单 #20240301&lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="finish"&gt;支付成功&lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="process"&gt;商品打包中&lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="wait"&gt;等待发货&lt;/XlyTimelineItem&gt;
  &lt;XlyTimelineItem status="wait"&gt;确认收货&lt;/XlyTimelineItem&gt;
&lt;/XlyTimeline&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">时间线在实际业务中的常见用法。</p>

      <!-- 订单追踪 -->
      <h3 class="doc-subsection__title">订单物流追踪</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="order-tracker">
          <div class="order-tracker__header">
            <span>运单号：SF1234567890</span>
            <XlyTag type="primary" size="small">运输中</XlyTag>
          </div>
          <XlyTimeline>
            <XlyTimelineItem status="finish" timestamp="2024-03-20 10:30">
              <div class="tracker-item">
                <h4>已发货</h4>
                <p>商品已从深圳仓库发出</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="finish" timestamp="2024-03-20 14:20">
              <div class="tracker-item">
                <h4>运输中</h4>
                <p>包裹正在发往广州</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="process" timestamp="2024-03-21 09:00">
              <div class="tracker-item">
                <h4>到达中转站</h4>
                <p>包裹已到达广州中转站</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait">
              <div class="tracker-item">
                <h4>派送中</h4>
                <p>快递员正在派送</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait">
              <div class="tracker-item">
                <h4>已签收</h4>
                <p>收件人已签收</p>
              </div>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
      </div>

      <!-- 活动记录 -->
      <h3 class="doc-subsection__title">用户活动记录</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="activity-list">
          <XlyTimeline>
            <XlyTimelineItem status="finish" timestamp="2024-03-24 15:30">
              <div class="activity-item">
                <div class="activity-item__icon success">
                  <el-icon><CircleCheckFilled /></el-icon>
                </div>
                <div class="activity-item__content">
                  <h4>订单完成</h4>
                  <p>成功购买《Vue3实战》课程</p>
                </div>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="finish" timestamp="2024-03-24 14:20">
              <div class="activity-item">
                <div class="activity-item__icon primary">
                  <el-icon><Message /></el-icon>
                </div>
                <div class="activity-item__content">
                  <h4>发表评论</h4>
                  <p>对《React入门》课程发表了评论</p>
                </div>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="finish" timestamp="2024-03-24 10:00">
              <div class="activity-item">
                <div class="activity-item__icon warning">
                  <el-icon><Star /></el-icon>
                </div>
                <div class="activity-item__content">
                  <h4>收藏课程</h4>
                  <p>收藏了《TypeScript进阶》课程</p>
                </div>
              </div>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
      </div>

      <!-- 审核流程 -->
      <h3 class="doc-subsection__title">审批流程</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="approval-flow">
          <XlyTimeline>
            <XlyTimelineItem status="finish" timestamp="2024-03-20 09:00">
              <div class="approval-item">
                <div class="approval-item__header">
                  <span class="approval-item__title">提交申请</span>
                  <span class="approval-item__time">03-20 09:00</span>
                </div>
                <p class="approval-item__desc">张明 提交了请假申请（3天）</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="finish" timestamp="2024-03-20 10:30">
              <div class="approval-item">
                <div class="approval-item__header">
                  <span class="approval-item__title">直属主管审批</span>
                  <span class="approval-item__time">03-20 10:30</span>
                </div>
                <p class="approval-item__desc">李华 审批通过</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="process" timestamp="2024-03-20 11:00">
              <div class="approval-item">
                <div class="approval-item__header">
                  <span class="approval-item__title">部门经理审批</span>
                  <span class="approval-item__time">03-20 11:00</span>
                </div>
                <p class="approval-item__desc">等待王芳审批</p>
              </div>
            </XlyTimelineItem>
            <XlyTimelineItem status="wait">
              <div class="approval-item">
                <div class="approval-item__header">
                  <span class="approval-item__title">HR备案</span>
                </div>
                <p class="approval-item__desc">审批通过后自动备案</p>
              </div>
            </XlyTimelineItem>
          </XlyTimeline>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Timeline Props</h3>
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
              <td><code>direction</code></td>
              <td>时间线方向</td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'vertical'</code></td>
            </tr>
            <tr>
              <td><code>reverse</code></td>
              <td>是否倒序显示</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>custom-class</code></td>
              <td>自定义类名</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TimelineItem Props</h3>
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
              <td><code>status</code></td>
              <td>节点状态</td>
              <td><code>'wait' | 'process' | 'finish' | 'error'</code></td>
              <td><code>'finish'</code></td>
            </tr>
            <tr>
              <td><code>timestamp</code></td>
              <td>时间戳</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TimelineItem Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>插槽名</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>default</code></td><td>节点内容</td></tr>
            <tr><td><code>dot</code></td><td>自定义节点图标</td></tr>
            <tr><td><code>timestamp</code></td><td>自定义时间戳</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CircleCheckFilled, Clock, Message, Star } from '@element-plus/icons-vue'
import XlyTimeline from '@/components/xly-timeline/index.vue'
import XlyTimelineItem from '@/components/xly-timeline/timeline-item.vue'
import XlyTag from '@/components/xly-tag/index.vue'
</script>

<style scoped lang="scss">
.timeline-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-subsection__title { font-size: 15px; font-weight: 600; color: #4a4a6a; margin: 24px 0 12px; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6; code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; &--noborder { border: none; background: #fafbfd; } }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto; pre { margin: 0; padding: 0; } code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; } }
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto; table { width: 100%; border-collapse: collapse; font-size: 14px; } th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; } th { background: #fafbfd; font-weight: 600; color: #1a1a2e; } td { color: #4a4a6a; } code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }

// 业务场景样式
.custom-timestamp {
  display: flex;
  flex-direction: column;
  gap: 2px;
  .date {
    font-size: 13px;
    color: #4a4a6a;
    font-weight: 500;
  }
  .time {
    font-size: 12px;
    color: #8e8ea0;
  }
}

// 订单追踪
.order-tracker {
  padding: 16px 24px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f2f3f7;
    span {
      font-size: 14px;
      color: #4a4a6a;
    }
  }
}

.tracker-item {
  h4 {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a2e;
  }
  p {
    margin: 0;
    font-size: 13px;
    color: #8e8ea0;
  }
}

// 活动记录
.activity-list {
  padding: 16px 24px;
}

.activity-item {
  display: flex;
  gap: 12px;
  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    &.success {
      background: rgba(103, 194, 58, 0.1);
      color: #67c23a;
    }
    &.primary {
      background: rgba(79, 110, 247, 0.1);
      color: #4f6ef7;
    }
    &.warning {
      background: rgba(230, 162, 60, 0.1);
      color: #e6a23c;
    }
  }
  &__content {
    flex: 1;
    h4 {
      margin: 0 0 2px;
      font-size: 14px;
      font-weight: 500;
      color: #1a1a2e;
    }
    p {
      margin: 0;
      font-size: 13px;
      color: #8e8ea0;
    }
  }
}

// 审批流程
.approval-flow {
  padding: 16px 24px;
}

.approval-item {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a2e;
  }
  &__time {
    font-size: 12px;
    color: #8e8ea0;
  }
  &__desc {
    margin: 0;
    font-size: 13px;
    color: #8e8ea0;
  }
}
</style>
