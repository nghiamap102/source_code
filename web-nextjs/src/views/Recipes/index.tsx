import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import cleanDeep from 'clean-deep'
import get from 'lodash/get'

import { Box, Text, Container, Grid, GridItem, Image, useOutsideClick } from '@chakra-ui/react'

import { RootReducer } from 'src/app/rootReducer'
import { useDeviceDetect } from 'src/hooks'
import { isNonEmptyArray, onErrorImage } from 'src/utils'

import { IParamsSearchRecipes } from 'src/common/service/cms-service/recipeListService.d'
import {
  getFeatureRecipe,
  getAdsBanner,
  getRecipesCategory,
  getSearchRecipes,
  getSearchRecipesOptions,
  getTopRatingRecipes,
  getRecommendRecipeForAnounymousUser,
  getRecommendRecipeForAuthenticatedUser
} from 'src/common/service/cms-service/recipeListService'

import RecipesPost from './RecipesPost'
import RecipesFilter from './RecipesFilter'
import RecipesCategory from './RecipesCategory'
import BreadCrumb from 'src/components/BreadCrumb'
import RecipesHeroBanner from './RecipesHeroBanner'
import RecipesSearch from 'src/components/Recipes/RecipesSearch'
import { RecipesCard } from 'src/components/Recipes/RecipesCard'
import CircleCarousel from 'src/components/Recipes/CircleCarousel'
import DropdownMobile from 'src/components/Dropdown/DropdownMobile'
import RecipesCarousel from 'src/components/Recipes/RecipesCarousel'

import mockBreadCrumb from 'src/mock/components/BreadCrumb/data.json'
import dataDropdown from 'src/mock/components/Dropdown/data.json'

import {
  updateSearchRecipes,
  updateItemPerPageRecipes,
  updateSortRecipes,
  onAddCheckboxRecipes,
  onClearCheckboxRecipes,
  clearFilterRecipes,
  updateRecipesFilterResult,
  updatePageRecipes
} from 'src/redux/reducers/recipes'

import { IItemCheckbox } from 'src/utils/Module.d'

