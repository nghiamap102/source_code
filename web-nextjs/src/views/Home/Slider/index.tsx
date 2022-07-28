import React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import Carousel from 'src/components/Carousel'
import { mappingDataBanner } from 'src/utils'
import { SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { ICarouselList } from 'src/utils/Module'
import { useDeviceDetect } from 'src/hooks'
interface ISlider {
  data: ICarouselList
}
const Slider: React.FC<ISlider> = ({ data }) => {
  const { isDesktop } = useDeviceDetect()

  return (
    <Box>
      <Carousel loop={true} pagination={true} modules={[Pagination]}>
        {mappingDataBanner(data).map((element, index: number) => {
          const { uid, title, images, fallback } = element
          return (
            <SwiperSlide key={`${uid}-${index}`}>
              <Box position='relative'>
                {isDesktop ? (
                  <Image
                    src={images.desktop}
                    alt={title}
                    fallbackSrc='/images/common/fallback/banner-desktop.jpg'
                    width='100%'
                  />
                ) : (
                  <Image
                    src={images.mobile}
                    alt={title}
                    fallbackSrc='/images/common/fallback/banner-mobile.jpg'
                    width='100%'
                  />
                )}
                <Box position='absolute' left='5%' top='80%' color='main.white'>
                  <Text fontSize='display2' fontWeight={700}>
                    {title}
                  </Text>
                  <Text fontSize='headline' fontWeight={700}>
                    {title}
                  </Text>
                  <Text fontSize='subHead' fontWeight={600}>
                    {title}
                  </Text>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Carousel>
    </Box>
  )
}

export default Slider
