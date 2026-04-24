<template>
  <div class="menu-doc">
    <!-- 页面标题 -->
    <div class="menu-doc__header">
      <h1>菜单使用指南</h1>
      <p class="subtitle">了解如何配置菜单、实现权限控制、以及切换远程数据源</p>
    </div>

    <!-- 目录导航 -->
    <div class="menu-doc__toc">
      <div
        v-for="section in sections"
        :key="section.id"
        class="menu-doc__toc-item"
        :class="{ active: activeSection === section.id }"
        @click="scrollToSection(section.id)"
      >
        {{ section.title }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="menu-doc__content">
      <!-- 第一部分：菜单数据结构 -->
      <section id="structure" class="menu-doc__section">
        <h2>菜单数据结构</h2>
        <p>菜单配置文件位于 <code>src/data/menu.json</code>，支持最多三级的嵌套结构：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">JSON</span>
            <button class="code-block__copy" @click="copyCode(structureExample)">复制</button>
          </div>
          <pre><code>{{ structureExample }}</code></pre>
        </div>

        <div class="field-table">
          <h4>字段说明</h4>
          <table>
            <thead>
              <tr>
                <th>字段</th>
                <th>类型</th>
                <th>必填</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>id</code></td>
                <td>string</td>
                <td>是</td>
                <td>唯一标识符，建议使用数字或点分格式（如 "1", "2-1"）</td>
              </tr>
              <tr>
                <td><code>name</code></td>
                <td>string</td>
                <td>是</td>
                <td>菜单显示名称，支持中英文</td>
              </tr>
              <tr>
                <td><code>key</code></td>
                <td>string</td>
                <td>是</td>
                <td>菜单标识，用于权限控制和路由命名</td>
              </tr>
              <tr>
                <td><code>icon</code></td>
                <td>string</td>
                <td>否</td>
                <td>图标名称，对应 Element Plus 图标库（如 "HomeFilled", "Grid"）</td>
              </tr>
              <tr>
                <td><code>path</code></td>
                <td>string</td>
                <td>否</td>
                <td>路由路径，有此字段表示可点击跳转</td>
              </tr>
              <tr>
                <td><code>component</code></td>
                <td>string</td>
                <td>否</td>
                <td>视图组件路径，相对于 <code>src/views/</code>（如 "home/home"）</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td>array</td>
                <td>否</td>
                <td>子菜单数组，最多支持三级嵌套</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 第二部分：本地菜单配置 -->
      <section id="local" class="menu-doc__section">
        <h2>本地菜单配置</h2>
        <p>默认使用本地 JSON 文件配置菜单，文件位于 <code>src/data/menu.json</code>。</p>

        <h4>优点</h4>
        <ul class="feature-list">
          <li>🚀 加载速度快，无需网络请求</li>
          <li>🔧 开发调试方便，修改立即生效</li>
          <li>📦 打包后独立运行，无后端依赖</li>
        </ul>

        <h4>适用场景</h4>
        <ul class="feature-list">
          <li>菜单结构相对稳定的小型项目</li>
          <li>追求首屏加载速度的后台管理系统</li>
          <li>原型开发阶段快速迭代</li>
        </ul>
      </section>

      <!-- 第三部分：远程菜单配置 -->
      <section id="remote" class="menu-doc__section">
        <h2>远程菜单配置</h2>
        <p>实际项目中，菜单通常由后端接口返回，便于动态控制用户可见菜单和权限。</p>

        <h4>后端接口规范</h4>
        <p>后端需返回与本地 JSON 相同结构的菜单数据：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">API Response</span>
            <button class="code-block__copy" @click="copyCode(apiExample)">复制</button>
          </div>
          <pre><code>{{ apiExample }}</code></pre>
        </div>

        <h4>切换到远程模式</h4>
        <p>修改 <code>src/utils/menu.ts</code> 中的默认配置：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(remoteConfigExample)">复制</button>
          </div>
          <pre><code>{{ remoteConfigExample }}</code></pre>
        </div>

        <div class="tip tip--warning">
          <span class="tip__icon">⚠️</span>
          <div class="tip__content">
            <strong>注意：</strong> 远程菜单模式下，组件路径需要确保后端返回的 component 字段与 <code>src/views/</code> 下的文件路径一致。
          </div>
        </div>
      </section>

      <!-- 第四部分：菜单工具类 -->
      <section id="utils" class="menu-doc__section">
        <h2>菜单工具类</h2>
        <p>项目提供了统一的菜单工具类 <code>src/utils/menu.ts</code>，所有菜单组件都应使用它获取菜单数据。</p>

        <h4>核心 API</h4>
        <div class="api-list">
          <div class="api-item">
            <code class="api-item__name">getMenuData(source, apiUrl, forceRefresh)</code>
            <p class="api-item__desc">获取菜单数据，支持本地/远程两种模式</p>
          </div>
          <div class="api-item">
            <code class="api-item__name">findMenuByPath(data, path)</code>
            <p class="api-item__desc">根据路径查找菜单项</p>
          </div>
          <div class="api-item">
            <code class="api-item__name">filterMenuByPermissions(data, permissions)</code>
            <p class="api-item__desc">根据用户权限过滤菜单</p>
          </div>
          <div class="api-item">
            <code class="api-item__name">resolveComponent(component)</code>
            <p class="api-item__desc">解析组件路径为动态导入函数</p>
          </div>
        </div>

        <h4>使用示例</h4>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(utilsExample)">复制</button>
          </div>
          <pre><code>{{ utilsExample }}</code></pre>
        </div>
      </section>

      <!-- 第五部分：菜单权限控制 -->
      <section id="permission" class="menu-doc__section">
        <h2>菜单权限控制</h2>
        <p>菜单权限控制通常分为两个层面：路由权限 和 菜单显示权限。</p>

        <h4>1. 路由权限控制</h4>
        <p>在路由守卫中校验用户是否有权限访问该路由：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(routerGuardExample)">复制</button>
          </div>
          <pre><code>{{ routerGuardExample }}</code></pre>
        </div>

        <h4>2. 菜单显示权限</h4>
        <p>根据用户权限过滤显示的菜单项：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(filterMenuExample)">复制</button>
          </div>
          <pre><code>{{ filterMenuExample }}</code></pre>
        </div>
      </section>

      <!-- 第六部分：菜单持久化 -->
      <section id="persistence" class="menu-doc__section">
        <h2>菜单持久化</h2>
        <p>在实际业务中，用户的菜单配置、展开状态等可以通过以下方式进行持久化：</p>

        <h4>1. 本地存储（LocalStorage）</h4>
        <p>适用于保存用户偏好设置，如菜单展开状态：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(localStorageExample)">复制</button>
          </div>
          <pre><code>{{ localStorageExample }}</code></pre>
        </div>

        <h4>2. 服务端存储</h4>
        <p>适用于需要跨设备同步的用户配置：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(serverStorageExample)">复制</button>
          </div>
          <pre><code>{{ serverStorageExample }}</code></pre>
        </div>

        <h4>3. 混合模式（推荐）</h4>
        <p>首次加载从服务端获取，用户操作后保存到本地，下次优先读取本地：</p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">TypeScript</span>
            <button class="code-block__copy" @click="copyCode(hybridExample)">复制</button>
          </div>
          <pre><code>{{ hybridExample }}</code></pre>
        </div>
      </section>

      <!-- 第七部分：常见问题 -->
      <section id="faq" class="menu-doc__section">
        <h2>常见问题</h2>

        <div class="faq-list">
          <div class="faq-item">
            <h4>Q: 菜单项不显示图标怎么办？</h4>
            <p>A: 确保 icon 字段的值是 Element Plus 图标库中存在的图标名称，格式为首字母大写的驼峰式，如 "HomeFilled" 而不是 "home-filled"。</p>
          </div>

          <div class="faq-item">
            <h4>Q: 如何添加新的顶级菜单？</h4>
            <p>A: 在 menu.json 中添加新的对象即可，顶级菜单不需要 path 字段。菜单会自动按照数组顺序显示。</p>
          </div>

          <div class="faq-item">
            <h4>Q: 如何实现点击菜单不跳转，只展开子菜单？</h4>
            <p>A: 只需要在该菜单项中不设置 path 和 component 字段，只设置 children 即可。</p>
          </div>

          <div class="faq-item">
            <h4>Q: 远程菜单加载失败怎么处理？</h4>
            <p>A: 工具类会自动降级使用缓存数据（如果有）。建议在 localStorage 中预存一份默认菜单作为兜底方案。</p>
          </div>

          <div class="faq-item">
            <h4>Q: 如何实现动态路由？</h4>
            <p>A: 使用路由守卫 + 远程菜单方案，在用户登录后获取权限菜单，动态注册路由后再跳转。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeSection = ref('structure')

const sections = [
  { id: 'structure', title: '菜单数据结构' },
  { id: 'local', title: '本地菜单配置' },
  { id: 'remote', title: '远程菜单配置' },
  { id: 'utils', title: '菜单工具类' },
  { id: 'permission', title: '菜单权限控制' },
  { id: 'persistence', title: '菜单持久化' },
  { id: 'faq', title: '常见问题' },
]

// 示例代码
const structureExample = `{
  "id": "1",
  "name": "首页",
  "key": "home",
  "icon": "HomeFilled",
  "path": "/",
  "component": "home/home"
}`

const apiExample = `{
  "code": 200,
  "data": [
    {
      "id": "1",
      "name": "首页",
      "key": "home",
      "path": "/",
      "component": "home/home"
    },
    {
      "id": "2",
      "name": "用户管理",
      "key": "user",
      "icon": "User",
      "children": [
        {
          "id": "2-1",
          "name": "用户列表",
          "key": "user-list",
          "path": "/user/list",
          "component": "user/list"
        }
      ]
    }
  ]
}`

const remoteConfigExample = `// src/utils/menu.ts
import { defaultMenuConfig } from '@/utils/menu'

// 修改默认配置
defaultMenuConfig.dataSource = 'remote'
defaultMenuConfig.apiUrl = '/api/v1/menu'  // 替换为你的接口地址`

const utilsExample = `import { getMenuData, findMenuByPath, filterMenuByPermissions } from '@/utils/menu'

// 获取菜单数据
const menuData = await getMenuData('local')  // 本地模式
// 或
const menuData = await getMenuData('remote', '/api/menu')  // 远程模式

// 查找菜单
const menu = findMenuByPath(menuData, '/user/list')

// 权限过滤
const filteredMenu = filterMenuByPermissions(menuData, ['user', 'role', 'permission'])`

const routerGuardExample = `// src/router/index.ts
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 获取用户权限
  const permissions = userStore.permissions || []

  // 公开页面放行
  if (to.meta.public) return next()

  // 检查路由权限
  const routeName = to.name as string
  if (permissions.includes(routeName) || permissions.includes('*')) {
    next()
  } else {
    ElMessage.warning('您没有访问该页面的权限')
    next('/403')
  }
})`

const filterMenuExample = `import { filterMenuByPermissions } from '@/utils/menu'

// 假设用户有以下权限
const userPermissions = ['home', 'user', 'user-list', 'role']

// 过滤菜单
const visibleMenu = filterMenuByPermissions(menuData, userPermissions)
// 结果：只会显示有权限的菜单项及其父级菜单`

const localStorageExample = `// 保存菜单展开状态
function saveMenuState(openedKeys: string[]) {
  localStorage.setItem('menu_opened', JSON.stringify(openedKeys))
}

// 读取菜单展开状态
function loadMenuState(): string[] {
  const stored = localStorage.getItem('menu_opened')
  return stored ? JSON.parse(stored) : []
}`

const serverStorageExample = `// 从服务端获取用户菜单配置
async function fetchUserMenuConfig(userId: string) {
  const response = await fetch(\`/api/user/\${userId}/menu-config\`)
  const res = await response.json()
  return res.data
}

// 保存用户菜单配置到服务端
async function saveUserMenuConfig(userId: string, config: any) {
  await fetch(\`/api/user/\${userId}/menu-config\`, {
    method: 'PUT',
    body: JSON.stringify(config)
  })
}`

const hybridExample = `import { getMenuData } from '@/utils/menu'

async function loadMenu() {
  // 1. 优先读取本地缓存
  const localCache = localStorage.getItem('user_menu')
  if (localCache) {
    return JSON.parse(localCache)
  }

  // 2. 没有缓存，从服务端获取
  const menuData = await getMenuData('remote', '/api/menu')

  // 3. 保存到本地
  localStorage.setItem('user_menu', JSON.stringify(menuData))

  return menuData
}

// 监听菜单变更，同步到服务端和本地
function onMenuChange(newMenu: any) {
  // 更新本地
  localStorage.setItem('user_menu', JSON.stringify(newMenu))
  // 同步到服务端
  saveToServer(newMenu)
}`

function scrollToSection(id: string) {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('代码已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败，请手动复制')
  }
}
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$text-default: #8e8ea0;
$bg-code: #f8f9fc;
$border-color: #e8e9ef;

