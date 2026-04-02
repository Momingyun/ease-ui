<template>
  <div class="china-map-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">ChinaMap 中国地图</h1>
      <p class="doc-desc">
        基于 SVG 原生实现的中国地图可视化组件，支持省份数据着色、气泡展示、Tooltip 悬浮、点击事件等功能，零依赖、开箱即用。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>data</code> 数组（包含省份名称和数值），地图自动按数值区间填充颜色，悬浮省份显示 Tooltip。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="2025年各省份 GDP 总量"
            subtitle="单位：亿元"
            :data="gdpData"
            :height="680"
            value-label="GDP"
            legend-title="GDP（亿元）"
            @click="handleClick"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  title="2025年各省份 GDP 总量"
  subtitle="单位：亿元"
  :data="[
    { name: '广东', value: 135673 },
    { name: '江苏', value: 128222 },
    { name: '山东', value: 92069 },
    // ...
  ]"
  :height="680"
  value-label="GDP"
  legend-title="GDP（亿元）"
  @click="handleClick"
/&gt;</code></pre>
        </div>
      </div>
      <div v-if="clickResult" class="doc-result">
        <span class="doc-result__label">点击省份：</span>
        <code>{{ clickResult }}</code>
      </div>
    </section>

    <!-- 多组数据对比 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多组数据对比</h2>
      <p class="doc-section__desc">
        支持传入多组数据集，通过 <code>tooltip-mode</code> 属性切换展示方式：
        <br>
        • <code>compare</code>（默认）- 悬浮省份时 Tooltip 同时展示所有数据，直观对比
        <br>
        • <code>switch</code> - 通过 Tab 切换数据集，Tooltip 只显示当前数据
      </p>

      <!-- 对比模式 -->
      <h3 class="doc-section__subtitle">对比模式（tooltip-mode="compare"）</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="省份 GDP 对比"
            subtitle="单位：亿元 | Tooltip 同时展示所有年份数据"
            :data="multiYearData"
            :height="420"
            tooltip-mode="compare"
            value-label="GDP"
            legend-title="GDP（亿元）"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="multiYearData"
  tooltip-mode="compare"  // 默认值，Tooltip 同时展示所有数据
/&gt;</code></pre>
        </div>
      </div>

      <!-- 切换模式 -->
      <h3 class="doc-section__subtitle">切换模式（tooltip-mode="switch"）</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="省份 GDP 切换"
            subtitle="单位：亿元 | 点击 Tab 切换数据集"
            :data="multiYearData"
            :height="420"
            tooltip-mode="switch"
            value-label="GDP"
            legend-title="GDP（亿元）"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="multiYearData"
  tooltip-mode="switch"  // Tab 切换模式
/&gt;</code></pre>
        </div>
      </div>

      <!-- 数据格式说明 -->
      <details class="doc-details">
        <summary>数据格式</summary>
        <pre><code>const data: MapDataSet[] = [
  {
    name: '2023年',
    data: [
      { name: '广东', value: 129119 },
      { name: '江苏', value: 122876 },
      // ...
    ],
    colorRange: ['#dbeafe', '#1d4ed8'],  // 可选：自定义颜色
  },
  {
    name: '2024年',
    data: [
      { name: '广东', value: 135673 },
      { name: '江苏', value: 128222 },
      // ...
    ],
    colorRange: ['#dcfce7', '#15803d'],
  },
]</code></pre>
      </details>
    </section>

    <!-- 标签模式切换 -->
    <section class="doc-section">
      <h2 class="doc-section__title">标签模式切换</h2>
      <p class="doc-section__desc">
        通过 <code>label-mode</code> 属性切换省份名称显示模式：<code>short</code> 显示简称（如"粤"），<code>full</code> 显示完整名称（如"广东省"）。
        简称更适合小尺寸地图，完整名称更适合大尺寸或需要明确标识的场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="mode-switch">
            <span class="mode-switch__label">标签模式：</span>
            <button
              class="mode-switch__btn"
              :class="{ 'is-active': labelMode === 'short' }"
              @click="labelMode = 'short'"
            >简称</button>
            <button
              class="mode-switch__btn"
              :class="{ 'is-active': labelMode === 'full' }"
              @click="labelMode = 'full'"
            >全称</button>
          </div>
          <XlyChinaMap
            :title="labelMode === 'short' ? '简称模式 — 简洁清晰' : '全称模式 — 信息完整'"
            :data="gdpData"
            :height="420"
            :label-mode="labelMode"
            value-label="GDP"
            legend-title="GDP（亿元）"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="gdpData"
  :height="420"
  :label-mode="labelMode"  // 'short' | 'full'
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色范围</h2>
      <p class="doc-section__desc">
        通过 <code>color-range</code> 属性自定义颜色渐变区间 <code>[最小色, 最大色]</code>，
        通过 <code>empty-color</code> 设置无数据省份的填充色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="map-row">
            <div class="map-item">
              <XlyChinaMap
                title="绿色系 — 用户覆盖率"
                :data="coverageData"
                :height="320"
                :color-range="['#d1fae5', '#065f46']"
                empty-color="#f1f5f9"
                value-label="覆盖率"
                legend-title="覆盖率（%）"
              />
            </div>
            <div class="map-item">
              <XlyChinaMap
                title="橙红系 — 投诉数量"
                :data="complaintData"
                :height="320"
                :color-range="['#fef3c7', '#b45309']"
                empty-color="#f1f5f9"
                value-label="投诉量"
                legend-title="投诉数（件）"
              />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 绿色系 --&gt;
