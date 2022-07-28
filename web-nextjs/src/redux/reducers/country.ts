import { createSlice } from '@reduxjs/toolkit'
import { COUNTRY_CONTEXT } from '../constants/identify'

const countrySlice = createSlice({
  name: COUNTRY_CONTEXT,
  initialState: {
    countriesList: [],
    countryCode: '+63'
  },
  reducers: {
    updateCountriesList: (state, action) => {
      state.countriesList = action.payload
    },
    updateCountryCode: (state, action) => {
      state.countryCode = action.payload
    }
  }
})

const { reducer, actions } = countrySlice

export const { updateCountriesList, updateCountryCode } = actions

export default reducer
