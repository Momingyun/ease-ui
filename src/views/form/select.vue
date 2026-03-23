<template>
  <div class="component-doc">
    <header class="doc-header">
      <h1 class="doc-title">下拉选择框 Select</h1>
      <p class="doc-desc">通过下拉菜单展示选项供用户选择，支持单选、多选、搜索过滤、清除等功能。</p>
    </header>

    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        <code>options</code> 支持两种格式：
      </p>
      <ul class="doc-section__list">
        <li>对象数组：每个选项包含 <code>label</code> 和 <code>value</code>，适用于需要显示文本和实际值不一致的场景</li>
        <li>基础数组：直接传入字符串或数字数组，组件会自动将每个元素同时作为 label 和 value，适用于简单场景</li>
      </ul>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val1" :options="cityOptions" placeholder="对象数组" />
          </div>
          <div style="width: 300px">
            <XlySelect v-model="val15" :options="simpleCityOptions" placeholder="基础数组" />
          </div>
          <div style="width: 300px">
            <span style="font-size: 13px; color: #8e8ea0">对象数组当前值：{{ val1 ?? '未选择' }}</span>
          </div>
          <div style="width: 300px">
            <span style="font-size: 13px; color: #8e8ea0">基础数组当前值：{{ val15 ?? '未选择' }}</span>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>// 1. 对象数组（label 和 value 分离）
&lt;XlySelect v-model="value" :options="options" placeholder="对象数组" /&gt;

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

// 2. 基础数组（元素同时作为 label 和 value）
&lt;XlySelect v-model="value" :options="simpleOptions" placeholder="基础数组" /&gt;

const simpleOptions = ['北京', '上海', '广州', '深圳']
// 选择后的 value 就是字符串本身，如 '北京'、'上海'</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">可清除</h2>
      <p class="doc-section__desc">
        设置 <code>clearable</code> 属性后，选中值右侧会出现清除图标。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val2" :options="cityOptions" placeholder="可清除" clearable />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect v-model="value" :options="options" clearable /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">可搜索</h2>
      <p class="doc-section__desc">
        设置 <code>filterable</code> 属性后，可通过输入关键字快速筛选选项。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val3" :options="longOptions" placeholder="输入搜索..." filterable />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect v-model="value" :options="options" filterable /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">可创建条目</h2>
      <p class="doc-section__desc">
        设置 <code>allow-create</code> 属性后，用户可以在搜索框中输入内容，通过右侧的"添加"按钮创建新条目。注意：
        <code>filterable</code> 必须为 <code>true</code> 时才能使用此功能。如果输入的内容已存在于选项中，"添加"按钮将禁用。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val14" :options="cityOptions" placeholder="输入并点击添加按钮" filterable allow-create />
          </div>
          <div style="width: 300px">
            <span style="font-size: 13px; color: #8e8ea0">当前值：{{ val14 ?? '未选择' }}</span>
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect
  v-model="value"
  :options="options"
  filterable
  allow-create
  placeholder="输入并点击添加按钮"
  @create="handleCreate"
/&gt;

