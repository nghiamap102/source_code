export interface IProductCardDetails {
  brandProduct: string
  productName: string
  productImage: string
  productPath: string
  price: string | number
  priceDiscount: string | number
  rating: number
  isWishlisted?: boolean
  isExternal?: boolean
  sku: number
  isRecipes?: boolean
  addToWishlist?: () => void
  addToCart?: () => void
}
