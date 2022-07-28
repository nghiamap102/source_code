import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getSearchRecipesOptions, getSearchRecipes } from 'src/common/service/cms-service/recipeListService'
import { FILTER_OPTION, FILTER_SEARCH } from 'src/redux/constants'

export const getRecipesOption = createAsyncThunk(FILTER_OPTION, async (payload, { getState, dispatch }) => {
  try {
    const response = await getSearchRecipesOptions()
    return response
  } catch (error) {
    console.log('error', error)
  }
})

export const getRecipesSearch: any = createAsyncThunk(
  FILTER_SEARCH,
  async (payload: PayloadAction, { getState, dispatch }) => {
    try {
      const response = await getSearchRecipes(payload)
      return response
    } catch (error) {
      console.log('error', error)
    }
  }
)
