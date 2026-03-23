# Ease UI

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-brightgreen.svg" alt="Vue 3.5+">
  <img src="https://img.shields.io/badge/TypeScript-5.9+-blue.svg" alt="TypeScript 5.9+">
  <img src="https://img.shields.io/badge/Vite-7.3+-purple.svg" alt="Vite 7.3+">
  <img src="https://img.shields.io/badge/SCSS-1.98+-ff69b4.svg" alt="SCSS 1.98+">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  <img src="https://gitee.com/yun_hua_admin/ease-ui/badge/star.svg?theme=dark" >
  <img src="https://gitee.com/yun_hua_admin/ease-ui/badge/fork.svg?theme=dark">
</p>

<p align="center">
  <b>🚀 即插即用的 Vue 3 业务组件库，让中后台开发回归简单</b>
</p>

<p align="center">
Ease UI 是一套为「快速复制」而生的 Vue 3 业务组件库。每个组件都是独立的 .vue 单文件，不依赖任何外部样式或工具函数，直接复制到你的项目即可使用。它仅依赖 Element Plus，却解决了中后台开发中表格选择混乱、搜索表单代码臃肿、日期范围绑定繁琐等真实痛点，让组件复用像复制代码一样简单。
</p>

---

## 💡 项目初衷

在中后台系统开发中，我们频繁遇到这些问题：

| 痛点                      | 现状                                       |
|-------------------------|------------------------------------------|
| 🔧 **组件库太重**            | 引入一套组件库，需要学习整套 API、主题配置、构建配置，成本太高        |
| 📋 **复制粘贴难**            | 想从项目 A 复用一个组件到项目 B，发现依赖了各种公共样式、工具函数，拆不出来 |
| 🧩 **Element Plus 不够用** | 基础组件有了，但业务组件（如带展开/收起的搜索表单、智能表格）还得自己写     |
| 🔄 **重复造轮子**            | 每个项目都要重新实现表格选择、日期范围绑定、表单布局...            |

**于是，Ease UI 诞生了。**

> 打造一套**极致轻量、即拷即用**的业务组件，让开发者可以像复制一段代码一样简单地复用组件。

---

## ✨ 核心优势

### 🎯 单文件组件，即拷即用

每个组件都是**完全独立的 `.vue` 单文件**，包含：

- ✅ 完整的 `<template>` 模板
- ✅ 独立的 `<script setup>` 逻辑
- ✅ 自包含的 `<style scoped>` 样式

**无需任何配置，直接复制 `.vue` 文件到你的项目即可使用！**

```bash
# 只需要这一个文件
src/components/xly-button/index.vue

# 不需要：
❌ 额外的 CSS 文件
❌ 公共样式依赖
❌ 复杂的构建配置
❌ 主题变量文件
```

### 🔌 仅依赖 Element Plus

本组件库**仅依赖 Element Plus**（及其图标库），不引入其他 UI 组件库：

```json
{
  "dependencies": {
    "element-plus": "^2.13.6",
    "@element-plus/icons-vue": "^2.3.2"
  }
}
```

**依赖说明：**

- 🎨 **Element Plus** - 仅使用其图标组件（`@element-plus/icons-vue`）
- 🚫 **无其他 UI 库** - 不依赖 Ant Design Vue、Naive UI、Vuetify 等
- 🚫 **无样式库** - 不依赖 Tailwind CSS、UnoCSS 等原子类框架
- 📝 **纯 Vue 3 + SCSS** - 所有组件样式独立编写

这意味着：

- 如果你的项目已经使用 Element Plus，可以无缝集成
- 如果你的项目没有 Element Plus，只需安装它即可
- 不会有多个 UI 库的样式冲突问题

### 🎯 解决真实业务痛点

每个组件都源于实际项目需求：

| 组件                        | 解决的痛点                                 |
|---------------------------|---------------------------------------|
| **xly-table**             | 表格选择状态管理混乱、列配置无法持久化、分页逻辑重复            |
| **xly-search-form**       | 搜索区域代码臃肿、展开/收起逻辑重复写、日期范围绑定繁琐          |
| **xly-date-range-picker** | Element 日期范围返回数组，后端却要分开的 start/end 字段 |
| **xly-form**              | 表单布局需要写大量 Col/Row，校验规则分散难维护           |
| **xly-loading**           | 需要简洁的全局加载状态，控制更灵活                     |

### 🎨 样式完全独立

每个组件的样式**全部内联在组件内部**，不依赖任何全局样式：

```vue

<style scoped lang="scss">
  /* 设计令牌 - 组件内部定义 */
  $primary: #4f6ef7;
  $success: #34c759;
  $warning: #f5a623;
  $danger: #f56c6c;

  /* 所有样式仅作用于当前组件 */
  .xly-button {
    ...
  }
</style>
```

