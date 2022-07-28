import React from 'react'
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton
} from '@chakra-ui/react'
import Rating from 'src/components/Rating'
import styles from '../Product.module.css'
import { IProductCardDetails } from './ProductCardDetails.d'
import { ProductList } from '../ProductList'
import data from 'src/mock/components/ProductList/data.json'

const productListArr = data

export const ProductCardDetails: React.FC<IProductCardDetails> = ({
  brandProduct,
  productName,
  productPath,
  productImage,
  price,
  priceDiscount,
  rating,
  isExternal,
  isRecipes,
  sku
}) => {
  return (
    <>
      <Box className={styles.productDetailsCard}>
        <Box className={styles.image}>{productImage && <Image src={productImage} alt={productName} />}</Box>
        <Box className='info'>
          <Box className={styles.brand} py={1} color='main.textDark3'>
            {brandProduct}
          </Box>
          <Box className={styles.contentDetails} py={1} color='main.textDark3'>
            {productName}
          </Box>
          <Box className={styles.priceDetails} py={1}>
            {priceDiscount && <span className={styles.discount}>{priceDiscount}</span>}
            {price}
          </Box>
          <Flex justifyContent='space-between' alignItems='center' mt='1'>
            <Box>
              <Rating rating={rating} />
            </Box>
            <Box className={styles.action}>
              <Box>
                <Image src='/images/product/product-card/wishlist.svg' alt='wishlist' />
              </Box>
            </Box>
          </Flex>
          <Box className={styles.skuDetails} color='main.gray'>
            SKU: {sku}
          </Box>
        </Box>
        <Box className={styles.volume} mt={4}>
          xznfbsdh
        </Box>
        <Box mt={5}>
          <Button className={styles.btnActive} variant='solid'>
            sfdsef
          </Button>
          <Button className={styles.btnDisable} variant='outline'>
            sfdsef
          </Button>
        </Box>
        <Accordion allowToggle mt={6}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Section 3 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box mt={6}>
          <Text className={styles.contentDetails}> In love with React & Next</Text>
          <ProductList productList={productListArr} isRecipes={false} />
        </Box>
        <Box mt={6}>
          <Text className={styles.contentDetails}> In love with React & Next</Text>
          <ProductList productList={productListArr} isRecipes={true} />
        </Box>
        <Box mt={6} className={styles.boxFooter}>
          <Flex>
            <Text>Qty</Text>
            <Flex className={styles.counter}>
              <span className={styles.down}>-</span>
              <input type='text' value='1' />
              <span className={styles.up}>+</span>
            </Flex>
          </Flex>
          <Button className={styles.btnAddToCart} mt={4}>
            Add To Cart
          </Button>
        </Box>
      </Box>
    </>
  )
}
