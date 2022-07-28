import React, { useState, useEffect, useRef } from 'react'
import { Box, Text, Flex, Image, useDisclosure } from '@chakra-ui/react'
import Carousel from 'src/components/Carousel'
import { SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { mainColor } from 'src/theme/common/color'
import Rating from 'src/components/Rating'
import styles from '../Recipes.module.css'
import { ISearch as IRecipesCarousel } from 'src/utils/Module'
import { useDeviceDetect } from 'src/hooks'
import DialogPopup from 'src/components/DialogPopup'
import SkeletonBanner from './Skeleton'

interface IRecipesHeroBanner {
  data?: IRecipesCarousel[]
  isLogin?: boolean
  isLoading?: boolean
}
const RecipesHeroBanner: React.FC<IRecipesHeroBanner> = ({ data, isLogin = false, isLoading = false }) => {
  const { isDesktop, isMobile } = useDeviceDetect()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [height, setHeight] = useState<number>(0)
  const ref = useRef(null as null | HTMLDivElement)

  useEffect(() => {
    if (ref && ref.current && ref.current.clientHeight) {
      setHeight(ref?.current?.clientHeight)
    }
  })

  const mappingSlider = () => {
    return (
      data &&
      data.map((element, index) => {
        const { uid, title, created } = element
        const { user_picture, field_first_name, field_last_name } = uid
        // const { uuid, absolute_url } = user_picture
        return (
          <SwiperSlide key={`${user_picture?.uuid}-${index}`}>
            <Box position='relative' className='recipes-carousel-box' ref={ref}>
              <Image src={user_picture?.absolute_url} alt={title} fallbackSrc={onErrorImage(1440, 900)} width='100%' />

              <Box className={styles.decription}>
                <Flex justifyContent={'space-between'}>
                  <Box>
                    <Text className={styles.name}>{title}</Text>
                    <Box className={styles.rating}>
                      <Rating rating={4} />
                      <Text className={styles.count}>(1024)</Text>
                    </Box>
                    <Text className={styles.time}>{created}</Text>
                    <Box className={styles.author}>
                      By{' '}
                      <Text color='main.primary' display='inline'>
                        {field_first_name} {field_last_name}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    {' '}
                    <Image src='/images/save.svg' alt='Save' onClick={onOpen} />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </SwiperSlide>
        )
      })
    )
  }

  return (
    <Box>
      {!isLogin && (
        <DialogPopup
          titlePopup='Welcome, Guest!'
          isDesc
          isOkBtn
          isDescLogin
          contentOkBtn='Login'
          descPopup='You need an account to continue!'
          isOpen={isOpen}
          onClose={onClose}
          size='2xl'
        />
      )}
      {isMobile && (
        <Box position='relative' height={`${height}px`}>
          <Carousel loop speed={500} grabCursor modules={[Pagination]} direction={'vertical'}>
            {mappingSlider()}
          </Carousel>
        </Box>
      )}

      {isDesktop && (
        <>
          {isLoading ? (
            <SkeletonBanner />
          ) : (
            <Carousel
              loop
              centeredSlides
              navigation
              grabCursor
              speed={1000}
              spaceBetween={30}
              slidesPerView={2}
              initialSlide={2}
              modules={[Navigation]}
              classNames='recipes-carousel'
            >
              {mappingSlider()}
              <style jsx global>{`
                .recipes-carousel .swiper-wrapper {
                  align-items: center;
                }
                .recipes-carousel .swiper-slide {
                  transition: 0.2s;
                }
                .recipes-carousel .swiper-slide:not(.swiper-slide-active) {
                  padding: 3rem;
                  overflow: hidden;
                  position: ;
                }
                .recipes-carousel .swiper-slide:not(.swiper-slide-active) .recipes-carousel-box:before {
                  content: '';
                  position: absolute;
                  top: 0px;
                  left: 0;
                  background: ${mainColor.black_RGBA_6};
                  width: 100%;
                  height: 100%;
                }
              `}</style>
            </Carousel>
          )}
        </>
      )}
    </Box>
  )
}

export default RecipesHeroBanner
