import { Box, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { ICircleCarousel } from './CircleCarousel.d'
import Carousel from 'src/components/Carousel'
import Skeleton from './Skeleton'

const CircleCarousel: React.FC<ICircleCarousel> = ({ listItem, isLoading = false }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Carousel slidesPerView={8} initialSlide={5} loop centeredSlides navigation modules={[Navigation]}>
          {isNonEmptyArray(listItem) &&
            listItem?.map((item, index) => (
              <SwiperSlide key={index}>
                <Box position='relative' display='flex' justifyContent='center'>
                  {/* <Link href={item.navigationLink}> */}
                  <Box position='relative' display='inline-block' borderRadius='50%'>
                    <Image
                      src={item.field_thumbnail}
                      alt={item.name}
                      fallbackSrc={'/images/recipes/circle/carousel-1.png' || onErrorImage(178, 178)}
                    />
                    <Box position='absolute' top='50%' left='50%' transform='translate(-50%,-50%)'>
                      <Image
                        src={item.field_icon}
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
            ))}
        </Carousel>
      )}
    </>
  )
}

export default CircleCarousel