&lt;XlyChinaMap
  :color-range="['#d1fae5', '#065f46']"
  empty-color="#f1f5f9"
/&gt;

&lt;!-- 橙红系 --&gt;
&lt;XlyChinaMap
  :color-range="['#fef3c7', '#b45309']"
  empty-color="#f1f5f9"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 气泡模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">气泡模式</h2>
      <p class="doc-section__desc">
        设置 <code>show-bubble</code> 可在各省份中心叠加气泡圆圈，气泡大小按数值比例缩放，适合展示点数据分布。
        通过 <code>bubble-color</code> 自定义气泡颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="各省份活跃用户分布"
            subtitle="气泡大小代表活跃用户量"
            :data="userCountData"
            :height="460"
            :show-bubble="true"
            bubble-color="#6366f1"
            :color-range="['#ede9fe', '#ede9fe']"
            empty-color="#f1f5f9"
            value-label="活跃用户"
            legend-title="活跃用户（万）"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="data"
  :show-bubble="true"
  bubble-color="#6366f1"
  :color-range="['#ede9fe', '#ede9fe']"
  value-label="活跃用户"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不显示标签 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏省份名称</h2>
      <p class="doc-section__desc">
        设置 <code>:show-label="false"</code> 隐藏省份名称文字，地图更加简洁。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="极简风格"
            :data="gdpData"
            :height="400"
            :show-label="false"
            :color-range="['#e0e7ff', '#4338ca']"
            value-label="数值"
            legend-title="数值"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="data"
  :show-label="false"
  :color-range="['#e0e7ff', '#4338ca']"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 缩放功能 -->
    <section class="doc-section">
      <h2 class="doc-section__title">缩放与平移</h2>
      <p class="doc-section__desc">
        地图默认支持滚轮缩放和鼠标拖拽平移，通过左下角的缩放控制按钮可精确调整。
        设置 <code>:zoomable="false"</code> 可禁用缩放功能。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="支持缩放平移"
            subtitle="滚轮缩放 / 拖拽平移 / 左下角按钮"
            :data="gdpData"
            :height="420"
            value-label="GDP"
            legend-title="GDP（亿元）"
            @click="handleClick"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="data"
  :height="420"
  :zoomable="true"
  :min-scale="0.5"
  :max-scale="4"
  @click="handleClick"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 无数据状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">无数据状态</h2>
      <p class="doc-section__desc">
        当 <code>data</code> 为空数组时，所有省份使用 <code>empty-color</code> 颜色填充，适合作为地图底图使用。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyChinaMap
            title="全国地图底图"
            :data="[]"
            :height="380"
            empty-color="#dbeafe"
            stroke-color="#93c5fd"
            :show-legend="false"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyChinaMap
  :data="[]"
  empty-color="#dbeafe"
  stroke-color="#93c5fd"
  :show-legend="false"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Props</h2>
      <div class="doc-preview">
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
            <tr><td>data</td><td>地图数据列表</td><td>MapDataItem[]</td><td>[]</td></tr>
            <tr><td>title</td><td>图表标题</td><td>string</td><td>—</td></tr>
            <tr><td>subtitle</td><td>图表副标题</td><td>string</td><td>—</td></tr>
            <tr><td>width</td><td>组件宽度</td><td>number / string</td><td>'100%'</td></tr>
            <tr><td>height</td><td>组件高度</td><td>number / string</td><td>520</td></tr>
            <tr><td>color-range</td><td>颜色渐变范围 [最小色, 最大色]</td><td>[string, string]</td><td>['#bfdbfe', '#1d4ed8']</td></tr>
            <tr><td>empty-color</td><td>无数据省份填充色</td><td>string</td><td>'#e2e8f0'</td></tr>
            <tr><td>stroke-color</td><td>省份描边颜色</td><td>string</td><td>'#ffffff'</td></tr>
            <tr><td>stroke-width</td><td>省份描边宽度</td><td>number</td><td>0.8</td></tr>
            <tr><td>show-label</td><td>是否显示省份名称</td><td>boolean</td><td>true</td></tr>
            <tr><td>label-mode</td><td>标签模式：short 显示简称，full 显示完整名称</td><td>'short' / 'full'</td><td>'short'</td></tr>
            <tr><td>show-legend</td><td>是否显示图例</td><td>boolean</td><td>true</td></tr>
            <tr><td>legend-title</td><td>图例标题</td><td>string</td><td>'数值'</td></tr>
            <tr><td>value-label</td><td>Tooltip 数值标签</td><td>string</td><td>'数值'</td></tr>
            <tr><td>show-bubble</td><td>是否显示气泡</td><td>boolean</td><td>false</td></tr>
            <tr><td>bubble-color</td><td>气泡颜色</td><td>string</td><td>'#ef4444'</td></tr>
            <tr><td>active-province</td><td>激活高亮的省份名称</td><td>string</td><td>—</td></tr>
            <tr><td>zoomable</td><td>是否启用缩放平移功能</td><td>boolean</td><td>true</td></tr>
            <tr><td>min-scale</td><td>最小缩放比例</td><td>number</td><td>0.5</td></tr>
            <tr><td>max-scale</td><td>最大缩放比例</td><td>number</td><td>4</td></tr>
            <tr><td>tooltip-mode</td><td>Tooltip 展示模式：compare 同时展示所有数据，switch Tab 切换模式</td><td>'compare' / 'switch'</td><td>'compare'</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 事件 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Events</h2>
      <div class="doc-preview">
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
              <td>click</td>
              <td>点击省份时触发</td>
              <td>(province: string, data: MapDataItem | null)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 数据类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">MapDataItem 数据结构</h2>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none; border-radius: 12px;">
          <pre><code>interface MapDataItem {
  name: string    // 省份名称（支持全称，如"广东"/"广东省"均可）
  value: number   // 数值
  label?: string  // 自定义 Tooltip 标签（不填则使用 value-label 属性）
  extra?: string  // 额外信息（暂保留扩展）
}</code></pre>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyChinaMap from '@/components/xly-china-map/index.vue'
import type { MapDataItem, MapDataSet } from '@/components/xly-china-map/index.vue'

