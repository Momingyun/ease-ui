<template>
  <div class="divider-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Divider 分割线</h1>
      <p class="doc-desc">
        区分内容的分隔线，可设置内容、文字位置、样式等。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        默认的水平和垂直分割线。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="demo-block">
            <span>文章标题</span>
            <XlyDivider />
            <span>文章正文</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;span&gt;文章标题&lt;/span&gt;
&lt;XlyDivider /&gt;
&lt;span&gt;文章正文&lt;/span&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 带内容的分割线 -->
    <section class="doc-section">
      <h2 class="doc-section__title">带内容的分割线</h2>
      <p class="doc-section__desc">
        通过默认插槽在分割线中插入内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="demo-block demo-block--vertical">
            <span>周一</span>
            <XlyDivider>周二</XlyDivider>
            <span>周三</span>
            <XlyDivider>周四</XlyDivider>
            <span>周五</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;span&gt;周一&lt;/span&gt;
&lt;XlyDivider&gt;周二&lt;/XlyDivider&gt;
&lt;span&gt;周三&lt;/span&gt;
&lt;XlyDivider&gt;周四&lt;/XlyDivider&gt;
&lt;span&gt;周五&lt;/span&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 文字位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">文字位置</h2>
      <p class="doc-section__desc">
        通过 <code>content-position</code> 属性设置内容的位置。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-column">
          <XlyDivider content-position="left">左侧</XlyDivider>
          <XlyDivider content-position="center">居中</XlyDivider>
          <XlyDivider content-position="right">右侧</XlyDivider>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDivider content-position="left"&gt;左侧&lt;/XlyDivider&gt;
&lt;XlyDivider content-position="center"&gt;居中&lt;/XlyDivider&gt;
&lt;XlyDivider content-position="right"&gt;右侧&lt;/XlyDivider&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 垂直分割线 -->
    <section class="doc-section">
      <h2 class="doc-section__title">垂直分割线</h2>
      <p class="doc-section__desc">
        通过 <code>direction="vertical"</code> 设置为垂直分割线。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="demo-inline">
            <span>选项一</span>
            <XlyDivider direction="vertical" />
            <span>选项二</span>
            <XlyDivider direction="vertical" />
            <span>选项三</span>
            <XlyDivider direction="vertical" />
            <span>选项四</span>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;span&gt;选项一&lt;/span&gt;
&lt;XlyDivider direction="vertical" /&gt;
&lt;span&gt;选项二&lt;/span&gt;
&lt;XlyDivider direction="vertical" /&gt;
&lt;span&gt;选项三&lt;/span&gt;
&lt;XlyDivider direction="vertical" /&gt;
&lt;span&gt;选项四&lt;/span&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 简约模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">简约模式</h2>
      <p class="doc-section__desc">
        通过 <code>plain</code> 属性设置简约模式，隐藏分割线本身，仅显示文字。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-column">
          <XlyDivider plain>简约分割线</XlyDivider>
          <XlyDivider plain content-position="left">左侧简约</XlyDivider>
          <XlyDivider plain content-position="right">右侧简约</XlyDivider>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDivider plain&gt;简约分割线&lt;/XlyDivider&gt;
&lt;XlyDivider plain content-position="left"&gt;左侧简约&lt;/XlyDivider&gt;
&lt;XlyDivider plain content-position="right"&gt;右侧简约&lt;/XlyDivider&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义样式</h2>
      <p class="doc-section__desc">
        通过 <code>color</code> 和 <code>border-width</code> 属性自定义分割线颜色和粗细。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body demo-column">
          <XlyDivider color="#4f6ef7">蓝色分割线</XlyDivider>
          <XlyDivider color="#67c23a" :border-width="2">绿色加粗</XlyDivider>
          <XlyDivider color="#f56c6c" border-width="3">红色三倍粗</XlyDivider>
          <XlyDivider color="#e8e8e8" plain>浅灰色简约</XlyDivider>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyDivider color="#4f6ef7"&gt;蓝色分割线&lt;/XlyDivider&gt;
