<template>
  <div class="table-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Table 表格</h1>
      <p class="doc-desc">
        用于展示多条结构化数据，支持排序、选择、分页、自定义列渲染、条纹、边框等丰富特性。
      </p>
    </div>

    <!-- 基础表格 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>columns</code>（列配置）和 <code>data</code>（行数据）即可渲染一张基础表格。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table :columns="basicColumns" :data="basicData" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="data" /&gt;

// columns 示例
const columns = [
  { prop: 'name',   name: '姓名',   width: 120 },
  { prop: 'age',    name: '年龄',   width: 80,  align: 'center' },
  { prop: 'dept',   name: '部门',   width: 120 },
  { prop: 'status', name: '状态' },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 条纹 + 边框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">条纹与边框</h2>
      <p class="doc-section__desc">
        <code>stripe</code> 开启斑马纹，<code>border</code> 开启列分割线。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 20px"
        >
          <div>
            <p class="size-label">stripe</p>
            <xly-table :columns="basicColumns" :data="basicData" stripe />
          </div>
          <div>
            <p class="size-label">border</p>
            <xly-table :columns="basicColumns" :data="basicData" border />
          </div>
          <div>
            <p class="size-label">stripe + border</p>
            <xly-table :columns="basicColumns" :data="basicData" stripe border />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="data" stripe /&gt;
&lt;xly-table :columns="columns" :data="data" border /&gt;
&lt;xly-table :columns="columns" :data="data" stripe border /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带序号 + 可选择 -->
    <section class="doc-section">
      <h2 class="doc-section__title">序号列与选择列</h2>
      <p class="doc-section__desc">
        <code>show-index</code> 显示行序号，<code>selectable</code> 开启复选框选择，选中行通过
        <code>selection-change</code> 事件获取。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <xly-table
            :columns="basicColumns"
            :data="basicData"
            show-index
            selectable
            stripe
            @selection-change="handleSelectionChange"
          />
          <div v-if="selectedRows.length" class="selection-hint">
            已选 {{ selectedRows.length }} 行：{{ selectedRows.map((r) => r.name).join('、') }}
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  show-index
  selectable
  @selection-change="handleSelectionChange"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 单选模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">单选模式</h2>
      <p class="doc-section__desc">
        设置
        <code>selection-mode="single"</code>
        启用单选模式，此时只能选择一行数据，再次选择会替换当前选中行。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <xly-table
            :columns="basicColumns"
            :data="basicData"
            show-index
            selectable
            selection-mode="single"
            stripe
            @selection-change="handleSingleSelection"
          />
          <div v-if="singleSelectedRow" class="selection-hint">
            已选：{{ singleSelectedRow.name }}，部门：{{ singleSelectedRow.dept }}
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  show-index
  selectable
  selection-mode="single"
  @selection-change="handleSelectionChange"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 排序 -->
    <section class="doc-section">
      <h2 class="doc-section__title">列排序</h2>
      <p class="doc-section__desc">
        在列配置中添加 <code>sortable: true</code>，点击表头可升序/降序/取消排序。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            :columns="sortableColumns"
            :data="salaryData"
            stripe
            @sort-change="handleSortChange"
          />
          <div v-if="sortInfo" class="sort-hint">
            排序字段：<strong>{{ sortInfo.key }}</strong
            >，顺序：<strong>{{ sortInfo.order }}</strong>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>const columns = [
  { prop: 'name',   name: '姓名' },
  { prop: 'salary', name: '薪资', sortable: true },
  { prop: 'score',  name: '评分', sortable: true },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义列渲染 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义列渲染</h2>
      <p class="doc-section__desc">
        通过具名插槽 <code>#col-{key}</code> 自定义单元格内容，插槽参数包含
        <code>row</code>、<code>value</code>、<code>index</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table :columns="customColumns" :data="statusData" stripe>
            <!-- 状态列自定义 -->
            <template #col-status="{ value }">
              <xly-tag
                :type="statusTypeMap[value as keyof typeof statusTypeMap] ?? 'info'"
                size="small"
                >{{ value }}</xly-tag
              >
            </template>
            <!-- 进度列自定义 -->
            <template #col-progress="{ value }">
              <div class="progress-cell">
                <div class="progress-bar">
                  <div
                    class="progress-bar__fill"
                    :style="{
                      width: `${value}%`,
                      backgroundColor:
                        value >= 80 ? '#34c759' : value >= 50 ? '#f5a623' : '#ff3b30',
                    }"
                  />
                </div>
                <span class="progress-value">{{ value }}%</span>
              </div>
            </template>
            <!-- 操作列 -->
            <template #action="{ row }">
              <div class="action-btns">
                <button class="action-btn action-btn--edit" @click.stop="handleEdit(row)">
                  编辑
                </button>
                <button class="action-btn action-btn--delete" @click.stop="handleDelete(row)">
                  删除
                </button>
              </div>
            </template>
          </xly-table>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="data"&gt;
  &lt;!-- 自定义单元格 --&gt;
  &lt;template #col-status="{ value }"&gt;
    &lt;xly-tag :type="statusMap[value]"&gt;{{ value }}&lt;/xly-tag&gt;
  &lt;/template&gt;

  &lt;!-- 操作列 --&gt;
  &lt;template #action="{ row }"&gt;
    &lt;button @click="handleEdit(row)"&gt;编辑&lt;/button&gt;
    &lt;button @click="handleDelete(row)"&gt;删除&lt;/button&gt;
  &lt;/template&gt;
&lt;/xly-table&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 前缀和后缀 -->
    <section class="doc-section">
      <h2 class="doc-section__title">前缀和后缀</h2>
      <p class="doc-section__desc">
        通过 <code>prefix</code> 和
        <code>suffix</code> 属性为列内容添加前缀和后缀，方便显示单位、货币符号等。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table :columns="prefixSuffixColumns" :data="salaryData" stripe />
        </div>
        <div class="doc-code">
          <pre><code>const columns = [
  { prop: 'name',   name: '姓名' },
  { prop: 'salary', name: '薪资', prefix: '¥', suffix: ' 元' },
  { prop: 'score',  name: '评分', suffix: ' 分' },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 前端分页 -->
    <section class="doc-section">
      <h2 class="doc-section__title">分页</h2>
      <p class="doc-section__desc">
        默认开启分页（<code>pagination</code>）、显示序号列（<code>show-index</code>）和页码输入框（<code>show-page-input</code>）。传入
        <code>:total</code> 和监听 <code>page-change</code> 可对接服务端分页。支持
        <code>pagination-position</code> 控制位置，<code>show-page-size</code> 显示每页条数选择器。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 20px"
        >
          <div>
            <p class="size-label">右侧分页（默认）</p>
            <xly-table
              :columns="paginationColumns"
              :data="bigData"
              stripe
              :page-size="10"
              @page-change="handlePageChange"
              @page-size-change="handlePageSizeChange"
            />
          </div>
          <div>
            <p class="size-label">居中分页</p>
            <xly-table
              :columns="paginationColumns"
              :data="bigData"
              stripe
              pagination-position="center"
              :page-size="10"
              @page-change="handlePageChange"
              @page-size-change="handlePageSizeChange"
            />
          </div>
          <div>
            <p class="size-label">左侧分页 + 隐藏每页条数选择</p>
            <xly-table
              :columns="paginationColumns"
              :data="bigData"
              stripe
              pagination-position="left"
              :page-size="10"
              :show-page-size="false"
              @page-change="handlePageChange"
            />
          </div>
          <div v-if="currentPageInfo" class="pagination-hint">当前页：{{ currentPageInfo }}</div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  pagination-position="right"  // left | center | right，默认 right
  :show-page-size="false"      // 隐藏每页条数选择器，默认 true
  :show-page-input="false"     // 隐藏页码输入框，默认 true
  :show-index="false"          // 隐藏序号列，默认 true
  :page-size="10"              // 每页条数，默认 10
  :page="1"                    // 当前页码（服务端分页时使用）
  :total="100"                 // 总条数（服务端分页时使用）
  @page-change="handlePageChange"
  @page-size-change="handlePageSizeChange"
/&gt;

// 前端分页示例
function handlePageChange(page: number) {
  console.log('当前页码：', page)
}

function handlePageSizeChange(pageSize: number) {
  console.log('每页条数变化：', pageSize)
}

// 服务端分页示例
const serverPage = ref(1)
const serverPageSize = ref(10)
const serverTotal = ref(0)
const serverPageData = ref([])

async function handleServerPageChange(page: number) {
  serverPage.value = page
  const res = await fetchData({ page, pageSize: serverPageSize.value })
  serverPageData.value = res.data
  serverTotal.value = res.total
}

async function handleServerPageSizeChange(pageSize: number) {
  serverPageSize.value = pageSize
  serverPage.value = 1
  const res = await fetchData({ page: 1, pageSize })
  serverPageData.value = res.data
  serverTotal.value = res.total
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 固定高度滚动 -->
    <section class="doc-section">
      <h2 class="doc-section__title">固定高度 / 滚动</h2>
      <p class="doc-section__desc">
        通过 <code>max-height</code> 属性设置表格最大高度，超出内容垂直滚动，表头固定。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            :columns="basicColumns"
            :data="bigData.slice(0, 15)"
            :max-height="280"
            stripe
            showSummary
            summary-label="平均年龄"
            show-index
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  :max-height="280"
  showSummary
  summary-label="平均年龄"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">加载状态</h2>
      <p class="doc-section__desc">
        通过 <code>loading</code> 属性控制加载状态，表格会显示 loading 动画并禁用交互。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <div style="display: flex; gap: 10px">
            <button class="demo-btn" @click="mockLoading">模拟加载（2s）</button>
          </div>
          <xly-table :columns="basicColumns" :data="loadingData" :loading="isLoading" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  :loading="isLoading"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 空状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">空状态</h2>
      <p class="doc-section__desc">
        数据为空时自动显示空状态，可通过 <code>empty-text</code> 自定义文字，或用
        <code>#empty</code> 插槽完全自定义内容。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 20px"
        >
          <div>
            <p class="size-label">默认空状态</p>
            <xly-table :columns="basicColumns" :data="[]" />
          </div>
          <div>
            <p class="size-label">自定义文字</p>
            <xly-table
              :columns="basicColumns"
              :data="[]"
              empty-text="暂无查询结果，请尝试其他条件"
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="[]" empty-text="暂无数据" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 紧凑模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">紧凑模式</h2>
      <p class="doc-section__desc">
        添加 <code>compact</code> 属性，表格行高缩小，适合信息密集的管理后台场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table :columns="basicColumns" :data="basicData" compact stripe border />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="data" compact /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带标题工具栏 -->
    <section class="doc-section">
      <h2 class="doc-section__title">标题与工具栏</h2>
      <p class="doc-section__desc">
        通过 <code>title</code> 属性设置表格标题，通过
        <code>#toolbar</code> 插槽在右侧放置操作按钮。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table title="用户列表" :columns="basicColumns" :data="basicData" stripe>
            <template #toolbar>
              <button class="demo-btn demo-btn--primary">新增用户</button>
              <button class="demo-btn">导出</button>
            </template>
          </xly-table>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table title="用户列表" :columns="columns" :data="data"&gt;
  &lt;template #toolbar&gt;
    &lt;button&gt;新增&lt;/button&gt;
    &lt;button&gt;导出&lt;/button&gt;
  &lt;/template&gt;
&lt;/xly-table&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 工具栏按钮 -->
    <section class="doc-section">
      <h2 class="doc-section__title">工具栏按钮</h2>
      <p class="doc-section__desc">
        通过 <code>show-refresh</code> 显示刷新按钮，<code>show-export</code> 显示导出按钮，
        <code>show-column-settings</code>
        显示列设置按钮。按钮采用图标形式，通过对应事件处理业务逻辑。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            title="员工信息表"
            :columns="basicColumns"
            :data="basicData"
            stripe
            show-refresh
            show-export
            show-column-settings
            @refresh="handleRefresh"
            @export="handleExport"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  title="员工信息表"
  :columns="columns"
  :data="data"
  show-refresh
  show-export
  show-column-settings
  @refresh="handleRefresh"
  @export="handleExport"
/&gt;

function handleRefresh() {
  console.log('点击了刷新按钮')
  // 重新加载数据
}

function handleExport() {
  console.log('点击了导出按钮')
  // 导出数据逻辑
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 列设置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">列设置</h2>
      <p class="doc-section__desc">
        通过
        <code>show-column-settings</code>
        属性显示列设置按钮，可以控制列的显示/隐藏和拖动排序。在列配置中通过
        <code>drag: false</code> 禁止某列拖动排序。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            title="员工信息表"
            :columns="columnSettingsColumns"
            :data="basicData"
            stripe
            show-column-settings
            @column-order-change="handleColumnOrderChange"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  title="员工信息表"
  :columns="columns"
  :data="data"
  show-column-settings
  @column-order-change="handleColumnOrderChange"
/&gt;

// 列配置示例
const columns = [
  { prop: 'name',  name: '姓名',  width: 100 },
  { prop: 'age',   name: '年龄',  width: 80 },
  { prop: 'dept',  name: '部门',  width: 120 },
  { prop: 'email', name: '邮箱',  width: 180 },
  // 设置 drag: false 可以禁止该列拖动排序
  { prop: 'id',    name: 'ID',    width: 80, drag: false },
]

function handleColumnOrderChange(newColumns: TableColumn[]) {
  console.log('列顺序已更新', newColumns)
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 展开行 -->
    <section class="doc-section">
      <h2 class="doc-section__title">展开行</h2>
      <p class="doc-section__desc">
        通过 <code>expandable</code> 开启展开行功能，使用 <code>#expand</code> 插槽自定义展开内容。
        支持 <code>expand-trigger</code> 切换触发方式（默认点击图标展开），
        <code>default-expanded-rows</code> 设置默认展开的行索引。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <xly-table
            ref="expandTableRef"
            :columns="expandColumns"
            :data="expandData"
            stripe
            border
            :expandable="true"
            :default-expanded-rows="[0]"
            @expand-change="handleExpandChange"
          >
            <template #expand="{ row }">
              <div class="expand-children">
                <div v-if="row.children?.length" class="children-header">
                  <span class="children-title">子项目 ({{ row.children.length }})</span>
                </div>
                <div v-if="row.children?.length" class="children-list">
                  <div v-for="child in row.children" :key="child.id" class="children-item">
                    <span class="child-name">{{ child.name }}</span>
                    <span class="child-manager">{{ child.manager }}</span>
                    <span class="child-progress">{{ child.progress }}</span>
                  </div>
                </div>
                <div v-else class="children-empty">暂无子项目</div>
              </div>
            </template>
          </xly-table>
          <div class="expand-toolbar">
            <button class="demo-btn" @click="expandAllRows">展开全部</button>
            <button class="demo-btn" @click="collapseAllRows">收起全部</button>
          </div>
          <div v-if="expandInfo" class="expand-hint">
            {{ expandInfo }}
          </div>
        </div>
        <div class="doc-code">
          <pre><code v-html="expandExampleCode" /></pre>
        </div>
      </div>
    </section>

    <!-- 树形数据 -->
    <section class="doc-section">
      <h2 class="doc-section__title">树形数据</h2>
      <p class="doc-section__desc">
        设置 <code>tree</code> 开启树形数据模式，数据中包含 <code>children</code> 字段（可通过
        <code>tree-children-key</code> 自定义）， 自动渲染为树形结构。支持
        <code>default-expand-all</code> 默认展开全部，
        <code>default-expanded-keys</code> 指定默认展开的节点。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <xly-table
            ref="treeTableRef"
            :columns="treeColumns"
            :data="treeData"
            stripe
            border
            :tree="true"
            :tree-indent-size="20"
            :default-expand-all="true"
            @tree-expand="handleTreeExpand"
          />
          <div v-if="treeExpandInfo" class="tree-hint">
            {{ treeExpandInfo }}
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="treeData"
  stripe
  border
  <span class="code-attr">:tree</span>=<span class="code-string">"true"</span>
  <span class="code-attr">:tree-indent-size</span>=<span class="code-string">"20"</span>
  <span class="code-attr">:default-expand-all</span>=<span class="code-string">"true"</span>
  @tree-expand="handleTreeExpand"
/&gt;

// 树形数据结构
const treeData = [
  {
    name: '前端开发组',
    manager: '张三',
    children: [
      { name: '用户管理模块', manager: '李四' },
      { name: '订单管理模块', manager: '王五' },
    ]
  },
  {
    name: '后端开发组',
    manager: '孙七',
    children: [
      { name: 'API 接口开发', manager: '周八' },
    ]
  },
]

function handleTreeExpand(row, expanded) {
  console.log(row.name, expanded ? '展开了' : '收起了')
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 树形数据 + 懒加载 -->
    <section class="doc-section">
      <h2 class="doc-section__title">树形数据 + 懒加载</h2>
      <p class="doc-section__desc">
        设置 <code>lazy</code> 和 <code>:load</code> 懒加载方法，点击节点时动态加载子数据。
        加载过程中显示 loading 动画。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; gap: 12px"
        >
          <xly-table
            ref="lazyTableRef"
            :columns="lazyColumns"
            :data="lazyData"
            stripe
            border
            show-index
            :tree="true"
            :lazy="true"
            :load="handleLazyLoad"
            :tree-children-key="'children'"
            :row-key="'id'"
            @tree-expand="handleLazyTreeExpand"
          />
          <div v-if="lazyExpandInfo" class="tree-hint">
            {{ lazyExpandInfo }}
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  stripe
  border
  <span class="code-attr">:tree</span>=<span class="code-string">"true"</span>
  <span class="code-attr">:lazy</span>=<span class="code-string">"true"</span>
  <span class="code-attr">:load</span>=<span class="code-string">"handleLazyLoad"</span>
  @tree-expand="handleTreeExpand"
/&gt;

// 懒加载方法
async function handleLazyLoad(row) {
  // 模拟 API 请求延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  // 返回子节点数据
  return [
    { name: `${row.name}-子部门1`, manager: '成员A' },
    { name: `${row.name}-子部门2`, manager: '成员B' },
  ]
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 列固定 -->
    <section class="doc-section">
      <h2 class="doc-section__title">列固定</h2>
      <p class="doc-section__desc">
        通过 <code>fixed: 'left'</code> 或
        <code>fixed: 'right'</code> 固定列到左侧或右侧，横向滚动时保持可见。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            :columns="fixedColumns"
            :data="enhancedBigData.slice(0, 8)"
            stripe
            border
            :page-size="8"
          />
          <p style="font-size: 13px; color: #8e8ea0; margin-top: 12px">
            💡 提示：横向滚动表格查看固定列效果
          </p>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table :columns="columns" :data="data" /&gt;

// 列配置示例
const columns = [
  { prop: 'id',      name: 'ID',      width: 80,  fixed: 'left' },
  { prop: 'name',    name: '姓名',    width: 100, fixed: 'left' },
  { prop: 'age',     name: '年龄',    width: 80 },
  { prop: 'dept',    name: '部门',    width: 120 },
  { prop: 'email',   name: '邮箱',    width: 180 },
  { prop: 'phone',   name: '电话',    width: 140 },
  { prop: 'address', name: '地址',    width: 200 },
  { prop: 'company', name: '公司',    width: 150 },
  { prop: 'salary',  name: '薪资',    width: 120, align: 'right' },
  { prop: 'status',  name: '状态',    width: 100, fixed: 'right' },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 多列横向滚动 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多列横向滚动</h2>
      <p class="doc-section__desc">
        当列数较多时，表格会自动显示横向滚动条。配合列固定功能，可以让重要列始终可见。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: stretch; max-width: 100%"
        >
          <div style="width: 100%; overflow-x: auto">
            <xly-table
              :columns="scrollColumns"
              :data="enhancedBigData.slice(0, 10)"
              stripe
              border
              show-summary
              summary-label="合计"
              show-column-settings
              :page-size="10"
            />
          </div>
          <p style="font-size: 13px; color: #8e8ea0; margin-top: 12px">
            💡 提示：点击右上角"列设置"按钮可控制列的显示/隐藏，横向滚动查看更多列
          </p>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  stripe
  border
  show-summary
  summary-label="合计"
  show-column-settings
/&gt;

// 多列配置示例
const columns = [
  { prop: 'id',         name: 'ID',         width: 80,  fixed: 'left' },
  { prop: 'name',       name: '姓名',       width: 100, fixed: 'left' },
  { prop: 'age',        name: '年龄',       width: 80 },
  { prop: 'gender',     name: '性别',       width: 80 },
  { prop: 'dept',       name: '部门',       width: 120 },
  { prop: 'position',   name: '职位',       width: 120 },
  { prop: 'email',      name: '邮箱',       width: 200, ellipsis: true },
  { prop: 'phone',      name: '电话',       width: 140 },
  { prop: 'address',    name: '地址',       width: 200, ellipsis: true },
  { prop: 'city',       name: '城市',       width: 100 },
  { prop: 'province',   name: '省份',       width: 100 },
  { prop: 'zipcode',    name: '邮编',       width: 100 },
  { prop: 'joinDate',   name: '入职日期',   width: 120 },
  { prop: 'leaveDate',  name: '离职日期',   width: 120 },
  { prop: 'salary',     name: '薪资',       width: 120, align: 'right',summary: 'sum', },
  { prop: 'bonus',      name: '奖金',       width: 100, align: 'right',summary: 'sum', },
  { prop: 'performance', name: '绩效评分',  width: 100, fixed: 'right'，align: 'center',summary: 'sum' },
  { prop: 'status',     name: '状态',       width: 100, fixed: 'right' },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- 合计行 -->
    <section class="doc-section">
      <h2 class="doc-section__title">合计行</h2>
      <p class="doc-section__desc">
        通过 <code>show-summary</code> 开启合计行。在列配置中用 <code>summary: 'sum'</code> 或
        <code>summary: 'avg'</code> 指定统计方式，也可通过
        <code>summaryText</code> 自定义该列的显示文字。 合计行固定在表格底部，支持与列固定功能联动。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: stretch">
          <xly-table
            :columns="summaryColumns"
            :data="summaryData"
            show-summary
            summary-label="合计"
            border
            :pagination="false"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  show-summary
  summary-label="合计"
/&gt;

const columns = [
  { prop: 'name',    name: '姓名',   width: 120 },
  { prop: 'dept',    name: '部门',   width: 120 },
  { prop: 'salary',  name: '薪资',   width: 120, align: 'right', summary: 'sum' },
  { prop: 'bonus',   name: '奖金',   width: 120, align: 'right', summary: 'sum' },
  { prop: 'score',   name: '绩效评分', width: 120, align: 'right', summary: 'avg' },
  { prop: 'status',  name: '状态',   width: 100,
    summaryText: '—'    // 自定义显示文字，不参与计算
  },
]</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Table Props</h3>
      <div class="doc-table">
        <table>
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
              <td><code>data</code></td>
              <td>表格数据</td>
              <td><code>object[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>columns</code></td>
              <td>列配置数组</td>
              <td><code>TableColumn[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>表格标题</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>是否加载中</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>empty-text</code></td>
              <td>空数据提示文字</td>
              <td><code>string</code></td>
              <td><code>'暂无数据'</code></td>
            </tr>
            <tr>
              <td><code>stripe</code></td>
              <td>是否显示斑马纹</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>border</code></td>
              <td>是否显示列分隔线</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>compact</code></td>
              <td>紧凑模式</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>selectable</code></td>
              <td>是否显示复选框列</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>selection-mode</code></td>
              <td>选择模式：<code>multiple</code> 多选，<code>single</code> 单选</td>
              <td><code>string</code></td>
              <td><code>'multiple'</code></td>
            </tr>
            <tr>
              <td><code>show-index</code></td>
              <td>是否显示行序号列</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>max-height</code></td>
              <td>表格最大高度，超出滚动</td>
              <td><code>number | string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>row-key</code></td>
              <td>行唯一标识字段名</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>row-clickable</code></td>
              <td>行是否可点击</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>pagination</code></td>
              <td>是否显示分页</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td>总数据量（服务端分页时传入）</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>page</code></td>
              <td>当前页码</td>
              <td><code>number</code></td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><code>page-size</code></td>
              <td>每页条数</td>
              <td><code>number</code></td>
              <td><code>10</code></td>
            </tr>
            <tr>
              <td><code>show-page-size</code></td>
              <td>是否显示每页条数选择器</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-page-input</code></td>
              <td>是否显示页码输入框</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>pagination-position</code></td>
              <td>分页位置</td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'right'</code></td>
            </tr>
            <tr>
              <td><code>show-column-settings</code></td>
              <td>是否显示列设置按钮</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>column-draggable</code></td>
              <td>是否允许列拖动排序</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-refresh</code></td>
              <td>是否显示刷新按钮</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>show-export</code></td>
              <td>是否显示导出按钮</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>expandable</code></td>
              <td>是否支持展开行</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>expand-trigger</code></td>
              <td>展开触发方式：<code>icon</code> 点击图标，<code>click</code> 点击任意位置</td>
              <td><code>'icon' | 'click'</code></td>
              <td><code>'icon'</code></td>
            </tr>
            <tr>
              <td><code>default-expanded-rows</code></td>
              <td>默认展开的行索引数组</td>
              <td><code>number[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>show-summary</code></td>
              <td>是否显示合计行</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>summary-label</code></td>
              <td>合计行首列显示的文字</td>
              <td><code>string</code></td>
              <td><code>'合计'</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TableColumn 配置</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>字段</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>prop</code></td>
              <td>列标识，对应数据字段名（支持 a.b.c 嵌套）</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>列标题</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>列宽度</td>
              <td><code>number | string</code></td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td>最小列宽</td>
              <td><code>number | string</code></td>
            </tr>
            <tr>
              <td><code>align</code></td>
              <td>文字对齐方式</td>
              <td><code>'left' | 'center' | 'right'</code></td>
            </tr>
            <tr>
              <td><code>sortable</code></td>
              <td>是否可排序</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>ellipsis</code></td>
              <td>内容超出是否省略</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>formatter</code></td>
              <td>自定义格式化函数</td>
              <td><code>(row, value) => string</code></td>
            </tr>
            <tr>
              <td><code>prefix</code></td>
              <td>列内容前缀</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>suffix</code></td>
              <td>列内容后缀</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>visible</code></td>
              <td>是否显示该列</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>fixed</code></td>
              <td>列固定位置</td>
              <td><code>'left' | 'right' | undefined</code></td>
            </tr>
            <tr>
              <td><code>drag</code></td>
              <td>是否可拖动排序</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>summary</code></td>
              <td>
                合计方式：<code>'sum'</code> 求和 / <code>'avg'</code> 平均值，不设置则不参与合计
              </td>
              <td><code>'sum' | 'avg' | false</code></td>
            </tr>
            <tr>
              <td><code>summaryText</code></td>
              <td>合计行该列显示的自定义文字（优先于 summary 计算值）</td>
              <td><code>string</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Table Events</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>selection-change</code></td>
              <td>选中行变化时触发</td>
              <td><code>(rows: object[])</code></td>
            </tr>
            <tr>
              <td><code>row-click</code></td>
              <td>点击行时触发（需设置 row-clickable）</td>
              <td><code>(row, index)</code></td>
            </tr>
            <tr>
              <td><code>sort-change</code></td>
              <td>排序状态变化时触发</td>
              <td><code>(key, order: 'asc' | 'desc' | null)</code></td>
            </tr>
            <tr>
              <td><code>page-change</code></td>
              <td>页码变化时触发</td>
              <td><code>(page: number)</code></td>
            </tr>
            <tr>
              <td><code>page-size-change</code></td>
              <td>每页条数变化时触发</td>
              <td><code>(pageSize: number)</code></td>
            </tr>
            <tr>
              <td><code>column-order-change</code></td>
              <td>列顺序变化时触发</td>
              <td><code>(columns: TableColumn[])</code></td>
            </tr>
            <tr>
              <td><code>refresh</code></td>
              <td>点击刷新按钮时触发</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>export</code></td>
              <td>点击导出按钮时触发</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>expand-change</code></td>
              <td>展开状态变化时触发</td>
              <td><code>(row, expanded: boolean)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Table Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
              <th>插槽参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>#col-{key}</code></td>
              <td>自定义指定列的单元格渲染</td>
              <td><code>{ row, value, index, col }</code></td>
            </tr>
            <tr>
              <td><code>#action</code></td>
              <td>操作列内容（自动生成"操作"列头）</td>
              <td><code>{ row, index }</code></td>
            </tr>
            <tr>
              <td><code>#toolbar</code></td>
              <td>工具栏右侧区域</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>#toolbar-left</code></td>
              <td>工具栏左侧区域</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>#empty</code></td>
              <td>自定义空状态内容</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>#expand</code></td>
              <td>展开行内容</td>
              <td><code>{ row, index }</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Table Methods</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>clearSelection()</code></td>
              <td>清空所有选中行</td>
            </tr>
            <tr>
              <td><code>getSelection()</code></td>
              <td>获取当前所有选中行数据</td>
            </tr>
            <tr>
              <td><code>expandAll()</code></td>
              <td>展开所有行</td>
            </tr>
            <tr>
              <td><code>collapseAll()</code></td>
              <td>收起所有行</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyTable from '@/components/xly-table/index.vue'
import XlyTag from '@/components/xly-tag/index.vue'
import type { TableColumn } from '@/components/xly-table/index.vue'

/* -------------------- 展开行 -------------------- */
const expandTableRef = ref<InstanceType<typeof XlyTable>>()
const expandColumns: TableColumn[] = [
  { prop: 'name', name: '项目名称', width: 180 },
  { prop: 'manager', name: '负责人', width: 100 },
  { prop: 'progress', name: '进度', width: 120 },
]

// 树形父子结构数据
const expandData = [
  {
    id: 'p1',
    name: '前端开发组',
    manager: '张三',
    progress: '65%',
    children: [
      { id: 'p1-1', name: '用户管理模块', manager: '李四', progress: '80%' },
      { id: 'p1-2', name: '订单管理模块', manager: '王五', progress: '50%' },
      { id: 'p1-3', name: '数据看板模块', manager: '赵六', progress: '完成' },
    ],
  },
  {
    id: 'p2',
    name: '后端开发组',
    manager: '孙七',
    progress: '40%',
    children: [
      { id: 'p2-1', name: 'API 接口开发', manager: '周八', progress: '60%' },
      { id: 'p2-2', name: '数据库优化', manager: '吴九', progress: '20%' },
    ],
  },
  {
    id: 'p3',
    name: '测试组',
    manager: '郑十',
    progress: '完成',
    children: [],
  },
]

const expandInfo = ref<string>('')
function handleExpandChange(row: Record<string, any>, expanded: boolean) {
  const hasChildren = row.children && row.children.length > 0
  if (hasChildren) {
    expandInfo.value = `${row.name} ${expanded ? '展开了' : '收起了'}`
  }
}

function expandAllRows() {
  expandTableRef.value?.expandAll()
}

function collapseAllRows() {
  expandTableRef.value?.collapseAll()
}

// 展开行示例代码
const expandExampleCode = `<span class="code-tag">&lt;xly-table</span>
  <span class="code-attr">ref</span>=<span class="code-string">"tableRef"</span>
  <span class="code-attr">:columns</span>=<span class="code-string">"columns"</span>
  <span class="code-attr">:data</span>=<span class="code-string">"data"</span>
  <span class="code-attr">stripe</span>
  <span class="code-attr">border</span>
  <span class="code-attr">:expandable</span>=<span class="code-string">"true"</span>
  <span class="code-attr">:default-expanded-rows</span>=<span class="code-string">"[0]"</span>
<span class="code-tag">&gt;</span>
  <span class="code-tag">&lt;template #expand="{ row }"&gt;</span>
    <span class="code-tag">&lt;div&gt;</span>
      <span class="code-keyword">if</span> (row.children?.length) {
        <span class="code-comment">// 显示子项目列表</span>
        row.children.forEach(child => ...)
      } <span class="code-keyword">else</span> {
        暂无子项目
      }
    <span class="code-tag">&lt;/div&gt;</span>
  <span class="code-tag">&lt;/template&gt;</span>
<span class="code-tag">&lt;/xly-table&gt;</span>

<span class="code-comment">// 数据结构（树形父子）</span>
<span class="code-keyword">const</span> data = [
  {
    id: <span class="code-string">'p1'</span>,
    name: <span class="code-string">'项目组'</span>,
    children: [
      { id: <span class="code-string">'p1-1'</span>, name: <span class="code-string">'子项目1'</span> },
      { id: <span class="code-string">'p1-2'</span>, name: <span class="code-string">'子项目2'</span> },
    ]
  }
]`

/* -------------------- 基础列 -------------------- */
const basicColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'age', name: '年龄', width: 80, align: 'center',summary: 'avg' },
  { prop: 'dept', name: '部门', width: 140 },
  { prop: 'email', name: '邮箱', minWidth: 180, ellipsis: true },
  { prop: 'city', name: '城市', width: 100 },
]

const basicData = [
  { name: '张三', age: 28, dept: '技术部', email: 'zhangsan@example.com', city: '北京' },
  { name: '李四', age: 32, dept: '产品部', email: 'lisi@example.com', city: '上海' },
  { name: '王五', age: 24, dept: '设计部', email: 'wangwu@example.com', city: '深圳' },
  { name: '赵六', age: 35, dept: '运营部', email: 'zhaoliu@example.com', city: '杭州' },
  { name: '钱七', age: 27, dept: '技术部', email: 'qianqi@example.com', city: '成都' },
]

/* -------------------- 选择 -------------------- */
const selectedRows = ref<Record<string, any>[]>([])
const singleSelectedRow = ref<Record<string, any> | null>(null)
function handleSelectionChange(rows: Record<string, any>[]) {
  selectedRows.value = rows
}
function handleSingleSelection(rows: Record<string, any>[]) {
  singleSelectedRow.value = rows[0] || null
}

/* -------------------- 树形数据 -------------------- */
const treeTableRef = ref<InstanceType<typeof XlyTable>>()
const treeColumns: TableColumn[] = [
  { prop: 'name', name: '部门/模块名称', minWidth: 180 },
  { prop: 'manager', name: '负责人', width: 100, align: 'center' },
  { prop: 'memberCount', name: '成员数', width: 80, align: 'center' },
  { prop: 'status', name: '状态', width: 100, align: 'center' },
]

const treeData = [
  {
    id: 1,
    name: '技术研发部',
    manager: '张明',
    memberCount: 45,
    status: '正常',
    children: [
      {
        id: 11,
        name: '前端开发组',
        manager: '李华',
        memberCount: 15,
        status: '正常',
        children: [
          { id: 111, name: '用户界面组', manager: '王芳', memberCount: 6, status: '正常' },
          { id: 112, name: '数据可视化组', manager: '赵强', memberCount: 5, status: '正常' },
          { id: 113, name: '移动端组', manager: '孙丽', memberCount: 4, status: '正常' },
        ],
      },
      {
        id: 12,
        name: '后端开发组',
        manager: '刘伟',
        memberCount: 18,
        status: '正常',
        children: [
          { id: 121, name: '核心服务组', manager: '陈刚', memberCount: 8, status: '正常' },
          { id: 122, name: '基础设施组', manager: '周杰', memberCount: 6, status: '正常' },
          { id: 123, name: '数据库组', manager: '吴敏', memberCount: 4, status: '维护中' },
        ],
      },
      {
        id: 13,
        name: '测试组',
        manager: '杨洋',
        memberCount: 12,
        status: '正常',
        children: [
          { id: 131, name: '功能测试组', manager: '胡静', memberCount: 7, status: '正常' },
          { id: 132, name: '自动化测试组', manager: '徐涛', memberCount: 5, status: '正常' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '产品运营部',
    manager: '马云',
    memberCount: 30,
    status: '正常',
    children: [
      { id: 21, name: '产品设计组', manager: '马化腾', memberCount: 12, status: '正常' },
      { id: 22, name: '运营策划组', manager: '李彦宏', memberCount: 10, status: '正常' },
      { id: 23, name: '数据分析组', manager: '刘强东', memberCount: 8, status: '正常' },
    ],
  },
  {
    id: 3,
    name: '市场商务部',
    manager: '董明珠',
    memberCount: 25,
    status: '正常',
    children: [
      { id: 31, name: '市场推广组', manager: '许家印', memberCount: 10, status: '正常' },
      { id: 32, name: '客户关系组', manager: '王健林', memberCount: 8, status: '正常' },
      { id: 33, name: '商务合作组', manager: '王思聪', memberCount: 7, status: '正常' },
    ],
  },
  {
    id: 4,
    name: '行政人事部',
    manager: '陶华碧',
    memberCount: 20,
    status: '正常',
    children: [
      { id: 41, name: '行政管理组', manager: '曹德旺', memberCount: 8, status: '正常' },
      { id: 42, name: '人力资源组', manager: '何享健', memberCount: 7, status: '正常' },
      { id: 43, name: '后勤保障组', manager: '曾庆存', memberCount: 5, status: '正常' },
    ],
  },
]

const treeExpandInfo = ref<string>('')
function handleTreeExpand(row: Record<string, any>, expanded: boolean) {
  treeExpandInfo.value = `${row.name} ${expanded ? '展开了' : '收起了'}`
}

/* -------------------- 树形数据 + 懒加载 -------------------- */
const lazyTableRef = ref<InstanceType<typeof XlyTable>>()
const lazyColumns: TableColumn[] = [
  { prop: 'name', name: '部门名称', minWidth: 180 },
  { prop: 'manager', name: '负责人', width: 100, align: 'center' },
  { prop: 'memberCount', name: '成员数', width: 80, align: 'center' },
]

// 懒加载模拟数据存储（实际项目中应该从后端获取）
const lazyLoadedData = new Map<string | number, Record<string, any>[]>()

const lazyData = ref([
  { id: 100, name: '华东区', manager: '区域总监A', memberCount: 0 },
  { id: 200, name: '华西区', manager: '区域总监B', memberCount: 0 },
  { id: 300, name: '华南区', manager: '区域总监C', memberCount: 0 },
  { id: 400, name: '华北区', manager: '区域总监D', memberCount: 0 },
])

const lazyExpandInfo = ref<string>('')
function handleLazyTreeExpand(row: Record<string, any>, expanded: boolean) {
  lazyExpandInfo.value = `${row.name} ${expanded ? '正在加载子部门...' : '收起了'}`
}

async function handleLazyLoad(row: Record<string, any>): Promise<Record<string, any>[]> {
  // 模拟 API 延迟
  await new Promise((resolve) => setTimeout(resolve, 800))

  let children: Record<string, any>[] = []

  // 根据 id 判断返回什么数据
  // - 第一级 (100, 200, 300, 400): 返回 3 个子部门
  // - 第二级分部1 (100-1, 200-1 等): 返回空数组（叶子节点测试）
  // - 第二级分部2 (100-2, 200-2 等): 返回 2 个小组
  // - 第二级分部3 (100-3, 200-3 等): 返回空数组（叶子节点测试）
  const rowId = String(row.id)
  const match = rowId.match(/^(\d+)-(\d+)$/)

  if (!match) {
    // 第一级：返回 3 个子部门
    children = [
      { id: `${row.id}-1`, name: `${row.name}-分部1`, manager: '分部负责人A', memberCount: 0 },
      { id: `${row.id}-2`, name: `${row.name}-分部2`, manager: '分部负责人B', memberCount: 0 },
      { id: `${row.id}-3`, name: `${row.name}-分部3`, manager: '分部负责人C', memberCount: 0 },
    ]
  } else {
    const [, parentId, subNum] = match
    if (subNum === '1' || subNum === '3') {
      // 分部1和分部3：叶子节点，返回空数组
      children = []
    } else if (subNum === '2') {
      // 分部2：返回 2 个小组（可继续展开）
      children = [
        {
          id: `${row.id}-team1`,
          name: `${row.name}-小组1`,
          manager: '小组负责人A',
          memberCount: Math.floor(Math.random() * 10) + 3,
        },
        {
          id: `${row.id}-team2`,
          name: `${row.name}-小组2`,
          manager: '小组负责人B',
          memberCount: Math.floor(Math.random() * 10) + 3,
        },
      ]
    }
  }

  // 存储已加载的数据
  lazyLoadedData.set(row.id, children)

  // 【关键】重新构建数据数组，触发 Vue 响应式更新
  lazyData.value = updateRowChildren(lazyData.value, row.id, children)

  return children
}

// 递归更新指定 row 的 children，触发 Vue 响应式
function updateRowChildren(
  rows: Record<string, any>[],
  targetId: string | number,
  children: Record<string, any>[],
): Record<string, any>[] {
  return rows.map((row) => {
    if (row.id === targetId) {
      // 找到目标行，替换 children
      return { ...row, children }
    }
    if (row.children && Array.isArray(row.children)) {
      // 递归查找子级
      const newChildren = updateRowChildren(row.children, targetId, children)
      // 只有当子级真正变化时才创建新对象
      if (newChildren !== row.children) {
        return { ...row, children: newChildren }
      }
    }
    return row
  })
}

/* -------------------- 刷新 & 导出 -------------------- */
function handleRefresh() {
  console.log('点击了刷新按钮')
  // 重新加载数据
}

function handleExport() {
  console.log('点击了导出按钮')
  // 导出数据逻辑
}

/* -------------------- 排序 -------------------- */
const sortableColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'dept', name: '部门', width: 140 },
  {
    prop: 'salary',
    name: '薪资（元）',
    width: 140,
    sortable: true,
    align: 'right',
    formatter: (_, v) => (v ? `¥${Number(v).toLocaleString()}` : '—'),
  },
  { prop: 'score', name: '绩效评分', width: 120, sortable: true, align: 'center' },
]

const salaryData = [
  { name: '张三', dept: '技术部', salary: 28000, score: 92 },
  { name: '李四', dept: '产品部', salary: 22000, score: 85 },
  { name: '王五', dept: '设计部', salary: 18000, score: 78 },
  { name: '赵六', dept: '运营部', salary: 15000, score: 88 },
  { name: '钱七', dept: '技术部', salary: 32000, score: 96 },
  { name: '孙八', dept: '市场部', salary: 14000, score: 72 },
]

const sortInfo = ref<{ prop: string; order: string } | null>(null)
function handleSortChange(key: string, order: string | null) {
  sortInfo.value = order ? { key, order } : null
}

/* -------------------- 前缀和后缀 -------------------- */
const prefixSuffixColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'dept', name: '部门', width: 140 },
  { prop: 'salary', name: '薪资', width: 140, align: 'right', prefix: '¥', suffix: ' 元' },
  { prop: 'score', name: '评分', width: 120, align: 'center', suffix: ' 分' },
]

/* -------------------- 自定义渲染 -------------------- */
const customColumns: TableColumn[] = [
  { prop: 'project', name: '项目名称', minWidth: 140 },
  { prop: 'owner', name: '负责人', width: 100 },
  { prop: 'status', name: '状态', width: 100, align: 'center' },
  { prop: 'progress', name: '进度', minWidth: 160 },
  { prop: 'deadline', name: '截止日期', width: 120, align: 'center' },
]

const statusTypeMap = {
  进行中: 'primary',
  已完成: 'success',
  已逾期: 'danger',
  待启动: 'info',
  暂停中: 'warning',
} as const

const statusData = [
  {
    project: '管理后台 v2.0',
    owner: '张三',
    status: '进行中',
    progress: 65,
    deadline: '2026-04-15',
  },
  { project: '移动端 APP', owner: '李四', status: '已完成', progress: 100, deadline: '2026-02-28' },
  { project: '数据大屏', owner: '王五', status: '已逾期', progress: 30, deadline: '2026-03-10' },
  { project: '权限系统重构', owner: '赵六', status: '待启动', progress: 0, deadline: '2026-05-01' },
  {
    project: '消息推送服务',
    owner: '钱七',
    status: '暂停中',
    progress: 48,
    deadline: '2026-04-30',
  },
]

function handleEdit(row: Record<string, any>) {
  alert(`编辑：${row.project}`)
}
function handleDelete(row: Record<string, any>) {
  alert(`删除：${row.project}`)
}

/* -------------------- 分页 -------------------- */
const paginationColumns: TableColumn[] = [
  { prop: 'id', name: 'ID', width: 80, align: 'center' },
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'dept', name: '部门', width: 140 },
  { prop: 'city', name: '城市', width: 100 },
]

const bigData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  age: Math.floor(Math.random() * 40) + 20,
  name: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'][i % 8],
  dept: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
  email: `user${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.comuser${i + 1}@example.com`,
  city: ['北京', '上海', '深圳', '杭州', '成都', '广州'][i % 6],
}))

const currentPageInfo = ref<string>('')
function handlePageChange(page: number) {
  currentPageInfo.value = `第 ${page} 页，每页 8 条`
  console.log('页码变化：', page)
}

function handlePageSizeChange(pageSize: number) {
  console.log('每页条数变化：', pageSize)
}

/* -------------------- 加载状态 -------------------- */
const isLoading = ref(false)
const loadingData = ref([...basicData])
function mockLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

/* -------------------- 列设置 -------------------- */
const columnSettingsColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'age', name: '年龄', width: 80, align: 'center' },
  { prop: 'dept', name: '部门', width: 120 },
  { prop: 'email', name: '邮箱', width: 180, ellipsis: true, drag: false },
  { prop: 'city', name: '城市', width: 100 },
]

function handleColumnOrderChange(newColumns: TableColumn[]) {
  console.log('列顺序已更新', newColumns)
}

/* -------------------- 列固定 -------------------- */
const fixedColumns: TableColumn[] = [
  { prop: 'id', name: 'ID', width: 80, fixed: 'left', align: 'center' },
  { prop: 'name', name: '姓名', width: 100, fixed: 'left' },
  { prop: 'age', name: '年龄', width: 80, align: 'center' },
  { prop: 'dept', name: '部门', width: 120 },
  { prop: 'email', name: '邮箱', width: 200, ellipsis: true },
  { prop: 'phone', name: '电话', width: 140 },
  { prop: 'address', name: '地址', width: 200, ellipsis: true },
  { prop: 'company', name: '公司', width: 150 },
  { prop: 'salary', name: '薪资', width: 120, align: 'right' },
  { prop: 'status', name: '状态', width: 100, fixed: 'right', align: 'center' },
]

/* -------------------- 多列横向滚动 -------------------- */
const scrollColumns: TableColumn[] = [
  { prop: 'id', name: 'ID', width: 80, fixed: 'left', align: 'center' },
  { prop: 'name', name: '姓名', width: 100, fixed: 'left' },
  { prop: 'age', name: '年龄', width: 200, align: 'center' },
  { prop: 'gender', name: '性别', width: 200, align: 'center' },
  { prop: 'dept', name: '部门', width: 120 },
  { prop: 'position', name: '职位', width: 120 },
  { prop: 'email', name: '邮箱', width: 200, ellipsis: true },
  { prop: 'phone', name: '电话', width: 200 },
  { prop: 'address', name: '地址', width: 200, ellipsis: true },
  { prop: 'city', name: '城市', width: 200 },
  { prop: 'province', name: '省份', width: 200 },
  { prop: 'zipcode', name: '邮编', width: 200, align: 'center' },
  { prop: 'joinDate', name: '入职日期', width: 200 },
  { prop: 'leaveDate', name: '离职日期', width: 200 },
  {
    prop: 'salary',
    name: '薪资',
    width: 120,
    align: 'right',
    summary: 'sum',
    formatter: (_, v) => (v ? `¥${Number(v).toLocaleString()}` : '—'),
  },
  {
    prop: 'bonus',
    name: '奖金',
    width: 100,
    align: 'right',
    summary: 'sum',
    formatter: (_, v) => (v ? `¥${Number(v).toLocaleString()}` : '—'),
  },
  {
    prop: 'performance',
    name: '绩效评分',
    width: 100,
    fixed: 'right',
    align: 'center',
    summary: 'sum',
  },
  { prop: 'status', name: '状态', width: 100, fixed: 'right', align: 'center' },
]

/* -------------------- 合计行 -------------------- */
const summaryColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 120 },
  { prop: 'dept', name: '部门', width: 120 },
  { prop: 'salary', name: '薪资（元）', width: 140, align: 'right', summary: 'sum' },
  { prop: 'bonus', name: '奖金（元）', width: 140, align: 'right', summary: 'sum' },
  { prop: 'score', name: '绩效评分', width: 120, align: 'right', summary: 'avg' },
  { prop: 'status', name: '状态', width: 100, align: 'center', summaryText: '—' },
]
const summaryData = [
  { name: '张三', dept: '研发部', salary: 18000, bonus: 3000, score: 92, status: '在职' },
  { name: '李四', dept: '产品部', salary: 15000, bonus: 2500, score: 85, status: '在职' },
  { name: '王五', dept: '研发部', salary: 22000, bonus: 4000, score: 96, status: '在职' },
  { name: '赵六', dept: '运营部', salary: 12000, bonus: 1500, score: 78, status: '离职' },
  { name: '钱七', dept: '研发部', salary: 20000, bonus: 3500, score: 90, status: '在职' },
]

// 为 bigData 添加更多字段
const enhancedBigData = bigData.map((item, i) => ({
  ...item,
  gender: ['男', '女'][i % 2],
  position: ['工程师', '设计师', '产品经理', '运营专员'][i % 4],
  phone: `138${String(i).padStart(8, '0')}`,
  address: `${['朝阳区', '海淀区', '西城区', '东城区'][i % 4]}${item.city}街道${i + 1}号\n备注：已搬迁至新址`,
  company: ['某某科技有限公司', '某某互联网公司', '某某咨询公司'][i % 3],
  salary: [15000, 20000, 25000, 30000][i % 4],
  bonus: [3000, 5000, 8000, 10000][i % 4],
  performance: [85, 90, 95, 88][i % 4],
  status: ['在职', '在职', '离职', '在职'][i % 4] as string,
  joinDate: '2023-01-15',
  leaveDate: ['', '2024-06-30'][i % 2] as string,
}))
</script>

<style scoped lang="scss">
.table-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 36px;
}
.doc-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0;
  line-height: 1.6;
}

