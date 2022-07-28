import React from 'react'
import { Box, Link, Text, Image } from '@chakra-ui/react'
import { ICategoriesList } from 'src/components/Product/ProductCategories/ProductCategories.d'
import Carousel from 'src/components/Carousel'
import { SwiperSlide } from 'swiper/react'
import { Grid, Scrollbar } from 'swiper'
import styles from './ProductCategories.module.css'
import { isNonEmptyArray } from 'src/utils'
import { useDeviceDetect } from 'src/hooks'

const ProductCategories: React.FC<ICategoriesList> = ({ categoryList, title }) => {
  return (
    <Box bg='main.light_orange' p={4}>
      {isNonEmptyArray(categoryList) && (
        <Box height={{ base: '360px', md: '400px' }} pb={20}>
          {title && (
            <Text fontSize='lg' pt={4} fontWeight={600} color='main.textDark2'>
              {title}
            </Text>
          )}

          <Carousel
            slidesPerView={4}
            grid={{
              rows: 2
            }}
            scrollbar={{
              hide: true
            }}
            modules={[Grid, Scrollbar]}
          >
            {categoryList.map((element, i) => (
              <SwiperSlide key={i} className={styles.grid}>
                <Link href={element.navigationLink}>
                  <Box bg='main.white' p={1} borderRadius='50%'>
                    <Image
                      src={element.categoryImage}
                      alt={element.categoryName}
                      // borderRadius='inherit'
                      maxHeight={58}
                      maxWidth={58}
                    />
                  </Box>
                </Link>
              </SwiperSlide>
            ))}
          </Carousel>
        </Box>
      )}
    </Box>
  )
}
export default ProductCategories
