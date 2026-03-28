# 更新记录

所有重要变更按版本和日期记录于此。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

---

## [Unreleased]

> 待发布的功能和修复

---

## [2026-03-28]

### 🐛 修复
- **样式**：修复项目中两处 Dart Sass 不支持的 `darken()` 调用
  - `xly-chart`：`darken($border-color, 5%)` → `#d9d9db`
  - `xly-card`：`darken($border-light, 5%)` → `#e5e5e8`

### ✨ 新增
- **xly-chart**：折柱混用（`type="mixed"`）支持**双 Y 轴**
  - 左 Y 轴对应柱状系列，右 Y 轴对应折线系列，量纲各自独立
  - 新增 `calcAxisRange()` 工具函数，自动计算美观的刻度范围
  - `padding.right` 根据折线系列数据动态扩展，自动容纳右轴标签
- **xly-chart**：折柱混用颜色配置文档补充（三种配色方式演示）
  - `serie.color`：系列统一颜色
  - `serie.colors`：逐柱/逐点精确配色（数组索引与数据对应）
  - `:colors`：全局调色盘（按 series 原始顺序分配，含折线系列）

---

## [2026-03-27]

### ✨ 新增
- **xly-image-upload**（图片上传组件）`src/components/xly-image-upload/index.vue`
  - 支持本地上传（base64）和网络上传（HTTP 接口）两种模式
  - v-model 支持 `string[]` 数组或逗号拼接字符串
  - 内置文件类型/大小校验（`accept-types`、`max-size`、`min-size`）
  - 进度环形动画、成功/失败状态、悬浮删除/预览操作
  - 内置预览弹窗：缩放/旋转/拖拽/多图切换/ESC 关闭
  - 暴露方法：`open()`、`clear()`、`getFileList()`
- **xly-file-upload**（通用文件上传组件）`src/components/xly-file-upload/index.vue`
  - v-model 支持对象数组或 JSON 字符串（`valueMode: 'array' | 'string'`）
  - 自动识别文件类型图标（图片/PDF/Word/Excel/PPT/压缩包/视频/音频/文本）
  - 支持 `limit` 数量限制、`multiple` 多选、`disabled` 禁用、`downloadable` 下载
  - 支持 `listType` 列表方向：`horizontal` 水平 / `vertical` 垂直
  - 支持拖拽上传
- **xly-empty**（空状态组件）`src/components/xly-empty/index.vue`
  - 六种内置类型：`default` / `data` / `search` / `network` / `permission` / `list`
  - 内置 SVG 插图，零依赖
  - 三种尺寸：`small` / `default` / `large`
  - 支持自定义图片、描述、底部操作区插槽

### 🔧 优化
- **xly-table**：新增展开行功能
  - `expandable` prop：是否支持展开行
  - `expandTrigger`：`icon`（点击图标）/ `click`（点击任意位置）
  - `defaultExpandedRows`：默认展开的行索引数组
  - `expandAll()` / `collapseAll()` 暴露方法
  - `#expand` 插槽：展开行内容 `{ row, index }`

---

## [2026-03-26]

### ✨ 新增
- **xly-statistic**（统计数值组件）`src/components/xly-statistic/index.vue`
  - 数字自动千分位格式化、小数精度（`precision`）
  - `prefix` / `suffix` 前后缀（属性或插槽）
  - `trend`（`up` / `down`）趋势箭头 + 彩色 badge
  - `extra` 底部说明、`icon` 标题图标
  - 三种尺寸：`small` / `default` / `large`
- **xly-descriptions**（描述列表组件）`src/components/xly-descriptions/index.vue`
  - `column` 每行列数（默认 3）、`bordered` 边框模式、`span` 跨列
  - `labelWidth` / `labelAlign` / `colon` 标签对齐控制
  - `#title` / `#extra` 头部插槽，Item 内容支持任意组件

