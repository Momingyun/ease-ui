<template>
  <div class="chart-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Chart 图表</h1>
      <p class="doc-desc">
        基于 SVG
        原生实现的轻量级图表组件，无需引入任何第三方依赖。支持折线图、柱状图、饼状图、环形图、漏斗图，内置
        Tooltip、图例、响应式、大数据量横向拖拽等功能。
      </p>
    </div>

    <!-- ===== 折线图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">折线图 Line</h2>
      <p class="doc-section__desc">展示数据随时间变化的趋势，默认开启面积填充。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="line"
              title="月度访问量"
              subtitle="2025年全年数据统计"
              :labels="monthLabels"
              :series="lineSeries"
              :height="300"
              :show-label="true"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="line"
  title="月度访问量"
  subtitle="2025年全年数据统计"
  :labels="['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']"
  :series="[
    { name: 'UV', data: [1200, 1800, 1400, 2100, 2600, 2300, 2900, 3100, 2700, 3400, 3200, 3800] },
    { name: 'PV', data: [4200, 5800, 4700, 6500, 7200, 6800, 8100, 8600, 7500, 9200, 8900, 10500] },
  ]"
  :height="300"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不带面积的折线图 -->
    <section class="doc-section">
      <h2 class="doc-section__title">折线图 — 不填充面积</h2>
      <p class="doc-section__desc">
        设置 <code>:area-fill="false"</code> 关闭面积填充，显示纯折线。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="line"
              title="股价走势"
              :labels="weekLabels"
              :series="stockSeries"
              :area-fill="false"
              :height="260"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="line"
  title="股价走势"
  :labels="['周一','周二','周三','周四','周五','周六','周日']"
  :series="[
    { name: '股票A', data: [148.2, 152.4, 149.8, 155.6, 153.2, 158.0, 161.5], color: '#3b82f6' },
    { name: '股票B', data: [92.1, 89.5, 93.8, 91.2, 95.6, 97.3, 94.0], color: '#ef4444' },
  ]"
  :area-fill="false"
  :height="260"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 单数据折线 -->
    <section class="doc-section">
      <h2 class="doc-section__title">单线图 — 自定义颜色</h2>
      <p class="doc-section__desc">
        通过 <code>colors</code> 属性自定义颜色，也可在 serie 上单独指定 <code>color</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="line"
              title="用户增长"
              :labels="dayLabels"
              :series="singleSeries"
              :colors="['#8b5cf6']"
              :height="240"
              legend-position="top"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="line"
  title="用户增长"
  :labels="['周一','周二','周三','周四','周五','周六','周日']"
  :series="[{ name: '新增用户', data: [120, 145, 98, 160, 132, 178, 156] }]"
  :colors="['#8b5cf6']"
  :height="240"
  legend-position="top"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 柱状图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">柱状图 Bar</h2>
      <p class="doc-section__desc">比较各类别数据大小，支持多系列分组展示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="季度销售额"
              subtitle="按产品线统计（万元）"
              :labels="quarterLabels"
              :series="barSeries"
              :height="300"
              :show-label="true"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="bar"
  title="季度销售额"
  subtitle="按产品线统计（万元）"
  :labels="['Q1','Q2','Q3','Q4']"
  :series="[
    { name: '产品A', data: [120, 145, 98, 176] },
    { name: '产品B', data: [90,  108, 115, 142] },
    { name: '产品C', data: [60,  88,  70,  95]  },
  ]"
  :height="300"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 单系列柱状图 -->
    <section class="doc-section">
      <h2 class="doc-section__title">单系列柱状图</h2>
      <p class="doc-section__desc">单数据系列时，柱子更宽，展示效果更突出。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="各城市 GMV（亿元）"
              :labels="cityLabels"
              :series="citySeries"
              :colors="['#10b981']"
              :bar-radius="6"
              :height="260"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="bar"
  title="各城市GMV（亿元）"
  :labels="['北京','上海','广州','深圳','杭州','成都']"
  :series="[
    { name: 'GMV', data: [512, 476, 328, 394, 256, 218] }
  ]"
  :colors="['#10b981']"
  :bar-radius="6"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义单柱颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义单柱颜色</h2>
      <p class="doc-section__desc">
        在系列中通过 <code>colors</code> 数组为每个柱子单独指定颜色，优先级高于 <code>color</code>。
        未设置的索引自动降级使用 <code>color</code> 或默认色板。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="各产品季度销售额"
              subtitle="单柱自定义颜色示例"
              :labels="quarterLabels"
              :series="coloredBarSeries"
              :height="280"
              :show-label="true"
              :bar-radius="6"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="bar"
  title="各产品季度销售额"
  :labels="['Q1', 'Q2', 'Q3', 'Q4']"
  :series="[
    {
      name: '产品A',
      data: [120, 145, 98, 176],
      colors: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444']
    },
  {
    name: '产品B',
    data: [90, 108, 115, 142],
    color: '#a78bfa',
  },
  ]"
  :show-label="true"
  :bar-radius="6"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 堆叠柱状图 -->
    <section class="doc-section">
      <h2 class="doc-section__title">堆叠柱状图 Stack</h2>
      <p class="doc-section__desc">
        使用 <code>type="stack"</code> 渲染堆叠柱状图，多系列数据在同一柱子内垂直叠加，直观对比各部分占比和总量。
        支持 <code>:show-label="true"</code> 在每段显示数值及柱顶显示总量。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="stack"
              title="各渠道月度销售额"
              subtitle="Q1 – Q2 多渠道堆叠对比"
              :labels="stackLabels"
              :series="stackSeries"
              :height="300"
              :show-label="true"
              :bar-radius="4"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="stack"
  title="各渠道月度销售额"
  :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
  :series="[
    { name: '线下门店', data: [320, 290, 350, 380, 420, 390] },
    { name: '电商平台', data: [180, 210, 240, 260, 300, 280] },
    { name: '私域流量', data: [80,  95,  110, 130, 150, 140] },
  ]"
  :height="300"
  :show-label="true"
  :bar-radius="4"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 堆叠柱状图：统一设置每层颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">堆叠柱状图：统一设置每层颜色</h2>
      <p class="doc-section__desc">
        在每个 <code>series</code> 项上设置 <code>color</code>，可统一控制所有柱子该层的颜色；
        也可以通过全局 <code>:colors</code> 按系列顺序批量指定颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="stack"
              title="统一每层颜色"
              :labels="stackLabels"
              :series="stackSeriesColored"
              :height="280"
              :bar-radius="4"
              :show-label="true"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="stack"
  title="统一每层颜色"
  :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
  :series="[
    { name: '线下门店', color: '#f97316', data: [320, 290, 350, 380, 420, 390] },
    { name: '电商平台', color: '#06b6d4', data: [180, 210, 240, 260, 300, 280] },
    { name: '私域流量', color: '#a78bfa', data: [80,  95,  110, 130, 150, 140] },
  ]"
  :height="280"
  :bar-radius="4"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 堆叠柱状图：单独设置某柱某层颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">堆叠柱状图：单独设置某柱某层颜色</h2>
      <p class="doc-section__desc">
        通过 <code>:stack-colors</code> 精确控制任意柱子任意层的颜色。
        格式为 <code>stackColors[柱索引][层索引]</code>，未设置的位置自动回退到系列颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="stack"
              title="单独设置某柱某层颜色"
              subtitle="第3根柱子高亮所有层"
              :labels="stackLabels"
              :series="stackSeries"
              :stack-colors="stackHighlightColors"
              :height="280"
              :bar-radius="4"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- stackColors[柱索引][层索引] 精确控制某根柱某层颜色 --&gt;
