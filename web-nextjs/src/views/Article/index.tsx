import React, { useEffect, useState, useRef } from 'react'
import get from 'lodash/get'
import { useDeviceDetect } from 'src/hooks'

import { IParamsSearchRecipes } from 'src/common/service/cms-service/recipeListService.d'
import {
  getAdsBanner,
  getSearchRecipesOptions,
  getSearchRecipes,
  getTopRatingRecipes
} from 'src/common/service/cms-service/recipeListService'
import {
  getArticleMostView,
  getArticlesCategory,
  getArticlesRecommend,
  getPoll
} from 'src/common/service/cms-service/article/articleService'

import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { ICarouselList, IItemCheckbox } from 'src/utils/Module.d'

import { useAppSelector } from 'src/app/hooks'
import { selectFilter } from 'src/redux/reducers/filterSlice'

import { Box, Text, Container, Grid, GridItem, Image, useOutsideClick } from '@chakra-ui/react'
import BreadCrumb from 'src/components/BreadCrumb'
import CircleCarousel from 'src/components/Articles/CircleCarousel'
import RecipesCarousel from 'src/components/Recipes/RecipesCarousel'
import RecipesHeroBanner from 'src/views/Recipes/RecipesHeroBanner'
import RecipesFilter from 'src/views/Recipes/RecipesFilter'
import RecipesPost from 'src/views/Recipes/RecipesPost'

import mockBreadCrumb from 'src/mock/components/BreadCrumb/data.json'

import {
  updateArticlesFilterResult,
  updateSearchArticles,
  clearFilterArticles,
  updateListCheckboxArticles,
  onAddCheckboxArticles,
  onClearCheckboxArticles,
  updateSortArticles
} from 'src/redux/reducers/articles'
import cleanDeep from 'clean-deep'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import ArticlesSearch from 'src/components/Articles/ArticlesSearch'
import ArticlesSurvey from 'src/components/Articles/ArticlesSurvey'

