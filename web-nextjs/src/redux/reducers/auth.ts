import { createSlice } from '@reduxjs/toolkit'
import { AUTH_CONTEXT } from '../constants/identify'

const authSlice = createSlice({
  name: AUTH_CONTEXT,
  initialState: {
    dataRegister: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      country: '',
      password: '',
      confirm: '',
      acceptAds: false,
      cuisine_types: [],
      key_ingredients: [],
      special_tags: [],
      cooking_level: []
    },
    dataRegisterSocial: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      country: '',
      acceptAds: false,
      cuisine_types: [],
      key_ingredients: [],
      special_tags: [],
      cooking_level: []
    },
    informationOTP: {
      hash: '',
      uid: ''
    },
    errorMessage: '',
    successMessage: '',
    urlReturn: '/',
    userInfo: {},
    isFirstSocialLogin: false,
    isLogin: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false
  },
  reducers: {
    updateDataRegister: (state, action) => {
      state.dataRegister = action.payload
    },
    updateInformationOTP: (state, action) => {
      state.informationOTP = action.payload
    },
    updateErrorMessage: (state, action) => {
      state.errorMessage = action.payload
      state.successMessage = ''
    },
    updateSuccessMessage: (state, action) => {
      state.successMessage = action.payload
      state.errorMessage = ''
    },
    updateUrlReturn: (state, action) => {
      state.urlReturn = action.payload
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    updateIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    updateIsFirstSocialLogin: (state, action) => {
      state.isFirstSocialLogin = action.payload 
    },
    updateDataSocialRegister: (state, action) => {
      state.dataRegisterSocial = action.payload
    }
  }
})

const { reducer, actions } = authSlice

export const {
  updateDataRegister,
  updateInformationOTP,
  updateErrorMessage,
  updateSuccessMessage,
  updateUrlReturn,
  updateUserInfo,
  updateIsLogin,
  updateIsFirstSocialLogin,
  updateDataSocialRegister
} = actions

export default reducer
