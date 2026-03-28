<template>
  <div class="badge-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">徽标 Badge</h1>
      <p class="doc-desc">简洁的徽标组件，比市面上的用法更简单。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">只需传入 <code>value</code> 即可自动显示徽标。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5">
            <xly-button>消息</xly-button>
          </xly-badge>
          <xly-badge :value="88">
            <xly-button type="primary">通知</xly-button>
          </xly-badge>
          <xly-badge :value="999">
            <xly-button type="success">内容</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-badge :value="5"&gt;
  &lt;xly-button&gt;消息&lt;/xly-button&gt;
&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>

      <!-- 类型 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">类型：</div>
        <div class="doc-preview__body">
          <xly-badge :value="5" type="primary">
            <xly-button>primary</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="success">
            <xly-button>success</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="warning">
            <xly-button>warning</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="danger">
            <xly-button>danger</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="info">
            <xly-button>info</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-badge :value="5" type="primary"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge :value="5" type="success"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge :value="5" type="warning"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge :value="5" type="danger"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge :value="5" type="info"&gt;...&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>

      <!-- 自定义颜色 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">自定义颜色：</div>
        <div class="doc-preview__body">
          <xly-badge value="NEW" color="#ff0000">
            <xly-button>红色</xly-button>
          </xly-badge>
          <xly-badge value="NEW" color="#10b981">
            <xly-button>绿色</xly-button>
          </xly-badge>
          <xly-badge value="NEW" color="#8b5cf6">
            <xly-button>紫色</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-badge value="NEW" color="#ff0000"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge value="NEW" color="#10b981"&gt;...&lt;/xly-badge&gt;
&lt;xly-badge value="NEW" color="#8b5cf6"&gt;...&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自动隐藏 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自动隐藏</h2>
      <p class="doc-section__desc">
        值为 0、null、undefined、空字符串时自动隐藏。使用 <code>show-zero</code> 强制显示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="0">
            <xly-button>默认隐藏0</xly-button>
          </xly-badge>
          <xly-badge :value="0" show-zero>
            <xly-button>show-zero</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 默认隐藏 0 --&gt;
&lt;xly-badge :value="0"&gt;...&lt;/xly-badge&gt;

&lt;!-- 强制显示 0 --&gt;
&lt;xly-badge :value="0" show-zero&gt;...&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 圆形 -->
    <section class="doc-section">
      <h2 class="doc-section__title">圆形</h2>
      <p class="doc-section__desc">设置 <code>circle</code> 属性切换圆形形态。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5">
            <xly-button>椭圆</xly-button>
          </xly-badge>
          <xly-badge :value="5" circle>
            <xly-button>圆形</xly-button>
          </xly-badge>
          <xly-badge value="NEW" circle color="#10b981">
            <xly-button>圆形+自定义色</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 椭圆（默认） --&gt;
&lt;xly-badge :value="5"&gt;...&lt;/xly-badge&gt;

&lt;!-- 圆形 --&gt;
&lt;xly-badge :value="5" circle&gt;...&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 独立使用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">独立使用</h2>
      <p class="doc-section__desc">不传入插槽内容时，徽标独立显示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5" />
          <xly-badge value="99+" type="primary" />
          <xly-badge :value="newMsg" type="success" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 独立显示 --&gt;
&lt;xly-badge :value="5" /&gt;
&lt;xly-badge value="99+" type="primary" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 配合图标 -->
    <section class="doc-section">
      <h2 class="doc-section__title">配合图标</h2>
      <p class="doc-section__desc">徽标可以配合图标组件使用。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="12">
            <xly-icon name="el:Bell" :size="24" />
          </xly-badge>
          <xly-badge :value="3" type="warning">
            <xly-icon name="el:ShoppingCart" :size="24" />
          </xly-badge>
          <xly-badge value="99+" type="danger">
            <xly-icon name="el:Message" :size="24" />
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-badge :value="12"&gt;
  &lt;xly-icon name="el:Bell" /&gt;
&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">位置</h2>
      <p class="doc-section__desc">支持四种位置。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5" position="top-left">
            <xly-button>top-left</xly-button>
          </xly-badge>
          <xly-badge :value="5" position="bottom-left">
            <xly-button>bottom-right</xly-button>
          </xly-badge>
          <xly-badge :value="5" position="top-right">
            <xly-button>top-right</xly-button>
          </xly-badge>
          <xly-badge :value="5" position="bottom-right">
            <xly-button>bottom-right</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>position="top-right"  // 默认
position="top-left"
position="bottom-right"
position="bottom-left"</code></pre>
        </div>
      </div>
    </section>

    <!-- 类型 -->
    <section class="doc-section">
      <h2 class="doc-section__title">类型</h2>
      <p class="doc-section__desc">内置五种类型。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5" type="primary">
            <xly-button>primary</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="success">
            <xly-button>success</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="warning">
            <xly-button>warning</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="danger">
            <xly-button>danger</xly-button>
          </xly-badge>
          <xly-badge :value="5" type="info">
            <xly-button>info</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>type="primary"   // 蓝色
