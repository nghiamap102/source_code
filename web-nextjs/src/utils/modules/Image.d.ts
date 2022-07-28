export interface ICarouselList {
  created?: string
  field_carousel_items?: Array<ICarouselItem>
  field_weight?: number
  title?: string
}

export interface IContentType {
  options: {
    article: string
    recipes: string
    discussion_forum: string
  }
  selected: string[]
}

export interface ICarouselItem {
  created?: string
  title?: string
  field_ci_content_type?: IContentType
  field_ci_image_desktop?: IImageProps
  field_ci_image_mobile?: IImageProps
  uid?: {
    idp_id: string | number
  }
}

export interface IImageProps {
  changed: string
  created: string
  fid: string | number
  filemime: string
  filename: string
  filesize: string
  langcode: string
  status: string
  uid: { idp_id: string }
  uri: string
  url: string
  absolute_url: string
  uuid?: string
  field_image_alt_text?: string
  field_image_title_text?: string
}
