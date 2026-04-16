<template>
  <div class="flow-design-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">FlowDesigner 流程设计器</h1>
      <p class="doc-desc">
        基于 LogicFlow 的可视化流程设计组件，支持仿钉钉模式和经典模式两种布局，
        内置节点拖拽、属性配置、监听器管理、流程保存与导出等完整能力。
        适用于审批流、工单流、业务流程编排等场景。
      </p>
      <p class="doc-desc">
        该流程设计器基于warmFlow平台的流程设计器组件进行二次开发，保留了核心功能并做了部分定制化修改以适配不同项目需求。非warmFlow项目可能不适用此流程设计器。
      </p>
      <p class="doc-desc">
        warmFlow项目地址：<a href="https://warm-flow.com/" target="_blank"
          >https://warm-flow.com/</a
        >
      </p>
      <p class="doc-desc">
        使用说明:参照warmFlow在线体验地址，体验项目中流程定义与流程图在同一页面完成，此流程设计器仅包含流程图设计部分，不包含流程定义，所以使用需要先完成流程定义再进行流程图设计，分为两步操作。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过 <code>flow</code> 属性传入流程定义对象，组件会自动加载流程数据并渲染画布。
        当前组件仅暴露一个 <code>flow</code> prop，内部状态均通过组件自行管理。
        <code>flow</code
        >信息在打开流程设计页面前通过接口自行获取，数据格式参考wormFlow文档或下方使用方式中示例数据。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="designer-wrap">
            <XlyFlowDesigner :flow="flow" @save="saveFlow" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyFlowDesigner :flow="flow" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!--自定义修改部分-->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义修改部分</h2>
      <p class="doc-section__desc">以下两个文件需要根据项目实际情况替换为自定义的人员选择组件。</p>
      <div class="customize-list">
        <div class="customize-card">
          <div class="customize-card__header">
            <span class="customize-card__step">1</span>
            <span class="customize-card__file"
              >/src/components/xly-flow-designer/common/vue/between.vue</span
            >
            <span class="customize-card__line">第 62-66 行</span>
          </div>
          <div class="customize-card__body">
            <p class="customize-card__desc">根据自己项目修改办理人选择组件</p>
            <div class="doc-code" style="border-top: none">
              <pre><code>&lt;xly-form-item label="办理人：" prop="permissionFlag"&gt;
  &lt;xly-input v-model="form.permissionFlag" placeholder="自行更换为自己的人员选择组件" /&gt;
  &lt;div class="placeholder mt5"&gt;tips:自行更换为自己的人员选择组件&lt;/div&gt;
