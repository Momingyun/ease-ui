// 节点数据
export interface TreeNodeData {
  id?: string | number
  label?: string
  children?: TreeNodeData[]
  disabled?: boolean
  color?: string
  [key: string]: any
}

// 节点配置
export interface NodeConfig {
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
}
