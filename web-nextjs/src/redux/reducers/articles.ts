import { IParamsSearchRecipes } from 'src/common/service/cms-service/recipeListService.d'
import { ARTICLES_CONTEXT } from 'src/redux/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPagination, IItemCheckbox, ISearch } from 'src/utils/Module'
import { omit } from 'src/utils/helpers'
import pick from 'lodash/pick'

interface IArticlesState {
  isLoading: boolean

  moreArticles: IParamsSearchRecipes
  filterTag: IItemCheckbox[]
  articlesFilterResult?: Array<ISearch>
  pager: IPagination
  pageCount: string | number
}

const initialState: IArticlesState = {
  isLoading: false,

  articlesFilterResult: [],
  moreArticles: {
    type: 'article',
    pages: 1,
    word: '',
    sort_by: 'title',
    sort_order: 'ASC'
  },
  pageCount: 0,
  filterTag: [],
  pager: {}
}

export const articlesSlice = createSlice({
  name: ARTICLES_CONTEXT,
  initialState,
  reducers: {
    updateArticlesFilterResult: (state, action) => {
      state.articlesFilterResult = action.payload?.results

      state.moreArticles.pages = action.payload?.pager?.pages || 0
      state.pageCount = action.payload?.pager?.count || 0
    },
    updateSearchArticles: (state, action) => {
      state.moreArticles.word = action.payload
    },
    updatePageArticles: (state, action) => {
      state.moreArticles.pages = action.payload
    },
    clearFilterArticles: (state, action: PayloadAction) => {
      state.isLoading = true

      const cloneMoreArticles = { ...state.moreArticles }
      const pickListKey = pick(cloneMoreArticles, ['type', 'pages', 'word'])
      state.moreArticles = pickListKey
      state.filterTag = []
    },
    updateSortArticles: (state, action) => {
      state.moreArticles.sort_by = action.payload?.sort_by
      state.moreArticles.sort_order = action.payload?.sort_order
    },
    updateListCheckboxArticles: (state, action) => {
      state.moreArticles = {
        ...state.moreArticles,
        ...action.payload
      }
    },
    onAddCheckboxArticles(state, action) {
      state.filterTag = [...state.filterTag, action.payload]
    },
    onClearCheckboxArticles(state, action) {
      const { tid } = action.payload
      if (state.filterTag) {
        const index = state.filterTag.findIndex((e) => e.tid === tid)
        const cloneArr = [...state.filterTag]
        cloneArr.splice(index, 1)

        state.filterTag = cloneArr
      }

      for (const [key, value] of Object.entries(state.moreArticles)) {
        if (tid === value) {
          const newDataArticles = omit(state.moreArticles, [key])
          state.moreArticles = newDataArticles
        }
      }
    }
  }
})

const { reducer, actions } = articlesSlice

export const {
  updateArticlesFilterResult,
  updateSortArticles,
  updateSearchArticles,
  updatePageArticles,
  clearFilterArticles,
  updateListCheckboxArticles,
  onAddCheckboxArticles,
  onClearCheckboxArticles
} = actions

export default reducer
