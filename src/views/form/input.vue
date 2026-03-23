<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">输入框 Input</h1>
      <p class="doc-desc">通过鼠标或键盘输入字符，支持前后缀、密码切换、清除按钮、字数统计等功能。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">最基础的输入框用法，通过 <code>v-model</code> 双向绑定值。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="val1" placeholder="请输入内容" />
          <XlyInput v-model="val1b" placeholder="可清除" clearable />
          <XlyInput v-model="val1c" placeholder="禁用状态" disabled />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="value" placeholder="请输入内容" /&gt;
&lt;XlyInput v-model="value" placeholder="可清除" clearable /&gt;
&lt;XlyInput v-model="value" placeholder="禁用状态" disabled /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">密码输入框</h2>
      <p class="doc-section__desc">通过 <code>type="password"</code> 切换为密码输入框，支持点击图标切换显示/隐藏。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="pwd" type="password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="password" type="password" placeholder="请输入密码" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">前后缀</h2>
      <p class="doc-section__desc">通过 <code>prefixIcon</code> / <code>suffixIcon</code> 传入图标名称（使用 XlyIcon 的 name 格式），或通过 <code>#prefix</code> / <code>#suffix</code> 插槽自定义内容。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="val2" placeholder="搜索" prefix-icon="el:Search" />
          <XlyInput v-model="val3" placeholder="日期" suffix-icon="el:Calendar" />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="value" placeholder="搜索" prefix-icon="el:Search" /&gt;
&lt;XlyInput v-model="value" placeholder="日期" suffix-icon="el:Calendar" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">复合型输入框</h2>
      <p class="doc-section__desc">通过 <code>#prepend</code> 和 <code>#append</code> 插槽在输入框前后插入固定文本或按钮。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="val4" placeholder="请输入网址">
            <template #prepend>https://</template>
          </XlyInput>
          <XlyInput v-model="val5" placeholder="请输入域名">
            <template #append>.com</template>
          </XlyInput>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="value" placeholder="请输入网址"&gt;
  &lt;template #prepend&gt;https://&lt;/template&gt;
&lt;/XlyInput&gt;
&lt;XlyInput v-model="value" placeholder="请输入域名"&gt;
  &lt;template #append&gt;.com&lt;/template&gt;
&lt;/XlyInput&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">字数统计</h2>
      <p class="doc-section__desc">设置 <code>maxlength</code> 和 <code>showWordLimit</code> 显示字数统计。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="val6" placeholder="最多20字" :maxlength="20" show-word-limit />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="value" placeholder="最多20字" :maxlength="20" show-word-limit /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置三种尺寸：<code>large</code> / <code>default</code> / <code>small</code>。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="val7" placeholder="大尺寸 large" size="large" />
          <XlyInput v-model="val7" placeholder="默认尺寸 default" size="default" />
          <XlyInput v-model="val7" placeholder="小尺寸 small" size="small" />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyInput v-model="value" size="large" /&gt;
&lt;XlyInput v-model="value" size="default" /&gt;
&lt;XlyInput v-model="value" size="small" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">文本域 Textarea</h2>
      <p class="doc-section__desc">通过 <code>type="textarea"</code> 切换为文本域，支持设置初始行数 <code>rows</code> 和拖动调整大小 <code>resize</code>。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyInput v-model="textarea1" type="textarea" :rows="2" placeholder="默认 2 行" />
          <XlyInput v-model="textarea2" type="textarea" :rows="4" placeholder="4 行" />
          <XlyInput v-model="textarea3" type="textarea" :rows="3" placeholder="禁止调整大小" :resize="'none'" />
          <XlyInput v-model="textarea4" type="textarea" :rows="2" :maxlength="100" show-word-limit placeholder="带字数统计" />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;!-- 默认 2 行，允许垂直拖动调整大小 --&gt;
&lt;XlyInput v-model="value" type="textarea" :rows="2" placeholder="请输入内容" /&gt;

&lt;!-- 4 行 --&gt;
&lt;XlyInput v-model="value" type="textarea" :rows="4" /&gt;