### 🔧 优化
- **菜单分类**：从 5 分类调整为 7 分类
  - 从"基础组件"拆出 → **数据展示**：Table / Chart / Statistic / Descriptions / Image / Timeline
  - 从"基础组件"拆出 → **导航组件**：Tabs / Dropdown / Steps
  - 新增**业务组件**分类：Permission / Chat / RangePicker

---

## [2026-03-25]

### ✨ 新增
- **xly-card**（卡片组件）`src/components/xly-card/index.vue`
  - `shadow` 属性：`always` / `hover` / `never`
  - `rounded` / `bordered` / `disabled` / `hoverable` 属性
  - 插槽：`header` / `icon` / `extra` / `default` / `footer`
- **xly-permission**（权限配置组件）`src/components/xly-permission/index.vue`
  - 支持三/四/五级树形数据结构（`max-level` 属性）
  - 叶子驱动的联动逻辑：勾选自动补全祖先路径，取消自动清理无用祖先
  - 三种禁用判断方式：`is-disabled` 函数 / `disabled-field`+`disabled-value` / `disabled-key`
- **xly-chart**（图表组件）`src/components/xly-chart/index.vue`
  - 完全 SVG 原生实现，零依赖
  - 支持 8 种图表类型：`line` / `bar` / `stack` / `hbar` / `pie` / `donut` / `funnel` / `gauge`
  - 内置 Tooltip、图例、ResizeObserver 自适应、下载（PNG/SVG）
  - 大数据横向拖拽：鼠标拖拽 / 滚动条 / 滚轮
  - `@drill` 钻取事件（所有图表类型均支持）
- **首页重构**：`src/views/home/home.vue`
  - Hero 区块、痛点说明、核心优势、组件总览、快速使用五个区块
  - 内嵌 Gitee 开源地址按钮和 Star 徽章

### 🔧 优化
- **README.md**：更新组件列表，涵盖全部组件，新增在线预览地址

---

## [2026-03-24]

### ✨ 新增
- **xly-drawer**（抽屉组件）`src/components/xly-drawer/index.vue`
  - 支持四个方向：`left` / `right` / `top` / `bottom`（默认 `right`）
  - `size` 属性支持数字（px）或百分比字符串
  - 支持遮罩层控制、ESC 关闭、点击遮罩关闭
- **xly-divider**（分割线组件）`src/components/xly-divider/index.vue`
  - 水平/垂直方向、内容插槽（文字标题）、文字位置（left/center/right）
  - `plain` 属性隐藏分割线（仅显示文字）
- **xly-avatar**（头像组件）`src/components/xly-avatar/index.vue`
  - 三种类型：图片、文字、图标
  - 三种尺寸：`small`(32px) / `default`(40px) / `large`(56px)，支持自定义
  - 两种形状：`circle`（圆形）/ `square`（圆角方形）
- **xly-timeline**（时间线组件）`src/components/xly-timeline/index.vue`
  - 四种状态：`wait` / `process` / `finish` / `error`
  - 支持自定义节点图标（`icon` 属性）
  - 支持垂直/水平方向
- **xly-image**（图片组件）`src/components/xly-image/index.vue`
  - 支持数组、逗号字符串、单图三种数据格式
  - `max` 属性：超出数量显示 +N
  - 内置预览：滚轮缩放、拖拽移动、旋转、左右切换、ESC 关闭

### 🐛 修复
- **xly-table**：修复选择数据重复 bug（改用 rowKey + Set 做行标识）
- **xly-table**：新增 `selectionMode` 属性，支持 `multiple`（多选）和 `single`（单选，Radio 样式）

---

## [2026-03-23]

### 🔧 优化
- **xly-table**：工具栏按钮迁移到 `xly-button` + `xly-icon` 组件
- **xly-table**：新增 `showRefresh` / `showExport` props，新增 `refresh` / `export` emits

---

> 📋 **约定**
> - `✨ 新增` — 新功能、新组件
> - `🔧 优化` — 现有功能改进、重构
> - `🐛 修复` — Bug 修复
> - `💥 破坏性变更` — 不向后兼容的改动（需特别注意）
> - `🗑️ 废弃` — 计划在未来版本移除的功能
