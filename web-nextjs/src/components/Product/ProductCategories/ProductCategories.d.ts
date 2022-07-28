interface ICategoryItem {
  categoryName: string
  categoryImage: string
  navigationLink: string
}

export interface ICategoriesList {
  categoryList: Array<ICategoryItem>
  title?: string
}