type="success"   // 绿色
type="warning"  // 橙色
type="danger"   // 红色（默认）
type="info"     // 灰色</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">通过 <code>color</code> 属性自定义颜色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-badge :value="5" color="#10b981">
            <xly-button>自定义绿色</xly-button>
          </xly-badge>
          <xly-badge :value="5" color="#8b5cf6">
            <xly-button>自定义紫色</xly-button>
          </xly-badge>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-badge :value="5" color="#10b981"&gt;...&lt;/xly-badge&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 命令式调用 -->
    <section class="doc-section">
      <h2 class="doc-section__title">命令式调用</h2>
      <p class="doc-section__desc">通过 <code>xly.$badge</code> 动态添加/移除徽标。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <xly-button ref="btnRef" @click="toggleBadge">
            {{ hasBadge ? '移除徽标' : '添加徽标' }}
          </xly-button>
        </div>
        <div class="doc-code">
          <pre><code>import { xly } from '@/utils/xly'

// 在元素上显示徽标
const badge = xly.$badge.open(el, { value: 5 })

// 更新徽标值
badge.setValue(10)

// 移除徽标
badge.close()</code></pre>
        </div>
      </div>

      <!-- 命令式 - 位置 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">位置：</div>
        <div class="doc-preview__body">
          <xly-button ref="btnPos2" @click="togglePos2">左上</xly-button>
          <xly-button ref="btnPos4" @click="togglePos4">左下</xly-button>
          <xly-button ref="btnPos1" @click="togglePos1">右上</xly-button>
          <xly-button ref="btnPos3" @click="togglePos3">右下</xly-button>
        </div>
        <div class="doc-code">
          <pre><code>xly.$badge.open(el, { value: 5, position: 'top-left' })
xly.$badge.open(el, { value: 5, position: 'top-right' })
xly.$badge.open(el, { value: 5, position: 'bottom-left' })
xly.$badge.open(el, { value: 5, position: 'bottom-right' })</code></pre>
        </div>
      </div>

      <!-- 命令式 - 类型 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">类型：</div>
        <div class="doc-preview__body">
          <xly-button ref="btnType1" @click="toggleType1">primary</xly-button>
          <xly-button ref="btnType2" @click="toggleType2">success</xly-button>
          <xly-button ref="btnType3" @click="toggleType3">warning</xly-button>
          <xly-button ref="btnType4" @click="toggleType4">danger</xly-button>
          <xly-button ref="btnType5" @click="toggleType5">info</xly-button>
        </div>
        <div class="doc-code">
          <pre><code>xly.$badge.open(el, { value: 5, type: 'primary' })
xly.$badge.open(el, { value: 5, type: 'success' })
xly.$badge.open(el, { value: 5, type: 'warning' })
xly.$badge.open(el, { value: 5, type: 'danger' })
xly.$badge.open(el, { value: 5, type: 'info' })</code></pre>
        </div>
      </div>

      <!-- 命令式 - 自定义颜色 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">自定义颜色：</div>
        <div class="doc-preview__body">
          <xly-button ref="btnColor1" @click="toggleColor1">#ff0000</xly-button>
          <xly-button ref="btnColor2" @click="toggleColor2">#10b981</xly-button>
          <xly-button ref="btnColor3" @click="toggleColor3">#8b5cf6</xly-button>
        </div>
        <div class="doc-code">
          <pre><code>xly.$badge.open(el, { value: 'NEW', color: '#ff0000' })
xly.$badge.open(el, { value: 'NEW', color: '#10b981' })
xly.$badge.open(el, { value: 'NEW', color: '#8b5cf6' })</code></pre>
        </div>
      </div>

      <!-- 命令式 - 圆形 -->
      <div class="doc-preview" style="margin-top: 16px">
        <div class="doc-preview__label">圆形：</div>
        <div class="doc-preview__body">
          <xly-button ref="btnCircle1" @click="toggleCircle1">椭圆</xly-button>
          <xly-button ref="btnCircle2" @click="toggleCircle2">圆形</xly-button>
        </div>
        <div class="doc-code">
          <pre><code>// 椭圆（默认）
xly.$badge.open(el, { value: 5 })

// 圆形
xly.$badge.open(el, { value: 5, circle: true })</code></pre>
        </div>
      </div>
    </section>

    <!-- API -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>
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
              <td><code>value</code></td>
              <td>徽标值</td>
              <td><code>number | string</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>最大值，超过显示 max+</td>
              <td><code>number</code></td>
              <td><code>99</code></td>
            </tr>
            <tr>
              <td><code>overflowText</code></td>
              <td>溢出文字</td>
              <td><code>string</code></td>
              <td><code>'+'</code></td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>类型</td>
              <td><code>'primary' | 'success' | 'warning' | 'danger' | 'info'</code></td>
              <td><code>'danger'</code></td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>位置</td>
              <td><code>'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'</code></td>
              <td><code>'top-right'</code></td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>自定义颜色</td>
              <td><code>string</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>showZero</code></td>
              <td>是否显示 0</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>circle</code></td>
              <td>是否圆形</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { xly } from '@/utils/xly'
