import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { isNonEmptyArray } from 'src/utils'
import { RecipesCard, IDataRecipes } from 'src/components/Recipes/RecipesCard'
import Carousel from 'src/components/Carousel'
import { SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import Skeleton from 'react-loading-skeleton'

export type IRecipesCarousel = {
  title: string
  recipesList: Array<IDataRecipes>
  slidesPerView?: number
  isLoading?: boolean
  isArticle?: boolean
}

const RecipesCarousel: React.FC<IRecipesCarousel> = ({ title, recipesList, isLoading = false, isArticle = false }) => {
  const carouselItem = () => {
    return (
      isNonEmptyArray(recipesList) &&
      recipesList.map((element, i) => (
        <SwiperSlide key={i}>
          <RecipesCard element={element} isArticle={isArticle} />
        </SwiperSlide>
      ))
    )
  }
  return (
    <>
      {!isLoading ? (
        <Box>
          {isNonEmptyArray(recipesList) && (
            <Text
              fontSize={{
                base: 'subHead',
                md: 'display2'
              }}
              fontWeight={700}
              mb={7}
            >
              {title}
            </Text>
          )}

          <Box
            display={{
              base: 'block',
              md: 'none'
            }}
          >
            <Carousel slidesPerView={2.5} spaceBetween={30} slidesPerGroup={3}>
              {carouselItem()}
            </Carousel>
          </Box>
          <Box
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            <Carousel slidesPerView={5.2} spaceBetween={30} slidesPerGroup={3} navigation modules={[Navigation]}>
              {carouselItem()}
            </Carousel>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box mb={7}>
            <Skeleton height={60} width={300} />
          </Box>
          <Flex justifyContent='space-between' height='300'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Box flexBasis='18%' key={i}>
                <Skeleton inline height='80%' />
                <Skeleton count={3} />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  )
}

export default RecipesCarousel
