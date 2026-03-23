<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">日期时间选择器 DateTimePicker</h1>
      <p class="doc-desc">在同一个面板中同时选择日期和时间，适用于需要精确记录操作时间的场景。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">选择日期和时间</h2>
      <p class="doc-section__desc">点击输入框弹出面板，左侧选择日期，右侧滚动选择时间，点击"确定"完成选择。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val1" placeholder="请选择日期时间" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val1 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" placeholder="请选择日期时间" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">包含秒</h2>
      <p class="doc-section__desc">设置 <code>show-seconds</code> 属性后，时间列会增加秒的选择，输出格式包含秒。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val2" placeholder="精确到秒" show-seconds />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val2 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" show-seconds /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义格式</h2>
      <p class="doc-section__desc">通过 <code>format</code> 属性自定义输出格式，支持 <code>YYYY</code>、<code>MM</code>、<code>DD</code>、<code>HH</code>、<code>mm</code>、<code>ss</code> 占位符。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val3" placeholder="自定义格式" format="YYYY/MM/DD HH:mm" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val3 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" format="YYYY/MM/DD HH:mm" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态 & 清除</h2>
      <p class="doc-section__desc">通过 <code>disabled</code> 禁用，<code>clearable</code> 允许清除已选值。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val4" placeholder="可清除" clearable />
          </div>
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val4" placeholder="禁用状态" disabled />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" clearable /&gt;
&lt;XlyDateTimePicker v-model="value" disabled /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置三种尺寸。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;"><XlyDateTimePicker v-model="val5" size="large" /></div>
          <div style="width: 300px;"><XlyDateTimePicker v-model="val5" /></div>
          <div style="width: 300px;"><XlyDateTimePicker v-model="val5" size="small" /></div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" size="large" /&gt;
&lt;XlyDateTimePicker v-model="value" /&gt;
&lt;XlyDateTimePicker v-model="value" size="small" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">手动输入时间</h2>
      <p class="doc-section__desc">
        面板中的时间区域支持手动输入。点击时间输入框后，可直接键入数字修改时/分/秒的值，支持 <kbd>↑</kbd> <kbd>↓</kbd> 键调整数值，<kbd>Enter</kbd> 跳转到下一个输入框。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlyDateTimePicker v-model="val6" placeholder="试试手动输入时间" show-seconds />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val6 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlyDateTimePicker v-model="value" show-seconds /&gt;
&lt;!-- 打开面板后，时间输入框可直接键入数字 --&gt;
&lt;!-- ↑↓ 键调整数值，Enter 跳转下一个输入框 --&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>绑定值</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>placeholder</code></td><td>占位文本</td><td><code>string</code></td><td><code>'请选择日期时间'</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>readonly</code></td><td>是否只读</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>clearable</code></td><td>是否可清除</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>showSeconds</code></td><td>是否显示秒选择列</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>format</code></td><td>输出格式</td><td><code>string</code></td><td>自动生成</td></tr>
            <tr><td><code>size</code></td><td>尺寸</td><td><code>'large' | 'default' | 'small'</code></td><td><code>'default'</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>update:modelValue</code></td><td>值变化时触发</td><td><code>(value: string)</code></td></tr>
            <tr><td><code>change</code></td><td>值变化时触发</td><td><code>(value: string)</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>插槽名</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><code>prefix</code></td><td>自定义前缀图标</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyDateTimePicker from '@/components/xly-date-time-picker/index.vue'

const val1 = ref('')
const val2 = ref('')
const val3 = ref('')
const val4 = ref('')
const val5 = ref('')
const val6 = ref('')
</script>

<style scoped lang="scss">
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
  td { color: #4a4a6a; }
  code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; }
}
</style>
