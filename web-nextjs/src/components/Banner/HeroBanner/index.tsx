import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { IHeroBannerList, IHeroBanner } from 'src/components/Banner/HeroBanner/HeroBanner.d'
import Carousel from 'src/components/Carousel'
import { onErrorImage } from 'src/utils'
import styles from 'src/components/Carousel/Carousel.module.css'

const HeroBanner: React.FC<IHeroBannerList> = ({ bannerList, centeredSlides = true }) => {
  const centerSlide = centeredSlides && styles['center-image']

  return (
    <Box>
      {Array.isArray(bannerList) && bannerList.length > 0 && (
        <Carousel
          slidesPerView={1}
          pagination
          navigation
          centeredSlides={centeredSlides}
          modules={[Pagination, Navigation]}
        >
          {bannerList.map((e: IHeroBanner, i: number) => (
            <SwiperSlide key={i}>
              <Image
                src={e.bannerImage}
                alt={e.bannerName}
                fallbackSrc={onErrorImage(375, 375)}
                className={centerSlide || ''}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      )}
    </Box>
  )
}
export default HeroBanner
