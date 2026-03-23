# 表单校验规则使用说明

## 概述

表单组件支持三种校验规则定义方式：
1. **最简单方式**：直接在 FormItem 上设置 `required` 属性，适合只有必填校验
2. **简化规则**：使用字符串定义，代码简洁
3. **函数式规则**：使用函数定义，支持自定义错误信息

三种方式可以混合使用，满足不同场景需求。

---

## 方式零：最简单方式（推荐用于只有必填校验）

### 特点
- ✅ 最简单，无需编写 rules
- ✅ 直接在 FormItem 上设置 `required` 属性
- ✅ 自动显示必填星号 `*`
- ✅ 默认提示为"请填写{label}"
- ✅ 支持自定义提示文字
- ⚠️ 只支持必填校验

### 使用示例

```vue
<XlyForm :model="form">
  <!-- 默认提示：请填写用户名 -->
  <XlyFormItem label="用户名" prop="username" required>
    <XlyInput v-model="form.username" />
  </XlyFormItem>

  <!-- 自定义提示：邮箱不能为空 -->
  <XlyFormItem label="邮箱" prop="email" required msg="邮箱不能为空">
    <XlyInput v-model="form.email" />
  </XlyFormItem>

  <!-- 选填字段，不设置 required -->
  <XlyFormItem label="备注" prop="remark">
    <XlyInput v-model="form.remark" type="textarea" />
  </XlyFormItem>
</XlyForm>
```

```typescript
const form = ref({
  username: '',
  email: '',
  remark: '',
})
```

### 与规则混合使用

`required` 属性可以与 `rules` 属性混合使用：

```vue
<XlyFormItem label="用户名" prop="username" required :rules="['min:2']">
  <XlyInput v-model="form.username" />
</XlyFormItem>
```

这样设置会自动添加必填规则，同时保留长度校验。

### API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `required` | 是否必填 | `boolean` | `false` |
| `msg` | 必填错误提示 | `string` | `"请填写{label}"` |

---

## 方式一：简化规则（推荐用于简单场景）

### 特点
- ✅ 代码简洁，一行一个规则
- ✅ 内置常用规则，开箱即用
- ✅ 适合快速开发
- ⚠️ 错误信息固定，不可自定义

### 可用规则

| 规则 | 说明 | 示例 |
|------|------|------|
| `required` | 必填 | `'required'` |
| `email` | 邮箱格式 | `'email'` |
| `phone` | 手机号格式 | `'phone'` |
| `url` | URL 格式 | `'url'` |
| `min:N` | 最小长度 N | `'min:6'` |
| `max:N` | 最大长度 N | `'max:20'` |
| `minVal:N` | 最小值 N | `'minVal:18'` |
| `maxVal:N` | 最大值 N | `'maxVal:100'` |
| `pattern:/reg/` | 正则匹配 | `'pattern:/^[a-z]+$/'` |

### 使用示例

```typescript
import { ref } from 'vue'

const form = ref({
  username: '',
  email: '',
  phone: '',
  age: '',
  website: '',
})

const rules = {
  username: ['required', 'min:2'],
  email: ['required', 'email'],
  phone: ['phone'],
  age: ['minVal:18', 'maxVal:60'],
  website: ['url'],
}
```

模板中使用：

```vue
<XlyForm :model="form" :rules="rules">
  <XlyFormItem label="用户名" prop="username">
    <XlyInput v-model="form.username" />
  </XlyFormItem>
  <!-- ... -->
</XlyForm>
```

---

## 方式二：函数式规则（适合复杂场景）

### 特点
- ✅ 支持自定义错误信息
- ✅ 支持复杂逻辑校验
- ✅ 支持字段间关联校验
- ⚠️ 代码稍冗长

### 常用函数