这意味着：

- 🚀 **零样式冲突** - 不会污染你的全局样式
- 🎨 **易于定制** - 直接修改组件内的 SCSS 变量
- 📦 **可移植性强** - 复制到任何 Vue 3 项目都能正常工作

---

## 📦 组件亮点

### 🕐 时间范围选择器 (xly-date-range-picker)

**痛点解决：** Element Plus 的日期范围选择器使用单个数组 `v-model="[start, end]"`
，但在表单场景中往往需要将开始和结束日期作为独立字段提交给后端，需要额外拆分转换。

**我们的方案：** 分离式双向绑定，`start` 和 `end` 独立管理，更符合表单数据模型

```vue

<template>
  <!-- Element Plus 方式：数组绑定，提交时需要拆分 -->
  <el-date-picker v-model="dateRange" type="daterange" />
  <!-- dateRange = ['2024-01-01', '2024-12-31'] -->
  <!-- 提交前需要：form.startDate = dateRange[0] -->

  <!-- Xly 方式：独立绑定，直接对应表单字段 -->
  <xly-date-range-picker
    v-model:start="form.startDate"
    v-model:end="form.endDate"
  />
  <!-- form.startDate = '2024-01-01' -->
  <!-- form.endDate = '2024-12-31' -->
</template>

<script setup>
  const form = reactive({
    startDate: '',
    endDate: '',
    // 其他字段...
  })

  // 直接提交 form 对象，无需转换！
  const handleSubmit = () => {
    api.search(form) // { startDate: '2024-01-01', endDate: '2024-12-31', ... }
  }
</script>
```

**核心优势：**

- 🎯 **贴合表单模型** - `start`/`end` 直接对应后端接口字段，无需转换
- 🔄 **独立响应** - 开始/结束日期变化分别触发 `update:start` / `update:end`
- 📡 **统一 change 事件** - 同时获取 `{ start, end }` 对象
- 🎨 **视觉统一** - 两个日期选择器 + 分隔符，外观一体化
- 📏 **尺寸联动** - 支持 `large` / `default` / `small` 三种尺寸

---

### 📊 超级表格 (xly-table)

**痛点解决：** 中后台表格需求复杂，Element Plus 表格配置繁琐，二次封装困难。

**我们的方案：** 一个组件覆盖 90% 的表格场景

```vue

<template>
  <xly-table
    :data="tableData"
    :columns="columns"
    :pagination="true"
    :selectable="true"
    selection-mode="multiple"
    :show-refresh="true"
    :show-export="true"
    :show-column-settings="true"
    :column-draggable="true"
    @selection-change="handleSelection"
    @refresh="loadData"
    @export="exportData"
  />
</template>
```

**核心特性：**

| 特性              | 说明                                                     |
|-----------------|--------------------------------------------------------|
| 🎯 **单选/多选模式**  | `selection-mode="single"` 或 `"multiple"`，单选使用 Radio 样式 |
| 📋 **列固定**      | `fixed: 'left'` / `fixed: 'right'`，自动处理阴影和层级           |
| 🔧 **列拖拽排序**    | 可视化拖拽调整列顺序，实时同步                                        |
| 👁️ **列显示控制**   | 内置列设置面板，动态显示/隐藏列                                       |
| 📄 **服务端/前端分页** | 智能识别，传入 `total` 即启用服务端分页                               |
| 🔍 **排序与筛选**    | 点击表头排序，支持自定义排序函数                                       |
| ✏️ **单元格编辑**    | 支持行内编辑模式                                               |
| 📐 **自适应宽度**    | 自动计算最小宽度，防止列被压缩                                        |
| 💬 **超长提示**     | `ellipsis: true` 自动显示 Tooltip                          |

**选择行优化：**

```typescript
// 使用 Map 存储选择状态，解决对象引用比较问题
const selectedMap = ref<Map<any, Record<string, any>>>(new Map())

  // 支持 rowKey 指定唯一标识字段
  < xly - table
row - key = "id"
:
selectable = "true" / >
```

---

### 📝 智能表单系统 (xly-form + xly-form-item)

**痛点解决：** Element Plus 的表单布局不够灵活，响应式栅格需要额外配置，校验规则与字段分离导致维护困难。

**我们的方案：** 内置 24 栅格系统，校验规则下沉到字段级别，标签与控件智能对齐

```vue

<template>
  <xly-form :model="form" :rules="rules" :span="8" inline>
    <!-- span=8 表示占 8/24，一行可放 3 个字段 -->
    <xly-form-item label="用户名" prop="username" :span="12">
      <xly-input v-model="form.username" />
    </xly-form-item>
    <xly-form-item label="状态" prop="status" required>
      <xly-select v-model="form.status" :options="statusOptions" />
    </xly-form-item>
    <xly-form-item label="邮箱" prop="email" :rules="emailRules">
      <xly-input v-model="form.email" />
    </xly-form-item>
  </xly-form>
</template>
```

