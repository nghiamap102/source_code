import { ICarouselItem } from 'src/utils/Module'

export interface ICookingRecipe {
  content: String
  more?: Array<{
    productName: String
    productImage: String
    price: String
    priceDiscount?: String
  }>
}

export interface ITerm {
  description: String
  entity_id: String
  langcode: String
  path_alias_taxonomy: String
  name: String
}

export interface IFile {
  fid: String
  uuid: String
  langcode: String
  filename: String
  uri: String
  filemime: String
  filesize: String
  status: String
  created: String
  changed: String
  url: String
}

export interface IReview {
  field_body: String
  entity_flag_like: Array<{
    count: Number
    flagged: Number
  }>
  field_five_start_rating: Array<{
    rating: String
    target: String
  }>
  field_pid: String
  field_files: [Object<IFile>]
  user_id: Object<IUserTeaser>
}

export interface IUserTeaser {
  entity_id: String
  field_first_name: String
  field_last_name: String
  user_picture: Object<IFile>
}

export interface IBanner {
  field_ad_image_desktop: Object<IFile>

  field_ad_image_mobile: Object<IFile>
  field_ad_section: {
    selected: String
    options: {
      home: String
      recipe_list: String
    }
  }
  field_ad_url: String
  uid: Object<IUserTeaser>
  title: String
  created: String
}

export interface DetailsRecipesProps {
  recipesDetails?: {
    body: String
    entity_bundle: String
    entity_id: String
    entity_uuid: String
    field_category: Object<ITerm>
    Field_review: [Object<IReview>]
    Field_cooking_level: Object<ITerm>
    field_cooking_method: Object<ITerm>
    field_cooking_time: Object<ITerm>
    field_cuisine_types: Object<ITerm>
    field_featured_recipe: Number
    field_five_start_rating: String
    field_key_ingredients: Object<ITerm>
    field_meal_type: Object<ITerm>
    field_mealtime: Object<ITerm>
    field_recommend?: Number
    field_ref_products?: [Object<IReview>]
    field_special_tags: Object<ITerm>
    field_thumbnail: {
      field_media_image: Object<IFile>
    }
    langcode: String
    path_alias: String
    uid: Object<IUserTeaser>
    title: String
    created: String
  }
  carouselList?: ICarouselItem
  banner?: Object<IBanner>
  isLogin?: boolean
}
