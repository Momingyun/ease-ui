<template>
  <div class="steps-doc">
    <div class="doc-header">
      <h1 class="doc-title">步骤条 Steps</h1>
      <p class="doc-desc">引导用户按照流程完成任务的导航条，可根据实际场景设定步骤数，支持水平/垂直方向、多种状态展示。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>active</code> 属性设置当前激活步骤（从 0 开始）。点击按钮可切换步骤查看效果。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlySteps :active="basicActive">
            <XlyStep v-for="(step, i) in basicSteps" :key="i" :index="i" :title="step.title" :description="step.desc" />
          </XlySteps>
          <div class="demo-actions">
            <button class="demo-btn" :disabled="basicActive <= 0" @click="basicPrev">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              上一步
            </button>
            <span class="step-indicator">步骤 {{ basicActive + 1 }} / {{ basicSteps.length }}</span>
            <button class="demo-btn demo-btn--primary" :disabled="basicActive >= basicSteps.length - 1" @click="basicNext">
              下一步
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="active"&gt;
  &lt;XlyStep :index="0" title="创建账号" description="填写基本信息" /&gt;
  &lt;XlyStep :index="1" title="身份验证" description="验证手机号" /&gt;
  &lt;XlyStep :index="2" title="设置密码" description="设置登录密码" /&gt;
  &lt;XlyStep :index="3" title="完成注册" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带描述的步骤条 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带描述的步骤条</h2>
      <p class="doc-section__desc">每个步骤可以添加描述信息，用于展示更多详情。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlySteps :active="1">
            <XlyStep :index="0" title="下单成功" description="2024-01-01 12:00:00" />
            <XlyStep :index="1" title="商家接单" description="预计30分钟送达" />
            <XlyStep :index="2" title="配送中" description="骑手正在赶来" />
            <XlyStep :index="3" title="已送达" description="订单已完成" />
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="1"&gt;
  &lt;XlyStep :index="0" title="下单成功" description="2024-01-01 12:00:00" /&gt;
  &lt;XlyStep :index="1" title="商家接单" description="预计30分钟送达" /&gt;
  &lt;XlyStep :index="2" title="配送中" description="骑手正在赶来" /&gt;
  &lt;XlyStep :index="3" title="已送达" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 错误状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">错误状态</h2>
      <p class="doc-section__desc">通过 <code>process-status="error"</code> 设置当前步骤为错误状态，适用于表单验证失败等场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlySteps :active="2" process-status="error">
            <XlyStep :index="0" title="提交申请" />
            <XlyStep :index="1" title="资料审核" />
            <XlyStep :index="2" title="实名认证" description="认证失败，请重新上传" />
            <XlyStep :index="3" title="审核通过" />
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="2" process-status="error"&gt;
  &lt;XlyStep :index="0" title="提交申请" /&gt;
  &lt;XlyStep :index="1" title="资料审核" /&gt;
  &lt;XlyStep :index="2" title="实名认证" description="认证失败，请重新上传" /&gt;
  &lt;XlyStep :index="3" title="审核通过" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 竖式步骤条 -->
    <section class="doc-section">
      <h2 class="doc-section__title">竖式步骤条</h2>
      <p class="doc-section__desc">通过 <code>direction="vertical"</code> 设置为竖直方向，适用于内容较多的场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlySteps :active="1" direction="vertical" style="height: 320px;">
            <XlyStep :index="0" title="项目创建" description="项目已创建，等待开发" />
            <XlyStep :index="1" title="开发中" description="前端和后端功能开发中" />
            <XlyStep :index="2" title="测试阶段" description="功能测试和Bug修复" />
            <XlyStep :index="3" title="已上线" description="项目已成功部署上线" />
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="1" direction="vertical"&gt;
  &lt;XlyStep :index="0" title="项目创建" description="项目已创建" /&gt;
  &lt;XlyStep :index="1" title="开发中" description="功能开发中" /&gt;
  &lt;XlyStep :index="2" title="测试阶段" description="等待测试" /&gt;
  &lt;XlyStep :index="3" title="已上线" description="等待部署" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义图标 - 方式1：icon 属性 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义图标（方式1：icon 属性）</h2>
      <p class="doc-section__desc">通过 <code>icon</code> 属性直接传入图标名称，支持 <code>el:</code> 前缀使用 Element Plus 图标，简洁方便。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlySteps :active="1">
            <XlyStep :index="0" title="购物车" icon="el:ShoppingCart" />
            <XlyStep :index="1" title="填写地址" icon="el:MapLocation" />
            <XlyStep :index="2" title="支付" icon="el:CreditCard" />
            <XlyStep :index="3" title="完成" icon="el:CircleCheck" />
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="1"&gt;
  &lt;XlyStep :index="0" title="购物车" icon="el:ShoppingCart" /&gt;
  &lt;XlyStep :index="1" title="填写地址" icon="el:MapLocation" /&gt;
  &lt;XlyStep :index="2" title="支付" icon="el:CreditCard" /&gt;
  &lt;XlyStep :index="3" title="完成" icon="el:CircleCheck" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义图标 - 方式2：icon 插槽 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义图标（方式2：icon 插槽）</h2>
      <p class="doc-section__desc">通过 <code>icon</code> 插槽自定义图标内容，适合需要更复杂图标或自定义样式的场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <XlySteps :active="1">
            <XlyStep :index="0" title="上传文件">
              <template #icon>
                <XlyIcon name="el:Upload" :size="16" color="currentColor" />
              </template>
            </XlyStep>
            <XlyStep :index="1" title="处理中">
              <template #icon>
                <XlyIcon name="el:Loading" :size="16" color="currentColor" />
              </template>
            </XlyStep>
            <XlyStep :index="2" title="完成">
              <template #icon>
                <XlyIcon name="el:CircleCheckFilled" :size="16" color="currentColor" />
              </template>
            </XlyStep>
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlySteps :active="1"&gt;
  &lt;XlyStep :index="0" title="上传文件"&gt;
    &lt;template #icon&gt;
      &lt;XlyIcon name="el:Upload" :size="16" color="currentColor" /&gt;
    &lt;/template&gt;
  &lt;/XlyStep&gt;
  &lt;XlyStep :index="1" title="处理中"&gt;
    &lt;template #icon&gt;
      &lt;XlyIcon name="el:Loading" :size="16" color="currentColor" /&gt;
    &lt;/template&gt;
  &lt;/XlyStep&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义颜色</h2>
      <p class="doc-section__desc">通过 <code>color</code> 属性自定义步骤条的主题色，支持 primary、success、error、wait 四种状态颜色。</p>
      <div class="doc-preview">
        <div class="doc-preview__body doc-preview__body--column">
          <div class="color-tabs">
            <button 
              v-for="preset in colorPresets" 
              :key="preset.name"
              type="button"
              class="color-tab"
              :class="{ 'is-active': currentColorPreset === preset.name }"
              @click="currentColorPreset = preset.name"
            >
              <span class="color-dot" :style="{ background: preset.color.primary }"></span>
              {{ preset.label }}
            </button>
          </div>
          <XlySteps :active="1" :color="currentColorConfig">
            <XlyStep :index="0" title="提交申请" description="申请已提交" />
            <XlyStep :index="1" title="审核中" description="正在审核" />
            <XlyStep :index="2" title="处理完成" />
          </XlySteps>
        </div>
        <div class="doc-code">
          <pre><code>// 自定义主题色