&lt;!-- 以下将第 3 根柱（索引 2）的所有层设置为高亮色 --&gt;
&lt;XlyChart
  type="stack"
  title="单独设置某柱某层颜色"
  subtitle="第3根柱子高亮所有层"
  :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
  :series="[
    { name: '线下门店', data: [320, 290, 350, 380, 420, 390] },
    { name: '电商平台', data: [180, 210, 240, 260, 300, 280] },
    { name: '私域流量', data: [80,  95,  110, 130, 150, 140] },
  ]"
  :stack-colors="[
    [],
    [],
    ['#f97316', '#ef4444', '#eab308'],
    [],
    [],
    [],
  ]"
  :height="280"
  :bar-radius="4"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- show-label：折线 + 柱状 -->
    <section class="doc-section">
      <h2 class="doc-section__title">显示数据标签</h2>
      <p class="doc-section__desc">
        设置
        <code>:show-label="true"</code> 在图形上直接标注数值，折线图、柱状图、饼图、环形图均支持。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="line"
                title="用户增长（含标签）"
                :labels="dayLabels"
                :series="singleSeries"
                :colors="['#8b5cf6']"
                :show-label="true"
                :height="240"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="bar"
                title="各城市 GMV（含标签）"
                :labels="cityLabels"
                :series="citySeries"
                :colors="['#10b981']"
                :bar-radius="6"
                :show-label="true"
                :height="240"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 折线图显示数据标签 --&gt;
&lt;XlyChart
  type="line"
  :series="series"
  :labels="labels"
  :show-label="true"
/&gt;

&lt;!-- 柱状图显示数据标签 --&gt;
&lt;XlyChart
  type="bar"
  :series="series"
  :labels="labels"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 折柱混用 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">折柱混用 Mixed</h2>
      <p class="doc-section__desc">
        设置 <code>type="mixed"</code>，并在每个 <code>series</code> 项上用 <code>chartType</code> 指定该系列的展示类型（<code>'bar'</code> 柱状 / <code>'line'</code> 折线）。
        组件自动生成 <strong>双 Y 轴</strong>：左轴对应柱状系列，右轴对应折线系列，两组数据各有独立的量纲范围，不互相干扰。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="mixed"
              title="销售额与增长率"
              subtitle="柱状：销售额（万元）  折线：环比增长率（%）"
              :labels="mixedLabels"
              :series="mixedSeries"
              :height="320"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="mixed"
  title="销售额与增长率"
  :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
  :series="[
    { name: '线下销售额', data: [1200, 1400, 980,  1650, 1800, 2100], chartType: 'bar'  },
    { name: '线上销售额', data: [800,  1050, 760,  1100, 1350, 1600], chartType: 'bar'  },
    { name: '环比增长率', data: [5.2,  16.7, -7.1, 15.8, 12.3, 18.5], chartType: 'line', color: '#f59e0b' },
  ]"
  :height="320"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 折柱混用：双 Y 轴场景 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">折柱混用：多系列示例</h2>
      <p class="doc-section__desc">
        左 Y 轴和右 Y 轴各自独立计算量程，无需手动对齐数量级，直接传入原始数据即可。左侧为柱状（示例：访问量/收入），右侧为折线（示例：转化率/费用率）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="mixed"
                title="月度访问量 & 转化率"
                :labels="mixedLabels"
                :series="mixedSeries2"
                :height="300"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="mixed"
                title="收入 & 费用率（多折线）"
                :labels="mixedLabels"
                :series="mixedSeries3"
                :height="300"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 单柱 + 单折线：访问量（柱，左Y轴）+ 转化率（折线，右Y轴），量纲自动独立 --&gt;
&lt;XlyChart
  type="mixed"
  title="月度访问量 & 转化率"
  :labels="['1月','2月','3月','4月','5月','6月']"
  :series="[
    { name: '访问量', data: [3200, 4100, 3750, 5200, 4800, 6100], chartType: 'bar', color: '#3b82f6' },
    { name: '转化率', data: [3.2,  3.8,  2.95, 4.6,  4.15, 5.3 ], chartType: 'line', color: '#10b981' },
  ]"
  :height="300"
/&gt;