&lt;XlyDivider color="#67c23a" :border-width="2"&gt;绿色加粗&lt;/XlyDivider&gt;
&lt;XlyDivider color="#f56c6c" border-width="3"&gt;红色三倍粗&lt;/XlyDivider&gt;
&lt;XlyDivider color="#e8e8e8" plain&gt;浅灰色简约&lt;/XlyDivider&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">分割线在实际业务中的常见用法。</p>
      
      <!-- 分隔内容块 -->
      <h3 class="doc-subsection__title">分隔内容块</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="scenario-block">
          <div class="scenario-block__header">
            <h4>基本设置</h4>
          </div>
          <div class="scenario-block__content">
            <div class="scenario-form">
              <div class="scenario-form__item">
                <label>站点名称</label>
                <span>我的博客</span>
              </div>
              <div class="scenario-form__item">
                <label>站点描述</label>
                <span>分享技术与生活</span>
              </div>
            </div>
          </div>
          <XlyDivider />
          <div class="scenario-block__header">
            <h4>高级设置</h4>
          </div>
          <div class="scenario-block__content">
            <div class="scenario-form">
              <div class="scenario-form__item">
                <label>域名绑定</label>
                <span>blog.example.com</span>
              </div>
              <div class="scenario-form__item">
                <label>SSL证书</label>
                <span>已启用</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签导航 -->
      <h3 class="doc-subsection__title">标签组分隔</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-tags">
          <XlyTag type="primary">标签一</XlyTag>
          <XlyDivider direction="vertical" />
          <XlyTag type="success">标签二</XlyTag>
          <XlyDivider direction="vertical" />
          <XlyTag type="warning">标签三</XlyTag>
          <XlyDivider direction="vertical" />
          <XlyTag type="danger">标签四</XlyTag>
        </div>
      </div>

      <!-- 步骤分组 -->
      <h3 class="doc-subsection__title">步骤指示器</h3>
      <div class="doc-preview doc-preview--noborder">
        <div class="demo-steps">
          <div class="demo-step">
            <div class="demo-step__number">1</div>
            <span>填写信息</span>
          </div>
          <XlyDivider direction="vertical" />
          <div class="demo-step">
            <div class="demo-step__number">2</div>
            <span>确认订单</span>
          </div>
          <XlyDivider direction="vertical" />
          <div class="demo-step">
            <div class="demo-step__number">3</div>
            <span>完成支付</span>
          </div>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
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
              <td><code>direction</code></td>
              <td>分割线方向</td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
            </tr>
            <tr>
              <td><code>plain</code></td>
              <td>是否为简约模式</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>content-position</code></td>
              <td>内容位置</td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'center'</code></td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>分割线颜色</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>border-width</code></td>
              <td>线条宽度（px）</td>
              <td><code>string | number</code></td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><code>custom-class</code></td>
              <td>自定义类名</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>插槽名</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>default</code></td><td>分割线内容</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyDivider from '@/components/xly-divider/index.vue'
import XlyTag from '@/components/xly-tag/index.vue'
</script>

<style scoped lang="scss">
.divider-doc { padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-subsection__title { font-size: 15px; font-weight: 600; color: #4a4a6a; margin: 24px 0 12px; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6; code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; &--noborder { border: none; background: #fafbfd; } }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto; pre { margin: 0; padding: 0; } code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; } }
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto; table { width: 100%; border-collapse: collapse; font-size: 14px; } th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; } th { background: #fafbfd; font-weight: 600; color: #1a1a2e; } td { color: #4a4a6a; } code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }

// 演示区块
.demo-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  &--vertical {
    flex-direction: row;
    justify-content: center;
  }
}

.demo-column {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.demo-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

// 业务场景样式
.scenario-block {
  padding: 20px 24px;
  &__header {
    margin-bottom: 12px;
    h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1a1a2e;
    }
  }
  &__content {
    padding: 8px 0;
  }
}

.scenario-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      font-size: 14px;
      color: #8e8ea0;
    }
    span {
      font-size: 14px;
      color: #1a1a2e;
    }
  }
}

.demo-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;
}

.demo-steps {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
}

.demo-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  &__number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #4f6ef7;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
  }
  span {
    font-size: 13px;
    color: #4a4a6a;
  }
}
</style>