&lt;!-- 禁止调整大小 --&gt;
&lt;XlyInput v-model="value" type="textarea" :resize="'none'" /&gt;

&lt;!-- 带字数统计 --&gt;
&lt;XlyInput v-model="value" type="textarea" :maxlength="100" show-word-limit /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>绑定值</td><td><code>string | number</code></td><td><code>''</code></td></tr>
            <tr><td><code>type</code></td><td>输入框类型</td><td><code>'text' | 'password' | 'textarea' | 'number' | 'tel' | 'email' | 'url'</code></td><td><code>'text'</code></td></tr>
            <tr><td><code>placeholder</code></td><td>占位文本</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>readonly</code></td><td>是否只读</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>clearable</code></td><td>是否显示清除按钮</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>maxlength</code></td><td>最大输入长度</td><td><code>number</code></td><td>—</td></tr>
            <tr><td><code>showWordLimit</code></td><td>是否显示字数统计</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>prefixIcon</code></td><td>前缀图标名称（XlyIcon name 格式）</td><td><code>string</code></td><td>—</td></tr>
            <tr><td><code>suffixIcon</code></td><td>后缀图标名称（XlyIcon name 格式）</td><td><code>string</code></td><td>—</td></tr>
            <tr><td><code>autocomplete</code></td><td>原生 autocomplete 属性</td><td><code>string</code></td><td><code>'off'</code></td></tr>
            <tr><td><code>inputmode</code></td><td>原生 inputmode 属性</td><td><code>string</code></td><td>—</td></tr>
            <tr><td><code>size</code></td><td>输入框尺寸</td><td><code>'large' | 'default' | 'small'</code></td><td><code>'default'</code></td></tr>
            <tr><td><code>rows</code></td><td>textarea 初始行数</td><td><code>number</code></td><td><code>2</code></td></tr>
            <tr><td><code>resize</code></td><td>textarea 是否允许拖动调整大小</td><td><code>'none' | 'both' | 'horizontal' | 'vertical'</code></td><td><code>'vertical'</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>插槽名</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><code>prefix</code></td><td>前缀内容</td></tr>
            <tr><td><code>suffix</code></td><td>后缀内容</td></tr>
            <tr><td><code>prepend</code></td><td>前置内容（输入框前方）</td></tr>
            <tr><td><code>append</code></td><td>后置内容（输入框后方）</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>update:modelValue</code></td><td>值变化时触发</td><td><code>(value: string)</code></td></tr>
            <tr><td><code>input</code></td><td>输入时触发</td><td><code>(value: string)</code></td></tr>
            <tr><td><code>change</code></td><td>失焦时触发</td><td><code>(value: string)</code></td></tr>
            <tr><td><code>focus</code></td><td>聚焦时触发</td><td><code>(event: FocusEvent)</code></td></tr>
            <tr><td><code>blur</code></td><td>失焦时触发</td><td><code>(event: FocusEvent)</code></td></tr>
            <tr><td><code>clear</code></td><td>点击清除按钮时触发</td><td>—</td></tr>
            <tr><td><code>keydown</code></td><td>按键按下时触发</td><td><code>(event: KeyboardEvent)</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Methods</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>focus()</code></td><td>聚焦输入框</td><td>—</td></tr>
            <tr><td><code>blur()</code></td><td>失焦输入框</td><td>—</td></tr>
            <tr><td><code>select()</code></td><td>选中输入框内容</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyInput from '@/components/xly-input/index.vue'

const val1 = ref('')
const val1b = ref('')
const val1c = ref('不可编辑')
const pwd = ref('')
const val2 = ref('')
const val3 = ref('')
const val4 = ref('')
const val5 = ref('')
const val6 = ref('')
const val7 = ref('')
const textarea1 = ref('')
const textarea2 = ref('')
const textarea3 = ref('')
const textarea4 = ref('')
</script>

<style scoped lang="scss">
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
  td { color: #4a4a6a; }
  code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; }
}
</style>
