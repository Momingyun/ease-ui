<template>
  <div class="dict-tag-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">DictTag 字典标签</h1>
      <p class="doc-desc">
        根据字典类型自动请求并渲染对应的 Tag 标签。只需传入绑定值和字典类型，无需手写
        <code>if-else</code> 或维护颜色映射，支持单选 / 多选，可自定义字段名。
      </p>
    </div>

    <!-- 单选模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">单选模式</h2>
      <p class="doc-section__desc">
        默认为单选模式，<code>value</code> 传入字符串或数字，组件自动从字典中查找对应项并渲染 Tag。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div class="demo-row">
            <span class="demo-label">用户状态</span>
            <div class="demo-tags">
              <xly-dict-tag value="1" dict-type="user_status" />
              <xly-dict-tag value="2" dict-type="user_status" />
              <xly-dict-tag value="3" dict-type="user_status" />
              <xly-dict-tag value="4" dict-type="user_status" />
            </div>
          </div>
          <div class="demo-row">
            <span class="demo-label">审批状态</span>
            <div class="demo-tags">
              <xly-dict-tag value="0" dict-type="approve_status" />
              <xly-dict-tag value="1" dict-type="approve_status" />
              <xly-dict-tag value="2" dict-type="approve_status" />
              <xly-dict-tag value="3" dict-type="approve_status" />
              <xly-dict-tag value="4" dict-type="approve_status" />
            </div>
          </div>
          <div class="demo-row">
            <span class="demo-label">性别（含图标）</span>
            <div class="demo-tags">
              <xly-dict-tag value="1" dict-type="gender" />
              <xly-dict-tag value="2" dict-type="gender" />
              <xly-dict-tag value="0" dict-type="gender" />
            </div>
          </div>
          <div class="demo-row">
            <span class="demo-label">优先级（自定义颜色）</span>
            <div class="demo-tags">
              <xly-dict-tag value="low"    dict-type="priority" />
              <xly-dict-tag value="medium" dict-type="priority" />
              <xly-dict-tag value="high"   dict-type="priority" />
              <xly-dict-tag value="urgent" dict-type="priority" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 传入绑定值 + 字典类型，其余全部自动处理 --&gt;
&lt;xly-dict-tag value="1" dict-type="user_status" /&gt;
&lt;xly-dict-tag value="2" dict-type="approve_status" /&gt;

&lt;!-- 未匹配到字典时直接显示原始值，不报错 --&gt;
&lt;xly-dict-tag value="99" dict-type="user_status" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 多选模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多选模式</h2>
      <p class="doc-section__desc">
        添加 <code>multiple</code> 属性开启多选。值支持两种格式：
        <strong>逗号拼接字符串</strong>（如 <code>"1,2,3"</code>）或
        <strong>字符串数组</strong>（如 <code>['1','2','3']</code>），组件自动识别。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 20px;">
          <div class="demo-row">
            <span class="demo-label">逗号字符串</span>
            <xly-dict-tag value="1,2,3" dict-type="user_status" multiple />
          </div>
          <div class="demo-row">
            <span class="demo-label">字符串数组</span>
            <xly-dict-tag :value="['0','2','3']" dict-type="approve_status" multiple />
          </div>
          <div class="demo-row">
            <span class="demo-label">订单状态</span>
            <xly-dict-tag :value="['1','2','4']" dict-type="order_status" multiple />
          </div>
          <div class="demo-row">
            <span class="demo-label">优先级多选</span>
            <xly-dict-tag value="low,high,urgent" dict-type="priority" multiple />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 逗号拼接字符串（后端字段常见格式）--&gt;
&lt;xly-dict-tag value="1,2,3" dict-type="user_status" multiple /&gt;

&lt;!-- 字符串数组 --&gt;
&lt;xly-dict-tag :value="['0','2','3']" dict-type="approve_status" multiple /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 动态绑定 -->
    <section class="doc-section">
      <h2 class="doc-section__title">动态绑定</h2>
      <p class="doc-section__desc">
        与列表、表单数据动态绑定，字典标签随数据变化自动更新。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 16px;">
          <!-- 模拟表格 -->
          <table class="demo-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>状态</th>
                <th>角色</th>
                <th>性别</th>
                <th>权限</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableData" :key="row.name">
                <td>{{ row.name }}</td>
                <td><xly-dict-tag :value="row.status" dict-type="user_status" /></td>
                <td><xly-dict-tag :value="row.role" dict-type="role_type" /></td>
                <td><xly-dict-tag :value="row.gender" dict-type="gender" /></td>
                <td><xly-dict-tag :value="row.roles" dict-type="role_type" multiple /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 在表格中使用 --&gt;
