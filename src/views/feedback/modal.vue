<template>
  <div class="modal-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Modal 弹窗</h1>
      <p class="doc-desc">
        企业级对话框组件，支持多种尺寸、动画效果、自定义插槽，内置确认/取消操作。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过 <code>v-model</code> 控制弹窗显示与隐藏，<code>title</code> 设置标题。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="basicVisible = true">打开弹窗</XlyButton>
          <XlyModal v-model="basicVisible" title="基础弹窗">
            <p>这是一个基础弹窗，点击遮罩或关闭按钮可关闭。</p>
          </XlyModal>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyButton @click="visible = true"&gt;打开弹窗&lt;/XlyButton&gt;
&lt;XlyModal v-model="visible" title="基础弹窗"&gt;
  &lt;p&gt;这是一个基础弹窗。&lt;/p&gt;
&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>size</code> 属性设置弹窗尺寸，提供 <code>small</code>(480px) /
        <code>default</code>(560px) / <code>large</code>(780px) /
        <code>fullscreen</code> 四种规格。也可通过 <code>width</code> 属性自定义宽度。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="smallVisible = true">小型弹窗</XlyButton>
          <XlyButton @click="defaultVisible = true">默认弹窗</XlyButton>
          <XlyButton @click="largeVisible = true">大型弹窗</XlyButton>
          <XlyButton @click="fullVisible = true">全屏弹窗</XlyButton>
          <XlyButton @click="customVisible = true">自定义宽度</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" title="小型" size="small"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="默认" size="default"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="大型" size="large"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="全屏" size="fullscreen"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="自定义" width="400px"&gt;...&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal v-model="smallVisible" title="小型弹窗" size="small">
        <p>宽度 480px，适用于简单的确认操作场景。</p>
      </XlyModal>
      <XlyModal v-model="defaultVisible" title="默认弹窗">
        <p>宽度 560px，适用于大多数常规表单和内容展示。</p>
      </XlyModal>
      <XlyModal v-model="largeVisible" title="大型弹窗" size="large">
        <p>宽度 780px，适用于内容较多、需要更大展示空间的场景，如详情查看、复杂表单等。</p>
      </XlyModal>
      <XlyModal v-model="fullVisible" title="全屏弹窗" size="fullscreen">
        <p>全屏弹窗，适用于需要最大展示空间的场景。</p>
      </XlyModal>
      <XlyModal v-model="customVisible" title="自定义宽度" width="400px">
        <p>通过 width 属性自定义宽度为 400px。</p>
      </XlyModal>
    </section>

    <!-- 动画效果 -->
    <section class="doc-section">
      <h2 class="doc-section__title">动画效果</h2>
      <p class="doc-section__desc">
        通过 <code>transition</code> 属性设置弹窗动画，支持
        <code>zoom</code
        >（缩放）、<code>slide-up</code>（从下方滑入）、<code>slide-down</code>（从上方滑入）、<code>fade</code>（淡入）四种效果。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="zoomVisible = true">缩放动画</XlyButton>
          <XlyButton @click="slideUpVisible = true">上滑动画</XlyButton>
          <XlyButton @click="slideDownVisible = true">下滑动画</XlyButton>
          <XlyButton @click="fadeVisible = true">淡入动画</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" title="缩放" transition="zoom"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="上滑" transition="slide-up"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="下滑" transition="slide-down"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" title="淡入" transition="fade"&gt;...&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal v-model="zoomVisible" title="缩放动画" transition="zoom">
        <p>默认的缩放弹窗动画，带有弹性缓动效果。</p>
      </XlyModal>
      <XlyModal v-model="slideUpVisible" title="上滑动画" transition="slide-up">
        <p>从下方滑入的动画效果，适合底部操作场景。</p>
      </XlyModal>
      <XlyModal v-model="slideDownVisible" title="下滑动画" transition="slide-down">
        <p>从上方滑入的动画效果，适合顶部通知场景。</p>
      </XlyModal>
      <XlyModal v-model="fadeVisible" title="淡入动画" transition="fade">
        <p>简洁的淡入淡出效果，适合轻量级提示场景。</p>
      </XlyModal>
    </section>

    <!-- 自定义弹出位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义弹出位置</h2>
      <p class="doc-section__desc">
        通过 <code>placement</code> 属性设置弹窗弹出位置，支持 9 个方向。还可通过
        <code>offset</code> 属性微调偏移量。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="placementCenter = true">居中（默认）</XlyButton>
          <XlyButton @click="placementTop = true">顶部居中</XlyButton>
          <XlyButton @click="placementTopLeft = true">左上角</XlyButton>
          <XlyButton @click="placementTopRight = true">右上角</XlyButton>
          <XlyButton @click="placementBottom = true">底部居中</XlyButton>
          <XlyButton @click="placementBottomLeft = true">左下角</XlyButton>
          <XlyButton @click="placementBottomRight = true">右下角</XlyButton>
          <XlyButton @click="placementLeft = true">左侧居中</XlyButton>
          <XlyButton @click="placementRight = true">右侧居中</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 居中（默认） --&gt;
