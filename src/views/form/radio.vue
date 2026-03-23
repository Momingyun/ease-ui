<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">单选框 Radio</h1>
      <p class="doc-desc">在一组备选项中进行单选，支持单独使用和配合 RadioGroup 使用。</p>
    </header>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        单独使用时，通过 <code>v-model</code> 绑定值，每个 <code>XlyRadio</code> 设置
        <code>label</code> 属性作为选中时的值。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px">
          <div style="display: flex; gap: 16px">
            <XlyRadio v-model="val1" label="1">选项一</XlyRadio>
            <XlyRadio v-model="val1" label="2">选项二</XlyRadio>
            <XlyRadio v-model="val1" label="3">选项三</XlyRadio>
          </div>
          <span style="font-size: 13px; color: #8e8ea0">当前值：{{ val1 ?? '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadio v-model="value" label="1"&gt;选项一&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="2"&gt;选项二&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="3"&gt;选项三&lt;/XlyRadio&gt;</code></pre>
      </div>
    </section>

    <!-- RadioGroup 用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">单选框组</h2>
      <p class="doc-section__desc">
        使用 <code>XlyRadioGroup</code> 包裹，只需在组上绑定 <code>v-model</code>，子项只需设置
        <code>label</code>。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px">
          <XlyRadioGroup v-model="val2">
            <XlyRadio label="beijing">北京</XlyRadio>
            <XlyRadio label="shanghai">上海</XlyRadio>
            <XlyRadio label="guangzhou">广州</XlyRadio>
            <XlyRadio label="shenzhen">深圳</XlyRadio>
          </XlyRadioGroup>
          <span style="font-size: 13px; color: #8e8ea0">当前值：{{ val2 ?? '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadioGroup v-model="value"&gt;
  &lt;XlyRadio label="beijing"&gt;北京&lt;/XlyRadio&gt;
  &lt;XlyRadio label="shanghai"&gt;上海&lt;/XlyRadio&gt;
  &lt;XlyRadio label="guangzhou"&gt;广州&lt;/XlyRadio&gt;
  &lt;XlyRadio label="shenzhen"&gt;深圳&lt;/XlyRadio&gt;
&lt;/XlyRadioGroup&gt;</code></pre>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">
        通过 <code>disabled</code> 属性禁用单选框，也可以在 <code>XlyRadioGroup</code> 上设置整体禁用。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px">
          <div style="display: flex; gap: 16px">
            <XlyRadio label="a" disabled>禁用</XlyRadio>
            <XlyRadio label="b" disabled model-value="b">选中且禁用</XlyRadio>
          </div>
          <XlyRadioGroup v-model="val3" disabled>
            <XlyRadio label="1">组内禁用一</XlyRadio>
            <XlyRadio label="2">组内禁用二</XlyRadio>
          </XlyRadioGroup>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadio label="a" disabled&gt;禁用&lt;/XlyRadio&gt;
&lt;XlyRadio label="b" disabled model-value="b"&gt;选中且禁用&lt;/XlyRadio&gt;

&lt;XlyRadioGroup v-model="value" disabled&gt;
  &lt;XlyRadio label="1"&gt;组内禁用一&lt;/XlyRadio&gt;
  &lt;XlyRadio label="2"&gt;组内禁用二&lt;/XlyRadio&gt;
&lt;/XlyRadioGroup&gt;</code></pre>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>size</code> 属性设置尺寸，可选 <code>large</code>、<code>default</code>、<code>small</code>。
        在 <code>XlyRadioGroup</code> 上设置可统一控制子项尺寸。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px">
          <div style="display: flex; gap: 16px">
            <XlyRadio v-model="sizeVal" label="large" size="large">大号 Large</XlyRadio>
            <XlyRadio v-model="sizeVal" label="default" size="default">默认 Default</XlyRadio>
            <XlyRadio v-model="sizeVal" label="small" size="small">小号 Small</XlyRadio>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadio v-model="value" label="large" size="large"&gt;大号&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="default" size="default"&gt;默认&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="small" size="small"&gt;小号&lt;/XlyRadio&gt;</code></pre>
      </div>
    </section>

    <!-- 带边框 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带边框</h2>
      <p class="doc-section__desc">
        设置 <code>border</code> 属性可显示边框样式。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px">
          <div style="display: flex; gap: 12px">
            <XlyRadio v-model="borderVal" label="1" border>选项一</XlyRadio>
            <XlyRadio v-model="borderVal" label="2" border>选项二</XlyRadio>
            <XlyRadio v-model="borderVal" label="3" border>选项三</XlyRadio>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadio v-model="value" label="1" border&gt;选项一&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="2" border&gt;选项二&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="value" label="3" border&gt;选项三&lt;/XlyRadio&gt;</code></pre>
      </div>
    </section>

    <!-- 不同类型值 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同类型的值</h2>
      <p class="doc-section__desc">
        <code>label</code> 支持字符串、数字、布尔类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px">
          <div style="display: flex; gap: 16px">
            <XlyRadio v-model="typeVal" :label="1">数字 1</XlyRadio>
            <XlyRadio v-model="typeVal" :label="2">数字 2</XlyRadio>
          </div>
          <div style="display: flex; gap: 16px">
            <XlyRadio v-model="boolVal" :label="true">布尔 true</XlyRadio>
            <XlyRadio v-model="boolVal" :label="false">布尔 false</XlyRadio>
          </div>
          <span style="font-size: 13px; color: #8e8ea0">
            数字值：{{ typeVal ?? '未选择' }}，布尔值：{{ boolVal ?? '未选择' }}
          </span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyRadio v-model="numValue" :label="1"&gt;数字 1&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="numValue" :label="2"&gt;数字 2&lt;/XlyRadio&gt;

&lt;XlyRadio v-model="boolValue" :label="true"&gt;布尔 true&lt;/XlyRadio&gt;
&lt;XlyRadio v-model="boolValue" :label="false"&gt;布尔 false&lt;/XlyRadio&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyRadio from '@/components/xly-radio/index.vue'
import XlyRadioGroup from '@/components/xly-radio/radio-group.vue'

const val1 = ref<string | number | boolean>()
const val2 = ref<string | number | boolean>()
const val3 = ref<string | number | boolean>('1')
const sizeVal = ref<string | number | boolean>('default')
const borderVal = ref<string | number | boolean>('1')
const typeVal = ref<string | number | boolean>()
const boolVal = ref<string | number | boolean>()
</script>

<style>
.component-doc {  padding: 8px 0 40px; }
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