import type { BadgeInstance } from '@/utils/xly'

const newMsg = 8

// 基础示例
const btnRef = ref<{ $el: HTMLElement } | null>(null)
const hasBadge = ref(false)
let badgeInstance: BadgeInstance | null = null

function toggleBadge() {
  if (hasBadge.value) {
    badgeInstance?.close()
    badgeInstance = null
    hasBadge.value = false
  } else if (btnRef.value) {
    badgeInstance = xly.$badge.open(btnRef.value.$el, { value: 5, type: 'danger' })
    hasBadge.value = true
  }
}

// 位置示例
const btnPos1 = ref<{ $el: HTMLElement } | null>(null)
const btnPos2 = ref<{ $el: HTMLElement } | null>(null)
const btnPos3 = ref<{ $el: HTMLElement } | null>(null)
const btnPos4 = ref<{ $el: HTMLElement } | null>(null)
const posBadges = ref<Map<any, BadgeInstance>>(new Map())

function togglePos1() {
  togglePos(btnPos1, 'top-right')
}
function togglePos2() {
  togglePos(btnPos2, 'top-left')
}
function togglePos3() {
  togglePos(btnPos3, 'bottom-right')
}
function togglePos4() {
  togglePos(btnPos4, 'bottom-left')
}

function togglePos(btnRef: any, position: string) {
  const key = btnRef.value
  if (posBadges.value.has(key)) {
    posBadges.value.get(key)?.close()
    posBadges.value.delete(key)
  } else if (btnRef.value) {
    const badge = xly.$badge.open(btnRef.value.$el, { value: 5, position })
    posBadges.value.set(key, badge)
  }
}

// 类型示例
const btnType1 = ref<{ $el: HTMLElement } | null>(null)
const btnType2 = ref<{ $el: HTMLElement } | null>(null)
const btnType3 = ref<{ $el: HTMLElement } | null>(null)
const btnType4 = ref<{ $el: HTMLElement } | null>(null)
const btnType5 = ref<{ $el: HTMLElement } | null>(null)
const typeBadges = ref<Map<any, BadgeInstance>>(new Map())

function toggleType1() {
  toggleType(btnType1, 'primary')
}
function toggleType2() {
  toggleType(btnType2, 'success')
}
function toggleType3() {
  toggleType(btnType3, 'warning')
}
function toggleType4() {
  toggleType(btnType4, 'danger')
}
function toggleType5() {
  toggleType(btnType5, 'info')
}

function toggleType(btnRef: any, type: string) {
  const key = btnRef.value
  if (typeBadges.value.has(key)) {
    typeBadges.value.get(key)?.close()
    typeBadges.value.delete(key)
  } else if (btnRef.value) {
    const badge = xly.$badge.open(btnRef.value.$el, { value: 5, type })
    typeBadges.value.set(key, badge)
  }
}

// 自定义颜色示例
const btnColor1 = ref<{ $el: HTMLElement } | null>(null)
const btnColor2 = ref<{ $el: HTMLElement } | null>(null)
const btnColor3 = ref<{ $el: HTMLElement } | null>(null)
const colorBadges = ref<Map<any, BadgeInstance>>(new Map())

function toggleColor1() {
  toggleColor(btnColor1, '#ff0000')
}
function toggleColor2() {
  toggleColor(btnColor2, '#10b981')
}
function toggleColor3() {
  toggleColor(btnColor3, '#8b5cf6')
}

function toggleColor(btnRef: any, color: string) {
  const key = btnRef.value
  if (colorBadges.value.has(key)) {
    colorBadges.value.get(key)?.close()
    colorBadges.value.delete(key)
  } else if (btnRef.value) {
    const badge = xly.$badge.open(btnRef.value.$el, { value: 'NEW', color })
    colorBadges.value.set(key, badge)
  }
}

// 圆形示例
const btnCircle1 = ref<{ $el: HTMLElement } | null>(null)
const btnCircle2 = ref<{ $el: HTMLElement } | null>(null)
const circleBadges = ref<Map<any, BadgeInstance>>(new Map())

function toggleCircle1() {
  toggleCircle(btnCircle1, false)
}
function toggleCircle2() {
  toggleCircle(btnCircle2, true)
}

function toggleCircle(btnRef: any, circle: boolean) {
  const key = btnRef.value
  if (circleBadges.value.has(key)) {
    circleBadges.value.get(key)?.close()
    circleBadges.value.delete(key)
  } else if (btnRef.value) {
    const badge = xly.$badge.open(btnRef.value.$el, { value: 5, circle })
    circleBadges.value.set(key, badge)
  }
}
</script>

<style scoped lang="scss">
.badge-doc {
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
  overflow: hidden;
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
    white-space: nowrap;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
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
</style>