**核心优势：**

| 特性             | 说明                                     |
|----------------|----------------------------------------|
| 📐 **24 栅格布局** | 内置栅格系统，`span` 属性控制字段宽度，无需额外配置 Col      |
| 🎯 **字段级校验**   | 支持 `required` 属性快速设置必填，或 `rules` 自定义规则 |
| 🔗 **规则自动合并**  | Form 级别规则与 Field 级别规则自动合并，Field 优先级更高  |
| ✨ **智能必填标记**   | 自动识别规则中的必填项，Label 前显示红色星号              |
| 🎨 **标签对齐**    | Label 与输入框垂直居中对齐，视觉更美观                 |
| 📱 **响应式支持**   | `inline` 模式自动换行，适配不同屏幕                 |

**校验方式灵活：**

```typescript
// 方式1：required 属性（最简单）
<xly-form - item
label = "用户名"
prop = "username"
required / >

// 方式2：字段级 rules
<xly-form - item
label = "邮箱"
prop = "email"
:
rules = "[
{
  required: true, message
:
  '请输入邮箱'
}
,
{
  pattern: /^\S+@\S+\.\S+$/, message
:
  '邮箱格式不正确'
}
]
" />

// 方式3：Form 级统一 rules
< xly - form
:
rules = "{ username: [{ required: true }] }" / >
```

---

### 🔍 搜索表单 (xly-search-form)

**痛点解决：** 中后台列表页搜索区域代码高度重复，每个页面都要写查询/重置按钮、展开/收起逻辑，字段类型多导致模板臃肿。

**我们的方案：** 配置化搜索表单，一行配置定义一个字段，内置所有常用交互

```vue

<template>
  <xly-search-form
    v-model="searchForm"
    :items="searchItems"
    :show-expand-button="true"
    :default-expanded="false"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
  const searchForm = reactive({})

  // 配置化定义搜索字段，无需写模板！
  const searchItems = [
    { prop: 'keyword', label: '关键词', type: 'input', span: 6 },
    { prop: 'status', label: '状态', type: 'select', options: statusOptions, span: 6 },
    { prop: 'createTime', label: '创建时间', type: 'daterange', endProp: 'endTime', span: 8 },
    {
      prop: 'category',
      label: '分类',
      type: 'cascader',
      cascaderOptions: categoryTree,
      hiddenWhenCollapsed: true  // 收起时隐藏
    }
  ]

  const handleSearch = (formData) => {
    // formData 自动包含所有字段值
    // { keyword: 'xxx', status: 1, createTime: '2024-01-01', endTime: '2024-12-31' }
    loadList(formData)
  }
</script>
```

**支持的字段类型：**

| 类型              | 组件     | 特性                                           |
|-----------------|--------|----------------------------------------------|
| `input`         | 输入框    | 支持 `prefixIcon`、`suffixIcon`、`maxlength`     |
| `textarea`      | 文本域    | 支持 `rows`、`showWordLimit`                    |
| `select`        | 选择器    | 支持 `multiple`、`filterable`、`options`         |
| `cascader`      | 级联选择   | 支持 `multiple`、`filterable`、`cascaderOptions` |
| `date`          | 日期选择   | 支持 `format`、`valueFormat`                    |
| `daterange`     | 日期范围   | 自动绑定到 `prop` 和 `endProp` 两个字段                |
| `datetime`      | 日期时间   | 支持 `showSeconds`                             |
| `datetimerange` | 日期时间范围 | 支持时间精度选择                                     |
| `time`          | 时间选择   | 支持 `format`                                  |
| `timerange`     | 时间范围   | 开始/结束时间联动                                    |
| `custom`        | 自定义    | 通过插槽完全自定义内容                                  |

**内置交互：**

- 🔘 **查询按钮** - 自动触发表单校验，校验通过后 emit `search` 事件
- 🔄 **重置按钮** - 清空所有字段为默认值，emit `reset` 事件
- 📂 **展开/收起** - 控制字段显示数量，保持搜索区域整洁
- ⌨️ **回车搜索** - 输入框内按回车自动触发搜索
- 📝 **默认值** - 支持 `defaultValue` 设置初始值

---

### 🎛️ 增强按钮 (xly-button)

**痛点解决：** Element Plus 按钮样式单一，业务场景覆盖不足。

**我们的方案：** 7 种类型 + 链接模式 + 幽灵按钮

