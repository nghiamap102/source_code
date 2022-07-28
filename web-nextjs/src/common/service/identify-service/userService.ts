import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API from 'src/common/config'

export const getUsersService = () => {
  return axiosClient
    .get(API.IDENTIFY.USER_INFO_URL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}


export interface IPayloadSocialRegisterAccount {
  phone?: string
  email?: string
  first_name?: string
  last_name?: string
  country?: string
  accept_ads?: boolean
  cuisine_types?: string[]
  key_ingredients?: string[]
  special_tags?: string[]
  cooking_level?: string[]
  check_account_exist?: boolean
  field_u_first_login?: string
}

export const editUserService = (payload: IPayloadSocialRegisterAccount) => {
  return axiosClient.post(`${API.IDENTIFY.EDIT_USER_INFO_URL}`, {
    ...payload
  })
}