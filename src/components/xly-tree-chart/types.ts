// 节点数据
export interface TreeNodeData {
  /** 节点唯一标识 */
  id: string | number
  /** 节点显示文字 */
  label: string
  /** 子节点 */
  children?: TreeNodeData[]
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义颜色（用于边框和装饰） */
  color?: string
  /** 展开状态 */
  expanded?: boolean
  /** 字体颜色（普通状态） */
  textColor?: string
  /** 背景色（普通状态） */
  backgroundColor?: string
  /** 悬停背景色 */
  activeBackgroundColor?: string
  /** 悬停字体颜色 */
  activeTextColor?: string
  /** 边框颜色（普通状态） */
  borderColor?: string
  /** 悬停边框颜色 */
  activeBorderColor?: string
  /** 额外数据 */
  [key: string]: any
}

// 节点配置
export interface NodeConfig {
  /** 节点宽度 */
  nodeWidth?: number
  /** 节点最小高度 */
  nodeMinHeight?: number
  /** 水平间距 */
  horizontalGap?: number
  /** 垂直间距 */
  verticalGap?: number
  /** 连接线颜色 */
  lineColor?: string
  /** 连接线宽度 */
  lineWidth?: number
  /** 节点唯一标识字段 */
  keyField?: string
  /** 子节点字段名 */
  childrenField?: string
  /** 标题字段名 */
  titleField?: string
  /** 描述字段名 */
  descField?: string
  /** 头像字段名 */
  avatarField?: string
}
