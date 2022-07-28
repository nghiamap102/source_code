export interface IDropdown {
  label?: string
  dropdownName?: string
  isEmpty?: boolean
  onChange?: (obj: IDropdownValue) => void
  dropdownList: Array<IDropdownList>
  size?: string
}
interface IDropdownList {
  id: number | string
  type: string
  code: string
  name?: string
  selected: boolean
  subList?: null
}

export interface IDropdownValue {
  type: string
  code: string
  value?: string
}