&lt;!-- 多柱 + 多折线：左Y轴（主营/其他收入），右Y轴（销售/管理费用率） --&gt;
&lt;XlyChart
  type="mixed"
  title="收入 & 费用率"
  :labels="['1月','2月','3月','4月','5月','6月']"
  :series="[
    { name: '主营收入', data: [8600, 9200, 7800, 10500, 11200, 13000], chartType: 'bar',  color: '#6366f1' },
    { name: '其他收入', data: [1200, 1400, 980,  1650,  1800,  2100 ], chartType: 'bar',  color: '#a78bfa' },
    { name: '销售费用率', data: [10,   10,   10,   10,    10,    10   ], chartType: 'line', color: '#f59e0b' },
    { name: '管理费用率', data: [5,    5,    5,    5,     5,     5    ], chartType: 'line', color: '#ef4444' },
  ]"
  :height="300"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 折柱混用：颜色配置 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">折柱混用：颜色配置</h2>
      <p class="doc-section__desc">
        折柱混用支持三种颜色配置方式，优先级从高到低：
        ① <code>serie.colors</code> 按数据索引逐柱/逐点精确配色 &nbsp;②&nbsp;<code>serie.color</code> 为整个系列统一着色 &nbsp;③&nbsp;<code>:colors</code> 全局调色盘按系列原始顺序分配。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <!-- 方式一：serie.color 统一着色 -->
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="mixed"
                title="serie.color 统一着色"
                :labels="mixedLabels"
                :series="mixedColorSeries1"
                :height="280"
              />
            </XlyCard>
            <!-- 方式二：serie.colors 逐柱着色 -->
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="mixed"
                title="serie.colors 逐柱着色"
                :labels="mixedLabels"
                :series="mixedColorSeries2"
                :height="280"
              />
            </XlyCard>
          </div>
          <!-- 方式三：:colors 全局调色盘 -->
          <XlyCard shadow="never" :bordered="true" style="margin-top:12px">
            <XlyChart
              type="mixed"
              title=":colors 全局调色盘（按系列顺序：柱1/柱2/折线）"
              :labels="mixedLabels"
              :series="mixedColorSeries3"
              :colors="['#6366f1', '#a78bfa', '#f59e0b']"
              :height="280"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- ① serie.color：整个系列统一用一种颜色 --&gt;
:series="[
  { name: '线下销售', data: [...], chartType: 'bar',  color: '#3b82f6' },
  { name: '线上销售', data: [...], chartType: 'bar',  color: '#10b981' },
  { name: '增长率',   data: [...], chartType: 'line', color: '#f59e0b' },
]"

&lt;!-- ② serie.colors：按数据索引逐个定义颜色（数组长度 = data.length） --&gt;
:series="[
  {
    name: '月销售额',
    data: [1200, 1400, 980, 1650, 1800, 2100],
    chartType: 'bar',
    colors: ['#3b82f6', '#3b82f6', '#ef4444', '#3b82f6', '#3b82f6', '#10b981'],
    &lt;!-- 3月下跌标红，6月达标标绿，其余默认蓝 --&gt;
  },
  { name: '增长率', data: [...], chartType: 'line', color: '#f59e0b' },
]"

&lt;!-- ③ :colors 全局调色盘：按 series 原始顺序（含折线）依次分配 --&gt;
&lt;XlyChart
  type="mixed"
  :colors="['#6366f1', '#a78bfa', '#f59e0b']"
  :series="[
    { name: '线下销售', data: [...], chartType: 'bar'  },  &lt;!-- 取 colors[0] #6366f1 --&gt;
    { name: '线上销售', data: [...], chartType: 'bar'  },  &lt;!-- 取 colors[1] #a78bfa --&gt;
    { name: '增长率',   data: [...], chartType: 'line' },  &lt;!-- 取 colors[2] #f59e0b --&gt;
  ]"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 饼状图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">饼状图 Pie</h2>
      <p class="doc-section__desc">展示各部分占整体的比例关系，悬停切片会弹出并显示详细信息。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="pie"
                title="流量来源"
                :data="pieData"
                :height="280"
                :show-label="true"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="pie"
                title="设备分布"
                :data="deviceData"
                :height="280"
                legend-position="right"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="pie"
  title="流量来源"
  :data="[
    { name: '自然搜索', value: 4520 },
    { name: '直接访问', value: 2810 },
    { name: '社交媒体', value: 1950 },
    { name: '付费广告', value: 1200 },
    { name: '其他',     value: 520  },
  ]"
  :height="280"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 饼状图：自定义颜色 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">饼状图：:colors 全局调色盘</h2>
      <p class="doc-section__desc">
        通过 <code>:colors</code> 按 <code>data</code> 项顺序依次指定每块颜色，适合统一风格的配色需求。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="pie"
              title="预算分配"
              :data="budgetPieData"
              :colors="['#6366f1', '#f59e0b', '#10b981', '#ef4444']"
              :height="280"
              :show-label="true"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="pie"
  title="预算分配"
  :data="[
    { name: '研发', value: 8600 },
    { name: '市场', value: 5400 },
    { name: '运营', value: 3200 },
    { name: '行政', value: 1800 },
  ]"
  :colors="['#6366f1', '#f59e0b', '#10b981', '#ef4444']"
  :height="280"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 饼状图：item.color 单项颜色 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">饼状图：item.color 单项颜色</h2>
      <p class="doc-section__desc">
        在每个 <code>data</code> 项上单独设置 <code>color</code> 字段，优先级高于全局 <code>:colors</code>，可为不同分区精确指定语义化颜色（如绿色=成功、红色=失败）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="pie"
              title="订单状态"
              :data="orderStatusData"
              :height="280"
              legend-position="right"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="pie"
  title="订单状态"
  :data="[
    { name: '已完成', value: 340, color: '#10b981' },
    { name: '待支付', value: 128, color: '#f59e0b' },
    { name: '已取消', value: 56,  color: '#ef4444' },
    { name: '退款中', value: 23,  color: '#8b5cf6' },
  ]"
  :height="280"
  legend-position="right"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 环形图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">环形图 Donut</h2>
      <p class="doc-section__desc">在饼图基础上挖空中心区域，中心可自定义标题和数值。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="donut"
                title="任务完成率"
                :data="taskData"
                donut-label="已完成"
                donut-value="72%"
                :height="280"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="donut"
                title="预算使用情况"
                :data="budgetData"
                donut-label="已使用"
                donut-value="¥18.6w"
                :height="280"
                :colors="['#ef4444', '#f59e0b', '#10b981', '#3b82f6']"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="donut"
  title="任务完成率"
  :data="[
    { name: '已完成', value: 72 },
    { name: '进行中', value: 18 },
    { name: '待处理', value: 10 },
  ]"
  donut-label="已完成"
  donut-value="72%"
  :height="280"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- show-label：饼图 + 环形图 -->
    <section class="doc-section">
      <h2 class="doc-section__title">饼图 / 环形图数据标签</h2>
      <p class="doc-section__desc">
        饼图和环形图开启 <code>:show-label="true"</code> 后，在切片中央显示百分比（切片 &lt; 5%
        时自动隐藏以避免拥挤）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="pie"
                title="流量来源（含标签）"
                :data="pieData"
                :show-label="true"
                :height="280"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="donut"
                title="任务完成率（含标签）"
                :data="taskData"
                donut-label="已完成"
                donut-value="72%"
                :show-label="true"
                :height="280"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 饼图显示数据标签 --&gt;