function handleCreate(newValue) {
  console.log('创建了新条目:', newValue)
}</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">多选</h2>
      <p class="doc-section__desc">
        设置 <code>multiple</code> 属性后，可选择多个值，选中项以标签形式展示。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 400px">
            <XlySelect
              v-model="val4"
              :options="cityOptions"
              placeholder="可多选"
              multiple
              :max-tag-count="3"
              clearable
              filterable
              allow-create
            />
          </div>
          <div style="font-size: 13px; color: #8e8ea0">当前值：{{ JSON.stringify(val4) }}</div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect v-model="value" :options="options" multiple :max-tag-count="3" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">返回值类型</h2>
      <p class="doc-section__desc">
        通过 <code>valueType</code> 属性可以设置多选时返回值的类型。支持 <code>'array'</code>（返回数组）和 <code>'string'</code>（返回逗号分隔的字符串）两种模式。
        <code>separator</code> 属性可以自定义字符串模式下的分隔符，默认为 <code>','</code>。
        此功能也支持默认传入字符串值，组件会自动解析为数组进行渲染。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 400px;">
            <XlySelect
              v-model="val10"
              :options="cityOptions"
              placeholder="返回数组（默认）"
              multiple
              value-type="array"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（数组）：{{ JSON.stringify(val10) }}</span>

          <div style="width: 400px;">
            <XlySelect
              v-model="val11"
              :options="cityOptions"
              placeholder="返回字符串（逗号分隔）"
              multiple
              value-type="string"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（字符串）：{{ val11 }}</span>

          <div style="width: 400px;">
            <XlySelect
              v-model="val12"
              :options="cityOptions"
              placeholder="自定义分隔符（分号）"
              multiple
              value-type="string"
              separator=";"
              clearable
            />
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值（分号分隔）：{{ val12 }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>// 1. 返回数组（默认）
&lt;XlySelect v-model="value" :options="options" multiple value-type="array" /&gt;
// 输出: ['beijing', 'shanghai', 'guangzhou']

// 2. 返回字符串（逗号分隔）
&lt;XlySelect v-model="value" :options="options" multiple value-type="string" /&gt;
// 输出: "beijing,shanghai,guangzhou"

// 3. 自定义分隔符
&lt;XlySelect v-model="value" :options="options" multiple value-type="string" separator=";" /&gt;
// 输出: "beijing;shanghai;guangzhou"

// 4. 支持默认传入字符串值，组件会自动解析
const value = ref("beijing,shanghai,guangzhou")
// 组件会自动将其解析为 ['beijing', 'shanghai', 'guangzhou'] 进行渲染</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">禁用选项 & 禁用状态</h2>
      <p class="doc-section__desc">
        通过在选项中设置 <code>disabled: true</code> 来禁用单个选项，或通过 <code>disabled</code> 属性禁用整个选择器。也可以通过 <code>disabledKey</code> 自定义禁用字段名，或传入函数自定义禁用逻辑。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val5" :options="disabledOptions" placeholder="含禁用选项" />
          </div>
          <div style="width: 300px">
            <XlySelect v-model="val5" :options="customDisabledOptions" placeholder="箭头函数直接写禁用逻辑" :disabled-key="(item) => item.stock === 0" />
          </div>
          <div style="width: 300px">
            <XlySelect v-model="val5" :options="cityOptions" placeholder="整组禁用" disabled />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>// 1. 默认使用 disabled 字段
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2', disabled: true },  // 禁用
]

// 2. 自定义禁用字段名
&lt;XlySelect :options="options" disabled-key="isDisabled" /&gt;

// 3. 直接在组件上写箭头函数（推荐）
&lt;XlySelect
  :options="options"
  :disabled-key="(item) => item.stock === 0"
/&gt;

// 4. 使用定义的函数（适用于复杂逻辑）
function isItemDisabled(option: any) {
  return option.stock === 0 || option.price > 10000
}

&lt;XlySelect :options="options" :disabled-key="isItemDisabled" /&gt;

// 5. 整个组件禁用
&lt;XlySelect :options="options" disabled /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">前后缀</h2>
      <p class="doc-section__desc">
        通过 <code>prefixIcon</code> / <code>suffixIcon</code> 传入图标名称（XlyIcon name
        格式），或通过 <code>#prefix</code> / <code>#suffix</code> 插槽自定义内容。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect
              v-model="val1"
              :options="cityOptions"
              placeholder="搜索城市"
              prefix-icon="el:Search"
              filterable
            />
          </div>
          <div style="width: 300px">
            <XlySelect
              v-model="val2"
              :options="cityOptions"
              placeholder="带后缀"
              suffix-icon="el:Calendar"
              clearable
            />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect v-model="value" :options="options" placeholder="搜索城市" prefix-icon="el:Search" filterable /&gt;
&lt;XlySelect v-model="value" :options="options" placeholder="带后缀" suffix-icon="el:Calendar" clearable /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义字段名</h2>
      <p class="doc-section__desc">
        当选项对象的字段名不是 <code>label</code> / <code>value</code> 时，通过
        <code>labelKey</code> 和 <code>valueKey</code> 指定取值字段。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect
              v-model="val7"
              :options="userOptions"
              placeholder="请选择用户"
              label-key="name"
              value-key="id"
              clearable
            />
          </div>
          <div style="font-size: 13px; color: #8e8ea0">当前值：{{ val7 ?? '未选择' }}</div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>// 选项对象字段不是 label/value，而是 name/id
const userOptions = [
  { id: 1, name: '张三', role: 'admin' },
  { id: 2, name: '李四', role: 'editor' },
  { id: 3, name: '王五', role: 'viewer' },
]

