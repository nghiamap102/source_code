import { IItemCheckbox } from 'src/utils/Module'
export interface IFilterTag {
  className?: string
  listFilterTag: IItemCheckbox[]
  onRemoveTag?: (tag) => void
}