&lt;XlyChart
  type="pie"
  :data="data"
  :show-label="true"
/&gt;

&lt;!-- 环形图显示数据标签 --&gt;
&lt;XlyChart
  type="donut"
  :data="data"
  donut-label="已完成"
  donut-value="72%"
  :show-label="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 自定义格式化 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义格式化</h2>
      <p class="doc-section__desc">
        通过 <code>formatter</code> 属性自定义 Y 轴和 Tooltip 的数值显示格式。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="收入报表（元）"
              :labels="monthLabels"
              :series="revenueSeries"
              :formatter="currencyFormatter"
              :height="280"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="bar"
  title="收入报表（元）"
  :labels="monthLabels"
  :series="revenueSeries"
  :formatter="(val) => '¥' + val.toLocaleString()"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 大数据量横向滚动 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">大数据量 — 横向拖拽</h2>
      <p class="doc-section__desc">
        设置 <code>:min-item-width="N"</code>，当数据点总宽度超过容器宽度时自动启用横向滚动。 支持
        <b>鼠标拖拽</b>、<b>底部滚动条</b>、<b>滚轮/触控板</b> 三种方式平移视图，Y
        轴和网格始终固定。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true" style="margin-bottom: 16px">
            <XlyChart
              type="line"
              title="全年每日访问量（365 天）"
              subtitle="拖拽或滚轮横向平移"
              :labels="dailyLabels"
              :series="dailySeries"
              :min-item-width="50"
              :height="300"
            />
          </XlyCard>
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="60 周销售数据"
              :labels="weeklyLabels"
              :series="weeklySeries"
              :min-item-width="40"
              :height="280"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 折线图：每个数据点最小 28px，超出后可拖拽滚动 --&gt;
&lt;XlyChart
  type="line"
  title="全年每日访问量"
  :labels="dailyLabels"
  :series="dailySeries"
  :min-item-width="50"
  :height="300"
/&gt;

&lt;!-- 柱状图：每组最小 40px --&gt;
&lt;XlyChart
  type="bar"
  title="60 周销售数据"
  :labels="weeklyLabels"
  :series="weeklySeries"
  :min-item-width="40"
  :height="280"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 隐藏图例/网格 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">精简模式</h2>
      <p class="doc-section__desc">隐藏图例和网格，适合空间紧凑的仪表盘场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="line"
                title="日活用户"
                :labels="dayLabels"
                :series="[{ name: 'DAU', data: [8200, 9100, 8700, 10200, 9800, 11000, 10500] }]"
                :show-legend="false"
                :show-grid="false"
                :show-download="false"
                :colors="['#3b82f6']"
                :height="200"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="bar"
                title="本周订单"
                :labels="dayLabels"
                :series="[{ name: '订单数', data: [32, 48, 41, 55, 62, 58, 70] }]"
                :show-legend="false"
                :show-grid="false"
                :show-download="false"
                :colors="['#f59e0b']"
                :height="200"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="line"
  title="日活用户"
  :labels="dayLabels"
  :series="[{ name: 'DAU', data: [...] }]"
  :show-legend="false"
  :show-grid="false"
  :height="200"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 漏斗图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">漏斗图 Funnel</h2>
      <p class="doc-section__desc">
        用于展示业务流程各环节的转化情况，层宽度与数值成正比，鼠标悬浮显示具体数值及占比。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="funnel"
              title="注册转化漏斗"
              subtitle="从曝光到付款各环节转化"
              :data="funnelData"
              :height="380"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="funnel"
  title="注册转化漏斗"
  subtitle="从曝光到付款各环节转化"
  :data="[
    { name: '曝光量', value: 50000 },
    { name: '点击量', value: 32000 },
    { name: '注册数', value: 18000 },
    { name: '激活数', value: 9000  },
    { name: '付款数', value: 3500  },
  ]"
  :height="380"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 漏斗图：:colors 全局调色盘 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">漏斗图：:colors 全局调色盘</h2>
      <p class="doc-section__desc">
        通过 <code>:colors</code> 按 <code>data</code> 项顺序依次指定每层颜色，适合整体风格统一的场景（如同色系渐变）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="funnel"
              title="销售流程漏斗"
              :data="salesFunnelData"
              :colors="['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']"
              :height="380"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="funnel"
  title="销售流程漏斗"
  :data="[
    { name: '潜在客户', value: 1200 },
    { name: '意向客户', value: 760  },
    { name: '商务谈判', value: 420  },
    { name: '合同签署', value: 210  },
    { name: '成功交付', value: 98   },
  ]"
  :colors="['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']"
  :height="380"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 漏斗图：item.color 单项颜色混用 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">漏斗图：item.color 单项颜色</h2>
      <p class="doc-section__desc">
        在 <code>data</code> 项上单独设置 <code>color</code> 字段，优先级高于全局 <code>:colors</code>。
        未设置 <code>color</code> 的层自动使用 <code>:colors</code> 调色盘或内置默认色，支持混用。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="funnel"
              title="注册转化漏斗（混用颜色）"
              :data="mixedFunnelData"
              :height="380"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 曝光量/点击量/付款数单独设色，注册数/激活数自动使用默认色 --&gt;
