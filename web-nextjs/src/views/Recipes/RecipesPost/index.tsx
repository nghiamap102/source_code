import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { Box, Text, Flex, Grid, Button, Center } from '@chakra-ui/react'
import Dropdown from 'src/components/Dropdown'
import { IDropdownValue } from 'src/components/Dropdown/Dropdown.d'
import FilterTag from 'src/components/Filter/FilterTag'
import dataDropdown from 'src/mock/components/Dropdown/data.json'
import { RecipesCard } from 'src/components/Recipes/RecipesCard'
import Paginations from 'src/components/Paginations'
import { isNonEmptyArray } from 'src/utils'
import { IPagination } from 'src/utils/Module.d'
import Skeleton from 'react-loading-skeleton'
import { onClearCheckboxRecipes } from 'src/redux/reducers/recipes'
import { onClearCheckboxArticles } from 'src/redux/reducers/articles'

interface IRecipesPost {
  paging: IPagination
  isLoading: boolean
  handleClearFilter?: () => void
  handleSortChange?: (obj: IDropdownValue) => void
  handleViewChange?: (obj: IDropdownValue) => void
  handlePagination?: (pages: number) => void
  data: any
  filterTag: any
  pager: any
  isArticle?: boolean
}

const RecipesPost: React.FC<IRecipesPost> = ({
  paging,
  isLoading,
  handleSortChange,
  handleViewChange,
  handleClearFilter,
  handlePagination,
  data,
  filterTag,
  pager,
  isArticle = false
}) => {
  const dispatch = useDispatch()

  const renderItem = () => {
    if (isLoading) {
      return (
        <Grid templateColumns='repeat(2, 1fr)' gap={8}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i}>
              <Skeleton height={280} />
              <Skeleton count={3} />
            </Box>
          ))}
        </Grid>
      )
    }

    return isNonEmptyArray(data) ? (
      <Grid templateColumns='repeat(2, 1fr)' gap={8}>
        {data.map((element: any, index: number) => (
          <RecipesCard isArticle={isArticle} key={index} element={element} />
        ))}
      </Grid>
    ) : (
      <Center>
        <Text fontWeight={700}>Result Not Found</Text>
      </Center>
    )
  }

  return (
    <Box>
      <FilterTag
        listFilterTag={filterTag}
        onRemoveTag={
          isArticle
            ? (element) => dispatch(onClearCheckboxArticles(element))
            : (element) => dispatch(onClearCheckboxRecipes(element))
        }
      />
      <Button color='main.red' variant='link' my={4} onClick={handleClearFilter}>
        Clear filter
      </Button>
      <Flex alignItems='center' justifyContent='space-between' mb='18px'>
        <Box>
          <Text color='main.grayCool'>
            1-{pager?.items_per_page} item of {pager?.count} products
          </Text>
        </Box>
        {isArticle && (
          <Box>
            <Flex>
              <Dropdown label='Highest Rating' dropdownList={dataDropdown?.sort_by} onChange={handleSortChange} />
            </Flex>
          </Box>
        )}
        {!isArticle && (
          <Box>
            <Flex>
              <Dropdown
                dropdownName='View:'
                label='20'
                dropdownList={dataDropdown?.items_per_page}
                onChange={handleViewChange}
                size='sm'
              />
              <Box mr={4} />
              <Dropdown
                dropdownName='Sort by:'
                label='A-Z'
                dropdownList={dataDropdown?.sort_by}
                onChange={handleSortChange}
              />
            </Flex>
          </Box>
        )}
      </Flex>

      {renderItem()}

      <Paginations
        paging={paging}
        onSubmit={(pages) => {
          handlePagination && handlePagination(pages)
        }}
      />
    </Box>
  )
}

export default RecipesPost
