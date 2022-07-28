import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import head from 'lodash/head'
import { Box, Container } from '@chakra-ui/react'
import { useDeviceDetect } from 'src/hooks'
import Slider from 'src/views/Home/Slider'
import Articles from 'src/views/Home/Articles'
import MobileNavigation from 'src/components/MobileNavigation'
import dataRecipes from 'src/mock/components/recipes/data.json'
import RecipesCarousel from 'src/components/Recipes/RecipesCarousel'
import { getHomeCarousel } from 'src/common/service/cms-service/recipeListService'

const Home: React.FC = () => {
  const { isMobile, isDesktop } = useDeviceDetect()
  const dataRecipesList = get(dataRecipes, 'recommend')
  const [dataBanner, setDataBanner] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await getHomeCarousel()
      const data = get(result, 'results')
      setDataBanner(data)
    })()
  }, [])

  const mainBanner = head(dataBanner) || {}

  return (
    <Box>
      <Slider data={mainBanner} />

      <Container>
        <Box
          mb={16}
          display={{
            base: 'none',
            md: 'block'
          }}
        >
          <RecipesCarousel title='Trending' recipesList={dataRecipesList} />
        </Box>
        <Articles title='Articles' seeAllLink='google.com' />
        <Articles title='Discussion forum' seeAllLink='google.com' />
        <Articles title='Event' seeAllLink='google.com' />
      </Container>

      {isMobile && <MobileNavigation />}
    </Box>
  )
}

export default Home
