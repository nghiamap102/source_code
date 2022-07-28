import React from 'react'
import { Box } from '@chakra-ui/react'
import ProductCard from 'src/components/Product/ProductCard'
import styles from '../Product.module.css'
import { ProductCardRecipes } from 'src/components/Product/ProductCardRecipes'
import { IProductCard } from 'src/components/Product/ProductCard/ProductCard.d'

interface IProductList {
  productList: Array<IProductCard>
  isRecipes: boolean
}

export const ProductList: React.FC<IProductList> = ({ productList = [], isRecipes = false }) => {
  return (
    <Box className={styles.row}>
      {productList.length > 0 &&
        productList.map((element: IProductCard, index) => {
          const renderEl = isRecipes ? (
            <ProductCardRecipes {...element} key={index} />
          ) : (
            <ProductCard {...element} key={index} />
          )
          return renderEl
        })}
    </Box>
  )
}
export default ProductList
