export interface Menu {
  index: string
  icon?: string
  text: string
  name: string
  path: string
  children?: Array<Menu>
}