&lt;el-table-column label="状态"&gt;
  &lt;template #default="{ row }"&gt;
    &lt;xly-dict-tag :value="row.status" dict-type="user_status" /&gt;
  &lt;/template&gt;
&lt;/el-table-column&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 主题效果 -->
    <section class="doc-section">
      <h2 class="doc-section__title">主题效果</h2>
      <p class="doc-section__desc">
        通过 <code>effect</code> 属性切换主题，支持 <code>light</code>（浅色，默认）、<code>plain</code>（描边）、<code>dark</code>（深色）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 14px;">
          <div class="demo-row">
            <span class="demo-label effect-label">light</span>
            <xly-dict-tag value="1,2,3,4" dict-type="user_status" multiple effect="light" />
          </div>
          <div class="demo-row">
            <span class="demo-label effect-label">plain</span>
            <xly-dict-tag value="1,2,3,4" dict-type="user_status" multiple effect="plain" />
          </div>
          <div class="demo-row">
            <span class="demo-label effect-label">dark</span>
            <xly-dict-tag value="1,2,3,4" dict-type="user_status" multiple effect="dark" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-dict-tag value="1" dict-type="user_status" effect="light" /&gt;
&lt;xly-dict-tag value="1" dict-type="user_status" effect="plain" /&gt;
&lt;xly-dict-tag value="1" dict-type="user_status" effect="dark" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 尺寸与圆角 -->
    <section class="doc-section">
      <h2 class="doc-section__title">尺寸与圆角</h2>
      <p class="doc-section__desc">
        <code>size</code> 控制大小（large / default / small），<code>round</code> 开启胶囊圆角。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 14px;">
          <div class="demo-row">
            <span class="demo-label">Large</span>
            <xly-dict-tag value="1" dict-type="user_status" size="large" />
            <xly-dict-tag value="2" dict-type="approve_status" size="large" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Default</span>
            <xly-dict-tag value="1" dict-type="user_status" />
            <xly-dict-tag value="2" dict-type="approve_status" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Small</span>
            <xly-dict-tag value="1" dict-type="user_status" size="small" />
            <xly-dict-tag value="2" dict-type="approve_status" size="small" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Round</span>
            <xly-dict-tag value="1,2,3" dict-type="user_status" multiple round />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;xly-dict-tag value="1" dict-type="user_status" size="large" /&gt;
&lt;xly-dict-tag value="1" dict-type="user_status" size="small" /&gt;
&lt;xly-dict-tag value="1,2" dict-type="user_status" multiple round /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 图标配置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">图标配置</h2>
      <p class="doc-section__desc">
        字典数据中设置 <code>icon</code> 字段即可在 Tag 左侧显示图标。图标使用 <code>xly-icon</code> 组件，名称需加 <code>el:</code> 前缀（如 <code>el:User</code>）表示 Element Plus 内置图标。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 14px;">
          <div class="demo-row">
            <span class="demo-label">带图标</span>
            <xly-dict-tag value="1" dict-type="gender" />
            <xly-dict-tag value="2" dict-type="gender" />
            <xly-dict-tag value="0" dict-type="gender" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>// 字典数据中添加 icon 字段（el: 前缀 = Element Plus 图标）
{ id: '1', labelValue: '男', icon: 'el:Male' }
{ id: '2', labelValue: '女', icon: 'el:Female' }
{ id: '0', labelValue: '未知' }</code></pre>
        </div>
      </div>
      <div class="doc-tip">
        <strong>去除图标：</strong>如不需要图标功能，找到组件模板中带注释 <code>&lt;!-- 🔌 图标：</code> 的代码行，删除即可。具体位置：
        <pre style="margin: 8px 0; padding: 10px 14px; background: #f5f7fa; border-radius: 6px; font-size: 12px; overflow-x: auto;">
<span style="color:#50a3f5;">&lt;!-- 🔌 图标：如不需要图标，删除以下一行 --&gt;</span>
&lt;xly-icon v-if="singleItem.icon" :name="singleItem.icon" /&gt;

