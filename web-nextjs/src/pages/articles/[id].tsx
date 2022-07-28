import { Container } from '@chakra-ui/react'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getArticleDetail } from 'src/common/service/cms-service/article/articleService'
import { getAdsBanner, getHomeCarousel } from 'src/common/service/cms-service/recipeListService'
import Layout from 'src/components/Layout/Container'
import { useDeviceDetect } from 'src/hooks'
import { isNonEmptyArray } from 'src/utils'
import { IArticles, ICarouselList } from 'src/utils/Module'
import { ArticlesDetail } from 'src/views/Article/Details'
import { DetailsRecipesProps } from 'src/views/Recipe/RecipesDetail'

const RecipesDetailDesktop: React.FC<DetailsRecipesProps> = ({}) => {
  const router = useRouter()
  const [articles, setArticles] = useState<IArticles>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { isMobile } = useDeviceDetect()

  const { id } = router.query

  const getProductById = async () => {
    if (id) {
      setIsLoading(true)
      setIsError(false)
      const dataApi = await getArticleDetail(id)
      if (dataApi) {
        const data = get(dataApi, [0], {})
        console.log(data)
        setArticles(data)
      } else {
        setIsError(true)
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getProductById()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      {!isMobile && (
        <Layout>
          <Container padding={{ base: '20px', lg: '40px', md: '20px', sm: '20px' }}>
            <ArticlesDetail {...articles} />
          </Container>
        </Layout>
      )}
    </>
  )
}

export default RecipesDetailDesktop
