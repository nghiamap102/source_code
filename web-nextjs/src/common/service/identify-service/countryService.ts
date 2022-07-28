import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API from 'src/common/config'

export const getCountriesService = () => {
  return axiosClient
    .get(API.IDENTIFY.COUNTRIES_URL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}
