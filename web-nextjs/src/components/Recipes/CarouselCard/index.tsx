import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Image, Link, Text, Flex } from '@chakra-ui/react'
import Rating from 'src/components/Rating'

import 'swiper/css'
import 'swiper/css/free-mode'
import styles from './CarouselCard.module.css'
import { mainColor } from 'src/theme/theme'

import { FreeMode, Navigation } from 'swiper'
import { getBanner, isNonEmptyArray, onErrorImage } from 'src/utils'
import { ICarouselItem, ICarouselList } from 'src/utils/Module'

export const RecipesCard: React.FC<ICarouselItem> = ({ ...ele }) => {
  const images = getBanner(ele)
  return (
    <Box position='relative' borderRadius='2px'>
      <Link href={images?.desktop?.url}>
        <Image
          src={images?.desktop?.url}
          fallbackSrc={onErrorImage(212, 305)}
          alt={ele?.title}
          className={styles.image}
          w='100%'
        />
      </Link>
      <Box className={styles.decription}>
        <Link href={images?.desktop?.url}>
          <Text className={styles.name}>{ele?.title}</Text>
        </Link>
        <Box className={styles.rating}>
          <Rating rating={3} />
          <Text className={styles.count}>({3})</Text>
        </Box>
        <Text className={styles.time}>{ele?.created}</Text>
        <Text className={styles.author}>
          By{' '}
          <Link href={'#'} color={mainColor.primary}>
            {ele?.uid?.idp_id} {ele?.uid?.idp_id}
          </Link>
        </Text>
      </Box>
    </Box>
  )
}

export const CarouselCardRecipes: React.FC<ICarouselList> = ({ ...ele }) => {
  const carouselItem = ele?.field_carousel_items
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={30}
      freeMode={true}
      navigation={{
        nextEl: `.${styles.slideBtnNext}`,
        prevEl: `.${styles.slideBtnPrev}`
      }}
      modules={[Navigation, FreeMode]}
      className='mySwiper'
      breakpoints={{
        982: {
          slidesPerView: 3
        }
      }}
    >
      {carouselItem &&
        isNonEmptyArray(carouselItem) &&
        carouselItem?.map((ele: ICarouselItem, index: number) => {
          return (
            <SwiperSlide key={index}>
              <RecipesCard {...ele} />
            </SwiperSlide>
          )
        })}
      <Box>
        <Flex mt={5} className={styles.boxSlideBtn}>
          <Box className={styles.slideBtnPrev} mr={5}>
            <Image src='/images/recipesdetail/back.svg' alt='Back' />
          </Box>
          <Box className={styles.slideBtnNext}>
            <Image src='/images/recipesdetail/next.svg' alt='Next' />
          </Box>
        </Flex>
      </Box>
    </Swiper>
  )
}
