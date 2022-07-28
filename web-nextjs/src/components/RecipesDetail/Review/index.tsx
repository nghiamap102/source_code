import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Rating from 'src/components/Rating'
import { mainColor } from 'src/theme/theme'
import { isNonEmptyArray } from 'src/utils'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Review.module.css'

type ReviewRecipesProps = {
  name: string
  rank: string
  srcAvatar?: string
  time: string
  date: string
  countLike?: number
  cmt?: string
  imgCmt: Array<{
    src: string
    alt: string
  }>
  rating: number
}
export const ReviewRecipesDetail: React.FC<ReviewRecipesProps> = ({
  name,
  rank,
  srcAvatar,
  time,
  date,
  countLike,
  cmt,
  imgCmt,
  rating
}) => {
  return (
    <Box>
      <Box className={styles.displayFlexBtw} alignItems='center' margin='10px 0px'>
        <Box className={styles.displayFlexStart}>
          <Box className={styles.avatarWrapper}>
            {srcAvatar && <Image src={srcAvatar} alt='Avatar' />}
            {!srcAvatar && <Image src='/images/recipesdetail/avatar.png' alt='Avatar' />}
          </Box>
          <Box marginLeft='10px'>
            <Text className={styles.nameUser}>{name}</Text>
            <Text className={styles.rank}>{rank}</Text>
          </Box>
        </Box>
        <Rating rating={rating} />
      </Box>
      <Text className={styles.text} margin='6px 0px'>
        {cmt}
      </Text>
      <Swiper modules={[Pagination]} freeMode={true} spaceBetween={10} slidesPerView={3.5}>
        {isNonEmptyArray(imgCmt) &&
          imgCmt?.map((element) => (
            <SwiperSlide key={element.src + 1}>
              <Image src={element.src} alt={element.alt} height={100} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Box className={styles.displayFlexBtw} margin='10px 0px'>
        <Text className={styles.subText} color={mainColor.gray}>
          {date} - {time}
        </Text>
        <Box className={styles.dislayFlexCenter}>
          <Box className={`${styles.dislayFlexCenter} ${styles.icon} `}>
            <Image src='/images/recipesdetail/like.svg' alt='Like' />
            <span className={`${styles.subText} ${styles.pl_5}`}>{countLike}</span>
          </Box>
          <Box className={styles.icon}>
            <Image src='/icons/chat.svg' alt='Like' />
          </Box>
          <Box className={styles.icon}>
            <Image src='/images/recipesdetail/report.svg' alt='Like' />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
