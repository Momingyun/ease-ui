# 更新记录

所有重要变更按版本和日期记录于此。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

---

## [Unreleased]

> 待发布和计划中的功能和修复

### ✨ 新增
- **xly-editor**（富文本编辑组件）`src/components/xly-editor/index.vue`
    - 基于 Quill 编辑器，支持富文本输入
    - 支持工具栏自定义、字数统计、图片上传等

---

## [2026-04-09]
### ✨ 新增
- **xly-tree-chart**（思维导图组件）`src/components/xly-tree-chart/`
    - 基于纯 CSS + SVG 原生实现，零第三方依赖
    - 支持树形数据展示，递归渲染层级结构
    - 支持横向/竖向两种布局方向切换
    - 支持容器内缩放（滚轮/Ctrl+滚轮）和拖拽平移
    - 支持节点点击事件、展开收起事件
    - 支持受控展开状态（expanded-keys + @update:expanded-keys）
    - 支持节点禁用状态
    - 支持自定义节点样式（宽度、高度、间距、颜色）
    - 支持自定义每层节点颜色
    - 支持 expandable 展开收起功能开关
    - 支持自定义背景色和网格效果
    - 支持自定义画布宽高（width / height）
    - 隐藏滚动条，始终在容器内显示
    - 根节点带阴影效果，子节点悬停有动画

### 🐛 修复
- **路由**：页面切换时内容区滚动位置重置到顶部（监听路由变化 + 手动设置 `.layout-content.scrollTop`）


## [2026-04-08]
### ✨ 新增
- **xly-dept-tree**（部门树组件）`src/components/xly-dept-tree/`
    - 用于展示组织架构、部门层级等树形结构数据
    - 支持树形数据和带 `pid` 的扁平数据两种格式，自动构建树结构
    - 内置展开/折叠、节点选中、高亮等功能
    - 支持 `default-expand-level` 控制默认展开层级，设为 0 全部展开
    - 支持 `selected-id` 外部控制选中节点，`@select` 事件获取选中数据
    - 支持 `node-key` 自定义字段映射（id/pid/label/children）

## [2026-04-07]
### ✨ 新增
- **xly-table** 操作列固定支持
    - 新增 `action-fixed` 属性：支持 `'left'` | `'right'`，可将操作列固定在左侧或右侧
    - 新增 `action-width` 属性：自定义操作列宽度，默认 `120px`
    - 操作列固定时带有渐变阴影效果，与数据列固定列协同工作

### 🔧 优化
- **xly-table** 列宽优化
    - 未设置 `width` 和 `minWidth` 的列自动应用默认最小宽度 `100px`，避免列被无限压缩
    - 表格自动计算最小宽度，确保列数较多时能正确显示横向滚动条

- **xly-table** 样式升级：现代专业风格
    - 配色方案更新：主色改为 `#4f46e5`（Indigo），更深邃专业
    - 表头样式：恢复浅灰背景 `#f8fafc`，底部边框加粗至 2px，文字加粗
    - 斑马纹调整为更柔和的 `#fafafa`
    - 单元格内边距增加到 `14px 16px`，更大气
    - 复选框/单选框尺寸增大到 `18px`，圆角更圆润
    - 分页样式：按钮尺寸增大到 `36px`，当前页添加阴影效果
    - 工具栏恢复白色背景 + 底部分隔线
    - 固定列阴影增强，宽度增加到 8px
    - 整体阴影更柔和有层次，圆角统一为 10px

### 🐛 修复
- **xly-table** 修复多选/单选时点击一个全部被选中的问题
    - 问题原因：`rowKey` 默认值为 `'id'`，当数据中没有 `id` 字段时，所有行的 key 都为 `undefined`
    - 解决方案：将 `rowKey` 默认值改为 `undefined`，未设置时使用行索引作为 key

## [2026-04-04]
### ✨ 新增
- **xly-dict-select**（字典选择器组件）`src/components/xly-dict-select/index.vue`
    - 基于项目自研 `XlySelect` 组件封装（零第三方依赖），完全复用其多选/折叠标签/valueType 等能力
    - 新增 `return-field` prop（默认 `'id'`）：控制 `v-model` 最终返回值字段，可设为 `'labelValue'` 返回英文代码
    - 支持单选（`string`）和多选（`string[]` 或逗号字符串），通过 `multiple` 切换
    - 多选输出格式通过 `value-format="array"|"string"` 控制
    - 支持传入逗号拼接字符串，组件自动拆分回显
    - 默认字段 `id`/`labelValue`，通过 `value-field`/`label-field` 自定义字段名
    - 选项前显示颜色圆点（对应 `type`/`color` 字段），可通过 `:show-dot="false"` 关闭
    - `@change` 事件同时返回完整字典项对象，方便获取额外信息
    - `expose` 暴露 `reload()` 方法，支持手动重新加载字典
    - 内置完整二开指南，替换 `fetchDictList` 函数即可对接真实接口，支持全局缓存方案