&lt;XlyChart
  type="funnel"
  title="注册转化漏斗（混用颜色）"
  :data="[
    { name: '曝光量', value: 50000, color: '#3b82f6' },
    { name: '点击量', value: 32000, color: '#06b6d4' },
    { name: '注册数', value: 18000 },
    { name: '激活数', value: 9000  },
    { name: '付款数', value: 3500,  color: '#10b981' },
  ]"
  :height="380"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 横向柱状图 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">横向柱状图 Horizontal Bar</h2>
      <p class="doc-section__desc">
        设置 <code>type="hbar"</code> 即可切换为横向柱状图，适合类别名称较长、方便比较排名的场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="hbar"
              title="各品类销售额"
              subtitle="单位：万元"
              :labels="hbarLabels"
              :series="hbarSeries"
              :height="360"
              :formatter="wanFormatter"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="hbar"
  title="各品类销售额"
  :labels="['Walnut Brownie','Lemon Juice','Orange Juice','Tea','Matcha Cocoa','Cheese Brownie','Cheese Cocoa','Milk Tea','Matcha Latte']"
  :series="[
    { name: '销售额', data: [18000, 105000, 88000, 78000, 22000, 17000, 45000, 80000, 52000] }
  ]"
  :height="360"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 横向柱状图：自定义颜色 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">横向柱状图：自定义颜色</h2>
      <p class="doc-section__desc">
        支持三种颜色设置方式：① <code>:colors</code> 全局调色盘按系列顺序指定；
        ② <code>serie.color</code> 设置某系列整体颜色；
        ③ <code>serie.colors</code> 数组为每根柱子单独设置颜色（优先级最高）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="hbar"
                title="城市销售额（全局色）"
                :labels="hbarColorLabels"
                :series="hbarColorSeries"
                :colors="['#6366f1', '#f59e0b']"
                :height="320"
                :formatter="wanFormatter"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="hbar"
                title="品类销售（每柱独立色）"
                :labels="hbarLabels.slice(0, 6)"
                :series="hbarItemColorSeries"
                :height="320"
                :formatter="wanFormatter"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 方式一：:colors 全局调色盘，多系列时按顺序依次指定 --&gt;
&lt;XlyChart
  type="hbar"
  :labels="['北京', '上海', '广州', '深圳', '杭州']"
  :series="[
    { name: 'Q1', data: [280, 340, 210, 260, 190] },
    { name: 'Q2', data: [310, 370, 240, 290, 220] },
  ]"
  :colors="['#6366f1', '#f59e0b']"
/&gt;

&lt;!-- 方式二：serie.color 设置该系列整体颜色 --&gt;
&lt;XlyChart
  type="hbar"
  title="城市销售额"
  :labels="['北京', '上海', '广州', '深圳', '杭州']"
  :series="[{
    name: '销售额',
    data: [512, 476, 328, 394, 256],
    color: '#10b981'
  }]"
  :height="260"
/&gt;

&lt;!-- 方式三：serie.colors 为每根柱子单独设置颜色 --&gt;
&lt;XlyChart
  type="hbar"
  title="品类销售排行（各柱独立色）"
  :labels="['Lemon Juice', 'Orange Juice', 'Tea', 'Milk Tea', 'Matcha Latte', 'Cheese Cocoa']"
  :series="[{
    name: '销售额',
    data: [105000, 88000, 78000, 80000, 52000, 45000],
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']
  }]"
  :height="300"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 仪表盘 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">仪表盘 Gauge</h2>
      <p class="doc-section__desc">
        用于展示单一指标的完成度或当前状态，支持自定义量程、单位和分段颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chart-row">
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="gauge"
                title="CPU 使用率"
                :gauge-value="72"
                :gauge-min="0"
                :gauge-max="100"
                gauge-unit="%"
                :colors="['#10b981', '#f59e0b', '#ef4444']"
                :height="260"
              />
            </XlyCard>
            <XlyCard shadow="never" :bordered="true" class="chart-col">
              <XlyChart
                type="gauge"
                title="今日完成进度"
                :gauge-value="6820"
                :gauge-min="0"
                :gauge-max="10000"
                gauge-unit=" 单"
                :colors="['#3b82f6', '#6366f1']"
                :height="260"
              />
            </XlyCard>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChart
  type="gauge"
  title="CPU 使用率"
  :gauge-value="72"
  :gauge-min="0"
  :gauge-max="100"
  gauge-unit="%"
  :colors="['#10b981','#f59e0b','#ef4444']"
  :height="260"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 下钻事件 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">下钻事件 Drill</h2>
      <p class="doc-section__desc">
        所有图表均支持
        <code>@drill</code>
        事件，点击任意数据元素（柱子、折线点、饼片、漏斗层、横向柱条）即可触发，返回包含
        <code>type</code
        >、<code>label</code>、<code>value</code>、<code>seriesName</code>、<code>index</code>、<code
      >extra</code
      >
        的对象。其中 <code>extra</code> 为 <code>series</code>（或
        <code>data</code>）每项中除内置字段外的所有自定义字段，方便下钻时携带业务 ID 等附加信息。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div v-if="drillLog" class="drill-log">
            <span class="drill-tag">drill 事件</span>
            <code>{{ drillLog }}</code>
          </div>
          <XlyCard shadow="never" :bordered="true">
            <XlyChart
              type="bar"
              title="点击柱子触发下钻"
              :labels="quarterLabels"
              :series="barSeries"
              :height="260"
              @drill="onDrill"
            />
          </XlyCard>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- series 中加入自定义字段，drill 时通过 extra 取出 --&gt;