```vue
<!-- 类型丰富 -->
<xly-button type="primary">主按钮</xly-button>
<xly-button type="success">成功</xly-button>
<xly-button type="warning">警告</xly-button>
<xly-button type="danger">危险</xly-button>
<xly-button type="info">信息</xly-button>
<xly-button type="text">文字</xly-button>
<xly-button type="ghost">幽灵</xly-button>

<!-- 链接模式 - 带下划线动画 -->
<xly-button type="primary" link>链接按钮</xly-button>

<!-- 形状多样 -->
<xly-button shape="circle" :icon="Search" />
<xly-button shape="round">圆角按钮</xly-button>
```

---

### 🔄 加载状态 (xly-loading)

**痛点解决：** Element Plus 的 Loading 指令使用繁琐，样式不易定制。

**我们的方案：** 命令式 API，一行代码搞定

```typescript
import { xly } from '@/utils/xly'

// 局部加载
xly.$loading.open('加载中...')
xly.$loading.close()

// 全屏加载
xly.$loading.fullscreen()
xly.$loading.closeAll()

// 指定容器
xly.$loading.container('#table-container')
```

---

## 👥 适合谁用？

- ✅ **需要快速搭建中后台** —— 不用研究组件库文档，复制就能用
- ✅ **维护多个项目** —— 组件随时跨项目复用，无依赖负担
- ✅ **对现有组件库不满意** —— 轻量替代，可自由修改源码
- ✅ **学习 Vue 3 组件设计** —— 源码简洁，适合学习参考

---

## 🚀 快速开始

### 环境要求

- Node.js ^20.19.0 || >=22.12.0
- Vue 3.5+
- TypeScript 5.9+

### 方式一：整项目使用（推荐）

```bash
# 克隆项目
git clone https://gitee.com/yun_hua_admin/ease-ui.git
cd ease-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 方式二：单组件复制（最灵活）

```bash
# 1. 找到需要的组件
src/components/xly-button/index.vue

# 2. 复制到你的项目
# 3. 直接使用，无需任何配置！
```

> ⚠️ **注意：** 部分组件依赖其他 Xly 组件（如 xly-table 依赖 xly-button），复制时请一并复制依赖组件。

---

## 📂 组件依赖关系

| 组件                      | 内部依赖                                   | 说明          |
|-------------------------|----------------------------------------|-------------|
| `xly-table`             | `xly-button`, `xly-select`, `xly-icon` | 工具栏按钮、分页选择器 |
| `xly-search-form`       | `xly-form`, `xly-form-item`            | 基于表单封装      |
| `xly-form`              | 无                                      | 纯逻辑组件       |
| `xly-date-range-picker` | 无                                      | 独立组件        |
| `xly-button`            | 无                                      | 完全独立        |
| `xly-icon`              | 无                                      | 完全独立        |

---

## 🛠 全局服务

```typescript
import { xly } from '@/utils/xly'

// 消息提示 - 自动消失，不阻塞操作
xly.$msg.success('保存成功')
xly.$msg.warning('请注意')
xly.$msg.danger('操作失败')
xly.$msg.info('提示信息')
xly.$msg.text('纯文本消息')

// 加载状态
const loading = xly.$loading.open('加载中...')
loading.close()
```

---

## 🏗 项目结构

```
ease-ui/
├── src/
│   ├── components/          # 📦 组件库（每个组件独立可复用）
│   │   ├── xly-button/      # 按钮
│   │   ├── xly-table/       # 表格
│   │   ├── xly-form/        # 表单
│   │   ├── xly-date-range-picker/  # 日期范围
│   │   └── ...              # 其他 24+ 组件
│   ├── views/               # 📄 示例页面
│   ├── utils/               # 🔧 工具函数
│   │   └── xly.ts           # 全局服务入口
│   └── main.ts
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎨 定制主题

由于每个组件样式独立，你可以轻松修改主题：

```vue
<!-- xly-button/index.vue -->
<style scoped lang="scss">
  /* 修改这些变量即可改变主题色 */
  $primary: #your-brand-color;
  $success: #your-success-color;
  $warning: #your-warning-color;
  $danger: #your-danger-color;
</style>
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## ☕ 请作者喝杯咖啡

如果这个项目对你有帮助，可以请作者喝杯咖啡表示鼓励 ☕

<p align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/pay/weixin.png" width="400" alt="微信支付">
        <br>
        <sub>微信支付</sub>
      </td>
      <td align="center">
        <img src="./src/assets/pay/zfb.png" width="400" alt="支付宝">
        <br>
        <sub>支付宝</sub>
      </td>
    </tr>
  </table>
</p>

---

## 📄 许可证

[MIT](./LICENSE) © 2026 Ease UI

---

<p align="center">
  <b>🌟 如果这个项目对你有帮助，请给它一个 Star！</b>
</p>