// ===== 标签模式 =====
const labelMode = ref<'short' | 'full'>('short')

// ===== 点击结果 =====
const clickResult = ref('')

function handleClick(province: string, data: MapDataItem | null) {
  if (data) {
    clickResult.value = `${province}：${data.value.toLocaleString()}`
  } else {
    clickResult.value = `${province}：暂无数据`
  }
}

// ===== GDP 数据 =====
const gdpData: MapDataItem[] = [
  { name: '广东', value: 135673 },
  { name: '江苏', value: 128222 },
  { name: '山东', value: 92069 },
  { name: '浙江', value: 82553 },
  { name: '河南', value: 61345 },
  { name: '四川', value: 60132 },
  { name: '湖北', value: 55803 },
  { name: '福建', value: 54355 },
  { name: '湖南', value: 50012 },
  { name: '上海', value: 47218 },
  { name: '北京', value: 43760 },
  { name: '安徽', value: 46012 },
  { name: '河北', value: 42592 },
  { name: '陕西', value: 33786 },
  { name: '江西', value: 32863 },
  { name: '重庆', value: 30145 },
  { name: '辽宁', value: 29819 },
  { name: '云南', value: 29455 },
  { name: '广西', value: 26612 },
  { name: '内蒙古', value: 24680 },
  { name: '贵州', value: 21020 },
  { name: '山西', value: 25768 },
  { name: '天津', value: 16745 },
  { name: '黑龙江', value: 15901 },
  { name: '吉林', value: 13455 },
  { name: '新疆', value: 19126 },
  { name: '甘肃', value: 11552 },
  { name: '宁夏', value: 5315 },
  { name: '青海', value: 3799 },
  { name: '西藏', value: 2392 },
  { name: '海南', value: 7551 },
  { name: '台湾', value: 48500 },
  { name: '香港', value: 28000 },
  { name: '澳门', value: 4500 },
]