.doc-section {
  margin-bottom: 32px;
}
.doc-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f7;
}
.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 16px;
  line-height: 1.6;
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  background: #fff;
}
.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
}
.doc-code {
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;
  pre {
    margin: 0;
    padding: 0;
  }
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #4a4a6a;
    white-space: pre;
  }
}

.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}
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
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
    white-space: nowrap;
  }
  td {
    color: #4a4a6a;
  }
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.size-label {
  font-size: 12px;
  color: #8e8ea0;
  margin: 0 0 8px;
  font-weight: 500;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
}

.selection-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 8px 12px;
  background: #f0f3fe;
  border-radius: 6px;
  border: 1px solid #d8e0fc;
}

.sort-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 8px 12px;
  background: #fafbfd;
  border-radius: 6px;
  border: 1px solid #e2e4ed;
  strong {
    color: #4f6ef7;
  }
}

.pagination-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 8px 12px;
  background: #fafbfd;
  border-radius: 6px;
  border: 1px solid #e2e4ed;
  strong {
    color: #4f6ef7;
  }
}

/* 进度条 */
.progress-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.progress-bar {
  flex: 1;
  height: 6px;
  background: #f2f3f7;
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar__fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}
.progress-value {
  font-size: 12px;
  color: #8e8ea0;
  min-width: 34px;
  text-align: right;
}