### ✨ 新增
- **xly-dict-tag**（字典标签组件）`src/components/xly-dict-tag/index.vue`
    - 根据字典类型自动请求并渲染对应 Tag，无需手写 if-else 或维护颜色映射
    - 内置模拟字典数据（user_status / approve_status / gender / priority / order_status / role_type 等）
    - 支持单选模式（`value` 传字符串/数字）和多选模式（`multiple` 属性）
    - 多选值支持逗号拼接字符串和字符串数组两种格式，自动识别
    - 默认字段：value → `id`，label → `labelValue`；通过 `value-field` / `label-field` 属性自定义任意字段名
    - 字典数据支持 type（Tag 类型）、color（自定义颜色）、icon（前置图标）字段
    - 空值不渲染、未匹配值优雅降级显示原始值，保证页面不报错
    - 加载中显示脉冲点占位，体验流畅
    - 提供完整二开指南：替换 `fetchDictList` 函数即可对接真实接口，支持字段映射和缓存方案

### ✨ 新增
- **xly-file-preview**（文件预览组件）`src/components/xly-file-preview/index.vue`
    - 基于 `@vue-office` 系列组件（docx/excel/pdf），高还原度渲染 Office 文档
    - 支持四种数据格式输入：逗号拼接字符串、URL字符串数组、对象数组（默认字段 name/url/size）、自定义字段名映射（`field-names` prop）
    - 内置六种文件格式预览：PDF（@vue-office/pdf Canvas）、Word（@vue-office/docx）、Excel（@vue-office/excel）、PPT（pptx-preview 幻灯片预览）、图片（img原生）、视频（video原生）
    - 文件渲染失败时优雅降级，显示错误信息和下载按钮
    - 弹窗支持多文件切换（上一个/下一个）、下载、新标签打开、ESC关闭
    - `size` 字段单位为 KB，组件自动格式化为可读单位（B / KB / MB / GB）
    - 文件列表自动识别文件类型显示对应彩色图标

### 🐛 修复
- **xly-select**：修复未选中时 placeholder 不显示的问题
- **xly-cascader**：修复未选中时 placeholder 不显示的问题
## [2026-04-03]

### ✨ 新增
- **xly-china-map** 多数据集功能增强
    - 支持传入多组数据集（如 2023年/2024年 GDP 对比）
    - `MapDataSet` 数据结构：支持 `name`、`data`、`colorRange` 自定义颜色
    - **对比模式**（`tooltip-mode="compare"`，默认）：悬浮省份时 Tooltip 同时展示所有数据集的数据，直观对比
    - **切换模式**（`tooltip-mode="switch"`）：通过 Tab 切换数据集，Tooltip 只显示当前数据
    - 数据集 Tab 样式优化：白色底 + 连体圆角边框 + 选中态蓝色高亮

## [2026-04-01]
- **xly-worktab**（多标签页组件）`src/components/xly-worktab/index.vue`
    - 路由切换自动添加标签页，显示菜单名称
    - 支持关闭当前/左侧/右侧/其他/全部标签页
    - 支持右键菜单操作
    - 支持横向滚动、滚轮滚动、自动滚动到激活标签
    - 固定标签（affix）不可关闭
    - 标签打开/关闭动画过渡
    - 配合 KeepAlive 实现页面缓存
### 🐛 修复
- **xly-permission**（权限配置组件）修复禁用项仍可被全选/父节点勾选选中的问题
    - `nodeMap` 使用统一的 `getItemDisabled` 函数判断禁用状态（之前仅支持 `isDisabled` 函数和 `disabledKey`，缺少 `disabledField`/`disabledValue` 支持）
    - `onRootToggle` 全选时跳过禁用叶子节点
    - `onNodeToggle` 勾选/取消父节点时跳过禁用叶子节点
    - `rootState` 仅计算非禁用叶子节点，修复全选复选框在有禁用项时始终半选的问题
    - 修复取消全选无效的问题（else 分支逻辑错误）
  
## [2026-03-31]

