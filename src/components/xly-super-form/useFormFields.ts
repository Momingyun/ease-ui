/**
 * 表单字段生成器 - 简化表单配置
 *
 * @example
 * import { useFormFields } from './useFormFields'
 *
 * const { input, select, datePicker, dateRangePicker, timeRangePicker, sw, rate, rules } = useFormFields()
 *
 * const fields = [
 *   input('name', '姓名', { required: true }),
 *   input('phone', '手机号', { rules: rules.phone() }),
 *   select('dept', '部门', { options: [{ label: '技术部', value: 1 }] }),
 *   datePicker('birthday', '生日'),
 *   // 范围组件：支持三种调用方式
 *   dateRangePicker('dateRange', '开始时间', '结束时间')
 *   dateRangePicker('dateRange', 'beginTime', 'endTime')
 *   dateRangePicker('dateRange', { span: 12 })
 *   sw('enabled', '启用', { props: { activeText: '是', inactiveText: '否' } }),
 *   rate('rating', '评分'),
 * ]
 */
import type { Component } from 'vue'
import type { SuperField, FieldRule } from '@/components/xly-super-form/index.vue'

// 字段配置选项
export interface FieldOptions {
  /** 标签文字，默认自动从 prop 推断 */
  label?: string
  /** 是否必填 */
  required?: boolean
  /** 栅格占位 1-24，默认 24 */
  span?: number
  /** 传递给组件的额外属性 */
  props?: Record<string, any>
  /** 校验规则 */
  rules?: FieldRule[]
  /** 是否显示标签，默认 true */
  showLabel?: boolean
  /** 标签宽度 */
  labelWidth?: string
  /** 尺寸 */
  size?: 'large' | 'default' | 'small' | number
  /** 范围组件的开始字段名 */
  startProp?: string
  /** 范围组件的结束字段名 */
  endProp?: string
  /** 远程搜索方法 */
  remoteMethod?: (query: string) => any[] | Promise<any[]>
  /** 下拉/级联等选项数据 */
  options?: any[]
  /** 字典编码，自动获取选项 */
  dict?: string
  /** 是否为是/否类型（用于 switch） */
  yesNo?: boolean
  /** 是否允许用户创建新条目，需配合 filterable 使用 */
  allowCreate?: boolean
  /** 多选时返回值的类型，'array' 返回数组，'string' 返回逗号分隔的字符串，默认 'array' */
  valueType?: 'array' | 'string'
  /** 返回值模式：array 返回数组，string 返回逗号拼接（每项 encodeURIComponent 编码） */
  valueMode?: 'array' | 'string'
  /** 多选且 valueType='string' 时的分隔符，默认 ',' */
  separator?: string
  /** 最多上传数量 */
  limit?: number
  /** 是否支持预览 */
  previewable?: boolean
  /** 自定义组件 */
  component?: Component
}

// 链式调用的字段对象
export interface ChainField {
  prop: string
  label?: string
  type: string
  required?: boolean
  span?: number
  props?: Record<string, any>
  rules?: FieldRule[]
  showLabel?: boolean
  labelWidth?: string
  size?: 'large' | 'default' | 'small'
  startProp?: string
  endProp?: string
  remoteMethod?: (query: string) => any[] | Promise<any[]>
  component?: Component

  // 链式方法（$ 前缀避免与属性名冲突）
  $required(val?: boolean): ChainField
  $optional(): ChainField
  $span(val: number): ChainField
  $label(val: string): ChainField
  $noLabel(): ChainField
  $props(options: Record<string, any>): ChainField
  $rule(rule: FieldRule): ChainField
  $rules(rules: FieldRule[]): ChainField
  $size(val: 'large' | 'default' | 'small'): ChainField
  $options(opts: any[]): ChainField
  $dict(code: string): ChainField
  $remote(method: (query: string) => any[] | Promise<any[]>): ChainField
  $range(startProp: string, endProp: string): ChainField
}

