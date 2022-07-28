import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDeviceDetect } from 'src/hooks'
import { getRecipeDetail, getAdsBanner, getHomeCarousel } from 'src/common/service/cms-service/recipeListService'

import { ReviewsRecipes } from 'src/views/Recipe/Review'
import { TipsRecipes } from 'src/views/Recipe/Tips'
import { DetailsRecipesDetail } from 'src/views/Recipe/Details'
import Layout from 'src/components/Layout/Container'
import { Container } from '@chakra-ui/react'
import { DetailsRecipesProps } from 'src/views/Recipe/RecipesDetail'
import { usePagination } from 'src/components/Pagination'
import { RecipesDetail } from 'src/components/RecipesDetail'
import { ICarouselItem } from 'src/utils/Module'
import { getAccessToken } from 'src/common/api/request'
import isEmpty from 'lodash/isEmpty'
import { get } from 'lodash'

const RecipesDetailDesktop: React.FC<DetailsRecipesProps> = ({}) => {
  const router = useRouter()
  const [recipe, setRecipe] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const [recipeCarousel, setRecipeCarousel] = useState<ICarouselItem>()
  const [banner, setBanner] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { isMobile } = useDeviceDetect()

  const { id } = router.query

  const getProductById = async () => {
    if (id) {
      setIsLoading(true)
      setIsError(false)
      const dataApi = await getRecipeDetail(id)
      if (dataApi) {
        setRecipe(dataApi)
      } else {
        setIsError(true)
      }
      setIsLoading(false)
    }
  }

  const getCarouselData = async () => {
    try {
      const result = await getHomeCarousel()
      const data = get(result, 'results[0]', {})
      setRecipeCarousel(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAddBannerPage = async () => {
    const params = {
      section: 'recipe_list'
    }
    setIsError(false)
    const dataApi = await getAdsBanner(params)
    if (dataApi) {
      setBanner(dataApi)
    } else {
      setIsError(true)
    }
  }

  const checkToken = () => {
    const token = getAccessToken()
    if (!isEmpty(token)) {
      setIsLogin(true)
    }
  }

  useEffect(() => {
    if (id) {
      getProductById()
      getCarouselData()
      getAddBannerPage()
      checkToken()
    }
  }, [id])

  return (
    <>
      {/* {!isMobile && (
        <Layout>
          <Container padding={{ base: '20px', lg: '40px', md: '20px', sm: '20px' }}>
            <DetailsRecipesDetail
              recipesDetails={recipe && recipe[0]}
              carouselList={recipeCarousel}
              isLogin={isLogin}
            />
            <TipsRecipes isLogin={isLogin} />
            <ReviewsRecipes isLogin={isLogin} />
          </Container>
        </Layout>
      )}
      {isMobile && (
        <Layout>
          <RecipesDetail recipesDetails={recipe && recipe[0]} carouselList={recipeCarousel} banner={banner} />
        </Layout>
      )} */}
      <Layout>
        <Container padding={{ base: '20px', lg: '40px', md: '20px', sm: '20px' }}>
          <DetailsRecipesDetail recipesDetails={recipe && recipe[0]} carouselList={recipeCarousel} />
          <TipsRecipes />
          <ReviewsRecipes />
        </Container>
      </Layout>
    </>
  )
}

export default RecipesDetailDesktop