&lt;XlySelect v-model="value" :options="userOptions" label-key="name" value-key="id" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">不同尺寸</h2>
      <p class="doc-section__desc">通过 <code>size</code> 属性设置三种尺寸。</p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect v-model="val6" :options="cityOptions" placeholder="大尺寸" size="large" />
          </div>
          <div style="width: 300px">
            <XlySelect v-model="val6" :options="cityOptions" placeholder="默认尺寸" />
          </div>
          <div style="width: 300px">
            <XlySelect v-model="val6" :options="cityOptions" placeholder="小尺寸" size="small" />
          </div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect v-model="value" :options="options" size="large" /&gt;
&lt;XlySelect v-model="value" :options="options" /&gt;
&lt;XlySelect v-model="value" :options="options" size="small" /&gt;</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">远程搜索</h2>
      <p class="doc-section__desc">
        设置 <code>remote</code> 和 <code>remote-method</code> 属性启用远程搜索，通过 <code>loading</code> 显示加载状态。
        搜索关键字将通过 <code>remote-method</code> 回调传入，你可以在回调中发起请求并通过组件实例的 <code>remoteOptions</code> 更新搜索结果。
      </p>
      <div class="doc-preview">
        <div
          class="doc-preview__body"
          style="flex-direction: column; align-items: flex-start; gap: 12px"
        >
          <div style="width: 300px">
            <XlySelect
              ref="remoteSelectRef"
              v-model="val8"
              :options="[]"
              placeholder="输入关键字远程搜索..."
              filterable
              remote
              :remote-method="remoteSelectSearch"
              :loading="remoteLoading"
              clearable
            />
          </div>
          <div style="font-size: 13px; color: #8e8ea0">当前值：{{ val8 ?? '未选择' }}</div>
        </div>
      </div>
      <div class="doc-code">
        <pre><code>&lt;XlySelect
  ref="selectRef"
  v-model="value"
  :options="[]"
  filterable
  remote
  :remote-method="handleSearch"
  :loading="loading"
  clearable
/&gt;