&lt;XlyChart
  type="bar"
  :labels="quarterLabels"
  :series="[
    { name: '产品A', data: [120, 145, 98, 176], categoryId: 'A001', dept: '华东区' },
    { name: '产品B', data: [90, 108, 115, 142], categoryId: 'A002', dept: '华南区' },
  ]"
  @drill="({ type, label, value, seriesName, index, extra }) => {
    // extra = { categoryId: 'A001', dept: '华东区' }
    console.log('下钻', label, value, extra?.categoryId)
  }"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== API 文档 ===== -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Props</h3>
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
            <td>type</td>
            <td>图表类型</td>
            <td><code>'line' | 'bar' | 'stack' | 'hbar' | 'pie' | 'donut' | 'funnel' | 'gauge' | 'mixed'</code></td>
            <td><code>'line'</code></td>
          </tr>
          <tr>
            <td>title</td>
            <td>图表标题</td>
            <td><code>string</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>subtitle</td>
            <td>副标题</td>
            <td><code>string</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>width</td>
            <td>宽度，数字为px，字符串原样</td>
            <td><code>number | string</code></td>
            <td><code>'100%'</code></td>
          </tr>
          <tr>
            <td>height</td>
            <td>高度，数字为px，字符串原样</td>
            <td><code>number | string</code></td>
            <td><code>300</code></td>
          </tr>
          <tr>
            <td>labels</td>
            <td>X 轴标签（折线/柱状/横向柱状图）</td>
            <td><code>string[]</code></td>
            <td><code>[]</code></td>
          </tr>
          <tr>
            <td>series</td>
            <td>数据系列（折线/柱状/横向柱状图）</td>
            <td><code>ChartSerie[]</code></td>
            <td><code>[]</code></td>
          </tr>
          <tr>
            <td>data</td>
            <td>数据项（饼图/环形图/漏斗图/仪表盘分段）</td>
            <td><code>PieItem[]</code></td>
            <td><code>[]</code></td>
          </tr>
          <tr>
            <td>show-grid</td>
            <td>是否显示网格线</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td>show-legend</td>
            <td>是否显示图例</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td>show-label</td>
            <td>是否在图形上显示数据标签（折线/柱状/饼图/环形图）</td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td>legend-position</td>
            <td>图例位置</td>
            <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
            <td><code>'bottom'</code></td>
          </tr>
          <tr>
            <td>area-fill</td>
            <td>折线图是否填充面积</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td>colors</td>
            <td>
              自定义颜色列表，适用于所有图表类型：<br/>
              • 折线/柱状/hbar/stack：按系列顺序依次指定颜色<br/>
              • 饼图/环形图/漏斗图：按 data 项顺序依次指定颜色（单项 item.color 优先级更高）
            </td>
            <td><code>string[]</code></td>
            <td>内置配色</td>
          </tr>
          <tr>
            <td>stack-colors</td>
            <td>堆叠柱状图精确颜色（<code>stackColors[柱索引][层索引]</code>），优先级最高</td>
            <td><code>string[][]</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>bar-radius</td>
            <td>柱子圆角（px）</td>
            <td><code>number</code></td>
            <td><code>4</code></td>
          </tr>
          <tr>
            <td>donut-label</td>
            <td>环形图中心标签文字</td>
            <td><code>string</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>donut-value</td>
            <td>环形图中心数值文字</td>
            <td><code>string</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>formatter</td>
            <td>Y轴/Tooltip 数值格式化</td>
            <td><code>(val: number) => string</code></td>
            <td>—</td>
          </tr>
          <tr>
            <td>show-download</td>
            <td>是否显示右上角下载按钮（支持 PNG / SVG）</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td>min-item-width</td>
            <td>每个数据点最小宽度（px），超出容器时启用横向拖拽，0=自动</td>
            <td><code>number</code></td>
            <td><code>0</code></td>
          </tr>
          <tr>
            <td>gauge-value</td>
            <td>仪表盘当前值</td>
            <td><code>number</code></td>
            <td><code>0</code></td>
          </tr>
          <tr>
            <td>gauge-min</td>
            <td>仪表盘最小值</td>
            <td><code>number</code></td>
            <td><code>0</code></td>
          </tr>
          <tr>
            <td>gauge-max</td>
            <td>仪表盘最大值</td>
            <td><code>number</code></td>
            <td><code>100</code></td>
          </tr>
          <tr>
            <td>gauge-unit</td>
            <td>仪表盘数值单位（显示在中心数值后）</td>
            <td><code>string</code></td>
            <td>—</td>
          </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><code>drill</code></td>
            <td>点击图表元素时触发（支持所有图表类型）</td>
            <td>
              <code>{ type, label, value, seriesName?, index, extra? }</code><br /><small
            >extra：series/data 每项中的自定义字段（排除
              name/data/value/color/areaFill）</small
            >
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">ChartSerie 类型</h3>
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
            <td><code>name</code></td>
            <td>系列名称（同时用作图例标识）</td>
            <td><code>string</code></td>
          </tr>
          <tr>
            <td><code>data</code></td>
            <td>数值数组，与 labels 一一对应</td>
            <td><code>number[]</code></td>
          </tr>
          <tr>
            <td><code>color</code></td>
            <td>系列颜色，统一设置该系列所有数据点颜色</td>
            <td><code>string</code></td>
          </tr>
          <tr>
            <td><code>colors</code></td>
            <td>单个数据点颜色数组，与 data 一一对应，优先级高于 color（柱状图/堆叠图/横向柱状图有效）</td>
            <td><code>string[]</code></td>
          </tr>
          <tr>
            <td><code>areaFill</code></td>
            <td>是否填充面积（折线图）</td>
            <td><code>boolean</code></td>
          </tr>
          <tr>
            <td><code>chartType</code></td>
            <td>
              折柱混用（<code>type="mixed"</code>）时，指定该系列展示类型：<br/>
              <code>'bar'</code> — 柱状（默认）；<code>'line'</code> — 折线
            </td>
            <td><code>'bar' | 'line'</code></td>
          </tr>
          <tr>
            <td><code>[key: string]</code></td>
            <td>任意自定义字段，不参与绘制，下钻时通过 extra 取出</td>
            <td><code>any</code></td>
          </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">PieItem 类型</h3>
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
            <td><code>name</code></td>
            <td>项目名称</td>
            <td><code>string</code></td>
          </tr>
          <tr>
            <td><code>value</code></td>
            <td>数值</td>
            <td><code>number</code></td>
          </tr>
          <tr>
            <td><code>color</code></td>
            <td>单项颜色（可选），优先级高于全局 <code>:colors</code> 调色盘。可混用：未设置 color 的项使用 :colors 兜底</td>
            <td><code>string</code></td>
          </tr>
          <tr>
            <td><code>[key: string]</code></td>
            <td>任意自定义字段，不参与绘制，下钻时通过 extra 取出</td>
            <td><code>any</code></td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyChart from '@/components/xly-chart/index.vue'
