<template>
  <div class="tour-doc">
    <div class="doc-header">
      <h1 class="doc-title">操作引导 Tour</h1>
      <p class="doc-desc">用于引导用户了解页面功能，支持高亮目标元素、步骤导航、自定义位置和主题色。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>v-model</code> 控制引导显示，配置 <code>steps</code> 定义引导步骤。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="tour-demo-area">
            <div ref="demo1Target" class="tour-demo-box tour-demo-box--blue">
              <span class="tour-demo-box__number">1</span>
              <span class="tour-demo-box__text">数据概览</span>
            </div>
            <div ref="demo2Target" class="tour-demo-box tour-demo-box--green">
              <span class="tour-demo-box__number">2</span>
              <span class="tour-demo-box__text">功能入口</span>
            </div>
            <div ref="demo3Target" class="tour-demo-box tour-demo-box--orange">
              <span class="tour-demo-box__number">3</span>
              <span class="tour-demo-box__text">快捷操作</span>
            </div>
          </div>
          <div class="demo-actions">
            <button class="demo-btn demo-btn--primary" @click="startBasicTour">
              开始引导
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;template&gt;
  &lt;div ref="step1Target"&gt;目标元素 1&lt;/div&gt;
  &lt;div ref="step2Target"&gt;目标元素 2&lt;/div&gt;
  &lt;div ref="step3Target"&gt;目标元素 3&lt;/div&gt;

  &lt;XlyTour
    v-model="tourVisible"
    :steps="[
      { target: step1Target, title: '第一步', description: '这里是数据概览区域' },
      { target: step2Target, title: '第二步', description: '这里是功能入口' },
      { target: step3Target, title: '第三步', description: '这里是快捷操作' }
    ]"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">气泡位置</h2>
      <p class="doc-section__desc">通过 <code>placement</code> 属性控制气泡出现位置，支持 top / bottom / left / right 四个方向，空间不足时自动翻转。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="placement-demo">
            <div class="placement-demo__area">
              <div ref="placeTopTarget" class="tour-demo-box tour-demo-box--purple" style="align-self: flex-start;">
                <span class="tour-demo-box__text">上方气泡</span>
              </div>
              <div class="placement-demo__row">
                <div ref="placeLeftTarget" class="tour-demo-box tour-demo-box--cyan" style="align-self: flex-start;">
                  <span class="tour-demo-box__text">左方气泡</span>
                </div>
                <div class="placement-demo__spacer"></div>
                <div ref="placeRightTarget" class="tour-demo-box tour-demo-box--pink" style="align-self: flex-end;">
                  <span class="tour-demo-box__text">右方气泡</span>
                </div>
              </div>
              <div ref="placeBottomTarget" class="tour-demo-box tour-demo-box--amber" style="align-self: flex-end;">
                <span class="tour-demo-box__text">下方气泡</span>
              </div>
            </div>
          </div>
          <div class="demo-actions">
            <button class="demo-btn demo-btn--primary" @click="startPlacementTour">
              开始引导
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTour
  :steps="[
    { target: el, title: '上方', placement: 'top', description: '气泡在目标上方' },
    { target: el, title: '下方', placement: 'bottom', description: '气泡在目标下方' },
    { target: el, title: '左方', placement: 'left', description: '气泡在目标左侧' },
    { target: el, title: '右方', placement: 'right', description: '气泡在目标右侧' }
  ]"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义主题 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义主题</h2>
      <p class="doc-section__desc">通过 <code>color</code> 属性自定义主题色，影响按钮和步骤索引。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="color-demo-area">
            <div ref="colorTarget1" class="tour-demo-box tour-demo-box--green">
              <span class="tour-demo-box__text">绿色主题</span>
            </div>
            <div ref="colorTarget2" class="tour-demo-box tour-demo-box--orange">
              <span class="tour-demo-box__text">橙色主题</span>
            </div>
          </div>
          <div class="demo-actions">
            <button class="demo-btn demo-btn--primary" @click="startColorTour">
              开始引导
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTour
  v-model="visible"
  color="#10b981"
  :steps="steps"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 命令式调用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">命令式调用</h2>
      <p class="doc-section__desc">通过 <code>xly.$tour</code> 快速启动引导，无需在模板中写组件。统一入口：<code>import { xly } from '@/utils/xly'</code></p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="imperative-demo">
            <div class="imperative-boxes">
              <div ref="impTarget1" class="tour-demo-box tour-demo-box--blue">
                <span class="tour-demo-box__number">A</span>
                <span class="tour-demo-box__text">第一步目标</span>
              </div>
              <div ref="impTarget2" class="tour-demo-box tour-demo-box--green">
                <span class="tour-demo-box__number">B</span>
                <span class="tour-demo-box__text">第二步目标</span>
              </div>
            </div>
          </div>
          <div class="demo-actions">
            <button class="demo-btn demo-btn--primary" @click="startImperativeTour">
              命令式引导
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>import { xly } from '@/utils/xly'

