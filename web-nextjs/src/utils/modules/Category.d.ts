import { IPagination } from 'src/utils/Module'
export interface ICategoryItem {
  description: string
  field_icon?: string
  field_thumbnail?: string
  name: string
}
export interface ICategory {
  results: string
  pager?: IPagination
}