import XlyCard from '@/components/xly-card/index.vue'

// ===== 折线图数据 =====
const monthLabels = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]

const lineSeries = [
  { name: 'UV', data: [1200, 1800, 1400, 2100, 2600, 2300, 2900, 3100, 2700, 3400, 3200, 3800] },
  { name: 'PV', data: [4200, 5800, 4700, 6500, 7200, 6800, 8100, 8600, 7500, 9200, 8900, 10500] },
]

const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const stockSeries = [
  { name: '股票A', data: [148.2, 152.4, 149.8, 155.6, 153.2, 158.0, 161.5], color: '#3b82f6' },
  { name: '股票B', data: [92.1, 89.5, 93.8, 91.2, 95.6, 97.3, 94.0], color: '#ef4444' },
]

const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const singleSeries = [{ name: '新增用户', data: [120, 145, 98, 160, 132, 178, 156] }]

// ===== 柱状图数据 =====
const quarterLabels = ['Q1', 'Q2', 'Q3', 'Q4']

const barSeries = [
  { name: '产品A', data: [120, 145, 98, 176] },
  { name: '产品B', data: [90, 108, 115, 142] },
  { name: '产品C', data: [60, 88, 70, 95] },
]

// 自定义单柱颜色示例
const coloredBarSeries = [
  {
    name: '产品A',
    data: [120, 145, 98, 176],
    colors: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
  },
  {
    name: '产品B',
    data: [90, 108, 115, 142],
    color: '#a78bfa',
  },
]

// ===== 折柱混用数据 =====
const mixedLabels = ['1月', '2月', '3月', '4月', '5月', '6月']
const mixedSeries = [
  { name: '线下销售额', data: [1200, 1400, 980, 1650, 1800, 2100], chartType: 'bar' as const },
  { name: '线上销售额', data: [800, 1050, 760, 1100, 1350, 1600], chartType: 'bar' as const },
  { name: '环比增长率', data: [5.2, 16.7, -7.1, 15.8, 12.3, 18.5], chartType: 'line' as const, color: '#f59e0b' },
]
const mixedSeries2 = [
  { name: '访问量', data: [3200, 4100, 3750, 5200, 4800, 6100], chartType: 'bar' as const, color: '#3b82f6' },
  { name: '转化率', data: [3.2, 3.8, 2.95, 4.6, 4.15, 5.3], chartType: 'line' as const, color: '#10b981' },
]
const mixedSeries3 = [
  { name: '主营收入', data: [8600, 9200, 7800, 10500, 11200, 13000], chartType: 'bar' as const, color: '#6366f1' },
  { name: '其他收入', data: [1200, 1400, 980, 1650, 1800, 2100], chartType: 'bar' as const, color: '#a78bfa' },
  { name: '销售费用率', data: [10, 10, 10, 10, 10, 10], chartType: 'line' as const, color: '#f59e0b' },
  { name: '管理费用率', data: [5, 5, 5, 5, 5, 5], chartType: 'line' as const, color: '#ef4444' },
]

// ===== 折柱混用颜色演示数据 =====
// 方式一：serie.color 统一着色
const mixedColorSeries1 = [
  { name: '线下销售', data: [1200, 1400, 980, 1650, 1800, 2100], chartType: 'bar' as const, color: '#3b82f6' },
  { name: '线上销售', data: [800, 1050, 760, 1100, 1350, 1600], chartType: 'bar' as const, color: '#10b981' },
  { name: '增长率', data: [5.2, 16.7, -7.1, 15.8, 12.3, 18.5], chartType: 'line' as const, color: '#f59e0b' },
]
// 方式二：serie.colors 逐柱着色（3月跌标红，6月达标标绿）
const mixedColorSeries2 = [
  {
    name: '月销售额',
    data: [1200, 1400, 980, 1650, 1800, 2100],
    chartType: 'bar' as const,
    colors: ['#3b82f6', '#3b82f6', '#ef4444', '#3b82f6', '#3b82f6', '#10b981'],
  },
  { name: '增长率', data: [5.2, 16.7, -7.1, 15.8, 12.3, 18.5], chartType: 'line' as const, color: '#f59e0b' },
]
// 方式三：:colors 全局调色盘（series 不单独设 color，由 :colors 统一分配）
const mixedColorSeries3 = [
  { name: '线下销售', data: [1200, 1400, 980, 1650, 1800, 2100], chartType: 'bar' as const },
  { name: '线上销售', data: [800, 1050, 760, 1100, 1350, 1600], chartType: 'bar' as const },
  { name: '增长率', data: [5.2, 16.7, -7.1, 15.8, 12.3, 18.5], chartType: 'line' as const },
]

// 堆叠柱状图示例
const stackLabels = ['1月', '2月', '3月', '4月', '5月', '6月']
const stackSeries = [
  { name: '线下门店', data: [320, 290, 350, 380, 420, 390] },
  { name: '电商平台', data: [180, 210, 240, 260, 300, 280] },
  { name: '私域流量', data: [80, 95, 110, 130, 150, 140] },
]

// 统一设置每层颜色：在 series 的每项里设置 color
const stackSeriesColored = [
  { name: '线下门店', color: '#f97316', data: [320, 290, 350, 380, 420, 390] },
  { name: '电商平台', color: '#06b6d4', data: [180, 210, 240, 260, 300, 280] },
  { name: '私域流量', color: '#a78bfa', data: [80, 95, 110, 130, 150, 140] },
]

// 单柱每层颜色：stackColors[dataIdx][serieIdx]，将第3根柱子（索引2）的各层高亮
const stackHighlightColors: string[][] = [
  [], [], ['#f97316', '#ef4444', '#eab308'], [], [], [],
]