// 命令式启动引导
xly.$tour({
  steps: [
    { target: '#my-element', title: '标题', description: '描述文本' },
    { target: '.another-element', title: '第二步', description: '更多说明' }
  ],
  color: '#4f6ef7'
})</code></pre>
        </div>
      </div>
    </section>

    <!-- 无遮罩模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">无遮罩模式</h2>
      <p class="doc-section__desc">设置 <code>:mask="false"</code> 可关闭遮罩高亮，适用于轻量提示场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div ref="noMaskTarget" class="tour-demo-box tour-demo-box--blue">
            <span class="tour-demo-box__text">无遮罩引导</span>
          </div>
          <button class="demo-btn demo-btn--primary" @click="startNoMaskTour">
            开始引导
          </button>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyTour v-model="visible" :mask="false" :steps="steps" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Attributes</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>v-model / modelValue</td>
              <td>是否显示引导</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>steps</td>
              <td>引导步骤列表</td>
              <td>TourStep[]</td>
              <td>—</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>placement</td>
              <td>默认气泡位置</td>
              <td>string</td>
              <td>top / bottom / left / right</td>
              <td>bottom</td>
            </tr>
            <tr>
              <td>gap</td>
              <td>气泡与目标间距 (px)</td>
              <td>number</td>
              <td>—</td>
              <td>12</td>
            </tr>
            <tr>
              <td>mask</td>
              <td>是否显示遮罩</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>maskColor</td>
              <td>遮罩颜色</td>
              <td>string</td>
              <td>—</td>
              <td>rgba(0,0,0,0.45)</td>
            </tr>
            <tr>
              <td>arrow</td>
              <td>是否显示箭头</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>closeBtn</td>
              <td>是否显示关闭按钮</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>showIndex</td>
              <td>是否显示步骤索引</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>prevBtn</td>
              <td>是否显示上一步按钮</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>nextText</td>
              <td>"下一步"按钮文字</td>
              <td>string</td>
              <td>—</td>
              <td>下一步</td>
            </tr>
            <tr>
              <td>prevText</td>
              <td>"上一步"按钮文字</td>
              <td>string</td>
              <td>—</td>
              <td>上一步</td>
            </tr>
            <tr>
              <td>finishText</td>
              <td>"完成"按钮文字</td>
              <td>string</td>
              <td>—</td>
              <td>完成</td>
            </tr>
            <tr>
              <td>color</td>
              <td>主题色</td>
              <td>string</td>
              <td>—</td>
              <td>#4f6ef7</td>
            </tr>
            <tr>
              <td>maxWidth</td>
              <td>气泡最大宽度</td>
              <td>number / string</td>
              <td>—</td>
              <td>360</td>
            </tr>
            <tr>
              <td>startStep</td>
              <td>起始步骤 (0-indexed)</td>
              <td>number</td>
              <td>—</td>
              <td>0</td>
            </tr>
            <tr>
              <td>closeOnOverlay</td>
              <td>点击遮罩是否关闭</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>scrollIntoView</td>
              <td>自动滚动到目标元素</td>
              <td>boolean</td>
              <td>—</td>
              <td>true</td>
            </tr>
            <tr>
              <td>zIndex</td>
              <td>z-index</td>
              <td>number</td>
              <td>—</td>
              <td>9000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TourStep 配置</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>target</td>
              <td>目标元素选择器或 DOM 元素</td>
              <td>string | HTMLElement</td>
              <td>必填</td>
            </tr>
            <tr>
              <td>title</td>
              <td>标题</td>
              <td>string</td>
              <td>—</td>
            </tr>
            <tr>
              <td>description</td>
              <td>描述文本</td>
              <td>string</td>
              <td>—</td>
            </tr>
            <tr>
              <td>placement</td>
              <td>气泡位置（可覆盖全局）</td>
              <td>string</td>
              <td>—</td>
            </tr>
            <tr>
              <td>gap</td>
              <td>间距（可覆盖全局）</td>
              <td>number</td>
              <td>—</td>
            </tr>
            <tr>
              <td>highlight</td>
              <td>是否高亮该元素</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>highlightRadius</td>
              <td>高亮圆角（大于 0 则为圆形）</td>
              <td>number</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">命令式 API (xly.$tour)</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
              <th>返回值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$tour</td>
              <td>启动引导</td>
              <td>TourOptions</td>
              <td>TourInstance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">TourInstance 方法</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>start</td>
              <td>开始引导（可指定起始步骤）</td>
              <td>stepIndex?: number</td>
            </tr>
            <tr>
              <td>next</td>
              <td>下一步</td>
              <td>—</td>
            </tr>
            <tr>
              <td>prev</td>
              <td>上一步</td>
              <td>—</td>
            </tr>
            <tr>
              <td>goTo</td>
              <td>跳到指定步骤</td>
              <td>index: number</td>
            </tr>
            <tr>
              <td>finish</td>
              <td>结束引导</td>
              <td>—</td>
            </tr>
            <tr>
              <td>close</td>
              <td>关闭引导</td>
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
              <td>change</td>
              <td>当前步骤变化</td>
              <td>current: number</td>
            </tr>
            <tr>
              <td>finish</td>
              <td>引导完成（最后一步点击完成）</td>
              <td>—</td>
            </tr>
            <tr>
              <td>close</td>
              <td>点击关闭按钮</td>
              <td>—</td>
            </tr>
            <tr>
              <td>skip</td>
              <td>点击遮罩跳过</td>
              <td>—</td>
            </tr>
            <tr>
              <td>next</td>
              <td>点击下一步</td>
              <td>current: number</td>
            </tr>
            <tr>
              <td>prev</td>
              <td>点击上一步</td>
              <td>current: number</td>
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
              <th>作用域参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>default</td>
              <td>自定义描述区域</td>
              <td>{ current, step, total }</td>
            </tr>
            <tr>
              <td>prev</td>
              <td>自定义上一步按钮区域</td>
              <td>{ current, step, total }</td>
            </tr>
            <tr>
              <td>next</td>
              <td>自定义下一步按钮区域</td>
              <td>{ current, step, total }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Tour 组件引用 -->
    <XlyTour
      v-model="basicTourVisible"
      :steps="basicSteps"
      @finish="onTourFinish"
      @change="onTourChange"
    />
    <XlyTour
      v-model="placementTourVisible"
      :steps="placementSteps"
    />
    <XlyTour
      v-model="colorTourVisible"
      :steps="colorSteps"
      :color="tourColor"
    />
    <XlyTour
      v-model="noMaskTourVisible"
      :steps="noMaskSteps"
      :mask="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, createVNode } from 'vue'