&lt;XlySteps :active="1" :color="{ primary: '#8b5cf6', success: '#10b981', error: '#f43f5e' }"&gt;
  &lt;XlyStep :index="0" title="提交申请" /&gt;
  &lt;XlyStep :index="1" title="审核中" /&gt;
  &lt;XlyStep :index="2" title="处理完成" /&gt;
&lt;/XlySteps&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>
      
      <h3 class="doc-subtitle">Steps Attributes</h3>
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
              <td>active</td>
              <td>当前激活步骤（从 0 开始）</td>
              <td>number</td>
              <td>—</td>
              <td>0</td>
            </tr>
            <tr>
              <td>direction</td>
              <td>步骤条方向</td>
              <td>string</td>
              <td>horizontal / vertical</td>
              <td>horizontal</td>
            </tr>
            <tr>
              <td>process-status</td>
              <td>当前步骤的状态</td>
              <td>string</td>
              <td>process / error</td>
              <td>process</td>
            </tr>
            <tr>
              <td>finish-status</td>
              <td>已完成步骤的状态</td>
              <td>string</td>
              <td>success / finish</td>
              <td>success</td>
            </tr>
            <tr>
              <td>align-center</td>
              <td>是否居中对齐</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>color</td>
              <td>自定义状态颜色</td>
              <td>object</td>
              <td>{ primary, success, error, wait }</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Step Attributes</h3>
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
              <td>title</td>
              <td>步骤标题</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>description</td>
              <td>步骤描述</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>index</td>
              <td>步骤索引（从 0 开始）</td>
              <td>number</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>status</td>
              <td>手动指定步骤状态（覆盖自动计算）</td>
              <td>string</td>
              <td>wait / process / success / error / finish</td>
              <td>—</td>
            </tr>
            <tr>
              <td>icon</td>
              <td>自定义图标名称（支持 el: 前缀）</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Step Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>icon</td>
              <td>自定义步骤图标</td>
            </tr>
            <tr>
              <td>title</td>
              <td>自定义步骤标题内容</td>
            </tr>
            <tr>
              <td>description</td>
              <td>自定义步骤描述内容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import XlySteps from '@/components/xly-steps/index.vue'