// 自动推断中文标签
const labelMap: Record<string, string> = {
  name: '姓名', username: '用户名', account: '账号', password: '密码',
  phone: '手机号', mobile: '手机号', tel: '电话', telephone: '电话',
  email: '邮箱', mail: '邮箱',
  dept: '部门', department: '部门', organization: '组织',
  role: '角色', post: '岗位', position: '岗位',
  status: '状态', type: '类型', category: '分类',
  title: '标题', subject: '主题', content: '内容', description: '描述',
  remark: '备注', note: '备注', reason: '原因', memo: '备注',
  date: '日期', time: '时间', birthday: '生日', birthdate: '生日',
  startDate: '开始日期', endDate: '结束日期', startTime: '开始时间', endTime: '结束时间',
  beginTime: '开始时间', finishTime: '结束时间',
  start: '开始', end: '结束',
  createBy: '创建人', updateBy: '更新人',
  createTime: '创建时间', updateTime: '更新时间', createDate: '创建日期', updateDate: '更新日期',
  enabled: '启用', deleted: '是否删除',
  address: '地址', location: '地址', region: '地区', area: '区域',
  code: '编码', no: '编号', sn: '序列号',
  amount: '金额', price: '价格', cost: '成本',
  num: '数量', count: '数量', total: '合计',
  rate: '评分', rating: '评分', score: '分数',
  avatar: '头像', icon: '图标', image: '图片', img: '图片',
  url: '链接', link: '链接', website: '网站',
  user: '用户', admin: '管理员', member: '成员',
  sort: '排序', order: '排序', priority: '优先级',
  // 范围类
  dateRange: '日期范围', dateTimeRange: '时间范围', timeRange: '时间范围',
}

function inferLabel(prop: string): string {
  // 尝试直接匹配
  if (labelMap[prop]) return labelMap[prop]

  // 驼峰转中文
  const words = prop.replace(/([A-Z])/g, ' $1').split(/[_\s]+/)
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
}

// 创建链式字段
function createChainField(prop: string, type: string, options: FieldOptions = {}): ChainField {
  const field: any = {
    prop,
    type,
    label: options.label ?? inferLabel(prop),
    required: options.required,
    span: options.span,
    props: options.props ? { ...options.props } : {},
    rules: undefined,
    showLabel: options.showLabel,
    labelWidth: options.labelWidth,
    size: options.size,
    startProp: options.startProp,
    endProp: options.endProp,
    remoteMethod: options.remoteMethod,
  }

  // 处理 rules（支持单个规则或数组）
  if (options.rules) {
    field.rules = Array.isArray(options.rules) ? [...options.rules] : [options.rules]
  }

  // 链式方法（使用 $ 前缀避免与属性名冲突）
  field.$required = (val = true) => {
    field.required = val
    return field
  }
  field.$optional = () => {
    field.required = false
    return field
  }
  field.$span = (val: number) => {
    field.span = val
    return field
  }
  field.$label = (val: string) => {
    field.label = val
    return field
  }
  field.$noLabel = () => {
    field.showLabel = false
    return field
  }
  field.$props = (opts: Record<string, any>) => {
    field.props = { ...field.props, ...opts }
    return field
  }
  field.$rule = (rule: FieldRule) => {
    field.rules = field.rules ? [...field.rules, rule] : [rule]
    return field
  }
  field.$rules = (rules: FieldRule[]) => {
    field.rules = rules
    return field
  }
  field.$size = (val: 'large' | 'default' | 'small') => {
    field.size = val
    return field
  }
  field.$options = (opts: any[]) => {
    field.props = { ...field.props, options: opts }
    return field
  }
  field.$dict = (code: string) => {
    field.props = { ...field.props, dict: code }
    return field
  }
  field.$remote = (method: (query: string) => any[] | Promise<any[]>) => {
    field.remoteMethod = method
    field.props = { ...field.props, remote: true, filterable: true }
    return field
  }
  field.$range = (start: string, end: string) => {
    field.startProp = start
    field.endProp = end
    return field
  }

  return field as ChainField
}

