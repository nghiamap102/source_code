import React from 'react'
import { Box, Link, Flex, Text, Image } from '@chakra-ui/react'
import styles from '../Product.module.css'
import { IProductCard } from '../ProductCard/ProductCard'
import Rating from 'src/components/Rating'

export const ProductCardRecipes: React.FC<IProductCard> = ({
  productName,
  productPath,
  productImage,
  price,
  priceDiscount,
  rating,
  isExternal
}) => {
  return (
    <>
      <Box className={styles.cardRecipes}>
        <Link href={productPath} isExternal={isExternal}>
          <Box className={styles.contentRecipes}>
            <Text className={styles.titleRecipes}>dsfdgdfgdf</Text>
            <Rating rating={rating} />
            <Box className={styles.dateRecipes} mt={2} py={1}>
              2fdbgjfd
            </Box>
            <Box className={styles.authorRecipes} py={1}>
              dfgdfg &nbsp;
              <span className={styles.authorRecipesColor}>sdfsđfgf</span>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  )
}
