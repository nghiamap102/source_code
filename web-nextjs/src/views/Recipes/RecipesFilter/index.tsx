import React from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { Box, Button, Text } from '@chakra-ui/react'
import { IFilterData } from 'src/utils/Module.d'
import FilterBy from 'src/components/Filter/FilterBy'
import { ButtonOrangeHover } from 'src/theme/components'

interface IRecipesFilter {
  handleApply: () => void
  handleCheckFilter: Function
  isLoading?: boolean
  filterOption: IFilterData
  filterTag?: any
}

const RecipesFilter: React.FC<IRecipesFilter> = ({
  handleApply,
  filterOption,
  handleCheckFilter,
  isLoading,
  filterTag
}) => {
  return (
    <Box>
      <Text mb={2}>FILTER BY</Text>
      <FilterBy
        filterOption={filterOption}
        listFilterTag={filterTag}
        handleCheckFilter={handleCheckFilter}
        isLoading={isLoading}
      />
      <Box mt={4} display='none'>
        <Button
          isLoading={isLoading}
          bg='main.primary'
          color='main.white'
          isFullWidth
          _hover={ButtonOrangeHover}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Box>
    </Box>
  )
}

export default RecipesFilter