&lt;XlyModal v-model="visible" placement="center"&gt;...&lt;/XlyModal&gt;
&lt;!-- 顶部居中 --&gt;
&lt;XlyModal v-model="visible" placement="top"&gt;...&lt;/XlyModal&gt;
&lt;!-- 右上角，偏移 20px --&gt;
&lt;XlyModal v-model="visible" placement="top-right"
  :offset="{ x: '20px', y: '20px' }"&gt;...&lt;/XlyModal&gt;
&lt;!-- 左侧居中 --&gt;
&lt;XlyModal v-model="visible" placement="left"&gt;...&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal v-model="placementCenter" title="居中（默认）" size="small">
        <p>默认居中显示，最常用的弹窗位置。</p>
      </XlyModal>
      <XlyModal v-model="placementTop" title="顶部居中" size="small" placement="top">
        <p>顶部水平居中弹出。</p>
      </XlyModal>
      <XlyModal v-model="placementTopLeft" title="左上角" size="small" placement="top-left">
        <p>左上角弹出，适合通知提示场景。</p>
      </XlyModal>
      <XlyModal v-model="placementTopRight" title="右上角" size="small" placement="top-right">
        <p>右上角弹出，适合通知或帮助面板。</p>
      </XlyModal>
      <XlyModal v-model="placementBottom" title="底部居中" size="small" placement="bottom">
        <p>底部水平居中弹出。</p>
      </XlyModal>
      <XlyModal v-model="placementBottomLeft" title="左下角" size="small" placement="bottom-left">
        <p>左下角弹出。</p>
      </XlyModal>
      <XlyModal v-model="placementBottomRight" title="右下角" size="small" placement="bottom-right">
        <p>右下角弹出，适合聊天窗口场景。</p>
      </XlyModal>
      <XlyModal v-model="placementLeft" title="左侧居中" size="small" placement="left">
        <p>左侧垂直居中弹出，适合侧边面板场景。</p>
      </XlyModal>
      <XlyModal v-model="placementRight" title="右侧居中" size="small" placement="right">
        <p>右侧垂直居中弹出，适合详情抽屉场景。</p>
      </XlyModal>
    </section>

    <!-- 自定义内容 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义内容</h2>
      <p class="doc-section__desc">
        通过 <code>#header</code>、默认插槽和 <code>#footer</code> 完全自定义弹窗内容。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="customContentVisible = true">自定义弹窗</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" :show-footer="false"&gt;
  &lt;template #header&gt;
    &lt;div style="display:flex;align-items:center;gap:8px"&gt;
      &lt;el-icon color="#4f6ef7"&gt;&lt;WarningFilled /&gt;&lt;/el-icon&gt;
      &lt;span style="color:#1a1a2e;font-weight:600"&gt;确认删除&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;p&gt;确定要删除该记录吗？此操作不可撤销。&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;div style="display:flex;justify-content:flex-end;gap:10px"&gt;
      &lt;XlyButton type="text" @click="visible = false"&gt;取消&lt;/XlyButton&gt;
      &lt;XlyButton type="danger" @click="handleDelete"&gt;确认删除&lt;/XlyButton&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal v-model="customContentVisible" :show-footer="false">
        <template #header>
          <div class="custom-header">
            <el-icon color="#f56c6c" :size="20"><WarningFilled /></el-icon>
            <span class="custom-header__text">确认删除</span>
          </div>
        </template>
        <div class="custom-body">
          <p>确定要删除该记录吗？此操作不可撤销。</p>
          <p class="custom-body__sub">删除后数据将无法恢复，请谨慎操作。</p>
        </div>
        <template #footer>
          <div class="custom-footer">
            <XlyButton type="text" @click="customContentVisible = false">取消</XlyButton>
            <XlyButton type="danger" @click="customContentVisible = false">确认删除</XlyButton>
          </div>
        </template>
      </XlyModal>
    </section>

    <!-- 无遮罩 -->
    <section class="doc-section">
      <h2 class="doc-section__title">无遮罩弹窗</h2>
      <p class="doc-section__desc">
        通过
        <code>:show-mask="false"</code>
        隐藏遮罩层，适用于悬浮面板、浮动工具栏等不需要背景遮罩的场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="noMaskVisible = true">无遮罩弹窗</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" title="悬浮面板" :show-mask="false"
  placement="center"&gt;
  &lt;p&gt;这是一个没有遮罩的弹窗。&lt;/p&gt;