&lt;/xly-form-item&gt;</code></pre>
            </div>
          </div>
        </div>
        <div class="customize-card">
          <div class="customize-card__header">
            <span class="customize-card__step">2</span>
            <span class="customize-card__file"
              >/src/components/xly-flow-designer/mimic/vue/baseNode.vue</span
            >
            <span class="customize-card__line">第 109 行</span>
          </div>
          <div class="customize-card__body">
            <p class="customize-card__desc">根据自己项目修改办理人显示组件</p>
            <div class="doc-code" style="border-top: none">
              <pre><code>&lt;span v-if="handler"&gt;{{handler}}&lt;/span&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">功能说明</h2>
      <p class="doc-section__desc">
        流程设计器支持两种布局模式，根据流程数据的 <code>modelValue</code> 字段自动切换。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body flex-col">
          <div>
            <div class="sub-label">仿钉钉模式 (MIMIC)</div>
            <ul class="feature-list">
              <li class="feature-item">
                <span class="feature-tag primary">布局</span>
                <span>节点垂直排列，连线自动路由，适合标准审批流</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag primary">交互</span>
                <span>单击节点弹出属性面板，鼠标悬浮连线显示操作菜单</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag primary">节点</span>
                <span>开始节点、中间审批节点、互斥网关、并行网关、结束节点</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag primary">操作</span>
                <span>通过连线菜单快速添加中间节点或网关节点</span>
              </li>
            </ul>
          </div>
          <div>
            <div class="sub-label">经典模式 (CLASSICS)</div>
            <ul class="feature-list">
              <li class="feature-item">
                <span class="feature-tag warning">布局</span>
                <span>自由画布，支持拖拽调整节点位置和连线</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag warning">交互</span>
                <span>双击节点/边打开属性面板，左侧拖拽面板添加节点</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag warning">节点</span>
                <span>开始节点、中间节点、互斥网关、并行网关、结束节点、连线节点</span>
              </li>
              <li class="feature-item">
                <span class="feature-tag warning">快捷键</span>
                <span>Delete 键删除选中的节点或边</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 工具栏 -->
    <section class="doc-section">
      <h2 class="doc-section__title">工具栏</h2>
      <p class="doc-section__desc">组件顶部工具栏提供画布操作和数据管理功能。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="toolbar-grid">
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">缩小</span>
                <span class="toolbar-item__desc">缩小画布视图</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">放大</span>
                <span class="toolbar-item__desc">放大画布视图</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">自适应</span>
                <span class="toolbar-item__desc">仅经典模式，画布内容居中并适配视口</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">上一步 / 下一步</span>
                <span class="toolbar-item__desc">撤销 / 重做操作历史</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">下载流程图</span>
                <span class="toolbar-item__desc">导出 PNG 格式流程图快照</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">下载 JSON</span>
                <span class="toolbar-item__desc">导出 WarmFlow 格式的流程定义 JSON</span>
              </div>
            </div>
            <div class="toolbar-item">
              <span class="toolbar-item__icon primary">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </span>
              <div class="toolbar-item__info">
                <span class="toolbar-item__name">保存</span>
                <span class="toolbar-item__desc">保存流程定义至后端服务</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 节点属性配置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">节点属性配置</h2>
      <p class="doc-section__desc">通过弹窗面板配置节点属性，不同节点类型展示不同的配置表单。</p>
      <div class="doc-preview">
        <div class="doc-preview__body flex-col">
          <div>
            <div class="sub-label">开始节点</div>
            <div class="node-config-card">
              <div class="node-config-card__tabs">
                <span class="tab active">基础设置</span>
                <span class="tab">监听器</span>
              </div>
              <ul class="config-fields">
                <li><code>节点编码</code> — 流程节点的唯一标识</li>
                <li><code>节点名称</code> — 显示在画布上的名称</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="sub-label">中间审批节点</div>
            <div class="node-config-card">
              <div class="node-config-card__tabs">
                <span class="tab active">基础设置</span>
                <span class="tab">监听器</span>
                <span class="tab">扩展属性</span>
              </div>
              <ul class="config-fields">
                <li><code>节点编码</code> — 流程节点的唯一标识（只读）</li>
                <li><code>节点名称</code> — 显示在画布上的名称</li>
                <li><code>协作方式</code> — 或签（任一人审批）/ 会签（所有人审批）</li>
                <li><code>审批人</code> — 指定审批人（支持角色、用户等选择）</li>
                <li><code>跳过条件</code> — 审批通过/拒绝后跳转的目标节点</li>
                <li><code>监听器</code> — 流程生命周期监听（开始/分派/完成/创建）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 安装依赖 -->
    <section class="doc-section">
      <h2 class="doc-section__title">安装依赖</h2>
      <p class="doc-section__desc">流程设计器基于 LogicFlow 实现，使用前请先安装核心依赖和扩展。</p>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none">
          <pre><code>{{ installCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 使用方式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">使用方式</h2>
      <p class="doc-section__desc">在业务页面中引入流程设计器组件，传入流程定义 ID 即可。</p>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none">
          <pre><code>{{ usageCode }}</code></pre>
        </div>
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
              <td><code>flowId</code></td>
              <td>流程定义 ID，组件根据此 ID 加载流程数据</td>
              <td><code>number | string</code></td>
              <td><code>null</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">内部状态</h3>
      <p class="doc-section__desc" style="margin-top: 12px">
        以下状态由组件内部管理，通过 <code>flowId</code> 的变化自动驱动。
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>状态</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>lf</code></td>
              <td>LogicFlow 实例</td>
              <td><code>LogicFlow</code></td>
            </tr>
            <tr>
              <td><code>nodeClick</code></td>
              <td>当前选中的节点数据</td>
              <td><code>object | null</code></td>
            </tr>
            <tr>
              <td><code>logicJson</code></td>
              <td>流程画布的完整 JSON 数据（节点 + 边）</td>
              <td><code>object</code></td>
            </tr>
            <tr>
              <td><code>isDark</code></td>
              <td>暗色模式标记，通过 <code>window.postMessage</code> 切换</td>
              <td><code>boolean</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">消息通信</h3>
      <p class="doc-section__desc" style="margin-top: 12px">
        组件通过 <code>window.postMessage</code> 与父窗口通信。
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方向</th>
              <th>type</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>接收</td>
              <td><code>theme-dark</code></td>
              <td>切换为暗色主题</td>
            </tr>
            <tr>
              <td>接收</td>
              <td><code>theme-light</code></td>
              <td>切换为亮色主题</td>
            </tr>
            <tr>
              <td>发送</td>
              <td><code>close</code></td>
              <td>通知父窗口关闭当前页面</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">节点类型</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>说明</th>
              <th>仿钉钉模式</th>
              <th>经典模式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>start</code></td>
              <td>开始节点</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td><code>between</code></td>
              <td>中间审批节点</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td><code>serial</code></td>
              <td>互斥网关（排他）</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td><code>parallel</code></td>
              <td>并行网关</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td><code>end</code></td>
              <td>结束节点</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td><code>skip</code></td>
              <td>连线（边）</td>
              <td>自动</td>
              <td>支持（含跳过条件）</td>
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
              <th>参数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>save</code></td>
              <td><code>(data: object) => void</code></td>
              <td>点击保存按钮时触发</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const flow = ref({
  category: '01K3QAXT4BWG7CX1VCZ0BDQGVN',
  categoryList: null,
  chartStatusColor: null,
  ext: '{}',
  extMap: null,
  flowCode: 'test',
  flowName: '测试',
  formCustom: 'N',
  formPath: '',
  id: null,
  instance: null,
  isPublish: 0,
  listenerPath: '',
  listenerType: '',
  modelValue: 'MIMIC',
  nodeList: [],
  topText: '',
  topTextShow: false,
  version: '1',
})

// 代码示例
const installCode = `# LogicFlow 核心
npm install @logicflow/core @logicflow/extension

# LogicFlow 样式
npm install @logicflow/core @logicflow/extension`

const usageCode =
  `<template>
  <div style="height: 100vh;">
    <XlyFlowDesigner :flowId="flowId" />
  </div>
</template>

<script setup lang="ts">

const flow = ref({category: '01K3QAXT4BWG7CX1VCZ0BDQGVN',
      categoryList: null,
      chartStatusColor: null,
      ext: '{}',
      extMap: null,
      flowCode: 'test',
      flowName: '测试',
      formCustom: 'N',
      formPath: '',
      id: null,
      instance: null,
      isPublish: 0,
      listenerPath: '',
      listenerType: '',
      modelValue: 'MIMIC',
      nodeList: [],
      topText: '',
      topTextShow: false,
      version: '1'})

// 暗色主题切换（可选）
window.postMessage({ type: 'theme-dark' }, '*')
window.postMessage({ type: 'theme-light' }, '*')
</scr` + `ipt>`

const saveFlow = (flowData: any) => {
  console.log('保存流程数据：', flowData)
}
</script>

<style scoped lang="scss">
.flow-design-doc {
  width: 90%;
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
  line-height: 1.7;
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
  display: flex;
  align-items: center;
  gap: 8px;

  code {
    font-size: 14px;
    font-weight: 400;
    color: #4f46e5;
    background: #eef2ff;
    padding: 2px 8px;
    border-radius: 4px;
  }
}

.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 16px;
  line-height: 1.7;

  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 24px 0 10px;
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.doc-preview__body {
  padding: 24px;

  &.flex-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
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
    font-size: 13.5px;
  }

  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
    font-size: 13px;
  }

  td {
    color: #4a4a6a;
  }

  code {
    background: #fafbfd;
    color: #1677ff;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    border: 1px solid #e8eaed;
  }
}