<span style="color:#50a3f5;">&lt;!-- 🔌 图标：如不需要图标，删除以下一行 --&gt;</span>
&lt;xly-icon v-if="item.icon" :name="item.icon" /&gt;
</pre>
      </div>
    </section>

    <!-- 自定义字段名 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段名</h2>
      <p class="doc-section__desc">
        默认 label 字段为 <code>labelValue</code>，value 字段为 <code>id</code>。
        通过 <code>label-field</code> 和 <code>value-field</code> 可对接任意接口字段名，
        无需改动接口返回数据。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 14px;">
          <div class="demo-row">
            <span class="demo-label">默认字段</span>
            <span class="demo-hint">labelValue / id</span>
            <xly-dict-tag value="1" dict-type="user_status" />
          </div>
          <div class="demo-row">
            <span class="demo-label">自定义字段</span>
            <span class="demo-hint">name / code</span>
            <!-- 使用自定义字段的字典类型（演示用） -->
            <xly-dict-tag
              value="active"
              dict-type="custom_field_demo"
              label-field="name"
              value-field="code"
            />
            <xly-dict-tag
              value="inactive"
              dict-type="custom_field_demo"
              label-field="name"
              value-field="code"
            />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 默认：id → labelValue --&gt;
&lt;xly-dict-tag value="1" dict-type="user_status" /&gt;

&lt;!-- 自定义：code → name --&gt;
&lt;xly-dict-tag
  value="active"
  dict-type="your_dict"
  label-field="name"
  value-field="code"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 空值降级 -->
    <section class="doc-section">
      <h2 class="doc-section__title">空值与未匹配处理</h2>
      <p class="doc-section__desc">
        当值为空时不渲染任何内容；当值无法匹配到字典项时直接显示原始值，保证页面不会空白或报错。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div class="demo-row">
            <span class="demo-label">空值</span>
            <span class="demo-hint">[不渲染]</span>
            <xly-dict-tag value="" dict-type="user_status" />
            <xly-dict-tag :value="null" dict-type="user_status" />
          </div>
          <div class="demo-row">
            <span class="demo-label">未匹配</span>
            <span class="demo-hint">[显示原始值]</span>
            <xly-dict-tag value="999" dict-type="user_status" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 空值不渲染 --&gt;
&lt;xly-dict-tag value="" dict-type="user_status" /&gt;
&lt;xly-dict-tag :value="null" dict-type="user_status" /&gt;

&lt;!-- 未匹配时显示原始值 --&gt;
&lt;xly-dict-tag value="999" dict-type="user_status" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 二开指南 -->
    <section class="doc-section">
      <h2 class="doc-section__title">⚙️ 二开指南：对接真实接口</h2>
      <p class="doc-section__desc">
        组件内置了 <code>fetchDictList</code> 函数负责数据请求，只需替换此函数即可对接您自己的字典接口，无需修改其他任何代码。
      </p>
      <div class="doc-preview">
        <div class="doc-code" style="border-top: none; border-radius: 12px;">
          <pre><code>// 📁 src/components/xly-dict-tag/index.vue

// ✅ 第一步：引入您的接口方法
import { getDictDataByType } from '@/api/system/dict'

// ✅ 第二步：替换 fetchDictList 函数
async function fetchDictList(dictType: string): Promise&lt;DictItem[]&gt; {
  const res = await getDictDataByType(dictType)
  // ✅ 第三步：映射为组件期望的格式
  // 默认期望每条数据有 id 和 labelValue 字段
  // 如果您的接口字段名不同，有两种方案：
  //
  // 方案 A：在这里统一 map 转换
  return res.data.map(item => ({
    id: item.dictValue,       // 对应 value-field 默认值 "id"
    labelValue: item.dictLabel, // 对应 label-field 默认值 "labelValue"
    type: item.listClass,     // 可选：Tag 类型（success/warning/danger 等）
    color: item.color,        // 可选：自定义颜色（覆盖 type）
    icon: item.dictIcon,      // 可选：图标名（el: 前缀 = Element Plus 图标，如 "el:User"）
  }))

  // 方案 B：直接返回原始数据，通过 label-field / value-field 属性指定字段名
  // return res.data
  // 然后在使用组件时指定字段：
  // &lt;xly-dict-tag label-field="dictLabel" value-field="dictValue" ... /&gt;
}

// ✅ 可选：增加缓存，避免相同字典类型重复请求
const dictCache = new Map&lt;string, DictItem[]&gt;()