| 函数 | 说明 | 示例 |
|------|------|------|
| `required(msg?)` | 必填 | `required('请输入用户名')` |
| `email(msg?)` | 邮箱 | `email('邮箱格式不正确')` |
| `phone(msg?)` | 手机号 | `phone('手机号格式不正确')` |
| `url(msg?)` | URL | `url('请输入有效的URL')` |
| `minLength(n, msg?)` | 最小长度 | `minLength(6, '至少6个字符')` |
| `maxLength(n, msg?)` | 最大长度 | `maxLength(20, '最多20个字符')` |
| `min(n, msg?)` | 最小值 | `min(18, '不能小于18')` |
| `max(n, msg?)` | 最大值 | `max(100, '不能大于100')` |
| `pattern(reg, msg?)` | 正则 | `pattern(/^[a-z]+$/, '只能小写字母')` |
| `custom(fn, trigger?)` | 自定义 | `custom((v) => v ? '' : '错误')` |

### 使用示例

```typescript
import { required, email, minLength, custom } from '@/components/xly-form/utils'

const rules = {
  username: [required('请输入用户名'), minLength(2, '至少2个字符')],
  email: [required('请输入邮箱'), email('邮箱格式不正确')],
  password: [
    required('请输入密码'),
    custom((value) => {
      if (!/[A-Z]/.test(value)) return '必须包含大写字母'
      if (!/\d/.test(value)) return '必须包含数字'
      return true
    })
  ],
  confirmPassword: [
    required('请确认密码'),
    custom((value, formData) => {
      if (value !== formData.password) return '两次密码不一致'
      return true
    })
  ],
}
```

---

## 方式三：混合使用（推荐用于复杂场景）

### 特点
- ✅ 结合两种方式的优点
- ✅ 简单规则用简化写法，复杂规则用函数式
- ✅ 代码既简洁又灵活

### 使用示例

```typescript
import { custom } from '@/components/xly-form/utils'

const rules = {
  username: ['required', 'min:2'],
  email: ['required', 'email'],
  password: [
    'required',
    'min:6',
    custom((value) => {
      if (!/[A-Z]/.test(value)) return '必须包含大写字母'
      return true
    })
  ],
  confirmPassword: [
    'required',
    custom((value, formData) => {
      if (value !== formData.password) return '两次密码不一致'
      return true
    })
  ],
}
```

---

## 正则表达式规则说明

### 函数式方式

```typescript
{
  code: [pattern(/^[A-Z]{2}\d{4}$/, '格式：大写字母2位+数字4位')]
}
```

### 简化方式

```typescript
{
  code: ['pattern:/^[A-Z]{2}\\d{4}$/']
}
```

**注意**：在 JSON/对象中，反斜杠需要转义，所以 `\d` 要写成 `\\d`。

---

## 完整示例