// 在 remoteMethod 中发起远程请求并更新选项
function handleSearch(query: string) {
  loading.value = true
  fetchOptions(query).then(options =&gt; {
    selectRef.value.remoteOptions = options
    loading.value = false
  })
}</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section__title">自定义选项</h2>
      <p class="doc-section__desc">
        使用 <code>#option</code> 插槽可以完全自定义选项的渲染内容。插槽会传递 <code>option</code>（当前选项对象）、<code>index</code>（索引）和 <code>selected</code>（是否选中）三个参数。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div style="width: 300px;">
            <XlySelect
              v-model="val9"
              :options="styledOptions"
              placeholder="自定义选项"
            >
              <template #option="{ option, index, selected }">
                <div class="custom-option">
                  <span v-if="option?.value === 'urgent'" class="priority-badge urgent">紧急</span>
                  <span v-if="option?.value === 'important'" class="priority-badge important">重要</span>
                  <span v-if="option?.value === 'special'" class="priority-badge special">特别</span>
                  <span>{{ option?.label }}</span>
                  <span v-if="selected" class="check-mark">✓</span>
                </div>
              </template>
            </XlySelect>
          </div>
          <span style="font-size: 13px; color: #8e8ea0;">当前值：{{ val9 ?? '未选择' }}</span>
        </div>
      </div>
      <div class="doc-code">
        <pre v-html="codeExample"></pre>
      </div>
    </section>

    <section class="doc-section">
      <h3 class="doc-subtitle">API</h3>
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
              <td><code>modelValue</code></td>
              <td>绑定值</td>
              <td><code>string | number | boolean | array</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td>选项数组，支持对象数组 <code>[{label, value}, ...]</code> 或基础数组 <code>['选项1', '选项2', ...]</code></td>
              <td><code>SelectOption[] | string[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>占位文本</td>
              <td><code>string</code></td>
              <td><code>'请选择'</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>是否可清除</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>filterable</code></td>
              <td>是否可搜索</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>allow-create</code></td>
              <td>是否允许用户创建新条目（需配合 filterable 使用）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>是否多选</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>valueType</code></td>
              <td>多选时返回值的类型，'array' 返回数组，'string' 返回分隔符分隔的字符串</td>
              <td><code>'array' | 'string'</code></td>
              <td><code>'array'</code></td>
            </tr>
            <tr>
              <td><code>separator</code></td>
              <td>多选且 valueType='string' 时的分隔符</td>
              <td><code>string</code></td>
              <td><code>','</code></td>
            </tr>
            <tr>
              <td><code>maxTagCount</code></td>
              <td>多选时最多显示的标签数</td>
              <td><code>number</code></td>
              <td><code>3</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>尺寸</td>
              <td><code>'large' | 'default' | 'small'</code></td>
              <td><code>'default'</code></td>
            </tr>
            <tr>
              <td><code>listMaxHeight</code></td>
              <td>下拉列表最大高度</td>
              <td><code>string</code></td>
              <td><code>'274px'</code></td>
            </tr>
            <tr>
              <td><code>prefixIcon</code></td>
              <td>前缀图标名称（XlyIcon name 格式）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>suffixIcon</code></td>
              <td>后缀图标名称（XlyIcon name 格式）</td>
              <td><code>string</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>valueKey</code></td>
              <td>选项值对应的字段名</td>
              <td><code>string</code></td>
              <td><code>'value'</code></td>
            </tr>
            <tr>
              <td><code>labelKey</code></td>
              <td>选项标签对应的字段名</td>
              <td><code>string</code></td>
              <td><code>'label'</code></td>
            </tr>
            <tr>
              <td><code>disabledKey</code></td>
              <td>选项禁用状态对应的字段名，默认 `'disabled'`。也可以是函数 `(option) => boolean`</td>
              <td><code>string | Function</code></td>
              <td><code>'disabled'</code></td>
            </tr>
            <tr>
              <td><code>remote</code></td>
              <td>是否启用远程搜索</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>remoteMethod</code></td>
              <td>远程搜索方法</td>
              <td><code>(query: string) =&gt; void</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>是否显示加载中状态</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>debounce</code></td>
              <td>远程搜索防抖延迟（毫秒）</td>
              <td><code>number</code></td>
              <td><code>300</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">options 数组格式</h3>
      <p style="font-size: 14px; color: #8e8ea0; margin: 0 0 10px; line-height: 1.6">
        <code>options</code> 属性支持两种格式：
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>格式</th>
              <th>说明</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>对象数组</code></td>
              <td>每个选项包含 <code>label</code>（显示文本）和 <code>value</code>（实际值），适用于显示文本和值不一致的场景</td>
              <td><code>[{ label: '北京', value: 'bj' }, ...]</code></td>
            </tr>
            <tr>
              <td><code>基础数组</code></td>
              <td>直接传入字符串或数字数组，元素同时作为 label 和 value，适用于简单场景</td>
              <td><code>['北京', '上海', '广州']</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">SelectOption（对象数组时的选项对象）</h3>
      <p style="font-size: 14px; color: #8e8ea0; margin: 0 0 10px; line-height: 1.6">
        当使用对象数组格式时，选项对象支持任意字段，默认通过 <code>label</code> 和 <code>value</code> 取值，可通过
        <code>labelKey</code> / <code>valueKey</code> 自定义。
        <code>disabled</code> 字段为固定保留字段，设为 <code>true</code> 可禁用该选项。
      </p>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>字段</th>
              <th>说明</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td>选项显示文本</td>
              <td><code>string</code></td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>选项值</td>
              <td><code>string | number | boolean</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
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
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td>值变化时触发</td>
              <td><code>(value: any)</code></td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>值变化时触发</td>
              <td><code>(value: any)</code></td>
            </tr>
            <tr>
              <td><code>clear</code></td>
              <td>点击清除按钮时触发</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>remove-tag</code></td>
              <td>多选模式下移除标签时触发</td>
              <td><code>(value: any, index: number)</code></td>
            </tr>
            <tr>
              <td><code>search</code></td>
              <td>远程搜索时触发</td>
              <td><code>(query: string)</code></td>
            </tr>
            <tr>
              <td><code>create</code></td>
              <td>用户创建新条目时触发</td>
              <td><code>(value: any)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
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
              <td><code>prefix</code></td>
              <td>前缀内容</td>
            </tr>
            <tr>
              <td><code>suffix</code></td>
              <td>后缀内容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlySelect from '@/components/xly-select/index.vue'

const val1 = ref<string | number>('beijing')
const val2 = ref<string | number>()
const val3 = ref<string | number>()
const val4 = ref<(string | number | boolean)[]>([])
const val5 = ref<string | number>()
const val6 = ref<string | number>()
const val7 = ref<string | number>()
const val8 = ref<string | number>()
const val10 = ref<(string | number | boolean)[]>([])
const val11 = ref<string>()
const val12 = ref<string>()
const val14 = ref<string | number>()
const val15 = ref<string>()

// 远程搜索示例
const remoteSelectRef = ref<InstanceType<typeof XlySelect> | null>(null)
const remoteLoading = ref(false)

function remoteSelectSearch(query: string) {
  if (!remoteSelectRef.value) return
  if (!query) {
    remoteSelectRef.value.remoteOptions = []
    return
  }
  remoteLoading.value = true
  // 模拟远程搜索延迟
  setTimeout(() => {
    const q = query.toLowerCase()
    remoteSelectRef.value!.remoteOptions = cityOptions.filter(
      o => o.label.toLowerCase().includes(q),
    )
    remoteLoading.value = false
  }, 500)
}

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' },
  { label: '北京1', value: 'beijing1' },
  { label: '上海1', value: 'shanghai1' },
  { label: '广州1', value: 'guangzhou1' },
  { label: '深圳1', value: 'shenzhen1' },
  { label: '杭州1', value: 'hangzhou1' },
  { label: '成都1', value: 'chengdu1' },
]

