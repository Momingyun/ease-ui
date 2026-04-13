<template>
  <div class="gantt-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Gantt 甘特图</h1>
      <p class="doc-desc">
        项目管理可视化组件，支持日/周/月视图切换、任务层级、进度展示、依赖关系和缩放功能。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入任务数据，组件自动渲染甘特图。支持任务的开始/结束日期、进度显示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="basicData" title="项目进度" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" title="项目进度" /&gt;

const tasks = [
  { id: 1, name: '项目启动会', startDate: '2026-04-01', endDate: '2026-04-02', progress: 100 },
  { id: 2, name: '需求调研', startDate: '2026-04-03', endDate: '2026-04-07', progress: 100 },
  { id: 3, name: '系统设计', startDate: '2026-04-06', endDate: '2026-04-12', progress: 80 },
  { id: 4, name: '数据库设计', startDate: '2026-04-08', endDate: '2026-04-14', progress: 60 },
  { id: 5, name: '接口开发', startDate: '2026-04-13', endDate: '2026-04-22', progress: 40 },
  { id: 6, name: '前端开发', startDate: '2026-04-13', endDate: '2026-04-25', progress: 30 },
  { id: 7, name: '系统测试', startDate: '2026-04-23', endDate: '2026-04-28', progress: 0 },
  { id: 8, name: '上线部署', startDate: '2026-04-29', endDate: '2026-04-30', progress: 0 }
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 多列表格 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多列表格</h2>
      <p class="doc-section__desc">
        通过 <code>columns</code> 配置左侧任务列表的列，支持自定义列宽、对齐方式和插槽内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt
            :data="multiColData"
            :columns="multiColColumns"
            title="完整信息"
            sidebar-width="auto"
          >
            <template #assignee="{ row }">
              <div class="user-tag">
                <el-avatar
                  :size="20"
                  :style="{
                    background: avatarColors[row.assignee?.charCodeAt(0) % avatarColors.length],
                  }"
                >
                  {{ row.assignee?.charAt(0) }}
                </el-avatar>
                <span>{{ row.assignee }}</span>
              </div>
            </template>
            <template #progress="{ row }"> {{ row.progress }}% </template>
          </XlyGantt>
        </div>
        <div class="doc-code">
          <pre><code v-html="multiColCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- 带里程碑 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带里程碑</h2>
      <p class="doc-section__desc">
        里程碑是一种特殊任务类型，用菱形标记，通常表示项目中的重要节点。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="milestoneData" title="项目里程碑" />
        </div>
        <div class="doc-code">
          <pre><code>const tasks = [
  { id: 1, name: '需求评审', startDate: '2026-04-01', endDate: '2026-04-03' },
  { id: 2, name: '评审通过', isMilestone: true, startDate: '2026-04-03' },
  { id: 3, name: '开发阶段', startDate: '2026-04-04', endDate: '2026-04-20' },
  { id: 4, name: '测试阶段', startDate: '2026-04-21', endDate: '2026-04-26' },
  { id: 5, name: '验收通过', isMilestone: true, startDate: '2026-04-26' },
  { id: 6, name: '正式上线', isMilestone: true, startDate: '2026-04-28' }
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 任务分组 -->
    <section class="doc-section">
      <h2 class="doc-section__title">任务分组</h2>
      <p class="doc-section__desc">支持多层级任务结构，子任务默认展开，可点击收起/展开。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="groupData" title="多层级任务" />
        </div>
        <div class="doc-code">
          <pre><code>const tasks = [
  {
    id: 1,
    name: '前端开发',
    isGroup: true,
    children: [
      { id: '1-1', name: '页面布局', startDate: '2026-04-01', endDate: '2026-04-05', progress: 100 },
      { id: '1-2', name: '组件开发', startDate: '2026-04-06', endDate: '2026-04-15', progress: 60 },
      { id: '1-3', name: '接口联调', startDate: '2026-04-16', endDate: '2026-04-20', progress: 0 }
    ]
  },
  {
    id: 2,
    name: '后端开发',
    isGroup: true,
    children: [
      { id: '2-1', name: '数据库设计', startDate: '2026-04-01', endDate: '2026-04-03', progress: 100 },
      { id: '2-2', name: 'API开发', startDate: '2026-04-04', endDate: '2026-04-18', progress: 40 },
      { id: '2-3', name: '服务部署', startDate: '2026-04-19', endDate: '2026-04-22', progress: 0 }
    ]
  }
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 依赖关系 -->
    <section class="doc-section">
      <h2 class="doc-section__title">依赖关系</h2>
      <p class="doc-section__desc">
        通过 <code>dependencies</code> 属性指定任务依赖，组件自动绘制连接线。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="depData" title="任务依赖" />
        </div>
        <div class="doc-code">
          <pre><code>const tasks = [
  { id: 1, name: '任务A - 需求分析', startDate: '2026-04-01', endDate: '2026-04-05', progress: 100 },
  { id: 2, name: '任务B - 系统设计', startDate: '2026-04-06', endDate: '2026-04-10', dependencies: [1], progress: 80 },
  { id: 3, name: '任务C - 数据库设计', startDate: '2026-04-06', endDate: '2026-04-08', dependencies: [1], progress: 100 },
  { id: 4, name: '任务D - 接口开发', startDate: '2026-04-11', endDate: '2026-04-18', dependencies: [2, 3], progress: 30 },
  { id: 5, name: '任务E - 前端开发', startDate: '2026-04-11', endDate: '2026-04-20', dependencies: [2], progress: 20 },
  { id: 6, name: '任务F - 集成测试', startDate: '2026-04-21', endDate: '2026-04-25', dependencies: [4, 5], progress: 0 }
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 视图切换 -->
    <section class="doc-section">
      <h2 class="doc-section__title">视图切换</h2>
      <p class="doc-section__desc">支持日视图、周视图、月视图三种时间粒度切换。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="basicData" title="月视图" default-view="month" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" default-view="month" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 隐藏视图切换 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏视图切换</h2>
      <p class="doc-section__desc">
        通过 <code>:show-view-switch="false"</code> 隐藏视图切换按钮。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="basicData" title="固定日视图" :show-view-switch="false" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" :show-view-switch="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 隐藏今日线 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏今日线</h2>
      <p class="doc-section__desc">通过 <code>:show-today="false"</code> 隐藏当前日期标记线。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="basicData" title="无今日标记" :show-today="false" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" :show-today="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义宽高 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义宽高</h2>
      <p class="doc-section__desc">
        通过 <code>width</code> 和 <code>height</code> 属性设置组件尺寸，支持任意 CSS 长度单位。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body gantt-size-demo">
          <XlyGantt :data="basicData" title="固定尺寸" width="100%" height="400px" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" width="100%" height="400px" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义样式</h2>
      <p class="doc-section__desc">
        通过 <code>colorClass</code> 自定义任务条颜色，支持
        <code>is-success</code
        >、<code>is-warning</code>、<code>is-danger</code>、<code>is-info</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="colorData" title="多彩任务" />
        </div>
        <div class="doc-code">
          <pre><code>const tasks = [
  { id: 1, name: '已完成任务', startDate: '2026-04-01', endDate: '2026-04-08', progress: 100, colorClass: 'is-success' },
  { id: 2, name: '进行中任务', startDate: '2026-04-05', endDate: '2026-04-18', progress: 60, colorClass: 'is-warning' },
  { id: 3, name: '紧急任务', startDate: '2026-04-10', endDate: '2026-04-22', progress: 30, colorClass: 'is-danger' },
  { id: 4, name: '规划中', startDate: '2026-04-18', endDate: '2026-04-30', progress: 0, colorClass: 'is-info' }
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="doc-section">
      <h2 class="doc-section__title">事件监听</h2>
      <p class="doc-section__desc">点击任务条触发 <code>@task-click</code> 事件。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyGantt :data="basicData" title="点击任务" @task-click="handleTaskClick" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyGantt :data="tasks" @task-click="handleTaskClick" /&gt;

function handleTaskClick(task) {
  console.log('点击任务:', task)
  xly.$msg.success(`点击了: ${task.name}`)
}</code></pre>
        </div>
      </div>
      <div class="doc-result" v-if="clickedTask">
        <span class="doc-result__label">点击结果：</span>
        <code
          >{{ clickedTask.name }} - {{ clickedTask.startDate }} 至 {{ clickedTask.endDate }}</code
        >
      </div>
    </section>

    <!-- 完整示例 -->
    <section class="doc-section">
      <h2 class="doc-section__title">完整示例</h2>
      <p class="doc-section__desc">综合展示分组、里程碑、依赖、进度等多种特性。</p>
      <div class="doc-preview">
        <div class="doc-preview__body gantt-full-demo">
          <XlyGantt
            ref="ganttRef"
            :data="fullData"
            title="软件开发项目"
            sidebar-width="260"
            :row-height="42"
            @task-click="handleTaskClick"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;template&gt;
  &lt;XlyGantt
    ref="ganttRef"
    :data="tasks"
    title="软件开发项目"
    sidebar-width="260"
    :row-height="42"
    @task-click="handleTaskClick"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const ganttRef = ref()

// 滚动到今天
function scrollToToday() {
  ganttRef.value?.scrollToToday()
}

// 滚动到指定日期
function scrollToDate(date) {
  ganttRef.value?.scrollToDate('2026-04-15')
}

// 放大
function zoomIn() {
  ganttRef.value?.zoomIn()
}

// 缩小
function zoomOut() {
  ganttRef.value?.zoomOut()
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-section__subtitle">Props</h3>
      <table class="doc-table">
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
            <td>data</td>
            <td>任务数据列表</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>title</td>
            <td>图表标题</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>taskListTitle</td>
            <td>左侧任务列表标题</td>
            <td>string</td>
            <td>任务名称</td>
          </tr>
          <tr>
            <td>width</td>
            <td>组件宽度</td>
            <td>string</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>height</td>
            <td>组件高度</td>
            <td>string</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>sidebarWidth</td>
            <td>左侧宽度（px）</td>
            <td>number</td>
            <td>280</td>
          </tr>
          <tr>
            <td>rowHeight</td>
            <td>行高（px）</td>
            <td>number</td>
            <td>40</td>
          </tr>
          <tr>
            <td>barHeight</td>
            <td>任务条高度（px）</td>
            <td>number</td>
            <td>24</td>
          </tr>
          <tr>
            <td>dayWidth</td>
            <td>日视图下每天的宽度（px）</td>
            <td>number</td>
            <td>40</td>
          </tr>
          <tr>
            <td>showViewSwitch</td>
            <td>是否显示视图切换</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>zoomable</td>
            <td>是否可缩放</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>defaultView</td>
            <td>默认视图</td>
            <td>day | week | month</td>
            <td>day</td>
          </tr>
          <tr>
            <td>showToday</td>
            <td>是否显示今日线</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>columns</td>
            <td>左侧任务列表列配置</td>
            <td>Column[]</td>
            <td>[{ prop: 'name', label: '任务名称' }]</td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-section__subtitle">Column 列配置</h3>
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
            <td>prop</td>
            <td>字段名（对应任务数据的属性）</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>label</td>
            <td>列标题</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>width</td>
            <td>列宽度（px 或 'auto'）</td>
            <td>number | string</td>
            <td>'auto'</td>
          </tr>
          <tr>
            <td>align</td>
            <td>对齐方式</td>
            <td>'left' | 'center' | 'right'</td>
            <td>'left'</td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-section__subtitle">任务数据结构</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>唯一标识</td>
            <td>string | number</td>
          </tr>
          <tr>
            <td>name</td>
            <td>任务名称</td>
            <td>string</td>
          </tr>
          <tr>
            <td>startDate</td>
            <td>开始日期（YYYY-MM-DD）</td>
            <td>string</td>
          </tr>
          <tr>
            <td>endDate</td>
            <td>结束日期（YYYY-MM-DD）</td>
            <td>string</td>
          </tr>
          <tr>
            <td>progress</td>
            <td>进度（0-100）</td>
            <td>number</td>
          </tr>
          <tr>
            <td>isMilestone</td>
            <td>是否为里程碑</td>
            <td>boolean</td>
          </tr>
          <tr>
            <td>isGroup</td>
            <td>是否为分组</td>
            <td>boolean</td>
          </tr>
          <tr>
            <td>children</td>
            <td>子任务列表</td>
            <td>Task[]</td>
          </tr>
          <tr>
            <td>dependencies</td>
            <td>依赖的任务ID列表</td>
            <td>(string | number)[]</td>
          </tr>
          <tr>
            <td>colorClass</td>
            <td>颜色类名</td>
            <td>
              is-success | is-warning | is-danger | is-info|可直接修改源码，创建自定义颜色类名
            </td>
          </tr>
          <tr>
            <td>assignee</td>
            <td>负责人</td>
            <td>string</td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-section__subtitle">Events</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>task-click</td>
            <td>点击任务条时触发</td>
            <td>(task: Task) =&gt; void</td>
          </tr>
          <tr>
            <td>click</td>
            <td>点击任务时触发（别名）</td>
            <td>(task: Task) =&gt; void</td>
          </tr>
          <tr>
            <td>change</td>
            <td>任务展开/收起时触发</td>
            <td>(tasks: Task[]) =&gt; void</td>
          </tr>
        </tbody>
      </table>

      <h3 class="doc-section__subtitle">Methods</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>scrollToToday</td>
            <td>滚动到今天</td>
            <td>-</td>
          </tr>
          <tr>
            <td>scrollToDate</td>
            <td>滚动到指定日期</td>
            <td>(date: string) 格式：YYYY-MM-DD</td>
          </tr>
          <tr>
            <td>zoomIn</td>
            <td>放大</td>
            <td>-</td>
          </tr>
          <tr>
            <td>zoomOut</td>
            <td>缩小</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElAvatar, ElProgress } from 'element-plus'
import XlyGantt from '@/components/xly-gantt/index.vue'

// 基础数据
const basicData = ref([
  { id: 1, name: '项目启动会', startDate: '2026-04-01', endDate: '2026-04-02', progress: 100 },
  { id: 2, name: '需求调研', startDate: '2026-04-03', endDate: '2026-04-07', progress: 100 },
  { id: 3, name: '系统设计', startDate: '2026-04-06', endDate: '2026-04-12', progress: 80 },
  { id: 4, name: '数据库设计', startDate: '2026-04-08', endDate: '2026-04-14', progress: 60 },
  { id: 5, name: '接口开发', startDate: '2026-04-13', endDate: '2026-04-22', progress: 40 },
  { id: 6, name: '前端开发', startDate: '2026-04-13', endDate: '2026-04-25', progress: 30 },
  { id: 7, name: '系统测试', startDate: '2026-04-23', endDate: '2026-04-28', progress: 0 },
  { id: 8, name: '上线部署', startDate: '2026-04-29', endDate: '2026-04-30', progress: 0 },
])

// 多列表示例数据
const multiColData = ref([
  {
    id: 1,
    name: '项目启动会',
    startDate: '2026-04-01',
    endDate: '2026-04-02',
    progress: 100,
    assignee: '张明',
  },
  {
    id: 2,
    name: '需求调研',
    startDate: '2026-04-03',
    endDate: '2026-04-07',
    progress: 100,
    assignee: '李华',
  },
  {
    id: 3,
    name: '系统设计',
    startDate: '2026-04-06',
    endDate: '2026-04-12',
    progress: 80,
    assignee: '王芳',
  },
  {
    id: 4,
    name: '数据库设计',
    startDate: '2026-04-08',
    endDate: '2026-04-14',
    progress: 60,
    assignee: '赵强',
  },
  {
    id: 5,
    name: '接口开发',
    startDate: '2026-04-13',
    endDate: '2026-04-22',
    progress: 40,
    assignee: '陈伟',
  },
  {
    id: 6,
    name: '前端开发',
    startDate: '2026-04-13',
    endDate: '2026-04-25',
    progress: 30,
    assignee: '刘洋',
  },
  {
    id: 7,
    name: '系统测试',
    startDate: '2026-04-23',
    endDate: '2026-04-28',
    progress: 0,
    assignee: '周敏',
  },
  {
    id: 8,
    name: '上线部署',
    startDate: '2026-04-29',
    endDate: '2026-04-30',
    progress: 0,
    assignee: '吴涛',
  },
])

// 多列表格列配置
const multiColColumns = [
  { prop: 'name', label: '任务名称', width: 'auto' },
  { prop: 'assignee', label: '负责人', width: 100 },
  { prop: 'progress', label: '进度', width: 120, align: 'center' },
]

// 里程碑数据
const milestoneData = ref([
  { id: 1, name: '需求评审', startDate: '2026-04-01', endDate: '2026-04-03' },
  { id: 2, name: '评审通过', isMilestone: true, startDate: '2026-04-03' },
  { id: 3, name: '开发阶段', startDate: '2026-04-04', endDate: '2026-04-20' },
  { id: 4, name: '测试阶段', startDate: '2026-04-21', endDate: '2026-04-26' },
  { id: 5, name: '验收通过', isMilestone: true, startDate: '2026-04-26' },
  { id: 6, name: '正式上线', isMilestone: true, startDate: '2026-04-28' },
])

// 分组数据
const groupData = ref([
  {
    id: 1,
    name: '前端开发',
    isGroup: true,
    children: [
      {
        id: '1-1',
        name: '页面布局',
        startDate: '2026-04-01',
        endDate: '2026-04-05',
        progress: 100,
      },
      { id: '1-2', name: '组件开发', startDate: '2026-04-06', endDate: '2026-04-15', progress: 60 },
      { id: '1-3', name: '接口联调', startDate: '2026-04-16', endDate: '2026-04-20', progress: 0 },
    ],
  },
  {
    id: 2,
    name: '后端开发',
    isGroup: true,
    children: [
      {
        id: '2-1',
        name: '数据库设计',
        startDate: '2026-04-01',
        endDate: '2026-04-03',
        progress: 100,
      },
      { id: '2-2', name: 'API开发', startDate: '2026-04-04', endDate: '2026-04-18', progress: 40 },
      { id: '2-3', name: '服务部署', startDate: '2026-04-19', endDate: '2026-04-22', progress: 0 },
    ],
  },
])

// 依赖数据 - 复杂依赖关系
const depData = ref([
  {
    id: 1,
    name: '需求调研',
    startDate: '2026-04-01',
    endDate: '2026-04-03',
    progress: 100,
  },
  {
    id: 2,
    name: '需求文档',
    startDate: '2026-04-04',
    endDate: '2026-04-07',
    dependencies: [1],
    progress: 100,
  },
  {
    id: 3,
    name: '架构设计',
    startDate: '2026-04-06',
    endDate: '2026-04-10',
    dependencies: [2],
    progress: 80,
  },
  {
    id: 4,
    name: '数据库设计',
    startDate: '2026-04-08',
    endDate: '2026-04-12',
    dependencies: [3],
    progress: 60,
  },
  {
    id: 5,
    name: 'API设计',
    startDate: '2026-04-08',
    endDate: '2026-04-12',
    dependencies: [3],
    progress: 70,
  },
  {
    id: 6,
    name: '原型设计',
    startDate: '2026-04-10',
    endDate: '2026-04-15',
    dependencies: [2],
    progress: 50,
  },
  {
    id: 7,
    name: '后端开发-A',
    startDate: '2026-04-13',
    endDate: '2026-04-20',
    dependencies: [4, 5],
    progress: 30,
  },
  {
    id: 8,
    name: '后端开发-B',
    startDate: '2026-04-13',
    endDate: '2026-04-22',
    dependencies: [4, 5],
    progress: 20,
  },
  {
    id: 9,
    name: '前端开发-A',
    startDate: '2026-04-16',
    endDate: '2026-04-25',
    dependencies: [6],
    progress: 10,
  },
  {
    id: 10,
    name: '前端开发-B',
    startDate: '2026-04-18',
    endDate: '2026-04-28',
    dependencies: [6],
    progress: 5,
  },
  {
    id: 11,
    name: '接口联调',
    startDate: '2026-04-23',
    endDate: '2026-04-26',
    dependencies: [7, 8, 9],
    progress: 0,
  },
  {
    id: 12,
    name: '集成测试',
    startDate: '2026-04-27',
    endDate: '2026-05-02',
    dependencies: [11],
    progress: 0,
  },
  {
    id: 13,
    name: '性能测试',
    startDate: '2026-04-29',
    endDate: '2026-05-05',
    dependencies: [11],
    progress: 0,
  },
  {
    id: 14,
    name: '修复Bug',
    startDate: '2026-05-03',
    endDate: '2026-05-08',
    dependencies: [12, 13],
    progress: 0,
  },
  {
    id: 15,
    name: '验收测试',
    startDate: '2026-05-09',
    endDate: '2026-05-12',
    dependencies: [14],
    progress: 0,
  },
  {
    id: 16,
    name: '上线部署',
    startDate: '2026-05-13',
    endDate: '2026-05-15',
    dependencies: [15],
    progress: 0,
  },
])

// 颜色数据
const colorData = ref([
  {
    id: 1,
    name: '已完成任务',
    startDate: '2026-04-01',
    endDate: '2026-04-08',
    progress: 100,
    colorClass: 'is-success',
  },
  {
    id: 2,
    name: '进行中任务',
    startDate: '2026-04-05',
    endDate: '2026-04-18',
    progress: 60,
    colorClass: 'is-warning',
  },
  {
    id: 3,
    name: '紧急任务',
    startDate: '2026-04-10',
    endDate: '2026-04-22',
    progress: 30,
    colorClass: 'is-danger',
  },
  {
    id: 4,
    name: '规划中',
    startDate: '2026-04-18',
    endDate: '2026-04-30',
    progress: 0,
    colorClass: 'is-info',
  },
])

// 完整数据
const fullData = ref([
  {
    id: 1,
    name: '项目立项',
    startDate: '2026-03-25',
    endDate: '2026-03-28',
    progress: 100,
    colorClass: 'is-success',
  },
  { id: 2, name: '立项评审', isMilestone: true, startDate: '2026-03-28' },
  {
    id: 3,
    name: '需求阶段',
    isGroup: true,
    children: [
      {
        id: '3-1',
        name: '业务调研',
        startDate: '2026-03-29',
        endDate: '2026-04-02',
        progress: 100,
      },
      {
        id: '3-2',
        name: '需求分析',
        startDate: '2026-04-03',
        endDate: '2026-04-07',
        progress: 100,
      },
      { id: '3-3', name: '原型设计', startDate: '2026-04-06', endDate: '2026-04-12', progress: 80 },
    ],
  },
  { id: 4, name: '需求评审', isMilestone: true, startDate: '2026-04-12' },
  {
    id: 5,
    name: '开发阶段',
    isGroup: true,
    children: [
      {
        id: '5-1',
        name: '架构设计',
        startDate: '2026-04-13',
        endDate: '2026-04-16',
        progress: 100,
      },
      {
        id: '5-2',
        name: '数据库设计',
        startDate: '2026-04-14',
        endDate: '2026-04-18',
        progress: 100,
      },
      { id: '5-3', name: '后端开发', startDate: '2026-04-17', endDate: '2026-04-28', progress: 40 },
      { id: '5-4', name: '前端开发', startDate: '2026-04-17', endDate: '2026-04-30', progress: 30 },
    ],
  },
  { id: 6, name: '开发完成', isMilestone: true, startDate: '2026-04-30' },
  {
    id: 7,
    name: '测试阶段',
    isGroup: true,
    children: [
      {
        id: '7-1',
        name: '测试用例编写',
        startDate: '2026-04-25',
        endDate: '2026-04-29',
        progress: 50,
      },
      { id: '7-2', name: '系统测试', startDate: '2026-05-01', endDate: '2026-05-10', progress: 0 },
      { id: '7-3', name: '回归测试', startDate: '2026-05-11', endDate: '2026-05-15', progress: 0 },
    ],
  },
  { id: 8, name: '测试通过', isMilestone: true, startDate: '2026-05-15' },
  { id: 9, name: '正式上线', isMilestone: true, startDate: '2026-05-18' },
])

// 点击结果
const clickedTask = ref(null)

// 点击任务
function handleTaskClick(task) {
  clickedTask.value = task
  xly.$msg.success(`点击了任务: ${task.name}`)
}

// 头像颜色数组
const avatarColors = ['#4f6ef7', '#f7c94f', '#4fe07c', '#f74f6e', '#9f4ff7', '#4fd1f7']

// 多列表格代码示例
const multiColCode = `&lt;XlyGantt :data="tasks" :columns="columns" title="完整信息" sidebar-width="auto"&gt;
  &lt;!-- 自定义负责人列插槽 --&gt;
  &lt;template #assignee="{ row }"&gt;
    &lt;div class="user-tag"&gt;
      &lt;span&gt;{{ row.assignee }}&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;!-- 自定义进度列插槽 --&gt;
  &lt;template #taskProgress="{ row }"&gt;
    &lt;el-progress :percentage="row.progress" /&gt;
  &lt;/template&gt;
&lt;/XlyGantt&gt;

// columns 配置
const columns = [
  { prop: 'name', label: '任务名称', width: 'auto' },
  { prop: 'assignee', label: '负责人', width: 100 },
  { prop: 'taskProgress', label: '进度', width: 120, align: 'center' }
]`
</script>

<style scoped lang="scss">
.gantt-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 36px;

  .doc-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.3px;
    margin-bottom: 8px;
  }

  .doc-desc {
    font-size: 14px;
    color: #8e8ea0;
  }
}

.doc-section {
  margin-bottom: 32px;

  &__title {
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f3f7;
    color: #1a1a2e;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-size: 15px;
    color: #1a1a2e;
    margin: 24px 0 12px;
  }

  &__desc {
    font-size: 14px;
    color: #8e8ea0;
    margin-bottom: 12px;

    code {
      background: #f5f5f7;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;

  &__body {
    padding: 16px;
    min-height: 300px;
  }

  :deep(.xly-gantt) {
    border: none;
  }
}

.doc-code {
  background: #fafbfd;
  border-top: 1px solid #f2f3f7;
  padding: 16px;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      font-size: 13px;
      line-height: 1.6;
      color: #4a4a6a;
    }
  }
}

.doc-result {
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 6px;
  font-size: 13px;

  &__label {
    color: #8e8ea0;
    margin-right: 8px;
  }

  code {
    color: #4f6ef7;
  }
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    background: #fafbfd;
    color: #1a1a2e;
    font-weight: 600;
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #f2f3f7;
  }

  td {
    color: #4a4a6a;
    padding: 12px 16px;
    border-bottom: 1px solid #f2f3f7;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

// 完整示例甘特图容器
.gantt-full-demo {
  height: 500px;
  overflow: hidden;

  :deep(.xly-gantt) {
    height: 100%;
    border: none;
  }
}

// 自定义尺寸示例容器
.gantt-size-demo {
  height: 420px;
  overflow: hidden;

  :deep(.xly-gantt) {
    height: 100%;
    border: none;
  }
}

// 自定义列插槽样式
.user-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4a4a6a;
}
</style>
