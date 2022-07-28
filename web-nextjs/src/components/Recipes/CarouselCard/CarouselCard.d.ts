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
