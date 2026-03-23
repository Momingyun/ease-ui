<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">日期选择器 DatePicker</h1>
      <p class="doc-desc">用于选择或输入日期，支持日期、月份、年份三种模式，自带日历面板。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">选择日期</h2>
      <p class="doc-section__desc">默认模式，点击输入框弹出日历面板选择日期。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;">
            <XlyDatePicker v-model="val1" placeholder="请选择日期" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val1 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" placeholder="请选择日期" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">选择月份</h2>
      <p class="doc-section__desc">设置 <code>type="month"</code> 切换为月份选择模式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;">
            <XlyDatePicker v-model="val2" type="month" placeholder="请选择月份" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val2 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" type="month" placeholder="请选择月份" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">选择年份</h2>
      <p class="doc-section__desc">设置 <code>type="year"</code> 切换为年份选择模式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;">
            <XlyDatePicker v-model="val3" type="year" placeholder="请选择年份" />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">选中值：{{ val3 || '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" type="year" placeholder="请选择年份" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义格式</h2>
      <p class="doc-section__desc">通过 <code>format</code> 属性自定义显示格式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;">
            <XlyDatePicker v-model="val4" placeholder="YYYY/MM/DD" format="YYYY/MM/DD" />
          </div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" format="YYYY/MM/DD" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态 & 清除</h2>
      <p class="doc-section__desc">通过 <code>disabled</code> 禁用，<code>clearable</code> 允许清除已选日期。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;">
            <XlyDatePicker v-model="val5" placeholder="可清除" clearable />
          </div>
          <div style="width: 280px;">
            <XlyDatePicker v-model="val5" placeholder="禁用状态" disabled />
          </div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" clearable /&gt;
&lt;XlyDatePicker v-model="value" disabled /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置三种尺寸。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 280px;"><XlyDatePicker v-model="val6" size="large" /></div>
          <div style="width: 280px;"><XlyDatePicker v-model="val6" /></div>
          <div style="width: 280px;"><XlyDatePicker v-model="val6" size="small" /></div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyDatePicker v-model="value" size="large" /&gt;
&lt;XlyDatePicker v-model="value" /&gt;
&lt;XlyDatePicker v-model="value" size="small" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>绑定值</td><td><code>string</code></td><td><code>''</code></td></tr>
            <tr><td><code>type</code></td><td>选择器类型</td><td><code>'date' | 'month' | 'year'</code></td><td><code>'date'</code></td></tr>
            <tr><td><code>placeholder</code></td><td>占位文本</td><td><code>string</code></td><td><code>'请选择日期'</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>readonly</code></td><td>是否只读</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>clearable</code></td><td>是否可清除</td><td><code>boolean</code></td><td><code>true</code></td></tr>
            <tr><td><code>format</code></td><td>显示格式</td><td><code>string</code></td><td><code>'YYYY-MM-DD'</code></td></tr>
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
import XlyDatePicker from '@/components/xly-date-picker/index.vue'

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