const Recipes: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isDesktop, isMobile } = useDeviceDetect()

  const { isLogin }: any = useSelector<RootReducer>((item) => item.auth)
  const { moreRecipes, filterTag, recipesFilterResult, pager }: any = useSelector<RootReducer>((item) => item.recipes)

  const listItemRef = useRef<HTMLDivElement>(null)
  const searchSuggestRef = useRef<HTMLElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(true)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

  const [carousel, setCarousel] = useState([])
  const [recipesCategory, setRecipesCategory] = useState([])
  const [recipesRecommend, setRecipesRecommend] = useState([])
  const [recipesFeature, setRecipesFeature] = useState([])
  const [recipesOption, setRecipesOption] = useState<any>({})
  const [recipesAds, setRecipesAds] = useState<string>('')

  useOutsideClick({
    ref: searchSuggestRef,
    handler: () => {
      setTimeout(() => {
        setIsSearchVisible(false)
      }, 100)
    }
  })

  const getTopRating = async () => {
    const result = await getTopRatingRecipes()

    if (result) {
      const data = get(result, 'results', [])
      setCarousel(data)
    }
  }

  const getRecommendRecipes = async () => {
    if (isLogin) {
      const result = await getRecommendRecipeForAuthenticatedUser()
      const data = get(result, 'results', [])
      setRecipesRecommend(data)

      return
    }

    const result = await getRecommendRecipeForAnounymousUser()
    const data = get(result, 'results', [])
    setRecipesRecommend(data)
  }

  const getCategoryRecipes = async () => {
    const result = await getRecipesCategory()
    if (result) {
      const data = get(result, 'results', [])
      setRecipesCategory(data)
    }
  }
  const getFeatureRecipeData = async () => {
    const result = await getFeatureRecipe()
    if (result) {
      const data = get(result, 'results')
      setRecipesFeature(data)
    }
  }

  const getAdsRecipesBanner = async () => {
    const params = {
      section: 'recipe_list'
    }
    const result = await getAdsBanner(params)
    if (result) {
      const data = get(result, 'results[0].field_ad_image_desktop', '')
      setRecipesAds(data)
    }
  }

  const getRecipesOption = async () => {
    const result: any = await getSearchRecipesOptions()
    if (result) {
      setRecipesOption(result)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getTopRating()
      await getRecommendRecipes()
      await getCategoryRecipes()
      await getFeatureRecipeData()
      await getAdsRecipesBanner()
      await getRecipesOption()

      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    const fetchSearchRecipes = async () => {
      setIsFilterLoading(true)

      const param = cleanDeep(moreRecipes)
      router.push({ query: param }, undefined, { shallow: true })

      const response = await getSearchRecipes(param)
      dispatch(updateRecipesFilterResult(response))

      setIsFilterLoading(false)
    }
    fetchSearchRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreRecipes])

  const handleSearchRecipes = async () => {
    dispatch(updateSearchRecipes(inputSearch))
  }

  const handleInputSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setIsSearchVisible(true)

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      if (value.length > 2) {
        dispatch(updateSearchRecipes(value))
      } else {
        dispatch(updateSearchRecipes(''))
      }
    }, 1000)
  }

  const handleApplyFilter = () => {}

  const handleCheckFilter = (element: React.ChangeEvent<HTMLInputElement>, itemChecked: IItemCheckbox) => {
    const isChecked = element.target.checked
    if (isChecked) {
      dispatch(onAddCheckboxRecipes(itemChecked))
      return
    }

    dispatch(onClearCheckboxRecipes(itemChecked))
  }

  const handleSortChange = (value: any) => {
    switch (value.sort) {
      case 'ASC':
        dispatch(updateSortRecipes({ sort_by: 'title', sort_order: value.sort }))
        break
      case 'DESC':
        dispatch(updateSortRecipes({ sort_by: 'title', sort_order: value.sort }))
        break
      case 'vote_average':
        dispatch(updateSortRecipes({ sort_by: value.sort, sort_order: 'DESC' }))
        break
      case 'vote_count':
        dispatch(updateSortRecipes({ sort_by: value.sort, sort_order: 'DESC' }))
        break
      case 'has_video_photo':
        dispatch(updateSortRecipes({ sort_by: value.sort, sort_order: 'ASC' }))
        break
      case 'Highest Rating':
        dispatch(updateSortRecipes({ sort_by: 'title', sort_order: 'ASC' }))
        break
      case 'Lowest Rating':
        dispatch(updateSortRecipes({ sort_by: 'title', sort_order: 'ASC' }))
        break
      // TODO: BE UPDATE
      // case 'cockTime':
      //   dispatch(updateSortRecipes({ sort_by: value.sort, sort_order: 'ASC' }))
      //   break

      default:
        break
    }
  }
  const handleViewChange = (value: IParamsSearchRecipes) => {
    const newItemPerPage = value.items_per_page
    dispatch(updateItemPerPageRecipes(newItemPerPage))
  }

  const handlePagination = (pages: number) => {
    dispatch(updatePageRecipes(pages))
  }

  const handleClearFilter = () => {
    dispatch(clearFilterRecipes())
  }

  return (
    <Box mb={20}>
      <BreadCrumb items={mockBreadCrumb.recipe} />
      <Box
        mb={{
          base: 0,
          md: 12
        }}
      >
        <RecipesHeroBanner data={carousel} isLogin={isLogin} isLoading={isLoading} />
      </Box>
      <Box mb={4}>
        {isDesktop && <CircleCarousel listItem={recipesCategory} isLoading={isLoading} />}
        {isMobile && <RecipesCategory listItem={recipesCategory} />}
      </Box>
      <Container>
        <Box mb={16}>
          {isDesktop && <RecipesCarousel title='Made for you' recipesList={recipesRecommend} isLoading={isLoading} />}
          {isMobile && (
            <>
              {isNonEmptyArray(recipesRecommend) && (
                <Box>
                  <Text fontSize='subHead' fontWeight={600} mb={7}>
                    Made for you
                  </Text>
                  <Grid gridTemplateColumns='repeat(2,1fr)' gap={4}>
                    {recipesRecommend.map((element: any, index: number) => (
                      <GridItem key={index}>
                        <RecipesCard {...element} />
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
          )}
        </Box>

        <Box mb={16}>
          <Image
            w='100%'
            src={recipesAds}
            fallbackSrc={'images/banner/ad-banner-2.jpg' || onErrorImage(1920, 117)}
            alt='Ads Banner'
          />
        </Box>

        <Box mb={16}>
          <RecipesCarousel title='Featured Recipe' recipesList={recipesFeature} isLoading={isLoading} />
        </Box>
      </Container>
      <Container>
        {isDesktop && (
          <>
            <Text fontSize='display2' fontWeight={700}>
              More recipes
            </Text>
            <Box mt={7} mb={6}>
              <RecipesSearch
                data={recipesFilterResult}
                initialValue={inputSearch}
                onFillSuggestion={setInputSearch}
                handleSearch={handleSearchRecipes}
                handleInputSearch={handleInputSearch}
                isSearchVisible={isSearchVisible}
                isLoading={false}
                ref={searchSuggestRef}
              />
            </Box>
            <Grid templateColumns='repeat(12, 1fr)' gap={7} ref={listItemRef}>
              <GridItem colSpan={3}>
                <RecipesFilter
                  filterOption={recipesOption}
                  handleApply={handleApplyFilter}
                  handleCheckFilter={handleCheckFilter}
                  isLoading={isLoading}
                  filterTag={filterTag}
                />
              </GridItem>
              <GridItem colStart={4} colEnd={13} id='more-recipes'>
                <RecipesPost
                  paging={pager}
                  isLoading={isFilterLoading}
                  handleSortChange={handleSortChange}
                  handleViewChange={handleViewChange}
                  handleClearFilter={handleClearFilter}
                  handlePagination={handlePagination}
                  data={recipesFilterResult}
                  filterTag={filterTag}
                  pager={pager}
                />
              </GridItem>
            </Grid>
          </>
        )}
        {isMobile && (
          <DropdownMobile
            filterOption={recipesOption}
            filterSortBy={dataDropdown.sort_by}
            onChange={handleSortChange}
            onRemoveTag={(element) => dispatch(onClearCheckboxRecipes(element))}
            listFilterTag={filterTag}
            handleCheckFilter={handleCheckFilter}
            isLoading={isLoading}
          />
        )}
        {isMobile && (
          <Grid templateColumns='repeat(2, 1fr)' gap={8}>
            {isNonEmptyArray(recipesFilterResult) &&
              recipesFilterResult.map((element: any, index: number) => <RecipesCard key={index} element={element} />)}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default Recipes
