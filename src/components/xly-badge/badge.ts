export interface BadgeOptions {
  value?: number | string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
  max?: number
  showZero?: boolean
  circle?: boolean
}

export interface BadgeInstance {
  close: () => void
  setValue: (value: number | string) => void
}

const colorMap: Record<string, string> = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
}

const badgeMap = new Map<HTMLElement, { wrapper: HTMLElement; badge: HTMLElement }>()

function open(el: HTMLElement, options: BadgeOptions = {}): BadgeInstance {
  if (badgeMap.has(el)) {
    close(el)
  }

  const {
    value = 0,
    position = 'top-right',
    type = 'danger',
    color,
    max = 99,
    showZero = false,
    circle = false,
  } = options

  const bgColor = color || colorMap[type] || colorMap.danger

  // 计算显示值
  let displayValue = ''
  if (value !== null && value !== undefined && value !== '') {
    if (typeof value === 'number' && value > max) {
      displayValue = String(max) + '+'
    } else {
      displayValue = String(value)
    }
  }
  if (!showZero && (value === 0 || value === '0')) {
    displayValue = ''
  }

  // 创建包装容器
  const wrapper = document.createElement('span')
  wrapper.style.display = 'inline-flex'
  wrapper.style.position = 'relative'
  wrapper.style.verticalAlign = 'middle'

  // 移动原元素到包装容器
  el.parentNode?.insertBefore(wrapper, el)
  wrapper.appendChild(el)

  // 创建徽标
  const badge = document.createElement('span')
  badge.className = `badge-mark ${position}${circle ? ' circle' : ''}`
  badge.style.cssText = `
    position: absolute;
    z-index: 100;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background-color: ${bgColor};
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    white-space: nowrap;
    pointer-events: none;
  `
  
  // 圆形时覆盖样式
  if (circle) {
    badge.style.width = '20px'
    badge.style.padding = '0'
    badge.style.borderRadius = '50%'
  }

  // 位置偏移 - 与组件一致
  if (position === 'top-left') {
    badge.style.top = '0'
    badge.style.left = '0'
    badge.style.transform = 'translate(-50%, -50%)'
  } else if (position === 'bottom-right') {
    badge.style.bottom = '0'
    badge.style.right = '0'
    badge.style.transform = 'translate(50%, 50%)'
  } else if (position === 'bottom-left') {
    badge.style.bottom = '0'
    badge.style.left = '0'
    badge.style.transform = 'translate(-50%, 50%)'
  } else {
    badge.style.top = '0'
    badge.style.right = '0'
    badge.style.transform = 'translate(50%, -50%)'
  }

  if (!displayValue) {
    badge.style.display = 'none'
  }

  badge.textContent = displayValue
  wrapper.appendChild(badge)

  badgeMap.set(el, { wrapper, badge })

  return {
    close: () => close(el),
    setValue: (newValue: number | string) => {
      let text = ''
      if (newValue !== null && newValue !== undefined && newValue !== '') {
        if (typeof newValue === 'number' && newValue > max) {
          text = String(max) + '+'
        } else {
          text = String(newValue)
        }
      }
      if (!showZero && (newValue === 0 || newValue === '0')) {
        badge.style.display = 'none'
      } else {
        badge.style.display = 'inline'
        badge.textContent = text
      }
    }
  }
}

function close(el: HTMLElement): void {
  const item = badgeMap.get(el)
  if (item) {
    const { wrapper, badge } = item
    // 恢复原元素位置
    if (wrapper.parentNode) {
      wrapper.parentNode.insertBefore(el, wrapper)
    }
    wrapper.remove()
    badgeMap.delete(el)
  }
}

function closeAll(): void {
  badgeMap.forEach((_, el) => close(el))
}

export const XlyBadge = {
  open,
  close,
  closeAll,
}