import XlyTour from '@/components/xly-tour/index.vue'
import { xly } from '@/utils/xly'

// ==================== 基础用法 ====================
const demo1Target = ref<HTMLElement | null>(null)
const demo2Target = ref<HTMLElement | null>(null)
const demo3Target = ref<HTMLElement | null>(null)
const basicTourVisible = ref(false)

const basicSteps = [
  {
    target: demo1Target,
    title: '数据概览',
    description: '这里展示系统核心数据，包括用户数、订单数、收入等关键指标。'
  },
  {
    target: demo2Target,
    title: '功能入口',
    description: '这里提供常用功能的快捷入口，帮助你快速访问核心功能。'
  },
  {
    target: demo3Target,
    title: '快捷操作',
    description: '这里汇集了常用的快捷操作按钮，提高你的工作效率。'
  }
]

function startBasicTour() {
  basicTourVisible.value = true
}

// ==================== 不同位置 ====================
const placeTopTarget = ref<HTMLElement | null>(null)
const placeBottomTarget = ref<HTMLElement | null>(null)
const placeLeftTarget = ref<HTMLElement | null>(null)
const placeRightTarget = ref<HTMLElement | null>(null)
const placementTourVisible = ref(false)

const placementSteps = [
  {
    target: placeTopTarget,
    title: '上方气泡',
    placement: 'top' as const,
    description: '气泡显示在目标元素的上方。'
  },
  {
    target: placeBottomTarget,
    title: '下方气泡',
    placement: 'bottom' as const,
    description: '气泡显示在目标元素的下方。'
  },
  {
    target: placeLeftTarget,
    title: '左方气泡',
    placement: 'left' as const,
    description: '气泡显示在目标元素的左侧。'
  },
  {
    target: placeRightTarget,
    title: '右方气泡',
    placement: 'right' as const,
    description: '气泡显示在目标元素的右侧。'
  }
]

function startPlacementTour() {
  placementTourVisible.value = true
}

// ==================== 自定义主题 ====================
const colorTarget1 = ref<HTMLElement | null>(null)
const colorTarget2 = ref<HTMLElement | null>(null)
const colorTourVisible = ref(false)
const tourColor = ref('#10b981')