&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal
        v-model="noMaskVisible"
        title="悬浮面板"
        :show-mask="false"
        :show-footer="false"
        placement="center"
        size="small"
      >
        <p>没有遮罩层的弹窗，背景完全透明，适合悬浮面板场景。</p>
      </XlyModal>
    </section>

    <!-- 无头无尾 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏头尾</h2>
      <p class="doc-section__desc">
        通过 <code>:show-header="false"</code> 和
        <code>:show-footer="false"</code> 隐藏弹窗头部和底部，适合纯展示或自定义布局。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="noHeaderVisible = true">无头部弹窗</XlyButton>
          <XlyButton @click="noFooterVisible = true">无底部弹窗</XlyButton>
          <XlyButton @click="onlyBodyVisible = true">纯内容弹窗</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" :show-header="false"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" :show-footer="false"&gt;...&lt;/XlyModal&gt;
&lt;XlyModal v-model="visible" :show-header="false" :show-footer="false"&gt;...&lt;/XlyModal&gt;</code></pre>
        </div>
      </div>

      <XlyModal v-model="noHeaderVisible" :show-header="false" title="无头部">
        <p>没有标题栏的弹窗，适合纯展示场景。</p>
      </XlyModal>
      <XlyModal v-model="noFooterVisible" title="无底部" :show-footer="false">
        <p>没有底部操作栏的弹窗，适合只读信息展示。</p>
      </XlyModal>
      <XlyModal v-model="onlyBodyVisible" :show-header="false" :show-footer="false" size="small">
        <div style="text-align: center; padding: 20px 0">
          <el-icon color="#34c759" :size="48"><CircleCheckFilled /></el-icon>
          <p style="margin-top: 16px; font-size: 16px; font-weight: 600; color: #1a1a2e">
            操作成功
          </p>
          <p style="margin-top: 8px; font-size: 14px; color: #8e8ea0">数据已成功保存</p>
        </div>
      </XlyModal>
    </section>

    <!-- 确认加载 -->
    <section class="doc-section">
      <h2 class="doc-section__title">确认加载</h2>
      <p class="doc-section__desc">
        通过 <code>confirm-loading</code> 属性让确认按钮进入加载状态，适用于异步提交场景。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton @click="loadingVisible = true">提交表单</XlyButton>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyModal v-model="visible" title="提交确认" :confirm-loading="loading"
  @confirm="handleSubmit" @cancel="handleCancel"&gt;
  &lt;p&gt;确认提交该表单数据吗？&lt;/p&gt;
&lt;/XlyModal&gt;

