import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API from 'src/common/config'
import { IParamsHomeCarousel, IParamsBanner, IParamsSearchRecipes } from './recipeListService.d'

export const getHomeCarousel = (params?: IParamsHomeCarousel) => {
  const newParams = {
    // items_per_page: 20,
    // page: 0,
    ...params
  }
  return axiosClient
    .get(API.CMS.RECIPE_LIST_HOMEPAGE_CAROUSEL_URL, {
      params: newParams
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getMoreRecipes = (params: IParamsHomeCarousel) => {
  const newParams = {
    items_per_page: 20,
    page: 0,
    ...params
  }
  return axiosClient
    .get(API.CMS.RECIPE_LIST_MORE_RECIPES_URL, {
      params: newParams
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getTopRatingRecipes = () => {
  return axiosClient
    .get(API.CMS.RECIPE_LIST_TOP_RATING_RECIPES_URL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getRecipesCategory = () => {
  return axiosClient
    .get(API.CMS.RECIPE_LIST_RECIPE_CATEGORY_URL, {
      params: {
        t: Math.random()
      }
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getRecommendRecipeForAnounymousUser = (params?: IParamsHomeCarousel) => {
  return axiosClient
    .get(API.CMS.RECIPE_LIST_RECIPE_RECOMMEND_ANONYMOUS_USER_URL, {
      params
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getRecommendRecipeForAuthenticatedUser = (params?: IParamsHomeCarousel) => {
  return axiosClient
    .get(API.CMS.RECIPE_LIST_RECIPE_AUTHENTICATED_USER_URL, {
      params
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getFeatureRecipe = (params?: IParamsHomeCarousel) => {
  // const newParams = {
  //   item_per_page: 10,
  //   page: 0,
  //   ...params
  // }
  return axiosClient
    .get(API.CMS.RECIPE_LIST_RECIPE_FEATURE_URL, {
      params: {
        ...params,
        t: Math.random()
      }
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getRecipeDetail = (id: string | string[]): Promise<any> => {
  return axiosClient
    .get(`${API.CMS.RECIPE_RELATED_DETAIL_URL}/${id}`)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getAdsBanner = (params: IParamsBanner): Promise<any> => {
  const newParams = {
    ...params
  }
  return axiosClient
    .get(`${API.CMS.GET_AD_BANNER_URL}`, { params: newParams })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getSearchRecipes = (params?: IParamsSearchRecipes): Promise<any> => {
  return axiosClient
    .get(`${API.CMS.SEARCH_RECIPE}`, {
      params: {
        ...params
      }
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}
export const getSearchRecipesOptions = (): Promise<any> => {
  return axiosClient
    .get(`${API.CMS.SEARCH_RECIPE_OPTION}`)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}

export const getDataCollection = (path: string): Promise<any> => {
  return axiosClient
    .get(`${API.CMS.GET_DATA_COLLECTION}/${path}`)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}