// ===== 用户覆盖率数据 =====
const coverageData: MapDataItem[] = [
  { name: '广东', value: 92 },
  { name: '江苏', value: 89 },
  { name: '浙江', value: 91 },
  { name: '上海', value: 95 },
  { name: '北京', value: 94 },
  { name: '天津', value: 88 },
  { name: '山东', value: 82 },
  { name: '河南', value: 74 },
  { name: '湖北', value: 78 },
  { name: '四川', value: 72 },
  { name: '重庆', value: 76 },
  { name: '陕西', value: 68 },
  { name: '福建', value: 85 },
  { name: '安徽', value: 70 },
  { name: '湖南', value: 73 },
  { name: '江西', value: 65 },
  { name: '辽宁', value: 75 },
  { name: '吉林', value: 62 },
  { name: '黑龙江', value: 58 },
  { name: '广西', value: 61 },
  { name: '云南', value: 55 },
  { name: '贵州', value: 50 },
  { name: '山西', value: 64 },
  { name: '河北', value: 72 },
  { name: '内蒙古', value: 48 },
  { name: '甘肃', value: 42 },
  { name: '宁夏', value: 52 },
  { name: '新疆', value: 45 },
  { name: '青海', value: 38 },
  { name: '西藏', value: 28 },
  { name: '海南', value: 80 },
]

// ===== 投诉数据 =====
const complaintData: MapDataItem[] = [
  { name: '广东', value: 8520 },
  { name: '北京', value: 5230 },
  { name: '上海', value: 4860 },
  { name: '江苏', value: 3920 },
  { name: '浙江', value: 3540 },
  { name: '山东', value: 2980 },
  { name: '河南', value: 2560 },
  { name: '四川', value: 2340 },
  { name: '湖北', value: 1980 },
  { name: '重庆', value: 1760 },
  { name: '福建', value: 1650 },
  { name: '安徽', value: 1420 },
  { name: '湖南', value: 1380 },
  { name: '陕西', value: 1250 },
  { name: '辽宁', value: 1180 },
]

// ===== 活跃用户数据 =====
const userCountData: MapDataItem[] = [
  { name: '广东', value: 3560, label: '活跃用户' },
  { name: '江苏', value: 2980, label: '活跃用户' },
  { name: '浙江', value: 2640, label: '活跃用户' },
  { name: '山东', value: 2320, label: '活跃用户' },
  { name: '上海', value: 2180, label: '活跃用户' },
  { name: '北京', value: 2050, label: '活跃用户' },
  { name: '河南', value: 1860, label: '活跃用户' },
  { name: '四川', value: 1720, label: '活跃用户' },
  { name: '湖北', value: 1540, label: '活跃用户' },
  { name: '福建', value: 1380, label: '活跃用户' },
  { name: '湖南', value: 1260, label: '活跃用户' },
  { name: '安徽', value: 1180, label: '活跃用户' },
  { name: '重庆', value: 1050, label: '活跃用户' },
  { name: '陕西', value: 920, label: '活跃用户' },
  { name: '辽宁', value: 860, label: '活跃用户' },
  { name: '江西', value: 780, label: '活跃用户' },
  { name: '广西', value: 720, label: '活跃用户' },
  { name: '云南', value: 650, label: '活跃用户' },
  { name: '贵州', value: 580, label: '活跃用户' },
  { name: '天津', value: 960, label: '活跃用户' },
  { name: '山西', value: 540, label: '活跃用户' },
  { name: '河北', value: 880, label: '活跃用户' },
  { name: '吉林', value: 480, label: '活跃用户' },
  { name: '黑龙江', value: 420, label: '活跃用户' },
  { name: '内蒙古', value: 380, label: '活跃用户' },
  { name: '海南', value: 340, label: '活跃用户' },
  { name: '新疆', value: 300, label: '活跃用户' },
  { name: '甘肃', value: 260, label: '活跃用户' },
  { name: '宁夏', value: 180, label: '活跃用户' },
  { name: '青海', value: 140, label: '活跃用户' },
  { name: '西藏', value: 80, label: '活跃用户' },
]