async function fetchDictList(dictType: string): Promise&lt;DictItem[]&gt; {
  if (dictCache.has(dictType)) {
    return dictCache.get(dictType)!
  }
  const res = await getDictDataByType(dictType)
  const list = res.data.map(item => ({ ... }))
  dictCache.set(dictType, list)
  return list
}</code></pre>
        </div>
      </div>

      <div class="tip-block">
        <div class="tip-block__icon">💡</div>
        <div class="tip-block__content">
          <strong>推荐做法：</strong>将 <code>fetchDictList</code> 提取到
          <code>src/utils/dict.ts</code> 中统一管理，所有使用字典的组件
          （如 <code>XlyDictSelect</code>）都引用同一个带缓存的请求函数，
          避免同一字典类型在页面上多次网络请求。
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">DictTag Props</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>value</code></td>
              <td>绑定值。单选为字符串/数字，多选支持逗号拼接字符串或字符串数组</td>
              <td><code>string | number | string[] | null</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>dict-type</code></td>
              <td>字典类型标识，组件内部根据此值请求字典数据</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>是否开启多选模式，多选时渲染多个 Tag</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>label-field</code></td>
              <td>字典项中显示文本的字段名</td>
              <td><code>string</code></td>
              <td><code>'labelValue'</code></td>
            </tr>
            <tr>
              <td><code>value-field</code></td>
              <td>字典项中值的字段名，用于匹配 value</td>
              <td><code>string</code></td>
              <td><code>'id'</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>标签尺寸</td>
              <td><code>'large' | 'default' | 'small'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>effect</code></td>
              <td>主题效果</td>
              <td><code>'light' | 'plain' | 'dark'</code></td>
              <td><code>'light'</code></td>
            </tr>
            <tr>
              <td><code>round</code></td>
              <td>是否为圆角胶囊形</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">DictItem 字典数据结构</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>字段</th>
              <th>说明</th>
              <th>类型</th>
              <th>是否必须</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code>（或自定义）</td>
              <td>字典项的值，对应 <code>value-field</code> 属性</td>
              <td><code>string | number</code></td>
              <td>✅ 必须</td>
            </tr>
            <tr>
              <td><code>labelValue</code>（或自定义）</td>
              <td>字典项的显示文本，对应 <code>label-field</code> 属性</td>
              <td><code>string</code></td>
              <td>✅ 必须</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>Tag 样式类型，优先级低于 color</td>
              <td><code>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'</code></td>
              <td>可选</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>自定义颜色，覆盖 type 的预设色</td>
              <td><code>string</code>（CSS 颜色值）</td>
              <td>可选</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>前置图标，使用 xly-icon 组件。<code>el:xxx</code> 表示 Element Plus 图标（如 <code>el:User</code>）。不传则不显示</td>
              <td><code>string</code></td>
              <td>可选</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyDictTag from '@/components/xly-dict-tag/index.vue'

const tableData = [
  { name: '张三', status: '1', role: 'admin',   gender: '1', roles: 'admin,editor' },
  { name: '李四', status: '2', role: 'editor',  gender: '2', roles: 'editor,viewer' },
  { name: '王五', status: '3', role: 'manager', gender: '1', roles: 'manager' },
  { name: '赵六', status: '1', role: 'viewer',  gender: '0', roles: 'viewer' },
]
</script>

<style scoped lang="scss">
.dict-tag-doc {
  padding: 8px 0 40px;
}

.doc-header { margin-bottom: 36px; }
.doc-title {
  font-size: 26px; font-weight: 700; color: #1a1a2e;
  margin: 0 0 8px; letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6;
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
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
  gap: 10px; padding: 24px;
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
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; white-space: nowrap; }
  td { color: #4a4a6a; }
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

/* 演示行布局 */
.demo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.demo-label {
  font-size: 13px;
  color: #8e8ea0;
  min-width: 100px;
  flex-shrink: 0;
}
.demo-hint {
  font-size: 12px;
  color: #c0c4cc;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  margin-right: 4px;
}
.demo-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.effect-label {
  min-width: 44px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
}

/* 模拟表格 */
.demo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th, td {
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid #f2f3f7;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
  }
  td { color: #4a4a6a; }
}

/* 提示块 */
.tip-block {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(79, 110, 247, 0.06);
  border: 1px solid rgba(79, 110, 247, 0.2);
  border-radius: 10px;
  margin-top: 12px;
  align-items: flex-start;
}
.tip-block__icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.tip-block__content {
  font-size: 13px;
  color: #4a4a6a;
  line-height: 1.7;
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 1px 5px;
    border-radius: 4px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
  strong { color: #1a1a2e; }
}
</style>
