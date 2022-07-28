import { Box, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './RecipesHome.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css/pagination'
import { HeaderRecipes, HeaderProps } from '../Header'
import MobileNavigation from 'src/components/MobileNavigation'
import 'src/pages/_app.css'
import { isNonEmptyArray } from 'src/utils'

export type ImageProps = {
  src: string
  alt: string
  href: string
}
export type RecipesHomeProps = {
  listRecipes: Array<
    {
      main: string
      sub: string
    } & ImageProps
  >

  width?: number
  avaSrc?: string
  name?: string
  point?: number
} & HeaderProps

export const RecipesHome: React.FC<RecipesHomeProps> = ({ listRecipes, avaSrc, point, name, ...props }) => {
  return (
    <Box {...props} position='relative'>
      <HeaderRecipes background='linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) , rgba(0, 0, 0, 0))'>
        <Box className={styles.userSection}>
          <Box className={styles.userIn4}>
            <Box className={styles.avatar}>
              {avaSrc && <Image src={avaSrc} alt='Avatar' />}
              {!avaSrc && <Image src='/images/recipes/avatar.jpg' alt='Avatar' />}
            </Box>
            <Box>
              {name?.length && <Text className={styles.name}>Hello, {name}</Text>}
              {!name && <Text className={styles.name}>Hello, Anonymous</Text>}

              <Text className={styles.point}>
                <span>{point}</span> Pts
              </Text>
            </Box>
          </Box>
          <Box className={styles.d_fl_center}>
            <Image src='/images/recipes/search.svg' alt='Search' className={styles.search} />
            <Image src='/images/recipes/cart.svg' alt='Cart' className={styles.cart} />
          </Box>
        </Box>
      </HeaderRecipes>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.bullet}`,
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.active}`
        }}
        freeMode={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {isNonEmptyArray(listRecipes) &&
          listRecipes?.map((ele) => (
            <SwiperSlide key={ele.alt + 1}>
              <Box position='relative'>
                <Link href={ele.href}>
                  <Image src={ele.src} alt={ele.alt} className={styles.image} />
                  <Box className={styles.decription}>
                    <Text className={styles.title}>Recipes</Text>
                    <Text>{ele.main}</Text>
                    <Text className={styles.sub}>{ele.sub}</Text>
                  </Box>
                </Link>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
      <MobileNavigation />
    </Box>
  )
}