// JS
function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible.value = false
  }, 2000)
}</code></pre>
        </div>
      </div>

      <XlyModal
        v-model="loadingVisible"
        title="提交确认"
        :confirm-loading="confirmLoading"
        @confirm="handleConfirm"
        @cancel="loadingVisible = false"
      >
        <p>确认提交该表单数据吗？提交后将进入审核流程。</p>
      </XlyModal>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>
      <p class="doc-section__desc">弹窗在实际业务中的常见用法。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyButton type="danger" @click="deleteVisible = true">删除确认</XlyButton>
          <XlyButton type="primary" @click="formVisible = true">表单弹窗</XlyButton>
          <XlyButton type="success" @click="successVisible = true">成功提示</XlyButton>
        </div>
      </div>

      <XlyModal v-model="deleteVisible" :show-footer="false" size="small">
        <template #header>
          <div class="custom-header">
            <el-icon color="#f56c6c" :size="20"><WarningFilled /></el-icon>
            <span class="custom-header__text">删除确认</span>
          </div>
        </template>
        <div class="custom-body">
          <p>确定要删除选中的 <strong>3</strong> 条记录吗？</p>
          <p class="custom-body__sub">此操作不可撤销，删除后数据将无法恢复。</p>
        </div>
        <template #footer>
          <div class="custom-footer">
            <XlyButton type="text" @click="deleteVisible = false">取消</XlyButton>
            <XlyButton type="danger" @click="deleteVisible = false">确认删除</XlyButton>
          </div>
        </template>
      </XlyModal>

      <XlyModal v-model="formVisible" title="新增用户" size="small">
        <div class="demo-form">
          <div class="demo-form__item">
            <label class="demo-form__label">用户名 <span class="required">*</span></label>
            <el-input placeholder="请输入用户名" size="default" />
          </div>
          <div class="demo-form__item">
            <label class="demo-form__label">邮箱 <span class="required">*</span></label>
            <el-input placeholder="请输入邮箱" size="default" />
          </div>
          <div class="demo-form__item">
            <label class="demo-form__label">角色</label>
            <el-select placeholder="请选择角色" size="default" style="width: 100%">
              <el-option label="管理员" value="admin" />
              <el-option label="编辑者" value="editor" />
              <el-option label="查看者" value="viewer" />
            </el-select>
          </div>
          <div class="demo-form__item">
            <label class="demo-form__label">备注</label>
            <el-input type="textarea" placeholder="请输入备注" :rows="3" />
          </div>
        </div>
      </XlyModal>

      <XlyModal
        v-model="successVisible"
        :show-header="false"
        :show-footer="false"
        size="small"
        transition="zoom"
      >
        <div style="text-align: center; padding: 24px 0">
          <div
            style="
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: rgba(52, 199, 89, 0.1);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 16px;
            "
          >
            <el-icon color="#34c759" :size="28"><CircleCheckFilled /></el-icon>
          </div>
          <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #1a1a2e">操作成功</p>
          <p style="margin: 0 0 20px; font-size: 14px; color: #8e8ea0; line-height: 1.6">
            用户数据已成功保存
          </p>
          <XlyButton type="primary" @click="successVisible = false">我知道了</XlyButton>
        </div>
      </XlyModal>
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
              <td><code>model-value / v-model</code></td>
              <td>是否显示弹窗</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>弹窗标题</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>弹窗尺寸</td>
              <td><code>'small' | 'default' | 'large' | 'fullscreen'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>自定义宽度（优先级高于 size）</td>
              <td><code>string | number</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>弹窗弹出位置</td>
              <td><code>'center' | 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right'</code></td>
              <td><code>'center'</code></td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td>偏移量，与 placement 配合使用</td>
              <td><code>string | { x?: string; y?: string }</code></td>
              <td><code>'0'</code></td>
            </tr>
            <tr>
              <td><code>show-close</code></td>
              <td>是否显示关闭按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-header</code></td>
              <td>是否显示头部</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-footer</code></td>
              <td>是否显示底部</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-mask</code></td>
              <td>是否显示遮罩层</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>confirm-text</code></td>
              <td>确认按钮文字</td>
              <td><code>string</code></td>
              <td><code>'确定'</code></td>
            </tr>
            <tr>
              <td><code>cancel-text</code></td>
              <td>取消按钮文字</td>
              <td><code>string</code></td>
              <td><code>'取消'</code></td>
            </tr>
            <tr>
              <td><code>confirm-loading</code></td>
              <td>确认按钮加载中</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>close-on-click-modal</code></td>
              <td>点击遮罩是否关闭</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>transition</code></td>
              <td>弹窗动画</td>
              <td><code>'zoom' | 'slide-up' | 'slide-down' | 'fade'</code></td>
              <td><code>'zoom'</code></td>
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
            <tr><td><code>default</code></td><td>弹窗主体内容</td></tr>
            <tr><td><code>header</code></td><td>自定义头部内容（替换默认标题）</td></tr>
            <tr><td><code>footer</code></td><td>自定义底部内容（替换默认按钮）</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr><th>事件名</th><th>说明</th><th>参数</th></tr>
          </thead>
          <tbody>
            <tr><td><code>update:model-value</code></td><td>弹窗显示状态变化时触发</td><td><code>(value: boolean)</code></td></tr>
            <tr><td><code>confirm</code></td><td>点击确认按钮时触发</td><td>—</td></tr>
            <tr><td><code>cancel</code></td><td>点击取消按钮时触发</td><td>—</td></tr>
            <tr><td><code>close</code></td><td>弹窗关闭时触发</td><td>—</td></tr>
            <tr><td><code>open</code></td><td>弹窗打开前触发</td><td>—</td></tr>
            <tr><td><code>opened</code></td><td>弹窗打开动画结束后触发</td><td>—</td></tr>
            <tr><td><code>after-close</code></td><td>弹窗关闭动画结束后触发</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CircleCheckFilled, WarningFilled } from '@element-plus/icons-vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyModal from '@/components/xly-modal/index.vue'

