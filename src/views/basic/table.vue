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
        设置 <code>selection-mode="single"</code> 启用单选模式，此时只能选择一行数据，再次选择会替换当前选中行。
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
        通过 <code>prefix</code> 和 <code>suffix</code> 属性为列内容添加前缀和后缀，方便显示单位、货币符号等。
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
            show-index
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-table
  :columns="columns"
  :data="data"
  :max-height="300"
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
        <code>show-column-settings</code> 显示列设置按钮。按钮采用图标形式，通过对应事件处理业务逻辑。
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
  { prop: 'salary',     name: '薪资',       width: 120, align: 'right' },
  { prop: 'bonus',      name: '奖金',       width: 100, align: 'right' },
  { prop: 'performance', name: '绩效评分',  width: 100, align: 'center' },
  { prop: 'status',     name: '状态',       width: 100, fixed: 'right' },
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

/* -------------------- 基础列 -------------------- */
const basicColumns: TableColumn[] = [
  { prop: 'name', name: '姓名', width: 100 },
  { prop: 'age', name: '年龄', width: 80, align: 'center' },
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
    formatter: (_, v) => (v ? `¥${Number(v).toLocaleString()}` : '—'),
  },
  {
    prop: 'bonus',
    name: '奖金',
    width: 100,
    align: 'right',
    formatter: (_, v) => (v ? `¥${Number(v).toLocaleString()}` : '—'),
  },
  { prop: 'performance', name: '绩效评分', width: 100, align: 'center' },
  { prop: 'status', name: '状态', width: 100, fixed: 'right', align: 'center' },
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
</style>