const Articles: React.FC = () => {
  const dispatch = useDispatch()
  const { moreArticles, filterTag, articlesFilterResult, pager }: any = useSelector<RootReducer>(
    (item) => item.articles
  )
  const { isDesktop, isMobile } = useDeviceDetect()
  const [articlesCategory, setArticlesCategory] = useState<any>()
  const [articlesMostView, setArticlesMostView] = useState<any>()
  const [articlesAds, setArticlesAds] = useState()
  const [articlesRecom, setArticlesRecom] = useState<any>()
  const [carousel, setCarousel] = useState([])

  const { isSearchLoading } = useAppSelector(selectFilter)

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const searchSuggestRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

  const [articlesOption, setArticlesOption] = useState<any>({})

  const [filter, setFilter] = useState<IParamsSearchRecipes>(() => {
    const newListFilter = {}
    let initLFilter = {}
    if (newListFilter) initLFilter = { ...newListFilter }
    initLFilter = { ...newListFilter }
    return initLFilter
  })

  useOutsideClick({
    ref: searchSuggestRef,
    handler: () => {
      setTimeout(() => {
        setIsSearchVisible(false)
      }, 100)
    }
  })

  const getRecipesOption = async () => {
    const result: any = await getSearchRecipesOptions()
    if (result) {
      setArticlesOption(result)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getRecipesOption()
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    const fetchSearchArticles = async () => {
      setIsFilterLoading(true)

      const newMoreReicpes = cleanDeep(moreArticles)
      const newParams = { ...newMoreReicpes, type: 'article' }
      const response = await getSearchRecipes(newParams)
      dispatch(updateArticlesFilterResult(response))

      setIsFilterLoading(false)
    }
    fetchSearchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreArticles])

  const handleSearchArticles = async () => {
    dispatch(updateSearchArticles(inputSearch))
  }

  const handleInputSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setIsSearchVisible(true)

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      if (value.length > 2) {
        dispatch(updateSearchArticles(value))
      } else {
        dispatch(updateSearchArticles(''))
      }
    }, 1000)
  }

  useEffect(() => {
    const listCheckboxByIndex: any = {}
    isNonEmptyArray(filterTag) &&
      filterTag.forEach((tag: IItemCheckbox, i: number) => {
        const formatKey = tag.bundle_key
        listCheckboxByIndex[`${formatKey}[${i}]`] = tag.tid
      })
    dispatch(updateListCheckboxArticles(listCheckboxByIndex))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTag])

  const handleApplyFilter = () => {}

  const handleCheckFilter = (element: React.ChangeEvent<HTMLInputElement>, itemChecked: IItemCheckbox) => {
    const isChecked = element.target.checked
    if (isChecked) {
      dispatch(onAddCheckboxArticles(itemChecked))
      return
    }

    dispatch(onClearCheckboxArticles(itemChecked))
  }

  const handlePagination = (pages: number) => {
    setFilter({
      ...filter,
      pages
    })
  }

  const handleClearFilter = () => {
    dispatch(clearFilterArticles())
  }

  const getTopRating = async () => {
    const result = await getTopRatingRecipes()

    if (result) {
      const data = get(result, 'results', [])
      setCarousel(data)
    }
  }

  const getCategoryArticles = async () => {
    const result = await getArticlesCategory()
    if (result) {
      setArticlesCategory(result)
    }
  }

  const getArticleMostViewData = async () => {
    const result = await getArticleMostView()
    if (result) {
      const data = get(result, 'results')
      setArticlesMostView(data)
    }
  }

  const getAdsArticlesBanner = async () => {
    const params = {
      section: 'recipe_list'
    }
    const result = await getAdsBanner(params)
    if (result) {
      const data = get(result, 'results[0].field_ad_image_desktop', '')
      setArticlesAds(data)
    }
  }

  const getAdsArticleRecommedData = async () => {
    const result = await getArticlesRecommend()
    if (result) {
      const data = get(result, 'results')
      setArticlesRecom(data)
    }
  }

  const handleSortChange = (value: any) => {
    switch (value.sort) {
      case 'ASC':
        dispatch(updateSortArticles({ sort_by: 'title', sort_order: value.sort }))
        break
      case 'DESC':
        dispatch(updateSortArticles({ sort_by: 'title', sort_order: value.sort }))
        break
      case 'vote_average':
        dispatch(updateSortArticles({ sort_by: value.sort, sort_order: 'DESC' }))
        break
      case 'vote_count':
        dispatch(updateSortArticles({ sort_by: value.sort, sort_order: 'DESC' }))
        break
      case 'has_video_photo':
        dispatch(updateSortArticles({ sort_by: value.sort, sort_order: 'ASC' }))
        break
      case 'Highest Rating':
        dispatch(updateSortArticles({ sort_by: 'title', sort_order: 'ASC' }))
        break
      case 'Lowest Rating':
        dispatch(updateSortArticles({ sort_by: 'title', sort_order: 'ASC' }))
        break
      // TODO: BE UPDATE
      // case 'cockTime':
      //   dispatch(updateSortRecipes({ sort_by: value.sort, sort_order: 'ASC' }))
      //   break

      default:
        break
    }
    // dispatch(updateSortRecipes(value.sort))
  }

  useEffect(() => {
    getTopRating()
    getCategoryArticles()
    getArticleMostViewData()
    getAdsArticlesBanner()
    getAdsArticleRecommedData()
  }, [])

  return (
    <Box mb={20}>
      <BreadCrumb items={mockBreadCrumb.article} />
      <Box
        mb={{
          base: 0,
          md: 12
        }}
      >
        <RecipesHeroBanner data={carousel} isLogin={isLogin} isLoading={isLoading} />
      </Box>

      <Box mb={4}>{isDesktop && <CircleCarousel listItem={articlesCategory} />}</Box>
      <Container>
        <Box mb={16}>
          {isDesktop && <RecipesCarousel title='Made for you' recipesList={articlesMostView} isArticle={true} />}
        </Box>
        <Box mb={16}>
          <Image
            w='100%'
            src={articlesAds}
            fallbackSrc={'images/banner/ad-banner-2.jpg' || onErrorImage(1920, 117)}
            alt='Ads Banner'
          />
        </Box>
        <Box mb={16}>
          <RecipesCarousel
            title='Trending'
            recipesList={!isNonEmptyArray(articlesRecom) ? articlesMostView : articlesRecom}
            isArticle={true}
          />
        </Box>
      </Container>
      <Container>
        {isDesktop && (
          <>
            <Text fontSize='display2' fontWeight={700}>
              More articles
            </Text>
            <Box mt={7} mb={6}>
              <ArticlesSearch
                data={articlesFilterResult}
                initialValue={inputSearch}
                onFillSuggestion={setInputSearch}
                handleSearch={handleSearchArticles}
                handleInputSearch={handleInputSearch}
                isSearchVisible={isSearchVisible}
                isLoading={isSearchLoading}
                ref={searchSuggestRef}
              />
            </Box>
            <Grid templateColumns='repeat(12, 1fr)' gap={7}>
              <GridItem colSpan={3}>
                <RecipesFilter
                  filterOption={articlesOption}
                  handleApply={handleApplyFilter}
                  handleCheckFilter={handleCheckFilter}
                  isLoading={isLoading}
                  filterTag={filterTag}
                />
              </GridItem>
              <GridItem colStart={4} colEnd={13}>
                <RecipesPost
                  paging={pager}
                  isLoading={isFilterLoading}
                  handleSortChange={handleSortChange}
                  handleClearFilter={handleClearFilter}
                  handlePagination={handlePagination}
                  filterTag={filterTag}
                  pager={pager}
                  data={articlesFilterResult}
                  isArticle={true}
                />
                <ArticlesSurvey />
              </GridItem>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}

export default Articles