### ✨ 新增
- **xly-video**（视频播放组件）`src/components/xly-video/index.vue`
    - 现代风格的视频播放组件，基于 HTML5 Video
    - 支持封面图模式（点击封面后播放）
    - 支持播放/暂停、进度拖拽、音量控制、全屏切换
    - 支持播放速度选择（0.5x - 2x）
    - 支持键盘快捷键：空格/K 播放、←→ 跳转、↑↓ 音量、F 全屏、M 静音、C 弹幕
    - 支持双击全屏
    - 控制栏全新升级：毛玻璃效果、渐变进度条、流畅动画
    - **弹幕功能**：弹幕输入框移至播放器下方，支持发送弹幕、颜色选择、弹幕列表
    - **自动封面**：未传入 poster 时自动捕获视频第一帧作为封面
    - **默认静音**：muted 默认值为 true
    - 进度条显示弹幕预览点
    - **新增 `danmakuEnabled` 属性**：控制是否开启弹幕功能，设为 `false` 时所有弹幕相关 UI 都不显示
- **xly-switch**（开关组件）`src/components/xly-switch/index.vue`
    - 支持三种尺寸：`large` / `default` / `small`
    - 支持 `v-model` 绑定
    - 支持自定义值：`activeValue` / `inactiveValue`
    - 支持自定义颜色：`activeColor` / `inactiveColor`
    - 支持禁用状态、加载状态
    - 支持标签文字显示
    - 悬停时显示聚焦效果

- **xly-list**（列表组件）`src/components/xly-list/index.vue`
    - 支持 `list` 数据源绑定
    - 支持自定义字段：`title-field`、`description-field`、`avatar`、`extra-field`
    - 支持 `bordered` 边框、`hoverable` 悬停效果
    - 支持 `loading` 加载状态、`show-empty` 空状态组件
    - 支持 `header`/`footer` 头部底部插槽
    - 支持默认插槽自定义渲染
    - 演示页面：`src/views/basic/list.vue`
- **xly-user-picker**（用户选择器组件）`src/components/xly-user-picker/index.vue`
    - 支持单选/多选模式
    - 支持搜索过滤
    - 支持最大选择数量限制
    - 支持显示用户头像和部门信息
    - 支持禁用状态
    - 支持 `isDisabled` 函数自定义禁用逻辑
---

## [2026-03-29]

### 🐛 修复
- **xly-table** 列设置拖拽排序后立即还原的问题
    - 原因：监听 `props.columns` 时使用了 `deep: true`，导致 `handleDrop` 修改 `localColumns` 后触发 watch 将其重置回 props 的顺序
    - 修复：改为只监听列 prop 列表的变化（浅比对），内部拖拽排序和 visible 切换不再触发重置
- **xly-table** 多列 `fixed: 'left'` 时互相遮挡的问题
    - 原因：CSS 中固定列统一 `left: 0`，多个 fixed-left 列全叠在起点位置
    - 修复：新增 `fixedOffsets` 计算属性，动态计算每个固定列的 `left`/`right` 偏移量（累加前/后各固定列宽度），通过内联 style 注入

### ✨ 新增
- **xly-badge**（徽标组件）`src/components/xly-badge/index.vue`
    - 比市面上的用法更简单：只需传入 `value` 即可自动显示徽标
    - **自动隐藏**：值为 0、null、undefined、空字符串时自动隐藏
    - **智能溢出**：超过 `max`（默认 99）自动显示 "99+"
    - **位置简化**：四种位置 `top-right` / `top-left` / `bottom-right` / `bottom-left`
    - **内置颜色**：支持 `primary` / `success` / `warning` / `danger` / `info` 五种类型
    - **自定义颜色**：通过 `color` 属性覆盖类型颜色
    - **独立使用**：不传插槽时徽标独立显示
    - 支持 `show-zero` 强制显示 0
    - **命令式调用**：`xly.$badge.open(el, options)` 动态添加/更新/移除徽标
    - **圆形徽标**：新增 `circle` 属性，切换圆形/椭圆形态
- **xly-table** 合计行功能（`show-summary`）
    - `show-summary`：开启/关闭合计行
    - `summary-label`：合计行首列显示文字（默认"合计"）
    - `TableColumn.summary`：列统计方式，`'sum'` 求和 / `'avg'` 平均值
    - `TableColumn.summaryText`：自定义合计行该列显示文字（优先于计算值）
    - 合计行固定在表格底部（`<tfoot position: sticky>`），支持与列固定联动
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
