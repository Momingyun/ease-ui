export interface MenuItem {
  id: string
  key?: string // 用于badge动态更新的唯一标识符
  name: string
  icon?: string
  path?: string
  component?: string // 组件路径，用于动态路由加载
  badge?: string
  isHide?: number // 控制是否在菜单中显示，0：隐藏 1：显示
  isTabHide?: number // 控制在workTab是否显示，0：隐藏 1：显示
  children?: MenuItem[]
}
