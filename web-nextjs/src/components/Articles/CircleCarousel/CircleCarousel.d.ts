import { IPagination } from 'src/utils/Module'
export interface ICategoryItem {
  description: string
  field_icon?: {
    field_media_image: IMediaImage
  }
  field_thumbnail?: {
    field_media_image: IMediaImage
  }
  name: string
}
export interface ICategory {
  results: string
  pager?: IPagination
}

export interface IMediaImage {
  absolute_url?: string
  changed?: string
  created?: string
  fid?: string
  field_image_alt_text?: string
  field_image_title_text?: string
  uri?: string
  url?: string
  uuid?: string
}

export interface ICircleCarousel {
  listItem: ICategoryItem[]
  isLoading?: boolean
}
export interface ICircleCarouselProps {
  title: string
  images: string
  navigationLink: string
}