.menu-doc {
  margin: 0 auto;
  padding: 0 24px 60px;

  &__header {
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid $border-color;

    h1 {
      font-size: 28px;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 8px;
    }

    .subtitle {
      font-size: 15px;
      color: $text-default;
      margin: 0;
    }
  }

  &__toc {
    position: sticky;
    top: 24px;
    float: right;
    width: 200px;
    padding: 16px;
    background: $bg-code;
    border-radius: 8px;
    margin-left: 24px;
    margin-bottom: 24px;
  }

  &__toc-item {
    padding: 8px 12px;
    font-size: 13px;
    color: $text-secondary;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: $primary;
      background: rgba($primary, 0.08);
    }

    &.active {
      color: $primary;
      background: rgba($primary, 0.12);
      font-weight: 500;
    }
  }

  &__content {
    overflow: hidden;
  }

  &__section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }

    h2 {
      font-size: 22px;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid $primary;
      display: inline-block;
    }

    h4 {
      font-size: 15px;
      font-weight: 600;
      color: $text-primary;
      margin: 24px 0 12px;
    }

    p {
      font-size: 14px;
      color: $text-secondary;
      line-height: 1.7;
      margin: 0 0 16px;
    }

    code {
      padding: 2px 6px;
      background: $bg-code;
      border-radius: 4px;
      font-size: 13px;
      color: $primary;
      font-family: 'Monaco', 'Menlo', monospace;
    }
  }
}