export function useFormFields() {
  // ========== 输入类 ==========

  /** 普通输入框 */
  function input(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'input', { label, ...rest })
  }

  /** 带前后缀的输入框 */
  function inputSlot(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'inputSlot', { label, ...rest })
  }

  /** 文本域 */
  function textarea(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'input', {
      label,
      ...rest,
      props: { ...rest.props, type: 'textarea', rows: rest.props?.rows || 3 },
    })
  }

  /** 密码输入框 */
  function password(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'input', {
      label,
      ...rest,
      props: { ...rest.props, type: 'password', showPassword: true },
    })
  }

  // ========== 选择类 ==========

  /** 下拉选择 */
  function select(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'select', { label, ...rest })
  }

  /** 级联选择 */
  function cascader(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'cascader', { label, ...rest })
  }

  // ========== 日期时间类 ==========

  /** 日期选择 */
  function datePicker(
    prop: string,
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'datePicker', { label, ...rest })
  }

  /** 日期范围选择 - 支持四种调用方式：
   * 1. dateRangePicker('dateRange')
   * 2. dateRangePicker('dateRange', { span: 12 })
   * 3. dateRangePicker('dateRange', 'beginTime', 'endTime')
   * 4. dateRangePicker('dateRange', '用药时长', 'beginTime', 'endTime')
   */
  function dateRangePicker(
    prop: string,
    labelOrStart?: string | FieldOptions,
    startPropOrOptions?: string | FieldOptions,
    endProp?: string,
    options?: FieldOptions,
  ) {
    // 四参数：prop, label, startProp, endProp
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string' &&
      typeof endProp === 'string'
    ) {
      return createChainField(prop, 'dateRangePicker', {
        label: labelOrStart,
        startProp: startPropOrOptions,
        endProp,
        ...options,
      })
    }
    // 三参数：prop, startProp, endProp
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string'
    ) {
      return createChainField(prop, 'dateRangePicker', {
        startProp: labelOrStart,
        endProp: startPropOrOptions,
        ...(endProp as FieldOptions),
      })
    }
    // 一/二参数：prop + options
    const { label, ...rest } = normalizeOptions(labelOrStart as string | FieldOptions | undefined)
    const start = prop.replace(/[Rr]ange$/, '') + 'Start'
    const end = prop.replace(/[Rr]ange$/, '') + 'End'
    return createChainField(prop, 'dateRangePicker', {
      label,
      ...rest,
      startProp: start,
      endProp: end,
    })
  }

  /** 日期时间选择 */
  function dateTimePicker(
    prop: string,
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'dateTimePicker', { label, ...rest })
  }

  /** 日期时间范围选择 */
  function dateTimeRangePicker(
    prop: string,
    labelOrStart?: string | FieldOptions,
    startPropOrOptions?: string | FieldOptions,
    endProp?: string,
    options?: FieldOptions,
  ) {
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string' &&
      typeof endProp === 'string'
    ) {
      return createChainField(prop, 'dateTimeRangePicker', {
        label: labelOrStart,
        startProp: startPropOrOptions,
        endProp,
        ...options,
      })
    }
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string'
    ) {
      return createChainField(prop, 'dateTimeRangePicker', {
        startProp: labelOrStart,
        endProp: startPropOrOptions,
        ...(endProp as FieldOptions),
      })
    }
    const { label, ...rest } = normalizeOptions(labelOrStart as string | FieldOptions | undefined)
    const start = prop.replace(/[Rr]ange$/, '') + 'Start'
    const end = prop.replace(/[Rr]ange$/, '') + 'End'
    return createChainField(prop, 'dateTimeRangePicker', {
      label,
      ...rest,
      startProp: start,
      endProp: end,
    })
  }

  /** 时间选择 */
  function timePicker(
    prop: string,
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'timePicker', { label, ...rest })
  }

  /** 时间范围选择 */
  function timeRangePicker(
    prop: string,
    labelOrStart?: string | FieldOptions,
    startPropOrOptions?: string | FieldOptions,
    endProp?: string,
    options?: FieldOptions,
  ) {
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string' &&
      typeof endProp === 'string'
    ) {
      return createChainField(prop, 'timeRangePicker', {
        label: labelOrStart,
        startProp: startPropOrOptions,
        endProp,
        ...options,
      })
    }
    if (
      typeof labelOrStart === 'string' &&
      typeof startPropOrOptions === 'string'
    ) {
      return createChainField(prop, 'timeRangePicker', {
        startProp: labelOrStart,
        endProp: startPropOrOptions,
        ...(endProp as FieldOptions),
      })
    }
    const { label, ...rest } = normalizeOptions(labelOrStart as string | FieldOptions | undefined)
    const start = prop.replace(/[Rr]ange$/, '') + 'Start'
    const end = prop.replace(/[Rr]ange$/, '') + 'End'
    return createChainField(prop, 'timeRangePicker', {
      label,
      ...rest,
      startProp: start,
      endProp: end,
    })
  }

  // ========== 特殊组件 ==========

  /** 开关 */
  function sw(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'switch', { label, ...rest })
  }

  /** 评分 */
  function rate(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'rate', { label, ...rest })
  }

  // ========== 工具函数 ==========

  /** 规范化参数 */
  function normalizeOptions(
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ): FieldOptions {
    if (typeof labelOrOptions === 'string') {
      return { label: labelOrOptions, ...options }
    }
    return labelOrOptions || {}
  }

  /** 创建自定义字段（使用自定义组件） */
  function custom(
    prop: string,
    component: Component,
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    const field = createChainField(prop, '', { label, ...rest })
    field.component = component
    return field
  }

  /** 图片上传 */
  function imageUpload(
    prop: string,
    labelOrOptions?: string | FieldOptions,
    options?: FieldOptions,
  ) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'imageUpload', { label, ...rest })
  }

  /**医生选择 */
  function user(prop: string, labelOrOptions?: string | FieldOptions, options?: FieldOptions) {
    const { label, ...rest } = normalizeOptions(labelOrOptions, options)
    return createChainField(prop, 'user', { label, ...rest })
  }

  /** 分隔线（占位用） */
  function divider(label?: string) {
    return { prop: '__divider__', label: label || '', type: 'divider', span: 24 } as any
  }

  /** 标题（占位用） */
  function title(text: string, level: 1 | 2 | 3 = 2) {
    return { prop: '__title__', label: text, type: 'title', props: { level }, span: 24 } as any
  }

  /** 从字段数组提取指定 prop 的值 */
  function pick<T = any>(
    formData: Record<string, any>,
    fields: ChainField[],
    props: (keyof T)[],
  ): T {
    const result: any = {}
    for (const p of props) {
      result[p] = formData[p as string]
    }
    return result
  }

  /** 创建校验规则 */
  const rules = {
    required: (message?: string) => ({ type: 'required' as const, message }),
    email: (message?: string) => ({ type: 'email' as const, message }),
    phone: (message?: string) => ({ type: 'phone' as const, message }),
    url: (message?: string) => ({ type: 'url' as const, message }),
    pattern: (regex: RegExp | string, message?: string) => ({
      type: 'pattern' as const,
      pattern: regex,
      message,
    }),
    minLength: (len: number, message?: string) => ({
      type: 'pattern' as const,
      minLength: len,
      message,
    }),
    maxLength: (len: number, message?: string) => ({
      type: 'pattern' as const,
      maxLength: len,
      message,
    }),
    range: (min: number, max: number, message?: string) => ({
      type: 'pattern' as const,
      min,
      max,
      message,
    }),
    custom: (validator: (value: any, formData?: any) => string | boolean, message?: string) =>
      ({ validator, message }) as FieldRule,
  }

  return {
    // 输入类
    input,
    inputSlot,
    textarea,
    password,
    // 选择类
    select,
    cascader,
    // 日期时间类
    datePicker,
    dateRangePicker,
    dateTimePicker,
    dateTimeRangePicker,
    timePicker,
    timeRangePicker,
    // 特殊组件
    sw,
    rate,
    // 工具
    custom,
    divider,
    title,
    pick,
    rules,
    imageUpload,
    user
  }
}

// 默认导出
export default useFormFields