// ===== 多组数据切换（年份对比示例） =====
const multiYearData: MapDataSet[] = [
  {
    name: '2023年',
    data: [
      { name: '广东', value: 129119 },
      { name: '江苏', value: 122876 },
      { name: '山东', value: 87435 },
      { name: '浙江', value: 77715 },
      { name: '河南', value: 58887 },
      { name: '四川', value: 56700 },
      { name: '湖北', value: 53734 },
      { name: '福建', value: 53100 },
      { name: '湖南', value: 48670 },
      { name: '上海', value: 44652 },
      { name: '北京', value: 43760 },
      { name: '安徽', value: 42704 },
      { name: '河北', value: 40103 },
    ],
    colorRange: ['#dbeafe', '#1d4ed8'],
  },
  {
    name: '2024年',
    data: [
      { name: '广东', value: 135673 },
      { name: '江苏', value: 128222 },
      { name: '山东', value: 92069 },
      { name: '浙江', value: 82553 },
      { name: '河南', value: 61345 },
      { name: '四川', value: 60132 },
      { name: '湖北', value: 55803 },
      { name: '福建', value: 54355 },
      { name: '湖南', value: 50012 },
      { name: '上海', value: 47218 },
      { name: '北京', value: 43760 },
      { name: '安徽', value: 46012 },
      { name: '河北', value: 42592 },
    ],
    colorRange: ['#dcfce7', '#15803d'],
  },
]
</script>

<style scoped lang="scss">
.china-map-doc {
  padding: 8px 0 40px;

  .doc-header {
    margin-bottom: 36px;

    .doc-title {
      font-size: 26px;
      font-weight: 700;
      color: #1a1a2e;
      letter-spacing: -0.3px;
      margin: 0 0 8px;
    }

    .doc-desc {
      font-size: 14px;
      color: #8e8ea0;
      margin: 0;
      line-height: 1.6;
    }
  }

  .doc-section {
    margin-bottom: 32px;

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
      padding-bottom: 10px;
      border-bottom: 1px solid #f2f3f7;
      margin: 0 0 16px;
    }

    &__subtitle {
      font-size: 14px;
      font-weight: 600;
      color: #4b5563;
      margin: 20px 0 12px;
    }

    &__desc {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 14px;
      line-height: 1.6;

      code {
        background: #f3f4f6;
        color: #6366f1;
        border-radius: 4px;
        padding: 1px 5px;
        font-size: 13px;
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .doc-preview {
    border: 1px solid #f2f3f7;
    border-radius: 12px;
    overflow: hidden;

    &__body {
      padding: 24px;
      background: #fff;
    }
  }

  .doc-code {
    background: #fafbfd;
    border-top: 1px solid #f2f3f7;
    padding: 14px 18px;

    pre {
      margin: 0;
      overflow-x: auto;

      code {
        font-size: 12.5px;
        color: #4a4a6a;
        font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
        line-height: 1.6;
        white-space: pre;
      }
    }
  }

  .doc-result {
    margin-top: 10px;
    font-size: 13px;
    color: #6b7280;

    &__label {
      font-weight: 500;
      margin-right: 6px;
    }

    code {
      background: #f3f4f6;
      color: #6366f1;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 13px;
    }
  }

  .map-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .mode-switch {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    &__label {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }

    &__btn {
      padding: 5px 14px;
      border: 1px solid #e5e7eb;
      background: #fff;
      border-radius: 6px;
      font-size: 13px;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #6366f1;
        color: #6366f1;
      }

      &.is-active {
        background: #6366f1;
        border-color: #6366f1;
        color: #fff;
      }
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
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid #f2f3f7;
    }

    td {
      color: #4a4a6a;
      padding: 10px 14px;
      border-bottom: 1px solid #f9fafb;
      vertical-align: top;
      line-height: 1.5;

      &:first-child {
        font-family: 'Fira Code', monospace;
        color: #6366f1;
        font-size: 12.5px;
      }
    }

    tr:last-child td {
      border-bottom: none;
    }
  }

  .doc-details {
    margin-top: 16px;
    background: #fafbfd;
    border: 1px solid #f2f3f7;
    border-radius: 8px;
    overflow: hidden;

    summary {
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 500;
      color: #6366f1;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: #f0f1f5;
      }
    }

    pre {
      margin: 0;
      padding: 14px;
      border-top: 1px solid #f2f3f7;
      overflow-x: auto;

      code {
        font-size: 12px;
        color: #4a4a6a;
        font-family: 'Fira Code', monospace;
        line-height: 1.5;
      }
    }
  }
}
</style>