const colorSteps = [
  {
    target: colorTarget1,
    title: '绿色主题',
    description: '使用绿色作为主题色，给人清新、自然的感觉。适合环保、健康类应用。',
    gap: 16
  },
  {
    target: colorTarget2,
    title: '橙色主题',
    description: '使用橙色作为主题色，给人温暖、活力的感觉。适合生活、娱乐类应用。'
  }
]

function startColorTour() {
  tourColor.value = '#10b981'
  colorTourVisible.value = true
}

// ==================== 命令式调用 ====================
const impTarget1 = ref<HTMLElement | null>(null)
const impTarget2 = ref<HTMLElement | null>(null)

function startImperativeTour() {
  xly.$tour({
    steps: [
      {
        target: impTarget1.value!,
        title: '步骤 A',
        description: '这是通过命令式 API 创建的引导，无需在模板中声明组件。'
      },
      {
        target: impTarget2.value!,
        title: '步骤 B',
        description: '命令式调用非常适合在页面加载后自动触发引导流程。'
      }
    ],
    color: '#4f6ef7'
  })
}

// ==================== 无遮罩模式 ====================
const noMaskTarget = ref<HTMLElement | null>(null)
const noMaskTourVisible = ref(false)

const noMaskSteps = [
  {
    target: noMaskTarget,
    title: '轻量提示',
    description: '无遮罩模式适合简单的功能提示，不会遮挡其他内容。',
    highlight: false
  }
]

function startNoMaskTour() {
  noMaskTourVisible.value = true
}

// ==================== 回调 ====================
function onTourFinish() {
  xly.$msg.success('引导完成！')
}

function onTourChange(current: number) {
  console.log('当前步骤:', current)
}

// 命令式调用 - 页面加载后自动引导（演示用，注释掉）
// onMounted(() => {
//   setTimeout(() => startImperativeTour(), 1000)
// })
</script>

<style scoped lang="scss">
.tour-doc {
  padding: 8px 0 40px;
}

.doc-header { margin-bottom: 36px; }
.doc-title {
  font-size: 26px; font-weight: 700; color: #1a1a2e;
  margin: 0 0 8px; letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6;
}

.doc-section { margin-bottom: 32px; }
.doc-section__title {
  font-size: 18px; font-weight: 600; color: #1a1a2e;
  margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7;
}
.doc-section__desc {
  font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6;
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7; border-radius: 12px;
  overflow: hidden; background: #fff;
}
.doc-preview__body {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 12px; padding: 24px;
}
.doc-preview__body--column {
  flex-direction: column;
  align-items: stretch;
}
.doc-code {
  border-top: 1px solid #f2f3f7; background: #fafbfd;
  padding: 16px 20px; overflow-x: auto;
  pre { margin: 0; padding: 0; }
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre;
  }
}

.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; }
  td { color: #4a4a6a; }
}

// 演示区域样式
.tour-demo-area {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.tour-demo-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;

  &--blue {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    .tour-demo-box__number { background: #3b82f6; }
  }

  &--green {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    .tour-demo-box__number { background: #10b981; }
  }

  &--orange {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    .tour-demo-box__number { background: #f59e0b; }
  }

  &--purple {
    background: #f5f3ff;
    border: 1px solid #c4b5fd;
    .tour-demo-box__number { background: #8b5cf6; }
  }

  &--cyan {
    background: #ecfeff;
    border: 1px solid #a5f3fc;
    .tour-demo-box__number { background: #06b6d4; }
  }

  &--pink {
    background: #fdf2f8;
    border: 1px solid #fbcfe8;
    .tour-demo-box__number { background: #ec4899; }
  }

  &--amber {
    background: #fffbeb;
    border: 1px solid #fde68a;
    .tour-demo-box__number { background: #f59e0b; }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &__number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
}

// 位置演示
.placement-demo {
  width: 100%;

  &__area {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px;
    background: #f9fafb;
    border-radius: 12px;
    border: 1px dashed #d1d5db;
    min-height: 300px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  &__spacer {
    flex: 1;
  }
}

// 颜色演示
.color-demo-area {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 32px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
  width: 100%;
}

// 命令式演示
.imperative-demo {
  width: 100%;

  .imperative-boxes {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }
}

// 按钮样式
.demo-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #d1d5db;
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.demo-btn--primary {
  background: #4f6ef7;
  border-color: #4f6ef7;
  color: #fff;

  &:hover:not(:disabled) {
    background: #3d5ce5;
    border-color: #3d5ce5;
  }
}
</style>
