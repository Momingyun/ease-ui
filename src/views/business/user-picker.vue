<template>
  <div class="user-picker-doc">
    <div class="doc-header">
      <h1 class="doc-title">UserPicker 用户选择器</h1>
      <p class="doc-desc">
        模拟用户选择的组件，支持单选/多选模式，可自定义返回值类型。组件内部默认使用模拟数据，可通过组件 <code>getMockUsers</code> 方法修改接入真实接口。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        单选模式，点击按钮打开选择器，选择用户后返回用户 id。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker v-model="singleUser" placeholder="请选择用户" />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(singleUser) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker v-model="userId" placeholder="请选择用户" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 多选模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">多选模式</h2>
      <p class="doc-section__desc">
        设置 <code>multiple</code> 属性启用多选模式，默认返回 id 数组。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker v-model="multiUsers" multiple placeholder="请选择用户" />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(multiUsers) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker v-model="userIds" multiple placeholder="请选择用户" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 限制最大数量 -->
    <section class="doc-section">
      <h2 class="doc-section__title">限制最大数量</h2>
      <p class="doc-section__desc">
        通过 <code>max</code> 属性限制最多选择的用户数量。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker v-model="maxUsers" multiple :max="3" placeholder="最多选择3个用户" />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(maxUsers) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker v-model="userIds" multiple :max="3" placeholder="最多选择3个用户" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 字符串返回值 -->
    <section class="doc-section">
      <h2 class="doc-section__title">字符串返回值</h2>
      <p class="doc-section__desc">
        多选模式下，设置 <code>return-type="string"</code> 可返回逗号拼接的字符串。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker v-model="stringUsers" multiple return-type="string" placeholder="返回逗号字符串" />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(stringUsers) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker v-model="userIdsStr" multiple return-type="string" placeholder="返回逗号字符串" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 显示部门信息 -->
    <section class="doc-section">
      <h2 class="doc-section__title">显示部门信息</h2>
      <p class="doc-section__desc">
        设置 <code>show-extra</code> 显示用户的额外信息（如部门）。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker
            v-model="extraUsers"
            multiple
            show-extra
            extra-key="department"
            placeholder="显示部门信息"
          />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(extraUsers) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker
  v-model="userIds"
  multiple
  show-extra
  extra-key="department"
  placeholder="显示部门信息"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="doc-section">
      <h2 class="doc-section__title">禁用状态</h2>
      <p class="doc-section__desc">
        设置 <code>disabled</code> 属性禁用组件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyUserPicker v-model="singleUser" disabled placeholder="禁用状态" />
        </div>
        <div class="doc-value">
          <span class="doc-value__label">v-model:</span>
          <code>{{ JSON.stringify(singleUser) }}</code>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyUserPicker v-model="userId" disabled placeholder="禁用状态" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 二开指南 -->
    <section class="doc-section">
      <h2 class="doc-section__title">二开指南</h2>
      <p class="doc-section__desc">
        组件默认使用内部模拟数据。如需接入真实接口，直接打开组件源码修改 <code>getMockUsers</code> 函数即可。
      </p>
      <div class="doc-code">
        <pre><code>// 打开 src/components/xly-user-picker/index.vue
// 找到 getMockUsers 函数，替换为你的真实接口调用

/**
 * 获取用户数据（默认使用模拟数据）
 * 二开时请将此函数替换为你的真实接口调用
 * @param keyword 搜索关键词
 * @returns 用户列表
 */
async function getMockUsers(keyword?: string): Promise&lt;UserItem[]&gt; {
  // 👇 替换为真实接口
  const res = await fetch(`/api/users?keyword=${keyword || ''}`)
  const data = await res.json()

  // 返回用户对象数组，必须包含 valueKey 和 nameKey 指定的字段
  return data.list.map(item => ({
    id: item.id,              // 对应 value-key="id"
    name: item.name,          // 对应 name-key="name"
    department: item.dept,   // 对应 extra-key="department"
    avatar: item.avatar,
  }))
}</code></pre>
      </div>

      <h3 class="doc-subtitle">函数签名</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>keyword</code></td>
              <td>搜索关键词，来自搜索框输入</td>
            </tr>
            <tr>
              <td>返回值</td>
              <td><code>Promise&lt;UserItem[]&gt;</code> - 用户对象数组</td>
            </tr>
          </tbody>
        </table>
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
              <td><code>v-model</code></td>
              <td>绑定值</td>
              <td><code>number | string | number[] | string[] | null</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td>是否多选</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>最大选择数量</td>
              <td><code>number</code></td>
              <td><code>999</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>占位文字</td>
              <td><code>string</code></td>
              <td><code>选择用户</code></td>
            </tr>
            <tr>
              <td><code>showExtra</code></td>
              <td>是否显示额外信息</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>valueKey</code></td>
              <td>值字段名</td>
              <td><code>string</code></td>
              <td><code>id</code></td>
            </tr>
            <tr>
              <td><code>nameKey</code></td>
              <td>名称字段名</td>
              <td><code>string</code></td>
              <td><code>name</code></td>
            </tr>
            <tr>
              <td><code>avatarKey</code></td>
              <td>头像字段名</td>
              <td><code>string</code></td>
              <td><code>avatar</code></td>
            </tr>
            <tr>
              <td><code>extraKey</code></td>
              <td>额外信息字段名</td>
              <td><code>string</code></td>
              <td><code>department</code></td>
            </tr>
            <tr>
              <td><code>isDisabled</code></td>
              <td>禁用判断函数</td>
              <td><code>(user: UserItem) =&gt; boolean</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>returnType</code></td>
              <td>多选返回值类型</td>
              <td><code>'array' | 'string'</code></td>
              <td><code>'array'</code></td>
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
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td>值变化时触发</td>
              <td><code>(value)</code></td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td>值变化时触发</td>
              <td><code>(value)</code></td>
            </tr>
            <tr>
              <td><code>pick</code></td>
              <td>点击确认时触发</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Expose</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>open()</code></td>
              <td>打开弹窗</td>
            </tr>
            <tr>
              <td><code>close()</code></td>
              <td>关闭弹窗</td>
            </tr>
            <tr>
              <td><code>clear()</code></td>
              <td>清空选择</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyUserPicker from '@/components/xly-user-picker/index.vue'

// 单选
const singleUser = ref<number | string | null>(null)

// 多选（数组）
const multiUsers = ref<(number | string)[]>([])

// 限制数量
const maxUsers = ref<(number | string)[]>([])

// 字符串返回值
const stringUsers = ref<string>('')

// 显示部门
const extraUsers = ref<(number | string)[]>([])
</script>

<style scoped lang="scss">
.user-picker-doc {
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
  padding: 24px;
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

.doc-value {
  padding: 10px 16px;
  background: #fafbfd;
  border-top: 1px solid #f2f3f7;
  font-size: 13px;
  color: #606266;
}
.doc-value__label {
  color: #8e8ea0;
  margin-right: 8px;
}
.doc-value code {
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
  color: #4f6ef7;
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
</style>
