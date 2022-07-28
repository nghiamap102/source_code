export interface IProductCard {
  productName: string
  productImage: string
  productPath: string
  price: string | number
  priceDiscount: string | number
  rating: number
  isWishlisted?: boolean
  isExternal?: boolean
  addToWishlist?: () => void
  addToCart?: () => void
  isCarousel?: boolean
}
