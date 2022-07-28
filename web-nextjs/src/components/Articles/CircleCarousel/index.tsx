import { Box, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { ICircleCarousel } from './CircleCarousel.d'
import Carousel from 'src/components/Carousel'
import Skeleton from './Skeleton'
import styles from './CircleCarousel.module.css'
import base from '@emotion/styled/types/base'
import { mainColor } from 'src/theme/theme'

const CircleCarousel: React.FC<ICircleCarousel> = ({ listItem, isLoading = false }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Carousel classNames={styles.boxSwiper} slidesPerView={6} initialSlide={3}>
          {isNonEmptyArray(listItem) &&
            listItem?.map((item, index) => {
              const icon = item?.field_icon?.field_media_image
              const image = item?.field_thumbnail?.field_media_image
              return (
                <SwiperSlide key={index} className={styles.itemSwiper}>
                  <Box position='relative' display='flex' justifyContent='center'>
                    <Box
                      position='relative'
                      display='inline-block'
                      borderRadius='50%'
                      className={styles.abcdef}
                      background={`${mainColor.overlayCate}, url(${image?.absolute_url})`}
                      width={'178px'}
                      height={'178px'}
                      backgroundSize={'cover'}
                      backgroundPosition={'center'}
                    >
                      <Box position='absolute' top='50%' left='50%' transform='translate(-50%,-50%)'>
                        <Image
                          src={icon?.absolute_url}
                          alt={item.name}
                          fallbackSrc={'/images/recipes/fallback-recipe-icon.png' || onErrorImage(20, 20)}
                          margin='0 auto'
                        />
                        <Text color='main.white' fontSize='body' fontWeight={700} whiteSpace='nowrap' mt={4}>
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                    {/* </Link> */}
                  </Box>
                </SwiperSlide>
              )
            })}
        </Carousel>
      )}
    </>
  )
}

export default CircleCarousel