const basicVisible = ref(false)
const smallVisible = ref(false)
const defaultVisible = ref(false)
const largeVisible = ref(false)
const fullVisible = ref(false)
const customVisible = ref(false)
const zoomVisible = ref(false)
const slideUpVisible = ref(false)
const slideDownVisible = ref(false)
const fadeVisible = ref(false)
const customContentVisible = ref(false)
const noMaskVisible = ref(false)
const placementCenter = ref(false)
const placementTop = ref(false)
const placementTopLeft = ref(false)
const placementTopRight = ref(false)
const placementBottom = ref(false)
const placementBottomLeft = ref(false)
const placementBottomRight = ref(false)
const placementLeft = ref(false)
const placementRight = ref(false)
const noHeaderVisible = ref(false)
const noFooterVisible = ref(false)
const onlyBodyVisible = ref(false)
const loadingVisible = ref(false)
const confirmLoading = ref(false)
function handleConfirm() {
  confirmLoading.value = true
  setTimeout(() => {
    confirmLoading.value = false
    loadingVisible.value = false
  }, 2000)
}
const deleteVisible = ref(false)
const formVisible = ref(false)
const successVisible = ref(false)
</script>

<style scoped lang="scss">
.modal-doc {  padding: 8px 0 40px; }
.doc-header { margin-bottom: 36px; }
.doc-title { font-size: 26px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; letter-spacing: -0.3px; }
.doc-desc { font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6; }
.doc-section { margin-bottom: 32px; }
.doc-section__title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7; }
.doc-section__desc { font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6; code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.doc-preview { border: 1px solid #f2f3f7; border-radius: 12px; overflow: hidden; background: #fff; }
.doc-preview__body { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 24px; }
.doc-code { border-top: 1px solid #f2f3f7; background: #fafbfd; padding: 16px 20px; overflow-x: auto; pre { margin: 0; padding: 0; } code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre; } }
.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto; table { width: 100%; border-collapse: collapse; font-size: 14px; } th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; } th { background: #fafbfd; font-weight: 600; color: #1a1a2e; } td { color: #4a4a6a; } code { background: #f5f6fa; color: #4f6ef7; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: 'SF Mono', 'Fira Code', Consolas, monospace; } }
.custom-header { display: flex; align-items: center; gap: 8px; &__text { font-size: 17px; font-weight: 600; color: #1a1a2e; } }
.custom-body { p { margin: 0 0 8px; color: #4a4a6a; line-height: 1.7; strong { color: #1a1a2e; } } &__sub { font-size: 13px !important; color: #8e8ea0 !important; } }
.custom-footer { display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
.demo-form { display: flex; flex-direction: column; gap: 16px; &__item { display: flex; flex-direction: column; gap: 6px; } &__label { font-size: 14px; font-weight: 500; color: #1a1a2e; .required { color: #f56c6c; } } }
</style>
