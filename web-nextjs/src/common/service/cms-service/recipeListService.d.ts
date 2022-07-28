export interface IParamsHomeCarousel {
  items_per_page?: number
  page?: number
}
export interface IParamsBanner {
  section?: string
}
export interface IParamsSearchRecipes {
  type?: string
  page?: number
  items_per_page?: number
  title?: string
  word?: string
  sort_by?: 'title' | 'has_video_photo' | 'vote_average' | 'vote_count'
  sort_order?: 'DESC' | 'ASC'
  [key: string]: any
}