.code-block {
  background: $bg-code;
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: rgba($primary, 0.06);
    border-bottom: 1px solid $border-color;
  }

  &__lang {
    font-size: 12px;
    font-weight: 500;
    color: $primary;
  }

  &__copy {
    padding: 4px 10px;
    font-size: 12px;
    color: $text-secondary;
    background: #fff;
    border: 1px solid $border-color;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: $primary;
      border-color: $primary;
    }
  }

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
  }

  code {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 13px;
    color: $text-primary;
    line-height: 1.6;
    background: none;
    padding: 0;
  }
}

.field-table {
  margin-top: 24px;

  h4 {
    margin-bottom: 12px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid $border-color;
  }

  th {
    font-weight: 600;
    color: $text-primary;
    background: $bg-code;
  }

  td {
    color: $text-secondary;
  }

  code {
    font-size: 12px;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;

  li {
    padding: 8px 0;
    color: $text-secondary;
    font-size: 14px;

    &::before {
      content: '•';
      color: $primary;
      margin-right: 8px;
    }
  }
}

.tip {
  display: flex;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;

  &--warning {
    background: rgba(245, 159, 11, 0.1);
    border: 1px solid rgba(245, 159, 11, 0.3);

    .tip__icon {
      color: #f59e0b;
    }
  }

  &__icon {
    margin-right: 12px;
    font-size: 16px;
  }

  &__content {
    font-size: 14px;
    color: $text-secondary;
    line-height: 1.6;

    strong {
      color: $text-primary;
    }
  }
}

.api-list {
  .api-item {
    padding: 16px;
    background: $bg-code;
    border-radius: 8px;
    margin-bottom: 12px;

    &__name {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: $primary;
      margin-bottom: 6px;
    }

    &__desc {
      font-size: 13px;
      color: $text-default;
      margin: 0;
    }
  }
}

.faq-list {
  .faq-item {
    padding: 20px;
    background: $bg-code;
    border-radius: 8px;
    margin-bottom: 16px;

    h4 {
      font-size: 15px;
      font-weight: 500;
      color: $text-primary;
      margin: 0 0 10px;
    }

    p {
      font-size: 14px;
      color: $text-secondary;
      margin: 0;
      line-height: 1.7;
    }
  }
}
</style>
