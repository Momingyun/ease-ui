<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">评分 Rate</h1>
      <p class="doc-desc">用于评分和展示星级，支持半选、自定义颜色和文字提示。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>v-model</code> 绑定评分值，默认最多 5 颗星。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <XlyRate v-model="val1" />
            <span style="font-size: 14px; color: #4a4a6a;">{{ val1 }} 分</span>
          </div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">半选</h2>
      <p class="doc-section__desc">设置 <code>allow-half</code> 属性支持选中半星，鼠标移到星星左半侧时显示半选状态。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <XlyRate v-model="val2" allow-half />
            <span style="font-size: 14px; color: #4a4a6a;">{{ val2 }} 分</span>
          </div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" allow-half /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">通过 <code>color</code> 和 <code>voidColor</code> 自定义选中和未选中的颜色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <XlyRate v-model="val3" color="#4f6ef7" />
            <span style="font-size: 13px; color: #8e8ea0;">主题蓝</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <XlyRate v-model="val3" color="#f56c6c" />
            <span style="font-size: 13px; color: #8e8ea0;">警告红</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <XlyRate v-model="val3" color="#67c23a" />
            <span style="font-size: 13px; color: #8e8ea0;">成功绿</span>
          </div>
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" color="#4f6ef7" /&gt;
&lt;XlyRate v-model="value" color="#f56c6c" /&gt;
&lt;XlyRate v-model="value" color="#67c23a" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">文字提示</h2>
      <p class="doc-section__desc">通过 <code>show-text</code> 显示数字，或通过 <code>texts</code> 传入自定义文案数组。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <XlyRate v-model="val4" show-text />
          <XlyRate v-model="val5" :texts="['很差', '一般', '不错', '推荐', '极佳']" />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" show-text /&gt;
&lt;XlyRate v-model="value" :texts="['很差', '一般', '不错', '推荐', '极佳']" /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义星星数量</h2>
      <p class="doc-section__desc">通过 <code>max</code> 属性设置最大星星数量。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <XlyRate v-model="val6" :max="10" show-text />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" :max="10" show-text /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">设置 <code>disabled</code> 属性后评分不可交互。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <XlyRate v-model="val7" disabled />
        </div>
      </div>
      <div class="doc-code"><pre><code>&lt;XlyRate v-model="value" disabled /&gt;</code></pre></div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>绑定值（当前评分）</td><td><code>number</code></td><td><code>0</code></td></tr>
            <tr><td><code>max</code></td><td>最大评分</td><td><code>number</code></td><td><code>5</code></td></tr>
            <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>allowHalf</code></td><td>是否允许半选</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>showText</code></td><td>是否显示数字</td><td><code>boolean</code></td><td><code>false</code></td></tr>
            <tr><td><code>texts</code></td><td>辅助文字数组</td><td><code>string[]</code></td><td><code>[]</code></td></tr>
            <tr><td><code>color</code></td><td>选中颜色</td><td><code>string</code></td><td><code>'#f5a623'</code></td></tr>
            <tr><td><code>voidColor</code></td><td>未选中颜色</td><td><code>string</code></td><td><code>'#e2e4ed'</code></td></tr>
            <tr><td><code>size</code></td><td>星星尺寸</td><td><code>'large' | 'default' | 'small'</code></td><td><code>'default'</code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead>
          <tbody>
            <tr><td><code>update:modelValue</code></td><td>值变化时触发</td><td><code>(value: number)</code></td></tr>
            <tr><td><code>change</code></td><td>值变化时触发</td><td><code>(value: number)</code></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyRate from '@/components/xly-rate/index.vue'

const val1 = ref(3)
const val2 = ref(2.5)
const val3 = ref(4)
const val4 = ref(3)
const val5 = ref(3)
const val6 = ref(6)
const val7 = ref(3)
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