const cityLabels = ['北京', '上海', '广州', '深圳', '杭州', '成都']

const citySeries = [{ name: 'GMV', data: [512, 476, 328, 394, 256, 218] }]

// ===== 饼图数据 =====
const pieData = [
  { name: '自然搜索', value: 4520 },
  { name: '直接访问', value: 2810 },
  { name: '社交媒体', value: 1950 },
  { name: '付费广告', value: 1200 },
  { name: '其他', value: 520 },
]

const deviceData = [
  { name: '移动端', value: 6200 },
  { name: '桌面端', value: 3800 },
  { name: '平板', value: 1000 },
]

// ===== 环形图数据 =====
const taskData = [
  { name: '已完成', value: 72 },
  { name: '进行中', value: 18 },
  { name: '待处理', value: 10 },
]

const budgetData = [
  { name: '研发', value: 8600 },
  { name: '市场', value: 5400 },
  { name: '运营', value: 3200 },
  { name: '其他', value: 1400 },
]

// ===== 饼图自定义颜色数据 =====
const budgetPieData = [
  { name: '研发', value: 8600 },
  { name: '市场', value: 5400 },
  { name: '运营', value: 3200 },
  { name: '行政', value: 1800 },
]
const orderStatusData = [
  { name: '已完成', value: 340, color: '#10b981' },
  { name: '待支付', value: 128, color: '#f59e0b' },
  { name: '已取消', value: 56, color: '#ef4444' },
  { name: '退款中', value: 23, color: '#8b5cf6' },
]

// ===== 收入格式化 =====
const revenueSeries = [
  {
    name: '收入',
    data: [
      128000, 165000, 142000, 198000, 234000, 218000, 276000, 290000, 258000, 312000, 298000,
      358000,
    ],
  },
]

function currencyFormatter(val: number): string {
  if (val >= 10000) return '¥' + (val / 10000).toFixed(0) + 'w'
  return '¥' + val.toLocaleString()
}

// ===== 漏斗图数据 =====
const funnelData = [
  { name: '曝光量', value: 50000 },
  { name: '点击量', value: 32000 },
  { name: '注册数', value: 18000 },
  { name: '激活数', value: 9000 },
  { name: '付款数', value: 3500 },
]

const salesFunnelData = [
  { name: '潜在客户', value: 1200 },
  { name: '意向客户', value: 760 },
  { name: '商务谈判', value: 420 },
  { name: '合同签署', value: 210 },
  { name: '成功交付', value: 98 },
]

const mixedFunnelData = [
  { name: '曝光量', value: 50000, color: '#3b82f6' },
  { name: '点击量', value: 32000, color: '#06b6d4' },
  { name: '注册数', value: 18000 },
  { name: '激活数', value: 9000 },
  { name: '付款数', value: 3500, color: '#10b981' },
]

// ===== 大数据量拖拽示例 =====
const dailyLabels = Array.from({ length: 365 }, (_, i) => {
  const d = new Date(2025, 0, 1)
  d.setDate(d.getDate() + i)
  return `${d.getMonth() + 1}/${d.getDate()}`
})

function randWalk(len: number, start: number, volatility: number): number[] {
  const arr: number[] = [start]
  for (let i = 1; i < len; i++) {
    arr.push(Math.max(0, arr[i - 1] + (Math.random() - 0.48) * volatility))
  }
  return arr.map((v) => Math.round(v))
}

const dailySeries = [
  { name: 'UV', data: randWalk(365, 8000, 600), color: '#3b82f6' },
  { name: 'PV', data: randWalk(365, 22000, 1400), color: '#10b981' },
]

const weeklyLabels = Array.from({ length: 60 }, (_, i) => `W${i + 1}`)
const weeklySeries = [
  { name: '华北', data: randWalk(60, 420, 50), color: '#3b82f6' },
  { name: '华南', data: randWalk(60, 360, 45), color: '#f59e0b' },
  { name: '华东', data: randWalk(60, 500, 60), color: '#10b981' },
]

// ===== 横向柱状图数据 =====
const hbarLabels = [
  'Walnut Brownie',
  'Lemon Juice',
  'Orange Juice',
  'Tea',
  'Matcha Cocoa',
  'Cheese Brownie',
  'Cheese Cocoa',
  'Milk Tea',
  'Matcha Latte',
]
const hbarSeries = [
  {
    name: '销售额',
    data: [18000, 105000, 88000, 78000, 22000, 17000, 45000, 80000, 52000],
    color: '#3b82f6',
  },
]

// ===== 横向柱状图自定义颜色数据 =====
const hbarColorLabels = ['北京', '上海', '广州', '深圳', '杭州']
const hbarColorSeries = [
  { name: 'Q1', data: [280, 340, 210, 260, 190] },
  { name: 'Q2', data: [310, 370, 240, 290, 220] },
]
const hbarItemColorSeries = [
  {
    name: '销售额',
    data: [105000, 88000, 78000, 45000, 22000, 17000],
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'],
  },
]
function wanFormatter(val: number): string {
  if (val >= 10000) return (val / 10000).toFixed(1) + 'w'
  return String(val)
}

// ===== 下钻事件 =====
const drillLog = ref('')
function onDrill(payload: {
  type: string
  label: string
  value: number
  seriesName?: string
  index: number
  extra?: Record<string, any>
}) {
  drillLog.value = JSON.stringify(payload)
  setTimeout(() => {
    drillLog.value = ''
  }, 3000)
}
</script>

<style scoped lang="scss">
.chart-doc {
  max-width: 960px;
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
  b {
    color: #4a4a6a;
    font-weight: 600;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.doc-preview__body {
  padding: 24px;
  background: #fff;
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
  td:first-child {
    white-space: nowrap;
  }
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
  small {
    font-size: 12px;
  }
}

// 双列图表
.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
}
.chart-col {
  min-width: 0;
}

// 下钻日志提示
.drill-log {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #166534;
  animation: fade-in 0.2s ease;
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 11px;
  }
}
.drill-tag {
  background: #10b981;
  color: #fff;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
