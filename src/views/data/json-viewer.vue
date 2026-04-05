<template>
  <div class="json-viewer-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">JsonViewer JSON 查看器</h1>
      <p class="doc-desc">
        用于美化和展示 JSON 数据，内置语法高亮、折叠/展开、复制等功能。基于 Vue 3 递归渲染实现，零第三方依赖，
        支持深度定制和主题切换。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        传入 <code>data</code> 属性即可展示 JSON 数据，组件自动解析并渲染。支持对象、数组、字符串、数字、布尔值、null 等数据类型。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="basicData" />
        </div>
        <div class="doc-code">
          <pre><code>{{ basicCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 深度控制 -->
    <section class="doc-section">
      <h2 class="doc-section__title">深度控制 <code>depth</code></h2>
      <p class="doc-section__desc">
        通过 <code>depth</code> 属性控制默认展开深度。设为 <code>0</code> 则默认全部展开，设为 <code>1</code> 则只展开第一层。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div>
            <span class="demo-label">depth=0（全部展开）</span>
            <XlyJsonViewer :data="basicData" :depth="0" />
          </div>
          <div>
            <span class="demo-label">depth=1（只展开第一层）</span>
            <XlyJsonViewer :data="basicData" :depth="1" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 全部展开 --&gt;
&lt;XlyJsonViewer :data="jsonData" :depth="0" /&gt;

&lt;!-- 只展开第一层 --&gt;
&lt;XlyJsonViewer :data="jsonData" :depth="1" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 最大高度 -->
    <section class="doc-section">
      <h2 class="doc-section__title">最大高度 <code>max-height</code></h2>
      <p class="doc-section__desc">
        设置 <code>max-height</code> 属性后，内容超出高度将显示滚动条。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="deepData" max-height="200px" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="jsonData" max-height="200px" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 宽度设置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">宽度设置 <code>width</code></h2>
      <p class="doc-section__desc">
        设置 <code>width</code> 属性可以自定义组件宽度，默认自适应父容器。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div>
            <span class="demo-label">width="400px"</span>
            <XlyJsonViewer :data="basicData" width="400px" />
          </div>
          <div>
            <span class="demo-label">width="100%"</span>
            <XlyJsonViewer :data="basicData" width="100%" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="jsonData" width="400px" /&gt;
&lt;XlyJsonViewer :data="jsonData" width="100%" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 主题切换 -->
    <section class="doc-section">
      <h2 class="doc-section__title">主题切换 <code>theme</code></h2>
      <p class="doc-section__desc">
        支持 <code>light</code>（默认）和 <code>dark</code> 两种主题。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div>
            <span class="demo-label">light（默认）</span>
            <XlyJsonViewer :data="basicData" />
          </div>
          <div>
            <span class="demo-label">dark</span>
            <XlyJsonViewer :data="basicData" theme="dark" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="jsonData" /&gt;
&lt;XlyJsonViewer :data="jsonData" theme="dark" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 隐藏工具栏按钮 -->
    <section class="doc-section">
      <h2 class="doc-section__title">隐藏工具栏按钮</h2>
      <p class="doc-section__desc">
        通过 <code>show-toolbar</code>、<code>show-copy</code>、<code>show-expand</code> 属性可以控制工具栏的显示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div>
            <span class="demo-label">隐藏工具栏</span>
            <XlyJsonViewer :data="basicData" :show-toolbar="false" />
          </div>
          <div>
            <span class="demo-label">只保留复制</span>
            <XlyJsonViewer :data="basicData" :show-expand="false" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 隐藏工具栏 --&gt;
&lt;XlyJsonViewer :data="jsonData" :show-toolbar="false" /&gt;

&lt;!-- 只保留复制按钮 --&gt;
&lt;XlyJsonViewer :data="jsonData" :show-expand="false" /&gt;</code></pre>
        </div>
      </div>
      <div class="doc-tip">
        <strong>去除工具栏：</strong>如不需要工具栏，找到组件模板中带注释 <code>&lt;!-- 🔌</code> 的代码块，删除对应行即可。具体位置：
        <pre style="margin: 8px 0; padding: 10px 14px; background: #f5f7fa; border-radius: 6px; font-size: 12px; overflow-x: auto;">
<span style="color:#50a3f5;">&lt;!-- 🔌 复制功能：如不需要，删除以下一行 --&gt;</span>
&lt;span v-if="showCopy" class="xly-json-viewer__btn" ...&gt;

<span style="color:#50a3f5;">&lt;!-- 🔌 展开/折叠功能：如不需要，删除以下两行 --&gt;</span>
&lt;span v-if="showExpand" class="xly-json-viewer__btn" title="展开全部" ...&gt;
&lt;span v-if="showExpand" class="xly-json-viewer__btn" title="折叠全部" ...&gt;
</pre>
      </div>
    </section>

    <!-- 字符串数据 -->
    <section class="doc-section">
      <h2 class="doc-section__title">字符串数据</h2>
      <p class="doc-section__desc">
        如果传入的是 JSON 字符串，组件会自动解析后展示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="stringJson" />
        </div>
        <div class="doc-code">
          <pre><code>const jsonStr = '{"name": "张三", "age": 18, "city": "北京"}'
&lt;XlyJsonViewer :data="jsonStr" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- Java 错误日志 -->
    <section class="doc-section">
      <h2 class="doc-section__title">Java 错误日志示例</h2>
      <p class="doc-section__desc">
        展示 Java 后端常见的错误日志结构，包括异常信息、堆栈跟踪、请求上下文等，适合对接真实接口后的日志展示场景。
      </p>

      <!-- 通用业务异常 -->
      <h3 class="doc-section__subtitle">业务异常（BusinessException）</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="businessErrorData" theme="dark" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="errorData" theme="dark" /&gt;</code></pre>
        </div>
      </div>

      <!-- 空指针异常 -->
      <h3 class="doc-section__subtitle">空指针异常（NullPointerException）</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="nullPointerErrorData" :depth="2" theme="dark" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="nullPointerErrorData" :depth="2" theme="dark" /&gt;</code></pre>
        </div>
      </div>

      <!-- 分页数据 -->
      <h3 class="doc-section__subtitle">分页响应数据</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyJsonViewer :data="pageData" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyJsonViewer :data="pageData" /&gt;</code></pre>
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
              <th style="width: 130px;">属性名</th>
              <th>说明</th>
              <th style="width: 140px;">类型</th>
              <th style="width: 80px;">默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data</code></td>
              <td>JSON 数据，支持对象、数组或 JSON 字符串</td>
              <td><code>unknown</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>depth</code></td>
              <td>默认展开深度，设为 0 表示全部展开</td>
              <td><code>number</code></td>
              <td><code>3</code></td>
            </tr>
            <tr>
              <td><code>max-height</code></td>
              <td>内容区最大高度，超出后显示滚动条</td>
              <td><code>string</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>组件宽度，默认自适应父容器</td>
              <td><code>string</code></td>
              <td><code>-</code></td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td>主题</td>
              <td><code>'light' | 'dark'</code></td>
              <td><code>'light'</code></td>
            </tr>
            <tr>
              <td><code>show-toolbar</code></td>
              <td>是否显示工具栏</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-copy</code></td>
              <td>是否显示复制按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-expand</code></td>
              <td>是否显示展开/折叠按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 基础数据
const basicData = ref({
  name: '张三',
  age: 28,
  isStudent: false,
  address: {
    city: '北京',
    district: '朝阳区',
    street: '望京 SOHO',
  },
  hobbies: ['读书', '游泳', '编程'],
  contact: {
    phone: '13800138000',
    email: 'zhangsan@example.com',
  },
})

const basicCode = `const jsonData = {
  name: '张三',
  age: 28,
  isStudent: false,
  address: {
    city: '北京',
    district: '朝阳区',
    street: '望京 SOHO',
  },
  hobbies: ['读书', '游泳', '编程'],
  contact: {
    phone: '13800138000',
    email: 'zhangsan@example.com',
  },
}

<XlyJsonViewer :data="basicData" />`

// 深度数据
const deepData = ref({
  level1: {
    level2: {
      level3: {
        level4: {
          level5: '深层数据',
          array: [1, 2, 3, 4, 5],
        },
      },
    },
  },
})

// 字符串 JSON
const stringJson = ref('{"name": "张三", "age": 18, "city": "北京"}')

// ===== Java 错误日志示例 =====

// 业务异常
const businessErrorData = ref({
  success: false,
  code: 400,
  message: '参数校验失败',
  errorType: 'BusinessException',
  timestamp: '2026-04-04 16:30:25',
  traceId: 'a1b2c3d4e5f6g7h8',
  details: {
    field: 'username',
    rejectedValue: '',
    bindingResult: {
      fieldErrors: [
        { field: 'username', defaultMessage: '用户名不能为空' },
        { field: 'password', defaultMessage: '密码长度不能少于6位' },
      ],
    },
  },
  request: {
    url: '/api/user/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ***',
      'X-Request-ID': 'req-123456',
    },
  },
})

// 空指针异常
const nullPointerErrorData = ref({
  success: false,
  code: 500,
  message: '系统内部错误，请稍后重试',
  errorType: 'NullPointerException',
  timestamp: '2026-04-04 16:35:10',
  traceId: 'i9j0k1l2m3n4o5p6',
  exception: {
    message: 'Cannot invoke method on null object',
    localizedMessage: 'Cannot invoke method on null object',
    stackTrace: [
      { className: 'com.example.service.UserService', methodName: 'getUserInfo', fileName: 'UserService.java', lineNumber: 45 },
      { className: 'com.example.controller.UserController', methodName: 'getById', fileName: 'UserController.java', lineNumber: 28 },
      { className: 'jdk.internal.reflect.NativeMethodAccessorImpl', methodName: 'invoke0', fileName: 'NativeMethodAccessorImpl.java', lineNumber: -2 },
      { className: 'jdk.internal.reflect.DelegatingMethodAccessorImpl', methodName: 'invoke', fileName: 'DelegatingMethodAccessorImpl.java', lineNumber: 43 },
      { className: 'org.springframework.web.method.support.InvocableHandlerMethod', methodName: 'doInvoke', fileName: 'InvocableHandlerMethod.java', lineNumber: 207 },
    ],
    cause: null,
  },
  context: {
    userId: null,
    requestId: 'req-789012',
    sessionId: 'sess-345678',
    ip: '192.168.1.100',
  },
})

// 分页响应
const pageData = ref({
  success: true,
  code: 200,
  message: 'success',
  data: {
    records: [
      { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', status: 'ACTIVE', createTime: '2026-01-15 10:30:00' },
      { id: 2, name: '李四', age: 35, email: 'lisi@example.com', status: 'INACTIVE', createTime: '2026-02-20 14:22:00' },
      { id: 3, name: '王五', age: 42, email: 'wangwu@example.com', status: 'LOCKED', createTime: '2026-03-05 09:15:00' },
    ],
    total: 156,
    size: 10,
    current: 1,
    pages: 16,
  },
  timestamp: '2026-04-04 16:40:00',
})
</script>

<style lang="scss">
.json-viewer-doc {
  .demo-label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 13px;
    color: #8e8ea0;
  }

  .xly-json-viewer {
    width: 100%;
    max-width: 600px;
  }
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

.doc-tip {
  margin-top: 12px; padding: 12px 16px;
  background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 8px;
  font-size: 13px; color: #0369a1; line-height: 1.6;
}
</style>
