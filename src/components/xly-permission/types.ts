export interface Permission {
  id: string | number
  label: string
  children?: Permission[]
  disabled?: boolean
}
