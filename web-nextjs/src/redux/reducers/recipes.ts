import { IParamsSearchRecipes } from 'src/common/service/cms-service/recipeListService.d'
import { RECIPES_CONTEXT } from 'src/redux/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPagination, IItemCheckbox, ISearch } from 'src/utils/Module'
import { omit } from 'src/utils/helpers'
import pick from 'lodash/pick'
import qs from 'query-string'
import isEmpty from 'lodash/isEmpty'

interface IRecipesState {
  isLoading: boolean

  moreRecipes: IParamsSearchRecipes
  filterTag: IItemCheckbox[]
  recipesFilterResult?: Array<ISearch>
  pager: IPagination
  pageCount: string | number
}

let moreRecipes: IParamsSearchRecipes = {}
if (typeof window !== 'undefined') {
  const URLParams = qs.parse(window.location.search)
  if (isEmpty(URLParams)) {
    moreRecipes = {
      type: 'recipe',
      page: 0,
      items_per_page: 20,
      word: '',
      sort_by: 'title',
      sort_order: 'ASC'
    }
  } else {
    moreRecipes = URLParams
  }
}

const initialState: IRecipesState = {
  isLoading: false,

  recipesFilterResult: [],
  moreRecipes,
  pageCount: 0,
  pager: {
    count: 1,
    pages: 0,
    items_per_page: 20,
    current_page: 0,
    next_page: 0
  },
  filterTag: []
}

export const recipesSlice = createSlice({
  name: RECIPES_CONTEXT,
  initialState,
  reducers: {
    updateRecipesFilterResult: (state, action) => {
      state.recipesFilterResult = action.payload?.results

      // Pagination
      state.pager = { ...action.payload?.pager }
      state.pager.pages = action.payload?.pager?.pages - 1
    },
    updateSearchRecipes: (state, action) => {
      state.moreRecipes.word = action.payload
    },
    updatePageRecipes: (state, action) => {
      state.moreRecipes.page = action.payload
    },
    updateItemPerPageRecipes: (state, action) => {
      state.moreRecipes.items_per_page = action.payload
    },
    updateSortRecipes: (state, action) => {
      state.moreRecipes.sort_by = action.payload?.sort_by
      state.moreRecipes.sort_order = action.payload?.sort_order
    },

    clearFilterRecipes: (state, action: PayloadAction) => {
      state.isLoading = true

      const cloneMoreRecipes = { ...state.moreRecipes }
      const pickListKey = pick(cloneMoreRecipes, ['type', 'page', 'items_per_page', 'word', 'sort_by', 'sort_order'])
      state.moreRecipes = pickListKey
      state.filterTag = []
    },
    onAddCheckboxRecipes(state, action) {
      const { unique_key, tid } = action.payload

      state.filterTag = [...state.filterTag, action.payload]
      state.moreRecipes = {
        ...state.moreRecipes,
        [unique_key]: tid
      }
    },
    onClearCheckboxRecipes(state, action) {
      const { tid } = action.payload
      if (state.filterTag) {
        const index = state.filterTag.findIndex((e) => e.tid === tid)
        const cloneArr = [...state.filterTag]
        cloneArr.splice(index, 1)

        state.filterTag = cloneArr
      }

      Object.entries(state.moreRecipes).forEach(([key, value]) => {
        if (tid === value) {
          const newDataRecipes = omit(state.moreRecipes, [key])
          state.moreRecipes = newDataRecipes
        }
      })
    }
  }
})

const { reducer, actions } = recipesSlice

export const {
  updateRecipesFilterResult,
  updateSearchRecipes,
  updateItemPerPageRecipes,
  updatePageRecipes,
  updateSortRecipes,
  clearFilterRecipes,
  onAddCheckboxRecipes,
  onClearCheckboxRecipes
} = actions

export default reducer
