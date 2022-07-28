import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API from 'src/common/config'
import { IBookMarkData } from './productService.d'

export const postToBookmark = (payload: IBookMarkData): Promise<any> => {
  return axiosClient
    .post(`${API.CMS.RECIPE_DETAIL_LIKE_REVIEW_URL}`, {
      flag_id: 'content_save',
      entity_type: 'node',
      ...payload
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}
export const removeFromBookmark = (payload: IBookMarkData): Promise<any> => {
  return axiosClient
    .post(`${API.CMS.RECIPE_DETAIL_UNLIKE_REVIEW_URL}`, {
      flag_id: 'content_save',
      entity_type: 'node',
      ...payload
    })
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}
