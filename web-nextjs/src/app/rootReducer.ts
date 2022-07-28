import { combineReducers } from 'redux'

import recipesReducer from 'src/redux/reducers/recipes'
import filterSlice from 'src/redux/reducers/filterSlice'
import countryReducer from 'src/redux/reducers/country'
import authReducer from 'src/redux/reducers/auth'
import articlesReducer from 'src/redux/reducers/articles'

const rootReducer = combineReducers({
  filter: filterSlice,
  country: countryReducer,
  auth: authReducer,
  recipes: recipesReducer,
  articles: articlesReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

export default rootReducer