// ── 自定义修改卡片 ──
.customize-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.customize-card {
  border: 1px solid #f2f3f7;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: #d4e4ff;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: #fafbfd;
    border-bottom: 1px solid #f2f3f7;
  }

  &__step {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: #e6f4ff;
    color: #1677ff;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__file {
    flex: 1;
    min-width: 0;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 12.5px;
    color: #1a1a2e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #f1f5f9;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid #e8eaed;
  }

  &__line {
    flex-shrink: 0;
    font-size: 12px;
    color: #8e8ea0;
    background: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid #e8eaed;
  }

  &__body {
    padding: 14px 16px;
  }

  &__desc {
    font-size: 13.5px;
    color: #4a4a6a;
    margin: 0 0 12px;
    line-height: 1.5;
  }
}

// ── 设计器容器 ──
.designer-wrap {
  height: 600px;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  overflow: hidden;
}

// ── 小标签 ──
.sub-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #8e8ea0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #fafbfd;
  border: 1px solid #e8eaed;
  padding: 1px 8px;
  border-radius: 20px;
  margin-bottom: 12px;
}

// ── 功能列表 ──
.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #4a4a6a;
  line-height: 1.5;
}

.feature-tag {
  flex-shrink: 0;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;

  &.primary {
    background: #e6f4ff;
    color: #1677ff;
    border: 1px solid #91caff;
  }

  &.warning {
    background: #fff7e6;
    color: #d46b08;
    border: 1px solid #ffd591;
  }
}

// ── 工具栏网格 ──
.toolbar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.toolbar-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: #fafbfd;
  border: 1px solid #f2f3f7;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    border-color: #91caff;
    background: #f0f7ff;
  }

  &__icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f2f3f7;
    color: #8e8ea0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.primary {
      background: #e6f4ff;
      color: #1677ff;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 2px;
  }

  &__desc {
    display: block;
    font-size: 12px;
    color: #8e8ea0;
    line-height: 1.4;
  }
}

// ── 节点配置卡片 ──
.node-config-card {
  padding: 16px;
  background: #fafbfd;
  border: 1px solid #f2f3f7;
  border-radius: 10px;

  &__tabs {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f3f7;
  }
}

.tab {
  font-size: 13px;
  font-weight: 500;
  color: #8e8ea0;
  cursor: default;

  &.active {
    color: #1677ff;
    font-weight: 600;
  }
}

.config-fields {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    font-size: 13px;
    color: #4a4a6a;
    line-height: 1.5;
  }

  code {
    background: #f1f5f9;
    color: #1677ff;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}
</style>
