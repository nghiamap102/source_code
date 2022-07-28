import { IFile } from 'src/utils/Module'
import { IImageProps } from './Image'

export interface IFilterBy {
  filterOption: IFilterData
  listFilterTag: IItemCheckbox[]
  handleCheckFilter: Function
  className?: string
  isLoading?: boolean
}

export interface IFilterData {
  data: IFilterItem[]
  map_key?: {
    [key: string]: string
  }
}

export interface IFilterItem {
  type: string
  label: string
  bundle: string
  item?: IItemCheckbox[]
}
export interface IItemCheckbox {
  unique_key?: string
  bundle_key: string
  tid: string
  label: string
  key?: string
}

export interface ISearch {
  body: string
  counting: ICounting
  created: string
  created_timestamp: string
  entity_id: string | number
  field_five_start_rating: any
  field_ref_products: any
  field_thumbnail: {
    field_media_image: IFile
  }
  langcode: string
  path_alias: string
  title: string
  uid: {
    entity_id: string
    field_first_name: string
    field_last_name: string
    user_picture: IFile
  }
}

export interface ISelectedTag {
  [key: string | number]: string | number
}
interface ICounting {
  number_of_reviewer: number
  number_of_review: number
  number_of_like: number
  number_of_share: number
}

//articles filter
export interface IArticles {
  body?: string
  created?: string
  entity_id?: string
  field_curated_article?: string
  field_image?: IImageProps
  field_tags?: string[]
  langcode?: string
  title?: string
  uid?: ISearch.uid
}
