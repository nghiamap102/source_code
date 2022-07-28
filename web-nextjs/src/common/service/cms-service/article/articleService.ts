import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API from 'src/common/config'
// import { IBookMarkData } from '../../product-service/productService'

interface IParamsArticles {
  items_per_page?: number
  page?: number
}

export const getArticleMostView = (params?: IParamsArticles) => {
  const newParams = {
    items_per_page: 20,
    page: 0,
    ...params
  }
  return axiosClient
    .get(API.CMS.ARTICLE_LIST_GET_MOST_VIEW_ARTICLE_URL, {
      params: newParams
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getArticlesCategory = () => {
  return axiosClient
    .get(API.CMS.ARTICLE_LIST_ARTICLE_CATEGORY_URL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getArticlesRecommend = (params?: IParamsArticles) => {
  const newParams = {
    items_per_page: 20,
    page: 0,
    ...params
  }
  return axiosClient
    .get(API.CMS.ARTICLE_LIST_ARTICLE_RECOM_URL, {
      params: newParams
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const getPoll = () => {
  return axiosClient
    .get(API.CMS.GET_POLL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}

export const postPoll = (): Promise<any> => {
  return axiosClient
    .post(`${API.CMS.POST_POLL}`)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}

export const getArticleDetail = (id: string | string[]): Promise<any> => {
  return axiosClient
    .get(`${API.CMS.GET_ARTICLE_DETAILS}/${id}`)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}