/* 操作按钮 */
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.action-btn {
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;

  &--edit {
    color: #4f6ef7;
    border-color: rgba(79, 110, 247, 0.3);
    background: rgba(79, 110, 247, 0.06);
    &:hover {
      background: rgba(79, 110, 247, 0.12);
    }
  }
  &--delete {
    color: #ff3b30;
    border-color: rgba(255, 59, 48, 0.3);
    background: rgba(255, 59, 48, 0.06);
    &:hover {
      background: rgba(255, 59, 48, 0.12);
    }
  }
}

/* Demo 按钮 */
.demo-btn {
  padding: 7px 16px;
  border-radius: 7px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #e2e4ed;
  background: #fff;
  color: #4a4a6a;
  transition: all 0.15s;
  &:hover {
    border-color: #4f6ef7;
    color: #4f6ef7;
  }

  &--primary {
    background: #4f6ef7;
    border-color: #4f6ef7;
    color: #fff;
    &:hover {
      background: #3d5ce5;
      border-color: #3d5ce5;
      color: #fff;
    }
  }
}

/* 展开行内容 */
.expand-toolbar {
  display: flex;
  gap: 10px;
}

.expand-children {
  padding: 8px 0;
}

.children-header {
  margin-bottom: 8px;
}

.children-title {
  font-size: 12px;
  color: #909399;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.children-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
  border-left: 2px solid #4f6ef7;
  margin-left: 8px;
}

.children-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;
  background: #fff;
  border-radius: 4px;
  font-size: 13px;

  .child-name {
    flex: 1;
    color: #303133;
  }

  .child-manager {
    width: 70px;
    color: #606266;
    font-size: 12px;
  }

  .child-progress {
    width: 70px;
    color: #4f6ef7;
    text-align: right;
    font-weight: 500;
    font-size: 12px;
  }
}

.children-empty {
  font-size: 13px;
  color: #c0c4cc;
  padding: 8px 12px;
}

.expand-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 8px 12px;
  background: #f0f3fe;
  border-radius: 6px;
  border: 1px solid #d8e0fc;
}

.tree-hint {
  font-size: 13px;
  color: #4a4a6a;
  padding: 8px 12px;
  background: #f0f3fe;
  border-radius: 6px;
  border: 1px solid #d8e0fc;
}

/* 代码高亮样式 */
:deep(.code-tag) {
  color: #d73a49;
}
:deep(.code-attr) {
  color: #6f42c1;
}
:deep(.code-string) {
  color: #032f62;
}
:deep(.code-comment) {
  color: #6a737d;
  font-style: italic;
}
:deep(.code-keyword) {
  color: #d73a49;
}
</style>
