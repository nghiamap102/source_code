import * as recipe from 'src/redux/actions'
import type { AppState } from 'src/app/store'
import { IPagination } from 'src/utils/Module'
import { FILTER_CONTEXT } from 'src/redux/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearch, IFilterData, IItemCheckbox, ISelectedTag } from 'src/utils/Module'

interface IFilterState {
  isFirstCallApi?: boolean
  isSearchLoading?: boolean
  status?: 'idle' | 'loading' | 'failed'
  filterType?: string
  filterParams: {
    title: string
  }
  filterTag: IItemCheckbox[]
  filterOption: IFilterData
  filterSearchResult?: Array<ISearch>
  pager: IPagination
  filterSelectedTag?: ISelectedTag
}

// Define the initial state using that type
const initialState: IFilterState = {
  isFirstCallApi: true,
  isSearchLoading: false,
  status: 'loading',
  filterParams: {
    title: ''
  },
  filterType: 'recipe',
  filterTag: [],
  filterOption: {
    data: []
  },
  filterSearchResult: [],
  pager: {
    // // TODO: COMMENT THIS
    // count: 2,
    // pages: 1,
    // items_per_page: 20
  },
  filterSelectedTag: {}
}

// Define a type for the slice state
export const filterSlice = createSlice({
  name: FILTER_CONTEXT,
  initialState,
  reducers: {
    removeFilter(state, action: PayloadAction) {
      state.filterTag = []
      state.filterSelectedTag = {}
    },
    handleApply(state, action) {},

    onAddFilterCheckbox(state, action) {
      state.filterTag = [...state.filterTag, action.payload]
    },
    onPatchFilterCheckbox(state, action) {
      state.filterSelectedTag = action.payload
    },
    onRemoveFilterCheckbox(state, action) {
      const { tid } = action.payload

      if (state.filterTag) {
        const index = state.filterTag.findIndex((e) => e.tid === tid)
        const cloneArr = [...state.filterTag]
        cloneArr.splice(index, 1)

        state.filterTag = cloneArr
      }
      if (state.filterSelectedTag) {
        const listValue = Object.values(state.filterSelectedTag)
        const findValue = listValue?.find((e) => e === tid)
        const cloneObj = { ...state.filterSelectedTag }

        for (const key in cloneObj) {
          if (findValue === cloneObj[key]) delete cloneObj[key]
        }

        state.filterSelectedTag = cloneObj
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(recipe.getRecipesOption.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(recipe.getRecipesOption.fulfilled, (state, action) => {
      state.status = 'idle'
      state.filterOption = action.payload
    })

    builder.addCase(recipe.getRecipesSearch.pending, (state) => {
      state.status = 'loading'
      state.isSearchLoading = true
    })
    builder.addCase(recipe.getRecipesSearch.fulfilled, (state, action) => {
      state.status = 'idle'
      state.filterSearchResult = action.payload?.results

      // Pager
      state.pager.count = action.payload?.pager?.count || 0
      state.pager.pages = action.payload?.pager?.pages || 0
      state.pager.items_per_page = action.payload?.pager?.items_per_page || 0

      state.isSearchLoading = false
    })
  }
})

export const onRemoveTag = (itemCheck: any) => (dispatch: any) => {
  dispatch(onRemoveFilterCheckbox(itemCheck))
}

export const { handleApply, removeFilter, onAddFilterCheckbox, onRemoveFilterCheckbox, onPatchFilterCheckbox } =
  filterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFilter = (state: AppState) => state.filter

export default filterSlice.reducer
