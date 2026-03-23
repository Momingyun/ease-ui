/**
 * 表单校验工具
 *
 * 内置常用校验规则，支持自定义校验函数。
 * 新增简化规则写法，支持字符串形式的规则定义。
 *
 * 用法：
 * ```ts
 * import { required, email, minLength, custom } from '@/components/xly-form/utils'
 *
 * // 方法一：传统函数式写法（保留）
 * const rules1 = {
 *   name: [required('请输入姓名'), minLength(2, '姓名至少2个字符')],
 *   email: [required('请输入邮箱'), email()],
 *   age: [custom((v) => v >= 18 || '必须年满18岁')],
 * }
 *
 * // 方法二：新增简化字符串写法（更简洁）
 * const rules2 = {
 *   name: ['required', 'min:2'],
 *   email: ['required', 'email'],
 *   age: ['minVal:18', 'maxVal:60'],
 * }
 *
 * // 方法三：混合使用（更灵活）
 * const rules3 = {
 *   name: ['required', minLength(2, '至少2个字符')],
 *   email: ['required', email()],
 *   password: ['required', 'min:6', custom((v) => v.length >= 8 || '建议8位以上')],
 * }
 * ```
 */

export type ValidatorFn = (value: any, formData?: Record<string, any>) => string | true | Promise<string | true>

export interface FormRule {
  /** 校验函数，返回 true 表示通过，返回字符串表示错误信息 */
  validator: ValidatorFn
  /** 是否在 blur 时触发，默认 false */
  trigger?: 'blur' | 'change'
  /** 是否为必填规则（用于显示星号） */
  required?: boolean
}

/** 简化版规则类型：支持字符串形式 */
export type SimpleRule =
  | 'required'       // 必填
  | 'email'          // 邮箱
  | 'phone'          // 手机号
  | 'url'            // URL
  | `min:${number}`  // 最小长度，如 min:6
  | `max:${number}`  // 最大长度，如 max:20
  | `minLength:${number}`  // 最小长度（别名）
  | `maxLength:${number}`  // 最大长度（别名）
  | `minVal:${number}` // 最小值，如 minVal:18
  | `maxVal:${number}` // 最大值，如 maxVal:100
  | `pattern:${string}`  // 正则表达式，如 pattern:/^[a-z]+$/
  | `${string}:${string}` // 自定义规则

/** 规则类型：可以是字符串形式的简化规则，也可以是完整的 FormRule 对象 */
export type Rule = string | FormRule

/** 必填 */
export function required(message = '此项为必填项'): FormRule {
  return {
    validator: (v) => {
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
        return message
      }
      return true
    },
    trigger: 'blur',
    required: true,
  }
}

/** 必填（简化版，用于字符串规则） */
export function requiredSimple(message = '此项为必填项'): FormRule {
  return required(message)
}

/** 邮箱 */
export function email(message = '请输入正确的邮箱地址'): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v)) || message
    },
  }
}

/** 手机号 */
export function phone(message = '请输入正确的手机号'): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      return /^1[3-9]\d{9}$/.test(String(v)) || message
    },
  }
}

/** 最小长度 */
export function minLength(min: number, message?: string): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      const msg = message || `最少输入 ${min} 个字符`
      return String(v).length >= min || msg
    },
  }
}

/** 最大长度 */
export function maxLength(max: number, message?: string): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      const msg = message || `最多输入 ${max} 个字符`
      return String(v).length <= max || msg
    },
  }
}

/** 最小值 */
export function min(min: number, message?: string): FormRule {
  return {
    validator: (v) => {
      if (v === '' || v === undefined || v === null) return true
      const msg = message || `最小值为 ${min}`
      return Number(v) >= min || msg
    },
  }
}

/** 最大值 */
export function max(max: number, message?: string): FormRule {
  return {
    validator: (v) => {
      if (v === '' || v === undefined || v === null) return true
      const msg = message || `最大值为 ${max}`
      return Number(v) <= max || msg
    },
  }
}

/** 正则匹配 */
export function pattern(regex: RegExp, message = '格式不正确'): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      return regex.test(String(v)) || message
    },
  }
}

/** URL */
export function url(message = '请输入正确的 URL'): FormRule {
  return {
    validator: (v) => {
      if (!v) return true
      try { new URL(String(v)); return true } catch { return message }
    },
  }
}

/** 自定义校验 */
export function custom(fn: (value: any, formData?: Record<string, any>) => string | true | Promise<string | true>, trigger: 'blur' | 'change' = 'change'): FormRule {
  return { validator: fn, trigger }
}

/**
 * 将简化规则转换为 FormRule
 */
export function parseRule(rule: string): FormRule {
  // 必填
  if (rule === 'required') {
    return required('此项为必填项')
  }

  // 邮箱
  if (rule === 'email') {
    return email()
  }

  // 手机号
  if (rule === 'phone') {
    return phone()
  }

  // URL
  if (rule === 'url') {
    return url()
  }

  // 最小长度
  const minMatch = rule.match(/^(?:minLength|min):(\d+)$/)
  if (minMatch) {
    return minLength(Number(minMatch[1]))
  }

  // 最大长度
  const maxMatch = rule.match(/^(?:maxLength|max):(\d+)$/)
  if (maxMatch) {
    return maxLength(Number(maxMatch[1]))
  }

  // 最小值
  const minValMatch = rule.match(/^minVal:(-?\d+(?:\.\d+)?)$/)
  if (minValMatch) {
    return min(Number(minValMatch[1]))
  }

  // 最大值
  const maxValMatch = rule.match(/^maxVal:(-?\d+(?:\.\d+)?)$/)
  if (maxValMatch) {
    return max(Number(maxValMatch[1]))
  }

  // 正则表达式
  const patternMatch = rule.match(/^pattern:(.+)$/)
  if (patternMatch) {
    try {
      // 移除首尾的斜杠（如果有）
      const patternStr = patternMatch[1].replace(/^\/|\/$/g, '')
      const regex = new RegExp(patternStr)
      return pattern(regex)
    } catch {
      return pattern(/.*/, '规则格式错误')
    }
  }

  // 未知的规则，返回一个总是通过的规则
  return custom(() => true)
}

/**
 * 规范化规则：将混合的字符串规则和对象规则统一转换为 FormRule[]
 */
export function normalizeRules(rules: Rule[]): FormRule[] {
  return rules.map(rule => {
    if (typeof rule === 'string') {
      return parseRule(rule)
    }
    return rule
  })
}

/**
 * 执行字段校验
 * @returns 第一个错误信息，null 表示全部通过
 */
export async function validateField(
  value: any,
  rules: Rule[],
  formData?: Record<string, any>,
): Promise<string | null> {
  // 规范化规则
  const normalizedRules = normalizeRules(rules)

  for (const rule of normalizedRules) {
    const result = await rule.validator(value, formData)
    if (result !== true) return String(result)
  }
  return null
}

/**
 * 校验整个表单
 * @returns { valid, errors } errors 是 { field: errorMsg } 的映射
 */
export async function validateForm(
  formData: Record<string, any>,
  rulesMap: Record<string, Rule[]>,
): Promise<{ valid: boolean; errors: Record<string, string> }> {
  const errors: Record<string, string> = {}

  const results = await Promise.all(
    Object.entries(rulesMap).map(async ([field, rules]) => {
      const error = await validateField(formData[field], rules, formData)
      return { field, error }
    }),
  )

  for (const { field, error } of results) {
    if (error) errors[field] = error
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
