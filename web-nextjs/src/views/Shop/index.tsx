import React from 'react'
import { Image, Link, Box, Container } from '@chakra-ui/react'
import { onErrorImage } from 'src/utils'

import HeroBanner from 'src/components/Banner/HeroBanner'
import bannerList from 'src/mock/components/HeroBanner/data.json'
import BrandList from 'src/components/Brand/BrandList'
import brandList from 'src/mock/components/BrandList/data.json'

import ProductCategories from 'src/components/Product/ProductCategories'
import categoryList from 'src/mock/components/ProductCategories/data.json'

import ProductCarousel from 'src/components/Product/ProductCarousel'
// import RecipesSearch from 'src/components/Recipes/RecipesSearch'
import productList from 'src/mock/components/ProductList/data.json'

const Shop: React.FC = () => {
  return (
    <Box>
      <Container>
        <HeroBanner bannerList={bannerList} />
        <Box p={4}>
          <BrandList brandList={brandList} />
        </Box>
        <HeroBanner bannerList={bannerList} />
        <Box py={10}>{/* <RecipesSearch /> */}</Box>
      </Container>

      <ProductCategories categoryList={categoryList} title='Product Categories' />
      <Box>
        <Link href='#'>
          <Image
            src='images/banner/ads-banner.png'
            alt='Ads Banner'
            fallbackSrc={onErrorImage(375, 59)}
            w='100%'
            fit='cover'
          />
        </Link>
      </Box>
      <Box p={4}>
        <ProductCarousel productList={productList} title='Top trending products' />
        <ProductCarousel productList={productList} title='Featured products' />
        <ProductCarousel productList={productList} title='New products' />
      </Box>
    </Box>
  )
}

export default Shop
