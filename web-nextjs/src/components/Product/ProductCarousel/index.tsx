import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import ProductCard from 'src/components/Product/ProductCard'
import { IProductCard } from 'src/components/Product/ProductCard/ProductCard.d'
import Carousel from 'src/components/Carousel'
import { SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper'

interface IProductList {
  productList: Array<IProductCard>
  title?: string
}
const ProductCarousel: React.FC<IProductList> = ({ productList, title }) => {
  return (
    <Box>
      {title && (
        <Text fontSize='lg' mb={4} fontWeight={600} color='main.textDark2'>
          {title}
        </Text>
      )}
      {productList.length > 0 && (
        <Carousel
          slidesPerView={2}
          spaceBetween={30}
          scrollbar={{
            hide: true
          }}
          modules={[Scrollbar]}
        >
          {productList.map((element: IProductCard, i: number) => (
            <SwiperSlide key={i}>
              <ProductCard {...element} isCarousel />
            </SwiperSlide>
          ))}
        </Carousel>
      )}
    </Box>
  )
}
export default ProductCarousel
