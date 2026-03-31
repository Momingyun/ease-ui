<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">开关 Switch</h1>
      <p class="doc-desc">表示两种相互排斥的状态（如开/关），常用于布尔值的切换。</p>
    </header>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        绑定 <code>v-model</code> 到一个布尔值，默认为 <code>true</code>（开）和 <code>false</code>（关）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySwitch v-model="value1" />
          <span style="font-size: 13px; color: #8e8ea0">{{ value1 ? '已开启' : '已关闭' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value1" /&gt;
&lt;span&gt;{{ value1 ? '已开启' : '已关闭' }}&lt;/span&gt;</code></pre>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>size</code> 属性设置尺寸，可选 <code>large</code>、<code>default</code>、<code>small</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 20px">
          <XlySwitch v-model="value2" size="large" />
          <XlySwitch v-model="value2" size="default" />
          <XlySwitch v-model="value2" size="small" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" size="large" /&gt;
&lt;XlySwitch v-model="value" size="default" /&gt;
&lt;XlySwitch v-model="value" size="small" /&gt;</code></pre>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">
        通过 <code>active-color</code> 和 <code>inactive-color</code> 属性设置开启和关闭状态的颜色。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 20px">
          <XlySwitch v-model="value3" active-color="#67c23a" inactive-color="#909399" />
          <XlySwitch v-model="value4" active-color="#f56c6c" inactive-color="#e6e6e6" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" active-color="#67c23a" inactive-color="#909399" /&gt;
&lt;XlySwitch v-model="value" active-color="#f56c6c" inactive-color="#e6e6e6" /&gt;</code></pre>
      </div>
    </section>

    <!-- 自定义值 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义值</h2>
      <p class="doc-section__desc">
        通过 <code>active-value</code> 和 <code>inactive-value</code> 属性设置开关的值，不限于布尔类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px">
          <XlySwitch v-model="value5" active-value="yes" inactive-value="no" />
          <span style="font-size: 13px; color: #8e8ea0">当前值：{{ value5 }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" active-value="yes" inactive-value="no" /&gt;</code></pre>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">
        通过 <code>disabled</code> 属性禁用开关。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 20px">
          <XlySwitch v-model="value6" disabled />
          <XlySwitch v-model="value7" disabled />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" disabled /&gt;
&lt;XlySwitch v-model="value" disabled model-value="true" /&gt;</code></pre>
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">加载状态</h2>
      <p class="doc-section__desc">
        通过 <code>loading</code> 属性显示加载状态。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="gap: 20px">
          <XlySwitch v-model="value8" loading />
          <XlySwitch v-model="value9" loading />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" loading /&gt;
&lt;XlySwitch v-model="value" loading model-value="true" /&gt;</code></pre>
      </div>
    </section>

    <!-- 带文字描述 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带文字描述</h2>
      <p class="doc-section__desc">
        通过 <code>active-text</code> 和 <code>inactive-text</code> 属性设置开关的文字描述。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px">
          <XlySwitch v-model="value10" active-text="按月付费" inactive-text="按年付费" />
          <XlySwitch v-model="value11" active-text="开" inactive-text="关" />
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySwitch v-model="value" active-text="按月付费" inactive-text="按年付费" /&gt;
&lt;XlySwitch v-model="value" active-text="开" inactive-text="关" /&gt;</code></pre>
      </div>
    </section>

    <!-- API -->
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
              <td>v-model</td>
              <td>绑定值</td>
              <td><code>boolean / string / number</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td>model-value</td>
              <td>绑定值（非受控）</td>
              <td><code>boolean / string / number</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td>size</td>
              <td>尺寸</td>
              <td><code>'large' | 'default' | 'small'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>是否加载中</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>active-value</td>
              <td>开启时的值</td>
              <td><code>boolean / string / number</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>inactive-value</td>
              <td>关闭时的值</td>
              <td><code>boolean / string / number</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>active-color</td>
              <td>开启时的背景色</td>
              <td><code>string</code></td>
              <td><code>#4f6ef7</code></td>
            </tr>
            <tr>
              <td>inactive-color</td>
              <td>关闭时的背景色</td>
              <td><code>string</code></td>
              <td><code>#e6e6e6</code></td>
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
              <td>开关状态变化时触发</td>
              <td><code>(value: boolean | string | number) =&gt; void</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlySwitch from '@/components/xly-switch/index.vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(false)
const value5 = ref('yes')
const value6 = ref(false)
const value7 = ref(true)
const value8 = ref(false)
const value9 = ref(true)
const value10 = ref(false)
const value11 = ref(false)
</script>

<style>
.component-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6;
  code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; }
}
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto;
  pre { margin: 0; padding: 0; }
  code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; }
}
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; }
}
</style>