import XlyStep from '@/components/xly-steps/step.vue'
import XlyIcon from '@/components/xly-icon/index.vue'

const basicActive = ref(1)
const basicSteps = [
  { title: '创建账号', desc: '填写基本信息' },
  { title: '身份验证', desc: '验证手机号' },
  { title: '设置密码', desc: '设置登录密码' },
  { title: '完成注册', desc: '' },
]

function basicPrev() {
  if (basicActive.value > 0) basicActive.value--
}

function basicNext() {
  if (basicActive.value < basicSteps.length - 1) basicActive.value++
}

// 颜色预设
const currentColorPreset = ref('purple')
const colorPresets = [
  { 
    name: 'blue', 
    label: '默认蓝', 
    color: { primary: '#4f6ef7', success: '#10b981', error: '#ef4444', wait: '#d1d5db' } 
  },
  { 
    name: 'purple', 
    label: '优雅紫', 
    color: { primary: '#8b5cf6', success: '#10b981', error: '#f43f5e', wait: '#d1d5db' } 
  },
  { 
    name: 'orange', 
    label: '活力橙', 
    color: { primary: '#f97316', success: '#22c55e', error: '#ef4444', wait: '#d1d5db' } 
  },
  { 
    name: 'pink', 
    label: '浪漫粉', 
    color: { primary: '#ec4899', success: '#10b981', error: '#f43f5e', wait: '#d1d5db' } 
  },
]

const currentColorConfig = computed(() => {
  return colorPresets.find(p => p.name === currentColorPreset.value)?.color
})
</script>

<style scoped lang="scss">
.steps-doc {
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
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

// Demo actions
.demo-actions {
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
}

.step-indicator {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) { 
    border-color: #4f6ef7; 
    color: #4f6ef7;
    background: #f5f6ff;
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
    color: #fff;
  }
}

.btn-icon {
  width: 16px;
  height: 16px;
}

// Custom icon in demo
.custom-icon {
  width: 16px;
  height: 16px;
}

// Color tabs
.color-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.color-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }
  
  &.is-active {
    border-color: currentColor;
    background: #f5f6ff;
  }
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
