import React from 'react'
import { Box, Link, Button, Flex, Image } from '@chakra-ui/react'
import styles from '../Product.module.css'
import { IProductCard } from './ProductCard.d'
import cx from 'classnames'
import Rating from 'src/components/Rating'

const MAX_RATING_POINT: number = 5

const ProductCard: React.FC<IProductCard> = ({
  productName,
  productPath,
  productImage,
  price,
  priceDiscount,
  rating,
  isExternal,
  isCarousel
}) => {
  return (
    <Box className={cx(!isCarousel && styles.card)}>
      <Link href={productPath} isExternal={isExternal} className={styles.link}>
        <Box className={styles.image} borderWidth='1px' borderRadius='base'>
          {productImage && <Image src={productImage} alt={productName} />}
          <Box className={styles.wishlist}>
            <Image src='/images/product/product-card/wishlist.svg' alt='wishlist' />
          </Box>
        </Box>
        <Box>
          <Box className={styles.content} py={1} color='main.textDark3'>
            {productName}
          </Box>
          <Flex justifyContent='space-between' mt='1'>
            <Box>
              <Rating rating={rating} />
              <Box className={styles.price} py={1} color='main.gray'>
                {priceDiscount && <span className={styles.discount}>{priceDiscount}</span>}
                {price}
              </Box>
            </Box>
            <Box className={styles.action}>
              <Button isLoading={false} bg='main.primary' variant='solid' size='sm'>
                <Image src='/icons/plus.svg' alt='plus' />
              </Button>
            </Box>
          </Flex>
        </Box>
      </Link>
    </Box>
  )
}
export default ProductCard