```vue
<template>
  <XlyForm ref="formRef" :model="form" :rules="rules" label-width="100px">
    <!-- 方式零：最简单方式（required 属性） -->
    <XlyFormItem label="用户名" prop="username" required>
      <XlyInput v-model="form.username" placeholder="必填" />
    </XlyFormItem>

    <!-- 方式一：简化规则 -->
    <XlyFormItem label="邮箱" prop="email" :rules="['required', 'email']">
      <XlyInput v-model="form.email" placeholder="example@domain.com" />
    </XlyFormItem>

    <!-- 方式二：函数式规则 -->
    <XlyFormItem label="手机号" prop="phone" :rules="[phone('手机号格式不正确')]">
      <XlyInput v-model="form.phone" placeholder="11位手机号" />
    </XlyFormItem>

    <!-- 方式三：混合使用 -->
    <XlyFormItem label="年龄" prop="age" required :rules="['minVal:18', 'maxVal:60']">
      <XlyInput v-model="form.age" placeholder="18-60岁" type="number" />
    </XlyFormItem>

    <!-- 方式四：required 属性 + 函数式 -->
    <XlyFormItem label="密码" prop="password" required :rules="[custom(checkPassword)]">
      <XlyInput v-model="form.password" type="password" />
    </XlyFormItem>

    <XlyFormItem label="备注" prop="remark">
      <XlyInput v-model="form.remark" type="textarea" />
    </XlyFormItem>

    <XlyFormItem>
      <XlyButton type="primary" @click="handleSubmit">提交</XlyButton>
      <XlyButton @click="handleReset">重置</XlyButton>
    </XlyFormItem>
  </XlyForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { custom } from '@/components/xly-form/utils'
import { XlyMsg } from '@/components/xly-message/message'

// 自定义校验函数
function checkPassword(value: string) {
  if (!/[A-Z]/.test(value)) return '必须包含大写字母'
  if (!/[0-9]/.test(value)) return '必须包含数字'
  return true
}

const formRef = ref()
const form = reactive({
  username: '',
  email: '',
  phone: '',
  age: '',
  password: '',
  remark: '',
})

// 混合使用简化规则和函数式规则
const rules = {
  // email 使用简化规则（在 FormItem 上设置 required，这里只写其他规则）
  email: ['email'],
  phone: ['phone'],
  age: ['minVal:18', 'maxVal:60'],
}

async function handleSubmit() {
  const valid = await formRef.value?.validate()
  if (valid) {
    console.log('提交的数据：', form)
    XlyMsg.success('提交成功')
  }
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>
```

---

## 何时选择哪种方式

### 使用最简单方式（required 属性）
- ✅ 只需要必填校验，没有其他校验需求
- ✅ 快速开发，代码最少
- ✅ 适合简单表单

### 使用简化规则
- ✅ 只需要常用的必填、格式校验
- ✅ 对错误信息要求不高，使用默认提示即可
- ✅ 快速原型开发

### 使用函数式规则
- ✅ 需要自定义错误信息
- ✅ 需要复杂的校验逻辑
- ✅ 需要跨字段校验（如密码确认）

### 混合使用
- ✅ 大部分字段使用常用校验（简化规则）
- ✅ 少数字段需要自定义逻辑（函数式规则）
- ✅ 追求代码简洁和功能灵活的平衡

---

## 常见问题

### Q: required 属性的错误提示是什么？
A: 默认提示为"请填写{label}"（如"请填写用户名"）。可以通过 `msg` 属性自定义，例如：
```vue
<XlyFormItem label="邮箱" prop="email" required msg="邮箱不能为空">
  <XlyInput v-model="form.email" />
</XlyFormItem>
```

### Q: 可以在同一个字段同时使用 required 属性和 rules 吗？
A: 可以！`required` 属性会自动添加必填规则，与 `rules` 中的规则合并使用。例如：
```vue
<XlyFormItem label="用户名" prop="username" required :rules="['min:2']">
  <XlyInput v-model="form.username" />
</XlyFormItem>
```

### Q: required 属性可以和简化规则混用吗？
A: 可以！三种方式（required 属性、简化规则、函数式规则）都可以任意组合。

### Q: required 属性的必填星号会显示吗？
A: 会显示！只要设置了 `required` 属性，或者规则中包含必填校验，标签前就会自动显示红色 `*` 号。

### Q: 简化规则和函数式规则可以混用吗？
A: 可以，两种方式完全兼容，可以在同一个字段的规则数组中混用。

### Q: 简化规则能自定义错误信息吗？
A: 不能，简化规则使用固定的错误提示。如需自定义，请使用函数式规则。

### Q: 如何实现字段间关联校验？
A: 只能使用函数式规则的 `custom` 函数，第二个参数会收到整个表单数据。

### Q: 正则表达式在简化规则中怎么写？
A: 使用 `pattern:/正则/` 格式，注意在 JS 对象中反斜杠需要转义。

### Q: 现有的项目需要全部改成新方式吗？
A: 不需要，三种方式完全兼容。建议：
- 简单必填：使用 `required` 属性
- 常用校验：使用简化规则
- 复杂逻辑：使用函数式规则
