import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Image, Link, Flex, Grid, GridItem } from '@chakra-ui/react'
import data from 'src/mock/components/HeroBanner/data.json'
import bannerSide from 'src/mock/components/HeroBanner/banner-side.json'
import Carousel from 'src/components/Carousel'
import { useDeviceDetect } from 'src/hooks'
import { isNonEmptyArray } from 'src/utils'
import { SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { IArticles } from './Articles.d'

const Articles: React.FC<IArticles> = ({ title, seeAllLink }) => {
  const { isDesktop, isMobile } = useDeviceDetect()
  const [height, setHeight] = useState<number>(0)
  const ref = useRef(null as null | HTMLDivElement)

  useEffect(() => {
    if (ref && ref.current && ref.current.clientHeight) {
      setHeight(ref?.current?.clientHeight)
    }
  })

  return (
    <Box my='50px'>
      <Box
        display={{
          base: 'none',
          md: 'block'
        }}
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          color='main.textDark2'
          fontWeight={700}
          mb='22px'
          width='100%'
        >
          <Box>
            <Text fontSize='display2'>{title}</Text>
          </Box>
          <Box>
            <Text fontSize='subHead'>
              <Link href={seeAllLink}>See all</Link>
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(5, 1fr)'
          }}
          gap='30px'
        >
          <GridItem ref={ref} className='banner' colSpan={4} position='relative'>
            <Box
              display={{
                base: 'block',
                md: 'none'
              }}
            >
              <Flex
                justifyContent='space-between'
                alignItems='center'
                color='main.white'
                zIndex={10}
                fontWeight={700}
                mb='22px'
                width='100%'
                position='absolute'
                px='1rem'
                top='1rem'
              >
                <Text fontSize='display2'>{title}</Text>
                <Text fontSize='subHead'>
                  <Link href={seeAllLink}>See all</Link>
                </Text>
              </Flex>
            </Box>
            <Carousel loop={true} pagination={true} modules={[Pagination]}>
              {isNonEmptyArray(data) &&
                data.map((element, index) => (
                  <SwiperSlide key={index}>
                    <Box position='relative'>
                      <Image src={element.bannerImage} alt={element.bannerName} width='100%' />
                      <Box
                        position='absolute'
                        bottom='0'
                        left='0'
                        w='100%'
                        h='60%'
                        background='linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                        zIndex='0'
                      />
                      <Box
                        position='absolute'
                        left='50%'
                        bottom='50px'
                        transform='translateX(-50%)'
                        w='100%'
                        px='10px'
                        color='main.white'
                        display={{
                          base: 'none',
                          md: 'block'
                        }}
                      >
                        <Text fontSize='display2' fontWeight={700}>
                          {element.name}
                        </Text>
                        <Text fontSize='headline' fontWeight={700}>
                          {element.name}
                        </Text>
                        <Text fontSize='subHead' fontWeight={600}>
                          {element.name}
                        </Text>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
            </Carousel>
          </GridItem>

          <GridItem
            colStart={5}
            colEnd={12}
            position='relative'
            maxHeight={`${height}px`}
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            <Carousel loop={true} slidesPerView={2.2} direction={'vertical'}>
              {isNonEmptyArray(bannerSide) &&
                bannerSide.map((element, index) => (
                  <SwiperSlide key={index}>
                    <Box position='relative'>
                      <Image src={element.bannerImage} alt={element.bannerName} width='100%' />
                      <Box
                        position='absolute'
                        bottom='0'
                        left='0'
                        w='100%'
                        h='60%'
                        background='linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                        zIndex='0'
                      />
                      <Box
                        position='absolute'
                        bottom='0'
                        left='50%'
                        transform='translateX(-50%)'
                        w='100%'
                        px='10px'
                        color='main.white'
                      >
                        <Text fontSize='headline' fontWeight={700}>
                          {element.name}
                        </Text>
                        <Text fontSize='subHead' fontWeight={600}>
                          {element.name}
                        </Text>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
            </Carousel>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

export default Articles