// 基础数组示例
const simpleCityOptions = ['北京', '上海', '广州', '深圳', '杭州', '成都']

const longOptions = [
  { label: '北京市', value: 'bj' },
  { label: '上海市', value: 'sh' },
  { label: '广州市', value: 'gz' },
  { label: '深圳市', value: 'sz' },
  { label: '杭州市', value: 'hz' },
  { label: '成都市', value: 'cd' },
  { label: '武汉市', value: 'wh' },
  { label: '南京市', value: 'nj' },
  { label: '重庆市', value: 'cq' },
  { label: '西安市', value: 'xa' },
]

const disabledOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州（禁用）', value: 'guangzhou', disabled: true },
  { label: '深圳', value: 'shenzhen' },
]

// 自定义禁用条件示例
const customDisabledOptions = [
  { label: 'iPhone 15', value: 'iphone15', stock: 10, price: 6999 },
  { label: 'iPhone 15 Pro', value: 'iphone15pro', stock: 5, price: 8999 },
  { label: 'iPhone 15 Pro Max', value: 'iphone15promax', stock: 0, price: 9999 },
  { label: 'MacBook Air', value: 'macbookair', stock: 0, price: 8999 },
]

const userOptions = [
  { id: 1, name: '张三', role: 'admin' },
  { id: 2, name: '李四', role: 'editor' },
  { id: 3, name: '王五', role: 'viewer' },
]

// 自定义选项示例
const val9 = ref<string | number>()

const styledOptions = [
  { label: '紧急', value: 'urgent' },
  { label: '重要', value: 'important' },
  { label: '普通', value: 'normal' },
  { label: '低优先级', value: 'low' },
  { label: '特殊选项', value: 'special' },
]

// 自定义选项代码示例
const codeExample = `&lt;XlySelect v-model="value" :options="options"&gt;
  &lt;template #option="{ option, index, selected }"&gt;
    &lt;div class="custom-option"&gt;
      &lt;!-- 根据选项数据添加自定义内容 --&gt;
      &lt;span v-if="option.value === 'urgent'" class="badge"&gt;紧急&lt;/span&gt;
      &lt;span&gt;{{ '{' }}{ option.label }{{ '}' }}&lt;/span&gt;
      &lt;!-- 添加选中标识 --&gt;
      &lt;span v-if="selected"&gt;✓&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/XlySelect&gt;`
</script>

<style scoped lang="scss">
.component-doc {
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
  line-height: 1.6;
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
}
.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 16px;
  line-height: 1.6;
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-section__list {
  font-size: 14px;
  color: #4a4a6a;
  margin: 0 0 16px;
  padding-left: 20px;
  line-height: 1.8;
  li {
    margin-bottom: 8px;
    code {
      background: #f5f6fa;
      color: #4f6ef7;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    }
  }
}
.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
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
.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}
.doc-table {
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
    white-space: nowrap;
  }
  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
  }
  td {
    color: #4a4a6a;
  }
  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}
</style>

<style lang="scss">
// 自定义选项样式
.custom-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  .priority-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 3px;
    font-weight: 500;

    &.urgent {
      background: #ff4d4f;
      color: white;
    }

    &.important {
      background: #fa8c16;
      color: white;
    }

    &.special {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  }

  .check-mark {
    margin-left: auto;
    color: #4f6ef7;
    font-weight: bold;
  }
}
</style>
